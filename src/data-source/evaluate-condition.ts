export function evaluateCondition(
    op: string,
    lhv: unknown,
    rhv: unknown
): boolean {
    //     eq?: T;
    //     gt?: T;
    //     gte?: T;
    //     in?: [T]; not implemented
    //     lt?: T;
    //     lte?: T;
    //     ne?: T;
    //     nin?: [T]; not implemented
    //     // Logical
    //     not?: T extends string ? QuerySelector<T> | RegExp : QuerySelector<T>; not implemented
    //     // Element
    //     /**
    //      * When `true`, `$exists` matches the documents that contain the field,
    //      * including documents where the field value is null.
    //      */
    //     exists?: boolean; not implemented
    //     type?: string | number; not implemented
    let currentResult = true;
    // console.debug('evaluatePredicate', lhv, rhv);
    // console.debug('condition', lhv, rhv);
    if (op === 'startswith') {
        // console.debug('field', contextValue);
        if (typeof lhv === 'string') {
            currentResult = lhv
                ?.toLowerCase()
                .startsWith((rhv as string).toLowerCase());
        } else if (typeof lhv === 'number') {
            currentResult = lhv.toString().startsWith(rhv as string);
        }
    } else if (op === 'contains') {
        if (typeof lhv === 'string') {
            currentResult =
                typeof rhv === 'string'
                    ? lhv.toLowerCase().includes((rhv as string).toLowerCase())
                    : false;
        } else if (typeof lhv === 'number') {
            currentResult = lhv
                .toString()
                .toLowerCase()
                .includes((rhv || 0).toString().toLowerCase());
        } else {
            currentResult = false;
        }
    } else if (op === 'eq') {
        if (!lhv && lhv !== 0) {
            currentResult = !rhv && rhv !== 0;
        } else if (!rhv && rhv !== 0) {
            currentResult = false;
        } else {
            if (typeof lhv === 'string') {
                currentResult =
                    lhv?.toLowerCase() === (rhv as string).toLowerCase();
            } else if (typeof lhv === 'number') {
                currentResult = +lhv === +rhv;
            } else {
                // bool
                currentResult = lhv == rhv;
            }
        }
    } else if (op === 'ne') {
        if (!rhv && rhv !== 0) {
            currentResult = !!lhv || lhv == 0;
        } else {
            if (typeof lhv === 'string') {
                currentResult =
                    lhv.toLowerCase() !== (rhv as string).toLowerCase();
            } else if (typeof lhv === 'number') {
                currentResult = +lhv !== +rhv;
            } else {
                // bool
                currentResult = lhv !== rhv;
            }
        }
        // console.debug(lhv, rhv, currentResult);
    } else if (op === 'gt') {
        currentResult = (lhv as string) > (rhv as string);
    } else if (op === 'lt') {
        currentResult = (lhv as string) < (rhv as string);
    } else if (op === 'lte') {
        currentResult = (lhv as string) <= (rhv as string);
    } else if (op === 'gte') {
        currentResult = (lhv as string) >= (rhv as string);
    }
    return currentResult;
}
