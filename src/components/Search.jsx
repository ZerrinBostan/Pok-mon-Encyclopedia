import React, { useState } from 'react';
import Input from './Input';
import Button from './Button';

const SearchContent = ({ handleSearch = '' }) => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');

  const handlePokemonSearch = (e) => {
    setTitle(e.target.value);
  };

  const handleOnClick = () => {
    setLoading(true);
    handleSearch(title);
    setLoading(false);
  };
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleOnClick();
    }
  }

  return (
    <div className="search-content row mt-3">
      <div className="col-9">
        <Input
          placeholder="search"
          onChange={handlePokemonSearch}
          value={title}
          onKeyDown={handleKeyDown}
        />
      </div>
      <div className="col-3">
        <Button
          text="search"
          loading={loading}
          onClick={handleOnClick}
          className="search-button"
        />
      </div>
    </div>
  );
};

export default SearchContent;
