/* eslint-disable react/prop-types */
import { createContext, useState, useEffect,} from 'react';
import api from '@context/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => JSON.parse(localStorage.getItem('isLoggedIn')) || false);
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')) || {});

  const handleSignIn = async (email, password) => {
    try {
      const response = await api.post('/api/token/', { email, password });
      if (response.status === 200) {
        const { access, refresh } = response.data;
        localStorage.setItem('access_token', access);
        localStorage.setItem('refresh_token', refresh);
        localStorage.setItem('isLoggedIn', JSON.stringify(true));
        setIsLoggedIn(true);
        const userResponse = await api.get('/api/users/me/');
        if (userResponse.status === 200) {
          setUser(userResponse.data);
          localStorage.setItem('user', JSON.stringify(userResponse.data));
          return true;
        }
      }
    } catch (error) {
      console.error("Failed to sign in", error);
      return false;
    }
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
    setUser({});
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  };

  const handleSignUp = async (account) => {
    try {
      const response = await api.post('http://127.0.0.1:8000/api/users/', account);
      if (response.status === 201) {
        const { user } = response.data;
        setUser(user);
        localStorage.setItem('isLoggedIn', JSON.stringify(true));
        setIsLoggedIn(true);
        localStorage.setItem('user', JSON.stringify(user));
        return true;
      }
    } catch (error) {
      console.error("Failed to create user and profile", error);
      return false;
    }
  };

  useEffect(() => {
    const checkLoggedIn = async () => {
      const accessToken = localStorage.getItem('access_token');
      if (accessToken) {
        try {
          const userResponse = await api.get('/api/users/me/');
          if (userResponse.status === 200) {
            setUser(userResponse.data);
            setIsLoggedIn(true);
          }
        } catch (error) {
          console.error("Failed to fetch user", error);
        }
      }
    };
    checkLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, handleSignIn, handleSignOut, handleSignUp }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
