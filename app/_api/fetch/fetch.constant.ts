import { FetchApiOptions } from '@/app/_api/fetch/fetch.model';

export const FETCH_API_DEFAULT_PARAMS: FetchApiOptions = {
    retries: 1,
    everyMs: 1500
};

export const FETCH_API_PER_PAGE_DEFAULT = 50;
