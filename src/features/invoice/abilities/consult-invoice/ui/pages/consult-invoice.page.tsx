import { amountOf, type Invoice, invoiceTotal } from '@/features/invoice/domain';
import { withTranslation } from '@/libraries/i18n';

type ConsultInvoicePageProps = {
  invoice: Invoice;
};

export const ConsultInvoicePage = withTranslation<ConsultInvoicePageProps>(({ invoice, t }) => (
  <div>
    <div data-testid='recipient-name'>
      {invoice.recipient.name.firstname} {invoice.recipient.name.lastname}
    </div>
    <div data-testid='recipient-address'>
      {invoice.recipient.address.street}, {invoice.recipient.address.zipcode} {invoice.recipient.address.city}
    </div>
    <br />
    <table>
      <thead>
        <tr>
          <th>{t('details.label')}</th>
          <th>{t('details.unitPrice')}</th>
          <th>{t('details.quantity')}</th>
        </tr>
      </thead>
      <tbody>
        {invoice.lines.map((line) => (
          <tr key={line.label}>
            <td data-testid='line-label'>{line.label}</td>
            <td data-testid='line-amount'>{amountOf(line)} €</td>
            <td data-testid='line-quantity'>{line.quantity}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <br />
    <div data-testid='invoice-total'>
      {t('details.totalPrice')} : {invoiceTotal(invoice)} €
    </div>
  </div>
));
