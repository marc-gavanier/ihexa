import { expect, type Page, test } from '@playwright/test';

test.describe('Configure payment terms page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/settings/payment-terms', { waitUntil: 'networkidle' });
  });

  test('should display the payment terms form', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /payment terms/i })).toBeVisible();
    await expect(page.getByLabel(/deadline starting point/i)).toBeVisible();
  });

  test('should show deadline days and end of month when from invoice date is selected', async ({ page }) => {
    await page.getByLabel(/deadline starting point/i).selectOption('from_invoice_date');

    await expect(page.getByLabel(/deadline days/i)).toBeVisible();
    await expect(page.getByLabel(/end of month/i)).toBeVisible();
  });

  test('should hide deadline days and end of month when upon receipt is selected', async ({ page }) => {
    await page.getByLabel(/deadline starting point/i).selectOption('upon_receipt');

    await expect(page.getByLabel(/deadline days/i)).not.toBeVisible();
    await expect(page.getByLabel(/end of month/i)).not.toBeVisible();
  });

  test('should show "No discount for early payment" when no discount is selected', async ({ page }) => {
    await page.getByLabel(/early payment discount/i).selectOption('NoDiscount');

    await expect(page.getByText(/no discount for early payment/i)).toBeVisible();
  });

  test('should show discount fields when with discount is selected', async ({ page }) => {
    await page.getByLabel(/early payment discount/i).selectOption('WithDiscount');

    await expect(page.getByLabel(/discount rate/i)).toBeVisible();
    await expect(page.getByLabel(/discount delay threshold/i)).toBeVisible();
  });

  test('should hide discount fields when no discount is selected', async ({ page }) => {
    await page.getByLabel(/early payment discount/i).selectOption('WithDiscount');
    await expect(page.getByLabel(/discount rate/i)).toBeVisible();

    await page.getByLabel(/early payment discount/i).selectOption('NoDiscount');

    await expect(page.getByLabel(/discount rate/i)).not.toBeVisible();
    await expect(page.getByLabel(/discount delay threshold/i)).not.toBeVisible();
  });

  test('should show IBAN field when bank transfer is selected', async ({ page }) => {
    await page.getByLabel(/bank transfer/i).check();

    await expect(page.getByLabel(/^iban$/i)).toBeVisible();
  });

  test('should hide IBAN field when bank transfer is not selected', async ({ page }) => {
    await page.getByLabel(/bank transfer/i).uncheck();

    await expect(page.getByLabel(/^iban$/i)).not.toBeVisible();
  });

  test('should always display recovery fee', async ({ page }) => {
    await expect(page.getByText(/recovery fee.*40 EUR/i)).toBeVisible();
  });

  test('should save payment terms successfully', async ({ page }) => {
    await page.getByLabel(/deadline starting point/i).selectOption('from_invoice_date');
    await page.getByLabel(/deadline days/i).fill('30');
    await page.getByLabel(/penalty rate/i).fill('15');
    await page.getByLabel(/early payment discount/i).selectOption('NoDiscount');
    await page.getByLabel(/bank transfer/i).check();
    await page.getByLabel(/^iban$/i).fill('FR7630006000011234567890189');
    await page.getByRole('button', { name: /save payment terms/i }).click();

    await expect(page.locator('.alert-success')).toBeVisible();
  });
});

test.describe('Configure payment terms page - edit mode', () => {
  const savePaymentTermsConfig = async (page: Page, penaltyRate: string) => {
    await page.goto('/settings/payment-terms', { waitUntil: 'networkidle' });
    await page.getByLabel(/deadline starting point/i).selectOption('from_invoice_date');
    await page.getByLabel(/deadline days/i).fill('30');
    await page.getByLabel(/penalty rate/i).fill(penaltyRate);
    await page.getByLabel(/early payment discount/i).selectOption('NoDiscount');
    await page.getByLabel(/bank transfer/i).check();
    await page.getByLabel(/^iban$/i).fill('FR7630006000011234567890189');
    await page.getByRole('button', { name: /save payment terms/i }).click();
    await expect(page.locator('.alert-success')).toBeVisible();
  };

  test('should save and reload existing payment terms configuration', async ({ page }) => {
    await savePaymentTermsConfig(page, '15');

    await page.goto('/settings/payment-terms', { waitUntil: 'networkidle' });

    await expect(page.getByLabel(/deadline starting point/i)).toHaveValue('from_invoice_date');
    await expect(page.getByLabel(/deadline days/i)).toHaveValue('30');
    await expect(page.getByLabel(/penalty rate/i)).toHaveValue('15');
  });

  test('should update an existing payment terms configuration', async ({ page }) => {
    await savePaymentTermsConfig(page, '15');

    await page.goto('/settings/payment-terms', { waitUntil: 'networkidle' });
    await page.getByLabel(/penalty rate/i).clear();
    await page.getByLabel(/penalty rate/i).fill('12');
    await page.getByRole('button', { name: /save payment terms/i }).click();
    await expect(page.locator('.alert-success')).toBeVisible();

    await page.goto('/settings/payment-terms', { waitUntil: 'networkidle' });

    await expect(page.getByLabel(/penalty rate/i)).toHaveValue('12');
  });
});
