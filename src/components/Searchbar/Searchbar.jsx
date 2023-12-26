import { useState } from 'react';
import CSS from './Searchbar.module.css';

const Searchbar = ({ submit }) => {
  const [query, setQuery] = useState('');

  const handleChange = ({ target: { value } }) => {
    setQuery(value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (query) {
      submit(query);
    }
    setQuery('');
    e.target.reset();
  };
  return (
    <form onSubmit={handleSubmit} className={CSS.searchbar}>
      <label htmlFor="searchInput"></label>
      <div className={CSS.divInput}>
        <input
          name="query"
          type="text"
          id="searchInput"
          autoComplete="off"
          autoFocus
          placeholder="Search films"
          value={query}
          onChange={handleChange}
        />
      </div>
      <button type="submit">
        <span className={CSS.buttonLabel}>Search</span>
      </button>
    </form>
  );
};

export default Searchbar;
