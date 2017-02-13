import Immutable from 'immutable';

/*
  puzzleState, data and progress in relation to one puzzle

  {
    show: show-state (one of 'never', 'always', 'below', 'on-hover')
    puzzleData: puzzleProgressState
  }
*/

import puzzleProgressState from './puzzle-progress.reducer';

const initialPuzzleState = Immutable.Map({show: 'never'});

function newPuzzleProgressState(puns) {
  return puzzleProgressState(undefined, {type: 'SET_PUNS', puns});
}

export default function(state = initialPuzzleState, action) {
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
  state = state.updateIn(['puzzleData'], state => puzzleProgressState(state, action));
  return state;
}
