import {FETCH_API_DEFAULT_PARAMS} from "@/app/_api/fetch/fetch.constant";
import {FetchApiOptions, FetchResponse} from "@/app/_api/fetch/fetch.model";
import {LogHelpers} from "@/app/_helpers/log";

export class FetchApi {
    static get<V>(url: string, options: FetchApiOptions = FETCH_API_DEFAULT_PARAMS): Promise<FetchResponse<V>> {
        // TODO: remove retry when we are in env.NEXT_PUBLIC_ENV=DEV
        return FetchApi.requestWithRetry<V>('get', { ...options, url });
    }

    static post<V>(url: string, options: FetchApiOptions = FETCH_API_DEFAULT_PARAMS): Promise<FetchResponse<V>> {
        return FetchApi.requestWithRetry<V>('post', { ...options, url });
    }

    private static async requestWithRetry<V>(
        requestType: 'get' | 'post' = 'get',
        {
            retries = FETCH_API_DEFAULT_PARAMS.retries,
            everyMs = FETCH_API_DEFAULT_PARAMS.everyMs,
            url = '',
            tags = [],
            cache = 'force-cache',
            location,
            body,
            headers
        }: FetchApiOptions,
        retriesCount = 0
    ): Promise<FetchResponse<V>> {
        if (!url) {
            return { data: null, headers: new Headers(), error: 'No url found' };
        }

        try {
            const init: RequestInit = {
                cache: cache,
                method: requestType.toUpperCase()
            };

            if (body) {
                init.body = body;
            }

            if (headers) {
                init.headers = headers;
            }

            if (tags && tags.length > 0) {
                init.next = { tags };
            }
            const response = await fetch(url, init);

            switch (response.status) {
                case 200:
                    LogHelpers.debug('FetchApi', `Successfully request ${location || url}`);
                    return { data: (await response.json()) as V, headers: response.headers };
                case 400:
                case 404:
                case 405:
                case 500:
                    LogHelpers.error('FetchApi', `Failed to request ${location || url} `, {
                        ...(await response.json()),
                        status: response.status
                    });
                    return { data: null, headers: response.headers, error: `Failed to request ${location || url} ` };
                default:
                    return FetchApi.manageErrors<V>(
                        {
                            message: `Failed to request ${location || url}, with error code : ${response.status}.`,
                            body: JSON.stringify(await response.json()),
                            headers: response.headers
                        },
                        requestType,
                        { retries, everyMs, url, location, tags, cache: 'no-cache' },
                        retriesCount
                    );
            }
        } catch (error) {
            return FetchApi.manageErrors<V>(
                { message: `Failed to request ${location || url}`, body: JSON.stringify(error) },
                requestType,
                { retries, everyMs, url, tags, location, cache: 'no-cache' },
                retriesCount
            );
        }
    }

    private static async manageErrors<V>(
        { message, body, headers }: { message: string; body: string; headers?: Headers },
        requestType: 'get' | 'post',
        { retries = FETCH_API_DEFAULT_PARAMS.retries, everyMs = FETCH_API_DEFAULT_PARAMS.everyMs, url = '', tags = [], location, cache }: FetchApiOptions,
        retriesCount = 0
    ): Promise<FetchResponse<V>> {
        const updatedCount = retriesCount + 1;
        const newEveryMs = everyMs + FetchApi.getRandomMullisecond(everyMs);
        LogHelpers.warning('FetchApi', `${message}. Retrying in ${newEveryMs / 1000} second${newEveryMs / 1000 > 1 ? 's' : ''} (${retriesCount}/${retries}).`);
        if (updatedCount > retries) {
            LogHelpers.error('FetchApi', `Failed to request ${location || url} :`, body);
            return { data: null, headers: headers || new Headers(), error: `Failed to request ${location || url} :` };
        }
        await FetchApi.delay(newEveryMs);
        return await this.requestWithRetry<V>(
            requestType,
            {
                retries,
                everyMs,
                url,
                tags,
                location,
                cache
            },
            updatedCount
        );
    }

    private static getRandomMullisecond(max: number) {
        return Math.floor(Math.random() * max);
    }

    private static delay(ms: number) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
}
