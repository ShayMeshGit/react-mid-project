import React, { useState } from "react";
import PostForm from "./PostForm";
import UserPosts from "./UserPosts";

const SideTodos = ({ selectedUser, addPost }) => {
  const [showForm, setShowForm] = useState(false);

  const cancel = () => {
    setShowForm(false);
  };

  const title = !showForm ? "Posts - " : "New Post - ";
  return (
    <div className="side-wrapper">
      <div className="side-header"></div>
      <div className="side-header">
        <h2>
          {title}User {selectedUser.id}
        </h2>
        <button onClick={() => setShowForm(true)}>ADD</button>
      </div>
      {!showForm ? (
        <UserPosts posts={selectedUser.posts} />
      ) : (
        <PostForm cancel={cancel} addPost={addPost} />
      )}
    </div>
  );
};

export default SideTodos;
