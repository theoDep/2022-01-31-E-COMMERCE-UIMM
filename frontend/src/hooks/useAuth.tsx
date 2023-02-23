import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default () => {
  const { auth, setAuth } = useContext(AuthContext);

  const login = async (userInfo) => {
    setAuth(userInfo);
  };

  const logout = () => {
    setAuth(null);
    localStorage.removeItem("accessToken");
  };

  return { login, logout, user: auth };
};
