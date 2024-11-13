import React from "react";
import "./Home.css";
import Navbar from './Navbar';
import Footer from './Footer';
const Home = () => {
  return (
    <>
    <Navbar/>
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>
            We're <em>school of excellence</em> in Technical Courses.
          </h1>
          <button
  className="browse-button"
  onClick={() => window.location.href = 'https://moringaschool.com/'}
>
  Browse our School
</button>

        </div>
      </section>

      {/* Welcome Section */}
      <section className="welcome">
        <div className="welcome-content">
          <div className="text-content">
            <p>
              Welcome to Moringa School Daily Dev, your gateway to a future in tech! We are a 
              dedicated learning institution specializing in Software Engineering, Full Stack 
              Development, and DevOps, designed to equip students with the skills and 
              experience needed to thrive in today's fast-paced tech industry. Our programs are 
              structured to balance hands-on projects, collaborative learning, and one-on-one 
              mentorship, ensuring that each student builds a strong foundation in both front-end 
              and back-end development, cloud infrastructure, and modern DevOps practices.
            </p>
          </div>
          <div className="logo">
            <img src="https://moringaschool.com/wp-content/uploads/2021/08/accelerated-learning-2.jpg" alt="Moringa Logo" />
            <img src="https://moringaschool.com/wp-content/uploads/2024/10/access-to-community-2.jpg" alt="Moringa Logo" />
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-choose-us">
        <h2>Why Choose Us?</h2>
        <div className="card">
          <div className="card-content">
            <p>
              At Moringa School Daily Dev, we believe that real-world experience is key to 
              effective learning. Our courses are led by seasoned industry professionals who 
              bring their expertise directly into the classroom. Our curriculum is continuously 
              updated to align with the latest industry standards, ensuring our students are 
              proficient in the latest technologies, including JavaScript, Python, React, Docker, 
              Kubernetes, AWS, and CI/CD pipelines.
            </p>
          </div>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="what-we-offer">
        <h2>What We Offer</h2>
        <div className="offerings">
          <div className="tech-stack">
            <img src="https://moringaschool.com/wp-content/uploads/2021/08/market-asligned-skills-1.jpg" alt="Full Stack Development Diagram" className="tech-stack-image" />
          </div>
          <ul className="offering-list">
            <li>
              Comprehensive Full Stack Curriculum: Learn everything from HTML/CSS and 
              JavaScript to server-side programming languages and cloud technologies.
            </li>
            <li>
              DevOps Mastery: Master CI/CD, containerization, cloud deployment, and 
              automation to streamline and manage scalable applications.
            </li>
            <li>
              Career Support: Our Career Services team provides resume workshops, 
              interview prep, and access to an extensive network of hiring partners.
            </li>
            <li>
              Flexible Learning Options: We offer both full-time and part-time programs, 
              along with hybrid and remote learning options.
            </li>
          </ul>
        </div>
      </section>

      {/* Join Community Section */}
      <section className="join-community">
        <h2>Join the Moringa School Daily Dev Community</h2>
        <p>
          Become a part of our vibrant community, connect with like-minded peers, and 
          start your journey towards a successful tech career. Whether you're looking to 
          change careers or advance in your current role, Moringa team is here to provide 
          the guidance, resources, and support you need.
        </p>
        <p className="cta-text">
          Transform your passion into expertise—enroll with us today and become the tech 
          professional you've always aspired to be!
        </p>
      </section>
    </div>
    <Footer/>
    </>
  );
};

export default Home;