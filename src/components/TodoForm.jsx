import React, { useState } from "react";

const TodoForm = ({ cancel, addTodo }) => {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const add = async () => {
    setLoading(true);
    await addTodo(title);
    setLoading(false);
    cancel();
  };
  return (
    <div className="side-form-container">
      <div className="item-attr user-form">
        <label htmlFor="title">Title:</label>
        <input value={title} id={"title"} onChange={handleChange} />
      </div>
      <div className="form-actions">
        <button onClick={cancel}>cancel</button>
        <button onClick={add} disabled={loading}>
          add
        </button>
      </div>
    </div>
  );
};

export default TodoForm;
