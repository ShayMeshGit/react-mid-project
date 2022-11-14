import React from "react";
import Todo from "./Todo";
const UserTodos = ({ todos, markCompleted }) => {
  return (
    <section className="side-container">
      {todos.length > 0 ? (
        todos.map((todo) => (
          <Todo key={todo.id} todo={todo} markCompleted={markCompleted} />
        ))
      ) : (
        <h2>This user does not have todos...</h2>
      )}
    </section>
  );
};

export default UserTodos;
