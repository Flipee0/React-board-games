import React from "react";
import { observer } from "mobx-react-lite";
import { TimerConfig } from "../models/TimerConfig";
import { Input, Sheet, Typography } from "@mui/joy";

type TimerConfigFormProps = {
  label: string;
  timer: TimerConfig;
};

export const TimerConfigForm = observer(
  ({ label, timer }: TimerConfigFormProps) => {
    const handleHoursChange: React.ChangeEventHandler<HTMLInputElement> = (
      event,
    ) => {
      if (event.target.value !== "") {
        timer.hours = Number.parseInt(event.target.value);
      } else {
        timer.hours = 0;
      }
    };

    const handleMinutesChange: React.ChangeEventHandler<HTMLInputElement> = (
      event,
    ) => {
      if (event.target.value !== "") {
        timer.minutes = Number.parseInt(event.target.value);
      } else {
        timer.minutes = 0;
      }
    };

    const handleSecondsChange: React.ChangeEventHandler<HTMLInputElement> = (
      event,
    ) => {
      if (event.target.value !== "") {
        timer.seconds = Number.parseInt(event.target.value);
      } else {
        timer.seconds = 0;
      }
    };

    return (
      <div>
        <Typography
          sx={{
            marginBottom: "0.3em",
          }}
        >
          {label} (hh:mm:ss)
        </Typography>
        <Sheet
          sx={{
            display: "flex",
            flexWrap: "nowrap",
            gap: "0 0.3em",
            alignItems: "center",
          }}
        >
          <Input
            type={"number"}
            value={timer.hours}
            onChange={handleHoursChange}
            sx={{
              width: "4em",
            }}
          />
          <Typography>:</Typography>
          <Input
            type={"number"}
            value={timer.minutes}
            onChange={handleMinutesChange}
            sx={{
              width: "4em",
            }}
          />
          <Typography>:</Typography>
          <Input
            type={"number"}
            value={timer.seconds}
            onChange={handleSecondsChange}
            sx={{
              width: "4em",
            }}
          />
        </Sheet>
      </div>
    );
  },
);
