import React, { useState } from "react";

function HeadingBlock({ block, updateBlock, deleteBlock }) {
  return (
    <div className="flex items-center">
      <input
        type="text"
        className="w-full p-2 text-2xl font-bold mb-2 border-gray-300 border-b focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={block.content}
        onChange={(e) => updateBlock(block.id, e.target.value)}
        placeholder="Heading"
      />
      <button
        onClick={() => deleteBlock(block.id)}
        className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
      >
        Delete
      </button>
    </div>
  );
}

export default HeadingBlock;
