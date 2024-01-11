import { Box, Button, Typography } from '@mui/material';
import { getServerSession } from 'next-auth';
import { signOut } from 'next-auth/react';
import React, { useState, useEffect } from 'react';

interface LogoutProps {
  email: string | null | undefined
}

const Logout: React.FC<LogoutProps> = ({email}) => {


  return (
    <Box sx={{ maxWidth: '500px', margin: '0 auto', pt: 10 }}>
      <Typography gutterBottom variant="h5">
        You are logged in with the email:
      </Typography>
      <Typography sx={{ mt: 3 }} color={'blue'} fontWeight={700} gutterBottom variant="h6">
        {email}
      </Typography>
      <Button sx={{ mt: 5 }} fullWidth variant="contained" onClick={() => signOut()}>
        Log Out
      </Button>
    </Box>
  );
};
export default Logout;
