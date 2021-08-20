import React from "react";
import './index.css';

const Card = (props) => {
    return (
        <div className="single-card">
          <h3>{ props.title }</h3>
          <img className="single-card-thumbnail"
            src={ props.thumbnail.path + '.' + props.thumbnail.extension }
            alt={ props.title }
          />
        </div>
    );
};

export default Card;