import { expect, type Page, test } from '@playwright/test';

const searchCompany = async (page: Page, query: string) => {
  const input = page.getByRole('combobox', { name: /search company/i });
  await input.fill(query);
  await expect(page.getByRole('listbox')).toBeVisible();
};

const selectCompany = async (page: Page, companyName: string) => {
  await page.getByRole('option', { name: new RegExp(companyName, 'i') }).click();
};

const fillRequiredFields = async (page: Page, options: { vatRegime?: string; email?: string } = {}) => {
  const { vatRegime = 'normal', email = 'contact@company.fr' } = options;
  await page.getByLabel(/vat regime/i).selectOption(vatRegime);
  if (vatRegime === 'normal') {
    await page.getByLabel(/vat number/i).fill('FR12443061841');
  }
  await page.getByLabel(/^email$/i).fill(email);
};

const submitForm = (page: Page) => page.getByRole('button', { name: /save/i }).click();

test.describe('Configure seller page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/settings', { waitUntil: 'networkidle' });
  });

  test('should display the settings page with company search', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /seller configuration/i })).toBeVisible();
    await expect(page.getByRole('combobox', { name: /search company/i })).toBeVisible();
  });

  test('should search for a company by name and display results', async ({ page }) => {
    await searchCompany(page, 'Google');
    await expect(page.getByRole('option', { name: /GOOGLE FRANCE/i })).toBeVisible();
  });

  test('should search for a company by SIRET', async ({ page }) => {
    await searchCompany(page, '44306184100047');
    await expect(page.getByRole('option', { name: /GOOGLE FRANCE/i })).toBeVisible();
  });

  test('should show no results for unknown company', async ({ page }) => {
    const input = page.getByRole('combobox', { name: /search company/i });
    await input.fill('ZZZZNONEXISTENT999');
    await expect(page.getByText(/no results/i)).toBeVisible();
  });

  test('should select a company and display company card', async ({ page }) => {
    await searchCompany(page, 'Google');
    await selectCompany(page, 'GOOGLE FRANCE');

    await expect(page.getByText('GOOGLE FRANCE')).toBeVisible();
    await expect(page.getByText('SAS')).toBeVisible();
    await expect(page.getByText(/SIREN.*443061841/)).toBeVisible();
    await expect(page.getByText(/SIRET.*44306184100047/)).toBeVisible();
    await expect(page.getByText('8 Rue de Londres')).toBeVisible();
  });

  test('should show form fields after selecting a company', async ({ page }) => {
    await searchCompany(page, 'Google');
    await selectCompany(page, 'GOOGLE FRANCE');

    await expect(page.getByLabel(/vat regime/i)).toBeVisible();
    await expect(page.getByLabel(/^email$/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /save/i })).toBeVisible();
  });

  test('should show VAT fields when regime is normal', async ({ page }) => {
    await searchCompany(page, 'Google');
    await selectCompany(page, 'GOOGLE FRANCE');
    await page.getByLabel(/vat regime/i).selectOption('normal');

    await expect(page.getByLabel(/vat number/i)).toBeVisible();
    await expect(page.getByLabel(/tax debit option/i)).toBeVisible();
  });

  test('should hide VAT fields when regime is franchise en base', async ({ page }) => {
    await searchCompany(page, 'Google');
    await selectCompany(page, 'GOOGLE FRANCE');
    await page.getByLabel(/vat regime/i).selectOption('franchise_en_base');

    await expect(page.getByLabel(/vat number/i)).not.toBeVisible();
    await expect(page.getByLabel(/tax debit option/i)).not.toBeVisible();
  });

  test('should hide share capital when legal form is EI', async ({ page }) => {
    await searchCompany(page, 'DUPONT');
    await selectCompany(page, 'DUPONT EI');

    await expect(page.getByLabel(/share capital/i)).not.toBeVisible();
  });

  test('should show share capital for non-EI companies', async ({ page }) => {
    await searchCompany(page, 'Google');
    await selectCompany(page, 'GOOGLE FRANCE');

    await expect(page.getByLabel(/share capital/i)).toBeVisible();
  });

  test('should save seller configuration successfully', async ({ page }) => {
    await searchCompany(page, 'ACME');
    await selectCompany(page, 'ACME SARL');
    await fillRequiredFields(page, { vatRegime: 'normal', email: 'contact@acme.fr' });
    await submitForm(page);

    await expect(page.locator('.alert-success')).toBeVisible();
  });

  test('should save franchise en base configuration', async ({ page }) => {
    await searchCompany(page, 'DUPONT');
    await selectCompany(page, 'DUPONT EI');
    await fillRequiredFields(page, { vatRegime: 'franchise_en_base', email: 'dupont@email.fr' });
    await submitForm(page);

    await expect(page.locator('.alert-success')).toBeVisible();
  });

  test('should show validation errors when required fields are empty', async ({ page }) => {
    await searchCompany(page, 'Google');
    await selectCompany(page, 'GOOGLE FRANCE');
    await page.getByLabel(/^email$/i).clear();
    await submitForm(page);

    await expect(page.locator('.text-error').first()).toBeVisible();
  });

  test('should allow changing company by searching again', async ({ page }) => {
    await searchCompany(page, 'Google');
    await selectCompany(page, 'GOOGLE FRANCE');
    await expect(page.getByText('GOOGLE FRANCE')).toBeVisible();

    await searchCompany(page, 'ACME');
    await selectCompany(page, 'ACME SARL');
    await expect(page.getByText('ACME SARL')).toBeVisible();
  });

  test('should show error toast on network failure', async ({ page }) => {
    await searchCompany(page, 'ACME');
    await selectCompany(page, 'ACME SARL');
    await fillRequiredFields(page, { vatRegime: 'normal', email: 'contact@acme.fr' });

    await page.route('**/settings', (route) => {
      return route.request().method() === 'POST' ? route.abort('failed') : route.continue();
    });

    await submitForm(page);

    await expect(page.locator('.alert-error')).toBeVisible();
    await expect(page.locator('.alert-error')).toContainText(/unable to connect|check your internet/i);
  });

  test('should show error toast for domain error when share capital submitted for EI', async ({ page }) => {
    await searchCompany(page, 'Google');
    await selectCompany(page, 'GOOGLE FRANCE');
    await fillRequiredFields(page, { vatRegime: 'franchise_en_base', email: 'contact@google.fr' });
    await page.getByLabel(/share capital/i).fill('10000');

    await searchCompany(page, 'DUPONT');
    await selectCompany(page, 'DUPONT EI');
    await page.getByLabel(/vat regime/i).selectOption('franchise_en_base');
    await page.getByLabel(/^email$/i).fill('dupont@email.fr');
    await submitForm(page);

    await expect(page.locator('.alert-error')).toBeVisible();
    await expect(page.locator('.alert-error')).toContainText(/share capital is not allowed/i);
  });
});

