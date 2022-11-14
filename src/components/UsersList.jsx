import React, { useState } from "react";
import User from "./User";

const UsersList = ({
  users,
  selectUser,
  updateUser,
  deleteUser,
  selectedUser,
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
        <input type="text" id="search" name="search" onChange={handleChange} />
        <img src="/search-icon.svg" alt="search" />
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
