import React from "react";
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
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface SideBarProps {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const SideBar: React.FC<SideBarProps> = ({ open, onOpen, onClose }) => {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [stateFilter, setStateFilter] = React.useState("");

  const handleApplyFilters = () => {
    // Lógica para aplicar os filtros
    // ...

    // Fechar a sidebar
    onClose();
  };

  return (
    <>
      <Drawer
        anchor="left"
        open={open}
        onClose={onClose}
        sx={{
          "& .MuiDrawer-paper": {
            width: 300,
            padding: 2,
            backgroundColor: "background.paper",
          },
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Custom Filters</Typography>
          <IconButton onClick={onClose} aria-label="Close Filters">
            <CloseIcon />
          </IconButton>
        </Box>

        <Box component="form" noValidate sx={{ mt: 2 }}>
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
            <InputLabel id="state-filter-label" shrink={true}>
              Estado
            </InputLabel>
            <Select
              labelId="state-filter-label"
              label="Estado"
              value={stateFilter}
              onChange={(e) => setStateFilter(e.target.value)}
              displayEmpty
              renderValue={(selected) => {
                if (selected === "") {
                  return <span style={{ opacity: 0.5 }}>Any</span>;
                }
                return selected;
              }}
            >
              <MenuItem value="">
                <em>Any</em>
              </MenuItem>
              <MenuItem value="Draft">Draft</MenuItem>
              <MenuItem value="To Do">To Do</MenuItem>
              <MenuItem value="Doing">Doing</MenuItem>
              <MenuItem value="Done">Done</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleApplyFilters}
          >
            Apply Filters
          </Button>
        </Box>
      </Drawer>
    </>
  );
};

export default SideBar;
