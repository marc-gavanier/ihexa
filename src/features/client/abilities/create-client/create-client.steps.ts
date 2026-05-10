import assert from 'node:assert';
import { assertMatchesDataTable } from '@arckit/cucumber';
import type { DataTable } from '@cucumber/cucumber';
import { Given, Then, When } from '@cucumber/cucumber';
import { Either } from 'effect';
import { setSearchResults } from '@/configuration/cucumber/company-search-results';
import type { Client } from '@/features/client/domain';
import {
  B2BClientToCreate,
  B2CClientToCreate,
  type ClientAlreadyExists,
  type CompanySearchResult,
  type SiretAlreadyExists
} from './domain';
import { createClient, searchCompany } from './implementations';

let lastCreatedClient: Client | undefined;
let lastError: (ClientAlreadyExists | SiretAlreadyExists) | undefined;
let currentCompany: CompanySearchResult | undefined;

Given(/^I am on the client list page$/, () => {
  lastCreatedClient = undefined;
  lastError = undefined;
  currentCompany = undefined;
});

Given(/^a company search for "([^"]*)" returns the following result$/, async (query: string, dataTable: DataTable) => {
  const data = Object.fromEntries(dataTable.rows());
  currentCompany = {
    companyName: data['denominationSociale'] ?? '',
    legalForm: data['formeJuridique'] ?? '',
    siren: (data['siret'] ?? '').slice(0, 9),
    siret: data['siret'] ?? '',
    street: data['street'] ?? '',
    zipcode: data['zipcode'] ?? '',
    city: data['city'] ?? '',
    inseeCode: ''
  };
  const results = await searchCompany(query);
  setSearchResults(results);
});

Given(/^a company search for "([^"]*)" returns "([^"]*)"$/, async (query: string, companyName: string) => {
  const results = await searchCompany(query);
  setSearchResults(results);
  currentCompany = results.find((r) => r.companyName === companyName) ?? {
    companyName,
    legalForm: 'SARL',
    siren: query.slice(0, 9),
    siret: query,
    street: '8 Rue de Londres',
    zipcode: '75009',
    city: 'Paris',
    inseeCode: ''
  };
});

Given(/^a B2B client already exists with SIRET "([^"]*)"$/, async (siret: string) => {
  const clientToCreate = B2BClientToCreate({
    id: crypto.randomUUID(),
    denominationSociale: 'Existing Company',
    formeJuridique: 'SARL',
    siret,
    address: { street: '1 Rue Test', city: 'Paris', zipcode: '75001' }
  });
  await createClient(clientToCreate);
});

When(/^I create a B2C client with the following data$/, async (dataTable: DataTable) => {
  const data = Object.fromEntries(dataTable.rows());
  const clientToCreate = B2CClientToCreate({
    id: crypto.randomUUID(),
    name: { firstname: data['firstname'] ?? '', lastname: data['lastname'] ?? '' },
    address: { street: data['street'] ?? '', city: data['city'] ?? '', zipcode: data['zipcode'] ?? '' },
    ...(data['email'] != null ? { email: data['email'] } : {}),
    ...(data['phone'] != null ? { phone: data['phone'] } : {})
  });
  const result = await createClient(clientToCreate);
  if (Either.isRight(result)) {
    lastCreatedClient = result.right;
    lastError = undefined;
  } else {
    lastCreatedClient = undefined;
    lastError = result.left;
  }
});

