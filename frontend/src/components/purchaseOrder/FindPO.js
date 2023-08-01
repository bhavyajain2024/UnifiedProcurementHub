import React, { useState } from 'react';
import { Table, Form, Button, Alert } from 'react-bootstrap';

const FindPurchaseOrder = () => {
  const [poNo, setPoNo] = useState('');
  const [purchaseOrderDetails, setPurchaseOrderDetails] = useState(null);
  const [error, setError] = useState(null);

  const handleFindPurchaseOrder = () => {
    if(poNo === '') {
        setError('Please enter a valid PO Number');
        setPurchaseOrderDetails(null);
        return;
    }
    fetch(`http://localhost:5050/CompanyZ/purchase-orders/${poNo}`)
      .then((response) => {
        if (!response.ok) {
          setError('Purchase Order not found');
          setPurchaseOrderDetails(null);
          return null;
        }
        setError(null);
        return response.json();
      })
      .then((data) => setPurchaseOrderDetails(data))
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
      {purchaseOrderDetails && (
        <>
        {purchaseOrderDetails.map((element) => (
           <Table striped bordered hover responsive key={element._id}>
            <thead>
                <tr>
                    <th>Line Number: {element.lineNo_628}</th>
                </tr>
            </thead>
           <tbody>
               <tr>
                   <td>Part Number:</td>
                   <td>{element.parts_628_partNo}</td>
               </tr>
               <tr>
                   <td>Price:</td>
                   <td>{element.price_628}</td>
               </tr>
               <tr>
                   <td>Quanity:</td>
                   <td>{element.qty_628}</td>
               </tr>
               <tr>
                   <td>Status:</td>
                   <td>{element.status_628}</td>
               </tr>
           </tbody>
       </Table>
        ))}
       
        </>
        )}
    </div>
  );
};

export default FindPurchaseOrder;
