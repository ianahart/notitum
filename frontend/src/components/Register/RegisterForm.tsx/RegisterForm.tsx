import { Box, Heading } from '@chakra-ui/react';

interface IRegisterFormProps {
    heading: string;
} 


const RegisterForm = ({heading}: IRegisterFormProps) => {
  return (
    <Box>
      <Heading as="h1">{heading}</Heading>
    </Box>
  );
};

export default RegisterForm;
