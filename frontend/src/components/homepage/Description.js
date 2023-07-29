import React from "react";
import { Card } from "react-bootstrap";

function Description(){
    return(
        <>
            <Card  className="mt-4" text="light" bg="dark"style={{ height: '50vh' }}>
                <Card.Body >
                    <Card.Title><h3>Welcome to Assignment 3 submission for 4140</h3></Card.Title>
                    <Card.Subtitle className="mb-2 text-warning">Submitted by: Bhavya Jain</Card.Subtitle>
                    {/* Text taken from lorem ipsum */}
                    <Card.Text className="pt-3 fs-5">
                    To check the list of players, please click Players tab above.
                    <br/>
                    <br/>
                    To check the list of teams, please click Teams tab above.
                    </Card.Text>
                </Card.Body>
            </Card>
        </>
    );
}

export default Description;