import React, { useState } from "react";

const UserForm = ({ cancel, addUser }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { value } = e.target;
    setFormData((prev) => ({ ...prev, [e.target.name]: value }));
  };

  const add = async () => {
    setLoading(true);
    await addUser(formData);
    setLoading(false);
    cancel();
  };
  return (
    <div className="side-form-container">
      <div className="item-attr user-form">
        <label htmlFor="name">Name:</label>
        <input
          name={"name"}
          value={formData.name}
          id={"name"}
          onChange={handleChange}
        />
      </div>
      <div className="item-attr user-form">
        <label htmlFor="email">Email:</label>
        <input
          name={"email"}
          value={formData.email}
          id={"email"}
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

export default UserForm;
