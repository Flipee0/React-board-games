import { Route, Routes } from "react-router-dom";
import { MainPage } from "./Main";
import { PlayFideChessHotSeat } from "./PlayFideChessHotSeat";
import pagePaths from "shared/models/PagePaths";
import { ChessConfigFormPage } from "./ChessConfigForm";
import { PlayFideChessAI } from "./PlayFideChessAI";

export const Routing = () => {
  return (
    <Routes>
      <Route path={pagePaths.main} Component={MainPage} />
      <Route path={pagePaths.gameConfig}>
        <Route path={pagePaths.chess} Component={ChessConfigFormPage} />
      </Route>
      <Route path={pagePaths.playChess}>
        <Route path={pagePaths.fide}>
          <Route path={pagePaths.hotSeat} Component={PlayFideChessHotSeat} />
          <Route path={pagePaths.ai} Component={PlayFideChessAI} />
        </Route>
      </Route>
    </Routes>
  );
};
