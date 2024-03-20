import { ChessColors, Position } from "entities/CommonModels";
import GameLogItem, { StepData } from "./GameLogItem";
import { BaseFigure } from "./figures/BaseFigure";
import { makeAutoObservable } from "mobx";
import { FideChessStateStore } from "./FideChessStateStore";
import { FideChessTimerStore } from "./FideChessTimerStore";
import { PlayerStates } from "./PlayerStates";

export class FideChessGameStore {
  private readonly _colorsThisDeviceControlled: ChessColors[];
  private readonly _actualState: FideChessStateStore;
  private _showedState: FideChessStateStore;
  private _isShowedStoreActual: boolean = true;
  private readonly _gameLog: GameLogItem[];
  private readonly _timer: FideChessTimerStore | null;
  _selectedFigure: BaseFigure | null = null;
  _currentPlayer: ChessColors = ChessColors.WHITE;
  private _gameState: { color: ChessColors; state: PlayerStates } | null = null;

  constructor(
    colorsThisDeviceControlled: ChessColors[],
    timer: FideChessTimerStore | null = null,
  ) {
    this._colorsThisDeviceControlled = colorsThisDeviceControlled;
    this._actualState = makeAutoObservable(
      new FideChessStateStore(this.getLastLoggedStepData),
    );
    this._showedState = this._actualState;
    this._gameLog = [];
    this._timer = timer;
  }

  get actualState(): FideChessStateStore {
    return this._actualState;
  }

  get showedState(): FideChessStateStore {
    return this._showedState;
  }

  get gameLog(): GameLogItem[] {
    return this._gameLog;
  }

  get isShowedStoreActual(): boolean {
    return this._actualState === this._showedState;
  }

  set showedState(newShowedStore: FideChessStateStore) {
    this._showedState = newShowedStore;
    this._isShowedStoreActual = false;
  }

  get timer(): FideChessTimerStore | null {
    return this._timer;
  }

  setShowedStateActual = () => {
    this._showedState = this._actualState;
    this._isShowedStoreActual = true;
  };

  get showedStateLog(): GameLogItem | undefined {
    return this._gameLog.find((logItem) => logItem.state === this._showedState);
  }

  getLastLoggedStepData = (): StepData | null => {
    return this._gameLog[this._gameLog.length - 1]?.stepData;
  };

  get currentPlayer(): ChessColors {
    return this._currentPlayer;
  }

  toggleCurrentPlayer = () => {
    this._currentPlayer =
      this._currentPlayer === ChessColors.BLACK
        ? ChessColors.WHITE
        : ChessColors.BLACK;
  };

  get selectedFigure(): BaseFigure | null {
    return this._selectedFigure;
  }

  set selectedFigure(value: BaseFigure | null) {
    if (value != null && value.data.color !== this._currentPlayer) {
      this._selectedFigure = null;
    } else {
      this._selectedFigure = value;
    }
  }

  moveSelectedFigure = (
    target: Position,
    morphedTo: BaseFigure | null = null,
  ) => {
    if (this._selectedFigure != null && this._selectedFigure.position != null) {
      const stateBeforeMove = this._actualState.clone();

      const { stepData, roqueData } = this._actualState.moveFigureInState(
        this._selectedFigure,
        target,
      )!;

      this._gameLog.push(
        new GameLogItem(stateBeforeMove, stepData, roqueData, morphedTo),
      );

      if (morphedTo != null) {
        this._actualState.field[target.y][target.x] = morphedTo;
      }

      if (this._timer !== null) {
        this._timer.whiteTimer.isStopped =
          this._currentPlayer === ChessColors.WHITE;
        this._timer.blackTimer.isStopped =
          this._currentPlayer === ChessColors.BLACK;

        if (this._currentPlayer === ChessColors.WHITE) {
          this._timer.whiteTimer.time.addTime(this._timer.timer_increment);
        } else {
          this._timer.blackTimer.time.addTime(this._timer.timer_increment);
        }
      }

      this.toggleCurrentPlayer();
      const currentPlayerState = this._actualState.getPlayersState(
        this._currentPlayer,
      );
      if (currentPlayerState !== PlayerStates.DEFAULT_STATE) {
        this._gameState = {
          color: this._currentPlayer,
          state: currentPlayerState,
        };
      }

      this._selectedFigure = null;
    }
  };

  get gameState() {
    return this._gameState;
  }

  get isThisDeviceControlsCurrentPlayer(): boolean {
    return this._colorsThisDeviceControlled.includes(this._currentPlayer);
  }
}
