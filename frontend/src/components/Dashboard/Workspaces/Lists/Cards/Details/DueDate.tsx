import { Box, Flex, Text, Tooltip } from '@chakra-ui/react';
import { AiOutlineClockCircle } from 'react-icons/ai';
// @ts-ignore
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
dayjs.extend(localizedFormat);

interface IDueDateProps {
  startDate: Date | null;
  endDate: Date | null;
}

const DueDate = ({ startDate, endDate }: IDueDateProps) => {
  return (
    <>
      {startDate !== null && endDate !== null && (
        <Box>
          <Flex alignItems="center">
            <Box ml="1rem" mr="0.25rem" color="light.primary">
              <AiOutlineClockCircle />
            </Box>
            <Flex justify="center" flexDir="column">
              <Tooltip label="Start date">
                <Text color="light.primary" fontSize="0.7em">
                  {dayjs(startDate).format('MM/DD')}
                </Text>
              </Tooltip>
              <Tooltip label="End date">
                <Text color="light.primary" fontSize="0.7rem">
                  {dayjs(endDate).format('MM/DD')}
                </Text>
              </Tooltip>
            </Flex>
          </Flex>
        </Box>
      )}
    </>
  );
};

export default DueDate;
