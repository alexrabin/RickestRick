import styled from "styled-components";
interface Props {
  center: boolean;
}

const Container = styled.div<Props>`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: ${(p) => (p.center ? "center" : " flex-start")};
  align-items: center;
  margin: 2rem;
`;

export default Container;
