import currentActions from './current.actions';

const actions = {
  ...currentActions,

  // setup time: add puzzle data into store side of state
  addPuzzleData: (id, puzzle) => { return { type: 'ADD_PUZZLE_DATA', id, puzzle }},

  // navigation time, set current puzzle
  activatePuzzle: (id) => { return { type: 'ACTIVATE_PUZZLE', id }},
}

export default actions;
