// import React from 'react';
// import { Link } from 'react-router-dom';
// import { Button, Card, CardContent, Typography, Grid, Box } from '@mui/material';
// import { AccountCircle, PostAdd, Flag, Category } from '@mui/icons-material';
// import { styled } from '@mui/system';
// import SidebarTechWriter from './Sidebar-techwriter.js';

// const TechWriterHomePage = () => {
//   // Styled components for design
//   const BackgroundBox = styled(Box)({
//     background: 'linear-gradient(to right, #2196f3, #64b5f6)',
//     padding: '40px 20px',
//     borderRadius: '8px',
//     color: 'white',
//     boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
//     textAlign: 'center',
//   });

//   const VideoBox = styled(Box)({
//     marginTop: '20px',
//     marginBottom: '40px',
//     boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
//     borderRadius: '8px',
//     padding: '20px',
//   });

//   return (
//     <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f4f7fb' }}>
//       <SidebarTechWriter />

//       <div style={{ flexGrow: 1, padding: '20px' }}>
//         {/* Welcome Section */}
//         <BackgroundBox>
//           <Typography variant="h3" gutterBottom style={{ fontWeight: '700' }}>
//             Welcome, Tech Writer!
//           </Typography>
//           <Typography variant="body1" style={{ fontSize: '18px', fontWeight: '500' }}>
//             Explore, create, and contribute to the tech space with Moringa School's community-driven platform.
//           </Typography>
//         </BackgroundBox>

//         {/* Profile Section */}
//         <Card style={{ margin: '20px 0', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
//           <CardContent>
//             <Typography variant="h6" gutterBottom style={{ color: '#1976d2' }}>
//               Your Profile
//             </Typography>
//             <Link to="/techwriter/profile">
//               <Button variant="contained" color="primary" startIcon={<AccountCircle />}>
//                 Edit Profile
//               </Button>
//             </Link>
//           </CardContent>
//         </Card>

//         {/* Stats Section */}
//         <Grid container spacing={3} style={{ marginBottom: '20px' }}>
//           {[
//             {
//               title: 'Posts Created',
//               value: 15, // static data for now
//               link: '/techwriter/post-content',
//               icon: <PostAdd />,
//             },
//             {
//               title: 'Approved Content',
//               value: 10, // static data for now
//               link: '/techwriter/approve-content',
//               icon: <PostAdd />,
//             },
//             {
//               title: 'Flagged Content',
//               value: 3, // static data for now
//               link: '/techwriter/flagged-content',
//               icon: <Flag />,
//             },
//             {
//               title: 'Categories',
//               value: 5, // static data for now
//               link: '/techwriter/categories',
//               icon: <Category />,
//             },
//           ].map((item, index) => (
//             <Grid item xs={12} sm={6} md={3} key={index}>
//               <Card>
//                 <CardContent>
//                   <Typography variant="h6">{item.title}</Typography>
//                   <Typography variant="h5" style={{ fontWeight: 'bold' }}>
//                     {item.value}
//                   </Typography>
//                   <Link to={item.link}>
//                     <Button variant="contained" color="secondary" fullWidth startIcon={item.icon}>
//                       {item.title}
//                     </Button>
//                   </Link>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>

//         {/* Featured Content Video */}
//         <VideoBox>
//           <Typography variant="h6" gutterBottom style={{ fontWeight: '600' }}>
//             Featured Tech Content
//           </Typography>
//           <iframe
//             width="100%"
//             height="400"
//             src="https://www.youtube.com/embed/AtozUZ_GZRw?si=xLmnMGi_mmHnd4oj"
//             title="YouTube video"
//             frameBorder="0"
//             allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
//             allowFullScreen
//           ></iframe>
//         </VideoBox>

//         {/* Latest Post Image */}
//         <Card style={{ marginBottom: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
//           <CardContent>
//             <Typography variant="h6" gutterBottom>
//               Add Your Latest Post's Image
//             </Typography>
//             <img
//               src="https://via.placeholder.com/1500x800?text=Tech+Content"
//               alt="Tech Content"
//               style={{
//                 width: '100%',
//                 height: 'auto',
//                 borderRadius: '8px',
//                 boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//               }}
//             />
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default TechWriterHomePage;


import React from 'react';
import './TechWriterDashboard.css';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <h1>Techwriter</h1>
      <div className="dashboard-content">
        <p>Welcome to the Admin Dashboard! Here you can manage users, view reports, and more.</p>
        <button className="btn">Manage Users</button>
        <button className="btn">View Reports</button>
        <button className="btn">Settings</button>
      </div>
    </div>
  );
};

export default AdminDashboard;
