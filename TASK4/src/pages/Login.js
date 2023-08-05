import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Login({ isLoggedIn, setIsLoggedIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("/db/users.json")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching user data:", error));
  }, []);

  const handleLogin = () => {
    const user = users.find((user) => user.name === username);

    if (!user) {
      alert("User not found. Please register or check your username.");
      return;
    }

    if (user.password === password) {
      setIsLoggedIn(true);
      navigate(location?.state?.from?.pathname);
    } else {
      alert("Invalid password");
    }
  };

  const handleLoginAsGuest = () => {
    setIsLoggedIn(true);
    setUsername("Guest");
    setPassword("");
    navigate(location?.state?.from?.pathname);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    setPassword("");
    navigate("/");
  };

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <h2>Want to logout?</h2>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <h2>Login Page</h2>
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
          <button onClick={handleLogin}>Login</button>
          <button onClick={handleLoginAsGuest}>Login as Guest</button>
          <Link to="/signup">Sign Up?</Link>
        </div>
      )}
    </div>
  );
}
