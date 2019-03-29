'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var difference = _interopDefault(require('lodash-es/difference'));
var isString = _interopDefault(require('lodash-es/isString'));
var React = require('react');
var React__default = _interopDefault(React);
var reactBeautifulDnd = require('react-beautiful-dnd');
var _extends$1 = _interopDefault(require('@babel/runtime/helpers/esm/extends'));
var _objectWithoutPropertiesLoose$1 = _interopDefault(require('@babel/runtime/helpers/esm/objectWithoutPropertiesLoose'));
var isNumber = _interopDefault(require('lodash-es/isNumber'));
var sortBy = _interopDefault(require('lodash-es/sortBy'));
var isUndefined = _interopDefault(require('lodash-es/isUndefined'));
var get$1 = _interopDefault(require('lodash-es/get'));
var isEqual = _interopDefault(require('lodash-es/isEqual'));
var pick = _interopDefault(require('lodash-es/pick'));

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var classnames = createCommonjsModule(function (module) {
/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg) && arg.length) {
				var inner = classNames.apply(null, arg);
				if (inner) {
					classes.push(inner);
				}
			} else if (argType === 'object') {
				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
				}
			}
		}

		return classes.join(' ');
	}

	if (module.exports) {
		classNames.default = classNames;
		module.exports = classNames;
	} else {
		window.classNames = classNames;
	}
}());
});

const is = {
  arr: Array.isArray,
  obj: a => Object.prototype.toString.call(a) === '[object Object]',
  fun: a => typeof a === 'function',
  str: a => typeof a === 'string',
  num: a => typeof a === 'number',
  und: a => a === void 0,
  nul: a => a === null,
  set: a => a instanceof Set,
  map: a => a instanceof Map,

  equ(a, b) {
    if (typeof a !== typeof b) return false;
    if (is.str(a) || is.num(a)) return a === b;
    if (is.obj(a) && is.obj(b) && Object.keys(a).length + Object.keys(b).length === 0) return true;
    let i;

    for (i in a) if (!(i in b)) return false;

    for (i in b) if (a[i] !== b[i]) return false;

    return is.und(i) ? a === b : true;
  }

};
function merge(target, lowercase) {
  if (lowercase === void 0) {
    lowercase = true;
  }

  return object => (is.arr(object) ? object : Object.keys(object)).reduce((acc, element) => {
    const key = lowercase ? element[0].toLowerCase() + element.substring(1) : element;
    acc[key] = target(key);
    return acc;
  }, target);
}
function useForceUpdate() {
  const _useState = React.useState(false),
        f = _useState[1];

  const forceUpdate = React.useCallback(() => f(v => !v), []);
  return forceUpdate;
}
function withDefault(value, defaultValue) {
  return is.und(value) || is.nul(value) ? defaultValue : value;
}
function toArray(a) {
  return !is.und(a) ? is.arr(a) ? a : [a] : [];
}
function callProp(obj) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return is.fun(obj) ? obj(...args) : obj;
}

function getForwardProps(props) {
  const to = props.to,
        from = props.from,
        config = props.config,
        onStart = props.onStart,
        onRest = props.onRest,
        onFrame = props.onFrame,
        children = props.children,
        reset = props.reset,
        reverse = props.reverse,
        force = props.force,
        immediate = props.immediate,
        delay = props.delay,
        attach = props.attach,
        destroyed = props.destroyed,
        interpolateTo = props.interpolateTo,
        ref = props.ref,
        lazy = props.lazy,
        forward = _objectWithoutPropertiesLoose$1(props, ["to", "from", "config", "onStart", "onRest", "onFrame", "children", "reset", "reverse", "force", "immediate", "delay", "attach", "destroyed", "interpolateTo", "ref", "lazy"]);

  return forward;
}

function interpolateTo(props) {
  const forward = getForwardProps(props);
  if (is.und(forward)) return _extends$1({
    to: forward
  }, props);
  const rest = Object.keys(props).reduce((a, k) => !is.und(forward[k]) ? a : _extends$1({}, a, {
    [k]: props[k]
  }), {});
  return _extends$1({
    to: forward
  }, rest);
}
function handleRef(ref, forward) {
  if (forward) {
    // If it's a function, assume it's a ref callback
    if (is.fun(forward)) forward(ref);else if (is.obj(forward)) {
      forward.current = ref;
    }
  }

  return ref;
}

class Animated {
  constructor() {
    this.payload = void 0;
    this.children = [];
  }

  getAnimatedValue() {
    return this.getValue();
  }

  getPayload() {
    return this.payload || this;
  }

  attach() {}

  detach() {}

  getChildren() {
    return this.children;
  }

  addChild(child) {
    if (this.children.length === 0) this.attach();
    this.children.push(child);
  }

  removeChild(child) {
    const index = this.children.indexOf(child);
    this.children.splice(index, 1);
    if (this.children.length === 0) this.detach();
  }

}
class AnimatedArray extends Animated {
  constructor() {
    super(...arguments);
    this.payload = [];

    this.attach = () => this.payload.forEach(p => p instanceof Animated && p.addChild(this));

    this.detach = () => this.payload.forEach(p => p instanceof Animated && p.removeChild(this));
  }

}
class AnimatedObject extends Animated {
  constructor() {
    super(...arguments);
    this.payload = {};

    this.attach = () => Object.values(this.payload).forEach(s => s instanceof Animated && s.addChild(this));

    this.detach = () => Object.values(this.payload).forEach(s => s instanceof Animated && s.removeChild(this));
  }

  getValue(animated) {
    if (animated === void 0) {
      animated = false;
    }

    const payload = {};

    for (const key in this.payload) {
      const value = this.payload[key];
      if (animated && !(value instanceof Animated)) continue;
      payload[key] = value instanceof Animated ? value[animated ? 'getAnimatedValue' : 'getValue']() : value;
    }

    return payload;
  }

  getAnimatedValue() {
    return this.getValue(true);
  }

}

let applyAnimatedValues;
function injectApplyAnimatedValues(fn, transform) {
  applyAnimatedValues = {
    fn,
    transform
  };
}
let colorNames;
function injectColorNames(names) {
  colorNames = names;
}
let requestFrame = cb => typeof window !== 'undefined' ? window.requestAnimationFrame(cb) : -1;
let interpolation;
function injectStringInterpolator(fn) {
  interpolation = fn;
}
let now = () => Date.now();
let animatedApi = node => node.current;
let createAnimatedStyle;
function injectCreateAnimatedStyle(factory) {
  createAnimatedStyle = factory;
}
let manualFrameloop;

/**
 * Wraps the `style` property with `AnimatedStyle`.
 */

class AnimatedProps extends AnimatedObject {
  constructor(props, callback) {
    super();
    this.update = void 0;
    this.payload = !props.style ? props : _extends$1({}, props, {
      style: createAnimatedStyle(props.style)
    });
    this.update = callback;
    this.attach();
  }

}

const createAnimatedComponent = Component => {
  const AnimatedComponent = React.forwardRef((props, _ref) => {
    const forceUpdate = useForceUpdate();
    const mounted = React.useRef(true);
    const propsAnimated = React.useRef(null);
    const node = React.useRef(null);
    const attachProps = React.useCallback(props => {
      const oldPropsAnimated = propsAnimated.current;

      const callback = () => {
        if (node.current) {
          const didUpdate = applyAnimatedValues.fn(node.current, propsAnimated.current.getAnimatedValue());
          if (didUpdate === false) forceUpdate();
        }
      };

      propsAnimated.current = new AnimatedProps(props, callback);
      oldPropsAnimated && oldPropsAnimated.detach();
    }, []);
    React.useEffect(() => () => {
      mounted.current = false;
      propsAnimated.current && propsAnimated.current.detach();
    }, []);
    React.useImperativeHandle(_ref, () => animatedApi(node, mounted, forceUpdate));
    attachProps(props);

    const _getValue = propsAnimated.current.getValue(),
          scrollTop = _getValue.scrollTop,
          scrollLeft = _getValue.scrollLeft,
          animatedProps = _objectWithoutPropertiesLoose$1(_getValue, ["scrollTop", "scrollLeft"]);

    return React__default.createElement(Component, _extends$1({}, animatedProps, {
      ref: childRef => node.current = handleRef(childRef, _ref)
    }));
  });
  return AnimatedComponent;
};

function createInterpolator(range, output, extrapolate) {
  if (typeof range === 'function') {
    return range;
  }

  if (Array.isArray(range)) {
    return createInterpolator({
      range,
      output: output,
      extrapolate
    });
  }

  if (interpolation && typeof range.output[0] === 'string') {
    return interpolation(range);
  }

  const config = range;
  const outputRange = config.output;
  const inputRange = config.range || [0, 1];
  const extrapolateLeft = config.extrapolateLeft || config.extrapolate || 'extend';
  const extrapolateRight = config.extrapolateRight || config.extrapolate || 'extend';

  const easing = config.easing || (t => t);

  return input => {
    const range = findRange(input, inputRange);
    return interpolate(input, inputRange[range], inputRange[range + 1], outputRange[range], outputRange[range + 1], easing, extrapolateLeft, extrapolateRight, config.map);
  };
}

function interpolate(input, inputMin, inputMax, outputMin, outputMax, easing, extrapolateLeft, extrapolateRight, map) {
  let result = map ? map(input) : input; // Extrapolate

  if (result < inputMin) {
    if (extrapolateLeft === 'identity') return result;else if (extrapolateLeft === 'clamp') result = inputMin;
  }

  if (result > inputMax) {
    if (extrapolateRight === 'identity') return result;else if (extrapolateRight === 'clamp') result = inputMax;
  }

  if (outputMin === outputMax) return outputMin;
  if (inputMin === inputMax) return input <= inputMin ? outputMin : outputMax; // Input Range

  if (inputMin === -Infinity) result = -result;else if (inputMax === Infinity) result = result - inputMin;else result = (result - inputMin) / (inputMax - inputMin); // Easing

  result = easing(result); // Output Range

  if (outputMin === -Infinity) result = -result;else if (outputMax === Infinity) result = result + outputMin;else result = result * (outputMax - outputMin) + outputMin;
  return result;
}

function findRange(input, inputRange) {
  for (var i = 1; i < inputRange.length - 1; ++i) if (inputRange[i] >= input) break;

  return i - 1;
}

class AnimatedInterpolation extends AnimatedArray {
  constructor(parents, range, output) {
    super();
    this.calc = void 0;
    this.payload = parents instanceof AnimatedArray && !(parents instanceof AnimatedInterpolation) ? parents.getPayload() : Array.isArray(parents) ? parents : [parents];
    this.calc = createInterpolator(range, output);
  }

  getValue() {
    return this.calc(...this.payload.map(value => value.getValue()));
  }

  updateConfig(range, output) {
    this.calc = createInterpolator(range, output);
  }

  interpolate(range, output) {
    return new AnimatedInterpolation(this, range, output);
  }

}

/**
 * Animated works by building a directed acyclic graph of dependencies
 * transparently when you render your Animated components.
 *
 *               new Animated.Value(0)
 *     .interpolate()        .interpolate()    new Animated.Value(1)
 *         opacity               translateY      scale
 *          style                         transform
 *         View#234                         style
 *                                         View#123
 *
 * A) Top Down phase
 * When an AnimatedValue is updated, we recursively go down through this
 * graph in order to find leaf nodes: the views that we flag as needing
 * an update.
 *
 * B) Bottom Up phase
 * When a view is flagged as needing an update, we recursively go back up
 * in order to build the new value that it needs. The reason why we need
 * this two-phases process is to deal with composite props such as
 * transform which can receive values from multiple parents.
 */
function addAnimatedStyles(node, styles) {
  if ('update' in node) {
    styles.add(node);
  } else {
    node.getChildren().forEach(child => addAnimatedStyles(child, styles));
  }
}

class AnimatedValue extends Animated {
  constructor(_value) {
    var _this;

    super();
    _this = this;
    this.animatedStyles = new Set();
    this.value = void 0;
    this.startPosition = void 0;
    this.lastPosition = void 0;
    this.lastVelocity = void 0;
    this.startTime = void 0;
    this.lastTime = void 0;
    this.done = false;

    this.setValue = function (value, flush) {
      if (flush === void 0) {
        flush = true;
      }

      _this.value = value;
      if (flush) _this.flush();
    };

    this.value = _value;
    this.startPosition = _value;
    this.lastPosition = _value;
  }

  flush() {
    if (this.animatedStyles.size === 0) {
      addAnimatedStyles(this, this.animatedStyles);
    }

    this.animatedStyles.forEach(animatedStyle => animatedStyle.update());
  }

  clearStyles() {
    this.animatedStyles.clear();
  }

  getValue() {
    return this.value;
  }

  interpolate(range, output) {
    return new AnimatedInterpolation(this, range, output);
  }

}

