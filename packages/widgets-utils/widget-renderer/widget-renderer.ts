import {RenderOptions} from './render-options';
import {CustomWidgetSettingsRenderer} from '../editor-utils';
import {FormError} from './form-error';

export interface WidgetRenderer<T extends RenderOptions = RenderOptions> {
    /** HTML top node of the widget */
    elem: HTMLElement;
    /** render widget and write its HTML top node to `this.elem` */
    render(options: T, isEditorMode?: boolean): HTMLElement;
    setValue?(key: string, value: unknown): void;
    setValues?(values: Record<string, unknown>): void;
    /** remove widget from DOM and clear allocated resources */
    destroy?(): void;
    setSlotContent?(key: string, content: HTMLElement): void;
    /** @deprecated ui editor specific,
     * can widget be dragged on a canvas  */
    isMovable?(): boolean;
    /** if widget can contain child widgets from UI editor */
    canHaveChildren?(): boolean;
    /** returns {} by default */
    renderSettings?(): CustomWidgetSettingsRenderer;
    /** clear allocated resources associated with rendered settings */
    destroySettings?(): void;
    /** if widget represents Form Control this method is used to set error info to such control */
    setErrorState?(error: FormError): void;
}
