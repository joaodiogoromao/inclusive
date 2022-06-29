import React, { useEffect, useRef, useState } from "react";

import { StyledVideo } from "./style";
import { VideoButtonTray } from "../ButtonTray/VideoButtonTray";
import { VideoEditor } from "../VideoEditor/VideoEditor";

export const Video = ({
  videoRef,
  hasVideo,
  setHasVideo,
  recordedChunks,
}) => {
  const [editing, setEditing] = useState(false);
  const [editingSlice, setEditingSlice] = useState([]);
  const videoPlayerRef = useRef(null);

  const closeVideo = () => {
    setHasVideo(false);
    resetEditing();
  };

  const save = () => {
    if (!editingSlice || editingSlice === []) return;
    const start = editingSlice[0];
    const end = editingSlice[1];

    const slicedChunks = recordedChunks.slice(start, end + 1);

    const buffer = new Blob(slicedChunks);
    downloadVideo(URL.createObjectURL(buffer));
  };

  const resetEditing = () => {
    setEditingSlice([]);
  };

  useEffect(() => {
    videoRef.current?.load();
  }, [videoRef]);

  const downloadVideo = (url = null) => {
    if (!url) url = videoRef.current;
    let a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    a.href = url;
    a.download = "video.webm";
    a.click();
    URL.revokeObjectURL(url);
  };

  const getVideoURL = () => {
    return editingSlice && editingSlice.length !== 0
      ? videoRef.current + `#t=${editingSlice[0]},${editingSlice[1]}`
      : videoRef.current;
  };

  return (
    <>
      <StyledVideo visible={hasVideo}>
        <div>
          <video controls key={videoRef.current} ref={videoPlayerRef}>
            <source src={getVideoURL()} type={"video/webm"} />
          </video>
          {hasVideo && editing && (
            <VideoEditor
              videoPlayerRef={videoPlayerRef}
              recordedChunks={recordedChunks}
              setEditingSlice={setEditingSlice}
            />
          )}
        </div>
        <VideoButtonTray
          closeAction={closeVideo}
          editing={editing}
          setEditing={setEditing}
          resetEditing={resetEditing}
          save={save}
        />
      </StyledVideo>
    </>
  );
};
