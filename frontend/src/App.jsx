import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ThemeSwitcher from "./components/ThemeSwitcher";

// Public Pages
import Home from "./pages/Home";
import AboutPage from "./pages/About";
import FeaturesPage from "./pages/FeaturesPage";

// Auth Pages
import Signup from "./pages/Auth/Signup";
import Login from "./pages/Auth/Login";

// Forgot Password Pages
import DoctorForgotPassword from "./pages/Doctor/DoctorForgotPassword";
import PharmacistForgotPassword from "./pages/Pharmacist/PharmacistForgotPassword";
import PatientForgotPassword from "./pages/Patient/PatientForgotPassword";

// Dashboard Layout + Pages
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard/Dashboard";
import Patients from "./pages/Dashboard/Patients";
import Doctors from "./pages/Dashboard/Doctors";
import Pharmacy from "./pages/Dashboard/Pharmacy";
import Reports from "./pages/Dashboard/Reports";

// Theme Context
import { ThemeProvider } from "./context/ThemeContext";


// Scroll to Top
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => window.scrollTo({ top: 0, behavior: "instant" }), [pathname]);
  return null;
}


// Layout Wrapper for NON-dashboard pages
function Layout({ children }) {
  const location = useLocation();

  // Pages where Navbar + Footer are hidden
  const hideLayoutPages = [
    "/doctor-forgot-password",
    "/pharmacist-forgot-password",
    "/patient-forgot-password",
  ];

  // Hide Layout for Dashboard too
  const isDashboardRoute = location.pathname.startsWith("/dashboard");

  const hideLayout = hideLayoutPages.includes(location.pathname) || isDashboardRoute;

  return (
    <>
      {!hideLayout && <Navbar />}
      {children}
      {!hideLayout && <Footer />}
      {!hideLayout && <ThemeSwitcher />}
    </>
  );
}


function App() {
  return (
    <ThemeProvider>
      <Router>
        <ScrollToTop />

        <Layout>
          <Routes>

            {/* Public Pages */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/features" element={<FeaturesPage />} />

            {/* Auth */}
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />

            {/* Forgot Password */}
            <Route path="/doctor-forgot-password" element={<DoctorForgotPassword />} />
            <Route path="/pharmacist-forgot-password" element={<PharmacistForgotPassword />} />
            <Route path="/patient-forgot-password" element={<PatientForgotPassword />} />

            {/* Dashboard + Sidebar Layout */}
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="patients" element={<Patients />} />
              <Route path="doctors" element={<Doctors />} />
              <Route path="pharmacy" element={<Pharmacy />} />
              <Route path="reports" element={<Reports />} />
            </Route>

          </Routes>
        </Layout>

      </Router>
    </ThemeProvider>
  );
}

export default App;
