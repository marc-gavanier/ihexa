export type LngDetector = (request: Request) => string | null | Promise<string | null>;

export type LngDetectorFactory<TOptions = void> = TOptions extends void
  ? () => LngDetector
  : (options: TOptions) => LngDetector;