class AnimatedValueArray extends AnimatedArray {
  constructor(values) {
    super();
    this.payload = values.map(n => new AnimatedValue(n));
  }

  setValue(value, flush) {
    if (flush === void 0) {
      flush = true;
    }

    if (Array.isArray(value)) {
      if (value.length === this.payload.length) {
        value.forEach((v, i) => this.payload[i].setValue(v, flush));
      }
    } else {
      this.payload.forEach(p => p.setValue(value, flush));
    }
  }

  getValue() {
    return this.payload.map(v => v.getValue());
  }

  interpolate(range, output) {
    return new AnimatedInterpolation(this, range, output);
  }

}

let active = false;
const controllers = new Set();

const update = () => {
  if (!active) return false;
  let time = now();

  for (let controller of controllers) {
    let isActive = false;

    for (let configIdx = 0; configIdx < controller.configs.length; configIdx++) {
      let config = controller.configs[configIdx];
      let endOfAnimation, lastTime;

      for (let valIdx = 0; valIdx < config.animatedValues.length; valIdx++) {
        let animation = config.animatedValues[valIdx]; // If an animation is done, skip, until all of them conclude

        if (animation.done) continue;
        let from = config.fromValues[valIdx];
        let to = config.toValues[valIdx];
        let position = animation.lastPosition;
        let isAnimated = to instanceof Animated;
        let velocity = Array.isArray(config.initialVelocity) ? config.initialVelocity[valIdx] : config.initialVelocity;
        if (isAnimated) to = to.getValue(); // Conclude animation if it's either immediate, or from-values match end-state

        if (config.immediate) {
          animation.setValue(to);
          animation.done = true;
          continue;
        } // Break animation when string values are involved


        if (typeof from === 'string' || typeof to === 'string') {
          animation.setValue(to);
          animation.done = true;
          continue;
        }

        if (config.duration !== void 0) {
          /** Duration easing */
          position = from + config.easing((time - animation.startTime) / config.duration) * (to - from);
          endOfAnimation = time >= animation.startTime + config.duration;
        } else if (config.decay) {
          /** Decay easing */
          position = from + velocity / (1 - 0.998) * (1 - Math.exp(-(1 - 0.998) * (time - animation.startTime)));
          endOfAnimation = Math.abs(animation.lastPosition - position) < 0.1;
          if (endOfAnimation) to = position;
        } else {
          /** Spring easing */
          lastTime = animation.lastTime !== void 0 ? animation.lastTime : time;
          velocity = animation.lastVelocity !== void 0 ? animation.lastVelocity : config.initialVelocity; // If we lost a lot of frames just jump to the end.

          if (time > lastTime + 64) lastTime = time; // http://gafferongames.com/game-physics/fix-your-timestep/

          let numSteps = Math.floor(time - lastTime);

          for (let i = 0; i < numSteps; ++i) {
            let force = -config.tension * (position - to);
            let damping = -config.friction * velocity;
            let acceleration = (force + damping) / config.mass;
            velocity = velocity + acceleration * 1 / 1000;
            position = position + velocity * 1 / 1000;
          } // Conditions for stopping the spring animation


          let isOvershooting = config.clamp && config.tension !== 0 ? from < to ? position > to : position < to : false;
          let isVelocity = Math.abs(velocity) <= config.precision;
          let isDisplacement = config.tension !== 0 ? Math.abs(to - position) <= config.precision : true;
          endOfAnimation = isOvershooting || isVelocity && isDisplacement;
          animation.lastVelocity = velocity;
          animation.lastTime = time;
        } // Trails aren't done until their parents conclude


        if (isAnimated && !config.toValues[valIdx].done) endOfAnimation = false;

        if (endOfAnimation) {
          // Ensure that we end up with a round value
          if (animation.value !== to) position = to;
          animation.done = true;
        } else isActive = true;

        animation.setValue(position);
        animation.lastPosition = position;
      } // Keep track of updated values only when necessary


      if (controller.props.onFrame) controller.values[config.name] = config.interpolation.getValue();
    } // Update callbacks in the end of the frame


    if (controller.props.onFrame) controller.props.onFrame(controller.values); // Either call onEnd or next frame

    if (!isActive) {
      controllers.delete(controller);
      controller.stop(true);
    }
  } // Loop over as long as there are controllers ...


  if (controllers.size) {
    if (manualFrameloop) manualFrameloop();else requestFrame(update);
  } else {
    active = false;
  }

  return active;
};

const start = controller => {
  if (!controllers.has(controller)) controllers.add(controller);

  if (!active) {
    active = true;
    if (manualFrameloop) requestFrame(manualFrameloop);else requestFrame(update);
  }
};

const stop = controller => {
  if (controllers.has(controller)) controllers.delete(controller);
};

let G = 0;

class Controller {
  constructor() {
    this.id = void 0;
    this.idle = true;
    this.hasChanged = false;
    this.guid = 0;
    this.local = 0;
    this.props = {};
    this.merged = {};
    this.animations = {};
    this.interpolations = {};
    this.values = {};
    this.configs = [];
    this.listeners = [];
    this.queue = [];
    this.localQueue = void 0;

    this.getValues = () => this.interpolations;

    this.id = G++;
  }
  /** update(props)
   *  This function filters input props and creates an array of tasks which are executed in .start()
   *  Each task is allowed to carry a delay, which means it can execute asnychroneously */


  update(args) {
    //this._id = n + this.id
    if (!args) return this; // Extract delay and the to-prop from props

    const _ref = interpolateTo(args),
          _ref$delay = _ref.delay,
          delay = _ref$delay === void 0 ? 0 : _ref$delay,
          to = _ref.to,
          props = _objectWithoutPropertiesLoose$1(_ref, ["delay", "to"]);

    if (is.arr(to) || is.fun(to)) {
      // If config is either a function or an array queue it up as is
      this.queue.push(_extends$1({}, props, {
        delay,
        to
      }));
    } else if (to) {
      // Otherwise go through each key since it could be delayed individually
      let merge$$1 = {};
      Object.entries(to).forEach((_ref2) => {
        let k = _ref2[0],
            v = _ref2[1];

        // Fetch delay and create an entry, consisting of the to-props, the delay, and basic props
        const entry = _extends$1({
          to: {
            [k]: v
          },
          delay: callProp(delay, k)
        }, props); // If it doesn't have a delay, merge it, otherwise add it to the queue


        if (!entry.delay) merge$$1 = _extends$1({}, merge$$1, entry, {
          to: _extends$1({}, merge$$1.to, entry.to)
        });else this.queue = [...this.queue, entry];
      }); // Append merged props, if present

      if (Object.keys(merge$$1).length > 0) this.queue = [...this.queue, merge$$1];
    } // Sort queue, so that async calls go last


    this.queue = this.queue.sort((a, b) => a.delay - b.delay); // Diff the reduced props immediately (they'll contain the from-prop and some config)

    this.diff(props);
    return this;
  }
  /** start(onEnd)
   *  This function either executes a queue, if present, or starts the frameloop, which animates */


  start(onEnd) {
    // If a queue is present we must excecute it
    if (this.queue.length) {
      this.idle = false; // Updates can interrupt trailing queues, in that case we just merge values

      if (this.localQueue) {
        this.localQueue.forEach((_ref3) => {
          let _ref3$from = _ref3.from,
              from = _ref3$from === void 0 ? {} : _ref3$from,
              _ref3$to = _ref3.to,
              to = _ref3$to === void 0 ? {} : _ref3$to;
          if (is.obj(from)) this.merged = _extends$1({}, from, this.merged);
          if (is.obj(to)) this.merged = _extends$1({}, this.merged, to);
        });
      } // The guid helps us tracking frames, a new queue over an old one means an override
      // We discard async calls in that caseÍ


      const local = this.local = ++this.guid;
      const queue = this.localQueue = this.queue;
      this.queue = []; // Go through each entry and execute it

      queue.forEach((_ref4, index) => {
        let delay = _ref4.delay,
            props = _objectWithoutPropertiesLoose$1(_ref4, ["delay"]);

        const cb = finished => {
          if (index === queue.length - 1 && local === this.guid && finished) {
            this.idle = true;
            if (this.props.onRest) this.props.onRest(this.merged);
          }

          if (onEnd) onEnd();
        }; // Entries can be delayed, ansyc or immediate


        let async = is.arr(props.to) || is.fun(props.to);

        if (delay) {
          setTimeout(() => {
            if (local === this.guid) {
              if (async) this.runAsync(props, cb);else this.diff(props).start(cb);
            }
          }, delay);
        } else if (async) this.runAsync(props, cb);else this.diff(props).start(cb);
      });
    } // Otherwise we kick of the frameloop
    else {
        if (is.fun(onEnd)) this.listeners.push(onEnd);
        if (this.props.onStart) this.props.onStart();
        start(this);
      }

    return this;
  }

  stop(finished) {
    this.listeners.forEach(onEnd => onEnd(finished));
    this.listeners = [];
    return this;
  }
  /** Pause sets onEnd listeners free, but also removes the controller from the frameloop */


  pause(finished) {
    this.stop(true);
    if (finished) stop(this);
    return this;
  }

  runAsync(_ref5, onEnd) {
    var _this = this;

    let delay = _ref5.delay,
        props = _objectWithoutPropertiesLoose$1(_ref5, ["delay"]);

    const local = this.local; // If "to" is either a function or an array it will be processed async, therefor "to" should be empty right now
    // If the view relies on certain values "from" has to be present

    let queue = Promise.resolve(undefined);

    if (is.arr(props.to)) {
      for (let i = 0; i < props.to.length; i++) {
        const index = i;

        const fresh = _extends$1({}, props, interpolateTo(props.to[index]));

        if (is.arr(fresh.config)) fresh.config = fresh.config[index];
        queue = queue.then(() => {
          //this.stop()
          if (local === this.guid) return new Promise(r => this.diff(fresh).start(r));
        });
      }
    } else if (is.fun(props.to)) {
      let index = 0;
      let last;
      queue = queue.then(() => props.to( // next(props)
      p => {
        const fresh = _extends$1({}, props, interpolateTo(p));

        if (is.arr(fresh.config)) fresh.config = fresh.config[index];
        index++; //this.stop()

        if (local === this.guid) return last = new Promise(r => this.diff(fresh).start(r));
        return;
      }, // cancel()
      function (finished) {
        if (finished === void 0) {
          finished = true;
        }

        return _this.stop(finished);
      }).then(() => last));
    }

    queue.then(onEnd);
  }

