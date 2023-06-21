export interface CustomWidgetSettingsRenderer {
    htmlComponent?: HTMLElement;
    callbackEvent?: {
        subscribe: (cb: (data: {key: string; value: unknown}) => void) => void;
    };
}
