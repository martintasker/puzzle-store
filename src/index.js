import {createStore} from 'redux';
import appState from './app.state';

// export the actions and the store
import actions from './actions';
const store = createStore(appState);

export default {store, actions};
