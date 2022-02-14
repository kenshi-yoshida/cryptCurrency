import { ButtonValue, cryptName } from '../../../common/enumType';
import {
  DefaultButton,
  NormalTableBody,
  NormalTableHead,
  NormalTableTd,
  NormalTableTh,
  NormalTableTr,
  Table,
  TextField,
} from '../../../parts';
import Select, { SingleValue } from 'react-select';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNewCurrencyAction } from './action';
import { getCurrencyPrice } from '../common/utility/utilFunction';
import { getCurrencyAPI } from '../common/utility/utility.saga';

type PropsType = {
  data: any;
  onAdd: () => void;
};

export function AddTable(props: PropsType) {
  const dispatch = useDispatch();
  const currencyData = props.data;
  const [inpQuantity, setInpQuantity] = useState('');
  const [selectValue, setSelectValue] = useState('');
  const [selectLabel, setSelectLabel] = useState('');
  const [qualtityDisable, setQuantityAddDisable] = useState(true);
  const [nameDisable, setNameAddDisable] = useState(true);

  const onInpQuantity = (e: string) => {
    setInpQuantity(e);
    if (e) {
      setQuantityAddDisable(false);
    } else {
      setQuantityAddDisable(true);
    }
  };

  //セレクトボックス選択時
  const onChangeCurrency = (
    e: SingleValue<{
      value: number;
      label: string;
    }>
  ) => {
    if (e) {
      setSelectValue(e.value.toString());
      setSelectLabel(e.label);
    }
    if (e) {
      setNameAddDisable(false);
    } else {
      setNameAddDisable(true);
    }
  };
  //追加押下時
  const onAdd = async () => {
    let data = currencyData;
    const url = await getCurrencyPrice(selectLabel);
    const price = await getCurrencyAPI(url);

    data.push({
      currencyName: selectLabel,
      quantity: parseInt(inpQuantity),
      currentPrice: price,
      currencyID: selectValue,
    });
    dispatch(addNewCurrencyAction(selectLabel, parseInt(inpQuantity), price));

    //入力内容を初期化
    setInpQuantity('');
    setSelectValue('');

    //モーダルを閉じる
    props.onAdd();
  };

  const option = createSelect(currencyData);
  return (
    <Table width='full'>
      <NormalTableHead bgColor='gray'>
        <NormalTableTr>
          <NormalTableTh value='通貨名' width={40} />
          <NormalTableTh value='枚数' width={40} />
          <NormalTableTh value='' width={20} />
        </NormalTableTr>
      </NormalTableHead>
      <NormalTableBody>
        <NormalTableTr>
          {/* 持っていない通貨だけセレクトボックスに入れる */}
          <NormalTableTd
            value={<Select options={option} onChange={(e) => onChangeCurrency(e)} isSearchable={true} />}
          />
          <NormalTableTd
            value={
              <TextField
                type='number'
                value={inpQuantity}
                onChange={(e) => {
                  onInpQuantity(e);
                }}
                width='full'
              />
            }
          />
          <NormalTableTd
            value={
              <DefaultButton
                value={ButtonValue.ADD}
                width='full'
                hover='primary'
                onClick={() => {
                  onAdd();
                }}
                disabled={qualtityDisable || nameDisable}
              />
            }
          />
        </NormalTableTr>
      </NormalTableBody>
    </Table>
  );
}

//保持していない通貨を抽出する関数
function createSelect(currencyData: any) {
  const selectData = []; /* リターンするデータ */
  for (let i = 0; cryptName.length > i; i++) {
    let count = 0;
    for (let j = 0; currencyData.length > j; j++) {
      if (currencyData[j].currencyName === cryptName[i].enName) {
        count++;
      }
    }
    if (count === 0) {
      selectData.push({
        value: cryptName[i].currencyID,
        label: cryptName[i].enName,
      });
    }
  }
  return selectData;
}
