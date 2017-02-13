import puzzleActions from './puzzle.actions';

const actions = {
  ...puzzleActions,

  // setup time: add puzzle data into store side of state
  addPuzzleData: (id, puzzle) => { return { type: 'ADD_PUZZLE_DATA', id, puzzle }},

  // navigation time, set current puzzle
  activatePuzzle: (id) => { return { type: 'ACTIVATE_PUZZLE', id }},
  _setCurrentPuzzle: (id, puzzleData) => { return { type: 'SET_CURRENT_PUZZLE', id, puzzleData }},
}

export default actions;
