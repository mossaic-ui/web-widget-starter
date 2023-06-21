export interface AggregationDescriptor {
    selector: string;
    summaryType: 'sum' | 'avg' | 'min' | 'max' | 'count';
}
