import { AppDispatch } from '@/modules/Checkout/store';
import { useDispatch } from 'react-redux';

const useAppDispatch = () => useDispatch<AppDispatch>();

export default useAppDispatch;
