import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import getImages from 'api/app';

import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import Button from 'components/Button';
import Loader from 'components/Loader/Loader';
import Modal from 'components/Modal/Modal';

import css from './App.module.css';

class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    loading: false,
    loadMore: null,
    showModal: false,
    selectedImage: '',
  };

  async componentDidUpdate(prevProps, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      try {
        this.setState({ loading: true });
        const { query, page } = this.state;

        if (query && page > 0) {
          const imageData = await getImages(query, page);

          if (imageData && imageData.hits) {
            this.setState(prevState => ({
              images: [...prevState.images, ...imageData.hits],
              loadMore: this.state.page < Math.ceil(imageData.totalHits / 12),
            }));
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        this.setState({ loading: false });
      }
    }
  }

  handleFormSubmit = query => {
    this.setState({ images: [], query, page: 1 });
  };

  loadMoreImages = () => {
    this.setState({
      page: this.state.page + 1,
    });
  };

  openModal = imageUrl => {
    this.setState({ showModal: true, selectedImage: imageUrl });
  };

  closeModal = () => {
    this.setState({ showModal: false, selectedImage: '' });
  };

  render() {
    const { images, loading, loadMore, selectedImage, showModal } = this.state;
    return (
      <div className={css.App}>
        {loading && <Loader />}

        <Searchbar onSubmit={this.handleFormSubmit} />

        <ImageGallery images={images} onImageClick={this.openModal} />

        {loadMore && <Button loadMoreImages={this.loadMoreImages} />}

        {showModal && <Modal image={selectedImage} onClose={this.closeModal} />}

        <ToastContainer autoClose={1500} />
      </div>
    );
  }
}

export default App;
