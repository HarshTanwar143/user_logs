import { createContext, useContext, useState, useCallback } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userCache, setUserCache] = useState({});

  // Add or update a user in the cache
  const updateUserInCache = useCallback((user) => {
    setUserCache(prevCache => ({
      ...prevCache,
      [user.id]: user
    }));
  }, []);

  // Get a user from cache if available
  const getUserFromCache = useCallback((id) => {
    return userCache[id] || null;
  }, [userCache]);

  // Delete a user from cache
  const deleteUserFromCache = useCallback((id) => {
    setUserCache(prevCache => {
      const newCache = { ...prevCache };
      delete newCache[id];
      return newCache;
    });
  }, []);

  // Update user list with cached users
  const updateUserListWithCache = useCallback((users) => {
    return users.map(user => 
      userCache[user.id] ? { ...user, ...userCache[user.id] } : user
    );
  }, [userCache]);

  const value = {
    updateUserInCache,
    getUserFromCache,
    deleteUserFromCache,
    updateUserListWithCache
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};