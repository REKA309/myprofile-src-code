// actions.js
export const login = (user) => ({
    type: 'LOGIN',
    payload: { user },
  });
  
  export const logout = () => ({
    type: 'LOGOUT',
  });
  
  export const setUserData = (userData) => ({
    type: 'SET_USER_DATA',
    payload: userData,
  });
  