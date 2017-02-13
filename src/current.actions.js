import puzzleActions from './puzzle.actions';

const actions = {
  ...puzzleActions,

  // navigation time, set current puzzle
  _setCurrentPuzzle: (id, puzzleData) => { return { type: 'SET_CURRENT_PUZZLE', id, puzzleData }},
}

export default actions;
