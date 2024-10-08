export type FakeStoreProduct = {
    id: number;
    title: string;
    price: number;
    description: string;
    category: FakeStoreCategory,
    image: string;
    rating: FakeStoreRating;
}

export type FakeStoreRating = {
    rate: number,
    count: number
}

// TODO: improve datas for don't use label as id
export enum FakeStoreCategory {
    MEN_CLOTHING = "men's clothing",
    JEWELERY = "jewelery",
    ELECTRONICS = "electronics",
    WOMEN_CLOTHING = "women's clothing",
}