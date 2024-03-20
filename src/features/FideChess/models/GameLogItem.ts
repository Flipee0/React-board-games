import { FigureData, BaseFigure } from "./figures/BaseFigure";
import { FideChessStateStore } from "./FideChessStateStore";
import { Position } from "entities/CommonModels";

export class StepData {
  _figure: FigureData;
  _from: Position;
  _to: Position;
  _eatenFigure: FigureData | null;

  constructor(
    figure: FigureData,
    from: Position,
    to: Position,
    eatenFigure: FigureData | null = null,
  ) {
    this._figure = figure;
    this._from = from;
    this._to = to;
    this._eatenFigure = eatenFigure;
  }

  clone = () => {
    return new StepData(
      this._figure.clone(),
      { x: this._from.x, y: this._from.y },
      { x: this._to.x, y: this._to.y },
      this._eatenFigure?.clone(),
    );
  };

  get figure(): FigureData {
    return this._figure;
  }

  get from(): Position {
    return this._from;
  }

  get to(): Position {
    return this._to;
  }

  get eatenFigure(): FigureData | null {
    return this._eatenFigure;
  }
}

class GameLogItem {
  private _state: FideChessStateStore;
  private _stepData: StepData;
  private _roqueRookStepData: StepData | null;
  private _morphedTo: BaseFigure | null;

  constructor(
    state: FideChessStateStore,
    stepData: StepData,
    roqueRookStepData: StepData | null = null,
    morphedTo: BaseFigure | null = null,
  ) {
    this._state = state;
    this._stepData = stepData;
    this._roqueRookStepData = roqueRookStepData;
    this._morphedTo = morphedTo;
  }

  get state(): FideChessStateStore {
    return this._state;
  }

  get stepData(): StepData {
    return this._stepData;
  }

  get roqueRookStepData(): StepData | null {
    return this._roqueRookStepData;
  }

  get morphedTo(): BaseFigure | null {
    return this._morphedTo;
  }
}

export default GameLogItem;
