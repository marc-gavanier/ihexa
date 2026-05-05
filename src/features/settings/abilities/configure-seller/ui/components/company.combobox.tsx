import type { ReactNode } from 'react';
import { inject } from '@/configuration/injection';
import type { CompanySummary } from '@/libraries/recherche-entreprises';
import { SEARCH_COMPANY_KEY } from '../../action/search-company.key';

const itemToString = (item: CompanySummary | null): string => (item ? item.companyName : '');

const itemToKey = (item: CompanySummary): string => item.siret;

export const companyCombobox = () => ({
  itemToString,
  itemToKey,
  loadSuggestions: async (inputValue: string): Promise<{ items: CompanySummary[] }> => {
    if (inputValue.length < 2) return { items: [] };
    const result = await inject(SEARCH_COMPANY_KEY)(inputValue);
    return result.success ? { items: [...result.data] } : { items: [] };
  }
});

export const companyOptions: { itemToKey: typeof itemToKey; renderItem: (props: { item: CompanySummary }) => ReactNode } = {
  itemToKey,
  renderItem: ({ item }) => (
    <div className='flex flex-col items-start p-2'>
      <span className='font-medium'>
        {item.companyName} ({item.legalForm})
      </span>
      <span className='text-sm opacity-70'>SIRET: {item.siret}</span>
    </div>
  )
};