  diff(props) {
    this.props = _extends$1({}, this.props, props);
    let _this$props = this.props,
        _this$props$from = _this$props.from,
        from = _this$props$from === void 0 ? {} : _this$props$from,
        _this$props$to = _this$props.to,
        to = _this$props$to === void 0 ? {} : _this$props$to,
        _this$props$config = _this$props.config,
        config = _this$props$config === void 0 ? {} : _this$props$config,
        reverse = _this$props.reverse,
        attach = _this$props.attach,
        reset = _this$props.reset,
        immediate = _this$props.immediate; // Reverse values when requested

    if (reverse) {
      var _ref6 = [to, from];
      from = _ref6[0];
      to = _ref6[1];
    } // This will collect all props that were ever set, reset merged props when necessary


    this.merged = _extends$1({}, from, this.merged, to);
    this.hasChanged = false; // Attachment handling, trailed springs can "attach" themselves to a previous spring

    let target = attach && attach(this); // Reduces input { name: value } pairs into animated values

    this.animations = Object.entries(this.merged).reduce((acc, _ref7) => {
      let name = _ref7[0],
          value = _ref7[1];
      // Issue cached entries, except on reset
      let entry = acc[name] || {}; // Figure out what the value is supposed to be

      const isNumber = is.num(value);
      const isString = is.str(value) && !value.startsWith('#') && !/\d/.test(value) && !colorNames[value];
      const isArray = is.arr(value);
      const isInterpolation = !isNumber && !isArray && !isString;
      let fromValue = !is.und(from[name]) ? from[name] : value;
      let toValue = isNumber || isArray ? value : isString ? value : 1;
      let toConfig = callProp(config, name);
      if (target) toValue = target.animations[name].parent;
      let parent = entry.parent,
          interpolation$$1 = entry.interpolation,
          toValues = toArray(target ? toValue.getPayload() : toValue),
          animatedValues;
      let newValue = value;
      if (isInterpolation) newValue = interpolation({
        range: [0, 1],
        output: [value, value]
      })(1);
      let currentValue = interpolation$$1 && interpolation$$1.getValue(); // Change detection flags

      const isFirst = is.und(parent);
      const isActive = !isFirst && entry.animatedValues.some(v => !v.done);
      const currentValueDiffersFromGoal = !is.equ(newValue, currentValue);
      const hasNewGoal = !is.equ(newValue, entry.previous);
      const hasNewConfig = !is.equ(toConfig, entry.config); // Change animation props when props indicate a new goal (new value differs from previous one)
      // and current values differ from it. Config changes trigger a new update as well (though probably shouldn't?)

      if (reset || hasNewGoal && currentValueDiffersFromGoal || hasNewConfig) {
        // Convert regular values into animated values, ALWAYS re-use if possible
        if (isNumber || isString) parent = interpolation$$1 = entry.parent || new AnimatedValue(fromValue);else if (isArray) parent = interpolation$$1 = entry.parent || new AnimatedValueArray(fromValue);else if (isInterpolation) {
          let prev = entry.interpolation && entry.interpolation.calc(entry.parent.value);
          prev = prev !== void 0 && !reset ? prev : fromValue;

          if (entry.parent) {
            parent = entry.parent;
            parent.setValue(0, false);
          } else parent = new AnimatedValue(0);

          const range = {
            output: [prev, value]
          };

          if (entry.interpolation) {
            interpolation$$1 = entry.interpolation;
            entry.interpolation.updateConfig(range);
          } else interpolation$$1 = parent.interpolate(range);
        }
        toValues = toArray(target ? toValue.getPayload() : toValue);
        animatedValues = toArray(parent.getPayload());
        if (reset && !isInterpolation) parent.setValue(fromValue, false);
        this.hasChanged = true; // Reset animated values

        animatedValues.forEach(value => {
          value.startPosition = value.value;
          value.lastPosition = value.value;
          value.lastVelocity = isActive ? value.lastVelocity : undefined;
          value.lastTime = isActive ? value.lastTime : undefined;
          value.startTime = now();
          value.done = false;
          value.animatedStyles.clear();
        }); // Set immediate values

        if (callProp(immediate, name)) {
          parent.setValue(isInterpolation ? toValue : value, false);
        }

        return _extends$1({}, acc, {
          [name]: _extends$1({}, entry, {
            name,
            parent,
            interpolation: interpolation$$1,
            animatedValues,
            toValues,
            previous: newValue,
            config: toConfig,
            fromValues: toArray(parent.getValue()),
            immediate: callProp(immediate, name),
            initialVelocity: withDefault(toConfig.velocity, 0),
            clamp: withDefault(toConfig.clamp, false),
            precision: withDefault(toConfig.precision, 0.01),
            tension: withDefault(toConfig.tension, 170),
            friction: withDefault(toConfig.friction, 26),
            mass: withDefault(toConfig.mass, 1),
            duration: toConfig.duration,
            easing: withDefault(toConfig.easing, t => t),
            decay: toConfig.decay
          })
        });
      } else {
        if (!currentValueDiffersFromGoal) {
          // So ... the current target value (newValue) appears to be different from the previous value,
          // which normally constitutes an update, but the actual value (currentValue) matches the target!
          // In order to resolve this without causing an animation update we silently flag the animation as done,
          // which it technically is. Interpolations also needs a config update with their target set to 1.
          if (isInterpolation) {
            parent.setValue(1, false);
            interpolation$$1.updateConfig({
              output: [newValue, newValue]
            });
          }

          parent.done = true;
          this.hasChanged = true;
          return _extends$1({}, acc, {
            [name]: _extends$1({}, acc[name], {
              previous: newValue
            })
          });
        }

        return acc;
      }
    }, this.animations);

    if (this.hasChanged) {
      // Make animations available to frameloop
      this.configs = Object.values(this.animations);
      this.values = {};
      this.interpolations = {};

      for (let key in this.animations) {
        this.interpolations[key] = this.animations[key].interpolation;
        this.values[key] = this.animations[key].interpolation.getValue();
      }
    }

    return this;
  }

  destroy() {
    this.stop();
    this.props = {};
    this.merged = {};
    this.animations = {};
    this.interpolations = {};
    this.values = {};
    this.configs = [];
    this.local = 0;
  }

}

/** API
 * const transitions = useTransition(items, itemKeys, { ... })
 * const [transitions, update] = useTransition(items, itemKeys, () => ({ ... }))
 */

let guid = 0;
const ENTER = 'enter';
const LEAVE = 'leave';
const UPDATE = 'update';

const mapKeys = (items, keys) => (typeof keys === 'function' ? items.map(keys) : toArray(keys)).map(String);

const get = props => {
  let items = props.items,
      _props$keys = props.keys,
      keys = _props$keys === void 0 ? item => item : _props$keys,
      rest = _objectWithoutPropertiesLoose$1(props, ["items", "keys"]);

  items = toArray(items !== void 0 ? items : null);
  return _extends$1({
    items,
    keys: mapKeys(items, keys)
  }, rest);
};

function useTransition(input, keyTransform, config) {
  const props = _extends$1({
    items: input,
    keys: keyTransform || (i => i)
  }, config);

  const _get = get(props),
        _get$lazy = _get.lazy,
        lazy = _get$lazy === void 0 ? false : _get$lazy,
        _get$unique = _get.unique,
        _get$reset = _get.reset,
        reset = _get$reset === void 0 ? false : _get$reset,
        enter = _get.enter,
        leave = _get.leave,
        update = _get.update,
        onDestroyed = _get.onDestroyed,
        keys = _get.keys,
        items = _get.items,
        onFrame = _get.onFrame,
        _onRest = _get.onRest,
        onStart = _get.onStart,
        ref = _get.ref,
        extra = _objectWithoutPropertiesLoose$1(_get, ["lazy", "unique", "reset", "enter", "leave", "update", "onDestroyed", "keys", "items", "onFrame", "onRest", "onStart", "ref"]);

  const forceUpdate = useForceUpdate();
  const mounted = React.useRef(false);
  const state = React.useRef({
    mounted: false,
    first: true,
    deleted: [],
    current: {},
    transitions: [],
    prevProps: {},
    paused: !!props.ref,
    instances: !mounted.current && new Map(),
    forceUpdate
  });
  React.useImperativeHandle(props.ref, () => ({
    start: () => Promise.all(Array.from(state.current.instances).map((_ref) => {
      let c = _ref[1];
      return new Promise(r => c.start(r));
    })),
    stop: finished => Array.from(state.current.instances).forEach((_ref2) => {
      let c = _ref2[1];
      return c.stop(finished);
    }),

    get controllers() {
      return Array.from(state.current.instances).map((_ref3) => {
        let c = _ref3[1];
        return c;
      });
    }

  })); // Update state

  state.current = diffItems(state.current, props);

  if (state.current.changed) {
    // Update state
    state.current.transitions.forEach(transition => {
      const slot = transition.slot,
            from = transition.from,
            to = transition.to,
            config = transition.config,
            trail = transition.trail,
            key = transition.key,
            item = transition.item;
      if (!state.current.instances.has(key)) state.current.instances.set(key, new Controller()); // update the map object

      const ctrl = state.current.instances.get(key);

      const newProps = _extends$1({}, extra, {
        to,
        from,
        config,
        ref,
        onRest: values => {
          if (state.current.mounted) {
            if (transition.destroyed) {
              // If no ref is given delete destroyed items immediately
              if (!ref && !lazy) cleanUp(state, key);
              if (onDestroyed) onDestroyed(item);
            } // A transition comes to rest once all its springs conclude


            const curInstances = Array.from(state.current.instances);
            const active = curInstances.some((_ref4) => {
              let c = _ref4[1];
              return !c.idle;
            });
            if (!active && (ref || lazy) && state.current.deleted.length > 0) cleanUp(state);
            if (_onRest) _onRest(item, slot, values);
          }
        },
        onStart: onStart && (() => onStart(item, slot)),
        onFrame: onFrame && (values => onFrame(item, slot, values)),
        delay: trail,
        reset: reset && slot === ENTER // Update controller

      });

      ctrl.update(newProps);
      if (!state.current.paused) ctrl.start();
    });
  }

  React.useEffect(() => {
    state.current.mounted = mounted.current = true;
    return () => {
      state.current.mounted = mounted.current = false;
      Array.from(state.current.instances).map((_ref5) => {
        let c = _ref5[1];
        return c.destroy();
      });
      state.current.instances.clear();
    };
  }, []);
  return state.current.transitions.map((_ref6) => {
    let item = _ref6.item,
        slot = _ref6.slot,
        key = _ref6.key;
    return {
      item,
      key,
      state: slot,
      props: state.current.instances.get(key).getValues()
    };
  });
}

function cleanUp(state, filterKey) {
  const deleted = state.current.deleted;

  for (let _ref7 of deleted) {
    let key = _ref7.key;

    const filter = t => t.key !== key;

    if (is.und(filterKey) || filterKey === key) {
      state.current.instances.delete(key);
      state.current.transitions = state.current.transitions.filter(filter);
      state.current.deleted = state.current.deleted.filter(filter);
    }
  }

  state.current.forceUpdate();
}

function diffItems(_ref8, props) {
  let first = _ref8.first,
      prevProps = _ref8.prevProps,
      state = _objectWithoutPropertiesLoose$1(_ref8, ["first", "prevProps"]);

  let _get2 = get(props),
      items = _get2.items,
      keys = _get2.keys,
      initial = _get2.initial,
      from = _get2.from,
      enter = _get2.enter,
      leave = _get2.leave,
      update = _get2.update,
      _get2$trail = _get2.trail,
      trail = _get2$trail === void 0 ? 0 : _get2$trail,
      unique = _get2.unique,
      config = _get2.config,
      _get2$order = _get2.order,
      order = _get2$order === void 0 ? [ENTER, LEAVE, UPDATE] : _get2$order;

  let _get3 = get(prevProps),
      _keys = _get3.keys,
      _items = _get3.items;

  let current = _extends$1({}, state.current);

  let deleted = [...state.deleted]; // Compare next keys with current keys

  let currentKeys = Object.keys(current);
  let currentSet = new Set(currentKeys);
  let nextSet = new Set(keys);
  let added = keys.filter(item => !currentSet.has(item));
  let removed = state.transitions.filter(item => !item.destroyed && !nextSet.has(item.originalKey)).map(i => i.originalKey);
  let updated = keys.filter(item => currentSet.has(item));
  let delay = -trail;

  while (order.length) {
    const changeType = order.shift();

    switch (changeType) {
      case ENTER:
        {
          added.forEach((key, index) => {
            // In unique mode, remove fading out transitions if their key comes in again
            if (unique && deleted.find(d => d.originalKey === key)) deleted = deleted.filter(t => t.originalKey !== key);
            const keyIndex = keys.indexOf(key);
            const item = items[keyIndex];
            const slot = first && initial !== void 0 ? 'initial' : ENTER;
            current[key] = {
              slot,
              originalKey: key,
              key: unique ? String(key) : guid++,
              item,
              trail: delay = delay + trail,
              config: callProp(config, item, slot),
              from: callProp(first ? initial !== void 0 ? initial || {} : from : from, item),
              to: callProp(enter, item)
            };
          });
          break;
        }

      case LEAVE:
        {
          removed.forEach(key => {
            const keyIndex = _keys.indexOf(key);

            const item = _items[keyIndex];
            const slot = LEAVE;
            deleted.unshift(_extends$1({}, current[key], {
              slot,
              destroyed: true,
              left: _keys[Math.max(0, keyIndex - 1)],
              right: _keys[Math.min(_keys.length, keyIndex + 1)],
              trail: delay = delay + trail,
              config: callProp(config, item, slot),
              to: callProp(leave, item)
            }));
            delete current[key];
          });
          break;
        }

      case UPDATE:
        {
          updated.forEach(key => {
            const keyIndex = keys.indexOf(key);
            const item = items[keyIndex];
            const slot = UPDATE;
            current[key] = _extends$1({}, current[key], {
              item,
              slot,
              trail: delay = delay + trail,
              config: callProp(config, item, slot),
              to: callProp(update, item)
            });
          });
          break;
        }
    }
  }

  let out = keys.map(key => current[key]); // This tries to restore order for deleted items by finding their last known siblings
  // only using the left sibling to keep order placement consistent for all deleted items

  deleted.forEach((_ref9) => {
    let left = _ref9.left,
        right = _ref9.right,
        item = _objectWithoutPropertiesLoose$1(_ref9, ["left", "right"]);

    let pos; // Was it the element on the left, if yes, move there ...

    if ((pos = out.findIndex(t => t.originalKey === left)) !== -1) pos += 1; // And if nothing else helps, move it to the start ¯\_(ツ)_/¯

    pos = Math.max(0, pos);
    out = [...out.slice(0, pos), item, ...out.slice(pos)];
  });
  return _extends$1({}, state, {
    changed: added.length || removed.length || updated.length,
    first: first && added.length === 0,
    transitions: out,
    current,
    deleted,
    prevProps: props
  });
}

class AnimatedStyle extends AnimatedObject {
  constructor(style) {
    if (style === void 0) {
      style = {};
    }

    super();

    if (style.transform && !(style.transform instanceof Animated)) {
      style = applyAnimatedValues.transform(style);
    }

    this.payload = style;
  }

}

