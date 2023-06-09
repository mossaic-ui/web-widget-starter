# Mossaic web widgets starter

Данный проект является стартовым проектом разработки виджета для веб-редактора Mossaic-UI.


1. [Перед началом работы](#how-to-start)
1. [Рабочий процесс](#workflow)
   1. [Разработка виджета](#widget-development)
   1. [UI/UX](#ui-ux)
   1. [Библиотеки](#ui-ux)
   1. [Тестирование](#ui-editor-test)


## How to start

- Необходимая версия `node` указана в `.nvmrc`, для её установки можно использовать менеджер `nvm` (`nvm install/nvm use`)
- Используется пакетный менеджер [yarn](https://yarnpkg.com/getting-started/install)
- Для начала работы склонируйте репозиторий
  - `git clone https://github.com/mossaic-ui/web-widget-starter.git`
  - `cd web-widget-starter`
  - `git remote set-url origin <...ссылка на ваш репозиторий в github...>`
  - переименовать виджет с `my-lib / MyLib` в `package.json` и `tsconfig.json`, `index.ts` и т.д., в наименованиях файлов и переменных.
  - название виджета должно совпадать с наименованием репозитория вашего виджета

- Запустить `yarn install` для установки пакетов
- В случае, если команда не была выполнена автоматически запустить `yarn prepack` для инициализации хуков на действия в `git` - [husky](https://typicode.github.io/husky/#/)
- `yarn serve` для запуска сервера отладки, по-умолчанию `3007`, его можно изменить с помощью параметра `port`, например, `yarn serve --port=4000`
- <span style="color:orange">возможность отладки в режиме `hot reload` временно отсутствует, в случае необходимости можете добавить поддержку самостоятельно</span>

## Workflow

- разработка проекта и виджетов ведется на чистом `typescript` или `typescript` с использованием последней версии `react`
- частично требования к разработке указаны [здесь](https://www.notion.so/wevdevguide/typescript-0f70eb10219b408a861a6b49e3f745f3)
- `packages` - внутренние пакеты, редактирование которых в рамках разработки виджетов не предполагается
- `lib` - папка с исходным кодом виджета
- `src` - исходный код приложения для тестирования виджета
- импортировать виджет нужно только через указание модуля `@my-lib`, например `import {myVariable} from @my-lib`
- в проекте используются css модули. Файлы css модулей должны заканчиваться на `.module.css`, иначе они будут добавлены глобально, как обычные css правила
- для стилей использовать препроцессор `scss` или только `css`
- виджет не должен создавать глобальных стилей без крайней необходимости
- подразумевается кросс-браузерная адаптивная верстка
- если глобальные стили присутствуют, то они должны реализовывать методологию [BEM](https://yandex.com/dev/bem/)
- конфигурацию `esbuild` можно при необходимости дополнять по вашему усмотрению. Код должен собираться в формате es модуля
- в случае разработки на `react` вы можете собирать пакет своими средствами (не через esbuild) 

### Widget development

- Виджет представляет собой объект, реализующий интерфейс [WidgetRenderer](packages/widgets-utils/widget-renderer/widget-renderer.ts)
  - Для использования виджета в редакторе достаточно, чтобы он реализовывал два метода:
    - Метод `render` используется для первичной отрисовки виджета. Принимает на вход объект сохраненных параметров виджета, возвращает `HTML` объект виджета, который будет встроен в приложение
      - [пример типа описывающего опции виджета](lib/src/my-lib/my-lib-widget-options.ts)
    - Метод `setValue` используется для изменения значений атрибутов виджета, в частности в редакторе вызывается этот метод
      для изменений значений виджета через панель параметров виджета. Метод `setValue` принимает ключ объекта опций виджета и новое значение
  - Для порождения событий виджет должен использовать свойство `emit` из [RenderOptions](packages/widgets-utils/widget-renderer/render-options.ts), см. пример с событием `clickOnEvent` в тестовом виджете

- Класс виджета может наследовать класс [Widget](packages/widgets-utils/widget-renderer/widget.ts), который в свою очередь реализует интерфейс `WidgetRenderer`. Данный класс реализует общую логику работы с виджетом
- Для инициализации виджета в редакторе используется объект, реализующий интерфейс [WidgetDescriptor](packages/widgets-utils/editor-utils/widget-descriptor.ts) из [@mossaic-ui/widgets-utils](packages/widgets-utils)
  - метод `factory` вызывается редактором для создания экземпляра виджета, метод должен возвращать объект, реализующий интерфейс `WidgetRenderer`
  - свойство `properties` позволяет настроить атрибуты доступные для настройки через визуальный интерфейс редактора
- Параметры виджетов располагаются тут [manifest.ts](lib/src/manifest.ts)
- Параметр с типом `DataSource` представляет собой асинхронный источник данных. 
В рамках данного проекта приведена mock реализация, которая поддерживает ограниченный список операторов и может содержать ошибки, в рамках задачи можете дописать необходимые для тестирования функции хранилища 



### UI UX

- При возникновении вопросов по оформлению UI можно ориентироваться на [дизайн систему](https://www.figma.com/file/2wOPCn4nxT0BKYLIaOZ78M/MOSSAIC-UI-KIT?node-id=0%3A1&t=lb2J23ZnY4y2rvfF-1)

#### 3d parties

- Подразумевается, что библиотеки используемые виджетом не будут включены в пакет. Следующие зависимости предоставит сборщик редактора, 
но есть вероятность, что они перестанут использоваться в будущем

```
  "lodash-es": "4.17.21",
  "rxjs": "^7.5.7",
  "date-fns": "2.29.3", // в будущем скорее всего перестанет использоваться в пользу `Intl`,
  "react": "18.2.0"
```


## UI Editor Test

Если вам предоставлен доступ к пакету с редактором, то вы можете провести тестирование самостоятельно.
Если вам не предоставлен доступ, необходимо тестировать виджет без редактора, как это показано в [примере](src/index.ts)

- Для тестирования виджета используется графический редактор, требующий работы с сервером, запуск редактора осуществляется тут `[src/index.ts](src/index.ts)`
  - В [src/ui-editor-test.ts](src/ui-editor-test.ts) **Свойство `localSchemeId` нужно заполнить идентификатором схемы, в рамках которой вы собираетесь тестировать ваш виджет** (выдается индивидуально при старте выполнения задания)
- При работе с редактором в конструктор виджета не будет передано никаких опций
- Для отрисовки виджета редактор использует метод `render`
- При установке параметров виджета их редактора вызывается метод виджета `setValue`, куда передается ключ и значение соответствующего параметра
- Для работы с данными используется свойство с типом `dataSource` с методами CRUD для работы с данными
  - Выбирается идентификатор сущности (коллекции/таблицы в БД)
- Свойства с типом `EntityField` позволяют выбрать строку с идентификатором ключа сущности (например, поле/столбец значение которого вы хотите отобразить)
- API других свойств см. [WidgetPropertyType](packages/widgets-utils/editor-utils/widget-property-type.ts)
- Для настройки связанной бизнес логики (API) и сущностей (БД) необходимо использовать [mossaic(ufp)-editor](https://editor.mossaic.dev.int.nt-com.ru/) см. [инструкцию]()
  - Для вызова действия со схемы используйте свойства `actionsAPI` в `RenderOptions`, которые передаются в методе `render`.
  - метод `executeAction` в API позволяет вызвать созданные на схеме действия
  - см. [пример](lib/src/my-lib/my-lib-widget.ts)
