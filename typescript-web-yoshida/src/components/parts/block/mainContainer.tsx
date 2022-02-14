import { useState } from 'react';
import styled from 'styled-components';

//メインタグを表示
const StyledMain: any = styled.main`
  width: 800px;
  margin: 0 auto;
  padding: 20px 0px;
  background-color: rgb(206, 206, 206);
  min-height: ${(props: any) => props.minheight}px;
`;
export const MainContainer: React.FC = ({ children }) => {
  const [height, setHeight] = useState(window.innerHeight - 164);
  const onResize = () => {
    setHeight(window.innerHeight - 147);
  };
  window.addEventListener('resize', onResize);
  return <StyledMain minheight={height}>{children}</StyledMain>;
};
