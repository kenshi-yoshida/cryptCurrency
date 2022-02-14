import styled from 'styled-components';
import { changeButtonBgColor, changeWidth } from '../partsFunction/partsFunction';

type PropsType = {
  value: string;
  width?: 'full' | 'half' | number;
  hover?: 'primary' | 'attention' | 'danger';
  onClick: (props: void) => void;
  disabled?: boolean;
};

/**
 * ボタンを表示する
 * @param value 表示する値
 * @param width ボタンの幅 既定の割合か任意の値
 * @param hover カーソルを合わせた際の色
 * @param onClick クリック時の処理
 * @param disabled ボタン日活性
 */
const StyledButton: any = styled.button`
  height: 30px;
  width: ${(props: any) => props.width};
  text-align: center;
  transition: 0.2s;
  border: 2px solid rgb(110, 110, 110);
  border-radius: 3px;
  cursor: pointer;
  &:hover {
    background-color: ${(props: any) => props.bgColor};
  }
`;
export function DefaultButton(props: PropsType) {
  //レイアウト作成
  let width = changeWidth(props.width);
  let bgColor = changeButtonBgColor(props.hover);
  return (
    <StyledButton width={width} bgColor={bgColor} onClick={() => props.onClick()} disabled={props.disabled}>
      {props.value}
    </StyledButton>
  );
}
