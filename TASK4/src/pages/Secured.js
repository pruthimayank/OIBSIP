import { useNavigate } from "react-router-dom";

export default function Secured() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div>
      <h2>Secured Page</h2>
      <p>You have successfully logged in!</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
