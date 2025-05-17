import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { validateUser } from "../services/authService";

const ProtectedRoute = ({ children }) => {
  const [isValid, setIsValid] = useState(null);
  const token = Cookies.get("token");

  useEffect(() => {
    const validate = async () => {
      if (!token) {
        setIsValid(false);
        return;
      }

      try {
        await validateUser(token);
        setIsValid(true);
      } catch (err) {
        console.error("Token validation failed:", err);
        Cookies.remove("token");
        setIsValid(false);
      }
    };

    validate();
  }, [token]);

  if (isValid === null) {
    return (
      <div className="flex justify-center items-center h-screen bg-white">
        <span className="loader"></span>
      </div>
    );
}

  return isValid ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
