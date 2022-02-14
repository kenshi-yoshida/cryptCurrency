import styled from 'styled-components';
import { changeWidth } from '../partsFunction/partsFunction';

type PropsType = {
  width?: 'full' | 'half' | number;
};

/**
 * tableタグを表示
 * @param width テーブルの幅 既定の割合か任意の値
 */
const StyledTable: any = styled.table`
  width: ${(props: any) => props.tWidth};
  border: 2px solid rgb(39, 39, 39);
  border-collapse: collapse;
  background-color: white;
  margin: 0 auto;
`;
export const Table: React.FC<PropsType> = ({ children, width }) => {
  let tWidth = changeWidth(width);

  return <StyledTable tWidth={tWidth}>{children}</StyledTable>;
};
