import {Action} from './action';
import {ActionErrorResponse} from './action-error-response';

export interface ActionOptions {
    responseProperties?: {
        /** response property of the action/request (this field should present in request response) */
        name: string;
        /** property type */
        type: 'boolean' | 'string' | 'object' | 'number';
    }[];
    /** will automatically create responseProperties from Action object */
    responsePropertiesFromAction?: Action;
    /** custom error handler, which prevents common error handler to be called */
    customErrorHandler?: (data: ActionErrorResponse) => void;
}
