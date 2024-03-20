import { ChessColors } from "entities/CommonModels";
import { FideGameConfig } from "features/FideChess";
import { computed, makeObservable, observable } from "mobx";

export const RANDOM = "random";
export type AvailableColors = ChessColors | "random";

class FideAIGameConfig extends FideGameConfig {
  _selectedColor: AvailableColors = RANDOM;
  _aiLevel: number = 2;
  constructor() {
    super();
    makeObservable(this, {
      _selectedColor: observable,
      _aiLevel: observable,
      selectedColor: computed,
      aiLevel: computed,
    });
  }
  getUrlParams(): string {
    return "";
  }

  get selectedColor(): AvailableColors {
    return this._selectedColor;
  }

  set selectedColor(value: AvailableColors) {
    this._selectedColor = value;
  }

  get selectedChessColor(): ChessColors {
    if (this._selectedColor === RANDOM) {
      return ([ChessColors.WHITE, ChessColors.BLACK] as ChessColors[])[
        Math.floor(Math.random() * 2)
      ];
    } else {
      return this._selectedColor;
    }
  }

  get aiLevel(): number {
    return this._aiLevel;
  }

  set aiLevel(value: number) {
    this._aiLevel = value;
  }
}

export const fideAIGameConfig = new FideAIGameConfig();
