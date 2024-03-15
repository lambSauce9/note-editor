import React, { useState } from "react";
import "./App.css";
import TextBlock from "./TextBlock";
import HeadingBlock from "./HeadingBlock";
import ListBlock from "./ListBlock";
import TableBlock from "./TableBlock";
import ImageBlock from "./ImageBlock";
import ChecklistBlock from "./ChecklistBlock";

function App() {
  const [notes, setNotes] = useState([]);
  const [selectedNoteId, setSelectedNoteId] = useState(null);

  const deleteNote = (noteId) => {
    setNotes(notes.filter((note) => note.id !== noteId));
    // Deselect the note if it's the one being deleted
    if (noteId === selectedNoteId) {
      setSelectedNoteId(null);
    }
  };

  const addNote = () => {
    const newNote = {
      id: Date.now(),
      title: `Note ${notes.length + 1}`,
      blocks: [],
    };
    setNotes([...notes, newNote]);
    setSelectedNoteId(newNote.id);
  };

  const addBlock = (noteId, type) => {
    let initialContent = "";
    if (type === "list") {
      initialContent = "List Item 1\nList Item 2"; // Example initial content for list
    } else if (type === "table") {
      initialContent = "Header 1,Header 2\nCell 1,Cell 2"; // Example initial content for table
    }
    const updatedNotes = notes.map((note) => {
      if (note.id === noteId) {
        const newBlock = { id: Date.now(), type, content: "" };
        return { ...note, blocks: [...note.blocks, newBlock] };
      }
      return note;
    });
    setNotes(updatedNotes);
  };

  const updateNoteTitle = (noteId, title) => {
    const updatedNotes = notes.map((note) =>
      note.id === noteId ? { ...note, title } : note
    );
    setNotes(updatedNotes);
  };

  const updateBlock = (blockId, content) => {
    const updatedNotes = notes.map((note) => {
      const updatedBlocks = note.blocks.map((block) =>
        block.id === blockId ? { ...block, content } : block
      );
      return { ...note, blocks: updatedBlocks };
    });
    setNotes(updatedNotes);
  };

  const deleteBlock = (noteId, blockId) => {
    const updatedNotes = notes.map((note) => {
      if (note.id === noteId) {
        const updatedBlocks = note.blocks.filter(
          (block) => block.id !== blockId
        );
        return { ...note, blocks: updatedBlocks };
      }
      return note;
    });
    setNotes(updatedNotes);
  };

  function moveBlock(noteId, blockId, direction) {
    setNotes(
      notes.map((note) => {
        if (note.id === noteId) {
          const index = note.blocks.findIndex((block) => block.id === blockId);
          if (index !== -1) {
            // Swap the block with its neighbor based on the direction
            const newIndex = direction === "up" ? index - 1 : index + 1;
            if (newIndex >= 0 && newIndex < note.blocks.length) {
              const newBlocks = Array.from(note.blocks);
              [newBlocks[index], newBlocks[newIndex]] = [
                newBlocks[newIndex],
                newBlocks[index],
              ]; // Swap elements
              return { ...note, blocks: newBlocks };
            }
          }
        }
        return note;
      })
    );
  }

  const selectedNote = notes.find((note) => note.id === selectedNoteId);

  return (
    <div className="App flex h-screen bg-gray-100">
      <div className="w-64 p-5 bg-black overflow-auto text-white">
        <button
          onClick={addNote}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Add Note
        </button>
        <div className="mt-5">
          {notes.map((note) => (
            <div
              key={note.id}
              className={`p-4 flex justify-between items-center cursor-pointer ${
                note.id === selectedNoteId ? "bg-blue-100" : ""
              }`}
              onClick={() => setSelectedNoteId(note.id)}
            >
              <span>{note.title}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteNote(note.id);
                }}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-xs"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1 p-10">
        {selectedNote && (
          <>
            <input
              type="text"
              value={selectedNote.title}
              onChange={(e) => updateNoteTitle(selectedNote.id, e.target.value)}
              className="w-full p-2 text-3xl font-bold mb-4 border-gray-300 border-b focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Note Title"
            />
            <div className="space-y-4">
              <button
                onClick={() => addBlock(selectedNote.id, "text")}
                className="mr-2 p-2 bg-blue-500 text-white"
              >
                Add Text Block
              </button>
              <button
                onClick={() => addBlock(selectedNote.id, "heading")}
                className="mr-2 p-2 bg-green-500 text-white"
              >
                Add Heading Block
              </button>
              <button
                onClick={() => addBlock(selectedNote.id, "list")}
                className="mr-2 p-2 bg-yellow-500 text-white"
              >
                Add List Block
              </button>
              <button
                onClick={() => addBlock(selectedNote.id, "table")}
                className="mr-2 p-2 bg-purple-500 text-white"
              >
                Add Table Block
              </button>
              <button
                onClick={() => addBlock(selectedNote.id, "checklist")}
                className="mr-2 p-2 bg-gray-500 text-white"
              >
                Add Checklist Block
              </button>
              <button
                onClick={() => addBlock(selectedNote.id, "image")}
                className="p-2 bg-red-500 text-white"
              >
                Add Image Block
              </button>
              {selectedNote.blocks.map((block, index) => {
                const canMoveUp = index > 0;
                const canMoveDown = index < selectedNote.blocks.length - 1;

                switch (block.type) {
                  case "text":
                    return (
                      <div key={block.id}>
                        <TextBlock
                          key={block.id}
                          block={block}
                          updateBlock={updateBlock}
                          deleteBlock={() =>
                            deleteBlock(selectedNote.id, block.id)
                          }
                        />
                        {canMoveUp && (
                          <button
                            onClick={() =>
                              moveBlock(selectedNote.id, block.id, "up")
                            }
                          >
                            Up
                          </button>
                        )}
                        {canMoveDown && (
                          <button
                            onClick={() =>
                              moveBlock(selectedNote.id, block.id, "down")
                            }
                          >
                            Down
                          </button>
                        )}
                      </div>
                    );
                  case "heading":
                    return (
                      <div key={block.id}>
                        <HeadingBlock
                          key={block.id}
                          block={block}
                          updateBlock={updateBlock}
                          deleteBlock={() =>
                            deleteBlock(selectedNote.id, block.id)
                          }
                        />
                        {canMoveUp && (
                          <button
                            onClick={() =>
                              moveBlock(selectedNote.id, block.id, "up")
                            }
                          >
                            Up
                          </button>
                        )}
                        {canMoveDown && (
                          <button
                            onClick={() =>
                              moveBlock(selectedNote.id, block.id, "down")
                            }
                          >
                            Down
                          </button>
                        )}
                      </div>
                    );
                  case "list":
                    return (
                      <div key={block.id}>
                        {" "}
                        <ListBlock
                          key={block.id}
                          block={block}
                          updateBlock={updateBlock}
                          deleteBlock={() =>
                            deleteBlock(selectedNote.id, block.id)
                          }
                        />
                        {canMoveUp && (
                          <button
                            onClick={() =>
                              moveBlock(selectedNote.id, block.id, "up")
                            }
                          >
                            Up
                          </button>
                        )}
                        {canMoveDown && (
                          <button
                            onClick={() =>
                              moveBlock(selectedNote.id, block.id, "down")
                            }
                          >
                            Down
                          </button>
                        )}
                      </div>
                    );
                  case "table":
                    return (
                      <div key={block.id}>
                        <TableBlock
                          key={block.id}
                          block={block}
                          updateBlock={updateBlock}
                          deleteBlock={() =>
                            deleteBlock(selectedNote.id, block.id)
                          }
                        />
                        {canMoveUp && (
                          <button
                            onClick={() =>
                              moveBlock(selectedNote.id, block.id, "up")
                            }
                          >
                            Up
                          </button>
                        )}
                        {canMoveDown && (
                          <button
                            onClick={() =>
                              moveBlock(selectedNote.id, block.id, "down")
                            }
                          >
                            Down
                          </button>
                        )}
                      </div>
                    );
                  case "image":
                    return (
                      <div key={block.id}>
                        <ImageBlock
                          key={block.id}
                          block={block}
                          updateBlock={updateBlock}
                          deleteBlock={() =>
                            deleteBlock(selectedNote.id, block.id)
                          }
                        />
                        {canMoveUp && (
                          <button
                            onClick={() =>
                              moveBlock(selectedNote.id, block.id, "up")
                            }
                          >
                            Up
                          </button>
                        )}
                        {canMoveDown && (
                          <button
                            onClick={() =>
                              moveBlock(selectedNote.id, block.id, "down")
                            }
                          >
                            Down
                          </button>
                        )}
                      </div>
                    );
                  case "checklist":
                    return (
                      <div key={block.id}>
                        <ChecklistBlock
                          key={block.id}
                          block={block}
                          updateBlock={updateBlock}
                          deleteBlock={() =>
                            deleteBlock(selectedNote.id, block.id)
                          }
                        />
                        {canMoveUp && (
                          <button
                            onClick={() =>
                              moveBlock(selectedNote.id, block.id, "up")
                            }
                          >
                            Up
                          </button>
                        )}
                        {canMoveDown && (
                          <button
                            onClick={() =>
                              moveBlock(selectedNote.id, block.id, "down")
                            }
                          >
                            Down
                          </button>
                        )}
                      </div>
                    );
                  default:
                    return null;
                }
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
