//保有率の表を表示するコンポーネント
import { useSelector } from 'react-redux';
import { NameQuanDataType } from '../../../common/types';
import {
  ErrorMessage,
  NormalTableBody,
  NormalTableHead,
  NormalTableTd,
  NormalTableTh,
  NormalTableTr,
  OneBlock,
  Table,
} from '../../../parts';
import { calcSumPrice, dataSort } from './utility/utilFunction';

type PropsType = {
  other: boolean;
};
export function CryptRanking(props: PropsType) {
  const selector: any = useSelector((state: any) => state.holdDetailCurrency);
  const holdData = selector.holdCurrency;

  //ソートと資産合計算出処理
  let result = [];
  let sumPrice = 0;
  let otherPrice = 0;
  if (holdData) {
    result = dataSort(holdData); //結果をソートして格納
    sumPrice = calcSumPrice(holdData, 'sum');
    otherPrice = calcSumPrice(holdData, 'other');
  }

  return (
    <OneBlock>
      <Table width='full'>
        <NormalTableHead bgColor='blue'>
          <NormalTableTr>
            <NormalTableTh value='通貨名' width={60} />
            <NormalTableTh value='保持割合' width={40} />
          </NormalTableTr>
        </NormalTableHead>
        <NormalTableBody>
          {result.length ? (
            result.map((data: NameQuanDataType, index: number) => {
              if (index >= 5) {
                return false;
              }
              return (
                <NormalTableTr key={index}>
                  <NormalTableTd value={data.currencyName} />
                  <NormalTableTd
                    align='right'
                    value={`${Math.floor(((data.currentPrice * data.quantity) / sumPrice) * 100 * 10) / 10}%`}
                  />
                </NormalTableTr>
              );
            })
          ) : (
            <NormalTableTr>
              <NormalTableTd value={<ErrorMessage errorMessage='保有中の通貨はありません' />} />
              <NormalTableTd value={'0%'} align='right' />
            </NormalTableTr>
          )}
          {props.other && result && result.length > 5 ? (
            <NormalTableTr>
              <NormalTableTd value='その他' />
              <NormalTableTd align='right' value={`${Math.floor((otherPrice / sumPrice) * 100 * 10) / 10}%`} />
            </NormalTableTr>
          ) : (
            false
          )}
        </NormalTableBody>
      </Table>
    </OneBlock>
  );
}
