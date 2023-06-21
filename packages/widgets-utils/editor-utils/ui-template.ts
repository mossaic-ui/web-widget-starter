export interface UITemplate {
    /** context expected by template */
    render(context: Record<string, unknown>): HTMLElement;
}
