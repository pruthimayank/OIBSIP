import { useState } from "react";
import { Link } from "react-router-dom";

export default function Signup({ handleSignup }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    const isUserExist = existingUsers.some(
      (user) => user.username === username
    );

    if (isUserExist) {
      alert("Username already exists. Please choose a different username.");
    } else {
      handleSignup(username, password);
    }
  };

  const updateLocalStorage = (username, password) => {
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    const newId =
      existingUsers.length > 0
        ? existingUsers[existingUsers.length - 1].id + 1
        : 1;
    const newUser = { id: newId, username, password };
    const updatedUsers = [...existingUsers, newUser];
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleRegister}>Register</button>
      <Link to="/login">Login?</Link>
    </div>
  );
}
