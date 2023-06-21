import {initApp} from '@mossaic-ui/editor-complete';
import {manifeset} from '@my-lib';
import '../assets/styles.global.css';
import '@mossaic-ui/theme/reset.css';
import '@mossaic-ui/theme/mossaic-reset.css';
import '@mossaic-ui/theme/main/index.css';
import '@mossaic-ui/editor-complete/dist/index.css';

const root = document.createElement('div');
root.classList.add('ui-editor-wrap-container');
document.body.append(root);
initApp(root, {
    widgets: [manifeset],
    storeAPI: true,
    singlePageMode: true,
    saveStateToLocalStorage: true,
    genesisSchemeId: '',
    /** todo SET YOUR TEST SCHEME ID */
    localSchemeId: '',
}).then(() => {
    // console.log('success');
});
