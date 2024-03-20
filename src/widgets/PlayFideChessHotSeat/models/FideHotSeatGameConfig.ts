import { FideGameConfig } from "features/FideChess";

class FideHotSeatGameConfig extends FideGameConfig {
  constructor() {
    super();
  }
  getUrlParams(): string {
    return "";
  }
}

export const fideHotSeatGameConfig = new FideHotSeatGameConfig();
