import Immutable from 'immutable';

import appState from './app.reducer';
import actions from './actions';
import currentState from './current.reducer';

const INITIAL_STATE = Immutable.Map({currentState: currentState(), puzzleData: Immutable.Map()});

var state;

describe('trivial initialization tests', function() {
  it('initializes without crashing', () => {
    state = appState();
  });
  it('initializes correctly', () => {
    expect(Immutable.is(state, INITIAL_STATE)).toBe(true);
  });
});

describe('addPuzzleData() tests', function() {
  it('adds puzzle data correctly', function() {
    state = appState(state, actions.addPuzzleData('christmas', {puzzle:{puns:['foo']}}));
    let puzzleData = state.getIn(['puzzleData', 'christmas']);
    expect(puzzleData).toEqual({puzzle:{puns:['foo']}});
  });
  it('adds more puzzle data correctly', function() {
    state = appState(state, actions.addPuzzleData('snow-white', {puzzle:{puns:['bah', 'humbug']}}));
    let puzzleData = state.getIn(['puzzleData', 'snow-white']);
    expect(puzzleData).toEqual({puzzle:{puns:['bah', 'humbug']}});
  });
});

describe('activatePuzzle() tests', function() {
  it('sets first id and puzzle correctly', function() {
    state = appState(state, actions.activatePuzzle('christmas'));
    expect(state.getIn(['current', 'puzzleId'])).toEqual('christmas');
    expect(state.getIn(['current', 'puzzles', 'christmas'])).toBeDefined();
  });
  it('updates state of current puzzle', function() {
    expect(state.getIn(['current', 'puzzles', 'christmas', 'show'])).toEqual('never');
    state = appState(state, actions.showAlways());
    expect(state.getIn(['current', 'puzzles', 'christmas', 'show'])).toEqual('always');
  });
  it('sets another id and puzzle correctly', function() {
    expect(state.getIn(['current', 'puzzles', 'snow-white'])).not.toBeDefined();
    state = appState(state, actions.activatePuzzle('snow-white'));
    expect(state.getIn(['current', 'puzzleId'])).toEqual('snow-white');
    expect(state.getIn(['current', 'puzzles', 'snow-white'])).toBeDefined();
    expect(state.getIn(['current', 'puzzles', 'snow-white', 'show'])).toEqual('never');
  });
  it('sets a re-used id but keeps the old puzzle data', function() {
    state = appState(state, actions.activatePuzzle('christmas'));
    expect(state.getIn(['current', 'puzzleId'])).toEqual('christmas');
    expect(state.getIn(['current', 'puzzles', 'christmas', 'show'])).toEqual('always');
  });
});
