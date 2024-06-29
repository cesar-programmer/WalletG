/* eslint-disable react/prop-types */
import { useContext, useState } from 'react';
import AccountContext from '@context/accountContext';
import { CCard, CCardBody, CCardHeader, CCol, CRow, CProgress, CButton, CModal, CModalHeader, CModalBody, CModalFooter, CBadge } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilTrash, cilWarning } from '@coreui/icons';

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
          <CCol xs={12} sm={6} md={6} lg={4} key={index} className="mb-4">
            <CCard className="h-100 shadow-sm">
              <CCardHeader className="d-flex justify-content-between align-items-center bg-light">
                <strong>{goal.description}</strong>
                <CButton color="danger" variant="ghost" size="sm" onClick={() => handleDeleteClick(goal)}>
                  <CIcon icon={cilTrash} />
                </CButton>
              </CCardHeader>
              <CCardBody>
                <p><strong>Amount:</strong> <CBadge color="info">${goal.amount}</CBadge></p>
                <p><strong>Date:</strong> {new Date(goal.date).toLocaleDateString()}</p>
                <p><strong>Progress:</strong></p>
                <CProgress value={goal.progress_percentage} className="mb-3">
                  {goal.progress_percentage}%
                </CProgress>
                <CBadge color={goal.progress_percentage >= 100 ? "success" : "warning"}>
                  {goal.progress_percentage >= 100 ? "Completed" : "In Progress"}
                </CBadge>
              </CCardBody>
            </CCard>
          </CCol>
        ))}
      </CRow>

      <CModal visible={showModal} onClose={handleDeleteCancel} alignment="center">
        <CModalHeader closeButton>
          <h5 className="mb-0">Confirm Deletion</h5>
        </CModalHeader>
        <CModalBody className="text-center">
          <CIcon icon={cilWarning} size="3xl" className="text-warning mb-3" />
          <p>Are you sure you want to delete this goal?</p>
          <p className="text-muted">This action cannot be undone.</p>
        </CModalBody>
        <CModalFooter className="justify-content-center">
          <CButton color="secondary" onClick={handleDeleteCancel}>Cancel</CButton>
          <CButton color="danger" onClick={handleDeleteConfirm}>Delete</CButton>
        </CModalFooter>
      </CModal>
    </>
  );
}