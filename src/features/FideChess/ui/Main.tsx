import React, { useRef } from "react";
import useAspectRatio from "shared/hooks/useAspectRatio";
import { FideChessGameStore } from "../models/FideChessGameStore";
import { observer } from "mobx-react-lite";
import { EatenFigures } from "./EatenFigures";
import { Field } from "./Field";
import TurnsLog from "./TurnsLog";
import { Sheet } from "@mui/joy";
import GameResultsModal from "./GameResultsModal";
import { FieldCoordinatesWrapper } from "entities/FieldCoordinatesWrapper";
import { ChessColors } from "entities/CommonModels";

type FideChessProps = {
  fideChessStore: FideChessGameStore;
};

const xCoordinates = ["A", "B", "C", "D", "E", "F", "G", "H"];
const yCoordinates = ["8", "7", "6", "5", "4", "3", "2", "1"];

export const Main = observer(({ fideChessStore }: FideChessProps) => {
  const eatenBlack = useRef<HTMLInputElement>(null);
  const eatenWhite = useRef<HTMLInputElement>(null);

  useAspectRatio(eatenBlack, 13);
  useAspectRatio(eatenWhite, 13);

  const handleTableClick = () => {
    if (!fideChessStore.isShowedStoreActual) {
      fideChessStore.setShowedStateActual();
    }
  };

  return (
    <Sheet
      sx={(theme) => ({
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        mt: "1em",
        width: "75%",
        [theme.breakpoints.down("md")]: {
          gridTemplateColumns: "1fr",
          width: "95%",
        },
        [theme.breakpoints.down("lg")]: {
          width: "95%",
        },
        justifySelf: "center",
        gap: "0 2em",
        bgcolor: "transparent",
      })}
    >
      <Sheet
        onClick={handleTableClick}
        sx={{
          width: "100%",
          opacity: fideChessStore.isShowedStoreActual ? "100%" : "80%",
          borderRadius: "30px",
        }}
      >
        <Sheet
          ref={eatenBlack}
          sx={{
            paddingX: "8%",
            bgcolor: "transparent",
          }}
        >
          <EatenFigures
            figures={fideChessStore.showedState.eatenFigures.filter(
              (figure) => figure.color === ChessColors.WHITE,
            )}
          />
        </Sheet>
        <FieldCoordinatesWrapper
          top={xCoordinates}
          bottom={xCoordinates}
          left={yCoordinates}
          right={yCoordinates}
        >
          <Field fideChessStore={fideChessStore} />
        </FieldCoordinatesWrapper>
        <Sheet
          ref={eatenWhite}
          sx={{
            paddingX: "8%",
            bgcolor: "transparent",
          }}
        >
          <EatenFigures
            figures={fideChessStore.showedState.eatenFigures.filter(
              (figure) => figure.color === ChessColors.BLACK,
            )}
          />
        </Sheet>
      </Sheet>
      <Sheet
        sx={(theme) => ({
          marginTop: 0,
          [theme.breakpoints.down("md")]: {
            marginTop: "2em",
          },
          bgcolor: "transparent",
        })}
      >
        <TurnsLog fideChessStore={fideChessStore} />
      </Sheet>
      {fideChessStore.gameState != null && (
        <GameResultsModal
          gameLog={fideChessStore.gameLog}
          {...fideChessStore.gameState}
        />
      )}
    </Sheet>
  );
});
