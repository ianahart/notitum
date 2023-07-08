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
      <Flex direction={['column', 'column', 'row']} minH="100vh" as="main">
        <Box
          backgroundImage={`url(${backgroundImage})`}
          flexGrow="1"
          backgroundSize="cover"
          backgroundPosition="center"
        ></Box>
        <Box flexGrow="1">
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

          {children}
        </Box>
      </Flex>
    </Box>
  );
};

export default AuthContainer;
