export enum WidgetPropertyType {
    /** add custom UI template to be used inside your widget */
    UITemplate = 'uiTemplate',
    /** bind DB query to your widget,
     * use this property to query and sort data */
    DataSource = 'dataSource',
    /** Select available entityId */
    Entity = 'entity',
    /** Select field from data source to be used in your widget */
    EntityField = 'entityField',
    /** auto layout properties, used by container widget
     * no need to be used elsewhere */
    LayoutOptions = 'layoutOptions',
    FormOptions = 'formOptions',
    query = 'query',
    number = 'number',
    string = 'str',
    boolean = 'bool',
    datetime = 'datetime',
    color = 'color',
    fileImage = 'fileImage',
}
