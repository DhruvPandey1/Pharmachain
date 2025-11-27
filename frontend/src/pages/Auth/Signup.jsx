import { useState } from "react";
import "../styles/Signup.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const indianStates = [
  "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat","Haryana","Himachal Pradesh",
  "Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Odisha",
  "Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh","Uttarakhand","West Bengal"
];

const initialDoctorState = {
  role:"doctor", fullName: "", email: "", password: "", confirmPassword: "",
  phone: "", dateOfBirth: "", gender: "",
  licenseNumber: "", speciality: "", yearsOfExperience: "", qualification: "",
  hospitalName: "", hospitalAddress: "", city: "", state: "", pincode: "", aadharNumber: "", panNumber: ""
};
const initialPharmacistState = {
  role:"pharmacist", fullName: "", email: "", password: "", confirmPassword: "",
  phone: "", dateOfBirth: "", gender: "",
  licenseNumber: "", qualification: "", yearsOfExperience: "",
  pharmacyName: "", addressLine1: "", addressLine2: "", city: "", state: "", pincode: "", gstNumber: "", aadharNumber: ""
};
const initialPatientState = {
  role:"patient", fullName: "", email: "", password: "", confirmPassword: "",
  phone: "", dateOfBirth: "", gender: "",
  emergencyContactName: "", emergencyContactPhone: "", address: "",
  city: "", state: "", pincode: "", aadharNumber: "", allergies: ""
};

