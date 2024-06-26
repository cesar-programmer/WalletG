/* eslint-disable react/prop-types */
import { useContext, useState } from 'react';
import { CForm, CFormInput, CFormLabel, CButton, CCard, CCardBody, CCardHeader,CAlert } from '@coreui/react';
import { cilCheckCircle } from '@coreui/icons';
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
      console.log("Result of onSaveGoal:", result);
      if (!result) {
        setError('Failed to create goal. Please check your input and try again.');
      } else {
        setAlertMessage('Goal added successfully');
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        } , 2000);
        setGoal({
          description: '',
          amount: '',
          date: '',
          progress: 0,
        });
      }
    } catch (err) {
      console.error("Error adding goal:", err);
      setError('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <CCard className='goal-form'  style={{width: '58rem', marginBottom:'23px'}}>
      <CCardHeader>
        <h4>Set a New Savings Goal</h4>
      </CCardHeader>
        <CCardBody>
          {error && <div className="text-danger mb-3">{error}</div>}
          {showAlert && (
            <CAlert color="success" className="d-flex align-items-center">
              <CIcon icon={cilCheckCircle} className="flex-shrink-0 me-2" width={24} height={24} />
              <div>{alertMessage}</div>
            </CAlert>
          )}
        <CForm onSubmit={handleSubmit}>
          <div className="mb-3">
            <CFormLabel htmlFor="description">Description</CFormLabel>
            <CFormInput
              type="text"
              id="description"
              name="description"
              value={goal.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <CFormLabel htmlFor="amount">Target Amount ($)</CFormLabel>
            <CFormInput
              type="number"
              id="amount"
              name="amount"
              value={goal.amount}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <CFormLabel htmlFor="date">Target Date</CFormLabel>
            <CFormInput
              type="date"
              id="date"
              name="date"
              value={goal.date}
              onChange={handleChange}
              required
            />
          </div>
          <CButton color="primary" type="submit">Create Goal</CButton>
        </CForm>
      </CCardBody>
    </CCard>
  );
}
