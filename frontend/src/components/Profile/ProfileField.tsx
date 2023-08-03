import { Box, Text } from '@chakra-ui/react';

interface IProfileFieldProps {
  label: string;
  value: string;
  errorName: string;
}

const ProfileField = ({ label, value, errorName }: IProfileFieldProps) => {
  return (
    <Box my="1.5rem">
      <Text my="0.25rem" color="text.primary" fontSize="0.8rem">
        {label}
      </Text>
      <Text my="0.25rem" color="text.primary" fontWeight="bold" fontSize="0.85rem">
        {value !== null ? value : `Their ${errorName} is not displayed.`}
      </Text>
    </Box>
  );
};

export default ProfileField;
