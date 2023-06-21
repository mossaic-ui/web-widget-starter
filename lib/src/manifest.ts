import {
    WidgetDescriptor,
    WidgetProperty,
    WidgetPropertyType,
    WidgetViewFormat,
} from '@mossaic-ui/widgets-utils';
import {MyLibWidget} from './my-lib';

const propertiesParameters: WidgetProperty[] = [
    {
        type: WidgetPropertyType.string,
        id: 'someStringProperty',
        displayName: 'String property',
        settings: {
            placeholder: 'Type something!',
        },
    },
    {
        type: WidgetPropertyType.string,
        id: 'someTextAreaProperty',
        displayName: 'Textarea property',
        settings: {
            viewFormat: WidgetViewFormat.TextArea,
            placeholder: 'Type something!',
        },
    },
    {
        type: WidgetPropertyType.string,
        id: 'someEnumProperty',
        displayName: 'Enum property',
        defaultValue: 'id2',
        settings: {
            viewFormat: WidgetViewFormat.Dropdown,
            viewFormatMeta: {
                // todo bug, свойство не работает
                showNullValue: true,
                data: [
                    {
                        label: 'Selection 1',
                        id: 'id1',
                    },
                    {
                        label: 'Selection 2',
                        id: 'id2',
                    },
                ],
            },
            placeholder: 'Enum placeholder',
        },
    },
    {
        type: WidgetPropertyType.number,
        id: 'someNumericProperty',
        displayName: 'Numeric property',
        settings: {
            placeholder: '00',
        },
    },
    {
        type: WidgetPropertyType.boolean,
        id: 'someBoolProperty',
        displayName: 'Flag',
        settings: {},
    },
    // {
    // todo пока что не поддерживается
    //     type: WidgetPropertyType.datetime,
    //     id: 'someDateProperty',
    //     displayName: 'Flag',
    //     settings: {},
    // },
    {
        type: WidgetPropertyType.color,
        id: 'someColorProperty',
        displayName: 'Color',
        settings: {},
    },
    {
        type: WidgetPropertyType.fileImage,
        id: 'someImageProperty',
        displayName: 'Image',
        settings: {},
    },
    {
        type: WidgetPropertyType.DataSource,
        id: 'dataSource',
        displayName: 'Data Source',
        settings: {},
    },
    {
        type: WidgetPropertyType.EntityField,
        id: 'startDateField',
        displayName: 'Start date field',
        // description: "Field to read event's start date from",
        settings: {
            entityIdFromEntityListField: 'dataSource',
        },
        expressions: {
            hidden: form => !form['dataSource'],
        },
    },
    {
        type: WidgetPropertyType.UITemplate,
        id: 'rowTemplate',
        displayName: 'UI data row template',
    },
];

export const widget: WidgetDescriptor = {
    id: 'myWidget',
    version: '0.0.1',
    displayName: 'My Widget',
    isFormControl: true,
    properties: {
        propertiesParameters,
        propertiesStyle: [],
    },
    events: [
        {
            displayName: 'Change',
            id: 'change',
            properties: [],
        },
    ],
    eventsKeys: [],
    customSettingsComponent: false,
    factory: (options, values) => new MyLibWidget(),
    ghostElemProperties: {
        width: 1000,
        height: 800,
    },
    widgetDefaultOptions: {
        width: 1000,
        height: 800,
    },
};
