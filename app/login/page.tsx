import LoginModule from '@/modules/Login';
import SessionProvider from '@/providers/SessionProvider';
import { getServerSession } from 'next-auth';

const LoginPage = async () => {
  return (
    <SessionProvider>
      <LoginModule />
    </SessionProvider>
  );
};
export default LoginPage;
