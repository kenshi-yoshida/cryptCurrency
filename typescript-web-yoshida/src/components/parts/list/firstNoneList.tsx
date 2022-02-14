import styled from 'styled-components';

type PropsType = {
  value?: string | number;
};

/**
 * @param value 表示する値
 */
const StyledList = styled.li`
  margin-top: 20px;
  &:first-child {
    margin-top: 0px;
  }
`;
export const FirstNoneList: React.FC<PropsType> = ({ children, value }) => {
  if (children) {
    return <StyledList>{children}</StyledList>;
  }
  return <StyledList>{value}</StyledList>;
};
