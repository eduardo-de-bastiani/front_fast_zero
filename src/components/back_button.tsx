import React from 'react';
import { ArrowBackIosNew } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import classes from './BackButton.module.css';

const BackButton: React.FC = () => {
  return (
    <Link to="/login" className={classes.backButton}>
      <ArrowBackIosNew />
      Voltar
    </Link>
  );
};

export default BackButton;