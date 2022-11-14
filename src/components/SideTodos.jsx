import React from "react";
import UserTodos from "./UserTodos";

const SideTodos = ({ selectedUser }) => {
  return (
    <div className="side-wrapper">
      <div className="side-header">
        <h2>Todos - User {selectedUser.id}</h2>
        <button>ADD</button>
      </div>
      <UserTodos todos={selectedUser.todos} />
    </div>
  );
};

export default SideTodos;
