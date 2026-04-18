import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Accueil',
  description: "Page d'accueil IHexa — accès aux factures et clients."
};

const Page = () => (
  <div>
    <h1 className='text-2xl font-bold'>Factures</h1>
    #1 <Link href='/invoices/550e8400-e29b-41d4-a716-446655440000'>Voir la facture</Link>
  </div>
);

export default Page;
