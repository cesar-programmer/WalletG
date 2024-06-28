import { Routes, Route } from 'react-router-dom';
import Home from '@pages/Home';
import Profile from '@pages/Profile/Profile';
import Goal from '@pages/Goals/Goals';
import IncomeExpensesView from "@pages/IncomeExpensesView/IncomeExpensesView";
import SingIn from "@pages/SingIn/SingIn";
import CreateAccount from "@pages/CreateAccount/CreateAccount";
import AddCard from '@pages/AddCard/AddCard';
import CreateTransaction from '@pages/CreateTransaction/CreateTransaction';
import ProtectedRoute from './ProtectedRoute';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="profile" element={<ProtectedRoute element={<Profile />} />} />
      <Route path="goals" element={<ProtectedRoute element={<Goal />} />} />
      <Route path="IncomeExpensesView" element={<ProtectedRoute element={<IncomeExpensesView />} />} />
      <Route path="signin" element={<SingIn />} />
      <Route path="createAccount" element={<CreateAccount />} />
      <Route path="addCard" element={<ProtectedRoute element={<AddCard />} />} />
      <Route path="makeTransactions" element={<ProtectedRoute element={<CreateTransaction />} />} />
    </Routes>
  );
}

export default AppRoutes;
