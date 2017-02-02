const actions = {
  // setup time: add puzzle data into store side of state
  addPuzzleData: (id, puzzle) => { return { type: 'ADD_PUZZLE_DATA', id, puzzle }},

  // navigation time, set current puzzle
  activatePuzzle: (id) => { return { type: 'ACTIVATE_PUZZLE', id }},
  _setCurrentPuzzle: (id, puzzleData) => { return { type: 'SET_CURRENT_PUZZLE', id, puzzleData }},
  _setPuzzleData: (puzzleData) => { return { type: 'SET_PUZZLE_DATA', puzzleData }},
  _setPuns: (puns) => { return { type: 'SET_PUNS', puns }},

  // control visibility of answers, in context of current puzzle
  showAlways: () => { return { type: 'SHOW_ALWAYS', showState: 'always' }},
  showOnHover: () => { return { type: 'SHOW_ON_HOVER', showState: 'on-hover' }},
  showBelow: () => { return { type: 'SHOW_BELOW', showState: 'below' }},
  showNever: () => { return { type: 'SHOW_NEVER', showState: 'never' }},

  // control state of pun given by index, in context of current puzzle
  setPunDone: (index) => { return { type: 'SET_PUN_DONE', index, punStatus: 'done' }},
  setPunNotDone: (index) => { return { type: 'SET_PUN_NOT_DONE', index, punStatus: 'not-done' }},
  setPunRight: (index) => { return { type: 'SET_PUN_RIGHT', index, punStatus: 'right' }},
  setPunWrong: (index) => { return { type: 'SET_PUN_WRONG', index, punStatus: 'wrong' }},
}

export default actions;
