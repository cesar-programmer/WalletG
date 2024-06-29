import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CCard,
  CCardHeader,
  CCardBody,
  CForm,
  CFormLabel,
  CFormInput,
  CFormSelect,
  CButton,
  CAlert,
  CRow,
  CCol
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilDollar, cilSwapVertical, cilBank } from '@coreui/icons';
import AccountContext from '@context/accountContext';

export default function CreateTransaction() {
  const navigate = useNavigate();
  const { accounts, makeTransaction } = useContext(AccountContext);
  const [transactionObject, setTransactionObject] = useState({
    amount: '',
    type: '',
    ID_account: '',
    description: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setTransactionObject(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(transactionObject);
    const transactionData = {
      amount: transactionObject.amount,
      type: transactionObject.type,
      ID_account: transactionObject.ID_account,
      description: transactionObject.description
    };
    if (await makeTransaction(transactionData)) {
      navigate('/');
    } else {
      setError('Failed to create transaction. Please check your input and try again.');
    }
  }

  return (
    <CCard className="shadow" style={{ marginBottom: '50px' }}>
      <CCardHeader className="bg-primary text-white">
        <h2 className="mb-0">Create Transaction</h2>
      </CCardHeader>
      <CCardBody className="p-4">
        {error && <CAlert color="danger" className="d-flex align-items-center">
          <CIcon icon={cilBank} className="flex-shrink-0 me-2" width={24} height={24} />
          <div>{error}</div>
        </CAlert>}
        <CForm onSubmit={handleSubmit}>
          <CRow>
            <CCol md={6}>
              <div className="mb-3">
                <CFormLabel htmlFor="amount">Amount</CFormLabel>
                <div className="input-group">
                  <span className="input-group-text"><CIcon icon={cilDollar} /></span>
                  <CFormInput
                    type="number"
                    id="amount"
                    value={transactionObject.amount}
                    onChange={handleChange}
                    placeholder="Enter amount"
                    name="amount"
                  />
                </div>
              </div>
            </CCol>
            <CCol md={6}>
              <div className="mb-3">
                <CFormLabel htmlFor="type">Type</CFormLabel>
                <div className="input-group">
                  <span className="input-group-text"><CIcon icon={cilSwapVertical} /></span>
                  <CFormSelect id="type" value={transactionObject.type} onChange={handleChange} name="type">
                    <option value="">Select Type</option>
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                  </CFormSelect>
                </div>
              </div>
            </CCol>
          </CRow>
          <div className="mb-4">
            <CFormLabel htmlFor="account">Account</CFormLabel>
            <div className="input-group">
              <span className="input-group-text"><CIcon icon={cilBank} /></span>
              <CFormSelect id="account" value={transactionObject.ID_account} onChange={handleChange} name="ID_account">
                <option value="">Select Account</option>
                {accounts.map((account) => (
                  <option key={account.id} value={account.id}>
                    {account.Institution}
                  </option>
                ))}
              </CFormSelect>
            </div>
            <CFormInput
              type="text"
              id="description"
              label="Description"
              placeholder="Description"
              aria-describedby="exampleFormControlInputHelpInline"
              onChange={handleChange}
              value={transactionObject.description}
              name="description"
            />
          </div>
          <div className="d-grid">
            <CButton type="submit" color="primary" size="lg">Create Transaction</CButton>
          </div>
        </CForm>
      </CCardBody>
    </CCard>
  );
}
