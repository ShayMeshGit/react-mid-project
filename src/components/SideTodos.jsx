import React, { useState } from "react";
import UserTodos from "./UserTodos";
import TodoForm from "./TodoForm";
const SideTodos = ({ selectedUser, markCompleted, addTodo }) => {
  const [showForm, setShowForm] = useState(false);

  const cancel = () => {
    setShowForm(false);
  };

  const title = !showForm ? "Todos - " : "New Todo - ";
  return (
    <div className="side-wrapper">
      <div className="side-header">
        <h2>
          {title}User {selectedUser.id}
        </h2>
        {!showForm && <button onClick={() => setShowForm(true)}>ADD</button>}
      </div>
      {!showForm ? (
        <UserTodos todos={selectedUser.todos} markCompleted={markCompleted} />
      ) : (
        <TodoForm cancel={cancel} addTodo={addTodo} />
      )}
    </div>
  );
};

export default SideTodos;
