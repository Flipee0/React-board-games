import { GameConfig } from "entities/GameConfigForm";
import { makeObservable, action, computed, observable } from "mobx";
import { TimerConfig } from "entities/TimerConfigForm";

export abstract class FideGameConfig extends GameConfig {
  _timerEnabled: boolean = false;
  readonly initialTimer: TimerConfig = new TimerConfig(0, 5, 0);
  readonly incrementTimer: TimerConfig = new TimerConfig(0, 0, 0);

  protected constructor() {
    super();
    makeObservable(this, {
      timerEnabled: computed,
      toggleTimer: action,
      _timerEnabled: observable,
    });
  }

  get timerEnabled(): boolean {
    return this._timerEnabled;
  }

  public toggleTimer = () => {
    this._timerEnabled = !this._timerEnabled;
  };

  public get isConfigValid(): boolean {
    return true;
  }
}
