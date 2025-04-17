import { Navigate, useLocation } from "react-router-dom";

const RedirectOnRefresh = () => {
    const location = useLocation();
  
    const isFirstLoad = location.key === 'default'; // triggered on hard refresh
  
    if (isFirstLoad && location.pathname !== '/') {
      return <Navigate to="/" replace />;
    }
  
    return null;
};

export default RedirectOnRefresh;