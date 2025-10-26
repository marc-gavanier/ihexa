type ClientResponseError =
  | 400
  | 401
  | 402
  | 403
  | 404
  | 405
  | 406
  | 407
  | 408
  | 409
  | 410
  | 411
  | 412
  | 413
  | 414
  | 415
  | 416
  | 417
  | 418
  | 421
  | 422
  | 423
  | 424
  | 425
  | 426
  | 428
  | 429
  | 431
  | 451;

type ServerResponseError = 500 | 501 | 502 | 503 | 504 | 505 | 506 | 507 | 508 | 510 | 511;

export type ResponseErrorHandler<T extends { _tag: string }> = {
  [K in T['_tag']]: {
    message: (value: Extract<T, { _tag: K }> extends { value: infer V } ? V : never) => string;
    status: ClientResponseError | ServerResponseError;
  };
};

export const responseErrorFor =
  <T extends { _tag: string }, K extends keyof ResponseErrorHandler<T> & T['_tag']>(error: Extract<T, { _tag: K }>) =>
  (errorHandler: ResponseErrorHandler<T>): Response => {
    const value = 'value' in error ? error.value : undefined;

    return new Response(errorHandler[error._tag].message(value as never), {
      status: errorHandler[error._tag].status
    });
  };
