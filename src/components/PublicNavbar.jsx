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
import AdminLoginPopup from "../utils/AdminLoginPopup";

const PublicNavbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    const admin = localStorage.getItem("admin");
    if (user) setIsLoggedIn(true);
    if (admin) setIsAdminLoggedIn(true);
  }, []);

  const toggleDrawer = () => setShowDrawer(!showDrawer);
  const closeDrawer = () => setShowDrawer(false);
  const openLoginModal = () => setShowLoginModal(true);
  const closeLoginModal = () => setShowLoginModal(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    closeLoginModal();
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setIsAdminLoggedIn(false);
    navigate("/");
    closeDrawer();
  };

  const handleAdminClick = () => {
    if (isAdminLoggedIn) {
      navigate("/admin");
    } else {
      setShowAdminModal(true);
    }
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
        <Container>
          <Navbar.Brand
            as={NavLink}
            to="/"
            className="fw-bold d-flex align-items-center gap-2"
          >
            <img src={logo} alt="Logo" width="80" height="80" />
          </Navbar.Brand>

          <Button
            variant="outline-primary"
            className="d-lg-none"
            onClick={toggleDrawer}
          >
            ☰
          </Button>

          <Navbar.Collapse
            id="navbar-nav"
            className="justify-content-center d-none d-lg-flex align-items-center"
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

            {!isLoggedIn ? (
              <>
                <Button
                  variant="outline-primary"
                  onClick={openLoginModal}
                  className="ms-3"
                >
                  Login
                </Button>
                <Button
                  variant="outline-warning"
                  onClick={handleAdminClick}
                  className="ms-2"
                >
                  Admin Login
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline-danger"
                  onClick={handleLogout}
                  className="ms-3"
                >
                  Logout
                </Button>
                <Button
                  variant="outline-success"
                  onClick={handleAdminClick}
                  className="ms-3"
                >
                  Admin
                </Button>
              </>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Mobile Drawer */}
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

          <div className="mt-3">
            {!isLoggedIn ? (
              <>
                <Button
                  variant="primary"
                  onClick={() => {
                    openLoginModal();
                    closeDrawer();
                  }}
                  className="w-100 mb-2"
                >
                  Login
                </Button>
                <Button
                  variant="outline-success"
                  onClick={() => {
                    closeDrawer();
                    handleAdminClick();
                  }}
                  className="w-100"
                >
                  Admin
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="danger"
                  onClick={handleLogout}
                  className="w-100"
                >
                  Logout
                </Button>
                <Button
                  variant="success"
                  onClick={() => {
                    closeDrawer();
                    handleAdminClick();
                  }}
                  className="w-100 mt-2"
                >
                  Admin
                </Button>
              </>
            )}
          </div>
        </Offcanvas.Body>
      </Offcanvas>

      {/* User Login Modal */}
      <Modal
        show={showLoginModal}
        onHide={closeLoginModal}
        centered
        backdropClassName="modal-backdrop-custom"
        dialogClassName="modal-dialog-centered modal-lg"
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

      {/* Admin Login Modal */}
      {showAdminModal && (
        <Modal
          show={showAdminModal}
          onHide={() => setShowAdminModal(false)}
          centered
        >
          <Modal.Header closeButton className="bg-dark text-white">
            <Modal.Title className="mx-auto">Admin Panel Login</Modal.Title>
          </Modal.Header>
          <Modal.Body className="bg-light">
            <AdminLoginPopup
              onClose={() => setShowAdminModal(false)}
              onAdminLoginSuccess={() => {
                setShowAdminModal(false);
                setIsLoggedIn(true);
                setIsAdminLoggedIn(true);
                navigate("/admin");
              }}
            />
          </Modal.Body>
        </Modal>
      )}

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

        @media (max-width: 991.98px) {
          .offcanvas {
            width: 50% !important;
          }
        }

        .modal-backdrop-custom {
          background-color: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(3px);
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

        .modal-body.custom-bg .login-box {
          background: rgba(255, 255, 255, 0.9);
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          border-radius: 1rem;
          padding: 2rem;
          max-width: 400px;
          width: 100%;
          color: #000;
        }

        .modal-body.custom-bg .btn-primary {
          font-weight: 700;
          font-size: 1.1rem;
          border-radius: 0.75rem;
          padding: 0.5rem 0;
          width: 100%;
        }

        .modal-header.custom-bg .btn-close {
          filter: invert(1) brightness(2);
          opacity: 1;
        }
      `}</style>
    </>
  );
};

export default PublicNavbar;
