import React from "react";

import { Button } from "../Button/Button";
import { StyledModeSelection } from "./style";

import { FaPaintBrush, FaPhotoVideo } from "react-icons/fa";
import { MdScreenShare } from "react-icons/md";

export const ModeSelectionButtonTray = () => {
  return (
    <StyledModeSelection>
      <Button action={() => {}} content={<FaPhotoVideo />}></Button>
      <Button action={() => {}} content={<FaPaintBrush />}></Button>
      <Button action={() => {}} content={<MdScreenShare />}></Button>
    </StyledModeSelection>
  );
};
