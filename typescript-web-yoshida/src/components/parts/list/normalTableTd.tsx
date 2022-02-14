import styled from 'styled-components';

type PropsType = {
  value: string | number | React.ReactElement | Promise<any>;
  weight?: 'bold';
  align?: 'center' | 'right';
};

/**
 * tdタグを表示
 * @param value 値かJSX
 * @param weight 太文字にするか
 */
const Block: any = styled.td`
  font-weight: ${(props: any) => props.weight};
  padding: 2px;
  border: 1px solid rgba(65, 65, 65, 0.5);
  text-align: ${(props: any) => props.align};
`;
export function NormalTableTd(props: PropsType) {
  let align = 'left';
  if (props.align) {
    align = props.align;
  }
  return (
    <Block weight={props.weight} align={align}>
      {props.value}
    </Block>
  );
}