// http://www.w3.org/TR/css3-color/#svg-color
const colors = {
  transparent: 0x00000000,
  aliceblue: 0xf0f8ffff,
  antiquewhite: 0xfaebd7ff,
  aqua: 0x00ffffff,
  aquamarine: 0x7fffd4ff,
  azure: 0xf0ffffff,
  beige: 0xf5f5dcff,
  bisque: 0xffe4c4ff,
  black: 0x000000ff,
  blanchedalmond: 0xffebcdff,
  blue: 0x0000ffff,
  blueviolet: 0x8a2be2ff,
  brown: 0xa52a2aff,
  burlywood: 0xdeb887ff,
  burntsienna: 0xea7e5dff,
  cadetblue: 0x5f9ea0ff,
  chartreuse: 0x7fff00ff,
  chocolate: 0xd2691eff,
  coral: 0xff7f50ff,
  cornflowerblue: 0x6495edff,
  cornsilk: 0xfff8dcff,
  crimson: 0xdc143cff,
  cyan: 0x00ffffff,
  darkblue: 0x00008bff,
  darkcyan: 0x008b8bff,
  darkgoldenrod: 0xb8860bff,
  darkgray: 0xa9a9a9ff,
  darkgreen: 0x006400ff,
  darkgrey: 0xa9a9a9ff,
  darkkhaki: 0xbdb76bff,
  darkmagenta: 0x8b008bff,
  darkolivegreen: 0x556b2fff,
  darkorange: 0xff8c00ff,
  darkorchid: 0x9932ccff,
  darkred: 0x8b0000ff,
  darksalmon: 0xe9967aff,
  darkseagreen: 0x8fbc8fff,
  darkslateblue: 0x483d8bff,
  darkslategray: 0x2f4f4fff,
  darkslategrey: 0x2f4f4fff,
  darkturquoise: 0x00ced1ff,
  darkviolet: 0x9400d3ff,
  deeppink: 0xff1493ff,
  deepskyblue: 0x00bfffff,
  dimgray: 0x696969ff,
  dimgrey: 0x696969ff,
  dodgerblue: 0x1e90ffff,
  firebrick: 0xb22222ff,
  floralwhite: 0xfffaf0ff,
  forestgreen: 0x228b22ff,
  fuchsia: 0xff00ffff,
  gainsboro: 0xdcdcdcff,
  ghostwhite: 0xf8f8ffff,
  gold: 0xffd700ff,
  goldenrod: 0xdaa520ff,
  gray: 0x808080ff,
  green: 0x008000ff,
  greenyellow: 0xadff2fff,
  grey: 0x808080ff,
  honeydew: 0xf0fff0ff,
  hotpink: 0xff69b4ff,
  indianred: 0xcd5c5cff,
  indigo: 0x4b0082ff,
  ivory: 0xfffff0ff,
  khaki: 0xf0e68cff,
  lavender: 0xe6e6faff,
  lavenderblush: 0xfff0f5ff,
  lawngreen: 0x7cfc00ff,
  lemonchiffon: 0xfffacdff,
  lightblue: 0xadd8e6ff,
  lightcoral: 0xf08080ff,
  lightcyan: 0xe0ffffff,
  lightgoldenrodyellow: 0xfafad2ff,
  lightgray: 0xd3d3d3ff,
  lightgreen: 0x90ee90ff,
  lightgrey: 0xd3d3d3ff,
  lightpink: 0xffb6c1ff,
  lightsalmon: 0xffa07aff,
  lightseagreen: 0x20b2aaff,
  lightskyblue: 0x87cefaff,
  lightslategray: 0x778899ff,
  lightslategrey: 0x778899ff,
  lightsteelblue: 0xb0c4deff,
  lightyellow: 0xffffe0ff,
  lime: 0x00ff00ff,
  limegreen: 0x32cd32ff,
  linen: 0xfaf0e6ff,
  magenta: 0xff00ffff,
  maroon: 0x800000ff,
  mediumaquamarine: 0x66cdaaff,
  mediumblue: 0x0000cdff,
  mediumorchid: 0xba55d3ff,
  mediumpurple: 0x9370dbff,
  mediumseagreen: 0x3cb371ff,
  mediumslateblue: 0x7b68eeff,
  mediumspringgreen: 0x00fa9aff,
  mediumturquoise: 0x48d1ccff,
  mediumvioletred: 0xc71585ff,
  midnightblue: 0x191970ff,
  mintcream: 0xf5fffaff,
  mistyrose: 0xffe4e1ff,
  moccasin: 0xffe4b5ff,
  navajowhite: 0xffdeadff,
  navy: 0x000080ff,
  oldlace: 0xfdf5e6ff,
  olive: 0x808000ff,
  olivedrab: 0x6b8e23ff,
  orange: 0xffa500ff,
  orangered: 0xff4500ff,
  orchid: 0xda70d6ff,
  palegoldenrod: 0xeee8aaff,
  palegreen: 0x98fb98ff,
  paleturquoise: 0xafeeeeff,
  palevioletred: 0xdb7093ff,
  papayawhip: 0xffefd5ff,
  peachpuff: 0xffdab9ff,
  peru: 0xcd853fff,
  pink: 0xffc0cbff,
  plum: 0xdda0ddff,
  powderblue: 0xb0e0e6ff,
  purple: 0x800080ff,
  rebeccapurple: 0x663399ff,
  red: 0xff0000ff,
  rosybrown: 0xbc8f8fff,
  royalblue: 0x4169e1ff,
  saddlebrown: 0x8b4513ff,
  salmon: 0xfa8072ff,
  sandybrown: 0xf4a460ff,
  seagreen: 0x2e8b57ff,
  seashell: 0xfff5eeff,
  sienna: 0xa0522dff,
  silver: 0xc0c0c0ff,
  skyblue: 0x87ceebff,
  slateblue: 0x6a5acdff,
  slategray: 0x708090ff,
  slategrey: 0x708090ff,
  snow: 0xfffafaff,
  springgreen: 0x00ff7fff,
  steelblue: 0x4682b4ff,
  tan: 0xd2b48cff,
  teal: 0x008080ff,
  thistle: 0xd8bfd8ff,
  tomato: 0xff6347ff,
  turquoise: 0x40e0d0ff,
  violet: 0xee82eeff,
  wheat: 0xf5deb3ff,
  white: 0xffffffff,
  whitesmoke: 0xf5f5f5ff,
  yellow: 0xffff00ff,
  yellowgreen: 0x9acd32ff
};

// const INTEGER = '[-+]?\\d+';
const NUMBER = '[-+]?\\d*\\.?\\d+';
const PERCENTAGE = NUMBER + '%';

function call() {
  for (var _len = arguments.length, parts = new Array(_len), _key = 0; _key < _len; _key++) {
    parts[_key] = arguments[_key];
  }

  return '\\(\\s*(' + parts.join(')\\s*,\\s*(') + ')\\s*\\)';
}

const rgb = new RegExp('rgb' + call(NUMBER, NUMBER, NUMBER));
const rgba = new RegExp('rgba' + call(NUMBER, NUMBER, NUMBER, NUMBER));
const hsl = new RegExp('hsl' + call(NUMBER, PERCENTAGE, PERCENTAGE));
const hsla = new RegExp('hsla' + call(NUMBER, PERCENTAGE, PERCENTAGE, NUMBER));
const hex3 = /^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/;
const hex4 = /^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/;
const hex6 = /^#([0-9a-fA-F]{6})$/;
const hex8 = /^#([0-9a-fA-F]{8})$/;

/*
https://github.com/react-community/normalize-css-color

BSD 3-Clause License

Copyright (c) 2016, React Community
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice, this
  list of conditions and the following disclaimer.

* Redistributions in binary form must reproduce the above copyright notice,
  this list of conditions and the following disclaimer in the documentation
  and/or other materials provided with the distribution.

* Neither the name of the copyright holder nor the names of its
  contributors may be used to endorse or promote products derived from
  this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
function normalizeColor(color) {
  let match;

  if (typeof color === 'number') {
    return color >>> 0 === color && color >= 0 && color <= 0xffffffff ? color : null;
  } // Ordered based on occurrences on Facebook codebase


  if (match = hex6.exec(color)) return parseInt(match[1] + 'ff', 16) >>> 0;
  if (colors.hasOwnProperty(color)) return colors[color];

  if (match = rgb.exec(color)) {
    return (parse255(match[1]) << 24 | // r
    parse255(match[2]) << 16 | // g
    parse255(match[3]) << 8 | // b
    0x000000ff) >>> // a
    0;
  }

  if (match = rgba.exec(color)) {
    return (parse255(match[1]) << 24 | // r
    parse255(match[2]) << 16 | // g
    parse255(match[3]) << 8 | // b
    parse1(match[4])) >>> // a
    0;
  }

  if (match = hex3.exec(color)) {
    return parseInt(match[1] + match[1] + // r
    match[2] + match[2] + // g
    match[3] + match[3] + // b
    'ff', // a
    16) >>> 0;
  } // https://drafts.csswg.org/css-color-4/#hex-notation


  if (match = hex8.exec(color)) return parseInt(match[1], 16) >>> 0;

  if (match = hex4.exec(color)) {
    return parseInt(match[1] + match[1] + // r
    match[2] + match[2] + // g
    match[3] + match[3] + // b
    match[4] + match[4], // a
    16) >>> 0;
  }

  if (match = hsl.exec(color)) {
    return (hslToRgb(parse360(match[1]), // h
    parsePercentage(match[2]), // s
    parsePercentage(match[3]) // l
    ) | 0x000000ff) >>> // a
    0;
  }

  if (match = hsla.exec(color)) {
    return (hslToRgb(parse360(match[1]), // h
    parsePercentage(match[2]), // s
    parsePercentage(match[3]) // l
    ) | parse1(match[4])) >>> // a
    0;
  }

  return null;
}

function hue2rgb(p, q, t) {
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  if (t < 1 / 6) return p + (q - p) * 6 * t;
  if (t < 1 / 2) return q;
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
  return p;
}

function hslToRgb(h, s, l) {
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const r = hue2rgb(p, q, h + 1 / 3);
  const g = hue2rgb(p, q, h);
  const b = hue2rgb(p, q, h - 1 / 3);
  return Math.round(r * 255) << 24 | Math.round(g * 255) << 16 | Math.round(b * 255) << 8;
}

function parse255(str) {
  const int = parseInt(str, 10);
  if (int < 0) return 0;
  if (int > 255) return 255;
  return int;
}

function parse360(str) {
  const int = parseFloat(str);
  return (int % 360 + 360) % 360 / 360;
}

function parse1(str) {
  const num = parseFloat(str);
  if (num < 0) return 0;
  if (num > 1) return 255;
  return Math.round(num * 255);
}

function parsePercentage(str) {
  // parseFloat conveniently ignores the final %
  const int = parseFloat(str);
  if (int < 0) return 0;
  if (int > 100) return 1;
  return int / 100;
}

function colorToRgba(input) {
  let int32Color = normalizeColor(input);
  if (int32Color === null) return input;
  int32Color = int32Color || 0;
  let r = (int32Color & 0xff000000) >>> 24;
  let g = (int32Color & 0x00ff0000) >>> 16;
  let b = (int32Color & 0x0000ff00) >>> 8;
  let a = (int32Color & 0x000000ff) / 255;
  return `rgba(${r}, ${g}, ${b}, ${a})`;
} // Problem: https://github.com/animatedjs/animated/pull/102
// Solution: https://stackoverflow.com/questions/638565/parsing-scientific-notation-sensibly/658662


const stringShapeRegex = /[+\-]?(?:0|[1-9]\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?/g; // Covers rgb, rgba, hsl, hsla
// Taken from https://gist.github.com/olmokramer/82ccce673f86db7cda5e

const colorRegex = /(#(?:[0-9a-f]{2}){2,4}|(#[0-9a-f]{3})|(rgb|hsl)a?\((-?\d+%?[,\s]+){2,3}\s*[\d\.]+%?\))/gi; // Covers color names (transparent, blue, etc.)

const colorNamesRegex = new RegExp(`(${Object.keys(colors).join('|')})`, 'g');
/**
 * Supports string shapes by extracting numbers so new values can be computed,
 * and recombines those values into new strings of the same shape.  Supports
 * things like:
 *
 *   rgba(123, 42, 99, 0.36)           // colors
 *   -45deg                            // values with units
 *   0 2px 2px 0px rgba(0, 0, 0, 0.12) // box shadows
 */

