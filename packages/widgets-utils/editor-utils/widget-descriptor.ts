import {RenderOptions, WidgetRenderer} from '../widget-renderer';
import {WidgetProperty} from './widget-property';
import {WidgetEvent} from './widget-event';
import {WidgetPropertyType} from './widget-property-type';

/**
 * Widget descriptor is widget declaration
 * which allows widget to be used in the ui editor
 * */
export type WidgetDescriptor<T extends RenderOptions = RenderOptions> = {
    /** unique widget factory identifier */
    id: string;
    /** version should change on each widget update */
    version: string;
    /** widget text label which will be displayed in the ui-editor */
    displayName: string;
    /** this widget implements form control interface
     * - emits "change" event with `{ value: unknown }` object
     * - has "value" property which can be set by "setValue" method */
    isFormControl?: boolean;
    formProperties?: {
        /** can be bind to properties with such types,
         * if not mentioned all properties available */
        types: WidgetPropertyType[];
    };
    /** description for widget properties controls to be used by right panel in the ui editor */
    properties: Record<string, WidgetProperty[]>;
    /** combine properties in ordered groups of properties */
    propertiesGroups?: {
        label: string;
        groupId: string;
    }[];
    /** events to be mapped by UI editor */
    events: WidgetEvent[];
    /** keys of all events (can differ from events) */
    eventsKeys: string[];
    ghostElemProperties: {
        /** ghost elem size (appears on dragging widget from the editor left panel) */
        width: number;
        height: number;
        /** html template for the ghost element
         * not implemented yet */
        ghostTemplate?: HTMLElement;
    };
    /** default options for common properties as "width", "height" etc */
    widgetDefaultOptions: Record<string, unknown>;
    /** unused for the moment, mark if the widget should have custom right panel properties form */
    customSettingsComponent?: boolean;
    /** unused for the moment */
    mousemoveStrategy?: (event: MouseEvent) => void;
} & (
    | {
          isLazy?: false;
          /** factory function to create widget instance */
          factory: (
              id: string,
              values: Record<string, unknown>,
              widgetInstance?: any
          ) => WidgetRenderer<T>;
      }
    | {
          /** lazy loading widget */
          isLazy: true;
          factory: (
              id: string,
              values: Record<string, unknown>,
              widgetInstance?: any
          ) => Promise<WidgetRenderer<T>>;
      }
);
