import {LoadOptions} from './load-options';

export interface DataSourceOptions {
    /** DB Collection or View id */
    entityId: string;
    /** Default search query */
    defaultLoadOptions?: LoadOptions;
}
