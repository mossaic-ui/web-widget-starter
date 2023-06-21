/**
 * За основу взял https://github.com/Automattic/mongoose/blob/master/types/query.d.ts,
 * пока что здесь очень условная и упрощенная модель
 * T модель контекста по полям которого конструируем запрос, в случае запрос в бд, это модель данных таблицы */

export type FilterQuery<T> = {
    [P in keyof T]?: Condition<T[P]>;
} & RootQuerySelector<T>;

type Condition<T> = T | T[] | QuerySelector<T>;

export type QuerySelector<T> = {
    // Comparison
    eq?: T;
    gt?: T;
    gte?: T;
    in?: [T];
    lt?: T;
    lte?: T;
    ne?: T;
    nin?: [T];
    // Logical
    not?: T extends string ? QuerySelector<T> | RegExp : QuerySelector<T>;
    // Element
    /**
     * When `true`, `$exists` matches the documents that contain the field,
     * including documents where the field value is null.
     */
    exists?: boolean;
    type?: string | number;
};

export type RootQuerySelector<T> = {
    and?: Array<FilterQuery<T>>;
    nor?: Array<FilterQuery<T>>;
    or?: Array<FilterQuery<T>>;
    [key: string]: any; // string | number | boolean | QuerySelector<T>
};

export type Query<T = any> = RootQuerySelector<T>;

/** Типы переменных/полей в бд */
enum ParamType {
    string = 'str',
    boolean = 'bool',
    entityId = 'link',
    datetime = 'datetime',
    date = 'date',
    time = 'time',
    number = 'number',
    jsonObject = 'jsonobject',
    fileDocument = 'fileDocument',
    fileImage = 'fileImage',
    jsonArray = 'jsonarray',
    duration = 'duration',
    color = 'color',
}

interface GroupOperator {
    value: string; // and
    label: string; // And
}

type WidgetRenderer<T = string> = (options: {
    value: string;
    onChange: (value: T) => void;
}) => {
    /** render property change */
    setValue: (value: T) => void;
    elem: HTMLElement;
};

interface QueryBuilderOptions {
    initialQuery: Query;
    /** or, and, not or, etc */
    groupOperators: GroupOperator[];
    /** equal, not equal, contains, <, > etc */
    conditionOperators: GroupOperator[];
    operators: {
        // type: CobaltActionParamType[];
    };
    renderGroupSelector: WidgetRenderer;
    renderFieldSelector: WidgetRenderer;
    renderConditionSelector: WidgetRenderer;
    renderValueInput: WidgetRenderer;
    /** callbacks */
    onError: (id: string, data: unknown) => void;
    onInit: () => void;
    onChange: (query: Query) => void;
}

interface QueryBuilderWidget {
    /** изначальная отрисовка виджета */
    render(options: QueryBuilderOptions): HTMLElement;
    /** перерисовать с новым запросом */
    updateQuery(query: Query);
    /** уничтожить виджет и выделенные ресурсы */
    destroy();
}
