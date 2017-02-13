(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("redux"), require("immutable"));
	else if(typeof define === 'function' && define.amd)
		define(["redux", "immutable"], factory);
	else if(typeof exports === 'object')
		exports["PuzzleStore"] = factory(require("redux"), require("immutable"));
	else
		root["PuzzleStore"] = factory(root["redux"], root["immutable"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_3__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _redux = __webpack_require__(1);
	
	var _app = __webpack_require__(2);
	
	var _app2 = _interopRequireDefault(_app);
	
	var _actions = __webpack_require__(4);
	
	var _actions2 = _interopRequireDefault(_actions);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var store = (0, _redux.createStore)(_app2.default);
	
	// export the actions and the store
	exports.default = { store: store, actions: _actions2.default };

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	/*
	  appState - describes the state of the entire app
	
	  {
	    puzzleData: map of {key -> puzzleSpec}
	    currentState: currentState
	  }
	*/
	
	exports.default = function () {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
	  var action = arguments[1];
	
	  if (!action) {
	    return state;
	  }
	
	  if (action.type === 'ADD_PUZZLE_DATA') {
	    var _ret = function () {
	      var id = action.id,
	          puzzle = action.puzzle;
	
	      return {
	        v: state.updateIn(['puzzleData'], function (map) {
	          return map.set(id, puzzle);
	        })
	      };
	    }();
	
	    if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	  }
	
	  if (action.type === 'ACTIVATE_PUZZLE') {
	    var _ret2 = function () {
	      var id = action.id;
	
	      var puzzleData = state.getIn(['puzzleData', id]);
	      var newAction = _current2.default._setCurrentPuzzle(id, puzzleData);
	      return {
	        v: state.updateIn(['current'], function (state) {
	          return (0, _current4.default)(state, newAction);
	        })
	      };
	    }();
	
	    if ((typeof _ret2 === 'undefined' ? 'undefined' : _typeof(_ret2)) === "object") return _ret2.v;
	  }
	
	  // generic and default handling
	  state = state.updateIn(['current'], function (state) {
	    return (0, _current4.default)(state, action);
	  });
	  return state;
	};
	
	var _immutable = __webpack_require__(3);
	
	var _immutable2 = _interopRequireDefault(_immutable);
	
	var _current = __webpack_require__(10);
	
	var _current2 = _interopRequireDefault(_current);
	
	var _current3 = __webpack_require__(6);
	
	var _current4 = _interopRequireDefault(_current3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var initialState = _immutable2.default.Map({ currentState: (0, _current4.default)(), puzzleData: _immutable2.default.Map() });

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _current = __webpack_require__(10);
	
	var _current2 = _interopRequireDefault(_current);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var actions = _extends({}, _current2.default, {
	
	  // setup time: add puzzle data into store side of state
	  addPuzzleData: function addPuzzleData(id, puzzle) {
	    return { type: 'ADD_PUZZLE_DATA', id: id, puzzle: puzzle };
	  },
	
	  // navigation time, set current puzzle
	  activatePuzzle: function activatePuzzle(id) {
	    return { type: 'ACTIVATE_PUZZLE', id: id };
	  }
	});
	
	exports.default = actions;

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var actions = {
	  // navigation time, set up current puzzle
	  _setPuns: function _setPuns(puns) {
	    return { type: 'SET_PUNS', puns: puns };
	  },
	
	  // control state of pun given by index, in context of current puzzle
	  setPunDone: function setPunDone(index) {
	    return { type: 'SET_PUN_DONE', index: index, punStatus: 'done' };
	  },
	  setPunNotDone: function setPunNotDone(index) {
	    return { type: 'SET_PUN_NOT_DONE', index: index, punStatus: 'not-done' };
	  },
	  setPunRight: function setPunRight(index) {
	    return { type: 'SET_PUN_RIGHT', index: index, punStatus: 'right' };
	  },
	  setPunWrong: function setPunWrong(index) {
	    return { type: 'SET_PUN_WRONG', index: index, punStatus: 'wrong' };
	  }
	};
	
	exports.default = actions;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	/*
	  currentState gives status of user interactions with app
	
	  {
	    puzzleId: key, indexing into puzzles
	    puzzles: map of {key -> puzzleState}
	  }
	
	  There is a concept of "the current puzzle state" which can be found by taking puzzles[puzzleId].
	*/
	
	exports.default = function () {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
	  var action = arguments[1];
	
	  if (!action) {
	    return state;
	  }
	
	  if (action.type === 'SET_CURRENT_PUZZLE') {
	    var _ret = function () {
	      var id = action.id,
	          puzzleData = action.puzzleData;
	
	      return {
	        v: state.set('puzzleId', id).updateIn(['puzzles', id], function (puzzle) {
	          return !puzzle ? newPuzzleState(puzzleData) : puzzle;
	        })
	      };
	    }();
	
	    if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	  }
	
	  // generic and default handling
	  state = state.updateIn(['puzzles', state.get('puzzleId')], function (subState) {
	    return (0, _puzzle4.default)(subState, action);
	  });
	  return state;
	};
	
	var _immutable = __webpack_require__(3);
	
	var _immutable2 = _interopRequireDefault(_immutable);
	
	var _puzzle = __webpack_require__(9);
	
	var _puzzle2 = _interopRequireDefault(_puzzle);
	
	var _puzzle3 = __webpack_require__(7);
	
	var _puzzle4 = _interopRequireDefault(_puzzle3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var initialState = _immutable2.default.Map({ puzzleId: null, puzzles: _immutable2.default.Map() });
	
	// todo: export the below from puzzleState
	function newPuzzleState(puzzleData) {
	  return (0, _puzzle4.default)(undefined, _puzzle2.default._setPuzzleData(puzzleData));
	}

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function () {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
	  var action = arguments[1];
	
	  if (!action) {
	    return state;
	  }
	
	  if (action.type === 'SET_PUZZLE_DATA') {
	    return state.set('puzzleData', newPuzzleProgressState(action.puzzleData.puzzle.puns));
	  }
	
	  var showActionTypes = ['SHOW_NEVER', 'SHOW_ALWAYS', 'SHOW_BELOW', 'SHOW_ON_HOVER'];
	  if (showActionTypes.includes(action.type)) {
	    return state.set('show', action.showState);
	  }
	
	  // generic and default handling
	  state = state.updateIn(['puzzleData'], function (state) {
	    return (0, _puzzleProgress2.default)(state, action);
	  });
	  return state;
	};
	
	var _immutable = __webpack_require__(3);
	
	var _immutable2 = _interopRequireDefault(_immutable);
	
	var _puzzleProgress = __webpack_require__(8);
	
	var _puzzleProgress2 = _interopRequireDefault(_puzzleProgress);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var initialState = _immutable2.default.Map({ show: 'never' });
	
	/*
	  puzzleState, data and progress in relation to one puzzle
	
	  {
	    show: show-state (one of 'never', 'always', 'below', 'on-hover')
	    puzzleData: puzzleProgressState
	  }
	*/
	
	function newPuzzleProgressState(puns) {
	  return (0, _puzzleProgress2.default)(undefined, { type: 'SET_PUNS', puns: puns });
	}

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	exports.default = function () {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
	  var action = arguments[1];
	
	  if (!action) {
	    return state;
	  }
	
	  if (action.type === 'SET_PUNS') {
	    var puns = action.puns;
	
	    return _immutable2.default.List(puns.map(function (pun, index) {
	      return _immutable2.default.Map({ index: index, status: 'not-done' });
	    }));
	  }
	
	  var statusActionTypes = ['SET_PUN_NOT_DONE', 'SET_PUN_RIGHT', 'SET_PUN_WRONG', 'SET_PUN_DONE'];
	  if (statusActionTypes.includes(action.type)) {
	    var _ret = function () {
	      var punStatus = action.punStatus;
	
	      return {
	        v: state.updateIn([action.index, 'status'], function () {
	          return punStatus;
	        })
	      };
	    }();
	
	    if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	  }
	
	  return state;
	};
	
	var _immutable = __webpack_require__(3);
	
	var _immutable2 = _interopRequireDefault(_immutable);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/*
	  puzzleProgressState: completion state of each pun within a puzzle
	
	  [
	    { index -> {
	      status: one of 'not-done', 'done', 'right', 'wrong'
	    }}
	  ]
	
	  The indexes increase sequentially from zero and correspond to the index of the map, in the list.
	*/
	
	var initialState = _immutable2.default.List();

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _puzzleProgress = __webpack_require__(5);
	
	var _puzzleProgress2 = _interopRequireDefault(_puzzleProgress);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var actions = _extends({}, _puzzleProgress2.default, {
	
	  // setup time: add puzzle data into store side of state
	  _setPuzzleData: function _setPuzzleData(puzzleData) {
	    return { type: 'SET_PUZZLE_DATA', puzzleData: puzzleData };
	  },
	
	  // control visibility of answers, in context of current puzzle
	  showAlways: function showAlways() {
	    return { type: 'SHOW_ALWAYS', showState: 'always' };
	  },
	  showOnHover: function showOnHover() {
	    return { type: 'SHOW_ON_HOVER', showState: 'on-hover' };
	  },
	  showBelow: function showBelow() {
	    return { type: 'SHOW_BELOW', showState: 'below' };
	  },
	  showNever: function showNever() {
	    return { type: 'SHOW_NEVER', showState: 'never' };
	  }
	});
	
	exports.default = actions;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _puzzle = __webpack_require__(9);
	
	var _puzzle2 = _interopRequireDefault(_puzzle);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var actions = _extends({}, _puzzle2.default, {
	
	  // navigation time, set current puzzle
	  _setCurrentPuzzle: function _setCurrentPuzzle(id, puzzleData) {
	    return { type: 'SET_CURRENT_PUZZLE', id: id, puzzleData: puzzleData };
	  }
	});
	
	exports.default = actions;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=puzzle-store.js.map