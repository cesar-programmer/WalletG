import { useContext, useState } from 'react';
import { CForm, CFormInput, CFormLabel, CButton, CCard, CCardBody, CCardHeader, CAlert, CInputGroup, CInputGroupText } from '@coreui/react';
import { cilCheckCircle, cilDollar, cilCalendar, cilPencil } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import AccountContext from '@context/accountContext';

export default function GoalForm() {
  const { addFinanceGoal } = useContext(AccountContext);
  const [goal, setGoal] = useState({
    description: '',
    amount: '',
    date: '',
    progress: 0,
  });
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGoal(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await addFinanceGoal(goal);
      if (!result) {
        setError('Failed to create goal. Please check your input and try again.');
      } else {
        setAlertMessage('Goal added successfully');
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
        setGoal({ description: '', amount: '', date: '', progress: 0 });
      }
    } catch (err) {
      console.error("Error adding goal:", err);
      setError('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <CCard className='goal-form h-100'>
      <CCardHeader className="bg-info text-white">
        <h4 className="mb-0">Set a New Savings Goal</h4>
      </CCardHeader>
      <CCardBody>
        {error && <CAlert color="danger">{error}</CAlert>}
        {showAlert && (
          <CAlert color="success" className="d-flex align-items-center">
            <CIcon icon={cilCheckCircle} className="flex-shrink-0 me-2" width={24} height={24} />
            <div>{alertMessage}</div>
          </CAlert>
        )}
        <CForm onSubmit={handleSubmit}>
          <div className="mb-3">
            <CFormLabel htmlFor="description">Description</CFormLabel>
            <CInputGroup>
              <CInputGroupText><CIcon icon={cilPencil} /></CInputGroupText>
              <CFormInput
                type="text"
                id="description"
                name="description"
                value={goal.description}
                onChange={handleChange}
                required
                placeholder="Enter goal description"
              />
            </CInputGroup>
          </div>
          <div className="mb-3">
            <CFormLabel htmlFor="amount">Target Amount ($)</CFormLabel>
            <CInputGroup>
              <CInputGroupText><CIcon icon={cilDollar} /></CInputGroupText>
              <CFormInput
                type="number"
                id="amount"
                name="amount"
                value={goal.amount}
                onChange={handleChange}
                required
                placeholder="Enter target amount"
              />
            </CInputGroup>
          </div>
          <div className="mb-4">
            <CFormLabel htmlFor="date">Target Date</CFormLabel>
            <CInputGroup>
              <CInputGroupText><CIcon icon={cilCalendar} /></CInputGroupText>
              <CFormInput
                type="date"
                id="date"
                name="date"
                value={goal.date}
                onChange={handleChange}
                required
              />
            </CInputGroup>
          </div>
          <CButton color="primary" type="submit" className="w-100">Create Goal</CButton>
        </CForm>
      </CCardBody>
    </CCard>
  );
}