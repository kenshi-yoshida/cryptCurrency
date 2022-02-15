import axios from 'axios';
import { NameQuanDataType } from '../../../../common/types';

export function dataSort(data: any) {
  let result = [];
  if (data) {
    //金額順にソート
    result = data.sort(function (firstData: NameQuanDataType, secondData: NameQuanDataType) {
      return firstData.currentPrice * firstData.quantity < secondData.currentPrice * secondData.quantity ? 1 : -1; //オブジェクトの降順ソート
    });
  }
  return result;
}
export function calcSumPrice(data: any, only: 'sum' | 'other'): number {
  //保持通貨の合計金額を算出
  let sumPrice = 0;
  let otherPrice = 0;
  for (let i = 0; i < data.length; i++) {
    sumPrice += data[i].quantity * data[i].currentPrice;
    if (i >= 5) {
      otherPrice += data[i].quantity * data[i].currentPrice;
    }
  }
  if (only === 'sum') {
    return sumPrice;
  } else if (only === 'other') {
    return otherPrice;
  }
  return sumPrice;
}

//通貨価格取得処理
export async function getCurrencyPrice(currencyName: string) {
  const url = await axios
    .post('http://www.yoshida-intro-sample.tk:4000/get/url', {
      currencyName: currencyName,
    })
    .then((res) => {
      return res.data[0].url;
    });
  return url;
}
