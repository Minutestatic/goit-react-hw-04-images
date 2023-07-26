import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import getImages from 'api/app';
import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import Button from 'components/Button';
import Loader from 'components/Loader/Loader';
import Modal from 'components/Modal/Modal';

import css from './App.module.css';

const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        if (query && page > 0) {
          const imageData = await getImages(query, page);
          if (imageData && imageData.hits) {
            setImages(prevImages => [...prevImages, ...imageData.hits]);
            setLoadMore(page < Math.ceil(imageData.totalHits / 12));
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, [query, page]);

  const handleFormSubmit = newQuery => {
    setImages([]);
    setQuery(newQuery);
    setPage(1);
  };

  const loadMoreImages = () => {
    setPage(prevPage => prevPage + 1);
  };

  const openModal = imageUrl => {
    setSelectedImage(imageUrl);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedImage('');
    setShowModal(false);
  };

  return (
    <div className={css.App}>
      {loading && <Loader />}
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery images={images} onImageClick={openModal} />
      {loadMore && <Button loadMoreImages={loadMoreImages} />}
      {showModal && <Modal image={selectedImage} onClose={closeModal} />}
      <ToastContainer autoClose={1500} />
    </div>
  );
};

export default App;
