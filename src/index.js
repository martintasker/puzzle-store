import {createStore} from 'redux';

/*
  The central point of Redux is that you maintain state, you put state in a store, and apps
  submit actions to, and subscribe to changes in, that store.  So, we import state from appState,
  and make it into a store.
*/
import actions from './actions';

import appState from './app.state';

var store = createStore(appState);

export default {store, actions};
