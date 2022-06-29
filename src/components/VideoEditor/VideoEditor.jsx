import React, { useRef, useEffect } from "react";

import noUiSlider from "nouislider";
import "nouislider/dist/nouislider.css";

export const VideoEditor = ({ videoPlayerRef, recordedChunks, setEditingSlice }) => {
  const sliderRef = useRef(null);

  useEffect(() => {
    const options = {
      start: [0, recordedChunks.length],
      connect: true,
      step: 1,
      range: {
        min: 0,
        max: recordedChunks.length,
      },
    };

    if (!sliderRef.current.noUiSlider) {
      noUiSlider.create(sliderRef.current, options);
      sliderRef.current.noUiSlider.on("set", ([start, end]) => {

        setEditingSlice([parseInt(start), parseInt(end)]);
        videoPlayerRef.current.load();

        // const editingChunks = recordedChunks.slice(startPos, endPos + 1);
        // console.log(editingChunks);

        // const buffer = new Blob(editingChunks);
        // videoRef.current = URL.createObjectURL(buffer);
      });
    } else sliderRef.current.noUiSlider.updateOptions(options, true);
  }, []);

  return <div id="slider" ref={sliderRef}></div>;
};
