import React, { useRef } from "react";

const User = ({ user, selectUser }) => {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  return (
    <div className="user-container">
      <h2 onClick={() => selectUser(user.id)}>ID: {user.id}</h2>
      <div className="user-input">
        <label htmlFor="name">Name:</label>
        <input type="text" name="name" ref={nameRef} />
        <label htmlFor="email">Email:</label>
        <input type="text" name="email" ref={emailRef} />
      </div>
    </div>
  );
};

export default User;
