import React, { useState } from "react";

function ChecklistItem({ item, onToggle, onDelete, onUpdate }) {
  return (
    <div className="flex items-center my-2">
      <input
        type="checkbox"
        checked={item.checked}
        onChange={() => onToggle(item.id)}
        className="mr-2"
      />
      <input
        type="text"
        value={item.text}
        onChange={(e) => onUpdate(item.id, e.target.value)}
        className="w-full p-1 border-b-2 border-gray-200 focus:outline-none focus:border-blue-500"
      />
      <button
        onClick={() => onDelete(item.id)}
        className="ml-2 text-red-500 hover:text-red-700"
      >
        X
      </button>
    </div>
  );
}

function ChecklistBlock({ block, updateBlock, deleteBlock }) {
  const [items, setItems] = useState(block.content || []);

  const handleAddItem = () => {
    const newItem = { id: Date.now(), text: "", checked: false };
    const updatedItems = [...items, newItem];
    setItems(updatedItems);
    updateBlock(block.id, updatedItems);
  };

  const handleDeleteItem = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
    updateBlock(block.id, updatedItems);
  };

  const handleToggleChecked = (id) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(updatedItems);
    updateBlock(block.id, updatedItems);
  };

  const handleUpdateItemText = (id, text) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, text } : item
    );
    setItems(updatedItems);
    updateBlock(block.id, updatedItems);
  };

  return (
    <div className="my-2">
      {items.map((item) => (
        <ChecklistItem
          key={item.id}
          item={item}
          onToggle={handleToggleChecked}
          onDelete={handleDeleteItem}
          onUpdate={handleUpdateItemText}
        />
      ))}
      <button
        onClick={handleAddItem}
        className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
      >
        Add Item
      </button>
      <button
        onClick={() => deleteBlock(block.id)}
        className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
      >
        Delete Checklist
      </button>
    </div>
  );
}

export default ChecklistBlock;
