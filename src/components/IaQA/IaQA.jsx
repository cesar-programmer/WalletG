import { useState } from 'react';
import {
  COffcanvas, COffcanvasBody, COffcanvasHeader, COffcanvasTitle, CCloseButton,
  CFormInput, CContainer, CRow, CCol, CButton
} from '@coreui/react';
import { GrRobot } from "react-icons/gr";

export default function App() {
  const [visible, setVisible] = useState(false);
  const [userQuestion, setUserQuestion] = useState('');
  const [chatResponse, setChatResponse] = useState('');
  const [sourceDocuments, setSourceDocuments] = useState([]);

  const handleQuestionChange = (e) => {
    setUserQuestion(e.target.value);
  };

  const handleAskQuestion = async () => {
    const response = await fetch('http://localhost:5000/chat', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: userQuestion })
    });

    if (!response.ok) {
      console.error("Error with the request:", response.statusText);
      return;
    }

    const data = await response.json();
    setChatResponse(data.result);  // Assure that 'result' is being used here, not 'message'
    setSourceDocuments(data.source_documents || []);  // Ensure default to empty array if none
  };

  return (
    <>
      <GrRobot size={50} onClick={() => setVisible(true)} style={{ cursor: 'pointer' }} />

      <COffcanvas placement="start" visible={visible} onHide={() => setVisible(false)}>
        <COffcanvasHeader>
          <COffcanvasTitle>Ask me a question {<GrRobot size={30} />}</COffcanvasTitle>
          <CCloseButton className="text-reset" onClick={() => setVisible(false)} />
        </COffcanvasHeader>
        <COffcanvasBody>
          <CContainer fluid>
            <CRow>
              <CCol>
                <p>{chatResponse || "Your responses will appear here."}</p>
                {sourceDocuments.map((doc, index) => (
                  <div key={index}>
                    <p><strong>Source Content:</strong> {doc.page_content}</p>
                    <p><strong>Source Page:</strong> {doc.page}</p>
                  </div>
                ))}
              </CCol>
            </CRow>
            <CRow>
              <CCol>
                <CFormInput
                  type="text"
                  placeholder="Ask me a question"
                  aria-label="Ask me a question"
                  onChange={handleQuestionChange}
                  value={userQuestion}
                />
              </CCol>
              <CCol xs="auto">
                <CButton onClick={handleAskQuestion} color="primary">
                  Send
                </CButton>
              </CCol>
            </CRow>
          </CContainer>
        </COffcanvasBody>
      </COffcanvas>
    </>
  );
}
