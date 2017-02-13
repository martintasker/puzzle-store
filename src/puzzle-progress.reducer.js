import Immutable from 'immutable';

/*
  puzzleProgressState: completion state of each pun within a puzzle

  puns:
    [
      { index -> {
        status: one of 'not-done', 'done', 'right', 'wrong'
      }}
    ]
  progress:
    [
      {
        timestamp:
        right:
        wrong:
        done:
      }
    ]

  The indexes increase sequentially from zero and correspond to the index of the map, in the list.
*/

const initialState = Immutable.Map({puns: Immutable.List(), progress: Immutable.List()});

export default function(state = initialState, action) {
  if (!action) {
    return state;
  }

  if (action.type === 'SET_PUNS') {
    let {puns} = action;
    return state.set('puns', Immutable.List(puns.map((pun, index) => Immutable.Map({index, status: 'not-done'}))));
  }
  
  const statusActionTypes = ['SET_PUN_NOT_DONE', 'SET_PUN_RIGHT', 'SET_PUN_WRONG', 'SET_PUN_DONE'];
  if (statusActionTypes.includes(action.type)) {
    const {punStatus} = action;
    return state.updateIn(['puns', action.index, 'status'], () => punStatus);
  }

  return state;
}
