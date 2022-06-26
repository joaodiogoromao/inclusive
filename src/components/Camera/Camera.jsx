import React, { useEffect, useRef, useState } from "react";

import { StyledCamera } from "./style";
import { CameraButtonTray } from "../ButtonTray/CameraButtonTray";
import { RecorderButtonTray } from "../ButtonTray/RecorderButtonTray";
import { Paint } from "../Paint/Paint";
import { ModeSelectionButtonTray } from "../ButtonTray/ModeSelectionButtonTray";

const width = 1280;
const height = 720;

export const Camera = ({
  cameraRef,
  photoRef,
  videoRef,
  setHasPhoto,
  setHasVideo,
}) => {
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [drawing, setDrawing] = useState(false);

  const [recording, _setRecording] = useState(false);
  const recordingRef = useRef(recording);
  const setRecording = (val) => {
    recordingRef.current = val;
    _setRecording(val);
  };

  const [mode, _setMode] = useState(0); // possible modes: 0: camera, 1: whiteBoard, 2: screen
  const modeRef = useRef(mode);
  const setMode = (newMode) => {
    modeRef.current = newMode;
    _setMode(newMode);

    if (newMode === 1) {
      drawWhiteBackground();
    } else if (newMode === 2) {
      getScreenStream().then((stream) => {
        let video = screenRef.current;
        video.srcObject = stream;
        video.play();
      });
      clearDrawing();
    }
  };

  const drawingRef = useRef(null);
  const videoCanvasRef = useRef(null);
  const screenRef = useRef(null);

  const drawWhiteBackground = () => {
    fillRect(videoCanvasRef.current);
  };

  const fillRect = (canvas) => {
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const drawOnCanvas = (ctx) => {
    if (modeRef.current === 0) {
      ctx.drawImage(cameraRef.current, 0, 0, width, height);
      ctx.drawImage(drawingRef.current, 0, 0, width, height);
    } else if (modeRef.current === 1) {
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, width, height);
      ctx.drawImage(drawingRef.current, 0, 0, width, height);
    } else if (modeRef.current === 2) {
      ctx.drawImage(screenRef.current, 0, 0, width, height);
      ctx.drawImage(
        cameraRef.current,
        (2 / 3) * width,
        (2 / 3) * height,
        width / 3.5,
        height / 3.5
      );
      ctx.drawImage(drawingRef.current, 0, 0, width, height);
    }
  };

  const drawOnVideoCanvas = () => {
    const width = 1280;
    const height = width / (16 / 9);

    const ctx = videoCanvasRef.current.getContext("2d");
    drawOnCanvas(ctx, width, height);
  };

  useEffect(() => {
    const getVideo = () => {
      getCameraStream()
        .then((stream) => {
          let video = cameraRef.current;
          video.srcObject = stream;
          video.play();

          video.addEventListener("play", () => {
            setInterval(drawOnVideoCanvas, 10);
          });
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

  const getCameraStream = () => {
    return navigator.mediaDevices.getUserMedia({
      video: {
        width: 1920,
        height: 1080,
      },
    });
  };

  const getScreenStream = () => {
    return navigator.mediaDevices.getDisplayMedia({
      video: {
        width: 1920,
        height: 1080,
      },
    });
  };

  const takePhoto = () => {
    let photo = photoRef.current;
    let ctx = photo.getContext("2d");

    photo.width = width;
    photo.height = height;

    drawOnCanvas(ctx, width, height);
    setHasPhoto(true);
  };

  const startRecording = () => {
    const options = { mimeType: "video/webm;codecs=vp9", audio: true };
    const stream = videoCanvasRef.current.captureStream(50);

    const audioStreamOptions = {
      mimeType: "video/webm;codecs=vp9",
      audio: {
        deviceId: "",
      },
    };

    const audioStreamPromise =
      navigator.mediaDevices.getUserMedia(audioStreamOptions);

    audioStreamPromise.then((audioStream) => {
      for (const track of audioStream.getTracks()) {
        console.log("adding audio track");
        stream.addTrack(track);
      }

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

  const clearDrawing = () => {
    clearRect(drawingRef.current);
  };

  const clearRect = (canvas) => {
    const ctx = canvas.getContext("2d");
    ctx.backgroundImage = "linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <StyledCamera>
      <video ref={cameraRef} style={{ display: "none" }}></video>
      <video ref={screenRef} style={{ display: "none" }}></video>
      <canvas
        ref={videoCanvasRef}
        style={{ position: "absolute" }}
        width={`${width}px`}
        height={`${height}px`}
      ></canvas>
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
        <>
          <CameraButtonTray
            photoAction={takePhoto}
            videoAction={startRecording}
            drawing={drawing}
            setDrawing={setDrawing}
            clearDrawing={clearDrawing}
          />
          <ModeSelectionButtonTray
            mode={mode}
            setMode={setMode}
          ></ModeSelectionButtonTray>
        </>
      )}
    </StyledCamera>
  );
};
