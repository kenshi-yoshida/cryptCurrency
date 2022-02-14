import styled from 'styled-components';

type PropsType = {
  value: string;
};

/**
 * pタグを表示する
 * @param value 入力値
 */
let StyledText: any = styled.p`
  margin: 0px;
`;
export function ParagrafText(props: PropsType) {
  //レイアウト作成

  return <StyledText>{props.value}</StyledText>;
}
