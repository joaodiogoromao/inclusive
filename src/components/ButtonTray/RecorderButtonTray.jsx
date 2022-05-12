import React from "react";

import { Button } from "../Button/Button";
import { StyledButtonTray } from "./style";

import { IoStop, IoClose, IoPause } from "react-icons/io5";

export const RecorderButtonTray = ({ stopAction, pauseAction, closeAction }) => {
  return (
    <StyledButtonTray>
      <Button action={pauseAction} content={<IoPause />}></Button>
      <Button action={stopAction} content={<IoStop />}></Button>
      <Button action={closeAction} content={<IoClose />}></Button>
    </StyledButtonTray>
  );
};
