import { Schema } from 'effect';

export const Firstname = Schema.String.pipe(Schema.nonEmptyString(), Schema.maxLength(100), Schema.brand('Firstname'));
export type Firstname = typeof Firstname.Type;

export const Lastname = Schema.String.pipe(Schema.nonEmptyString(), Schema.maxLength(100), Schema.brand('Lastname'));
export type Lastname = typeof Lastname.Type;

export const Street = Schema.String.pipe(Schema.nonEmptyString(), Schema.brand('Street'));
export type Street = typeof Street.Type;

export const City = Schema.String.pipe(Schema.nonEmptyString(), Schema.brand('City'));
export type City = typeof City.Type;

export const Zipcode = Schema.String.pipe(Schema.pattern(/^\d{5}$/), Schema.brand('Zipcode'));
export type Zipcode = typeof Zipcode.Type;

export const Name = Schema.Struct({
  firstname: Firstname,
  lastname: Lastname
});
export type Name = typeof Name.Type;

export const Address = Schema.Struct({
  street: Street,
  city: City,
  zipcode: Zipcode
});
export type Address = typeof Address.Type;

export const Recipient = Schema.Struct({
  name: Name,
  address: Address
});
export type Recipient = typeof Recipient.Type;