const createStringInterpolator = config => {
  // Replace colors with rgba
  const outputRange = config.output.map(rangeValue => rangeValue.replace(colorRegex, colorToRgba)).map(rangeValue => rangeValue.replace(colorNamesRegex, colorToRgba));
  const outputRanges = outputRange[0].match(stringShapeRegex).map(() => []);
  outputRange.forEach(value => {
    value.match(stringShapeRegex).forEach((number, i) => outputRanges[i].push(+number));
  });
  const interpolations = outputRange[0].match(stringShapeRegex).map((_value, i) => createInterpolator(_extends$1({}, config, {
    output: outputRanges[i]
  })));
  return input => {
    let i = 0;
    return outputRange[0] // 'rgba(0, 100, 200, 0)'
    // ->
    // 'rgba(${interpolations[0](input)}, ${interpolations[1](input)}, ...'
    .replace(stringShapeRegex, () => interpolations[i++](input)) // rgba requires that the r,g,b are integers.... so we want to round them, but we *dont* want to
    // round the opacity (4th column).
    .replace(/rgba\(([0-9\.-]+), ([0-9\.-]+), ([0-9\.-]+), ([0-9\.-]+)\)/gi, (_, p1, p2, p3, p4) => `rgba(${Math.round(p1)}, ${Math.round(p2)}, ${Math.round(p3)}, ${p4})`);
  };
};

let isUnitlessNumber = {
  animationIterationCount: true,
  borderImageOutset: true,
  borderImageSlice: true,
  borderImageWidth: true,
  boxFlex: true,
  boxFlexGroup: true,
  boxOrdinalGroup: true,
  columnCount: true,
  columns: true,
  flex: true,
  flexGrow: true,
  flexPositive: true,
  flexShrink: true,
  flexNegative: true,
  flexOrder: true,
  gridRow: true,
  gridRowEnd: true,
  gridRowSpan: true,
  gridRowStart: true,
  gridColumn: true,
  gridColumnEnd: true,
  gridColumnSpan: true,
  gridColumnStart: true,
  fontWeight: true,
  lineClamp: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  tabSize: true,
  widows: true,
  zIndex: true,
  zoom: true,
  // SVG-related properties
  fillOpacity: true,
  floodOpacity: true,
  stopOpacity: true,
  strokeDasharray: true,
  strokeDashoffset: true,
  strokeMiterlimit: true,
  strokeOpacity: true,
  strokeWidth: true
};

const prefixKey = (prefix, key) => prefix + key.charAt(0).toUpperCase() + key.substring(1);

const prefixes = ['Webkit', 'Ms', 'Moz', 'O'];
isUnitlessNumber = Object.keys(isUnitlessNumber).reduce((acc, prop) => {
  prefixes.forEach(prefix => acc[prefixKey(prefix, prop)] = acc[prop]);
  return acc;
}, isUnitlessNumber);

function dangerousStyleValue(name, value, isCustomProperty) {
  if (value == null || typeof value === 'boolean' || value === '') return '';
  if (!isCustomProperty && typeof value === 'number' && value !== 0 && !(isUnitlessNumber.hasOwnProperty(name) && isUnitlessNumber[name])) return value + 'px'; // Presumes implicit 'px' suffix for unitless numbers

  return ('' + value).trim();
}

const attributeCache = {};
injectCreateAnimatedStyle(style => new AnimatedStyle(style));
injectStringInterpolator(createStringInterpolator);
injectColorNames(colors);
injectApplyAnimatedValues((instance, props) => {
  if (instance.nodeType && instance.setAttribute !== undefined) {
    const style = props.style,
          children = props.children,
          scrollTop = props.scrollTop,
          scrollLeft = props.scrollLeft,
          attributes = _objectWithoutPropertiesLoose$1(props, ["style", "children", "scrollTop", "scrollLeft"]);

    const filter = instance.nodeName === 'filter' || instance.parentNode && instance.parentNode.nodeName === 'filter';
    if (scrollTop !== void 0) instance.scrollTop = scrollTop;
    if (scrollLeft !== void 0) instance.scrollLeft = scrollLeft; // Set textContent, if children is an animatable value

    if (children !== void 0) instance.textContent = children; // Set styles ...

    for (let styleName in style) {
      if (!style.hasOwnProperty(styleName)) continue;
      var isCustomProperty = styleName.indexOf('--') === 0;
      var styleValue = dangerousStyleValue(styleName, style[styleName], isCustomProperty);
      if (styleName === 'float') styleName = 'cssFloat';
      if (isCustomProperty) instance.style.setProperty(styleName, styleValue);else instance.style[styleName] = styleValue;
    } // Set attributes ...


    for (let name in attributes) {
      // Attributes are written in dash case
      const dashCase = filter ? name : attributeCache[name] || (attributeCache[name] = name.replace(/([A-Z])/g, n => '-' + n.toLowerCase()));
      if (typeof instance.getAttribute(dashCase) !== 'undefined') instance.setAttribute(dashCase, attributes[name]);
    }

    return;
  } else return false;
}, style => style);

const domElements = ['a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b', 'base', 'bdi', 'bdo', 'big', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'cite', 'code', 'col', 'colgroup', 'data', 'datalist', 'dd', 'del', 'details', 'dfn', 'dialog', 'div', 'dl', 'dt', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'iframe', 'img', 'input', 'ins', 'kbd', 'keygen', 'label', 'legend', 'li', 'link', 'main', 'map', 'mark', 'menu', 'menuitem', 'meta', 'meter', 'nav', 'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p', 'param', 'picture', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'script', 'section', 'select', 'small', 'source', 'span', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track', 'u', 'ul', 'var', 'video', 'wbr', // SVG
'circle', 'clipPath', 'defs', 'ellipse', 'foreignObject', 'g', 'image', 'line', 'linearGradient', 'mask', 'path', 'pattern', 'polygon', 'polyline', 'radialGradient', 'rect', 'stop', 'svg', 'text', 'tspan'];
// Extend animated with all the available THREE elements
const apply = merge(createAnimatedComponent, false);
const extendedAnimated = apply(domElements);

var GridNodeContext = React.createContext(null);

var MAKE_INVISIBLE_DELAY = 200;
function useIntersectionObserver(_ref) {
  var root = _ref.root,
      rootMargin = _ref.rootMargin,
      target = _ref.target,
      isEnabled = _ref.isEnabled;
  var timeout = React.useRef(null);

  var _React$useState = React.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      isIntersecting = _React$useState2[0],
      setIntersecting = _React$useState2[1];

  React.useEffect(function () {
    if (isEnabled) {
      var observer = new IntersectionObserver(function (_ref2) {
        var _ref3 = _slicedToArray(_ref2, 1),
            entry = _ref3[0];

        if (entry.isIntersecting) {
          if (timeout.current) {
            clearTimeout(timeout.current);
          }

          setIntersecting(true);
        } else {
          timeout.current = setTimeout(function () {
            setIntersecting(false);
          }, MAKE_INVISIBLE_DELAY);
        }
      }, _objectSpread({
        root: root
      }, rootMargin ? {
        rootMargin: rootMargin
      } : {}));

      if (target.current) {
        observer.observe(target.current);
      }

      return function () {
        observer.disconnect();
      };
    }

    return function () {};
  }, [isEnabled, root, rootMargin, target]);
  return isIntersecting;
}

function ColumnIntersectionObserver(_ref) {
  var columnIndex = _ref.columnIndex,
      dataLength = _ref.dataLength,
      onIsIntersectingChange = _ref.onIsIntersectingChange,
      isEnabled = _ref.isEnabled;
  var gridNode = React.useContext(GridNodeContext);
  var intersectionRef = React.useRef(null);
  var isIntersecting = useIntersectionObserver({
    isEnabled: isEnabled,
    root: gridNode,
    rootMargin: "0px 300px",
    target: intersectionRef
  });
  React.useEffect(function () {
    if (isEnabled) {
      onIsIntersectingChange(columnIndex, isIntersecting);
    }
  }, [columnIndex, isEnabled, isIntersecting, onIsIntersectingChange]);

  if (!isEnabled) {
    return null;
  }

  return React.createElement("div", {
    ref: intersectionRef,
    style: {
      backgroundColor: 'yellow',
      gridColumn: columnIndex + 1,
      gridRow: dataLength + 2
    }
  });
}

function useColumnsIntersectionObserver(_ref2) {
  var columns = _ref2.columns,
      dataLength = _ref2.dataLength,
      isEnabled = _ref2.isEnabled;

  var _React$useState = React.useState(_toConsumableArray(Array(columns.length).fill(false))),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      columnVisibility = _React$useState2[0],
      setColumnVisibility = _React$useState2[1];

  var handleColumnIntersectingChange = React.useCallback(function (columnIndex, isIntersecting) {
    setColumnVisibility(function (prevColumnVisibility) {
      var nextColumnVisibility = _toConsumableArray(prevColumnVisibility);

      nextColumnVisibility[columnIndex] = isIntersecting;
      return nextColumnVisibility;
    });
  }, []);

  if (!isEnabled) {
    return [null, null];
  }

  return [columnVisibility, React.createElement(React.Fragment, null, columnVisibility.map(function (_c, columnIndex) {
    return React.createElement(ColumnIntersectionObserver, {
      columnIndex: columnIndex,
      dataLength: dataLength,
      isEnabled: isEnabled,
      key: columns[columnIndex].key,
      onIsIntersectingChange: handleColumnIntersectingChange
    });
  }))];
}

var px = function px(n) {
  return "".concat(n, "px");
};

var minmax = function minmax(defaultMinWidth) {
  return "minmax(".concat(defaultMinWidth, "px, 1fr)");
};

function columnsToGridTemplate(columns, defaultColumnMinWidth, override) {
  return columns.map(function (_ref, i) {
    var k = _ref.key,
        width = _ref.width;

    if (override && k === override.key) {
      return px(override.newWidth);
    }

    if (i === columns.length - 1) {
      if (isNumber(width)) {
        return minmax(width);
      }

      return minmax(defaultColumnMinWidth);
    }

    if (isNumber(width)) {
      return px(width);
    }

    return minmax(defaultColumnMinWidth);
  }).join(' ');
}

function sortColumns(columns, columnOrder) {
  return sortBy(columns, function (_ref) {
    var key = _ref.key;
    return columnOrder.indexOf(key);
  });
}

function spliceColumnOrder(columnOrder, sourceIndex, destinationIndex) {
  var newColumnOrder = _toConsumableArray(columnOrder);

  var _newColumnOrder$splic = newColumnOrder.splice(sourceIndex, 1),
      _newColumnOrder$splic2 = _slicedToArray(_newColumnOrder$splic, 1),
      removed = _newColumnOrder$splic2[0];

  newColumnOrder.splice(destinationIndex, 0, removed);
  return newColumnOrder;
}

function useTrackCells(_ref) {
  var headerCellRefs = _ref.headerCellRefs,
      trackingCellRefs = _ref.trackingCellRefs;
  return React.useCallback(function (columns) {
    columns.forEach(function (_ref2) {
      var key = _ref2.key;
      var headerCell = headerCellRefs.current.get(key);
      var trackingCell = trackingCellRefs.current.get(key);

      if (headerCell && trackingCell) {
        var trackedWidth = "".concat(trackingCell.clientWidth, "px");
        headerCell.style.width = trackedWidth;
        headerCell.style.minWidth = trackedWidth;
        headerCell.style.maxWidth = trackedWidth;
      }
    });
  }, [headerCellRefs, trackingCellRefs]);
}

