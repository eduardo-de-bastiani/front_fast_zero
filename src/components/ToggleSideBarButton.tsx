import React from 'react';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

interface ToggleSidebarButtonProps {
    open: boolean;
    onToggle: () => void;
  }


const ToggleSidebarButton: React.FC<ToggleSidebarButtonProps> = ({ open, onToggle }) => {
return (
    <IconButton
    onClick={onToggle}
    sx={{
        position: 'fixed',
        left: 0,
        top: '50%',
        transform: 'translateY(-50%)',
        transition: 'transform 0.3s',
        zIndex: 1300,
    }}
    aria-label="Toggle Sidebar"
    >
    <ArrowBackIosNewIcon
        sx={{
        transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
        transition: 'transform 0.3s',
        }}
    />
    </IconButton>
);
};

export default ToggleSidebarButton;