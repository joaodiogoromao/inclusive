import React, { useEffect, useRef, useState } from "react";
import * as tf from "@tensorflow/tfjs-core";
import * as bodyPix from "@tensorflow-models/body-pix";
import "@tensorflow/tfjs-backend-cpu";
import { setWasmPaths } from "@tensorflow/tfjs-backend-wasm";

import { StyledCamera } from "./style";
import { CameraButtonTray } from "../ButtonTray/CameraButtonTray";
import { RecorderButtonTray } from "../ButtonTray/RecorderButtonTray";
import { Paint } from "../Paint/Paint";
import { ModeSelectionButtonTray } from "../ButtonTray/ModeSelectionButtonTray";

import { buildRecon, wrapText } from "./speechToText";

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

  const [model, _setModel] = useState(null);
  const modelRef = useRef(model);
  const setModel = (val) => {
    modelRef.current = val;
    _setModel(val);
  };

  const [virtualBackground, _setVirtualBackground] = useState(false);
  const virtualBackgroundRef = useRef(virtualBackground);
  const setVirtualBackground = (val) => {
    virtualBackgroundRef.current = val;
    _setVirtualBackground(val);
  };

  const [backgroundImage, _setBackgroundImage] = useState(false);
  const backgroundImageRef = useRef(backgroundImage);
  const setBackgroundImage = (val) => {
    backgroundImageRef.current = val;
    _setBackgroundImage(val);
  };

  const [showCornerCamera, _setShowCornerCamera] = useState(true);
  const showCornerCameraRef = useRef(showCornerCamera);
  const setShowCornerCamera = (val) => {
    showCornerCameraRef.current = val;
    _setShowCornerCamera(val);
  };

  const [recording, _setRecording] = useState(false);
  const recordingRef = useRef(recording);
  const setRecording = (val) => {
    recordingRef.current = val;
    _setRecording(val);
  };

  const [drawSpeech, _setDrawSpeech] = useState(false);
  const drawSpeechRef = useRef(drawSpeech);
  const setDrawSpeech = (val) => {
    drawSpeechRef.current = val;
    _setDrawSpeech(val);
  };

  const [transcript, _setTranscript] = useState("");
  const transcriptRef = useRef(transcript);
  const setTranscript = (val) => {
    transcriptRef.current = val;
    _setTranscript(val);
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
  const virtualCanvasRef = useRef(null);

  const drawWhiteBackground = () => {
    fillRect(videoCanvasRef.current);
  };

  const fillRect = (canvas) => {
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const drawOnCanvas = (ctx, photo = false) => {
    if (modeRef.current === 0) {
      drawCamera(
        ctx,
        showCornerCameraRef.current,
        virtualBackgroundRef.current
      );
      ctx.drawImage(drawingRef.current, 0, 0, width, height);
    } else if (modeRef.current === 1) {
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, width, height);
      drawCamera(
        ctx,
        showCornerCameraRef.current,
        virtualBackgroundRef.current
      );
      ctx.drawImage(drawingRef.current, 0, 0, width, height);
    } else if (modeRef.current === 2) {
      ctx.drawImage(screenRef.current, 0, 0, width, height);
      drawCamera(
        ctx,
        showCornerCameraRef.current,
        virtualBackgroundRef.current
      );
      ctx.drawImage(drawingRef.current, 0, 0, width, height);
    }

    if (transcriptRef.current !== "" && !photo && drawSpeechRef.current)
      drawTranscript(ctx);
  };

  const drawCamera = (ctx, cornerCamera, virtualBackground) => {
    const cornerCondition = () => cornerCamera && modeRef.current !== 0;
    const scaled = (n) => n / 3.5;

    const posX = cornerCondition() ? (2 / 3) * width : 0;
    const posY = cornerCondition() ? (2 / 3) * height : 0;
    const imageWidth = cornerCondition() ? scaled(width) : width;
    const imageHeight = cornerCondition() ? scaled(height) : height;

    if (!virtualBackground && (modeRef.current === 0 || cornerCamera))
      ctx.drawImage(cameraRef.current, posX, posY, imageWidth, imageHeight);
    else if (virtualBackground && (modeRef.current === 0 || cornerCamera)) {
      if (modelRef.current === null || !cameraRef.current) return;

      modelRef.current
        .segmentPerson(cameraRef.current, {
          flipHorizontal: false,
          internalResolution: "low",
          segmentationThreshold: 0.7,
        })
        .then((segmentation) => {
          const maskBackground = true;
          const backgroundDarkeningMask = bodyPix.toMask(
            segmentation,
            maskBackground
          );

          const oldGCO = ctx.globalCompositeOperation;
          ctx.clearRect(posX, posY, imageWidth, imageHeight);
          // ctx.scale(scaled(1), scaled(1));
          // ctx.putImageData(backgroundDarkeningMask, scaled(posX), scaled(posY));
          // ctx.scale(1, 1);

          createImageBitmap(backgroundDarkeningMask).then((imgBitmap) => {
            ctx.drawImage(imgBitmap, posX, posY, imageWidth, imageHeight);
          });

          ctx.globalCompositeOperation = "source-out";
          ctx.drawImage(cameraRef.current, posX, posY, imageWidth, imageHeight);
          ctx.globalCompositeOperation = oldGCO;
        });
    }
  };

  const drawTranscript = (ctx) => {
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.font = "50px Arial";

    let wrappedText = wrapText(
      ctx,
      transcriptRef.current,
      width / 2,
      50,
      width,
      60
    );
    wrappedText.forEach(function (item) {
      ctx.fillText(item[0], item[1], item[2]);
      ctx.strokeText(item[0], item[1], item[2]);
    });
  };

  const drawOnVideoCanvas = () => {
    const ctx = videoCanvasRef.current.getContext("2d");
    drawOnCanvas(ctx);
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
      buildRecon(setTranscript).start();
    };

    getVideo();
    if (mediaRecorder) triggerRecording();

    const loadModel = async () => {
      setWasmPaths(
        "https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-backend-wasm/wasm-out/"
      );
      tf.setBackend("wasm");
      await tf.ready();
      const model = await bodyPix.load({
        architecture: "MobileNetV1",
        outputStride: 16,
        multiplier: 0.5,
        quantBytes: 1,
      });
      setModel(model);
      console.log("loaded!");
    };
    loadModel();
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

    drawOnCanvas(ctx, true);
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
    setTranscript("");
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
      <canvas
        ref={virtualCanvasRef}
        style={{ display: "none" }}
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
          drawSpeech={drawSpeech}
          setDrawSpeech={setDrawSpeech}
          mode={mode}
          showCornerCamera={showCornerCamera}
          setShowCornerCamera={setShowCornerCamera}
        />
      ) : (
        <>
          <CameraButtonTray
            photoAction={takePhoto}
            videoAction={startRecording}
            drawing={drawing}
            setDrawing={setDrawing}
            clearDrawing={clearDrawing}
            mode={mode}
            showCornerCamera={showCornerCamera}
            setShowCornerCamera={setShowCornerCamera}
            virtualBackground={virtualBackground}
            setVirtualBackground={setVirtualBackground}
            backgroundImage={backgroundImage}
            setBackgroundImage={setBackgroundImage}
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
