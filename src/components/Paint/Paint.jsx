import { useEffect, useRef, useState } from "react";
import { PaintMenu } from "../PaintMenu/PaintMenu";
import { StyledPaint } from "./style";

export const Paint = ({ drawing, canvasRef }) => {
  const ctxRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lineWidth, setLineWidth] = useState(5);
  const [lineColor, setLineColor] = useState("black");

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = lineWidth;
    ctxRef.current = ctx;
  }, [lineColor, lineWidth, canvasRef]);

  const startDrawing = (e) => {
    if (!drawing) return;
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    setIsDrawing(true);
  };

  const endDrawing = () => {
    ctxRef.current.closePath();
    setIsDrawing(false);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    ctxRef.current.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctxRef.current.stroke();
  };

  const displayMenu = () => {
    if (drawing) {
      return (
        <PaintMenu
          setLineColor={setLineColor}
          setLineWidth={setLineWidth}
          lineWidth={lineWidth}
        />
      );
    }
  };

  return (
    <StyledPaint>
      <div className="draw-area">
        {displayMenu()}
        <canvas
          onMouseDown={startDrawing}
          onMouseUp={endDrawing}
          onMouseMove={draw}
          ref={canvasRef}
          width={`1280px`}
          height={`720px`}
        />
      </div>
    </StyledPaint>
  );
};
