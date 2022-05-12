import React from "react";

import { StyledPhoto } from "./style";
import { Button } from "../Button/Button";

export const Video = ({ photoRef, hasPhoto, setHasPhoto }) => {
  const recordedChunks = [];

  let options = { mimeType: "video/webm;codecs=vp9" };
  mediaRecorder = new MediaRecorder(stream, options);
  mediaRecorder.ondataavailable = handleDataAvailable;
  mediaRecorder.start();

  const handleDataAvailable = (event) => {
    if (event.data.size > 0) recordedChunks.push(event.data);
  };

  return (
    <StyledPhoto visible={hasPhoto}>
      <canvas ref={photoRef}></canvas>
      <Button action={closePhoto} content={"Close"} />
    </StyledPhoto>
  );
};
