import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FideChessStateStore } from "../FideChessStateStore";
import { FigureNames } from "../FigureNames";
import { ChessColors, Position } from "entities/CommonModels";

export class FigureData {
  readonly _name: FigureNames;
  readonly _icon: IconDefinition;
  readonly _color: ChessColors;
  constructor(name: FigureNames, icon: IconDefinition, color: ChessColors) {
    this._name = name;
    this._icon = icon;
    this._color = color;
  }

  clone = () => {
    return new FigureData(this._name, this._icon, this._color);
  };

  get icon(): IconDefinition {
    return this._icon;
  }
  get color(): ChessColors {
    return this._color;
  }
  get name(): string {
    return this._name;
  }
}

export abstract class BaseFigure {
  _data: FigureData;
  _isFirstMove: boolean = true;
  _field: FideChessStateStore;
  protected constructor(
    name: FigureNames,
    icon: IconDefinition,
    color: ChessColors,
    field: FideChessStateStore,
  ) {
    this._data = new FigureData(name, icon, color);
    this._field = field;
  }

  abstract clone(field: FideChessStateStore): BaseFigure;

  get data(): FigureData {
    return this._data;
  }

  get isFirstMove(): boolean {
    return this._isFirstMove;
  }

  get position(): Position | null {
    let position: Position | null = null;
    this._field.field.forEach((row, rowIndex) => {
      row.forEach((figure, columnIndex) => {
        if (figure === this) {
          position = {
            x: columnIndex,
            y: rowIndex,
          };
        }
      });
    });
    return position;
  }

  private checkXFigureBetween = (target: Position): boolean => {
    for (
      let x = Math.min(this.position!.x, target.x) + 1;
      x < Math.max(this.position!.x, target.x);
      x++
    ) {
      if (this._field.getFigureByPosition({ x, y: target.y }) != null) {
        return true;
      }
    }
    return false;
  };
  private checkYFigureBetween = (target: Position): boolean => {
    for (
      let y = Math.min(this.position!.y, target.y) + 1;
      y < Math.max(this.position!.y, target.y);
      y++
    ) {
      if (this._field.getFigureByPosition({ x: target.x, y }) != null) {
        return true;
      }
    }
    return false;
  };
  private checkPrimaryDiagonalFigureBetween = (target: Position): boolean => {
    for (
      let pos: Position = {
        x: Math.min(this.position!.x, target.x) + 1,
        y: Math.min(this.position!.y, target.y) + 1,
      };
      pos.x < Math.max(this.position!.x, target.x) &&
      pos.y < Math.max(this.position!.y, target.y);
      pos.x++, pos.y++
    ) {
      if (this._field.getFigureByPosition({ x: pos.x, y: pos.y }) != null) {
        return true;
      }
    }
    return false;
  };
  private checkSecondaryDiagonalFigureBetween = (target: Position): boolean => {
    for (
      let pos: Position = {
        x: Math.min(this.position!.x, target.x) + 1,
        y: Math.max(this.position!.y, target.y) - 1,
      };
      pos.x < Math.max(this.position!.x, target.x) &&
      pos.y > Math.min(this.position!.y, target.y);
      pos.x++, pos.y--
    ) {
      if (this._field.getFigureByPosition({ x: pos.x, y: pos.y }) != null) {
        return true;
      }
    }
    return false;
  };

  protected checkFigureBetween = (
    target: Position,
    checkXAxis: boolean,
    checkYAxis: boolean,
  ): boolean => {
    if (checkXAxis && !checkYAxis && this.position!.y === target.y) {
      return this.checkXFigureBetween(target);
    }
    if (checkYAxis && !checkXAxis && this.position!.x === target.x) {
      return this.checkYFigureBetween(target);
    }
    if (
      checkXAxis &&
      checkYAxis &&
      this.position!.x + this.position!.y === target.x + target.y
    ) {
      return this.checkSecondaryDiagonalFigureBetween(target);
    }
    if (
      checkXAxis &&
      checkYAxis &&
      this.position!.x - this.position!.y === target.x - target.y
    ) {
      return this.checkPrimaryDiagonalFigureBetween(target);
    }
    return false;
  };

  private isKingPotentiallyChecked = (target: Position) => {
    const newField = this._field.clone();
    const newFigurePosition = newField.getFigureByPosition(
      this.position!,
    )!.position!;
    newField.moveFigureInState(
      newField._field[newFigurePosition.y][newFigurePosition.x]!,
      target,
    );

    return newField.getIsKingInCheck(this._data._color);
  };

  public canMoveWithoutPotentiallyCheck = (target: Position) => {
    if (
      this._field.getFigureByPosition(target)?._data.color === this._data._color
    ) {
      return false;
    }
    return this.canFigureMove(target);
  };

  public canMove(target: Position): boolean {
    return (
      this.canMoveWithoutPotentiallyCheck(target) &&
      !this.isKingPotentiallyChecked(target) &&
      this._field.getFigureByPosition(target)?._data.name !== FigureNames.KING
    );
  }

  abstract canFigureMove(target: Position): boolean;
}
