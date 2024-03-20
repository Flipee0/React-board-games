import React from "react";
import { FigureData } from "../models/figures/BaseFigure";
import { FigureIcon } from "./FigureIcon";
import { Sheet, useTheme } from "@mui/joy";

type EatenFiguresProps = {
  figures: FigureData[];
};

export const EatenFigures = ({ figures }: EatenFiguresProps) => {
  const theme = useTheme();
  return (
    <Sheet
      sx={{
        height: "100%",
        width: "100%",
        display: "grid",
        gridTemplateRows:
          figures.length > 8
            ? "minmax(0, 1fr) minmax(0, 1fr)"
            : "minmax(0, 1fr)",
        gridTemplateColumns: "repeat(8, minmax(0, 1fr))",
        justifyItems: "center",
        gap: "0.5em 0",
        paddingY: "1px",
        bgcolor: "transparent",
      }}
    >
      {figures.map((figure, index) => (
        <FigureIcon
          key={index}
          icon={figure.icon}
          color={figure.color}
          sx={{
            height: "100%",
            stroke: theme.palette.text.primary,
            strokeWidth: "1.5em",
          }}
        />
      ))}
    </Sheet>
  );
};
