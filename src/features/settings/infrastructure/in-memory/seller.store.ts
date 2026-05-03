import type { Seller } from '../../domain/seller';

let SELLER: Seller | undefined;

export const sellerStore = (): { get: () => Seller | undefined; set: (seller: Seller) => void } => ({
  get: () => SELLER,
  set: (seller: Seller) => {
    SELLER = seller;
  }
});

export const clearSellerStore = (): void => {
  SELLER = undefined;
};
