import React, { useState } from "react";

const Todo = ({ todo, markCompleted }) => {
  const [loading, setloading] = useState(false);

  const mark = async () => {
    setloading(true);
    try {
      await markCompleted(todo);
    } catch (err) {
      alert(err);
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="item">
      <div className="item-attr">
        <label>Title:</label>
        <p>{todo.title}</p>
      </div>
      <div className="item-attr completed">
        <label>Compelted:</label>
        <p>
          {!todo.completed ? (
            <img src="x-icon.svg" alt="x-icon" />
          ) : (
            <img src="v-icon.svg" alt="v-icon" />
          )}
        </p>
        <button disabled={loading} onClick={mark}>
          Mark Completed
        </button>
      </div>
    </div>
  );
};

export default Todo;
