import Immutable from 'immutable';

import actions from './puzzle-progress.actions';
import updatePuzzleProgressState from './puzzle-progress.reducer';

const INITIAL_STATE = Immutable.Map({puns: Immutable.List(), log: Immutable.List(), progress: null});

var state;

describe('initialization tests', function() {
  it('initializes as expected', () => {
    state = updatePuzzleProgressState();
    expect(Immutable.is(state.get('puns'), INITIAL_STATE.get('puns'))).toBe(true);
    expect(state.getIn(['progress', 'done'])).toEqual(0);
    expect(state.get('log').count()).toEqual(0);
  });
});

describe('puzzleProgressData tests', function() {
  it('handles SET_PUNS ', () => {
    state = updatePuzzleProgressState(state, actions._setPuns(['foo', 'bar']));
    expect(state.get('puns')).toEqual(Immutable.fromJS([{index: 0, status: 'not-done'},{index: 1, status: 'not-done'}]));
    expect(state.getIn(['progress', 'done'])).toEqual(0);
    expect(state.getIn(['progress', 'total'])).toEqual(2);
    expect(state.get('log').count()).toEqual(0);
  });
});

describe('puzzleProgress status tests', function() {
  it('updates status', function() {
    state = updatePuzzleProgressState(state, actions.setPunDone(0));
    expect(state.get('puns')).toEqual(Immutable.fromJS([{index: 0, status: 'done'},{index: 1, status: 'not-done'}]));
    expect(state.getIn(['progress','done'])).toEqual(1);
    expect(state.getIn(['progress','right'])).toEqual(0);
    expect(state.getIn(['progress','wrong'])).toEqual(0);
    expect(state.getIn(['progress','total'])).toEqual(2);
    expect(state.get('log').count()).toEqual(1);

    state = updatePuzzleProgressState(state, actions.setPunRight(0));
    expect(state.get('puns')).toEqual(Immutable.fromJS([{index: 0, status: 'right'},{index: 1, status: 'not-done'}]));
    expect(state.getIn(['progress','right'])).toEqual(1);
    expect(state.getIn(['progress','done'])).toEqual(1);
    expect(state.get('log').count()).toEqual(2);

    state = updatePuzzleProgressState(state, actions.setPunWrong(1));
    expect(state.get('puns')).toEqual(Immutable.fromJS([{index: 0, status: 'right'},{index: 1, status: 'wrong'}]));
    expect(state.getIn(['progress','right'])).toEqual(1);
    expect(state.getIn(['progress','wrong'])).toEqual(1);
    expect(state.getIn(['progress','done'])).toEqual(2);
    expect(state.get('log').count()).toEqual(3);

    state = updatePuzzleProgressState(state, actions.setPunNotDone(0));
    expect(state.get('puns')).toEqual(Immutable.fromJS([{index: 0, status: 'not-done'},{index: 1, status: 'wrong'}]));
    expect(state.get('log').count()).toEqual(4);
  });
});
