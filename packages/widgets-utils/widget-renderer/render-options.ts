import {EventStream} from './event-stream';
import {MossaicAPI} from '../editor-utils/api.interface';

export interface RenderOptions<P = Record<string, (value: any) => any>> {
    /** api to emit event from widget */
    emit?: P;
    /** uniq id set by editor */
    widgetId?: string;
    /** widget is currently using in editor
     * not recommended to use */
    isEditorMode?: boolean;
    /** actions API to use mossaic API directly from widget from current scheme */
    actionsAPI?: MossaicAPI;
    /** @deprecated used for older widgets, will be removed in future versions */
    contextStream?: EventStream | undefined;
    /** @deprecated used for older widgets, will be removed in future versions */
    defaultValue?: unknown;
    /** @deprecated used for older widgets, will be removed in future versions
     * use ui-template properties instead */
    icons?: {
        enabled: boolean;
        iconsElems: HTMLElement[];
    };
}
