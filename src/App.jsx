import React, { useRef, useState } from "react";

import { Camera } from "./components/Camera/Camera";
import { Photo } from "./components/Photo/Photo";
import { Video } from "./components/Video/Video";

function App() {
  const cameraRef = useRef(null);
  const photoRef = useRef(null);
  const videoRef = useRef(null);

  const [hasPhoto, setHasPhoto] = useState(false);
  const [hasVideo, setHasVideo] = useState(false);

  return (
    <div className="App">
      <Camera
        cameraRef={cameraRef}
        photoRef={photoRef}
        videoRef={videoRef}
        setHasPhoto={setHasPhoto}
        setHasVideo={setHasVideo}
      />
      <Photo
        photoRef={photoRef}
        hasPhoto={hasPhoto}
        setHasPhoto={setHasPhoto}
      />
      <Video
        videoRef={videoRef}
        hasVideo={hasVideo}
        setHasVideo={setHasVideo}
      />
    </div>
  );
}

export default App;
