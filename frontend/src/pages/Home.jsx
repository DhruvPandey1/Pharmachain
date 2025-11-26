import React, { useEffect, useState } from "react";
import "./Home.css";
import { driver } from "driver.js"; // make sure Home.css is in the same folder
// import Joyride from "react-joyride";
const images = [
  "https://imgs.search.brave.com/_bUIEbDUBcph44YIpRi56GrjLBTvvrX-8yVlas9E_8Q/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAwLzgxLzk5LzM0/LzM2MF9GXzgxOTkz/NDAyX3ZiWWFJN2c3/RFl3OVhBVUcxSlE3/UmtBcEdBc1ZTV0dF/LmpwZw",
  "https://imgs.search.brave.com/OmQL4M4BpourmuLCO8H9Z6gyB40TYETRkETSVOX_SvE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTM4/OTExNjQ1OC9waG90/by9mYXJtYWNpYS1w/aGFybWFjeS5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9QWxo/bm0xTmw3Xy1HN3FC/U1VtRVM4dk1vT1JN/Z0ItM2JDUFc0QkZ3/Y0lqQT0",
  "https://imgs.search.brave.com/InoGFa_q0eKPWHNPUVbFsiSZq_oQJ48eLRvQqD39f20/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9t/ZWRpY2FsLWxhYi13/b3JrZXItYW5hbHl6/aW5nLWJsb29kLXNl/cnVtLWNvbmR1Y3Rp/bmctdmlydXMtdGVz/dC1tb2Rlcm4tZXF1/aXBwZWQtbGFiLWxh/dGUtbmlnaHQtdGVh/bS1zcGVjaWFsaXN0/cy1leGFtaW5pbmct/dmFjY2luZS1ldm9s/dXRpb24tdXNpbmct/aGlnaC10ZWNoLXRy/eaFtZW50LWFnYWlu/c3QtY292aWQxOV80/ODIyNTctMTM2MjEu/anBnP3NlbXQ9YWlz/X2h5YnJpZCZ3PTc0/MCZxPTgw",
  "https://imgs.search.brave.com/Zshgq9_rw4jJEtQ1Lgwdr1ZRk4sW8b_mRqw6naxj5T8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA0LzA2LzU4LzI2/LzM2MF9GXzQwNjU4/MjY0Ml9CaExFN3BW/UmEyTmNTVUNNVkJj/MmRGSkl2bWtkYkVi/ZC5qcGc",
];

