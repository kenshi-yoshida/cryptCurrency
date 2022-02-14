import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { Dispatch } from 'redux';
import { LoginAction, LogoutAction } from '../../main/consumer/Login/action';
import { Link, List, TitleText, Ul } from '../../parts';
import { PagingType } from '../enumType';
//ログイン押下時の非同期処理
async function asyncLogin(dispatch: Dispatch<any>) {
  await axios.get(`http://localhost:4000/check/login`).then((result) => {
    if (!result.data) {
      const resultData = result.data[0];
      dispatch(LoginAction(resultData));
    }
  });
}

async function asyncLogout(navigate: NavigateFunction, dispatch: Dispatch<any>) {
  await axios.get('http://localhost:4000/logout').then(() => {
    dispatch(LogoutAction());
    alert('ログアウトしました');
    navigate(PagingType.ROOT);
  });
}

export function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selector = useSelector((state: any) => state.registration);
  useEffect(() => {
    asyncLogin(dispatch);
  }, [dispatch]);

  //サイト名押下時の画面遷移処理
  const titile = () => {
    if (selector.login) {
      navigate(PagingType.TOP);
    } else {
      navigate(PagingType.ROOT);
    }
  };

  //ログイン押下時の画面遷移処理
  const login = () => {
    navigate(PagingType.LOGIN);
  };

  //ログアウト押下時の画面遷移処理
  const logout = () => {
    asyncLogout(navigate, dispatch);
  };

  //ポートフォリオ詳細押下時の画面遷移処理
  const PORTFORIO_DETAIL = () => {
    navigate(PagingType.PORTFORIO_DETAIL);
  };

  //ポートフォリオ編集押下時の画面遷移処理
  const portforio = () => {
    navigate(PagingType.PORTFORIO_SETTING);
  };

  //設定押下時の画面遷移処理
  const setting = () => {
    navigate(PagingType.SETTING);
  };

  return (
    <header id='header'>
      <div className='header-container'>
        <div className='header-title'>
          <TitleText>
            <Link value='CCPM' onClick={() => titile()} />
          </TitleText>
        </div>
        <div className='header-nav'>
          {selector.login ? (
            /* ログイン時 */
            <Ul display='flex' width='full' justify='space-around' align='center'>
              <List margin={0}>
                <Link value='ポートフォリオ詳細' onClick={() => PORTFORIO_DETAIL()} />
              </List>
              <List margin={0}>
                <Link value='ポートフォリオ編集' onClick={() => portforio()} />
              </List>
              <List margin={0}>
                <Link value='設定' onClick={() => setting()} />
              </List>
              <List margin={0}>
                <Link value='ログアウト' onClick={() => logout()} />
              </List>
            </Ul>
          ) : (
            /* 未ログイン時 */
            <Ul display='flex' width='half' justify='flex-end' align='center'>
              <List margin={0}>
                <Link value='ログイン' onClick={() => login()} />
              </List>
            </Ul>
          )}
        </div>
      </div>
    </header>
  );
}
