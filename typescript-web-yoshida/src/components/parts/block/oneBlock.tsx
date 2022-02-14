import styled from 'styled-components';
import { Flex } from '../partsFunction/partsType';

type PropsType = {
  border?: boolean;
  textAlign?: 'center' | 'left' | 'rignt';
} & Flex;

/**
 * divタグを表示
 * @param border ボーダーを表示
 * @param display 横並びにするか
 * @param justify justify-contentの表示位置
 * @param align align-itemsの表示位置
 */
const Block: any = styled.div`
  width: 100%;
  margin: 10px auto;
  padding: 0px 10px;
  display: ${(props: any) => props.display};
  justify-content: ${(props: any) => props.justify};
  align-items: ${(props: any) => props.align};
  text-align: ${(props: any) => props.textAlign};
`;
export const OneBlock: React.FC<PropsType> = ({ children, border, display, justify, align, textAlign }) => {
  return (
    <Block justify={justify} align={align} display={display} textAlign={textAlign}>
      {children}
      {border ? <hr /> : false}
    </Block>
  );
};
