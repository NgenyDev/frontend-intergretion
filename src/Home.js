// import React from "react";
// import "./Home.css";
// import Navbar from './Navbar';
// import Footer from './Footer';
// const Home = () => {
//   return (
//     <>
//     <Navbar/>
//     <div className="home">
//       {/* Hero Section */}
//       <section className="hero">
//         <div className="hero-content">
//           <h1>
//             We're <em>school of excellence</em> in Technical Courses.
//           </h1>
//           <button
//   className="browse-button"
//   onClick={() => window.location.href = 'https://moringaschool.com/'}
// >
//   Browse our School
// </button>

//         </div>
//       </section>

//       {/* Welcome Section */}
//       <section className="welcome">
//         <div className="welcome-content">
//           <div className="text-content">
//             <p>
//               Welcome to Moringa School Daily Dev, your gateway to a future in tech! We are a 
//               dedicated learning institution specializing in Software Engineering, Full Stack 
//               Development, and DevOps, designed to equip students with the skills and 
//               experience needed to thrive in today's fast-paced tech industry. Our programs are 
//               structured to balance hands-on projects, collaborative learning, and one-on-one 
//               mentorship, ensuring that each student builds a strong foundation in both front-end 
//               and back-end development, cloud infrastructure, and modern DevOps practices.
//             </p>
//           </div>
//           <div className="logo">
//             <img src="https://moringaschool.com/wp-content/uploads/2021/08/accelerated-learning-2.jpg" alt="Moringa Logo" />
//             <img src="https://moringaschool.com/wp-content/uploads/2024/10/access-to-community-2.jpg" alt="Moringa Logo" />
//           </div>
//         </div>
//       </section>

//       {/* Why Choose Us Section */}
//       <section className="why-choose-us">
//         <h2>Why Choose Us?</h2>
//         <div className="card">
//           <div className="card-content">
//             <p>
//               At Moringa School Daily Dev, we believe that real-world experience is key to 
//               effective learning. Our courses are led by seasoned industry professionals who 
//               bring their expertise directly into the classroom. Our curriculum is continuously 
//               updated to align with the latest industry standards, ensuring our students are 
//               proficient in the latest technologies, including JavaScript, Python, React, Docker, 
//               Kubernetes, AWS, and CI/CD pipelines.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* What We Offer Section */}
//       <section className="what-we-offer">
//         <h2>What We Offer</h2>
//         <div className="offerings">
//           <div className="tech-stack">
//             <img src="https://moringaschool.com/wp-content/uploads/2021/08/market-asligned-skills-1.jpg" alt="Full Stack Development Diagram" className="tech-stack-image" />
//           </div>
//           <ul className="offering-list">
//             <li>
//               Comprehensive Full Stack Curriculum: Learn everything from HTML/CSS and 
//               JavaScript to server-side programming languages and cloud technologies.
//             </li>
//             <li>
//               DevOps Mastery: Master CI/CD, containerization, cloud deployment, and 
//               automation to streamline and manage scalable applications.
//             </li>
//             <li>
//               Career Support: Our Career Services team provides resume workshops, 
//               interview prep, and access to an extensive network of hiring partners.
//             </li>
//             <li>
//               Flexible Learning Options: We offer both full-time and part-time programs, 
//               along with hybrid and remote learning options.
//             </li>
//           </ul>
//         </div>
//       </section>

//       {/* Join Community Section */}
//       <section className="join-community">
//         <h2>Join the Moringa School Daily Dev Community</h2>
//         <p>
//           Become a part of our vibrant community, connect with like-minded peers, and 
//           start your journey towards a successful tech career. Whether you're looking to 
//           change careers or advance in your current role, Moringa team is here to provide 
//           the guidance, resources, and support you need.
//         </p>
//         <p className="cta-text">
//           Transform your passion into expertise—enroll with us today and become the tech 
//           professional you've always aspired to be!
//         </p>
//       </section>
//     </div>
//     <Footer/>
//     </>
//   );
// };

// export default Home;

import React from "react"; 
import { useNavigate } from "react-router-dom"; 
import "./Home.css"; 
import Navbar from "./Navbar"; 
import Footer from "./Footer";

const Home = () => {
  const navigate = useNavigate(); 

  // Navigate to the Register page
  const handleBrowseClick = () => {
    navigate("/signup"); 
  };

  return (
    <>
      <Navbar />
      <div className="home">
       
        <header className="home-header">
          
              <h1>We’re a School of Excellence in Technical Courses</h1>
              <button className="browse-button" onClick={handleBrowseClick}>
                Browse Our School
              </button>
                 
        </header>
        {/* First Section (Image on Right) */}
        <section className="Welcome to our school">
          <div className="section-content">
            <img 
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHZSETxBnNsiJFKEB6H9GSGOTZRwEOIAB_qOf0LgwSUCQCcwJj&s" 
              alt="Welcome"
            />
            <div className="text-content">
              <h2>Welcome</h2>
              <p className="welcome-text">
                Welcome to Moringa School Daily Dev, your gateway to a future in
                tech! We are a dedicated learning institution specializing in
                Software Engineering, Full Stack Development, and DevOps, designed
                to equip students with the skills and experience needed to thrive in
                today’s fast-paced tech industry...
              </p>
            </div>
          </div>
        </section>

        {/* Second Section (Image on Left) */}
        <section className="why-choose-us">
          <div className="section-content reverse">
            <div className="text-content">
              <h2>Why Choose Us?</h2>
              <p>
                At Moringa School Daily Dev, we believe that real-world experience
                is key to effective learning. Our courses are led by seasoned
                industry professionals who bring their expertise directly into the
                classroom...
              </p>
            </div>
            <img 
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdtYIz3xW-EnT_K1sSaf0c5y2WLBSDSig2WA&s" 
              alt="Why Choose Us" 
            />
          </div>
        </section>

        {/* Third Section (Image on Right) */}
        <section className="what-we-offer">
          <div className="section-content">
            <img 
              src="data:image/png;base64,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" 
              alt="What We Offer"
            />
            <div className="text-content">
              <h2>What We Offer</h2>
              <ul>
                <li><strong>Comprehensive Full Stack Curriculum:</strong> Learn everything from HTML/CSS and JavaScript to server-side programming...</li>
                <li><strong>DevOps Mastery:</strong> Master CI/CD, containerization, cloud deployment...</li>
                <li><strong>Career Support:</strong> Our career development team provides resume workshops...</li>
                <li><strong>Flexible Learning Options:</strong> We offer both full-time and part-time programs...</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Fourth Section (Image on Left) */}
        <section className="join-community">
          <div className="section-content reverse">
            <div className="text-content">
              <h2>Join the Moringa School Daily Dev Community</h2>
              <p>
                Become a part of our vibrant community, connect with like-minded
                peers, and start your journey towards a successful tech career...
              </p>
              <p>
                Transform your passion into expertise—enroll with us today and become
                the tech professional you’ve always aspired to be!
              </p>
            </div>
            <img 
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEcB1ek3v8F_vLqfZUslq3HWrd7dG_iSIcSw&s" 
              alt="Join Our Community"
            />
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
};

export default Home;
