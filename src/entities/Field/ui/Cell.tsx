import { Sheet } from "@mui/joy";
import { SxProps } from "@mui/joy/styles/types";
import React from "react";

type CellProps = {
  children: React.ReactNode | React.ReactNode[];
  sx?: SxProps | undefined;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};

export const Cell = ({ children, sx, onClick }: CellProps) => {
  return (
    <Sheet
      onClick={onClick}
      sx={{
        position: "relative",
        height: "100%",
        width: "100%",
        ...sx,
      }}
    >
      {(Array.isArray(children) ? children : [children]).map((child, index) => (
        <Sheet
          key={index}
          sx={{
            position: "absolute",
            height: "100%",
            width: "100%",
            backgroundColor: "transparent",
          }}
        >
          {child}
        </Sheet>
      ))}
    </Sheet>
  );
};
