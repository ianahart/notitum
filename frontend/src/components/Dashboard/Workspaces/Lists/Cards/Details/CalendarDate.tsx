import { Box, Text } from '@chakra-ui/react';

// @ts-ignore
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
dayjs.extend(localizedFormat);

interface ICalendarDateProps {
  dateValue: Date;
  label: string;
}

const CalendarDate = ({ dateValue, label }: ICalendarDateProps) => {
  return (
    <>
      <Box my="0.25rem">
        <Text fontSize="0.75rem" fontWeight="bold">
          {label}
        </Text>
        <Box width="40%" border="2px solid" borderRadius={4} borderColor="blue.500">
          <Text>{dayjs(dateValue).format('L')}</Text>
        </Box>
      </Box>
    </>
  );
};

export default CalendarDate;
