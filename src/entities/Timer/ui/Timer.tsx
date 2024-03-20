import React from "react";
import TimerStore from "../models/TimerStore";
import { observer } from "mobx-react-lite";

type TimerProp = {
  store: TimerStore;
};

export const Timer = observer(({ store }: TimerProp) => {
  const hours =
    store.time.hours === 0
      ? ""
      : store.time.hours < 10
        ? "0" + store.time.hours + ":"
        : store.time.hours + ":";
  const minutes =
    store.time.minutes < 10
      ? "0" + store.time.minutes + ":"
      : store.time.minutes + ":";
  const seconds =
    store.time.seconds < 10 ? "0" + store.time.seconds : store.time.seconds;

  return <>{hours + minutes + seconds}</>;
});
