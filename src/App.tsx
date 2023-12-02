import React, { useEffect, useState } from "react";

import { BASE_URL_SERVER } from "./config";
import "./App.css";

type Note = {
  id: number;
  title: string;
  content: string;
};

const App = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  useEffect(() => {
    const fetchNotes = async () => {
      debugger;
      try {
        const response = await fetch(`${BASE_URL_SERVER}/api/notes`);
        const notes: Note[] = await response.json();
        setNotes(notes);
      } catch (e) {
        console.error("e", e);
      }
    };
    fetchNotes();
  }, []);

  const handleNoteClick = (note: Note) => {
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`${BASE_URL_SERVER}/api/notes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
        }),
      });

      const newNote = await response.json();
      setNotes([newNote, ...notes]);
      setTitle("");
      setContent("");
    } catch (e) {
      console.error("e", e);
    }
  };

  const handleUpdateNote = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedNote) {
      return;
    }

    try {
      const response = await fetch(`${BASE_URL_SERVER}/api/notes/${selectedNote.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
        }),
      });

      const updatedNote = await response.json();

      const updatedNoteList = notes.map((note) =>
        note.id === selectedNote.id ? updatedNote : note
      );

      setNotes(updatedNoteList);
      setTitle("");
      setContent("");
      setSelectedNote(null);
    } catch (e) {
      console.error("e", e);
    }
  };

  const handleCancel = () => {
    setTitle("");
    setContent("");
    setSelectedNote(null);
  };

  const deleteNote = async (e: React.FormEvent, noteId: number) => {
    e.stopPropagation();

    try {
      const response = await fetch(`${BASE_URL_SERVER}/api/notes/${noteId}`, {
        method: "DELETE",
      });
      const updatedNote = notes.filter((note) => note.id !== noteId);
      setNotes(updatedNote);
    } catch (e) {
      console.error("e", e);
    }
  };

  return (
    <div className="app-container">
      <form
        className="note-form"
        onSubmit={(e) => (selectedNote ? handleUpdateNote(e) : handleAddNote(e))}
      >
        <input
          placeholder="title"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></input>
        <textarea
          placeholder="Content"
          rows={10}
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>

        {selectedNote ? (
          <div className="edit-buttons">
            <button type="submit">Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        ) : (
          <button type="submit">Add Note</button>
        )}
      </form>
      <div className="notes-grid">
        {notes.map((note) => (
          <div className="note-item" onClick={() => handleNoteClick(note)}>
            <div className="notes-header">
              <button onClick={(e) => deleteNote(e, note.id)}>X</button>
            </div>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
