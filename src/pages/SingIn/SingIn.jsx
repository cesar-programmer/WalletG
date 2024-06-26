import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AccountContext from '@context/accountContext';
import { CCard, CCardBody, CCardHeader, CCol, CContainer, CForm, CFormInput, CRow, CButton, CCardFooter } from '@coreui/react';
import '@css/main.css';

const Signin = () => {
  const { handleSignIn } = useContext(AccountContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSignin = async () => {
    if (!await handleSignIn(email, password)) {
      setError('Email or password is incorrect. Please try again.');
    } else {
      navigate('/');  // Navigate to homepage or dashboard on successful sign in
    }
  };

  return (
    <CContainer fluid>
      <CRow className="justify-content-center">
        <CCol md="22">
          <CCard className='signin-card' style={{width: '58rem', marginBottom:'23px'}}>
            <CCardHeader><h4>Sign In</h4></CCardHeader>
            <CCardBody>
              {error && <div className="text-danger mb-3">{error}</div>}
              <CForm>
                <CFormInput type="email" placeholder="Enter your email" value={email} onChange={handleEmailChange} label="Email address" />
                <CFormInput type="password" placeholder="Enter your password" value={password} label="Password" onChange={handlePasswordChange} />
              </CForm>
            </CCardBody>
            <CCardFooter>
              <CButton color="primary" onClick={handleSignin}>Sign In</CButton>
              <div className="mt-3 text-center">
                <span>Dont have an account? </span>
                <CButton color="info" variant="ghost" size="sm" onClick={() => navigate('/createAccount')}>Create account</CButton>
              </div>
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default Signin;
