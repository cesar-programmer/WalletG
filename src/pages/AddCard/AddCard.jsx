import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CCard, CCardBody, CCardHeader, CForm, CFormInput, CButton, CContainer, CRow, CCol, CAlert } from '@coreui/react';
import { cilCheckCircle } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import AccountContext from '@context/accountContext';

function AddCardForm() {
  const navigate = useNavigate();
  const { user } = useContext(AccountContext);
  const { addAccount } = useContext(AccountContext);
  const [newCard, setNewCard] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
    typeId: 1,
    currencyId: 1,
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
      console.log("Result of addAccount:", result);
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
    <CContainer fluid>
      <CRow>
        <CCol md="22">
          <CCard className='Add-Card' style={{width: '58rem', marginBottom:'23px'}}>
            <CCardHeader>Add New Card</CCardHeader>
            <CCardBody>
              {error && <div className="text-danger mb-3">{error}</div>}
              {showAlert && (
                <CAlert color="success" className="d-flex align-items-center">
                  <CIcon icon={cilCheckCircle} className="flex-shrink-0 me-2" width={24} height={24} />
                  <div>{alertMessage}</div>
                </CAlert>
              )}
              <CForm onSubmit={handleSubmit}>
                <CFormInput
                  type="text"
                  name="cardNumber"
                  placeholder="Card Number"
                  value={newCard.cardNumber}
                  onChange={handleChange}
                  style={{ marginBottom: '10px' }}
                />
                <CFormInput
                  type="text"
                  name="expiry"
                  placeholder="Expiry Date"
                  value={newCard.expiry}
                  onChange={handleChange}
                  style={{ marginBottom: '10px' }}
                />
                <CFormInput
                  type="text"
                  name="cvv"
                  placeholder="CVV"
                  value={newCard.cvv}
                  onChange={handleChange}
                  style={{ marginBottom: '10px' }}
                />
                <CFormInput
                  type="text"
                  name="institution"
                  placeholder="Institution"
                  value={newCard.institution}
                  onChange={handleChange}
                  style={{ marginBottom: '10px' }}
                />
                <CButton color="primary" type="submit">Add Card</CButton>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  );
}

export default AddCardForm;
