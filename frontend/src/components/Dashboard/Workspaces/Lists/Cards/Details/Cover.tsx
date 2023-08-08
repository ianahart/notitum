import { BsImage } from 'react-icons/bs';
import {
  Box,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverCloseButton,
  PopoverHeader,
  PopoverTrigger,
  useDisclosure,
} from '@chakra-ui/react';
import CardButton from './CardButton';
import Photos from './Photos';
import { useContext, useState } from 'react';
import { WorkspaceContext } from '../../../../../../context/workspace';
import { ICard, IWorkspaceContext } from '../../../../../../interfaces';
import { Client } from '../../../../../../util/client';

interface ICoverProps {
  card: ICard;
  workspaceListId: number;
}

const Cover = ({ card, workspaceListId }: ICoverProps) => {
  const { workspace, setLists, lists } = useContext(
    WorkspaceContext
  ) as IWorkspaceContext;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [photosOpen, setPhotosOpen] = useState(false);

  const handlePhotosOpen = (open: boolean) => {
    setPhotosOpen(open);
  };

  const handleOnClose = () => {
    handlePhotosOpen(false);
    onClose();
  };

  const updateCardCoverPhoto = (coverPhoto: string | null) => {
    updatedCardCoverPhoto(card.id, coverPhoto, workspaceListId);
    Client.updateCardCoverPhoto(card.id, coverPhoto, workspace.userId)
      .then(() => {})
      .catch((err) => {
        throw new Error(err.response.data.message);
      });
  };

  const updatedCardCoverPhoto = (
    cardId: number,
    coverPhoto: string | null,
    workspaceListId: number
  ) => {
    const copyLists = [...lists];
    const workspaceListIndex = copyLists.findIndex((l) => l.id === workspaceListId);
    const newCards = copyLists[workspaceListIndex].cards.map((card) => {
      if (card.id === cardId) {
        card.coverPhoto = coverPhoto;
      }
      return card;
    });
    copyLists[workspaceListIndex].cards = [...newCards];
    setLists(copyLists);
  };

  return (
    <Popover isOpen={isOpen} onClose={onClose} onOpen={onOpen}>
      <PopoverTrigger>
        <Box onClick={() => handlePhotosOpen(true)}>
          <CardButton title="Cover" icon={<BsImage />} />
        </Box>
      </PopoverTrigger>
      <PopoverContent borderColor="black.tertiary" bg="black.tertiary">
        <PopoverCloseButton onClick={handleOnClose} />
        <PopoverHeader borderColor="black.tertiary" textAlign="center">
          Cover Photo
        </PopoverHeader>
        <PopoverBody>
          {photosOpen && (
            <Photos
              coverPhoto={card.coverPhoto}
              updateCardCoverPhoto={updateCardCoverPhoto}
            />
          )}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default Cover;
