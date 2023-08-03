import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { RiEarthFill } from 'react-icons/ri';

interface IBannerProps {
  userInitials: string;
  showInfo: boolean;
}

const Banner = ({ userInitials, showInfo }: IBannerProps) => {
  return (
    <Box>
      <Heading mb="0.25rem" color="black.primary" fontSize="1.3rem">
        Banner
      </Heading>
      <Box position="relative">
        <Box
          boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
          borderTopRadius={8}
          minH="100px"
          bg="linear-gradient(
  45deg,
  hsl(240deg 80% 61%) 0%,
  hsl(248deg 86% 62%) 10%,
  hsl(256deg 91% 61%) 20%,
  hsl(263deg 95% 60%) 30%,
  hsl(271deg 98% 57%) 40%,
  hsl(279deg 100% 50%) 50%,
  hsl(261deg 100% 64%) 60%,
  hsl(241deg 100% 69%) 70%,
  hsl(223deg 100% 62%) 80%,
  hsl(212deg 100% 55%) 90%,
  hsl(207deg 100% 51%) 100%
)"
        ></Box>
        <Flex
          flexDir="column"
          alignItems="flex-end"
          justify="flex-end"
          borderBottomRadius={8}
          minH="100px"
          border="1px solid"
          boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
          borderColor="light.primary"
        >
          {showInfo && (
            <>
              <Flex mr="0.5rem" alignItems="center">
                <Text fontSize="0.85rem" color="text.primary">
                  Who can see this?
                </Text>
                <Box color="text.primary">
                  <AiOutlineInfoCircle />
                </Box>
              </Flex>
              <Flex mr="0.5rem" alignItems="center">
                <Text fontSize="0.85rem" color="text.primary">
                  Anyone
                </Text>
                <Box ml="0.5rem" color="text.primary">
                  <RiEarthFill />
                </Box>
              </Flex>
            </>
          )}
        </Flex>
        <Flex
          flexDir="column"
          justifyContent="center"
          width="100px"
          height="100px"
          borderRadius="50%"
          color="light.primary"
          bg="primary.blue"
          fontSize="2rem"
          boxShadow="0 0 0 2px #fff"
          position="absolute"
          top="50px"
          left="50px"
          alignItems="center"
        >
          <Text>{userInitials}</Text>
        </Flex>
      </Box>
    </Box>
  );
};
export default Banner;
