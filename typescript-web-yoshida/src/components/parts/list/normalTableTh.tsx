import styled from 'styled-components';

type PropsType = {
  value: string | number | React.ReactElement;
  width?: number;
  weight?: 'bold';
};

/**
 * tdタグを表示
 * @param value 値かJSX
 * @param width 横幅の割合
 * @param weight 太文字にするか
 */
const Block: any = styled.th`
  width: ${(props: any) => props.width}%;
  font-weight: ${(props: any) => props.weight};
  padding: 2px;
  border: 1px solid rgba(65, 65, 65, 0.5);
`;
export function NormalTableTh(props: PropsType) {
  return (
    <Block width={props.width} weight={props.weight}>
      {props.value}
    </Block>
  );
}
