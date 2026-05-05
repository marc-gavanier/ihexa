import assert from 'node:assert';
import type { DataTable } from '@cucumber/cucumber';
import { Given, Then, When } from '@cucumber/cucumber';
import { Either, Schema } from 'effect';
import { InseeCode, SellerCity, SellerStreet, SellerZipcode } from '@/features/settings/domain/seller/address';
import { CompanyName } from '@/features/settings/domain/seller/company-name';
import { Email } from '@/features/settings/domain/seller/email';
import type { LegalForm } from '@/features/settings/domain/seller/legal-form';
import { Phone } from '@/features/settings/domain/seller/phone';
import { RcsRegistration } from '@/features/settings/domain/seller/rcs-registration';
import type { Seller, SellerConfigurationError, ValidatedSellerInput } from '@/features/settings/domain/seller/seller';
import { ShareCapital } from '@/features/settings/domain/seller/share-capital';
import { Siren } from '@/features/settings/domain/seller/siren';
import { Siret } from '@/features/settings/domain/seller/siret';
import { VatNumber } from '@/features/settings/domain/seller/vat-number';
import { VAT_REGIMES, VatRegime } from '@/features/settings/domain/seller/vat-regime';
import { Website } from '@/features/settings/domain/seller/website';
import { clearSettings } from '@/features/settings/infrastructure';
import type { CompanySummary } from '@/libraries/recherche-entreprises';
import { getSellerConfiguration, saveSellerConfiguration, searchCompany } from './implementations';

interface RawSellerInput {
  readonly companyName: string;
  readonly legalForm: LegalForm;
  readonly siren: string;
  readonly siret: string;
  readonly street: string;
  readonly zipcode: string;
  readonly city: string;
  readonly inseeCode: string;
  readonly vatRegime?: VatRegime;
  readonly vatNumber?: string;
  readonly taxDebitOption?: boolean;
  readonly rcsRegistration?: string;
  readonly shareCapital?: number;
  readonly email: string;
  readonly phone?: string;
  readonly website?: string;
}

const buildValidatedInput = (raw: RawSellerInput): ValidatedSellerInput => {
  if (!raw.vatRegime || !VAT_REGIMES.includes(raw.vatRegime)) {
    throw new Error('VAT regime is required');
  }
  return {
    companyName: CompanyName(raw.companyName),
    legalForm: raw.legalForm,
    siren: Siren(raw.siren),
    siret: Siret(raw.siret),
    street: SellerStreet(raw.street),
    zipcode: SellerZipcode(raw.zipcode),
    city: SellerCity(raw.city),
    inseeCode: InseeCode(raw.inseeCode),
    vatRegime: raw.vatRegime,
    email: Email(raw.email),
    ...(raw.vatNumber != null ? { vatNumber: VatNumber(raw.vatNumber) } : {}),
    ...(raw.taxDebitOption != null ? { taxDebitOption: raw.taxDebitOption } : {}),
    ...(raw.rcsRegistration != null ? { rcsRegistration: RcsRegistration(raw.rcsRegistration) } : {}),
    ...(raw.shareCapital != null ? { shareCapital: ShareCapital(raw.shareCapital) } : {}),
    ...(raw.phone != null ? { phone: Phone(raw.phone) } : {}),
    ...(raw.website != null ? { website: Website(raw.website) } : {})
  };
};

const buildAndSave = async (raw: RawSellerInput): Promise<Either.Either<Seller, SellerConfigurationError | Error>> => {
  try {
    const validated = buildValidatedInput(raw);
    return await saveSellerConfiguration(validated);
  } catch (error) {
    return Either.left(error instanceof Error ? error : new Error('Validation failed'));
  }
};

let searchResults: readonly CompanySummary[] | undefined;
let savedSeller: Seller | undefined;
let saveError: unknown;
let sellerUnavailable: boolean;
let currentRawInput: Partial<RawSellerInput>;

const resetState = (): void => {
  searchResults = undefined;
  savedSeller = undefined;
  saveError = undefined;
  sellerUnavailable = false;
  currentRawInput = {};
};

