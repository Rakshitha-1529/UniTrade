import React from "react";

const BookCard = ({ title, author, image, price, onBuy }) => {
  return (
    <div className="bg-white shadow-md rounded-2xl p-4 w-64 hover:shadow-xl transition">
      <img
        src={image}
        alt={title}
        className="h-40 w-full object-cover rounded-lg"
      />
      <h2 className="text-lg font-semibold mt-3">{title}</h2>
      <p className="text-sm text-gray-500">{author}</p>

      <div className="flex justify-between items-center mt-3">
        <span className="text-blue-600 font-bold">₹{price}</span>
        <button
          onClick={onBuy}
          className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600"
        >
          Buy
        </button>
      </div>
    </div>
  );
};

export default BookCard;