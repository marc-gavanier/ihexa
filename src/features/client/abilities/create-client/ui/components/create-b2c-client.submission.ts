import type { CreateB2CClientInput } from '../../action/create-client.validation';

export type CreateB2CClientFormValues = {
  readonly id: string;
  readonly firstname: string;
  readonly lastname: string;
  readonly street: string;
  readonly city: string;
  readonly zipcode: string;
  readonly email: string;
  readonly phone: string;
};

export const emptyB2CClientFormValues = (): CreateB2CClientFormValues => ({
  id: crypto.randomUUID(),
  firstname: '',
  lastname: '',
  street: '',
  city: '',
  zipcode: '',
  email: '',
  phone: ''
});

export const toCreateB2CClientInput = (values: CreateB2CClientFormValues): CreateB2CClientInput => ({
  id: values.id,
  firstname: values.firstname,
  lastname: values.lastname,
  street: values.street,
  city: values.city,
  zipcode: values.zipcode,
  ...(values.email !== '' ? { email: values.email } : {}),
  ...(values.phone !== '' ? { phone: values.phone } : {})
});
