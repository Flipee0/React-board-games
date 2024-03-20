import React from "react";
import { observer } from "mobx-react-lite";
import { Switch, useColorScheme } from "@mui/joy";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

export const ColorModeToggleButton = observer(() => {
  const { mode, setMode } = useColorScheme();

  const handleColorModeChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setMode(event.target.checked ? "dark" : "light");
  };

  return (
    <Switch
      checked={mode === "dark"}
      onChange={handleColorModeChange}
      slotProps={{
        thumb: {
          children: mode === "dark" ? <DarkModeIcon /> : <LightModeIcon />,
        },
      }}
      size={"lg"}
    />
  );
});
