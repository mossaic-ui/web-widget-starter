import {LoadOptions} from './load-options';

export interface DataSource<T = unknown, I = string> {
    load: (options?: LoadOptions) => Promise<T[]>;
    getTotalCount?: (options?: LoadOptions) => Promise<number>;
    create?: (item: T) => Promise<T>;
    update?: (id: I, changes: Partial<T>) => Promise<T>;
    delete?: (ids: I[]) => Promise<void>;
}
