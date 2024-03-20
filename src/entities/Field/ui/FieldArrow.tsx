import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons/faChevronRight";
import { faMinus } from "@fortawesome/free-solid-svg-icons/faMinus";
import { styled } from "@mui/joy";
import { SxProps } from "@mui/joy/styles/types";

type FieldArrowProps = {
  fieldXSizePx: number;
  fieldYSizePx: number;
  fieldXSize: number;
  fieldYSize: number;
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  sx?: SxProps;
};

const FieldArrow = ({
  fieldXSizePx,
  fieldYSizePx,
  fieldXSize,
  fieldYSize,
  fromX,
  toX,
  fromY,
  toY,
  sx = {},
}: FieldArrowProps) => {
  const cellXSizePx = fieldXSizePx / fieldXSize;
  const cellYSizePx = fieldYSizePx / fieldYSize;

  const arrowRotation = Math.atan2(toY - fromY, toX - fromX);

  const FontAwesomeIconStyled = styled(FontAwesomeIcon)({});

  return (
    <>
      <FontAwesomeIconStyled
        icon={faChevronRight}
        preserveAspectRatio="xMinYMid meet"
        sx={{
          position: "absolute",
          left: (fieldXSizePx / fieldXSize) * toX + cellXSizePx / 2,
          top: cellYSizePx * toY + cellYSizePx / 2,
          width: cellXSizePx,
          height: cellYSizePx,
          transform: `translate(-50%, -50%) rotate(${arrowRotation}rad)`,
          ...sx,
        }}
      />
      <FontAwesomeIconStyled
        icon={faMinus}
        preserveAspectRatio={"none"}
        sx={{
          position: "absolute",
          left: cellXSizePx * Math.abs((fromX + toX) / 2) + cellXSizePx / 2,
          top: cellYSizePx * Math.abs((fromY + toY) / 2) + cellYSizePx / 2,
          width:
            cellXSizePx *
            Math.sqrt(
              Math.pow(Math.abs(fromX - toX), 2) +
                Math.pow(Math.abs(fromY - toY), 2),
            ),
          height: cellYSizePx,
          transform: `translate(-50%, -50%) rotate(${arrowRotation}rad)`,
          transformOrigin: "50% 50%",
          ...sx,
        }}
      />
    </>
  );
};

export default FieldArrow;
