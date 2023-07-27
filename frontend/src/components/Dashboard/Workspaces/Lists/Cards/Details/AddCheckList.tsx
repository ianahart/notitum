import { Box } from '@chakra-ui/react';
import CardButton from './CardButton';
import { AiOutlineCheckSquare } from 'react-icons/ai';
const AddCheckList = () => {
  return (
    <Box>
      <CardButton title="Add checklist" icon={<AiOutlineCheckSquare />} />
    </Box>
  );
};

export default AddCheckList;
