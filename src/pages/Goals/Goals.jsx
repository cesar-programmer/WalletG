import { useContext } from 'react';
import { CContainer, CRow, CCol } from '@coreui/react';
import GoalForm from '@components/GoalForm/GoalForm';
import GoalsList from '@components/GoalList/GoalList';
import AccountContext from '@context/accountContext';

export default function SavingsGoalsPage() {
  const { financeGoals } = useContext(AccountContext);

  return (
    <CContainer className='goal-container'  style={{ marginTop:'14%'}} >
      <CRow >
        <CCol className='goal-component' md="23">
          <GoalForm />
        </CCol>
        <CCol md="21" className='mt-3 mb-3 goal-list'>
          <GoalsList goals={financeGoals} />
        </CCol>
      </CRow>
    </CContainer>
  );
}
