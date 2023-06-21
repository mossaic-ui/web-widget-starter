import {ActionParam} from './action-param';

export interface Action {
    id: string;
    displayName: string;
    description: string;
    parameters: ActionParam[];
    responseProperties: ActionParam[];
}
