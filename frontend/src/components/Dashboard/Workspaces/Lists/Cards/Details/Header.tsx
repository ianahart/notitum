import { Box, Text, Flex, Heading } from '@chakra-ui/react';
import { BsCardText } from 'react-icons/bs';
interface IHeaderProps {
  cardTitle: string;
  workspaceListTitle: string;
}

const Header = ({ cardTitle, workspaceListTitle }: IHeaderProps) => {
  return (
    <Flex alignItems="center">
      <Box fontSize="2rem" mr="0.5rem">
        <BsCardText />
      </Box>
      <Box>
        <Heading as="h3" fontSize="1rem">
          {cardTitle}
        </Heading>
        <Text fontSize="0.85rem">In list {workspaceListTitle}</Text>
      </Box>
    </Flex>
  );
};

export default Header;
