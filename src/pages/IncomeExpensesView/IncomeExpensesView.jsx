import { useContext, useState, useEffect } from 'react';
import AccountContext from '@context/accountContext';
import IncomeView from "@components/IncomeView/IncomeView";
import ExpensesView from '@components/ExpensesView/ExpensesView';
import { CContainer, CRow, CCol, CCard, CCardBody, CCardHeader, CSpinner } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilMoney, cilChart } from '@coreui/icons';

const IncomeExpensesView = () => {
  const { transactions, accounts } = useContext(AccountContext);
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const { incomes, expenses } = sortTransactions(transactions);
    setIncomes(incomes);
    setExpenses(expenses);
    setIsLoading(false);
  }, [transactions]);

  const sortTransactions = (transactions) => {
    console.log("transactions", transactions);
    const incomes = [];
    const expenses = [];
    transactions.forEach(transaction => {
      if (transaction.type === 1) {
        incomes.push(transaction);
      } else {
        expenses.push(transaction);
      }
    });
    return { incomes, expenses };
  };

  if (isLoading) {
    return (
      <CContainer className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <CSpinner color="primary" />
      </CContainer>
    );
  }

  return (
    <CContainer className='expense-container' fluid>
      <CCard className="mb-4 shadow-sm">
        <CCardHeader className="bg-light">
          <h2 className="mb-0">Financial Overview</h2>
        </CCardHeader>
        <CCardBody>
          <CRow>
            <CCol md="6" className="mb-4 mb-md-0">
              <CCard className="h-100 border-primary">
                <CCardHeader className="bg-primary text-white d-flex align-items-center">
                  <CIcon icon={cilMoney} className="me-2" /> Income Summary
                </CCardHeader>
                <CCardBody>
                  <IncomeView incomes={incomes} accounts={accounts} />
                </CCardBody>
              </CCard>
            </CCol>
            <CCol md="6">
              <CCard className="h-100 border-danger">
                <CCardHeader className="bg-danger text-white d-flex align-items-center">
                  <CIcon icon={cilChart} className="me-2" /> Expense Summary
                </CCardHeader>
                <CCardBody>
                  <ExpensesView expenses={expenses} accounts={accounts}/>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </CContainer>
  );
};

export default IncomeExpensesView;