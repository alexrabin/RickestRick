import styled from "@emotion/styled";
import React from "react";

const StyledLink = styled.a`
  color: #0099fa;
`;
type Props = {
  href: string;
  children?: JSX.Element | JSX.Element[] | string;
};
const OutsideLink = ({ href, children }: Props) => {
  return (
    <StyledLink href={href} target="_blank">
      {children}
    </StyledLink>
  );
};

export default OutsideLink;
