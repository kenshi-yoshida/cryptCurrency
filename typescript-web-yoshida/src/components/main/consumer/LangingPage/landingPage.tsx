import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PagingType } from '../../../common/enumType';
import { TitleText } from '../../../parts';

export default function LandingPage() {
  const navigation = useNavigate();
  const login = useSelector((state: any) => state.registration);

  //ログイン判定処理
  useEffect(() => {
    if (login.login) {
      navigation(PagingType.TOP);
    }
  }, [login.login, navigation]);

  return <TitleText align='center' value='ランディングページです' />;
}
