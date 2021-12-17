import React from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import LanguageDropdown from "./LanguageDropdown";

import "bootstrap/dist/css/bootstrap.min.css";

export default function Hamburger() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="green" variant="dark" className='fixed-top'>
      <Navbar.Brand>
        <img
          height='50px'
          className="d-inline-block align-top"
          src={'assets/logo1.png'}
        ></img>

      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav >

          <LanguageDropdown />
        </Nav>

      </Navbar.Collapse>
    </Navbar >
  );
}
