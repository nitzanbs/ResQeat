import React from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import "./Footer.css"
function Footer() {
  return (
    <div className='footer' style={{  borderTop: '1px solid #ccc' }}>
      <Typography sx={{ py: 3 }} variant="subtitle1" align="center" color="text.secondary" component="p">
        All Rights Reserved

      <Typography variant="body2" color="text.secondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="http://localhost:5174/home">
          ResQeat
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>      </Typography>
    </div>
  );
}

export default Footer;
