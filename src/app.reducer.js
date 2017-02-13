import Immutable from 'immutable';

/*
  appState - describes the state of the entire app

  {
    puzzleData: map of {key -> puzzleSpec}
    currentState: currentState
  }
*/

import currentActions from './current.actions';
import currentReducer from './current.reducer';

const initialState = Immutable.Map({currentState: currentReducer(), puzzleData: Immutable.Map()});

export default function(state = initialState, action) {
  if (!action) {
    return state;
  }

  if (action.type === 'ADD_PUZZLE_DATA') {
    const {id, puzzle} = action;
    return state.updateIn(['puzzleData'], map => map.set(id, puzzle));
  }

  if (action.type === 'ACTIVATE_PUZZLE') {
    let {id} = action;
    let puzzleData = state.getIn(['puzzleData', id]);
    let newAction = currentActions._setCurrentPuzzle(id, puzzleData);
    return state.updateIn(['current'], state => currentReducer(state, newAction));
  }

  // generic and default handling
  state = state.updateIn(['current'], state => currentReducer(state, action))
  return state;
}
