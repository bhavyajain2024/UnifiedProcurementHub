import { Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import PlayerList from './components/Players/DisplayPlayersData';
import TeamList from './components/Teams/DisplayTeamsData';

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route exact path='/' Component={HomePage}/>
          <Route path='/DisplayPlayersData' Component={PlayerList}/>
          <Route path='/Teams' Component={TeamList}/>
        </Routes>
      </div>
    </>
  );
}

export default App;
