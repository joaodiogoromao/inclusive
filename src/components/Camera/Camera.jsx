import React, { useEffect, useRef, useState } from "react";

import { StyledCamera } from "./style";
import { CameraButtonTray } from "../ButtonTray/CameraButtonTray";
import { RecorderButtonTray } from "../ButtonTray/RecorderButtonTray";
import { Paint } from "../Paint/Paint";

export const Camera = ({
  cameraRef,
  photoRef,
  videoRef,
  setHasPhoto,
  setHasVideo,
}) => {
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recordedChunks, setRecordedChunks] = useState([]);

  const [recording, _setRecording] = useState(false);
  const recordingRef = useRef(recording);
  const setRecording = (val) => {
    recordingRef.current = val;
    _setRecording(val);
  };

  const [drawing, setDrawing] = useState(false);

  const drawingRef = useRef(null);

  useEffect(() => {
    const getVideo = () => {
      getStream()
        .then((stream) => {
          let video = cameraRef.current;
          video.srcObject = stream;
          video.play();
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const triggerRecording = () => {
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0 && recordingRef.current) {
          setRecordedChunks((recorded) => [...recorded, event.data]);
        }
      };
      mediaRecorder.start(10);
      setRecording(true);
    };

    getVideo();
    if (mediaRecorder) triggerRecording();
  }, [cameraRef, mediaRecorder]);

  const getStream = () => {
    return navigator.mediaDevices.getUserMedia({
      video: {
        width: 1920,
        height: 1080,
      },
    });
  };

  const takePhoto = () => {
    const width = 1280;
    const height = width / (16 / 9);

    let video = cameraRef.current;
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

  const stopRecording = () => {
    mediaRecorder.stop();

    let buffer = new Blob(recordedChunks);
    videoRef.current = URL.createObjectURL(buffer);
    setHasVideo(true);
  };

  const closeRecording = () => {
    setRecording(false);
    setRecordedChunks([]);
  };

  const download = () => {
    let url = videoRef.current;
    let a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    a.href = url;
    a.download = "test.webm";
    a.click();
    URL.revokeObjectURL(url);
  };

  const clearDrawing = () => {
    const canvas = drawingRef.current;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <StyledCamera>
      <video ref={cameraRef} style={{ position: "absolute" }}></video>
      <Paint drawing={drawing} canvasRef={drawingRef} />
      {recordingRef.current ? (
        <RecorderButtonTray
          closeAction={closeRecording}
          stopAction={stopRecording}
          drawing={drawing}
          setDrawing={setDrawing}
          clearDrawing={clearDrawing}
        />
      ) : (
        <CameraButtonTray
          photoAction={takePhoto}
          videoAction={startRecording}
          drawing={drawing}
          setDrawing={setDrawing}
          clearDrawing={clearDrawing}
        />
      )}
    </StyledCamera>
  );
};
