import React from "react";
import { FideChessGameStore } from "../models/FideChessGameStore";
import { observer } from "mobx-react-lite";
import GameLogItem from "../models/GameLogItem";
import TurnItemLog from "./TurnItemLog";
import Timer from "./Timer";
import { Sheet, Typography } from "@mui/joy";
import { ChessColors } from "entities/CommonModels";

type TurnsLogProps = {
  fideChessStore: FideChessGameStore;
};

const TurnsLog = observer(({ fideChessStore }: TurnsLogProps) => {
  const { whiteLog, blackLog } = fideChessStore.gameLog.reduce(
    (accumulator, logItem, index) => {
      if (logItem.stepData.figure.color === ChessColors.WHITE) {
        accumulator.whiteLog.push({ log: logItem, index });
      } else {
        accumulator.blackLog.push({ log: logItem, index });
      }
      return accumulator;
    },
    {
      whiteLog: [],
      blackLog: [],
    } as {
      whiteLog: {
        log: GameLogItem;
        index: number;
      }[];
      blackLog: {
        log: GameLogItem;
        index: number;
      }[];
    },
  );

  return (
    <Sheet
      sx={{
        width: "100%",
        height: "100%",
        display: "grid",
        gridTemplateRows: "auto 1fr",
        gridTemplateColumns: "repeat(6, minmax(0, 1fr))",
        gap: "1em, 0",
        bgcolor: "transparent",
      }}
    >
      <div></div>
      <Typography
        level={"h3"}
        sx={{
          textAlign: "center",
          opacity:
            fideChessStore.currentPlayer === ChessColors.WHITE ? "100%" : "40%",
        }}
      >
        White
      </Typography>
      <Sheet
        sx={(theme) => ({
          gridColumn: "span 2 / span 2",
          fontSize: theme.fontSize.xl,
          bgcolor: "transparent",
          [theme.breakpoints.down("sm")]: {
            fontSize: theme.fontSize.lg,
          },
        })}
      >
        {fideChessStore.timer != null && (
          <Timer fideChessStore={fideChessStore} />
        )}
      </Sheet>
      <Typography
        level={"h3"}
        sx={{
          textAlign: "center",
          opacity:
            fideChessStore.currentPlayer === ChessColors.BLACK ? "100%" : "40%",
        }}
      >
        Black
      </Typography>
      <div></div>
      <table
        style={{
          gridColumn: "span 3 / span 3",
          tableLayout: "fixed",
          height: "fit-content",
          borderSpacing: "0 0.5em",
          borderCollapse: "separate",
          marginRight: "0.5em",
        }}
      >
        <tbody>
          {whiteLog.map((logItem) => (
            <TurnItemLog
              key={logItem.index}
              fideChessStore={fideChessStore}
              logItem={logItem.log}
              index={logItem.index}
            />
          ))}
        </tbody>
      </table>
      <table
        style={{
          gridColumn: "span 3 / span 3",
          tableLayout: "fixed",
          height: "fit-content",
          borderSpacing: "0 0.5em",
          borderCollapse: "separate",
          marginLeft: "0.5em",
        }}
      >
        <tbody>
          {blackLog.map((logItem) => (
            <TurnItemLog
              key={logItem.index}
              fideChessStore={fideChessStore}
              logItem={logItem.log}
              index={logItem.index}
            />
          ))}
        </tbody>
      </table>
    </Sheet>
  );
});

export default TurnsLog;
