import loginBG from '../assets/login.jpg';
import AuthContainer from '../components/Shared/AuthContainer';

const HomeRoute = () => {
  return (
    <AuthContainer path="/register" pathName="Register" backgroundImage={loginBG}>
      <></>
    </AuthContainer>
  );
};

export default HomeRoute;
