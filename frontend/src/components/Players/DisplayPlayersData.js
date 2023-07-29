import React, { useEffect, useState } from "react";
import NavBar from "../homepage/NavBar"
import { Container } from "react-bootstrap";
import createFooter from "../Footer";
 
const Player = (props) => (
 <tr>
   <td>{props.player.firstName}</td>
   <td>{props.player.lastName628}</td>
   <td>1.{props.player.preferenceForTeams[0]}<br/> 2.{props.player.preferenceForTeams[1]}<br/> 3.{props.player.preferenceForTeams[2]}</td>
   <td>{props.player.phoneNo}</td>
 </tr>
);
 
export default function PlayerList() {

 const [players, setPlayer] = useState([]);
 
 // This method fetches the records from the database.
 useEffect(() => {
   async function getPlayers() {
     const response = await fetch(`http://localhost:5050/player/`);
 
     if (!response.ok) {
       const message = `An error occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const players = await response.json();
     setPlayer(players);
   }
 
   getPlayers();
 
   return;
 }, [players.length]);
 
 // This method will map out the records on the table
 function playerList() {
   return players.map((player) => {
     return (
       <Player
         player={player}
         key={player._id}
       />
     );
   });
 }
 
 // This following section will display the table with the records of individuals.
 return (
  <>
    {/* Here is the navigation bar */}
    {NavBar()}
    <Container>
      <div>
        <h3>Players List</h3>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Preferences for teams</th>
              <th>Phone Number</th>
            </tr>
          </thead>
          <tbody>{playerList()}</tbody>
        </table>
      </div>
    </Container>
      

   {createFooter()}
  </>
   
 );
}