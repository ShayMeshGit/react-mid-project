import React from "react";
import Post from "./Post";

const UserPosts = ({ posts }) => {
  return (
    <section className="side-container">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </section>
  );
};

export default UserPosts;
