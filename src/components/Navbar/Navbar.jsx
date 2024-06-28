import { useContext, useState } from 'react';
import {
  CCloseButton, CContainer, CNavbar, CNavbarBrand, CNavbarNav, CNavItem, CNavLink,
  CNavbarToggler, COffcanvas, COffcanvasBody, COffcanvasHeader, COffcanvasTitle
} from '@coreui/react';
import '@css/main.css';
import IaQA from '@components/IaQA/IaQA';
import AccountContext from '@context/accountContext';

export default function Navbar() {
  const { isLoggedIn, handleSignOut,currentProfile } = useContext(AccountContext);
  const [visible, setVisible] = useState(false);

  return (
    <CNavbar colorScheme='light' className="custom-primary-background fixed-top" expand="xxl">
      <CContainer fluid className="navbar-container">
        <CNavbarBrand style={{color:'white'}} href="/">WalletG</CNavbarBrand>
        <CNavbarToggler
          className="custom-toggler"
          aria-controls="offcanvasNavbar2"
          aria-label="Toggle navigation"
          onClick={() => setVisible(!visible)}
        />
        <COffcanvas id="offcanvasNavbar2" placement="end" portal={false} visible={visible} onHide={() => setVisible(false)}>
          <COffcanvasHeader>
            <COffcanvasTitle>Menu</COffcanvasTitle>
            <CCloseButton className="text-reset" onClick={() => setVisible(false)} />
          </COffcanvasHeader>
          <COffcanvasBody>
            <CNavbarNav>
              <CNavItem>
                <CNavLink>{<IaQA/>}</CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink href="/">Home</CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink href="/profile">Profile</CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink href="/IncomeExpensesView">Incomes and Expenses</CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink href="/goals">Goals</CNavLink>
              </CNavItem>
              {isLoggedIn ? (
                <>
                  <CNavItem>
                    <CNavLink onClick={handleSignOut} style={{ cursor: 'pointer' }}>Logout</CNavLink>
                  </CNavItem>
                  <CNavItem>
                    <CNavLink style={{ cursor: 'pointer' }}>
                      {`${currentProfile?.name ?? ''} ${currentProfile?.last_name ?? ''}`}
                    </CNavLink>
                  </CNavItem>
                </>
              ) : (
                <CNavItem>
                  <CNavLink href="/signin" style={{ cursor: 'pointer' }}>Sign In</CNavLink>
                </CNavItem>
              )}
              <CNavItem>
                <CNavLink href="/addCard">Add Card</CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink href="/makeTransactions">Make transactions</CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink href="#">Settings</CNavLink>
              </CNavItem>
            </CNavbarNav>
          </COffcanvasBody>
        </COffcanvas>
      </CContainer>
    </CNavbar>
  );
}
