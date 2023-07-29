import React, { useEffect, useState } from "react";
import NavBar from "../homepage/NavBar"
import { Button, Container } from "react-bootstrap";
import createFooter from "../Footer";
 
const Team = (props) => (
 <tr>
   <td>{props.team.teamName628}</td>
   <td>{props.team.managerFirstName}</td>
   <td>{props.team.managerLastName}</td>
   <td>
        <ul>
          {props.team.playersInTeam.map((player, index) => (
            <li key={index}>{player.firstName}</li>
          ))}
        </ul>
    </td>
   <td>{props.team.managerPhoneNo}</td>
   <td>{props.team.score}</td>
 </tr>
);
 
export default function TeamList() {

 const [teams, setTeam] = useState([]);
 
 // This method fetches the records from the database.
 useEffect(() => {
   async function getTeams() {
     const response = await fetch(`http://localhost:5050/team/`);
 
     if (!response.ok) {
       const message = `An error occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const teams = await response.json();
     setTeam(teams);
   }
 
   getTeams();
 
   return;
 }, [teams.length]);
 
 // This method will map out the records on the table
 function teamList() {
   return teams.map((team) => {
     return (
       <Team
         team={team}
         key={team._id}
       />
     );
   });
 }

 const handleAssignTeams = async () => {
    window.location.reload();
    await fetch("http://localhost:5050/team/assign", {
     method: "POST",
   })
   .catch(error => {
     window.alert(error);
     return;
   });
 }
 
 // This following section will display the table with the records of individuals.
 return (
  <>
    {/* Here is the navigation bar */}
    {NavBar()}
    <Container>
      <div>
        <h3>Teams List</h3>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
                <th>Team Name</th>
                <th>Manager's First Name</th>
                <th>Manager's Last Name</th>
                <th>Players in team</th>
                <th>Manager's Phone Number</th>
                <th>Score of Team</th>
            </tr>
          </thead>
          <tbody>{teamList()}</tbody>
        </table>
      </div>
      <div>
        <Button onClick={handleAssignTeams}>Assign Teams</Button>
      </div>
    </Container>
      

   {createFooter()}
  </>
   
 );
}