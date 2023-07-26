import React, { useState } from 'react';
import { toast } from 'react-toastify';
import css from './Searchbar.module.css';
import { BiSearchAlt } from 'react-icons/bi';

const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const onChangeInput = event => {
    setQuery(event.target.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (query.trim() === '') {
      toast.warn('🦄 Введите слово для поиска!', {
        position: 'top-center',
        theme: 'colored',
      });
      return;
    }

    onSubmit(query);
    setQuery('');
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleSubmit}>
        <button className={css['SearchForm-button']} type="submit">
          <BiSearchAlt size="20" />
        </button>
        <input
          className={css['SearchForm-input']}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={onChangeInput}
          value={query}
        />
      </form>
    </header>
  );
};

export default Searchbar;
