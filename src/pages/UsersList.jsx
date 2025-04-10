import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getUsers, deleteUser } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useUser } from '../context/UserContext';
import LoadingSpinner from '../components/LoadingSpinner';
import Pagination from '../components/Pagination';
import SearchBar from '../components/SearchBar';
import UserCard from '../components/UserCard';
import SuccessAlert from '../components/SuccessAlert';
import ErrorAlert from '../components/ErrorAlert';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const { logout } = useAuth();
  const { updateUserListWithCache, deleteUserFromCache } = useUser();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.message) {
      setSuccess(location.state.message);
      
      setTimeout(() => {
        setSuccess('');
      }, 3000);
      
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  useEffect(() => {
    if (searchTerm) {
      const filtered = users.filter(
        user => 
          user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(users);
    }
  }, [searchTerm, users]);

  const fetchUsers = async (page) => {
    setLoading(true);
    setError('');
    
    try {
      const data = await getUsers(page);
      
      const updatedUsers = updateUserListWithCache(data.data);
      
      setUsers(updatedUsers);
      setFilteredUsers(updatedUsers);
      setTotalPages(data.total_pages);
    } catch (err) {
      setError('Failed to fetch users. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id);
      
      deleteUserFromCache(id);
      setUsers(users.filter(user => user.id !== id));
      
      setSuccess('User deleted successfully!');
      
      setTimeout(() => {
        setSuccess('');
      }, 3000);
    } catch (err) {
      setError('Failed to delete user. Please try again.');
      console.error(err);
      
      setTimeout(() => {
        setError('');
      }, 3000);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Users Management</h1>
        <button
          onClick={logout}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>

      {success && <SuccessAlert message={success} />}
      {error && <ErrorAlert message={error} />}

      <div className="mb-6">
        <SearchBar onSearch={handleSearch} />
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {filteredUsers.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No users found matching your search criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredUsers.map(user => (
                <UserCard 
                  key={user.id}
                  user={user}
                  onDelete={() => handleDeleteUser(user.id)}
                />
              ))}
            </div>
          )}

          <div className="mt-8">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default UsersList;