function useDragDrop(_ref) {
  var columns = _ref.columns,
      defaultColumnMinWidth = _ref.defaultColumnMinWidth,
      isColumnDragDisabled = _ref.isColumnDragDisabled,
      onColumnsOrderChange = _ref.onColumnsOrderChange;
  var gridNode = React.useContext(GridNodeContext);

  var _React$useState = React.useState(null),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      draggingKey = _React$useState2[0],
      setDraggingKey = _React$useState2[1];

  var columnOrder = React.useMemo(function () {
    return columns.map(function (_ref2) {
      var key = _ref2.key;
      return key;
    });
  }, [columns]);
  var cellRefs = React.useRef(new Map());
  var headerCellRefs = React.useRef(new Map());
  var trackingCellRefs = React.useRef(new Map());
  var handleDragEnd = React.useCallback(function (_ref3) {
    var source = _ref3.source,
        destination = _ref3.destination;
    setDraggingKey(null);

    if (isColumnDragDisabled) {
      return;
    }

    if (destination) {
      var sourceColumn = columns[source.index] && columns[source.index];
      var destinationColumn = columns[destination.index];

      if (onColumnsOrderChange && source.index !== destination.index && sourceColumn && destinationColumn) {
        onColumnsOrderChange({
          index: source.index,
          key: sourceColumn.key
        }, {
          index: destination.index,
          key: destinationColumn.key
        });
      }
    }

    columnOrder.forEach(function (key, i) {
      var nodesInColumn = cellRefs.current.get(key);

      if (nodesInColumn) {
        nodesInColumn.forEach(function (cellNode) {
          cellNode.style.gridColumn = (i + 1).toString();
        });
      }
    });

    if (gridNode) {
      var newColumnOrder = destination ? spliceColumnOrder(columnOrder, source.index, destination.index) : columns.map(function (_ref4) {
        var key = _ref4.key;
        return key;
      });
      var sortedColumns = sortColumns(columns, newColumnOrder);
      gridNode.style.gridTemplateColumns = columnsToGridTemplate(sortedColumns, defaultColumnMinWidth);
    }
  }, [columns, columnOrder, isColumnDragDisabled, onColumnsOrderChange, gridNode, defaultColumnMinWidth]);
  var trackCells = useTrackCells({
    headerCellRefs: headerCellRefs,
    trackingCellRefs: trackingCellRefs
  });
  var handleDragUpdate = React.useCallback(function (_ref5) {
    var source = _ref5.source,
        destination = _ref5.destination;

    if (isColumnDragDisabled || !destination || !gridNode) {
      return;
    }

    var newColumnOrder = spliceColumnOrder(columnOrder, source.index, destination.index);
    var sortedColumns = sortColumns(columns, newColumnOrder);
    gridNode.style.gridTemplateColumns = columnsToGridTemplate(sortedColumns, defaultColumnMinWidth);
    sortedColumns.forEach(function (_ref6, i) {
      var key = _ref6.key;
      var gridColumn = (i + 1).toString();
      var nodesInColumn = cellRefs.current.get(key);

      if (nodesInColumn) {
        nodesInColumn.forEach(function (cellNode) {
          cellNode.style.gridColumn = gridColumn;
        });
      }

      var trackingCell = trackingCellRefs.current.get(key);

      if (trackingCell) {
        trackingCell.style.gridColumn = gridColumn;
      }
    });
    trackCells(sortedColumns);
  }, [columnOrder, columns, defaultColumnMinWidth, gridNode, isColumnDragDisabled, trackCells, trackingCellRefs]);
  var handleDragStart = React.useCallback(function (_ref7) {
    var source = _ref7.source;

    if (isColumnDragDisabled) {
      return;
    }

    setDraggingKey(columns[source.index].key);
  }, [columns, isColumnDragDisabled]);
  return {
    cellRefs: cellRefs,
    draggingKey: draggingKey,
    headerCellRefs: headerCellRefs,
    onDragEnd: handleDragEnd,
    onDragStart: handleDragStart,
    onDragUpdate: handleDragUpdate,
    trackingCellRefs: trackingCellRefs
  };
}

function usePaneScrollState() {
  var gridNode = React.useContext(GridNodeContext);

  var _React$useState = React.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      canScrollLeft = _React$useState2[0],
      setCanScrollLeft = _React$useState2[1];

  var _React$useState3 = React.useState(false),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      canScrollRight = _React$useState4[0],
      setCanScrollRight = _React$useState4[1];

  var checkScroll = React.useCallback(function () {
    if (gridNode) {
      var scrollLeft = gridNode.scrollLeft,
          scrollWidth = gridNode.scrollWidth,
          clientWidth = gridNode.clientWidth;
      var canScroll = scrollWidth > clientWidth;
      var nextCanScrollLeft = canScroll && scrollLeft > 0;
      var nextCanScrollRight = canScroll && scrollWidth - scrollLeft > clientWidth + 4;

      if (nextCanScrollLeft !== canScrollLeft) {
        setCanScrollLeft(nextCanScrollLeft);
      }

      if (nextCanScrollRight !== canScrollRight) {
        setCanScrollRight(nextCanScrollRight);
      }
    } else {
      setCanScrollLeft(false);
      setCanScrollRight(false);
    }
  }, [gridNode, canScrollLeft, canScrollRight]);
  React.useEffect(function () {
    window.addEventListener('resize', checkScroll);
    return function () {
      window.removeEventListener('resize', checkScroll);
    };
  }, [checkScroll]);
  React.useEffect(function () {
    if (gridNode) {
      gridNode.addEventListener('scroll', checkScroll);
      checkScroll();
    }

    return function () {
      if (gridNode) {
        gridNode.removeEventListener('scroll', checkScroll);
      }
    };
  }, [gridNode, checkScroll]);
  return {
    canScrollLeft: canScrollLeft,
    canScrollRight: canScrollRight
  };
}

function applyColumnWidthDefaults(column) {
  var defaultWidth = column.defaultWidth,
      width = column.width;

  if (isNumber(width)) {
    // column has width exactly specified
    return column;
  }

  if (isNumber(defaultWidth)) {
    // no width, fallback to column's default width
    return _objectSpread({}, column, {
      width: defaultWidth
    });
  }

  return column;
} // assumes applyColumnWithDefaults has been called first and all widths are exactly specified

function applyColumnMaxWidth(column) {
  var _ref = column,
      maxWidth = _ref.maxWidth,
      width = _ref.width;

  if (isNumber(maxWidth)) {
    return _objectSpread({}, column, {
      width: Math.min(maxWidth, width)
    });
  }

  return column;
} // assumes applyColumnWithDefaults has been called first and all widths are exactly specified

function applyColumnMinWidth(column) {
  var _ref2 = column,
      minWidth = _ref2.minWidth,
      width = _ref2.width;

  if (isNumber(minWidth)) {
    return _objectSpread({}, column, {
      width: Math.max(minWidth, width)
    });
  }

  return column;
}

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css = ".ResizeDragHandle_ResizeDragHandle__3xlp4 {\n  bottom: 0;\n  cursor: col-resize;\n  position: absolute;\n  right: -0.5px;\n  top: 0;\n  width: 1px;\n  opacity: 0; }\n\n.ResizeDragHandle_isHidden__15ZAa {\n  opacity: 0; }\n\n.ResizeDragHandle_ExtraHandle__3g5LA {\n  position: absolute;\n  width: 8px;\n  background-color: red;\n  height: 100%;\n  opacity: 0;\n  right: -4px; }\n\n.ResizeDragHandle_moveLeftToAvoidOverflow__CvfYT {\n  right: 0; }\n  .ResizeDragHandle_moveLeftToAvoidOverflow__CvfYT .ResizeDragHandle_InvisibleHandle__2outp {\n    right: 0; }\n\nbody.ResizeDragHandle_colResizing__3Z8jg {\n  cursor: col-resize !important; }\n";
var styles = {"ResizeDragHandle":"ResizeDragHandle_ResizeDragHandle__3xlp4","isHidden":"ResizeDragHandle_isHidden__15ZAa","ExtraHandle":"ResizeDragHandle_ExtraHandle__3g5LA","moveLeftToAvoidOverflow":"ResizeDragHandle_moveLeftToAvoidOverflow__CvfYT","InvisibleHandle":"ResizeDragHandle_InvisibleHandle__2outp","colResizing":"ResizeDragHandle_colResizing__3Z8jg"};
styleInject(css);

function ResizeDragHandle(_ref) {
  var _classnames;

  var isHidden = _ref.isHidden,
      _ref$maxWidth = _ref.maxWidth,
      maxWidth = _ref$maxWidth === void 0 ? 1000 : _ref$maxWidth,
      _ref$minWidth = _ref.minWidth,
      minWidth = _ref$minWidth === void 0 ? 50 : _ref$minWidth,
      onWidthChange = _ref.onWidthChange,
      onWidthChangeEnd = _ref.onWidthChangeEnd,
      shouldMoveLeftToAvoidOverflow = _ref.shouldMoveLeftToAvoidOverflow,
      targetRef = _ref.targetRef;
  var ownRef = React.useRef(null);
  var isDragging = React.useRef(false);
  var handleMouseDown = React.useCallback(function (e) {
    if (e.button === 0) {
      e.preventDefault();
      e.stopPropagation();

      if (targetRef.current) {
        isDragging.current = true;
      }
    }
  }, [targetRef, isDragging]);
  var handleMouseMove = React.useCallback(function (e) {
    if (isDragging.current && targetRef.current) {
      var _targetRef$current$ge = targetRef.current.getBoundingClientRect(),
          left = _targetRef$current$ge.left;

      var _newWidth = Math.min(maxWidth, Math.max(minWidth, e.x - left));

      onWidthChange(_newWidth);
      var newWidthPx = "".concat(_newWidth, "px");
      var targetStyle = targetRef.current.style;
      targetStyle.width = newWidthPx;
      targetStyle.minWidth = newWidthPx;
      targetStyle.maxWidth = newWidthPx;
      document.body.classList.add(styles.colResizing);
    }
  }, [minWidth, targetRef, isDragging, onWidthChange, maxWidth]);
  var handleMouseUp = React.useCallback(function () {
    if (isDragging.current && targetRef.current) {
      onWidthChangeEnd(targetRef.current.clientWidth);
    }

    isDragging.current = false;
    document.body.classList.remove(styles.colResizing);
  }, [targetRef, isDragging, onWidthChangeEnd]);
  React.useEffect(function () {
    var ownNode = ownRef.current;

    if (ownNode) {
      ownNode.addEventListener('mousedown', handleMouseDown);
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('blur', handleMouseUp);
      return function () {
        if (ownNode) {
          ownNode.removeEventListener('mousedown', handleMouseDown);
          window.removeEventListener('mousemove', handleMouseMove);
          window.removeEventListener('mouseup', handleMouseUp);
          window.removeEventListener('blur', handleMouseUp);
        }
      };
    }

    return function () {};
  }, [ownRef, handleMouseDown, handleMouseMove, handleMouseUp]);
  return React.createElement("div", {
    ref: ownRef,
    className: classnames(styles.ResizeDragHandle, (_classnames = {}, _defineProperty(_classnames, styles.moveLeftToAvoidOverflow, shouldMoveLeftToAvoidOverflow), _defineProperty(_classnames, styles.isHidden, isHidden), _classnames))
  }, React.createElement("div", {
    className: styles.ExtraHandle
  }));
}

var css$1 = ".HeaderCell_HeaderCell__lVi2L {\n  box-sizing: border-box;\n  display: flex;\n  align-items: center;\n  position: relative;\n  grid-row: 1;\n  height: 56px;\n  border: 1px solid rgba(0, 0, 0, 0);\n  opacity: 1;\n  transition: 150 opacity ease-out, 250ms box-shadow ease-out; }\n  .HeaderCell_HeaderCell__lVi2L:hover {\n    transition: 250ms box-shadow ease-out;\n    border-right: 1px solid #e6e6e6;\n    border-left: 1px solid #e6e6e6; }\n  .HeaderCell_HeaderCell__lVi2L.HeaderCell_isAnyDragging__3KJwT:not(.HeaderCell_notResizable__2RBMh) {\n    background-color: white;\n    border-right: 1px solid #e6e6e6; }\n  .HeaderCell_HeaderCell__lVi2L.HeaderCell_notResizable__2RBMh:hover {\n    border: 1px solid rgba(0, 0, 0, 0); }\n  .HeaderCell_HeaderCell__lVi2L.HeaderCell_isDragging__32Ss7 {\n    box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 8px 0px;\n    transition: 150ms opacity ease-in, 300ms box-shadow ease-in;\n    opacity: 0.7; }\n\n.HeaderCell_LabelContainer__hXbBQ {\n  width: 100%;\n  height: 100%;\n  padding: 0 16px;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  display: flex;\n  align-items: center; }\n\n.HeaderCell_Label__SrYof {\n  width: 100%;\n  overflow-x: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap; }\n";
var styles$1 = {"HeaderCell":"HeaderCell_HeaderCell__lVi2L","isAnyDragging":"HeaderCell_isAnyDragging__3KJwT","notResizable":"HeaderCell_notResizable__2RBMh","isDragging":"HeaderCell_isDragging__32Ss7","LabelContainer":"HeaderCell_LabelContainer__hXbBQ","Label":"HeaderCell_Label__SrYof"};
styleInject(css$1);

