import React, { useState } from "react";
import { axiosDelete, put } from "../utils/axios";
import { USERS_URL } from "../resources/URLs";

const User = ({ user, selectUser, updateUser, deleteUser, selectedUser }) => {
  const [userData, setUserData] = useState(user);
  const [show, setShow] = useState(false);

  const handleChange = (event) => {
    const { value } = event.target;
    setUserData((prev) => ({ ...prev, [event.target.name]: value }));
  };

  const handleAddressChange = (event) => {
    const { value } = event.target;
    setUserData((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        [event.target.name]: value,
      },
    }));
  };

  const closeOtherData = () => {
    setShow(false);
  };

  const showOtherData = () => {
    setShow(true);
  };

  const update = async () => {
    try {
      await put(USERS_URL, user.id, userData);
      updateUser(user.id, userData);
    } catch (err) {
      alert(err.message);
    }
  };

  const sendDeleteUser = async () => {
    try {
      await axiosDelete(USERS_URL, user.id);
      deleteUser(user.id);
    } catch (err) {
      alert(err.message);
    }
  };

  const isSelected = selectedUser?.id === user.id;

  return (
    <div
      className={`user-container ${
        !user.isAllCompleted ? "red-container" : ""
      } ${isSelected ? "selected" : ""}`}
    >
      <h2 onClick={() => selectUser(user.id)}>ID: {user.id}</h2>
      <div className="user-input">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={userData.name}
          onChange={handleChange}
        />
      </div>
      <div className="user-input">
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
        />
      </div>
      <div className="user-actions">
        <div className="left-actions">
          <button onMouseEnter={showOtherData} onClick={closeOtherData}>
            Other data
          </button>
        </div>
        <div className="right-actions">
          <button onClick={update}>update</button>
          <button onClick={sendDeleteUser}>delete</button>
        </div>
      </div>
      {show && (
        <div className="other-data">
          <div className="user-input">
            <label htmlFor="street">Street:</label>
            <input
              type="text"
              id="street"
              name="street"
              value={userData.address.street}
              onChange={handleAddressChange}
            />
          </div>
          <div className="user-input">
            <label htmlFor="city">City:</label>
            <input
              type="text"
              id="city"
              name="city"
              value={userData.address.city}
              onChange={handleAddressChange}
            />
          </div>
          <div className="user-input">
            <label htmlFor="zipcode">Zip Code:</label>
            <input
              type="text"
              id="zipcode"
              name="zipcode"
              value={userData.address.zipcode}
              onChange={handleAddressChange}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default User;
