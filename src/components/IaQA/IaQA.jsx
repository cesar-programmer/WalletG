import { useState } from 'react';
import {
  COffcanvas, COffcanvasBody, COffcanvasHeader, COffcanvasTitle, CCloseButton,
  CFormInput, CContainer, CRow, CCol, CButton, CCard, CCardBody, CSpinner
} from '@coreui/react';
import { GrRobot } from "react-icons/gr";

export default function App() {
  const [visible, setVisible] = useState(false);
  const [userQuestion, setUserQuestion] = useState('');
  const [chatResponse, setChatResponse] = useState('');
  const [sourceDocuments, setSourceDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleQuestionChange = (e) => {
    setUserQuestion(e.target.value);
  };

  // const handleAskQuestion = async () => {
  //   if (!userQuestion.trim()) return;
    
  //   setIsLoading(true);
  //   try {
  //     const response = await fetch('http://localhost:5000/chat', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({ message: userQuestion })
  //     });

  //     if (!response.ok) {
  //       throw new Error(response.statusText);
  //     }

  //     const data = await response.json();
  //     setChatResponse(data.result);
  //     setSourceDocuments(data.source_documents || []);
  //   } catch (error) {
  //     console.error("Error with the request:", error);
  //     setChatResponse("Sorry, there was an error processing your request.");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  return (
    <>
      <CButton 
        color="primary" 
        variant="outline" 
        style={{ margin: '20px'}}
        onClick={() => setVisible(true)}
      >
        <GrRobot size={70} />
      </CButton>

      <COffcanvas placement="end" visible={visible} onHide={() => setVisible(false)}>
        <COffcanvasHeader>
          <COffcanvasTitle>
            <h3 className="mb-0 d-flex align-items-center">
              <GrRobot size={70} className="me-2" /> AI Assistant
            </h3>
          </COffcanvasTitle>
          <CCloseButton className="text-reset" onClick={() => setVisible(false)} />
        </COffcanvasHeader>
        <COffcanvasBody>
          <CContainer fluid className="h-100 d-flex flex-column">
            <CCard className="flex-grow-1 mb-3">
              <CCardBody className="overflow-auto">
                {chatResponse ? (
                  <>
                    <p className="lead">{chatResponse}</p>
                    {sourceDocuments.map((doc, index) => (
                      <CCard key={index} className="mt-3 bg-light">
                        <CCardBody>
                          <h6>Source {index + 1}</h6>
                          <p><strong>Content:</strong> {doc.page_content}</p>
                          <p className="mb-0"><strong>Page:</strong> {doc.page}</p>
                        </CCardBody>
                      </CCard>
                    ))}
                  </>
                ) : (
                  <p className="text-muted">Your responses will appear here.</p>
                )}
              </CCardBody>
            </CCard>
            <CRow className="g-2">
              <CCol>
                <CFormInput
                  type="text"
                  placeholder="Ask me a question"
                  aria-label="Ask me a question"
                  onChange={handleQuestionChange}
                  value={userQuestion}
                  // onKeyPress={(e) => e.key === 'Enter' && handleAskQuestion()}
                />
              </CCol>
              <CCol xs="auto">
                <CButton 
                  // onClick={handleAskQuestion} 
                  color="primary"
                  disabled={isLoading}
                >
                  {isLoading ? <CSpinner size="sm" /> : 'Send'}
                </CButton>
              </CCol>
            </CRow>
          </CContainer>
        </COffcanvasBody>
      </COffcanvas>
    </>
  );
}