import { Box, Flex, Text, Menu, MenuButton, MenuList, MenuItem, Button } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';

interface NavbarProps {
  username: string;
}

function Navbar({ username }: NavbarProps) {
  return (
    <div>
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          {username}
        </MenuButton>
        <MenuList>
          <MenuItem>Editar Perfil</MenuItem>
          <MenuItem>Encerrar Sessão</MenuItem>
          <MenuItem>Deletar Usuário</MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
}

export default Navbar;
