import type { Invoice } from '@/features/invoice/domain';

type InvoiceTransfer = {
  id: string;
  recipient: {
    name: {
      firstName: string;
      lastName: string;
    };
    address: {
      street: string;
      city: string;
      postalCode: string;
    };
  };
  lines: {
    label: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }[];
  total: number;
};

export const toInvoiceTransfer = (invoice: Invoice): InvoiceTransfer => ({
  ...invoice,
  lines: invoice.lines.map((line) => ({
    ...line,
    unitPrice: Number(line.unitPrice),
    total: Number(line.total),
  })),
  total: Number(invoice.total),
});
