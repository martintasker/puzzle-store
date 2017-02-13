import Immutable from 'immutable';

/*
  puzzleProgressState: completion state of each pun within a puzzle

  puns:
    [
      { index -> {
        status: one of 'not-done', 'done', 'right', 'wrong'
      }}
    ]
  progress: (one progress-record)
  log:
    [
      (list of progress-records)
    ]

  The indexes increase sequentially from zero and correspond to the index of the map, in the list.
*/

const initialState = Immutable.Map({puns: Immutable.List(), log: Immutable.List(), progress: null});

function getProgressRecord(date, puns) {
  var result = {
    date,
    done: puns.reduce((count, pun) => count + (pun.get('status') !== 'not-done' ? 1 : 0), 0),
    right: puns.reduce((count, pun) => count + (pun.get('status') === 'right' ? 1 : 0), 0),
    wrong: puns.reduce((count, pun) => count + (pun.get('status') === 'wrong' ? 1 : 0), 0),
    total: puns.count(),
  };
  return result;
}

export default function(state, action) {
  if (!state) {
    state = initialState.set('progress', Immutable.Map(getProgressRecord(new Date(), Immutable.List())));
  }
  if (!action) {
    return state;
  }

  if (action.type === 'SET_PUNS') {
    let {puns} = action;
    let punList = Immutable.List(puns.map((pun, index) => Immutable.Map({index, status: 'not-done'})));
    return state
      .set('puns', punList)
      .set('progress', Immutable.Map(getProgressRecord(new Date(), punList)));
  }
  
  const statusActionTypes = ['SET_PUN_NOT_DONE', 'SET_PUN_RIGHT', 'SET_PUN_WRONG', 'SET_PUN_DONE'];
  if (statusActionTypes.includes(action.type)) {
    const {punStatus} = action;
    var newState = state.updateIn(['puns', action.index, 'status'], () => punStatus);
    if (newState === state) {
      return;
    }
    state = newState;
    const progressRecord = getProgressRecord(new Date(), state.get('puns'));
    return state
      .set('progress', Immutable.Map(progressRecord))
      .set('log', state.get('log').push(progressRecord));
  }

  return state;
}
