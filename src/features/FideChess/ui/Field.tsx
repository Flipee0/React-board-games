import React, { useState } from "react";
import { FideChessGameStore } from "../models/FideChessGameStore";
import { FigureIcon } from "./FigureIcon";
import { observer } from "mobx-react-lite";
import {
  Button,
  Modal,
  ModalDialog,
  Sheet,
  Typography,
  useTheme,
} from "@mui/joy";
import Bishop from "../models/figures/Bishop";
import Knight from "../models/figures/Knight";
import Queen from "../models/figures/Queen";
import Rook from "../models/figures/Rook";
import FieldBase from "./FieldBase";
import { ChessColors, Position } from "../../../entities/CommonModels";
import { FigureNames } from "../models/FigureNames";

type FieldProps = {
  fideChessStore: FideChessGameStore;
};

export const Field = observer(({ fideChessStore }: FieldProps) => {
  const theme = useTheme();
  const [morphFigures] = useState({
    white: [
      new Queen(ChessColors.WHITE, fideChessStore.actualState),
      new Bishop(ChessColors.WHITE, fideChessStore.actualState),
      new Knight(ChessColors.WHITE, fideChessStore.actualState),
      new Rook(ChessColors.WHITE, fideChessStore.actualState),
    ],
    black: [
      new Queen(ChessColors.BLACK, fideChessStore.actualState),
      new Bishop(ChessColors.BLACK, fideChessStore.actualState),
      new Knight(ChessColors.BLACK, fideChessStore.actualState),
      new Rook(ChessColors.BLACK, fideChessStore.actualState),
    ],
  });
  const [isMorphModalOpen, setIsMorphModalOpen] = useState(false);
  const [morphTargetPosition, setMorphTargetPosition] = useState({
    x: 0,
    y: 0,
  });
  const [selectedMorphFigureIndex, setSelectedMorphFigureIndex] = useState(0);

  const handleCellClick = (position: Position) => {
    if (
      fideChessStore.isShowedStoreActual &&
      fideChessStore.isThisDeviceControlsCurrentPlayer
    ) {
      const figure = fideChessStore.actualState.getFigureByPosition(position);

      if (fideChessStore.selectedFigure == null) {
        fideChessStore.selectedFigure = figure;
      } else {
        if (fideChessStore.selectedFigure.canMove(position)) {
          if (
            fideChessStore.selectedFigure.data.name === FigureNames.PAWN &&
            (position.y === 0 || position.y === 7)
          ) {
            setMorphTargetPosition(position);
            setIsMorphModalOpen(true);
          } else {
            fideChessStore.moveSelectedFigure(position);
          }
        } else {
          if (fideChessStore.selectedFigure.data.color === figure?.data.color) {
            fideChessStore.selectedFigure = figure;
          } else {
            fideChessStore.selectedFigure = null;
          }
        }
      }
    }
  };

  const handleMorphModalClose = () => {
    setIsMorphModalOpen(false);
    fideChessStore.moveSelectedFigure(
      morphTargetPosition,
      morphFigures[fideChessStore.currentPlayer][selectedMorphFigureIndex],
    );
    setSelectedMorphFigureIndex(0);
  };

  return (
    <>
      <FieldBase
        fideChessStore={fideChessStore}
        handleCellClick={handleCellClick}
      />
      <Modal open={isMorphModalOpen}>
        <ModalDialog>
          <Typography level={"h2"}>Choose figure</Typography>
          <Sheet
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
            }}
          >
            {morphFigures[
              fideChessStore.currentPlayer as keyof typeof morphFigures
            ].map((figure, index) => (
              <div
                key={index}
                onClick={() => setSelectedMorphFigureIndex(index)}
              >
                <FigureIcon
                  icon={figure.data.icon}
                  color={figure.data.color}
                  sx={{
                    height: "4em",
                    width: "4em",
                    padding: "0.3em",
                    stroke: theme.palette.text.primary,
                    strokeWidth: "2em",
                    borderColor: theme.palette.text.primary,
                    borderWidth:
                      index === selectedMorphFigureIndex ? "0.3em" : 0,
                    borderRadius: "10px",
                  }}
                />
              </div>
            ))}
          </Sheet>
          <Button onClick={handleMorphModalClose}>Set figure</Button>
        </ModalDialog>
      </Modal>
    </>
  );
});
