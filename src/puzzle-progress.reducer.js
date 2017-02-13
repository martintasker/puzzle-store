import Immutable from 'immutable';

/*
  puzzleProgressState: completion state of each pun within a puzzle

  [
    { index -> {
      status: one of 'not-done', 'done', 'right', 'wrong'
    }}
  ]

  The indexes increase sequentially from zero and correspond to the index of the map, in the list.
*/

const initialState = Immutable.List();

export default function(state = initialState, action) {
  if (!action) {
    return state;
  }

  if (action.type === 'SET_PUNS') {
    let {puns} = action;
    return Immutable.List(puns.map((pun, index) => Immutable.Map({index, status: 'not-done'})));
  }
  
  const statusActionTypes = ['SET_PUN_NOT_DONE', 'SET_PUN_RIGHT', 'SET_PUN_WRONG', 'SET_PUN_DONE'];
  if (statusActionTypes.includes(action.type)) {
    const {punStatus} = action;
    return state.updateIn([action.index, 'status'], () => punStatus);
  }

  return state;
}
