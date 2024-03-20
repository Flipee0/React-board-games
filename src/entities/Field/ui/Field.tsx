import React, { useRef } from "react";
import useAspectRatio from "shared/hooks/useAspectRatio";
import FieldArrow from "./FieldArrow";
import { Sheet } from "@mui/joy";
import { SxProps } from "@mui/joy/styles/types";

type FieldProps = {
  children: React.ReactNode[];
  xSize: number;
  ySize: number;
  arrows?: {
    fromX: number;
    fromY: number;
    toX: number;
    toY: number;
    sx?: SxProps;
  }[];
};

export const Field = ({ children, xSize, ySize, arrows = [] }: FieldProps) => {
  const fieldRef = useRef<HTMLDivElement>(null);
  const [xSizePx, ySizePx] = useAspectRatio(fieldRef, xSize / ySize);

  return (
    <Sheet
      ref={fieldRef}
      sx={{
        position: "relative",
        display: "grid",
        width: "100%",
        gridTemplateRows: `repeat(${xSize}, minmax(0, 1fr))`,
        gridTemplateColumns: `repeat(${ySize}, minmax(0, 1fr))`,
      }}
    >
      {children}
      {arrows.map((arrow, index) => (
        <FieldArrow
          key={index}
          fieldXSizePx={xSizePx}
          fieldYSizePx={ySizePx}
          fieldXSize={xSize}
          fieldYSize={ySize}
          fromX={arrow.fromX}
          fromY={arrow.fromY}
          toX={arrow.toX}
          toY={arrow.toY}
          sx={arrow.sx}
        />
      ))}
    </Sheet>
  );
};
