import React, { useState } from 'react';

const Settings = () => {
  const [username, setUsername] = useState('');
  const [userType, setUserType] = useState('Admin');
  const [contentId, setContentId] = useState('');
  const [categoryName, setCategoryName] = useState('');

  // Handle Add User
  const handleAddUser = (e) => {
    e.preventDefault();
    // Add user logic here
    console.log({ username, userType });
  };

  // Handle Flag Content
  const handleFlagContent = (e) => {
    e.preventDefault();
    // Flag content logic here
    console.log({ contentId });
  };

  // Handle Approve Content
  const handleApproveContent = (e) => {
    e.preventDefault();
    // Approve content logic here
    console.log({ contentId });
  };

  // Handle Add Category
  const handleAddCategory = (e) => {
    e.preventDefault();
    // Add category logic here
    console.log({ categoryName });
  };

  return (
    <div className="settings-container" style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh', 
        backgroundColor: '#f1f5f9', 
        color: '#333' 
    }}>

      <main className="main-content" style={{ 
          padding: '20px', 
          width: '80%', 
          maxWidth: '1200px' 
      }}>
        <header>
          <h1 style={{ fontSize: '2em', color: '#333', marginBottom: '5px' }}>Platform Settings</h1>
          <p style={{ color: '#666', fontSize: '1em' }}>Manage platform configurations and user/content moderation.</p>
        </header>

        <section className="settings-options" style={{ marginTop: '20px' }}>
          {/* User Management */}
          <section id="user-management" style={{ backgroundColor: '#ffffff', padding: '20px', marginBottom: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <h2 style={{ fontSize: '1.5em', color: '#10b981', marginBottom: '15px' }}>User Management</h2>
            <form onSubmit={handleAddUser}>
              <div className="form-control" style={{ marginBottom: '15px' }}>
                <label htmlFor="username" style={{ display: 'block', fontWeight: 'bold', color: '#555', marginBottom: '5px' }}>Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px', fontSize: '1em' }}
                  required
                />
              </div>
              <div className="form-control" style={{ marginBottom: '15px' }}>
                <label htmlFor="user-type" style={{ display: 'block', fontWeight: 'bold', color: '#555', marginBottom: '5px' }}>User Type</label>
                <select
                  id="user-type"
                  name="user_type"
                  value={userType}
                  onChange={(e) => setUserType(e.target.value)}
                  style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px', fontSize: '1em' }}
                  required
                >
                  <option value="Admin">Admin</option>
                  <option value="Tech Writer">Tech Writer</option>
                  <option value="User">User</option>
                </select>
              </div>
              <button type="submit" style={{ backgroundColor: '#10b981', color: '#fff', border: 'none', padding: '10px 15px', fontSize: '1em', cursor: 'pointer', borderRadius: '5px', transition: 'background-color 0.3s' }}>Add User</button>
            </form>
          </section>

          {/* Content Moderation */}
          <section id="content-moderation" style={{ backgroundColor: '#ffffff', padding: '20px', marginBottom: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <h2 style={{ fontSize: '1.5em', color: '#10b981', marginBottom: '15px' }}>Content Moderation</h2>
            <form onSubmit={handleFlagContent}>
              <div className="form-control" style={{ marginBottom: '15px' }}>
                <label htmlFor="content-id" style={{ display: 'block', fontWeight: 'bold', color: '#555', marginBottom: '5px' }}>Content ID</label>
                <input
                  type="text"
                  id="content-id"
                  name="content_id"
                  value={contentId}
                  onChange={(e) => setContentId(e.target.value)}
                  style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px', fontSize: '1em' }}
                  required
                />
              </div>
              <button type="submit" style={{ backgroundColor: '#10b981', color: '#fff', border: 'none', padding: '10px 15px', fontSize: '1em', cursor: 'pointer', borderRadius: '5px', transition: 'background-color 0.3s' }}>Flag Content</button>
            </form>

            <form onSubmit={handleApproveContent}>
              <div className="form-control" style={{ marginBottom: '15px' }}>
                <label htmlFor="content-id-approve" style={{ display: 'block', fontWeight: 'bold', color: '#555', marginBottom: '5px' }}>Content ID to Approve</label>
                <input
                  type="text"
                  id="content-id-approve"
                  name="content_id"
                  value={contentId}
                  onChange={(e) => setContentId(e.target.value)}
                  style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px', fontSize: '1em' }}
                  required
                />
              </div>
              <button type="submit" style={{ backgroundColor: '#10b981', color: '#fff', border: 'none', padding: '10px 15px', fontSize: '1em', cursor: 'pointer', borderRadius: '5px', transition: 'background-color 0.3s' }}>Approve Content</button>
            </form>
          </section>

          {/* Category Management */}
          <section id="category-management" style={{ backgroundColor: '#ffffff', padding: '20px', marginBottom: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <h2 style={{ fontSize: '1.5em', color: '#10b981', marginBottom: '15px' }}>Category Management</h2>
            <form onSubmit={handleAddCategory}>
              <div className="form-control" style={{ marginBottom: '15px' }}>
                <label htmlFor="category-name" style={{ display: 'block', fontWeight: 'bold', color: '#555', marginBottom: '5px' }}>Category Name</label>
                <input
                  type="text"
                  id="category-name"
                  name="category_name"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px', fontSize: '1em' }}
                  required
                />
              </div>
              <button type="submit" style={{ backgroundColor: '#10b981', color: '#fff', border: 'none', padding: '10px 15px', fontSize: '1em', cursor: 'pointer', borderRadius: '5px', transition: 'background-color 0.3s' }}>Add Category</button>
            </form>
          </section>
        </section>
      </main>
    </div>
  );
};

export default Settings;
