import { BaseFigure } from "./BaseFigure";
import { faChessBishop } from "@fortawesome/free-solid-svg-icons/faChessBishop";
import { FideChessStateStore } from "../FideChessStateStore";
import { ChessColors, Position } from "entities/CommonModels";
import { FigureNames } from "../FigureNames";

class Bishop extends BaseFigure {
  constructor(color: ChessColors, field: FideChessStateStore) {
    super(FigureNames.BISHOP, faChessBishop, color, field);
  }

  clone = (field: FideChessStateStore): BaseFigure => {
    const newBishop = new Bishop(this.data.color, field);
    newBishop._isFirstMove = this._isFirstMove;
    return newBishop;
  };

  canFigureMove(target: Position): boolean {
    if (this.checkFigureBetween(target, true, true)) {
      return false;
    }
    return (
      this.position!.x + this.position!.y === target.x + target.y ||
      this.position!.x - this.position!.y === target.x - target.y
    );
  }
}

export default Bishop;
