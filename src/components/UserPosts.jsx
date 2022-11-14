import React from "react";
import Post from "./Post";

const UserPosts = ({ posts }) => {
  return (
    <section className="side-container">
      {posts.length > 0 ? (
        posts.map((post) => <Post key={post.id} post={post} />)
      ) : (
        <h2>This user does not have posts...</h2>
      )}
    </section>
  );
};

export default UserPosts;
