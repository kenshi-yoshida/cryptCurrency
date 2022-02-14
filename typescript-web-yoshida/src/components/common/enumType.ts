//定数を格納するファイル
//CryptNumberとcryptNameの順番を対応させる
export enum CryptNumber {
  BTC = 0,
  ETH,
  XRP,
  LTC,
  BCH,
  MONA,
  XLM,
  QTUM,
  BAT,
  OMG,
  XYM,
}

//TODOここをサイト立ち上げ時にDBから引っ張ってくる
export const cryptName = [
  { enName: 'BTC', jpName: 'ビットコイン', currencyID: 0 },
  { enName: 'ETH', jpName: 'イーサリアム', currencyID: 1 },
  { enName: 'XRP', jpName: 'リップル', currencyID: 2 },
  { enName: 'LTC', jpName: 'ライトコイン', currencyID: 3 },
  { enName: 'BCH', jpName: 'ビットコインキャッシュ', currencyID: 4 },
  { enName: 'MONA', jpName: 'モナコイン', currencyID: 5 },
  { enName: 'XLM', jpName: 'ステラルーメン', currencyID: 6 },
  { enName: 'QTUM', jpName: 'クアンタム', currencyID: 7 },
  { enName: 'BAT', jpName: 'ベーシックアテンショントークン', currencyID: 8 },
  { enName: 'OMG', jpName: 'オーエムジー', currencyID: 9 },
  { enName: 'XYM', jpName: 'シンボル', currencyID: 10 },
];

//API用のURL
export enum GetCrrencyPriceAPI {
  HEAD_URL = '',
}

//テキストボックスの最大値定数
export enum ConstantNum {
  TOP_RANKING_VIEW = 5, //トップの通貨表示件数
  DETAIL_RANKING_VIEW = 5, //ポートフォリオ詳細画面の通貨表示件数
  USER_NAME = 20, //ユーザーネーム
  PASSWORD = 40, //パスワード
  TELL = 11,
  E_MAIL = 40,
  CRIPT_AMOUNT = 10, //仮想通貨枚数
}

//バリデーションの正規表現
export enum InputCheckType {
  CHECK = `['=!%&?<>]`, //スクリプト・SQLインジェクション対策用
  HARF_ALPHANUMERICAL = `^[0-9a-zA-Z]*$`, //半角英数字のみ
  CH_CHARS = `/([\u{3005}\u{3007}\u{303b}\u{3400}-\u{9FFF}\u{F900}-\u{FAFF}\u{20000}-\u{2FFFF}][\u{E0100}-\u{E01EF}\u{FE00}-\u{FE02}]?)/mu`, //漢字のチェック
  TELL = `^[0-9]+$`, //電話番号
  EMAIL = `^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*.)+[a-zA-Z]{2,}$`,
}

//共通で使用するボタンValue
export enum ButtonValue {
  BACK = '戻る',
  YES = 'はい',
  NO = 'いいえ',
  CLOSE = '閉じる',
  DETAIL = '詳しく見る',
  LOGIN = 'ログイン',
  REGIST = '登録',
  NEW_REGIST = '新規登録',
  CHANGE = '変更',
  ADD = '追加',
}

//
export enum PagingType {
  ROOT = '/',
  LOGIN = '/login',
  TOP = '/Top',
  REGISTRATION = '/user/registration',
  USER_SETTING = '/user/setting',
  PORTFORIO_SETTING = '/portforio/setting',
  PORTFORIO_DETAIL = '/portforio/detail',
  SETTING = '/setting',
}
