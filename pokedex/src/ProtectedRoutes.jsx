import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoutes({ children }) {
  let navigate = useNavigate();
  const { isLoading, isAuthenticated } = useKindeAuth();

  function handleClick() {
    navigate('/login');
  }
  if (isLoading) {
    return <div>Loading...</div>
  }
  if (!isLoading && !isAuthenticated) {
    return (
      <div>
        <h2>Not Logged in, cannot access</h2>
        <button onClick={() => handleClick()}> Login or Register </button>
      </div>
    )
  }

  if (!isLoading && isAuthenticated) {
    return children;
  }
}