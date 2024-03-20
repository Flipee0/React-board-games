import React, { useState } from "react";
import { GameConfig, GameConfigForm } from "entities/GameConfigForm";
import pagePaths from "shared/models/PagePaths";
import { Button, ToggleButtonGroup } from "@mui/joy";
import {
  FideChessHotSeatConfigForm,
  fideHotSeatGameConfig,
} from "widgets/PlayFideChessHotSeat";
import { useNavigate } from "react-router-dom";
import { FideChessAIConfigForm } from "widgets/PlayFideChessAI";

type ruleType = {
  label: string;
  value: string;
  form: React.ReactNode;
  data: GameConfig;
};

type modeType = {
  label: string;
  value: string;
  rules: ruleType[];
};

const modes: modeType[] = [
  {
    label: "Hot seat",
    value: pagePaths.hotSeat,
    rules: [
      {
        label: "Fide",
        value: pagePaths.fide,
        form: <FideChessHotSeatConfigForm />,
        data: fideHotSeatGameConfig,
      },
    ],
  },
  {
    label: "AI",
    value: pagePaths.ai,
    rules: [
      {
        label: "Fide",
        value: pagePaths.fide,
        form: <FideChessAIConfigForm />,
        data: fideHotSeatGameConfig,
      },
    ],
  },
];

export const ChessConfigForm = () => {
  const [selectedMode, setSelectedMode] = useState(modes[0]);
  const [selectedRule, setSelectedRule] = useState(modes[0].rules[0]);

  const navigate = useNavigate();

  const handleModeChange = (newMode: modeType) => {
    setSelectedMode(newMode);
    setSelectedRule(newMode.rules[0]);
  };

  const handleRulesChange = (newRule: ruleType) => {
    setSelectedRule(newRule);
  };

  const onSubmit = async () => {
    if (selectedRule.data.isConfigValid) {
      return navigate(
        pagePaths.playChess +
          selectedRule.value +
          selectedMode.value +
          "?" +
          selectedRule.data.getUrlParams(),
      );
    }
  };

  return (
    <GameConfigForm header={"Play chess"}>
      <ToggleButtonGroup>
        {modes.map((mode, index) => (
          <Button
            key={index}
            aria-pressed={mode === selectedMode}
            onClick={() => handleModeChange(mode)}
          >
            {mode.label}
          </Button>
        ))}
      </ToggleButtonGroup>
      <ToggleButtonGroup>
        {selectedMode.rules.map((rule, index) => (
          <Button
            key={index}
            aria-pressed={rule === selectedRule}
            onClick={() => handleRulesChange(rule)}
          >
            {rule.label}
          </Button>
        ))}
      </ToggleButtonGroup>
      {selectedRule.form}
      <Button onClick={onSubmit}>start</Button>
    </GameConfigForm>
  );
};
