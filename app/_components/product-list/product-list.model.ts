import { FakeStoreCategory } from '@/app/_api/fake-store/fake-store.model';

export type ProductListComponentProps = {
    removedProducts?: Array<number>;
    category?: FakeStoreCategory;
    limit?: number;
};
