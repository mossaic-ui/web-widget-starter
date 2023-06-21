import '../assets/styles.global.css';
import '@mossaic-ui/theme/reset.css';
import '@mossaic-ui/theme/mossaic-reset.css';
import '@mossaic-ui/theme/main/index.css';
import {manifeset} from '@my-lib';
import {ActionOptions} from '../packages/widgets-utils/action/action-options';
import {DataSourceFromList} from './data-source/data-source';
import data from './data-source/mock.json';
import {WidgetRenderer} from '@mossaic-ui/widgets-utils';
import {MyLibWidgetOptions} from '../lib/src/my-lib';

const root = document.createElement('div');
root.classList.add('ui-editor-wrap-container');
document.body.append(root);

/** widget usage example */
const initialDate = '2022-09-21';
const widgetInstance = manifeset.factory('test', {}, {}) as WidgetRenderer<
    MyLibWidgetOptions<{
        id: number;
        title: string;
        startDate: number;
        endDate: number;
    }>
>;
const widgetElem = widgetInstance.render({
    defaultStartDatetime: new Date(initialDate).getTime(),
    dataSource: new DataSourceFromList<{
        id: number;
        startDate: number;
        endDate: number;
        title: string;
    }>(
        data.map((d: any) => {
            d.startDate = new Date(d.startDate).getTime();
            d.endDate = new Date(d.endDate).getTime();
            return d;
        })
    ),
    dateField: 'startDate',
    endDateField: 'endDate',
    actionsAPI: {
        /** mock */
        executeAction(
            actionId: string,
            properties: Record<string, unknown>,
            options?: ActionOptions
        ): Promise<undefined> {
            return Promise.resolve(undefined);
        },
    },
    emit: {},
});

root.appendChild(renderControlPanel());
root.appendChild(widgetElem);

function renderControlPanel() {
    const div = document.createElement('div');
    div.classList.add('ui-editor-wrap-container__control-panel');
    const dateInput = document.createElement('input');
    dateInput.type = 'date';
    dateInput.value = initialDate;
    const button = document.createElement('button');
    button.textContent = '> than visible items';
    div.append(dateInput, button);
    button.addEventListener('click', () => {
        const val = new Date(dateInput.value).getTime();

        /** we use setValue to change widget properties and do fine-grained rerender */

        if (!Number.isNaN(val)) {
            widgetInstance.setValue!('defaultStartDatetime', val);
        } else {
            widgetInstance.setValue!('defaultStartDatetime', undefined);
        }
    });
    return div;
}
