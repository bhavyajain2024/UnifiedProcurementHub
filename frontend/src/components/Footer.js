import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import React from "react";

function createFooter(){

    return(
        <>
            <Navbar bg="dark" variant="dark" className='mt-5'>
                <Container>
                    <Navbar.Brand>
                       &copy; Assignment 3, 4140 2023
                    </Navbar.Brand>
                </Container>
            </Navbar>
        </>
    );
}

export default createFooter;