import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

// Assets
import loginImage from "../assets/login.png";
import signupImage from "../assets/signup.png";
import doctorLoginImg from "../assets/doctor-login.png";
import pharmacistLoginImg from "../assets/pharmacist-login.png";
import patientLoginImg from "../assets/patient-login.png";

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalStep, setModalStep] = useState("roles");
  const [selectedRole, setSelectedRole] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  // Disable body scroll when modal/menu open
  useEffect(() => {
    document.body.style.overflow =
      isMobileMenuOpen || showModal ? "hidden" : "unset";
  }, [isMobileMenuOpen, showModal]);

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeAllMenus = () => {
    setIsMobileMenuOpen(false);
    setShowModal(false);
    setModalStep("roles");
    setSelectedRole(null);
  };

  const roleInfo = {
    doctor: { label: "Doctor", icon: "👨‍⚕️", img: doctorLoginImg },
    pharmacist: { label: "Pharmacist", icon: "💊", img: pharmacistLoginImg },
    patient: { label: "Patient", icon: "🧑‍🦰", img: patientLoginImg },
  };

  return (
    <>
      {/* Navbar */}
      <nav className={`navbar ${isScrolled ? "navbar-scrolled" : ""}`}>
        <div className="navbar-logo">
          <Link to="/">Pharma Project</Link>
        </div>
        <div className="navbar-right">
          <div className="navbar-links">
            <Link to="/about">About</Link>
          </div>
          <div className="navbar-links">
            <Link to="/features">Features</Link>
          </div>
          <div className="navbar-actions">
            <button className="login-btn" onClick={() => setShowModal(true)}>
              Login
            </button>
          </div>
          <button
            className="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`mobile-nav-overlay ${isMobileMenuOpen ? "visible" : ""}`}
        onClick={() => setIsMobileMenuOpen(false)}
      ></div>
      <div className={`mobile-nav-menu ${isMobileMenuOpen ? "visible" : ""}`}>
        <div className="mobile-menu-header">
          <h3>Menu</h3>
          <button
            className="mobile-menu-close"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            ×
          </button>
        </div>
        <div className="mobile-nav-links">
          <Link to="/about" onClick={closeAllMenus}>
            About
          </Link>
          <Link to="/features" onClick={closeAllMenus}>
            Features
          </Link>
          <hr />
          <Link to="/login" onClick={closeAllMenus}>
            Login
          </Link>
          <Link to="/signup" onClick={closeAllMenus}>
            Register
          </Link>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay visible" onClick={closeAllMenus}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeAllMenus}>
              ×
            </button>

            {/* Header */}
            <div className="modal-header">
              {modalStep === "roles" && (
                <>
                  <h2>Select Your Role</h2>
                  <p>Choose your role to continue</p>
                </>
              )}
              {modalStep === "options" && selectedRole && (
                <>
                  <h2>
                    {roleInfo[selectedRole].icon} {roleInfo[selectedRole].label}
                  </h2>
                  <p>Choose an option to continue</p>
                </>
              )}
            </div>

            {/* Step 1: Choose Role */}
            {modalStep === "roles" && (
              <div className="modal-options">
                {Object.keys(roleInfo).map((role) => (
                  <div
                    key={role}
                    className="option-card"
                    onClick={() => {
                      setSelectedRole(role);
                      setModalStep("options");
                    }}
                  >
                    <img src={roleInfo[role].img} alt={`${role} option`} />
                    <div className="option-text">
                      <h3>
                        {roleInfo[role].icon} {roleInfo[role].label}
                      </h3>
                      <p>Continue as {roleInfo[role].label}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Step 2: Login/Register for Selected Role */}
            {modalStep === "options" && selectedRole && (
              <div className="modal-options">
                <Link
                  to={`/login?role=${selectedRole}`}
                  onClick={closeAllMenus}
                  className="option-card"
                >
                  <img src={loginImage} alt="Login" />
                  <div className="option-text">
                    <h3>🔑 Login</h3>
                    <p>Access your account</p>
                  </div>
                </Link>
                <Link
                  to={`/signup?role=${selectedRole}`}
                  onClick={closeAllMenus}
                  className="option-card"
                >
                  <img src={signupImage} alt="Signup" />
                  <div className="option-text">
                    <h3>📝 Register</h3>
                    <p>Create a new account</p>
                  </div>
                </Link>
              </div>
            )}

            {/* Footer */}
            {modalStep === "options" && (
              <div className="modal-footer">
                <button
                  className="btn-back"
                  onClick={() => {
                    setModalStep("roles");
                    setSelectedRole(null);
                  }}
                >
                  ← Back
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
