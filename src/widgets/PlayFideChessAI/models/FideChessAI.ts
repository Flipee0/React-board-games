import { FideChessGameStore } from "features/FideChess";
import { fideAIGameConfig } from "./FideAIGameConfig";
import { aiMove, CellName } from "js-chess-engine";
import { BaseFigure } from "features/FideChess/models/figures/BaseFigure";
import { ChessColors, Position } from "entities/CommonModels";
import { FigureNames } from "features/FideChess/models/FigureNames";

const symbols = ["A", "B", "C", "D", "E", "F", "G", "H"];

export class FideChessAI {
  private readonly _store: FideChessGameStore;

  constructor(store: FideChessGameStore) {
    this._store = store;
  }

  get store(): FideChessGameStore {
    return this._store;
  }

  private positionToChessNotation = (
    position: Position,
    lower: boolean = false,
  ): string => {
    let result = symbols[position.x] + (8 - position.y);
    if (lower) {
      result = result.toLowerCase();
    }
    return result;
  };

  private chessNotationToPosition = (cell: CellName): Position => {
    const xChess = cell[0].toUpperCase();
    const yChess = cell[1];

    const x = symbols.findIndex((symbol) => symbol === xChess);
    const y = 8 - Number.parseInt(yChess);

    return { x, y };
  };

  private getFENFigureSymbol = (figure: BaseFigure | null): string | null => {
    if (figure === null) {
      return null;
    }
    let symbol = figure.data.name;
    if (figure.data.color === ChessColors.BLACK) {
      symbol = symbol.toLowerCase();
    }
    return symbol;
  };

  private get roquesFEN(): string {
    const roques: string[] = [];
    const figures = this._store.actualState.figures;
    const whiteKing = figures.find(
      (figure) =>
        figure.data.name === FigureNames.KING &&
        figure.data.color === ChessColors.WHITE,
    )!;
    const blackKing = figures.find(
      (figure) =>
        figure.data.name === FigureNames.KING &&
        figure.data.color === ChessColors.BLACK,
    )!;

    const longSideWhiteRoqueFigure =
      this._store.actualState.getFigureByPosition({ x: 0, y: 7 });
    const longSideBlackRoqueFigure =
      this._store.actualState.getFigureByPosition({ x: 0, y: 0 });
    const shortSideWhiteRoqueFigure =
      this._store.actualState.getFigureByPosition({ x: 7, y: 7 });
    const shortSideBlackRoqueFigure =
      this._store.actualState.getFigureByPosition({ x: 7, y: 0 });

    if (
      whiteKing.isFirstMove &&
      shortSideWhiteRoqueFigure?.isFirstMove &&
      shortSideWhiteRoqueFigure.data.name === FigureNames.ROOK &&
      shortSideWhiteRoqueFigure.data.color === ChessColors.WHITE
    ) {
      roques.push("K");
    }
    if (
      whiteKing.isFirstMove &&
      longSideWhiteRoqueFigure?.isFirstMove &&
      longSideWhiteRoqueFigure.data.name === FigureNames.ROOK &&
      longSideWhiteRoqueFigure.data.color === ChessColors.WHITE
    ) {
      roques.push("Q");
    }
    if (
      blackKing.isFirstMove &&
      shortSideBlackRoqueFigure?.isFirstMove &&
      shortSideBlackRoqueFigure.data.name === FigureNames.ROOK &&
      shortSideBlackRoqueFigure.data.color === ChessColors.BLACK
    ) {
      roques.push("k");
    }
    if (
      blackKing.isFirstMove &&
      longSideBlackRoqueFigure?.isFirstMove &&
      longSideBlackRoqueFigure.data.name === FigureNames.ROOK &&
      longSideBlackRoqueFigure.data.color === ChessColors.BLACK
    ) {
      roques.push("q");
    }

    return roques.length === 0 ? "-" : roques.join("");
  }

  private get eatOnAisleFieldFEN(): string {
    if (this._store.gameLog.length === 0) {
      return "-";
    }
    const lastLog = this._store.gameLog[this._store.gameLog.length - 1];
    if (
      lastLog.stepData.figure.name === FigureNames.PAWN &&
      Math.abs(lastLog.stepData.from.y - lastLog.stepData.to.y) === 2
    ) {
      return this.positionToChessNotation({
        x: lastLog.stepData.from.x,
        y: (lastLog.stepData.from.y + lastLog.stepData.to.y) / 2,
      });
    }
    return "-";
  }

  private get boardFEN(): string {
    const resultRows = [];
    for (const row of this._store.actualState.field) {
      let rowSymbols: string = "";
      let emptyCellsNumber = 0;
      for (const figure of row) {
        const symbol = this.getFENFigureSymbol(figure);
        if (symbol == null) {
          emptyCellsNumber += 1;
        } else {
          if (emptyCellsNumber !== 0) {
            rowSymbols += emptyCellsNumber;
            emptyCellsNumber = 0;
          }
          rowSymbols += symbol;
        }
      }

      if (emptyCellsNumber !== 0) {
        rowSymbols += emptyCellsNumber;
      }

      resultRows.push(rowSymbols);
    }

    const currentPlayer = this._store._currentPlayer[0];

    return [
      resultRows.join("/"),
      currentPlayer,
      this.roquesFEN,
      this.eatOnAisleFieldFEN,
      // for draw
      0,
      this._store.gameLog.length + 1,
    ].join(" ");
  }

  doAiMove = () => {
    const moveChessNotation = aiMove(this.boardFEN, fideAIGameConfig.aiLevel);
    const fromPosition = this.chessNotationToPosition(
      Object.keys(moveChessNotation)[0] as CellName,
    );
    const toPosition = this.chessNotationToPosition(
      Object.values(moveChessNotation)[0] as CellName,
    );

    this._store.selectedFigure =
      this._store.actualState.getFigureByPosition(fromPosition);
    this._store.moveSelectedFigure(toPosition);
  };
}
