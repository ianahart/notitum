import { FormControl, FormLabel, FormErrorMessage, Input, Box } from '@chakra-ui/react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

export interface IFormInputProps {
  updateField: (name: string, value: string, attribute: string) => void;
  value: string;
  error: string;
  name: string;
  type: string;
  width: string;
  htmlFor: string;
  label: string;
  errorField: string;
}
const FormInput = ({
  updateField,
  value,
  error,
  name,
  type,
  width,
  htmlFor,
  label,
  errorField,
}: IFormInputProps) => {
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateField(name, value, 'value');
  };

  const handleOnBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const error = `${errorField} must be between 1 and 250 characters.`;
    if (value.trim().length === 0 || value.length > 250) {
      updateField(name, error, 'error');
    }
  };

  const handleOnFocus = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    updateField(name, '', 'error');
  };

  const togglePasswordVisibility = () => {
    const password = type === 'password' ? 'text' : 'password';
    updateField('password', password, 'type');
    updateField('confirmPassword', password, 'type');
  };

  return (
    <FormControl
      my="1.5rem"
      display="flex"
      flexDir="column"
      isInvalid={error.length > 0}
      textAlign="center"
    >
      <FormLabel color="text.primary" htmlFor={htmlFor}>
        {label}
      </FormLabel>
      <Input
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        width={['100%', width, width]}
        onChange={handleOnChange}
        type={type}
        name={name}
        id={name}
        value={value}
      />

      {name === 'password' && (
        <Box
          onClick={togglePasswordVisibility}
          fontSize="1.2rem"
          color="text.primary"
          zIndex={5}
          cursor="pointer"
          position="absolute"
          bottom="10px"
          right="5px"
        >
          {type === 'password' ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
        </Box>
      )}

      {error.length > 0 && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};

export default FormInput;
