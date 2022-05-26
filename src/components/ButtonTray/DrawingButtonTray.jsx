import React from "react";

import { Button } from "../Button/Button";

import {
  BsPencil,
  BsPencilFill,
  BsEraserFill
} from "react-icons/bs";

export const DrawingButtonTray = ({
  drawing,
  setDrawing,
  clearDrawing,
}) => {
  return (
    <>
      {drawing ? (
        <>
          <Button
            action={() => setDrawing(false)}
            content={<BsPencilFill />}
          ></Button>
          <Button action={clearDrawing} content={<BsEraserFill />}></Button>
        </>
      ) : (
        <Button action={() => setDrawing(true)} content={<BsPencil />}></Button>
      )}
    </>
  );
};
