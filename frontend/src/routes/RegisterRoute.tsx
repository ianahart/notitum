import { Flex } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import AuthContainer from '../components/Shared/AuthContainer';
import registerBG from '../assets/register.jpg';
import RegisterForm from '../components/Register/RegisterForm.tsx/RegisterForm';

const RegisterRoute = () => {
  return (
    <AuthContainer path="/" pathName="Login" backgroundImage={registerBG}>
      <>
        <RegisterForm heading="Create your account" />
      </>
    </AuthContainer>
  );
};

export default RegisterRoute;
