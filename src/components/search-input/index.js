import React from "react";
import './index.css';

const SearchInput = ({ id, text, placeholder, handleOnChange }) => {
  return (
    <div className="search-input">
      <label htmlFor={ id }>Search by { text }</label>
      <input 
        type="text" 
        id={ id } 
        placeholder={ placeholder } 
        onChange={ handleOnChange }
      />
    </div>
  );
};

export default SearchInput;