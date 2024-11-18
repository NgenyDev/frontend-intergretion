import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import ContactUs from './ContactUs';
import Login from './Login';
import Signup from './Signup';
import AdminDashboard from './AdminDashboard';
import UserDashboard from './UserDashboard';
import TechWriterDashboard from './TechWriterDashboard';
import Navbaruser from './Navbaruser';
import Wishlist from './Wishlist';
import ReviewContent from './ReviewContent';
import DevOpsComponent from './DevOpsComponent';
import FullStackComponent from './FullStack';
import FrontendComponent from './Frontend';
import BackendComponent from './Backend';
import CloudComputingComponent from './CloudComputing';
import BookmarksOverlay from './BookmarksOverlay';
import ProfileOverlay from './ProfileOverlay';
import NotificationsOverlay from './NotificationsOverlay';
import EnterResetCode from './EnterResetCode';
import ResetPasswordSuccess from './ResetPasswordSuccess';
import ManageUsers from './ManageUsers';
import CreateContent from './CreateContent';
import UserProfile from './UserProfile';
import CreateAccount from './CreateAccount';
import LoginAdmin from './LoginAdmin';
import NavbarTech from './Navbar-tech';
import TechWriterHomePage from './TechWriterDashboard';  // Added TechWriterHomePage component
import Settings from './Settings'; // Added Settings component
import EditContent from './EditContent'; // Added EditContent component
import ContentModeration from './ContentModeration'; // Added ContentModeration component
import ReviewFeedback from './ReviewFeedback';
import './App.css';
import ManageCategories from './ManageCategories';
import Subscriptions from './Subscriptions';

const App = () => {
  return (
    <div className="app-container">
      <Router>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path='/reviewFeedback' element={<ReviewFeedback />} />
          <Route path="/navbar" element={<NavbarTech />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/subscriptions" element={<Subscriptions />} />
          <Route path='/createContent' element={<CreateContent />} />
          <Route path="/manageCategories" element={<ManageCategories />} />
          <Route path="/techwriter-dashboard" element={<TechWriterDashboard />} />
          <Route path="/navbaruser" element={<Navbaruser />} />
          <Route path="/ContentModeration" element={<ContentModeration />} />
          <Route path="/devops" element={<DevOpsComponent />} />
          <Route path="/fullstack" element={<FullStackComponent />} />
          <Route path="/frontend" element={<FrontendComponent />} />
          <Route path="/backend" element={<BackendComponent />} />
          <Route path="/editContent" element={<EditContent />} />
          <Route path="/cloudcomputing" element={<CloudComputingComponent />} />
          <Route path="/bookmarks" element={<BookmarksOverlay />} />
          <Route path="/profile" element={<ProfileOverlay />} />
          <Route path="/notifications" element={<NotificationsOverlay />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/login-admin" element={<LoginAdmin />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/manage-users" element={<ManageUsers />} />
          <Route path="/user-profile/:id" element={<UserProfile />} />
          <Route path="/enter-reset-code" element={<EnterResetCode />} />
          <Route path="/reset-password-success" element={<ResetPasswordSuccess />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/edit-content" element={<EditContent />} />
          <Route path='/reviewContent' element={<ReviewContent />} />
          <Route path="/techwriter-home" element={<TechWriterHomePage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
