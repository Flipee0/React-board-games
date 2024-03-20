import { Sheet, Typography } from "@mui/joy";
import React from "react";

type GameConfigFormProps = {
  header: string;
  children: React.ReactNode | React.ReactNode[];
};

export const GameConfigForm = ({ header, children }: GameConfigFormProps) => {
  return (
    <Sheet
      variant={"outlined"}
      sx={(theme) => ({
        display: "flex",
        flexDirection: "column",
        rowGap: "1em",
        marginTop: "2em",
        marginX: "20%",
        padding: "2em",
        [theme.breakpoints.down("md")]: {
          marginX: "5%",
        },
      })}
    >
      <Typography level={"h3"} sx={{ alignSelf: "center" }}>
        {header}
      </Typography>
      {children}
    </Sheet>
  );
};
