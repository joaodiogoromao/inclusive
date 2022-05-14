import styled from "styled-components";

export const StyledVideo = styled.div`
  position: fixed;
  top: 0;
  left: ${props => props.visible ? 0 : "100%"};
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: rgba(0, 0, 0, 0.9);
  transition: 0.4s;
`;
