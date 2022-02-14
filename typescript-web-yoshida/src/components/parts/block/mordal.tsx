import styled from 'styled-components';

//メインタグを表示
const StyledMain: any = styled.div`
  display: ${(props: any) => props.mordal};
  transition: 0.3s;
  #mordal-container {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 100;
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

type PropsType = {
  display: boolean;
};
export const Mordal: React.FC<PropsType> = ({ children, display }) => {
  let mordal = 'none';
  if (display) {
    mordal = 'block';
  }
  return (
    <StyledMain mordal={mordal}>
      <div id='mordal-container'>
        <div id='mordal-main'>{children}</div>
      </div>
    </StyledMain>
  );
};
