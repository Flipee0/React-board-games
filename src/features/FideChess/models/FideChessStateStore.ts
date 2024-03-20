import { FigureData, BaseFigure } from "./figures/BaseFigure";
import Rook from "./figures/Rook";
import Knight from "./figures/Knight";
import Bishop from "./figures/Bishop";
import Queen from "./figures/Queen";
import King from "./figures/King";
import Pawn from "./figures/Pawn";
import { StepData } from "./GameLogItem";
import { ChessColors, Position } from "entities/CommonModels";
import { PlayerStates } from "./PlayerStates";
import { FigureNames } from "./FigureNames";

export class FideChessStateStore {
  _field: (BaseFigure | null)[][];
  _eatenFigures: FigureData[] = [];
  readonly _getLastStepData: () => StepData | null;
  constructor(getLastStepData: () => StepData | null) {
    this._field = this.getDefaultField();
    this._getLastStepData = getLastStepData;
  }

  public clone = () => {
    const newFideChessStore = new FideChessStateStore(this._getLastStepData);
    newFideChessStore._field = this._field.map((row) =>
      row.map((figure) =>
        figure === null ? null : figure.clone(newFideChessStore),
      ),
    );
    newFideChessStore._eatenFigures = this._eatenFigures.map((figure) =>
      figure.clone(),
    );

    return newFideChessStore;
  };

  private getDefaultField = (): (BaseFigure | null)[][] => {
    const field: (BaseFigure | null)[][] = Array.from(Array(8), () =>
      Array.from(Array(8), () => null),
    );

    field[0][0] = new Rook(ChessColors.BLACK, this);
    field[0][7] = new Rook(ChessColors.BLACK, this);
    field[0][1] = new Knight(ChessColors.BLACK, this);
    field[0][6] = new Knight(ChessColors.BLACK, this);
    field[0][2] = new Bishop(ChessColors.BLACK, this);
    field[0][5] = new Bishop(ChessColors.BLACK, this);
    field[0][3] = new Queen(ChessColors.BLACK, this);
    field[0][4] = new King(ChessColors.BLACK, this);
    field[1] = field[1].map(() => new Pawn(ChessColors.BLACK, this));

    field[7][0] = new Rook(ChessColors.WHITE, this);
    field[7][7] = new Rook(ChessColors.WHITE, this);
    field[7][1] = new Knight(ChessColors.WHITE, this);
    field[7][6] = new Knight(ChessColors.WHITE, this);
    field[7][2] = new Bishop(ChessColors.WHITE, this);
    field[7][5] = new Bishop(ChessColors.WHITE, this);
    field[7][3] = new Queen(ChessColors.WHITE, this);
    field[7][4] = new King(ChessColors.WHITE, this);
    field[6] = field[6].map(() => new Pawn(ChessColors.WHITE, this));

    return field;
  };

  get field(): (BaseFigure | null)[][] {
    return this._field;
  }
  get eatenFigures(): FigureData[] {
    return this._eatenFigures;
  }

  getFigureByPosition = (position: Position) => {
    return this._field[position.y][position.x];
  };

  get figures(): BaseFigure[] {
    const onlyFigures: BaseFigure[][] = this._field.map((row) =>
      row.filter((figure): figure is BaseFigure => figure !== null),
    );
    return ([] as BaseFigure[]).concat(...onlyFigures);
  }

  getIsKingInCheck = (color: ChessColors) => {
    const figures = this.figures;
    const king = figures.find(
      (figure) =>
        figure.data.name === FigureNames.KING && figure.data.color === color,
    );
    const enemyFigures = this.figures.filter(
      (figure) => figure.data.color !== color,
    );

    return enemyFigures.reduce(
      (result, figure) =>
        result || figure.canMoveWithoutPotentiallyCheck(king!.position!),
      false,
    );
  };

  moveFigureInState = (
    figure: BaseFigure,
    target: Position,
  ): { stepData: StepData; roqueData: StepData | null } | undefined => {
    if (figure.position != null) {
      const figureX = figure.position.x;
      const figureY = figure.position.y;
      let targetFigure = this.getFigureByPosition(target);

      let eatenFigure: FigureData | null = null;
      if (
        targetFigure != null &&
        targetFigure.data.color !== figure.data.color
      ) {
        this._eatenFigures.push(targetFigure.data);
        eatenFigure = targetFigure.data;
      } else if (
        // Eat on the aisle
        figure.data.name === FigureNames.PAWN &&
        figureX !== target.x
      ) {
        targetFigure = this.getFigureByPosition({
          x: target.x,
          y: target.y - (figure.data.color === ChessColors.WHITE ? -1 : 1),
        });
        this._eatenFigures.push(targetFigure!.data);
        eatenFigure = targetFigure!.data;
      }
      // roque
      let roqueData = null;
      if (
        figure.data.name === FigureNames.KING &&
        Math.abs(figureX - target.x) === 2
      ) {
        const isLongSide = figureX - target.x > 0;
        const roqueRook = this.getFigureByPosition({
          x: isLongSide ? 0 : 7,
          y: figureY,
        });
        const roqueRookFromX = isLongSide ? 0 : 7;
        const roqueRookToX = isLongSide ? 3 : 5;

        this._field[figureY][roqueRookFromX] = null;
        this._field[figureY][roqueRookToX] = roqueRook;

        roqueData = new StepData(
          roqueRook!.data,
          { x: roqueRookFromX, y: figureY },
          { x: roqueRookToX, y: figureY },
          null,
        );
      }

      const stepData = new StepData(
        figure.data,
        { x: figureX, y: figureY },
        target,
        eatenFigure,
      );

      this._field[target.y][target.x] = figure;
      this._field[figureY][figureX] = null;
      this._field = this._field.map((row) =>
        row.map((figure) => (figure === targetFigure ? null : figure)),
      );
      figure._isFirstMove = false;

      return { stepData, roqueData };
    }
  };

  private getCanPlayerMove = (color: ChessColors) => {
    const figures = this.figures.filter(
      (figure) => figure.data.color === color,
    );

    for (const figure of figures) {
      for (let x = 0; x < 8; x++) {
        for (let y = 0; y < 8; y++) {
          if (figure.canMove({ x, y })) {
            return true;
          }
        }
      }
    }
    return false;
  };

  getPlayersState = (color: ChessColors): PlayerStates => {
    const canPlayerMove = this.getCanPlayerMove(color);
    const isKingInCheck = this.getIsKingInCheck(color);

    let playerState: PlayerStates = PlayerStates.DEFAULT_STATE;
    if (!canPlayerMove) {
      playerState = PlayerStates.STALEMATE;
      if (isKingInCheck) {
        playerState = PlayerStates.MATE;
      }
    }

    return playerState;
  };
}
