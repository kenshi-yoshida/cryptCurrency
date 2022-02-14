const head = 'PORTFORIO_DETAIL_';
export const PORTFORIO_DETAIL_INIT = `${head}INIT`; //該当画面表示時
export const PORTFORIO_DETAIL_INIT_STORE = `${head}INIT_STORE`; //初期表示で値受け取り後、ストアに保存する
export const GET_currentPrice = 'GET_currentPrice';

//初期表示時
export function portforioDetailInit() {
  return { type: PORTFORIO_DETAIL_INIT };
}

//初期表示後ストアに保存する
export function portforioDtailStore(holdCurrency: {}[]) {
  return {
    type: PORTFORIO_DETAIL_INIT_STORE,
    payload: {
      holdCurrency,
    },
  };
}
