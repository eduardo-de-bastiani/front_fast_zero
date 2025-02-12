import React from 'react';
import {
  Box,
  Drawer,
  IconButton,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

interface SideBarProps {
    open: boolean;
    onOpen: () => void;
    onClose: () => void;
  }

const SideBar: React.FC<SideBarProps> = ({ open, onOpen, onClose }) => {

const [search, setSearch] = React.useState('');
const [title, setTitle] = React.useState('');
const [description, setDescription] = React.useState('');
const [stateFilter, setStateFilter] = React.useState('');

return (
    <>
      {/* Botão para abrir a sidebar, exibido somente se estiver fechada */}
      {!open && (
        <IconButton
          onClick={onOpen}
          sx={{ position: 'fixed', top: 16, left: 16, zIndex: 1201 }}
          aria-label="Abrir filtros"
        >
          <MenuIcon />
        </IconButton>
      )}

      <Drawer
        anchor="left"
        open={open}
        onClose={onClose}
        sx={{
          '& .MuiDrawer-paper': {
            width: 300,
            padding: 2,
            backgroundColor: 'background.paper',
          },
        }}
      >
        <Box display="flex" justifyContent="flex-end">
          <IconButton onClick={onClose} aria-label="Close Filters">
            <CloseIcon />
          </IconButton>
        </Box>

        <Box component="form" noValidate sx={{ mt: 2 }}>
          {/* Campo de Busca */}
          <TextField
            label="Search Tasks"
            variant="outlined"
            fullWidth
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ mb: 2 }}
          />

          {/* Filtro por Título */}
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{ mb: 2 }}
          />

          {/* Filtro por Descrição */}
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            sx={{ mb: 2 }}
          />

          {/* Filtro por Estado */}
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="state-filter-label">Estado</InputLabel>
            <Select
              labelId="state-filter-label"
              label="State"
              value={stateFilter}
              onChange={(e) => setStateFilter(e.target.value)}
            >
              <MenuItem value="draft">Draft</MenuItem>
              <MenuItem value="todo">To Do</MenuItem>
              <MenuItem value="doing">Doing</MenuItem>
              <MenuItem value="done">Done</MenuItem>
            </Select>
          </FormControl>

          <Button variant="contained" color="primary" fullWidth>
            Apply Filters
          </Button>
        </Box>
      </Drawer>
    </>
  );
};

export default SideBar;