import { BrowserRouter } from 'react-router-dom';
import Layout from "@layout/index"; // Asegúrate que la ruta de importación es correcta
import { AccountProvider } from "@context/accountContext";
import { AuthProvider } from '@context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <AccountProvider>
        <BrowserRouter>
          <Layout />
        </BrowserRouter>
      </AccountProvider>
    </AuthProvider>
  );
}

export default App;
