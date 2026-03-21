import { amountOf, type Invoice, invoiceTotal } from '@/features/invoice/domain';

export const ConsultInvoicePage = ({ invoice }: { invoice: Invoice }) => {
  return (
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
            <th>Désignation</th>
            <th>Prix unitaire</th>
            <th>Quantité</th>
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
      <div data-testid='invoice-total'>Total : {invoiceTotal(invoice)} €</div>
    </div>
  );
};
