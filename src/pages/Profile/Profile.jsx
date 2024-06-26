import { useContext } from 'react';
import { CCard, CCardBody, CCardHeader, CContainer, CRow, CListGroup, CListGroupItem } from '@coreui/react';
import AccountContext from '@context/accountContext';

export default function Profile () {
  const { accounts, user } = useContext(AccountContext);
  const { currentProfile } = useContext(AccountContext);
  return (
    <CContainer className='profile-container' fluid>
      <CRow className=" profile-card `justify-content-center align-items-center` mb-5">
          <CCard style={{ width: '58rem' }}>
            <CCardHeader>
              <h4>Profile</h4>
            </CCardHeader>
            <CCardBody>
              <h5>User Information</h5>
              <p>Name: {`${currentProfile?.name ?? ''} ${currentProfile?.last_name ?? ''}`}</p>
              <p>Email: {user.email}</p>
              <p>Registered Since: {`${currentProfile?.date_register ?? ''}`}</p>

              <h5 className="mt-4">Financial Accounts</h5>
              <CListGroup>
                {accounts.map(account => (
                  <CListGroupItem key={account.id}>
                  {console.log(account)}
                    {account.type} - Balance: ${account.balance}
                  </CListGroupItem>
                ))}
              </CListGroup>
            </CCardBody>
          </CCard>

      </CRow>
    </CContainer>
  );
}


