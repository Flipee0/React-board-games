export abstract class GameConfig {
  public abstract getUrlParams(): string;
  public abstract get isConfigValid(): boolean;
}
