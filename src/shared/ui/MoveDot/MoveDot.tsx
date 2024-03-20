import React from "react";
import { faCircle } from "@fortawesome/free-solid-svg-icons/faCircle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { styled } from "@mui/joy";
import { SxProps } from "@mui/joy/styles/types";

type MoveDotProps = {
  sx: SxProps;
};

const MoveDot = ({ sx }: MoveDotProps) => {
  const FontAwesomeIconStyled = styled(FontAwesomeIcon)({});
  return (
    <FontAwesomeIconStyled
      icon={faCircle}
      sx={sx}
      style={{ boxSizing: "border-box" }}
    />
  );
};

export default MoveDot;
