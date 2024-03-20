import React from "react";
import WithTheme from "./withTheme";
import WithRouter from "./withRouter";
import WithLayout from "./withLayout";

export const WithProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <WithTheme>
      <WithRouter >
        <WithLayout>{children}</WithLayout>
      </WithRouter>
    </WithTheme>
  );
};
