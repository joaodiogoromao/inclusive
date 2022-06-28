import React, { useEffect, useState } from "react";

import { StyledVideo } from "./style";
import { VideoButtonTray } from "../ButtonTray/VideoButtonTray";
import { VideoEditor } from "../VideoEditor/VideoEditor";

export const Video = ({ videoRef, hasVideo, setHasVideo }) => {
  const [editing, setEditing] = useState(false);

  const closeVideo = () => {
    setHasVideo(false);
  };

  useEffect(() => {
    videoRef.current?.load();
  }, [videoRef]);

  const downloadVideo = () => {
    let url = videoRef.current;
    let a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    a.href = url;
    a.download = "test.webm";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <StyledVideo visible={hasVideo}>
        <div>
          <video controls key={videoRef.current} >
            <source src={videoRef.current} type={"video/webm"} />
          </video>
          {hasVideo && editing && <VideoEditor />}
        </div>
        <VideoButtonTray
          closeAction={closeVideo}
          editing={editing}
          setEditing={setEditing}
        />
      </StyledVideo>
    </>
  );
};
