import styled from 'styled-components';

type PropsType = {
  value: string;
};

/**
 * テキストボックスを表示する
 * @param value 入力値
 */
let StyledText: any = styled.label`
  margin: 0px;
  padding-right: 10px;
`;
export function LabelText(props: PropsType) {
  //レイアウト作成

  return <StyledText>{props.value}</StyledText>;
}
