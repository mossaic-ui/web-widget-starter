export interface EventStream {
    next: (data: unknown) => unknown;
}
