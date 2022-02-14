const head = 'PORTFORIO_SETTING_';
export const PORTFORIO_SETTING_INIT = `${head}INIT`; //該当画面表示時
export const PORTFORIO_SETTING_INIT_SETTING = `${head}INIT_SETTING`; //初期表示で値受け取り後、ストアに保存する
export const PORTFORIO_SETTING_REGIST = `${head}REGIST`; //登録押下時
export const PORTFORIO_SETTING_REGIST_SEND = `${head}REGIST_SEND`; //登録完了時の処理
export const ADD_NEW_CURRENCY = `ADD_NEW_CURRENCY`; //登録完了時の処理
export const DELETE_CURRENCY = `DELETE_CURRENCY`; //登録完了時の処理

export function portforioSettingInit() {
  return { type: PORTFORIO_SETTING_INIT };
}

export function addNewCurrencyAction(name: string, quantity: number, price: number) {
  return {
    type: ADD_NEW_CURRENCY,
    payload: {
      currencyName: name,
      quantity: quantity,
      currentPrice: price,
    },
  };
}
export function deleteStore() {
  return {
    type: DELETE_CURRENCY,
  };
}
