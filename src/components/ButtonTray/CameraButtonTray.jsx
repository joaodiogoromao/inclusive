import React from "react";

import { Button } from "../Button/Button";
import { StyledButtonTray } from "./style";
import { DrawingButtonTray } from "./DrawingButtonTray";

import { BsFillCameraFill, BsFillCameraVideoFill } from "react-icons/bs";
import { BiShow, BiHide } from "react-icons/bi";
import { BackgroundButtonTray } from "./BackgroundButtonTray";

export const CameraButtonTray = ({
  photoAction,
  videoAction,
  drawing,
  setDrawing,
  clearDrawing,
  mode,
  showCornerCamera,
  setShowCornerCamera,
  virtualBackground,
  setVirtualBackground,
  backgroundImage,
  setBackgroundImage,
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
      <BackgroundButtonTray
        mode={mode}
        showCornerCamera={showCornerCamera}
        virtualBackground={virtualBackground}
        setVirtualBackground={setVirtualBackground}
        backgroundImage={backgroundImage}
        setBackgroundImage={setBackgroundImage}
      ></BackgroundButtonTray>
    </StyledButtonTray>
  );
};
