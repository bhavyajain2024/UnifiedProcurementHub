import React, { useState } from 'react';
import { Table, Form, Button, Alert } from 'react-bootstrap';

const FindPurchaseOrder = () => {
  const [poNo, setPoNo] = useState('');
  const [purchaseOrder, setPurchaseOrder] = useState(null);
  const [error, setError] = useState(null);

  const handleFindPurchaseOrder = () => {
    if(poNo === '') {
        setError('Please enter a valid PO Number');
        setPurchaseOrder(null);
        return;
    }
    fetch(`http://localhost:5050/CompanyY/purchase-orders/${poNo}`)
      .then((response) => {
        if (!response.ok) {
          setError('Purchase Order not found');
          setPurchaseOrder(null);
          return null;
        }
        setError(null);
        return response.json();
      })
      .then((data) => setPurchaseOrder(data))
      .catch((error) => console.error('Error fetching purchase order:', error));
  };

  return (
    <div className='container'>
      <h2>Find Purchase Order by PO Number</h2>
      <Form>
        <Form.Group controlId="poNoInput">
            <Form.Control
                type="text"
                placeholder="Enter PO Number"
                value={poNo}
                onChange={(e) => setPoNo(e.target.value)}
            />
        </Form.Group>
        <Button variant="primary" onClick={handleFindPurchaseOrder}>
            Find Purchase Order
        </Button>
      </Form>
      {error && <Alert className='danger'>{error}</Alert>}
      {purchaseOrder && (
        <Table striped bordered hover responsive>
            <tbody>
                <tr>
                    <td>PO Number:</td>
                    <td>{purchaseOrder.poNo_628}</td>
                </tr>
                <tr>
                    <td>Date:</td>
                    <td>{purchaseOrder.datePO_628}</td>
                </tr>
                <tr>
                    <td>Status:</td>
                    <td>{purchaseOrder.status_628}</td>
                </tr>
            </tbody>
        </Table>)}
    </div>
  );
};

export default FindPurchaseOrder;
