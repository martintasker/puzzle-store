import Immutable from 'immutable';

import actions from './puzzle-progress.actions';
import updatePuzzleProgressState from './puzzle-progress.reducer';

const INITIAL_STATE = Immutable.List();

var state;

describe('initialization tests', function() {
  it('initializes without crashing', () => {
    state = updatePuzzleProgressState();
    expect(Immutable.is(state, INITIAL_STATE)).toBe(true);
  });
});

describe('puzzleProgressData tests', function() {
  it('handles SET_PUNS ', () => {
    state = updatePuzzleProgressState(state, actions._setPuns(['foo', 'bar']));
    expect(state).toEqual(Immutable.fromJS([{index: 0, status: 'not-done'},{index: 1, status: 'not-done'}]));
  });
});

describe('puzzleProgress status tests', function() {
  it('updates status', function() {
    state = updatePuzzleProgressState(state, actions.setPunDone(0));
    expect(state).toEqual(Immutable.fromJS([{index: 0, status: 'done'},{index: 1, status: 'not-done'}]));
    state = updatePuzzleProgressState(state, actions.setPunRight(0));
    expect(state).toEqual(Immutable.fromJS([{index: 0, status: 'right'},{index: 1, status: 'not-done'}]));
    state = updatePuzzleProgressState(state, actions.setPunWrong(0));
    expect(state).toEqual(Immutable.fromJS([{index: 0, status: 'wrong'},{index: 1, status: 'not-done'}]));
    state = updatePuzzleProgressState(state, actions.setPunNotDone(0));
    expect(state).toEqual(Immutable.fromJS([{index: 0, status: 'not-done'},{index: 1, status: 'not-done'}]));
  });
});
