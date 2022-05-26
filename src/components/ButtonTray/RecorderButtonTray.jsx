import React from "react";

import { Button } from "../Button/Button";
import { DrawingButtonTray } from "./DrawingButtonTray";
import { StyledButtonTray } from "./style";

import { IoStop, IoClose } from "react-icons/io5";

export const RecorderButtonTray = ({
  stopAction,
  closeAction,
  drawing,
  setDrawing,
  clearDrawing,
}) => {
  return (
    <StyledButtonTray>
      <Button action={stopAction} content={<IoStop />}></Button>
      <DrawingButtonTray
        drawing={drawing}
        setDrawing={setDrawing}
        clearDrawing={clearDrawing}
      ></DrawingButtonTray>
      <Button action={closeAction} content={<IoClose />}></Button>
    </StyledButtonTray>
  );
};
