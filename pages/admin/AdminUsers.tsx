import React, { useState, useEffect, useCallback } from 'react';
import { getUsersAdmin, updateUserAdmin, deleteUserAdmin } from '../../apiService';
import { User } from '../../types'; // Assuming User type is defined in types.ts
import { FiEdit, FiTrash2, FiUserPlus, FiX, FiAlertCircle, FiCheckCircle, FiEye, FiEyeOff } from 'react-icons/fi'; // Example icons
import LoadingSpinner from '../../components/LoadingSpinner';

const UsersGroupIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2 text-text-dark" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-3.741-5.013M13.5 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM8.25 18.75a9 9 0 0 1 .069-2.25m0 0a9 9 0 0 0-4.128-1.974 3 3 0 1 0-3.742 5.013 9.093 9.093 0 0 0 3.742.479M9.75 9.75a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm6.75 6a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
  </svg>
);

const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [editFormData, setEditFormData] = useState<Partial<User>>({});

  const [showPassword, setShowPassword] = useState(false); // For a potential password change field

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getUsersAdmin();
      const mappedUsers = response.data.map((user: any) => ({ ...user, id: user._id }));
      setUsers(mappedUsers);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Failed to fetch users');
      console.error("Error fetching users:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setEditFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      isActive: user.isActive !== undefined ? user.isActive : true, // Default to true if undefined
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (userId: string) => {
    if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      try {
        await deleteUserAdmin(userId);
        setUsers(users.filter(user => user.id !== userId));
        // Optionally, show a success toast/notification
      } catch (err: any) {
        setError(err.response?.data?.message || err.message || 'Failed to delete user');
        console.error("Error deleting user:", err);
        // Optionally, show an error toast/notification
      }
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
    setEditFormData({});
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
        setEditFormData(prev => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
    } else {
        setEditFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;

    try {
      const response = await updateUserAdmin(selectedUser.id, editFormData);
      const updatedUser = { ...response.data, id: response.data._id };
      setUsers(users.map(user => (user.id === updatedUser.id ? updatedUser : user)));
      handleModalClose();
      // Optionally, show a success toast/notification
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Failed to update user');
      console.error("Error updating user:", err);
      // Modal will remain open with the error, or display error within the modal
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Manage Users</h1>
        {/* 
        <button 
          onClick={() => { console.log('Add new user clicked'); // Simplified for comment stability }}
          className="bg-primary hover:bg-secondary text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-150 ease-in-out flex items-center"
        >
          <FiUserPlus className="mr-2" /> Add New User
        </button>
        */}
      </div>

      {error && (
        <div className="mb-4 p-4 bg-error-light text-error rounded-lg flex items-center">
          <FiAlertCircle className="mr-2 text-xl"/> {error}
        </div>
      )}

      <div className="bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Email</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Role</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Joined</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.length > 0 ? users.map(user => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{user.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-700">{user.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.role === 'admin' ? 'bg-accent-dark/20 text-accent-dark' : 'bg-green-100 text-green-800'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.isActive ? 'bg-success-light text-success' : 'bg-red-100 text-red-800'
                    }`}>
                      {user.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                      onClick={() => handleEdit(user)} 
                      className="text-primary hover:text-secondary mr-3 transition-colors duration-150"
                      title="Edit User"
                    >
                      <FiEdit size={18}/>
                    </button>
                    <button 
                      onClick={() => handleDelete(user.id)} 
                      className="text-red-600 hover:text-red-800 transition-colors duration-150"
                      title="Delete User"
                    >
                      <FiTrash2 size={18}/>
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit User Modal */}
      {isModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity duration-300 ease-in-out">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-800">Edit User: {selectedUser.name}</h2>
              <button onClick={handleModalClose} className="text-gray-500 hover:text-gray-700 transition-colors">
                <FiX size={24} />
              </button>
            </div>
            
            {error && ( // Display error within modal if it occurred during submit
                <div className="mb-4 p-3 bg-error-light text-error rounded-md text-sm">
                    <FiAlertCircle className="inline mr-2" />{error}
                </div>
            )}

            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={editFormData.name || ''}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={editFormData.email || ''}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <select
                  name="role"
                  id="role"
                  value={editFormData.role || 'user'}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="mb-6">
                <label className="flex items-center text-sm font-medium text-gray-700">
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={editFormData.isActive || false}
                    onChange={handleFormChange}
                    className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary mr-2"
                  />
                  Active User
                </label>
              </div>
              
              {/* Optional: Password Change Section - Add complexity here if needed 
              <div className="mb-4 border-t pt-4 mt-4">
                <h3 className="text-lg font-medium text-gray-700 mb-2">Change Password (Optional)</h3>
                <div className="relative">
                    <input
                    type={showPassword ? 'text' : 'password'}
                    name="newPassword"
                    placeholder="New Password"
                    // value={editFormData.newPassword || ''}
                    // onChange={handleFormChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500">
                        {showPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">Leave blank to keep current password.</p>
              </div>
              */}

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={handleModalClose}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md border border-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-secondary rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors flex items-center"
                >
                  <FiCheckCircle className="mr-2" /> Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
