import React from "react";
import { StyledPaintMenu } from "./style";

export const PaintMenu = ({ setLineColor, lineWidth, setLineWidth }) => {
  return (
    <StyledPaintMenu>
      <label>Brush Color </label>
      <input
        type="color"
        onChange={(e) => {
          setLineColor(e.target.value);
        }}
      />
      <label>Brush Width </label>
      <input
        type="range"
        min="3"
        max="20"
        value={lineWidth}
        onChange={(e) => {
          setLineWidth(e.target.value);
        }}
      />
    </StyledPaintMenu>
  );
};
