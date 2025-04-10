import { Link } from 'react-router-dom';

const UserCard = ({ user, onDelete }) => {
  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${user.first_name} ${user.last_name}?`)) {
      onDelete();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-lg">
      <img
        src={user.avatar}
        alt={`${user.first_name} ${user.last_name}`}
        className="w-full h-64 object-cover"
      />
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800">{`${user.first_name} ${user.last_name}`}</h3>
        <p className="text-gray-600 mb-4">{user.email}</p>
        
        <div className="flex space-x-2">
          <Link
            to={`/users/${user.id}/edit`}
            className="flex-1 inline-flex justify-center items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
            </svg>
            Edit
          </Link>
          <button
            onClick={handleDelete}
            className="flex-1 inline-flex justify-center items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
            </svg>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;