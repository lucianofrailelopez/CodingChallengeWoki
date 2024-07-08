import { useDispatch } from 'react-redux';
import { loginSuccess, logout, accessToken } from '@/redux/auth/authSlice';

export const useAuthActions = () => {
  const dispatch = useDispatch();

  const loginSuccessAction = (user: any) => {
    const { username } = user;
    dispatch(loginSuccess(username));
  };

  const logoutAction = () => {
    dispatch(logout());
  };

  const accessTokenAction = (token: string) => {
    dispatch(accessToken(token));
  };

  return {
    loginSuccessAction,
    logoutAction,
    accessTokenAction
  };
};
