import React, { useState, useEffect } from 'react';
import Select from 'react-select';


const SubmitPurchaseOrder = () => {
  const [poNo, setPoNo] = useState('');
  const currDate = new Date();
  const [clientId, setClientId] = useState('');
  const [parts, setParts] = useState([]);
  const [partNo, setPartNo] = useState('');
  const [quantity, setQuantity] = useState('');
  const [purchaseOrderDetails, setPurchaseOrderDetails] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [placeholder, setPlaceholder] = useState('Select Part');

  useEffect(() => {
    fetch('https://companyy-0fs8.onrender.com/CompanyY/parts')
      .then(response => response.json())
      .then(data => setParts(data))
      .catch(error => console.error('Error fetching parts:', error));
  }, []);

  const handleAddPart = () => {
    const selectedPart = parts.find(part => part.partNo_628 === parseInt(partNo));
    if (!selectedPart) {
      setErrorMessage('Part not found');
      return;
    }

    const newPurchaseOrderDetail = {
      parts_628_partNo: selectedPart.partNo_628,
      price_628: selectedPart.currentPrice_628,
      qty_628: parseInt(quantity),
      status_628: 'active',
      lineNo_628: purchaseOrderDetails.length + 1
    };

    setPurchaseOrderDetails([...purchaseOrderDetails, newPurchaseOrderDetail]);
    // reset the variables so that new selection can be made by the user
    setPartNo('');
    setQuantity('');
    setErrorMessage('');
  };

  const handleSubmit = () => {
    const newPO = {
      poNo_628: parseInt(poNo),
      datePO_628: currDate.getDate() + '/' + (currDate.getMonth() + 1) + '/' + currDate.getFullYear(),
      clients_628_clientID: parseInt(clientId),
      purchaseOrderDetails
    };

    fetch('https://companyy-0fs8.onrender.com/CompanyY/submit-purchase-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newPO)
    })
    .then(response => {
      if (response.ok) {
        setSuccessMessage('Purchase Order submitted successfully');
        setErrorMessage('');
        setPoNo('');
        setClientId('');
        setPurchaseOrderDetails([]);
      } else {
        response.json().then(data => {
        setSuccessMessage('');
        setErrorMessage('Failed to submit Purchase Order beacause ' + data.message);
        });
      }
    })
    .catch(error => {
      setSuccessMessage('');
      setErrorMessage('Failed to submit Purchase Order because' + error);
    });
  };

  return (
    <div className='container'>
      <h2>Submit Purchase Order</h2>
      <div>
        <label>PO Number:</label>
        <input type="text" value={poNo} onChange={(e) => setPoNo(e.target.value)} />
      </div>
      <div>
        <label>Client ID:</label>
        <input type="text" value={clientId} onChange={(e) => setClientId(e.target.value)} />
      </div>

      <h3>Add Parts to Purchase Order</h3>
      <div>
        <label>Part:</label>
        <Select
          options={parts.map(part => ({ value: part.partNo_628, label: part.partName_628 }))}
          placeholder={placeholder}
          value={partNo}
          onChange={(e) => {
            setPartNo(e.value);
          setPlaceholder(e.label);}}
        />
        <label>Quantity:</label>
        <input type="text" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
        <button onClick={handleAddPart}>Add Part</button>
      </div>

      <h3>Added Parts</h3>
      <ul>
        {purchaseOrderDetails.map((element) => (
          <li key={element.lineNo_628}>
            Part No: {element.parts_628_partNo} - Quantity: {element.qty_628}
          </li>
        ))}
      </ul>

      <button onClick={handleSubmit}>Submit Purchase Order</button>
      {successMessage && <div className='alert alert-success'>{successMessage}</div>}
      {errorMessage && <div className='alert alert-danger'>{errorMessage}</div>}
    </div>
  );
};

export default SubmitPurchaseOrder;
