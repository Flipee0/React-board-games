import React from "react";
import { Switch } from "@mui/joy";
import { FideGameConfig } from "../models/FideGameConfig";
import { observer } from "mobx-react-lite";
import { TimerConfigForm } from "entities/TimerConfigForm";

type ConfigFormProps = {
  gameConfig: FideGameConfig;
};

export const ConfigForm = observer(({ gameConfig }: ConfigFormProps) => {
  return (
    <div>
      <Switch
        endDecorator={"Enable timer"}
        checked={gameConfig.timerEnabled}
        onChange={gameConfig.toggleTimer}
      />
      {gameConfig.timerEnabled && (
        <>
          <TimerConfigForm label={"Time"} timer={gameConfig.initialTimer} />
          <TimerConfigForm
            label={"Add time after step"}
            timer={gameConfig.incrementTimer}
          />
        </>
      )}
    </div>
  );
});
