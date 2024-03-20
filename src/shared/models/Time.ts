class Time {
  private _milliseconds: number;

  constructor(
    hours: number = 0,
    minutes: number = 0,
    seconds: number = 0,
    milliseconds: number = 0,
  ) {
    this._milliseconds =
      ((hours * 60 + minutes) * 60 + seconds) * 1000 + milliseconds;
  }

  clone = () => {
    return new Time(0, 0, 0, this._milliseconds);
  };

  get milliseconds(): number {
    return Math.trunc(this._milliseconds);
  }

  set milliseconds(newMilliseconds: number) {
    this._milliseconds = newMilliseconds;
  }

  addTime = (time: Time) => {
    this._milliseconds += time.milliseconds;
  };

  subtractTime = (time: Time) => {
    this._milliseconds -= time.milliseconds;
  };

  get hours(): number {
    return Math.trunc(this._milliseconds / 3600000) % 24;
  }

  get minutes(): number {
    return Math.trunc(this._milliseconds / 60000) % 60;
  }

  get seconds(): number {
    return Math.trunc(this._milliseconds / 1000) % 60;
  }
}

export default Time;
