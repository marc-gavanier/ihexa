import { After, type DataTable, Given } from '@cucumber/cucumber';
import { ClientToCreate } from '@/features/client/abilities/create-client/domain';
import { createClient } from '@/features/client/abilities/create-client/implementations';
import { clearClients } from '@/features/client/infrastructure';

After(async () => {
  await clearClients();
});

type ClientInputRow = { id: string; firstname: string; lastname: string; street: string; city: string; zipcode: string };

Given(/^the following clients exist$/, async (dataTable: DataTable) => {
  const rows = dataTable.hashes() as ClientInputRow[];
  for (const row of rows) {
    const clientToCreate = ClientToCreate({
      id: row.id,
      name: { firstname: row.firstname, lastname: row.lastname },
      address: { street: row.street, city: row.city, zipcode: row.zipcode }
    });
    await createClient(clientToCreate);
  }
});
