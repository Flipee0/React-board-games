import { faCrown } from "@fortawesome/free-solid-svg-icons";
import {
  Button,
  Modal,
  ModalDialog,
  Sheet,
  Typography,
  useTheme,
} from "@mui/joy";
import React from "react";
import { FigureIcon } from "./FigureIcon";
import pagePaths from "shared/models/PagePaths";
import GameLogItem from "../models/GameLogItem";
import { ChessColors } from "entities/CommonModels";
import { PlayerStates } from "../models/PlayerStates";

type GameResultsModalProps = {
  color: ChessColors;
  state: PlayerStates;
  gameLog: GameLogItem[];
};

const GameResultsModal = ({ color, state, gameLog }: GameResultsModalProps) => {
  const theme = useTheme();
  const isDraw = state === PlayerStates.STALEMATE;
  const otherColor =
    color === ChessColors.BLACK ? ChessColors.WHITE : ChessColors.BLACK;

  return (
    <Modal open={true}>
      <ModalDialog>
        <Typography level={"h2"}>
          {isDraw
            ? "Draw"
            : otherColor[0].toUpperCase() +
              otherColor.slice(1, otherColor.length) +
              " player wins!"}
        </Typography>
        {isDraw ? (
          <Sheet
            sx={{
              position: "relative",
              height: "4em",
              width: "100%",
            }}
          >
            <FigureIcon
              icon={faCrown}
              color={ChessColors.WHITE}
              sx={{
                position: "absolute",
                alignSelf: "center",
                width: "5em",
                height: "4em",
                stroke: theme.palette.text.primary,
                strokeWidth: "2em",
                clipPath: "polygon(100% 0%, 20% 100%, 0% 100%, 0% 0%)",
                left: "50%",
                transform: "translate(-50%, 0)",
              }}
            />
            <FigureIcon
              icon={faCrown}
              color={ChessColors.BLACK}
              sx={{
                position: "absolute",
                alignSelf: "center",
                width: "5em",
                height: "4em",
                stroke: theme.palette.text.primary,
                strokeWidth: "2em",
                clipPath: "polygon(100% 0%, 20% 100%, 100% 100%)",
                left: "50%",
                transform: "translate(-50%, 0)",
              }}
            />
          </Sheet>
        ) : (
          <FigureIcon
            icon={faCrown}
            color={otherColor}
            sx={{
              alignSelf: "center",
              width: "5em",
              height: "4em",
              stroke: theme.palette.text.primary,
              strokeWidth: "2em",
            }}
          />
        )}
        <Typography>
          {color[0].toUpperCase() + color.slice(1, color.length)} player gets{" "}
          {state} in {gameLog.length} steps
        </Typography>
        <Sheet
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "0 0.5em",
          }}
        >
          <Button component={"a"} href={""}>
            Restart
          </Button>
          <Button component={"a"} href={pagePaths.gameConfig + pagePaths.chess}>
            Change rules
          </Button>
        </Sheet>
      </ModalDialog>
    </Modal>
  );
};

export default GameResultsModal;
