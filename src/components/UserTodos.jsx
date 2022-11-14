import React from "react";
import Todo from "./Todo";
const UserTodos = ({ todos, markCompleted }) => {
  return (
    <section className="side-container">
      {todos.map((todo) => (
        <Todo key={todo.id} todo={todo} markCompleted={markCompleted} />
      ))}
    </section>
  );
};

export default UserTodos;
