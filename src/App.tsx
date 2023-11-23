import { useState } from "react";
import "./App.css";

type Note = {
  id: number;
  title: string;
  content: string;
};

const App = () => {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: 1,
      title: "note title 1",
      content: "Content 1",
    },
    {
      id: 2,
      title: "note title 2",
      content: "Content 2",
    },
    {
      id: 3,
      title: "note title 3",
      content: "Content 3",
    },
    {
      id: 4,
      title: "note title 4",
      content: "Content 4",
    },
  ]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("title", title);
    console.log("content", content);

    const newNote: Note = {
      id: notes.length + 1,
      title: title,
      content: content,
    };

    setNotes([newNote, ...notes]);
    setTitle("");
    setContent("");
  };

  return (
    <div className="app-container">
      <form className="note-form" onSubmit={(e) => handleSubmit(e)}>
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
        <button type="submit">Add Note</button>
      </form>
      <div className="notes-grid">
        {notes.map((note) => (
          <div className="note-item">
            <div className="notes-header">
              <button>X</button>
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
