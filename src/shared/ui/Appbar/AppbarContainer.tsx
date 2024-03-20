import React from "react";
import { Grid } from "@mui/joy";

type AppbarProps = {
  children: React.ReactNode | React.ReactNode[];
};

export const AppbarContainer = ({ children }: AppbarProps) => {
  return (
    <Grid
      container
      sx={{
        bgcolor: "background.surface",
        boxShadow: "sm",
        borderBottom: "1px solid",
        borderColor: "divider",
        alignItems: "center",
        paddingY: "1em",
        paddingX: "2em",
      }}
    >
      {children}
    </Grid>
  );
};