// --- Given ---

Given(/^there is no seller configured$/, async () => {
  resetState();
  await clearSettings();
});

Given(/^I have selected company "([^"]*)" with legal form "([^"]*)"$/, async (_companyName: string, legalForm: LegalForm) => {
  resetState();
  await clearSettings();

  const fixtures: Record<string, Partial<RawSellerInput>> = {
    'ACME SARL': {
      companyName: 'ACME SARL',
      legalForm: 'SARL',
      siren: '123456789',
      siret: '12345678900014',
      street: '10 Rue du Commerce',
      zipcode: '75015',
      city: 'Paris',
      inseeCode: '75115'
    },
    'DUPONT EI': {
      companyName: 'DUPONT EI',
      legalForm: legalForm,
      siren: '987654321',
      siret: '98765432100012',
      street: '5 Avenue de la Paix',
      zipcode: '69001',
      city: 'Lyon',
      inseeCode: '69123'
    }
  };

  currentRawInput = fixtures[_companyName] ?? {
    companyName: _companyName,
    legalForm: legalForm,
    siren: '111222333',
    siret: '11122233300014',
    street: '1 Rue Test',
    zipcode: '75001',
    city: 'Paris',
    inseeCode: '75101'
  };
});

Given(/^a seller is configured with email "([^"]*)"$/, async (email: string) => {
  resetState();
  await clearSettings();

  const raw: RawSellerInput = {
    companyName: 'ACME SARL',
    legalForm: 'SARL',
    siren: '123456789',
    siret: '12345678900014',
    street: '10 Rue du Commerce',
    zipcode: '75015',
    city: 'Paris',
    inseeCode: '75115',
    vatRegime: 'normal',
    vatNumber: 'FR32123456789',
    taxDebitOption: false,
    email
  };

  const result = await buildAndSave(raw);
  assert.ok(Either.isRight(result), 'Failed to configure seller');
  savedSeller = result.right;
  currentRawInput = { ...raw };
});

Given(
  /^a seller is configured with VAT regime "([^"]*)" and tax debit option "([^"]*)"$/,
  async (vatRegime: VatRegime, taxDebitOption: string) => {
    resetState();
    await clearSettings();

    const raw: RawSellerInput = {
      companyName: 'ACME SARL',
      legalForm: 'SARL',
      siren: '123456789',
      siret: '12345678900014',
      street: '10 Rue du Commerce',
      zipcode: '75015',
      city: 'Paris',
      inseeCode: '75115',
      vatRegime: vatRegime,
      ...(vatRegime === 'normal' ? { vatNumber: 'FR32123456789' } : {}),
      taxDebitOption: taxDebitOption === 'yes',
      email: 'contact@acme.fr'
    };

    const result = await buildAndSave(raw);
    assert.ok(Either.isRight(result), 'Failed to configure seller');
    savedSeller = result.right;
    currentRawInput = { ...raw };
  }
);

// --- When ---

When(/^I search for a company with SIRET "([^"]*)"$/, async (siret: string) => {
  searchResults = await searchCompany(siret);
});

When(/^I search for a company with name "([^"]*)"$/, async (name: string) => {
  searchResults = await searchCompany(name);
});

When(/^I save the seller configuration with$/, async (dataTable: DataTable) => {
  const tableData = Object.fromEntries(dataTable.rows());
  const { email: tableEmail, ...rest } = tableData;

  const vatRegime = rest['VAT regime']?.replace(/ /g, '_') ?? currentRawInput.vatRegime;
  const isNormal = vatRegime === 'normal';

  const raw: RawSellerInput = {
    companyName: currentRawInput.companyName ?? '',
    legalForm: currentRawInput.legalForm ?? 'SARL',
    siren: currentRawInput.siren ?? '',
    siret: currentRawInput.siret ?? '',
    street: currentRawInput.street ?? '',
    zipcode: currentRawInput.zipcode ?? '',
    city: currentRawInput.city ?? '',
    inseeCode: currentRawInput.inseeCode ?? '75101',
    vatRegime,
    email: tableEmail ?? currentRawInput.email ?? '',
    ...(tableData['tax debit option'] != null ? { taxDebitOption: tableData['tax debit option'] === 'yes' } : {}),
    ...(isNormal && !tableData['VAT number'] ? { vatNumber: currentRawInput.vatNumber ?? 'FR32123456789' } : {}),
    ...(tableData['VAT number'] != null ? { vatNumber: tableData['VAT number'] } : {}),
    ...(tableData['share capital'] != null ? { shareCapital: Number(tableData['share capital']) } : {})
  };

  currentRawInput = { ...currentRawInput, ...raw };

  const result = await buildAndSave(raw);
  if (Either.isRight(result)) {
    savedSeller = result.right;
    saveError = undefined;
  } else {
    saveError = result.left;
    savedSeller = undefined;
  }
});

