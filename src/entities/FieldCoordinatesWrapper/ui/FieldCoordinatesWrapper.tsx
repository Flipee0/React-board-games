import React from "react";
import { observer } from "mobx-react-lite";
import { Sheet, Typography } from "@mui/joy";

type FieldCoordinatesWrapperProps = {
  children: React.ReactNode;
  top: string[];
  bottom: string[];
  left: string[];
  right: string[];
};

export const FieldCoordinatesWrapper = observer(
  ({ children, top, bottom, left, right }: FieldCoordinatesWrapperProps) => {
    return (
      <Sheet
        sx={{
          display: "grid",
          gridTemplateRows: "auto 1fr auto",
          gridTemplateColumns: "auto 1fr auto",
        }}
      >
        <div></div>
        <Sheet
          sx={{
            display: "grid",
            gridTemplateColumns: `repeat(${top.length}, minmax(0, 1fr))`,
            justifyItems: "center",
          }}
        >
          {top.map((coordinate, index) => (
            <Typography key={index}>{coordinate}</Typography>
          ))}
        </Sheet>
        <div></div>
        <Sheet
          sx={{
            display: "grid",
            gridTemplateRows: `repeat(${left.length}, minmax(0, 1fr))`,
            alignItems: "center",
            paddingX: "0.5em",
          }}
        >
          {left.map((coordinate, index) => (
            <Typography key={index}>{coordinate}</Typography>
          ))}
        </Sheet>
        <Sheet
          sx={{
            position: "relative",
            width: "100%",
          }}
        >
          {children}
        </Sheet>
        <Sheet
          sx={{
            display: "grid",
            gridTemplateRows: `repeat(${right.length}, minmax(0, 1fr))`,
            alignItems: "center",
            paddingX: "0.5em",
          }}
        >
          {right.map((coordinate, index) => (
            <Typography key={index}>{coordinate}</Typography>
          ))}
        </Sheet>
        <div></div>
        <Sheet
          sx={{
            display: "grid",
            gridTemplateColumns: `repeat(${bottom.length}, minmax(0, 1fr))`,
            justifyItems: "center",
          }}
        >
          {bottom.map((coordinate, index) => (
            <Typography key={index}>{coordinate}</Typography>
          ))}
        </Sheet>
        <div></div>
      </Sheet>
    );
  },
);
