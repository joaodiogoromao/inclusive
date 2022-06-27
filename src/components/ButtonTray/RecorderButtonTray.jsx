import React from "react";

import { Button } from "../Button/Button";
import { DrawingButtonTray } from "./DrawingButtonTray";
import { StyledButtonTray } from "./style";

import { IoStop } from "react-icons/io5";
import { BsXLg } from "react-icons/bs";
import { MdSubtitles, MdSubtitlesOff } from "react-icons/md";

export const RecorderButtonTray = ({
  stopAction,
  closeAction,
  drawing,
  setDrawing,
  clearDrawing,
  drawSpeech,
  setDrawSpeech,
}) => {
  return (
    <StyledButtonTray>
      <Button action={stopAction} content={<IoStop />}></Button>
      {drawSpeech ? (
        <Button
          action={() => setDrawSpeech(false)}
          content={<MdSubtitles />}
        ></Button>
      ) : (
        <Button
          action={() => setDrawSpeech(true)}
          content={<MdSubtitlesOff />}
          filled={true}
        ></Button>
      )}

      <DrawingButtonTray
        drawing={drawing}
        setDrawing={setDrawing}
        clearDrawing={clearDrawing}
      ></DrawingButtonTray>
      <Button action={closeAction} content={<BsXLg />}></Button>
    </StyledButtonTray>
  );
};
