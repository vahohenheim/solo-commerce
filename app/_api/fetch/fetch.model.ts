export type FetchResponse<T> = {
    data: T | null;
    headers: Headers;
    error?: string;
};

export type FetchApiOptions = {
    url?: string;
    retries: number;
    everyMs: number;
    tags?: Array<string>;
    location?: string;
    cache?: RequestCache;
    body?: BodyInit | null;
    headers?: HeadersInit;
};
