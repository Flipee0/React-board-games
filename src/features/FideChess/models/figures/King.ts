import { BaseFigure } from "./BaseFigure";
import { faChessKing } from "@fortawesome/free-solid-svg-icons/faChessKing";
import { FideChessStateStore } from "../FideChessStateStore";
import { ChessColors, Position } from "entities/CommonModels";
import { FigureNames } from "../FigureNames";

class King extends BaseFigure {
  constructor(color: ChessColors, field: FideChessStateStore) {
    super(FigureNames.KING, faChessKing, color, field);
  }

  clone = (field: FideChessStateStore): BaseFigure => {
    const newKing = new King(this.data.color, field);
    newKing._isFirstMove = this._isFirstMove;
    return newKing;
  };

  private isDangerPosition(target: Position): boolean {
    let result = false;
    this._field.field.forEach((row) => {
      row
        .filter(
          (figure) => figure != null && figure.data._color !== this.data._color,
        )
        .forEach((enemyFigure) => {
          if (enemyFigure!.data.name === FigureNames.KING) {
            const xDiff = Math.abs(enemyFigure!.position!.x - target.x);
            const yDiff = Math.abs(enemyFigure!.position!.y - target.y);

            if (xDiff <= 1 && yDiff <= 1) {
              result = true;
            }
          } else {
            if (enemyFigure!.canMove(target)) {
              result = true;
            }
          }
        });
    });

    return result;
  }

  canFigureMove(target: Position): boolean {
    const xDiff = Math.abs(this.position!.x - target.x);
    const yDiff = Math.abs(this.position!.y - target.y);

    const shortSideRoqueFigure = this._field.getFigureByPosition({
      x: 7,
      y: this._data._color === ChessColors.BLACK ? 0 : 7,
    });
    const longSideRoqueFigure = this._field.getFigureByPosition({
      x: 0,
      y: this._data._color === ChessColors.BLACK ? 0 : 7,
    });

    const isShortSideRoqueAvailable =
      shortSideRoqueFigure != null &&
      shortSideRoqueFigure.data.color === this._data._color &&
      shortSideRoqueFigure._data.name === FigureNames.ROOK &&
      shortSideRoqueFigure._isFirstMove &&
      !this.checkFigureBetween(target, true, false);
    const isLongSideRoqueAvailable =
      longSideRoqueFigure != null &&
      longSideRoqueFigure.data.color === this._data._color &&
      longSideRoqueFigure._data.name === FigureNames.ROOK &&
      longSideRoqueFigure._isFirstMove &&
      !this.checkFigureBetween(target, true, false);

    if (this.isDangerPosition(target)) {
      return false;
    }

    if (
      this._isFirstMove &&
      xDiff === 2 &&
      yDiff === 0 &&
      !this.isDangerPosition(this.position!) &&
      ((target.x === 6 &&
        isShortSideRoqueAvailable &&
        !this.isDangerPosition({
          x: 5,
          y: this._data._color === ChessColors.BLACK ? 0 : 7,
        })) ||
        (target.x === 2 &&
          isLongSideRoqueAvailable &&
          !this.isDangerPosition({
            x: 3,
            y: this._data._color === ChessColors.BLACK ? 0 : 7,
          })))
    ) {
      return true;
    }

    return xDiff <= 1 && yDiff <= 1;
  }
}

export default King;
