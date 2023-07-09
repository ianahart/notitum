import loginBG from '../assets/login.jpg';
import LoginForm from '../components/Login/LoginForm';
import AuthContainer from '../components/Shared/AuthContainer';

const HomeRoute = () => {
  return (
    <AuthContainer path="/register" pathName="Register" backgroundImage={loginBG}>
      <>
        <LoginForm
          heading="Login"
          subHeading="Welcome Back. Please login to your account."
        />
      </>
    </AuthContainer>
  );
};

export default HomeRoute;
