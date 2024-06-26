import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CButton, CCard, CCardBody, CCardFooter, CCardHeader, CCol, CContainer, CForm, CFormInput, CRow } from '@coreui/react';
import AccountContext from '@context/accountContext';

export default function CreateAccount() {
  const [account, setAccount] = useState({
    email: '',
    password: '',
    name: '',
    lastName: '',
    dateRegister: new Date().toISOString().slice(0, 10)  // Añade la fecha de registro, formateada adecuadamente
  });
  const { handleSignUp } = useContext(AccountContext);
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setAccount(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSignup = async () => {
    const userData = {
      user: {
        email: account.email,
        password: account.password,
        user_name: account.email
      },
      profile: {
        name: account.name,
        last_name: account.lastName,
        date_register: account.dateRegister
      }
    };
    console.log(userData)
    if (await handleSignUp(userData)) {
      console.log(userData);
      navigate('/');
    } else {
      setError('Failed to create account. Please check your input and try again.');
    }
  };

  return (
    <CContainer fluid>
      <CRow className="justify-content-center">
        <CCol md="22">
          <CCard className='createAccount-card' style={{width: '58rem', marginBottom:'23px'}}>
            <CCardHeader>
              <h4>Create Account</h4>
            </CCardHeader>
            <CCardBody>
              {error && <div className="text-danger mb-3">{error}</div>}
              <CForm>
                <CFormInput type="email" name="email" placeholder="Enter your email" value={account.email} onChange={handleChange} label="Email address" />
                <CFormInput type="password" name="password" placeholder="Enter your password" value={account.password} onChange={handleChange} label="Password" />
                <CFormInput type="text" name="name" placeholder="Enter your first name" value={account.name} onChange={handleChange} label="First Name" />
                <CFormInput type="text" name="lastName" placeholder="Enter your last name" value={account.lastName} onChange={handleChange} label="Last Name" />
              </CForm>
            </CCardBody>
            <CCardFooter>
              <CButton color="primary" onClick={handleSignup}>Sign up</CButton>
              <div className="mt-3 text-center">
                <span>Already have an account? </span>
                <CButton color="info" variant="ghost" size="sm" style={{ marginBottom: '0.2rem' }} onClick={() => navigate('/signin')}>Sign in</CButton>
              </div>
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  )
}