import React from "react";

import { Button } from "../Button/Button";
import { StyledButtonTray } from "./style";

import { IoClose } from "react-icons/io5";

export const PhotoButtonTray = ({ closeAction }) => {
  return (
    <StyledButtonTray>
      <Button action={closeAction} content={<IoClose />}></Button>
    </StyledButtonTray>
  );
};