When(/^I save the seller configuration without a VAT regime$/, async () => {
  const raw: RawSellerInput = {
    companyName: currentRawInput.companyName ?? '',
    legalForm: currentRawInput.legalForm ?? 'SARL',
    siren: currentRawInput.siren ?? '',
    siret: currentRawInput.siret ?? '',
    street: currentRawInput.street ?? '',
    zipcode: currentRawInput.zipcode ?? '',
    city: currentRawInput.city ?? '',
    inseeCode: currentRawInput.inseeCode ?? '75101',
    email: 'contact@acme.fr'
  };

  const result = await buildAndSave(raw);
  if (Either.isRight(result)) {
    savedSeller = result.right;
    saveError = undefined;
  } else {
    saveError = result.left;
    savedSeller = undefined;
  }
});

When(/^I save the seller configuration without an email$/, async () => {
  const raw: RawSellerInput = {
    companyName: currentRawInput.companyName ?? '',
    legalForm: currentRawInput.legalForm ?? 'SARL',
    siren: currentRawInput.siren ?? '',
    siret: currentRawInput.siret ?? '',
    street: currentRawInput.street ?? '',
    zipcode: currentRawInput.zipcode ?? '',
    city: currentRawInput.city ?? '',
    inseeCode: currentRawInput.inseeCode ?? '75101',
    vatRegime: 'normal',
    vatNumber: 'FR32123456789',
    email: ''
  };

  const result = await buildAndSave(raw);
  if (Either.isRight(result)) {
    savedSeller = result.right;
    saveError = undefined;
  } else {
    saveError = result.left;
    savedSeller = undefined;
  }
});

When(/^I update the seller email to "([^"]*)"$/, (email: string) => {
  currentRawInput = { ...currentRawInput, email };
});

When(/^I save the seller configuration$/, async () => {
  const raw: RawSellerInput = {
    companyName: currentRawInput.companyName ?? '',
    legalForm: currentRawInput.legalForm ?? 'SARL',
    siren: currentRawInput.siren ?? '',
    siret: currentRawInput.siret ?? '',
    street: currentRawInput.street ?? '',
    zipcode: currentRawInput.zipcode ?? '',
    city: currentRawInput.city ?? '',
    inseeCode: currentRawInput.inseeCode ?? '75101',
    vatRegime: currentRawInput.vatRegime ?? 'normal',
    ...(currentRawInput.vatNumber != null ? { vatNumber: currentRawInput.vatNumber } : {}),
    ...(currentRawInput.taxDebitOption != null ? { taxDebitOption: currentRawInput.taxDebitOption } : {}),
    email: currentRawInput.email ?? ''
  };

  const result = await buildAndSave(raw);
  if (Either.isRight(result)) {
    savedSeller = result.right;
    saveError = undefined;
  } else {
    saveError = result.left;
    savedSeller = undefined;
  }
});

When(/^I change the VAT regime to "([^"]*)"$/, (vatRegime: string) => {
  const regime = Schema.decodeUnknownSync(VatRegime)(vatRegime.replace(/ /g, '_'));
  currentRawInput = { ...currentRawInput, vatRegime: regime };
  if (regime === 'franchise_en_base') {
    const { vatNumber, taxDebitOption, ...rest } = currentRawInput;
    currentRawInput = rest;
  }
});

