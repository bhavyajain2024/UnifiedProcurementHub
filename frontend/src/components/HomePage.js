import React from "react";
import NavBar from "./homepage/NavBar"
import Description from "./homepage/Description";
import { Container } from "react-bootstrap";
import createFooter from "./Footer";

function HomePage(){
    return(
        <>
            {/* Here is the navigation bar */}
            {NavBar()}
            
            {/* Anything inside the container would be centered */}
            <Container>
                {/* This is the description of the website */}
                {Description()}
            </Container>

            {createFooter()}
        </>
    );
}

export default HomePage;