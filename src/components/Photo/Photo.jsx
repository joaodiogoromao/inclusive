import React from "react";

import { StyledPhoto } from "./style";
import { PhotoButtonTray } from "../ButtonTray/PhotoButtonTray";

export const Photo = ({ photoRef, hasPhoto, setHasPhoto }) => {
  const closePhoto = () => {
    let photo = photoRef.current;
    let ctx = photo.getContext("2d");
    ctx.clearRect(0, 0, photo.width, photo.height);

    setHasPhoto(false);
  };

  const downloadPhoto = () => {
    let a = document.createElement("a");
    a.download = "filename.png";
    a.href = photoRef.current.toDataURL();
    a.click();
  };

  return (
    <StyledPhoto visible={hasPhoto}>
      <canvas ref={photoRef}></canvas>
      <PhotoButtonTray
        closeAction={closePhoto}
        downloadAction={downloadPhoto}
      />
    </StyledPhoto>
  );
};
