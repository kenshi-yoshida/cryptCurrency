export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

type LoginType = {
  name: string;
  email: string;
  tell: number;
};
export function LoginAction(props: LoginType) {
  return {
    type: LOGIN,
    payload: { ...props },
  };
}
export function LogoutAction() {
  return {
    type: LOGOUT,
    payload: {
      userID: 0,
      name: '',
      email: '',
      tell: undefined,
      login: false,
    },
  };
}
