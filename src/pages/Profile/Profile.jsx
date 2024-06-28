import { useContext, useState } from 'react';
import {
  CCard, CCardBody, CCardHeader, CContainer, CRow, CCol, CBadge, CButton,
  CModal, CModalHeader, CModalBody, CModalFooter, CAvatar
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilEnvelopeClosed, cilCalendar, cilBank, cilCreditCard, cilTrash,cilWarning } from '@coreui/icons';
import AccountContext from '@context/accountContext';

export default function Profile() {
  const { accounts, user, currentProfile, deleteAccount } = useContext(AccountContext);
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
      <CRow className="justify-content-center mb-4">
        <CCol xs={12} md={10} lg={8}>
          <CCard className="shadow-sm">
            <CCardHeader className="bg-primary text-white">
              <h4 className="mb-0">Profile</h4>
            </CCardHeader>
            <CCardBody className="py-4">
              <div className="d-flex align-items-center mb-4">
                <CAvatar color="primary" size="xl" className="me-3">
                  {currentProfile?.name?.[0]?.toUpperCase() || 'U'}
                </CAvatar>
                <div>
                  <h3>{`${currentProfile?.name ?? ''} ${currentProfile?.last_name ?? ''}`}</h3>
                  <p className="text-muted mb-0">User Information</p>
                </div>
              </div>
              <div className="ms-2">
                <p className="mb-2"><CIcon icon={cilEnvelopeClosed} className="me-2" />{user.email}</p>
                <p className="mb-0"><CIcon icon={cilCalendar} className="me-2" />Registered Since: {`${currentProfile?.date_register ?? ''}`}</p>
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <CRow className="justify-content-center">
        <CCol xs={12} md={10} lg={8}>
          <CCard className="shadow-sm">
            <CCardHeader className="bg-info text-white">
              <h4 className="mb-0">Financial Accounts</h4>
            </CCardHeader>
            <CCardBody>
              <CRow>
                {accounts.map(account => (
                  <CCol xs={12} md={6} key={account.id} className="mb-4">
                    <CCard className="h-100 border-0 shadow-sm">
                      <CCardHeader className="bg-light d-flex justify-content-between align-items-center">
                        <h5 className="mb-0">{account.type}</h5>
                        <CButton 
                          color="danger" 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleDeleteClick(account)}
                        >
                          <CIcon icon={cilTrash} />
                        </CButton>
                      </CCardHeader>
                      <CCardBody>
                        <p className="mb-2"><CIcon icon={cilBank} className="me-2" /><strong>Institution:</strong> {account.Institution}</p>
                        <p className="mb-3"><CIcon icon={cilCreditCard} className="me-2" /><strong>Account Number:</strong> {account.number}</p>
                        <CBadge color="success" shape="rounded-pill" className="px-3 py-2">
                          Balance: ${account.balance}
                        </CBadge>
                      </CCardBody>
                    </CCard>
                  </CCol>
                ))}
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <CModal visible={showModal} onClose={handleDeleteCancel} alignment="center">
        <CModalHeader closeButton>
          <h5 className="mb-0">Confirm Deletion</h5>
        </CModalHeader>
        <CModalBody className="text-center">
          <CIcon icon={cilWarning} size="3xl" className="text-warning mb-3" />
          <p>Are you sure you want to delete this account?</p>
          <p className="text-muted">This action cannot be undone.</p>
        </CModalBody>
        <CModalFooter className="justify-content-center">
          <CButton color="secondary" onClick={handleDeleteCancel}>Cancel</CButton>
          <CButton color="danger" onClick={handleDeleteConfirm}>Delete</CButton>
        </CModalFooter>
      </CModal>
    </CContainer>


  );
}