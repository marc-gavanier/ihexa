export type WrapPrimitive<T> = Readonly<T> & { readonly brand: unique symbol };
