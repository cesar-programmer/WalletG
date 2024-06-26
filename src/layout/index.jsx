import Navbar from "@components/Navbar/Navbar";
import AppRoutes from "@routes/index";
import { CContainer } from '@coreui/react';

export default function Layout() {
  return (
    <div className="container">
      <Navbar />
      <CContainer fluid className="mt-4">
        <AppRoutes />
      </CContainer>
    </div>
  );
}
