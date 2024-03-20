import React from "react";
import GameLogItem from "../models/GameLogItem";
import { FigureIcon } from "./FigureIcon";
import { faEye } from "@fortawesome/free-solid-svg-icons/faEye";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons/faEyeSlash";
import { observer } from "mobx-react-lite";
import { useTheme } from "@mui/joy";
import { FideChessGameStore } from "../models/FideChessGameStore";

type TurnItemLogProps = {
  fideChessStore: FideChessGameStore;
  logItem: GameLogItem;
  index: number;
};

const symbols = ["a", "b", "c", "d", "e", "f", "g", "h"];

const TurnItemLog = observer(
  ({ fideChessStore, logItem, index }: TurnItemLogProps) => {
    const theme = useTheme();
    const handleTurnChoose = () => {
      if (fideChessStore.showedState === logItem.state) {
        fideChessStore.setShowedStateActual();
      } else {
        fideChessStore.showedState = logItem.state;
      }
    };

    return (
      <tr>
        <td
          style={{
            textAlign: "center",
            padding: "1px",
            borderRadius: "10px 0 0 10px",
            borderColor: "var(--TableCell-borderColor)",
            borderLeft: "2px solid",
            borderTop: "2px solid",
            borderBottom: "2px solid",
          }}
        >
          {index + 1}
        </td>
        <td
          style={{
            textAlign: "center",
            padding: "1px",
            borderColor: "var(--TableCell-borderColor)",
            borderTop: "2px solid",
            borderBottom: "2px solid",
          }}
        >
          <FigureIcon
            icon={logItem.stepData.figure.icon}
            color={logItem.stepData.figure.color}
            sx={{
              height: "1.3em",
              stroke: theme.palette.text.primary,
              strokeWidth: "2em",
            }}
          />
          {logItem.morphedTo != null && (
            <>
              {"->"}
              <FigureIcon
                icon={logItem.morphedTo.data.icon}
                color={logItem.morphedTo.data.color}
                sx={{
                  height: "1.3em",
                  stroke: theme.palette.text.primary,
                  strokeWidth: "2em",
                }}
              />
            </>
          )}
        </td>
        <td
          style={{
            textAlign: "center",
            padding: "1px",
            borderColor: "var(--TableCell-borderColor)",
            borderTop: "2px solid",
            borderBottom: "2px solid",
          }}
        >
          {logItem.roqueRookStepData == null && (
            <>
              {`${symbols[logItem.stepData.from.x]}${8 - logItem.stepData.from.y} -> ${symbols[logItem.stepData.to.x]}${8 - logItem.stepData.to.y}`}
            </>
          )}
          {logItem.roqueRookStepData != null && (
            <>{logItem.stepData.to.x === 2 ? "Long roque" : "Short roque"}</>
          )}
        </td>
        <td
          style={{
            textAlign: "center",
            padding: "1px",
            borderColor: "var(--TableCell-borderColor)",
            borderTop: "2px solid",
            borderBottom: "2px solid",
          }}
        >
          {logItem.stepData.eatenFigure != null && (
            <FigureIcon
              icon={logItem.stepData.eatenFigure.icon}
              color={logItem.stepData.eatenFigure.color}
              sx={{
                height: "1.3em",
                stroke: theme.palette.text.primary,
                strokeWidth: "2em",
              }}
            />
          )}
        </td>
        <td
          style={{
            textAlign: "center",
            padding: "1px",
            borderRadius: "0 10px 10px 0",
            borderColor: "var(--TableCell-borderColor)",
            borderRight: "2px solid",
            borderTop: "2px solid",
            borderBottom: "2px solid",
          }}
        >
          <FontAwesomeIcon
            icon={
              fideChessStore.showedState === logItem.state ? faEyeSlash : faEye
            }
            onClick={() => handleTurnChoose()}
          />
        </td>
      </tr>
    );
  },
);

export default TurnItemLog;
