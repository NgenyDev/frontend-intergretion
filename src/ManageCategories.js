import React, { useState, useEffect } from 'react';
import './ManageCategories.css'; // External stylesheet for styles

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null); // Track selected category
  const [categoryContent, setCategoryContent] = useState([]); // Store content of the selected category
  const [editingCategory, setEditingCategory] = useState(null); // Track category being edited
  const [editedCategoryName, setEditedCategoryName] = useState(''); // Edited category name
  const [showAddCategoryForm, setShowAddCategoryForm] = useState(false); // State to toggle form visibility

  // Fetch existing categories on component mount
  useEffect(() => {
    fetch('http://localhost:5000/categories') // Replace with your mock API endpoint
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('There was an error fetching categories!', error);
        setError('Failed to load categories. Please try again later.');
        setLoading(false);
      });
  }, []);

  // Fetch content for the selected category
  const fetchCategoryContent = (categoryName) => {
    setLoading(true); // Set loading state when content is being fetched
    fetch('http://localhost:5000/categories') // Your API endpoint for content
      .then((response) => response.json())
      .then((data) => {
        // Filter content based on the selected category name
        const filteredContent = data.filter(
          (item) => item.category === categoryName
        );
        setCategoryContent(filteredContent);
        setLoading(false);
      })
      .catch((error) => {
        console.error('There was an error fetching category content!', error);
        setError('Failed to load content. Please try again later.');
        setLoading(false);
      });
  };

  // Handle category creation
  const handleAddCategory = () => {
    if (newCategory.trim() === '') {
      alert('Category name cannot be empty');
      return;
    }

    fetch('http://localhost:5000/categories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: newCategory }), // Sending new category name
    })
      .then((response) => response.json())
      .then((data) => {
        setCategories([...categories, data]);
        setNewCategory('');
        setShowAddCategoryForm(false); // Hide form after adding category
      })
      .catch((error) => {
        console.error('There was an error adding the category!', error);
        setError('Failed to add category. Please try again later.');
      });
  };

  // Handle category deletion (Admin only)
  const handleDeleteCategory = (id) => {
    const confirmation = window.confirm('Are you sure you want to delete this category?');
    if (confirmation) {
      fetch(`http://localhost:5000/categories/${id}`, {
        method: 'DELETE',
      })
        .then(() => {
          setCategories(categories.filter((category) => category.id !== id));
          if (selectedCategory === id) {
            setCategoryContent([]); // Clear content if the deleted category was selected
            setSelectedCategory(null); // Reset the selected category
          }
        })
        .catch((error) => {
          console.error('There was an error deleting the category!', error);
          setError('Failed to delete category. Please try again later.');
        });
    }
  };

  // Handle category selection
  const handleCategoryClick = (categoryName) => {
    if (selectedCategory === categoryName) {
      // If the same category is clicked again, deselect it
      setSelectedCategory(null);
      setCategoryContent([]);
    } else {
      setSelectedCategory(categoryName);
      fetchCategoryContent(categoryName); // Fetch content when category is clicked
    }
  };

  // Handle category edit
  const handleEditCategory = (categoryId, categoryName) => {
    setEditingCategory(categoryId);
    setEditedCategoryName(categoryName);
  };

  // Handle saving the edited category
  const handleSaveEditedCategory = (categoryId) => {
    if (editedCategoryName.trim() === '') {
      alert('Category name cannot be empty');
      return;
    }

    fetch(`http://localhost:5000/categories/${categoryId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: editedCategoryName }), // Sending updated category name
    })
      .then((response) => response.json())
      .then((data) => {
        setCategories(
          categories.map((category) =>
            category.id === categoryId ? { ...category, name: editedCategoryName } : category
          )
        );
        setEditingCategory(null); // Reset editing mode
        setEditedCategoryName(''); // Clear the edited name
      })
      .catch((error) => {
        console.error('There was an error updating the category!', error);
        setError('Failed to update category. Please try again later.');
      });
  };

  return (
    <div className="manage-categories">
      <h2 className="heading">Manage Categories</h2>
      <p className="description">
        As an admin or tech writer, you can create, delete, and organize categories for content on the platform.
      </p>

      {/* Always show Add Category Form */}
      <button
        onClick={() => setShowAddCategoryForm(!showAddCategoryForm)} // Toggle form visibility
        className="btn add-category-btn"
      >
        {showAddCategoryForm ? 'Cancel' : 'Add Category'}
      </button>

      {/* Add Category Form */}
      {showAddCategoryForm && (
        <div className="add-category-section">
          <h3 className="add-category-title">Add New Category</h3>
          <div className="category-form">
            <input
              type="text"
              placeholder="Enter new category name"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="input-field"
            />
            <button onClick={handleAddCategory} className="btn add-category-btn">
              Add Category
            </button>
          </div>
        </div>
      )}

      {/* Error Handling */}
      {error && <p className="error-message">{error}</p>}

      {/* Category List */}
      {loading ? (
        <div className="loader">Loading...</div> // Can be replaced with a loading spinner component
      ) : (
        <ul className="category-list">
          {categories.length === 0 ? (
            <li className="no-categories">No categories available</li>
          ) : (
            categories.map((category) => (
              <li key={category.id} className="category-item">
                <div className="category-info">
                  {editingCategory === category.id ? (
                    <input
                      type="text"
                      value={editedCategoryName}
                      onChange={(e) => setEditedCategoryName(e.target.value)}
                      className="input-field"
                    />
                  ) : (
                    <span
                      className="category-name"
                      onClick={() => handleCategoryClick(category.name)} // Handle category name click
                    >
                      {category.name}
                    </span>
                  )}

                  {/* Edit button */}
                  <button
                    onClick={() => handleEditCategory(category.id, category.name)}
                    className="btn edit-btn"
                  >
                    Edit
                  </button>

                  {/* Delete button */}
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteCategory(category.id)}
                  >
                    <i className="fas fa-trash-alt"></i> {/* FontAwesome trash icon */}
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      )}

      {/* Display selected category content */}
      {selectedCategory && (
        <div className="category-content">
          <h3>Content for {selectedCategory}</h3>
          {categoryContent.length === 0 ? (
            <p>No content available for this category</p>
          ) : (
            <ul>
              {categoryContent.map((content) => (
                <li key={content.id} className="content-item">
                  {content.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default ManageCategories;
