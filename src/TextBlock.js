import React, { useState } from "react";

function TextBlock({ block, updateBlock, deleteBlock }) {
  return (
    <div className="flex items-center">
      <textarea
        className="w-full p-2 border-gray-300 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={block.content}
        onChange={(e) => updateBlock(block.id, e.target.value)}
        placeholder="Type '/' for commands"
      ></textarea>
      <button
        onClick={() => deleteBlock(block.id)}
        className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
      >
        Delete
      </button>
    </div>
  );
}

export default TextBlock;
