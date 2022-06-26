import React from "react";

import { StyledButton, StyledFilledButton } from "./style";

export const Button = ({ action, content, filled = false }) => {
  return filled ? (
    <StyledFilledButton onClick={action}>{content}</StyledFilledButton>
  ) : (
    <StyledButton onClick={action}>{content}</StyledButton>
  );
};
