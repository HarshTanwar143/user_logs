import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUser, updateUser } from '../services/api';
import { useUser } from '../context/UserContext';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorAlert from '../components/ErrorAlert';

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getUserFromCache, updateUserInCache } = useUser();
  
  const [userData, setUserData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    avatar: ''
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const cachedUser = getUserFromCache(id);
        
        if (cachedUser) {
          setUserData(cachedUser);
          setLoading(false);
          return;
        }
        
        const response = await getUser(id);
        setUserData(response.data);
      } catch (err) {
        setError('Failed to fetch user details. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [id, getUserFromCache]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      if (!userData.first_name || !userData.last_name || !userData.email) {
        throw new Error('All fields are required');
      }

      const updatedUserData = {
        first_name: userData.first_name,
        last_name: userData.last_name,
        email: userData.email
      };

      const response = await updateUser(id, updatedUserData);
      
      const updatedUser = {
        ...userData,
        ...updatedUserData,
        ...response // Including any data returned from the API
      };
      
      updateUserInCache(updatedUser);

      navigate('/users', { state: { message: 'User updated successfully!' } });
    } catch (err) {
      setError(err.message || 'Failed to update user. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit User</h1>

        {error && <ErrorAlert message={error} />}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center mb-6">
            <img 
              src={userData.avatar} 
              alt={`${userData.first_name} ${userData.last_name}`} 
              className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
            />
          </div>

          <div>
            <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              value={userData.first_name}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              value={userData.last_name}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={() => navigate('/users')}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition flex-1"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition flex-1 disabled:bg-blue-300"
            >
              {submitting ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;