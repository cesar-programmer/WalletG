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
  const [currentCard, setCurrentCard] = useState(null);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    if (isLoggedIn) {
      fetchAccounts();
      fetchTips();
      fetchFinanceGoals();
      fetchTransactions();
      console.log(transactions)
      console.log(accounts)
      if (!currentProfile) {
        fetchProfile();
      }
    }
  }, [isLoggedIn, currentProfile]);

  useEffect(() => {
    if (accounts.length > 0) {
      setCurrentCard(accounts[0]);
    } else {
      setCurrentCard(null);
    }
  }, [accounts]);

  const fetchProfile = useCallback(async () => {
    try {
      const response = await api.get('/api/users/me/profile/');
      setCurrentProfile(response.data);
      localStorage.setItem('profile', JSON.stringify(response.data));
    } catch (error) {
      console.error('Failed to fetch profile', error);
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
    } catch (error) {
      console.error("Failed to fetch accounts", error);
    }
  }, []);

  const fetchTransactions = useCallback(async () => {
    try {
      const response = await api.get('/api/transactions/list/');
      setTransactions(response.data);
    } catch (error) {
      console.error("Failed to fetch transactions", error);
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
        
        // Obtener datos del usuario
        const userResponse = await api.get('/api/users/me/');
        if (userResponse.status === 200) {
          setUser(userResponse.data);
          localStorage.setItem('isLoggedIn', JSON.stringify(true));
          localStorage.setItem('user', JSON.stringify(userResponse.data));
          
          // Cargar todos los datos del usuario
          await Promise.all([
            fetchProfile(),
            fetchAccounts(),
            fetchFinanceGoals(),
            fetchTransactions(),
            fetchTips()
          ]);
          
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
      const response = await axios.post('http://127.0.0.1:8000/api/users/', account);
      if (response.status === 201) {
        setUser(response.data.user);
        setIsLoggedIn(true);
        localStorage.setItem('isLoggedIn', JSON.stringify(true));
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        // Configurar token de acceso
        if (response.data.token) {
          localStorage.setItem('access_token', response.data.token.access);
          localStorage.setItem('refresh_token', response.data.token.refresh);
        }
        
        // Cargar todos los datos del usuario
        await Promise.all([
          fetchProfile(),
          fetchAccounts(),
          fetchFinanceGoals(),
          fetchTransactions(),
          fetchTips()
        ]);
        
        return true;
      }
    } catch (error) {
      console.error("Failed to create user and profile", error);
      return false;
    }
  };

  const deleteAccount = async (id) => {
    try {
      const response = await api.delete(`/api/account/${id}`);
      if (response.status === 204) {
        setAccounts(prev => prev.filter(account => account.id !== id));
        return true;
      }
    } catch (error) {
      console.error("Failed to delete account", error);
      return false;
    }
  };

  const onDeleteGoal = async (id) => {
    try {
      const response = await api.delete(`/api/goals/${id}`);
      if (response.status === 204) {
        setFinanceGoals(prev => prev.filter(goal => goal.ID_goal !== id));
        return true;
      }
    } catch (error) {
      console.error("Failed to delete goal", error);
      return false;
    }
  };

  const makeTransaction = async (transactionData) => {
    try {
      const fullTransactionData = {
        ID_account: parseInt(transactionData.ID_account, 10), // Convertir a número
        amount: parseFloat(transactionData.amount), // Convertir a número
        description: transactionData.description,
        type: transactionData.type === 'income' ? 1 : 2,
        date: new Date().toISOString().slice(0, 10),
      };
  
      console.log(fullTransactionData);
  
      const response = await api.post('/api/transactions/', fullTransactionData);
      if (response.status === 201) {
        setTransactions(prev => [...prev, response.data]);
        fetchAccounts();
        return true;
      }
    } catch (error) {
      console.error("Failed to make transaction", error);
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
      currentCard,
      transactions,
      makeTransaction,
      setCurrentCard,
      addFinanceGoal,
      updateFinanceGoal,
      handleSignIn,
      handleSignOut,
      fetchAccounts,
      addAccount,
      handleSignUp,
      deleteAccount,
      onDeleteGoal,
    }}>
      {children}
    </AccountContext.Provider>
  );
};

export default AccountContext;
