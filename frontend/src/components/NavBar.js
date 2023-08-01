// Author: Bhavya Jain
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import React from "react";

function NavBar() {

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <div className=" container d-flex justify-content-between align-items-center">
          <div className="align-items-center">
            <Navbar.Brand as={Link} to="/" className="fw-bold ">
              <h1 className="mt-4">CompanyZ</h1>
            </Navbar.Brand>
          </div>
          <div>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                
                <Nav.Link className="mx-3" as={Link} to="/parts">
                  List Parts
                </Nav.Link>
                <Nav.Link className="mx-3" as={Link} to="/purchaseOrder">
                  List Purchase Orders
                </Nav.Link>
                <Nav.Link className="mx-3" as={Link} to="/findPart">
                  Find Part
                </Nav.Link>
                <Nav.Link className="mx-3" as={Link} to="/findPurchaseOrder">
                  Find PO
                </Nav.Link>
                <Nav.Link className="mx-3" as={Link} to="/findPurchaseOrderCompany">
                  List PO for employees
                </Nav.Link>
                <Nav.Link className="mx-3" as={Link} to="/submitPO">
                  Submit Puchase Order
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </div>
        </div>
      </Container>
    </Navbar>
  );
}

export default NavBar;
