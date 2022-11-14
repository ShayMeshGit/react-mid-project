import React from "react";
import UserPosts from "./UserPosts";

const SideTodos = ({ selectedUser }) => {
  return (
    <div className="side-wrapper">
      <div className="side-header"></div>
      <div className="side-header">
        <h2>Posts - User {selectedUser.id}</h2>
        <button>ADD</button>
      </div>
      <UserPosts posts={selectedUser.posts} />
    </div>
  );
};

export default SideTodos;
