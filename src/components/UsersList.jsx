import React from "react";
import User from "./User";

const UsersList = ({ users, selectUser }) => {
  return (
    <main className="app">
      {users.length > 0 &&
        users.map((user) => (
          <User key={user.id} user={user} selectUser={selectUser} />
        ))}
    </main>
  );
};

export default UsersList;
