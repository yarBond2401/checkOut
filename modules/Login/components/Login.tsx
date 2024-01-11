'use client';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ILogin } from '../models/ILogin';
import { TextField, Typography, Button, Box } from '@mui/material';
import { EMAIL_REG_EXP } from '@/constants/emailRegularExp';
import { signIn } from 'next-auth/react';

const LoginForm: React.FC = () => {
  const [error, serError] = useState<any>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>({});

  const onSubmit: SubmitHandler<ILogin> = (userCredentials) => {
    debugger;
    try {
      signIn('credentials', {
        email: userCredentials.email,
        password: userCredentials.password,
        redirect: true,
        callbackUrl: '/admin-pannel',
      });
    } catch (error) {
      serError(error);
    }
  };

  const fieldIsRequired = 'Field is required';
  return (
    <Box component="form" sx={{ maxWidth: '500px', margin: '0 auto', pt: 10 }} onSubmit={handleSubmit(onSubmit)}>
      <TextField
        {...register('email', {
          required: fieldIsRequired,
          pattern: {
            value: EMAIL_REG_EXP,
            message: 'Please, enter valid email',
          },
        })}
        error={!!errors.email}
        helperText={errors.email?.message}
        sx={{ marginBottom: '20px' }}
        fullWidth
        label="Email"
        variant="outlined"
      />
      <TextField
        sx={{ marginBottom: '20px' }}
        fullWidth
        label="Password"
        variant="outlined"
        {...register('password', { required: fieldIsRequired })}
        type="password"
        error={!!errors.password}
        helperText={errors.password?.message}
      />
      {error && (
        <Typography color="red" variant="h6" paragraph gutterBottom>
          {error}
        </Typography>
      )}
      <Button sx={{ marginBottom: '20px' }} variant="contained" type="submit" fullWidth color="primary">
        Sign In
      </Button>
    </Box>
  );
};

export default LoginForm;