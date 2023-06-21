import {v4} from 'uuid';
import {WidgetRenderer} from './widget-renderer';
import {widgetPrefix} from './widget-prefix';
import {RenderOptions} from './render-options';

/** common logic for lib widgets */
export abstract class Widget<T extends RenderOptions = RenderOptions>
    implements WidgetRenderer<T>
{
    /** unique identifier */
    public readonly id: string;
    /** top dom element of the current widget */
    public elem: HTMLElement;
    /** state with widget options */
    protected options: T = {} as T;

    protected constructor(properties?: T) {
        if (!properties?.widgetId) {
            this.id = `${widgetPrefix}_${v4()}`;
        } else {
            this.id = properties.widgetId;
        }
    }

    /** render widget and write result to `this.elem` property */
    abstract render(options?: T): HTMLElement;

    /** set property from widget options */
    abstract setValue(
        key: keyof T & string,
        value: unknown,
        initial?: boolean
    ): void;

    /** set options and ignore keys with undefined values */
    setOptions(options?: T) {
        if (options) {
            Object.keys(options).map(key => {
                if (options[key] === undefined) {
                    return;
                }
                this.options[key] = options[key];
            });
        }
    }

    /**
     * @param record - options to be set
     * @param batches - allow to apply changes at once with custom handler,
     * @param initial - called in render method, no need to check if something changed
     * */
    setValues(
        record: Partial<T>,
        batches?: {keys: string[]; handler: () => void}[],
        initial?: boolean
    ) {
        if (!record) {
            /** todo care about wrong keys in options */
            return;
        }
        Object.keys(record).map(key => {
            if (!initial || record[key] === undefined) {
                return;
            }
            this.options[key] = record[key];
        });
        const batchesCalled: boolean[] = [];
        (
            Object.keys(initial ? this.options : record) as (keyof T & string)[]
        ).map(key => {
            const index = batches
                ? batches.findIndex(b => b.keys.includes(key))
                : -1;
            if (index !== -1) {
                if (!batchesCalled[index]) {
                    batchesCalled[index] = true;
                    /** check for index, so we sure */
                    batches![index].handler();
                }
            } else {
                this.setValue(key, record[key], initial);
            }
        });
    }

    protected emitEvent(event: string, payload?: unknown): unknown | void {
        return this.options.emit?.[event]?.(payload);
    }

    /** unused for the moment */
    keyChanged(key: string, value: unknown) {
        return this.options[key] !== value;
    }

    /** unused for the moment */
    applyStyleOption(key: string, value: string) {
        if (this.elem.style) {
            this.elem.style.setProperty(key, value);
        }
    }
}
