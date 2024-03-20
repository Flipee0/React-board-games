import React from "react";
import { Cell } from "entities/Field/ui/Cell";
import { FigureIcon } from "./FigureIcon";
import MoveDot from "shared/ui/MoveDot/MoveDot";
import { Field as FieldContainer } from "entities/Field";
import { FideChessGameStore } from "../models/FideChessGameStore";
import { observer } from "mobx-react-lite";
import { BaseFigure } from "../models/figures/BaseFigure";
import { FigureNames } from "../models/FigureNames";
import { useTheme } from "@mui/joy";
import { ChessColors, Position } from "entities/CommonModels";

type FieldBaseProps = {
  fideChessStore: FideChessGameStore;
  handleCellClick?: (position: Position) => void;
};

const FieldBase = observer(
  ({ fideChessStore, handleCellClick }: FieldBaseProps) => {
    const theme = useTheme();

    const getCellColor = (
      position: Position,
      figure: BaseFigure | null,
    ): string => {
      if (
        !fideChessStore.isShowedStoreActual &&
        fideChessStore.showedStateLog
      ) {
        if (
          fideChessStore.showedStateLog.stepData.from.x === position.x &&
          fideChessStore.showedStateLog.stepData.from.y === position.y
        ) {
          return "success.400";
        }
        if (
          fideChessStore.showedStateLog.stepData.to.x === position.x &&
          fideChessStore.showedStateLog.stepData.to.y === position.y
        ) {
          if (fideChessStore.showedStateLog.stepData.eatenFigure != null) {
            return "danger.solidBg";
          }
          return "success.400";
        }
      }
      if (
        figure?.data.name === FigureNames.KING &&
        fideChessStore.showedState.getIsKingInCheck(figure.data.color)
      ) {
        return "danger.solidBg";
      }
      return (position.x + position.y) % 2 === 0 ? "neutral.50" : "primary.500";
    };

    return (
      <FieldContainer
        xSize={8}
        ySize={8}
        arrows={
          fideChessStore.showedStateLog === undefined
            ? []
            : [
                {
                  fromX: fideChessStore.showedStateLog.stepData.from.x,
                  fromY: fideChessStore.showedStateLog.stepData.from.y,
                  toX: fideChessStore.showedStateLog.stepData.to.x,
                  toY: fideChessStore.showedStateLog.stepData.to.y,
                  sx: {
                    color: "gray",
                  },
                },
              ]
        }
      >
        {fideChessStore.showedState.field.map((row, rowIndex) =>
          row.map((figure, columnIndex) => (
            <Cell
              key={rowIndex + columnIndex * (rowIndex + 1)}
              onClick={
                handleCellClick
                  ? () => handleCellClick({ x: columnIndex, y: rowIndex })
                  : undefined
              }
              sx={{
                backgroundColor: getCellColor(
                  { x: columnIndex, y: rowIndex },
                  figure,
                ),
              }}
            >
              {!fideChessStore.isShowedStoreActual &&
                fideChessStore.showedStateLog &&
                fideChessStore.showedStateLog.morphedTo != null &&
                fideChessStore.showedStateLog.stepData.to.x === columnIndex &&
                fideChessStore.showedStateLog.stepData.to.y === rowIndex && (
                  <FigureIcon
                    icon={fideChessStore.showedStateLog.morphedTo.data.icon}
                    color={fideChessStore.showedStateLog.morphedTo.data.color}
                    sx={{
                      height: "100%",
                      width: "100%",
                      padding: "8%",
                      stroke:
                        fideChessStore.showedStateLog.morphedTo.data.color ===
                        ChessColors.WHITE
                          ? theme.palette.neutral[900]
                          : "",
                      strokeWidth: "2em",
                      opacity: "40%",
                    }}
                  />
                )}
              {figure != null && (
                <FigureIcon
                  icon={figure.data.icon}
                  color={figure.data.color}
                  sx={{
                    height: "100%",
                    width: "100%",
                    padding: "8%",
                    stroke:
                      figure.data.color === ChessColors.WHITE
                        ? theme.palette.neutral[900]
                        : "",
                    strokeWidth: "2em",
                  }}
                />
              )}
              {fideChessStore.selectedFigure != null &&
                fideChessStore.selectedFigure.canMove({
                  x: columnIndex,
                  y: rowIndex,
                }) && (
                  <MoveDot
                    sx={{
                      height: "100%",
                      width: "100%",
                      padding: "40%",
                      color:
                        figure == null
                          ? theme.palette.success.plainColor
                          : theme.palette.danger.plainColor,
                    }}
                  />
                )}
            </Cell>
          )),
        )}
      </FieldContainer>
    );
  },
);

export default FieldBase;
