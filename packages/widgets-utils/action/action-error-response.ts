import {ApiResponseErrorType} from './action-response-error-type';

export interface ActionErrorResponse<T = unknown> {
    errorType: ApiResponseErrorType;
    message: string;
    data?: T;
    actionId: string;
}
