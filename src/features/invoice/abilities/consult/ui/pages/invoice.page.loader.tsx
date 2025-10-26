import { Card } from '@/libraries/ui/primitives/card';

export const InvoicePageLoader = () => (
  <>
    <Card kind='card-border' className='w-fit' data-testid='invoice-loader'>
      <div className='card-body'>
        <div className='flex flex-row gap-2'>
          <div className='skeleton h-6 w-10' />
          <div className='skeleton h-6 w-15' />
        </div>
        <div className='flex flex-col gap-2'>
          <div className='skeleton h-4 w-25' />
          <div className='flex flex-row gap-2'>
            <div className='skeleton h-4 w-10' />
            <div className='skeleton h-4 w-10' />
          </div>
        </div>
      </div>
    </Card>
    <div className='pt-8'>
      <div className='skeleton h-40 w-full' />
    </div>
  </>
);
