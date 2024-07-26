import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();
export const UserContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

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
          const { firstname, lastname } = response.data;
          setFirstName(firstname);
          setLastName(lastname);
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

  useEffect(() => {
    // Check localStorage for login status
    if (localStorage.getItem("isLoggedIn") === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const login = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
  };

  const logout = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/user/logout`);
      localStorage.removeItem("token");
      setIsLoggedIn(false);
      localStorage.removeItem("isLoggedIn");
      setFirstName("");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      <UserContext.Provider value={{ firstName, setFirstName, lastName, setLastName }}>
        {children}
      </UserContext.Provider>
    </AuthContext.Provider>
  );
};
