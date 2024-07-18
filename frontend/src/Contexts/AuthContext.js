import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();
export const UserContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [firstName, setFirstName] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          // fetching first name from signup
          const response = await axios.get(
            `${process.env.REACT_APP_API_BASE_URL}/api/user/profile`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const { firstname } = response.data;
          setFirstName(firstname);
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setIsLoggedIn(false);
      }
    };

    if (isLoggedIn) {
      fetchUserData();
    }
  }, [isLoggedIn]);

  const login = () => setIsLoggedIn(true);
  const logout = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/user/logout`);
      localStorage.removeItem("token");
      setIsLoggedIn(false);
      setFirstName("");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      <UserContext.Provider value={{ firstName }}>
        {children}
      </UserContext.Provider>
    </AuthContext.Provider>
  );
};
