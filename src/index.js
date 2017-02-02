import {createStore} from 'redux';
import appState from './app.state';

// export the actions and the store
export import actions from './actions';
export const store = createStore(appState);
