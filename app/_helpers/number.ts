import { LogHelpers } from '@/app/_helpers/log';

export class NumberHelpers {
    static FORMAT_NUMBER_INTEGER_DEFAULT: Intl.NumberFormatOptions = {
        style: 'decimal',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    };

    static FORMAT_NUMBER_DECIMAL_DEFAULT: Intl.NumberFormatOptions = {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    };

    static FORMAT_NUMBER_CURRENCY_DECIMAL_DEFAULT: Intl.NumberFormatOptions = {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    };

    static format(num: number, options: Intl.NumberFormatOptions = {}, locales?: string | Array<string>) {
        if (typeof num !== 'number') {
            LogHelpers.warning('NumberHelpers', `Failed to format number because ${num} is not a number`);
            return '';
        }
        const formatOptions = options;
        const formatNumberDefault = Number.isInteger(num) ? NumberHelpers.FORMAT_NUMBER_INTEGER_DEFAULT : NumberHelpers.FORMAT_NUMBER_DECIMAL_DEFAULT;
        const mergedOptions: Intl.NumberFormatOptions = { ...formatNumberDefault, ...formatOptions };
        return Number(num).toLocaleString(locales, mergedOptions);
    }
}
