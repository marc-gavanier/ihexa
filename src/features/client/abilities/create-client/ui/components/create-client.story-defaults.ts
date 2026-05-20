import { ServerActionSuccess } from '@arckit/nextjs/client';
import { provide } from '@/configuration/injection';
import { B2BClient, B2CClient } from '@/features/client/domain';
import type { CompanySummary } from '@/libraries/recherche-entreprises';
import { CREATE_B2B_CLIENT_ACTION_KEY, CREATE_B2C_CLIENT_ACTION_KEY, SEARCH_COMPANY_KEY } from '../../action/create-client.key';

export const GOOGLE_FRANCE: CompanySummary = {
  companyName: 'GOOGLE FRANCE',
  legalForm: 'SAS',
  siren: '443061841',
  siret: '44306184100047',
  street: '8 Rue de Londres',
  zipcode: '75009',
  city: 'Paris',
  inseeCode: '75109'
};

const COMPANY_FIXTURES: readonly CompanySummary[] = [GOOGLE_FRANCE];

const matchingCompanies = (query: string): readonly CompanySummary[] =>
  COMPANY_FIXTURES.filter((c) => c.companyName.toLowerCase().includes(query.toLowerCase()));

export const provideCreateClientDefaults = () => {
  provide(SEARCH_COMPANY_KEY, async (query: string) => ServerActionSuccess(matchingCompanies(query)));
  provide(CREATE_B2C_CLIENT_ACTION_KEY, async () =>
    ServerActionSuccess(
      B2CClient({
        id: crypto.randomUUID(),
        name: { firstname: 'Jean-Pierre', lastname: 'DUPONT' },
        address: { street: '123 Rue de la Paix', city: 'Paris', zipcode: '75001' }
      })
    )
  );
  provide(CREATE_B2B_CLIENT_ACTION_KEY, async () =>
    ServerActionSuccess(
      B2BClient({
        id: crypto.randomUUID(),
        denominationSociale: GOOGLE_FRANCE.companyName,
        formeJuridique: 'SAS',
        siret: GOOGLE_FRANCE.siret,
        tvaIntracommunautaire: 'FR64443061841',
        address: { street: GOOGLE_FRANCE.street, city: GOOGLE_FRANCE.city, zipcode: GOOGLE_FRANCE.zipcode }
      })
    )
  );
};
