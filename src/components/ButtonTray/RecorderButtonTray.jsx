import React from "react";

import { Button } from "../Button/Button";
import { StyledButtonTray } from "./style";

import { IoStop, IoClose } from "react-icons/io5";

export const RecorderButtonTray = ({ stopAction, closeAction }) => {
  return (
    <StyledButtonTray>
      <Button action={stopAction} content={<IoStop />}></Button>
      <Button action={closeAction} content={<IoClose />}></Button>
    </StyledButtonTray>
  );
};
