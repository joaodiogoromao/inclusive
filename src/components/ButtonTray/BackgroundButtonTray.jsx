import React from "react";

import { Button } from "../Button/Button";

import { BiImageAlt, BiImageAdd } from "react-icons/bi";

export const BackgroundButtonTray = ({
  mode,
  showCornerCamera,
  virtualBackground,
  setVirtualBackground,
  backgroundImage,
  setBackgroundImage,
}) => {
  const importImage = () => {};

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
            <Button
              action={() => importImage()}
              content={<BiImageAdd />}
            ></Button>
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
