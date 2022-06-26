import React from "react";

import { Button } from "../Button/Button";
import { StyledModeSelection } from "./style";

import { FaPaintBrush, FaPhotoVideo } from "react-icons/fa";
import { MdScreenShare } from "react-icons/md";

export const ModeSelectionButtonTray = ({ mode, setMode }) => {
  const modeSelectionItem = (targetMode, icon) => {
    return mode === targetMode ? (
      <Button
        action={() => setMode(targetMode)}
        content={icon}
        filled={true}
      ></Button>
    ) : (
      <Button action={() => setMode(targetMode)} content={icon}></Button>
    );
  };

  return (
    <StyledModeSelection>
      {modeSelectionItem(0, <FaPhotoVideo />)}
      {modeSelectionItem(1, <FaPaintBrush />)}
      {modeSelectionItem(2, <MdScreenShare />)}
    </StyledModeSelection>
  );
};
