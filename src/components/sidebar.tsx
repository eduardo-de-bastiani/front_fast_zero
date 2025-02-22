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
import { TaskFilters } from "../types/task";

interface SideBarProps {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  onApplyFilters: (filters: TaskFilters) => void;
  onResetFilters: () => void;
}

const SideBar: React.FC<SideBarProps> = ({ open, onOpen, onClose, onApplyFilters, onResetFilters }) => {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [stateFilter, setStateFilter] = React.useState("");
  const [limit, setLimit] = React.useState("");
  const [offset, setOffset] = React.useState("");

  const filtersApplied =
    title !== "" ||
    description !== "" ||
    stateFilter !== "" ||
    limit !== "" ||
    offset !== "";

    const handleApplyFilters = async () => {
      const filters: TaskFilters = {
        title,
        description,
        state: stateFilter,
        ...(offset && { offset: Number(offset) }),
        ...(limit && { limit: Number(limit) }),
      };
      onApplyFilters(filters); // passa para o AppLayout
      onClose();
    };

    const handleResetFilters = async () => {
      setTitle("");
      setDescription("");
      setStateFilter("");
      setLimit("");
      setOffset("");
      onResetFilters();
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

      <Box
        component="form"
        noValidate
        sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}
      >
        {/* Filtro por Título */}
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* Filtro por Descrição */}
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* Filtro por Estado */}
        <FormControl fullWidth>
          <InputLabel id="state-filter-label" shrink={true}>
            State
          </InputLabel>
          <Select
            labelId="state-filter-label"
            label="State"
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
            <MenuItem value="draft">Draft</MenuItem>
            <MenuItem value="todo">To Do</MenuItem>
            <MenuItem value="doing">Doing</MenuItem>
            <MenuItem value="done">Done</MenuItem>
          </Select>
        </FormControl>

        {/* Filtro por Limit */}
        <TextField
          label="Limit"
          variant="outlined"
          fullWidth
          type="number"
          value={limit}
          onChange={(e) => setLimit(e.target.value)}
        />

        {/* Filtro por Offset */}
        <TextField
          label="Offset"
          variant="outlined"
          fullWidth
          type="number"
          value={offset}
          onChange={(e) => setOffset(e.target.value)}
        />

        {/* Botões de Reset e Apply */}
        <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
          <Button
            variant="outlined"
            fullWidth
            onClick={handleResetFilters}
            disabled={!filtersApplied}
          >
            Reset Filters
          </Button>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleApplyFilters}
          >
            Apply Filters
          </Button>
        </Box>
      </Box>
    </Drawer>
    </>
  );
};

export default SideBar;
