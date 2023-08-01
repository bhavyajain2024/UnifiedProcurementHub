// Author: Bhavya Jain
import React from "react";
import { Card } from "react-bootstrap";

function Description() {
  return (
    <>
      <Card className="mt-4" text="light" bg="dark">
        <Card.Body>
          <Card.Title>
            <h3>Company Z</h3>
          </Card.Title>
          <Card.Subtitle className="mb-2 text-warning">
            Order parts through our website!
          </Card.Subtitle>
          {/* Text taken from lorem ipsum */}
          <Card.Text className="pt-3 fs-5">
            Welcome to the company Z website! We are a company that provides tools and you can submit purchase order using the links at the top of the page.
            <br />
            <br />
            Click links on top navigation bar to perform the actions.
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}

export default Description;
