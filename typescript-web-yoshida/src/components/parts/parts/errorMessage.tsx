import styled from 'styled-components';

type PropsType = {
  errorMessage: string;
};

/**
 * エラーメッセージを表示する
 * @param errorMessage エラーメッセージがあれば表示する
 */
const P = styled.p`
  margin: 3px 0px;
  color: red;
  word-break: break-all;
`;
export function ErrorMessage(props: PropsType) {
  return <P>{props.errorMessage}</P>;
}
