import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { UserProvider } from './context/UserContext';
import AuthGuard from './components/AuthGuard';
import Login from './pages/Login';
import UsersList from './pages/UsersList';
import EditUser from './pages/EditUser';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <UserProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route 
              path="/users" 
              element={
                <AuthGuard>
                  <UsersList />
                </AuthGuard>
              } 
            />
            <Route 
              path="/users/:id/edit" 
              element={
                <AuthGuard>
                  <EditUser />
                </AuthGuard>
              } 
            />
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </UserProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;