import {
  Box,
  Flex,
  Popover,
  PopoverCloseButton,
  PopoverTrigger,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import CardButton from './CardButton';
import { AiOutlineClockCircle } from 'react-icons/ai';
import Calendar from 'react-calendar';
import { useEffect, useRef, useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import CalendarDate from './CalendarDate';

type ValuePiece = Date | null;
type DateValue = ValuePiece | [ValuePiece, ValuePiece];

interface IDatesProps {
  updateDates: (action: string, values: DateValue) => void;
  startDate: Date | null;
  endDate: Date | null;
}

const Dates = ({ updateDates, startDate, endDate }: IDatesProps) => {
  const [dateValue, setDateValue] = useState<DateValue>(new Date());
  const { isOpen, onOpen, onClose } = useDisclosure();
  const shouldRun = useRef(true);

  const syncDates = () => {
    if (startDate === null || endDate === null) return;
    setDateValue([startDate, endDate]);
  };

  useEffect(() => {
    if (shouldRun.current) {
      shouldRun.current = false;
      syncDates();
    }
  }, [shouldRun.current, syncDates]);

  const changeDateType = () => {
    return Array.isArray(dateValue)
      ? dateValue
      : ([dateValue, dateValue] as [ValuePiece, ValuePiece]);
  };

  const handleOnSave = () => {
    updateDates('add', changeDateType());
    onClose();
  };

  const handleOnRemove = () => {
    updateDates('remove', changeDateType());
    onClose();
  };

  return (
    <Popover isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
      <PopoverTrigger>
        <Box>
          <CardButton title="Dates" icon={<AiOutlineClockCircle />} />
        </Box>
      </PopoverTrigger>
      <PopoverContent borderColor="black.tertiary" bg="black.tertiary">
        <PopoverCloseButton />
        <PopoverHeader borderColor="black.tertiary" textAlign="center">
          Dates
        </PopoverHeader>
        <PopoverBody>
          <Calendar selectRange={true} onChange={setDateValue} value={dateValue} />
          <CalendarDate
            label="Start Date"
            dateValue={(Array.isArray(dateValue) ? dateValue[0] : dateValue) as Date}
          />
          <CalendarDate
            label="End Date"
            dateValue={(Array.isArray(dateValue) ? dateValue[1] : dateValue) as Date}
          />
          <Box my="1rem">
            <Flex flexDir="column">
              <Button
                onClick={handleOnSave}
                fontSize="0.8rem"
                colorScheme="blue"
                my="0.25rem"
              >
                Save
              </Button>
              <Button onClick={handleOnRemove} fontSize="0.8rem" my="0.25rem">
                Remove
              </Button>
            </Flex>
          </Box>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default Dates;
