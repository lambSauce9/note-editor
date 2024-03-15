import React, { useState } from "react";

function TableBlock({ block, updateBlock, deleteBlock }) {
  // Initialize state for rows and columns
  const [tableData, setTableData] = useState(() => {
    // Convert the block content into a manageable array structure
    const rows = block.content.split("\n").map((row) => row.split(","));
    return rows.length > 0 ? rows : [[""]];
  });

  // Update the block content whenever tableData changes
  const updateTableContent = () => {
    const content = tableData.map((row) => row.join(",")).join("\n");
    updateBlock(block.id, content);
  };

  // Add a new column to the end of each row
  const addColumn = () => {
    const updatedTableData = tableData.map((row) => [...row, ""]);
    setTableData(updatedTableData);
    updateTableContent();
  };

  // Add a new row at the end of the table
  const addRow = () => {
    const newRow = new Array(tableData[0].length).fill("");
    setTableData([...tableData, newRow]);
    updateTableContent();
  };

  // Delete a column from each row
  const deleteColumn = (colIndex) => {
    if (tableData[0].length > 1) {
      const updatedTableData = tableData.map((row) =>
        row.filter((_, index) => index !== colIndex)
      );
      setTableData(updatedTableData);
      updateTableContent();
    }
  };

  // Delete a specific row from the table
  const deleteRow = (rowIndex) => {
    if (tableData.length > 1) {
      const updatedTableData = tableData.filter(
        (_, index) => index !== rowIndex
      );
      setTableData(updatedTableData);
      updateTableContent();
    }
  };

  // Handle cell content change
  const handleCellChange = (rowIndex, colIndex, value) => {
    const updatedTableData = [...tableData];
    updatedTableData[rowIndex][colIndex] = value;
    setTableData(updatedTableData);
    updateTableContent();
  };

  const renderTableHeaders = () => {
    return (
      <tr>
        {tableData[0].map((_, colIndex) => (
          <th key={colIndex} className="border border-gray-400 px-4 py-2">
            {colIndex + 1}
            {tableData[0].length > 1 && ( // Only show delete button if more than one column
              <button
                onClick={() => deleteColumn(colIndex)}
                title="Delete Column"
                className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
              >
                X
              </button>
            )}
          </th>
        ))}
        <th>Actions</th>
      </tr>
    );
  };

  return (
    <div className="flex flex-col items-center my-2">
      <table className="table-auto border-collapse border border-gray-500">
        <thead>{renderTableHeaders()}</thead>
        <tbody>
          {tableData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => (
                <td key={colIndex} className="border border-gray-400 px-4 py-2">
                  <input
                    type="text"
                    value={cell}
                    onChange={(e) =>
                      handleCellChange(rowIndex, colIndex, e.target.value)
                    }
                    className="w-full p-1"
                  />
                </td>
              ))}
              <td className="border border-gray-400 px-4 py-2">
                {tableData.length > 1 && ( // Only show delete button if more than one row
                  <button
                    onClick={() => deleteRow(rowIndex)}
                    title="Delete Row"
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                  >
                    X
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={addRow} className="bg-green-500 text-white p-1 my-2">
        Add Row
      </button>
      {tableData[0] &&
        tableData[0].length > 0 && ( // Only show add column button if there's at least one column
          <button
            onClick={addColumn}
            className="bg-green-500 text-white p-1 my-2"
          >
            Add Column
          </button>
        )}
      <button
        onClick={() => deleteBlock(block.id)}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded mt-2"
      >
        Delete Table
      </button>
    </div>
  );
}

export default TableBlock;
