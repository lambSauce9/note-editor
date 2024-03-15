import React, { useEffect, useState } from "react";

function ListBlock({ block, updateBlock, deleteBlock }) {
  const [content, setContent] = useState(block.content);

  useEffect(() => {
    updateBlock(block.id, content);
  }, [content, updateBlock, block.id]);

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  const rows = content.split("\n").length || 1;

  return (
    <div className="my-2">
      <textarea
        className="w-full p-2 border-gray-300 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={content}
        onChange={handleChange}
        rows={rows}
        placeholder="Type each item and press Enter for a new item"
      ></textarea>
      <button
        onClick={() => deleteBlock(block.id)} // Ensuring this matches the expected function signature.
        className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
      >
        Delete
      </button>
    </div>
  );
}

export default ListBlock;
