import { CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilCalendar, cilDollar, cilPencil, cilBank } from '@coreui/icons';

const IncomeView = ({ incomes, accounts }) => {

  const getAccountName = (accountId) => {
    const account = accounts.find(acc => acc.id === accountId);
    return account ? account.Institution : 'Unknown Account';
  };

  return (
    <CTable hover responsive className="table-striped">
      <CTableHead className="bg-light">
        <CTableRow>
          <CTableHeaderCell><CIcon icon={cilCalendar} className="me-2" />Date</CTableHeaderCell>
          <CTableHeaderCell><CIcon icon={cilDollar} className="me-2" />Amount</CTableHeaderCell>
          <CTableHeaderCell><CIcon icon={cilPencil} className="me-2" />Description</CTableHeaderCell>
          <CTableHeaderCell><CIcon icon={cilBank} className="me-2" />Accounts</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        {incomes.map((income, index) => (
          <CTableRow key={index}>
            <CTableDataCell>{new Date(income.date).toLocaleDateString()}</CTableDataCell>
            <CTableDataCell className="text-success">${income.amount}</CTableDataCell>
            <CTableDataCell>{income.description}</CTableDataCell>
            <CTableDataCell>{getAccountName(income.ID_account)}</CTableDataCell>
          </CTableRow>
        ))}
      </CTableBody>
    </CTable>
  );
};

export default IncomeView;