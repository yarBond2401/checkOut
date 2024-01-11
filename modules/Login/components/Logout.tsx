import { Box, Typography } from '@mui/material';
import { getServerSession } from 'next-auth';
import React, { useState, useEffect } from 'react';

interface LogoutProps {}

const Logout: React.FC<LogoutProps> = ({}) => {
  const [email, setEmail] = useState<string | null | undefined>('');

  useEffect(() => {
    const asyncFunc = async () => {
      const session = await getServerSession();

      setEmail(session?.user?.email);
    };
    asyncFunc();
  }, []);

  return (
    <Box sx={{ maxWidth: '500px', margin: '0 auto', pt: 10 }}>
      <Typography gutterBottom variant="h3">
        You are logged in with the email:
      </Typography>
      <Typography color={'blue'} gutterBottom variant="h2">
        {email}
      </Typography>
    </Box>
  );
};
export default Logout;
