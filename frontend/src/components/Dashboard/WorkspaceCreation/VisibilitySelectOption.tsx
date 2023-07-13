import { Box, Flex, Text } from '@chakra-ui/react';

interface IVisibilitySelectOptionProps {
  text: string;
  title: string;
  icon: JSX.Element;
  visibility: string;
  handleMenuOpen: () => void;
  handleVisibility: (option: string) => void;
}

const VisibilitySelectOption = ({
  text,
  title,
  icon,
  visibility,
  handleMenuOpen,
  handleVisibility,
}: IVisibilitySelectOptionProps) => {
  const handleOnClick = () => {
    handleVisibility(title);
    handleMenuOpen();
  };

  return (
    <Flex
      background={visibility.toLowerCase() === title ? '#068FFF' : 'unset'}
      _hover={{ background: '#302e2e' }}
      onClick={handleOnClick}
      cursor="pointer"
      p="0.25rem"
    >
      <Box color="light.primary" mr="0.25rem">
        {icon}
      </Box>
      <Flex flexDir="column">
        <Text color="light.primary" fontSize="0.8rem" fontWeight="bold">
          {title}
        </Text>
        <Text color="light.primary" fontSize="0.75rem">
          {text}
        </Text>
      </Flex>
    </Flex>
  );
};

export default VisibilitySelectOption;
