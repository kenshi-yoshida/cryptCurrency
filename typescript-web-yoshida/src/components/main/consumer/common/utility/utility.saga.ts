//複数画面で使う場合ここに書く
import { put, select } from '@redux-saga/core/effects';
import axios from 'axios';
import { ResultDataType } from '../../../../common/types';
import { portforioDtailStore } from '../../PortforioDetail/action';

export function* portforioDetailInit() {
  yield holdDetailCurrencyIint();
}

type DataType = {
  currencyName: string;
  url: string;
  quantity: number;
  currentPrice: number;
  currencyID: number;
};

type StateType = {
  userID: number;
  name: string;
  email: string;
  tell: number;
  login: boolean;
};

//ステートを取得するための関数
export const getRegistrationState = (state: any) => state.registration;

//DBからユーザーに合致する保持通貨情報を取得する
function* holdDetailCurrencyIint() {
  const state: StateType = yield select(getRegistrationState);

  //保持通貨情報を取得
  const datas: [] = yield axios
    .post(`http://www.yoshida-intro-sample.tk:4000/portforioSettingInit`, {
      userID: state.userID,
    })
    .then((res) => {
      const info = res.data;
      return info;
    });

  //取得したデータに取得した価格を追加する
  const finalDatas: ResultDataType[] = yield Promise.all(
    datas.map(async (data: DataType) => {
      const result = await getCurrencyAPI(data.url);
      return {
        currencyName: data.currencyName,
        quantity: data.quantity,
        currentPrice: result,
        currencyID: data.currencyID,
      };
    })
  );

  //ストアに保存する
  yield put(portforioDtailStore(finalDatas));
}

export async function getCurrencyAPI(url: string) {
  console.log('１．DOS攻撃になっていないか確認用');
  const result = await axios.get(url).then((result) => {
    return result.data.data.last;
  });
  return result;
}
