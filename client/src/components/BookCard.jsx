import React from "react";
import "./BookCard.css";

const BookCard = ({ title, author, image, price, onBuy }) => {
  return (
    <div className="book-card">
      <img
        src={image}
        alt={title}
        className="book-card-image"
      />

      <h2 className="book-card-title">
        {title}
      </h2>

      <p className="book-card-author">
        {author}
      </p>

      <div className="book-card-footer">
        <span className="book-card-price">
          ₹{price}
        </span>

        <button
          onClick={onBuy}
          className="book-card-button"
        >
          Buy
        </button>
      </div>
    </div>
  );
};

export default BookCard;