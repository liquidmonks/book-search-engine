// Import required dependencies
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Modal, Tab } from "react-bootstrap";
import SignUpForm from "./SignupForm";
import LoginForm from "./LoginForm";

import Auth from "../utils/auth";

// Define the NavBar component
export default function NavBar() {
  // Declare a state variable to control the modal visibility
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* Render the navigation bar */}
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">
            <span>
              <span class="g-blue">G</span>
              <span class="o-red">o</span>
              <span class="o-yellow">o</span>
              <span class="g-blue">g</span>
              <span class="l-green">l</span>
              <span class="o-red e-red">e</span>
            </span>{" "}
            Books Search
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/">
                Search For Books
              </Nav.Link>
              {/* Check if the user is logged in and display appropriate links */}
              {Auth.loggedIn() ? (
                <>
                  <Nav.Link as={Link} to="/saved">
                    See Your Books
                  </Nav.Link>
                  <Nav.Link onClick={Auth.logout}>Logout</Nav.Link>
                </>
              ) : (
                <Nav.Link onClick={() => setShowModal(true)}>Login/Sign Up</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Render the modal with login and sign up forms */}
      <Modal show={showModal} onHide={() => setShowModal(false)} aria-labelledby="signup-modal" centered>
        <Tab.Container defaultActiveKey="login">
          <Modal.Header closeButton>
            <Modal.Title id="signup-modal">
              <Nav variant="pills">
                <Nav.Link eventKey="login">Login</Nav.Link>
                <Nav.Link eventKey="signup">Sign Up</Nav.Link>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey="login">
                <LoginForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
              <Tab.Pane eventKey="signup">
                <SignUpForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
    </>
  );
}
