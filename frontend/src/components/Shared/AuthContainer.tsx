import { Box, Flex } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

interface IAuthContainerProps {
  children: JSX.Element;
  backgroundImage: string;
  path: string;
  pathName: string;
}

const AuthContainer = ({
  children,
  backgroundImage,
  path,
  pathName,
}: IAuthContainerProps) => {
  return (
    <Box minH="100vh">
      <Flex className="authContainer" minH="100vh" as="main">
        <Box
          className="authBackgroundImage"
          backgroundImage={`url(${backgroundImage})`}
          backgroundSize="cover"
          backgroundPosition="center"
          minH="100vh"
        ></Box>
        <Box className="authFormContainer">
          <Flex
            bg="primary.blue"
            direction="column"
            width="100px"
            justifyContent="center"
            alignItems="center"
            p="0.5rem"
            m="0.5rem"
            color="#fff"
            marginLeft="auto"
            borderRadius={8}
            textAlign="center"
          >
            <RouterLink to={path}>{pathName}</RouterLink>
          </Flex>
          <Box className="formContainer" margin="10rem auto 1rem auto">
            {children}
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default AuthContainer;
