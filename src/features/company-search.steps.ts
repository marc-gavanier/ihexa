import assert from 'node:assert';
import { Then } from '@cucumber/cucumber';
import { getSearchResults } from '@/configuration/cucumber/company-search-results';

Then(/^the results should include a company named "([^"]*)"$/, (name: string) => {
  const searchResults = getSearchResults();
  assert.ok(searchResults, 'Search results should be defined');
  const found = searchResults.some((r) => r.companyName === name);
  assert.ok(found, `Expected to find company "${name}" in results`);
});

Then(/^the results should include a company with SIRET "([^"]*)"$/, (siret: string) => {
  const searchResults = getSearchResults();
  assert.ok(searchResults, 'Search results should be defined');
  const found = searchResults.some((r) => r.siret === siret);
  assert.ok(found, `Expected to find company with SIRET "${siret}" in results`);
});

Then(/^no companies should be found$/, () => {
  const searchResults = getSearchResults();
  assert.ok(searchResults, 'Search results should be defined');
  assert.strictEqual(searchResults.length, 0);
});
