//新規会員・変更画面の入力フォーム
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { ConstantNum } from '../../../common/enumType';
import { BorderBlock, DefaultButton, FirstNoneList, LabelText, List, OneBlock, TextField, Ul } from '../../../parts';
import { checkEmail, notTell, spetialCharCheck } from './utility/validate';

type PropsType = {
  value: string;
  onClick: (porps: any) => void;
};
export function UserRegistForm(props: PropsType) {
  const selector = useSelector((state: any) => state.registration);

  //メッセージ・エラーのステート
  const [name, setName] = useState(selector.name);
  const [nameError, setNameError] = useState('');
  const [email, setEmail] = useState(selector.email);
  const [emailError, setEmailError] = useState('');
  const [tell, setTel] = useState(selector.tell);
  const [tellError, setTellError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  //名前入力時の処理
  const onChengeName = (inpName: string) => {
    const valError = spetialCharCheck(inpName);
    if (valError) {
      setNameError(valError);
    } else {
      setNameError('');
    }
    setName(inpName);
  };

  //メールアドレス入力時の処理
  const onChengeEmail = (inpEmail: string) => {
    const valError = spetialCharCheck(inpEmail);
    if (valError) {
      setEmailError(valError);
    } else {
      setEmailError('');
    }
    setEmail(inpEmail);
  };

  //電話番号入力時の処理
  const onChengeTel = (inpTell: string) => {
    const valError = spetialCharCheck(inpTell);
    if (valError) {
      setTellError(valError);
    } else {
      setTellError('');
    }
    setTel(inpTell);
  };

  //パスワード入力時の処理
  const onChengePassword = (inpPassword: string) => {
    const valError = spetialCharCheck(inpPassword);
    if (valError) {
      setPasswordError(valError);
    } else {
      setPasswordError('');
    }
    setPassword(inpPassword);
  };

  //パスワード(確認用)入力時の処理
  const onChengeConfirmPassword = (inpConfPass: string) => {
    const valError = spetialCharCheck(inpConfPass);
    if (valError) {
      setConfirmPasswordError(valError);
    } else {
      setConfirmPasswordError('');
    }
    setConfirmPassword(inpConfPass);
  };

  //登録押下時の処理
  const onRegist = () => {
    let flagCount = 0;
    if (name === '') {
      setNameError('名前を入力してください');
    }

    //メールアドレスチェック
    const valMailError = checkEmail(email);
    if (valMailError) {
      setEmailError(valMailError);
      flagCount += 1;
    }

    //電話番号チェック
    const valTelError = notTell(tell);
    if (valTelError) {
      setTellError(valTelError);
      flagCount += 1;
    }

    //パスワード入力チェック
    if (password === '') {
      setPasswordError('パスワードを入力してください');
    }
    if (confirmPassword === '') {
      setConfirmPasswordError('パスワードを入力してください');
    }

    //パスワード整合性チェック
    const passCnfVal = password === confirmPassword;
    if (!passCnfVal) {
      const message = 'パスワードが一致しません';
      setPasswordError(message);
      setConfirmPasswordError(message);
      flagCount += 1;
    }

    //バリデーションチェック完了時の処理
    if (flagCount === 0) {
      //TODO 余裕があればメールアドレス重複チェック
      props.onClick({
        name: name,
        email: email,
        tell: tell,
        password: password,
        userID: selector.userID,
      });
    } else {
      return false;
    }
  };

  return (
    <BorderBlock>
      <Ul width='full'>
        <FirstNoneList>
          <LabelText value='氏名' />
          <TextField
            width='full'
            placeholder='山田太郎'
            value={name}
            max={ConstantNum.USER_NAME}
            onChange={(inpName) => onChengeName(inpName)}
            errorMessage={nameError}
          />
        </FirstNoneList>
        <List>
          <LabelText value='メールアドレス' />
          <TextField
            type='email'
            width='full'
            placeholder='xxxxx@sample.com'
            value={email}
            max={ConstantNum.E_MAIL}
            onChange={(inpEmail) => onChengeEmail(inpEmail)}
            errorMessage={emailError}
          />
        </List>
        <List>
          <LabelText value='電話番号(ハイフンなし)' />
          <TextField
            type='tel'
            width='full'
            placeholder='0901112222'
            value={tell}
            max={ConstantNum.TELL}
            onChange={(inpTell) => onChengeTel(inpTell)}
            errorMessage={tellError}
          />
        </List>
        <List>
          <LabelText value='パスワード' />
          <TextField
            type='password'
            width='full'
            placeholder='パスワードを入力してください'
            value={password}
            max={ConstantNum.PASSWORD}
            onChange={(inpPassword) => onChengePassword(inpPassword)}
            errorMessage={passwordError}
          />
        </List>
        <List>
          <LabelText value='パスワード（確認用）' />
          <TextField
            type='password'
            width='full'
            placeholder='パスワードを入力してください'
            value={confirmPassword}
            max={ConstantNum.PASSWORD}
            onChange={(inpConfPass) => onChengeConfirmPassword(inpConfPass)}
            errorMessage={confirmPasswordError}
          />
        </List>
      </Ul>
      <OneBlock display='flex' justify='flex-end'>
        <DefaultButton
          value={props.value}
          onClick={() => onRegist()}
          hover='primary'
          disabled={!!(nameError || emailError || tellError || passwordError || confirmPasswordError)}
        />
      </OneBlock>
    </BorderBlock>
  );
}
