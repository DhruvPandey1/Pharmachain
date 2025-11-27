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
  const navigate = useNavigate(); // ✅ needed for redirect

  const params = new URLSearchParams(location.search);
  const roleFromURL = params.get("role");

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

    // ⏳ Simulating API call
    setTimeout(() => {
      setIsLoading(false);
      setMessage(`Login successful! Redirecting...`);
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

      // 🎯 Redirect to dashboard
      navigate("/dashboard");   // <<— ONLY THIS LINE NEEDED
    }, 1200);
  };

  // Ensure role is valid, default to 'doctor' if URL is bad
  const currentRole = sidebarContent[role] ? role : "doctor";

  return (
    <div className={`login-container role-${currentRole}`}>
      <div className="login-wrapper">

        {/* Sidebar */}
        <div className="login-sidebar">
          <h2>
            {role === "doctor"
              ? "For Medical Professionals"
              : role === "pharmacist"
              ? "For Pharmacy Experts"
              : "For Patients"}
          </h2>
          <p>Secure access to your healthcare portal.</p>
          <h2>{sidebarContent[currentRole].title}</h2>
          <p>{sidebarContent[currentRole].text}</p>
        </div>

        {/* Login Panel */}
        <div className="login-panel">
          <div className="login-header">
            <h2>
              {currentRole === "doctor"
                ? "Doctor Login"
                : currentRole === "pharmacist"
                ? "Pharmacist Login"
                : "Patient Login"}
            </h2>
            <p>Please enter your credentials.</p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            {!roleFromURL && (
              <select
                className="login-select"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="doctor">Login as Doctor</option>
                <option value="pharmacist">Login as Pharmacist</option>
                <option value="patient">Login as Patient</option>
              </select>
            )}
            
            {/* --- 4. OMITTED the role <select> dropdown --- */}

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
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>

            <button type="submit" className="login-btn2" disabled={isLoading}>
              {isLoading ? "Logging In..." : "Login"}
            </button>
          </form>

          {message && <p className="login-message">{message}</p>}
          {/* Success/Error Messages */}
          {message && (
             <p className={`login-message ${message.toLowerCase().includes("failed") || message.toLowerCase().includes("error") ? "error" : "success"}`}>
                {message}
             </p>
          )}

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