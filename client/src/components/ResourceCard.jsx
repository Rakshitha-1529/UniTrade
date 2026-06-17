import React from "react";

const ResourceCard = ({ title, type, size, onDownload }) => {
  return (
    <div className="bg-gray-100 p-4 rounded-xl shadow-sm hover:shadow-md transition w-72">
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="text-sm text-gray-500">
        {type} • {size}
      </p>

      <button
        onClick={onDownload}
        className="mt-3 w-full bg-green-500 text-white py-1.5 rounded-lg hover:bg-green-600"
      >
        Download
      </button>
    </div>
  );
};

export default ResourceCard;