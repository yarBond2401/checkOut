'use client'
import LoginForm from '@/modules/Login/components/Login';
import Logout from './components/Logout';
import { useSession } from 'next-auth/react';

const LoginModule = () => {
  const { data: session } = useSession();
  if (session) {
    return (
      <Logout email={session.user?.email} />
    );
  }
  return <LoginForm />;
};
export default LoginModule;
