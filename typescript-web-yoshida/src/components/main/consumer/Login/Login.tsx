import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { Dispatch } from 'redux';
import { ButtonValue, PagingType } from '../../../common/enumType';
import {
  BorderBlock,
  DefaultButton,
  LabelText,
  List,
  MainContainer,
  OneBlock,
  TextField,
  TitleText,
  Ul,
} from '../../../parts';
import { spetialCharCheck } from '../common/utility/validate';
import { LoginAction } from './action';

//ログイン押下時の非同期処理
async function asyncLogin(email: string, password: string, navigate: NavigateFunction, dispatch: Dispatch<any>) {
  await axios
    .post(`http://www.yoshida-intro-sample.tk:4000/login`, {
      email: email,
      password: password,
    })
    .then((result) => {
      if (result.data[0] === 'error') {
        alert('メールアドレスかパスワードが間違っています。');
      } else {
        const resultData = result.data[0];
        dispatch(LoginAction(resultData));
        navigate(PagingType.TOP);
      }
    })
    .catch(() => {
      alert('メールアドレスかパスワードが間違っています。');
    });
}

export default function Login() {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const login = useSelector((state: any) => state.registration);

  //ログイン判定処理
  useEffect(() => {
    if (login.login) {
      navigation(PagingType.TOP);
    }
  }, [login.login, navigation]);

  //入力値のステート管理
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  //メールアドレス入力時の処理
  const onChengeEmail = (inpEmail: string) => {
    const valError = spetialCharCheck(inpEmail);
    if (valError) {
      setEmailError(valError);
    } else {
      setEmailError('');
    }
    setEmail(inpEmail);
  };

  //パスワード入力時の処理
  const onChengePassword = (inpPassword: string) => {
    const valError = spetialCharCheck(inpPassword);
    if (valError) {
      setPasswordError(valError);
    } else {
      setPasswordError('');
    }
    setPassword(inpPassword);
  };

  //ログイン押下時の処理
  const onLogin = () => {
    asyncLogin(email, password, navigation, dispatch);
  };

  return (
    <MainContainer>
      <TitleText value='ログイン' align='center' />
      <BorderBlock>
        <Ul width='full'>
          <List>
            <LabelText value='メールアドレス' />
            <TextField
              type='email'
              width='full'
              placeholder='xxxxx@sample.com'
              value={email}
              onChange={(inpEmail) => onChengeEmail(inpEmail)}
              errorMessage={emailError}
            />
          </List>
          <List>
            <LabelText value='パスワード' />
            <TextField
              type='password'
              width='full'
              placeholder='パスワードを入力してください'
              value={password}
              onChange={(inpPassword) => onChengePassword(inpPassword)}
              errorMessage={passwordError}
            />
          </List>
        </Ul>
        <OneBlock display='flex' justify='space-between'>
          <DefaultButton
            value={ButtonValue.NEW_REGIST}
            onClick={() => {
              navigation(PagingType.REGISTRATION);
            }}
            hover='primary'
          />
          <DefaultButton
            value={ButtonValue.LOGIN}
            onClick={() => {
              onLogin();
            }}
            hover='primary'
          />
        </OneBlock>
      </BorderBlock>
    </MainContainer>
  );
}
