import { Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { authSelector } from "../redux/auth/authSelector";

const PrivateRoute = ({ element, ...rest }) => {
  const auth = useSelector(authSelector);

  // Jika pengguna sudah masuk, render komponen yang diberikan
  // Jika pengguna belum masuk, arahkan ke halaman login
  return auth.isAuthenticated ? (
    <Route {...rest} element={element} />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoute;
