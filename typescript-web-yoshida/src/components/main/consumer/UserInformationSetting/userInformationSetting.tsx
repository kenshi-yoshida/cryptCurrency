import { ButtonValue, PagingType } from '../../../common/enumType';
import { MainContainer, TitleText } from '../../../parts';
import { UserRegistForm } from '../common/usreRegistForm';
import { setUserID } from '../Registration/action';
import axios from 'axios';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, useEffect } from 'react';

//ユーザー情報変更内容保存の処理
async function saveUser(
  name: string,
  email: string,
  tell: number,
  password: string,
  userID: number,
  navigate: NavigateFunction,
  dispatch: Dispatch<any>
) {
  await axios
    .post(`http://www.yoshida-intro-sample.tk:4000/userinfo/edit`, {
      name: name,
      email: email,
      tell: tell,
      password: password,
      userID: userID,
    })
    .then(() => {
      //TOOD userIDはsessionでやりたかった
      dispatch(setUserID(userID, name, email, tell)); //終わったらログイン情報変更
      alert('会員情報を変更しました。');
      navigate(PagingType.TOP);
    })
    .catch(() => {
      alert('エラー');
    });
}

export default function UserInformationSetting() {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const login = useSelector((state: any) => state.registration);

  //ログイン判定処理
  useEffect(() => {
    if (!login.login) {
      navigation(PagingType.LOGIN);
    }
  }, [login.login, navigation]);

  //登録ボタン押下時の処理
  const onRegist = (
    name: string,
    email: string,
    tell: number,
    password: string,
    userID: number,
    navigate: NavigateFunction,
    dispatch: Dispatch<any>
  ) => {
    saveUser(name, email, tell, password, userID, navigate, dispatch);
  };

  return (
    <MainContainer>
      <TitleText value='会員情報変更' align='center' />
      <UserRegistForm
        value={ButtonValue.CHANGE}
        onClick={({ name, email, tell, password, userID }) =>
          onRegist(name, email, tell, password, userID, navigation, dispatch)
        }
      />
    </MainContainer>
  );
}
