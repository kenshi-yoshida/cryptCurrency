import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { Dispatch } from 'redux';
import { PagingType } from '../../../common/enumType';
import { BorderBlock, DefaultButton, MainContainer, Mordal, OneBlock, TitleText } from '../../../parts';
import { BoolMordal } from '../common/boolMordal';
import { LogoutAction } from '../Login/action';

async function acyncDeleteUser(userID: number, dispatch: Dispatch<any>, navigation: NavigateFunction) {
  await axios
    .post('http://localhost:4000/userinfo/delete', { userID: userID })
    .then(() => {
      alert('退会が完了しました。');
      dispatch(LogoutAction());
      navigation(PagingType.ROOT);
    })
    .catch(() => {
      alert('エラーが発生しました。');
    });
}

export default function Setting() {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const [mordal, setMordal] = useState(false);
  const login = useSelector((state: any) => state.registration);

  //ログイン判定処理
  useEffect(() => {
    if (!login.login) {
      navigation(PagingType.LOGIN);
    }
  }, [login.login, navigation]);

  //削除モーダル表示判定処理
  const onDeleteButton = () => {
    setMordal(!mordal);
  };

  //削除モーダルはいボタン押下時の処理
  const onDeleteUser = () => {
    acyncDeleteUser(login.userID, dispatch, navigation);
  };

  return (
    <MainContainer>
      <TitleText value='各種設定' align='center' />
      <OneBlock display='flex' justify='space-around'>
        <DefaultButton width={150} value={'退会する'} hover='danger' onClick={() => onDeleteButton()} />
        <DefaultButton
          width={150}
          value={'会員情報変更'}
          hover='primary'
          onClick={() => {
            navigation(PagingType.USER_SETTING);
          }}
        />
      </OneBlock>
      <Mordal display={mordal}>
        <BorderBlock>
          <BoolMordal
            value='退会しますか？'
            noHover='primary'
            yesHover='danger'
            onNoClick={() => {
              onDeleteButton();
            }}
            onYesClick={() => onDeleteUser()}
          />
        </BorderBlock>
      </Mordal>
    </MainContainer>
  );
}
