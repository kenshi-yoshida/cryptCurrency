import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { ButtonValue, PagingType } from '../../../common/enumType';
import { NameQuanDataType } from '../../../common/types';
import {
  BorderBlock,
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
  TextField,
  TitleText,
} from '../../../parts';
import { Mordal } from '../../../parts/block/mordal';
import { BoolMordal } from '../common';
import { AddMordal } from '../common/addMordal';
import { dataSort } from '../common/utility/utilFunction';
import { portforioDetailInit } from '../PortforioDetail/action';
import { deleteStore } from './action';
import { AddTable } from './addTable';
import { ConfirmTable } from './confirmTable';

type RegistType = {
  data: any;
  userID: number;
  navigation: NavigateFunction;
};
//ポートフォリオ登録非同期
async function registPortforio(props: RegistType) {
  await axios.post('http://localhost:4000/portforio/regist', props).then(() => {
    alert('更新が完了しました。');
    deleteStore();
    props.navigation(PagingType.PORTFORIO_DETAIL);
  });
}

//ポートフォリオ編集画面
export default function PortforioSetting() {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const login = useSelector((state: any) => state.registration);
  const selector: any = useSelector((state: any) => state.holdDetailCurrency);
  const [addMordal, setAddMordal] = useState(false);
  const [registMordal, setregistMordal] = useState(false);
  const [result, setResult] = useState(dataSort(selector.holdCurrency));

  //ログイン判定処理
  useEffect(() => {
    if (!login.login) {
      navigation(PagingType.LOGIN);
    }
  }, [login.login, navigation]);

  //画面初期表示時処理
  useEffect(() => {
    dispatch(portforioDetailInit());
    return () => {
      // Unmount時の処理を記述
    };
  }, [dispatch]);

  //データのリストが更新された場合の処理
  const getElementSize = useCallback(() => {
    setResult(dataSort(selector.holdCurrency));
  }, [selector]);
  useEffect(() => getElementSize(), [getElementSize]);

  //数量のいずれかを変更した場合の処理
  const onInpChange = (e: string, index: number) => {
    if (!e) {
      e = '0';
    }
    let data = [...result];
    data[index].quantity = parseInt(e);
    setResult(data);
  };

  //追加ボタン押下時の処理
  const onAddMordal = () => {
    setAddMordal(!addMordal);
  };

  //登録ボタン押下時の処理
  const onRegistMordal = () => {
    setregistMordal(!registMordal);
  };

  //登録モーダル内のはいボタン押下時の処理
  const onRegist = () => {
    registPortforio({
      data: result,
      userID: login.userID,
      navigation: navigation,
    });
  };

  //✕ボタン押下時の処理
  const onDelete = (index: number) => {
    let data = [...result];
    data.splice(index, 1);
    setResult(data);
  };

  return (
    <MainContainer>
      <TitleText value='ポートフォリオ編集画面' align='center' />
      <OneBlock>
        <ParagrafText value='現在保有中の通貨一覧' />
        <Table width='full'>
          <NormalTableHead bgColor='blue'>
            <NormalTableTr>
              <NormalTableTh value='通貨名' width={24} />
              <NormalTableTh value='保有枚数' width={24} />
              <NormalTableTh value='保有金額' width={24} />
              <NormalTableTh value='現在価格' width={24} />
              <NormalTableTh value='' width={4} />
            </NormalTableTr>
          </NormalTableHead>
          {result.length ? (
            result.map((data: NameQuanDataType, index: number) => {
              return (
                <NormalTableBody key={index}>
                  <NormalTableTr key={index}>
                    <NormalTableTd value={data.currencyName} key={index} />
                    <NormalTableTd
                      value={
                        <TextField
                          onChange={(e) => onInpChange(e, index)}
                          width='full'
                          value={data.quantity.toString()}
                          key={index}
                        />
                      }
                    />
                    <NormalTableTd align='right' value={(data.currentPrice * data.quantity).toLocaleString() + '円'} />
                    <NormalTableTd align='right' value={data.currentPrice.toLocaleString() + '円'} />
                    <NormalTableTd
                      value={
                        <DefaultButton
                          value='✕'
                          width='full'
                          hover='danger'
                          onClick={() => {
                            onDelete(index);
                          }}
                        />
                      }
                    />
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
        <OneBlock display='flex' justify='space-around'>
          <DefaultButton
            width={150}
            value={ButtonValue.BACK}
            hover='primary'
            onClick={() => {
              navigation(PagingType.PORTFORIO_DETAIL);
            }}
          />
          <DefaultButton
            width={150}
            value={ButtonValue.ADD}
            hover='attention'
            onClick={() => {
              onAddMordal();
            }}
          />
          <DefaultButton width={150} value={ButtonValue.REGIST} hover='primary' onClick={() => onRegistMordal()} />
        </OneBlock>
      </OneBlock>

      <Mordal display={addMordal}>
        <BorderBlock>
          <AddMordal
            value='保持通貨の追加'
            noHover='primary'
            onNoClick={() => {
              onAddMordal();
            }}
          >
            <AddTable data={result} onAdd={() => onAddMordal()} />
          </AddMordal>
        </BorderBlock>
      </Mordal>
      <Mordal display={registMordal}>
        <BorderBlock>
          <BoolMordal
            value='以下の内容で登録しますか？'
            noHover='primary'
            yesHover='primary'
            onNoClick={() => {
              onRegistMordal();
            }}
            onYesClick={() => onRegist()}
          >
            <ConfirmTable data={result} />
          </BoolMordal>
        </BorderBlock>
      </Mordal>
    </MainContainer>
  );
}
