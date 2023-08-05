import "./styles.css";
import Home from "./pages/Home";
import Secured from "./pages/Secured";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Routes, Route } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { RequiresAuth } from "./components/RequiresAuth";
import { AuthContext } from "./index";
import { useLocation, useNavigate } from "react-router";

export default function App() {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const handleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
    navigate(location?.state?.from?.pathname);
  };
  return (
    <div className="App">
      <nav>
        <NavLink to="/">Home</NavLink> ||{" "}
        <NavLink to="/secured">Secured</NavLink> ||{" "}
        <NavLink to="/login">{isLoggedIn ? "Logout" : "Login"}</NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          }
        />
        <Route
          path="/secured"
          element={
            <RequiresAuth>
              <Secured />
            </RequiresAuth>
          }
        />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}