const Home = () => {
  const [currentImage, setCurrentImage] = useState(images[0]);
    // const [runTutorial, setRunTutorial] = useState(false);

  // Start tutorial every time user enters Home page
  // useEffect(() => {
  //   setRunTutorial(true);
  // }, []);

  useEffect(() => {
    let imageIndex = 0;
    const interval = setInterval(() => {
      imageIndex = (imageIndex + 1) % images.length;
      setCurrentImage(images[imageIndex]);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Image rotation
  useEffect(() => {
    let imageIndex = 0;
    const interval = setInterval(() => {
      imageIndex = (imageIndex + 1) % images.length;
      setCurrentImage(images[imageIndex]);
    }, 4000);

    return () => clearInterval(interval);
  }, []);


  

  //  Joyride tutorial steps
  // const steps = [
  //   { target: ".welcome-card", content: "Welcome to the Pharma Project!" },
  //   { target: ".about-section", content: "Learn what this platform does." },
  //   { target: ".features-section", content: "These are the main features." },
  //   { target: ".how-it-works-section", content: "See how the system works." },
  //   { target: ".media-section", content: "Photos & videos explaining the process." },
  // ];

  //  -------------------------------
  // 🚀 Driver.js Auto Tour Here
  // -------------------------------
  // useEffect(() => {
  //   const driverObj = driver({
  //     showProgress: true,
  //     allowClose: true,
  //     nextBtnText: "Next",
  //     prevBtnText: "Back",
  //     doneBtnText: "Finish",
  //     steps: [
  //       {
  //         element: ".welcome-card",
  //         popover: {
  //           title: "Welcome 👋",
  //           description: "This is the introduction to the Pharma Project platform.",
  //           position: "bottom-center",
  //         },
  //       },
  //       {
  //         element: ".about-section",
  //         popover: {
  //           title: "About Section",
  //           description: "Learn what our platform does and why it exists.",
  //           position: "bottom-center",
  //         },
  //       },
  //       {
  //         element: ".features-section",
  //         popover: {
  //           title: "Features",
  //           description: "Explore all core features of the system.",
  //         },
  //       },
  //       {
  //         element: ".how-it-works-section",
  //         popover: {
  //           title: "How It Works",
  //           description: "Step-by-step overview of how the system functions.",
  //         },
  //       },
  //       {
  //         element: ".media-section",
  //         popover: {
  //           title: "Images & Videos",
  //           description: "Visual explanation of healthcare workflow.",
  //         },
  //       },
  //     ],
  //   });

  //   // Delay start to ensure DOM is ready
  //   setTimeout(() => driverObj.drive(), 500);
  // }, []);


  return (
    <div className="home-container">
      {/* Welcome */}
      {/* Auto Tutorial */}
      {/* <Joyride
        steps={steps}
        run={runTutorial}
        continuous
        showProgress
        showSkipButton
        scrollToFirstStep
        disableScrolling={false}
        styles={{
          options: { primaryColor: "#28a745" },
        }}
      /> */}
      <div className="welcome-card section">
        <h1>
          Welcome to <span className="highlight">Pharma Project</span>
        </h1>
        <p className="subtitle">
          A seamless platform connecting <b>Doctors</b> and <b>Pharmacists</b>{" "}
          for enhanced patient care and medication management.
        </p>
      </div>

      {/* About */}
      <div className="about-section section">
        <h2 className="section-title">About Our Platform</h2>
        <p>
          Pharma Project streamlines the prescription and inventory workflow.
          Our system empowers doctors to manage prescriptions with precision and
          allows pharmacists to handle inventory with real-time accuracy,
          ensuring safe, efficient, and reliable patient care.
        </p>
      </div>

      {/* Features */}
      <div className="features-section section">
        <h2 className="section-title">Our Core Features</h2>
        <div className="card-container">
          <div className="feature-card">
            <h3>📋 Digital Prescriptions</h3>
            <p>
              Create, send, and manage digital prescriptions securely and
              efficiently.
            </p>
          </div>
          <div className="feature-card">
            <h3>💊 Real-Time Inventory</h3>
            <p>
              Get instant updates, manage stock levels, and reduce shortages.
            </p>
          </div>
          <div className="feature-card">
            <h3>📊 Insightful Analytics</h3>
            <p>
              Generate reports on trends and stock for better decision-making.
            </p>
          </div>
          <div className="feature-card">
            <h3>👩‍⚕️ Secure Collaboration</h3>
            <p>
              A dedicated channel for seamless communication between doctors and
              pharmacists.
            </p>
          </div>
        </div>
      </div>

      {/* How it works */}
      <div className="how-it-works-section section">
        <h2 className="section-title">How It Works</h2>
        <div className="how-it-works-container">
          <div className="step-card">
            <div className="step-number">1</div>
            <h3>Register</h3>
            <p>
              Create a secure account in minutes as either a Doctor or a
              Pharmacist.
            </p>
          </div>
          <div className="step-card">
            <div className="step-number">2</div>
            <h3>Prescribe & Dispense</h3>
            <p>
              Doctors issue digital prescriptions; Pharmacists receive and
              manage them instantly.
            </p>
          </div>
          <div className="step-card">
            <div className="step-number">3</div>
            <h3>Collaborate</h3>
            <p>
              Communicate seamlessly through the platform to ensure optimal
              patient care.
            </p>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="testimonials-section section">
        <h2 className="section-title">Trusted by Professionals</h2>
        <div className="card-container">
          <div className="testimonial-card">
            <p>
              "This platform has revolutionized how I handle prescriptions. It's
              fast, secure, and has significantly reduced paperwork."
            </p>
            <div className="testimonial-author">
              <div>
                <strong>Dr. Evelyn Reed</strong>
                <span>Cardiologist</span>
              </div>
            </div>
          </div>
          <div className="testimonial-card">
            <p>
              "Managing inventory has never been easier. The real-time updates
              are a game-changer for my pharmacy's efficiency."
            </p>
            <div className="testimonial-author">
              <div>
                <strong>Mark Chen</strong>
                <span>Lead Pharmacist</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Random Image */}
      <div className="media-section section">
        <h2 className="section-title">Healthcare in Action</h2>
        <img
          src={currentImage}
          alt="Healthcare professionals"
          className="random-image"
        />
      </div>

      {/* Video */}
      <div className="media-section section">
        <h2 className="section-title">Watch How It Works</h2>
        <video autoPlay loop muted playsInline className="demo-video">
          <source
            src="https://cdn.pixabay.com/video/2020/12/10/58857-489663415_large.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default Home;