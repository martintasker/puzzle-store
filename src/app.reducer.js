import Immutable from 'immutable';

/*
  appState - describes the state of the entire app

  {
    puzzleData: map of {key -> puzzleSpec}
    currentState: currentState
  }
*/

import actions from './actions';
import currentState from './current.reducer';

const initialAppState = Immutable.Map({currentState: currentState(), puzzleData: Immutable.Map()});

export default function(state = initialAppState, action) {
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
    let newAction = actions._setCurrentPuzzle(id, puzzleData);
    return state.updateIn(['current'], state => currentState(state, newAction));
  }

  // generic and default handling
  state = state.updateIn(['current'], state => currentState(state, action))
  return state;
}
