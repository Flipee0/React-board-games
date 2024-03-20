import React from "react";
import { makeAutoObservable } from "mobx";
import { FideChess, FideChessGameStore } from "features/FideChess";
import { fideHotSeatGameConfig } from "../models/FideHotSeatGameConfig";
import { FideChessTimerStore } from "features/FideChess/models/FideChessTimerStore";
import { ChessColors } from "entities/CommonModels";

export const PlayFideChessHotSeat = () => {
  const timer = new FideChessTimerStore(
    fideHotSeatGameConfig.initialTimer.time,
    fideHotSeatGameConfig.incrementTimer.time,
  );
  const fideChessStore = makeAutoObservable(
    new FideChessGameStore(
      [ChessColors.WHITE, ChessColors.BLACK],
      fideHotSeatGameConfig.timerEnabled ? timer : null,
    ),
  );
  return <FideChess fideChessStore={fideChessStore} />;
};
