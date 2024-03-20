import React, {useEffect, useRef} from "react";
import { FideChessGameStore } from "features/FideChess/";
import { fideAIGameConfig } from "../models/FideAIGameConfig";
import { makeAutoObservable } from "mobx";
import { FideChess } from "features/FideChess";
import { observer } from "mobx-react-lite";
import { FideChessAI } from "../models/FideChessAI";
import { ChessColors } from "entities/CommonModels";

export const PlayFideChessAI = observer(() => {
  const playerColor = useRef(fideAIGameConfig.selectedChessColor);
  const aiColor = useRef(
    playerColor.current === ChessColors.WHITE ? ChessColors.BLACK : ChessColors.WHITE,
  );

  const fideChessStore = useRef(
    makeAutoObservable(new FideChessGameStore([playerColor.current], null)),
  );

  const ai = useRef(new FideChessAI(fideChessStore.current));
  useEffect(() => {
    setTimeout(() => {
      if (fideChessStore.current.currentPlayer === aiColor.current) {
        ai.current.doAiMove();
      }
    });
  }, [fideChessStore.current.currentPlayer]);

  return <FideChess fideChessStore={fideChessStore.current} />;
});
