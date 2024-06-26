import { useContext } from 'react';
import AccountContext from '@context/accountContext';
import {
  CCol,
  CContainer,
  CRow,
  CWidgetStatsA
} from '@coreui/react';
// import CIcon from '@coreui/icons-react';
// import { cilArrowTop, cilOptions } from '@coreui/icons';
import { CChartLine, CChartBar } from '@coreui/react-chartjs';

export default function FinancialDashboard() {
  const { currentTip  } = useContext(AccountContext);
  console.log(currentTip);
  // Static data as an example, replace with dynamic data as needed
  const monthlyIncome = 9000;
  const monthlyExpenses = 4500;
  const savingsGoal = 5000;
  const financialTip = currentTip ? currentTip.description : "No tip available at the moment.";

  return (
    <CContainer fluid>
      <CRow>
        <CCol sm={6} md={3}>
          <CWidgetStatsA
            className="mb-4"
            color="info"
            value={`$${monthlyIncome}`}
            title="Monthly Income"
            chart={<CChartLine data={{ labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'], datasets: [{ label: 'Income', backgroundColor: 'rgba(255,255,255,.2)', borderColor: 'rgba(255,255,255,.55)', data: [2000, 2500, 1500, 3000] }] }} />}
          />
        </CCol>
        <CCol sm={6} md={3}>
          <CWidgetStatsA
            className="mb-4"
            color="danger"
            value={`$${monthlyExpenses}`}
            title="Monthly Expenses"
            chart={<CChartBar data={{ labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'], datasets: [{ label: 'Expenses', backgroundColor: 'rgba(255,0,0,.2)', borderColor: 'rgba(255,0,0,.55)', data: [1200, 1300, 800, 1200] }] }} />}
          />
        </CCol>
        <CCol sm={6} md={3}>
          <CWidgetStatsA
            className="mb-4"
            color="success"
            value={`$${savingsGoal}`}
            title="Monthly Savings Goal"
            chart={<CChartLine data={{ labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'], datasets: [{ label: 'Savings', backgroundColor: 'transparent', borderColor: 'rgba(255,255,255,.55)', pointBackgroundColor: 'green', data: [500, 1000, 1500, 2000] }] }} />}
          />
        </CCol>
        <CCol sm={6} md={3}>
          <CWidgetStatsA
            className="mb-4"
            color="warning"
            value={<>
              <span className="fs-6 fw-normal">
                Tip of the Day: <br />
              </span>
              {financialTip}
            </>}
            title="Financial Tip"
          />
        </CCol>
      </CRow>
    </CContainer>
  );
}

