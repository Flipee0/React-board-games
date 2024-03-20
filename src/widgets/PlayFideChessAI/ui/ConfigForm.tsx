import { Button, ToggleButtonGroup, Typography } from "@mui/joy";
import React from "react";
import { fideAIGameConfig, RANDOM } from "../models/FideAIGameConfig";
import { observer } from "mobx-react-lite";
import { ChessColors } from "entities/CommonModels";

export const ConfigForm = observer(() => {
  return (
    <div>
      <Typography>Select your color</Typography>
      <ToggleButtonGroup>
        <Button
          aria-pressed={fideAIGameConfig.selectedColor === ChessColors.WHITE}
          onClick={() => (fideAIGameConfig.selectedColor = ChessColors.WHITE)}
        >
          White
        </Button>
        <Button
          aria-pressed={fideAIGameConfig.selectedColor === ChessColors.BLACK}
          onClick={() => (fideAIGameConfig.selectedColor = ChessColors.BLACK)}
        >
          Black
        </Button>
        <Button
          aria-pressed={fideAIGameConfig.selectedColor === RANDOM}
          onClick={() => (fideAIGameConfig.selectedColor = RANDOM)}
        >
          Random
        </Button>
      </ToggleButtonGroup>
      <Typography sx={{ marginTop: "1em" }}>Select AI level</Typography>
      <ToggleButtonGroup>
        <Button
          aria-pressed={fideAIGameConfig.aiLevel === 0}
          onClick={() => (fideAIGameConfig.aiLevel = 0)}
        >
          Almost random moves
        </Button>
        <Button
          aria-pressed={fideAIGameConfig.aiLevel === 1}
          onClick={() => (fideAIGameConfig.aiLevel = 1)}
        >
          Beginner
        </Button>
        <Button
          aria-pressed={fideAIGameConfig.aiLevel === 2}
          onClick={() => (fideAIGameConfig.aiLevel = 2)}
        >
          Intermediate
        </Button>
        <Button
          aria-pressed={fideAIGameConfig.aiLevel === 3}
          onClick={() => (fideAIGameConfig.aiLevel = 3)}
        >
          Advanced
        </Button>
        <Button
          aria-pressed={fideAIGameConfig.aiLevel === 4}
          onClick={() => (fideAIGameConfig.aiLevel = 4)}
        >
          Experienced
        </Button>
      </ToggleButtonGroup>
    </div>
  );
});
