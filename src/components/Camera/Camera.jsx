import React, { useEffect } from "react";

import { StyledCamera } from "./style";
import { Button } from "../Button/Button";

export const Camera = ({ videoRef, photoRef, hasPhoto, setHasPhoto }) => {
  useEffect(() => {
    getVideo();
  }, [videoRef]);

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: {
          width: 1920,
          height: 1080,
        },
      })
      .then((stream) => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const takePhoto = () => {
    const width = 1280;
    const height = width / (16 / 9);

    let video = videoRef.current;
    let photo = photoRef.current;
    let ctx = photo.getContext("2d");

    photo.width = width;
    photo.height = height;

    ctx.drawImage(video, 0, 0, width, height);
    setHasPhoto(true);
  };

  return (
    <StyledCamera>
      <video ref={videoRef}></video>
      <Button action={takePhoto} content={"SNAP"} />
    </StyledCamera>
  );
};