function HeaderCellWrapped(_ref) {
  var _classnames;

  var _ref$column = _ref.column,
      key = _ref$column.key,
      width = _ref$column.width,
      label = _ref$column.label,
      minWidth = _ref$column.minWidth,
      name = _ref$column.name,
      notResizable = _ref$column.notResizable,
      dragHandleProps = _ref.dragHandleProps,
      draggableInnerRef = _ref.draggableInnerRef,
      draggableProps = _ref.draggableProps,
      draggingKey = _ref.draggingKey,
      headerCellRefs = _ref.headerCellRefs,
      isLastChild = _ref.isLastChild,
      onWidthChange = _ref.onWidthChange,
      onWidthChangeEnd = _ref.onWidthChangeEnd,
      style = _ref.style,
      transform = _ref.transform;

  var _ref2 = React.useRef(null);

  var isAnyDragging = Boolean(draggingKey);
  var isDragging = key === draggingKey;
  var handleWidthChange = React.useCallback(function (newWidth) {
    if (onWidthChangeEnd) {
      onWidthChangeEnd(key, newWidth);
    }
  }, [key, onWidthChangeEnd]);
  var handleTransientWidthChange = React.useCallback(function (newWidth) {
    onWidthChange(key, newWidth);
  }, [key, onWidthChange]);
  var displayLabel = isUndefined(label) ? name : label;
  return React.createElement("div", _extends({
    className: classnames(styles$1.HeaderCell, (_classnames = {}, _defineProperty(_classnames, styles$1.isDragging, isDragging), _defineProperty(_classnames, styles$1.isAnyDragging, isAnyDragging), _defineProperty(_classnames, styles$1.notResizable, notResizable), _classnames)),
    ref: function ref(node) {
      if (draggableInnerRef) {
        draggableInnerRef(node);
      }

      _ref2.current = node;

      if (node && headerCellRefs.current) {
        headerCellRefs.current.set(key, node);
      }
    }
  }, draggableProps, dragHandleProps, {
    style: _objectSpread({}, style, {
      maxWidth: width,
      minWidth: width,
      transform: transform,
      width: width
    }),
    title: key
  }), React.createElement("div", {
    className: styles$1.LabelContainer
  }, React.createElement("div", {
    className: styles$1.Label
  }, displayLabel)), onWidthChangeEnd && !notResizable && React.createElement(ResizeDragHandle, {
    isHidden: isAnyDragging,
    minWidth: minWidth,
    shouldMoveLeftToAvoidOverflow: isLastChild,
    targetRef: _ref2,
    onWidthChange: handleTransientWidthChange,
    onWidthChangeEnd: handleWidthChange
  }));
}

function HeaderCell(props) {
  var column = props.column,
      columnIndex = props.columnIndex,
      draggingKey = props.draggingKey,
      headerCellRefs = props.headerCellRefs,
      isDragDisabled = props.isDragDisabled,
      isLastChild = props.isLastChild,
      onWidthChange = props.onWidthChange,
      onWidthChangeEnd = props.onWidthChangeEnd;
  var notDraggable = column.notDraggable,
      key = column.key;
  var wrappedProps = {
    column: column,
    draggingKey: draggingKey,
    headerCellRefs: headerCellRefs,
    isLastChild: isLastChild,
    onWidthChange: onWidthChange,
    onWidthChangeEnd: onWidthChangeEnd
  };

  if (notDraggable) {
    return React.createElement(HeaderCellWrapped, wrappedProps);
  }

  return React.createElement(reactBeautifulDnd.Draggable, {
    key: key,
    index: columnIndex,
    draggableId: key,
    isDragDisabled: isDragDisabled
  }, function (_ref) {
    var draggableProps = _ref.draggableProps,
        dragHandleProps = _ref.dragHandleProps,
        draggableInnerRef = _ref.innerRef;
    var style = draggableProps.style;
    var transform = getAxisLockedTransform(style);
    return React.createElement(HeaderCellWrapped, _extends({}, wrappedProps, {
      dragHandleProps: dragHandleProps,
      draggableInnerRef: draggableInnerRef,
      draggableProps: draggableProps,
      style: style,
      transform: transform
    }));
  });
}

function getAxisLockedTransform(style) {
  if (!style || !style.transform) {
    return undefined;
  }

  var parts = style.transform.split(',');

  if (parts.length !== 2) {
    return style.transform;
  }

  return "".concat(parts[0], ", 0)");
}

var css$2 = ".Header_Header__1I5CE {\n  border-bottom: 1px solid #e6e6e6;\n  grid-column: 1 / -1;\n  display: flex;\n  font-weight: bold; }\n\n.Header_isAnyDragging__1wGte {\n  background-color: #e6e6e6; }\n";
var styles$2 = {"Header":"Header_Header__1I5CE","isAnyDragging":"Header_isAnyDragging__1wGte"};
styleInject(css$2);

function Header(_ref) {
  var rawColumns = _ref.columns,
      defaultColumnMinWidth = _ref.defaultColumnMinWidth,
      draggingKey = _ref.draggingKey,
      headerCellRefs = _ref.headerCellRefs,
      isColumnDragDisabled = _ref.isColumnDragDisabled,
      onColumnWidthChange = _ref.onColumnWidthChange,
      trackingCellRefs = _ref.trackingCellRefs;
  var gridNode = React.useContext(GridNodeContext);
  var columns = rawColumns.map(function (column) {
    var trackingCell = trackingCellRefs.current.get(column.key);

    if (!trackingCell) {
      return column;
    }

    return _objectSpread({}, column, {
      width: trackingCell.clientWidth
    });
  });
  var trackCells = useTrackCells({
    headerCellRefs: headerCellRefs,
    trackingCellRefs: trackingCellRefs
  });
  var handleResize = React.useCallback(function () {
    trackCells(rawColumns);
  }, [trackCells, rawColumns]);
  React.useEffect(function () {
    trackCells(rawColumns);
    window.addEventListener('resize', handleResize);
    return function () {
      window.removeEventListener('resize', handleResize);
    };
  }, [trackCells, rawColumns, handleResize]);
  var handleColumnWidthChange = React.useCallback(function (key, newWidth) {
    if (gridNode) {
      gridNode.style.gridTemplateColumns = columnsToGridTemplate(rawColumns, defaultColumnMinWidth, {
        key: key,
        newWidth: newWidth
      });
    }

    trackCells(rawColumns);
  }, [gridNode, trackCells, rawColumns, defaultColumnMinWidth]);
  return React.createElement(React.Fragment, null, React.createElement("div", {
    className: classnames(styles$2.Header, _defineProperty({}, styles$2.isAnyDragging, Boolean(draggingKey)))
  }, columns.map(function (column, i) {
    return React.createElement(HeaderCell, {
      key: column.key,
      column: column,
      columnIndex: i,
      draggingKey: draggingKey,
      isDragDisabled: isColumnDragDisabled,
      isLastChild: i === columns.length - 1,
      onWidthChange: handleColumnWidthChange,
      onWidthChangeEnd: onColumnWidthChange,
      headerCellRefs: headerCellRefs
    });
  })), columns.map(function (_ref2) {
    var key = _ref2.key;
    return React.createElement("div", {
      key: key,
      style: {
        gridRowStart: -2,
        gridRowEnd: -1
      },
      ref: function ref(node) {
        if (node) {
          trackingCellRefs.current.set(key, node);
        }
      }
    });
  }));
}

function useHoverState() {
  var _React$useState = React.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      isHovering = _React$useState2[0],
      setIsHovering = _React$useState2[1];

  var handleMouseLeave = React.useCallback(function () {
    setIsHovering(false);
  }, []);
  var handleMouseEnter = React.useCallback(function () {
    setIsHovering(true);
  }, []);
  return [isHovering, {
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave
  }];
}

var css$3 = ".Cell_Cell__1-3zV {\n  background-color: inherit;\n  box-sizing: border-box;\n  padding: 0 16px;\n  color: #494949;\n  height: 72px;\n  display: flex;\n  align-items: center;\n  position: relative;\n  border-bottom: 1px solid #e6e6e6;\n  transition: 200ms color ease-out; }\n  .Cell_Cell__1-3zV.Cell_isLastRow__1vtWp {\n    border-bottom: none; }\n\n.Cell_Content__sRZrE {\n  overflow-x: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap; }\n\n.Cell_isDragging__1GXEv {\n  color: gray;\n  transition: 200ms color ease-in; }\n";
var styles$3 = {"Cell":"Cell_Cell__1-3zV","isLastRow":"Cell_isLastRow__1vtWp","Content":"Cell_Content__sRZrE","isDragging":"Cell_isDragging__1GXEv"};
styleInject(css$3);

var Cell = React.memo(React.forwardRef(function (_ref, ref) {
  var _classnames;

  var column = _ref.column,
      columnIndex = _ref.columnIndex,
      datum = _ref.datum,
      isColumnVisible = _ref.isColumnVisible,
      isDragging = _ref.isDragging,
      isLastRow = _ref.isLastRow,
      rowIndex = _ref.rowIndex,
      _ref$springProps = _ref.springProps,
      dy = _ref$springProps.dy,
      animatedRowIndex = _ref$springProps.rowIndex,
      restSpringProps = _objectWithoutProperties(_ref$springProps, ["dy", "rowIndex"]);

  var key = column.key,
      renderer = column.renderer;
  var value = React.useMemo(function () {
    if (!isColumnVisible) {
      return null;
    }

    var valueFromKey = get$1(datum, key, null);

    if (renderer) {
      return renderer({
        datum: datum,
        rowIndex: rowIndex,
        value: valueFromKey
      });
    }

    return valueFromKey;
  }, [datum, isColumnVisible, renderer, key, rowIndex]);
  return React.createElement(extendedAnimated.div, {
    className: classnames(styles$3.Cell, (_classnames = {}, _defineProperty(_classnames, styles$3.isDragging, isDragging), _defineProperty(_classnames, styles$3.isLastRow, isLastRow), _classnames)),
    ref: ref,
    style: _objectSpread({
      gridColumn: columnIndex + 1,
      gridRow: animatedRowIndex.interpolate(function (i) {
        return "".concat(Math.floor(i));
      })
    }, restSpringProps, {
      transform: dy.interpolate(function (y) {
        return "translateY(".concat(y, "px)");
      })
    })
  }, React.createElement("div", {
    className: styles$3.Content
  }, value));
}));

var css$4 = ".RowOverlay_RowOverlay__2YnzW {\n  position: absolute;\n  top: 1px;\n  bottom: 1px;\n  align-items: center;\n  pointer-events: none; }\n";
var styles$4 = {"RowOverlay":"RowOverlay_RowOverlay__2YnzW"};
styleInject(css$4);

