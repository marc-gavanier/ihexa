import type { Invoice } from '@/features/invoice/domain';

export const InvoiceDetails = ({ invoice }: { invoice: Invoice }) => (
  <div data-testid="invoice-details">
    <div data-testid="invoice-recipient.name">
      {invoice.recipient.name.firstName} {invoice.recipient.name.lastName}
    </div>
    <div data-testid="invoice-recipient.address.street">
      {invoice.recipient.address.street}
    </div>
    <div data-testid="invoice-recipient.address.city">
      {invoice.recipient.address.city}
    </div>
    <div data-testid="invoice-recipient.address.postalCode">
      {invoice.recipient.address.postalCode}
    </div>
    <table>
      <thead>
        <tr>
          <th>Désignation</th>
          <th>Qté</th>
          <th>PU (€)</th>
        </tr>
      </thead>
      <tbody>
        {invoice.lines.map((line, index) => (
          <tr key={line.label}>
            <td data-testid={`invoice-line[${index}].label`}>{line.label}</td>
            <td data-testid={`invoice-line[${index}].quantity`}>
              {line.quantity}
            </td>
            <td data-testid={`invoice-line[${index}].unitPrice`}>
              {line.unitPrice}
            </td>
          </tr>
        ))}
        <tr>
          <td colSpan={2}>Total</td>
          <td data-testid="invoice-total">{invoice.total}</td>
        </tr>
      </tbody>
    </table>
  </div>
);
