import { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from '../firebase';

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState({});
  const [loading, setLoading] = useState(false);

  const register = ({ email, password }) => {
    return (createUserWithEmailAndPassword(auth, email, password));
  };

  const login = ({ email, password }) => {
    return (signInWithEmailAndPassword(auth, email, password));
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const logout = () => {
    return signOut(auth);
  }

  return(
    <UserContext.Provider value={{ currentUser, register, login, logout }}>
      {!loading && children}
    </UserContext.Provider>
  );
}
