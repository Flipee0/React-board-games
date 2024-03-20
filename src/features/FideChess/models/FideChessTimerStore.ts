import Time from "shared/models/Time";
import TimerStore from "entities/Timer/models/TimerStore";

export class FideChessTimerStore {
  private readonly _timer_increment: Time;
  private readonly _whiteTimer: TimerStore;
  private readonly _blackTimer: TimerStore;
  constructor(initial_time: Time, timer_increment: Time) {
    this._timer_increment = timer_increment;
    this._whiteTimer = new TimerStore(
      initial_time,
      false,
      () => {},
      () => {},
    );
    this._blackTimer = new TimerStore(
      initial_time.clone(),
      true,
      () => {},
      () => {},
    );
  }

  get timer_increment(): Time {
    return this._timer_increment;
  }

  get whiteTimer(): TimerStore {
    return this._whiteTimer;
  }

  get blackTimer(): TimerStore {
    return this._blackTimer;
  }
}
