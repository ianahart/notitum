import AuthContainer from '../components/Shared/AuthContainer';
import registerBG from '../assets/register.jpg';
import RegisterForm from '../components/Register/RegisterForm.tsx/RegisterForm';
import { Flex } from '@chakra-ui/react';

const RegisterRoute = () => {
  return (
    <AuthContainer path="/" pathName="Login" backgroundImage={registerBG}>
      <RegisterForm
        heading="Create your account"
        subHeading="Create an account to view and manage your workspaces."
      />
    </AuthContainer>
  );
};

export default RegisterRoute;
