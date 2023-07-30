import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';

const PurchaseOrdersList = () => {
  const [purchaseOrders, setPurchaseOrders] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5050/CompanyX/purchase-orders')
      .then((response) => response.json())
      .then((data) => setPurchaseOrders(data))
      .catch((error) => console.error('Error fetching purchase orders:', error));
  }, []);

  return (
    <div className='container'>
      <br/>
      <h2>Purchase Orders List</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>PO Number</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {purchaseOrders.map((po) => (
            <tr key={po.poNo_628}>
              <td>{po.poNo_628}</td>
              <td>{po.datePO_628}</td>
              <td>{po.status_628}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default PurchaseOrdersList;
