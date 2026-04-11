import { Client } from '@/features/client/domain';
import type { clientsTable } from './client.table';

type ClientRow = typeof clientsTable.$inferSelect;
type ClientInsertRow = typeof clientsTable.$inferInsert;

export const clientToDomain = (row: ClientRow): Client =>
  Client({
    id: row.id,
    name: { firstname: row.firstname, lastname: row.lastname },
    address: { street: row.street, city: row.city, zipcode: row.zipcode }
  });

export const clientFromDomain = (client: Client): ClientInsertRow => ({
  id: client.id,
  firstname: client.name.firstname,
  lastname: client.name.lastname,
  street: client.address.street,
  city: client.address.city,
  zipcode: client.address.zipcode
});
