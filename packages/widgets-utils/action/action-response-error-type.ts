export enum ApiResponseErrorType {
    /** or deserialization */
    clientError = 'clientError',
    serializationError = 'serializationError',
    outdatedUpdate = 'outdatedUpdate',
    serverError = 'serverError',
    hasForeignKeys = 'hasForeignKeys',
    notAllowed = 'notAllowed',
    networkError = 'networkError',
    auth = 'auth',
    unknown = 'unknown',
    maintenanceMode = 'maintenanceMode',
}
