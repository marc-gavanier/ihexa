import { Either } from 'effect';
import { ServerActionError, type ServerActionResult, ServerActionSuccess } from './result';

type FromEitherOptions<TResult, TError extends { _tag: string }> = {
  onError?: { [K in TError['_tag']]?: string };
  onSuccess?: (result: TResult) => void;
};

export const fromEither =
  <TCtx, TResult, TError extends { _tag: string }>(
    handler: (ctx: TCtx) => Promise<Either.Either<TResult, TError>>,
    options: FromEitherOptions<TResult, TError> = {}
  ): ((ctx: TCtx) => Promise<ServerActionResult<TResult>>) =>
  async (ctx: TCtx): Promise<ServerActionResult<TResult>> => {
    const result = await handler(ctx);

    if (Either.isLeft(result)) {
      const tag = result.left._tag;
      return ServerActionError(options.onError?.[tag as keyof typeof options.onError] ?? `error.${tag}`);
    }

    options.onSuccess?.(result.right);
    return ServerActionSuccess(result.right);
  };
