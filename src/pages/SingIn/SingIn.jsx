import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AccountContext from '@context/accountContext';
import {
  CCard, CCardBody, CCardHeader, CCol, CContainer, CForm,
  CFormInput, CRow, CButton, CCardFooter, CInputGroup,
  CInputGroupText, CAlert
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilLockLocked, cilUser, cilEnvelopeClosed } from '@coreui/icons';
import '@css/main.css';

const Signin = () => {
  const { handleSignIn } = useContext(AccountContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSignin = async (e) => {
    e.preventDefault();
    if (!await handleSignIn(email, password)) {
      setError('Email or password is incorrect. Please try again.');
    } else {
      navigate('/');  // Navigate to homepage or dashboard on successful sign in
    }
  };
  // <CCard className='signin-card' style={{width: '58rem', marginBottom:'23px'}}>
  return (
      <CContainer>
        <CRow >
          <CCol md={8} lg={6} xl={5}>
            <CCard className='signin-card' style={{width: '58rem', marginBottom:'23px'}}>
              <CCardHeader className="p-4 bg-primary text-white">
                <h1 className="mb-0">Sign In</h1>
                <p className="text-white-50 mb-0">Sign In to your account</p>
              </CCardHeader>
              <CCardBody className="p-4">
                {error && <CAlert color="danger">{error}</CAlert>}
                <CForm onSubmit={handleSignin}>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilEnvelopeClosed} />
                    </CInputGroupText>
                    <CFormInput
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={handleEmailChange}
                      required
                      autoComplete="email"
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={handlePasswordChange}
                      required
                      autoComplete="current-password"
                    />
                  </CInputGroup>
                  <CRow>
                    <CCol xs={6}>
                      <CButton color="primary" className="px-4" type="submit">
                        Sign In
                      </CButton>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
              <CCardFooter className="p-4 bg-light">
                <CRow>
                  <CCol xs={12} className="text-center">
                    <span>Dont have an account? </span>
                    <CButton color="primary" variant="ghost" onClick={() => navigate('/createAccount')}>
                      Create account
                    </CButton>
                  </CCol>
                </CRow>
              </CCardFooter>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
  );
};

export default Signin;