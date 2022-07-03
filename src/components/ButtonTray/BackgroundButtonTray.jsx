import React, { useRef } from "react";

import { Button } from "../Button/Button";

import { BiImageAlt, BiImageAdd } from "react-icons/bi";
import { MdOutlineHideImage } from "react-icons/md";

export const BackgroundButtonTray = ({
  mode,
  showCornerCamera,
  virtualBackground,
  setVirtualBackground,
  backgroundImage,
  setBackgroundImage,
}) => {
  const inputRef = useRef(null);

  const click = () => {
    inputRef.current.click();
  };

  const importImage = (event) => {
    let img = new Image();
    const fileUploaded = event.target.files[0];
    img.src = URL.createObjectURL(fileUploaded);
    setBackgroundImage(img);
  };

  return (
    <>
      {(mode === 0 || (mode !== 0 && showCornerCamera)) &&
        (virtualBackground ? (
          <>
            <Button
              action={() => setVirtualBackground(false)}
              content={<BiImageAlt />}
              filled={true}
            ></Button>
            <Button action={click} content={<BiImageAdd />}></Button>
            {backgroundImage && (
              <Button
                action={() => setBackgroundImage(null)}
                content={<MdOutlineHideImage />}
              ></Button>
            )}
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={importImage}
            />
          </>
        ) : (
          <Button
            action={() => setVirtualBackground(true)}
            content={<BiImageAlt />}
          ></Button>
        ))}
    </>
  );
};
