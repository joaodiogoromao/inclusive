import React from "react";

import { StyledButton } from "./style";

export const Button = ({ action, content }) => {
  return <StyledButton onClick={action}>{content}</StyledButton>;
};
