import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CCard, CCardBody, CCardHeader, CForm, CFormInput, CButton, CContainer, 
  CRow, CCol, CAlert, CInputGroup, CInputGroupText, CFormSelect
} from '@coreui/react';
import { cilCheckCircle, cilCreditCard, cilCalendar, cilLockLocked, cilBank, cilDollar } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import AccountContext from '@context/accountContext';

function AddCardForm() {
  const navigate = useNavigate();
  const { user, addAccount } = useContext(AccountContext);
  const [newCard, setNewCard] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
    typeId: '1',
    currencyId: '1',
    holder: user.user_name,
    institution: '',
    balance: '',
  });
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await addAccount(newCard);
      if (!result) {
        setError('Failed to create account. Please check your input and try again.');
      } else {
        setAlertMessage('Card added successfully');
        setShowAlert(true);
        setTimeout(() => {
          navigate('/');
        }, 2000);
      }
    } catch (err) {
      console.error("Error adding account:", err);
      setError('An unexpected error occurred. Please try again later.');
    }
  };

  const handleChange = (e) => {
    setNewCard(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <CContainer fluid className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <CCard className='Add-Card shadow-sm' style={{ width: '450px' }}>
        <CCardHeader className="bg-primary text-white">
          <h3 className="mb-0">Add New Card</h3>
        </CCardHeader>
        <CCardBody className="p-4">
          {error && <CAlert color="danger">{error}</CAlert>}
          {showAlert && (
            <CAlert color="success" className="d-flex align-items-center">
              <CIcon icon={cilCheckCircle} className="flex-shrink-0 me-2" width={24} height={24} />
              <div>{alertMessage}</div>
            </CAlert>
          )}
          <CForm onSubmit={handleSubmit}>
            <CInputGroup className="mb-3">
              <CInputGroupText><CIcon icon={cilCreditCard} /></CInputGroupText>
              <CFormInput
                type="text"
                name="cardNumber"
                placeholder="Card Number"
                value={newCard.cardNumber}
                onChange={handleChange}
              />
            </CInputGroup>
            <CRow className="mb-3">
              <CCol xs={8}>
                <CInputGroup>
                  <CInputGroupText><CIcon icon={cilCalendar} /></CInputGroupText>
                  <CFormInput
                    type="text"
                    name="expiry"
                    placeholder="MM/YY"
                    value={newCard.expiry}
                    onChange={handleChange}
                  />
                </CInputGroup>
              </CCol>
              <CCol xs={4}>
                <CInputGroup>
                  <CInputGroupText><CIcon icon={cilLockLocked} /></CInputGroupText>
                  <CFormInput
                    type="text"
                    name="cvv"
                    placeholder="CVV"
                    value={newCard.cvv}
                    onChange={handleChange}
                  />
                </CInputGroup>
              </CCol>
            </CRow>
            <CInputGroup className="mb-3">
              <CInputGroupText><CIcon icon={cilBank} /></CInputGroupText>
              <CFormInput
                type="text"
                name="institution"
                placeholder="Institution"
                value={newCard.institution}
                onChange={handleChange}
              />
            </CInputGroup>
            <CInputGroup className="mb-3">
              <CInputGroupText><CIcon icon={cilDollar} /></CInputGroupText>
              <CFormInput
                type="number"
                name="balance"
                placeholder="Initial Balance"
                value={newCard.balance}
                onChange={handleChange}
              />
            </CInputGroup>
            <CFormSelect className="mb-3" name="typeId" value={newCard.typeId} onChange={handleChange}>
              <option value="1">Credit Card</option>
              <option value="2">Debit Card</option>
            </CFormSelect>
            <CFormSelect className="mb-4" name="currencyId" value={newCard.currencyId} onChange={handleChange}>
              <option value="1">USD</option>
              <option value="2">MEX</option>
            </CFormSelect>
            <CButton color="primary" type="submit" className="w-100">
              Add Card
            </CButton>
          </CForm>
        </CCardBody>
      </CCard>
    </CContainer>
  );
}

export default AddCardForm;