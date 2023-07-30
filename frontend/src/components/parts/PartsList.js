import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';

const PartsList = () => {
  const [parts, setParts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5050/CompanyX/parts')
      .then((response) => response.json())
      .then((data) => setParts(data))
      .catch((error) => console.error('Error fetching parts:', error));
  }, []);

  return (
    <div>
      <h2>Parts List</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Part Number</th>
            <th>Part Name</th>
            <th>Part Description</th>
            <th>Current Price</th>
            <th>Quantity on Hand</th>
          </tr>
        </thead>
        <tbody>
          {parts.map((part) => (
            <tr key={part._id}>
              <td>{part.partNo_628}</td>
              <td>{part.partName_628}</td>
              <td>{part.partDescription_628}</td>
              <td>${part.currentPrice_628}</td>
              <td>{part.QoH_628}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default PartsList;
