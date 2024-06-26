import { BrowserRouter } from 'react-router-dom';
import Layout from "@layout/index"; // Asegúrate que la ruta de importación es correcta
import { AccountProvider } from "@context/accountContext";

function App() {
  return (
    <AccountProvider>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </AccountProvider>
  );
}

export default App;
