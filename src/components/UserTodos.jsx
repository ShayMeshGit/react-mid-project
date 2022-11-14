import React from "react";
import Todo from "./Todo";
const UserTodos = ({ todos }) => {
  return (
    <section className="side-container">
      {todos.map((todo) => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </section>
  );
};

export default UserTodos;
