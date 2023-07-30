import { Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import PartsList from './components/parts/PartsList';
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
          <Route path='/' Component={HomePage}/>
        </Routes>
        {createFooter()}
      </div>
    </>
  );
}

export default App;
