import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CButton, CCard, CCardBody, CCardFooter, CCardHeader, CCol, CContainer, 
  CForm, CFormInput, CRow, CInputGroup, CInputGroupText, CAlert
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilUser, cilEnvelopeClosed, cilLockLocked, cilPencil } from '@coreui/icons';
import AccountContext from '@context/accountContext';

export default function CreateAccount() {
  const [account, setAccount] = useState({
    email: '',
    password: '',
    name: '',
    lastName: '',
    dateRegister: new Date().toISOString().slice(0, 10)
  });
  const { handleSignUp } = useContext(AccountContext);
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setAccount(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
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
    if (await handleSignUp(userData)) {
      navigate('/');
    } else {
      setError('Failed to create account. Please check your input and try again.');
    }
  };
{/* <CCard className='createAccount-card' style={{width: '58rem', marginBottom:'23px'}}></CCard> */}
  return (
    
      <CContainer fluid>
        <CRow className="justify-content-center">
          <CCol >
            <CCard className='createAccount-card'   style={{width: '54rem', marginBottom:'23px'}}>
              <CCardHeader className="p-4 bg-primary text-white">
                <h1 className="mb-0">Create Account</h1>
                <p className="text-white-50 mb-0">Sign up for a new account</p>
              </CCardHeader>
              <CCardBody className="p-4">
                {error && <CAlert color="danger">{error}</CAlert>}
                <CForm onSubmit={handleSignup}>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilEnvelopeClosed} />
                    </CInputGroupText>
                    <CFormInput
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      value={account.email}
                      onChange={handleChange}
                      required
                      autoComplete="email"
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      name="password"
                      placeholder="Enter your password"
                      value={account.password}
                      onChange={handleChange}
                      required
                      autoComplete="new-password"
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      type="text"
                      name="name"
                      placeholder="Enter your first name"
                      value={account.name}
                      onChange={handleChange}
                      required
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilPencil} />
                    </CInputGroupText>
                    <CFormInput
                      type="text"
                      name="lastName"
                      placeholder="Enter your last name"
                      value={account.lastName}
                      onChange={handleChange}
                      required
                    />
                  </CInputGroup>
                  <CButton color="primary" type="submit" className="w-100">
                    Create Account
                  </CButton>
                </CForm>
              </CCardBody>
              <CCardFooter className="p-4 bg-light">
                <CRow>
                  <CCol xs={12} className="text-center">
                    <span>Already have an account? </span>
                    <CButton color="primary" variant="ghost" onClick={() => navigate('/signin')}>
                      Sign In
                    </CButton>
                  </CCol>
                </CRow>
              </CCardFooter>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    
  );
}