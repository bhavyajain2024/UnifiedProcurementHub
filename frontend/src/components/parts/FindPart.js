import React, { useState } from 'react';
import { Table, Form, Button, Alert } from 'react-bootstrap';

const FindPart = () => {
  const [partNo, setPartNo] = useState('');
  const [part, setPart] = useState(null);
  const [error, setError] = useState(null);

  const handleFindPart = () => {
    fetch(`https://companyz.onrender.com/CompanyZ/parts/${partNo}`)
      .then((response) => {
        if (!response.ok) {
          setError('Part not found');
          setPart(null);
          return null;
        }
        return response.json();
      })
      .then((data) => setPart(data))
      .catch((error) => console.error('Error fetching part:', error));
  };

  return (
    <div className='container'>
        <br/>
      <h2>Find Part by Part Number</h2>
      <Form>
        <Form.Group controlId="partNoInput">
          <Form.Control
            type="text"
            placeholder="Enter Part Number"
            value={partNo}
            onChange={(e) => setPartNo(e.target.value)}
          />
        </Form.Group>
        <br/>
        <Button variant="primary" onClick={handleFindPart}>
          Find Part
        </Button>
      </Form>
      <br/>
      <br/>
      {error && <Alert variant="danger">{error}</Alert>}
      {part && (
        <Table striped bordered hover responsive>
          <tbody>
            <tr>
              <td>Part Name:</td>
              <td>{part.partName_628}</td>
            </tr>
            <tr>
              <td>Part Description:</td>
              <td>{part.partDescription_628}</td>
            </tr>
            <tr>
              <td>Current Price:</td>
              <td>${part.currentPrice_628}</td>
            </tr>
            <tr>
              <td>Quantity on Hand:</td>
              <td>{part.QoH_628}</td>
            </tr>
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default FindPart;
