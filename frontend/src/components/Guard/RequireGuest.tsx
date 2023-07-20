import { useLocation, Navigate } from 'react-router-dom';
import { retreiveTokens, slugify } from '../../util';
import { useContext } from 'react';
import { UserContext } from '../../context/user';
import { IUserContext } from '../../interfaces';
interface Props {
  children: JSX.Element;
}

const RequireGuest: React.FC<Props> = ({ children }) => {
  const location = useLocation();
  const guestRoutes = [
    '/',
    '/login',
    '/register',
    '/forgot-password',
    '/reset-password/',
  ];
  const storage = retreiveTokens();
  if (storage === undefined && guestRoutes.includes(location.pathname)) {
    return children;
  } else {
    const { user } = useContext(UserContext) as IUserContext;
    if (user.id !== 0) {
      return (
        <Navigate
          to={`/${slugify(user.firstName, user.lastName)}/dashboard`}
          replace
          state={{ path: location.pathname }}
        />
      );
    }
  }
};

export default RequireGuest;
