export interface GroupDescriptor {
    selector: string;
    sortOrder: 'desc' | 'asc';
    isExpanded: boolean;
    groupInterval: number | string;
}
