import { Box, Flex, Heading } from '@chakra-ui/react';
import { IUserContext, IWorkspaceWithCards } from '../../interfaces';
import SingleCard from '../Dashboard/Workspaces/Lists/Cards/SingleCard';
import { useContext } from 'react';
import { UserContext } from '../../context/user';
import Avatar from '../Shared/Avatar';
import { abbreviate } from '../../util';

interface IWorkspaceWithCardProps {
  workspaceWithCard: IWorkspaceWithCards;
}

const WorkspaceWithCard = ({ workspaceWithCard }: IWorkspaceWithCardProps) => {
  const { user } = useContext(UserContext) as IUserContext;
  const { title, background, cards } = workspaceWithCard;
  return (
    <Box
      minH="150px"
      my="2rem"
      borderRadius={4}
      background={background.startsWith('#') ? background : 'unset'}
      backgroundImage={!background.startsWith('#') ? background : 'unset'}
      backgroundPosition="center"
      backgroundSize="cover"
    >
      <Box p="0.25rem" bg="transparent.primary" borderTopRadius={4}>
        <Flex>
          <Heading mr="0.5rem" color="black.primary" as="h3" fontSize="1.2rem">
            {title}
          </Heading>
          <Avatar abbreviation={abbreviate(user.firstName, user.lastName)} />
        </Flex>
      </Box>
      <Flex flexWrap="wrap" direction={['column', 'column', 'row']}>
        {cards.map((card) => {
          return (
            <Box width="250px" mx="0.5rem" key={card.id}>
              <SingleCard seeDetails={false} key={card.id} card={card} />
            </Box>
          );
        })}
      </Flex>
    </Box>
  );
};

export default WorkspaceWithCard;
