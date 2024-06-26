/* eslint-disable react/prop-types */
import { createContext, useState, useCallback, useEffect } from "react";
import api from "@context/api";
import axios from "axios";

const AccountContext = createContext();

export const AccountProvider = ({ children }) => {
  const [accounts, setAccounts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(() => JSON.parse(localStorage.getItem('isLoggedIn')) || false);
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')) || {});
  const [tips, setTips] = useState([]);
  const [currentTip, setCurrentTip] = useState(null);
  const [financeGoals, setFinanceGoals] = useState([]);
  const [currentProfile, setCurrentProfile] = useState(() => JSON.parse(localStorage.getItem('profile')) || null);

  useEffect(() => {
    if (isLoggedIn) {
      fetchAccounts();
      fetchTips();
      fetchFinanceGoals();
      if (!currentProfile) {
        fetchProfile();
      }
      console.log(currentProfile);
      console.log(user);
      console.log(accounts);
    }
  }, [isLoggedIn, currentProfile]);

  const fetchProfile = useCallback(async () => {
    try {
      const response = await api.get('/api/users/me/profile/');
      setCurrentProfile(response.data);
      localStorage.setItem('profile', JSON.stringify(response.data)); // Guardar en localStorage
    } catch (error) {
      console.error("Failed to fetch profile", error);
    }
  }, []);

  const fetchFinanceGoals = useCallback(async () => {
    try {
      const response = await api.get('/api/goals/');
      setFinanceGoals(response.data);
    } catch (error) {
      console.error("Failed to fetch finance goals", error);
    }
  }, []);

  const fetchTips = useCallback(async () => {
    try {
      const response = await api.get('/api/tips/');
      setTips(response.data);
      if (response.data.length > 0) {
        setCurrentTip(response.data[Math.floor(Math.random() * response.data.length)]);
      }
    } catch (error) {
      console.error("Failed to fetch tips", error);
    }
  }, []);

  const fetchAccounts = useCallback(async () => {
    try {
      const response = await api.get('/api/account/');
      setAccounts(response.data);
      console.log(response, 'response');
    } catch (error) {
      console.error("Failed to fetch accounts", error);
    }
  }, []);

  const addFinanceGoal = async (goalData) => {
    try {
      const goalDataJson = {
        ...goalData,
        ID_user: user.id,
        description: goalData.description,
        amount: goalData.amount,
        date: goalData.date,
        achieved: false,
      };
      console.log(goalDataJson);
      const response = await api.post('/api/goals/', goalDataJson);
      if (response.status === 201) {
        setFinanceGoals(prev => [...prev, response.data]);
        return true;
      }
    } catch (error) {
      console.error("Failed to add finance goal", error);
      return false;
    }
  };

  const updateFinanceGoal = async (id, goalData) => {
    try {
      const response = await api.put(`/api/goals/${id}`, goalData);
      if (response.status === 200) {
        setFinanceGoals(prev => prev.map(goal => goal.ID_goal === id ? response.data : goal));
        return true;
      }
    } catch (error) {
      console.error("Failed to update finance goal", error);
      return false;
    }
  };

  const addAccount = async (accountData) => {
    try {
      const fullAccountData = {
        ...accountData,
        ID_user: user.id,
        ID_Type: accountData.typeId,
        ID_currency: accountData.currencyId,
        balance: accountData.balance || 300,
        Institution: accountData.institution || 'Default Bank',
        number: accountData.cardNumber,
      };
      console.log(user);
      console.log(fullAccountData);
      const response = await api.post('/api/account/', fullAccountData);
      if (response.status === 201) {
        setAccounts(prev => [...prev, response.data]);
        return true;
      }
    } catch (error) {
      console.error("Failed to add account", error);
      return false;
    }
  };

  const handleSignIn = async (email, password) => {
    try {
      const response = await api.post('/api/token/', { email, password });
      if (response.status === 200) {
        const { access, refresh } = response.data;
        localStorage.setItem('access_token', access);
        localStorage.setItem('refresh_token', refresh);
        setIsLoggedIn(true);
        fetchProfile();
        const userResponse = await api.get('/api/users/me/');
        if (userResponse.status === 200) {
          console.log(userResponse.data);
          setUser(userResponse.data);
          localStorage.setItem('isLoggedIn', JSON.stringify(true));
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
    setAccounts([]);
    setCurrentProfile(null);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    localStorage.removeItem('profile');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  };

  const handleSignUp = async (account) => {
    try {
      console.log(account);
      const response = await axios.post('http://127.0.0.1:8000/api/users/', account);
      if (response.status === 201) {
        setUser(response.data.user);
        setIsLoggedIn(true);
        localStorage.setItem('isLoggedIn', JSON.stringify(true));
        localStorage.setItem('user', JSON.stringify(response.data.user));
        fetchProfile();
        return true;
      }
    } catch (error) {
      console.error("Failed to create user and profile", error);
      return false;
    }
  };

  return (
    <AccountContext.Provider value={{
      accounts,
      isLoggedIn,
      user,
      tips,
      currentTip,
      currentProfile,
      financeGoals,
      addFinanceGoal,
      updateFinanceGoal,
      handleSignIn,
      handleSignOut,
      fetchAccounts,
      addAccount,
      handleSignUp,
    }}>
      {children}
    </AccountContext.Provider>
  );
};

export default AccountContext;
