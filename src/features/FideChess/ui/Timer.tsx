import React from "react";
import { FideChessGameStore } from "../models/FideChessGameStore";
import { observer } from "mobx-react-lite";
import { Timer as TimerEntity } from "entities/Timer/ui/Timer";
import { Sheet, useTheme } from "@mui/joy";
import { ChessColors } from "entities/CommonModels";

type TimerProps = {
  fideChessStore: FideChessGameStore;
};

const Timer = observer(({ fideChessStore }: TimerProps) => {
  const theme = useTheme();

  return (
    <Sheet
      sx={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        fontSize: "inherit",
        borderRadius: "0.5rem",
        border: "2px solid",
      }}
    >
      <Sheet
        sx={{
          textAlign: "center",
          fontSize: theme.fontSize.xl,
          opacity:
            fideChessStore.currentPlayer === ChessColors.WHITE ? "100%" : "40%",
          bgcolor: "transparent",
        }}
      >
        {fideChessStore.timer != null && (
          <TimerEntity store={fideChessStore.timer.whiteTimer} />
        )}
      </Sheet>
      <Sheet
        sx={{
          textAlign: "center",
          fontSize: theme.fontSize.xl,
          opacity:
            fideChessStore.currentPlayer === ChessColors.BLACK ? "100%" : "40%",
          bgcolor: "transparent",
        }}
      >
        {fideChessStore.timer != null && (
          <TimerEntity store={fideChessStore.timer.blackTimer} />
        )}
      </Sheet>
    </Sheet>
  );
});

export default Timer;
