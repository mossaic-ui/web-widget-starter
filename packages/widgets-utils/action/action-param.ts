import {ActionParamType} from './action-param-type';

export interface ActionParam<T = unknown> {
    systemName: string;
    displayName: string;
    description: string;
    type: ActionParamType;
    /** entity id for type="link" or type="list" */
    entityId?: string;
    defaultValue?: T;
    required?: boolean;
}
