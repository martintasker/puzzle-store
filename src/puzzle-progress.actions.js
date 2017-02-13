const actions = {
  // navigation time, set up current puzzle
  _setPuns: (puns) => { return { type: 'SET_PUNS', puns }},

  // control state of pun given by index, in context of current puzzle
  setPunDone: (index) => { return { type: 'SET_PUN_DONE', index, punStatus: 'done' }},
  setPunNotDone: (index) => { return { type: 'SET_PUN_NOT_DONE', index, punStatus: 'not-done' }},
  setPunRight: (index) => { return { type: 'SET_PUN_RIGHT', index, punStatus: 'right' }},
  setPunWrong: (index) => { return { type: 'SET_PUN_WRONG', index, punStatus: 'wrong' }},
}

export default actions;
