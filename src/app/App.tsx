import React from "react";
import { WithProviders } from "./providers";
import { Routing } from "pages";

function App() {
  return (
    <WithProviders>
      <Routing />
    </WithProviders>
  );
}

export default App;
