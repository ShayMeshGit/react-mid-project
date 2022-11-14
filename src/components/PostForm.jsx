import React, { useState } from "react";

const PostForm = ({ cancel, addPost }) => {
  const [formData, setFormData] = useState({
    title: "",
    body: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { value } = e.target;
    setFormData((prev) => ({ ...prev, [e.target.name]: value }));
  };

  const add = async () => {
    setLoading(true);
    await addPost(formData);
    setLoading(false);
    cancel();
  };
  return (
    <div className="side-form-container">
      <div className="item-attr user-form">
        <label htmlFor="title">Title:</label>
        <input
          name={"title"}
          value={formData.title}
          id={"title"}
          onChange={handleChange}
        />
      </div>
      <div className="item-attr user-form">
        <label htmlFor="body">Body:</label>
        <input
          name={"body"}
          value={formData.body}
          id={"body"}
          onChange={handleChange}
        />
      </div>
      <div className="form-actions">
        <button onClick={cancel}>cancel</button>
        <button onClick={add} disabled={loading}>
          add
        </button>
      </div>
    </div>
  );
};

export default PostForm;
