import {DataSource} from '@mossaic-ui/widgets-utils';
import {UITemplate, RenderOptions} from '@mossaic-ui/widgets-utils';

/** Example of widget options type */
export interface MyLibWidgetOptions<T> extends RenderOptions {
    /** data source to get events from */
    dataSource: DataSource<T, number>;
    /** field to read start date of an event */
    dateField: string;
    /** field to read end date of an event */
    endDateField: string;
    /** default value to filter from */
    defaultStartDatetime?: number;
    /** ui templates for event rendering */
    eventDayTemplate?: UITemplate;
    eventMonthTemplate?: UITemplate;
}
