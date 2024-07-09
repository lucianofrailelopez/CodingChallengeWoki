import { useDispatch } from 'react-redux';
import { loginSuccess, logout, accessToken, handleLogin } from '@/redux/auth/authSlice';

export const useAuthActions = () => {
  const dispatch = useDispatch();

  const loginSuccessAction = (user: any) => {
    const { username } = user;
    dispatch(loginSuccess(username));
  };

  const logoutAction = () => {
    dispatch(logout());
  };

  const accessTokenAction = (token: any) => {
    const { id } = token;
    dispatch(accessToken(id));
  };

  // const loginBro = () => {
  //   dispatch(handleLogin());
  // };

  return {
    loginSuccessAction,
    logoutAction,
    accessTokenAction,
    // loginBro
  };
};
