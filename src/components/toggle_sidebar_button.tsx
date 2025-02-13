import React from 'react';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import theme from '../theme';

interface ToggleSidebarButtonProps {
  open: boolean;
  onToggle: () => void;
  sidebarWidth: number;
}


const ToggleSidebarButton: React.FC<ToggleSidebarButtonProps> = ({ open, onToggle, sidebarWidth }) => {
  return (
    <IconButton
      onClick={onToggle}
      sx={{
        position: 'fixed',
        top: '50%',
        left: open ? `${sidebarWidth}px` : '0px',
        transform: 'translateY(-50%)',
        transition: 'left 0.25s, transform 0.3s',
        zIndex: 1300,
      }}
      aria-label="Toggle Sidebar"
      disableRipple
    >
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minWidth: '3.8rem',  // Aproximadamente 80px, mas em rem
          minHeight: '3.8rem',
          '&:hover .glow-effect': {
            opacity: 1,
          },
        }}
      >
        <Box
          className="glow-effect"
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '120%',
            height: '120%',
            borderRadius: '50%',
            background: `radial-gradient(circle at center, ${theme.palette.primary.main} 0%, transparent 70%)`,
            pointerEvents: 'none',
            opacity: 0,
            transition: 'opacity 0.6s',
          }}
        />
      <ArrowBackIosNewIcon
        sx={{
          transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.55s',
            position: 'relative',
            zIndex: 1,
            color: '#FFF',
            fontSize: '2rem'
          }}
      />
      </Box>
    </IconButton>
  );
};

export default ToggleSidebarButton;