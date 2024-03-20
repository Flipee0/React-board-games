import { BaseFigure } from "./BaseFigure";
import { faChessPawn } from "@fortawesome/free-solid-svg-icons/faChessPawn";
import { FideChessStateStore } from "../FideChessStateStore";
import { ChessColors, Position } from "entities/CommonModels";
import { FigureNames } from "../FigureNames";

class Pawn extends BaseFigure {
  constructor(color: ChessColors, field: FideChessStateStore) {
    super(FigureNames.PAWN, faChessPawn, color, field);
  }

  clone = (field: FideChessStateStore): BaseFigure => {
    const newPawn = new Pawn(this.data.color, field);
    newPawn._isFirstMove = this._isFirstMove;
    return newPawn;
  };

  canFigureMove(target: Position): boolean {
    const direction = this.data._color === ChessColors.BLACK ? -1 : 1;
    const isForwardMove =
      this.position!.y - target.y === 1 * direction &&
      this.position!.x === target.x &&
      this._field.getFigureByPosition(target) == null;
    const isFirstMove =
      this.position!.y - target.y === 2 * direction &&
      this.position!.x === target.x &&
      this._field.getFigureByPosition(target) == null &&
      this._field.getFigureByPosition({
        x: target.x,
        y: target.y + direction,
      }) == null &&
      ((this._data._color === ChessColors.BLACK && this.position!.y === 1) ||
        (this._data._color === ChessColors.WHITE && this.position!.y === 6));
    const lastMove = this._field._getLastStepData();
    const isEat =
      this.position!.y - target.y === 1 * direction &&
      Math.abs(this.position!.x - target.x) === 1 &&
      (this._field.getFigureByPosition(target) !== null ||
        // Eat on the aisle
        (lastMove?._figure.name === FigureNames.PAWN &&
          lastMove?.from.y - lastMove?.to.y === 2 * -direction &&
          lastMove?.from.x === target.x &&
          lastMove?.from.y + direction === target.y));

    return isForwardMove || isEat || isFirstMove;
  }
}

export default Pawn;
