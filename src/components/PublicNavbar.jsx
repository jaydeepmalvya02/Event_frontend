import React, { useState } from "react";
import { Navbar, Nav, Container, Offcanvas, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import logo from "/images/expert.png";

const PublicNavbar = () => {
  const [showDrawer, setShowDrawer] = useState(false);

  const toggleDrawer = () => setShowDrawer(!showDrawer);
  const closeDrawer = () => setShowDrawer(false);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/speakers", label: "Speakers" },
    { to: "/events", label: "Events" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact Us" },
  ];

  return (
    <>
      <Navbar expand="lg" className="bg-light shadow-sm py-2">
        <Container>
          <Navbar.Brand
            as={NavLink}
            to="/"
            className="fw-bold d-flex align-items-center gap-2"
          >
            <img
              src={logo}
              alt="Logo"
              width="70"
              height="70"
              className="bg-white border border-primary"
            />
          </Navbar.Brand>

          {/* Toggle Drawer Button */}
          <Button
            variant="outline-primary"
            className="d-lg-none"
            onClick={toggleDrawer}
          >
            ☰
          </Button>

          {/* Desktop Nav */}
          <Navbar.Collapse
            id="navbar-nav"
            className="justify-content-center d-none d-lg-flex"
          >
            <Nav className="text-center gap-3">
              {navLinks.map(({ to, label }) => (
                <Nav.Link
                  key={to}
                  as={NavLink}
                  to={to}
                  onClick={closeDrawer}
                  className={({ isActive }) =>
                    `fw-semibold nav-custom ${
                      isActive ? "text-primary active-nav" : "text-dark"
                    }`
                  }
                >
                  {label}
                </Nav.Link>
              ))}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Mobile Drawer */}
      <Offcanvas
        show={showDrawer}
        onHide={closeDrawer}
        placement="end"
        className="w-50" // This sets the width to 50%
      >
        <Offcanvas.Header closeButton closeVariant="white" className="bg-primary text-white">
          <Offcanvas.Title>
            <span>ExpertOnBoard</span>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="p-3">
          <Nav className="flex-column gap-2">
            {navLinks.map(({ to, label }) => (
              <Nav.Link
                key={to}
                as={NavLink}
                to={to}
                onClick={closeDrawer}
                className={({ isActive }) =>
                  `fw-semibold nav-custom p-3 rounded ${
                    isActive ? "bg-primary text-white" : "text-dark"
                  }`
                }
              >
                {label}
              </Nav.Link>
            ))}
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>

      {/* Scoped styles */}
      <style>{`
        .nav-custom {
          font-size: 1.05rem;
          position: relative;
          transition: all 0.2s ease-in-out;
        }

        .nav-custom::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -4px;
          width: 0%;
          height: 2px;
          background-color: #0d6efd;
          transition: width 0.3s ease;
        }

        .nav-custom:hover::after {
          width: 100%;
        }

        .active-nav::after {
          width: 100%;
        }

        .nav-custom:hover {
          color: #0d6efd;
        }

        /* Make drawer half width on mobile */
        @media (max-width: 991.98px) {
          .offcanvas {
            width: 50% !important;
          }
        }
      `}</style>
    </>
  );
};

export default PublicNavbar;