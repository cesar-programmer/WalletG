import { useContext, useState } from 'react';
import { CCard, CCardBody, CCardHeader, CContainer, CRow, CCol, CBadge, CButton, CModal, CModalHeader, CModalBody, CModalFooter } from '@coreui/react';
import AccountContext from '@context/accountContext';

export default function Profile() {
  const { accounts, user } = useContext(AccountContext);
  const { currentProfile, deleteAccount } = useContext(AccountContext);
  const [showModal, setShowModal] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);

  const handleDeleteClick = (account) => {
    setSelectedAccount(account);
    setShowModal(true);
  };

  const handleDeleteConfirm = () => {
    console.log("Deleting account:", selectedAccount);
    deleteAccount(selectedAccount.id);
    setSelectedAccount(null);
    setShowModal(false);
  };

  const handleDeleteCancel = () => {
    setSelectedAccount(null);
    setShowModal(false);
  };

  return (
    <CContainer className='profile-container' fluid>
      <CRow className="profile-card justify-content-center align-items-center mb-5">
        <CCard style={{ width: '58rem' }}>
          <CCardHeader>
            <h4>Profile</h4>
          </CCardHeader>
          <CCardBody>
            <h5>User Information</h5>
            <p>Name: {`${currentProfile?.name ?? ''} ${currentProfile?.last_name ?? ''}`}</p>
            <p>Email: {user.email}</p>
            <p>Registered Since: {`${currentProfile?.date_register ?? ''}`}</p>
          </CCardBody>
        </CCard>
      </CRow>

      <CRow className="profile-card justify-content-center align-items-center">
        <CCard style={{ width: '58rem' }}>
          <CCardHeader>
            <h4>Financial Accounts</h4>
          </CCardHeader>
          <CCardBody>
            <CRow>
              {accounts.map(account => (
                <CCol md="6" key={account.id} className="account-card">
                  <CCard>
                    <CCardHeader className="account-card-header d-flex justify-content-between align-items-center">
                      {account.type}
                      <CButton color="danger" variant="outline" onClick={() => handleDeleteClick(account)}>Delete</CButton>
                    </CCardHeader>
                    <CCardBody className="account-card-body">
                      <div>
                        <p><strong>Institution:</strong> {account.Institution}</p>
                        <p><strong>Account Number:</strong> {account.number}</p>
                      </div>
                      <CBadge color="success" className="p-2">
                        Balance: ${account.balance}
                      </CBadge>
                    </CCardBody>
                  </CCard>
                </CCol>
              ))}
            </CRow>
          </CCardBody>
        </CCard>
      </CRow>

      <CModal visible={showModal} onClose={handleDeleteCancel}>
        <CModalHeader closeButton>Confirm Deletion</CModalHeader>
        <CModalBody>
          Are you sure you want to delete this account?
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={handleDeleteCancel}>Cancel</CButton>
          <CButton color="danger" onClick={handleDeleteConfirm}>Delete</CButton>
        </CModalFooter>
      </CModal>
    </CContainer>
  );
}
