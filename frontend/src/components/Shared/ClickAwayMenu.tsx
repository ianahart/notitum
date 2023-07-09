import { Box } from '@chakra-ui/react';
import { useEffect, useRef, useCallback } from 'react';

interface IClickAwayMenuProps {
  handleMenuOpen: (open: boolean) => void;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  triggerRef?: React.RefObject<HTMLDivElement>;
  children: React.ReactNode;
  minH?: string;
  width?: string;
}

const ClickAwayMenu = ({
  handleMenuOpen,
  top = 'unset',
  left = 'unset',
  right = 'unset',
  bottom = 'unset',
  triggerRef = undefined,
  children,
  minH = '400px',
  width = '220px',
}: IClickAwayMenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null);

  const clickAway = useCallback(
    (e: MouseEvent) => {
      const target = e.target as Element;
      if (menuRef.current !== null && triggerRef !== null) {
        if (!menuRef.current.contains(target) && !triggerRef?.current?.contains(target)) {
          handleMenuOpen(false);
        }
      }
    },
    [handleMenuOpen, triggerRef]
  );

  useEffect(() => {
    window.addEventListener('click', clickAway);
    return () => window.removeEventListener('click', clickAway);
  }, []);

  return (
    <Box
      borderRadius={8}
      ref={menuRef}
      zIndex={10}
      pos="absolute"
      top={top}
      right={right}
      left={left}
      bottom={bottom}
      minH={minH}
      width={width}
      bg="bg.primary"
    >
      {children}
    </Box>
  );
};

export default ClickAwayMenu;
