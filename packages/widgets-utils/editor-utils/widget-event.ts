import {WidgetEventProperty} from './widget-event-property';

export interface WidgetEvent {
    id: string;
    displayName: string;
    properties: WidgetEventProperty[];
}
