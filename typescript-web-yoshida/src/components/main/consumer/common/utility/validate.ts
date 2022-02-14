import { InputCheckType } from '../../../../common/enumType';

//特殊文字入力チェック
export function spetialCharCheck(check: string) {
  const reg = new RegExp(InputCheckType.CHECK);
  if (reg.test(check)) {
    return "'=!%&?<>/は使用することができません";
  } else {
    return '';
  }
}

//電話番号チェック
export function notTell(check: string) {
  if (check === '') {
    return '文字を入力してください';
  }
  const reg = new RegExp(InputCheckType.TELL);
  if (!reg.test(check)) {
    return '正しい電話番号を入力してください';
  } else {
    return '';
  }
}

//半角英数字チェック
export function harfAlphanumerical(check: string) {
  if (check === '') {
    return '文字を入力してください';
  }
  const reg = new RegExp(InputCheckType.HARF_ALPHANUMERICAL);
  if (!reg.test(check)) {
    return '半角英数字で入力ししてください';
  } else {
    return '';
  }
}

//メールアドレスチェック
export function checkEmail(check: string) {
  if (check === '') {
    return '文字を入力してください';
  }
  const reg = new RegExp(InputCheckType.EMAIL);
  if (!reg.test(check)) {
    return 'メールアドレスが正しくありません。';
  }

  return '';
}

//new URLSearchParams();
