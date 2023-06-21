import {evaluateCondition} from './evaluate-condition';
import {Query} from '@mossaic-ui/widgets-utils';
import {
    FilterQuery,
    QuerySelector,
} from '../../packages/widgets-utils/data-source/query';

/**
 * extra simplified mongodb filtering for mock tests
 * */
export const applyQueryToArray = function <T = unknown>(
    source: T[],
    query: Query,
    context?: Record<string, unknown>
): T[] {
    function applyFilterQuery(query: FilterQuery<any>, item: T): boolean {
        for (const lhv of Object.keys(query)) {
            if (!applyEqOrQuerySelector(item[lhv], query[lhv])) {
                return false;
            }
        }
        return true;
    }

    function applyEqOrQuerySelector(lhv: T[keyof T], rhv: unknown) {
        if (lhv && typeof rhv === 'object') {
            return applyQuerySelector(rhv as QuerySelector<unknown>, lhv);
        }
        return lhv == rhv;
    }

    function applyQuerySelector(
        selector: QuerySelector<unknown>,
        lhv: T[keyof T]
    ): boolean {
        for (const key of Object.keys(selector)) {
            if (!evaluateCondition(key, lhv, selector[key])) {
                return false;
            }
        }
        return true;
    }

    function predicate(item: T) {
        for (const key of Object.keys(query)) {
            const conditionArray = query[key] as FilterQuery<any>[];
            if (key === 'or') {
                let result = false;
                for (const condition of conditionArray) {
                    if (applyFilterQuery(condition, item)) {
                        result = true;
                        break;
                    }
                }
                if (!result) {
                    return false;
                }
            } else if (key === 'and') {
                for (const condition of conditionArray) {
                    if (!applyFilterQuery(condition, item)) {
                        return false;
                    }
                }
            } else {
                if (!applyEqOrQuerySelector(item[key], query[key])) {
                    return false;
                }
            }
        }
        return true;
    }

    return source.filter(item => predicate(item));
};
