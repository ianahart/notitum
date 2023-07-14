import { useContext, useEffect, useRef, useState } from 'react';
import { colorsState } from '../../../../state/initialState';
import { Box, Flex, Text } from '@chakra-ui/react';
import { IPexels, IWorkspaceContext } from '../../../../interfaces';
import { WorkspaceContext } from '../../../../context/workspace';
const Colors = () => {
  const { handleUpdateProperty } = useContext(WorkspaceContext) as IWorkspaceContext;
  const shouldRun = useRef(true);
  const [colors, setColors] = useState<IPexels[]>([]);

  useEffect(() => {
    if (shouldRun.current) {
      shouldRun.current = false;
      setColors(colorsState);
    }
  }, [setColors, colorsState]);

  return (
    <Box color="light.primary">
      <Text fontWeight="bold" mb="0.25rem" textAlign="center">
        Colors
      </Text>
      <Flex justify="center" flexWrap="wrap">
        {colors.map(({ id, background }) => {
          return (
            <Box
              onClick={() => handleUpdateProperty(background, 'background')}
              cursor="pointer"
              key={id}
              _hover={{ opacity: '0.8' }}
              bg={background}
              height="70px"
              width="100px"
              borderRadius={8}
              m="0.5rem"
            ></Box>
          );
        })}
      </Flex>
    </Box>
  );
};

export default Colors;
