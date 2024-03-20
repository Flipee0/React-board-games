import { BaseFigure } from "./BaseFigure";
import { faChessQueen } from "@fortawesome/free-solid-svg-icons/faChessQueen";
import { FideChessStateStore } from "../FideChessStateStore";
import { ChessColors, Position } from "entities/CommonModels";
import { FigureNames } from "../FigureNames";

class Queen extends BaseFigure {
  constructor(color: ChessColors, field: FideChessStateStore) {
    super(FigureNames.QUEEN, faChessQueen, color, field);
  }

  clone = (field: FideChessStateStore): BaseFigure => {
    const newQueen = new Queen(this.data.color, field);
    newQueen._isFirstMove = this._isFirstMove;
    return newQueen;
  };

  canFigureMove(target: Position): boolean {
    if (this.checkFigureBetween(target, true, true)) {
      return false;
    }
    if (this.checkFigureBetween(target, true, false)) {
      return false;
    }
    if (this.checkFigureBetween(target, false, true)) {
      return false;
    }
    return (
      this.position!.x + this.position!.y === target.x + target.y ||
      this.position!.x - this.position!.y === target.x - target.y ||
      this.position!.x === target.x ||
      this.position!.y === target.y
    );
  }
}

export default Queen;
