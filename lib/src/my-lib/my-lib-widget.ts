import {Widget} from '@mossaic-ui/widgets-utils';
import {MyLibWidgetOptions} from './my-lib-widget-options';
import {createElement} from '../utils/create-element';
import styles from './my-lib-widget.module.css';

/**
 * Widget example
 * API - see [WidgetRenderer](packages/widgets-utils/widget-renderer/widget-renderer.ts)
 * Data source attribute - see [Data Source](packages/widgets-utils/data-source/data-source.ts)
 **/
export class MyLibWidget<
    U = {
        id: number;
        title: string;
        startDate: number;
        endDate: number;
    }
> extends Widget<MyLibWidgetOptions<U>> {
    private listContainer: HTMLElement;
    private get currentDate() {
        return Date.now();
    }

    constructor() {
        super();
    }

    /** Receive widget options and initial render */
    render(options: MyLibWidgetOptions<U>) {
        this.options = {...options};
        this.elem = createElement(
            `<div class='${styles.mainWrapper}'> Mossaic UI Widget Example </div>`
        );
        this.listContainer = createElement(
            `<div class='${styles.listContainer}'></div>`
        );
        this.elem.appendChild(this.listContainer);
        this.renderListItems();
        return this.elem;
    }

    /** we use setValue to change widget properties and do fine-grained rerender */
    setValue(key: keyof MyLibWidgetOptions<U>, value: unknown) {
        if (key === 'defaultStartDatetime') {
            this.options[key] = value as number;
            this.renderListItems();
        }
    }

    private renderListItems() {
        this.options.dataSource &&
            this.options.dataSource
                .load({
                    sort: [
                        {
                            desc: true,
                            field: this.options.dateField,
                        },
                    ],
                    /** example of filtration */
                    filter: {
                        [this.options.dateField]: {
                            lt:
                                this.options.defaultStartDatetime ??
                                this.currentDate,
                        },
                    },
                })
                .then(data => {
                    this.listContainer.innerHTML = '';
                    data.forEach(item => {
                        const eventElem = this.options.eventDayTemplate
                            ? this.options.eventDayTemplate.render(item as any)
                            : createElement(
                                  `<div class="${styles.widgetItem}">
                                               <div>${this.getTimeString(
                                                   item
                                               )}</div> 
                                               <br>           
                                               ${item['title']}
                                            </div>`
                              );
                        this.listContainer.appendChild(eventElem);
                        eventElem.addEventListener('click', () => {
                            this.emitEvent('clickOnEvent', {
                                value: item,
                            });
                        });
                    });
                });
    }

    private getTimeString(item: U) {
        return (
            this.options.dateField &&
            item?.[this.options.dateField] &&
            new Date(item[this.options.dateField]).toLocaleDateString()
        );
    }
}
