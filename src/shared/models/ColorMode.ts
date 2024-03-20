import { makeAutoObservable } from "mobx";

class ColorModeStore {
  _currentMode: "light" | "dark";

  constructor() {
    makeAutoObservable(this);
    const storageValue = localStorage.getItem("colorMode");
    const mediaValue = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
    this._currentMode = storageValue
      ? storageValue === "dark" || storageValue === "light"
        ? storageValue
        : mediaValue
      : mediaValue;
  }

  get currentMode() {
    return this._currentMode;
  }

  set currentMode(newValue: "light" | "dark") {
    this._currentMode = newValue;
    localStorage.setItem("colorMode", newValue);
  }
}

const colorModeStore = new ColorModeStore();
export default colorModeStore;
