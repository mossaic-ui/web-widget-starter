import {WidgetPropertyType} from './widget-property-type';
import {WidgetViewFormat} from './widget-view-format';

/** property of the widget to be used in */
export interface WidgetProperty<T = unknown, M = unknown> {
    id: string;
    /** type of the edited value */
    type: WidgetPropertyType;
    /** text label to be displayed */
    displayName: string;
    /** group to be displayed in */
    groupId?: string;
    /** not displayed
     * @warning not used in mossaic form
     */
    hidden?: boolean;
    /** default value to be set if no value provided from state */
    defaultValue?: T;
    /** helper information to be displayed in special help popovers */
    description?: string;
    expressions?: {
        /** predicate to hide properties on state changes */
        hidden?: (values: Record<string, unknown>) => boolean;
        /** not implemented */
        disabled?: (values: Record<string, unknown>) => {
            state: boolean;
            description?: string;
        };
    };
    settings?: {
        /** alternate widget control to be dipslayed */
        viewFormat?: WidgetViewFormat;
        /** control properties */
        viewFormatMeta?: M;
        /** it is not possible to edit nested properties */
        deep?: number;
        /** for EntityField type */
        entityIdFromEntityListField?: string;
        /** property types to include for EntityField type */
        filter?: WidgetPropertyType[];
        minValue?: number;
        maxValue?: number;
        stepValue?: number;
        placeholder?: string;
    };

    formProperties?: {
        /** check if field is required */
        required?: boolean;
        /** not imlemented */
        validate?: ((val: unknown) => boolean)[];
    };
}
