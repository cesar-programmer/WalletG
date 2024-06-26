/* eslint-disable react/prop-types */
import { CCard, CCardBody, CCardHeader, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react';

const IncomeView = ({ incomes }) => {
  return (
    <CCard>
      <CCardHeader>Incomes</CCardHeader>
      <CCardBody>
        <CTable hover responsive>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>Date</CTableHeaderCell>
              <CTableHeaderCell>Amount</CTableHeaderCell>
              <CTableHeaderCell>Description</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {incomes.map((income, index) => (
              <CTableRow key={index}>
                <CTableDataCell>{income.date}</CTableDataCell>
                <CTableDataCell>${income.amount.toFixed(2)}</CTableDataCell>
                <CTableDataCell>{income.description}</CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CCardBody>
    </CCard>
  );
};

export default IncomeView;
