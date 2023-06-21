import {DataSource, LoadOptions} from '@mossaic-ui/widgets-utils';
import {orderBy} from 'lodash-es';
import {applyQueryToArray} from './apply-query-to-array';

/** data source mock */
export class DataSourceFromList<T extends {id: number}>
    implements DataSource<T, number>
{
    constructor(private data: T[] = []) {}
    load(options: LoadOptions | undefined = {}): Promise<T[]> {
        let tempData = this.data;
        const mergedOptions = {
            next: this.data.length,
            skip: 0,
            ...options,
        };
        if (mergedOptions.filter) {
            tempData = applyQueryToArray(this.data, mergedOptions.filter);
        }
        tempData = tempData.slice(options.skip, options.next);
        if (mergedOptions.sort) {
            const sortOptions = Array.isArray(mergedOptions.sort)
                ? mergedOptions.sort
                : [mergedOptions.sort];
            tempData = orderBy(
                tempData,
                ...sortOptions.map(s => [s.field]),
                ...sortOptions.map(s => [s.desc ? 'desc' : 'asc'])
            );
        }
        return Promise.resolve(tempData);
    }
    create(item: T): Promise<T> {
        this.data.push(item);
        return Promise.resolve(item);
    }

    update(id: number, changes: Partial<T>): Promise<T> {
        const foundIndex = this.data.findIndex(d => d.id === id);
        if (foundIndex === -1) {
            throw new Error(`dataSource: did not find item with such id ${id}`);
        }
        Object.assign(this.data[foundIndex], changes);
        return Promise.resolve(this.data[foundIndex]);
    }

    delete(ids: number[]): Promise<void> {
        for (const id of ids) {
            const foundIndex = this.data.findIndex(d => d.id === id);
            if (foundIndex !== -1) {
                this.data.splice(foundIndex, 1);
            } else {
                throw new Error(
                    `dataSource: did not find item with such id "${id}"`
                );
            }
        }
        return Promise.resolve();
    }
}
