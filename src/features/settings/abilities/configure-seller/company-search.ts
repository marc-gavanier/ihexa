import type { Either } from 'effect';
import type { Siret } from '@/features/settings/domain/seller/siret';
import type { CompanyData, CompanyNotFound, CompanySearchResult, InvalidSiretFormat } from '@/libraries/company-registry';

export type SearchCompany = (query: string) => Promise<Either.Either<readonly CompanySearchResult[], InvalidSiretFormat>>;

export type SelectCompany = (siret: Siret) => Promise<Either.Either<CompanyData, CompanyNotFound>>;
