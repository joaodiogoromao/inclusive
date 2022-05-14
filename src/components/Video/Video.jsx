import React, { useEffect } from "react";

import { StyledVideo } from "./style";
import { PhotoButtonTray } from "../ButtonTray/PhotoButtonTray";

export const Video = ({ videoRef, hasVideo, setHasVideo }) => {
  const closeVideo = () => {
    setHasVideo(false);
  };

  useEffect(() => {
    videoRef.current?.load();
  }, [videoRef]);

  return (
    <StyledVideo visible={hasVideo}>
      <video controls key={videoRef.current} style={{ width: "80%" }}>
        <source src={videoRef.current} type={"video/webm"} />
      </video>
      <PhotoButtonTray closeAction={closeVideo} />
    </StyledVideo>
  );
};
