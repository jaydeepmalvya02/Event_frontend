import React, { useEffect, useState } from "react";
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
import RegisterationForm from "./RegistrationForm"; // ✅ Your registration form component

const PublicNavbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    try {
      const user = JSON.parse(storedUser);
      if (user && user.user && user.user.email) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error("Invalid user data in localStorage", error);
      setIsLoggedIn(false);
    }
  }, []);
  
  const toggleDrawer = () => setShowDrawer(!showDrawer);
  const closeDrawer = () => setShowDrawer(false);
  const openLoginModal = () => setShowLoginModal(true);
  const closeLoginModal = () => setShowLoginModal(false);
  const openRegisterModal = () => setShowRegisterModal(true);
  const closeRegisterModal = () => setShowRegisterModal(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    closeLoginModal();
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate("/");
    closeDrawer();
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/speakers", label: "Speakers" },
    { to: "/EventDetails", label: "Events" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact Us" },
  ];

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

          <Navbar.Collapse
            id="navbar-nav"
            className="d-none d-lg-flex justify-content-center"
          >
            <Nav className="text-center gap-3">
              {navLinks.map(({ to, label }) => (
                <Nav.Link
                  key={to}
                  as={NavLink}
                  to={to}
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

      {/* Drawer for small screens */}
      <Offcanvas
        show={showDrawer}
        onHide={closeDrawer}
        placement="end"
        className="w-50"
      >
        <Offcanvas.Header
          closeButton
          closeVariant="white"
          className="bg-primary text-white"
        >
          <Offcanvas.Title>ExpertOnBoard</Offcanvas.Title>
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

      {/* Login Modal */}
      <Modal
        show={showLoginModal}
        onHide={closeLoginModal}
        centered
        dialogClassName="modal-lg"
      >
        <div className="modal-content custom-bg">
          <Modal.Header closeButton className="custom-bg">
            <Modal.Title className="w-100 text-center">
              To Join The Event, Login Below 👇
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="custom-bg">
            <Login
              onClose={closeLoginModal}
              onLoginSuccess={handleLoginSuccess}
            />
          </Modal.Body>
        </div>
      </Modal>

      {/* Register Modal */}
      <Modal
        show={showRegisterModal}
        onHide={closeRegisterModal}
        centered
        dialogClassName="modal-lg"
      >
        <div className="modal-content custom-bg">
          <Modal.Header closeButton className="custom-bg">
            <Modal.Title className="w-100 text-center">
              Register for ExpertOnBoard
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="custom-bg">
            <RegisterationForm onClose={closeRegisterModal} />
          </Modal.Body>
        </div>
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
      `}</style>
    </>
  );
};

export default PublicNavbar;