When(/^I create a B2C client with firstname "([^"]*)" and lastname "([^"]*)"$/, async (firstname: string, lastname: string) => {
  const clientToCreate = B2CClientToCreate({
    id: crypto.randomUUID(),
    name: { firstname, lastname },
    address: { street: '1 Rue Test', city: 'Paris', zipcode: '75001' }
  });
  const result = await createClient(clientToCreate);
  if (Either.isRight(result)) {
    lastCreatedClient = result.right;
    lastError = undefined;
  } else {
    lastCreatedClient = undefined;
    lastError = result.left;
  }
});

When(/^I create a B2B client from this company$/, async () => {
  assert.ok(currentCompany, 'No company selected');
  const clientToCreate = B2BClientToCreate({
    id: crypto.randomUUID(),
    denominationSociale: currentCompany.companyName,
    formeJuridique: currentCompany.legalForm,
    siret: currentCompany.siret,
    address: { street: currentCompany.street, city: currentCompany.city, zipcode: currentCompany.zipcode }
  });
  const result = await createClient(clientToCreate);
  if (Either.isRight(result)) {
    lastCreatedClient = result.right;
    lastError = undefined;
  } else {
    lastCreatedClient = undefined;
    lastError = result.left;
  }
});

When(/^I create a B2B client from this company with$/, async (dataTable: DataTable) => {
  assert.ok(currentCompany, 'No company selected');
  const data = Object.fromEntries(dataTable.rows());
  const clientToCreate = B2BClientToCreate({
    id: crypto.randomUUID(),
    denominationSociale: currentCompany.companyName,
    formeJuridique: currentCompany.legalForm,
    siret: currentCompany.siret,
    address: { street: currentCompany.street, city: currentCompany.city, zipcode: currentCompany.zipcode },
    ...(data['email'] != null ? { email: data['email'] } : {}),
    ...(data['phone'] != null ? { phone: data['phone'] } : {})
  });
  const result = await createClient(clientToCreate);
  if (Either.isRight(result)) {
    lastCreatedClient = result.right;
    lastError = undefined;
  } else {
    lastCreatedClient = undefined;
    lastError = result.left;
  }
});

When(/^I create a B2B client with SIRET "([^"]*)"$/, async (siret: string) => {
  const clientToCreate = B2BClientToCreate({
    id: crypto.randomUUID(),
    denominationSociale: 'Test Company',
    formeJuridique: 'SARL',
    siret,
    address: { street: '1 Rue Test', city: 'Paris', zipcode: '75001' }
  });
  const result = await createClient(clientToCreate);
  if (Either.isRight(result)) {
    lastCreatedClient = result.right;
    lastError = undefined;
  } else {
    lastCreatedClient = undefined;
    lastError = result.left;
  }
});

When(/^I search for a company with query "([^"]*)"$/, async (query: string) => {
  const results = await searchCompany(query);
  setSearchResults(results);
});

Then(/^the client should be created with formatted data$/, (dataTable: DataTable) => {
  assert.ok(lastCreatedClient, 'No client created');
  assertMatchesDataTable(dataTable)(lastCreatedClient);
});

Then(/^the client firstname should be "([^"]*)"$/, (expected: string) => {
  assert.ok(lastCreatedClient, 'No client created');
  assert.strictEqual(lastCreatedClient._tag, 'B2CClient');
  if (lastCreatedClient._tag === 'B2CClient') {
    assert.strictEqual(lastCreatedClient.name.firstname, expected);
  }
});

Then(/^the client lastname should be "([^"]*)"$/, (expected: string) => {
  assert.ok(lastCreatedClient, 'No client created');
  assert.strictEqual(lastCreatedClient._tag, 'B2CClient');
  if (lastCreatedClient._tag === 'B2CClient') {
    assert.strictEqual(lastCreatedClient.name.lastname, expected);
  }
});

Then(/^the client should be created with the following data$/, (dataTable: DataTable) => {
  assert.ok(lastCreatedClient, 'No client created');
  assertMatchesDataTable(dataTable)(lastCreatedClient);
});

Then(/^the client should be created with email "([^"]*)"$/, (email: string) => {
  assert.ok(lastCreatedClient, 'No client created');
  assert.strictEqual(lastCreatedClient.email, email);
});

Then(/^the client should be created with phone "([^"]*)"$/, (phone: string) => {
  assert.ok(lastCreatedClient, 'No client created');
  assert.strictEqual(lastCreatedClient.phone, phone);
});

Then(/^the TVA intracommunautaire should be "([^"]*)"$/, (tva: string) => {
  assert.ok(lastCreatedClient, 'No client created');
  assert.strictEqual(lastCreatedClient._tag, 'B2BClient');
  if (lastCreatedClient._tag === 'B2BClient') {
    assert.strictEqual(lastCreatedClient.tvaIntracommunautaire, tva);
  }
});

Then(/^the client should not be created$/, () => {
  assert.strictEqual(lastCreatedClient, undefined);
  assert.ok(lastError, 'Expected an error');
});

Then(/^I should be informed that a client with this SIRET already exists$/, () => {
  assert.ok(lastError, 'Expected an error');
  assert.strictEqual(lastError._tag, 'SiretAlreadyExists');
});
