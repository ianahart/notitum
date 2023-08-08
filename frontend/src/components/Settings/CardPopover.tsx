import {
  Box,
  Popover,
  PopoverBody,
  PopoverTrigger,
  PopoverCloseButton,
  PopoverHeader,
  PopoverContent,
} from '@chakra-ui/react';

import CardButton from '../Dashboard/Workspaces/Lists/Cards/Details/CardButton';

interface ICardPopoverProps {
  icon: JSX.Element;
  children: JSX.Element;
  header: string;
}

const CardPopover = ({ icon, children, header }: ICardPopoverProps) => {
  return (
    <Popover>
      <PopoverTrigger>
        <Box>
          <CardButton theme="light" title={header} icon={icon} />
        </Box>
      </PopoverTrigger>
      <PopoverContent
        borderColor="light.primary"
        bg="light.primary"
        boxShadow="rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
      >
        <PopoverCloseButton />
        <PopoverHeader borderColor="light.primary" textAlign="center">
          {header}
        </PopoverHeader>
        <PopoverBody>{children}</PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default CardPopover;
