import React from "react";
import { Box } from "@mui/joy";

type LayoutProps = {
  children: React.ReactNode;
  appbar: React.ReactNode;
  footer: React.ReactNode;
};

const Layout = ({ children, appbar, footer }: LayoutProps) => {
  return (
    <Box
      sx={{
        bgcolor: "background.appBody",
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: "9000",
          width: "100%",
        }}
      >
        {appbar}
      </Box>
      <Box sx={{ display: "grid" }}>{children}</Box>
      <Box sx={{ marginTop: "auto" }}>{footer}</Box>
    </Box>
  );
};

export default Layout;
