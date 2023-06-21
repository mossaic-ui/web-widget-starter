export type WidgetEventHandler<T = any, S = any> = (
    event: string,
    payload?: T
) => S;
