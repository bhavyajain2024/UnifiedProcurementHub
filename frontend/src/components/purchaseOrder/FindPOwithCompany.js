import React, { useEffect, useState } from 'react';
import { Table, Alert } from 'react-bootstrap';

const FindPurchaseOrderCompany = () => {
  const [purchaseOrderDetails, setPurchaseOrderDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5050/CompanyZ/purchase-orders-company`)
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
  }, []);

  return (
    <div className='container'>
      <h2>Listing PO details with respective companies</h2>
      
      {error && <Alert className='danger'>{error}</Alert>}
      {purchaseOrderDetails && (
        <>
        {purchaseOrderDetails.map((element) => (
           <Table striped bordered hover responsive key={element._id}>
            <thead>
                <tr>
                    <th>PO Number: {element.POs_628_poNo}</th>
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
               <tr>
                   <td>Company ordered at:</td>
                   <td>{element.company_628}</td>
               </tr>
           </tbody>
       </Table>
        ))}
       
        </>
        )}
    </div>
  );
};

export default FindPurchaseOrderCompany;
