export const CREATE_CLIENT_ERRORS = {
  ClientAlreadyExists: 'error.clientAlreadyExists'
} as const;

export type CreateClientErrorKey = (typeof CREATE_CLIENT_ERRORS)[keyof typeof CREATE_CLIENT_ERRORS];
