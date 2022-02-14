import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ButtonValue, PagingType } from '../../../common/enumType';
import { NameQuanDataType } from '../../../common/types';
import {
  DefaultButton,
  ErrorMessage,
  MainContainer,
  NormalTableBody,
  NormalTableHead,
  NormalTableTd,
  NormalTableTh,
  NormalTableTr,
  OneBlock,
  ParagrafText,
  Table,
  TitleText,
} from '../../../parts';
import { PortforioRankGraf } from '../common';
import { dataSort } from '../common/utility/utilFunction';
import { portforioDetailInit } from './action';

export default function PortforioDetail() {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const login = useSelector((state: any) => state.registration);
  const selector: any = useSelector((state: any) => state.holdDetailCurrency);
  const holdData = selector.holdCurrency;
  //ソートと資産合計算出処理
  let result = [];
  if (holdData) {
    result = dataSort(holdData); //結果をソートして格納
  }

  //ログイン判定処理
  useEffect(() => {
    if (!login.login) {
      navigation(PagingType.LOGIN);
    }
  }, [login.login, navigation]);

  //画面初期表示時処理
  useEffect(() => {
    dispatch(portforioDetailInit());
  }, [dispatch]);

  //TODO ページマウント時DBから保有情報とAPIから現在価格を取得
  //画面遷移処理
  const onClick = () => {
    navigation(PagingType.PORTFORIO_SETTING);
  };

  return (
    <MainContainer>
      <TitleText value='ポートフォリオ' align='center' />
      <PortforioRankGraf other={false} noneButton={true} />
      <OneBlock>
        <OneBlock>
          <OneBlock>
            <ParagrafText value='現在保有中の通貨一覧' />
            <Table width='full'>
              <NormalTableHead bgColor='blue'>
                <NormalTableTr>
                  <NormalTableTh value='通貨名' width={24} />
                  <NormalTableTh value='保有枚数' width={24} />
                  <NormalTableTh value='保有金額' width={24} />
                  <NormalTableTh value='現在価格' width={24} />
                </NormalTableTr>
              </NormalTableHead>
              {result.length ? (
                result.map((data: NameQuanDataType, index: number) => {
                  return (
                    <NormalTableBody key={index}>
                      <NormalTableTr>
                        <NormalTableTd value={data.currencyName} />
                        <NormalTableTd value={`${data.quantity}\t${data.currencyName}`} align='right' />
                        <NormalTableTd
                          align='right'
                          value={Number(data.currentPrice * data.quantity).toLocaleString() + '円'}
                        />
                        <NormalTableTd align='right' value={Number(data.currentPrice).toLocaleString() + '円'} />
                      </NormalTableTr>
                    </NormalTableBody>
                  );
                })
              ) : (
                <NormalTableBody>
                  <NormalTableTr>
                    <NormalTableTd value={<ErrorMessage errorMessage='保有中の通貨はありません' />} />
                    <NormalTableTd value={0} align='right' />
                    <NormalTableTd value={'0円'} align='right' />
                    <NormalTableTd value={'0円'} align='right' />
                  </NormalTableTr>
                </NormalTableBody>
              )}
            </Table>
            <OneBlock display='flex' justify='flex-end'>
              <DefaultButton width={150} value={ButtonValue.CHANGE} hover='primary' onClick={onClick} />
            </OneBlock>
          </OneBlock>
        </OneBlock>
      </OneBlock>
    </MainContainer>
  );
}
