import { useState, useEffect } from 'react';
import IncomeView from "@components/IncomeView/IncomeView"
import ExpensesView from '@components/ExpensesView/ExpensesView';
import { CContainer, CRow, CCol } from '@coreui/react';

const IncomeExpensesView = () => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    setIncomes([{ date: '2024-06-01', amount: 2000, description: 'Salary' }]);
    setExpenses([{ date: '2024-06-02', amount: 500, description: 'Rent' }]);
  }, []);

  return (
    <CContainer className='expense-container' fluid>
      <CRow>
        <CCol md="6">
          <IncomeView incomes={incomes} />
        </CCol>
        <CCol md="6">
          <ExpensesView expenses={expenses} />
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default IncomeExpensesView;
