import React, { Suspense } from "react";
import {HashRouter} from "react-router-dom";

const WithRouter = ({ children }: { children: React.ReactNode }) => {
  return (
    <HashRouter>
      {/*TODO: add fallback*/}
      <Suspense>{children}</Suspense>
    </HashRouter>
  );
};

export default WithRouter;
