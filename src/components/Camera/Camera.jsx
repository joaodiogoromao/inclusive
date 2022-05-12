import React, { useEffect, useState } from "react";

import { StyledCamera } from "./style";
import { CameraButtonTray } from "../ButtonTray/CameraButtonTray";
import { RecorderButtonTray } from "../ButtonTray/RecorderButtonTray";

export const Camera = ({ videoRef, photoRef, setHasPhoto }) => {
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recording, setRecording] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);

  useEffect(() => {
    getVideo();
  }, [videoRef]);

  useEffect(() => {
    if (mediaRecorder) triggerRecording();
  }, [mediaRecorder]);

  const getStream = () => {
    return navigator.mediaDevices.getUserMedia({
      video: {
        width: 1920,
        height: 1080,
      },
    });
  };

  const getVideo = () => {
    getStream()
      .then((stream) => {
        console.log(stream);
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

  const startRecording = () => {
    const options = { mimeType: "video/webm;codecs=vp9" };
    getStream().then((stream) => {
      setMediaRecorder(new MediaRecorder(stream, options));
    });
  };

  const triggerRecording = () => {
    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0)
        setRecordedChunks((recordedChunks) => [...recordedChunks, event.data]);
    };
    mediaRecorder.start(10);
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorder.stop();
  };

  return (
    <StyledCamera>
      <video ref={videoRef}></video>
      {recording ? (
        <RecorderButtonTray
          pauseAction={() => {
            console.log(recordedChunks);
          }}
          closeAction={() => {}}
          stopAction={stopRecording}
        />
      ) : (
        <CameraButtonTray
          photoAction={takePhoto}
          videoAction={startRecording}
        />
      )}
    </StyledCamera>
  );
};
