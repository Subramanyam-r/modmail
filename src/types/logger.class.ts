import moment from "moment";

enum LogLevel {
    INFO = "INFO",
    ERROR = "ERROR",
    WARN = "WARN",
    DEBUG = "DEBUG"
}

export default class Logger {

    #log(message: string, level: LogLevel) {
        const currentTimestamp = moment().utcOffset("+05:30").format("DD-MM-YYYY hh:mm:ss.SSS")
        console.log(`${currentTimestamp} ${level} : ${message}`)
    }

    info(message: string) {
        this.#log(message, LogLevel.INFO);
    }

    error(message: string) {
        this.#log(message, LogLevel.ERROR);
    }

    warn(message: string) {
        this.#log(message, LogLevel.WARN);
    }

    debug(message: string) {
        this.#log(message, LogLevel.DEBUG)
    }
}