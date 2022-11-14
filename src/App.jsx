import "./App.css";
import { useState, useEffect } from "react";
import { getAll, getByUserId } from "./utils/axios";
import UsersList from "./components/UsersList";
import UserPosts from "./components/UserPosts";
import UserTodos from "./components/UserTodos";

const USERS_URL = "https://jsonplaceholder.typicode.com/users";
const TODOS_URL = "https://jsonplaceholder.typicode.com/todos";
const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userTodos, setUserTodos] = useState(null);
  const [userPosts, setUserPosts] = useState(null);

  useEffect(() => {
    const abortContoller = new AbortController();

    const fetchUsers = async () => {
      const { data } = await getAll(USERS_URL, abortContoller);
      setUsers(data);
    };

    fetchUsers();

    return () => abortContoller.abort();
  }, []);

  useEffect(() => {
    if (!selectedUser) return;
    const todosAbortContoller = new AbortController();
    const postsAbortContoller = new AbortController();

    const fetchUserTodos = async () => {
      const { data } = await getByUserId(
        TODOS_URL,
        selectedUser.id,
        todosAbortContoller
      );
      return data;
    };

    const fetchUsersPosts = async () => {
      const { data } = await getByUserId(
        POSTS_URL,
        selectedUser.id,
        postsAbortContoller
      );
      return data;
    };

    const fetchData = async () => {
      const [todos, posts] = await Promise.all([
        fetchUserTodos(),
        fetchUsersPosts(),
      ]);
      setUserTodos(todos);
      setUserPosts(posts);
    };

    fetchData();

    return () => {
      postsAbortContoller.abort();
      todosAbortContoller.abort();
    };
  }, [selectedUser]);

  const selectUser = (userId) => {
    const user = users.find((user) => user.id === userId);
    setSelectedUser(user);
  };

  return (
    <div className="wrapper">
      <UsersList users={users} selectUser={selectUser} />
      {selectedUser ? (
        <div className="side-app">
          {userTodos && userTodos.length > 0 ? (
            <UserTodos todos={userTodos} />
          ) : null}

          {userPosts && userPosts.length > 0 ? (
            <UserPosts posts={userPosts} />
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

export default App;
