import {FakeStoreCategory} from "@/app/_api/fake-store/fake-store.model";

// TODO: manage category endpoint from api and use label from it
export const CATEGORY_LABELS: Record<FakeStoreCategory, string> = {
    [FakeStoreCategory.MEN_CLOTHING]: "Men's clothing",
    [FakeStoreCategory.WOMEN_CLOTHING]: "Women's clothing",
    [FakeStoreCategory.JEWELERY]: "Jewelery",
    [FakeStoreCategory.ELECTRONICS]: "Electronics",
}