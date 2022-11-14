import React from "react";

const Todo = ({ todo }) => {
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
      </div>
    </div>
  );
};

export default Todo;
