const bunyan = require('bunyan');

const log = bunyan.createLogger({ name: "airport-ai-exercise" });

function getLogger() {
    return log;
}

function logInfo(...args) {
    log.info(...args);
}

function logError(...args) {
    log.error(...args);
}

function logWarn(...args) {
    log.warn(...args);
}

module.exports = {
    getLogger,
    logInfo,
    logError,
    logWarn,
};