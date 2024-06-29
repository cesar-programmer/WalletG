import { useContext, useEffect } from 'react';
import AccountContext from '@context/accountContext';
import {
  CCol,
  CContainer,
  CRow,
  CWidgetStatsA,
  CCard,
  CCardBody,
  CCardTitle,
  CCardText
} from '@coreui/react';
import { CChart } from '@coreui/react-chartjs';
import CIcon from '@coreui/icons-react';
import { cilDollar, cilMoney, cilWallet, cilLightbulb } from '@coreui/icons';

export default function FinancialDashboard() {
  const { transactions, financeGoals, currentTip } = useContext(AccountContext);
  console.log("Transactions:", transactions);

  const monthlyIncome = transactions
    .filter(transaction => transaction.type === 1)
    .reduce((sum, transaction) => sum + Number(transaction.amount), 0);

  const monthlyExpenses = transactions
    .filter(transaction => transaction.type === 2) // Filtra las transacciones de tipo "expenses"
    .reduce((sum, transaction) => sum + Number(transaction.amount), 0);

  const savingsGoal = financeGoals.length > 0 ? financeGoals[0].amount : 0;

  useEffect(() => {
    console.log("Financial Dashboard mounted");
    console.log("Current tip:", currentTip);
    console.log("Monthly income:", monthlyIncome);
    console.log("Monthly expenses:", monthlyExpenses);
    return () => {
      console.log("Financial Dashboard unmounted");
    };
  }, [currentTip, monthlyIncome, monthlyExpenses]);

  const financialTip = currentTip ? currentTip.description : "No tip available at the moment.";

  const chartOptions = {
    plugins: {
      legend: {
        display: false,
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          display: false,
        }
      }
    },
    elements: {
      line: {
        tension: 0.4,
      },
      point: {
        radius: 0,
      },
    },
  };

  return (
    <CContainer fluid className="py-4">
      <h2 className="mb-4">Financial Dashboard</h2>
      <CRow>
        <CCol xs={12} sm={6} lg={3}>
          <CWidgetStatsA
            className="mb-4"
            color="primary"
            value={`$${monthlyIncome.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            title="Monthly Income"
            action={<CIcon icon={cilDollar} size="xl" />}
            chart={
              <CChart
                type="line"
                data={{
                  labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                  datasets: [{
                    label: 'Income',
                    backgroundColor: 'rgba(255,255,255,.2)',
                    borderColor: 'rgba(255,255,255,.55)',
                    data: [500, 800, 300, 400], // Reemplaza con datos reales si es necesario
                    fill: true,
                  }],
                }}
                options={chartOptions}
              />
            }
          />
        </CCol>
        <CCol xs={12} sm={6} lg={3}>
          <CWidgetStatsA
            className="mb-4"
            color="danger"
            value={`$${monthlyExpenses.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            title="Monthly Expenses"
            action={<CIcon icon={cilMoney} size="xl" />}
            chart={
              <CChart
                type="bar"
                data={{
                  labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                  datasets: [{
                    label: 'Expenses',
                    backgroundColor: 'rgba(255,255,255,.2)',
                    borderColor: 'rgba(255,255,255,.55)',
                    data: [300, 200, 400, 200], // Reemplaza con datos reales si es necesario
                  }],
                }}
                options={chartOptions}
              />
            }
          />
        </CCol>
        <CCol xs={12} sm={6} lg={3}>
          <CWidgetStatsA
            className="mb-4"
            color="success"
            value={`$${savingsGoal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            title="Monthly Savings Goal"
            action={<CIcon icon={cilWallet} size="xl" />}
            chart={
              <CChart
                type="line"
                data={{
                  labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                  datasets: [{
                    label: 'Savings',
                    backgroundColor: 'transparent',
                    borderColor: 'rgba(255,255,255,.55)',
                    pointBackgroundColor: 'rgba(255,255,255,.55)',
                    data: [500, 1000, 1500, 2000], // Reemplaza con datos reales si es necesario
                  }],
                }}
                options={chartOptions}
              />
            }
          />
        </CCol>
        <CCol xs={12} sm={6} lg={3}>
          <CCard className="mb-4 h-100" color="warning" textColor="dark">
            <CCardBody>
              <CCardTitle className="d-flex align-items-center mb-3">
                <CIcon icon={cilLightbulb} size="xl" className="me-2" />
                Financial Tip of the Day
              </CCardTitle>
              <CCardText>{financialTip}</CCardText>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  );
}
