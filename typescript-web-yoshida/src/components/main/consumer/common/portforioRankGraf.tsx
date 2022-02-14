//保有率の表とグラフを表示するコンポーネント
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CryptRanking } from '.';
import { ButtonValue, PagingType } from '../../../common/enumType';
import { DefaultButton, OneBlock, ParagrafText } from '../../../parts';
import { calcSumPrice, dataSort } from './utility/utilFunction';
import { PieGraf } from '../../../parts/parts/pieGraf';
import { ResultDataType } from '../../../common/types';

type PropsType = {
  other: boolean;
  noneButton: boolean;
};
export function PortforioRankGraf(props: PropsType) {
  const navigation = useNavigate();
  const selector: any = useSelector((state: any) => state.holdDetailCurrency);
  const holdData = selector.holdCurrency;

  //ソートと資産合計算出処理
  let result: ResultDataType[] = [];
  let otherPrice = 0;
  if (holdData) {
    result = dataSort(holdData); //結果をソートして格納
    otherPrice = calcSumPrice(holdData, 'other');
  }

  //所持通貨の名前を配列に格納
  const currencyNames: (string | undefined)[] = result
    .map((resultInfo: ResultDataType, index: number) => {
      if (index > 4) {
        return undefined;
      }
      return resultInfo.currencyName;
    })
    .filter((currencyName) => typeof currencyName !== 'undefined');

  //所持通貨の金額を配列に格納
  const holdPrices: (number | undefined)[] = result
    .map((resultInfo: ResultDataType, index: number) => {
      if (index > 4) {
        return undefined;
      }
      return resultInfo.currentPrice * resultInfo.quantity;
    })
    .filter((holdPrice) => typeof holdPrice !== 'undefined');

  //所持通貨が5個以上の場合その他を格納
  if (result.length > 5) {
    currencyNames.push('その他');
    holdPrices.push(otherPrice);
  }

  //画面遷移処理
  const onclick = () => {
    navigation(PagingType.PORTFORIO_DETAIL);
  };

  return (
    <OneBlock display='flex'>
      <OneBlock textAlign='center'>
        <ParagrafText value='現在のポートフォリオ' />
        <OneBlock display='flex' justify='center'>
          <PieGraf labels={currencyNames} title='ww' data={holdPrices} width={310} height={300} />
        </OneBlock>
      </OneBlock>
      <OneBlock>
        <OneBlock>
          <ParagrafText value='保有率上位5位' />
        </OneBlock>
        <CryptRanking other={props.other} />
        <OneBlock display='flex' justify='center'>
          {props.noneButton ? (
            false
          ) : (
            <DefaultButton value={ButtonValue.DETAIL} onClick={onclick} width='full' hover='primary' />
          )}
        </OneBlock>
      </OneBlock>
    </OneBlock>
  );
}
