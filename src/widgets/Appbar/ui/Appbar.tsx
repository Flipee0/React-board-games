import React from "react";
import { Appbar as AppbarEntity } from "entities/Appbar";
import { ColorModeToggleButton } from "features/ColorModeToggleButton";

export const Appbar = () => {
  return <AppbarEntity colorModeToggleButton={<ColorModeToggleButton />} />;
};

