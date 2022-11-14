import React from "react";

const Post = ({ post }) => {
  return (
    <div className="item">
      <div className="item-attr">
        <label>Title:</label>
        <p>{post.title}</p>
      </div>
      <div className="item-attr">
        <label>Body:</label>
        <p>{post.body}</p>
      </div>
    </div>
  );
};

export default Post;
