import React from "react";
import './index.css';

const Button = ({ handleClick, text }) => (
  <button
    className="button"
    onClick={handleClick}
  >
    {text}
  </button>
);

export default Button;