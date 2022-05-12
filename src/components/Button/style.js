import styled from "styled-components";

export const StyledButton = styled.button`
  appearance: none;
  border: #faa41a solid 2px;
  border-radius: 25px;
  outline: none;

  padding: 12px 12px;
  background-image: linear-gradient(to right, #4e4540 50%, #faa41a 50%);
  background-position: 0%;
  background-size: 200%;
  color: #ffffff;
  font-size: 24px;
  font-weight: 200;
  transition: 0.4s;

  &:hover {
    background-position: 100%;
  }

  margin-right: 10px;

  display: flex;
  align-items: center;
`;
