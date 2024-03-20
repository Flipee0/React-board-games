import Time from "shared/models/Time";
import { makeAutoObservable } from "mobx";

class TimerStore {
  private _time: Time;
  private _isStopped: boolean;
  private readonly _onTick: (timesLeft: Time) => void;
  private readonly _onExpire: () => void;

  constructor(
    value: Time,
    isStopped: boolean,
    onTick: (timesLeft: Time) => void,
    onExpire: () => void,
  ) {
    makeAutoObservable(this);

    this._time = makeAutoObservable(value);
    this._isStopped = isStopped;
    this._onTick = onTick;
    this._onExpire = onExpire;

    const secondTime = new Time(0, 0, 1, 0);

    const timerId = setInterval(() => {
      if (this._time.milliseconds <= 0) {
        this._onExpire();
        clearInterval(timerId);
      }

      if (!this._isStopped) {
        this._time.subtractTime(secondTime);
        this._onTick(this._time);
      }
    }, 1000);
  }

  get time(): Time {
    return this._time;
  }

  set time(value: Time) {
    this._time = value;
  }

  get isStopped(): boolean {
    return this._isStopped;
  }

  set isStopped(value: boolean) {
    this._isStopped = value;
  }
}

export default TimerStore;
