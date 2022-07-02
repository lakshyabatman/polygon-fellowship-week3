import logo from './logo.svg';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Form from 'react-bootstrap/Form';


import './App.css';
import { connectWallet, issueALoan, repay } from './web3';
import { useEffect, useState } from 'react';
function App() {

  const [connectedUser, setConnectedUser] = useState("");
  
  const setup = async () => {
    const account = await connectWallet();
    setConnectedUser(account);
  }
  
  useEffect(() => {
    setup()
  },[])

  return (
    <div className="App">
      <Navbar bg="light">
        <Container>
          <Navbar.Brand href="#home">Borrowing DApp</Navbar.Brand>
        </Container>
      </Navbar>
      <div style={{height:"100vh"}}>
        <Container style={{display:"flex", "justifyContent":"center","alignItems":"center", height:"100%", "flexDirection":"column"}}>
        <Tabs
          defaultActiveKey="issue"
          id="uncontrolled-tab-example"
          className="mb-3"
          
        >
          <Tab eventKey="issue" title="Issue Loan">
            <Card style={{ width: '18rem' }}>
              <Card.Body>
                <Card.Title>Issue a Loan</Card.Title>
                <Form onSubmit={(e) => {
                  e.preventDefault();
                  console.log(e)
                  issueALoan(e.target[0].value)
                }}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Eth</Form.Label>
                    <Form.Control step="0.001"  type="number" placeholder="Enter Eth" />
                  </Form.Group>
                  
                  <Button variant="primary" type="submit">
                    Take Loan
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Tab>
          <Tab eventKey="repay" title="Repay Loan">
          <Card style={{ width: '18rem' }}>
              <Card.Body>
                <Card.Title>Repay a Loan</Card.Title>
                 
                  <Button variant="primary" type="submit" onClick={() => {
                    repay()
                  }}>
                    Repay Loan
                  </Button>
              </Card.Body>
            </Card>
          </Tab>
          
        </Tabs>
        </Container>
      </div>
    </div>
  );
}

export default App;
