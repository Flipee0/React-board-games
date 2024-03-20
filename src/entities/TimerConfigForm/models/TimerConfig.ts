import { makeAutoObservable } from "mobx";
import Time from "shared/models/Time";

export class TimerConfig {
  private _hours: number;
  private _minutes: number;
  private _seconds: number;
  constructor(hours: number, minutes: number, seconds: number) {
    makeAutoObservable(this);
    this._hours = hours;
    this._minutes = minutes;
    this._seconds = seconds;
  }

  get hours(): number {
    return this._hours;
  }

  set hours(value: number) {
    this._hours = value;
  }

  get minutes(): number {
    return this._minutes;
  }

  set minutes(value: number) {
    this._minutes = value;
  }

  get seconds(): number {
    return this._seconds;
  }

  set seconds(value: number) {
    this._seconds = value;
  }

  get time(): Time {
    return new Time(this._hours, this._minutes, this._seconds, 0);
  }
}
