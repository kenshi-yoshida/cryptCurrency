import React from 'react';
import styled from 'styled-components';

type PropsType = {
  value?: string;
  align?: 'center' | 'left' | 'right';
};
const Title: any = styled.h1`
  text-align: ${(props: any) => props.align};
`;
export const TitleText: React.FC<PropsType> = ({ children, value, align }) => {
  if (children) {
    return <Title align={align}>{children}</Title>;
  }
  return <Title align={align}>{value}</Title>;
};
