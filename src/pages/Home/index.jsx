import CardCarousel from '@components/CardCarousel/CardCarousel';
import IaQA from '@components/IaQA/IaQA';
import FinancialDashboard from '@components/FinancialDashboard/FinancialDashboard';
import { CContainer, CRow, CCol } from '@coreui/react';

export default function Home() {
  return (
    <CContainer fluid>
      <CRow className="justify-content-center align-items-center mb-5">
        <CCol md={7} className="d-flex justify-content-center">
          <CardCarousel />
        </CCol>
        <CCol md={1} className="d-flex justify-content-center">
          <IaQA />
        </CCol>
      </CRow>
      <CRow className="justify-content-center align-items-center">
        <CCol md={12}>
          <FinancialDashboard />
        </CCol>
      </CRow>
    </CContainer>
  );
}