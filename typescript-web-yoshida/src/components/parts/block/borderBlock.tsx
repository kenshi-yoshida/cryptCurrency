import styled from 'styled-components';

//メインタグを表示
const StyledMain = styled.div`
  width: 550px;
  margin: 0 auto;
  padding: 30px 60px;
  border: 3px solid black;
  border-radius: 20px;
  background-color: white;
`;
export const BorderBlock: React.FC = ({ children }) => {
  return <StyledMain>{children}</StyledMain>;
};
