import { BaseFigure } from "./BaseFigure";
import { faChessRook } from "@fortawesome/free-solid-svg-icons/faChessRook";
import { FideChessStateStore } from "../FideChessStateStore";
import { ChessColors, Position } from "entities/CommonModels";
import { FigureNames } from "../FigureNames";

class Rook extends BaseFigure {
  constructor(color: ChessColors, field: FideChessStateStore) {
    super(FigureNames.ROOK, faChessRook, color, field);
  }

  clone = (field: FideChessStateStore): BaseFigure => {
    const newRook = new Rook(this.data.color, field);
    newRook._isFirstMove = this._isFirstMove;
    return newRook;
  };

  canFigureMove(target: Position): boolean {
    if (this.checkFigureBetween(target, true, false)) {
      return false;
    }
    if (this.checkFigureBetween(target, false, true)) {
      return false;
    }
    return this.position!.x === target.x || this.position!.y === target.y;
  }
}

export default Rook;
