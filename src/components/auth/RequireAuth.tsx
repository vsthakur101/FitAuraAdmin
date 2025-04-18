import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Navigate } from 'react-router-dom';
import { JSX } from 'react';

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const isLoggedIn = !!user && !!user.id; // 🔒 Check if user object and id exist
  console.log(user, isLoggedIn)
  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

export default RequireAuth;