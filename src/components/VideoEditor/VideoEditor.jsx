import React, { useRef, useEffect } from "react";

import noUiSlider from "nouislider";
import "nouislider/dist/nouislider.css";

export const VideoEditor = ({ videoSrc }) => {
  const sliderRef = useRef(null);

  useEffect(() => {
    const options = {
      start: [20, 80],
      connect: true,
      range: {
        min: 0,
        max: 100,
      },
    };

    if (!sliderRef.current.noUiSlider)
      noUiSlider.create(sliderRef.current, options);
    else sliderRef.current.noUiSlider.updateOptions(options, true);
  }, []);

  return <div id="slider" ref={sliderRef}></div>;
};
