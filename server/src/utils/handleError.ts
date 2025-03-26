import { Response } from "express";

interface ErrorHandlerExtra {
  code?: number;
  errorRaw?: unknown;
}

export const handleError = (
  res: Response,
  message: string,
  extra: ErrorHandlerExtra = { code: 500, errorRaw: null },
) => {
  const { code, errorRaw } = extra;
  res.status(code ?? 500).send({
    ok: false,
    error: message,
    detail: errorRaw || null,
  });
};
