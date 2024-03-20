import React from "react";
import { observer } from "mobx-react-lite";
import { CssBaseline, CssVarsProvider } from "@mui/joy";

const WithTheme = observer(({ children }: { children: React.ReactNode }) => {
  return (
    <CssVarsProvider modeStorageKey="colorMode">
      <CssBaseline />
      {children}
    </CssVarsProvider>
  );
});

export default WithTheme;
