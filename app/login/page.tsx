import LoginModule from '@/modules/Login';
import { getServerSession } from 'next-auth';

const LoginPage = async () => {
  const session = await getServerSession();

  return <LoginModule/>;
};
export default LoginPage;
