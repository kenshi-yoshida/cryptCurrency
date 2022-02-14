import styled from 'styled-components';

type PropsType = {
  value?: string | number;
  margin?: number;
};

/**
 * @param value 表示する値
 * @param margin　幅
 */
const StyledList: any = styled.li`
  margin-top: ${(props: any) => props.margin}px;
`;
export const List: React.FC<PropsType> = ({ children, value, margin }) => {
  let viewMargin = 20;
  if (margin || margin === 0) {
    viewMargin = margin;
  }
  if (children) {
    return <StyledList margin={viewMargin}>{children}</StyledList>;
  }
  return <StyledList>{value}</StyledList>;
};
