
// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//import Navbar from './Navbar'; // Import Navbar
import Home from './Home'; // Import Home
import ContactUs from './ContactUs'; // Import ContactUs
// import Footer from './Footer'; // Import Footer
import Login from './Login';
import Signup from './Signup';
import AdminDashboard from './AdminDashboard';
import UserDashboard from './UserDashboard';
import TechWriterDashboard from './TechWriterDashboard';
import Navbaruser from './Navbaruser';
import DevOpsComponent from './DevOpsComponent';
import FullStackComponent from './FullStack';
import FrontendComponent from './Frontend';
import BackendComponent from './Backend';
import CloudComputingComponent from './CloudComputing';
import BookmarksOverlay from './BookmarksOverlay';
import ProfileOverlay from './ProfileOverlay';
import NotificationsOverlay from './NotificationsOverlay';
import './App.css'; // Import App.css for global styles

const App = () => {
  return (
    <div className="app-container">
      <Router>
        {/* Navbar */}
        {/* <Navbar /> */}

        {/* Routes for Home and Contact Us */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path='/Login' element={<Login/>} />
          <Route path='/Signup' element={<Signup/>}/>
          <Route path='/AdminDashboard' element={<AdminDashboard/>} />
          <Route path='/UserDashboard' element={<UserDashboard/>} />
          <Route path='/TechWriterDashboard' element={<TechWriterDashboard/>} />
          <Route path='/Navbaruser' element={<Navbaruser/>}/>
          <Route path='/DevOpsComponent' element={<DevOpsComponent />} />
          <Route path='/FullStackComponent' element={<FullStackComponent />} />
        <Route path='/FrontendComponent' element={<FrontendComponent />} />
        <Route path='/BackendComponent' element={<BackendComponent />} />
        <Route path='/CloudComputingComponent' element={<CloudComputingComponent />} />
        <Route path="/bookmarks" element={<BookmarksOverlay />} />
        <Route path="/profile" element={<ProfileOverlay />} />
        <Route path="/notifications" element={<NotificationsOverlay />} />
        </Routes>

        {/* Footer */}
        {/* <Footer /> */}
      </Router>
    </div>
  );
};

export default App;
