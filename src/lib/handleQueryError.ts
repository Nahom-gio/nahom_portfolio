export type AppError = {
  message: string;
  code?: string;
  cause?: unknown;
  retryable?: boolean;
  context?: Record<string, unknown>;
};

const DEFAULT_MESSAGE = "Something went wrong. Please try again.";

export function handleQueryError(
  error: unknown,
  context: Record<string, unknown> = {}
): AppError {
  if (error instanceof Error) {
    return {
      message: error.message || DEFAULT_MESSAGE,
      code: (error as { code?: string }).code,
      cause: error,
      retryable: false,
      context,
    };
  }

  if (typeof error === "string") {
    return {
      message: error || DEFAULT_MESSAGE,
      retryable: false,
      context,
    };
  }

  return {
    message: DEFAULT_MESSAGE,
    retryable: false,
    cause: error,
    context,
  };
}
