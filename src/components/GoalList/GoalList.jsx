/* eslint-disable react/prop-types */
import { useContext } from 'react';
import AccountContext from '@context/accountContext';
import { useState } from 'react';
import { CCard, CCardBody, CCardHeader, CCol, CRow, CProgress, CButton, CModal, CModalHeader, CModalBody, CModalFooter } from '@coreui/react';

export default function GoalsList({ goals }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const { onDeleteGoal } = useContext(AccountContext);

  const handleDeleteClick = (goal) => {
    setSelectedGoal(goal);
    setShowModal(true);
  };

  const handleDeleteConfirm = () => {
    onDeleteGoal(selectedGoal.ID_goal);
    setShowModal(false);
  };

  const handleDeleteCancel = () => {
    setSelectedGoal(null);
    setShowModal(false);
  };

  return (
    <>
      <CRow>
        {goals.map((goal, index) => (
          <CCol md="4" key={index} className="mb-4">
            <CCard>
              <CCardHeader className="d-flex justify-content-between align-items-center">
                <strong>{goal.description}</strong>
                <CButton color="danger" variant="outline" onClick={() => handleDeleteClick(goal)}>Delete</CButton>
              </CCardHeader>
              <CCardBody>
                <p><strong>Amount:</strong> ${goal.amount}</p>
                <p><strong>Date:</strong> {goal.date}</p>
                <p><strong>Progress:</strong></p>
                <CProgress value={goal.progress} />
              </CCardBody>
            </CCard>
          </CCol>
        ))}
      </CRow>

      <CModal visible={showModal} onClose={handleDeleteCancel}>
        <CModalHeader closeButton>Confirm Deletion</CModalHeader>
        <CModalBody>
          Are you sure you want to delete this goal?
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={handleDeleteCancel}>Cancel</CButton>
          <CButton color="danger" onClick={handleDeleteConfirm}>Delete</CButton>
        </CModalFooter>
      </CModal>
    </>
  );
}
