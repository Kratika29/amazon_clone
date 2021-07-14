/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React from 'react';
import { Link } from 'react-router-dom';

// CSS
import '../../assets/css/category/Category.css';

function Category({
  id, title, image,
}) {
  const SearchMore = (e) => {
  };

  return (
    <div className="category">
      <p>{title}</p>
      <img className="category__image" src={image} alt={title} />
      <button>Add to Basket</button>
    </div>
  );
}

export default Category;