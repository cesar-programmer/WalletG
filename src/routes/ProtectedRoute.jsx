import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '@context/AuthContext';

const ProtectedRoute = ({ element }) => {
  const { isLoggedIn } = useContext(AuthContext);

  return isLoggedIn ? element : <Navigate to="/signin" />;
};

export default ProtectedRoute;
