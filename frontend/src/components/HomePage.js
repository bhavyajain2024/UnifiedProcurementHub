// Author: Bhavya Jain
import React from "react";
import Description from "./homepage/Description";
import { Container } from "react-bootstrap";

function HomePage() {
  return (
    <>
      <Container>
        {Description()}
      </Container>
    </>
  );
}

export default HomePage;
