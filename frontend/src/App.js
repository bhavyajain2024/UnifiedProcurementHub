import { Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import PartsList from './components/parts/PartsList';
import PurchaseOrdersList from './components/purchaseOrder/ListPurchaseOrder';
import FindPurchaseOrder from './components/purchaseOrder/FindPO';
import FindPart from './components/parts/FindPart';
import SubmitPurchaseOrder from './components/purchaseOrder/SubmitPO';
import createFooter from './components/Footer';
import NavBar from './components/NavBar';

function App() {
  return (
    <>
      <div>
        <NavBar/>
        <Routes>
          <Route exact path='/' Component={HomePage}/>
          <Route path='/parts' Component={PartsList}/>
          <Route path='/purchaseOrder' Component={PurchaseOrdersList}/>
          <Route path='/findPart' Component={FindPart}/>
          <Route path='/findPurchaseOrder' Component={FindPurchaseOrder}/>
          <Route path='/submitPO' Component={SubmitPurchaseOrder}/>
        </Routes>
        {createFooter()}
      </div>
    </>
  );
}

export default App;
