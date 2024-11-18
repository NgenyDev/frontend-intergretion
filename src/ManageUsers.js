import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCheckCircle, faUserSlash, faTrash, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import './ManageUsers.css';
import './Login.css';

const ManageUsers = ({ isSidebarOpen }) => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'User',
    status: 'active',
  });
  const [selectOption, setSelectOption] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const viewProfile = (user) => {
    navigate(`/user-profile/${user.id}`, { state: { user } });
  };

  const handleUserSelect = (userId) => {
    setSelectedUsers(prevSelectedUsers =>
      prevSelectedUsers.includes(userId)
        ? prevSelectedUsers.filter(id => id !== userId)
        : [...prevSelectedUsers, userId]
    );
  };

  const handleSelectAll = () => {
    if (selectOption === 'selectActive') {
      setSelectedUsers(users.filter(user => user.status === 'active').map(user => user.id));
    } else if (selectOption === 'selectInactive') {
      setSelectedUsers(users.filter(user => user.status === 'inactive').map(user => user.id));
    } else {
      setSelectedUsers(users.map(user => user.id));
    }
    setSelectAll(true);
  };

  const handleSelectOptionChange = (option) => {
    setSelectOption(option);
    setSelectAll(false);
    setSelectedUsers([]);
    setIsDropdownOpen(false);
  };

  const deactivateUser = (userId) => {
    setUsers(prevUsers =>
      prevUsers.map(user =>
        user.id === userId ? { ...user, status: 'inactive' } : user
      )
    );
    axios.patch(`http://localhost:5000/users/${userId}`, { status: 'inactive' });
  };

  const activateUser = (userId) => {
    setUsers(prevUsers =>
      prevUsers.map(user =>
        user.id === userId ? { ...user, status: 'active' } : user
      )
    );
    axios.patch(`http://localhost:5000/users/${userId}`, { status: 'active' });
  };

  const deleteUsers = () => {
    selectedUsers.forEach(userId => {
      setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
      axios.delete(`http://localhost:5000/users/${userId}`);
    });
    setSelectedUsers([]);
  };

  const deleteUser = (userId) => {
    setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
    axios.delete(`http://localhost:5000/users/${userId}`);
  };

  const addUser = async () => {
    try {
      const response = await axios.post('http://localhost:5000/users', newUser);
      setUsers(prevUsers => [...prevUsers, response.data]);
      setIsModalOpen(false);
      setNewUser({ name: '', email: '', role: 'User', status: 'active' });
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser(prevUser => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className={`manage-users-container ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      <h2 className="page-title">Manage Users</h2>
      <p className="page-description">Manage all users on the platform. You can add, edit, deactivate, or delete users.</p>

      <div className="user-table-wrapper">
        <table className="user-table">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
                />
                {/* Dropdown for Select All */}
                <div className="select-all-dropdown">
                  <button onClick={toggleDropdown} className="dropdown-btn">
                    Select All <FontAwesomeIcon icon={faCaretDown} />
                  </button>
                  {isDropdownOpen && (
                    <div className="dropdown-options">
                      <button onClick={() => handleSelectOptionChange('selectAll')}>Select All</button>
                      <button onClick={() => handleSelectOptionChange('selectActive')}>Select Active Users</button>
                      <button onClick={() => handleSelectOptionChange('selectInactive')}>Select Inactive Users</button>
                      <button onClick={deleteUsers} className="delete-selected-btn">Delete Selected</button>
                    </div>
                  )}
                </div>
              </th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user.id)}
                    onChange={() => handleUserSelect(user.id)}
                  />
                </td>
                <td onClick={() => viewProfile(user)} className="user-name">
                  {user.name}
                </td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td className={`status ${user.status}`}>
                  {user.status === 'active' ? (
                    <FontAwesomeIcon icon={faCheckCircle} className="status-icon active" />
                  ) : (
                    <FontAwesomeIcon icon={faUserSlash} className="status-icon inactive" />
                  )}
                </td>
                <td className="action-buttons">
                  <button
                    onClick={() => user.status === 'active' ? deactivateUser(user.id) : activateUser(user.id)}
                    className={`status-btn ${user.status === 'active' ? 'deactivate' : 'activate'}`}
                    title={user.status === 'active' ? 'Deactivate User' : 'Activate User'}
                  >
                    {user.status === 'active' ? 'Deactivate' : 'Activate'}
                  </button>
                  <button onClick={() => deleteUser(user.id)} className="delete-btn" title="Delete User">
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="add-user-container">
        <button onClick={openModal} className="add-btn">
          <FontAwesomeIcon icon={faPlusCircle} /> Add New User
        </button>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Add New User</h2>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={newUser.name}
              onChange={handleInputChange}
            />
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={newUser.email}
              onChange={handleInputChange}
            />
            <label>Role</label>
            <select
              name="role"
              value={newUser.role}
              onChange={handleInputChange}
            >
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>
            <label>Status</label>
            <select
              name="status"
              value={newUser.status}
              onChange={handleInputChange}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <button onClick={addUser} className="submit-btn">Add User</button>
            <button onClick={closeModal} className="cancel-btn">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
