import { Component } from 'react';
import { toast } from 'react-toastify';
import css from './Searchbar.module.css';
import { BiSearchAlt } from 'react-icons/bi';

class Searchbar extends Component {
  state = {
    query: '',
  };

  onChangeInput = event => {
    this.setState({ query: event.target.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.query.trim() === '') {
      toast.warn('🦄 Введите слово для поиска!', {
        position: 'top-center',
        theme: 'colored',
      });
      return;
    }

    this.props.onSubmit(this.state.query);
    this.setState({ query: '' });
    event.currentTarget.reset();
  };

  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.handleSubmit}>
          <button className={css['SearchForm-button']} type="submit">
            <BiSearchAlt size="20" />
          </button>

          <input
            className={css['SearchForm-input']}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.onChangeInput}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