function RowOverlay(_ref) {
  var children = _ref.children,
      columnsLength = _ref.columnsLength,
      isHoveringRow = _ref.isHoveringRow,
      rowIndex = _ref.rowIndex;
  var gridNode = React.useContext(GridNodeContext);
  var ref = React.useRef(null);
  var handleResize = React.useCallback(function () {
    if (ref.current && gridNode) {
      ref.current.style.width = "".concat(gridNode.clientWidth, "px");
    }
  }, [gridNode]);
  React.useEffect(function () {
    window.addEventListener('resize', handleResize);
    return function () {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);
  var recalculatePosition = React.useCallback(function () {
    if (gridNode && gridNode.clientWidth > 0 && ref.current) {
      ref.current.style.left = "".concat(gridNode.scrollLeft, "px");
      ref.current.style.width = "".concat(gridNode.clientWidth, "px");
    }
  }, [gridNode]);
  var scrollInterval = React.useRef(null);
  var handleScroll = React.useCallback(function () {
    if (!ref.current) {
      return;
    }

    if (scrollInterval.current) {
      clearTimeout(scrollInterval.current);
    }

    ref.current.style.display = 'none';
    recalculatePosition();
    scrollInterval.current = setTimeout(function () {
      if (ref.current) {
        ref.current.style.display = 'block';
      }
    }, 1);
  }, [recalculatePosition]);
  React.useEffect(function () {
    if (gridNode) {
      gridNode.addEventListener('scroll', handleScroll);
    }

    return function () {
      if (gridNode) {
        gridNode.removeEventListener('scroll', handleScroll);
      }
    };
  }, [gridNode, handleScroll]);
  React.useEffect(function () {
    return function () {
      if (scrollInterval.current) {
        clearInterval(scrollInterval.current);
      }
    };
  }, []);
  React.useEffect(function () {
    if (isHoveringRow) {
      recalculatePosition();
    }
  }, [isHoveringRow, recalculatePosition]);

  if (!gridNode) {
    return null;
  }

  return React.createElement("div", {
    className: styles$4.RowOverlay,
    ref: ref,
    style: {
      gridColumnEnd: columnsLength,
      gridRowEnd: rowIndex + 3,
      gridRowStart: rowIndex + 2
    }
  }, children);
}

var css$5 = ".Row_Cell__Wkai2 {\n  background-color: inherit;\n  box-sizing: border-box;\n  padding: 0 16px;\n  color: #494949;\n  height: 72px;\n  display: flex;\n  align-items: center;\n  position: relative;\n  border-bottom: 1px solid #e6e6e6;\n  transition: 200ms color ease-out; }\n  .Row_Cell__Wkai2.Row_isLastRow__kcUhG {\n    border-bottom: none; }\n\n.Row_Content__2erQp {\n  overflow-x: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap; }\n\n.Row_isDragging__2r8Gs {\n  color: gray;\n  transition: 200ms color ease-in; }\n\n.Row_Row__3uXq8 {\n  display: contents; }\n  .Row_Row__3uXq8:hover {\n    background-color: #fafafa; }\n  .Row_Row__3uXq8.Row_isClickable__3EDnY {\n    cursor: pointer; }\n\n.Row_NullCell__2XBZD {\n  background-color: inherit;\n  width: 100%;\n  height: 100%;\n  border-bottom: 1px solid #e6e6e6; }\n";
var styles$5 = {"Cell":"Row_Cell__Wkai2","isLastRow":"Row_isLastRow__kcUhG","Content":"Row_Content__2erQp","isDragging":"Row_isDragging__2r8Gs","Row":"Row_Row__3uXq8","isClickable":"Row_isClickable__3EDnY","NullCell":"Row_NullCell__2XBZD"};
styleInject(css$5);

var Row = React.memo(function (_ref) {
  var _classnames;

  var cellRefs = _ref.cellRefs,
      columns = _ref.columns,
      columnVisibility = _ref.columnVisibility,
      datum = _ref.datum,
      draggingKey = _ref.draggingKey,
      isLastRow = _ref.isLastRow,
      isSelected = _ref.isSelected,
      onClick = _ref.onClick,
      rowIndex = _ref.rowIndex,
      rowOverlay = _ref.rowOverlay,
      springProps = _ref.springProps;

  var _useHoverState = useHoverState(),
      _useHoverState2 = _slicedToArray(_useHoverState, 2),
      isHovering = _useHoverState2[0],
      hoverBind = _useHoverState2[1];

  var handleRowClick = React.useCallback(function (e) {
    if (onClick) {
      onClick(e, {
        rowIndex: rowIndex,
        datum: datum
      });
    }
  }, [onClick, rowIndex, datum]);
  var handleKeyDown = React.useCallback(function (e) {
    if (e.key === 'Enter' && onClick) {
      onClick(e, {
        rowIndex: rowIndex,
        datum: datum
      });
    }
  }, [datum, onClick, rowIndex]);
  return React.createElement("div", _extends({}, hoverBind, {
    className: classnames(styles$5.Row, (_classnames = {}, _defineProperty(_classnames, styles$5.isSelected, isSelected), _defineProperty(_classnames, styles$5.isClickable, Boolean(onClick)), _classnames)),
    onClick: handleRowClick,
    role: "row",
    tabIndex: 0,
    onKeyDown: handleKeyDown
  }), columns.map(function (column, columnIndex) {
    var key = column.key;
    return React.createElement(Cell, {
      column: column,
      datum: datum,
      isColumnVisible: Boolean(!columnVisibility || columnVisibility[columnIndex]),
      isDragging: key === draggingKey,
      isLastRow: isLastRow,
      key: key,
      ref: function ref(node) {
        if (!cellRefs.current || !node) {
          return;
        }

        if (!cellRefs.current.has(key)) {
          cellRefs.current.set(key, []);
        }

        var columnNodeArray = cellRefs.current.get(key);

        if (columnNodeArray) {
          columnNodeArray[rowIndex] = node;
        }
      },
      columnIndex: columnIndex,
      rowIndex: rowIndex,
      springProps: springProps
    });
  }), rowOverlay && React.createElement(RowOverlay, {
    columnsLength: columns.length,
    isHoveringRow: isHovering,
    rowIndex: rowIndex
  }, rowOverlay({
    datum: datum,
    isVisible: isHovering,
    rowIndex: rowIndex
  })));
});

var css$6 = ".Grid_GridPane__3SgbV {\n  color: #494949;\n  position: relative;\n  width: 100%;\n  margin-top: -100vh;\n  pointer-events: none; }\n\n.Grid_Grid__2Cmk2 {\n  text-align: left;\n  overflow-x: auto;\n  overflow-y: hidden;\n  display: grid;\n  position: relative;\n  background-color: white;\n  margin-top: 100vh;\n  pointer-events: all;\n  border: 1px solid #e6e6e6;\n  transition: 160ms box-shadow ease-out;\n  padding-left: 4px;\n  padding-right: 4px; }\n  .Grid_Grid__2Cmk2 .Grid_HeaderCell__1MH3g {\n    display: none; }\n  .Grid_Grid__2Cmk2.Grid_canScrollRight__25Eu4 {\n    box-shadow: inset -8px 0px 8px -8px rgba(0, 0, 0, 0.1); }\n  .Grid_Grid__2Cmk2.Grid_canScrollLeft__3SlfR {\n    box-shadow: inset 8px 0px 8px -8px rgba(0, 0, 0, 0.1); }\n  .Grid_Grid__2Cmk2.Grid_canScrollLeft__3SlfR.Grid_canScrollRight__25Eu4 {\n    box-shadow: inset -8px 0px 8px -8px rgba(0, 0, 0, 0.1), inset 8px 0px 8px -8px rgba(0, 0, 0, 0.1); }\n\n.Grid_canScrollLeft__3SlfR,\n.Grid_canScrollRight__25Eu4 {\n  transition: 160ms box-shadow ease-in; }\n";
var styles$6 = {"GridPane":"Grid_GridPane__3SgbV","Grid":"Grid_Grid__2Cmk2","HeaderCell":"Grid_HeaderCell__1MH3g","canScrollRight":"Grid_canScrollRight__25Eu4","canScrollLeft":"Grid_canScrollLeft__3SlfR"};
styleInject(css$6);

var GridWrapped = React.forwardRef(function (_ref, externalRef) {
  var rawColumns = _ref.columns,
      data = _ref.data,
      _ref$defaultColumnMin = _ref.defaultColumnMinWidth,
      defaultColumnMinWidth = _ref$defaultColumnMin === void 0 ? 200 : _ref$defaultColumnMin,
      onColumnsOrderChange = _ref.onColumnsOrderChange,
      onColumnWidthChange = _ref.onColumnWidthChange,
      onRowClick = _ref.onRowClick,
      rowKey = _ref.rowKey,
      rowOverlay = _ref.rowOverlay,
      selectedRowIndexes = _ref.selectedRowIndexes,
      setGridNode = _ref.setGridNode,
      virtualizationEnabled = _ref.virtualizationEnabled;
  var columns = React.useMemo(function () {
    return rawColumns.filter(function (_ref2) {
      var hidden = _ref2.hidden;
      return !hidden;
    }).map(applyColumnWidthDefaults).map(applyColumnMinWidth).map(applyColumnMaxWidth);
  }, [rawColumns]);
  var isColumnDragDisabled = !onColumnsOrderChange;

  var _usePaneScrollState = usePaneScrollState(),
      canScrollLeft = _usePaneScrollState.canScrollLeft,
      canScrollRight = _usePaneScrollState.canScrollRight;

  var _useDragDrop = useDragDrop({
    columns: columns,
    defaultColumnMinWidth: defaultColumnMinWidth,
    isColumnDragDisabled: isColumnDragDisabled,
    onColumnsOrderChange: onColumnsOrderChange
  }),
      cellRefs = _useDragDrop.cellRefs,
      draggingKey = _useDragDrop.draggingKey,
      headerCellRefs = _useDragDrop.headerCellRefs,
      onDragEnd = _useDragDrop.onDragEnd,
      onDragStart = _useDragDrop.onDragStart,
      onDragUpdate = _useDragDrop.onDragUpdate,
      trackingCellRefs = _useDragDrop.trackingCellRefs;

  var _useColumnsIntersecti = useColumnsIntersectionObserver({
    columns: columns,
    dataLength: data.length,
    isEnabled: Boolean(virtualizationEnabled)
  }),
      _useColumnsIntersecti2 = _slicedToArray(_useColumnsIntersecti, 2),
      columnVisibility = _useColumnsIntersecti2[0],
      observerComponent = _useColumnsIntersecti2[1];

  var rowKeyAccessor = React.useCallback(function (d) {
    return isString(rowKey) ? d[rowKey] : rowKey(d);
  }, [rowKey]);
  var ids = data.map(rowKeyAccessor);
  var prevIds = usePreviousValue(ids) || [];
  var prevIndexes = ids.map(function (id) {
    return prevIds.indexOf(id);
  });
  var transitionData = data.map(function (datum, index) {
    return {
      datum: datum,
      index: index,
      prevIndex: prevIndexes[index]
    };
  });
  var newIds = difference(ids, prevIds);
  var removedIds = difference(prevIds, ids);
  var transitions = useTransition(transitionData, ids, {
    from: function from(_ref3) {
      var index = _ref3.index;
      return {
        opacity: 0,
        dy: -30,
        rowIndex: index + 2
      };
    },
    leave: {
      opacity: 0,
      dy: 10
    },
    enter: function enter(_ref4) {
      var index = _ref4.index;
      return {
        opacity: 1,
        dy: 0,
        rowIndex: index + 2
      };
    },
    update: function update(_ref5) {
      var index = _ref5.index,
          prevIndex = _ref5.prevIndex;
      return {
        opacity: 1,
        dy: (index - prevIndex) * 72,
        rowIndex: index + 2
      };
    }
  });
  console.log({
    transitions: transitions
  });
  return React.createElement("div", {
    className: styles$6.GridPane
  }, React.createElement(reactBeautifulDnd.DragDropContext, {
    onDragEnd: onDragEnd,
    onDragUpdate: onDragUpdate,
    onDragStart: onDragStart
  }, React.createElement(reactBeautifulDnd.Droppable, {
    droppableId: "droppable",
    direction: "horizontal"
  }, function (_ref6) {
    var _classnames;

    var droppableInnerRef = _ref6.innerRef,
        droppableProps = _ref6.droppableProps;
    return React.createElement("div", _extends({
      className: classnames(styles$6.Grid, (_classnames = {}, _defineProperty(_classnames, styles$6.canScrollLeft, canScrollLeft), _defineProperty(_classnames, styles$6.canScrollRight, canScrollRight), _classnames)),
      ref: function ref(node) {
        droppableInnerRef(node);

        if (externalRef) {
          externalRef.current = node;
        }

        setGridNode(node);
      }
    }, droppableProps, {
      style: {
        gridTemplateColumns: columnsToGridTemplate(columns, defaultColumnMinWidth)
      }
    }), React.createElement(Header, {
      cellRefs: cellRefs,
      columns: columns,
      defaultColumnMinWidth: defaultColumnMinWidth,
      draggingKey: draggingKey,
      headerCellRefs: headerCellRefs,
      trackingCellRefs: trackingCellRefs,
      onColumnWidthChange: onColumnWidthChange,
      isColumnDragDisabled: isColumnDragDisabled
    }), transitions.map(function (_ref7, rowIndex) {
      var datum = _ref7.item.datum,
          springProps = _ref7.props;
      return React.createElement(Row, {
        cellRefs: cellRefs,
        columns: columns,
        columnVisibility: columnVisibility,
        datum: datum,
        draggingKey: draggingKey,
        isLastRow: rowIndex === data.length - 1,
        isSelected: Boolean(selectedRowIndexes && selectedRowIndexes.has(rowIndex)),
        key: rowKeyAccessor(datum),
        onClick: onRowClick,
        rowIndex: rowIndex,
        rowOverlay: rowOverlay,
        springProps: springProps
      });
    }), observerComponent);
  })));
});

function usePreviousValue(value) {
  var ref = React.useRef(null);
  React.useEffect(function () {
    ref.current = value;
  });
  return ref.current;
}

var Grid = React.memo(React.forwardRef(function (props, externalRef) {
  var _React$useState = React.useState(null),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      gridNode = _React$useState2[0],
      setGridNode = _React$useState2[1];

  return React.createElement(GridNodeContext.Provider, {
    value: gridNode
  }, React.createElement(GridWrapped, _extends({}, props, {
    ref: externalRef,
    setGridNode: setGridNode
  })));
}), function (prevProps, nextProps) {
  var prevColumns = prevProps.columns,
      prevData = prevProps.data,
      restPrevProps = _objectWithoutProperties(prevProps, ["columns", "data"]);

  var nextColumns = nextProps.columns,
      nextData = nextProps.data,
      restNextProps = _objectWithoutProperties(nextProps, ["columns", "data"]);

  if (!isEqual(restPrevProps, restNextProps)) {
    return false;
  }

  if (!isEqual(prevColumns, nextColumns)) {
    return false;
  }

  var columnKeys = nextColumns.map(function (_ref) {
    var key = _ref.key;
    return key;
  });
  var filteredPrevData = prevData.map(function (datum) {
    return pick(datum, columnKeys);
  });
  var filteredNextData = nextData.map(function (datum) {
    return pick(datum, columnKeys);
  });

  if (!isEqual(filteredPrevData, filteredNextData)) {
    return false;
  }

  return true;
});

function useColumnOrderState(columns) {
  var _React$useState = React.useState(columns.map(function (_ref) {
    var key = _ref.key;
    return key;
  })),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      columnOrder = _React$useState2[0],
      setColumnOrder = _React$useState2[1];

  var onColumnOrderChange = React.useCallback(function (source, destination) {
    setColumnOrder(spliceColumnOrder(columnOrder, source.index, destination.index));
  }, [columnOrder]);
  return [columnOrder, onColumnOrderChange];
}

exports.Grid = Grid;
exports.sortColumns = sortColumns;
exports.useColumnOrderState = useColumnOrderState;
//# sourceMappingURL=index.js.map
