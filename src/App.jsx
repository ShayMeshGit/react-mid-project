import "./App.css";
import { useState, useEffect } from "react";
import UsersList from "./components/UsersList";
import useAxios from "./hooks/useAxios";
import { USERS_URL, TODOS_URL, POSTS_URL } from "./resources/URLs";
import SideTodos from "./components/SideTodos";
import SidePosts from "./components/SidePosts";
import { put, post } from "./utils/axios";
import UserForm from "./components/UserForm";

function App() {
  const [showForm, setShowForm] = useState(false);
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
          const isAllCompleted = data.todos.every((todo) => todo.completed);
          return { ...data, isAllCompleted };
        }
        return user;
      })
    );
  };

  const deleteUser = (userId) => {
    setUsers((prev) => prev.filter((user) => user.id !== userId));
    if (userId === selectedUser.id) {
      setSelectedUser(null);
    }
  };

  const markCompleted = async (newTodo) => {
    try {
      await put(TODOS_URL, newTodo.id, { ...newTodo, completed: true });
    } catch (err) {
    } finally {
      setUsers((prev) => {
        const userIndex = prev.findIndex((user) => user.id === selectedUser.id);
        const newTodos = prev[userIndex].todos.map((todo) => {
          if (todo.id === newTodo.id) {
            todo.completed = true;
            return todo;
          }
          return todo;
        });
        const isAllCompleted = newTodos.every((todo) => todo.completed);
        const newUser = { ...prev[userIndex], todos: newTodos, isAllCompleted };
        prev.splice(userIndex, 1, newUser);
        setSelectedUser(newUser);
        return prev;
      });
    }
  };

  const addTodo = async (title) => {
    const newTodo = {
      title,
      completed: false,
      userId: selectedUser.id,
    };
    const { data } = await post(TODOS_URL, newTodo);
    setUsers((prev) => {
      const userIndex = prev.findIndex((user) => user.id === selectedUser.id);
      const newTodos = [...prev[userIndex].todos, { ...newTodo, id: data.id }];
      const isAllCompleted = newTodos.every((todo) => todo.completed);
      const newUser = {
        ...prev[userIndex],
        todos: newTodos,
        isAllCompleted,
      };
      prev.splice(userIndex, 1, newUser);
      setSelectedUser(newUser);
      return prev;
    });
  };

  const addPost = async ({ title, body }) => {
    const newPost = {
      title,
      body,
      userId: selectedUser.id,
    };
    const { data } = await post(POSTS_URL, newPost);
    setUsers((prev) => {
      const userIndex = prev.findIndex((user) => user.id === selectedUser.id);
      const newPosts = [...prev[userIndex].posts, { ...newPost, id: data.id }];
      const newUser = {
        ...prev[userIndex],
        posts: newPosts,
      };
      prev.splice(userIndex, 1, newUser);
      setSelectedUser(newUser);
      return prev;
    });
  };

  const showUserForm = () => {
    setSelectedUser(null);
    setShowForm(true);
  };

  const cancel = () => {
    setShowForm(false);
  };

  const addUser = async ({ name, email }) => {
    const newUser = {
      name,
      email,
      address: {
        city: "",
        street: "",
        zipcode: "",
      },
      todos: [],
      posts: [],
    };
    const { data } = await post(USERS_URL, newUser);
    setUsers((prev) => [...prev, { ...newUser, id: data.id }]);
  };

  return (
    <div className="wrapper">
      {users && (
        <UsersList
          showUserForm={showUserForm}
          users={users}
          selectedUser={selectedUser}
          selectUser={selectUser}
          updateUser={updateUser}
          deleteUser={deleteUser}
        />
      )}
      {selectedUser ? (
        <div className="side-app">
          {selectedUser ? (
            <SideTodos
              markCompleted={markCompleted}
              selectedUser={selectedUser}
              addTodo={addTodo}
            />
          ) : null}

          {selectedUser ? (
            <SidePosts selectedUser={selectedUser} addPost={addPost} />
          ) : null}
        </div>
      ) : showForm ? (
        <UserForm cancel={cancel} addUser={addUser} />
      ) : null}
    </div>
  );
}

export default App;