When(/^I attempt to retrieve the seller configuration$/, async () => {
  const result = await getSellerConfiguration();
  sellerUnavailable = Either.isLeft(result);
});

When(/^I save the seller configuration with SIRET "([^"]*)"$/, async (siret: string) => {
  const raw: RawSellerInput = {
    companyName: 'Test Company',
    legalForm: 'SARL',
    siren: '123456789',
    siret,
    street: '1 Rue Test',
    zipcode: '75001',
    city: 'Paris',
    inseeCode: '75101',
    vatRegime: 'normal',
    vatNumber: 'FR32123456789',
    email: 'test@test.fr'
  };

  const result = await buildAndSave(raw);
  if (Either.isRight(result)) {
    savedSeller = result.right;
    saveError = undefined;
  } else {
    saveError = result.left;
    savedSeller = undefined;
  }
});

When(/^I save the seller configuration with SIREN "([^"]*)"$/, async (siren: string) => {
  const raw: RawSellerInput = {
    companyName: 'Test Company',
    legalForm: 'SARL',
    siren,
    siret: '12345678900014',
    street: '1 Rue Test',
    zipcode: '75001',
    city: 'Paris',
    inseeCode: '75101',
    vatRegime: 'normal',
    vatNumber: 'FR32123456789',
    email: 'test@test.fr'
  };

  const result = await buildAndSave(raw);
  if (Either.isRight(result)) {
    savedSeller = result.right;
    saveError = undefined;
  } else {
    saveError = result.left;
    savedSeller = undefined;
  }
});

// --- Then ---

Then(/^the results should include a company named "([^"]*)"$/, (name: string) => {
  assert.ok(searchResults, 'Search results should be defined');
  const found = searchResults.some((r) => r.companyName === name);
  assert.ok(found, `Expected to find company "${name}" in results`);
});

Then(/^the results should include full company data$/, (dataTable: DataTable) => {
  assert.ok(searchResults, 'Search results should be defined');
  const entries = Object.fromEntries(dataTable.rows());
  const company = searchResults.find((r) => r.companyName === entries['company name']);
  assert.ok(company, `Expected to find company "${entries['company name']}" in results`);

  const { SIREN, SIRET, zipcode, city, ...expected } = entries;
  if (expected['legal form']) assert.strictEqual(company.legalForm, expected['legal form']);
  if (SIREN) assert.strictEqual(company.siren, SIREN);
  if (SIRET) assert.strictEqual(company.siret, SIRET);
  if (expected['registered address']) assert.strictEqual(company.street, expected['registered address']);
  if (zipcode) assert.strictEqual(company.zipcode, zipcode);
  if (city) assert.strictEqual(company.city, city);
});

Then(/^the seller configuration should be saved successfully$/, () => {
  assert.ok(savedSeller, `Seller configuration should be saved. Error: ${saveError}`);
  assert.strictEqual(saveError, undefined);
});

Then(/^the seller configuration should not be saved$/, () => {
  assert.ok(saveError, 'Expected seller configuration to fail');
  assert.strictEqual(savedSeller, undefined);
});

Then(/^the seller should have no intra-EU VAT number$/, () => {
  assert.ok(savedSeller, 'Seller should be configured');
  assert.strictEqual('vatNumber' in savedSeller, false);
});

Then(/^the seller should have no tax debit option$/, () => {
  assert.ok(savedSeller, 'Seller should be configured');
  assert.strictEqual('taxDebitOption' in savedSeller, false);
});

Then(/^no companies should be found$/, () => {
  assert.ok(searchResults, 'Search results should be defined');
  assert.strictEqual(searchResults.length, 0);
});

Then(/^the seller configuration should have email "([^"]*)"$/, async (email: string) => {
  const result = await getSellerConfiguration();
  assert.ok(Either.isRight(result), 'Seller should be configured');
  assert.strictEqual(result.right.email, email);
});

Then(/^the seller configuration should be unavailable$/, () => {
  assert.ok(sellerUnavailable, 'Seller configuration should be unavailable when not configured');
});
