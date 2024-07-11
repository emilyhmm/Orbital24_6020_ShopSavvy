import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();
export const UserContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [firstName, setFirstName] = useState("");

  useEffect(() => {
    // fetching first name from signup
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/user/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        const { firstname } = response.data;
        setFirstName(firstname);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (isLoggedIn) {
      fetchUserData();
    }
  }, [isLoggedIn]);

  const login = () => setIsLoggedIn(true);
  const logout = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/user/logout`
      );
      // Handle the response if needed
      console.log(response.data);
    } catch (error) {
      console.error("Error during logout:", error);
    }

    setIsLoggedIn(false);
    setFirstName("");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      <UserContext.Provider value={{ firstName }}>
        {children}
      </UserContext.Provider>
    </AuthContext.Provider>
  );
};
