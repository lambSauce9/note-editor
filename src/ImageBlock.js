import React, { useState } from "react";

function ImageBlock({ block, updateBlock, deleteBlock }) {
  // If the image source is a URL or base64 string, initialize with that,
  // otherwise, it's an empty string.
  const [imageSrc, setImageSrc] = useState(block.content || "");

  // Handle file selection
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Use FileReader to read file content as a data URL
      const reader = new FileReader();
      reader.onload = (e) => {
        // Update local state and block content
        const newDataUrl = e.target.result;
        setImageSrc(newDataUrl);
        updateBlock(block.id, newDataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="my-2">
      {imageSrc && (
        <img
          src={imageSrc}
          alt="User uploaded content"
          className="w-full max-w-xs"
        />
      )}
      <input
        type="file"
        onChange={handleImageChange}
        accept="image/*"
        className="my-2"
      />
      <button
        onClick={() => deleteBlock(block.id)}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
      >
        Delete
      </button>
    </div>
  );
}

export default ImageBlock;
