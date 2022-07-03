import React, { useEffect } from "react";

import { StyledVideo } from "./style";
import { PhotoButtonTray } from "../ButtonTray/PhotoButtonTray";

export const Video = ({ videoRef, hasVideo, setHasVideo }) => {
  const closeVideo = () => {
    setHasVideo(false);
  };

  const downloadVideo = () => {
    let url = videoRef.current;
    let a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    a.href = url;
    a.download = "video.webm";
    a.click();
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    videoRef.current?.load();
  }, [videoRef]);

  return (
    <StyledVideo visible={hasVideo}>
      <video controls key={videoRef.current} style={{ width: "80%" }}>
        <source src={videoRef.current} type={"video/webm"} />
      </video>
      <PhotoButtonTray closeAction={closeVideo} downloadAction={downloadVideo} />
    </StyledVideo>
  );
};
