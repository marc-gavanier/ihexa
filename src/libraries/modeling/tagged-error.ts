export const taggedError = <T extends string>(tag: T): { readonly _tag: T } => ({ _tag: tag });
