import React from "react";
import { FideConfigForm } from "features/FideChess";
import { fideHotSeatGameConfig } from "../models/FideHotSeatGameConfig";

export const ConfigForm = () => {
  return (
    <div>
      <FideConfigForm gameConfig={fideHotSeatGameConfig} />
    </div>
  );
};
