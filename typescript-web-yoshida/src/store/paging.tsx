import Login from '../components/main/consumer/Login/Login';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import TopPage from '../components/main/consumer/TopPage/TopPage';
import Registration from '../components/main/consumer/Registration/registration';
import UserInfomationSetting from '../components/main/consumer/UserInformationSetting/userInformationSetting';
import { Header } from '../components/common/header/header';
import Setting from '../components/main/consumer/Setting/setting';
import LandingPage from '../components/main/consumer/LangingPage/landingPage';
import { PagingType } from '../components/common/enumType';
import PortforioSetting from '../components/main/consumer/PortforioSetting/portforioSetting';
import PortforioDetail from '../components/main/consumer/PortforioDetail/portforioDetail';

export default function Paging() {
  return (
    <Router>
      {/* 共通表示 */}
      <Header />
      <Routes>
        {/* 未ログイン時 */}
        <Route path={PagingType.ROOT} element={<LandingPage />} />
        <Route path={PagingType.LOGIN} element={<Login />} />

        {/* ログイン時 */}
        <Route path={PagingType.TOP} element={<TopPage />} />
        <Route path={PagingType.REGISTRATION} element={<Registration />} />
        <Route path={PagingType.USER_SETTING} element={<UserInfomationSetting />} />
        <Route path={PagingType.PORTFORIO_SETTING} element={<PortforioSetting />} />
        <Route path={PagingType.PORTFORIO_DETAIL} element={<PortforioDetail />} />
        <Route path={PagingType.SETTING} element={<Setting />} />
      </Routes>
      <Header />
    </Router>
  );
}
