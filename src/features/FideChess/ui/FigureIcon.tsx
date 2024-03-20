import React from "react";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { styled } from "@mui/joy";
import { SxProps } from "@mui/joy/styles/types";
import { ChessColors } from "entities/CommonModels";

type FigureIconProps = {
  icon: IconDefinition;
  color: "white" | "black";
  sx: SxProps;
};

export const FigureIcon = ({ icon, color, sx }: FigureIconProps) => {
  const FigureIconStyled = styled(FontAwesomeIcon)({});

  return (
    <FigureIconStyled
      icon={icon}
      sx={{
        color: color === ChessColors.WHITE ? "white" : "black",
        ...sx,
      }}
      style={{ boxSizing: "border-box" }}
    />
  );
};
