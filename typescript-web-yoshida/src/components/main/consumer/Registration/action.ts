export const SET_USER_INFO = 'SET_USER_INFO';

export function setUserID(userID: number, name: string, email: string, tell: number) {
  return {
    type: SET_USER_INFO,
    payload: { userID: userID, name: name, email: email, tell: tell },
  };
}
