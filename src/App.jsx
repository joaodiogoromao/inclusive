import React, { useRef, useState } from "react";

import { Camera } from "./components/Camera/Camera";
import { Photo } from "./components/Photo/Photo";

function App() {
  const videoRef = useRef(null);
  const photoRef = useRef(null);

  const [hasPhoto, setHasPhoto] = useState(false);

  return (
    <div className="App">
      <Camera
        videoRef={videoRef}
        photoRef={photoRef}
        setHasPhoto={setHasPhoto}
      />
      <Photo photoRef={photoRef} hasPhoto={hasPhoto} setHasPhoto={setHasPhoto} />
    </div>
  );
}

export default App;
