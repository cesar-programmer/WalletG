/* eslint-disable react/prop-types */
import { CCard, CCardBody, CCardHeader, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react';

const ExpensesView = ({ expenses }) => {
  return (
    <CCard>
      <CCardHeader>Expenses</CCardHeader>
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
            {expenses.map((expense, index) => (
              <CTableRow key={index}>
                <CTableDataCell>{expense.date}</CTableDataCell>
                <CTableDataCell>${expense.amount.toFixed(2)}</CTableDataCell>
                <CTableDataCell>{expense.description}</CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CCardBody>
    </CCard>
  );
};

export default ExpensesView;
