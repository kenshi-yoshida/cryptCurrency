import styled from 'styled-components';

type PropsType = {
  value: string;
  onClick: () => void;
};

/**
 * aタグを表示する
 * @param value 表示する値
 * @param onClick 遷移する処理
 */
const StyledAnker = styled.a`
  color: rgb(113, 58, 185);
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    text-decoration: underline;
  }
`;
export function Link(props: PropsType) {
  return <StyledAnker onClick={() => props.onClick()}>{props.value}</StyledAnker>;
}
