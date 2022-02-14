//新規登録画面の表示
import axios from 'axios';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { ButtonValue, PagingType } from '../../../common/enumType';
import { MainContainer, TitleText } from '../../../parts';
import { UserRegistForm } from '../common/usreRegistForm';

//新規ユーザーをDB保存する処理
async function saveUser(name: string, email: string, tell: number, password: string, navigate: NavigateFunction) {
  await axios
    .post(`http://localhost:4000/userinfo/add/user`, {
      name: name,
      email: email,
      tell: tell,
      password: password,
    })
    .then(() => {
      alert('会員登録が完了しました。\nログインしてください。');
      navigate(PagingType.LOGIN);
    })
    .catch(() => {
      alert('エラー');
    });
}

export default function Registration() {
  const navigation = useNavigate();
  const login = useSelector((state: any) => state.registration);

  //ログイン判定処理
  useEffect(() => {
    if (login.login) {
      navigation(PagingType.TOP);
    }
  }, [login.login, navigation]);

  //登録押下時の処理
  const onRegist = (name: string, email: string, tell: number, password: string, navigate: NavigateFunction) => {
    saveUser(name, email, tell, password, navigate);
  };

  return (
    <MainContainer>
      <TitleText value='新規登録' align='center' />
      <UserRegistForm
        value={ButtonValue.REGIST}
        onClick={({ name, email, tell, password }) => onRegist(name, email, tell, password, navigation)}
      />
    </MainContainer>
  );
}
