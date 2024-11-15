import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
  Divider,
  IconButton,
} from '@mui/material';
import {
  Home,
  AccountCircle,
  PostAdd,
  Flag,
  Edit,
  Comment,
  Notifications,
  Category,
  Close,
} from '@mui/icons-material';

const Sidebar = ({ setSidebarOpen, userRole }) => {
  const [open, setOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('');

  const handleLinkClick = (link) => {
    setActiveLink(link);
    setSidebarOpen(false);
  };

  const renderTechWriterMenu = () => (
    <>
      <ListItem button component={Link} to="/techwriter/home" onClick={() => handleLinkClick('techwriter/home')}>
        <ListItemIcon><Home /></ListItemIcon>
        <ListItemText primary="Home" />
      </ListItem>
      <ListItem button component={Link} to="/techwriter/profile" onClick={() => handleLinkClick('techwriter/profile')}>
        <ListItemIcon><AccountCircle /></ListItemIcon>
        <ListItemText primary="Create Profile" />
      </ListItem>
      <ListItem button component={Link} to="/admin/categories" onClick={() => handleLinkClick('admin/manage-categories')}>
        <ListItemIcon><Category /></ListItemIcon>
        <ListItemText primary="Manage Categories" />
      </ListItem>
      <ListItem button component={Link} to="/admin/post-content" onClick={() => handleLinkClick('techwriter/post-content')}>
        <ListItemIcon><PostAdd /></ListItemIcon>
        <ListItemText primary="Post Content" />
      </ListItem>
      <ListItem button component={Link} to="/techwriter/approve-content" onClick={() => handleLinkClick('techwriter/approve-content')}>
        <ListItemIcon><Flag /></ListItemIcon>
        <ListItemText primary="Approve Content" />
      </ListItem>
      <ListItem button component={Link} to="/techwriter/edit-content" onClick={() => handleLinkClick('techwriter/edit-content')}>
        <ListItemIcon><Edit /></ListItemIcon>
        <ListItemText primary="Edit Content" />
      </ListItem>
      <ListItem button component={Link} to="/techwriter/review-content" onClick={() => handleLinkClick('techwriter/review-content')}>
        <ListItemIcon><Comment /></ListItemIcon>
        <ListItemText primary="Review Content" />
      </ListItem>
    </>
  );

  const renderAdminMenu = () => (
    <>
      <ListItem button component={Link} to="/admin/add-user" onClick={() => handleLinkClick('admin/add-user')}>
        <ListItemIcon><AccountCircle /></ListItemIcon>
        <ListItemText primary="Add User" />
      </ListItem>
      <ListItem button component={Link} to="/admin/flagged-content" onClick={() => handleLinkClick('admin/flagged-content')}>
        <ListItemIcon><Flag /></ListItemIcon>
        <ListItemText primary="Flagged Content" />
      </ListItem>
      <ListItem button component={Link} to="/admin/approve-content" onClick={() => handleLinkClick('admin/approve-content')}>
        <ListItemIcon><PostAdd /></ListItemIcon>
        <ListItemText primary="Approve Content" />
      </ListItem>
      <ListItem button component={Link} to="/admin/deactivate-user" onClick={() => handleLinkClick('admin/deactivate-user')}>
        <ListItemIcon><AccountCircle /></ListItemIcon>
        <ListItemText primary="Deactivate User" />
      </ListItem>
      <ListItem button component={Link} to="/admin/manage-categories" onClick={() => handleLinkClick('admin/manage-categories')}>
        <ListItemIcon><Category /></ListItemIcon>
        <ListItemText primary="Manage Categories" />
      </ListItem>
    </>
  );

  const renderUserMenu = () => (
    <>
      <ListItem button component={Link} to="/user/home" onClick={() => handleLinkClick('user/home')}>
        <ListItemIcon><Home /></ListItemIcon>
        <ListItemText primary="Home" />
      </ListItem>
      <ListItem button component={Link} to="/user/profile" onClick={() => handleLinkClick('user/profile')}>
        <ListItemIcon><AccountCircle /></ListItemIcon>
        <ListItemText primary="Profile" />
      </ListItem>
      <ListItem button component={Link} to="/user/post-content" onClick={() => handleLinkClick('user/post-content')}>
        <ListItemIcon><PostAdd /></ListItemIcon>
        <ListItemText primary="Post Content" />
      </ListItem>
      <ListItem button component={Link} to="/user/notifications" onClick={() => handleLinkClick('user/notifications')}>
        <ListItemIcon><Notifications /></ListItemIcon>
        <ListItemText primary="Notifications" />
      </ListItem>
      <ListItem button component={Link} to="/user/review-content" onClick={() => handleLinkClick('user/review-content')}>
        <ListItemIcon><Comment /></ListItemIcon>
        <ListItemText primary="Review Content" />
      </ListItem>
    </>
  );

  return (
    <Drawer variant="temporary" open={open} onClose={() => setOpen(false)} sx={{ display: { xs: 'block', sm: 'none' }, '& .MuiDrawer-paper': { width: 250, boxSizing: 'border-box' } }}>
      <List>
        <ListItem button onClick={() => setOpen(false)}>
          <ListItemIcon>
            <IconButton>
              <Close />
            </IconButton>
          </ListItemIcon>
          <ListItemText primary="Close" />
        </ListItem>
        <Divider />
        <Typography variant="h6" sx={{ textAlign: 'center', marginTop: 2 }}>
          Menu
        </Typography>
        <Divider />
        {userRole === 'techwriter' && renderTechWriterMenu()}
        {userRole === 'admin' && renderAdminMenu()}
        {userRole === 'user' && renderUserMenu()}
      </List>
    </Drawer>
  );
};

export default Sidebar;
