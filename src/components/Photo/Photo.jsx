import React from "react";

import { StyledPhoto } from "./style";
import { Button } from "../Button/Button";

export const Photo = ({ photoRef, hasPhoto, setHasPhoto }) => {
  const closePhoto = () => {
    let photo = photoRef.current;
    let ctx = photo.getContext("2d");
    ctx.clearRect(0, 0, photo.width, photo.height);

    setHasPhoto(false);
  };

  return (
    <StyledPhoto visible={hasPhoto}>
      <canvas ref={photoRef}></canvas>
      <Button action={closePhoto} content={"Close"} />
    </StyledPhoto>
  );
};
