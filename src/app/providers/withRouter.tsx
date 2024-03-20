import React, { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";

const WithRouter = ({ children }: { children: React.ReactNode }) => {
  return (
    <BrowserRouter>
      {/*TODO: add fallback*/}
      <Suspense>{children}</Suspense>
    </BrowserRouter>
  );
};

export default WithRouter;
