import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import React from "react";

function createFooter() {
  return (
    <>
      <Navbar bg="dark" variant="dark" className='mt-5' style={{ position: 'fixed', bottom: 0, width: '100%' }}>
        <Container>
          <Navbar.Brand>
            &copy; Assignment 4, 4140 2023
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
}

export default createFooter;
