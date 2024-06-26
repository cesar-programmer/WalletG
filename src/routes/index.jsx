import { Routes, Route } from 'react-router-dom';
import Home from '@pages/Home';
import Profile from '@pages/Profile/Profile';
import Goal from '@pages/Goals/Goals';
import IncomeExpensesView from "@pages/IncomeExpensesView/IncomeExpensesView"
import SingIn from "@pages/SingIn/SingIn"
import CreateAccount from "@pages/CreateAccount/CreateAccount"
import AddCard from '@pages/AddCard/AddCard';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="profile" element={<Profile />} />
      <Route path="goals" element={<Goal />} />
      <Route path="IncomeExpensesView" element={<IncomeExpensesView />} />
      <Route path="signin" element={<SingIn />} />
      <Route path="createAccount" element={<CreateAccount />} />
      <Route path="addCard" element={<AddCard />} />
    </Routes>
  );
}

export default AppRoutes;
