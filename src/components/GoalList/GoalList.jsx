/* eslint-disable react/prop-types */
import { CCard, CCardBody, CCardHeader, CCol, CRow, CProgress } from '@coreui/react';

export default function GoalsList({ goals }) {
  return (
    <CRow>
      {goals.map((goal, index) => (
        <CCol md="4" key={index} className="mb-4">
          <CCard>
            <CCardHeader>
              <strong>{goal.description}</strong>
            </CCardHeader>
            <CCardBody>
              <p><strong>Amount:</strong> ${goal.amount}</p>
              <p><strong>Date:</strong> {goal.date}</p>
              <p><strong>Progress:</strong></p>
              <CProgress
                value={goal.progress}
              />
            </CCardBody>
          </CCard>
        </CCol>
      ))}
    </CRow>
  );
}
