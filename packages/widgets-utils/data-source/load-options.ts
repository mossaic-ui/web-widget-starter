import {Query} from './query';
import {GroupDescriptor} from './group-descriptor';
import {AggregationDescriptor} from './aggregation-descriptor';
import {SortDescriptor} from './sort-descriptor';

export interface LoadOptions<M = unknown> {
    /**
     * A filter expression.
     */
    filter?: Query;
    /**
     * A group expression.
     * NOT IMPLEMENTED
     */
    group?: GroupDescriptor | Array<GroupDescriptor>;
    /**
     * A group summary expression. Used with the group setting.
     * NOT IMPLEMENTED
     */
    groupSummary?: AggregationDescriptor | Array<AggregationDescriptor>;
    /**
     * The IDs of the rows being expanded. Relevant only when the CustomStore is used in the TreeList UI component.
     * NOT IMPLEMENTED
     */
    parentIds?: Array<string>;
    /**
     * Indicates whether a top-level group count is required.
     * Used in conjunction with the filter, take, skip, requireTotalCount, and group settings.
     * NOT IMPLEMENTED
     */
    requireGroupCount?: boolean;
    /**
     * Indicates whether the total count of data objects is needed.
     * NOT IMPLEMENTED
     */
    requireTotalCount?: boolean;
    /**
     * The number of data objects to be skipped from the result set&apos;s start.
     * In conjunction with take, used to implement paging.
     */
    skip?: number;
    /**
     * The number of data objects to be loaded. In conjunction with skip, used to implement paging.
     */
    next?: number;
    /**
     * A sort expression.
     * NOT IMPLEMENTED
     */
    sort?: SortDescriptor | Array<SortDescriptor>;
    /**
     * A total summary expression.
     * NOT IMPLEMENTED
     */
    totalSummary?: AggregationDescriptor | Array<AggregationDescriptor>;
    /**
     * An object for storing additional settings that should be sent to the server.
     * NOT IMPLEMENTED
     */
    userData?: M;
}
