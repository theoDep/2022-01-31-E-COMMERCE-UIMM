import { useEffect, createContext, useState } from "react";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    const fetchUser = async (accessToken: string) => {
      const bearer = "Bearer " + accessToken;
      try {
        const response = await fetch("http://localhost:1337/api/users/me", {
          method: "GET",
          credentials: "include",
          headers: {
            Authorization: bearer,
            "Content-Type": "application/json",
          },
        });

        const user = await response.json();

        setAuth({ ...user });
      } catch (e) {}
    };

    if (accessToken) {
      fetchUser(accessToken);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
