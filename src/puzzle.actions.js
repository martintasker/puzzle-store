import puzzleProgressActions from './puzzle-progress.actions';

const actions = {
  ...puzzleProgressActions,

  // setup time: add puzzle data into store side of state
  _setPuzzleData: (puzzleData) => { return { type: 'SET_PUZZLE_DATA', puzzleData }},

  // control visibility of answers, in context of current puzzle
  showAlways: () => { return { type: 'SHOW_ALWAYS', showState: 'always' }},
  showOnHover: () => { return { type: 'SHOW_ON_HOVER', showState: 'on-hover' }},
  showBelow: () => { return { type: 'SHOW_BELOW', showState: 'below' }},
  showNever: () => { return { type: 'SHOW_NEVER', showState: 'never' }},
}

export default actions;