test.describe('Configure seller page - edit mode', () => {
  test.describe.configure({ mode: 'serial' });

  test('should save and reload existing configuration', async ({ page }) => {
    await page.goto('/settings', { waitUntil: 'networkidle' });

    await searchCompany(page, 'ACME');
    await selectCompany(page, 'ACME SARL');
    await fillRequiredFields(page, { vatRegime: 'normal', email: 'original@acme.fr' });
    await submitForm(page);
    await expect(page.locator('.alert-success')).toBeVisible();

    await page.goto('/settings', { waitUntil: 'networkidle' });

    await expect(page.getByText('ACME SARL')).toBeVisible();
    await expect(page.getByLabel(/vat regime/i)).toHaveValue('normal');
    await expect(page.getByLabel(/^email$/i)).toHaveValue('original@acme.fr');
    await expect(page.getByLabel(/vat number/i)).toHaveValue('FR12443061841');
  });

  test('should update an existing seller configuration', async ({ page }) => {
    await page.goto('/settings', { waitUntil: 'networkidle' });

    await expect(page.getByLabel(/^email$/i)).toHaveValue('original@acme.fr');

    await page.getByLabel(/^email$/i).clear();
    await page.getByLabel(/^email$/i).fill('new@acme.fr');
    await submitForm(page);
    await expect(page.locator('.alert-success')).toBeVisible();

    await page.goto('/settings', { waitUntil: 'networkidle' });

    await expect(page.getByLabel(/^email$/i)).toHaveValue('new@acme.fr');
  });
});
