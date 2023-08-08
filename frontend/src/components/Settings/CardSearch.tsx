import { Flex, Text, Box } from '@chakra-ui/react';
import { AiOutlineCheck } from 'react-icons/ai';
import { ICardFilter, ICardSort } from '../../interfaces';

interface ICardSearchDataProps {
  data: ICardSort[] | ICardFilter[];
  action: string;
  handleOnClick: (action: string, id: number) => void;
  handleSetActiveWorkspaceId?: (id: number) => void;
  activeWorkspaceId?: number;
}

const CardSearch = ({
  data,
  action,
  handleOnClick,
  handleSetActiveWorkspaceId,
  activeWorkspaceId = 0,
}: ICardSearchDataProps) => {
  return (
    <>
      {data.map((sort) => {
        return (
          <Box key={sort.id}>
            <Flex
              onClick={() => handleOnClick(action, sort.id)}
              _hover={{ bg: 'transparent.primary' }}
              borderRadius={4}
              cursor="pointer"
              p="0.25rem"
              my="1rem"
              alignItems="center"
              justifyContent="space-between"
            >
              <Text color="black.primary" fontSize="0.85rem">
                {sort.label}
              </Text>
              {sort.checked && (
                <Box color="black.primary">
                  <AiOutlineCheck />
                </Box>
              )}
            </Flex>
            {sort.value === 'workspace' && sort.checked && sort.workspaces.length > 0 && (
              <Box ml="2rem">
                {sort.workspaces.map((workspace) => {
                  return (
                    <Flex
                      key={workspace.workspaceId}
                      onClick={() =>
                        handleSetActiveWorkspaceId !== undefined &&
                        handleSetActiveWorkspaceId(workspace.workspaceId)
                      }
                      _hover={{ bg: 'transparent.primary' }}
                      borderRadius={4}
                      cursor="pointer"
                      p="0.25rem"
                      my="1rem"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Text color="black.primary" fontSize="0.85rem">
                        {workspace.title}
                      </Text>
                      {workspace.workspaceId === activeWorkspaceId && (
                        <Box color="black.primary">
                          <AiOutlineCheck />
                        </Box>
                      )}
                    </Flex>
                  );
                })}
              </Box>
            )}
          </Box>
        );
      })}
    </>
  );
};

export default CardSearch;
