import { Box, Flex, Text } from '@chakra-ui/react';
import backgroundBG from '../../../../assets/background-options.jpg';
import { AiOutlineClose } from 'react-icons/ai';
import { useState } from 'react';
import Colors from './Colors';
import Photos from './Photos';
const ChangeBackground = () => {
  const [backgroundType, setBackgroundType] = useState('');

  return (
    <Box color="light.primary">
      <Flex justify="space-evenly" alignItems="center">
        {backgroundType === '' && (
          <>
            <Flex flexDir="column">
              <Box
                onClick={() => setBackgroundType('photo')}
                width="120px"
                height="70px"
                borderRadius={8}
                cursor="pointer"
                backgroundPosition="center"
                backgroundSize="cover"
                backgroundImage={`url(${backgroundBG})`}
              ></Box>
              <Text mt="0.5rem" fontSize="0.9rem" textAlign="center">
                Photos
              </Text>
            </Flex>
            <Flex flexDir="column">
              <Box
                cursor="pointer"
                onClick={() => setBackgroundType('color')}
                width="120px"
                height="70px"
                borderRadius={8}
                bg="primary.blue"
              ></Box>
              <Text fontSize="0.9rem" mt="0.5rem" textAlign="center">
                Colors
              </Text>
            </Flex>
          </>
        )}
      </Flex>
      <Flex mt="2rem" justify="flex-end">
        {backgroundType !== '' && (
          <Box cursor="pointer" onClick={() => setBackgroundType('')}>
            <AiOutlineClose />
          </Box>
        )}
      </Flex>
      {backgroundType === 'photo' && <Photos />}
      {backgroundType === 'color' && <Colors />}
    </Box>
  );
};

export default ChangeBackground;
