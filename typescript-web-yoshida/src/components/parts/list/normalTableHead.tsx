import styled from 'styled-components';
import { changeTheadBgColor } from '../partsFunction/partsFunction';

type PropsType = {
  bgColor?: 'gray' | 'blue';
  align?: 'center' | 'left' | 'right';
};

/**
 * theadタグを表示
 * @param bgColor 項目の背景色
 * @param align セル内の文字位置
 */
const StyledThead: any = styled.thead`
  background-color: ${(props: any) => props.bgcolor};
  color: ${(props: any) => props.color};
  text-align: ${(props: any) => props.align};
`;
export const NormalTableHead: React.FC<PropsType> = ({ children, bgColor, align }) => {
  let color = changeTheadBgColor(bgColor);

  return (
    <StyledThead color={color.fontColor} bgcolor={color.backColor} align={align}>
      {children}
    </StyledThead>
  );
};
