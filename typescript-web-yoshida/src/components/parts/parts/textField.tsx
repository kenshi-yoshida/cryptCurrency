import styled from 'styled-components';
import { ErrorMessage } from '..';
import { changeWidth } from '../partsFunction/partsFunction';

type PropsType = {
  value: string;
  type?: 'text' | 'password' | 'tel' | 'email' | 'number';
  width?: 'full' | 'half' | number;
  placeholder?: string;
  max?: number;
  onChange: (e: any) => void;
  errorMessage?: string;
};

/**
 * テキストボックスを表示する
 * @param value 入力値
 * @param width 横幅
 * @param placeholder placeholderに表示する値
 * @param onChange テキストボックス入力時の処理
 * @param errorMessage エラーメッセージ
 */
let StyledTextField: any = styled.div`
  width: ${(props: any) => props.width};
  input {
    width: 100%;
  }
  p {
    margin: 3px 0px;
    color: red;
    word-break: break-all;
  }
`;
export function TextField(props: PropsType) {
  //レイアウト作成
  let width = changeWidth(props.width);
  let type = props.type;
  if (!type) {
    type = 'text';
  }

  return (
    <StyledTextField width={width}>
      <input
        type={type}
        value={props.value}
        placeholder={props.placeholder}
        onChange={(e) => props.onChange(e.target.value)}
        maxLength={props.max}
      />
      {props.errorMessage ? <ErrorMessage errorMessage={props.errorMessage} /> : false}
    </StyledTextField>
  );
}
