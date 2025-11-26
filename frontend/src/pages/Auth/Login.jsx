import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/Login.css";
import axios from "axios";

const initialFormState = { email: "", password: "" };


function parseJwt(token) {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
}

export default function Login() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const roleFromURL = params.get("role"); // doctor / pharmacist / patient

  // Role is now set by URL, or defaults to "doctor"
  const [role, setRole] = useState(roleFromURL || "doctor");
  const [formData, setFormData] = useState(initialFormState);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  // Reset form when role changes (e.g., if URL param changes)
  useEffect(() => {
    setRole(roleFromURL || "doctor");
    setFormData(initialFormState);
    setMessage("");
  }, [roleFromURL]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // --- 3. UPDATED handleSubmit ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    // We must use URLSearchParams for the OAuth2 form
    const formBody = new URLSearchParams();
    formBody.append('username', formData.email);    // Backend expects 'username'
    formBody.append('password', formData.password);

    try {
      // Call the backend /auth/login route
      const response = await axios.post(
        "http://localhost:8000/auth/login",
        new URLSearchParams({
          email:formData.email,
          password: formData.password
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      const data = response.data; // axios puts data directly in .data

      // Login was successful, now check the role
      const token = data.access_token;
      const decodedToken = parseJwt(token);

      if (decodedToken && decodedToken.role === role) {
        // SUCCESS! Role matches.
        setMessage(`Login successful! Welcome, ${role}.`);
        navigate("/")
      } else {
        // Role mismatch error
        throw new Error(`Login failed. This account is a ${decodedToken.role || 'unknown'}, not a ${role}.`);
      }

    } catch (error) {
      // Handle errors
      if (error.response && error.response.data && error.response.data.detail) {
        // This catches backend errors like 401 "Incorrect email or password"
        setMessage(error.response.data.detail);
      } else {
        setMessage(error.message || "An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };
  // --- END UPDATED handleSubmit ---

  const sidebarContent = {
    doctor: {
      title: "For Medical Professionals",
      text: "Access patient records, manage prescriptions, and collaborate securely.",
    },
    pharmacist: {
      title: "For Pharmacy Experts",
      text: "Manage inventory, process prescriptions, and ensure patient care.",
    },
    patient: {
      title: "For Patients",
      text: "View your health records, book appointments, and consult with doctors safely.",
    },
  };

  // Ensure role is valid, default to 'doctor' if URL is bad
  const currentRole = sidebarContent[role] ? role : "doctor";

  return (
    <div className={`login-container role-${currentRole}`}>
      <div className="login-wrapper">
        {/* Sidebar */}
        <div className="login-sidebar">
          <h2>{sidebarContent[currentRole].title}</h2>
          <p>{sidebarContent[currentRole].text}</p>
        </div>

        {/* Form */}
        <div className="login-panel">
          <div className="login-header">
            <h2>
              {currentRole === "doctor"
                ? "Doctor Login"
                : currentRole === "pharmacist"
                ? "Pharmacist Login"
                : "Patient Login"}
            </h2>
            <p>Welcome back! Please enter your credentials.</p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            
            {/* --- 4. OMITTED the role <select> dropdown --- */}

            {/* Email */}
            <div className="login-group">
              <span className="login-icon">📧</span>
              <input
                className="login-input"
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Password */}
            <div className="login-group">
              <span className="login-icon">🔒</span>
              <input
                className="login-input"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <span
                className="login-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  // Eye-off icon
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 
                      0-11-8-11-8a18.45 18.45 0 0 1 
                      5.06-5.94M9.9 4.24A9.12 9.12 0 
                      0 1 12 4c7 0 11 8 11 8a18.5 
                      18.5 0 0 1-2.16 3.19m-6.72-1.07a3 
                      3 0 1 1-4.24-4.24"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                  </svg>
                ) : (
                  // Eye icon
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 
                      8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                )}
              </span>
            </div>

            {/* Submit Button */}
            <button type="submit" className="login-btn2" disabled={isLoading}>
              {isLoading ? "Logging In..." : "Login"}
            </button>
          </form>

          {/* Success/Error Messages */}
          {message && (
             <p className={`login-message ${message.toLowerCase().includes("failed") || message.toLowerCase().includes("error") ? "error" : "success"}`}>
                {message}
             </p>
          )}

          {/* Links */}
          <div className="login-links">
            <a href={`/${currentRole}-forgot-password`}>Forgot Password?</a>
            <span className="login-separator">·</span>
            <a href="/signup">Create an Account</a>
          </div>
        </div>
      </div>
    </div>
  );
}