import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { GitHub, LinkedIn, Instagram, Login, PersonAdd } from '@mui/icons-material';
import classes from './styles.module.css';
import theme from '../../theme';

const Home = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const collaborators = ['dunossauro', 'BrunoPanizzi'];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
  }, []);

  return (
    <div className={classes.container}>
      <canvas ref={canvasRef} className={classes.backgroundCanvas} />
      
      <header className={classes.header}>
        <h1 className={classes.title}>List It</h1>
        <div className={classes.authButtons}>
          <Link to="/login" className={classes.button}>
            <Login fontSize="small" />
            <span>Login</span>
          </Link>
          <Link to="/create_account" className={classes.button}>
            <PersonAdd fontSize="small" />
            <span>Create Account</span>
          </Link>
        </div>
      </header>

      <main className={classes.mainContent}>
        <div className={classes.hero}>
          <div className={classes.glowEffect}/>
          <h2 className={classes.subtitle}>
            <span className={classes.textGradient}>Organize Your Universe</span>
            <div className={classes.floatingOrbs}>
              <div className={classes.orb1} />
              <div className={classes.orb2} />
            </div>
          </h2>
        </div>

        <div className={classes.infoSection}>
          <div className={classes.creatorCard}>
            <h3 className={classes.creatorTitle}>Developed by <span className={classes.creatorName}>Eduardo De Bastiani </span></h3>
            <div className={classes.socialLinks}>
              <a href="https://github.com/eduardo-de-bastiani" target="_blank" rel="noopener noreferrer">
                <GitHub className={classes.icon} />
              </a>
              <a href="https://www.linkedin.com/in/eduardo-colla-de-bastiani-589b0a200/" target="_blank" rel="noopener noreferrer">
                <LinkedIn className={classes.icon} />
              </a>
              <a href="https://www.instagram.com/eduardo_bastiani/" target="_blank" rel="noopener noreferrer">
                <Instagram className={classes.icon} />
              </a>
            </div>
          </div>

          <div className={classes.collaborators}>
            <h4>Collaborators</h4>
            <div className={classes.collabList}>
              {collaborators.map((collab, index) => (
                <a
                  key={index}
                  href={`https://github.com/${collab}`}
                  className={classes.collabLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {collab}
                </a>
              ))}
            </div>
          </div>
        </div>
      </main>

      <div className={classes.gridLines}>
        {[...Array(20)].map((_, i) => <div key={i} className={classes.gridLine} />)}
      </div>
    </div>
  );
};

export default Home;