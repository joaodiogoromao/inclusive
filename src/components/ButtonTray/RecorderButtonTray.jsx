import React from "react";

import { Button } from "../Button/Button";
import { DrawingButtonTray } from "./DrawingButtonTray";
import { StyledButtonTray } from "./style";

import { IoStop } from "react-icons/io5";
import { BsXLg } from "react-icons/bs";
import { MdSubtitles, MdSubtitlesOff } from "react-icons/md";
import { BiShow, BiHide } from "react-icons/bi";

export const RecorderButtonTray = ({
  stopAction,
  closeAction,
  drawing,
  setDrawing,
  clearDrawing,
  drawSpeech,
  setDrawSpeech,
  mode,
  showCornerCamera,
  setShowCornerCamera,
}) => {
  return (
    <StyledButtonTray>
      <Button action={stopAction} content={<IoStop />}></Button>
      {drawSpeech ? (
        <Button
          action={() => setDrawSpeech(false)}
          content={<MdSubtitles />}
          filled={true}
        ></Button>
      ) : (
        <Button
          action={() => setDrawSpeech(true)}
          content={<MdSubtitlesOff />}
        ></Button>
      )}

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
      <Button action={closeAction} content={<BsXLg />}></Button>
    </StyledButtonTray>
  );
};
