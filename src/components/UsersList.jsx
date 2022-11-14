import React, { useState } from "react";
import User from "./User";

const UsersList = ({
  users,
  selectUser,
  updateUser,
  deleteUser,
  selectedUser,
  showUserForm,
}) => {
  const [searchValue, setSearchValue] = useState("");

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };

  const filterdUsers = users.filter(
    (user) =>
      user.name.includes(searchValue) || user.email.includes(searchValue)
  );

  return (
    <main className="app">
      <div className="search">
        <label htmlFor="search">Search</label>
        <div className="search-input">
          <img src="/search-icon.svg" alt="search" />
          <input
            type="text"
            id="search"
            name="search"
            onChange={handleChange}
          />
        </div>
        <button onClick={showUserForm}>Add</button>
      </div>
      {filterdUsers.length > 0 &&
        filterdUsers.map((user) => (
          <User
            key={user.id}
            user={user}
            selectedUser={selectedUser}
            selectUser={selectUser}
            updateUser={updateUser}
            deleteUser={deleteUser}
          />
        ))}
    </main>
  );
};

export default UsersList;
