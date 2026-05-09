import { faker } from '@faker-js/faker/locale/fr';
import { Client, type ClientId } from '../../domain';

const generateClient = (): Client =>
  Client({
    id: faker.string.uuid(),
    name: {
      firstname: faker.person.firstName(),
      lastname: faker.person.lastName().toUpperCase()
    },
    address: {
      street: faker.location.streetAddress(),
      city: faker.location.city(),
      zipcode: faker.location.zipCode('#####')
    }
  });

const CLIENTS = new Map<ClientId, Client>(
  Array.from({ length: 15 }, () => {
    const client = generateClient();
    return [client.id, client] as const;
  })
);

export const clientsStore = (): Map<ClientId, Client> => CLIENTS;

export const clearClientsStore = (): void => {
  clientsStore().clear();
};
