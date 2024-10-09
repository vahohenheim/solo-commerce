import { FakeStoreCategory } from '@/app/_api/fake-store/fake-store.model';

export type ProductListComponentProps = {
    category?: FakeStoreCategory;
    limit?: number;
};
