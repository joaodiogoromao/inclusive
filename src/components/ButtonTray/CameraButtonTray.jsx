import React from "react";

import { Button } from "../Button/Button";
import { StyledButtonTray } from "./style";

import { BsFillCameraFill, BsFillCameraVideoFill } from "react-icons/bs";

export const CameraButtonTray = ({ photoAction, videoAction }) => {
  return (
    <StyledButtonTray>
      <Button action={photoAction} content={<BsFillCameraFill />}></Button>
      <Button action={videoAction} content={<BsFillCameraVideoFill />}></Button>
    </StyledButtonTray>
  );
};
