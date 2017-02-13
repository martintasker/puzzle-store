import Immutable from 'immutable';

import puzzleActions from './puzzle.actions';
import updatePuzzleState from './puzzle.reducer';

const INITIAL_STATE = Immutable.Map({show: 'never'});

var state;

describe('initialization tests', function() {
  it('initializes without crashing', () => {
    state = updatePuzzleState();
    expect(Immutable.is(state, INITIAL_STATE)).toBe(true);
  });
});

describe('puzzleData tests', function() {
  it('handles SET_PUZZLE_DATA ', () => {
    state = updatePuzzleState(state, puzzleActions._setPuzzleData({puzzle:{puns:['foo']}}));
    expect(Immutable.is(state.getIn(['puzzleData']),Immutable.fromJS({ puns: [{index:0,status:'not-done'}], progress: [] }))).toBe(true);
  });
});

describe('SHOW-xxx tests', function() {
  it('handles SHOW-xxx correctly', () => {
    let state2 = updatePuzzleState(state, puzzleActions.showAlways());
    expect(state2).not.toEqual(state);
    expect(state2.get('show')).toEqual('always');
    state = updatePuzzleState(state2, puzzleActions.showOnHover());
    expect(state.get('show')).toEqual('on-hover');
    state = updatePuzzleState(state, puzzleActions.showAlways());
    expect(state.get('show')).toEqual('always');
    state = updatePuzzleState(state, puzzleActions.showNever());
    expect(state.get('show')).toEqual('never');
  });
});

describe('SET-PUN-xxx tests', function() {
  it('handles SET-PUN-xxx correctly', () => {
    let state2 = updatePuzzleState(state, puzzleActions.setPunDone(0));
    expect(state2).not.toBe(state);
  });
});
