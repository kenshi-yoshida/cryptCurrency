//トップページの親コンポーネント
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PagingType } from '../../../common/enumType';
import { MainContainer, TitleText } from '../../../parts';
import { PortforioRankGraf } from '../common';
import { portforioDetailInit } from '../PortforioDetail/action';

export default function TopPage() {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const login = useSelector((state: any) => state.registration);

  //ログイン判定処理
  useEffect(() => {
    if (!login.login) {
      navigation(PagingType.LOGIN);
    }
  }, [login.login, navigation]);

  //画面初期表示時の処理
  useEffect(() => {
    dispatch(portforioDetailInit());
  }, [dispatch]);

  return (
    <MainContainer>
      <TitleText value='トップページ' align='center' />
      <PortforioRankGraf other={true} noneButton={false} />
    </MainContainer>
  );
}