export default function Signup() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(initialDoctorState);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // --- HANDLERS ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const handleRoleChange = (e) => {
    const newRole = e.target.value;
    setStep(1);
    if (newRole === "doctor") setFormData(initialDoctorState);
    else if (newRole === "pharmacist") setFormData(initialPharmacistState);
    else if (newRole === "patient") setFormData(initialPatientState);
    setErrors({});
  };

  const validateStep = () => {
    const currentErrors = {};
    const fieldsByStep = {
      doctor: {
        1: ["fullName", "email", "password", "confirmPassword", "phone", "dateOfBirth", "gender"],
        2: ["licenseNumber", "speciality", "yearsOfExperience", "qualification"],
        3: ["hospitalName", "hospitalAddress", "city", "state", "pincode", "aadharNumber", "panNumber"],
      },
      pharmacist: {
        1: ["fullName", "email", "password", "confirmPassword", "phone", "dateOfBirth", "gender"],
        2: ["licenseNumber", "qualification", "yearsOfExperience"],
        3: ["pharmacyName", "addressLine1", "city", "state", "pincode", "gstNumber", "aadharNumber"],
      },
      patient: {
        1: ["fullName", "email", "password", "confirmPassword", "phone", "dateOfBirth", "gender"],
        2: ["emergencyContactName", "emergencyContactPhone", "address", "city", "state", "pincode", "aadharNumber"],
      },
    };

    let fieldsToValidate = fieldsByStep[formData.role][step];
    fieldsToValidate.forEach((f) => {
      if (!formData[f] || String(formData[f]).trim() === "")
        currentErrors[f] = "This field is required.";
    });

    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email))
      currentErrors.email = "Enter a valid email address.";
    if (formData.password && formData.password.length < 8)
      currentErrors.password = "Password must be at least 8 characters.";
    if (step === 1 && formData.password !== formData.confirmPassword)
      currentErrors.confirmPassword = "Passwords do not match.";

    setErrors(currentErrors);
    return Object.keys(currentErrors).length === 0;
  };

  const maxSteps = formData.role === "patient" ? 2 : 3;
  const handleNext = () => { if (validateStep()) setStep((p) => p + 1); };
  const handlePrev = () => { setErrors({}); setStep((p) => p - 1); };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    const {role, confirmPassword, ...data} = formData
    const response = await axios.post(`http://localhost:8000/auth/signup/${formData.role}`, data)
    console.log(response);
    navigate("/login");
    // e.preventDefault();
    if (validateStep()) {
      console.log("Final Data:", formData);
      setMessage(`Registration for ${formData.role} submitted!`);
    }
  };

  // --- RENDER HELPERS ---
  const renderField = (name, label, type = "text", options = {}) => {
    const isPassword = type === "password";
    const showState = name === "password" ? showPassword : showConfirmPassword;
    const setShowState = name === "password" ? setShowPassword : setShowConfirmPassword;
    const inputType = isPassword ? (showState ? "text" : "password") : type;

    return (
      <div className={`form-group ${options.span2 ? "grid-col-span-2" : ""}`}>
        <label>{label}</label>
        <div className="input-wrapper">
          <input
            className={`form-input ${errors[name] ? "error" : ""}`}
            type={inputType}
            name={name}
            value={formData[name] || ""}
            onChange={handleChange}
            placeholder={options.placeholder || ""}
          />
          {isPassword && (
            <span className="password-toggle-icon" onClick={() => setShowState((p) => !p)}>
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
          )}
        </div>
        {errors[name] && <p className="error-message">{errors[name]}</p>}
      </div>
    );
  };

  const renderSelect = (name, label, values) => (
    <div className="form-group">
      <label>{label}</label>
      <select
        className={`form-select ${errors[name] ? "error" : ""}`}
        name={name}
        value={formData[name] || ""}
        onChange={handleChange}
      >
        <option value="">Select...</option>
        {values.map((v) => (
          <option key={v} value={v}>{v}</option>
        ))}
      </select>
      {errors[name] && <p className="error-message">{errors[name]}</p>}
    </div>
  );

  const renderTextarea = (name, label, options = {}) => (
    <div className={`form-group ${options.span2 ? "grid-col-span-2" : ""}`}>
      <label>{label}</label>
      <textarea
        className={`form-textarea ${errors[name] ? "error" : ""}`}
        name={name}
        value={formData[name] || ""}
        onChange={handleChange}
        placeholder={options.placeholder || ""}
      />
      {errors[name] && <p className="error-message">{errors[name]}</p>}
    </div>
  );

  // --- STEP RENDERING ---
  const renderStep1 = () => (
    <div className="form-grid">
      <div className="form-group grid-col-span-2">
        <label>Register As</label>
        <select className="form-select" name="role" value={formData.role} onChange={handleRoleChange}>
          <option value="doctor">Doctor</option>
          <option value="pharmacist">Pharmacist</option>
          <option value="patient">Patient</option>
        </select>
      </div>
      {renderField("fullName", "Full Name", "text", { placeholder: "e.g., John Doe" })}
      {renderField("email", "Email Address", "email", { placeholder: "you@example.com" })}
      {renderField("password", "Create Password", "password", { placeholder: "Minimum 8 characters" })}
      {renderField("confirmPassword", "Confirm Password", "password", { placeholder: "Re-enter your password" })}
      {renderField("phone", "Phone Number", "tel", { placeholder: "+91 XXXXX XXXXX" })}
      {renderField("dateOfBirth", "Date of Birth", "date")}
      {renderSelect("gender", "Gender", ["Male", "Female", "Other"])}
    </div>
  );

  const professionalSteps = {
    doctor: () => (
      <div className="form-grid">
        {renderField("licenseNumber", "Medical Council License Number", "text", { span2: true })}
        {renderField("speciality", "Speciality")}
        {renderField("yearsOfExperience", "Years of Experience", "number")}
        {renderField("qualification", "Highest Qualification", "text", { span2: true })}
      </div>
    ),
    pharmacist: () => (
      <div className="form-grid">
        {renderField("licenseNumber", "Pharmacy Council License Number", "text", { span2: true })}
        {renderField("qualification", "Highest Qualification")}
        {renderField("yearsOfExperience", "Years of Experience", "number")}
      </div>
    ),
    patient: () => (
      <div className="form-grid">
        {renderField("emergencyContactName", "Emergency Contact Name")}
        {renderField("emergencyContactPhone", "Emergency Contact Phone", "tel")}
        {renderField("address", "Full Address", "text", { span2: true })}
        {renderField("city", "City")}
        {renderSelect("state", "State", indianStates)}
        {renderField("pincode", "Pincode")}
        {renderField("aadharNumber", "Aadhar Number (for verification)")}
        {renderTextarea("allergies", "Known Allergies or Conditions", { span2: true, placeholder: "e.g., Penicillin, Pollen, Asthma" })}
      </div>
    ),
  };

  const contactSteps = {
    doctor: () => (
      <div className="form-grid">
        {renderField("hospitalName", "Hospital / Clinic Name", "text", { span2: true })}
        {renderField("hospitalAddress", "Hospital / Clinic Address", "text", { span2: true })}
        {renderField("city", "City")}
        {renderSelect("state", "State", indianStates)}
        {renderField("pincode", "Pincode")}
        {renderField("aadharNumber", "Aadhar Number")}
        {renderField("panNumber", "PAN Card Number", "text", { span2: true })}
      </div>
    ),
    pharmacist: () => (
      <div className="form-grid">
        {renderField("pharmacyName", "Pharmacy Name", "text", { span2: true })}
        {renderField("addressLine1", "Pharmacy Address", "text", { span2: true })}
        {renderField("city", "City")}
        {renderSelect("state", "State", indianStates)}
        {renderField("pincode", "Pincode")}
        {renderField("gstNumber", "GST Number")}
        {renderField("aadharNumber", "Aadhar Number", "text", { span2: true })}
      </div>
    ),
  };

  const stepsConfig = {
    doctor: [
      { num: 1, title: "Account Details", desc: "Your personal info" },
      { num: 2, title: "Professional Info", desc: "Credentials & experience" },
      { num: 3, title: "Contact & Verification", desc: "Location & ID" },
    ],
    pharmacist: [
      { num: 1, title: "Account Details", desc: "Your personal info" },
      { num: 2, title: "Professional Info", desc: "Credentials & experience" },
      { num: 3, title: "Contact & Verification", desc: "Location & ID" },
    ],
    patient: [
      { num: 1, title: "Account Details", desc: "Your personal info" },
      { num: 2, title: "Contact & Health Info", desc: "Location & medical info" },
    ],
  };

  // --- JSX ---
  return (
    <div className="signup-container">
      <div className="signup-wrapper">
        {/* Sidebar */}
        <div className="signup-sidebar">
          <div className="sidebar-header">Pharma Project</div>
          <ul className="progress-stepper">
            {stepsConfig[formData.role].map(({ num, title, desc }) => (
              <li key={num} className={`progress-step ${step === num ? "active" : ""} ${step > num ? "completed" : ""}`}>
                <div className="step-circle">{step > num ? "✔" : num}</div>
                <div className="step-info"><h4>{title}</h4><p>{desc}</p></div>
              </li>
            ))}
          </ul>
        </div>

        {/* Form Panel */}
        <div className="signup-form-panel">
          <h2>{`Create Your ${formData.role.charAt(0).toUpperCase() + formData.role.slice(1)} Account`}</h2>
          <form onSubmit={handleSubmit}>
            {step === 1 && renderStep1()}
            {step === 2 && professionalSteps[formData.role]()}
            {step === 3 && contactSteps[formData.role]()}

            <div className="button-group">
              {step > 1 && <button type="button" className="btn btn-secondary" onClick={handlePrev}>Previous Step</button>}
              {step < maxSteps && <button type="button" className="btn btn-primary" onClick={handleNext}>Next Step</button>}
              {step === maxSteps && <button type="submit" className="btn btn-primary">Create Account</button>}
            </div>
          </form>
          {message && <p className="feedback-msg">{message}</p>}
        </div>
      </div>
    </div>
  );
}
