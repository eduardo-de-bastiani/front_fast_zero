import React from 'react';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

interface ToggleSidebarButtonProps {
    open: boolean;
    onToggle: () => void;
    sidebarWidth: number;
  }


const ToggleSidebarButton: React.FC<ToggleSidebarButtonProps> = ({ open, onToggle, sidebarWidth}) => {
return (
    <IconButton
    onClick={onToggle}
    sx={{
        position: 'fixed',
        top: '50%',
        left: open ? `${sidebarWidth}px` : '0px',
        transform: 'translateY(-50%)',
        transition: 'left 0.25s, transform 0.3s, box-shadow 0.3s',
        zIndex: 1300,
        '&:hover': {
          boxShadow: '0 0 8px 2px rgba(126,87,194,0.8)', // brilho roxo
        },
    }}
    aria-label="Toggle Sidebar"
    >
    <ArrowBackIosNewIcon
        sx={{
        transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
        transition: 'transform 0.25s',
        }}
    />
    </IconButton>
);
};

export default ToggleSidebarButton;