import dayjs from 'dayjs';
import {LogType} from "@/app/_models/log";

export class LogHelpers {
    static info(location: string, message: string, body: unknown = '') {
        console.log(LogHelpers.formatMessage(LogType.INFO, location, message), body);
    }

    static debug(location: string, message: string, body: unknown = '') {
        if (process.env.NEXT_PUBLIC_ENV !== 'PROD' && process.env.NEXT_PUBLIC_DEBUG === 'true') {
            console.debug(LogHelpers.formatMessage(LogType.DEBUG, location, message), body);
        }
    }

    static warning(location: string, message: string, body: unknown = '') {
        console.warn(LogHelpers.formatMessage(LogType.WARNING, location, message), body);
    }

    static error(location: string, message: string, body: unknown = '') {
        console.error(LogHelpers.formatMessage(LogType.ERROR, location, message), body);
    }

    private static formatMessage(type: LogType, location: string, message: string) {
        // GROK PATTERN : %{TIMESTAMP_ISO8601:timestamp} %{LOGLEVEL:logLevel} --- %{GREEDYDATA:location} : %{GREEDYDATA:message}
        return `${dayjs().toISOString()} ${type} --- ${location} : ${message}`;
    }
}
