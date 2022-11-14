import "./App.css";
import { useState, useEffect } from "react";
import UsersList from "./components/UsersList";
import useAxios from "./hooks/useAxios";
import { USERS_URL, TODOS_URL, POSTS_URL } from "./resources/URLs";
import SideTodos from "./components/SideTodos";
import SidePosts from "./components/SidePosts";

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const { data } = useAxios(USERS_URL);
  const { data: todos } = useAxios(TODOS_URL);
  const { data: posts } = useAxios(POSTS_URL);

  //Modifies the Users Array to include user todos, posts and isAllCompleted
  useEffect(() => {
    if (!data || !todos || !posts) return;
    const users = data.map((user) => {
      const usersTodos = todos.filter((todo) => todo.userId === user.id);
      const usersPosts = posts.filter((post) => post.userId === user.id);
      const isAllCompleted = usersTodos.every((todo) => todo.completed);
      return {
        ...user,
        todos: usersTodos,
        posts: usersPosts,
        isAllCompleted,
      };
    });
    setUsers(users);
  }, [data, todos, posts]);

  const selectUser = (userId) => {
    const user = users.find((user) => user.id === userId);
    setSelectedUser(user);
  };

  const updateUser = (userId, data) => {
    setUsers((prev) =>
      prev.map((user) => {
        if (user.id === userId) {
          return data;
        }
        return user;
      })
    );
  };

  const deleteUser = (userId) => {
    setUsers((prev) => prev.filter((user) => user.id !== userId));
  };

  return (
    <div className="wrapper">
      {users && (
        <UsersList
          users={users}
          selectedUser={selectedUser}
          selectUser={selectUser}
          updateUser={updateUser}
          deleteUser={deleteUser}
        />
      )}
      {selectedUser ? (
        <div className="side-app">
          {selectedUser ? <SideTodos selectedUser={selectedUser} /> : null}

          {selectedUser ? <SidePosts selectedUser={selectedUser} /> : null}
        </div>
      ) : null}
    </div>
  );
}

export default App;
