import React from "react";

import { Button } from "../Button/Button";
import { StyledButtonTray } from "./style";

import { BsFillCameraFill, BsFillCameraVideoFill } from "react-icons/bs";
import { DrawingButtonTray } from "./DrawingButtonTray";

export const CameraButtonTray = ({
  photoAction,
  videoAction,
  drawing,
  setDrawing,
  clearDrawing,
}) => {
  return (
    <StyledButtonTray>
      <Button action={photoAction} content={<BsFillCameraFill />}></Button>
      <Button action={videoAction} content={<BsFillCameraVideoFill />}></Button>
      <DrawingButtonTray
        drawing={drawing}
        setDrawing={setDrawing}
        clearDrawing={clearDrawing}
      ></DrawingButtonTray>
    </StyledButtonTray>
  );
};
