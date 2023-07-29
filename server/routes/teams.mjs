import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

// This section will help you get a list of all the records.
router.get("/", async (req, res) => {
  let collection = await db.collection("teams628");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

// the algorithm to assign players to teams
router.post("/assign", async (req, res) => {
    try {
    let teams = await db.collection("teams628").find({}).toArray();
    let players = await db.collection("players628").find({}).toArray();

    // assuming we are starting at every team not having any players and the order of teamPoints is team0, team1, team2
    let teamPoints = [0, 0, 0];

    // first we check which team has higher number of players wanting it and order is team0, team1, team2
    let counter = [0, 0, 0];
    
    for (let i = 0; i < players.length; i++) {
        let player = players[i];
        let playerFirstPreferences = player.preferenceForTeams[0];

        for(let j = 0; j < teams.length; j++) {
            
            if (teams[j].teamName628 === playerFirstPreferences) {
                counter[j] += 1;
                break;
            }
        }
        
    }

    // assigning each team their respective counter
    let teamsPreferenceOrder = [[teams[0], counter[0]],[teams[1], counter[1]],[teams[2], counter[2]]];

    // sorting the teamsPreferenceOrder array in ascending order based on their likingness by players
    teamsPreferenceOrder.sort((a, b) => a[1] - b[1]);
    let playersInTeamCopy = players.slice();
    let teamsPreferenceOrderCopy = teamsPreferenceOrder.slice();

    // assigning first preference players to teams starting from the least wanted team by players
    for (let i = 0; i < teamsPreferenceOrder.length; i++) {
        
        let team = teamsPreferenceOrder[i][0];
        let teamName = team.teamName628;
        let teamPlayers = team.playersInTeam;
        
        for (let j = 0; j < players.length; j++) {

            // we take 0 in the index because we are taking the first preference of the player
            let player = players[j];
            let playerFirstPreferences = player.preferenceForTeams[0];

            if (teamName === playerFirstPreferences && teamPlayers.length < 2) {
                for(let k = 0; k < teams.length; k++) {
                    if(teamName === teams[k].teamName628) {
                        // assigning the respective team 5 points for first preference player assigned to it
                        teamPoints[k] += 5;
                    }
                }
                teamPlayers.push(player);

                // removing taken player from the list of players
                for(let k = 0; k < playersInTeamCopy.length; k++) {
                    if(player._id === playersInTeamCopy[k]._id) {
                        playersInTeamCopy.splice(k, 1);
                        break;
                    }
                }
                // updating players in the team in the database
                team.playersInTeam = teamPlayers;
                await db.collection("teams628").updateOne({_id: new ObjectId(team._id)}, {$set: team});
            }
        }

        // updatig the players list
        players = playersInTeamCopy.slice();
        if (teamPlayers.length === 2) {
            // removing the team from the list of teams
            for(let k = 0; k < teamsPreferenceOrderCopy.length; k++) {
                if(teamName === teamsPreferenceOrderCopy[k][0].teamName628) {
                    teamsPreferenceOrderCopy.splice(k, 1);
                    break;
                }
            }
        }
    }

    // updating the teamsPreferenceOrder
    teamsPreferenceOrder = teamsPreferenceOrderCopy.slice();

    /* Implementation below is same as above but now we do it for second preference and then third preference */
    
    if(teamsPreferenceOrder.length > 0){
        
        // assigning second preference players to teams starting from the least wanted team by players
        for (let i = 0; i < teamsPreferenceOrder.length; i++) {
            let team = teamsPreferenceOrder[i][0];
            let teamName = team.teamName628;
            let teamPlayers = team.playersInTeam;
    
            for (let j = 0; j < players.length; j++) {
                let player = players[j];
                let playerSecondPreferences = player.preferenceForTeams[1];
    
                if (teamName === playerSecondPreferences && teamPlayers.length < 2 && !teamPlayers.includes(player)) {
    
                    for(let k = 0; k < teams.length; k++) {
                        if(teamName === teams[k].teamName628) {
                            teamPoints[k] += 4;
                        }
                    }
                    teamPlayers.push(player);
                    
                    for(let k = 0; k < playersInTeamCopy.length; k++) {
                        if(player._id === playersInTeamCopy[k]._id) {
                            playersInTeamCopy.splice(k, 1);
                            break;
                        }
                    }
                    team.playersInTeam = teamPlayers;
                    await db.collection("teams628").updateOne({_id: new ObjectId(team._id)}, {$set: team});
                }
            }
            players = playersInTeamCopy.slice();
            if (teamPlayers.length === 2) {
                
                for(let k = 0; k < teamsPreferenceOrderCopy.length; k++) {
                    if(teamName === teamsPreferenceOrderCopy[k][0].teamName628) {
                        teamsPreferenceOrderCopy.splice(k, 1);
                        break;
                    }
                }
            }
        }
    }
    
    teamsPreferenceOrder = teamsPreferenceOrderCopy.slice();
    if(teamsPreferenceOrder.length > 0){
        // assigning third preference players to teams starting from the least wanted team by players
        for (let i = 0; i < teamsPreferenceOrder.length; i++) {
            let team = teamsPreferenceOrder[i][0];
            let teamName = team.teamName628;
            let teamPlayers = team.playersInTeam;

            for (let j = 0; j < players.length; j++) {
                let player = players[j];
                let playerThirdPreferences = player.preferenceForTeams[2];
    
                if (teamName === playerThirdPreferences && teamPlayers.length < 2 && !teamPlayers.includes(player)) {
    
                    for(let k = 0; k < teams.length; k++) {
                        if(teamName === teams[k].teamName628) {
                            teamPoints[k] += 3;
                        }
                    }
                    teamPlayers.push(player);
                    
                    for(let k = 0; k < playersInTeamCopy.length; k++) {
                        if(player._id === playersInTeamCopy[k]._id) {
                            playersInTeamCopy.splice(k, 1);
                            break;
                        }
                    }
                    team.playersInTeam = teamPlayers;
                    await db.collection("teams628").updateOne({_id: new ObjectId(team._id)}, {$set: team});
                }
            }
    
            if (teamPlayers.length === 2) {
                
                for(let k = 0; k < teamsPreferenceOrderCopy.length; k++) {
                    if(teamName === teamsPreferenceOrderCopy[k][0].teamName628) {
                        teamsPreferenceOrderCopy.splice(k, 1);
                        break;
                    }
                }
            }
        }
    }

    // updating the teams points in the database
    for(let i = 0; i < teamPoints.length; i++){
        await db.collection("teams628").updateOne({teamName628: teams[i].teamName628}, {$set: {score: teamPoints[i]}});
    }
    }
    catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

export default router;