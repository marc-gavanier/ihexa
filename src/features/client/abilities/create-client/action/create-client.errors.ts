export const CREATE_CLIENT_ERRORS = {
  ClientAlreadyExists: 'error.clientAlreadyExists',
  SiretAlreadyExists: 'error.siretAlreadyExists'
} as const;

export type CreateClientErrorKey = (typeof CREATE_CLIENT_ERRORS)[keyof typeof CREATE_CLIENT_ERRORS];
