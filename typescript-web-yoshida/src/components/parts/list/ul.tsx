import styled from 'styled-components';
import { changeWidth } from '../partsFunction/partsFunction';
import { Flex } from '../partsFunction/partsType';

type PropsType = {
  width?: 'full' | 'half' | number;
  textAlign?: 'center' | 'left' | 'rignt';
} & Flex;

const UlStyle: any = styled.ul`
  margin: 0px;
  display: ${(props: any) => props.display};
  width: ${(props: any) => props.width};
  justify-content: ${(props: any) => props.justify};
  align-items: ${(props: any) => props.align};
  text-align: ${(props: any) => props.textAlign};
`;
export const Ul: React.FC<PropsType> = ({ children, display, width, justify, align, textAlign }) => {
  const changedStyle = changeWidth(width);
  return (
    <UlStyle display={display} width={changedStyle} justify={justify} align={align} textAlign={textAlign}>
      {children}
    </UlStyle>
  );
};
