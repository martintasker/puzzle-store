import Immutable from 'immutable';

/*
  puzzleState, data and progress in relation to one puzzle

  {
    show: show-state (one of 'never', 'always', 'below', 'on-hover')
    puzzleData: puzzleProgressState
  }
*/

import puzzleProgressActions from './puzzle-progress.actions';
import puzzleProgressReducer from './puzzle-progress.reducer';

const initialState = Immutable.Map({show: 'never'});

function newPuzzleProgressState(puns) {
  return puzzleProgressReducer(undefined, puzzleProgressActions._setPuns(puns));
}

export default function(state = initialState, action) {
  if (!action) {
    return state;
  }

  if (action.type === 'SET_PUZZLE_DATA') {
    return state.set('puzzleData', newPuzzleProgressState(action.puzzleData.puzzle.puns));
  }
  
  const showActionTypes = ['SHOW_NEVER', 'SHOW_ALWAYS', 'SHOW_BELOW', 'SHOW_ON_HOVER'];
  if (showActionTypes.includes(action.type)) {
    return state.set('show', action.showState);
  }

  // generic and default handling
  state = state.updateIn(['puzzleData'], state => puzzleProgressReducer(state, action));
  return state;
}
