import React, { useState } from "react";
import {
  Navbar,
  Nav,
  Container,
  Offcanvas,
  Button,
  Modal,
} from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "/images/ExpertLogo.jpeg";
import Login from "./Login";
import RegisterationForm from "./RegistrationForm";
import { useAuth } from "../context/AuthContext.jsx";

const PublicNavbar = () => {
  const { isLoggedIn, login, logout } = useAuth();
  const [showDrawer, setShowDrawer] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = () => setShowDrawer(!showDrawer);
  const closeDrawer = () => setShowDrawer(false);
  const openLoginModal = () => setShowLoginModal(true);
  const closeLoginModal = () => setShowLoginModal(false);
  const openRegisterModal = () => setShowRegisterModal(true);
  const closeRegisterModal = () => setShowRegisterModal(false);

  const handleLoginSuccess = (user) => {
    login(user);
    closeLoginModal();
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    closeDrawer();
  };

  const publicLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/speakers", label: "Speakers" },
    { to: "/EventDetails", label: "Events" },
    { to: "/findJobs", label: "Jobs" },
  ];

  const protectedLinks = [];

  const handleProtectedClick = (e, to) => {
    if (!isLoggedIn) {
      e.preventDefault();
      setShowLoginModal(true);
    } else {
      navigate(to);
      closeDrawer();
    }
  };

  return (
    <>
      <Navbar expand="lg" className="bg-light shadow-sm py-2">
        <Container className="d-flex justify-content-between align-items-center">
          <Navbar.Brand
            as={NavLink}
            to="/"
            className="fw-bold d-flex align-items-center gap-2"
          >
            <img src={logo} alt="Logo" width="80" height="80" />
          </Navbar.Brand>

          <Navbar.Collapse className="d-none d-lg-flex justify-content-center">
            <Nav className="text-center gap-3">
              {[...publicLinks, ...protectedLinks].map(({ to, label }) => (
                <Nav.Link
                  key={to}
                  as={NavLink}
                  to={to}
                  onClick={(e) =>
                    protectedLinks.some((link) => link.to === to) &&
                    !isLoggedIn &&
                    handleProtectedClick(e, to)
                  }
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

          <div className="d-flex align-items-center gap-2">
            {!isLoggedIn ? (
              <>
                <Button variant="outline-primary" onClick={openLoginModal}>
                  Login
                </Button>
                <Button variant="outline-success" onClick={openRegisterModal}>
                  Register
                </Button>
              </>
            ) : (
              <Button variant="outline-danger" onClick={handleLogout}>
                Logout
              </Button>
            )}
            <Button
              variant="outline-primary"
              className="d-lg-none"
              onClick={toggleDrawer}
            >
              ☰
            </Button>
          </div>
        </Container>
      </Navbar>

      {/* Offcanvas Mobile Drawer */}
      <Offcanvas show={showDrawer} onHide={closeDrawer} placement="end">
        <Offcanvas.Header closeButton className="bg-primary text-white">
          <Offcanvas.Title>ExpertOnBoard</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="p-3">
          <Nav className="flex-column gap-2">
            {[...publicLinks, ...protectedLinks].map(({ to, label }) => (
              <Nav.Link
                key={to}
                as={NavLink}
                to={to}
                onClick={(e) =>
                  protectedLinks.some((link) => link.to === to) &&
                  !isLoggedIn &&
                  handleProtectedClick(e, to)
                }
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

      {/* Login Modal */}
      <Modal
        show={showLoginModal}
        onHide={closeLoginModal}
        centered
        backdrop="static"
        dialogClassName="modal-lg"
      >
        <Modal.Header closeButton style={{ backgroundColor: "#212529" }}>
          <Modal.Title className="text-white w-100 text-center">
            To Join The Event, Login Below 
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#f8f9fa" }}>
          <Login
            onClose={closeLoginModal}
            onLoginSuccess={handleLoginSuccess}
          />
        </Modal.Body>
      </Modal>

      {/* Register Modal */}
      <Modal
        show={showRegisterModal}
        onHide={closeRegisterModal}
        centered
        backdrop="static"
        dialogClassName="modal-lg"
      >
        <Modal.Header closeButton style={{ backgroundColor: "#212529" }}>
          <Modal.Title className="text-white w-100 text-center">
            Register for ExpertOnBoard
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#f8f9fa" }}>
          <RegisterationForm onClose={closeRegisterModal} />
        </Modal.Body>
      </Modal>

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
        .nav-custom:hover::after,
        .active-nav::after {
          width: 100%;
        }
        .nav-custom:hover {
          color: #0d6efd;
        }
        .modal-content.custom-bg {
          background-image: url('/images/bg3.png');
          background-size: cover;
          background-position: center;
          color: #fff;
          border-radius: 1rem;
          border: none;
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        }
        .modal-header.custom-bg {
          background: rgba(0, 0, 0, 0.4);
          border-bottom: none;
          color: #F1C40F;
          font-weight: 700;
          justify-content: center;
        }
        .modal-body.custom-bg {
          border-radius: 0 0 1rem 1rem;
          padding: 2rem;
          display: flex;
          justify-content: center;
          align-items: center;
          background: transparent;
        }
          .modal-content {
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0,0,0,0.15);
}
.modal-header {
  border-bottom: none;
}
.modal-title {
  font-weight: 600;
  font-size: 1.25rem;
}
.btn-close {
  filter: invert(1);
}

      `}</style>
    </>
  );
};

export default PublicNavbar;
