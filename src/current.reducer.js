import Immutable from 'immutable';

/*
  currentState gives status of user interactions with app

  {
    puzzleId: key, indexing into puzzles
    puzzles: map of {key -> puzzleState}
  }

  There is a concept of "the current puzzle state" which can be found by taking puzzles[puzzleId].
*/

import puzzleActions from './puzzle.actions';
import puzzleReducer from './puzzle.reducer';

const initialState = Immutable.Map({puzzleId: null, puzzles: Immutable.Map()});

// todo: export the below from puzzleState
function newPuzzleState(puzzleData) {
  return puzzleReducer(undefined, puzzleActions._setPuzzleData(puzzleData));
}

export default function(state = initialState, action) {
  if (!action) {
    return state;
  }

  if (action.type === 'SET_CURRENT_PUZZLE') {
    let {id, puzzleData} = action;
    return state.set('puzzleId', id).updateIn(['puzzles', id], puzzle => !puzzle ? newPuzzleState(puzzleData) : puzzle);
  }

  // generic and default handling
  state = state.updateIn(['puzzles', state.get('puzzleId')], subState => puzzleReducer(subState, action));
  return state;
}
