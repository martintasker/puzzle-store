import Immutable from 'immutable';

import actions from './current.actions';
import puzzleState from './puzzle.reducer';
import currentState from './current.reducer';

const INITIAL_STATE = Immutable.Map({puzzleId: null, puzzles: Immutable.Map()});

var state;

describe('trivial initialization tests', function() {
  it('initializes without crashing', () => {
    state = currentState();
  });
  it('initializes correctly', () => {
    expect(Immutable.is(state, INITIAL_STATE)).toBe(true);
  });
});

var fooState;

describe('SET_CURRENT_PUZZLE tests', function() {
  it('sets first id and puzzle correctly', function() {
    state = currentState(state, actions._setCurrentPuzzle('christmas', {puzzle:{puns:['foo']}}));
    expect(state.get('puzzleId')).toEqual('christmas');
    fooState = state.getIn(['puzzles', 'christmas', 'puzzleData']);
    expect(!!fooState).toBe(true);
  });
  it('sets another id and puzzle correctly', function() {
    state = currentState(state, actions._setCurrentPuzzle('snow-white', {puzzle:{puns:['bar']}}));
    expect(state.get('puzzleId')).toEqual('snow-white');
    const barState = state.getIn(['puzzles', 'snow-white', 'puzzleData']);
    expect(!!barState).toBe(true);
    expect(barState).not.toBe(fooState);
  });
  it('sets a re-used id but keeps the old puzzle data', function() {
    state = currentState(state, actions._setCurrentPuzzle('christmas', {puzzle:{puns:['bar']}}));
    expect(state.get('puzzleId')).toEqual('christmas');
    const newFooState = state.getIn(['puzzles', 'christmas', 'puzzleData']);
    expect(newFooState).toBe(fooState);
  });
});

describe('SHOW-xxx tests', function() {
  it('initializes show correctly', function() {
    expect(state.getIn(['puzzles', 'christmas', 'show'])).toEqual('never');
    expect(state.getIn(['puzzles', 'snow-white', 'show'])).toEqual('never');
  });
  it('modifies show correctly', function() {
    state = currentState(state, actions.showAlways());
    expect(state.getIn(['puzzles', 'christmas', 'show'])).toEqual('always');
    expect(state.getIn(['puzzles', 'snow-white', 'show'])).toEqual('never');
    state = currentState(state, actions.showOnHover());
    expect(state.getIn(['puzzles', 'christmas', 'show'])).toEqual('on-hover');
    state = currentState(state, actions.showBelow());
    expect(state.getIn(['puzzles', 'christmas', 'show'])).toEqual('below');
    state = currentState(state, actions.showNever());
    expect(state.getIn(['puzzles', 'christmas', 'show'])).toEqual('never');
  });
});

describe('SET-PUN-xxx tests', function() {
  it('handles SET-PUN-xxx correctly', () => {
    let state2 = currentState(state, actions.setPunDone(0));
    expect(state2).not.toBe(state);
  });
});
