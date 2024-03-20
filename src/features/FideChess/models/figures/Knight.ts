import { BaseFigure } from "./BaseFigure";
import { faChessKnight } from "@fortawesome/free-solid-svg-icons/faChessKnight";
import { FideChessStateStore } from "../FideChessStateStore";
import { ChessColors, Position } from "entities/CommonModels";
import { FigureNames } from "../FigureNames";

class Knight extends BaseFigure {
  constructor(color: ChessColors, field: FideChessStateStore) {
    super(FigureNames.KNIGHT, faChessKnight, color, field);
  }

  clone = (field: FideChessStateStore): BaseFigure => {
    const newKnight = new Knight(this.data.color, field);
    newKnight._isFirstMove = this._isFirstMove;
    return newKnight;
  };

  canFigureMove(target: Position): boolean {
    const xDiff = Math.abs(this.position!.x - target.x);
    const yDiff = Math.abs(this.position!.y - target.y);
    return (xDiff === 2 && yDiff === 1) || (yDiff === 2 && xDiff === 1);
  }
}

export default Knight;
