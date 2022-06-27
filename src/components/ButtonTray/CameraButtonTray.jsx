import React from "react";

import { Button } from "../Button/Button";
import { StyledButtonTray } from "./style";
import { DrawingButtonTray } from "./DrawingButtonTray";

import { BsFillCameraFill, BsFillCameraVideoFill } from "react-icons/bs";
import { BiShow, BiHide } from "react-icons/bi";

export const CameraButtonTray = ({
  photoAction,
  videoAction,
  drawing,
  setDrawing,
  clearDrawing,
  mode,
  showCornerCamera,
  setShowCornerCamera,
}) => {
  return (
    <StyledButtonTray>
      <Button action={photoAction} content={<BsFillCameraFill />}></Button>
      <Button action={videoAction} content={<BsFillCameraVideoFill />}></Button>
      {mode !== 0 &&
        (showCornerCamera ? (
          <Button
            action={() => setShowCornerCamera(false)}
            content={<BiShow />}
            filled={true}
          ></Button>
        ) : (
          <Button
            action={() => setShowCornerCamera(true)}
            content={<BiHide />}
          ></Button>
        ))}
      <DrawingButtonTray
        drawing={drawing}
        setDrawing={setDrawing}
        clearDrawing={clearDrawing}
      ></DrawingButtonTray>
    </StyledButtonTray>
  );
};
