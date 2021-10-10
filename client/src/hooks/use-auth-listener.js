import { useState, useEffect, useContext } from 'react';
import jwtDecode from 'jwt-decode';

export default function useAuthListener() {
  const [user, setUser] = useState();
  useEffect(() => {
    try {
      const jwt = localStorage.getItem('token')
      setUser(jwtDecode(jwt));
    } catch (error) {
      setUser(null);
    }
  }, []);

  return user;
}
