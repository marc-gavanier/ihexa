type InvoiceId = string;

type Name = {
  firstname: string;
  lastname: string;
};

type Street = string;

type City = string;

type Zipcode = string;

type Address = {
  street: Street;
  city: City;
  zipcode: Zipcode;
};

type Recipient = {
  name: Name;
  address: Address;
};

type Label = string;

type Amount = number;

type Quantity = number;

type Line = {
  label: Label;
  quantity: Quantity;
  amount: Amount;
};

export type Invoice = {
  id: InvoiceId;
  recipient: Recipient;
  lines: Line[];
  total: Amount;
};
