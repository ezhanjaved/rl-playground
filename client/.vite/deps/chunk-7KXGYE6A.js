import {
  require_with_selector
} from "./chunk-XUGFBAL3.js";
import {
  Box3,
  BoxGeometry,
  BufferAttribute,
  BufferGeometry,
  ByteType,
  ClampToEdgeWrapping,
  Color,
  DataTexture,
  DoubleSide,
  Euler,
  FileLoader,
  Float32BufferAttribute,
  FloatType,
  HalfFloatType,
  InstancedBufferAttribute,
  InstancedBufferGeometry,
  IntType,
  LinearFilter,
  LinearMipMapLinearFilter,
  LinearSRGBColorSpace,
  Loader,
  LoadingManager,
  Matrix3,
  Matrix4,
  Mesh,
  MeshBasicMaterial,
  MeshDepthMaterial,
  MeshDistanceMaterial,
  MeshStandardMaterial,
  NoBlending,
  OrthographicCamera,
  PlaneGeometry,
  Quaternion,
  REVISION,
  RGBADepthPacking,
  RGBAFormat,
  SRGBColorSpace,
  Scene,
  ShaderChunk,
  ShaderMaterial,
  ShortType,
  Sphere,
  Spherical,
  Texture,
  Triangle,
  UVMapping,
  UniformsLib,
  UniformsUtils,
  UnsignedByteType,
  UnsignedIntType,
  Vector2,
  Vector3,
  Vector4,
  WebGLRenderTarget,
  WebGLRenderer
} from "./chunk-NFEVMALK.js";
import {
  require_react
} from "./chunk-4BPZ7PBZ.js";
import {
  __commonJS,
  __toESM
} from "./chunk-G3PMV62Z.js";

// node_modules/stats.js/build/stats.min.js
var require_stats_min = __commonJS({
  "node_modules/stats.js/build/stats.min.js"(exports, module) {
    (function(f2, e2) {
      "object" === typeof exports && "undefined" !== typeof module ? module.exports = e2() : "function" === typeof define && define.amd ? define(e2) : f2.Stats = e2();
    })(exports, function() {
      var f2 = function() {
        function e2(a6) {
          c2.appendChild(a6.dom);
          return a6;
        }
        function u(a6) {
          for (var d2 = 0; d2 < c2.children.length; d2++) c2.children[d2].style.display = d2 === a6 ? "block" : "none";
          l2 = a6;
        }
        var l2 = 0, c2 = document.createElement("div");
        c2.style.cssText = "position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000";
        c2.addEventListener("click", function(a6) {
          a6.preventDefault();
          u(++l2 % c2.children.length);
        }, false);
        var k = (performance || Date).now(), g = k, a5 = 0, r2 = e2(new f2.Panel("FPS", "#0ff", "#002")), h = e2(new f2.Panel("MS", "#0f0", "#020"));
        if (self.performance && self.performance.memory) var t2 = e2(new f2.Panel("MB", "#f08", "#201"));
        u(0);
        return { REVISION: 16, dom: c2, addPanel: e2, showPanel: u, begin: function() {
          k = (performance || Date).now();
        }, end: function() {
          a5++;
          var c5 = (performance || Date).now();
          h.update(c5 - k, 200);
          if (c5 > g + 1e3 && (r2.update(1e3 * a5 / (c5 - g), 100), g = c5, a5 = 0, t2)) {
            var d2 = performance.memory;
            t2.update(d2.usedJSHeapSize / 1048576, d2.jsHeapSizeLimit / 1048576);
          }
          return c5;
        }, update: function() {
          k = this.end();
        }, domElement: c2, setMode: u };
      };
      f2.Panel = function(e2, f3, l2) {
        var c2 = Infinity, k = 0, g = Math.round, a5 = g(window.devicePixelRatio || 1), r2 = 80 * a5, h = 48 * a5, t2 = 3 * a5, v = 2 * a5, d2 = 3 * a5, m = 15 * a5, n2 = 74 * a5, p2 = 30 * a5, q = document.createElement("canvas");
        q.width = r2;
        q.height = h;
        q.style.cssText = "width:80px;height:48px";
        var b = q.getContext("2d");
        b.font = "bold " + 9 * a5 + "px Helvetica,Arial,sans-serif";
        b.textBaseline = "top";
        b.fillStyle = l2;
        b.fillRect(0, 0, r2, h);
        b.fillStyle = f3;
        b.fillText(e2, t2, v);
        b.fillRect(d2, m, n2, p2);
        b.fillStyle = l2;
        b.globalAlpha = 0.9;
        b.fillRect(d2, m, n2, p2);
        return { dom: q, update: function(h2, w) {
          c2 = Math.min(c2, h2);
          k = Math.max(k, h2);
          b.fillStyle = l2;
          b.globalAlpha = 1;
          b.fillRect(0, 0, r2, m);
          b.fillStyle = f3;
          b.fillText(g(h2) + " " + e2 + " (" + g(c2) + "-" + g(k) + ")", t2, v);
          b.drawImage(q, d2 + a5, m, n2 - a5, p2, d2, m, n2 - a5, p2);
          b.fillRect(d2 + n2 - a5, m, a5, p2);
          b.fillStyle = l2;
          b.globalAlpha = 0.9;
          b.fillRect(d2 + n2 - a5, m, a5, g((1 - h2 / w) * p2));
        } };
      };
      return f2;
    });
  }
});

// node_modules/@babel/runtime/helpers/esm/extends.js
function _extends() {
  return _extends = Object.assign ? Object.assign.bind() : function(n2) {
    for (var e2 = 1; e2 < arguments.length; e2++) {
      var t2 = arguments[e2];
      for (var r2 in t2) ({}).hasOwnProperty.call(t2, r2) && (n2[r2] = t2[r2]);
    }
    return n2;
  }, _extends.apply(null, arguments);
}

// node_modules/@use-gesture/core/dist/maths-0ab39ae9.esm.js
function clamp(v, min, max) {
  return Math.max(min, Math.min(v, max));
}
var V = {
  toVector(v, fallback) {
    if (v === void 0) v = fallback;
    return Array.isArray(v) ? v : [v, v];
  },
  add(v1, v2) {
    return [v1[0] + v2[0], v1[1] + v2[1]];
  },
  sub(v1, v2) {
    return [v1[0] - v2[0], v1[1] - v2[1]];
  },
  addTo(v1, v2) {
    v1[0] += v2[0];
    v1[1] += v2[1];
  },
  subTo(v1, v2) {
    v1[0] -= v2[0];
    v1[1] -= v2[1];
  }
};
function rubberband(distance3, dimension, constant) {
  if (dimension === 0 || Math.abs(dimension) === Infinity) return Math.pow(distance3, constant * 5);
  return distance3 * dimension * constant / (dimension + constant * distance3);
}
function rubberbandIfOutOfBounds(position, min, max, constant = 0.15) {
  if (constant === 0) return clamp(position, min, max);
  if (position < min) return -rubberband(min - position, max - min, constant) + min;
  if (position > max) return +rubberband(position - max, max - min, constant) + max;
  return position;
}
function computeRubberband(bounds, [Vx, Vy], [Rx, Ry]) {
  const [[X0, X1], [Y0, Y1]] = bounds;
  return [rubberbandIfOutOfBounds(Vx, X0, X1, Rx), rubberbandIfOutOfBounds(Vy, Y0, Y1, Ry)];
}

// node_modules/@use-gesture/core/dist/actions-fe213e88.esm.js
function _toPrimitive(input, hint) {
  if (typeof input !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (typeof res !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return typeof key === "symbol" ? key : String(key);
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function ownKeys(e2, r2) {
  var t2 = Object.keys(e2);
  if (Object.getOwnPropertySymbols) {
    var o2 = Object.getOwnPropertySymbols(e2);
    r2 && (o2 = o2.filter(function(r3) {
      return Object.getOwnPropertyDescriptor(e2, r3).enumerable;
    })), t2.push.apply(t2, o2);
  }
  return t2;
}
function _objectSpread2(e2) {
  for (var r2 = 1; r2 < arguments.length; r2++) {
    var t2 = null != arguments[r2] ? arguments[r2] : {};
    r2 % 2 ? ownKeys(Object(t2), true).forEach(function(r3) {
      _defineProperty(e2, r3, t2[r3]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e2, Object.getOwnPropertyDescriptors(t2)) : ownKeys(Object(t2)).forEach(function(r3) {
      Object.defineProperty(e2, r3, Object.getOwnPropertyDescriptor(t2, r3));
    });
  }
  return e2;
}
var EVENT_TYPE_MAP = {
  pointer: {
    start: "down",
    change: "move",
    end: "up"
  },
  mouse: {
    start: "down",
    change: "move",
    end: "up"
  },
  touch: {
    start: "start",
    change: "move",
    end: "end"
  },
  gesture: {
    start: "start",
    change: "change",
    end: "end"
  }
};
function capitalize(string) {
  if (!string) return "";
  return string[0].toUpperCase() + string.slice(1);
}
var actionsWithoutCaptureSupported = ["enter", "leave"];
function hasCapture(capture = false, actionKey) {
  return capture && !actionsWithoutCaptureSupported.includes(actionKey);
}
function toHandlerProp(device, action = "", capture = false) {
  const deviceProps = EVENT_TYPE_MAP[device];
  const actionKey = deviceProps ? deviceProps[action] || action : action;
  return "on" + capitalize(device) + capitalize(actionKey) + (hasCapture(capture, actionKey) ? "Capture" : "");
}
var pointerCaptureEvents = ["gotpointercapture", "lostpointercapture"];
function parseProp(prop) {
  let eventKey = prop.substring(2).toLowerCase();
  const passive = !!~eventKey.indexOf("passive");
  if (passive) eventKey = eventKey.replace("passive", "");
  const captureKey = pointerCaptureEvents.includes(eventKey) ? "capturecapture" : "capture";
  const capture = !!~eventKey.indexOf(captureKey);
  if (capture) eventKey = eventKey.replace("capture", "");
  return {
    device: eventKey,
    capture,
    passive
  };
}
function toDomEventType(device, action = "") {
  const deviceProps = EVENT_TYPE_MAP[device];
  const actionKey = deviceProps ? deviceProps[action] || action : action;
  return device + actionKey;
}
function isTouch(event) {
  return "touches" in event;
}
function getPointerType(event) {
  if (isTouch(event)) return "touch";
  if ("pointerType" in event) return event.pointerType;
  return "mouse";
}
function getCurrentTargetTouchList(event) {
  return Array.from(event.touches).filter((e2) => {
    var _event$currentTarget, _event$currentTarget$;
    return e2.target === event.currentTarget || ((_event$currentTarget = event.currentTarget) === null || _event$currentTarget === void 0 || (_event$currentTarget$ = _event$currentTarget.contains) === null || _event$currentTarget$ === void 0 ? void 0 : _event$currentTarget$.call(_event$currentTarget, e2.target));
  });
}
function getTouchList(event) {
  return event.type === "touchend" || event.type === "touchcancel" ? event.changedTouches : event.targetTouches;
}
function getValueEvent(event) {
  return isTouch(event) ? getTouchList(event)[0] : event;
}
function distanceAngle(P1, P2) {
  try {
    const dx = P2.clientX - P1.clientX;
    const dy = P2.clientY - P1.clientY;
    const cx = (P2.clientX + P1.clientX) / 2;
    const cy = (P2.clientY + P1.clientY) / 2;
    const distance3 = Math.hypot(dx, dy);
    const angle = -(Math.atan2(dx, dy) * 180) / Math.PI;
    const origin2 = [cx, cy];
    return {
      angle,
      distance: distance3,
      origin: origin2
    };
  } catch (_unused) {
  }
  return null;
}
function touchIds(event) {
  return getCurrentTargetTouchList(event).map((touch) => touch.identifier);
}
function touchDistanceAngle(event, ids) {
  const [P1, P2] = Array.from(event.touches).filter((touch) => ids.includes(touch.identifier));
  return distanceAngle(P1, P2);
}
function pointerId(event) {
  const valueEvent = getValueEvent(event);
  return isTouch(event) ? valueEvent.identifier : valueEvent.pointerId;
}
function pointerValues(event) {
  const valueEvent = getValueEvent(event);
  return [valueEvent.clientX, valueEvent.clientY];
}
var LINE_HEIGHT = 40;
var PAGE_HEIGHT = 800;
function wheelValues(event) {
  let {
    deltaX,
    deltaY,
    deltaMode
  } = event;
  if (deltaMode === 1) {
    deltaX *= LINE_HEIGHT;
    deltaY *= LINE_HEIGHT;
  } else if (deltaMode === 2) {
    deltaX *= PAGE_HEIGHT;
    deltaY *= PAGE_HEIGHT;
  }
  return [deltaX, deltaY];
}
function scrollValues(event) {
  var _ref, _ref2;
  const {
    scrollX,
    scrollY,
    scrollLeft,
    scrollTop
  } = event.currentTarget;
  return [(_ref = scrollX !== null && scrollX !== void 0 ? scrollX : scrollLeft) !== null && _ref !== void 0 ? _ref : 0, (_ref2 = scrollY !== null && scrollY !== void 0 ? scrollY : scrollTop) !== null && _ref2 !== void 0 ? _ref2 : 0];
}
function getEventDetails(event) {
  const payload = {};
  if ("buttons" in event) payload.buttons = event.buttons;
  if ("shiftKey" in event) {
    const {
      shiftKey,
      altKey,
      metaKey,
      ctrlKey
    } = event;
    Object.assign(payload, {
      shiftKey,
      altKey,
      metaKey,
      ctrlKey
    });
  }
  return payload;
}
function call(v, ...args) {
  if (typeof v === "function") {
    return v(...args);
  } else {
    return v;
  }
}
function noop() {
}
function chain(...fns) {
  if (fns.length === 0) return noop;
  if (fns.length === 1) return fns[0];
  return function() {
    let result;
    for (const fn of fns) {
      result = fn.apply(this, arguments) || result;
    }
    return result;
  };
}
function assignDefault(value, fallback) {
  return Object.assign({}, fallback, value || {});
}
var BEFORE_LAST_KINEMATICS_DELAY = 32;
var Engine = class {
  constructor(ctrl, args, key) {
    this.ctrl = ctrl;
    this.args = args;
    this.key = key;
    if (!this.state) {
      this.state = {};
      this.computeValues([0, 0]);
      this.computeInitial();
      if (this.init) this.init();
      this.reset();
    }
  }
  get state() {
    return this.ctrl.state[this.key];
  }
  set state(state) {
    this.ctrl.state[this.key] = state;
  }
  get shared() {
    return this.ctrl.state.shared;
  }
  get eventStore() {
    return this.ctrl.gestureEventStores[this.key];
  }
  get timeoutStore() {
    return this.ctrl.gestureTimeoutStores[this.key];
  }
  get config() {
    return this.ctrl.config[this.key];
  }
  get sharedConfig() {
    return this.ctrl.config.shared;
  }
  get handler() {
    return this.ctrl.handlers[this.key];
  }
  reset() {
    const {
      state,
      shared,
      ingKey,
      args
    } = this;
    shared[ingKey] = state._active = state.active = state._blocked = state._force = false;
    state._step = [false, false];
    state.intentional = false;
    state._movement = [0, 0];
    state._distance = [0, 0];
    state._direction = [0, 0];
    state._delta = [0, 0];
    state._bounds = [[-Infinity, Infinity], [-Infinity, Infinity]];
    state.args = args;
    state.axis = void 0;
    state.memo = void 0;
    state.elapsedTime = state.timeDelta = 0;
    state.direction = [0, 0];
    state.distance = [0, 0];
    state.overflow = [0, 0];
    state._movementBound = [false, false];
    state.velocity = [0, 0];
    state.movement = [0, 0];
    state.delta = [0, 0];
    state.timeStamp = 0;
  }
  start(event) {
    const state = this.state;
    const config = this.config;
    if (!state._active) {
      this.reset();
      this.computeInitial();
      state._active = true;
      state.target = event.target;
      state.currentTarget = event.currentTarget;
      state.lastOffset = config.from ? call(config.from, state) : state.offset;
      state.offset = state.lastOffset;
      state.startTime = state.timeStamp = event.timeStamp;
    }
  }
  computeValues(values) {
    const state = this.state;
    state._values = values;
    state.values = this.config.transform(values);
  }
  computeInitial() {
    const state = this.state;
    state._initial = state._values;
    state.initial = state.values;
  }
  compute(event) {
    const {
      state,
      config,
      shared
    } = this;
    state.args = this.args;
    let dt = 0;
    if (event) {
      state.event = event;
      if (config.preventDefault && event.cancelable) state.event.preventDefault();
      state.type = event.type;
      shared.touches = this.ctrl.pointerIds.size || this.ctrl.touchIds.size;
      shared.locked = !!document.pointerLockElement;
      Object.assign(shared, getEventDetails(event));
      shared.down = shared.pressed = shared.buttons % 2 === 1 || shared.touches > 0;
      dt = event.timeStamp - state.timeStamp;
      state.timeStamp = event.timeStamp;
      state.elapsedTime = state.timeStamp - state.startTime;
    }
    if (state._active) {
      const _absoluteDelta = state._delta.map(Math.abs);
      V.addTo(state._distance, _absoluteDelta);
    }
    if (this.axisIntent) this.axisIntent(event);
    const [_m0, _m12] = state._movement;
    const [t0, t1] = config.threshold;
    const {
      _step,
      values
    } = state;
    if (config.hasCustomTransform) {
      if (_step[0] === false) _step[0] = Math.abs(_m0) >= t0 && values[0];
      if (_step[1] === false) _step[1] = Math.abs(_m12) >= t1 && values[1];
    } else {
      if (_step[0] === false) _step[0] = Math.abs(_m0) >= t0 && Math.sign(_m0) * t0;
      if (_step[1] === false) _step[1] = Math.abs(_m12) >= t1 && Math.sign(_m12) * t1;
    }
    state.intentional = _step[0] !== false || _step[1] !== false;
    if (!state.intentional) return;
    const movement = [0, 0];
    if (config.hasCustomTransform) {
      const [v0, v1] = values;
      movement[0] = _step[0] !== false ? v0 - _step[0] : 0;
      movement[1] = _step[1] !== false ? v1 - _step[1] : 0;
    } else {
      movement[0] = _step[0] !== false ? _m0 - _step[0] : 0;
      movement[1] = _step[1] !== false ? _m12 - _step[1] : 0;
    }
    if (this.restrictToAxis && !state._blocked) this.restrictToAxis(movement);
    const previousOffset = state.offset;
    const gestureIsActive = state._active && !state._blocked || state.active;
    if (gestureIsActive) {
      state.first = state._active && !state.active;
      state.last = !state._active && state.active;
      state.active = shared[this.ingKey] = state._active;
      if (event) {
        if (state.first) {
          if ("bounds" in config) state._bounds = call(config.bounds, state);
          if (this.setup) this.setup();
        }
        state.movement = movement;
        this.computeOffset();
      }
    }
    const [ox, oy] = state.offset;
    const [[x0, x1], [y0, y1]] = state._bounds;
    state.overflow = [ox < x0 ? -1 : ox > x1 ? 1 : 0, oy < y0 ? -1 : oy > y1 ? 1 : 0];
    state._movementBound[0] = state.overflow[0] ? state._movementBound[0] === false ? state._movement[0] : state._movementBound[0] : false;
    state._movementBound[1] = state.overflow[1] ? state._movementBound[1] === false ? state._movement[1] : state._movementBound[1] : false;
    const rubberband2 = state._active ? config.rubberband || [0, 0] : [0, 0];
    state.offset = computeRubberband(state._bounds, state.offset, rubberband2);
    state.delta = V.sub(state.offset, previousOffset);
    this.computeMovement();
    if (gestureIsActive && (!state.last || dt > BEFORE_LAST_KINEMATICS_DELAY)) {
      state.delta = V.sub(state.offset, previousOffset);
      const absoluteDelta = state.delta.map(Math.abs);
      V.addTo(state.distance, absoluteDelta);
      state.direction = state.delta.map(Math.sign);
      state._direction = state._delta.map(Math.sign);
      if (!state.first && dt > 0) {
        state.velocity = [absoluteDelta[0] / dt, absoluteDelta[1] / dt];
        state.timeDelta = dt;
      }
    }
  }
  emit() {
    const state = this.state;
    const shared = this.shared;
    const config = this.config;
    if (!state._active) this.clean();
    if ((state._blocked || !state.intentional) && !state._force && !config.triggerAllEvents) return;
    const memo = this.handler(_objectSpread2(_objectSpread2(_objectSpread2({}, shared), state), {}, {
      [this.aliasKey]: state.values
    }));
    if (memo !== void 0) state.memo = memo;
  }
  clean() {
    this.eventStore.clean();
    this.timeoutStore.clean();
  }
};
function selectAxis([dx, dy], threshold) {
  const absDx = Math.abs(dx);
  const absDy = Math.abs(dy);
  if (absDx > absDy && absDx > threshold) {
    return "x";
  }
  if (absDy > absDx && absDy > threshold) {
    return "y";
  }
  return void 0;
}
var CoordinatesEngine = class extends Engine {
  constructor(...args) {
    super(...args);
    _defineProperty(this, "aliasKey", "xy");
  }
  reset() {
    super.reset();
    this.state.axis = void 0;
  }
  init() {
    this.state.offset = [0, 0];
    this.state.lastOffset = [0, 0];
  }
  computeOffset() {
    this.state.offset = V.add(this.state.lastOffset, this.state.movement);
  }
  computeMovement() {
    this.state.movement = V.sub(this.state.offset, this.state.lastOffset);
  }
  axisIntent(event) {
    const state = this.state;
    const config = this.config;
    if (!state.axis && event) {
      const threshold = typeof config.axisThreshold === "object" ? config.axisThreshold[getPointerType(event)] : config.axisThreshold;
      state.axis = selectAxis(state._movement, threshold);
    }
    state._blocked = (config.lockDirection || !!config.axis) && !state.axis || !!config.axis && config.axis !== state.axis;
  }
  restrictToAxis(v) {
    if (this.config.axis || this.config.lockDirection) {
      switch (this.state.axis) {
        case "x":
          v[1] = 0;
          break;
        case "y":
          v[0] = 0;
          break;
      }
    }
  }
};
var identity = (v) => v;
var DEFAULT_RUBBERBAND = 0.15;
var commonConfigResolver = {
  enabled(value = true) {
    return value;
  },
  eventOptions(value, _k, config) {
    return _objectSpread2(_objectSpread2({}, config.shared.eventOptions), value);
  },
  preventDefault(value = false) {
    return value;
  },
  triggerAllEvents(value = false) {
    return value;
  },
  rubberband(value = 0) {
    switch (value) {
      case true:
        return [DEFAULT_RUBBERBAND, DEFAULT_RUBBERBAND];
      case false:
        return [0, 0];
      default:
        return V.toVector(value);
    }
  },
  from(value) {
    if (typeof value === "function") return value;
    if (value != null) return V.toVector(value);
  },
  transform(value, _k, config) {
    const transform = value || config.shared.transform;
    this.hasCustomTransform = !!transform;
    if (true) {
      const originalTransform = transform || identity;
      return (v) => {
        const r2 = originalTransform(v);
        if (!isFinite(r2[0]) || !isFinite(r2[1])) {
          console.warn(`[@use-gesture]: config.transform() must produce a valid result, but it was: [${r2[0]},${[1]}]`);
        }
        return r2;
      };
    }
    return transform || identity;
  },
  threshold(value) {
    return V.toVector(value, 0);
  }
};
if (true) {
  Object.assign(commonConfigResolver, {
    domTarget(value) {
      if (value !== void 0) {
        throw Error(`[@use-gesture]: \`domTarget\` option has been renamed to \`target\`.`);
      }
      return NaN;
    },
    lockDirection(value) {
      if (value !== void 0) {
        throw Error(`[@use-gesture]: \`lockDirection\` option has been merged with \`axis\`. Use it as in \`{ axis: 'lock' }\``);
      }
      return NaN;
    },
    initial(value) {
      if (value !== void 0) {
        throw Error(`[@use-gesture]: \`initial\` option has been renamed to \`from\`.`);
      }
      return NaN;
    }
  });
}
var DEFAULT_AXIS_THRESHOLD = 0;
var coordinatesConfigResolver = _objectSpread2(_objectSpread2({}, commonConfigResolver), {}, {
  axis(_v, _k, {
    axis
  }) {
    this.lockDirection = axis === "lock";
    if (!this.lockDirection) return axis;
  },
  axisThreshold(value = DEFAULT_AXIS_THRESHOLD) {
    return value;
  },
  bounds(value = {}) {
    if (typeof value === "function") {
      return (state) => coordinatesConfigResolver.bounds(value(state));
    }
    if ("current" in value) {
      return () => value.current;
    }
    if (typeof HTMLElement === "function" && value instanceof HTMLElement) {
      return value;
    }
    const {
      left = -Infinity,
      right = Infinity,
      top = -Infinity,
      bottom = Infinity
    } = value;
    return [[left, right], [top, bottom]];
  }
});
var KEYS_DELTA_MAP = {
  ArrowRight: (displacement, factor = 1) => [displacement * factor, 0],
  ArrowLeft: (displacement, factor = 1) => [-1 * displacement * factor, 0],
  ArrowUp: (displacement, factor = 1) => [0, -1 * displacement * factor],
  ArrowDown: (displacement, factor = 1) => [0, displacement * factor]
};
var DragEngine = class extends CoordinatesEngine {
  constructor(...args) {
    super(...args);
    _defineProperty(this, "ingKey", "dragging");
  }
  reset() {
    super.reset();
    const state = this.state;
    state._pointerId = void 0;
    state._pointerActive = false;
    state._keyboardActive = false;
    state._preventScroll = false;
    state._delayed = false;
    state.swipe = [0, 0];
    state.tap = false;
    state.canceled = false;
    state.cancel = this.cancel.bind(this);
  }
  setup() {
    const state = this.state;
    if (state._bounds instanceof HTMLElement) {
      const boundRect = state._bounds.getBoundingClientRect();
      const targetRect = state.currentTarget.getBoundingClientRect();
      const _bounds = {
        left: boundRect.left - targetRect.left + state.offset[0],
        right: boundRect.right - targetRect.right + state.offset[0],
        top: boundRect.top - targetRect.top + state.offset[1],
        bottom: boundRect.bottom - targetRect.bottom + state.offset[1]
      };
      state._bounds = coordinatesConfigResolver.bounds(_bounds);
    }
  }
  cancel() {
    const state = this.state;
    if (state.canceled) return;
    state.canceled = true;
    state._active = false;
    setTimeout(() => {
      this.compute();
      this.emit();
    }, 0);
  }
  setActive() {
    this.state._active = this.state._pointerActive || this.state._keyboardActive;
  }
  clean() {
    this.pointerClean();
    this.state._pointerActive = false;
    this.state._keyboardActive = false;
    super.clean();
  }
  pointerDown(event) {
    const config = this.config;
    const state = this.state;
    if (event.buttons != null && (Array.isArray(config.pointerButtons) ? !config.pointerButtons.includes(event.buttons) : config.pointerButtons !== -1 && config.pointerButtons !== event.buttons)) return;
    const ctrlIds = this.ctrl.setEventIds(event);
    if (config.pointerCapture) {
      event.target.setPointerCapture(event.pointerId);
    }
    if (ctrlIds && ctrlIds.size > 1 && state._pointerActive) return;
    this.start(event);
    this.setupPointer(event);
    state._pointerId = pointerId(event);
    state._pointerActive = true;
    this.computeValues(pointerValues(event));
    this.computeInitial();
    if (config.preventScrollAxis && getPointerType(event) !== "mouse") {
      state._active = false;
      this.setupScrollPrevention(event);
    } else if (config.delay > 0) {
      this.setupDelayTrigger(event);
      if (config.triggerAllEvents) {
        this.compute(event);
        this.emit();
      }
    } else {
      this.startPointerDrag(event);
    }
  }
  startPointerDrag(event) {
    const state = this.state;
    state._active = true;
    state._preventScroll = true;
    state._delayed = false;
    this.compute(event);
    this.emit();
  }
  pointerMove(event) {
    const state = this.state;
    const config = this.config;
    if (!state._pointerActive) return;
    const id = pointerId(event);
    if (state._pointerId !== void 0 && id !== state._pointerId) return;
    const _values = pointerValues(event);
    if (document.pointerLockElement === event.target) {
      state._delta = [event.movementX, event.movementY];
    } else {
      state._delta = V.sub(_values, state._values);
      this.computeValues(_values);
    }
    V.addTo(state._movement, state._delta);
    this.compute(event);
    if (state._delayed && state.intentional) {
      this.timeoutStore.remove("dragDelay");
      state.active = false;
      this.startPointerDrag(event);
      return;
    }
    if (config.preventScrollAxis && !state._preventScroll) {
      if (state.axis) {
        if (state.axis === config.preventScrollAxis || config.preventScrollAxis === "xy") {
          state._active = false;
          this.clean();
          return;
        } else {
          this.timeoutStore.remove("startPointerDrag");
          this.startPointerDrag(event);
          return;
        }
      } else {
        return;
      }
    }
    this.emit();
  }
  pointerUp(event) {
    this.ctrl.setEventIds(event);
    try {
      if (this.config.pointerCapture && event.target.hasPointerCapture(event.pointerId)) {
        ;
        event.target.releasePointerCapture(event.pointerId);
      }
    } catch (_unused) {
      if (true) {
        console.warn(`[@use-gesture]: If you see this message, it's likely that you're using an outdated version of \`@react-three/fiber\`. 

Please upgrade to the latest version.`);
      }
    }
    const state = this.state;
    const config = this.config;
    if (!state._active || !state._pointerActive) return;
    const id = pointerId(event);
    if (state._pointerId !== void 0 && id !== state._pointerId) return;
    this.state._pointerActive = false;
    this.setActive();
    this.compute(event);
    const [dx, dy] = state._distance;
    state.tap = dx <= config.tapsThreshold && dy <= config.tapsThreshold;
    if (state.tap && config.filterTaps) {
      state._force = true;
    } else {
      const [_dx, _dy] = state._delta;
      const [_mx, _my] = state._movement;
      const [svx, svy] = config.swipe.velocity;
      const [sx, sy] = config.swipe.distance;
      const sdt = config.swipe.duration;
      if (state.elapsedTime < sdt) {
        const _vx = Math.abs(_dx / state.timeDelta);
        const _vy = Math.abs(_dy / state.timeDelta);
        if (_vx > svx && Math.abs(_mx) > sx) state.swipe[0] = Math.sign(_dx);
        if (_vy > svy && Math.abs(_my) > sy) state.swipe[1] = Math.sign(_dy);
      }
    }
    this.emit();
  }
  pointerClick(event) {
    if (!this.state.tap && event.detail > 0) {
      event.preventDefault();
      event.stopPropagation();
    }
  }
  setupPointer(event) {
    const config = this.config;
    const device = config.device;
    if (true) {
      try {
        if (device === "pointer" && config.preventScrollDelay === void 0) {
          const currentTarget = "uv" in event ? event.sourceEvent.currentTarget : event.currentTarget;
          const style = window.getComputedStyle(currentTarget);
          if (style.touchAction === "auto") {
            console.warn(`[@use-gesture]: The drag target has its \`touch-action\` style property set to \`auto\`. It is recommended to add \`touch-action: 'none'\` so that the drag gesture behaves correctly on touch-enabled devices. For more information read this: https://use-gesture.netlify.app/docs/extras/#touch-action.

This message will only show in development mode. It won't appear in production. If this is intended, you can ignore it.`, currentTarget);
          }
        }
      } catch (_unused2) {
      }
    }
    if (config.pointerLock) {
      event.currentTarget.requestPointerLock();
    }
    if (!config.pointerCapture) {
      this.eventStore.add(this.sharedConfig.window, device, "change", this.pointerMove.bind(this));
      this.eventStore.add(this.sharedConfig.window, device, "end", this.pointerUp.bind(this));
      this.eventStore.add(this.sharedConfig.window, device, "cancel", this.pointerUp.bind(this));
    }
  }
  pointerClean() {
    if (this.config.pointerLock && document.pointerLockElement === this.state.currentTarget) {
      document.exitPointerLock();
    }
  }
  preventScroll(event) {
    if (this.state._preventScroll && event.cancelable) {
      event.preventDefault();
    }
  }
  setupScrollPrevention(event) {
    this.state._preventScroll = false;
    persistEvent(event);
    const remove = this.eventStore.add(this.sharedConfig.window, "touch", "change", this.preventScroll.bind(this), {
      passive: false
    });
    this.eventStore.add(this.sharedConfig.window, "touch", "end", remove);
    this.eventStore.add(this.sharedConfig.window, "touch", "cancel", remove);
    this.timeoutStore.add("startPointerDrag", this.startPointerDrag.bind(this), this.config.preventScrollDelay, event);
  }
  setupDelayTrigger(event) {
    this.state._delayed = true;
    this.timeoutStore.add("dragDelay", () => {
      this.state._step = [0, 0];
      this.startPointerDrag(event);
    }, this.config.delay);
  }
  keyDown(event) {
    const deltaFn = KEYS_DELTA_MAP[event.key];
    if (deltaFn) {
      const state = this.state;
      const factor = event.shiftKey ? 10 : event.altKey ? 0.1 : 1;
      this.start(event);
      state._delta = deltaFn(this.config.keyboardDisplacement, factor);
      state._keyboardActive = true;
      V.addTo(state._movement, state._delta);
      this.compute(event);
      this.emit();
    }
  }
  keyUp(event) {
    if (!(event.key in KEYS_DELTA_MAP)) return;
    this.state._keyboardActive = false;
    this.setActive();
    this.compute(event);
    this.emit();
  }
  bind(bindFunction) {
    const device = this.config.device;
    bindFunction(device, "start", this.pointerDown.bind(this));
    if (this.config.pointerCapture) {
      bindFunction(device, "change", this.pointerMove.bind(this));
      bindFunction(device, "end", this.pointerUp.bind(this));
      bindFunction(device, "cancel", this.pointerUp.bind(this));
      bindFunction("lostPointerCapture", "", this.pointerUp.bind(this));
    }
    if (this.config.keys) {
      bindFunction("key", "down", this.keyDown.bind(this));
      bindFunction("key", "up", this.keyUp.bind(this));
    }
    if (this.config.filterTaps) {
      bindFunction("click", "", this.pointerClick.bind(this), {
        capture: true,
        passive: false
      });
    }
  }
};
function persistEvent(event) {
  "persist" in event && typeof event.persist === "function" && event.persist();
}
var isBrowser = typeof window !== "undefined" && window.document && window.document.createElement;
function supportsTouchEvents() {
  return isBrowser && "ontouchstart" in window;
}
function isTouchScreen() {
  return supportsTouchEvents() || isBrowser && window.navigator.maxTouchPoints > 1;
}
function supportsPointerEvents() {
  return isBrowser && "onpointerdown" in window;
}
function supportsPointerLock() {
  return isBrowser && "exitPointerLock" in window.document;
}
function supportsGestureEvents() {
  try {
    return "constructor" in GestureEvent;
  } catch (e2) {
    return false;
  }
}
var SUPPORT = {
  isBrowser,
  gesture: supportsGestureEvents(),
  touch: supportsTouchEvents(),
  touchscreen: isTouchScreen(),
  pointer: supportsPointerEvents(),
  pointerLock: supportsPointerLock()
};
var DEFAULT_PREVENT_SCROLL_DELAY = 250;
var DEFAULT_DRAG_DELAY = 180;
var DEFAULT_SWIPE_VELOCITY = 0.5;
var DEFAULT_SWIPE_DISTANCE = 50;
var DEFAULT_SWIPE_DURATION = 250;
var DEFAULT_KEYBOARD_DISPLACEMENT = 10;
var DEFAULT_DRAG_AXIS_THRESHOLD = {
  mouse: 0,
  touch: 0,
  pen: 8
};
var dragConfigResolver = _objectSpread2(_objectSpread2({}, coordinatesConfigResolver), {}, {
  device(_v, _k, {
    pointer: {
      touch = false,
      lock = false,
      mouse = false
    } = {}
  }) {
    this.pointerLock = lock && SUPPORT.pointerLock;
    if (SUPPORT.touch && touch) return "touch";
    if (this.pointerLock) return "mouse";
    if (SUPPORT.pointer && !mouse) return "pointer";
    if (SUPPORT.touch) return "touch";
    return "mouse";
  },
  preventScrollAxis(value, _k, {
    preventScroll
  }) {
    this.preventScrollDelay = typeof preventScroll === "number" ? preventScroll : preventScroll || preventScroll === void 0 && value ? DEFAULT_PREVENT_SCROLL_DELAY : void 0;
    if (!SUPPORT.touchscreen || preventScroll === false) return void 0;
    return value ? value : preventScroll !== void 0 ? "y" : void 0;
  },
  pointerCapture(_v, _k, {
    pointer: {
      capture = true,
      buttons = 1,
      keys = true
    } = {}
  }) {
    this.pointerButtons = buttons;
    this.keys = keys;
    return !this.pointerLock && this.device === "pointer" && capture;
  },
  threshold(value, _k, {
    filterTaps = false,
    tapsThreshold = 3,
    axis = void 0
  }) {
    const threshold = V.toVector(value, filterTaps ? tapsThreshold : axis ? 1 : 0);
    this.filterTaps = filterTaps;
    this.tapsThreshold = tapsThreshold;
    return threshold;
  },
  swipe({
    velocity = DEFAULT_SWIPE_VELOCITY,
    distance: distance3 = DEFAULT_SWIPE_DISTANCE,
    duration = DEFAULT_SWIPE_DURATION
  } = {}) {
    return {
      velocity: this.transform(V.toVector(velocity)),
      distance: this.transform(V.toVector(distance3)),
      duration
    };
  },
  delay(value = 0) {
    switch (value) {
      case true:
        return DEFAULT_DRAG_DELAY;
      case false:
        return 0;
      default:
        return value;
    }
  },
  axisThreshold(value) {
    if (!value) return DEFAULT_DRAG_AXIS_THRESHOLD;
    return _objectSpread2(_objectSpread2({}, DEFAULT_DRAG_AXIS_THRESHOLD), value);
  },
  keyboardDisplacement(value = DEFAULT_KEYBOARD_DISPLACEMENT) {
    return value;
  }
});
if (true) {
  Object.assign(dragConfigResolver, {
    useTouch(value) {
      if (value !== void 0) {
        throw Error(`[@use-gesture]: \`useTouch\` option has been renamed to \`pointer.touch\`. Use it as in \`{ pointer: { touch: true } }\`.`);
      }
      return NaN;
    },
    experimental_preventWindowScrollY(value) {
      if (value !== void 0) {
        throw Error(`[@use-gesture]: \`experimental_preventWindowScrollY\` option has been renamed to \`preventScroll\`.`);
      }
      return NaN;
    },
    swipeVelocity(value) {
      if (value !== void 0) {
        throw Error(`[@use-gesture]: \`swipeVelocity\` option has been renamed to \`swipe.velocity\`. Use it as in \`{ swipe: { velocity: 0.5 } }\`.`);
      }
      return NaN;
    },
    swipeDistance(value) {
      if (value !== void 0) {
        throw Error(`[@use-gesture]: \`swipeDistance\` option has been renamed to \`swipe.distance\`. Use it as in \`{ swipe: { distance: 50 } }\`.`);
      }
      return NaN;
    },
    swipeDuration(value) {
      if (value !== void 0) {
        throw Error(`[@use-gesture]: \`swipeDuration\` option has been renamed to \`swipe.duration\`. Use it as in \`{ swipe: { duration: 250 } }\`.`);
      }
      return NaN;
    }
  });
}
function clampStateInternalMovementToBounds(state) {
  const [ox, oy] = state.overflow;
  const [dx, dy] = state._delta;
  const [dirx, diry] = state._direction;
  if (ox < 0 && dx > 0 && dirx < 0 || ox > 0 && dx < 0 && dirx > 0) {
    state._movement[0] = state._movementBound[0];
  }
  if (oy < 0 && dy > 0 && diry < 0 || oy > 0 && dy < 0 && diry > 0) {
    state._movement[1] = state._movementBound[1];
  }
}
var SCALE_ANGLE_RATIO_INTENT_DEG = 30;
var PINCH_WHEEL_RATIO = 100;
var PinchEngine = class extends Engine {
  constructor(...args) {
    super(...args);
    _defineProperty(this, "ingKey", "pinching");
    _defineProperty(this, "aliasKey", "da");
  }
  init() {
    this.state.offset = [1, 0];
    this.state.lastOffset = [1, 0];
    this.state._pointerEvents = /* @__PURE__ */ new Map();
  }
  reset() {
    super.reset();
    const state = this.state;
    state._touchIds = [];
    state.canceled = false;
    state.cancel = this.cancel.bind(this);
    state.turns = 0;
  }
  computeOffset() {
    const {
      type,
      movement,
      lastOffset
    } = this.state;
    if (type === "wheel") {
      this.state.offset = V.add(movement, lastOffset);
    } else {
      this.state.offset = [(1 + movement[0]) * lastOffset[0], movement[1] + lastOffset[1]];
    }
  }
  computeMovement() {
    const {
      offset,
      lastOffset
    } = this.state;
    this.state.movement = [offset[0] / lastOffset[0], offset[1] - lastOffset[1]];
  }
  axisIntent() {
    const state = this.state;
    const [_m0, _m12] = state._movement;
    if (!state.axis) {
      const axisMovementDifference = Math.abs(_m0) * SCALE_ANGLE_RATIO_INTENT_DEG - Math.abs(_m12);
      if (axisMovementDifference < 0) state.axis = "angle";
      else if (axisMovementDifference > 0) state.axis = "scale";
    }
  }
  restrictToAxis(v) {
    if (this.config.lockDirection) {
      if (this.state.axis === "scale") v[1] = 0;
      else if (this.state.axis === "angle") v[0] = 0;
    }
  }
  cancel() {
    const state = this.state;
    if (state.canceled) return;
    setTimeout(() => {
      state.canceled = true;
      state._active = false;
      this.compute();
      this.emit();
    }, 0);
  }
  touchStart(event) {
    this.ctrl.setEventIds(event);
    const state = this.state;
    const ctrlTouchIds = this.ctrl.touchIds;
    if (state._active) {
      if (state._touchIds.every((id) => ctrlTouchIds.has(id))) return;
    }
    if (ctrlTouchIds.size < 2) return;
    this.start(event);
    state._touchIds = Array.from(ctrlTouchIds).slice(0, 2);
    const payload = touchDistanceAngle(event, state._touchIds);
    if (!payload) return;
    this.pinchStart(event, payload);
  }
  pointerStart(event) {
    if (event.buttons != null && event.buttons % 2 !== 1) return;
    this.ctrl.setEventIds(event);
    event.target.setPointerCapture(event.pointerId);
    const state = this.state;
    const _pointerEvents = state._pointerEvents;
    const ctrlPointerIds = this.ctrl.pointerIds;
    if (state._active) {
      if (Array.from(_pointerEvents.keys()).every((id) => ctrlPointerIds.has(id))) return;
    }
    if (_pointerEvents.size < 2) {
      _pointerEvents.set(event.pointerId, event);
    }
    if (state._pointerEvents.size < 2) return;
    this.start(event);
    const payload = distanceAngle(...Array.from(_pointerEvents.values()));
    if (!payload) return;
    this.pinchStart(event, payload);
  }
  pinchStart(event, payload) {
    const state = this.state;
    state.origin = payload.origin;
    this.computeValues([payload.distance, payload.angle]);
    this.computeInitial();
    this.compute(event);
    this.emit();
  }
  touchMove(event) {
    if (!this.state._active) return;
    const payload = touchDistanceAngle(event, this.state._touchIds);
    if (!payload) return;
    this.pinchMove(event, payload);
  }
  pointerMove(event) {
    const _pointerEvents = this.state._pointerEvents;
    if (_pointerEvents.has(event.pointerId)) {
      _pointerEvents.set(event.pointerId, event);
    }
    if (!this.state._active) return;
    const payload = distanceAngle(...Array.from(_pointerEvents.values()));
    if (!payload) return;
    this.pinchMove(event, payload);
  }
  pinchMove(event, payload) {
    const state = this.state;
    const prev_a = state._values[1];
    const delta_a = payload.angle - prev_a;
    let delta_turns = 0;
    if (Math.abs(delta_a) > 270) delta_turns += Math.sign(delta_a);
    this.computeValues([payload.distance, payload.angle - 360 * delta_turns]);
    state.origin = payload.origin;
    state.turns = delta_turns;
    state._movement = [state._values[0] / state._initial[0] - 1, state._values[1] - state._initial[1]];
    this.compute(event);
    this.emit();
  }
  touchEnd(event) {
    this.ctrl.setEventIds(event);
    if (!this.state._active) return;
    if (this.state._touchIds.some((id) => !this.ctrl.touchIds.has(id))) {
      this.state._active = false;
      this.compute(event);
      this.emit();
    }
  }
  pointerEnd(event) {
    const state = this.state;
    this.ctrl.setEventIds(event);
    try {
      event.target.releasePointerCapture(event.pointerId);
    } catch (_unused) {
    }
    if (state._pointerEvents.has(event.pointerId)) {
      state._pointerEvents.delete(event.pointerId);
    }
    if (!state._active) return;
    if (state._pointerEvents.size < 2) {
      state._active = false;
      this.compute(event);
      this.emit();
    }
  }
  gestureStart(event) {
    if (event.cancelable) event.preventDefault();
    const state = this.state;
    if (state._active) return;
    this.start(event);
    this.computeValues([event.scale, event.rotation]);
    state.origin = [event.clientX, event.clientY];
    this.compute(event);
    this.emit();
  }
  gestureMove(event) {
    if (event.cancelable) event.preventDefault();
    if (!this.state._active) return;
    const state = this.state;
    this.computeValues([event.scale, event.rotation]);
    state.origin = [event.clientX, event.clientY];
    const _previousMovement = state._movement;
    state._movement = [event.scale - 1, event.rotation];
    state._delta = V.sub(state._movement, _previousMovement);
    this.compute(event);
    this.emit();
  }
  gestureEnd(event) {
    if (!this.state._active) return;
    this.state._active = false;
    this.compute(event);
    this.emit();
  }
  wheel(event) {
    const modifierKey = this.config.modifierKey;
    if (modifierKey && (Array.isArray(modifierKey) ? !modifierKey.find((k) => event[k]) : !event[modifierKey])) return;
    if (!this.state._active) this.wheelStart(event);
    else this.wheelChange(event);
    this.timeoutStore.add("wheelEnd", this.wheelEnd.bind(this));
  }
  wheelStart(event) {
    this.start(event);
    this.wheelChange(event);
  }
  wheelChange(event) {
    const isR3f = "uv" in event;
    if (!isR3f) {
      if (event.cancelable) {
        event.preventDefault();
      }
      if (!event.defaultPrevented) {
        console.warn(`[@use-gesture]: To properly support zoom on trackpads, try using the \`target\` option.

This message will only appear in development mode.`);
      }
    }
    const state = this.state;
    state._delta = [-wheelValues(event)[1] / PINCH_WHEEL_RATIO * state.offset[0], 0];
    V.addTo(state._movement, state._delta);
    clampStateInternalMovementToBounds(state);
    this.state.origin = [event.clientX, event.clientY];
    this.compute(event);
    this.emit();
  }
  wheelEnd() {
    if (!this.state._active) return;
    this.state._active = false;
    this.compute();
    this.emit();
  }
  bind(bindFunction) {
    const device = this.config.device;
    if (!!device) {
      bindFunction(device, "start", this[device + "Start"].bind(this));
      bindFunction(device, "change", this[device + "Move"].bind(this));
      bindFunction(device, "end", this[device + "End"].bind(this));
      bindFunction(device, "cancel", this[device + "End"].bind(this));
      bindFunction("lostPointerCapture", "", this[device + "End"].bind(this));
    }
    if (this.config.pinchOnWheel) {
      bindFunction("wheel", "", this.wheel.bind(this), {
        passive: false
      });
    }
  }
};
var pinchConfigResolver = _objectSpread2(_objectSpread2({}, commonConfigResolver), {}, {
  device(_v, _k, {
    shared,
    pointer: {
      touch = false
    } = {}
  }) {
    const sharedConfig = shared;
    if (sharedConfig.target && !SUPPORT.touch && SUPPORT.gesture) return "gesture";
    if (SUPPORT.touch && touch) return "touch";
    if (SUPPORT.touchscreen) {
      if (SUPPORT.pointer) return "pointer";
      if (SUPPORT.touch) return "touch";
    }
  },
  bounds(_v, _k, {
    scaleBounds = {},
    angleBounds = {}
  }) {
    const _scaleBounds = (state) => {
      const D = assignDefault(call(scaleBounds, state), {
        min: -Infinity,
        max: Infinity
      });
      return [D.min, D.max];
    };
    const _angleBounds = (state) => {
      const A = assignDefault(call(angleBounds, state), {
        min: -Infinity,
        max: Infinity
      });
      return [A.min, A.max];
    };
    if (typeof scaleBounds !== "function" && typeof angleBounds !== "function") return [_scaleBounds(), _angleBounds()];
    return (state) => [_scaleBounds(state), _angleBounds(state)];
  },
  threshold(value, _k, config) {
    this.lockDirection = config.axis === "lock";
    const threshold = V.toVector(value, this.lockDirection ? [0.1, 3] : 0);
    return threshold;
  },
  modifierKey(value) {
    if (value === void 0) return "ctrlKey";
    return value;
  },
  pinchOnWheel(value = true) {
    return value;
  }
});
var MoveEngine = class extends CoordinatesEngine {
  constructor(...args) {
    super(...args);
    _defineProperty(this, "ingKey", "moving");
  }
  move(event) {
    if (this.config.mouseOnly && event.pointerType !== "mouse") return;
    if (!this.state._active) this.moveStart(event);
    else this.moveChange(event);
    this.timeoutStore.add("moveEnd", this.moveEnd.bind(this));
  }
  moveStart(event) {
    this.start(event);
    this.computeValues(pointerValues(event));
    this.compute(event);
    this.computeInitial();
    this.emit();
  }
  moveChange(event) {
    if (!this.state._active) return;
    const values = pointerValues(event);
    const state = this.state;
    state._delta = V.sub(values, state._values);
    V.addTo(state._movement, state._delta);
    this.computeValues(values);
    this.compute(event);
    this.emit();
  }
  moveEnd(event) {
    if (!this.state._active) return;
    this.state._active = false;
    this.compute(event);
    this.emit();
  }
  bind(bindFunction) {
    bindFunction("pointer", "change", this.move.bind(this));
    bindFunction("pointer", "leave", this.moveEnd.bind(this));
  }
};
var moveConfigResolver = _objectSpread2(_objectSpread2({}, coordinatesConfigResolver), {}, {
  mouseOnly: (value = true) => value
});
var ScrollEngine = class extends CoordinatesEngine {
  constructor(...args) {
    super(...args);
    _defineProperty(this, "ingKey", "scrolling");
  }
  scroll(event) {
    if (!this.state._active) this.start(event);
    this.scrollChange(event);
    this.timeoutStore.add("scrollEnd", this.scrollEnd.bind(this));
  }
  scrollChange(event) {
    if (event.cancelable) event.preventDefault();
    const state = this.state;
    const values = scrollValues(event);
    state._delta = V.sub(values, state._values);
    V.addTo(state._movement, state._delta);
    this.computeValues(values);
    this.compute(event);
    this.emit();
  }
  scrollEnd() {
    if (!this.state._active) return;
    this.state._active = false;
    this.compute();
    this.emit();
  }
  bind(bindFunction) {
    bindFunction("scroll", "", this.scroll.bind(this));
  }
};
var scrollConfigResolver = coordinatesConfigResolver;
var WheelEngine = class extends CoordinatesEngine {
  constructor(...args) {
    super(...args);
    _defineProperty(this, "ingKey", "wheeling");
  }
  wheel(event) {
    if (!this.state._active) this.start(event);
    this.wheelChange(event);
    this.timeoutStore.add("wheelEnd", this.wheelEnd.bind(this));
  }
  wheelChange(event) {
    const state = this.state;
    state._delta = wheelValues(event);
    V.addTo(state._movement, state._delta);
    clampStateInternalMovementToBounds(state);
    this.compute(event);
    this.emit();
  }
  wheelEnd() {
    if (!this.state._active) return;
    this.state._active = false;
    this.compute();
    this.emit();
  }
  bind(bindFunction) {
    bindFunction("wheel", "", this.wheel.bind(this));
  }
};
var wheelConfigResolver = coordinatesConfigResolver;
var HoverEngine = class extends CoordinatesEngine {
  constructor(...args) {
    super(...args);
    _defineProperty(this, "ingKey", "hovering");
  }
  enter(event) {
    if (this.config.mouseOnly && event.pointerType !== "mouse") return;
    this.start(event);
    this.computeValues(pointerValues(event));
    this.compute(event);
    this.emit();
  }
  leave(event) {
    if (this.config.mouseOnly && event.pointerType !== "mouse") return;
    const state = this.state;
    if (!state._active) return;
    state._active = false;
    const values = pointerValues(event);
    state._movement = state._delta = V.sub(values, state._values);
    this.computeValues(values);
    this.compute(event);
    state.delta = state.movement;
    this.emit();
  }
  bind(bindFunction) {
    bindFunction("pointer", "enter", this.enter.bind(this));
    bindFunction("pointer", "leave", this.leave.bind(this));
  }
};
var hoverConfigResolver = _objectSpread2(_objectSpread2({}, coordinatesConfigResolver), {}, {
  mouseOnly: (value = true) => value
});
var EngineMap = /* @__PURE__ */ new Map();
var ConfigResolverMap = /* @__PURE__ */ new Map();
function registerAction(action) {
  EngineMap.set(action.key, action.engine);
  ConfigResolverMap.set(action.key, action.resolver);
}
var dragAction = {
  key: "drag",
  engine: DragEngine,
  resolver: dragConfigResolver
};
var hoverAction = {
  key: "hover",
  engine: HoverEngine,
  resolver: hoverConfigResolver
};
var moveAction = {
  key: "move",
  engine: MoveEngine,
  resolver: moveConfigResolver
};
var pinchAction = {
  key: "pinch",
  engine: PinchEngine,
  resolver: pinchConfigResolver
};
var scrollAction = {
  key: "scroll",
  engine: ScrollEngine,
  resolver: scrollConfigResolver
};
var wheelAction = {
  key: "wheel",
  engine: WheelEngine,
  resolver: wheelConfigResolver
};

// node_modules/@use-gesture/react/dist/use-gesture-react.esm.js
var import_react = __toESM(require_react());

// node_modules/@use-gesture/core/dist/use-gesture-core.esm.js
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i2;
  for (i2 = 0; i2 < sourceKeys.length; i2++) {
    key = sourceKeys[i2];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i2;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i2 = 0; i2 < sourceSymbolKeys.length; i2++) {
      key = sourceSymbolKeys[i2];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
var sharedConfigResolver = {
  target(value) {
    if (value) {
      return () => "current" in value ? value.current : value;
    }
    return void 0;
  },
  enabled(value = true) {
    return value;
  },
  window(value = SUPPORT.isBrowser ? window : void 0) {
    return value;
  },
  eventOptions({
    passive = true,
    capture = false
  } = {}) {
    return {
      passive,
      capture
    };
  },
  transform(value) {
    return value;
  }
};
var _excluded = ["target", "eventOptions", "window", "enabled", "transform"];
function resolveWith(config = {}, resolvers) {
  const result = {};
  for (const [key, resolver] of Object.entries(resolvers)) {
    switch (typeof resolver) {
      case "function":
        if (true) {
          const r2 = resolver.call(result, config[key], key, config);
          if (!Number.isNaN(r2)) result[key] = r2;
        } else {
          result[key] = resolver.call(result, config[key], key, config);
        }
        break;
      case "object":
        result[key] = resolveWith(config[key], resolver);
        break;
      case "boolean":
        if (resolver) result[key] = config[key];
        break;
    }
  }
  return result;
}
function parse(newConfig, gestureKey, _config = {}) {
  const _ref = newConfig, {
    target,
    eventOptions,
    window: window2,
    enabled,
    transform
  } = _ref, rest = _objectWithoutProperties(_ref, _excluded);
  _config.shared = resolveWith({
    target,
    eventOptions,
    window: window2,
    enabled,
    transform
  }, sharedConfigResolver);
  if (gestureKey) {
    const resolver = ConfigResolverMap.get(gestureKey);
    _config[gestureKey] = resolveWith(_objectSpread2({
      shared: _config.shared
    }, rest), resolver);
  } else {
    for (const key in rest) {
      const resolver = ConfigResolverMap.get(key);
      if (resolver) {
        _config[key] = resolveWith(_objectSpread2({
          shared: _config.shared
        }, rest[key]), resolver);
      } else if (true) {
        if (!["drag", "pinch", "scroll", "wheel", "move", "hover"].includes(key)) {
          if (key === "domTarget") {
            throw Error(`[@use-gesture]: \`domTarget\` option has been renamed to \`target\`.`);
          }
          console.warn(`[@use-gesture]: Unknown config key \`${key}\` was used. Please read the documentation for further information.`);
        }
      }
    }
  }
  return _config;
}
var EventStore = class {
  constructor(ctrl, gestureKey) {
    _defineProperty(this, "_listeners", /* @__PURE__ */ new Set());
    this._ctrl = ctrl;
    this._gestureKey = gestureKey;
  }
  add(element, device, action, handler, options) {
    const listeners = this._listeners;
    const type = toDomEventType(device, action);
    const _options = this._gestureKey ? this._ctrl.config[this._gestureKey].eventOptions : {};
    const eventOptions = _objectSpread2(_objectSpread2({}, _options), options);
    element.addEventListener(type, handler, eventOptions);
    const remove = () => {
      element.removeEventListener(type, handler, eventOptions);
      listeners.delete(remove);
    };
    listeners.add(remove);
    return remove;
  }
  clean() {
    this._listeners.forEach((remove) => remove());
    this._listeners.clear();
  }
};
var TimeoutStore = class {
  constructor() {
    _defineProperty(this, "_timeouts", /* @__PURE__ */ new Map());
  }
  add(key, callback, ms = 140, ...args) {
    this.remove(key);
    this._timeouts.set(key, window.setTimeout(callback, ms, ...args));
  }
  remove(key) {
    const timeout = this._timeouts.get(key);
    if (timeout) window.clearTimeout(timeout);
  }
  clean() {
    this._timeouts.forEach((timeout) => void window.clearTimeout(timeout));
    this._timeouts.clear();
  }
};
var Controller = class {
  constructor(handlers) {
    _defineProperty(this, "gestures", /* @__PURE__ */ new Set());
    _defineProperty(this, "_targetEventStore", new EventStore(this));
    _defineProperty(this, "gestureEventStores", {});
    _defineProperty(this, "gestureTimeoutStores", {});
    _defineProperty(this, "handlers", {});
    _defineProperty(this, "config", {});
    _defineProperty(this, "pointerIds", /* @__PURE__ */ new Set());
    _defineProperty(this, "touchIds", /* @__PURE__ */ new Set());
    _defineProperty(this, "state", {
      shared: {
        shiftKey: false,
        metaKey: false,
        ctrlKey: false,
        altKey: false
      }
    });
    resolveGestures(this, handlers);
  }
  setEventIds(event) {
    if (isTouch(event)) {
      this.touchIds = new Set(touchIds(event));
      return this.touchIds;
    } else if ("pointerId" in event) {
      if (event.type === "pointerup" || event.type === "pointercancel") this.pointerIds.delete(event.pointerId);
      else if (event.type === "pointerdown") this.pointerIds.add(event.pointerId);
      return this.pointerIds;
    }
  }
  applyHandlers(handlers, nativeHandlers) {
    this.handlers = handlers;
    this.nativeHandlers = nativeHandlers;
  }
  applyConfig(config, gestureKey) {
    this.config = parse(config, gestureKey, this.config);
  }
  clean() {
    this._targetEventStore.clean();
    for (const key of this.gestures) {
      this.gestureEventStores[key].clean();
      this.gestureTimeoutStores[key].clean();
    }
  }
  effect() {
    if (this.config.shared.target) this.bind();
    return () => this._targetEventStore.clean();
  }
  bind(...args) {
    const sharedConfig = this.config.shared;
    const props = {};
    let target;
    if (sharedConfig.target) {
      target = sharedConfig.target();
      if (!target) return;
    }
    if (sharedConfig.enabled) {
      for (const gestureKey of this.gestures) {
        const gestureConfig = this.config[gestureKey];
        const bindFunction = bindToProps(props, gestureConfig.eventOptions, !!target);
        if (gestureConfig.enabled) {
          const Engine2 = EngineMap.get(gestureKey);
          new Engine2(this, args, gestureKey).bind(bindFunction);
        }
      }
      const nativeBindFunction = bindToProps(props, sharedConfig.eventOptions, !!target);
      for (const eventKey in this.nativeHandlers) {
        nativeBindFunction(eventKey, "", (event) => this.nativeHandlers[eventKey](_objectSpread2(_objectSpread2({}, this.state.shared), {}, {
          event,
          args
        })), void 0, true);
      }
    }
    for (const handlerProp in props) {
      props[handlerProp] = chain(...props[handlerProp]);
    }
    if (!target) return props;
    for (const handlerProp in props) {
      const {
        device,
        capture,
        passive
      } = parseProp(handlerProp);
      this._targetEventStore.add(target, device, "", props[handlerProp], {
        capture,
        passive
      });
    }
  }
};
function setupGesture(ctrl, gestureKey) {
  ctrl.gestures.add(gestureKey);
  ctrl.gestureEventStores[gestureKey] = new EventStore(ctrl, gestureKey);
  ctrl.gestureTimeoutStores[gestureKey] = new TimeoutStore();
}
function resolveGestures(ctrl, internalHandlers) {
  if (internalHandlers.drag) setupGesture(ctrl, "drag");
  if (internalHandlers.wheel) setupGesture(ctrl, "wheel");
  if (internalHandlers.scroll) setupGesture(ctrl, "scroll");
  if (internalHandlers.move) setupGesture(ctrl, "move");
  if (internalHandlers.pinch) setupGesture(ctrl, "pinch");
  if (internalHandlers.hover) setupGesture(ctrl, "hover");
}
var bindToProps = (props, eventOptions, withPassiveOption) => (device, action, handler, options = {}, isNative = false) => {
  var _options$capture, _options$passive;
  const capture = (_options$capture = options.capture) !== null && _options$capture !== void 0 ? _options$capture : eventOptions.capture;
  const passive = (_options$passive = options.passive) !== null && _options$passive !== void 0 ? _options$passive : eventOptions.passive;
  let handlerProp = isNative ? device : toHandlerProp(device, action, capture);
  if (withPassiveOption && passive) handlerProp += "Passive";
  props[handlerProp] = props[handlerProp] || [];
  props[handlerProp].push(handler);
};
var RE_NOT_NATIVE = /^on(Drag|Wheel|Scroll|Move|Pinch|Hover)/;
function sortHandlers(_handlers) {
  const native = {};
  const handlers = {};
  const actions = /* @__PURE__ */ new Set();
  for (let key in _handlers) {
    if (RE_NOT_NATIVE.test(key)) {
      actions.add(RegExp.lastMatch);
      handlers[key] = _handlers[key];
    } else {
      native[key] = _handlers[key];
    }
  }
  return [handlers, native, actions];
}
function registerGesture(actions, handlers, handlerKey, key, internalHandlers, config) {
  if (!actions.has(handlerKey)) return;
  if (!EngineMap.has(key)) {
    if (true) {
      console.warn(`[@use-gesture]: You've created a custom handler that that uses the \`${key}\` gesture but isn't properly configured.

Please add \`${key}Action\` when creating your handler.`);
    }
    return;
  }
  const startKey = handlerKey + "Start";
  const endKey = handlerKey + "End";
  const fn = (state) => {
    let memo = void 0;
    if (state.first && startKey in handlers) handlers[startKey](state);
    if (handlerKey in handlers) memo = handlers[handlerKey](state);
    if (state.last && endKey in handlers) handlers[endKey](state);
    return memo;
  };
  internalHandlers[key] = fn;
  config[key] = config[key] || {};
}
function parseMergedHandlers(mergedHandlers, mergedConfig) {
  const [handlers, nativeHandlers, actions] = sortHandlers(mergedHandlers);
  const internalHandlers = {};
  registerGesture(actions, handlers, "onDrag", "drag", internalHandlers, mergedConfig);
  registerGesture(actions, handlers, "onWheel", "wheel", internalHandlers, mergedConfig);
  registerGesture(actions, handlers, "onScroll", "scroll", internalHandlers, mergedConfig);
  registerGesture(actions, handlers, "onPinch", "pinch", internalHandlers, mergedConfig);
  registerGesture(actions, handlers, "onMove", "move", internalHandlers, mergedConfig);
  registerGesture(actions, handlers, "onHover", "hover", internalHandlers, mergedConfig);
  return {
    handlers: internalHandlers,
    config: mergedConfig,
    nativeHandlers
  };
}

// node_modules/@use-gesture/react/dist/use-gesture-react.esm.js
function useRecognizers(handlers, config = {}, gestureKey, nativeHandlers) {
  const ctrl = import_react.default.useMemo(() => new Controller(handlers), []);
  ctrl.applyHandlers(handlers, nativeHandlers);
  ctrl.applyConfig(config, gestureKey);
  import_react.default.useEffect(ctrl.effect.bind(ctrl));
  import_react.default.useEffect(() => {
    return ctrl.clean.bind(ctrl);
  }, []);
  if (config.target === void 0) {
    return ctrl.bind.bind(ctrl);
  }
  return void 0;
}
function createUseGesture(actions) {
  actions.forEach(registerAction);
  return function useGesture2(_handlers, _config) {
    const {
      handlers,
      nativeHandlers,
      config
    } = parseMergedHandlers(_handlers, _config || {});
    return useRecognizers(handlers, config, void 0, nativeHandlers);
  };
}
function useGesture(handlers, config) {
  const hook = createUseGesture([dragAction, pinchAction, scrollAction, wheelAction, moveAction, hoverAction]);
  return hook(handlers, config || {});
}

// node_modules/maath/dist/isNativeReflectConstruct-5594d075.esm.js
function _setPrototypeOf(o2, p2) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o3, p3) {
    o3.__proto__ = p3;
    return o3;
  };
  return _setPrototypeOf(o2, p2);
}
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e2) {
    return false;
  }
}

// node_modules/maath/dist/matrix-baa530bf.esm.js
function determinant2() {
  for (var _len = arguments.length, terms = new Array(_len), _key = 0; _key < _len; _key++) {
    terms[_key] = arguments[_key];
  }
  var a5 = terms[0], b = terms[1], c2 = terms[2], d2 = terms[3];
  return a5 * d2 - b * c2;
}
function determinant3() {
  for (var _len2 = arguments.length, terms = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    terms[_key2] = arguments[_key2];
  }
  var a5 = terms[0], b = terms[1], c2 = terms[2], d2 = terms[3], e2 = terms[4], f2 = terms[5], g = terms[6], h = terms[7], i2 = terms[8];
  return a5 * e2 * i2 + b * f2 * g + c2 * d2 * h - c2 * e2 * g - b * d2 * i2 - a5 * f2 * h;
}
function determinant4() {
  for (var _len3 = arguments.length, terms = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    terms[_key3] = arguments[_key3];
  }
  terms[0];
  terms[1];
  terms[2];
  terms[3];
  terms[4];
  terms[5];
  terms[6];
  terms[7];
  terms[8];
  terms[9];
  terms[10];
  terms[11];
  terms[12];
  terms[13];
  terms[14];
}
function getMinor(matrix2, r2, c2) {
  var _matrixTranspose = matrix2.clone().transpose();
  var x = [];
  var l2 = _matrixTranspose.elements.length;
  var n2 = Math.sqrt(l2);
  for (var i2 = 0; i2 < l2; i2++) {
    var element = _matrixTranspose.elements[i2];
    var row = Math.floor(i2 / n2);
    var col2 = i2 % n2;
    if (row !== r2 - 1 && col2 !== c2 - 1) {
      x.push(element);
    }
  }
  return determinant3.apply(void 0, x);
}
function matrixSum3(m1, m2) {
  var sum = [];
  var m1Array = m1.toArray();
  var m2Array = m2.toArray();
  for (var i2 = 0; i2 < m1Array.length; i2++) {
    sum[i2] = m1Array[i2] + m2Array[i2];
  }
  return new Matrix3().fromArray(sum);
}
var matrix = Object.freeze({
  __proto__: null,
  determinant2,
  determinant3,
  determinant4,
  getMinor,
  matrixSum3
});

// node_modules/maath/dist/triangle-b62b9067.esm.js
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
function _iterableToArrayLimit(arr, i2) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _s, _e;
  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);
      if (i2 && _arr.length === i2) break;
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
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i2 = 0, arr2 = new Array(len); i2 < len; i2++) arr2[i2] = arr[i2];
  return arr2;
}
function _unsupportedIterableToArray(o2, minLen) {
  if (!o2) return;
  if (typeof o2 === "string") return _arrayLikeToArray(o2, minLen);
  var n2 = Object.prototype.toString.call(o2).slice(8, -1);
  if (n2 === "Object" && o2.constructor) n2 = o2.constructor.name;
  if (n2 === "Map" || n2 === "Set") return Array.from(o2);
  if (n2 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n2)) return _arrayLikeToArray(o2, minLen);
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _slicedToArray(arr, i2) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i2) || _unsupportedIterableToArray(arr, i2) || _nonIterableRest();
}
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _construct(Parent, args, Class) {
  if (_isNativeReflectConstruct()) {
    _construct = Reflect.construct;
  } else {
    _construct = function _construct2(Parent2, args2, Class2) {
      var a5 = [null];
      a5.push.apply(a5, args2);
      var Constructor = Function.bind.apply(Parent2, a5);
      var instance = new Constructor();
      if (Class2) _setPrototypeOf(instance, Class2.prototype);
      return instance;
    };
  }
  return _construct.apply(null, arguments);
}
function isPointInTriangle(point, triangle2) {
  var _triangle$ = _slicedToArray(triangle2[0], 2), ax = _triangle$[0], ay = _triangle$[1];
  var _triangle$2 = _slicedToArray(triangle2[1], 2), bx = _triangle$2[0], by = _triangle$2[1];
  var _triangle$3 = _slicedToArray(triangle2[2], 2), cx = _triangle$3[0], cy = _triangle$3[1];
  var _point = _slicedToArray(point, 2), px = _point[0], py = _point[1];
  var matrix2 = new Matrix4();
  matrix2.set(ax, ay, ax * ax + ay * ay, 1, bx, by, bx * bx + by * by, 1, cx, cy, cx * cx + cy * cy, 1, px, py, px * px + py * py, 1);
  return matrix2.determinant() <= 0;
}
function triangleDeterminant(triangle2) {
  var _triangle$4 = _slicedToArray(triangle2[0], 2), x1 = _triangle$4[0], y1 = _triangle$4[1];
  var _triangle$5 = _slicedToArray(triangle2[1], 2), x2 = _triangle$5[0], y2 = _triangle$5[1];
  var _triangle$6 = _slicedToArray(triangle2[2], 2), x3 = _triangle$6[0], y3 = _triangle$6[1];
  return determinant3(x1, y1, 1, x2, y2, 1, x3, y3, 1);
}
function arePointsCollinear(points) {
  return triangleDeterminant(points) === 0;
}
function isTriangleClockwise(triangle2) {
  return triangleDeterminant(triangle2) < 0;
}
function getCircumcircle(triangle2) {
  var _triangle$7 = _slicedToArray(triangle2[0], 2), ax = _triangle$7[0], ay = _triangle$7[1];
  var _triangle$8 = _slicedToArray(triangle2[1], 2), bx = _triangle$8[0], by = _triangle$8[1];
  var _triangle$9 = _slicedToArray(triangle2[2], 2), cx = _triangle$9[0], cy = _triangle$9[1];
  if (arePointsCollinear(triangle2)) return null;
  var m = new Matrix4();
  m.set(1, 1, 1, 1, ax * ax + ay * ay, ax, ay, 1, bx * bx + by * by, bx, by, 1, cx * cx + cy * cy, cx, cy, 1);
  var m11 = getMinor(m, 1, 1);
  var m13 = getMinor(m, 1, 3);
  var m12 = getMinor(m, 1, 2);
  var m14 = getMinor(m, 1, 4);
  var x0 = 0.5 * (m12 / m11);
  var y0 = 0.5 * (m13 / m11);
  var r2 = x0 * x0 + y0 * y0 + m14 / m11;
  return {
    x: Math.abs(x0) === 0 ? 0 : x0,
    y: Math.abs(y0) === 0 ? 0 : -y0,
    r: Math.sqrt(r2)
  };
}
function isPointInCircumcircle(point, triangle2) {
  var _ref = Array.isArray(triangle2[0]) ? triangle2[0] : triangle2[0].toArray(), _ref2 = _slicedToArray(_ref, 2), ax = _ref2[0], ay = _ref2[1];
  var _ref3 = Array.isArray(triangle2[1]) ? triangle2[1] : triangle2[1].toArray(), _ref4 = _slicedToArray(_ref3, 2), bx = _ref4[0], by = _ref4[1];
  var _ref5 = Array.isArray(triangle2[2]) ? triangle2[2] : triangle2[2].toArray(), _ref6 = _slicedToArray(_ref5, 2), cx = _ref6[0], cy = _ref6[1];
  var _point2 = _slicedToArray(point, 2), px = _point2[0], py = _point2[1];
  if (arePointsCollinear(triangle2)) throw new Error("Collinear points don't form a triangle");
  var x1mpx = ax - px;
  var aympy = ay - py;
  var bxmpx = bx - px;
  var bympy = by - py;
  var cxmpx = cx - px;
  var cympy = cy - py;
  var d2 = determinant3(x1mpx, aympy, x1mpx * x1mpx + aympy * aympy, bxmpx, bympy, bxmpx * bxmpx + bympy * bympy, cxmpx, cympy, cxmpx * cxmpx + cympy * cympy);
  if (d2 === 0) {
    return true;
  }
  return !isTriangleClockwise(triangle2) ? d2 > 0 : d2 < 0;
}
var mv1 = new Vector2();
var mv2 = new Vector2();
function doThreePointsMakeARight(points) {
  var _points$map = points.map(function(p4) {
    if (Array.isArray(p4)) {
      return _construct(Vector2, _toConsumableArray(p4));
    }
    return p4;
  }), _points$map2 = _slicedToArray(_points$map, 3), p1 = _points$map2[0], p2 = _points$map2[1], p3 = _points$map2[2];
  if (arePointsCollinear(points)) return false;
  var p2p1 = mv1.subVectors(p2, p1);
  var p3p1 = mv2.subVectors(p3, p1);
  var cross2 = p3p1.cross(p2p1);
  return cross2 > 0;
}
var triangle = Object.freeze({
  __proto__: null,
  isPointInTriangle,
  triangleDeterminant,
  arePointsCollinear,
  isTriangleClockwise,
  getCircumcircle,
  isPointInCircumcircle,
  doThreePointsMakeARight
});

// node_modules/maath/dist/misc-19a3ec46.esm.js
function clamp2(value, min, max) {
  return Math.max(min, Math.min(max, value));
}
function repeat(t2, length3) {
  return clamp2(t2 - Math.floor(t2 / length3) * length3, 0, length3);
}
function deltaAngle(current, target) {
  var delta = repeat(target - current, Math.PI * 2);
  if (delta > Math.PI) delta -= Math.PI * 2;
  return delta;
}
function degToRad(degrees) {
  return degrees / 180 * Math.PI;
}
function radToDeg(radians) {
  return radians * 180 / Math.PI;
}
function fibonacciOnSphere(buffer2, _ref) {
  var _ref$radius = _ref.radius, radius = _ref$radius === void 0 ? 1 : _ref$radius;
  var samples = buffer2.length / 3;
  var offset = 2 / samples;
  var increment = Math.PI * (3 - 2.2360679775);
  for (var i2 = 0; i2 < buffer2.length; i2 += 3) {
    var y = i2 * offset - 1 + offset / 2;
    var distance3 = Math.sqrt(1 - Math.pow(y, 2));
    var phi = i2 % samples * increment;
    var x = Math.cos(phi) * distance3;
    var z = Math.sin(phi) * distance3;
    buffer2[i2] = x * radius;
    buffer2[i2 + 1] = y * radius;
    buffer2[i2 + 2] = z * radius;
  }
}
function vectorEquals(a5, b) {
  var eps = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : Number.EPSILON;
  return Math.abs(a5.x - b.x) < eps && Math.abs(a5.y - b.y) < eps && Math.abs(a5.z - b.z) < eps;
}
function lexicographic(a5, b) {
  if (a5.x === b.x) {
    if (typeof a5.z !== "undefined") {
      if (a5.y === b.y) {
        return a5.z - b.z;
      }
    }
    return a5.y - b.y;
  }
  return a5.x - b.x;
}
function convexHull(_points) {
  var points = _points.sort(lexicographic);
  var lUpper = [points[0], points[1]];
  for (var i2 = 2; i2 < points.length; i2++) {
    lUpper.push(points[i2]);
    while (lUpper.length > 2 && doThreePointsMakeARight(_toConsumableArray(lUpper.slice(-3)))) {
      lUpper.splice(lUpper.length - 2, 1);
    }
  }
  var lLower = [points[points.length - 1], points[points.length - 2]];
  for (var _i = points.length - 3; _i >= 0; _i--) {
    lLower.push(points[_i]);
    while (lLower.length > 2 && doThreePointsMakeARight(_toConsumableArray(lLower.slice(-3)))) {
      lLower.splice(lLower.length - 2, 1);
    }
  }
  lLower.splice(0, 1);
  lLower.splice(lLower.length - 1, 1);
  var c2 = [].concat(lUpper, lLower);
  return c2;
}
function remap(x, _ref2, _ref3) {
  var _ref4 = _slicedToArray(_ref2, 2), low1 = _ref4[0], high1 = _ref4[1];
  var _ref5 = _slicedToArray(_ref3, 2), low2 = _ref5[0], high2 = _ref5[1];
  return low2 + (x - low1) * (high2 - low2) / (high1 - low1);
}
function fade(t2) {
  return t2 * t2 * t2 * (t2 * (t2 * 6 - 15) + 10);
}
function lerp(v0, v1, t2) {
  return v0 * (1 - t2) + v1 * t2;
}
function inverseLerp(v0, v1, t2) {
  return (t2 - v0) / (v1 - v0);
}
function normalize(x, y, z) {
  var m = Math.sqrt(x * x + y * y + z * z);
  return [x / m, y / m, z / m];
}
function pointOnCubeToPointOnSphere(x, y, z) {
  var x2 = x * x;
  var y2 = y * y;
  var z2 = z * z;
  var nx = x * Math.sqrt(1 - (y2 + z2) / 2 + y2 * z2 / 3);
  var ny = y * Math.sqrt(1 - (z2 + x2) / 2 + z2 * x2 / 3);
  var nz = z * Math.sqrt(1 - (x2 + y2) / 2 + x2 * y2 / 3);
  return [nx, ny, nz];
}
function rotateVectorOnVector(a5, b) {
  var v = new Vector3().crossVectors(a5, b);
  var c2 = a5.dot(b);
  var i2 = new Matrix3().identity();
  var vx = new Matrix3().set(0, -v.z, v.y, v.z, 0, -v.x, -v.y, v.x, 0);
  var vxsquared = new Matrix3().multiplyMatrices(vx, vx).multiplyScalar(1 / (1 + c2));
  var _final = matrixSum3(matrixSum3(i2, vx), vxsquared);
  return _final;
}
function pointToCoordinate(x, y, z) {
  var lat = Math.asin(y);
  var lon = Math.atan2(x, -z);
  return [lat, lon];
}
function coordinateToPoint(lat, lon) {
  var y = Math.sin(lat);
  var r2 = Math.cos(lat);
  var x = Math.sin(lon) * r2;
  var z = -Math.cos(lon) * r2;
  return [x, y, z];
}
function planeSegmentIntersection(plane, segment) {
  var _segment = _slicedToArray(segment, 2), a5 = _segment[0], b = _segment[1];
  var matrix2 = rotateVectorOnVector(plane.normal, new Vector3(0, 1, 0));
  var t2 = inverseLerp(a5.clone().applyMatrix3(matrix2).y, b.clone().applyMatrix3(matrix2).y, 0);
  return new Vector3().lerpVectors(a5, b, t2);
}
function pointToPlaneDistance(p2, plane) {
  var d2 = plane.normal.dot(p2);
  return d2;
}
function getIndexFrom3D(coords, sides) {
  var _coords = _slicedToArray(coords, 3), ix = _coords[0], iy = _coords[1], iz = _coords[2];
  var _sides = _slicedToArray(sides, 2), rx = _sides[0], ry = _sides[1];
  return iz * rx * ry + iy * rx + ix;
}
function get3DFromIndex(index2, size) {
  var _size = _slicedToArray(size, 2), rx = _size[0], ry = _size[1];
  var a5 = rx * ry;
  var z = index2 / a5;
  var b = index2 - a5 * z;
  var y = b / rx;
  var x = b % rx;
  return [x, y, z];
}
function getIndexFrom2D(coords, size) {
  return coords[0] + size[0] * coords[1];
}
function get2DFromIndex(index2, columns) {
  var x = index2 % columns;
  var y = Math.floor(index2 / columns);
  return [x, y];
}
var misc = Object.freeze({
  __proto__: null,
  clamp: clamp2,
  repeat,
  deltaAngle,
  degToRad,
  radToDeg,
  fibonacciOnSphere,
  vectorEquals,
  lexicographic,
  convexHull,
  remap,
  fade,
  lerp,
  inverseLerp,
  normalize,
  pointOnCubeToPointOnSphere,
  rotateVectorOnVector,
  pointToCoordinate,
  coordinateToPoint,
  planeSegmentIntersection,
  pointToPlaneDistance,
  getIndexFrom3D,
  get3DFromIndex,
  getIndexFrom2D,
  get2DFromIndex
});

// node_modules/maath/dist/easing-0f4db1c0.esm.js
var rsqw = function rsqw2(t2) {
  var delta = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0.01;
  var a5 = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1;
  var f2 = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 1 / (2 * Math.PI);
  return a5 / Math.atan(1 / delta) * Math.atan(Math.sin(2 * Math.PI * t2 * f2) / delta);
};
var exp = function exp2(t2) {
  return 1 / (1 + t2 + 0.48 * t2 * t2 + 0.235 * t2 * t2 * t2);
};
var linear = function linear2(t2) {
  return t2;
};
var sine = {
  "in": function _in(x) {
    return 1 - Math.cos(x * Math.PI / 2);
  },
  out: function out(x) {
    return Math.sin(x * Math.PI / 2);
  },
  inOut: function inOut(x) {
    return -(Math.cos(Math.PI * x) - 1) / 2;
  }
};
var cubic = {
  "in": function _in2(x) {
    return x * x * x;
  },
  out: function out2(x) {
    return 1 - Math.pow(1 - x, 3);
  },
  inOut: function inOut2(x) {
    return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
  }
};
var quint = {
  "in": function _in3(x) {
    return x * x * x * x * x;
  },
  out: function out3(x) {
    return 1 - Math.pow(1 - x, 5);
  },
  inOut: function inOut3(x) {
    return x < 0.5 ? 16 * x * x * x * x * x : 1 - Math.pow(-2 * x + 2, 5) / 2;
  }
};
var circ = {
  "in": function _in4(x) {
    return 1 - Math.sqrt(1 - Math.pow(x, 2));
  },
  out: function out4(x) {
    return Math.sqrt(1 - Math.pow(x - 1, 2));
  },
  inOut: function inOut4(x) {
    return x < 0.5 ? (1 - Math.sqrt(1 - Math.pow(2 * x, 2))) / 2 : (Math.sqrt(1 - Math.pow(-2 * x + 2, 2)) + 1) / 2;
  }
};
var quart = {
  "in": function _in5(t2) {
    return t2 * t2 * t2 * t2;
  },
  out: function out5(t2) {
    return 1 - --t2 * t2 * t2 * t2;
  },
  inOut: function inOut5(t2) {
    return t2 < 0.5 ? 8 * t2 * t2 * t2 * t2 : 1 - 8 * --t2 * t2 * t2 * t2;
  }
};
var expo = {
  "in": function _in6(x) {
    return x === 0 ? 0 : Math.pow(2, 10 * x - 10);
  },
  out: function out6(x) {
    return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
  },
  inOut: function inOut6(x) {
    return x === 0 ? 0 : x === 1 ? 1 : x < 0.5 ? Math.pow(2, 20 * x - 10) / 2 : (2 - Math.pow(2, -20 * x + 10)) / 2;
  }
};
function damp(current, prop, target) {
  var smoothTime = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 0.25;
  var delta = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 0.01;
  var maxSpeed = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : Infinity;
  var easing2 = arguments.length > 6 && arguments[6] !== void 0 ? arguments[6] : exp;
  var eps = arguments.length > 7 && arguments[7] !== void 0 ? arguments[7] : 1e-3;
  var vel = "velocity_" + prop;
  if (current.__damp === void 0) current.__damp = {};
  if (current.__damp[vel] === void 0) current.__damp[vel] = 0;
  if (Math.abs(current[prop] - target) <= eps) {
    current[prop] = target;
    return false;
  }
  smoothTime = Math.max(1e-4, smoothTime);
  var omega = 2 / smoothTime;
  var t2 = easing2(omega * delta);
  var change = current[prop] - target;
  var originalTo = target;
  var maxChange = maxSpeed * smoothTime;
  change = Math.min(Math.max(change, -maxChange), maxChange);
  target = current[prop] - change;
  var temp = (current.__damp[vel] + omega * change) * delta;
  current.__damp[vel] = (current.__damp[vel] - omega * temp) * t2;
  var output = target + (change + temp) * t2;
  if (originalTo - current[prop] > 0 === output > originalTo) {
    output = originalTo;
    current.__damp[vel] = (output - originalTo) / delta;
  }
  current[prop] = output;
  return true;
}
var isCamera = function isCamera2(v) {
  return v && v.isCamera;
};
var isLight = function isLight2(v) {
  return v && v.isLight;
};
var vl3d = new Vector3();
var _q1 = new Quaternion();
var _q2 = new Quaternion();
var _m1 = new Matrix4();
var _position = new Vector3();
function dampLookAt(current, target, smoothTime, delta, maxSpeed, easing2, eps) {
  if (typeof target === "number") vl3d.setScalar(target);
  else if (Array.isArray(target)) vl3d.set(target[0], target[1], target[2]);
  else vl3d.copy(target);
  var parent = current.parent;
  current.updateWorldMatrix(true, false);
  _position.setFromMatrixPosition(current.matrixWorld);
  if (isCamera(current) || isLight(current)) _m1.lookAt(_position, vl3d, current.up);
  else _m1.lookAt(vl3d, _position, current.up);
  dampQ(current.quaternion, _q2.setFromRotationMatrix(_m1), smoothTime, delta, maxSpeed, easing2, eps);
  if (parent) {
    _m1.extractRotation(parent.matrixWorld);
    _q1.setFromRotationMatrix(_m1);
    dampQ(current.quaternion, _q2.copy(current.quaternion).premultiply(_q1.invert()), smoothTime, delta, maxSpeed, easing2, eps);
  }
}
function dampAngle(current, prop, target, smoothTime, delta, maxSpeed, easing2, eps) {
  return damp(current, prop, current[prop] + deltaAngle(current[prop], target), smoothTime, delta, maxSpeed, easing2, eps);
}
var v2d = new Vector2();
var a2;
var b2;
function damp2(current, target, smoothTime, delta, maxSpeed, easing2, eps) {
  if (typeof target === "number") v2d.setScalar(target);
  else if (Array.isArray(target)) v2d.set(target[0], target[1]);
  else v2d.copy(target);
  a2 = damp(current, "x", v2d.x, smoothTime, delta, maxSpeed, easing2, eps);
  b2 = damp(current, "y", v2d.y, smoothTime, delta, maxSpeed, easing2, eps);
  return a2 || b2;
}
var v3d = new Vector3();
var a3;
var b3;
var c3;
function damp3(current, target, smoothTime, delta, maxSpeed, easing2, eps) {
  if (typeof target === "number") v3d.setScalar(target);
  else if (Array.isArray(target)) v3d.set(target[0], target[1], target[2]);
  else v3d.copy(target);
  a3 = damp(current, "x", v3d.x, smoothTime, delta, maxSpeed, easing2, eps);
  b3 = damp(current, "y", v3d.y, smoothTime, delta, maxSpeed, easing2, eps);
  c3 = damp(current, "z", v3d.z, smoothTime, delta, maxSpeed, easing2, eps);
  return a3 || b3 || c3;
}
var v4d = new Vector4();
var a4;
var b4;
var c4;
var d4;
function damp4(current, target, smoothTime, delta, maxSpeed, easing2, eps) {
  if (typeof target === "number") v4d.setScalar(target);
  else if (Array.isArray(target)) v4d.set(target[0], target[1], target[2], target[3]);
  else v4d.copy(target);
  a4 = damp(current, "x", v4d.x, smoothTime, delta, maxSpeed, easing2, eps);
  b4 = damp(current, "y", v4d.y, smoothTime, delta, maxSpeed, easing2, eps);
  c4 = damp(current, "z", v4d.z, smoothTime, delta, maxSpeed, easing2, eps);
  d4 = damp(current, "w", v4d.w, smoothTime, delta, maxSpeed, easing2, eps);
  return a4 || b4 || c4 || d4;
}
var rot = new Euler();
var aE;
var bE;
var cE;
function dampE(current, target, smoothTime, delta, maxSpeed, easing2, eps) {
  if (Array.isArray(target)) rot.set(target[0], target[1], target[2], target[3]);
  else rot.copy(target);
  aE = dampAngle(current, "x", rot.x, smoothTime, delta, maxSpeed, easing2, eps);
  bE = dampAngle(current, "y", rot.y, smoothTime, delta, maxSpeed, easing2, eps);
  cE = dampAngle(current, "z", rot.z, smoothTime, delta, maxSpeed, easing2, eps);
  return aE || bE || cE;
}
var col = new Color();
var aC;
var bC;
var cC;
function dampC(current, target, smoothTime, delta, maxSpeed, easing2, eps) {
  if (target instanceof Color) col.copy(target);
  else if (Array.isArray(target)) col.setRGB(target[0], target[1], target[2]);
  else col.set(target);
  aC = damp(current, "r", col.r, smoothTime, delta, maxSpeed, easing2, eps);
  bC = damp(current, "g", col.g, smoothTime, delta, maxSpeed, easing2, eps);
  cC = damp(current, "b", col.b, smoothTime, delta, maxSpeed, easing2, eps);
  return aC || bC || cC;
}
var qt = new Quaternion();
var v4result = new Vector4();
var v4velocity = new Vector4();
var v4error = new Vector4();
var aQ;
var bQ;
var cQ;
var dQ;
function dampQ(current, target, smoothTime, delta, maxSpeed, easing2, eps) {
  var cur = current;
  if (Array.isArray(target)) qt.set(target[0], target[1], target[2], target[3]);
  else qt.copy(target);
  var multi = current.dot(qt) > 0 ? 1 : -1;
  qt.x *= multi;
  qt.y *= multi;
  qt.z *= multi;
  qt.w *= multi;
  aQ = damp(current, "x", qt.x, smoothTime, delta, maxSpeed, easing2, eps);
  bQ = damp(current, "y", qt.y, smoothTime, delta, maxSpeed, easing2, eps);
  cQ = damp(current, "z", qt.z, smoothTime, delta, maxSpeed, easing2, eps);
  dQ = damp(current, "w", qt.w, smoothTime, delta, maxSpeed, easing2, eps);
  v4result.set(current.x, current.y, current.z, current.w).normalize();
  v4velocity.set(cur.__damp.velocity_x, cur.__damp.velocity_y, cur.__damp.velocity_z, cur.__damp.velocity_w);
  v4error.copy(v4result).multiplyScalar(v4velocity.dot(v4result) / v4result.dot(v4result));
  cur.__damp.velocity_x -= v4error.x;
  cur.__damp.velocity_y -= v4error.y;
  cur.__damp.velocity_z -= v4error.z;
  cur.__damp.velocity_w -= v4error.w;
  current.set(v4result.x, v4result.y, v4result.z, v4result.w);
  return aQ || bQ || cQ || dQ;
}
var spherical = new Spherical();
var aS;
var bS;
var cS;
function dampS(current, target, smoothTime, delta, maxSpeed, easing2, eps) {
  if (Array.isArray(target)) spherical.set(target[0], target[1], target[2]);
  else spherical.copy(target);
  aS = damp(current, "radius", spherical.radius, smoothTime, delta, maxSpeed, easing2, eps);
  bS = dampAngle(current, "phi", spherical.phi, smoothTime, delta, maxSpeed, easing2, eps);
  cS = dampAngle(current, "theta", spherical.theta, smoothTime, delta, maxSpeed, easing2, eps);
  return aS || bS || cS;
}
var mat = new Matrix4();
var mPos = new Vector3();
var mRot = new Quaternion();
var mSca = new Vector3();
var aM;
var bM;
var cM;
function dampM(current, target, smoothTime, delta, maxSpeed, easing2, eps) {
  var cur = current;
  if (cur.__damp === void 0) {
    cur.__damp = {
      position: new Vector3(),
      rotation: new Quaternion(),
      scale: new Vector3()
    };
    current.decompose(cur.__damp.position, cur.__damp.rotation, cur.__damp.scale);
  }
  if (Array.isArray(target)) mat.set.apply(mat, _toConsumableArray(target));
  else mat.copy(target);
  mat.decompose(mPos, mRot, mSca);
  aM = damp3(cur.__damp.position, mPos, smoothTime, delta, maxSpeed, easing2, eps);
  bM = dampQ(cur.__damp.rotation, mRot, smoothTime, delta, maxSpeed, easing2, eps);
  cM = damp3(cur.__damp.scale, mSca, smoothTime, delta, maxSpeed, easing2, eps);
  current.compose(cur.__damp.position, cur.__damp.rotation, cur.__damp.scale);
  return aM || bM || cM;
}
var easing = Object.freeze({
  __proto__: null,
  rsqw,
  exp,
  linear,
  sine,
  cubic,
  quint,
  circ,
  quart,
  expo,
  damp,
  dampLookAt,
  dampAngle,
  damp2,
  damp3,
  damp4,
  dampE,
  dampC,
  dampQ,
  dampS,
  dampM
});

// node_modules/maath/dist/objectSpread2-284232a6.esm.js
function _defineProperty2(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function ownKeys2(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) {
      symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }
    keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread22(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = arguments[i2] != null ? arguments[i2] : {};
    if (i2 % 2) {
      ownKeys2(Object(source), true).forEach(function(key) {
        _defineProperty2(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys2(Object(source)).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }
  return target;
}

// node_modules/maath/dist/vector2-d2bf51f1.esm.js
function zero() {
  return [0, 0];
}
function one() {
  return [1, 1];
}
function add(a5, b) {
  return [a5[0] + b[0], a5[1] + b[1]];
}
function addValue(a5, n2) {
  return [a5[0] + n2, a5[1] + n2];
}
function sub(a5, b) {
  return [a5[0] - b[0], a5[1] - b[1]];
}
function subValue(a5, n2) {
  return [a5[0] - n2, a5[1] - n2];
}
function scale(a5, n2) {
  return [a5[0] * n2, a5[1] * n2];
}
function dot(a5, b) {
  return a5[0] * b[0] + a5[1] * b[1];
}
function lengthSqr(a5) {
  return a5[0] * a5[0] + a5[1] * a5[1];
}
function length(a5) {
  return Math.sqrt(a5[0] * a5[0] + a5[1] * a5[1]);
}
function distance(a5, b) {
  return Math.sqrt((a5[0] - b[0]) * (a5[0] - b[0]) + (a5[1] - b[1]) * (a5[1] - b[1]));
}
var vector2 = Object.freeze({
  __proto__: null,
  zero,
  one,
  add,
  addValue,
  sub,
  subValue,
  scale,
  dot,
  lengthSqr,
  length,
  distance
});

// node_modules/maath/dist/vector3-0a088b7f.esm.js
function zero2() {
  return [0, 0, 0];
}
function one2() {
  return [1, 1, 1];
}
function add2(a5, b) {
  return [a5[0] + b[0], a5[1] + b[1], a5[2] + b[2]];
}
function addValue2(a5, n2) {
  return [a5[0] + n2, a5[1] + n2, a5[2] + n2];
}
function sub2(a5, b) {
  return [a5[0] - b[0], a5[1] - b[1], a5[2] - b[2]];
}
function subValue2(a5, n2) {
  return [a5[0] - n2, a5[1] - n2, a5[2] - n2];
}
function scale2(a5, n2) {
  return [a5[0] * n2, a5[1] * n2, a5[2] * n2];
}
function dot2(a5, b) {
  return a5[0] * b[0] + a5[1] * b[1] + a5[2] * b[2];
}
function cross(a5, b) {
  var x = a5[1] * b[2] - a5[2] * b[1];
  var y = a5[2] * b[0] - a5[0] * b[2];
  var z = a5[0] * b[1] - a5[1] * b[0];
  return [x, y, z];
}
function lengthSqr2(a5) {
  return a5[0] * a5[0] + a5[1] * a5[1] + a5[2] * a5[2];
}
function length2(a5) {
  return Math.sqrt(a5[0] * a5[0] + a5[1] * a5[1] + a5[2] * a5[2]);
}
function distance2(a5, b) {
  return Math.sqrt((a5[0] - b[0]) * (a5[0] - b[0]) + (a5[1] - b[1]) * (a5[1] - b[1]) + (a5[2] - b[2]) * (a5[2] - b[2]));
}
var vector3 = Object.freeze({
  __proto__: null,
  zero: zero2,
  one: one2,
  add: add2,
  addValue: addValue2,
  sub: sub2,
  subValue: subValue2,
  scale: scale2,
  dot: dot2,
  cross,
  lengthSqr: lengthSqr2,
  length: length2,
  distance: distance2
});

// node_modules/maath/dist/buffer-59a95d05.esm.js
function swizzle(buffer2) {
  var stride = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 3;
  var swizzle2 = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "xyz";
  var o2 = {
    x: 0,
    y: 0,
    z: 0
  };
  for (var _i = 0; _i < buffer2.length; _i += stride) {
    o2.x = buffer2[_i];
    o2.y = buffer2[_i + 1];
    o2.z = buffer2[_i + 2];
    var _swizzle$split = swizzle2.split(""), _swizzle$split2 = _slicedToArray(_swizzle$split, 3), x = _swizzle$split2[0], y = _swizzle$split2[1], z = _swizzle$split2[2];
    buffer2[_i] = o2[x];
    buffer2[_i + 1] = o2[y];
    if (stride === 3) {
      buffer2[_i + 2] = o2[z];
    }
  }
  return buffer2;
}
function addAxis(buffer2, size) {
  var valueGenerator = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : function() {
    return Math.random();
  };
  var newSize = size + 1;
  var newBuffer = new Float32Array(buffer2.length / size * newSize);
  for (var _i2 = 0; _i2 < buffer2.length; _i2 += size) {
    var _j = _i2 / size * newSize;
    newBuffer[_j] = buffer2[_i2];
    newBuffer[_j + 1] = buffer2[_i2 + 1];
    if (size === 2) {
      newBuffer[_j + 2] = valueGenerator(_j);
    }
    if (size === 3) {
      newBuffer[_j + 2] = buffer2[_i2 + 2];
      newBuffer[_j + 3] = valueGenerator(_j);
    }
  }
  return newBuffer;
}
function lerp2(bufferA, bufferB, _final, t2) {
  for (var _i3 = 0; _i3 < bufferA.length; _i3++) {
    _final[_i3] = lerp(bufferA[_i3], bufferB[_i3], t2);
  }
}
function translate(buffer2, translationVector) {
  var stride = translationVector.length;
  for (var _i4 = 0; _i4 < buffer2.length; _i4 += stride) {
    buffer2[_i4] += translationVector[0];
    buffer2[_i4 + 1] += translationVector[1];
    buffer2[_i4 + 2] += translationVector[2];
  }
  return buffer2;
}
function rotate(buffer2, rotation) {
  var defaultRotation = {
    center: [0, 0, 0],
    q: new Quaternion().identity()
  };
  var v = new Vector3();
  var _defaultRotation$rota = _objectSpread22(_objectSpread22({}, defaultRotation), rotation), q = _defaultRotation$rota.q, center2 = _defaultRotation$rota.center;
  for (var _i5 = 0; _i5 < buffer2.length; _i5 += 3) {
    v.set(buffer2[_i5] - center2[0], buffer2[_i5 + 1] - center2[1], buffer2[_i5 + 2] - center2[2]);
    v.applyQuaternion(q);
    buffer2[_i5] = v.x + center2[0];
    buffer2[_i5 + 1] = v.y + center2[1];
    buffer2[_i5 + 2] = v.z + center2[1];
  }
  return buffer2;
}
function map(buffer2, stride, callback) {
  for (var _i6 = 0, _j2 = 0; _i6 < buffer2.length; _i6 += stride, _j2++) {
    if (stride === 3) {
      var res = callback([buffer2[_i6], buffer2[_i6 + 1], buffer2[_i6 + 2]], _j2);
      buffer2.set(res, _i6);
    } else {
      buffer2.set(callback([buffer2[_i6], buffer2[_i6 + 1]], _j2), _i6);
    }
  }
  return buffer2;
}
function reduce(b, stride, callback, acc) {
  for (var _i7 = 0, _j3 = 0; _i7 < b.length; _i7 += stride, _j3++) {
    if (stride === 2) {
      acc = callback(acc, [b[_i7], b[_i7 + 1]], _j3);
    } else {
      acc = callback(acc, [b[_i7], b[_i7 + 1], b[_i7 + 2]], _j3);
    }
  }
  return acc;
}
function expand(b, stride, opts) {
  var defaultExpandOptions = {
    center: [0, 0, 0]
  };
  var _defaultExpandOptions = _objectSpread22(_objectSpread22({}, defaultExpandOptions), opts), center2 = _defaultExpandOptions.center, distance3 = _defaultExpandOptions.distance;
  for (var _i8 = 0; _i8 < b.length; _i8 += stride) {
    b[_i8] = (b[_i8] - center2[0]) * (1 + distance3) + center2[0];
    b[_i8 + 1] = (b[_i8 + 1] - center2[1]) * (1 + distance3) + center2[1];
    if (stride === 3) {
      b[_i8 + 2] = (b[_i8 + 2] - center2[1]) * (1 + distance3) + center2[2];
    }
  }
  return b;
}
function center(myBuffer, stride) {
  return reduce(myBuffer, stride, function(acc, point) {
    if (stride === 3) {
      acc = add2(acc, point);
    } else {
      acc = add(acc, point);
    }
    return acc;
  }, zero());
}
function sort(myBuffer, stride, callback) {
  var indices = Int16Array.from({
    length: myBuffer.length / stride
  }, function(_, i2) {
    return i2;
  });
  indices.sort(function(a5, b) {
    var pa = myBuffer.slice(a5 * stride, a5 * stride + stride);
    var pb = myBuffer.slice(b * stride, b * stride + stride);
    return callback(pa, pb);
  });
  var prevBuffer = myBuffer.slice(0);
  for (var _i9 = 0; _i9 < indices.length; _i9++) {
    var _j4 = indices[_i9];
    myBuffer.set(prevBuffer.slice(_j4 * stride, _j4 * stride + stride), _i9 * 3);
  }
  return myBuffer;
}
var buffer = Object.freeze({
  __proto__: null,
  swizzle,
  addAxis,
  lerp: lerp2,
  translate,
  rotate,
  map,
  reduce,
  expand,
  center,
  sort
});

// node_modules/maath/dist/classCallCheck-9098b006.esm.js
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

// node_modules/maath/dist/index-0332b2ed.esm.js
function _defineProperties(target, props) {
  for (var i2 = 0; i2 < props.length; i2++) {
    var descriptor = props[i2];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}
var Grad = function Grad2(x, y, z) {
  var _this = this;
  _classCallCheck(this, Grad2);
  _defineProperty2(this, "dot2", function(x2, y2) {
    return _this.x * x2 + _this.y * y2;
  });
  _defineProperty2(this, "dot3", function(x2, y2, z2) {
    return _this.x * x2 + _this.y * y2 + _this.z * z2;
  });
  this.x = x;
  this.y = y;
  this.z = z;
};
var grad3 = [new Grad(1, 1, 0), new Grad(-1, 1, 0), new Grad(1, -1, 0), new Grad(-1, -1, 0), new Grad(1, 0, 1), new Grad(-1, 0, 1), new Grad(1, 0, -1), new Grad(-1, 0, -1), new Grad(0, 1, 1), new Grad(0, -1, 1), new Grad(0, 1, -1), new Grad(0, -1, -1)];
var p = [151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140, 36, 103, 30, 69, 142, 8, 99, 37, 240, 21, 10, 23, 190, 6, 148, 247, 120, 234, 75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32, 57, 177, 33, 88, 237, 149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175, 74, 165, 71, 134, 139, 48, 27, 166, 77, 146, 158, 231, 83, 111, 229, 122, 60, 211, 133, 230, 220, 105, 92, 41, 55, 46, 245, 40, 244, 102, 143, 54, 65, 25, 63, 161, 1, 216, 80, 73, 209, 76, 132, 187, 208, 89, 18, 169, 200, 196, 135, 130, 116, 188, 159, 86, 164, 100, 109, 198, 173, 186, 3, 64, 52, 217, 226, 250, 124, 123, 5, 202, 38, 147, 118, 126, 255, 82, 85, 212, 207, 206, 59, 227, 47, 16, 58, 17, 182, 189, 28, 42, 223, 183, 170, 213, 119, 248, 152, 2, 44, 154, 163, 70, 221, 153, 101, 155, 167, 43, 172, 9, 129, 22, 39, 253, 19, 98, 108, 110, 79, 113, 224, 232, 178, 185, 112, 104, 218, 246, 97, 228, 251, 34, 242, 193, 238, 210, 144, 12, 191, 179, 162, 241, 81, 51, 145, 235, 249, 14, 239, 107, 49, 192, 214, 31, 181, 199, 106, 157, 184, 84, 204, 176, 115, 121, 50, 45, 127, 4, 150, 254, 138, 236, 205, 93, 222, 114, 67, 29, 24, 72, 243, 141, 128, 195, 78, 66, 215, 61, 156, 180];
var perm = new Array(512);
var gradP = new Array(512);
var seed = function seed2(_seed) {
  if (_seed > 0 && _seed < 1) {
    _seed *= 65536;
  }
  _seed = Math.floor(_seed);
  if (_seed < 256) {
    _seed |= _seed << 8;
  }
  for (var i2 = 0; i2 < 256; i2++) {
    var v;
    if (i2 & 1) {
      v = p[i2] ^ _seed & 255;
    } else {
      v = p[i2] ^ _seed >> 8 & 255;
    }
    perm[i2] = perm[i2 + 256] = v;
    gradP[i2] = gradP[i2 + 256] = grad3[v % 12];
  }
};
seed(0);
var F2 = 0.5 * (Math.sqrt(3) - 1);
var G2 = (3 - Math.sqrt(3)) / 6;
var F3 = 1 / 3;
var G3 = 1 / 6;
var simplex2 = function simplex22(xin, yin) {
  var n0, n1, n2;
  var s2 = (xin + yin) * F2;
  var i2 = Math.floor(xin + s2);
  var j = Math.floor(yin + s2);
  var t2 = (i2 + j) * G2;
  var x0 = xin - i2 + t2;
  var y0 = yin - j + t2;
  var i1, j1;
  if (x0 > y0) {
    i1 = 1;
    j1 = 0;
  } else {
    i1 = 0;
    j1 = 1;
  }
  var x1 = x0 - i1 + G2;
  var y1 = y0 - j1 + G2;
  var x2 = x0 - 1 + 2 * G2;
  var y2 = y0 - 1 + 2 * G2;
  i2 &= 255;
  j &= 255;
  var gi0 = gradP[i2 + perm[j]];
  var gi1 = gradP[i2 + i1 + perm[j + j1]];
  var gi2 = gradP[i2 + 1 + perm[j + 1]];
  var t0 = 0.5 - x0 * x0 - y0 * y0;
  if (t0 < 0) {
    n0 = 0;
  } else {
    t0 *= t0;
    n0 = t0 * t0 * gi0.dot2(x0, y0);
  }
  var t1 = 0.5 - x1 * x1 - y1 * y1;
  if (t1 < 0) {
    n1 = 0;
  } else {
    t1 *= t1;
    n1 = t1 * t1 * gi1.dot2(x1, y1);
  }
  var t22 = 0.5 - x2 * x2 - y2 * y2;
  if (t22 < 0) {
    n2 = 0;
  } else {
    t22 *= t22;
    n2 = t22 * t22 * gi2.dot2(x2, y2);
  }
  return 70 * (n0 + n1 + n2);
};
var simplex3 = function simplex32(xin, yin, zin) {
  var n0, n1, n2, n3;
  var s2 = (xin + yin + zin) * F3;
  var i2 = Math.floor(xin + s2);
  var j = Math.floor(yin + s2);
  var k = Math.floor(zin + s2);
  var t2 = (i2 + j + k) * G3;
  var x0 = xin - i2 + t2;
  var y0 = yin - j + t2;
  var z0 = zin - k + t2;
  var i1, j1, k1;
  var i22, j2, k2;
  if (x0 >= y0) {
    if (y0 >= z0) {
      i1 = 1;
      j1 = 0;
      k1 = 0;
      i22 = 1;
      j2 = 1;
      k2 = 0;
    } else if (x0 >= z0) {
      i1 = 1;
      j1 = 0;
      k1 = 0;
      i22 = 1;
      j2 = 0;
      k2 = 1;
    } else {
      i1 = 0;
      j1 = 0;
      k1 = 1;
      i22 = 1;
      j2 = 0;
      k2 = 1;
    }
  } else {
    if (y0 < z0) {
      i1 = 0;
      j1 = 0;
      k1 = 1;
      i22 = 0;
      j2 = 1;
      k2 = 1;
    } else if (x0 < z0) {
      i1 = 0;
      j1 = 1;
      k1 = 0;
      i22 = 0;
      j2 = 1;
      k2 = 1;
    } else {
      i1 = 0;
      j1 = 1;
      k1 = 0;
      i22 = 1;
      j2 = 1;
      k2 = 0;
    }
  }
  var x1 = x0 - i1 + G3;
  var y1 = y0 - j1 + G3;
  var z1 = z0 - k1 + G3;
  var x2 = x0 - i22 + 2 * G3;
  var y2 = y0 - j2 + 2 * G3;
  var z2 = z0 - k2 + 2 * G3;
  var x3 = x0 - 1 + 3 * G3;
  var y3 = y0 - 1 + 3 * G3;
  var z3 = z0 - 1 + 3 * G3;
  i2 &= 255;
  j &= 255;
  k &= 255;
  var gi0 = gradP[i2 + perm[j + perm[k]]];
  var gi1 = gradP[i2 + i1 + perm[j + j1 + perm[k + k1]]];
  var gi2 = gradP[i2 + i22 + perm[j + j2 + perm[k + k2]]];
  var gi3 = gradP[i2 + 1 + perm[j + 1 + perm[k + 1]]];
  var t0 = 0.6 - x0 * x0 - y0 * y0 - z0 * z0;
  if (t0 < 0) {
    n0 = 0;
  } else {
    t0 *= t0;
    n0 = t0 * t0 * gi0.dot3(x0, y0, z0);
  }
  var t1 = 0.6 - x1 * x1 - y1 * y1 - z1 * z1;
  if (t1 < 0) {
    n1 = 0;
  } else {
    t1 *= t1;
    n1 = t1 * t1 * gi1.dot3(x1, y1, z1);
  }
  var t22 = 0.6 - x2 * x2 - y2 * y2 - z2 * z2;
  if (t22 < 0) {
    n2 = 0;
  } else {
    t22 *= t22;
    n2 = t22 * t22 * gi2.dot3(x2, y2, z2);
  }
  var t3 = 0.6 - x3 * x3 - y3 * y3 - z3 * z3;
  if (t3 < 0) {
    n3 = 0;
  } else {
    t3 *= t3;
    n3 = t3 * t3 * gi3.dot3(x3, y3, z3);
  }
  return 32 * (n0 + n1 + n2 + n3);
};
var perlin2 = function perlin22(x, y) {
  var X = Math.floor(x), Y = Math.floor(y);
  x = x - X;
  y = y - Y;
  X = X & 255;
  Y = Y & 255;
  var n00 = gradP[X + perm[Y]].dot2(x, y);
  var n01 = gradP[X + perm[Y + 1]].dot2(x, y - 1);
  var n10 = gradP[X + 1 + perm[Y]].dot2(x - 1, y);
  var n11 = gradP[X + 1 + perm[Y + 1]].dot2(x - 1, y - 1);
  var u = fade(x);
  return lerp(lerp(n00, n10, u), lerp(n01, n11, u), fade(y));
};
var perlin3 = function perlin32(x, y, z) {
  var X = Math.floor(x), Y = Math.floor(y), Z = Math.floor(z);
  x = x - X;
  y = y - Y;
  z = z - Z;
  X = X & 255;
  Y = Y & 255;
  Z = Z & 255;
  var n000 = gradP[X + perm[Y + perm[Z]]].dot3(x, y, z);
  var n001 = gradP[X + perm[Y + perm[Z + 1]]].dot3(x, y, z - 1);
  var n010 = gradP[X + perm[Y + 1 + perm[Z]]].dot3(x, y - 1, z);
  var n011 = gradP[X + perm[Y + 1 + perm[Z + 1]]].dot3(x, y - 1, z - 1);
  var n100 = gradP[X + 1 + perm[Y + perm[Z]]].dot3(x - 1, y, z);
  var n101 = gradP[X + 1 + perm[Y + perm[Z + 1]]].dot3(x - 1, y, z - 1);
  var n110 = gradP[X + 1 + perm[Y + 1 + perm[Z]]].dot3(x - 1, y - 1, z);
  var n111 = gradP[X + 1 + perm[Y + 1 + perm[Z + 1]]].dot3(x - 1, y - 1, z - 1);
  var u = fade(x);
  var v = fade(y);
  var w = fade(z);
  return lerp(lerp(lerp(n000, n100, u), lerp(n001, n101, u), w), lerp(lerp(n010, n110, u), lerp(n011, n111, u), w), v);
};
var noise = Object.freeze({
  __proto__: null,
  seed,
  simplex2,
  simplex3,
  perlin2,
  perlin3
});
var TAU = Math.PI * 2;
var FlashGen = (function() {
  function FlashGen2(props) {
    _classCallCheck(this, FlashGen2);
    _defineProperty2(this, "nextBurstTime", 0);
    _defineProperty2(this, "nextFlashEndTime", 0);
    _defineProperty2(this, "flashesDone", 0);
    _defineProperty2(this, "isFlashing", false);
    _defineProperty2(this, "currentCount", 0);
    _defineProperty2(this, "flashIntensity", 0);
    _defineProperty2(this, "isDecaying", false);
    _defineProperty2(this, "autoBurst", true);
    _defineProperty2(this, "decaySpeed", 40);
    _defineProperty2(this, "minInterval", 5e3);
    _defineProperty2(this, "maxInterval", 1e4);
    _defineProperty2(this, "minDuration", 50);
    _defineProperty2(this, "maxDuration", 300);
    _defineProperty2(this, "count", 5);
    Object.assign(this, props);
  }
  _createClass(FlashGen2, [{
    key: "scheduleNextBurst",
    value: function scheduleNextBurst(currentTime) {
      var burstInterval = Math.random() * (this.maxInterval - this.minInterval) + this.minInterval;
      this.nextBurstTime = currentTime + burstInterval / 1e3;
      this.flashesDone = 0;
      this.isFlashing = false;
    }
  }, {
    key: "burst",
    value: function burst() {
      this.nextBurstTime = 0;
      this.flashesDone = 0;
      this.isFlashing = false;
    }
  }, {
    key: "update",
    value: function update(currentTime, delta) {
      if (currentTime > this.nextBurstTime && this.currentCount === 0) {
        this.currentCount = Math.floor(Math.random() * this.count) + 1;
      }
      if (this.flashesDone < this.currentCount && currentTime > this.nextBurstTime) {
        if (!this.isFlashing) {
          this.isFlashing = true;
          this.flashIntensity = 1;
          var flashDuration = Math.random() * (this.maxDuration - this.minDuration) + this.minDuration;
          this.nextFlashEndTime = currentTime + flashDuration / 1e3;
        } else if (this.isFlashing && currentTime > this.nextFlashEndTime) {
          this.isFlashing = false;
          this.isDecaying = true;
          this.flashesDone++;
          if (this.flashesDone >= this.currentCount) {
            this.currentCount = 0;
            if (this.autoBurst) this.scheduleNextBurst(currentTime);
          }
        }
      }
      if (this.isDecaying) {
        this.flashIntensity -= delta * this.decaySpeed;
        this.flashIntensity = Math.max(0, Math.min(1, this.flashIntensity));
        if (this.flashIntensity <= 0) {
          this.isDecaying = false;
          this.flashIntensity = 0;
        }
      }
      return this.flashIntensity;
    }
  }]);
  return FlashGen2;
})();
function normalizeSeed(seed3) {
  if (typeof seed3 === "number") {
    seed3 = Math.abs(seed3);
  } else if (typeof seed3 === "string") {
    var string = seed3;
    seed3 = 0;
    for (var i2 = 0; i2 < string.length; i2++) {
      seed3 = (seed3 + (i2 + 1) * (string.charCodeAt(i2) % 96)) % 2147483647;
    }
  }
  if (seed3 === 0) {
    seed3 = 311;
  }
  return seed3;
}
function lcgRandom(seed3) {
  var state = normalizeSeed(seed3);
  return function() {
    var result = state * 48271 % 2147483647;
    state = result;
    return result / 2147483647;
  };
}
var Generator = function Generator2(_seed) {
  var _this = this;
  _classCallCheck(this, Generator2);
  _defineProperty2(this, "seed", 0);
  _defineProperty2(this, "init", function(seed3) {
    _this.seed = seed3;
    _this.value = lcgRandom(seed3);
  });
  _defineProperty2(this, "value", lcgRandom(this.seed));
  this.init(_seed);
};
var defaultGen = new Generator(Math.random());
var defaultSphere = {
  radius: 1,
  center: [0, 0, 0]
};
function onSphere(buffer2, sphere) {
  var rng = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : defaultGen;
  var _defaultSphere$sphere = _objectSpread22(_objectSpread22({}, defaultSphere), sphere), radius = _defaultSphere$sphere.radius, center2 = _defaultSphere$sphere.center;
  for (var i2 = 0; i2 < buffer2.length; i2 += 3) {
    var u = rng.value();
    var v = rng.value();
    var theta = Math.acos(2 * v - 1);
    var phi = TAU * u;
    buffer2[i2] = Math.sin(theta) * Math.cos(phi) * radius + center2[0];
    buffer2[i2 + 1] = Math.sin(theta) * Math.sin(phi) * radius + center2[1];
    buffer2[i2 + 2] = Math.cos(theta) * radius + center2[2];
  }
  return buffer2;
}
function inSphere(buffer2, sphere) {
  var rng = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : defaultGen;
  var _defaultSphere$sphere2 = _objectSpread22(_objectSpread22({}, defaultSphere), sphere), radius = _defaultSphere$sphere2.radius, center2 = _defaultSphere$sphere2.center;
  for (var i2 = 0; i2 < buffer2.length; i2 += 3) {
    var u = Math.pow(rng.value(), 1 / 3);
    var x = rng.value() * 2 - 1;
    var y = rng.value() * 2 - 1;
    var z = rng.value() * 2 - 1;
    var mag = Math.sqrt(x * x + y * y + z * z);
    x = u * x / mag;
    y = u * y / mag;
    z = u * z / mag;
    buffer2[i2] = x * radius + center2[0];
    buffer2[i2 + 1] = y * radius + center2[1];
    buffer2[i2 + 2] = z * radius + center2[2];
  }
  return buffer2;
}
var defaultCircle = {
  radius: 1,
  center: [0, 0]
};
function inCircle(buffer2, circle) {
  var rng = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : defaultGen;
  var _defaultCircle$circle = _objectSpread22(_objectSpread22({}, defaultCircle), circle), radius = _defaultCircle$circle.radius, center2 = _defaultCircle$circle.center;
  for (var i2 = 0; i2 < buffer2.length; i2 += 2) {
    var r2 = radius * Math.sqrt(rng.value());
    var theta = rng.value() * TAU;
    buffer2[i2] = Math.sin(theta) * r2 + center2[0];
    buffer2[i2 + 1] = Math.cos(theta) * r2 + center2[1];
  }
  return buffer2;
}
function onCircle(buffer2, circle) {
  var rng = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : defaultGen;
  var _defaultCircle$circle2 = _objectSpread22(_objectSpread22({}, defaultCircle), circle), radius = _defaultCircle$circle2.radius, center2 = _defaultCircle$circle2.center;
  for (var i2 = 0; i2 < buffer2.length; i2 += 2) {
    var theta = rng.value() * TAU;
    buffer2[i2] = Math.sin(theta) * radius + center2[0];
    buffer2[i2 + 1] = Math.cos(theta) * radius + center2[1];
  }
  return buffer2;
}
var defaultRect = {
  sides: 1,
  center: [0, 0]
};
function inRect(buffer2, rect) {
  var rng = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : defaultGen;
  var _defaultRect$rect = _objectSpread22(_objectSpread22({}, defaultRect), rect), sides = _defaultRect$rect.sides, center2 = _defaultRect$rect.center;
  var sideX = typeof sides === "number" ? sides : sides[0];
  var sideY = typeof sides === "number" ? sides : sides[1];
  for (var i2 = 0; i2 < buffer2.length; i2 += 2) {
    buffer2[i2] = (rng.value() - 0.5) * sideX + center2[0];
    buffer2[i2 + 1] = (rng.value() - 0.5) * sideY + center2[1];
  }
  return buffer2;
}
function onRect(buffer2, rect) {
  return buffer2;
}
function inBox(buffer2, box) {
  var rng = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : defaultGen;
  var _defaultBox$box = _objectSpread22(_objectSpread22({}, defaultBox), box), sides = _defaultBox$box.sides, center2 = _defaultBox$box.center;
  var sideX = typeof sides === "number" ? sides : sides[0];
  var sideY = typeof sides === "number" ? sides : sides[1];
  var sideZ = typeof sides === "number" ? sides : sides[2];
  for (var i2 = 0; i2 < buffer2.length; i2 += 3) {
    buffer2[i2] = (rng.value() - 0.5) * sideX + center2[0];
    buffer2[i2 + 1] = (rng.value() - 0.5) * sideY + center2[1];
    buffer2[i2 + 2] = (rng.value() - 0.5) * sideZ + center2[2];
  }
  return buffer2;
}
var defaultBox = {
  sides: 1,
  center: [0, 0, 0]
};
function onBox(buffer2, box) {
  var rng = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : defaultGen;
  var _defaultBox$box2 = _objectSpread22(_objectSpread22({}, defaultBox), box), sides = _defaultBox$box2.sides, center2 = _defaultBox$box2.center;
  var sideX = typeof sides === "number" ? sides : sides[0];
  var sideY = typeof sides === "number" ? sides : sides[1];
  var sideZ = typeof sides === "number" ? sides : sides[2];
  for (var i2 = 0; i2 < buffer2.length; i2 += 3) {
    buffer2[i2] = (rng.value() - 0.5) * sideX + center2[0];
    buffer2[i2 + 1] = (rng.value() - 0.5) * sideY + center2[1];
    buffer2[i2 + 2] = (rng.value() - 0.5) * sideZ + center2[2];
  }
  return buffer2;
}
var index = Object.freeze({
  __proto__: null,
  FlashGen,
  Generator,
  onSphere,
  inSphere,
  inCircle,
  onCircle,
  inRect,
  onRect,
  inBox,
  onBox,
  noise
});

// node_modules/maath/dist/geometry-0fb11825.esm.js
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}
function _getPrototypeOf(o2) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o3) {
    return o3.__proto__ || Object.getPrototypeOf(o3);
  };
  return _getPrototypeOf(o2);
}
function _assertThisInitialized(self2) {
  if (self2 === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self2;
}
function _possibleConstructorReturn(self2, call2) {
  if (call2 && (typeof call2 === "object" || typeof call2 === "function")) {
    return call2;
  } else if (call2 !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized(self2);
}
function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
var RoundedPlaneGeometry = (function(_THREE$BufferGeometry) {
  _inherits(RoundedPlaneGeometry2, _THREE$BufferGeometry);
  var _super = _createSuper(RoundedPlaneGeometry2);
  function RoundedPlaneGeometry2() {
    var _this;
    var width = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 2;
    var height = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
    var radius = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0.2;
    var segments = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 16;
    _classCallCheck(this, RoundedPlaneGeometry2);
    _this = _super.call(this);
    _this.parameters = {
      width,
      height,
      radius,
      segments
    };
    var wi = width / 2 - radius;
    var hi = height / 2 - radius;
    var ul = radius / width;
    var ur = (width - radius) / width;
    var vl = radius / height;
    var vh = (height - radius) / height;
    var positions = [wi, hi, 0, -wi, hi, 0, -wi, -hi, 0, wi, -hi, 0];
    var uvs = [ur, vh, ul, vh, ul, vl, ur, vl];
    var n2 = [3 * (segments + 1) + 3, 3 * (segments + 1) + 4, segments + 4, segments + 5, 2 * (segments + 1) + 4, 2, 1, 2 * (segments + 1) + 3, 3, 4 * (segments + 1) + 3, 4, 0];
    var indices = [n2[0], n2[1], n2[2], n2[0], n2[2], n2[3], n2[4], n2[5], n2[6], n2[4], n2[6], n2[7], n2[8], n2[9], n2[10], n2[8], n2[10], n2[11]];
    var phi, cos, sin, xc, yc, uc, vc, idx;
    for (var i2 = 0; i2 < 4; i2++) {
      xc = i2 < 1 || i2 > 2 ? wi : -wi;
      yc = i2 < 2 ? hi : -hi;
      uc = i2 < 1 || i2 > 2 ? ur : ul;
      vc = i2 < 2 ? vh : vl;
      for (var j = 0; j <= segments; j++) {
        phi = Math.PI / 2 * (i2 + j / segments);
        cos = Math.cos(phi);
        sin = Math.sin(phi);
        positions.push(xc + radius * cos, yc + radius * sin, 0);
        uvs.push(uc + ul * cos, vc + vl * sin);
        if (j < segments) {
          idx = (segments + 1) * i2 + j + 4;
          indices.push(i2, idx, idx + 1);
        }
      }
    }
    _this.setIndex(new BufferAttribute(new Uint32Array(indices), 1));
    _this.setAttribute("position", new BufferAttribute(new Float32Array(positions), 3));
    _this.setAttribute("uv", new BufferAttribute(new Float32Array(uvs), 2));
    return _this;
  }
  return RoundedPlaneGeometry2;
})(BufferGeometry);
function applyCylindricalUV(bufferGeometry) {
  var uvs = [];
  for (var i2 = 0; i2 < bufferGeometry.attributes.position.array.length / 3; i2++) {
    var x = bufferGeometry.attributes.position.array[i2 * 3 + 0];
    var y = bufferGeometry.attributes.position.array[i2 * 3 + 1];
    var z = bufferGeometry.attributes.position.array[i2 * 3 + 2];
    uvs.push(Math.atan2(x, z) / Math.PI * 0.5 + 0.5, y / Math.PI * 0.5 + 0.5);
  }
  if (bufferGeometry.attributes.uv) delete bufferGeometry.attributes.uv;
  bufferGeometry.setAttribute("uv", new Float32BufferAttribute(uvs, 2));
  bufferGeometry.attributes.uv.needsUpdate = true;
  return bufferGeometry;
}
function applySphereUV(bufferGeometry) {
  var uvs = [];
  var vertices = [];
  for (var i2 = 0; i2 < bufferGeometry.attributes.position.array.length / 3; i2++) {
    var x = bufferGeometry.attributes.position.array[i2 * 3 + 0];
    var y = bufferGeometry.attributes.position.array[i2 * 3 + 1];
    var z = bufferGeometry.attributes.position.array[i2 * 3 + 2];
    vertices.push(new Vector3(x, y, z));
  }
  var polarVertices = vertices.map(cartesian2polar);
  for (var _i = 0; _i < polarVertices.length / 3; _i++) {
    var tri = new Triangle(vertices[_i * 3 + 0], vertices[_i * 3 + 1], vertices[_i * 3 + 2]);
    var normal = tri.getNormal(new Vector3());
    for (var f2 = 0; f2 < 3; f2++) {
      var vertex = polarVertices[_i * 3 + f2];
      if (vertex.theta === 0 && (vertex.phi === 0 || vertex.phi === Math.PI)) {
        var alignedVertice = vertex.phi === 0 ? _i * 3 + 1 : _i * 3 + 0;
        vertex = {
          r: vertex.r,
          phi: vertex.phi,
          theta: polarVertices[alignedVertice].theta
        };
      }
      if (vertex.theta === Math.PI && cartesian2polar(normal).theta < Math.PI / 2) {
        vertex.theta = -Math.PI;
      }
      var canvasPoint = polar2canvas(vertex);
      uvs.push(1 - canvasPoint.x, 1 - canvasPoint.y);
    }
  }
  if (bufferGeometry.attributes.uv) delete bufferGeometry.attributes.uv;
  bufferGeometry.setAttribute("uv", new Float32BufferAttribute(uvs, 2));
  bufferGeometry.attributes.uv.needsUpdate = true;
  return bufferGeometry;
}
function cartesian2polar(position) {
  var r2 = Math.sqrt(position.x * position.x + position.z * position.z + position.y * position.y);
  return {
    r: r2,
    phi: Math.acos(position.y / r2),
    theta: Math.atan2(position.z, position.x)
  };
}
function polar2canvas(polarPoint) {
  return {
    y: polarPoint.phi / Math.PI,
    x: (polarPoint.theta + Math.PI) / (2 * Math.PI)
  };
}
function applyBoxUV(bufferGeometry) {
  bufferGeometry.computeBoundingBox();
  var bboxSize = bufferGeometry.boundingBox.getSize(new Vector3());
  var boxSize = Math.min(bboxSize.x, bboxSize.y, bboxSize.z);
  var boxGeometry = new BoxGeometry(boxSize, boxSize, boxSize);
  var cube = new Mesh(boxGeometry);
  cube.rotation.set(0, 0, 0);
  cube.updateWorldMatrix(true, false);
  var transformMatrix = cube.matrix.clone().invert();
  var uvBbox = new Box3(new Vector3(-boxSize / 2, -boxSize / 2, -boxSize / 2), new Vector3(boxSize / 2, boxSize / 2, boxSize / 2));
  _applyBoxUV(bufferGeometry, transformMatrix, uvBbox, boxSize);
  bufferGeometry.attributes.uv.needsUpdate = true;
  return bufferGeometry;
}
function _applyBoxUV(geom, transformMatrix, bbox, bbox_max_size) {
  var coords = [];
  coords.length = 2 * geom.attributes.position.array.length / 3;
  var makeUVs = function makeUVs2(v02, v12, v22) {
    v02.applyMatrix4(transformMatrix);
    v12.applyMatrix4(transformMatrix);
    v22.applyMatrix4(transformMatrix);
    var n2 = new Vector3();
    n2.crossVectors(v12.clone().sub(v02), v12.clone().sub(v22)).normalize();
    n2.x = Math.abs(n2.x);
    n2.y = Math.abs(n2.y);
    n2.z = Math.abs(n2.z);
    var uv0 = new Vector2();
    var uv1 = new Vector2();
    var uv2 = new Vector2();
    if (n2.y > n2.x && n2.y > n2.z) {
      uv0.x = (v02.x - bbox.min.x) / bbox_max_size;
      uv0.y = (bbox.max.z - v02.z) / bbox_max_size;
      uv1.x = (v12.x - bbox.min.x) / bbox_max_size;
      uv1.y = (bbox.max.z - v12.z) / bbox_max_size;
      uv2.x = (v22.x - bbox.min.x) / bbox_max_size;
      uv2.y = (bbox.max.z - v22.z) / bbox_max_size;
    } else if (n2.x > n2.y && n2.x > n2.z) {
      uv0.x = (v02.z - bbox.min.z) / bbox_max_size;
      uv0.y = (v02.y - bbox.min.y) / bbox_max_size;
      uv1.x = (v12.z - bbox.min.z) / bbox_max_size;
      uv1.y = (v12.y - bbox.min.y) / bbox_max_size;
      uv2.x = (v22.z - bbox.min.z) / bbox_max_size;
      uv2.y = (v22.y - bbox.min.y) / bbox_max_size;
    } else if (n2.z > n2.y && n2.z > n2.x) {
      uv0.x = (v02.x - bbox.min.x) / bbox_max_size;
      uv0.y = (v02.y - bbox.min.y) / bbox_max_size;
      uv1.x = (v12.x - bbox.min.x) / bbox_max_size;
      uv1.y = (v12.y - bbox.min.y) / bbox_max_size;
      uv2.x = (v22.x - bbox.min.x) / bbox_max_size;
      uv2.y = (v22.y - bbox.min.y) / bbox_max_size;
    }
    return {
      uv0,
      uv1,
      uv2
    };
  };
  if (geom.index) {
    for (var vi = 0; vi < geom.index.array.length; vi += 3) {
      var idx0 = geom.index.array[vi];
      var idx1 = geom.index.array[vi + 1];
      var idx2 = geom.index.array[vi + 2];
      var vx0 = geom.attributes.position.array[3 * idx0];
      var vy0 = geom.attributes.position.array[3 * idx0 + 1];
      var vz0 = geom.attributes.position.array[3 * idx0 + 2];
      var vx1 = geom.attributes.position.array[3 * idx1];
      var vy1 = geom.attributes.position.array[3 * idx1 + 1];
      var vz1 = geom.attributes.position.array[3 * idx1 + 2];
      var vx2 = geom.attributes.position.array[3 * idx2];
      var vy2 = geom.attributes.position.array[3 * idx2 + 1];
      var vz2 = geom.attributes.position.array[3 * idx2 + 2];
      var v0 = new Vector3(vx0, vy0, vz0);
      var v1 = new Vector3(vx1, vy1, vz1);
      var v2 = new Vector3(vx2, vy2, vz2);
      var uvs = makeUVs(v0, v1, v2);
      coords[2 * idx0] = uvs.uv0.x;
      coords[2 * idx0 + 1] = uvs.uv0.y;
      coords[2 * idx1] = uvs.uv1.x;
      coords[2 * idx1 + 1] = uvs.uv1.y;
      coords[2 * idx2] = uvs.uv2.x;
      coords[2 * idx2 + 1] = uvs.uv2.y;
    }
  } else {
    for (var _vi = 0; _vi < geom.attributes.position.array.length; _vi += 9) {
      var _vx = geom.attributes.position.array[_vi];
      var _vy = geom.attributes.position.array[_vi + 1];
      var _vz = geom.attributes.position.array[_vi + 2];
      var _vx2 = geom.attributes.position.array[_vi + 3];
      var _vy2 = geom.attributes.position.array[_vi + 4];
      var _vz2 = geom.attributes.position.array[_vi + 5];
      var _vx3 = geom.attributes.position.array[_vi + 6];
      var _vy3 = geom.attributes.position.array[_vi + 7];
      var _vz3 = geom.attributes.position.array[_vi + 8];
      var _v = new Vector3(_vx, _vy, _vz);
      var _v2 = new Vector3(_vx2, _vy2, _vz2);
      var _v3 = new Vector3(_vx3, _vy3, _vz3);
      var _uvs = makeUVs(_v, _v2, _v3);
      var _idx = _vi / 3;
      var _idx2 = _idx + 1;
      var _idx3 = _idx + 2;
      coords[2 * _idx] = _uvs.uv0.x;
      coords[2 * _idx + 1] = _uvs.uv0.y;
      coords[2 * _idx2] = _uvs.uv1.x;
      coords[2 * _idx2 + 1] = _uvs.uv1.y;
      coords[2 * _idx3] = _uvs.uv2.x;
      coords[2 * _idx3 + 1] = _uvs.uv2.y;
    }
  }
  if (geom.attributes.uv) delete geom.attributes.uv;
  geom.setAttribute("uv", new Float32BufferAttribute(coords, 2));
}
var geometry = Object.freeze({
  __proto__: null,
  RoundedPlaneGeometry,
  applyCylindricalUV,
  applySphereUV,
  applyBoxUV
});

// node_modules/maath/dist/three-eb2ad8c0.esm.js
function bufferToVectors(buffer2) {
  var stride = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 3;
  var p2 = [];
  for (var i2 = 0, j = 0; i2 < buffer2.length; i2 += stride, j++) {
    if (stride === 3) {
      p2[j] = new Vector3(buffer2[i2], buffer2[i2 + 1], buffer2[i2 + 2]);
    } else {
      p2[j] = new Vector2(buffer2[i2], buffer2[i2 + 1]);
    }
  }
  return p2;
}
function vectorsToBuffer(vectorArray) {
  var l2 = vectorArray.length;
  var stride = vectorArray[0].hasOwnProperty("z") ? 3 : 2;
  var buffer2 = new Float32Array(l2 * stride);
  for (var i2 = 0; i2 < l2; i2++) {
    var j = i2 * stride;
    buffer2[j] = vectorArray[i2].x;
    buffer2[j + 1] = vectorArray[i2].y;
    if (stride === 3) {
      buffer2[j + 2] = vectorArray[i2].z;
    }
  }
  return buffer2;
}
var three = Object.freeze({
  __proto__: null,
  bufferToVectors,
  vectorsToBuffer
});

// node_modules/troika-worker-utils/dist/troika-worker-utils.esm.js
function workerBootstrap() {
  var modules = /* @__PURE__ */ Object.create(null);
  function registerModule(ref, callback) {
    var id = ref.id;
    var name = ref.name;
    var dependencies = ref.dependencies;
    if (dependencies === void 0) dependencies = [];
    var init = ref.init;
    if (init === void 0) init = function() {
    };
    var getTransferables = ref.getTransferables;
    if (getTransferables === void 0) getTransferables = null;
    if (modules[id]) {
      return;
    }
    try {
      dependencies = dependencies.map(function(dep) {
        if (dep && dep.isWorkerModule) {
          registerModule(dep, function(depResult) {
            if (depResult instanceof Error) {
              throw depResult;
            }
          });
          dep = modules[dep.id].value;
        }
        return dep;
      });
      init = rehydrate("<" + name + ">.init", init);
      if (getTransferables) {
        getTransferables = rehydrate("<" + name + ">.getTransferables", getTransferables);
      }
      var value = null;
      if (typeof init === "function") {
        value = init.apply(void 0, dependencies);
      } else {
        console.error("worker module init function failed to rehydrate");
      }
      modules[id] = {
        id,
        value,
        getTransferables
      };
      callback(value);
    } catch (err) {
      if (!(err && err.noLog)) {
        console.error(err);
      }
      callback(err);
    }
  }
  function callModule(ref, callback) {
    var ref$1;
    var id = ref.id;
    var args = ref.args;
    if (!modules[id] || typeof modules[id].value !== "function") {
      callback(new Error("Worker module " + id + ": not found or its 'init' did not return a function"));
    }
    try {
      var result = (ref$1 = modules[id]).value.apply(ref$1, args);
      if (result && typeof result.then === "function") {
        result.then(handleResult, function(rej) {
          return callback(rej instanceof Error ? rej : new Error("" + rej));
        });
      } else {
        handleResult(result);
      }
    } catch (err) {
      callback(err);
    }
    function handleResult(result2) {
      try {
        var tx = modules[id].getTransferables && modules[id].getTransferables(result2);
        if (!tx || !Array.isArray(tx) || !tx.length) {
          tx = void 0;
        }
        callback(result2, tx);
      } catch (err) {
        console.error(err);
        callback(err);
      }
    }
  }
  function rehydrate(name, str) {
    var result = void 0;
    self.troikaDefine = function(r2) {
      return result = r2;
    };
    var url = URL.createObjectURL(
      new Blob(
        ["/** " + name.replace(/\*/g, "") + " **/\n\ntroikaDefine(\n" + str + "\n)"],
        { type: "application/javascript" }
      )
    );
    try {
      importScripts(url);
    } catch (err) {
      console.error(err);
    }
    URL.revokeObjectURL(url);
    delete self.troikaDefine;
    return result;
  }
  self.addEventListener("message", function(e2) {
    var ref = e2.data;
    var messageId = ref.messageId;
    var action = ref.action;
    var data = ref.data;
    try {
      if (action === "registerModule") {
        registerModule(data, function(result) {
          if (result instanceof Error) {
            postMessage({
              messageId,
              success: false,
              error: result.message
            });
          } else {
            postMessage({
              messageId,
              success: true,
              result: { isCallable: typeof result === "function" }
            });
          }
        });
      }
      if (action === "callModule") {
        callModule(data, function(result, transferables) {
          if (result instanceof Error) {
            postMessage({
              messageId,
              success: false,
              error: result.message
            });
          } else {
            postMessage({
              messageId,
              success: true,
              result
            }, transferables || void 0);
          }
        });
      }
    } catch (err) {
      postMessage({
        messageId,
        success: false,
        error: err.stack
      });
    }
  });
}
function defineMainThreadModule(options) {
  var moduleFunc = function() {
    var args = [], len = arguments.length;
    while (len--) args[len] = arguments[len];
    return moduleFunc._getInitResult().then(function(initResult) {
      if (typeof initResult === "function") {
        return initResult.apply(void 0, args);
      } else {
        throw new Error("Worker module function was called but `init` did not return a callable function");
      }
    });
  };
  moduleFunc._getInitResult = function() {
    var dependencies = options.dependencies;
    var init = options.init;
    dependencies = Array.isArray(dependencies) ? dependencies.map(function(dep) {
      if (dep) {
        dep = dep.onMainThread || dep;
        if (dep._getInitResult) {
          dep = dep._getInitResult();
        }
      }
      return dep;
    }) : [];
    var initPromise = Promise.all(dependencies).then(function(deps) {
      return init.apply(null, deps);
    });
    moduleFunc._getInitResult = function() {
      return initPromise;
    };
    return initPromise;
  };
  return moduleFunc;
}
var supportsWorkers = function() {
  var supported = false;
  if (typeof window !== "undefined" && typeof window.document !== "undefined") {
    try {
      var worker = new Worker(
        URL.createObjectURL(new Blob([""], { type: "application/javascript" }))
      );
      worker.terminate();
      supported = true;
    } catch (err) {
      if (typeof process !== "undefined" && false) ;
      else {
        console.log(
          "Troika createWorkerModule: web workers not allowed; falling back to main thread execution. Cause: [" + err.message + "]"
        );
      }
    }
  }
  supportsWorkers = function() {
    return supported;
  };
  return supported;
};
var _workerModuleId = 0;
var _messageId = 0;
var _allowInitAsString = false;
var workers = /* @__PURE__ */ Object.create(null);
var registeredModules = /* @__PURE__ */ Object.create(null);
var openRequests = /* @__PURE__ */ Object.create(null);
function defineWorkerModule(options) {
  if ((!options || typeof options.init !== "function") && !_allowInitAsString) {
    throw new Error("requires `options.init` function");
  }
  var dependencies = options.dependencies;
  var init = options.init;
  var getTransferables = options.getTransferables;
  var workerId = options.workerId;
  var onMainThread = defineMainThreadModule(options);
  if (workerId == null) {
    workerId = "#default";
  }
  var id = "workerModule" + ++_workerModuleId;
  var name = options.name || id;
  var registrationPromise = null;
  dependencies = dependencies && dependencies.map(function(dep) {
    if (typeof dep === "function" && !dep.workerModuleData) {
      _allowInitAsString = true;
      dep = defineWorkerModule({
        workerId,
        name: "<" + name + "> function dependency: " + dep.name,
        init: "function(){return (\n" + stringifyFunction(dep) + "\n)}"
      });
      _allowInitAsString = false;
    }
    if (dep && dep.workerModuleData) {
      dep = dep.workerModuleData;
    }
    return dep;
  });
  function moduleFunc() {
    var args = [], len = arguments.length;
    while (len--) args[len] = arguments[len];
    if (!supportsWorkers()) {
      return onMainThread.apply(void 0, args);
    }
    if (!registrationPromise) {
      registrationPromise = callWorker(workerId, "registerModule", moduleFunc.workerModuleData);
      var unregister = function() {
        registrationPromise = null;
        registeredModules[workerId].delete(unregister);
      };
      (registeredModules[workerId] || (registeredModules[workerId] = /* @__PURE__ */ new Set())).add(unregister);
    }
    return registrationPromise.then(function(ref) {
      var isCallable = ref.isCallable;
      if (isCallable) {
        return callWorker(workerId, "callModule", { id, args });
      } else {
        throw new Error("Worker module function was called but `init` did not return a callable function");
      }
    });
  }
  moduleFunc.workerModuleData = {
    isWorkerModule: true,
    id,
    name,
    dependencies,
    init: stringifyFunction(init),
    getTransferables: getTransferables && stringifyFunction(getTransferables)
  };
  moduleFunc.onMainThread = onMainThread;
  return moduleFunc;
}
function terminateWorker(workerId) {
  if (registeredModules[workerId]) {
    registeredModules[workerId].forEach(function(unregister) {
      unregister();
    });
  }
  if (workers[workerId]) {
    workers[workerId].terminate();
    delete workers[workerId];
  }
}
function stringifyFunction(fn) {
  var str = fn.toString();
  if (!/^function/.test(str) && /^\w+\s*\(/.test(str)) {
    str = "function " + str;
  }
  return str;
}
function getWorker(workerId) {
  var worker = workers[workerId];
  if (!worker) {
    var bootstrap = stringifyFunction(workerBootstrap);
    worker = workers[workerId] = new Worker(
      URL.createObjectURL(
        new Blob(
          ["/** Worker Module Bootstrap: " + workerId.replace(/\*/g, "") + " **/\n\n;(" + bootstrap + ")()"],
          { type: "application/javascript" }
        )
      )
    );
    worker.onmessage = function(e2) {
      var response = e2.data;
      var msgId = response.messageId;
      var callback = openRequests[msgId];
      if (!callback) {
        throw new Error("WorkerModule response with empty or unknown messageId");
      }
      delete openRequests[msgId];
      callback(response);
    };
  }
  return worker;
}
function callWorker(workerId, action, data) {
  return new Promise(function(resolve, reject) {
    var messageId = ++_messageId;
    openRequests[messageId] = function(response) {
      if (response.success) {
        resolve(response.result);
      } else {
        reject(new Error("Error in worker " + action + " call: " + response.error));
      }
    };
    getWorker(workerId).postMessage({
      messageId,
      action,
      data
    });
  });
}

// node_modules/webgl-sdf-generator/dist/webgl-sdf-generator.mjs
function SDFGenerator() {
  var exports = (function(exports2) {
    function pointOnQuadraticBezier(x0, y0, x1, y1, x2, y2, t2, pointOut) {
      var t22 = 1 - t2;
      pointOut.x = t22 * t22 * x0 + 2 * t22 * t2 * x1 + t2 * t2 * x2;
      pointOut.y = t22 * t22 * y0 + 2 * t22 * t2 * y1 + t2 * t2 * y2;
    }
    function pointOnCubicBezier(x0, y0, x1, y1, x2, y2, x3, y3, t2, pointOut) {
      var t22 = 1 - t2;
      pointOut.x = t22 * t22 * t22 * x0 + 3 * t22 * t22 * t2 * x1 + 3 * t22 * t2 * t2 * x2 + t2 * t2 * t2 * x3;
      pointOut.y = t22 * t22 * t22 * y0 + 3 * t22 * t22 * t2 * y1 + 3 * t22 * t2 * t2 * y2 + t2 * t2 * t2 * y3;
    }
    function forEachPathCommand(pathString, commandCallback) {
      var segmentRE = /([MLQCZ])([^MLQCZ]*)/g;
      var match, firstX, firstY, prevX, prevY;
      while (match = segmentRE.exec(pathString)) {
        var args = match[2].replace(/^\s*|\s*$/g, "").split(/[,\s]+/).map(function(v) {
          return parseFloat(v);
        });
        switch (match[1]) {
          case "M":
            prevX = firstX = args[0];
            prevY = firstY = args[1];
            break;
          case "L":
            if (args[0] !== prevX || args[1] !== prevY) {
              commandCallback("L", prevX, prevY, prevX = args[0], prevY = args[1]);
            }
            break;
          case "Q": {
            commandCallback("Q", prevX, prevY, prevX = args[2], prevY = args[3], args[0], args[1]);
            break;
          }
          case "C": {
            commandCallback("C", prevX, prevY, prevX = args[4], prevY = args[5], args[0], args[1], args[2], args[3]);
            break;
          }
          case "Z":
            if (prevX !== firstX || prevY !== firstY) {
              commandCallback("L", prevX, prevY, firstX, firstY);
            }
            break;
        }
      }
    }
    function pathToLineSegments(pathString, segmentCallback, curvePoints) {
      if (curvePoints === void 0) curvePoints = 16;
      var tempPoint = { x: 0, y: 0 };
      forEachPathCommand(pathString, function(command, startX, startY, endX, endY, ctrl1X, ctrl1Y, ctrl2X, ctrl2Y) {
        switch (command) {
          case "L":
            segmentCallback(startX, startY, endX, endY);
            break;
          case "Q": {
            var prevCurveX = startX;
            var prevCurveY = startY;
            for (var i2 = 1; i2 < curvePoints; i2++) {
              pointOnQuadraticBezier(
                startX,
                startY,
                ctrl1X,
                ctrl1Y,
                endX,
                endY,
                i2 / (curvePoints - 1),
                tempPoint
              );
              segmentCallback(prevCurveX, prevCurveY, tempPoint.x, tempPoint.y);
              prevCurveX = tempPoint.x;
              prevCurveY = tempPoint.y;
            }
            break;
          }
          case "C": {
            var prevCurveX$1 = startX;
            var prevCurveY$1 = startY;
            for (var i$1 = 1; i$1 < curvePoints; i$1++) {
              pointOnCubicBezier(
                startX,
                startY,
                ctrl1X,
                ctrl1Y,
                ctrl2X,
                ctrl2Y,
                endX,
                endY,
                i$1 / (curvePoints - 1),
                tempPoint
              );
              segmentCallback(prevCurveX$1, prevCurveY$1, tempPoint.x, tempPoint.y);
              prevCurveX$1 = tempPoint.x;
              prevCurveY$1 = tempPoint.y;
            }
            break;
          }
        }
      });
    }
    var viewportQuadVertex = "precision highp float;attribute vec2 aUV;varying vec2 vUV;void main(){vUV=aUV;gl_Position=vec4(mix(vec2(-1.0),vec2(1.0),aUV),0.0,1.0);}";
    var copyTexFragment = "precision highp float;uniform sampler2D tex;varying vec2 vUV;void main(){gl_FragColor=texture2D(tex,vUV);}";
    var cache = /* @__PURE__ */ new WeakMap();
    var glContextParams = {
      premultipliedAlpha: false,
      preserveDrawingBuffer: true,
      antialias: false,
      depth: false
    };
    function withWebGLContext(glOrCanvas, callback) {
      var gl = glOrCanvas.getContext ? glOrCanvas.getContext("webgl", glContextParams) : glOrCanvas;
      var wrapper = cache.get(gl);
      if (!wrapper) {
        let getExtension = function(name) {
          var ext = extensions[name];
          if (!ext) {
            ext = extensions[name] = gl.getExtension(name);
            if (!ext) {
              throw new Error(name + " not supported");
            }
          }
          return ext;
        }, compileShader = function(src, type) {
          var shader = gl.createShader(type);
          gl.shaderSource(shader, src);
          gl.compileShader(shader);
          return shader;
        }, withProgram = function(name, vert, frag, func) {
          if (!programs[name]) {
            var attributes = {};
            var uniforms = {};
            var program = gl.createProgram();
            gl.attachShader(program, compileShader(vert, gl.VERTEX_SHADER));
            gl.attachShader(program, compileShader(frag, gl.FRAGMENT_SHADER));
            gl.linkProgram(program);
            programs[name] = {
              program,
              transaction: function transaction(func2) {
                gl.useProgram(program);
                func2({
                  setUniform: function setUniform(type, name2) {
                    var values = [], len = arguments.length - 2;
                    while (len-- > 0) values[len] = arguments[len + 2];
                    var uniformLoc = uniforms[name2] || (uniforms[name2] = gl.getUniformLocation(program, name2));
                    gl["uniform" + type].apply(gl, [uniformLoc].concat(values));
                  },
                  setAttribute: function setAttribute(name2, size, usage, instancingDivisor, data) {
                    var attr = attributes[name2];
                    if (!attr) {
                      attr = attributes[name2] = {
                        buf: gl.createBuffer(),
                        // TODO should we destroy our buffers?
                        loc: gl.getAttribLocation(program, name2),
                        data: null
                      };
                    }
                    gl.bindBuffer(gl.ARRAY_BUFFER, attr.buf);
                    gl.vertexAttribPointer(attr.loc, size, gl.FLOAT, false, 0, 0);
                    gl.enableVertexAttribArray(attr.loc);
                    if (isWebGL2) {
                      gl.vertexAttribDivisor(attr.loc, instancingDivisor);
                    } else {
                      getExtension("ANGLE_instanced_arrays").vertexAttribDivisorANGLE(attr.loc, instancingDivisor);
                    }
                    if (data !== attr.data) {
                      gl.bufferData(gl.ARRAY_BUFFER, data, usage);
                      attr.data = data;
                    }
                  }
                });
              }
            };
          }
          programs[name].transaction(func);
        }, withTexture = function(name, func) {
          textureUnit++;
          try {
            gl.activeTexture(gl.TEXTURE0 + textureUnit);
            var texture = textures[name];
            if (!texture) {
              texture = textures[name] = gl.createTexture();
              gl.bindTexture(gl.TEXTURE_2D, texture);
              gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
              gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
            }
            gl.bindTexture(gl.TEXTURE_2D, texture);
            func(texture, textureUnit);
          } finally {
            textureUnit--;
          }
        }, withTextureFramebuffer = function(texture, textureUnit2, func) {
          var framebuffer = gl.createFramebuffer();
          framebufferStack.push(framebuffer);
          gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
          gl.activeTexture(gl.TEXTURE0 + textureUnit2);
          gl.bindTexture(gl.TEXTURE_2D, texture);
          gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
          try {
            func(framebuffer);
          } finally {
            gl.deleteFramebuffer(framebuffer);
            gl.bindFramebuffer(gl.FRAMEBUFFER, framebufferStack[--framebufferStack.length - 1] || null);
          }
        }, handleContextLoss = function() {
          extensions = {};
          programs = {};
          textures = {};
          textureUnit = -1;
          framebufferStack.length = 0;
        };
        var isWebGL2 = typeof WebGL2RenderingContext !== "undefined" && gl instanceof WebGL2RenderingContext;
        var extensions = {};
        var programs = {};
        var textures = {};
        var textureUnit = -1;
        var framebufferStack = [];
        gl.canvas.addEventListener("webglcontextlost", function(e2) {
          handleContextLoss();
          e2.preventDefault();
        }, false);
        cache.set(gl, wrapper = {
          gl,
          isWebGL2,
          getExtension,
          withProgram,
          withTexture,
          withTextureFramebuffer,
          handleContextLoss
        });
      }
      callback(wrapper);
    }
    function renderImageData(glOrCanvas, imageData, x, y, width, height, channels, framebuffer) {
      if (channels === void 0) channels = 15;
      if (framebuffer === void 0) framebuffer = null;
      withWebGLContext(glOrCanvas, function(ref) {
        var gl = ref.gl;
        var withProgram = ref.withProgram;
        var withTexture = ref.withTexture;
        withTexture("copy", function(tex, texUnit) {
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, imageData);
          withProgram("copy", viewportQuadVertex, copyTexFragment, function(ref2) {
            var setUniform = ref2.setUniform;
            var setAttribute = ref2.setAttribute;
            setAttribute("aUV", 2, gl.STATIC_DRAW, 0, new Float32Array([0, 0, 2, 0, 0, 2]));
            setUniform("1i", "image", texUnit);
            gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer || null);
            gl.disable(gl.BLEND);
            gl.colorMask(channels & 8, channels & 4, channels & 2, channels & 1);
            gl.viewport(x, y, width, height);
            gl.scissor(x, y, width, height);
            gl.drawArrays(gl.TRIANGLES, 0, 3);
          });
        });
      });
    }
    function resizeWebGLCanvasWithoutClearing2(canvas, newWidth, newHeight) {
      var width = canvas.width;
      var height = canvas.height;
      withWebGLContext(canvas, function(ref) {
        var gl = ref.gl;
        var data = new Uint8Array(width * height * 4);
        gl.readPixels(0, 0, width, height, gl.RGBA, gl.UNSIGNED_BYTE, data);
        canvas.width = newWidth;
        canvas.height = newHeight;
        renderImageData(gl, data, 0, 0, width, height);
      });
    }
    var webglUtils = Object.freeze({
      __proto__: null,
      withWebGLContext,
      renderImageData,
      resizeWebGLCanvasWithoutClearing: resizeWebGLCanvasWithoutClearing2
    });
    function generate$2(sdfWidth, sdfHeight, path, viewBox, maxDistance, sdfExponent) {
      if (sdfExponent === void 0) sdfExponent = 1;
      var textureData = new Uint8Array(sdfWidth * sdfHeight);
      var viewBoxWidth = viewBox[2] - viewBox[0];
      var viewBoxHeight = viewBox[3] - viewBox[1];
      var segments = [];
      pathToLineSegments(path, function(x1, y1, x2, y2) {
        segments.push({
          x1,
          y1,
          x2,
          y2,
          minX: Math.min(x1, x2),
          minY: Math.min(y1, y2),
          maxX: Math.max(x1, x2),
          maxY: Math.max(y1, y2)
        });
      });
      segments.sort(function(a5, b) {
        return a5.maxX - b.maxX;
      });
      for (var sdfX = 0; sdfX < sdfWidth; sdfX++) {
        for (var sdfY = 0; sdfY < sdfHeight; sdfY++) {
          var signedDist = findNearestSignedDistance(
            viewBox[0] + viewBoxWidth * (sdfX + 0.5) / sdfWidth,
            viewBox[1] + viewBoxHeight * (sdfY + 0.5) / sdfHeight
          );
          var alpha = Math.pow(1 - Math.abs(signedDist) / maxDistance, sdfExponent) / 2;
          if (signedDist < 0) {
            alpha = 1 - alpha;
          }
          alpha = Math.max(0, Math.min(255, Math.round(alpha * 255)));
          textureData[sdfY * sdfWidth + sdfX] = alpha;
        }
      }
      return textureData;
      function findNearestSignedDistance(x, y) {
        var closestDistSq = Infinity;
        var closestDist = Infinity;
        for (var i2 = segments.length; i2--; ) {
          var seg = segments[i2];
          if (seg.maxX + closestDist <= x) {
            break;
          }
          if (x + closestDist > seg.minX && y - closestDist < seg.maxY && y + closestDist > seg.minY) {
            var distSq = absSquareDistanceToLineSegment(x, y, seg.x1, seg.y1, seg.x2, seg.y2);
            if (distSq < closestDistSq) {
              closestDistSq = distSq;
              closestDist = Math.sqrt(closestDistSq);
            }
          }
        }
        if (isPointInPoly(x, y)) {
          closestDist = -closestDist;
        }
        return closestDist;
      }
      function isPointInPoly(x, y) {
        var winding = 0;
        for (var i2 = segments.length; i2--; ) {
          var seg = segments[i2];
          if (seg.maxX <= x) {
            break;
          }
          var intersects = seg.y1 > y !== seg.y2 > y && x < (seg.x2 - seg.x1) * (y - seg.y1) / (seg.y2 - seg.y1) + seg.x1;
          if (intersects) {
            winding += seg.y1 < seg.y2 ? 1 : -1;
          }
        }
        return winding !== 0;
      }
    }
    function generateIntoCanvas$2(sdfWidth, sdfHeight, path, viewBox, maxDistance, sdfExponent, canvas, x, y, channel) {
      if (sdfExponent === void 0) sdfExponent = 1;
      if (x === void 0) x = 0;
      if (y === void 0) y = 0;
      if (channel === void 0) channel = 0;
      generateIntoFramebuffer$1(sdfWidth, sdfHeight, path, viewBox, maxDistance, sdfExponent, canvas, null, x, y, channel);
    }
    function generateIntoFramebuffer$1(sdfWidth, sdfHeight, path, viewBox, maxDistance, sdfExponent, glOrCanvas, framebuffer, x, y, channel) {
      if (sdfExponent === void 0) sdfExponent = 1;
      if (x === void 0) x = 0;
      if (y === void 0) y = 0;
      if (channel === void 0) channel = 0;
      var data = generate$2(sdfWidth, sdfHeight, path, viewBox, maxDistance, sdfExponent);
      var rgbaData = new Uint8Array(data.length * 4);
      for (var i2 = 0; i2 < data.length; i2++) {
        rgbaData[i2 * 4 + channel] = data[i2];
      }
      renderImageData(glOrCanvas, rgbaData, x, y, sdfWidth, sdfHeight, 1 << 3 - channel, framebuffer);
    }
    function absSquareDistanceToLineSegment(x, y, lineX0, lineY0, lineX1, lineY1) {
      var ldx = lineX1 - lineX0;
      var ldy = lineY1 - lineY0;
      var lengthSq = ldx * ldx + ldy * ldy;
      var t2 = lengthSq ? Math.max(0, Math.min(1, ((x - lineX0) * ldx + (y - lineY0) * ldy) / lengthSq)) : 0;
      var dx = x - (lineX0 + t2 * ldx);
      var dy = y - (lineY0 + t2 * ldy);
      return dx * dx + dy * dy;
    }
    var javascript = Object.freeze({
      __proto__: null,
      generate: generate$2,
      generateIntoCanvas: generateIntoCanvas$2,
      generateIntoFramebuffer: generateIntoFramebuffer$1
    });
    var mainVertex = "precision highp float;uniform vec4 uGlyphBounds;attribute vec2 aUV;attribute vec4 aLineSegment;varying vec4 vLineSegment;varying vec2 vGlyphXY;void main(){vLineSegment=aLineSegment;vGlyphXY=mix(uGlyphBounds.xy,uGlyphBounds.zw,aUV);gl_Position=vec4(mix(vec2(-1.0),vec2(1.0),aUV),0.0,1.0);}";
    var mainFragment = "precision highp float;uniform vec4 uGlyphBounds;uniform float uMaxDistance;uniform float uExponent;varying vec4 vLineSegment;varying vec2 vGlyphXY;float absDistToSegment(vec2 point,vec2 lineA,vec2 lineB){vec2 lineDir=lineB-lineA;float lenSq=dot(lineDir,lineDir);float t=lenSq==0.0 ? 0.0 : clamp(dot(point-lineA,lineDir)/lenSq,0.0,1.0);vec2 linePt=lineA+t*lineDir;return distance(point,linePt);}void main(){vec4 seg=vLineSegment;vec2 p=vGlyphXY;float dist=absDistToSegment(p,seg.xy,seg.zw);float val=pow(1.0-clamp(dist/uMaxDistance,0.0,1.0),uExponent)*0.5;bool crossing=(seg.y>p.y!=seg.w>p.y)&&(p.x<(seg.z-seg.x)*(p.y-seg.y)/(seg.w-seg.y)+seg.x);bool crossingUp=crossing&&vLineSegment.y<vLineSegment.w;gl_FragColor=vec4(crossingUp ? 1.0/255.0 : 0.0,crossing&&!crossingUp ? 1.0/255.0 : 0.0,0.0,val);}";
    var postFragment = "precision highp float;uniform sampler2D tex;varying vec2 vUV;void main(){vec4 color=texture2D(tex,vUV);bool inside=color.r!=color.g;float val=inside ? 1.0-color.a : color.a;gl_FragColor=vec4(val);}";
    var viewportUVs = new Float32Array([0, 0, 2, 0, 0, 2]);
    var implicitContext = null;
    var isTestingSupport = false;
    var NULL_OBJECT = {};
    var supportByCanvas = /* @__PURE__ */ new WeakMap();
    function validateSupport(glOrCanvas) {
      if (!isTestingSupport && !isSupported(glOrCanvas)) {
        throw new Error("WebGL generation not supported");
      }
    }
    function generate$1(sdfWidth, sdfHeight, path, viewBox, maxDistance, sdfExponent, glOrCanvas) {
      if (sdfExponent === void 0) sdfExponent = 1;
      if (glOrCanvas === void 0) glOrCanvas = null;
      if (!glOrCanvas) {
        glOrCanvas = implicitContext;
        if (!glOrCanvas) {
          var canvas = typeof OffscreenCanvas === "function" ? new OffscreenCanvas(1, 1) : typeof document !== "undefined" ? document.createElement("canvas") : null;
          if (!canvas) {
            throw new Error("OffscreenCanvas or DOM canvas not supported");
          }
          glOrCanvas = implicitContext = canvas.getContext("webgl", { depth: false });
        }
      }
      validateSupport(glOrCanvas);
      var rgbaData = new Uint8Array(sdfWidth * sdfHeight * 4);
      withWebGLContext(glOrCanvas, function(ref) {
        var gl = ref.gl;
        var withTexture = ref.withTexture;
        var withTextureFramebuffer = ref.withTextureFramebuffer;
        withTexture("readable", function(texture, textureUnit) {
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, sdfWidth, sdfHeight, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
          withTextureFramebuffer(texture, textureUnit, function(framebuffer) {
            generateIntoFramebuffer(
              sdfWidth,
              sdfHeight,
              path,
              viewBox,
              maxDistance,
              sdfExponent,
              gl,
              framebuffer,
              0,
              0,
              0
              // red channel
            );
            gl.readPixels(0, 0, sdfWidth, sdfHeight, gl.RGBA, gl.UNSIGNED_BYTE, rgbaData);
          });
        });
      });
      var data = new Uint8Array(sdfWidth * sdfHeight);
      for (var i2 = 0, j = 0; i2 < rgbaData.length; i2 += 4) {
        data[j++] = rgbaData[i2];
      }
      return data;
    }
    function generateIntoCanvas$1(sdfWidth, sdfHeight, path, viewBox, maxDistance, sdfExponent, canvas, x, y, channel) {
      if (sdfExponent === void 0) sdfExponent = 1;
      if (x === void 0) x = 0;
      if (y === void 0) y = 0;
      if (channel === void 0) channel = 0;
      generateIntoFramebuffer(sdfWidth, sdfHeight, path, viewBox, maxDistance, sdfExponent, canvas, null, x, y, channel);
    }
    function generateIntoFramebuffer(sdfWidth, sdfHeight, path, viewBox, maxDistance, sdfExponent, glOrCanvas, framebuffer, x, y, channel) {
      if (sdfExponent === void 0) sdfExponent = 1;
      if (x === void 0) x = 0;
      if (y === void 0) y = 0;
      if (channel === void 0) channel = 0;
      validateSupport(glOrCanvas);
      var lineSegmentCoords = [];
      pathToLineSegments(path, function(x1, y1, x2, y2) {
        lineSegmentCoords.push(x1, y1, x2, y2);
      });
      lineSegmentCoords = new Float32Array(lineSegmentCoords);
      withWebGLContext(glOrCanvas, function(ref) {
        var gl = ref.gl;
        var isWebGL2 = ref.isWebGL2;
        var getExtension = ref.getExtension;
        var withProgram = ref.withProgram;
        var withTexture = ref.withTexture;
        var withTextureFramebuffer = ref.withTextureFramebuffer;
        var handleContextLoss = ref.handleContextLoss;
        withTexture("rawDistances", function(intermediateTexture, intermediateTextureUnit) {
          if (sdfWidth !== intermediateTexture._lastWidth || sdfHeight !== intermediateTexture._lastHeight) {
            gl.texImage2D(
              gl.TEXTURE_2D,
              0,
              gl.RGBA,
              intermediateTexture._lastWidth = sdfWidth,
              intermediateTexture._lastHeight = sdfHeight,
              0,
              gl.RGBA,
              gl.UNSIGNED_BYTE,
              null
            );
          }
          withProgram("main", mainVertex, mainFragment, function(ref2) {
            var setAttribute = ref2.setAttribute;
            var setUniform = ref2.setUniform;
            var instancingExtension = !isWebGL2 && getExtension("ANGLE_instanced_arrays");
            var blendMinMaxExtension = !isWebGL2 && getExtension("EXT_blend_minmax");
            setAttribute("aUV", 2, gl.STATIC_DRAW, 0, viewportUVs);
            setAttribute("aLineSegment", 4, gl.DYNAMIC_DRAW, 1, lineSegmentCoords);
            setUniform.apply(void 0, ["4f", "uGlyphBounds"].concat(viewBox));
            setUniform("1f", "uMaxDistance", maxDistance);
            setUniform("1f", "uExponent", sdfExponent);
            withTextureFramebuffer(intermediateTexture, intermediateTextureUnit, function(framebuffer2) {
              gl.enable(gl.BLEND);
              gl.colorMask(true, true, true, true);
              gl.viewport(0, 0, sdfWidth, sdfHeight);
              gl.scissor(0, 0, sdfWidth, sdfHeight);
              gl.blendFunc(gl.ONE, gl.ONE);
              gl.blendEquationSeparate(gl.FUNC_ADD, isWebGL2 ? gl.MAX : blendMinMaxExtension.MAX_EXT);
              gl.clear(gl.COLOR_BUFFER_BIT);
              if (isWebGL2) {
                gl.drawArraysInstanced(gl.TRIANGLES, 0, 3, lineSegmentCoords.length / 4);
              } else {
                instancingExtension.drawArraysInstancedANGLE(gl.TRIANGLES, 0, 3, lineSegmentCoords.length / 4);
              }
            });
          });
          withProgram("post", viewportQuadVertex, postFragment, function(program) {
            program.setAttribute("aUV", 2, gl.STATIC_DRAW, 0, viewportUVs);
            program.setUniform("1i", "tex", intermediateTextureUnit);
            gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
            gl.disable(gl.BLEND);
            gl.colorMask(channel === 0, channel === 1, channel === 2, channel === 3);
            gl.viewport(x, y, sdfWidth, sdfHeight);
            gl.scissor(x, y, sdfWidth, sdfHeight);
            gl.drawArrays(gl.TRIANGLES, 0, 3);
          });
        });
        if (gl.isContextLost()) {
          handleContextLoss();
          throw new Error("webgl context lost");
        }
      });
    }
    function isSupported(glOrCanvas) {
      var key = !glOrCanvas || glOrCanvas === implicitContext ? NULL_OBJECT : glOrCanvas.canvas || glOrCanvas;
      var supported = supportByCanvas.get(key);
      if (supported === void 0) {
        isTestingSupport = true;
        var failReason = null;
        try {
          var expectedResult = [
            97,
            106,
            97,
            61,
            99,
            137,
            118,
            80,
            80,
            118,
            137,
            99,
            61,
            97,
            106,
            97
          ];
          var testResult = generate$1(
            4,
            4,
            "M8,8L16,8L24,24L16,24Z",
            [0, 0, 32, 32],
            24,
            1,
            glOrCanvas
          );
          supported = testResult && expectedResult.length === testResult.length && testResult.every(function(val, i2) {
            return val === expectedResult[i2];
          });
          if (!supported) {
            failReason = "bad trial run results";
            console.info(expectedResult, testResult);
          }
        } catch (err) {
          supported = false;
          failReason = err.message;
        }
        if (failReason) {
          console.warn("WebGL SDF generation not supported:", failReason);
        }
        isTestingSupport = false;
        supportByCanvas.set(key, supported);
      }
      return supported;
    }
    var webgl = Object.freeze({
      __proto__: null,
      generate: generate$1,
      generateIntoCanvas: generateIntoCanvas$1,
      generateIntoFramebuffer,
      isSupported
    });
    function generate(sdfWidth, sdfHeight, path, viewBox, maxDistance, sdfExponent) {
      if (maxDistance === void 0) maxDistance = Math.max(viewBox[2] - viewBox[0], viewBox[3] - viewBox[1]) / 2;
      if (sdfExponent === void 0) sdfExponent = 1;
      try {
        return generate$1.apply(webgl, arguments);
      } catch (e2) {
        console.info("WebGL SDF generation failed, falling back to JS", e2);
        return generate$2.apply(javascript, arguments);
      }
    }
    function generateIntoCanvas(sdfWidth, sdfHeight, path, viewBox, maxDistance, sdfExponent, canvas, x, y, channel) {
      if (maxDistance === void 0) maxDistance = Math.max(viewBox[2] - viewBox[0], viewBox[3] - viewBox[1]) / 2;
      if (sdfExponent === void 0) sdfExponent = 1;
      if (x === void 0) x = 0;
      if (y === void 0) y = 0;
      if (channel === void 0) channel = 0;
      try {
        return generateIntoCanvas$1.apply(webgl, arguments);
      } catch (e2) {
        console.info("WebGL SDF generation failed, falling back to JS", e2);
        return generateIntoCanvas$2.apply(javascript, arguments);
      }
    }
    exports2.forEachPathCommand = forEachPathCommand;
    exports2.generate = generate;
    exports2.generateIntoCanvas = generateIntoCanvas;
    exports2.javascript = javascript;
    exports2.pathToLineSegments = pathToLineSegments;
    exports2.webgl = webgl;
    exports2.webglUtils = webglUtils;
    Object.defineProperty(exports2, "__esModule", { value: true });
    return exports2;
  })({});
  return exports;
}

// node_modules/bidi-js/dist/bidi.mjs
function bidiFactory() {
  var bidi = (function(exports) {
    var DATA = {
      "R": "13k,1a,2,3,3,2+1j,ch+16,a+1,5+2,2+n,5,a,4,6+16,4+3,h+1b,4mo,179q,2+9,2+11,2i9+7y,2+68,4,3+4,5+13,4+3,2+4k,3+29,8+cf,1t+7z,w+17,3+3m,1t+3z,16o1+5r,8+30,8+mc,29+1r,29+4v,75+73",
      "EN": "1c+9,3d+1,6,187+9,513,4+5,7+9,sf+j,175h+9,qw+q,161f+1d,4xt+a,25i+9",
      "ES": "17,2,6dp+1,f+1,av,16vr,mx+1,4o,2",
      "ET": "z+2,3h+3,b+1,ym,3e+1,2o,p4+1,8,6u,7c,g6,1wc,1n9+4,30+1b,2n,6d,qhx+1,h0m,a+1,49+2,63+1,4+1,6bb+3,12jj",
      "AN": "16o+5,2j+9,2+1,35,ed,1ff2+9,87+u",
      "CS": "18,2+1,b,2u,12k,55v,l,17v0,2,3,53,2+1,b",
      "B": "a,3,f+2,2v,690",
      "S": "9,2,k",
      "WS": "c,k,4f4,1vk+a,u,1j,335",
      "ON": "x+1,4+4,h+5,r+5,r+3,z,5+3,2+1,2+1,5,2+2,3+4,o,w,ci+1,8+d,3+d,6+8,2+g,39+1,9,6+1,2,33,b8,3+1,3c+1,7+1,5r,b,7h+3,sa+5,2,3i+6,jg+3,ur+9,2v,ij+1,9g+9,7+a,8m,4+1,49+x,14u,2+2,c+2,e+2,e+2,e+1,i+n,e+e,2+p,u+2,e+2,36+1,2+3,2+1,b,2+2,6+5,2,2,2,h+1,5+4,6+3,3+f,16+2,5+3l,3+81,1y+p,2+40,q+a,m+13,2r+ch,2+9e,75+hf,3+v,2+2w,6e+5,f+6,75+2a,1a+p,2+2g,d+5x,r+b,6+3,4+o,g,6+1,6+2,2k+1,4,2j,5h+z,1m+1,1e+f,t+2,1f+e,d+3,4o+3,2s+1,w,535+1r,h3l+1i,93+2,2s,b+1,3l+x,2v,4g+3,21+3,kz+1,g5v+1,5a,j+9,n+v,2,3,2+8,2+1,3+2,2,3,46+1,4+4,h+5,r+5,r+a,3h+2,4+6,b+4,78,1r+24,4+c,4,1hb,ey+6,103+j,16j+c,1ux+7,5+g,fsh,jdq+1t,4,57+2e,p1,1m,1m,1m,1m,4kt+1,7j+17,5+2r,d+e,3+e,2+e,2+10,m+4,w,1n+5,1q,4z+5,4b+rb,9+c,4+c,4+37,d+2g,8+b,l+b,5+1j,9+9,7+13,9+t,3+1,27+3c,2+29,2+3q,d+d,3+4,4+2,6+6,a+o,8+6,a+2,e+6,16+42,2+1i",
      "BN": "0+8,6+d,2s+5,2+p,e,4m9,1kt+2,2b+5,5+5,17q9+v,7k,6p+8,6+1,119d+3,440+7,96s+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+75,6p+2rz,1ben+1,1ekf+1,1ekf+1",
      "NSM": "lc+33,7o+6,7c+18,2,2+1,2+1,2,21+a,1d+k,h,2u+6,3+5,3+1,2+3,10,v+q,2k+a,1n+8,a,p+3,2+8,2+2,2+4,18+2,3c+e,2+v,1k,2,5+7,5,4+6,b+1,u,1n,5+3,9,l+1,r,3+1,1m,5+1,5+1,3+2,4,v+1,4,c+1,1m,5+4,2+1,5,l+1,n+5,2,1n,3,2+3,9,8+1,c+1,v,1q,d,1f,4,1m+2,6+2,2+3,8+1,c+1,u,1n,g+1,l+1,t+1,1m+1,5+3,9,l+1,u,21,8+2,2,2j,3+6,d+7,2r,3+8,c+5,23+1,s,2,2,1k+d,2+4,2+1,6+a,2+z,a,2v+3,2+5,2+1,3+1,q+1,5+2,h+3,e,3+1,7,g,jk+2,qb+2,u+2,u+1,v+1,1t+1,2+6,9,3+a,a,1a+2,3c+1,z,3b+2,5+1,a,7+2,64+1,3,1n,2+6,2,2,3+7,7+9,3,1d+g,1s+3,1d,2+4,2,6,15+8,d+1,x+3,3+1,2+2,1l,2+1,4,2+2,1n+7,3+1,49+2,2+c,2+6,5,7,4+1,5j+1l,2+4,k1+w,2db+2,3y,2p+v,ff+3,30+1,n9x+3,2+9,x+1,29+1,7l,4,5,q+1,6,48+1,r+h,e,13+7,q+a,1b+2,1d,3+3,3+1,14,1w+5,3+1,3+1,d,9,1c,1g,2+2,3+1,6+1,2,17+1,9,6n,3,5,fn5,ki+f,h+f,r2,6b,46+4,1af+2,2+1,6+3,15+2,5,4m+1,fy+3,as+1,4a+a,4x,1j+e,1l+2,1e+3,3+1,1y+2,11+4,2+7,1r,d+1,1h+8,b+3,3,2o+2,3,2+1,7,4h,4+7,m+1,1m+1,4,12+6,4+4,5g+7,3+2,2,o,2d+5,2,5+1,2+1,6n+3,7+1,2+1,s+1,2e+7,3,2+1,2z,2,3+5,2,2u+2,3+3,2+4,78+8,2+1,75+1,2,5,41+3,3+1,5,x+5,3+1,15+5,3+3,9,a+5,3+2,1b+c,2+1,bb+6,2+5,2d+l,3+6,2+1,2+1,3f+5,4,2+1,2+6,2,21+1,4,2,9o+1,f0c+4,1o+6,t5,1s+3,2a,f5l+1,43t+2,i+7,3+6,v+3,45+2,1j0+1i,5+1d,9,f,n+4,2+e,11t+6,2+g,3+6,2+1,2+4,7a+6,c6+3,15t+6,32+6,gzhy+6n",
      "AL": "16w,3,2,e+1b,z+2,2+2s,g+1,8+1,b+m,2+t,s+2i,c+e,4h+f,1d+1e,1bwe+dp,3+3z,x+c,2+1,35+3y,2rm+z,5+7,b+5,dt+l,c+u,17nl+27,1t+27,4x+6n,3+d",
      "LRO": "6ct",
      "RLO": "6cu",
      "LRE": "6cq",
      "RLE": "6cr",
      "PDF": "6cs",
      "LRI": "6ee",
      "RLI": "6ef",
      "FSI": "6eg",
      "PDI": "6eh"
    };
    var TYPES = {};
    var TYPES_TO_NAMES = {};
    TYPES.L = 1;
    TYPES_TO_NAMES[1] = "L";
    Object.keys(DATA).forEach(function(type, i2) {
      TYPES[type] = 1 << i2 + 1;
      TYPES_TO_NAMES[TYPES[type]] = type;
    });
    Object.freeze(TYPES);
    var ISOLATE_INIT_TYPES = TYPES.LRI | TYPES.RLI | TYPES.FSI;
    var STRONG_TYPES = TYPES.L | TYPES.R | TYPES.AL;
    var NEUTRAL_ISOLATE_TYPES = TYPES.B | TYPES.S | TYPES.WS | TYPES.ON | TYPES.FSI | TYPES.LRI | TYPES.RLI | TYPES.PDI;
    var BN_LIKE_TYPES = TYPES.BN | TYPES.RLE | TYPES.LRE | TYPES.RLO | TYPES.LRO | TYPES.PDF;
    var TRAILING_TYPES = TYPES.S | TYPES.WS | TYPES.B | ISOLATE_INIT_TYPES | TYPES.PDI | BN_LIKE_TYPES;
    var map2 = null;
    function parseData() {
      if (!map2) {
        map2 = /* @__PURE__ */ new Map();
        var loop = function(type2) {
          if (DATA.hasOwnProperty(type2)) {
            var lastCode = 0;
            DATA[type2].split(",").forEach(function(range) {
              var ref = range.split("+");
              var skip = ref[0];
              var step = ref[1];
              skip = parseInt(skip, 36);
              step = step ? parseInt(step, 36) : 0;
              map2.set(lastCode += skip, TYPES[type2]);
              for (var i2 = 0; i2 < step; i2++) {
                map2.set(++lastCode, TYPES[type2]);
              }
            });
          }
        };
        for (var type in DATA) loop(type);
      }
    }
    function getBidiCharType(char) {
      parseData();
      return map2.get(char.codePointAt(0)) || TYPES.L;
    }
    function getBidiCharTypeName(char) {
      return TYPES_TO_NAMES[getBidiCharType(char)];
    }
    var data$1 = {
      "pairs": "14>1,1e>2,u>2,2wt>1,1>1,1ge>1,1wp>1,1j>1,f>1,hm>1,1>1,u>1,u6>1,1>1,+5,28>1,w>1,1>1,+3,b8>1,1>1,+3,1>3,-1>-1,3>1,1>1,+2,1s>1,1>1,x>1,th>1,1>1,+2,db>1,1>1,+3,3>1,1>1,+2,14qm>1,1>1,+1,4q>1,1e>2,u>2,2>1,+1",
      "canonical": "6f1>-6dx,6dy>-6dx,6ec>-6ed,6ee>-6ed,6ww>2jj,-2ji>2jj,14r4>-1e7l,1e7m>-1e7l,1e7m>-1e5c,1e5d>-1e5b,1e5c>-14qx,14qy>-14qx,14vn>-1ecg,1ech>-1ecg,1edu>-1ecg,1eci>-1ecg,1eda>-1ecg,1eci>-1ecg,1eci>-168q,168r>-168q,168s>-14ye,14yf>-14ye"
    };
    function parseCharacterMap(encodedString, includeReverse) {
      var radix = 36;
      var lastCode = 0;
      var map3 = /* @__PURE__ */ new Map();
      var reverseMap = includeReverse && /* @__PURE__ */ new Map();
      var prevPair;
      encodedString.split(",").forEach(function visit(entry) {
        if (entry.indexOf("+") !== -1) {
          for (var i2 = +entry; i2--; ) {
            visit(prevPair);
          }
        } else {
          prevPair = entry;
          var ref = entry.split(">");
          var a5 = ref[0];
          var b = ref[1];
          a5 = String.fromCodePoint(lastCode += parseInt(a5, radix));
          b = String.fromCodePoint(lastCode += parseInt(b, radix));
          map3.set(a5, b);
          includeReverse && reverseMap.set(b, a5);
        }
      });
      return { map: map3, reverseMap };
    }
    var openToClose, closeToOpen, canonical;
    function parse$1() {
      if (!openToClose) {
        var ref = parseCharacterMap(data$1.pairs, true);
        var map3 = ref.map;
        var reverseMap = ref.reverseMap;
        openToClose = map3;
        closeToOpen = reverseMap;
        canonical = parseCharacterMap(data$1.canonical, false).map;
      }
    }
    function openingToClosingBracket(char) {
      parse$1();
      return openToClose.get(char) || null;
    }
    function closingToOpeningBracket(char) {
      parse$1();
      return closeToOpen.get(char) || null;
    }
    function getCanonicalBracket(char) {
      parse$1();
      return canonical.get(char) || null;
    }
    var TYPE_L = TYPES.L;
    var TYPE_R = TYPES.R;
    var TYPE_EN = TYPES.EN;
    var TYPE_ES = TYPES.ES;
    var TYPE_ET = TYPES.ET;
    var TYPE_AN = TYPES.AN;
    var TYPE_CS = TYPES.CS;
    var TYPE_B = TYPES.B;
    var TYPE_S = TYPES.S;
    var TYPE_ON = TYPES.ON;
    var TYPE_BN = TYPES.BN;
    var TYPE_NSM = TYPES.NSM;
    var TYPE_AL = TYPES.AL;
    var TYPE_LRO = TYPES.LRO;
    var TYPE_RLO = TYPES.RLO;
    var TYPE_LRE = TYPES.LRE;
    var TYPE_RLE = TYPES.RLE;
    var TYPE_PDF = TYPES.PDF;
    var TYPE_LRI = TYPES.LRI;
    var TYPE_RLI = TYPES.RLI;
    var TYPE_FSI = TYPES.FSI;
    var TYPE_PDI = TYPES.PDI;
    function getEmbeddingLevels(string, baseDirection) {
      var MAX_DEPTH = 125;
      var charTypes = new Uint32Array(string.length);
      for (var i2 = 0; i2 < string.length; i2++) {
        charTypes[i2] = getBidiCharType(string[i2]);
      }
      var charTypeCounts = /* @__PURE__ */ new Map();
      function changeCharType(i3, type2) {
        var oldType = charTypes[i3];
        charTypes[i3] = type2;
        charTypeCounts.set(oldType, charTypeCounts.get(oldType) - 1);
        if (oldType & NEUTRAL_ISOLATE_TYPES) {
          charTypeCounts.set(NEUTRAL_ISOLATE_TYPES, charTypeCounts.get(NEUTRAL_ISOLATE_TYPES) - 1);
        }
        charTypeCounts.set(type2, (charTypeCounts.get(type2) || 0) + 1);
        if (type2 & NEUTRAL_ISOLATE_TYPES) {
          charTypeCounts.set(NEUTRAL_ISOLATE_TYPES, (charTypeCounts.get(NEUTRAL_ISOLATE_TYPES) || 0) + 1);
        }
      }
      var embedLevels = new Uint8Array(string.length);
      var isolationPairs = /* @__PURE__ */ new Map();
      var paragraphs = [];
      var paragraph = null;
      for (var i$1 = 0; i$1 < string.length; i$1++) {
        if (!paragraph) {
          paragraphs.push(paragraph = {
            start: i$1,
            end: string.length - 1,
            // 3.3.1 P2-P3: Determine the paragraph level
            level: baseDirection === "rtl" ? 1 : baseDirection === "ltr" ? 0 : determineAutoEmbedLevel(i$1, false)
          });
        }
        if (charTypes[i$1] & TYPE_B) {
          paragraph.end = i$1;
          paragraph = null;
        }
      }
      var FORMATTING_TYPES = TYPE_RLE | TYPE_LRE | TYPE_RLO | TYPE_LRO | ISOLATE_INIT_TYPES | TYPE_PDI | TYPE_PDF | TYPE_B;
      var nextEven = function(n2) {
        return n2 + (n2 & 1 ? 1 : 2);
      };
      var nextOdd = function(n2) {
        return n2 + (n2 & 1 ? 2 : 1);
      };
      for (var paraIdx = 0; paraIdx < paragraphs.length; paraIdx++) {
        paragraph = paragraphs[paraIdx];
        var statusStack = [{
          _level: paragraph.level,
          _override: 0,
          //0=neutral, 1=L, 2=R
          _isolate: 0
          //bool
        }];
        var stackTop = void 0;
        var overflowIsolateCount = 0;
        var overflowEmbeddingCount = 0;
        var validIsolateCount = 0;
        charTypeCounts.clear();
        for (var i$2 = paragraph.start; i$2 <= paragraph.end; i$2++) {
          var charType = charTypes[i$2];
          stackTop = statusStack[statusStack.length - 1];
          charTypeCounts.set(charType, (charTypeCounts.get(charType) || 0) + 1);
          if (charType & NEUTRAL_ISOLATE_TYPES) {
            charTypeCounts.set(NEUTRAL_ISOLATE_TYPES, (charTypeCounts.get(NEUTRAL_ISOLATE_TYPES) || 0) + 1);
          }
          if (charType & FORMATTING_TYPES) {
            if (charType & (TYPE_RLE | TYPE_LRE)) {
              embedLevels[i$2] = stackTop._level;
              var level = (charType === TYPE_RLE ? nextOdd : nextEven)(stackTop._level);
              if (level <= MAX_DEPTH && !overflowIsolateCount && !overflowEmbeddingCount) {
                statusStack.push({
                  _level: level,
                  _override: 0,
                  _isolate: 0
                });
              } else if (!overflowIsolateCount) {
                overflowEmbeddingCount++;
              }
            } else if (charType & (TYPE_RLO | TYPE_LRO)) {
              embedLevels[i$2] = stackTop._level;
              var level$1 = (charType === TYPE_RLO ? nextOdd : nextEven)(stackTop._level);
              if (level$1 <= MAX_DEPTH && !overflowIsolateCount && !overflowEmbeddingCount) {
                statusStack.push({
                  _level: level$1,
                  _override: charType & TYPE_RLO ? TYPE_R : TYPE_L,
                  _isolate: 0
                });
              } else if (!overflowIsolateCount) {
                overflowEmbeddingCount++;
              }
            } else if (charType & ISOLATE_INIT_TYPES) {
              if (charType & TYPE_FSI) {
                charType = determineAutoEmbedLevel(i$2 + 1, true) === 1 ? TYPE_RLI : TYPE_LRI;
              }
              embedLevels[i$2] = stackTop._level;
              if (stackTop._override) {
                changeCharType(i$2, stackTop._override);
              }
              var level$2 = (charType === TYPE_RLI ? nextOdd : nextEven)(stackTop._level);
              if (level$2 <= MAX_DEPTH && overflowIsolateCount === 0 && overflowEmbeddingCount === 0) {
                validIsolateCount++;
                statusStack.push({
                  _level: level$2,
                  _override: 0,
                  _isolate: 1,
                  _isolInitIndex: i$2
                });
              } else {
                overflowIsolateCount++;
              }
            } else if (charType & TYPE_PDI) {
              if (overflowIsolateCount > 0) {
                overflowIsolateCount--;
              } else if (validIsolateCount > 0) {
                overflowEmbeddingCount = 0;
                while (!statusStack[statusStack.length - 1]._isolate) {
                  statusStack.pop();
                }
                var isolInitIndex = statusStack[statusStack.length - 1]._isolInitIndex;
                if (isolInitIndex != null) {
                  isolationPairs.set(isolInitIndex, i$2);
                  isolationPairs.set(i$2, isolInitIndex);
                }
                statusStack.pop();
                validIsolateCount--;
              }
              stackTop = statusStack[statusStack.length - 1];
              embedLevels[i$2] = stackTop._level;
              if (stackTop._override) {
                changeCharType(i$2, stackTop._override);
              }
            } else if (charType & TYPE_PDF) {
              if (overflowIsolateCount === 0) {
                if (overflowEmbeddingCount > 0) {
                  overflowEmbeddingCount--;
                } else if (!stackTop._isolate && statusStack.length > 1) {
                  statusStack.pop();
                  stackTop = statusStack[statusStack.length - 1];
                }
              }
              embedLevels[i$2] = stackTop._level;
            } else if (charType & TYPE_B) {
              embedLevels[i$2] = paragraph.level;
            }
          } else {
            embedLevels[i$2] = stackTop._level;
            if (stackTop._override && charType !== TYPE_BN) {
              changeCharType(i$2, stackTop._override);
            }
          }
        }
        var levelRuns = [];
        var currentRun = null;
        for (var i$3 = paragraph.start; i$3 <= paragraph.end; i$3++) {
          var charType$1 = charTypes[i$3];
          if (!(charType$1 & BN_LIKE_TYPES)) {
            var lvl = embedLevels[i$3];
            var isIsolInit = charType$1 & ISOLATE_INIT_TYPES;
            var isPDI = charType$1 === TYPE_PDI;
            if (currentRun && lvl === currentRun._level) {
              currentRun._end = i$3;
              currentRun._endsWithIsolInit = isIsolInit;
            } else {
              levelRuns.push(currentRun = {
                _start: i$3,
                _end: i$3,
                _level: lvl,
                _startsWithPDI: isPDI,
                _endsWithIsolInit: isIsolInit
              });
            }
          }
        }
        var isolatingRunSeqs = [];
        for (var runIdx = 0; runIdx < levelRuns.length; runIdx++) {
          var run = levelRuns[runIdx];
          if (!run._startsWithPDI || run._startsWithPDI && !isolationPairs.has(run._start)) {
            var seqRuns = [currentRun = run];
            for (var pdiIndex = void 0; currentRun && currentRun._endsWithIsolInit && (pdiIndex = isolationPairs.get(currentRun._end)) != null; ) {
              for (var i$4 = runIdx + 1; i$4 < levelRuns.length; i$4++) {
                if (levelRuns[i$4]._start === pdiIndex) {
                  seqRuns.push(currentRun = levelRuns[i$4]);
                  break;
                }
              }
            }
            var seqIndices = [];
            for (var i$5 = 0; i$5 < seqRuns.length; i$5++) {
              var run$1 = seqRuns[i$5];
              for (var j = run$1._start; j <= run$1._end; j++) {
                seqIndices.push(j);
              }
            }
            var firstLevel = embedLevels[seqIndices[0]];
            var prevLevel = paragraph.level;
            for (var i$6 = seqIndices[0] - 1; i$6 >= 0; i$6--) {
              if (!(charTypes[i$6] & BN_LIKE_TYPES)) {
                prevLevel = embedLevels[i$6];
                break;
              }
            }
            var lastIndex = seqIndices[seqIndices.length - 1];
            var lastLevel = embedLevels[lastIndex];
            var nextLevel = paragraph.level;
            if (!(charTypes[lastIndex] & ISOLATE_INIT_TYPES)) {
              for (var i$7 = lastIndex + 1; i$7 <= paragraph.end; i$7++) {
                if (!(charTypes[i$7] & BN_LIKE_TYPES)) {
                  nextLevel = embedLevels[i$7];
                  break;
                }
              }
            }
            isolatingRunSeqs.push({
              _seqIndices: seqIndices,
              _sosType: Math.max(prevLevel, firstLevel) % 2 ? TYPE_R : TYPE_L,
              _eosType: Math.max(nextLevel, lastLevel) % 2 ? TYPE_R : TYPE_L
            });
          }
        }
        for (var seqIdx = 0; seqIdx < isolatingRunSeqs.length; seqIdx++) {
          var ref = isolatingRunSeqs[seqIdx];
          var seqIndices$1 = ref._seqIndices;
          var sosType = ref._sosType;
          var eosType = ref._eosType;
          var embedDirection = embedLevels[seqIndices$1[0]] & 1 ? TYPE_R : TYPE_L;
          if (charTypeCounts.get(TYPE_NSM)) {
            for (var si = 0; si < seqIndices$1.length; si++) {
              var i$8 = seqIndices$1[si];
              if (charTypes[i$8] & TYPE_NSM) {
                var prevType = sosType;
                for (var sj = si - 1; sj >= 0; sj--) {
                  if (!(charTypes[seqIndices$1[sj]] & BN_LIKE_TYPES)) {
                    prevType = charTypes[seqIndices$1[sj]];
                    break;
                  }
                }
                changeCharType(i$8, prevType & (ISOLATE_INIT_TYPES | TYPE_PDI) ? TYPE_ON : prevType);
              }
            }
          }
          if (charTypeCounts.get(TYPE_EN)) {
            for (var si$1 = 0; si$1 < seqIndices$1.length; si$1++) {
              var i$9 = seqIndices$1[si$1];
              if (charTypes[i$9] & TYPE_EN) {
                for (var sj$1 = si$1 - 1; sj$1 >= -1; sj$1--) {
                  var prevCharType = sj$1 === -1 ? sosType : charTypes[seqIndices$1[sj$1]];
                  if (prevCharType & STRONG_TYPES) {
                    if (prevCharType === TYPE_AL) {
                      changeCharType(i$9, TYPE_AN);
                    }
                    break;
                  }
                }
              }
            }
          }
          if (charTypeCounts.get(TYPE_AL)) {
            for (var si$2 = 0; si$2 < seqIndices$1.length; si$2++) {
              var i$10 = seqIndices$1[si$2];
              if (charTypes[i$10] & TYPE_AL) {
                changeCharType(i$10, TYPE_R);
              }
            }
          }
          if (charTypeCounts.get(TYPE_ES) || charTypeCounts.get(TYPE_CS)) {
            for (var si$3 = 1; si$3 < seqIndices$1.length - 1; si$3++) {
              var i$11 = seqIndices$1[si$3];
              if (charTypes[i$11] & (TYPE_ES | TYPE_CS)) {
                var prevType$1 = 0, nextType = 0;
                for (var sj$2 = si$3 - 1; sj$2 >= 0; sj$2--) {
                  prevType$1 = charTypes[seqIndices$1[sj$2]];
                  if (!(prevType$1 & BN_LIKE_TYPES)) {
                    break;
                  }
                }
                for (var sj$3 = si$3 + 1; sj$3 < seqIndices$1.length; sj$3++) {
                  nextType = charTypes[seqIndices$1[sj$3]];
                  if (!(nextType & BN_LIKE_TYPES)) {
                    break;
                  }
                }
                if (prevType$1 === nextType && (charTypes[i$11] === TYPE_ES ? prevType$1 === TYPE_EN : prevType$1 & (TYPE_EN | TYPE_AN))) {
                  changeCharType(i$11, prevType$1);
                }
              }
            }
          }
          if (charTypeCounts.get(TYPE_EN)) {
            for (var si$4 = 0; si$4 < seqIndices$1.length; si$4++) {
              var i$12 = seqIndices$1[si$4];
              if (charTypes[i$12] & TYPE_EN) {
                for (var sj$4 = si$4 - 1; sj$4 >= 0 && charTypes[seqIndices$1[sj$4]] & (TYPE_ET | BN_LIKE_TYPES); sj$4--) {
                  changeCharType(seqIndices$1[sj$4], TYPE_EN);
                }
                for (si$4++; si$4 < seqIndices$1.length && charTypes[seqIndices$1[si$4]] & (TYPE_ET | BN_LIKE_TYPES | TYPE_EN); si$4++) {
                  if (charTypes[seqIndices$1[si$4]] !== TYPE_EN) {
                    changeCharType(seqIndices$1[si$4], TYPE_EN);
                  }
                }
              }
            }
          }
          if (charTypeCounts.get(TYPE_ET) || charTypeCounts.get(TYPE_ES) || charTypeCounts.get(TYPE_CS)) {
            for (var si$5 = 0; si$5 < seqIndices$1.length; si$5++) {
              var i$13 = seqIndices$1[si$5];
              if (charTypes[i$13] & (TYPE_ET | TYPE_ES | TYPE_CS)) {
                changeCharType(i$13, TYPE_ON);
                for (var sj$5 = si$5 - 1; sj$5 >= 0 && charTypes[seqIndices$1[sj$5]] & BN_LIKE_TYPES; sj$5--) {
                  changeCharType(seqIndices$1[sj$5], TYPE_ON);
                }
                for (var sj$6 = si$5 + 1; sj$6 < seqIndices$1.length && charTypes[seqIndices$1[sj$6]] & BN_LIKE_TYPES; sj$6++) {
                  changeCharType(seqIndices$1[sj$6], TYPE_ON);
                }
              }
            }
          }
          if (charTypeCounts.get(TYPE_EN)) {
            for (var si$6 = 0, prevStrongType = sosType; si$6 < seqIndices$1.length; si$6++) {
              var i$14 = seqIndices$1[si$6];
              var type = charTypes[i$14];
              if (type & TYPE_EN) {
                if (prevStrongType === TYPE_L) {
                  changeCharType(i$14, TYPE_L);
                }
              } else if (type & STRONG_TYPES) {
                prevStrongType = type;
              }
            }
          }
          if (charTypeCounts.get(NEUTRAL_ISOLATE_TYPES)) {
            var R_TYPES_FOR_N_STEPS = TYPE_R | TYPE_EN | TYPE_AN;
            var STRONG_TYPES_FOR_N_STEPS = R_TYPES_FOR_N_STEPS | TYPE_L;
            var bracketPairs = [];
            {
              var openerStack = [];
              for (var si$7 = 0; si$7 < seqIndices$1.length; si$7++) {
                if (charTypes[seqIndices$1[si$7]] & NEUTRAL_ISOLATE_TYPES) {
                  var char = string[seqIndices$1[si$7]];
                  var oppositeBracket = void 0;
                  if (openingToClosingBracket(char) !== null) {
                    if (openerStack.length < 63) {
                      openerStack.push({ char, seqIndex: si$7 });
                    } else {
                      break;
                    }
                  } else if ((oppositeBracket = closingToOpeningBracket(char)) !== null) {
                    for (var stackIdx = openerStack.length - 1; stackIdx >= 0; stackIdx--) {
                      var stackChar = openerStack[stackIdx].char;
                      if (stackChar === oppositeBracket || stackChar === closingToOpeningBracket(getCanonicalBracket(char)) || openingToClosingBracket(getCanonicalBracket(stackChar)) === char) {
                        bracketPairs.push([openerStack[stackIdx].seqIndex, si$7]);
                        openerStack.length = stackIdx;
                        break;
                      }
                    }
                  }
                }
              }
              bracketPairs.sort(function(a5, b) {
                return a5[0] - b[0];
              });
            }
            for (var pairIdx = 0; pairIdx < bracketPairs.length; pairIdx++) {
              var ref$1 = bracketPairs[pairIdx];
              var openSeqIdx = ref$1[0];
              var closeSeqIdx = ref$1[1];
              var foundStrongType = false;
              var useStrongType = 0;
              for (var si$8 = openSeqIdx + 1; si$8 < closeSeqIdx; si$8++) {
                var i$15 = seqIndices$1[si$8];
                if (charTypes[i$15] & STRONG_TYPES_FOR_N_STEPS) {
                  foundStrongType = true;
                  var lr = charTypes[i$15] & R_TYPES_FOR_N_STEPS ? TYPE_R : TYPE_L;
                  if (lr === embedDirection) {
                    useStrongType = lr;
                    break;
                  }
                }
              }
              if (foundStrongType && !useStrongType) {
                useStrongType = sosType;
                for (var si$9 = openSeqIdx - 1; si$9 >= 0; si$9--) {
                  var i$16 = seqIndices$1[si$9];
                  if (charTypes[i$16] & STRONG_TYPES_FOR_N_STEPS) {
                    var lr$1 = charTypes[i$16] & R_TYPES_FOR_N_STEPS ? TYPE_R : TYPE_L;
                    if (lr$1 !== embedDirection) {
                      useStrongType = lr$1;
                    } else {
                      useStrongType = embedDirection;
                    }
                    break;
                  }
                }
              }
              if (useStrongType) {
                charTypes[seqIndices$1[openSeqIdx]] = charTypes[seqIndices$1[closeSeqIdx]] = useStrongType;
                if (useStrongType !== embedDirection) {
                  for (var si$10 = openSeqIdx + 1; si$10 < seqIndices$1.length; si$10++) {
                    if (!(charTypes[seqIndices$1[si$10]] & BN_LIKE_TYPES)) {
                      if (getBidiCharType(string[seqIndices$1[si$10]]) & TYPE_NSM) {
                        charTypes[seqIndices$1[si$10]] = useStrongType;
                      }
                      break;
                    }
                  }
                }
                if (useStrongType !== embedDirection) {
                  for (var si$11 = closeSeqIdx + 1; si$11 < seqIndices$1.length; si$11++) {
                    if (!(charTypes[seqIndices$1[si$11]] & BN_LIKE_TYPES)) {
                      if (getBidiCharType(string[seqIndices$1[si$11]]) & TYPE_NSM) {
                        charTypes[seqIndices$1[si$11]] = useStrongType;
                      }
                      break;
                    }
                  }
                }
              }
            }
            for (var si$12 = 0; si$12 < seqIndices$1.length; si$12++) {
              if (charTypes[seqIndices$1[si$12]] & NEUTRAL_ISOLATE_TYPES) {
                var niRunStart = si$12, niRunEnd = si$12;
                var prevType$2 = sosType;
                for (var si2 = si$12 - 1; si2 >= 0; si2--) {
                  if (charTypes[seqIndices$1[si2]] & BN_LIKE_TYPES) {
                    niRunStart = si2;
                  } else {
                    prevType$2 = charTypes[seqIndices$1[si2]] & R_TYPES_FOR_N_STEPS ? TYPE_R : TYPE_L;
                    break;
                  }
                }
                var nextType$1 = eosType;
                for (var si2$1 = si$12 + 1; si2$1 < seqIndices$1.length; si2$1++) {
                  if (charTypes[seqIndices$1[si2$1]] & (NEUTRAL_ISOLATE_TYPES | BN_LIKE_TYPES)) {
                    niRunEnd = si2$1;
                  } else {
                    nextType$1 = charTypes[seqIndices$1[si2$1]] & R_TYPES_FOR_N_STEPS ? TYPE_R : TYPE_L;
                    break;
                  }
                }
                for (var sj$7 = niRunStart; sj$7 <= niRunEnd; sj$7++) {
                  charTypes[seqIndices$1[sj$7]] = prevType$2 === nextType$1 ? prevType$2 : embedDirection;
                }
                si$12 = niRunEnd;
              }
            }
          }
        }
        for (var i$17 = paragraph.start; i$17 <= paragraph.end; i$17++) {
          var level$3 = embedLevels[i$17];
          var type$1 = charTypes[i$17];
          if (level$3 & 1) {
            if (type$1 & (TYPE_L | TYPE_EN | TYPE_AN)) {
              embedLevels[i$17]++;
            }
          } else {
            if (type$1 & TYPE_R) {
              embedLevels[i$17]++;
            } else if (type$1 & (TYPE_AN | TYPE_EN)) {
              embedLevels[i$17] += 2;
            }
          }
          if (type$1 & BN_LIKE_TYPES) {
            embedLevels[i$17] = i$17 === 0 ? paragraph.level : embedLevels[i$17 - 1];
          }
          if (i$17 === paragraph.end || getBidiCharType(string[i$17]) & (TYPE_S | TYPE_B)) {
            for (var j$1 = i$17; j$1 >= 0 && getBidiCharType(string[j$1]) & TRAILING_TYPES; j$1--) {
              embedLevels[j$1] = paragraph.level;
            }
          }
        }
      }
      return {
        levels: embedLevels,
        paragraphs
      };
      function determineAutoEmbedLevel(start, isFSI) {
        for (var i3 = start; i3 < string.length; i3++) {
          var charType2 = charTypes[i3];
          if (charType2 & (TYPE_R | TYPE_AL)) {
            return 1;
          }
          if (charType2 & (TYPE_B | TYPE_L) || isFSI && charType2 === TYPE_PDI) {
            return 0;
          }
          if (charType2 & ISOLATE_INIT_TYPES) {
            var pdi = indexOfMatchingPDI(i3);
            i3 = pdi === -1 ? string.length : pdi;
          }
        }
        return 0;
      }
      function indexOfMatchingPDI(isolateStart) {
        var isolationLevel = 1;
        for (var i3 = isolateStart + 1; i3 < string.length; i3++) {
          var charType2 = charTypes[i3];
          if (charType2 & TYPE_B) {
            break;
          }
          if (charType2 & TYPE_PDI) {
            if (--isolationLevel === 0) {
              return i3;
            }
          } else if (charType2 & ISOLATE_INIT_TYPES) {
            isolationLevel++;
          }
        }
        return -1;
      }
    }
    var data = "14>1,j>2,t>2,u>2,1a>g,2v3>1,1>1,1ge>1,1wd>1,b>1,1j>1,f>1,ai>3,-2>3,+1,8>1k0,-1jq>1y7,-1y6>1hf,-1he>1h6,-1h5>1ha,-1h8>1qi,-1pu>1,6>3u,-3s>7,6>1,1>1,f>1,1>1,+2,3>1,1>1,+13,4>1,1>1,6>1eo,-1ee>1,3>1mg,-1me>1mk,-1mj>1mi,-1mg>1mi,-1md>1,1>1,+2,1>10k,-103>1,1>1,4>1,5>1,1>1,+10,3>1,1>8,-7>8,+1,-6>7,+1,a>1,1>1,u>1,u6>1,1>1,+5,26>1,1>1,2>1,2>2,8>1,7>1,4>1,1>1,+5,b8>1,1>1,+3,1>3,-2>1,2>1,1>1,+2,c>1,3>1,1>1,+2,h>1,3>1,a>1,1>1,2>1,3>1,1>1,d>1,f>1,3>1,1a>1,1>1,6>1,7>1,13>1,k>1,1>1,+19,4>1,1>1,+2,2>1,1>1,+18,m>1,a>1,1>1,lk>1,1>1,4>1,2>1,f>1,3>1,1>1,+3,db>1,1>1,+3,3>1,1>1,+2,14qm>1,1>1,+1,6>1,4j>1,j>2,t>2,u>2,2>1,+1";
    var mirrorMap;
    function parse2() {
      if (!mirrorMap) {
        var ref = parseCharacterMap(data, true);
        var map3 = ref.map;
        var reverseMap = ref.reverseMap;
        reverseMap.forEach(function(value, key) {
          map3.set(key, value);
        });
        mirrorMap = map3;
      }
    }
    function getMirroredCharacter(char) {
      parse2();
      return mirrorMap.get(char) || null;
    }
    function getMirroredCharactersMap(string, embeddingLevels, start, end) {
      var strLen = string.length;
      start = Math.max(0, start == null ? 0 : +start);
      end = Math.min(strLen - 1, end == null ? strLen - 1 : +end);
      var map3 = /* @__PURE__ */ new Map();
      for (var i2 = start; i2 <= end; i2++) {
        if (embeddingLevels[i2] & 1) {
          var mirror = getMirroredCharacter(string[i2]);
          if (mirror !== null) {
            map3.set(i2, mirror);
          }
        }
      }
      return map3;
    }
    function getReorderSegments(string, embeddingLevelsResult, start, end) {
      var strLen = string.length;
      start = Math.max(0, start == null ? 0 : +start);
      end = Math.min(strLen - 1, end == null ? strLen - 1 : +end);
      var segments = [];
      embeddingLevelsResult.paragraphs.forEach(function(paragraph) {
        var lineStart = Math.max(start, paragraph.start);
        var lineEnd = Math.min(end, paragraph.end);
        if (lineStart < lineEnd) {
          var lineLevels = embeddingLevelsResult.levels.slice(lineStart, lineEnd + 1);
          for (var i2 = lineEnd; i2 >= lineStart && getBidiCharType(string[i2]) & TRAILING_TYPES; i2--) {
            lineLevels[i2] = paragraph.level;
          }
          var maxLevel = paragraph.level;
          var minOddLevel = Infinity;
          for (var i$1 = 0; i$1 < lineLevels.length; i$1++) {
            var level = lineLevels[i$1];
            if (level > maxLevel) {
              maxLevel = level;
            }
            if (level < minOddLevel) {
              minOddLevel = level | 1;
            }
          }
          for (var lvl = maxLevel; lvl >= minOddLevel; lvl--) {
            for (var i$2 = 0; i$2 < lineLevels.length; i$2++) {
              if (lineLevels[i$2] >= lvl) {
                var segStart = i$2;
                while (i$2 + 1 < lineLevels.length && lineLevels[i$2 + 1] >= lvl) {
                  i$2++;
                }
                if (i$2 > segStart) {
                  segments.push([segStart + lineStart, i$2 + lineStart]);
                }
              }
            }
          }
        }
      });
      return segments;
    }
    function getReorderedString(string, embedLevelsResult, start, end) {
      var indices = getReorderedIndices(string, embedLevelsResult, start, end);
      var chars = [].concat(string);
      indices.forEach(function(charIndex, i2) {
        chars[i2] = (embedLevelsResult.levels[charIndex] & 1 ? getMirroredCharacter(string[charIndex]) : null) || string[charIndex];
      });
      return chars.join("");
    }
    function getReorderedIndices(string, embedLevelsResult, start, end) {
      var segments = getReorderSegments(string, embedLevelsResult, start, end);
      var indices = [];
      for (var i2 = 0; i2 < string.length; i2++) {
        indices[i2] = i2;
      }
      segments.forEach(function(ref) {
        var start2 = ref[0];
        var end2 = ref[1];
        var slice = indices.slice(start2, end2 + 1);
        for (var i3 = slice.length; i3--; ) {
          indices[end2 - i3] = slice[i3];
        }
      });
      return indices;
    }
    exports.closingToOpeningBracket = closingToOpeningBracket;
    exports.getBidiCharType = getBidiCharType;
    exports.getBidiCharTypeName = getBidiCharTypeName;
    exports.getCanonicalBracket = getCanonicalBracket;
    exports.getEmbeddingLevels = getEmbeddingLevels;
    exports.getMirroredCharacter = getMirroredCharacter;
    exports.getMirroredCharactersMap = getMirroredCharactersMap;
    exports.getReorderSegments = getReorderSegments;
    exports.getReorderedIndices = getReorderedIndices;
    exports.getReorderedString = getReorderedString;
    exports.openingToClosingBracket = openingToClosingBracket;
    Object.defineProperty(exports, "__esModule", { value: true });
    return exports;
  })({});
  return bidi;
}
var bidi_default = bidiFactory;

// node_modules/troika-three-utils/dist/troika-three-utils.esm.js
var voidMainRegExp = /\bvoid\s+main\s*\(\s*\)\s*{/g;
function expandShaderIncludes(source) {
  const pattern = /^[ \t]*#include +<([\w\d./]+)>/gm;
  function replace(match, include) {
    let chunk = ShaderChunk[include];
    return chunk ? expandShaderIncludes(chunk) : match;
  }
  return source.replace(pattern, replace);
}
var _lut = [];
for (let i2 = 0; i2 < 256; i2++) {
  _lut[i2] = (i2 < 16 ? "0" : "") + i2.toString(16);
}
function generateUUID() {
  const d0 = Math.random() * 4294967295 | 0;
  const d1 = Math.random() * 4294967295 | 0;
  const d2 = Math.random() * 4294967295 | 0;
  const d3 = Math.random() * 4294967295 | 0;
  const uuid = _lut[d0 & 255] + _lut[d0 >> 8 & 255] + _lut[d0 >> 16 & 255] + _lut[d0 >> 24 & 255] + "-" + _lut[d1 & 255] + _lut[d1 >> 8 & 255] + "-" + _lut[d1 >> 16 & 15 | 64] + _lut[d1 >> 24 & 255] + "-" + _lut[d2 & 63 | 128] + _lut[d2 >> 8 & 255] + "-" + _lut[d2 >> 16 & 255] + _lut[d2 >> 24 & 255] + _lut[d3 & 255] + _lut[d3 >> 8 & 255] + _lut[d3 >> 16 & 255] + _lut[d3 >> 24 & 255];
  return uuid.toUpperCase();
}
var assign = Object.assign || function() {
  let target = arguments[0];
  for (let i2 = 1, len = arguments.length; i2 < len; i2++) {
    let source = arguments[i2];
    if (source) {
      for (let prop in source) {
        if (Object.prototype.hasOwnProperty.call(source, prop)) {
          target[prop] = source[prop];
        }
      }
    }
  }
  return target;
};
var epoch = Date.now();
var CONSTRUCTOR_CACHE = /* @__PURE__ */ new WeakMap();
var SHADER_UPGRADE_CACHE = /* @__PURE__ */ new Map();
var materialInstanceId = 1e10;
function createDerivedMaterial(baseMaterial, options) {
  const optionsKey = getKeyForOptions(options);
  let ctorsByDerivation = CONSTRUCTOR_CACHE.get(baseMaterial);
  if (!ctorsByDerivation) {
    CONSTRUCTOR_CACHE.set(baseMaterial, ctorsByDerivation = /* @__PURE__ */ Object.create(null));
  }
  if (ctorsByDerivation[optionsKey]) {
    return new ctorsByDerivation[optionsKey]();
  }
  const privateBeforeCompileProp = `_onBeforeCompile${optionsKey}`;
  const onBeforeCompile = function(shaderInfo, renderer) {
    baseMaterial.onBeforeCompile.call(this, shaderInfo, renderer);
    const cacheKey = this.customProgramCacheKey() + "|" + shaderInfo.vertexShader + "|" + shaderInfo.fragmentShader;
    let upgradedShaders = SHADER_UPGRADE_CACHE[cacheKey];
    if (!upgradedShaders) {
      const upgraded = upgradeShaders(this, shaderInfo, options, optionsKey);
      upgradedShaders = SHADER_UPGRADE_CACHE[cacheKey] = upgraded;
    }
    shaderInfo.vertexShader = upgradedShaders.vertexShader;
    shaderInfo.fragmentShader = upgradedShaders.fragmentShader;
    assign(shaderInfo.uniforms, this.uniforms);
    if (options.timeUniform) {
      shaderInfo.uniforms[options.timeUniform] = {
        get value() {
          return Date.now() - epoch;
        }
      };
    }
    if (this[privateBeforeCompileProp]) {
      this[privateBeforeCompileProp](shaderInfo);
    }
  };
  const DerivedMaterial = function DerivedMaterial2() {
    return derive(options.chained ? baseMaterial : baseMaterial.clone());
  };
  const derive = function(base) {
    const derived = Object.create(base, descriptor);
    Object.defineProperty(derived, "baseMaterial", { value: baseMaterial });
    Object.defineProperty(derived, "id", { value: materialInstanceId++ });
    derived.uuid = generateUUID();
    derived.uniforms = assign({}, base.uniforms, options.uniforms);
    derived.defines = assign({}, base.defines, options.defines);
    derived.defines[`TROIKA_DERIVED_MATERIAL_${optionsKey}`] = "";
    derived.extensions = assign({}, base.extensions, options.extensions);
    derived._listeners = void 0;
    return derived;
  };
  const descriptor = {
    constructor: { value: DerivedMaterial },
    isDerivedMaterial: { value: true },
    type: {
      get: () => baseMaterial.type,
      set: (value) => {
        baseMaterial.type = value;
      }
    },
    isDerivedFrom: {
      writable: true,
      configurable: true,
      value: function(testMaterial) {
        const base = this.baseMaterial;
        return testMaterial === base || base.isDerivedMaterial && base.isDerivedFrom(testMaterial) || false;
      }
    },
    customProgramCacheKey: {
      writable: true,
      configurable: true,
      value: function() {
        return baseMaterial.customProgramCacheKey() + "|" + optionsKey;
      }
    },
    onBeforeCompile: {
      get() {
        return onBeforeCompile;
      },
      set(fn) {
        this[privateBeforeCompileProp] = fn;
      }
    },
    copy: {
      writable: true,
      configurable: true,
      value: function(source) {
        baseMaterial.copy.call(this, source);
        if (!baseMaterial.isShaderMaterial && !baseMaterial.isDerivedMaterial) {
          assign(this.extensions, source.extensions);
          assign(this.defines, source.defines);
          assign(this.uniforms, UniformsUtils.clone(source.uniforms));
        }
        return this;
      }
    },
    clone: {
      writable: true,
      configurable: true,
      value: function() {
        const newBase = new baseMaterial.constructor();
        return derive(newBase).copy(this);
      }
    },
    /**
     * Utility to get a MeshDepthMaterial that will honor this derived material's vertex
     * transformations and discarded fragments.
     */
    getDepthMaterial: {
      writable: true,
      configurable: true,
      value: function() {
        let depthMaterial = this._depthMaterial;
        if (!depthMaterial) {
          depthMaterial = this._depthMaterial = createDerivedMaterial(
            baseMaterial.isDerivedMaterial ? baseMaterial.getDepthMaterial() : new MeshDepthMaterial({ depthPacking: RGBADepthPacking }),
            options
          );
          depthMaterial.defines.IS_DEPTH_MATERIAL = "";
          depthMaterial.uniforms = this.uniforms;
        }
        return depthMaterial;
      }
    },
    /**
     * Utility to get a MeshDistanceMaterial that will honor this derived material's vertex
     * transformations and discarded fragments.
     */
    getDistanceMaterial: {
      writable: true,
      configurable: true,
      value: function() {
        let distanceMaterial = this._distanceMaterial;
        if (!distanceMaterial) {
          distanceMaterial = this._distanceMaterial = createDerivedMaterial(
            baseMaterial.isDerivedMaterial ? baseMaterial.getDistanceMaterial() : new MeshDistanceMaterial(),
            options
          );
          distanceMaterial.defines.IS_DISTANCE_MATERIAL = "";
          distanceMaterial.uniforms = this.uniforms;
        }
        return distanceMaterial;
      }
    },
    dispose: {
      writable: true,
      configurable: true,
      value() {
        const { _depthMaterial, _distanceMaterial } = this;
        if (_depthMaterial) _depthMaterial.dispose();
        if (_distanceMaterial) _distanceMaterial.dispose();
        baseMaterial.dispose.call(this);
      }
    }
  };
  ctorsByDerivation[optionsKey] = DerivedMaterial;
  return new DerivedMaterial();
}
function upgradeShaders(material, { vertexShader: vertexShader3, fragmentShader: fragmentShader3 }, options, key) {
  let {
    vertexDefs,
    vertexMainIntro,
    vertexMainOutro,
    vertexTransform,
    fragmentDefs,
    fragmentMainIntro,
    fragmentMainOutro,
    fragmentColorTransform,
    customRewriter,
    timeUniform
  } = options;
  vertexDefs = vertexDefs || "";
  vertexMainIntro = vertexMainIntro || "";
  vertexMainOutro = vertexMainOutro || "";
  fragmentDefs = fragmentDefs || "";
  fragmentMainIntro = fragmentMainIntro || "";
  fragmentMainOutro = fragmentMainOutro || "";
  if (vertexTransform || customRewriter) {
    vertexShader3 = expandShaderIncludes(vertexShader3);
  }
  if (fragmentColorTransform || customRewriter) {
    fragmentShader3 = fragmentShader3.replace(
      /^[ \t]*#include <((?:tonemapping|encodings|colorspace|fog|premultiplied_alpha|dithering)_fragment)>/gm,
      "\n//!BEGIN_POST_CHUNK $1\n$&\n//!END_POST_CHUNK\n"
    );
    fragmentShader3 = expandShaderIncludes(fragmentShader3);
  }
  if (customRewriter) {
    let res = customRewriter({ vertexShader: vertexShader3, fragmentShader: fragmentShader3 });
    vertexShader3 = res.vertexShader;
    fragmentShader3 = res.fragmentShader;
  }
  if (fragmentColorTransform) {
    let postChunks = [];
    fragmentShader3 = fragmentShader3.replace(
      /^\/\/!BEGIN_POST_CHUNK[^]+?^\/\/!END_POST_CHUNK/gm,
      // [^]+? = non-greedy match of any chars including newlines
      (match) => {
        postChunks.push(match);
        return "";
      }
    );
    fragmentMainOutro = `${fragmentColorTransform}
${postChunks.join("\n")}
${fragmentMainOutro}`;
  }
  if (timeUniform) {
    const code = `
uniform float ${timeUniform};
`;
    vertexDefs = code + vertexDefs;
    fragmentDefs = code + fragmentDefs;
  }
  if (vertexTransform) {
    vertexShader3 = `vec3 troika_position_${key};
vec3 troika_normal_${key};
vec2 troika_uv_${key};
${vertexShader3}
`;
    vertexDefs = `${vertexDefs}
void troikaVertexTransform${key}(inout vec3 position, inout vec3 normal, inout vec2 uv) {
  ${vertexTransform}
}
`;
    vertexMainIntro = `
troika_position_${key} = vec3(position);
troika_normal_${key} = vec3(normal);
troika_uv_${key} = vec2(uv);
troikaVertexTransform${key}(troika_position_${key}, troika_normal_${key}, troika_uv_${key});
${vertexMainIntro}
`;
    vertexShader3 = vertexShader3.replace(/\b(position|normal|uv)\b/g, (match, match1, index2, fullStr) => {
      return /\battribute\s+vec[23]\s+$/.test(fullStr.substr(0, index2)) ? match1 : `troika_${match1}_${key}`;
    });
    if (!(material.map && material.map.channel > 0)) {
      vertexShader3 = vertexShader3.replace(/\bMAP_UV\b/g, `troika_uv_${key}`);
    }
  }
  vertexShader3 = injectIntoShaderCode(vertexShader3, key, vertexDefs, vertexMainIntro, vertexMainOutro);
  fragmentShader3 = injectIntoShaderCode(fragmentShader3, key, fragmentDefs, fragmentMainIntro, fragmentMainOutro);
  return {
    vertexShader: vertexShader3,
    fragmentShader: fragmentShader3
  };
}
function injectIntoShaderCode(shaderCode, id, defs, intro, outro) {
  if (intro || outro || defs) {
    shaderCode = shaderCode.replace(
      voidMainRegExp,
      `
${defs}
void troikaOrigMain${id}() {`
    );
    shaderCode += `
void main() {
  ${intro}
  troikaOrigMain${id}();
  ${outro}
}`;
  }
  return shaderCode;
}
function optionsJsonReplacer(key, value) {
  return key === "uniforms" ? void 0 : typeof value === "function" ? value.toString() : value;
}
var _idCtr = 0;
var optionsHashesToIds = /* @__PURE__ */ new Map();
function getKeyForOptions(options) {
  const optionsHash = JSON.stringify(options, optionsJsonReplacer);
  let id = optionsHashesToIds.get(optionsHash);
  if (id == null) {
    optionsHashesToIds.set(optionsHash, id = ++_idCtr);
  }
  return id;
}
var defaultBaseMaterial = new MeshStandardMaterial({ color: 16777215, side: DoubleSide });

// node_modules/troika-three-text/dist/troika-three-text.esm.js
function typrFactory() {
  return "undefined" == typeof window && (self.window = self), (function(r2) {
    var e2 = { parse: function(r3) {
      var t3 = e2._bin, a6 = new Uint8Array(r3);
      if ("ttcf" == t3.readASCII(a6, 0, 4)) {
        var n2 = 4;
        t3.readUshort(a6, n2), n2 += 2, t3.readUshort(a6, n2), n2 += 2;
        var o2 = t3.readUint(a6, n2);
        n2 += 4;
        for (var s2 = [], i2 = 0; i2 < o2; i2++) {
          var h = t3.readUint(a6, n2);
          n2 += 4, s2.push(e2._readFont(a6, h));
        }
        return s2;
      }
      return [e2._readFont(a6, 0)];
    }, _readFont: function(r3, t3) {
      var a6 = e2._bin, n2 = t3;
      a6.readFixed(r3, t3), t3 += 4;
      var o2 = a6.readUshort(r3, t3);
      t3 += 2, a6.readUshort(r3, t3), t3 += 2, a6.readUshort(r3, t3), t3 += 2, a6.readUshort(r3, t3), t3 += 2;
      for (var s2 = ["cmap", "head", "hhea", "maxp", "hmtx", "name", "OS/2", "post", "loca", "glyf", "kern", "CFF ", "GDEF", "GPOS", "GSUB", "SVG "], i2 = { _data: r3, _offset: n2 }, h = {}, d2 = 0; d2 < o2; d2++) {
        var f2 = a6.readASCII(r3, t3, 4);
        t3 += 4, a6.readUint(r3, t3), t3 += 4;
        var u = a6.readUint(r3, t3);
        t3 += 4;
        var l2 = a6.readUint(r3, t3);
        t3 += 4, h[f2] = { offset: u, length: l2 };
      }
      for (d2 = 0; d2 < s2.length; d2++) {
        var v = s2[d2];
        h[v] && (i2[v.trim()] = e2[v.trim()].parse(r3, h[v].offset, h[v].length, i2));
      }
      return i2;
    }, _tabOffset: function(r3, t3, a6) {
      for (var n2 = e2._bin, o2 = n2.readUshort(r3, a6 + 4), s2 = a6 + 12, i2 = 0; i2 < o2; i2++) {
        var h = n2.readASCII(r3, s2, 4);
        s2 += 4, n2.readUint(r3, s2), s2 += 4;
        var d2 = n2.readUint(r3, s2);
        if (s2 += 4, n2.readUint(r3, s2), s2 += 4, h == t3) return d2;
      }
      return 0;
    } };
    e2._bin = { readFixed: function(r3, e3) {
      return (r3[e3] << 8 | r3[e3 + 1]) + (r3[e3 + 2] << 8 | r3[e3 + 3]) / 65540;
    }, readF2dot14: function(r3, t3) {
      return e2._bin.readShort(r3, t3) / 16384;
    }, readInt: function(r3, t3) {
      return e2._bin._view(r3).getInt32(t3);
    }, readInt8: function(r3, t3) {
      return e2._bin._view(r3).getInt8(t3);
    }, readShort: function(r3, t3) {
      return e2._bin._view(r3).getInt16(t3);
    }, readUshort: function(r3, t3) {
      return e2._bin._view(r3).getUint16(t3);
    }, readUshorts: function(r3, t3, a6) {
      for (var n2 = [], o2 = 0; o2 < a6; o2++) n2.push(e2._bin.readUshort(r3, t3 + 2 * o2));
      return n2;
    }, readUint: function(r3, t3) {
      return e2._bin._view(r3).getUint32(t3);
    }, readUint64: function(r3, t3) {
      return 4294967296 * e2._bin.readUint(r3, t3) + e2._bin.readUint(r3, t3 + 4);
    }, readASCII: function(r3, e3, t3) {
      for (var a6 = "", n2 = 0; n2 < t3; n2++) a6 += String.fromCharCode(r3[e3 + n2]);
      return a6;
    }, readUnicode: function(r3, e3, t3) {
      for (var a6 = "", n2 = 0; n2 < t3; n2++) {
        var o2 = r3[e3++] << 8 | r3[e3++];
        a6 += String.fromCharCode(o2);
      }
      return a6;
    }, _tdec: "undefined" != typeof window && window.TextDecoder ? new window.TextDecoder() : null, readUTF8: function(r3, t3, a6) {
      var n2 = e2._bin._tdec;
      return n2 && 0 == t3 && a6 == r3.length ? n2.decode(r3) : e2._bin.readASCII(r3, t3, a6);
    }, readBytes: function(r3, e3, t3) {
      for (var a6 = [], n2 = 0; n2 < t3; n2++) a6.push(r3[e3 + n2]);
      return a6;
    }, readASCIIArray: function(r3, e3, t3) {
      for (var a6 = [], n2 = 0; n2 < t3; n2++) a6.push(String.fromCharCode(r3[e3 + n2]));
      return a6;
    }, _view: function(r3) {
      return r3._dataView || (r3._dataView = r3.buffer ? new DataView(r3.buffer, r3.byteOffset, r3.byteLength) : new DataView(new Uint8Array(r3).buffer));
    } }, e2._lctf = {}, e2._lctf.parse = function(r3, t3, a6, n2, o2) {
      var s2 = e2._bin, i2 = {}, h = t3;
      s2.readFixed(r3, t3), t3 += 4;
      var d2 = s2.readUshort(r3, t3);
      t3 += 2;
      var f2 = s2.readUshort(r3, t3);
      t3 += 2;
      var u = s2.readUshort(r3, t3);
      return t3 += 2, i2.scriptList = e2._lctf.readScriptList(r3, h + d2), i2.featureList = e2._lctf.readFeatureList(r3, h + f2), i2.lookupList = e2._lctf.readLookupList(r3, h + u, o2), i2;
    }, e2._lctf.readLookupList = function(r3, t3, a6) {
      var n2 = e2._bin, o2 = t3, s2 = [], i2 = n2.readUshort(r3, t3);
      t3 += 2;
      for (var h = 0; h < i2; h++) {
        var d2 = n2.readUshort(r3, t3);
        t3 += 2;
        var f2 = e2._lctf.readLookupTable(r3, o2 + d2, a6);
        s2.push(f2);
      }
      return s2;
    }, e2._lctf.readLookupTable = function(r3, t3, a6) {
      var n2 = e2._bin, o2 = t3, s2 = { tabs: [] };
      s2.ltype = n2.readUshort(r3, t3), t3 += 2, s2.flag = n2.readUshort(r3, t3), t3 += 2;
      var i2 = n2.readUshort(r3, t3);
      t3 += 2;
      for (var h = s2.ltype, d2 = 0; d2 < i2; d2++) {
        var f2 = n2.readUshort(r3, t3);
        t3 += 2;
        var u = a6(r3, h, o2 + f2, s2);
        s2.tabs.push(u);
      }
      return s2;
    }, e2._lctf.numOfOnes = function(r3) {
      for (var e3 = 0, t3 = 0; t3 < 32; t3++) 0 != (r3 >>> t3 & 1) && e3++;
      return e3;
    }, e2._lctf.readClassDef = function(r3, t3) {
      var a6 = e2._bin, n2 = [], o2 = a6.readUshort(r3, t3);
      if (t3 += 2, 1 == o2) {
        var s2 = a6.readUshort(r3, t3);
        t3 += 2;
        var i2 = a6.readUshort(r3, t3);
        t3 += 2;
        for (var h = 0; h < i2; h++) n2.push(s2 + h), n2.push(s2 + h), n2.push(a6.readUshort(r3, t3)), t3 += 2;
      }
      if (2 == o2) {
        var d2 = a6.readUshort(r3, t3);
        t3 += 2;
        for (h = 0; h < d2; h++) n2.push(a6.readUshort(r3, t3)), t3 += 2, n2.push(a6.readUshort(r3, t3)), t3 += 2, n2.push(a6.readUshort(r3, t3)), t3 += 2;
      }
      return n2;
    }, e2._lctf.getInterval = function(r3, e3) {
      for (var t3 = 0; t3 < r3.length; t3 += 3) {
        var a6 = r3[t3], n2 = r3[t3 + 1];
        if (r3[t3 + 2], a6 <= e3 && e3 <= n2) return t3;
      }
      return -1;
    }, e2._lctf.readCoverage = function(r3, t3) {
      var a6 = e2._bin, n2 = {};
      n2.fmt = a6.readUshort(r3, t3), t3 += 2;
      var o2 = a6.readUshort(r3, t3);
      return t3 += 2, 1 == n2.fmt && (n2.tab = a6.readUshorts(r3, t3, o2)), 2 == n2.fmt && (n2.tab = a6.readUshorts(r3, t3, 3 * o2)), n2;
    }, e2._lctf.coverageIndex = function(r3, t3) {
      var a6 = r3.tab;
      if (1 == r3.fmt) return a6.indexOf(t3);
      if (2 == r3.fmt) {
        var n2 = e2._lctf.getInterval(a6, t3);
        if (-1 != n2) return a6[n2 + 2] + (t3 - a6[n2]);
      }
      return -1;
    }, e2._lctf.readFeatureList = function(r3, t3) {
      var a6 = e2._bin, n2 = t3, o2 = [], s2 = a6.readUshort(r3, t3);
      t3 += 2;
      for (var i2 = 0; i2 < s2; i2++) {
        var h = a6.readASCII(r3, t3, 4);
        t3 += 4;
        var d2 = a6.readUshort(r3, t3);
        t3 += 2;
        var f2 = e2._lctf.readFeatureTable(r3, n2 + d2);
        f2.tag = h.trim(), o2.push(f2);
      }
      return o2;
    }, e2._lctf.readFeatureTable = function(r3, t3) {
      var a6 = e2._bin, n2 = t3, o2 = {}, s2 = a6.readUshort(r3, t3);
      t3 += 2, s2 > 0 && (o2.featureParams = n2 + s2);
      var i2 = a6.readUshort(r3, t3);
      t3 += 2, o2.tab = [];
      for (var h = 0; h < i2; h++) o2.tab.push(a6.readUshort(r3, t3 + 2 * h));
      return o2;
    }, e2._lctf.readScriptList = function(r3, t3) {
      var a6 = e2._bin, n2 = t3, o2 = {}, s2 = a6.readUshort(r3, t3);
      t3 += 2;
      for (var i2 = 0; i2 < s2; i2++) {
        var h = a6.readASCII(r3, t3, 4);
        t3 += 4;
        var d2 = a6.readUshort(r3, t3);
        t3 += 2, o2[h.trim()] = e2._lctf.readScriptTable(r3, n2 + d2);
      }
      return o2;
    }, e2._lctf.readScriptTable = function(r3, t3) {
      var a6 = e2._bin, n2 = t3, o2 = {}, s2 = a6.readUshort(r3, t3);
      t3 += 2, s2 > 0 && (o2.default = e2._lctf.readLangSysTable(r3, n2 + s2));
      var i2 = a6.readUshort(r3, t3);
      t3 += 2;
      for (var h = 0; h < i2; h++) {
        var d2 = a6.readASCII(r3, t3, 4);
        t3 += 4;
        var f2 = a6.readUshort(r3, t3);
        t3 += 2, o2[d2.trim()] = e2._lctf.readLangSysTable(r3, n2 + f2);
      }
      return o2;
    }, e2._lctf.readLangSysTable = function(r3, t3) {
      var a6 = e2._bin, n2 = {};
      a6.readUshort(r3, t3), t3 += 2, n2.reqFeature = a6.readUshort(r3, t3), t3 += 2;
      var o2 = a6.readUshort(r3, t3);
      return t3 += 2, n2.features = a6.readUshorts(r3, t3, o2), n2;
    }, e2.CFF = {}, e2.CFF.parse = function(r3, t3, a6) {
      var n2 = e2._bin;
      (r3 = new Uint8Array(r3.buffer, t3, a6))[t3 = 0], r3[++t3], r3[++t3], r3[++t3], t3++;
      var o2 = [];
      t3 = e2.CFF.readIndex(r3, t3, o2);
      for (var s2 = [], i2 = 0; i2 < o2.length - 1; i2++) s2.push(n2.readASCII(r3, t3 + o2[i2], o2[i2 + 1] - o2[i2]));
      t3 += o2[o2.length - 1];
      var h = [];
      t3 = e2.CFF.readIndex(r3, t3, h);
      var d2 = [];
      for (i2 = 0; i2 < h.length - 1; i2++) d2.push(e2.CFF.readDict(r3, t3 + h[i2], t3 + h[i2 + 1]));
      t3 += h[h.length - 1];
      var f2 = d2[0], u = [];
      t3 = e2.CFF.readIndex(r3, t3, u);
      var l2 = [];
      for (i2 = 0; i2 < u.length - 1; i2++) l2.push(n2.readASCII(r3, t3 + u[i2], u[i2 + 1] - u[i2]));
      if (t3 += u[u.length - 1], e2.CFF.readSubrs(r3, t3, f2), f2.CharStrings) {
        t3 = f2.CharStrings;
        u = [];
        t3 = e2.CFF.readIndex(r3, t3, u);
        var v = [];
        for (i2 = 0; i2 < u.length - 1; i2++) v.push(n2.readBytes(r3, t3 + u[i2], u[i2 + 1] - u[i2]));
        f2.CharStrings = v;
      }
      if (f2.ROS) {
        t3 = f2.FDArray;
        var c2 = [];
        t3 = e2.CFF.readIndex(r3, t3, c2), f2.FDArray = [];
        for (i2 = 0; i2 < c2.length - 1; i2++) {
          var p2 = e2.CFF.readDict(r3, t3 + c2[i2], t3 + c2[i2 + 1]);
          e2.CFF._readFDict(r3, p2, l2), f2.FDArray.push(p2);
        }
        t3 += c2[c2.length - 1], t3 = f2.FDSelect, f2.FDSelect = [];
        var U = r3[t3];
        if (t3++, 3 != U) throw U;
        var g = n2.readUshort(r3, t3);
        t3 += 2;
        for (i2 = 0; i2 < g + 1; i2++) f2.FDSelect.push(n2.readUshort(r3, t3), r3[t3 + 2]), t3 += 3;
      }
      return f2.Encoding && (f2.Encoding = e2.CFF.readEncoding(r3, f2.Encoding, f2.CharStrings.length)), f2.charset && (f2.charset = e2.CFF.readCharset(r3, f2.charset, f2.CharStrings.length)), e2.CFF._readFDict(r3, f2, l2), f2;
    }, e2.CFF._readFDict = function(r3, t3, a6) {
      var n2;
      for (var o2 in t3.Private && (n2 = t3.Private[1], t3.Private = e2.CFF.readDict(r3, n2, n2 + t3.Private[0]), t3.Private.Subrs && e2.CFF.readSubrs(r3, n2 + t3.Private.Subrs, t3.Private)), t3) -1 != ["FamilyName", "FontName", "FullName", "Notice", "version", "Copyright"].indexOf(o2) && (t3[o2] = a6[t3[o2] - 426 + 35]);
    }, e2.CFF.readSubrs = function(r3, t3, a6) {
      var n2 = e2._bin, o2 = [];
      t3 = e2.CFF.readIndex(r3, t3, o2);
      var s2, i2 = o2.length;
      s2 = i2 < 1240 ? 107 : i2 < 33900 ? 1131 : 32768, a6.Bias = s2, a6.Subrs = [];
      for (var h = 0; h < o2.length - 1; h++) a6.Subrs.push(n2.readBytes(r3, t3 + o2[h], o2[h + 1] - o2[h]));
    }, e2.CFF.tableSE = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 0, 111, 112, 113, 114, 0, 115, 116, 117, 118, 119, 120, 121, 122, 0, 123, 0, 124, 125, 126, 127, 128, 129, 130, 131, 0, 132, 133, 0, 134, 135, 136, 137, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 138, 0, 139, 0, 0, 0, 0, 140, 141, 142, 143, 0, 0, 0, 0, 0, 144, 0, 0, 0, 145, 0, 0, 146, 147, 148, 149, 0, 0, 0, 0], e2.CFF.glyphByUnicode = function(r3, e3) {
      for (var t3 = 0; t3 < r3.charset.length; t3++) if (r3.charset[t3] == e3) return t3;
      return -1;
    }, e2.CFF.glyphBySE = function(r3, t3) {
      return t3 < 0 || t3 > 255 ? -1 : e2.CFF.glyphByUnicode(r3, e2.CFF.tableSE[t3]);
    }, e2.CFF.readEncoding = function(r3, t3, a6) {
      e2._bin;
      var n2 = [".notdef"], o2 = r3[t3];
      if (t3++, 0 != o2) throw "error: unknown encoding format: " + o2;
      var s2 = r3[t3];
      t3++;
      for (var i2 = 0; i2 < s2; i2++) n2.push(r3[t3 + i2]);
      return n2;
    }, e2.CFF.readCharset = function(r3, t3, a6) {
      var n2 = e2._bin, o2 = [".notdef"], s2 = r3[t3];
      if (t3++, 0 == s2) for (var i2 = 0; i2 < a6; i2++) {
        var h = n2.readUshort(r3, t3);
        t3 += 2, o2.push(h);
      }
      else {
        if (1 != s2 && 2 != s2) throw "error: format: " + s2;
        for (; o2.length < a6; ) {
          h = n2.readUshort(r3, t3);
          t3 += 2;
          var d2 = 0;
          1 == s2 ? (d2 = r3[t3], t3++) : (d2 = n2.readUshort(r3, t3), t3 += 2);
          for (i2 = 0; i2 <= d2; i2++) o2.push(h), h++;
        }
      }
      return o2;
    }, e2.CFF.readIndex = function(r3, t3, a6) {
      var n2 = e2._bin, o2 = n2.readUshort(r3, t3) + 1, s2 = r3[t3 += 2];
      if (t3++, 1 == s2) for (var i2 = 0; i2 < o2; i2++) a6.push(r3[t3 + i2]);
      else if (2 == s2) for (i2 = 0; i2 < o2; i2++) a6.push(n2.readUshort(r3, t3 + 2 * i2));
      else if (3 == s2) for (i2 = 0; i2 < o2; i2++) a6.push(16777215 & n2.readUint(r3, t3 + 3 * i2 - 1));
      else if (1 != o2) throw "unsupported offset size: " + s2 + ", count: " + o2;
      return (t3 += o2 * s2) - 1;
    }, e2.CFF.getCharString = function(r3, t3, a6) {
      var n2 = e2._bin, o2 = r3[t3], s2 = r3[t3 + 1];
      r3[t3 + 2], r3[t3 + 3], r3[t3 + 4];
      var i2 = 1, h = null, d2 = null;
      o2 <= 20 && (h = o2, i2 = 1), 12 == o2 && (h = 100 * o2 + s2, i2 = 2), 21 <= o2 && o2 <= 27 && (h = o2, i2 = 1), 28 == o2 && (d2 = n2.readShort(r3, t3 + 1), i2 = 3), 29 <= o2 && o2 <= 31 && (h = o2, i2 = 1), 32 <= o2 && o2 <= 246 && (d2 = o2 - 139, i2 = 1), 247 <= o2 && o2 <= 250 && (d2 = 256 * (o2 - 247) + s2 + 108, i2 = 2), 251 <= o2 && o2 <= 254 && (d2 = 256 * -(o2 - 251) - s2 - 108, i2 = 2), 255 == o2 && (d2 = n2.readInt(r3, t3 + 1) / 65535, i2 = 5), a6.val = null != d2 ? d2 : "o" + h, a6.size = i2;
    }, e2.CFF.readCharString = function(r3, t3, a6) {
      for (var n2 = t3 + a6, o2 = e2._bin, s2 = []; t3 < n2; ) {
        var i2 = r3[t3], h = r3[t3 + 1];
        r3[t3 + 2], r3[t3 + 3], r3[t3 + 4];
        var d2 = 1, f2 = null, u = null;
        i2 <= 20 && (f2 = i2, d2 = 1), 12 == i2 && (f2 = 100 * i2 + h, d2 = 2), 19 != i2 && 20 != i2 || (f2 = i2, d2 = 2), 21 <= i2 && i2 <= 27 && (f2 = i2, d2 = 1), 28 == i2 && (u = o2.readShort(r3, t3 + 1), d2 = 3), 29 <= i2 && i2 <= 31 && (f2 = i2, d2 = 1), 32 <= i2 && i2 <= 246 && (u = i2 - 139, d2 = 1), 247 <= i2 && i2 <= 250 && (u = 256 * (i2 - 247) + h + 108, d2 = 2), 251 <= i2 && i2 <= 254 && (u = 256 * -(i2 - 251) - h - 108, d2 = 2), 255 == i2 && (u = o2.readInt(r3, t3 + 1) / 65535, d2 = 5), s2.push(null != u ? u : "o" + f2), t3 += d2;
      }
      return s2;
    }, e2.CFF.readDict = function(r3, t3, a6) {
      for (var n2 = e2._bin, o2 = {}, s2 = []; t3 < a6; ) {
        var i2 = r3[t3], h = r3[t3 + 1];
        r3[t3 + 2], r3[t3 + 3], r3[t3 + 4];
        var d2 = 1, f2 = null, u = null;
        if (28 == i2 && (u = n2.readShort(r3, t3 + 1), d2 = 3), 29 == i2 && (u = n2.readInt(r3, t3 + 1), d2 = 5), 32 <= i2 && i2 <= 246 && (u = i2 - 139, d2 = 1), 247 <= i2 && i2 <= 250 && (u = 256 * (i2 - 247) + h + 108, d2 = 2), 251 <= i2 && i2 <= 254 && (u = 256 * -(i2 - 251) - h - 108, d2 = 2), 255 == i2) throw u = n2.readInt(r3, t3 + 1) / 65535, d2 = 5, "unknown number";
        if (30 == i2) {
          var l2 = [];
          for (d2 = 1; ; ) {
            var v = r3[t3 + d2];
            d2++;
            var c2 = v >> 4, p2 = 15 & v;
            if (15 != c2 && l2.push(c2), 15 != p2 && l2.push(p2), 15 == p2) break;
          }
          for (var U = "", g = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, ".", "e", "e-", "reserved", "-", "endOfNumber"], S = 0; S < l2.length; S++) U += g[l2[S]];
          u = parseFloat(U);
        }
        if (i2 <= 21) {
          if (f2 = ["version", "Notice", "FullName", "FamilyName", "Weight", "FontBBox", "BlueValues", "OtherBlues", "FamilyBlues", "FamilyOtherBlues", "StdHW", "StdVW", "escape", "UniqueID", "XUID", "charset", "Encoding", "CharStrings", "Private", "Subrs", "defaultWidthX", "nominalWidthX"][i2], d2 = 1, 12 == i2) f2 = ["Copyright", "isFixedPitch", "ItalicAngle", "UnderlinePosition", "UnderlineThickness", "PaintType", "CharstringType", "FontMatrix", "StrokeWidth", "BlueScale", "BlueShift", "BlueFuzz", "StemSnapH", "StemSnapV", "ForceBold", 0, 0, "LanguageGroup", "ExpansionFactor", "initialRandomSeed", "SyntheticBase", "PostScript", "BaseFontName", "BaseFontBlend", 0, 0, 0, 0, 0, 0, "ROS", "CIDFontVersion", "CIDFontRevision", "CIDFontType", "CIDCount", "UIDBase", "FDArray", "FDSelect", "FontName"][h], d2 = 2;
        }
        null != f2 ? (o2[f2] = 1 == s2.length ? s2[0] : s2, s2 = []) : s2.push(u), t3 += d2;
      }
      return o2;
    }, e2.cmap = {}, e2.cmap.parse = function(r3, t3, a6) {
      r3 = new Uint8Array(r3.buffer, t3, a6), t3 = 0;
      var n2 = e2._bin, o2 = {};
      n2.readUshort(r3, t3), t3 += 2;
      var s2 = n2.readUshort(r3, t3);
      t3 += 2;
      var i2 = [];
      o2.tables = [];
      for (var h = 0; h < s2; h++) {
        var d2 = n2.readUshort(r3, t3);
        t3 += 2;
        var f2 = n2.readUshort(r3, t3);
        t3 += 2;
        var u = n2.readUint(r3, t3);
        t3 += 4;
        var l2 = "p" + d2 + "e" + f2, v = i2.indexOf(u);
        if (-1 == v) {
          var c2;
          v = o2.tables.length, i2.push(u);
          var p2 = n2.readUshort(r3, u);
          0 == p2 ? c2 = e2.cmap.parse0(r3, u) : 4 == p2 ? c2 = e2.cmap.parse4(r3, u) : 6 == p2 ? c2 = e2.cmap.parse6(r3, u) : 12 == p2 ? c2 = e2.cmap.parse12(r3, u) : console.debug("unknown format: " + p2, d2, f2, u), o2.tables.push(c2);
        }
        if (null != o2[l2]) throw "multiple tables for one platform+encoding";
        o2[l2] = v;
      }
      return o2;
    }, e2.cmap.parse0 = function(r3, t3) {
      var a6 = e2._bin, n2 = {};
      n2.format = a6.readUshort(r3, t3), t3 += 2;
      var o2 = a6.readUshort(r3, t3);
      t3 += 2, a6.readUshort(r3, t3), t3 += 2, n2.map = [];
      for (var s2 = 0; s2 < o2 - 6; s2++) n2.map.push(r3[t3 + s2]);
      return n2;
    }, e2.cmap.parse4 = function(r3, t3) {
      var a6 = e2._bin, n2 = t3, o2 = {};
      o2.format = a6.readUshort(r3, t3), t3 += 2;
      var s2 = a6.readUshort(r3, t3);
      t3 += 2, a6.readUshort(r3, t3), t3 += 2;
      var i2 = a6.readUshort(r3, t3);
      t3 += 2;
      var h = i2 / 2;
      o2.searchRange = a6.readUshort(r3, t3), t3 += 2, o2.entrySelector = a6.readUshort(r3, t3), t3 += 2, o2.rangeShift = a6.readUshort(r3, t3), t3 += 2, o2.endCount = a6.readUshorts(r3, t3, h), t3 += 2 * h, t3 += 2, o2.startCount = a6.readUshorts(r3, t3, h), t3 += 2 * h, o2.idDelta = [];
      for (var d2 = 0; d2 < h; d2++) o2.idDelta.push(a6.readShort(r3, t3)), t3 += 2;
      for (o2.idRangeOffset = a6.readUshorts(r3, t3, h), t3 += 2 * h, o2.glyphIdArray = []; t3 < n2 + s2; ) o2.glyphIdArray.push(a6.readUshort(r3, t3)), t3 += 2;
      return o2;
    }, e2.cmap.parse6 = function(r3, t3) {
      var a6 = e2._bin, n2 = {};
      n2.format = a6.readUshort(r3, t3), t3 += 2, a6.readUshort(r3, t3), t3 += 2, a6.readUshort(r3, t3), t3 += 2, n2.firstCode = a6.readUshort(r3, t3), t3 += 2;
      var o2 = a6.readUshort(r3, t3);
      t3 += 2, n2.glyphIdArray = [];
      for (var s2 = 0; s2 < o2; s2++) n2.glyphIdArray.push(a6.readUshort(r3, t3)), t3 += 2;
      return n2;
    }, e2.cmap.parse12 = function(r3, t3) {
      var a6 = e2._bin, n2 = {};
      n2.format = a6.readUshort(r3, t3), t3 += 2, t3 += 2, a6.readUint(r3, t3), t3 += 4, a6.readUint(r3, t3), t3 += 4;
      var o2 = a6.readUint(r3, t3);
      t3 += 4, n2.groups = [];
      for (var s2 = 0; s2 < o2; s2++) {
        var i2 = t3 + 12 * s2, h = a6.readUint(r3, i2 + 0), d2 = a6.readUint(r3, i2 + 4), f2 = a6.readUint(r3, i2 + 8);
        n2.groups.push([h, d2, f2]);
      }
      return n2;
    }, e2.glyf = {}, e2.glyf.parse = function(r3, e3, t3, a6) {
      for (var n2 = [], o2 = 0; o2 < a6.maxp.numGlyphs; o2++) n2.push(null);
      return n2;
    }, e2.glyf._parseGlyf = function(r3, t3) {
      var a6 = e2._bin, n2 = r3._data, o2 = e2._tabOffset(n2, "glyf", r3._offset) + r3.loca[t3];
      if (r3.loca[t3] == r3.loca[t3 + 1]) return null;
      var s2 = {};
      if (s2.noc = a6.readShort(n2, o2), o2 += 2, s2.xMin = a6.readShort(n2, o2), o2 += 2, s2.yMin = a6.readShort(n2, o2), o2 += 2, s2.xMax = a6.readShort(n2, o2), o2 += 2, s2.yMax = a6.readShort(n2, o2), o2 += 2, s2.xMin >= s2.xMax || s2.yMin >= s2.yMax) return null;
      if (s2.noc > 0) {
        s2.endPts = [];
        for (var i2 = 0; i2 < s2.noc; i2++) s2.endPts.push(a6.readUshort(n2, o2)), o2 += 2;
        var h = a6.readUshort(n2, o2);
        if (o2 += 2, n2.length - o2 < h) return null;
        s2.instructions = a6.readBytes(n2, o2, h), o2 += h;
        var d2 = s2.endPts[s2.noc - 1] + 1;
        s2.flags = [];
        for (i2 = 0; i2 < d2; i2++) {
          var f2 = n2[o2];
          if (o2++, s2.flags.push(f2), 0 != (8 & f2)) {
            var u = n2[o2];
            o2++;
            for (var l2 = 0; l2 < u; l2++) s2.flags.push(f2), i2++;
          }
        }
        s2.xs = [];
        for (i2 = 0; i2 < d2; i2++) {
          var v = 0 != (2 & s2.flags[i2]), c2 = 0 != (16 & s2.flags[i2]);
          v ? (s2.xs.push(c2 ? n2[o2] : -n2[o2]), o2++) : c2 ? s2.xs.push(0) : (s2.xs.push(a6.readShort(n2, o2)), o2 += 2);
        }
        s2.ys = [];
        for (i2 = 0; i2 < d2; i2++) {
          v = 0 != (4 & s2.flags[i2]), c2 = 0 != (32 & s2.flags[i2]);
          v ? (s2.ys.push(c2 ? n2[o2] : -n2[o2]), o2++) : c2 ? s2.ys.push(0) : (s2.ys.push(a6.readShort(n2, o2)), o2 += 2);
        }
        var p2 = 0, U = 0;
        for (i2 = 0; i2 < d2; i2++) p2 += s2.xs[i2], U += s2.ys[i2], s2.xs[i2] = p2, s2.ys[i2] = U;
      } else {
        var g;
        s2.parts = [];
        do {
          g = a6.readUshort(n2, o2), o2 += 2;
          var S = { m: { a: 1, b: 0, c: 0, d: 1, tx: 0, ty: 0 }, p1: -1, p2: -1 };
          if (s2.parts.push(S), S.glyphIndex = a6.readUshort(n2, o2), o2 += 2, 1 & g) {
            var m = a6.readShort(n2, o2);
            o2 += 2;
            var b = a6.readShort(n2, o2);
            o2 += 2;
          } else {
            m = a6.readInt8(n2, o2);
            o2++;
            b = a6.readInt8(n2, o2);
            o2++;
          }
          2 & g ? (S.m.tx = m, S.m.ty = b) : (S.p1 = m, S.p2 = b), 8 & g ? (S.m.a = S.m.d = a6.readF2dot14(n2, o2), o2 += 2) : 64 & g ? (S.m.a = a6.readF2dot14(n2, o2), o2 += 2, S.m.d = a6.readF2dot14(n2, o2), o2 += 2) : 128 & g && (S.m.a = a6.readF2dot14(n2, o2), o2 += 2, S.m.b = a6.readF2dot14(n2, o2), o2 += 2, S.m.c = a6.readF2dot14(n2, o2), o2 += 2, S.m.d = a6.readF2dot14(n2, o2), o2 += 2);
        } while (32 & g);
        if (256 & g) {
          var y = a6.readUshort(n2, o2);
          o2 += 2, s2.instr = [];
          for (i2 = 0; i2 < y; i2++) s2.instr.push(n2[o2]), o2++;
        }
      }
      return s2;
    }, e2.GDEF = {}, e2.GDEF.parse = function(r3, t3, a6, n2) {
      var o2 = t3;
      t3 += 4;
      var s2 = e2._bin.readUshort(r3, t3);
      return { glyphClassDef: 0 === s2 ? null : e2._lctf.readClassDef(r3, o2 + s2) };
    }, e2.GPOS = {}, e2.GPOS.parse = function(r3, t3, a6, n2) {
      return e2._lctf.parse(r3, t3, a6, n2, e2.GPOS.subt);
    }, e2.GPOS.subt = function(r3, t3, a6, n2) {
      var o2 = e2._bin, s2 = a6, i2 = {};
      if (i2.fmt = o2.readUshort(r3, a6), a6 += 2, 1 == t3 || 2 == t3 || 3 == t3 || 7 == t3 || 8 == t3 && i2.fmt <= 2) {
        var h = o2.readUshort(r3, a6);
        a6 += 2, i2.coverage = e2._lctf.readCoverage(r3, h + s2);
      }
      if (1 == t3 && 1 == i2.fmt) {
        var d2 = o2.readUshort(r3, a6);
        a6 += 2, 0 != d2 && (i2.pos = e2.GPOS.readValueRecord(r3, a6, d2));
      } else if (2 == t3 && i2.fmt >= 1 && i2.fmt <= 2) {
        d2 = o2.readUshort(r3, a6);
        a6 += 2;
        var f2 = o2.readUshort(r3, a6);
        a6 += 2;
        var u = e2._lctf.numOfOnes(d2), l2 = e2._lctf.numOfOnes(f2);
        if (1 == i2.fmt) {
          i2.pairsets = [];
          var v = o2.readUshort(r3, a6);
          a6 += 2;
          for (var c2 = 0; c2 < v; c2++) {
            var p2 = s2 + o2.readUshort(r3, a6);
            a6 += 2;
            var U = o2.readUshort(r3, p2);
            p2 += 2;
            for (var g = [], S = 0; S < U; S++) {
              var m = o2.readUshort(r3, p2);
              p2 += 2, 0 != d2 && (P = e2.GPOS.readValueRecord(r3, p2, d2), p2 += 2 * u), 0 != f2 && (x = e2.GPOS.readValueRecord(r3, p2, f2), p2 += 2 * l2), g.push({ gid2: m, val1: P, val2: x });
            }
            i2.pairsets.push(g);
          }
        }
        if (2 == i2.fmt) {
          var b = o2.readUshort(r3, a6);
          a6 += 2;
          var y = o2.readUshort(r3, a6);
          a6 += 2;
          var F = o2.readUshort(r3, a6);
          a6 += 2;
          var C = o2.readUshort(r3, a6);
          a6 += 2, i2.classDef1 = e2._lctf.readClassDef(r3, s2 + b), i2.classDef2 = e2._lctf.readClassDef(r3, s2 + y), i2.matrix = [];
          for (c2 = 0; c2 < F; c2++) {
            var _ = [];
            for (S = 0; S < C; S++) {
              var P = null, x = null;
              0 != d2 && (P = e2.GPOS.readValueRecord(r3, a6, d2), a6 += 2 * u), 0 != f2 && (x = e2.GPOS.readValueRecord(r3, a6, f2), a6 += 2 * l2), _.push({ val1: P, val2: x });
            }
            i2.matrix.push(_);
          }
        }
      } else if (4 == t3 && 1 == i2.fmt) i2.markCoverage = e2._lctf.readCoverage(r3, o2.readUshort(r3, a6) + s2), i2.baseCoverage = e2._lctf.readCoverage(r3, o2.readUshort(r3, a6 + 2) + s2), i2.markClassCount = o2.readUshort(r3, a6 + 4), i2.markArray = e2.GPOS.readMarkArray(r3, o2.readUshort(r3, a6 + 6) + s2), i2.baseArray = e2.GPOS.readBaseArray(r3, o2.readUshort(r3, a6 + 8) + s2, i2.markClassCount);
      else if (6 == t3 && 1 == i2.fmt) i2.mark1Coverage = e2._lctf.readCoverage(r3, o2.readUshort(r3, a6) + s2), i2.mark2Coverage = e2._lctf.readCoverage(r3, o2.readUshort(r3, a6 + 2) + s2), i2.markClassCount = o2.readUshort(r3, a6 + 4), i2.mark1Array = e2.GPOS.readMarkArray(r3, o2.readUshort(r3, a6 + 6) + s2), i2.mark2Array = e2.GPOS.readBaseArray(r3, o2.readUshort(r3, a6 + 8) + s2, i2.markClassCount);
      else {
        if (9 == t3 && 1 == i2.fmt) {
          var I = o2.readUshort(r3, a6);
          a6 += 2;
          var w = o2.readUint(r3, a6);
          if (a6 += 4, 9 == n2.ltype) n2.ltype = I;
          else if (n2.ltype != I) throw "invalid extension substitution";
          return e2.GPOS.subt(r3, n2.ltype, s2 + w);
        }
        console.debug("unsupported GPOS table LookupType", t3, "format", i2.fmt);
      }
      return i2;
    }, e2.GPOS.readValueRecord = function(r3, t3, a6) {
      var n2 = e2._bin, o2 = [];
      return o2.push(1 & a6 ? n2.readShort(r3, t3) : 0), t3 += 1 & a6 ? 2 : 0, o2.push(2 & a6 ? n2.readShort(r3, t3) : 0), t3 += 2 & a6 ? 2 : 0, o2.push(4 & a6 ? n2.readShort(r3, t3) : 0), t3 += 4 & a6 ? 2 : 0, o2.push(8 & a6 ? n2.readShort(r3, t3) : 0), t3 += 8 & a6 ? 2 : 0, o2;
    }, e2.GPOS.readBaseArray = function(r3, t3, a6) {
      var n2 = e2._bin, o2 = [], s2 = t3, i2 = n2.readUshort(r3, t3);
      t3 += 2;
      for (var h = 0; h < i2; h++) {
        for (var d2 = [], f2 = 0; f2 < a6; f2++) d2.push(e2.GPOS.readAnchorRecord(r3, s2 + n2.readUshort(r3, t3))), t3 += 2;
        o2.push(d2);
      }
      return o2;
    }, e2.GPOS.readMarkArray = function(r3, t3) {
      var a6 = e2._bin, n2 = [], o2 = t3, s2 = a6.readUshort(r3, t3);
      t3 += 2;
      for (var i2 = 0; i2 < s2; i2++) {
        var h = e2.GPOS.readAnchorRecord(r3, a6.readUshort(r3, t3 + 2) + o2);
        h.markClass = a6.readUshort(r3, t3), n2.push(h), t3 += 4;
      }
      return n2;
    }, e2.GPOS.readAnchorRecord = function(r3, t3) {
      var a6 = e2._bin, n2 = {};
      return n2.fmt = a6.readUshort(r3, t3), n2.x = a6.readShort(r3, t3 + 2), n2.y = a6.readShort(r3, t3 + 4), n2;
    }, e2.GSUB = {}, e2.GSUB.parse = function(r3, t3, a6, n2) {
      return e2._lctf.parse(r3, t3, a6, n2, e2.GSUB.subt);
    }, e2.GSUB.subt = function(r3, t3, a6, n2) {
      var o2 = e2._bin, s2 = a6, i2 = {};
      if (i2.fmt = o2.readUshort(r3, a6), a6 += 2, 1 != t3 && 2 != t3 && 4 != t3 && 5 != t3 && 6 != t3) return null;
      if (1 == t3 || 2 == t3 || 4 == t3 || 5 == t3 && i2.fmt <= 2 || 6 == t3 && i2.fmt <= 2) {
        var h = o2.readUshort(r3, a6);
        a6 += 2, i2.coverage = e2._lctf.readCoverage(r3, s2 + h);
      }
      if (1 == t3 && i2.fmt >= 1 && i2.fmt <= 2) {
        if (1 == i2.fmt) i2.delta = o2.readShort(r3, a6), a6 += 2;
        else if (2 == i2.fmt) {
          var d2 = o2.readUshort(r3, a6);
          a6 += 2, i2.newg = o2.readUshorts(r3, a6, d2), a6 += 2 * i2.newg.length;
        }
      } else if (2 == t3 && 1 == i2.fmt) {
        d2 = o2.readUshort(r3, a6);
        a6 += 2, i2.seqs = [];
        for (var f2 = 0; f2 < d2; f2++) {
          var u = o2.readUshort(r3, a6) + s2;
          a6 += 2;
          var l2 = o2.readUshort(r3, u);
          i2.seqs.push(o2.readUshorts(r3, u + 2, l2));
        }
      } else if (4 == t3) {
        i2.vals = [];
        d2 = o2.readUshort(r3, a6);
        a6 += 2;
        for (f2 = 0; f2 < d2; f2++) {
          var v = o2.readUshort(r3, a6);
          a6 += 2, i2.vals.push(e2.GSUB.readLigatureSet(r3, s2 + v));
        }
      } else if (5 == t3 && 2 == i2.fmt) {
        if (2 == i2.fmt) {
          var c2 = o2.readUshort(r3, a6);
          a6 += 2, i2.cDef = e2._lctf.readClassDef(r3, s2 + c2), i2.scset = [];
          var p2 = o2.readUshort(r3, a6);
          a6 += 2;
          for (f2 = 0; f2 < p2; f2++) {
            var U = o2.readUshort(r3, a6);
            a6 += 2, i2.scset.push(0 == U ? null : e2.GSUB.readSubClassSet(r3, s2 + U));
          }
        }
      } else if (6 == t3 && 3 == i2.fmt) {
        if (3 == i2.fmt) {
          for (f2 = 0; f2 < 3; f2++) {
            d2 = o2.readUshort(r3, a6);
            a6 += 2;
            for (var g = [], S = 0; S < d2; S++) g.push(e2._lctf.readCoverage(r3, s2 + o2.readUshort(r3, a6 + 2 * S)));
            a6 += 2 * d2, 0 == f2 && (i2.backCvg = g), 1 == f2 && (i2.inptCvg = g), 2 == f2 && (i2.ahedCvg = g);
          }
          d2 = o2.readUshort(r3, a6);
          a6 += 2, i2.lookupRec = e2.GSUB.readSubstLookupRecords(r3, a6, d2);
        }
      } else {
        if (7 == t3 && 1 == i2.fmt) {
          var m = o2.readUshort(r3, a6);
          a6 += 2;
          var b = o2.readUint(r3, a6);
          if (a6 += 4, 9 == n2.ltype) n2.ltype = m;
          else if (n2.ltype != m) throw "invalid extension substitution";
          return e2.GSUB.subt(r3, n2.ltype, s2 + b);
        }
        console.debug("unsupported GSUB table LookupType", t3, "format", i2.fmt);
      }
      return i2;
    }, e2.GSUB.readSubClassSet = function(r3, t3) {
      var a6 = e2._bin.readUshort, n2 = t3, o2 = [], s2 = a6(r3, t3);
      t3 += 2;
      for (var i2 = 0; i2 < s2; i2++) {
        var h = a6(r3, t3);
        t3 += 2, o2.push(e2.GSUB.readSubClassRule(r3, n2 + h));
      }
      return o2;
    }, e2.GSUB.readSubClassRule = function(r3, t3) {
      var a6 = e2._bin.readUshort, n2 = {}, o2 = a6(r3, t3), s2 = a6(r3, t3 += 2);
      t3 += 2, n2.input = [];
      for (var i2 = 0; i2 < o2 - 1; i2++) n2.input.push(a6(r3, t3)), t3 += 2;
      return n2.substLookupRecords = e2.GSUB.readSubstLookupRecords(r3, t3, s2), n2;
    }, e2.GSUB.readSubstLookupRecords = function(r3, t3, a6) {
      for (var n2 = e2._bin.readUshort, o2 = [], s2 = 0; s2 < a6; s2++) o2.push(n2(r3, t3), n2(r3, t3 + 2)), t3 += 4;
      return o2;
    }, e2.GSUB.readChainSubClassSet = function(r3, t3) {
      var a6 = e2._bin, n2 = t3, o2 = [], s2 = a6.readUshort(r3, t3);
      t3 += 2;
      for (var i2 = 0; i2 < s2; i2++) {
        var h = a6.readUshort(r3, t3);
        t3 += 2, o2.push(e2.GSUB.readChainSubClassRule(r3, n2 + h));
      }
      return o2;
    }, e2.GSUB.readChainSubClassRule = function(r3, t3) {
      for (var a6 = e2._bin, n2 = {}, o2 = ["backtrack", "input", "lookahead"], s2 = 0; s2 < o2.length; s2++) {
        var i2 = a6.readUshort(r3, t3);
        t3 += 2, 1 == s2 && i2--, n2[o2[s2]] = a6.readUshorts(r3, t3, i2), t3 += 2 * n2[o2[s2]].length;
      }
      i2 = a6.readUshort(r3, t3);
      return t3 += 2, n2.subst = a6.readUshorts(r3, t3, 2 * i2), t3 += 2 * n2.subst.length, n2;
    }, e2.GSUB.readLigatureSet = function(r3, t3) {
      var a6 = e2._bin, n2 = t3, o2 = [], s2 = a6.readUshort(r3, t3);
      t3 += 2;
      for (var i2 = 0; i2 < s2; i2++) {
        var h = a6.readUshort(r3, t3);
        t3 += 2, o2.push(e2.GSUB.readLigature(r3, n2 + h));
      }
      return o2;
    }, e2.GSUB.readLigature = function(r3, t3) {
      var a6 = e2._bin, n2 = { chain: [] };
      n2.nglyph = a6.readUshort(r3, t3), t3 += 2;
      var o2 = a6.readUshort(r3, t3);
      t3 += 2;
      for (var s2 = 0; s2 < o2 - 1; s2++) n2.chain.push(a6.readUshort(r3, t3)), t3 += 2;
      return n2;
    }, e2.head = {}, e2.head.parse = function(r3, t3, a6) {
      var n2 = e2._bin, o2 = {};
      return n2.readFixed(r3, t3), t3 += 4, o2.fontRevision = n2.readFixed(r3, t3), t3 += 4, n2.readUint(r3, t3), t3 += 4, n2.readUint(r3, t3), t3 += 4, o2.flags = n2.readUshort(r3, t3), t3 += 2, o2.unitsPerEm = n2.readUshort(r3, t3), t3 += 2, o2.created = n2.readUint64(r3, t3), t3 += 8, o2.modified = n2.readUint64(r3, t3), t3 += 8, o2.xMin = n2.readShort(r3, t3), t3 += 2, o2.yMin = n2.readShort(r3, t3), t3 += 2, o2.xMax = n2.readShort(r3, t3), t3 += 2, o2.yMax = n2.readShort(r3, t3), t3 += 2, o2.macStyle = n2.readUshort(r3, t3), t3 += 2, o2.lowestRecPPEM = n2.readUshort(r3, t3), t3 += 2, o2.fontDirectionHint = n2.readShort(r3, t3), t3 += 2, o2.indexToLocFormat = n2.readShort(r3, t3), t3 += 2, o2.glyphDataFormat = n2.readShort(r3, t3), t3 += 2, o2;
    }, e2.hhea = {}, e2.hhea.parse = function(r3, t3, a6) {
      var n2 = e2._bin, o2 = {};
      return n2.readFixed(r3, t3), t3 += 4, o2.ascender = n2.readShort(r3, t3), t3 += 2, o2.descender = n2.readShort(r3, t3), t3 += 2, o2.lineGap = n2.readShort(r3, t3), t3 += 2, o2.advanceWidthMax = n2.readUshort(r3, t3), t3 += 2, o2.minLeftSideBearing = n2.readShort(r3, t3), t3 += 2, o2.minRightSideBearing = n2.readShort(r3, t3), t3 += 2, o2.xMaxExtent = n2.readShort(r3, t3), t3 += 2, o2.caretSlopeRise = n2.readShort(r3, t3), t3 += 2, o2.caretSlopeRun = n2.readShort(r3, t3), t3 += 2, o2.caretOffset = n2.readShort(r3, t3), t3 += 2, t3 += 8, o2.metricDataFormat = n2.readShort(r3, t3), t3 += 2, o2.numberOfHMetrics = n2.readUshort(r3, t3), t3 += 2, o2;
    }, e2.hmtx = {}, e2.hmtx.parse = function(r3, t3, a6, n2) {
      for (var o2 = e2._bin, s2 = { aWidth: [], lsBearing: [] }, i2 = 0, h = 0, d2 = 0; d2 < n2.maxp.numGlyphs; d2++) d2 < n2.hhea.numberOfHMetrics && (i2 = o2.readUshort(r3, t3), t3 += 2, h = o2.readShort(r3, t3), t3 += 2), s2.aWidth.push(i2), s2.lsBearing.push(h);
      return s2;
    }, e2.kern = {}, e2.kern.parse = function(r3, t3, a6, n2) {
      var o2 = e2._bin, s2 = o2.readUshort(r3, t3);
      if (t3 += 2, 1 == s2) return e2.kern.parseV1(r3, t3 - 2, a6, n2);
      var i2 = o2.readUshort(r3, t3);
      t3 += 2;
      for (var h = { glyph1: [], rval: [] }, d2 = 0; d2 < i2; d2++) {
        t3 += 2;
        a6 = o2.readUshort(r3, t3);
        t3 += 2;
        var f2 = o2.readUshort(r3, t3);
        t3 += 2;
        var u = f2 >>> 8;
        if (0 != (u &= 15)) throw "unknown kern table format: " + u;
        t3 = e2.kern.readFormat0(r3, t3, h);
      }
      return h;
    }, e2.kern.parseV1 = function(r3, t3, a6, n2) {
      var o2 = e2._bin;
      o2.readFixed(r3, t3), t3 += 4;
      var s2 = o2.readUint(r3, t3);
      t3 += 4;
      for (var i2 = { glyph1: [], rval: [] }, h = 0; h < s2; h++) {
        o2.readUint(r3, t3), t3 += 4;
        var d2 = o2.readUshort(r3, t3);
        t3 += 2, o2.readUshort(r3, t3), t3 += 2;
        var f2 = d2 >>> 8;
        if (0 != (f2 &= 15)) throw "unknown kern table format: " + f2;
        t3 = e2.kern.readFormat0(r3, t3, i2);
      }
      return i2;
    }, e2.kern.readFormat0 = function(r3, t3, a6) {
      var n2 = e2._bin, o2 = -1, s2 = n2.readUshort(r3, t3);
      t3 += 2, n2.readUshort(r3, t3), t3 += 2, n2.readUshort(r3, t3), t3 += 2, n2.readUshort(r3, t3), t3 += 2;
      for (var i2 = 0; i2 < s2; i2++) {
        var h = n2.readUshort(r3, t3);
        t3 += 2;
        var d2 = n2.readUshort(r3, t3);
        t3 += 2;
        var f2 = n2.readShort(r3, t3);
        t3 += 2, h != o2 && (a6.glyph1.push(h), a6.rval.push({ glyph2: [], vals: [] }));
        var u = a6.rval[a6.rval.length - 1];
        u.glyph2.push(d2), u.vals.push(f2), o2 = h;
      }
      return t3;
    }, e2.loca = {}, e2.loca.parse = function(r3, t3, a6, n2) {
      var o2 = e2._bin, s2 = [], i2 = n2.head.indexToLocFormat, h = n2.maxp.numGlyphs + 1;
      if (0 == i2) for (var d2 = 0; d2 < h; d2++) s2.push(o2.readUshort(r3, t3 + (d2 << 1)) << 1);
      if (1 == i2) for (d2 = 0; d2 < h; d2++) s2.push(o2.readUint(r3, t3 + (d2 << 2)));
      return s2;
    }, e2.maxp = {}, e2.maxp.parse = function(r3, t3, a6) {
      var n2 = e2._bin, o2 = {}, s2 = n2.readUint(r3, t3);
      return t3 += 4, o2.numGlyphs = n2.readUshort(r3, t3), t3 += 2, 65536 == s2 && (o2.maxPoints = n2.readUshort(r3, t3), t3 += 2, o2.maxContours = n2.readUshort(r3, t3), t3 += 2, o2.maxCompositePoints = n2.readUshort(r3, t3), t3 += 2, o2.maxCompositeContours = n2.readUshort(r3, t3), t3 += 2, o2.maxZones = n2.readUshort(r3, t3), t3 += 2, o2.maxTwilightPoints = n2.readUshort(r3, t3), t3 += 2, o2.maxStorage = n2.readUshort(r3, t3), t3 += 2, o2.maxFunctionDefs = n2.readUshort(r3, t3), t3 += 2, o2.maxInstructionDefs = n2.readUshort(r3, t3), t3 += 2, o2.maxStackElements = n2.readUshort(r3, t3), t3 += 2, o2.maxSizeOfInstructions = n2.readUshort(r3, t3), t3 += 2, o2.maxComponentElements = n2.readUshort(r3, t3), t3 += 2, o2.maxComponentDepth = n2.readUshort(r3, t3), t3 += 2), o2;
    }, e2.name = {}, e2.name.parse = function(r3, t3, a6) {
      var n2 = e2._bin, o2 = {};
      n2.readUshort(r3, t3), t3 += 2;
      var s2 = n2.readUshort(r3, t3);
      t3 += 2, n2.readUshort(r3, t3);
      for (var i2, h = ["copyright", "fontFamily", "fontSubfamily", "ID", "fullName", "version", "postScriptName", "trademark", "manufacturer", "designer", "description", "urlVendor", "urlDesigner", "licence", "licenceURL", "---", "typoFamilyName", "typoSubfamilyName", "compatibleFull", "sampleText", "postScriptCID", "wwsFamilyName", "wwsSubfamilyName", "lightPalette", "darkPalette"], d2 = t3 += 2, f2 = 0; f2 < s2; f2++) {
        var u = n2.readUshort(r3, t3);
        t3 += 2;
        var l2 = n2.readUshort(r3, t3);
        t3 += 2;
        var v = n2.readUshort(r3, t3);
        t3 += 2;
        var c2 = n2.readUshort(r3, t3);
        t3 += 2;
        var p2 = n2.readUshort(r3, t3);
        t3 += 2;
        var U = n2.readUshort(r3, t3);
        t3 += 2;
        var g, S = h[c2], m = d2 + 12 * s2 + U;
        if (0 == u) g = n2.readUnicode(r3, m, p2 / 2);
        else if (3 == u && 0 == l2) g = n2.readUnicode(r3, m, p2 / 2);
        else if (0 == l2) g = n2.readASCII(r3, m, p2);
        else if (1 == l2) g = n2.readUnicode(r3, m, p2 / 2);
        else if (3 == l2) g = n2.readUnicode(r3, m, p2 / 2);
        else {
          if (1 != u) throw "unknown encoding " + l2 + ", platformID: " + u;
          g = n2.readASCII(r3, m, p2), console.debug("reading unknown MAC encoding " + l2 + " as ASCII");
        }
        var b = "p" + u + "," + v.toString(16);
        null == o2[b] && (o2[b] = {}), o2[b][void 0 !== S ? S : c2] = g, o2[b]._lang = v;
      }
      for (var y in o2) if (null != o2[y].postScriptName && 1033 == o2[y]._lang) return o2[y];
      for (var y in o2) if (null != o2[y].postScriptName && 0 == o2[y]._lang) return o2[y];
      for (var y in o2) if (null != o2[y].postScriptName && 3084 == o2[y]._lang) return o2[y];
      for (var y in o2) if (null != o2[y].postScriptName) return o2[y];
      for (var y in o2) {
        i2 = y;
        break;
      }
      return console.debug("returning name table with languageID " + o2[i2]._lang), o2[i2];
    }, e2["OS/2"] = {}, e2["OS/2"].parse = function(r3, t3, a6) {
      var n2 = e2._bin.readUshort(r3, t3);
      t3 += 2;
      var o2 = {};
      if (0 == n2) e2["OS/2"].version0(r3, t3, o2);
      else if (1 == n2) e2["OS/2"].version1(r3, t3, o2);
      else if (2 == n2 || 3 == n2 || 4 == n2) e2["OS/2"].version2(r3, t3, o2);
      else {
        if (5 != n2) throw "unknown OS/2 table version: " + n2;
        e2["OS/2"].version5(r3, t3, o2);
      }
      return o2;
    }, e2["OS/2"].version0 = function(r3, t3, a6) {
      var n2 = e2._bin;
      return a6.xAvgCharWidth = n2.readShort(r3, t3), t3 += 2, a6.usWeightClass = n2.readUshort(r3, t3), t3 += 2, a6.usWidthClass = n2.readUshort(r3, t3), t3 += 2, a6.fsType = n2.readUshort(r3, t3), t3 += 2, a6.ySubscriptXSize = n2.readShort(r3, t3), t3 += 2, a6.ySubscriptYSize = n2.readShort(r3, t3), t3 += 2, a6.ySubscriptXOffset = n2.readShort(r3, t3), t3 += 2, a6.ySubscriptYOffset = n2.readShort(r3, t3), t3 += 2, a6.ySuperscriptXSize = n2.readShort(r3, t3), t3 += 2, a6.ySuperscriptYSize = n2.readShort(r3, t3), t3 += 2, a6.ySuperscriptXOffset = n2.readShort(r3, t3), t3 += 2, a6.ySuperscriptYOffset = n2.readShort(r3, t3), t3 += 2, a6.yStrikeoutSize = n2.readShort(r3, t3), t3 += 2, a6.yStrikeoutPosition = n2.readShort(r3, t3), t3 += 2, a6.sFamilyClass = n2.readShort(r3, t3), t3 += 2, a6.panose = n2.readBytes(r3, t3, 10), t3 += 10, a6.ulUnicodeRange1 = n2.readUint(r3, t3), t3 += 4, a6.ulUnicodeRange2 = n2.readUint(r3, t3), t3 += 4, a6.ulUnicodeRange3 = n2.readUint(r3, t3), t3 += 4, a6.ulUnicodeRange4 = n2.readUint(r3, t3), t3 += 4, a6.achVendID = [n2.readInt8(r3, t3), n2.readInt8(r3, t3 + 1), n2.readInt8(r3, t3 + 2), n2.readInt8(r3, t3 + 3)], t3 += 4, a6.fsSelection = n2.readUshort(r3, t3), t3 += 2, a6.usFirstCharIndex = n2.readUshort(r3, t3), t3 += 2, a6.usLastCharIndex = n2.readUshort(r3, t3), t3 += 2, a6.sTypoAscender = n2.readShort(r3, t3), t3 += 2, a6.sTypoDescender = n2.readShort(r3, t3), t3 += 2, a6.sTypoLineGap = n2.readShort(r3, t3), t3 += 2, a6.usWinAscent = n2.readUshort(r3, t3), t3 += 2, a6.usWinDescent = n2.readUshort(r3, t3), t3 += 2;
    }, e2["OS/2"].version1 = function(r3, t3, a6) {
      var n2 = e2._bin;
      return t3 = e2["OS/2"].version0(r3, t3, a6), a6.ulCodePageRange1 = n2.readUint(r3, t3), t3 += 4, a6.ulCodePageRange2 = n2.readUint(r3, t3), t3 += 4;
    }, e2["OS/2"].version2 = function(r3, t3, a6) {
      var n2 = e2._bin;
      return t3 = e2["OS/2"].version1(r3, t3, a6), a6.sxHeight = n2.readShort(r3, t3), t3 += 2, a6.sCapHeight = n2.readShort(r3, t3), t3 += 2, a6.usDefault = n2.readUshort(r3, t3), t3 += 2, a6.usBreak = n2.readUshort(r3, t3), t3 += 2, a6.usMaxContext = n2.readUshort(r3, t3), t3 += 2;
    }, e2["OS/2"].version5 = function(r3, t3, a6) {
      var n2 = e2._bin;
      return t3 = e2["OS/2"].version2(r3, t3, a6), a6.usLowerOpticalPointSize = n2.readUshort(r3, t3), t3 += 2, a6.usUpperOpticalPointSize = n2.readUshort(r3, t3), t3 += 2;
    }, e2.post = {}, e2.post.parse = function(r3, t3, a6) {
      var n2 = e2._bin, o2 = {};
      return o2.version = n2.readFixed(r3, t3), t3 += 4, o2.italicAngle = n2.readFixed(r3, t3), t3 += 4, o2.underlinePosition = n2.readShort(r3, t3), t3 += 2, o2.underlineThickness = n2.readShort(r3, t3), t3 += 2, o2;
    }, null == e2 && (e2 = {}), null == e2.U && (e2.U = {}), e2.U.codeToGlyph = function(r3, e3) {
      var t3 = r3.cmap, a6 = -1;
      if (null != t3.p0e4 ? a6 = t3.p0e4 : null != t3.p3e1 ? a6 = t3.p3e1 : null != t3.p1e0 ? a6 = t3.p1e0 : null != t3.p0e3 && (a6 = t3.p0e3), -1 == a6) throw "no familiar platform and encoding!";
      var n2 = t3.tables[a6];
      if (0 == n2.format) return e3 >= n2.map.length ? 0 : n2.map[e3];
      if (4 == n2.format) {
        for (var o2 = -1, s2 = 0; s2 < n2.endCount.length; s2++) if (e3 <= n2.endCount[s2]) {
          o2 = s2;
          break;
        }
        if (-1 == o2) return 0;
        if (n2.startCount[o2] > e3) return 0;
        return 65535 & (0 != n2.idRangeOffset[o2] ? n2.glyphIdArray[e3 - n2.startCount[o2] + (n2.idRangeOffset[o2] >> 1) - (n2.idRangeOffset.length - o2)] : e3 + n2.idDelta[o2]);
      }
      if (12 == n2.format) {
        if (e3 > n2.groups[n2.groups.length - 1][1]) return 0;
        for (s2 = 0; s2 < n2.groups.length; s2++) {
          var i2 = n2.groups[s2];
          if (i2[0] <= e3 && e3 <= i2[1]) return i2[2] + (e3 - i2[0]);
        }
        return 0;
      }
      throw "unknown cmap table format " + n2.format;
    }, e2.U.glyphToPath = function(r3, t3) {
      var a6 = { cmds: [], crds: [] };
      if (r3.SVG && r3.SVG.entries[t3]) {
        var n2 = r3.SVG.entries[t3];
        return null == n2 ? a6 : ("string" == typeof n2 && (n2 = e2.SVG.toPath(n2), r3.SVG.entries[t3] = n2), n2);
      }
      if (r3.CFF) {
        var o2 = { x: 0, y: 0, stack: [], nStems: 0, haveWidth: false, width: r3.CFF.Private ? r3.CFF.Private.defaultWidthX : 0, open: false }, s2 = r3.CFF, i2 = r3.CFF.Private;
        if (s2.ROS) {
          for (var h = 0; s2.FDSelect[h + 2] <= t3; ) h += 2;
          i2 = s2.FDArray[s2.FDSelect[h + 1]].Private;
        }
        e2.U._drawCFF(r3.CFF.CharStrings[t3], o2, s2, i2, a6);
      } else r3.glyf && e2.U._drawGlyf(t3, r3, a6);
      return a6;
    }, e2.U._drawGlyf = function(r3, t3, a6) {
      var n2 = t3.glyf[r3];
      null == n2 && (n2 = t3.glyf[r3] = e2.glyf._parseGlyf(t3, r3)), null != n2 && (n2.noc > -1 ? e2.U._simpleGlyph(n2, a6) : e2.U._compoGlyph(n2, t3, a6));
    }, e2.U._simpleGlyph = function(r3, t3) {
      for (var a6 = 0; a6 < r3.noc; a6++) {
        for (var n2 = 0 == a6 ? 0 : r3.endPts[a6 - 1] + 1, o2 = r3.endPts[a6], s2 = n2; s2 <= o2; s2++) {
          var i2 = s2 == n2 ? o2 : s2 - 1, h = s2 == o2 ? n2 : s2 + 1, d2 = 1 & r3.flags[s2], f2 = 1 & r3.flags[i2], u = 1 & r3.flags[h], l2 = r3.xs[s2], v = r3.ys[s2];
          if (s2 == n2) if (d2) {
            if (!f2) {
              e2.U.P.moveTo(t3, l2, v);
              continue;
            }
            e2.U.P.moveTo(t3, r3.xs[i2], r3.ys[i2]);
          } else f2 ? e2.U.P.moveTo(t3, r3.xs[i2], r3.ys[i2]) : e2.U.P.moveTo(t3, (r3.xs[i2] + l2) / 2, (r3.ys[i2] + v) / 2);
          d2 ? f2 && e2.U.P.lineTo(t3, l2, v) : u ? e2.U.P.qcurveTo(t3, l2, v, r3.xs[h], r3.ys[h]) : e2.U.P.qcurveTo(t3, l2, v, (l2 + r3.xs[h]) / 2, (v + r3.ys[h]) / 2);
        }
        e2.U.P.closePath(t3);
      }
    }, e2.U._compoGlyph = function(r3, t3, a6) {
      for (var n2 = 0; n2 < r3.parts.length; n2++) {
        var o2 = { cmds: [], crds: [] }, s2 = r3.parts[n2];
        e2.U._drawGlyf(s2.glyphIndex, t3, o2);
        for (var i2 = s2.m, h = 0; h < o2.crds.length; h += 2) {
          var d2 = o2.crds[h], f2 = o2.crds[h + 1];
          a6.crds.push(d2 * i2.a + f2 * i2.b + i2.tx), a6.crds.push(d2 * i2.c + f2 * i2.d + i2.ty);
        }
        for (h = 0; h < o2.cmds.length; h++) a6.cmds.push(o2.cmds[h]);
      }
    }, e2.U._getGlyphClass = function(r3, t3) {
      var a6 = e2._lctf.getInterval(t3, r3);
      return -1 == a6 ? 0 : t3[a6 + 2];
    }, e2.U._applySubs = function(r3, t3, a6, n2) {
      for (var o2 = r3.length - t3 - 1, s2 = 0; s2 < a6.tabs.length; s2++) if (null != a6.tabs[s2]) {
        var i2, h = a6.tabs[s2];
        if (!h.coverage || -1 != (i2 = e2._lctf.coverageIndex(h.coverage, r3[t3]))) {
          if (1 == a6.ltype) r3[t3], 1 == h.fmt ? r3[t3] = r3[t3] + h.delta : r3[t3] = h.newg[i2];
          else if (4 == a6.ltype) for (var d2 = h.vals[i2], f2 = 0; f2 < d2.length; f2++) {
            var u = d2[f2], l2 = u.chain.length;
            if (!(l2 > o2)) {
              for (var v = true, c2 = 0, p2 = 0; p2 < l2; p2++) {
                for (; -1 == r3[t3 + c2 + (1 + p2)]; ) c2++;
                u.chain[p2] != r3[t3 + c2 + (1 + p2)] && (v = false);
              }
              if (v) {
                r3[t3] = u.nglyph;
                for (p2 = 0; p2 < l2 + c2; p2++) r3[t3 + p2 + 1] = -1;
                break;
              }
            }
          }
          else if (5 == a6.ltype && 2 == h.fmt) for (var U = e2._lctf.getInterval(h.cDef, r3[t3]), g = h.cDef[U + 2], S = h.scset[g], m = 0; m < S.length; m++) {
            var b = S[m], y = b.input;
            if (!(y.length > o2)) {
              for (v = true, p2 = 0; p2 < y.length; p2++) {
                var F = e2._lctf.getInterval(h.cDef, r3[t3 + 1 + p2]);
                if (-1 == U && h.cDef[F + 2] != y[p2]) {
                  v = false;
                  break;
                }
              }
              if (v) {
                var C = b.substLookupRecords;
                for (f2 = 0; f2 < C.length; f2 += 2) C[f2], C[f2 + 1];
              }
            }
          }
          else if (6 == a6.ltype && 3 == h.fmt) {
            if (!e2.U._glsCovered(r3, h.backCvg, t3 - h.backCvg.length)) continue;
            if (!e2.U._glsCovered(r3, h.inptCvg, t3)) continue;
            if (!e2.U._glsCovered(r3, h.ahedCvg, t3 + h.inptCvg.length)) continue;
            var _ = h.lookupRec;
            for (m = 0; m < _.length; m += 2) {
              U = _[m];
              var P = n2[_[m + 1]];
              e2.U._applySubs(r3, t3 + U, P, n2);
            }
          }
        }
      }
    }, e2.U._glsCovered = function(r3, t3, a6) {
      for (var n2 = 0; n2 < t3.length; n2++) {
        if (-1 == e2._lctf.coverageIndex(t3[n2], r3[a6 + n2])) return false;
      }
      return true;
    }, e2.U.glyphsToPath = function(r3, t3, a6) {
      for (var n2 = { cmds: [], crds: [] }, o2 = 0, s2 = 0; s2 < t3.length; s2++) {
        var i2 = t3[s2];
        if (-1 != i2) {
          for (var h = s2 < t3.length - 1 && -1 != t3[s2 + 1] ? t3[s2 + 1] : 0, d2 = e2.U.glyphToPath(r3, i2), f2 = 0; f2 < d2.crds.length; f2 += 2) n2.crds.push(d2.crds[f2] + o2), n2.crds.push(d2.crds[f2 + 1]);
          a6 && n2.cmds.push(a6);
          for (f2 = 0; f2 < d2.cmds.length; f2++) n2.cmds.push(d2.cmds[f2]);
          a6 && n2.cmds.push("X"), o2 += r3.hmtx.aWidth[i2], s2 < t3.length - 1 && (o2 += e2.U.getPairAdjustment(r3, i2, h));
        }
      }
      return n2;
    }, e2.U.P = {}, e2.U.P.moveTo = function(r3, e3, t3) {
      r3.cmds.push("M"), r3.crds.push(e3, t3);
    }, e2.U.P.lineTo = function(r3, e3, t3) {
      r3.cmds.push("L"), r3.crds.push(e3, t3);
    }, e2.U.P.curveTo = function(r3, e3, t3, a6, n2, o2, s2) {
      r3.cmds.push("C"), r3.crds.push(e3, t3, a6, n2, o2, s2);
    }, e2.U.P.qcurveTo = function(r3, e3, t3, a6, n2) {
      r3.cmds.push("Q"), r3.crds.push(e3, t3, a6, n2);
    }, e2.U.P.closePath = function(r3) {
      r3.cmds.push("Z");
    }, e2.U._drawCFF = function(r3, t3, a6, n2, o2) {
      for (var s2 = t3.stack, i2 = t3.nStems, h = t3.haveWidth, d2 = t3.width, f2 = t3.open, u = 0, l2 = t3.x, v = t3.y, c2 = 0, p2 = 0, U = 0, g = 0, S = 0, m = 0, b = 0, y = 0, F = 0, C = 0, _ = { val: 0, size: 0 }; u < r3.length; ) {
        e2.CFF.getCharString(r3, u, _);
        var P = _.val;
        if (u += _.size, "o1" == P || "o18" == P) s2.length % 2 != 0 && !h && (d2 = s2.shift() + n2.nominalWidthX), i2 += s2.length >> 1, s2.length = 0, h = true;
        else if ("o3" == P || "o23" == P) {
          s2.length % 2 != 0 && !h && (d2 = s2.shift() + n2.nominalWidthX), i2 += s2.length >> 1, s2.length = 0, h = true;
        } else if ("o4" == P) s2.length > 1 && !h && (d2 = s2.shift() + n2.nominalWidthX, h = true), f2 && e2.U.P.closePath(o2), v += s2.pop(), e2.U.P.moveTo(o2, l2, v), f2 = true;
        else if ("o5" == P) for (; s2.length > 0; ) l2 += s2.shift(), v += s2.shift(), e2.U.P.lineTo(o2, l2, v);
        else if ("o6" == P || "o7" == P) for (var x = s2.length, I = "o6" == P, w = 0; w < x; w++) {
          var k = s2.shift();
          I ? l2 += k : v += k, I = !I, e2.U.P.lineTo(o2, l2, v);
        }
        else if ("o8" == P || "o24" == P) {
          x = s2.length;
          for (var G = 0; G + 6 <= x; ) c2 = l2 + s2.shift(), p2 = v + s2.shift(), U = c2 + s2.shift(), g = p2 + s2.shift(), l2 = U + s2.shift(), v = g + s2.shift(), e2.U.P.curveTo(o2, c2, p2, U, g, l2, v), G += 6;
          "o24" == P && (l2 += s2.shift(), v += s2.shift(), e2.U.P.lineTo(o2, l2, v));
        } else {
          if ("o11" == P) break;
          if ("o1234" == P || "o1235" == P || "o1236" == P || "o1237" == P) "o1234" == P && (p2 = v, U = (c2 = l2 + s2.shift()) + s2.shift(), C = g = p2 + s2.shift(), m = g, y = v, l2 = (b = (S = (F = U + s2.shift()) + s2.shift()) + s2.shift()) + s2.shift(), e2.U.P.curveTo(o2, c2, p2, U, g, F, C), e2.U.P.curveTo(o2, S, m, b, y, l2, v)), "o1235" == P && (c2 = l2 + s2.shift(), p2 = v + s2.shift(), U = c2 + s2.shift(), g = p2 + s2.shift(), F = U + s2.shift(), C = g + s2.shift(), S = F + s2.shift(), m = C + s2.shift(), b = S + s2.shift(), y = m + s2.shift(), l2 = b + s2.shift(), v = y + s2.shift(), s2.shift(), e2.U.P.curveTo(o2, c2, p2, U, g, F, C), e2.U.P.curveTo(o2, S, m, b, y, l2, v)), "o1236" == P && (c2 = l2 + s2.shift(), p2 = v + s2.shift(), U = c2 + s2.shift(), C = g = p2 + s2.shift(), m = g, b = (S = (F = U + s2.shift()) + s2.shift()) + s2.shift(), y = m + s2.shift(), l2 = b + s2.shift(), e2.U.P.curveTo(o2, c2, p2, U, g, F, C), e2.U.P.curveTo(o2, S, m, b, y, l2, v)), "o1237" == P && (c2 = l2 + s2.shift(), p2 = v + s2.shift(), U = c2 + s2.shift(), g = p2 + s2.shift(), F = U + s2.shift(), C = g + s2.shift(), S = F + s2.shift(), m = C + s2.shift(), b = S + s2.shift(), y = m + s2.shift(), Math.abs(b - l2) > Math.abs(y - v) ? l2 = b + s2.shift() : v = y + s2.shift(), e2.U.P.curveTo(o2, c2, p2, U, g, F, C), e2.U.P.curveTo(o2, S, m, b, y, l2, v));
          else if ("o14" == P) {
            if (s2.length > 0 && !h && (d2 = s2.shift() + a6.nominalWidthX, h = true), 4 == s2.length) {
              var O = s2.shift(), T = s2.shift(), D = s2.shift(), B = s2.shift(), A = e2.CFF.glyphBySE(a6, D), R = e2.CFF.glyphBySE(a6, B);
              e2.U._drawCFF(a6.CharStrings[A], t3, a6, n2, o2), t3.x = O, t3.y = T, e2.U._drawCFF(a6.CharStrings[R], t3, a6, n2, o2);
            }
            f2 && (e2.U.P.closePath(o2), f2 = false);
          } else if ("o19" == P || "o20" == P) {
            s2.length % 2 != 0 && !h && (d2 = s2.shift() + n2.nominalWidthX), i2 += s2.length >> 1, s2.length = 0, h = true, u += i2 + 7 >> 3;
          } else if ("o21" == P) s2.length > 2 && !h && (d2 = s2.shift() + n2.nominalWidthX, h = true), v += s2.pop(), l2 += s2.pop(), f2 && e2.U.P.closePath(o2), e2.U.P.moveTo(o2, l2, v), f2 = true;
          else if ("o22" == P) s2.length > 1 && !h && (d2 = s2.shift() + n2.nominalWidthX, h = true), l2 += s2.pop(), f2 && e2.U.P.closePath(o2), e2.U.P.moveTo(o2, l2, v), f2 = true;
          else if ("o25" == P) {
            for (; s2.length > 6; ) l2 += s2.shift(), v += s2.shift(), e2.U.P.lineTo(o2, l2, v);
            c2 = l2 + s2.shift(), p2 = v + s2.shift(), U = c2 + s2.shift(), g = p2 + s2.shift(), l2 = U + s2.shift(), v = g + s2.shift(), e2.U.P.curveTo(o2, c2, p2, U, g, l2, v);
          } else if ("o26" == P) for (s2.length % 2 && (l2 += s2.shift()); s2.length > 0; ) c2 = l2, p2 = v + s2.shift(), l2 = U = c2 + s2.shift(), v = (g = p2 + s2.shift()) + s2.shift(), e2.U.P.curveTo(o2, c2, p2, U, g, l2, v);
          else if ("o27" == P) for (s2.length % 2 && (v += s2.shift()); s2.length > 0; ) p2 = v, U = (c2 = l2 + s2.shift()) + s2.shift(), g = p2 + s2.shift(), l2 = U + s2.shift(), v = g, e2.U.P.curveTo(o2, c2, p2, U, g, l2, v);
          else if ("o10" == P || "o29" == P) {
            var L = "o10" == P ? n2 : a6;
            if (0 == s2.length) console.debug("error: empty stack");
            else {
              var W = s2.pop(), M = L.Subrs[W + L.Bias];
              t3.x = l2, t3.y = v, t3.nStems = i2, t3.haveWidth = h, t3.width = d2, t3.open = f2, e2.U._drawCFF(M, t3, a6, n2, o2), l2 = t3.x, v = t3.y, i2 = t3.nStems, h = t3.haveWidth, d2 = t3.width, f2 = t3.open;
            }
          } else if ("o30" == P || "o31" == P) {
            var V2 = s2.length, E = (G = 0, "o31" == P);
            for (G += V2 - (x = -3 & V2); G < x; ) E ? (p2 = v, U = (c2 = l2 + s2.shift()) + s2.shift(), v = (g = p2 + s2.shift()) + s2.shift(), x - G == 5 ? (l2 = U + s2.shift(), G++) : l2 = U, E = false) : (c2 = l2, p2 = v + s2.shift(), U = c2 + s2.shift(), g = p2 + s2.shift(), l2 = U + s2.shift(), x - G == 5 ? (v = g + s2.shift(), G++) : v = g, E = true), e2.U.P.curveTo(o2, c2, p2, U, g, l2, v), G += 4;
          } else {
            if ("o" == (P + "").charAt(0)) throw console.debug("Unknown operation: " + P, r3), P;
            s2.push(P);
          }
        }
      }
      t3.x = l2, t3.y = v, t3.nStems = i2, t3.haveWidth = h, t3.width = d2, t3.open = f2;
    };
    var t2 = e2, a5 = { Typr: t2 };
    return r2.Typr = t2, r2.default = a5, Object.defineProperty(r2, "__esModule", { value: true }), r2;
  })({}).Typr;
}
function woff2otfFactory() {
  return (function(r2) {
    var e2 = Uint8Array, n2 = Uint16Array, t2 = Uint32Array, a5 = new e2([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 0, 0, 0]), i2 = new e2([0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 0, 0]), o2 = new e2([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]), f2 = function(r3, e3) {
      for (var a6 = new n2(31), i3 = 0; i3 < 31; ++i3) a6[i3] = e3 += 1 << r3[i3 - 1];
      var o3 = new t2(a6[30]);
      for (i3 = 1; i3 < 30; ++i3) for (var f3 = a6[i3]; f3 < a6[i3 + 1]; ++f3) o3[f3] = f3 - a6[i3] << 5 | i3;
      return [a6, o3];
    }, u = f2(a5, 2), v = u[0], s2 = u[1];
    v[28] = 258, s2[258] = 28;
    for (var l2 = f2(i2, 0)[0], c2 = new n2(32768), g = 0; g < 32768; ++g) {
      var h = (43690 & g) >>> 1 | (21845 & g) << 1;
      h = (61680 & (h = (52428 & h) >>> 2 | (13107 & h) << 2)) >>> 4 | (3855 & h) << 4, c2[g] = ((65280 & h) >>> 8 | (255 & h) << 8) >>> 1;
    }
    var w = function(r3, e3, t3) {
      for (var a6 = r3.length, i3 = 0, o3 = new n2(e3); i3 < a6; ++i3) ++o3[r3[i3] - 1];
      var f3, u2 = new n2(e3);
      for (i3 = 0; i3 < e3; ++i3) u2[i3] = u2[i3 - 1] + o3[i3 - 1] << 1;
      if (t3) {
        f3 = new n2(1 << e3);
        var v2 = 15 - e3;
        for (i3 = 0; i3 < a6; ++i3) if (r3[i3]) for (var s3 = i3 << 4 | r3[i3], l3 = e3 - r3[i3], g2 = u2[r3[i3] - 1]++ << l3, h2 = g2 | (1 << l3) - 1; g2 <= h2; ++g2) f3[c2[g2] >>> v2] = s3;
      } else for (f3 = new n2(a6), i3 = 0; i3 < a6; ++i3) r3[i3] && (f3[i3] = c2[u2[r3[i3] - 1]++] >>> 15 - r3[i3]);
      return f3;
    }, d2 = new e2(288);
    for (g = 0; g < 144; ++g) d2[g] = 8;
    for (g = 144; g < 256; ++g) d2[g] = 9;
    for (g = 256; g < 280; ++g) d2[g] = 7;
    for (g = 280; g < 288; ++g) d2[g] = 8;
    var m = new e2(32);
    for (g = 0; g < 32; ++g) m[g] = 5;
    var b = w(d2, 9, 1), p2 = w(m, 5, 1), y = function(r3) {
      for (var e3 = r3[0], n3 = 1; n3 < r3.length; ++n3) r3[n3] > e3 && (e3 = r3[n3]);
      return e3;
    }, L = function(r3, e3, n3) {
      var t3 = e3 / 8 | 0;
      return (r3[t3] | r3[t3 + 1] << 8) >> (7 & e3) & n3;
    }, U = function(r3, e3) {
      var n3 = e3 / 8 | 0;
      return (r3[n3] | r3[n3 + 1] << 8 | r3[n3 + 2] << 16) >> (7 & e3);
    }, k = ["unexpected EOF", "invalid block type", "invalid length/literal", "invalid distance", "stream finished", "no stream handler", , "no callback", "invalid UTF-8 data", "extra field too long", "date not in range 1980-2099", "filename too long", "stream finishing", "invalid zip data"], T = function(r3, e3, n3) {
      var t3 = new Error(e3 || k[r3]);
      if (t3.code = r3, Error.captureStackTrace && Error.captureStackTrace(t3, T), !n3) throw t3;
      return t3;
    }, O = function(r3, f3, u2) {
      var s3 = r3.length;
      if (!s3 || u2 && !u2.l && s3 < 5) return f3 || new e2(0);
      var c5 = !f3 || u2, g2 = !u2 || u2.i;
      u2 || (u2 = {}), f3 || (f3 = new e2(3 * s3));
      var h2, d3 = function(r4) {
        var n3 = f3.length;
        if (r4 > n3) {
          var t3 = new e2(Math.max(2 * n3, r4));
          t3.set(f3), f3 = t3;
        }
      }, m2 = u2.f || 0, k2 = u2.p || 0, O2 = u2.b || 0, A2 = u2.l, x2 = u2.d, E = u2.m, D = u2.n, M = 8 * s3;
      do {
        if (!A2) {
          u2.f = m2 = L(r3, k2, 1);
          var S = L(r3, k2 + 1, 3);
          if (k2 += 3, !S) {
            var V2 = r3[(I = ((h2 = k2) / 8 | 0) + (7 & h2 && 1) + 4) - 4] | r3[I - 3] << 8, _ = I + V2;
            if (_ > s3) {
              g2 && T(0);
              break;
            }
            c5 && d3(O2 + V2), f3.set(r3.subarray(I, _), O2), u2.b = O2 += V2, u2.p = k2 = 8 * _;
            continue;
          }
          if (1 == S) A2 = b, x2 = p2, E = 9, D = 5;
          else if (2 == S) {
            var j = L(r3, k2, 31) + 257, z = L(r3, k2 + 10, 15) + 4, C = j + L(r3, k2 + 5, 31) + 1;
            k2 += 14;
            for (var F = new e2(C), P = new e2(19), q = 0; q < z; ++q) P[o2[q]] = L(r3, k2 + 3 * q, 7);
            k2 += 3 * z;
            var B = y(P), G = (1 << B) - 1, H = w(P, B, 1);
            for (q = 0; q < C; ) {
              var I, J = H[L(r3, k2, G)];
              if (k2 += 15 & J, (I = J >>> 4) < 16) F[q++] = I;
              else {
                var K = 0, N = 0;
                for (16 == I ? (N = 3 + L(r3, k2, 3), k2 += 2, K = F[q - 1]) : 17 == I ? (N = 3 + L(r3, k2, 7), k2 += 3) : 18 == I && (N = 11 + L(r3, k2, 127), k2 += 7); N--; ) F[q++] = K;
              }
            }
            var Q = F.subarray(0, j), R = F.subarray(j);
            E = y(Q), D = y(R), A2 = w(Q, E, 1), x2 = w(R, D, 1);
          } else T(1);
          if (k2 > M) {
            g2 && T(0);
            break;
          }
        }
        c5 && d3(O2 + 131072);
        for (var W = (1 << E) - 1, X = (1 << D) - 1, Y = k2; ; Y = k2) {
          var Z = (K = A2[U(r3, k2) & W]) >>> 4;
          if ((k2 += 15 & K) > M) {
            g2 && T(0);
            break;
          }
          if (K || T(2), Z < 256) f3[O2++] = Z;
          else {
            if (256 == Z) {
              Y = k2, A2 = null;
              break;
            }
            var $ = Z - 254;
            if (Z > 264) {
              var rr = a5[q = Z - 257];
              $ = L(r3, k2, (1 << rr) - 1) + v[q], k2 += rr;
            }
            var er = x2[U(r3, k2) & X], nr = er >>> 4;
            er || T(3), k2 += 15 & er;
            R = l2[nr];
            if (nr > 3) {
              rr = i2[nr];
              R += U(r3, k2) & (1 << rr) - 1, k2 += rr;
            }
            if (k2 > M) {
              g2 && T(0);
              break;
            }
            c5 && d3(O2 + 131072);
            for (var tr = O2 + $; O2 < tr; O2 += 4) f3[O2] = f3[O2 - R], f3[O2 + 1] = f3[O2 + 1 - R], f3[O2 + 2] = f3[O2 + 2 - R], f3[O2 + 3] = f3[O2 + 3 - R];
            O2 = tr;
          }
        }
        u2.l = A2, u2.p = Y, u2.b = O2, A2 && (m2 = 1, u2.m = E, u2.d = x2, u2.n = D);
      } while (!m2);
      return O2 == f3.length ? f3 : (function(r4, a6, i3) {
        (null == a6 || a6 < 0) && (a6 = 0), (null == i3 || i3 > r4.length) && (i3 = r4.length);
        var o3 = new (r4 instanceof n2 ? n2 : r4 instanceof t2 ? t2 : e2)(i3 - a6);
        return o3.set(r4.subarray(a6, i3)), o3;
      })(f3, 0, O2);
    }, A = new e2(0);
    var x = "undefined" != typeof TextDecoder && new TextDecoder();
    try {
      x.decode(A, { stream: true }), 1;
    } catch (r3) {
    }
    return r2.convert_streams = function(r3) {
      var e3 = new DataView(r3), n3 = 0;
      function t3() {
        var r4 = e3.getUint16(n3);
        return n3 += 2, r4;
      }
      function a6() {
        var r4 = e3.getUint32(n3);
        return n3 += 4, r4;
      }
      function i3(r4) {
        m2.setUint16(b5, r4), b5 += 2;
      }
      function o3(r4) {
        m2.setUint32(b5, r4), b5 += 4;
      }
      for (var f3 = { signature: a6(), flavor: a6(), length: a6(), numTables: t3(), reserved: t3(), totalSfntSize: a6(), majorVersion: t3(), minorVersion: t3(), metaOffset: a6(), metaLength: a6(), metaOrigLength: a6(), privOffset: a6(), privLength: a6() }, u2 = 0; Math.pow(2, u2) <= f3.numTables; ) u2++;
      u2--;
      for (var v2 = 16 * Math.pow(2, u2), s3 = 16 * f3.numTables - v2, l3 = 12, c5 = [], g2 = 0; g2 < f3.numTables; g2++) c5.push({ tag: a6(), offset: a6(), compLength: a6(), origLength: a6(), origChecksum: a6() }), l3 += 16;
      var h2, w2 = new Uint8Array(12 + 16 * c5.length + c5.reduce((function(r4, e4) {
        return r4 + e4.origLength + 4;
      }), 0)), d3 = w2.buffer, m2 = new DataView(d3), b5 = 0;
      return o3(f3.flavor), i3(f3.numTables), i3(v2), i3(u2), i3(s3), c5.forEach((function(r4) {
        o3(r4.tag), o3(r4.origChecksum), o3(l3), o3(r4.origLength), r4.outOffset = l3, (l3 += r4.origLength) % 4 != 0 && (l3 += 4 - l3 % 4);
      })), c5.forEach((function(e4) {
        var n4, t4 = r3.slice(e4.offset, e4.offset + e4.compLength);
        if (e4.compLength != e4.origLength) {
          var a7 = new Uint8Array(e4.origLength);
          n4 = new Uint8Array(t4, 2), O(n4, a7);
        } else a7 = new Uint8Array(t4);
        w2.set(a7, e4.outOffset);
        var i4 = 0;
        (l3 = e4.outOffset + e4.origLength) % 4 != 0 && (i4 = 4 - l3 % 4), w2.set(new Uint8Array(i4).buffer, e4.outOffset + e4.origLength), h2 = l3 + i4;
      })), d3.slice(0, h2);
    }, Object.defineProperty(r2, "__esModule", { value: true }), r2;
  })({}).convert_streams;
}
function parserFactory(Typr, woff2otf) {
  const cmdArgLengths = {
    M: 2,
    L: 2,
    Q: 4,
    C: 6,
    Z: 0
  };
  const joiningTypeRawData = { "C": "18g,ca,368,1kz", "D": "17k,6,2,2+4,5+c,2+6,2+1,10+1,9+f,j+11,2+1,a,2,2+1,15+2,3,j+2,6+3,2+8,2,2,2+1,w+a,4+e,3+3,2,3+2,3+5,23+w,2f+4,3,2+9,2,b,2+3,3,1k+9,6+1,3+1,2+2,2+d,30g,p+y,1,1+1g,f+x,2,sd2+1d,jf3+4,f+3,2+4,2+2,b+3,42,2,4+2,2+1,2,3,t+1,9f+w,2,el+2,2+g,d+2,2l,2+1,5,3+1,2+1,2,3,6,16wm+1v", "R": "17m+3,2,2,6+3,m,15+2,2+2,h+h,13,3+8,2,2,3+1,2,p+1,x,5+4,5,a,2,2,3,u,c+2,g+1,5,2+1,4+1,5j,6+1,2,b,2+2,f,2+1,1s+2,2,3+1,7,1ez0,2,2+1,4+4,b,4,3,b,42,2+2,4,3,2+1,2,o+3,ae,ep,x,2o+2,3+1,3,5+1,6", "L": "x9u,jff,a,fd,jv", "T": "4t,gj+33,7o+4,1+1,7c+18,2,2+1,2+1,2,21+a,2,1b+k,h,2u+6,3+5,3+1,2+3,y,2,v+q,2k+a,1n+8,a,p+3,2+8,2+2,2+4,18+2,3c+e,2+v,1k,2,5+7,5,4+6,b+1,u,1n,5+3,9,l+1,r,3+1,1m,5+1,5+1,3+2,4,v+1,4,c+1,1m,5+4,2+1,5,l+1,n+5,2,1n,3,2+3,9,8+1,c+1,v,1q,d,1f,4,1m+2,6+2,2+3,8+1,c+1,u,1n,3,7,6+1,l+1,t+1,1m+1,5+3,9,l+1,u,21,8+2,2,2j,3+6,d+7,2r,3+8,c+5,23+1,s,2,2,1k+d,2+4,2+1,6+a,2+z,a,2v+3,2+5,2+1,3+1,q+1,5+2,h+3,e,3+1,7,g,jk+2,qb+2,u+2,u+1,v+1,1t+1,2+6,9,3+a,a,1a+2,3c+1,z,3b+2,5+1,a,7+2,64+1,3,1n,2+6,2,2,3+7,7+9,3,1d+d,1,1+1,1s+3,1d,2+4,2,6,15+8,d+1,x+3,3+1,2+2,1l,2+1,4,2+2,1n+7,3+1,49+2,2+c,2+6,5,7,4+1,5j+1l,2+4,ek,3+1,r+4,1e+4,6+5,2p+c,1+3,1,1+2,1+b,2db+2,3y,2p+v,ff+3,30+1,n9x,1+2,2+9,x+1,29+1,7l,4,5,q+1,6,48+1,r+h,e,13+7,q+a,1b+2,1d,3+3,3+1,14,1w+5,3+1,3+1,d,9,1c,1g,2+2,3+1,6+1,2,17+1,9,6n,3,5,fn5,ki+f,h+f,5s,6y+2,ea,6b,46+4,1af+2,2+1,6+3,15+2,5,4m+1,fy+3,as+1,4a+a,4x,1j+e,1l+2,1e+3,3+1,1y+2,11+4,2+7,1r,d+1,1h+8,b+3,3,2o+2,3,2+1,7,4h,4+7,m+1,1m+1,4,12+6,4+4,5g+7,3+2,2,o,2d+5,2,5+1,2+1,6n+3,7+1,2+1,s+1,2e+7,3,2+1,2z,2,3+5,2,2u+2,3+3,2+4,78+8,2+1,75+1,2,5,41+3,3+1,5,x+9,15+5,3+3,9,a+5,3+2,1b+c,2+1,bb+6,2+5,2,2b+l,3+6,2+1,2+1,3f+5,4,2+1,2+6,2,21+1,4,2,9o+1,470+8,at4+4,1o+6,t5,1s+3,2a,f5l+1,2+3,43o+2,a+7,1+7,3+6,v+3,45+2,1j0+1i,5+1d,9,f,n+4,2+e,11t+6,2+g,3+6,2+1,2+4,7a+6,c6+3,15t+6,32+6,1,gzau,v+2n,3l+6n" };
  const JT_LEFT = 1, JT_RIGHT = 2, JT_DUAL = 4, JT_TRANSPARENT = 8, JT_JOIN_CAUSING = 16, JT_NON_JOINING = 32;
  let joiningTypeMap;
  function getCharJoiningType(ch) {
    if (!joiningTypeMap) {
      const m = {
        R: JT_RIGHT,
        L: JT_LEFT,
        D: JT_DUAL,
        C: JT_JOIN_CAUSING,
        U: JT_NON_JOINING,
        T: JT_TRANSPARENT
      };
      joiningTypeMap = /* @__PURE__ */ new Map();
      for (let type in joiningTypeRawData) {
        let lastCode = 0;
        joiningTypeRawData[type].split(",").forEach((range) => {
          let [skip, step] = range.split("+");
          skip = parseInt(skip, 36);
          step = step ? parseInt(step, 36) : 0;
          joiningTypeMap.set(lastCode += skip, m[type]);
          for (let i2 = step; i2--; ) {
            joiningTypeMap.set(++lastCode, m[type]);
          }
        });
      }
    }
    return joiningTypeMap.get(ch) || JT_NON_JOINING;
  }
  const ISOL = 1, INIT = 2, FINA = 3, MEDI = 4;
  const formsToFeatures = [null, "isol", "init", "fina", "medi"];
  function detectJoiningForms(str) {
    const joiningForms = new Uint8Array(str.length);
    let prevJoiningType = JT_NON_JOINING;
    let prevForm = ISOL;
    let prevIndex = -1;
    for (let i2 = 0; i2 < str.length; i2++) {
      const code = str.codePointAt(i2);
      let joiningType = getCharJoiningType(code) | 0;
      let form = ISOL;
      if (joiningType & JT_TRANSPARENT) {
        continue;
      }
      if (prevJoiningType & (JT_LEFT | JT_DUAL | JT_JOIN_CAUSING)) {
        if (joiningType & (JT_RIGHT | JT_DUAL | JT_JOIN_CAUSING)) {
          form = FINA;
          if (prevForm === ISOL || prevForm === FINA) {
            joiningForms[prevIndex]++;
          }
        } else if (joiningType & (JT_LEFT | JT_NON_JOINING)) {
          if (prevForm === INIT || prevForm === MEDI) {
            joiningForms[prevIndex]--;
          }
        }
      } else if (prevJoiningType & (JT_RIGHT | JT_NON_JOINING)) {
        if (prevForm === INIT || prevForm === MEDI) {
          joiningForms[prevIndex]--;
        }
      }
      prevForm = joiningForms[i2] = form;
      prevJoiningType = joiningType;
      prevIndex = i2;
      if (code > 65535) i2++;
    }
    return joiningForms;
  }
  function stringToGlyphs(font, str) {
    const glyphIds = [];
    for (let i2 = 0; i2 < str.length; i2++) {
      const cc = str.codePointAt(i2);
      if (cc > 65535) i2++;
      glyphIds.push(Typr.U.codeToGlyph(font, cc));
    }
    const gsub = font["GSUB"];
    if (gsub) {
      const { lookupList, featureList } = gsub;
      let joiningForms;
      const supportedFeatures = /^(rlig|liga|mset|isol|init|fina|medi|half|pres|blws|ccmp)$/;
      const usedLookups = [];
      featureList.forEach((feature) => {
        if (supportedFeatures.test(feature.tag)) {
          for (let ti = 0; ti < feature.tab.length; ti++) {
            if (usedLookups[feature.tab[ti]]) continue;
            usedLookups[feature.tab[ti]] = true;
            const tab = lookupList[feature.tab[ti]];
            const isJoiningFeature = /^(isol|init|fina|medi)$/.test(feature.tag);
            if (isJoiningFeature && !joiningForms) {
              joiningForms = detectJoiningForms(str);
            }
            for (let ci = 0; ci < glyphIds.length; ci++) {
              if (!joiningForms || !isJoiningFeature || formsToFeatures[joiningForms[ci]] === feature.tag) {
                Typr.U._applySubs(glyphIds, ci, tab, lookupList);
              }
            }
          }
        }
      });
    }
    return glyphIds;
  }
  function calcGlyphPositions(font, glyphIds) {
    const positions = new Int16Array(glyphIds.length * 3);
    let glyphIndex = 0;
    for (; glyphIndex < glyphIds.length; glyphIndex++) {
      const glyphId = glyphIds[glyphIndex];
      if (glyphId === -1) continue;
      positions[glyphIndex * 3 + 2] = font.hmtx.aWidth[glyphId];
      const gpos = font.GPOS;
      if (gpos) {
        const llist = gpos.lookupList;
        for (let i2 = 0; i2 < llist.length; i2++) {
          const lookup = llist[i2];
          for (let j = 0; j < lookup.tabs.length; j++) {
            const tab = lookup.tabs[j];
            if (lookup.ltype === 1) {
              const ind = Typr._lctf.coverageIndex(tab.coverage, glyphId);
              if (ind !== -1 && tab.pos) {
                applyValueRecord(tab.pos, glyphIndex);
                break;
              }
            } else if (lookup.ltype === 2) {
              let adj = null;
              let prevGlyphIndex = getPrevGlyphIndex();
              if (prevGlyphIndex !== -1) {
                const coverageIndex = Typr._lctf.coverageIndex(tab.coverage, glyphIds[prevGlyphIndex]);
                if (coverageIndex !== -1) {
                  if (tab.fmt === 1) {
                    const right = tab.pairsets[coverageIndex];
                    for (let k = 0; k < right.length; k++) {
                      if (right[k].gid2 === glyphId) adj = right[k];
                    }
                  } else if (tab.fmt === 2) {
                    const c1 = Typr.U._getGlyphClass(glyphIds[prevGlyphIndex], tab.classDef1);
                    const c2 = Typr.U._getGlyphClass(glyphId, tab.classDef2);
                    adj = tab.matrix[c1][c2];
                  }
                  if (adj) {
                    if (adj.val1) applyValueRecord(adj.val1, prevGlyphIndex);
                    if (adj.val2) applyValueRecord(adj.val2, glyphIndex);
                    break;
                  }
                }
              }
            } else if (lookup.ltype === 4) {
              const markArrIndex = Typr._lctf.coverageIndex(tab.markCoverage, glyphId);
              if (markArrIndex !== -1) {
                const baseGlyphIndex = getPrevGlyphIndex(isBaseGlyph);
                const baseArrIndex = baseGlyphIndex === -1 ? -1 : Typr._lctf.coverageIndex(tab.baseCoverage, glyphIds[baseGlyphIndex]);
                if (baseArrIndex !== -1) {
                  const markRecord = tab.markArray[markArrIndex];
                  const baseAnchor = tab.baseArray[baseArrIndex][markRecord.markClass];
                  positions[glyphIndex * 3] = baseAnchor.x - markRecord.x + positions[baseGlyphIndex * 3] - positions[baseGlyphIndex * 3 + 2];
                  positions[glyphIndex * 3 + 1] = baseAnchor.y - markRecord.y + positions[baseGlyphIndex * 3 + 1];
                  break;
                }
              }
            } else if (lookup.ltype === 6) {
              const mark1ArrIndex = Typr._lctf.coverageIndex(tab.mark1Coverage, glyphId);
              if (mark1ArrIndex !== -1) {
                const prevGlyphIndex = getPrevGlyphIndex();
                if (prevGlyphIndex !== -1) {
                  const prevGlyphId = glyphIds[prevGlyphIndex];
                  if (getGlyphClass(font, prevGlyphId) === 3) {
                    const mark2ArrIndex = Typr._lctf.coverageIndex(tab.mark2Coverage, prevGlyphId);
                    if (mark2ArrIndex !== -1) {
                      const mark1Record = tab.mark1Array[mark1ArrIndex];
                      const mark2Anchor = tab.mark2Array[mark2ArrIndex][mark1Record.markClass];
                      positions[glyphIndex * 3] = mark2Anchor.x - mark1Record.x + positions[prevGlyphIndex * 3] - positions[prevGlyphIndex * 3 + 2];
                      positions[glyphIndex * 3 + 1] = mark2Anchor.y - mark1Record.y + positions[prevGlyphIndex * 3 + 1];
                      break;
                    }
                  }
                }
              }
            }
          }
        }
      } else if (font.kern && !font.cff) {
        const prevGlyphIndex = getPrevGlyphIndex();
        if (prevGlyphIndex !== -1) {
          const ind1 = font.kern.glyph1.indexOf(glyphIds[prevGlyphIndex]);
          if (ind1 !== -1) {
            const ind2 = font.kern.rval[ind1].glyph2.indexOf(glyphId);
            if (ind2 !== -1) {
              positions[prevGlyphIndex * 3 + 2] += font.kern.rval[ind1].vals[ind2];
            }
          }
        }
      }
    }
    return positions;
    function getPrevGlyphIndex(filter) {
      for (let i2 = glyphIndex - 1; i2 >= 0; i2--) {
        if (glyphIds[i2] !== -1 && (!filter || filter(glyphIds[i2]))) {
          return i2;
        }
      }
      return -1;
    }
    function isBaseGlyph(glyphId) {
      return getGlyphClass(font, glyphId) === 1;
    }
    function applyValueRecord(source, gi) {
      for (let i2 = 0; i2 < 3; i2++) {
        positions[gi * 3 + i2] += source[i2] || 0;
      }
    }
  }
  function getGlyphClass(font, glyphId) {
    const classDef = font.GDEF && font.GDEF.glyphClassDef;
    return classDef ? Typr.U._getGlyphClass(glyphId, classDef) : 0;
  }
  function firstNum(...args) {
    for (let i2 = 0; i2 < args.length; i2++) {
      if (typeof args[i2] === "number") {
        return args[i2];
      }
    }
  }
  function wrapFontObj(typrFont) {
    const glyphMap = /* @__PURE__ */ Object.create(null);
    const os2 = typrFont["OS/2"];
    const hhea = typrFont.hhea;
    const unitsPerEm = typrFont.head.unitsPerEm;
    const ascender = firstNum(os2 && os2.sTypoAscender, hhea && hhea.ascender, unitsPerEm);
    const fontObj = {
      unitsPerEm,
      ascender,
      descender: firstNum(os2 && os2.sTypoDescender, hhea && hhea.descender, 0),
      capHeight: firstNum(os2 && os2.sCapHeight, ascender),
      xHeight: firstNum(os2 && os2.sxHeight, ascender),
      lineGap: firstNum(os2 && os2.sTypoLineGap, hhea && hhea.lineGap),
      supportsCodePoint(code) {
        return Typr.U.codeToGlyph(typrFont, code) > 0;
      },
      forEachGlyph(text, fontSize, letterSpacing, callback) {
        let penX = 0;
        const fontScale = 1 / fontObj.unitsPerEm * fontSize;
        const glyphIds = stringToGlyphs(typrFont, text);
        let charIndex = 0;
        const positions = calcGlyphPositions(typrFont, glyphIds);
        glyphIds.forEach((glyphId, i2) => {
          if (glyphId !== -1) {
            let glyphObj = glyphMap[glyphId];
            if (!glyphObj) {
              const { cmds, crds } = Typr.U.glyphToPath(typrFont, glyphId);
              let path = "";
              let crdsIdx = 0;
              for (let i3 = 0, len = cmds.length; i3 < len; i3++) {
                const numArgs = cmdArgLengths[cmds[i3]];
                path += cmds[i3];
                for (let j = 1; j <= numArgs; j++) {
                  path += (j > 1 ? "," : "") + crds[crdsIdx++];
                }
              }
              let xMin, yMin, xMax, yMax;
              if (crds.length) {
                xMin = yMin = Infinity;
                xMax = yMax = -Infinity;
                for (let i3 = 0, len = crds.length; i3 < len; i3 += 2) {
                  let x = crds[i3];
                  let y = crds[i3 + 1];
                  if (x < xMin) xMin = x;
                  if (y < yMin) yMin = y;
                  if (x > xMax) xMax = x;
                  if (y > yMax) yMax = y;
                }
              } else {
                xMin = xMax = yMin = yMax = 0;
              }
              glyphObj = glyphMap[glyphId] = {
                index: glyphId,
                advanceWidth: typrFont.hmtx.aWidth[glyphId],
                xMin,
                yMin,
                xMax,
                yMax,
                path
              };
            }
            callback.call(
              null,
              glyphObj,
              penX + positions[i2 * 3] * fontScale,
              positions[i2 * 3 + 1] * fontScale,
              charIndex
            );
            penX += positions[i2 * 3 + 2] * fontScale;
            if (letterSpacing) {
              penX += letterSpacing * fontSize;
            }
          }
          charIndex += text.codePointAt(charIndex) > 65535 ? 2 : 1;
        });
        return penX;
      }
    };
    return fontObj;
  }
  return function parse2(buffer2) {
    const peek = new Uint8Array(buffer2, 0, 4);
    const tag = Typr._bin.readASCII(peek, 0, 4);
    if (tag === "wOFF") {
      buffer2 = woff2otf(buffer2);
    } else if (tag === "wOF2") {
      throw new Error("woff2 fonts not supported");
    }
    return wrapFontObj(Typr.parse(buffer2)[0]);
  };
}
var workerModule = defineWorkerModule({
  name: "Typr Font Parser",
  dependencies: [typrFactory, woff2otfFactory, parserFactory],
  init(typrFactory2, woff2otfFactory2, parserFactory2) {
    const Typr = typrFactory2();
    const woff2otf = woff2otfFactory2();
    return parserFactory2(Typr, woff2otf);
  }
});
function unicodeFontResolverClientFactory() {
  return (function(t2) {
    var n2 = function() {
      this.buckets = /* @__PURE__ */ new Map();
    };
    n2.prototype.add = function(t3) {
      var n3 = t3 >> 5;
      this.buckets.set(n3, (this.buckets.get(n3) || 0) | 1 << (31 & t3));
    }, n2.prototype.has = function(t3) {
      var n3 = this.buckets.get(t3 >> 5);
      return void 0 !== n3 && 0 != (n3 & 1 << (31 & t3));
    }, n2.prototype.serialize = function() {
      var t3 = [];
      return this.buckets.forEach((function(n3, r3) {
        t3.push((+r3).toString(36) + ":" + n3.toString(36));
      })), t3.join(",");
    }, n2.prototype.deserialize = function(t3) {
      var n3 = this;
      this.buckets.clear(), t3.split(",").forEach((function(t4) {
        var r3 = t4.split(":");
        n3.buckets.set(parseInt(r3[0], 36), parseInt(r3[1], 36));
      }));
    };
    var r2 = Math.pow(2, 8), e2 = r2 - 1, o2 = ~e2;
    function a5(t3) {
      var n3 = (function(t4) {
        return t4 & o2;
      })(t3).toString(16), e3 = (function(t4) {
        return (t4 & o2) + r2 - 1;
      })(t3).toString(16);
      return "codepoint-index/plane" + (t3 >> 16) + "/" + n3 + "-" + e3 + ".json";
    }
    function i2(t3, n3) {
      var r3 = t3 & e2, o3 = n3.codePointAt(r3 / 6 | 0);
      return 0 != ((o3 = (o3 || 48) - 48) & 1 << r3 % 6);
    }
    function u(t3, n3) {
      var r3;
      (r3 = t3, r3.replace(/U\+/gi, "").replace(/^,+|,+$/g, "").split(/,+/).map((function(t4) {
        return t4.split("-").map((function(t5) {
          return parseInt(t5.trim(), 16);
        }));
      }))).forEach((function(t4) {
        var r4 = t4[0], e3 = t4[1];
        void 0 === e3 && (e3 = r4), n3(r4, e3);
      }));
    }
    function c2(t3, n3) {
      u(t3, (function(t4, r3) {
        for (var e3 = t4; e3 <= r3; e3++) n3(e3);
      }));
    }
    var s2 = {}, f2 = {}, l2 = /* @__PURE__ */ new WeakMap(), v = "https://cdn.jsdelivr.net/gh/lojjic/unicode-font-resolver@v1.0.1/packages/data";
    function d2(t3) {
      var r3 = l2.get(t3);
      return r3 || (r3 = new n2(), c2(t3.ranges, (function(t4) {
        return r3.add(t4);
      })), l2.set(t3, r3)), r3;
    }
    var h, p2 = /* @__PURE__ */ new Map();
    function g(t3, n3, r3) {
      return t3[n3] ? n3 : t3[r3] ? r3 : (function(t4) {
        for (var n4 in t4) return n4;
      })(t3);
    }
    function w(t3, n3) {
      var r3 = n3;
      if (!t3.includes(r3)) {
        r3 = 1 / 0;
        for (var e3 = 0; e3 < t3.length; e3++) Math.abs(t3[e3] - n3) < Math.abs(r3 - n3) && (r3 = t3[e3]);
      }
      return r3;
    }
    function k(t3) {
      return h || (h = /* @__PURE__ */ new Set(), c2("9-D,20,85,A0,1680,2000-200A,2028-202F,205F,3000", (function(t4) {
        h.add(t4);
      }))), h.has(t3);
    }
    return t2.CodePointSet = n2, t2.clearCache = function() {
      s2 = {}, f2 = {};
    }, t2.getFontsForString = function(t3, n3) {
      void 0 === n3 && (n3 = {});
      var r3, e3 = n3.lang;
      void 0 === e3 && (e3 = new RegExp("\\p{Script=Hangul}", "u").test(r3 = t3) ? "ko" : new RegExp("\\p{Script=Hiragana}|\\p{Script=Katakana}", "u").test(r3) ? "ja" : "en");
      var o3 = n3.category;
      void 0 === o3 && (o3 = "sans-serif");
      var u2 = n3.style;
      void 0 === u2 && (u2 = "normal");
      var c5 = n3.weight;
      void 0 === c5 && (c5 = 400);
      var l3 = (n3.dataUrl || v).replace(/\/$/g, ""), h2 = /* @__PURE__ */ new Map(), y = new Uint8Array(t3.length), b = {}, m = {}, A = new Array(t3.length), S = /* @__PURE__ */ new Map(), j = false;
      function M(t4) {
        var n4 = p2.get(t4);
        return n4 || (n4 = fetch(l3 + "/" + t4).then((function(t5) {
          if (!t5.ok) throw new Error(t5.statusText);
          return t5.json().then((function(t6) {
            if (!Array.isArray(t6) || 1 !== t6[0]) throw new Error("Incorrect schema version; need 1, got " + t6[0]);
            return t6[1];
          }));
        })).catch((function(n5) {
          if (l3 !== v) return j || (console.error('unicode-font-resolver: Failed loading from dataUrl "' + l3 + '", trying default CDN. ' + n5.message), j = true), l3 = v, p2.delete(t4), M(t4);
          throw n5;
        })), p2.set(t4, n4)), n4;
      }
      for (var P = function(n4) {
        var r4 = t3.codePointAt(n4), e4 = a5(r4);
        A[n4] = e4, s2[e4] || S.has(e4) || S.set(e4, M(e4).then((function(t4) {
          s2[e4] = t4;
        }))), r4 > 65535 && (n4++, E = n4);
      }, E = 0; E < t3.length; E++) P(E);
      return Promise.all(S.values()).then((function() {
        S.clear();
        for (var n4 = function(n5) {
          var o4 = t3.codePointAt(n5), a6 = null, u3 = s2[A[n5]], c6 = void 0;
          for (var l4 in u3) {
            var v2 = m[l4];
            if (void 0 === v2 && (v2 = m[l4] = new RegExp(l4).test(e3 || "en")), v2) {
              for (var d3 in c6 = l4, u3[l4]) if (i2(o4, u3[l4][d3])) {
                a6 = d3;
                break;
              }
              break;
            }
          }
          if (!a6) {
            t: for (var h3 in u3) if (h3 !== c6) {
              for (var p3 in u3[h3]) if (i2(o4, u3[h3][p3])) {
                a6 = p3;
                break t;
              }
            }
          }
          a6 || (console.debug("No font coverage for U+" + o4.toString(16)), a6 = "latin"), A[n5] = a6, f2[a6] || S.has(a6) || S.set(a6, M("font-meta/" + a6 + ".json").then((function(t4) {
            f2[a6] = t4;
          }))), o4 > 65535 && (n5++, r4 = n5);
        }, r4 = 0; r4 < t3.length; r4++) n4(r4);
        return Promise.all(S.values());
      })).then((function() {
        for (var n4, r4 = null, e4 = 0; e4 < t3.length; e4++) {
          var a6 = t3.codePointAt(e4);
          if (r4 && (k(a6) || d2(r4).has(a6))) y[e4] = y[e4 - 1];
          else {
            r4 = f2[A[e4]];
            var i3 = b[r4.id];
            if (!i3) {
              var s3 = r4.typeforms, v2 = g(s3, o3, "sans-serif"), p3 = g(s3[v2], u2, "normal"), m2 = w(null === (n4 = s3[v2]) || void 0 === n4 ? void 0 : n4[p3], c5);
              i3 = b[r4.id] = l3 + "/font-files/" + r4.id + "/" + v2 + "." + p3 + "." + m2 + ".woff";
            }
            var S2 = h2.get(i3);
            null == S2 && (S2 = h2.size, h2.set(i3, S2)), y[e4] = S2;
          }
          a6 > 65535 && (e4++, y[e4] = y[e4 - 1]);
        }
        return { fontUrls: Array.from(h2.keys()), chars: y };
      }));
    }, Object.defineProperty(t2, "__esModule", { value: true }), t2;
  })({});
}
function createFontResolver(fontParser, unicodeFontResolverClient) {
  const parsedFonts = /* @__PURE__ */ Object.create(null);
  const loadingFonts = /* @__PURE__ */ Object.create(null);
  function doLoadFont(url, callback) {
    const onError = (err) => {
      console.error(`Failure loading font ${url}`, err);
    };
    try {
      const request = new XMLHttpRequest();
      request.open("get", url, true);
      request.responseType = "arraybuffer";
      request.onload = function() {
        if (request.status >= 400) {
          onError(new Error(request.statusText));
        } else if (request.status > 0) {
          try {
            const fontObj = fontParser(request.response);
            fontObj.src = url;
            callback(fontObj);
          } catch (e2) {
            onError(e2);
          }
        }
      };
      request.onerror = onError;
      request.send();
    } catch (err) {
      onError(err);
    }
  }
  function loadFont(fontUrl, callback) {
    let font = parsedFonts[fontUrl];
    if (font) {
      callback(font);
    } else if (loadingFonts[fontUrl]) {
      loadingFonts[fontUrl].push(callback);
    } else {
      loadingFonts[fontUrl] = [callback];
      doLoadFont(fontUrl, (fontObj) => {
        fontObj.src = fontUrl;
        parsedFonts[fontUrl] = fontObj;
        loadingFonts[fontUrl].forEach((cb) => cb(fontObj));
        delete loadingFonts[fontUrl];
      });
    }
  }
  return function(text, callback, {
    lang,
    fonts: userFonts = [],
    style = "normal",
    weight = "normal",
    unicodeFontsURL
  } = {}) {
    const charResolutions = new Uint8Array(text.length);
    const fontResolutions = [];
    if (!text.length) {
      allDone();
    }
    const fontIndices = /* @__PURE__ */ new Map();
    const fallbackRanges = [];
    if (style !== "italic") style = "normal";
    if (typeof weight !== "number") {
      weight = weight === "bold" ? 700 : 400;
    }
    if (userFonts && !Array.isArray(userFonts)) {
      userFonts = [userFonts];
    }
    userFonts = userFonts.slice().filter((def) => !def.lang || def.lang.test(lang)).reverse();
    if (userFonts.length) {
      const UNKNOWN = 0;
      const RESOLVED = 1;
      const NEEDS_FALLBACK = 2;
      let prevCharResult = UNKNOWN;
      (function resolveUserFonts(startIndex = 0) {
        for (let i2 = startIndex, iLen = text.length; i2 < iLen; i2++) {
          const codePoint = text.codePointAt(i2);
          if (prevCharResult === RESOLVED && fontResolutions[charResolutions[i2 - 1]].supportsCodePoint(codePoint) || i2 > 0 && /\s/.test(text[i2])) {
            charResolutions[i2] = charResolutions[i2 - 1];
            if (prevCharResult === NEEDS_FALLBACK) {
              fallbackRanges[fallbackRanges.length - 1][1] = i2;
            }
          } else {
            for (let j = charResolutions[i2], jLen = userFonts.length; j <= jLen; j++) {
              if (j === jLen) {
                const range = prevCharResult === NEEDS_FALLBACK ? fallbackRanges[fallbackRanges.length - 1] : fallbackRanges[fallbackRanges.length] = [i2, i2];
                range[1] = i2;
                prevCharResult = NEEDS_FALLBACK;
              } else {
                charResolutions[i2] = j;
                const { src, unicodeRange } = userFonts[j];
                if (!unicodeRange || isCodeInRanges(codePoint, unicodeRange)) {
                  const fontObj = parsedFonts[src];
                  if (!fontObj) {
                    loadFont(src, () => {
                      resolveUserFonts(i2);
                    });
                    return;
                  }
                  if (fontObj.supportsCodePoint(codePoint)) {
                    let fontIndex = fontIndices.get(fontObj);
                    if (typeof fontIndex !== "number") {
                      fontIndex = fontResolutions.length;
                      fontResolutions.push(fontObj);
                      fontIndices.set(fontObj, fontIndex);
                    }
                    charResolutions[i2] = fontIndex;
                    prevCharResult = RESOLVED;
                    break;
                  }
                }
              }
            }
          }
          if (codePoint > 65535 && i2 + 1 < iLen) {
            charResolutions[i2 + 1] = charResolutions[i2];
            i2++;
            if (prevCharResult === NEEDS_FALLBACK) {
              fallbackRanges[fallbackRanges.length - 1][1] = i2;
            }
          }
        }
        resolveFallbacks();
      })();
    } else {
      fallbackRanges.push([0, text.length - 1]);
      resolveFallbacks();
    }
    function resolveFallbacks() {
      if (fallbackRanges.length) {
        const fallbackString = fallbackRanges.map((range) => text.substring(range[0], range[1] + 1)).join("\n");
        unicodeFontResolverClient.getFontsForString(fallbackString, {
          lang: lang || void 0,
          style,
          weight,
          dataUrl: unicodeFontsURL
        }).then(({ fontUrls, chars }) => {
          const fontIndexOffset = fontResolutions.length;
          let charIdx = 0;
          fallbackRanges.forEach((range) => {
            for (let i2 = 0, endIdx = range[1] - range[0]; i2 <= endIdx; i2++) {
              charResolutions[range[0] + i2] = chars[charIdx++] + fontIndexOffset;
            }
            charIdx++;
          });
          let loadedCount = 0;
          fontUrls.forEach((url, i2) => {
            loadFont(url, (fontObj) => {
              fontResolutions[i2 + fontIndexOffset] = fontObj;
              if (++loadedCount === fontUrls.length) {
                allDone();
              }
            });
          });
        });
      } else {
        allDone();
      }
    }
    function allDone() {
      callback({
        chars: charResolutions,
        fonts: fontResolutions
      });
    }
    function isCodeInRanges(code, ranges) {
      for (let k = 0; k < ranges.length; k++) {
        const [start, end = start] = ranges[k];
        if (start <= code && code <= end) {
          return true;
        }
      }
      return false;
    }
  };
}
var fontResolverWorkerModule = defineWorkerModule({
  name: "FontResolver",
  dependencies: [
    createFontResolver,
    workerModule,
    unicodeFontResolverClientFactory
  ],
  init(createFontResolver2, fontParser, unicodeFontResolverClientFactory2) {
    return createFontResolver2(fontParser, unicodeFontResolverClientFactory2());
  }
});
function createTypesetter(resolveFonts, bidi) {
  const INF = Infinity;
  const DEFAULT_IGNORABLE_CHARS = /[\u00AD\u034F\u061C\u115F-\u1160\u17B4-\u17B5\u180B-\u180E\u200B-\u200F\u202A-\u202E\u2060-\u206F\u3164\uFE00-\uFE0F\uFEFF\uFFA0\uFFF0-\uFFF8]/;
  const lineBreakingWhiteSpace = `[^\\S\\u00A0]`;
  const BREAK_AFTER_CHARS = new RegExp(`${lineBreakingWhiteSpace}|[\\-\\u007C\\u00AD\\u2010\\u2012-\\u2014\\u2027\\u2056\\u2E17\\u2E40]`);
  function calculateFontRuns({ text, lang, fonts, style, weight, preResolvedFonts, unicodeFontsURL }, onDone) {
    const onResolved = ({ chars, fonts: parsedFonts }) => {
      let curRun, prevVal;
      const runs = [];
      for (let i2 = 0; i2 < chars.length; i2++) {
        if (chars[i2] !== prevVal) {
          prevVal = chars[i2];
          runs.push(curRun = { start: i2, end: i2, fontObj: parsedFonts[chars[i2]] });
        } else {
          curRun.end = i2;
        }
      }
      onDone(runs);
    };
    if (preResolvedFonts) {
      onResolved(preResolvedFonts);
    } else {
      resolveFonts(
        text,
        onResolved,
        { lang, fonts, style, weight, unicodeFontsURL }
      );
    }
  }
  function typeset({
    text = "",
    font,
    lang,
    sdfGlyphSize = 64,
    fontSize = 400,
    fontWeight = 1,
    fontStyle = "normal",
    letterSpacing = 0,
    lineHeight = "normal",
    maxWidth = INF,
    direction,
    textAlign = "left",
    textIndent = 0,
    whiteSpace = "normal",
    overflowWrap = "normal",
    anchorX = 0,
    anchorY = 0,
    metricsOnly = false,
    unicodeFontsURL,
    preResolvedFonts = null,
    includeCaretPositions = false,
    chunkedBoundsSize = 8192,
    colorRanges = null
  }, callback) {
    const mainStart = now2();
    const timings = { fontLoad: 0, typesetting: 0 };
    if (text.indexOf("\r") > -1) {
      console.info("Typesetter: got text with \\r chars; normalizing to \\n");
      text = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
    }
    fontSize = +fontSize;
    letterSpacing = +letterSpacing;
    maxWidth = +maxWidth;
    lineHeight = lineHeight || "normal";
    textIndent = +textIndent;
    calculateFontRuns({
      text,
      lang,
      style: fontStyle,
      weight: fontWeight,
      fonts: typeof font === "string" ? [{ src: font }] : font,
      unicodeFontsURL,
      preResolvedFonts
    }, (runs) => {
      timings.fontLoad = now2() - mainStart;
      const hasMaxWidth = isFinite(maxWidth);
      let glyphIds = null;
      let glyphFontIndices = null;
      let glyphPositions = null;
      let glyphData = null;
      let glyphColors = null;
      let caretPositions = null;
      let visibleBounds = null;
      let chunkedBounds = null;
      let maxLineWidth = 0;
      let renderableGlyphCount = 0;
      let canWrap = whiteSpace !== "nowrap";
      const metricsByFont = /* @__PURE__ */ new Map();
      const typesetStart = now2();
      let lineXOffset = textIndent;
      let prevRunEndX = 0;
      let currentLine = new TextLine();
      const lines = [currentLine];
      runs.forEach((run) => {
        const { fontObj } = run;
        const { ascender, descender, unitsPerEm, lineGap, capHeight, xHeight } = fontObj;
        let fontData2 = metricsByFont.get(fontObj);
        if (!fontData2) {
          const fontSizeMult2 = fontSize / unitsPerEm;
          const calcLineHeight = lineHeight === "normal" ? (ascender - descender + lineGap) * fontSizeMult2 : lineHeight * fontSize;
          const halfLeading = (calcLineHeight - (ascender - descender) * fontSizeMult2) / 2;
          const caretHeight = Math.min(calcLineHeight, (ascender - descender) * fontSizeMult2);
          const caretTop = (ascender + descender) / 2 * fontSizeMult2 + caretHeight / 2;
          fontData2 = {
            index: metricsByFont.size,
            src: fontObj.src,
            fontObj,
            fontSizeMult: fontSizeMult2,
            unitsPerEm,
            ascender: ascender * fontSizeMult2,
            descender: descender * fontSizeMult2,
            capHeight: capHeight * fontSizeMult2,
            xHeight: xHeight * fontSizeMult2,
            lineHeight: calcLineHeight,
            baseline: -halfLeading - ascender * fontSizeMult2,
            // baseline offset from top of line height
            // cap: -halfLeading - capHeight * fontSizeMult, // cap from top of line height
            // ex: -halfLeading - xHeight * fontSizeMult, // ex from top of line height
            caretTop,
            caretBottom: caretTop - caretHeight
          };
          metricsByFont.set(fontObj, fontData2);
        }
        const { fontSizeMult } = fontData2;
        const runText = text.slice(run.start, run.end + 1);
        let prevGlyphX, prevGlyphObj;
        fontObj.forEachGlyph(runText, fontSize, letterSpacing, (glyphObj, glyphX, glyphY, charIndex) => {
          glyphX += prevRunEndX;
          charIndex += run.start;
          prevGlyphX = glyphX;
          prevGlyphObj = glyphObj;
          const char = text.charAt(charIndex);
          const glyphWidth = glyphObj.advanceWidth * fontSizeMult;
          const curLineCount = currentLine.count;
          let nextLine;
          if (!("isEmpty" in glyphObj)) {
            glyphObj.isWhitespace = !!char && new RegExp(lineBreakingWhiteSpace).test(char);
            glyphObj.canBreakAfter = !!char && BREAK_AFTER_CHARS.test(char);
            glyphObj.isEmpty = glyphObj.xMin === glyphObj.xMax || glyphObj.yMin === glyphObj.yMax || DEFAULT_IGNORABLE_CHARS.test(char);
          }
          if (!glyphObj.isWhitespace && !glyphObj.isEmpty) {
            renderableGlyphCount++;
          }
          if (canWrap && hasMaxWidth && !glyphObj.isWhitespace && glyphX + glyphWidth + lineXOffset > maxWidth && curLineCount) {
            if (currentLine.glyphAt(curLineCount - 1).glyphObj.canBreakAfter) {
              nextLine = new TextLine();
              lineXOffset = -glyphX;
            } else {
              for (let i2 = curLineCount; i2--; ) {
                if (i2 === 0 && overflowWrap === "break-word") {
                  nextLine = new TextLine();
                  lineXOffset = -glyphX;
                  break;
                } else if (currentLine.glyphAt(i2).glyphObj.canBreakAfter) {
                  nextLine = currentLine.splitAt(i2 + 1);
                  const adjustX = nextLine.glyphAt(0).x;
                  lineXOffset -= adjustX;
                  for (let j = nextLine.count; j--; ) {
                    nextLine.glyphAt(j).x -= adjustX;
                  }
                  break;
                }
              }
            }
            if (nextLine) {
              currentLine.isSoftWrapped = true;
              currentLine = nextLine;
              lines.push(currentLine);
              maxLineWidth = maxWidth;
            }
          }
          let fly = currentLine.glyphAt(currentLine.count);
          fly.glyphObj = glyphObj;
          fly.x = glyphX + lineXOffset;
          fly.y = glyphY;
          fly.width = glyphWidth;
          fly.charIndex = charIndex;
          fly.fontData = fontData2;
          if (char === "\n") {
            currentLine = new TextLine();
            lines.push(currentLine);
            lineXOffset = -(glyphX + glyphWidth + letterSpacing * fontSize) + textIndent;
          }
        });
        prevRunEndX = prevGlyphX + prevGlyphObj.advanceWidth * fontSizeMult + letterSpacing * fontSize;
      });
      let totalHeight = 0;
      lines.forEach((line) => {
        let isTrailingWhitespace = true;
        for (let i2 = line.count; i2--; ) {
          const glyphInfo = line.glyphAt(i2);
          if (isTrailingWhitespace && !glyphInfo.glyphObj.isWhitespace) {
            line.width = glyphInfo.x + glyphInfo.width;
            if (line.width > maxLineWidth) {
              maxLineWidth = line.width;
            }
            isTrailingWhitespace = false;
          }
          let { lineHeight: lineHeight2, capHeight, xHeight, baseline } = glyphInfo.fontData;
          if (lineHeight2 > line.lineHeight) line.lineHeight = lineHeight2;
          const baselineDiff = baseline - line.baseline;
          if (baselineDiff < 0) {
            line.baseline += baselineDiff;
            line.cap += baselineDiff;
            line.ex += baselineDiff;
          }
          line.cap = Math.max(line.cap, line.baseline + capHeight);
          line.ex = Math.max(line.ex, line.baseline + xHeight);
        }
        line.baseline -= totalHeight;
        line.cap -= totalHeight;
        line.ex -= totalHeight;
        totalHeight += line.lineHeight;
      });
      let anchorXOffset = 0;
      let anchorYOffset = 0;
      if (anchorX) {
        if (typeof anchorX === "number") {
          anchorXOffset = -anchorX;
        } else if (typeof anchorX === "string") {
          anchorXOffset = -maxLineWidth * (anchorX === "left" ? 0 : anchorX === "center" ? 0.5 : anchorX === "right" ? 1 : parsePercent(anchorX));
        }
      }
      if (anchorY) {
        if (typeof anchorY === "number") {
          anchorYOffset = -anchorY;
        } else if (typeof anchorY === "string") {
          anchorYOffset = anchorY === "top" ? 0 : anchorY === "top-baseline" ? -lines[0].baseline : anchorY === "top-cap" ? -lines[0].cap : anchorY === "top-ex" ? -lines[0].ex : anchorY === "middle" ? totalHeight / 2 : anchorY === "bottom" ? totalHeight : anchorY === "bottom-baseline" ? -lines[lines.length - 1].baseline : parsePercent(anchorY) * totalHeight;
        }
      }
      if (!metricsOnly) {
        const bidiLevelsResult = bidi.getEmbeddingLevels(text, direction);
        glyphIds = new Uint16Array(renderableGlyphCount);
        glyphFontIndices = new Uint8Array(renderableGlyphCount);
        glyphPositions = new Float32Array(renderableGlyphCount * 2);
        glyphData = {};
        visibleBounds = [INF, INF, -INF, -INF];
        chunkedBounds = [];
        if (includeCaretPositions) {
          caretPositions = new Float32Array(text.length * 4);
        }
        if (colorRanges) {
          glyphColors = new Uint8Array(renderableGlyphCount * 3);
        }
        let renderableGlyphIndex = 0;
        let prevCharIndex = -1;
        let colorCharIndex = -1;
        let chunk;
        let currentColor;
        lines.forEach((line, lineIndex) => {
          let { count: lineGlyphCount, width: lineWidth } = line;
          if (lineGlyphCount > 0) {
            let trailingWhitespaceCount = 0;
            for (let i2 = lineGlyphCount; i2-- && line.glyphAt(i2).glyphObj.isWhitespace; ) {
              trailingWhitespaceCount++;
            }
            let lineXOffset2 = 0;
            let justifyAdjust = 0;
            if (textAlign === "center") {
              lineXOffset2 = (maxLineWidth - lineWidth) / 2;
            } else if (textAlign === "right") {
              lineXOffset2 = maxLineWidth - lineWidth;
            } else if (textAlign === "justify" && line.isSoftWrapped) {
              let whitespaceCount = 0;
              for (let i2 = lineGlyphCount - trailingWhitespaceCount; i2--; ) {
                if (line.glyphAt(i2).glyphObj.isWhitespace) {
                  whitespaceCount++;
                }
              }
              justifyAdjust = (maxLineWidth - lineWidth) / whitespaceCount;
            }
            if (justifyAdjust || lineXOffset2) {
              let justifyOffset = 0;
              for (let i2 = 0; i2 < lineGlyphCount; i2++) {
                let glyphInfo = line.glyphAt(i2);
                const glyphObj2 = glyphInfo.glyphObj;
                glyphInfo.x += lineXOffset2 + justifyOffset;
                if (justifyAdjust !== 0 && glyphObj2.isWhitespace && i2 < lineGlyphCount - trailingWhitespaceCount) {
                  justifyOffset += justifyAdjust;
                  glyphInfo.width += justifyAdjust;
                }
              }
            }
            const flips = bidi.getReorderSegments(
              text,
              bidiLevelsResult,
              line.glyphAt(0).charIndex,
              line.glyphAt(line.count - 1).charIndex
            );
            for (let fi = 0; fi < flips.length; fi++) {
              const [start, end] = flips[fi];
              let left = Infinity, right = -Infinity;
              for (let i2 = 0; i2 < lineGlyphCount; i2++) {
                if (line.glyphAt(i2).charIndex >= start) {
                  let startInLine = i2, endInLine = i2;
                  for (; endInLine < lineGlyphCount; endInLine++) {
                    let info = line.glyphAt(endInLine);
                    if (info.charIndex > end) {
                      break;
                    }
                    if (endInLine < lineGlyphCount - trailingWhitespaceCount) {
                      left = Math.min(left, info.x);
                      right = Math.max(right, info.x + info.width);
                    }
                  }
                  for (let j = startInLine; j < endInLine; j++) {
                    const glyphInfo = line.glyphAt(j);
                    glyphInfo.x = right - (glyphInfo.x + glyphInfo.width - left);
                  }
                  break;
                }
              }
            }
            let glyphObj;
            const setGlyphObj = (g) => glyphObj = g;
            for (let i2 = 0; i2 < lineGlyphCount; i2++) {
              const glyphInfo = line.glyphAt(i2);
              glyphObj = glyphInfo.glyphObj;
              const glyphId = glyphObj.index;
              const rtl = bidiLevelsResult.levels[glyphInfo.charIndex] & 1;
              if (rtl) {
                const mirrored = bidi.getMirroredCharacter(text[glyphInfo.charIndex]);
                if (mirrored) {
                  glyphInfo.fontData.fontObj.forEachGlyph(mirrored, 0, 0, setGlyphObj);
                }
              }
              if (includeCaretPositions) {
                const { charIndex, fontData: fontData2 } = glyphInfo;
                const caretLeft = glyphInfo.x + anchorXOffset;
                const caretRight = glyphInfo.x + glyphInfo.width + anchorXOffset;
                caretPositions[charIndex * 4] = rtl ? caretRight : caretLeft;
                caretPositions[charIndex * 4 + 1] = rtl ? caretLeft : caretRight;
                caretPositions[charIndex * 4 + 2] = line.baseline + fontData2.caretBottom + anchorYOffset;
                caretPositions[charIndex * 4 + 3] = line.baseline + fontData2.caretTop + anchorYOffset;
                const ligCount = charIndex - prevCharIndex;
                if (ligCount > 1) {
                  fillLigatureCaretPositions(caretPositions, prevCharIndex, ligCount);
                }
                prevCharIndex = charIndex;
              }
              if (colorRanges) {
                const { charIndex } = glyphInfo;
                while (charIndex > colorCharIndex) {
                  colorCharIndex++;
                  if (colorRanges.hasOwnProperty(colorCharIndex)) {
                    currentColor = colorRanges[colorCharIndex];
                  }
                }
              }
              if (!glyphObj.isWhitespace && !glyphObj.isEmpty) {
                const idx = renderableGlyphIndex++;
                const { fontSizeMult, src: fontSrc, index: fontIndex } = glyphInfo.fontData;
                const fontGlyphData = glyphData[fontSrc] || (glyphData[fontSrc] = {});
                if (!fontGlyphData[glyphId]) {
                  fontGlyphData[glyphId] = {
                    path: glyphObj.path,
                    pathBounds: [glyphObj.xMin, glyphObj.yMin, glyphObj.xMax, glyphObj.yMax]
                  };
                }
                const glyphX = glyphInfo.x + anchorXOffset;
                const glyphY = glyphInfo.y + line.baseline + anchorYOffset;
                glyphPositions[idx * 2] = glyphX;
                glyphPositions[idx * 2 + 1] = glyphY;
                const visX0 = glyphX + glyphObj.xMin * fontSizeMult;
                const visY0 = glyphY + glyphObj.yMin * fontSizeMult;
                const visX1 = glyphX + glyphObj.xMax * fontSizeMult;
                const visY1 = glyphY + glyphObj.yMax * fontSizeMult;
                if (visX0 < visibleBounds[0]) visibleBounds[0] = visX0;
                if (visY0 < visibleBounds[1]) visibleBounds[1] = visY0;
                if (visX1 > visibleBounds[2]) visibleBounds[2] = visX1;
                if (visY1 > visibleBounds[3]) visibleBounds[3] = visY1;
                if (idx % chunkedBoundsSize === 0) {
                  chunk = { start: idx, end: idx, rect: [INF, INF, -INF, -INF] };
                  chunkedBounds.push(chunk);
                }
                chunk.end++;
                const chunkRect = chunk.rect;
                if (visX0 < chunkRect[0]) chunkRect[0] = visX0;
                if (visY0 < chunkRect[1]) chunkRect[1] = visY0;
                if (visX1 > chunkRect[2]) chunkRect[2] = visX1;
                if (visY1 > chunkRect[3]) chunkRect[3] = visY1;
                glyphIds[idx] = glyphId;
                glyphFontIndices[idx] = fontIndex;
                if (colorRanges) {
                  const start = idx * 3;
                  glyphColors[start] = currentColor >> 16 & 255;
                  glyphColors[start + 1] = currentColor >> 8 & 255;
                  glyphColors[start + 2] = currentColor & 255;
                }
              }
            }
          }
        });
        if (caretPositions) {
          const ligCount = text.length - prevCharIndex;
          if (ligCount > 1) {
            fillLigatureCaretPositions(caretPositions, prevCharIndex, ligCount);
          }
        }
      }
      const fontData = [];
      metricsByFont.forEach(({ index: index2, src, unitsPerEm, ascender, descender, lineHeight: lineHeight2, capHeight, xHeight }) => {
        fontData[index2] = { src, unitsPerEm, ascender, descender, lineHeight: lineHeight2, capHeight, xHeight };
      });
      timings.typesetting = now2() - typesetStart;
      callback({
        glyphIds,
        //id for each glyph, specific to that glyph's font
        glyphFontIndices,
        //index into fontData for each glyph
        glyphPositions,
        //x,y of each glyph's origin in layout
        glyphData,
        //dict holding data about each glyph appearing in the text
        fontData,
        //data about each font used in the text
        caretPositions,
        //startX,endX,bottomY caret positions for each char
        // caretHeight, //height of cursor from bottom to top - todo per glyph?
        glyphColors,
        //color for each glyph, if color ranges supplied
        chunkedBounds,
        //total rects per (n=chunkedBoundsSize) consecutive glyphs
        fontSize,
        //calculated em height
        topBaseline: anchorYOffset + lines[0].baseline,
        //y coordinate of the top line's baseline
        blockBounds: [
          //bounds for the whole block of text, including vertical padding for lineHeight
          anchorXOffset,
          anchorYOffset - totalHeight,
          anchorXOffset + maxLineWidth,
          anchorYOffset
        ],
        visibleBounds,
        //total bounds of visible text paths, may be larger or smaller than blockBounds
        timings
      });
    });
  }
  function measure(args, callback) {
    typeset({ ...args, metricsOnly: true }, (result) => {
      const [x0, y0, x1, y1] = result.blockBounds;
      callback({
        width: x1 - x0,
        height: y1 - y0
      });
    });
  }
  function parsePercent(str) {
    let match = str.match(/^([\d.]+)%$/);
    let pct = match ? parseFloat(match[1]) : NaN;
    return isNaN(pct) ? 0 : pct / 100;
  }
  function fillLigatureCaretPositions(caretPositions, ligStartIndex, ligCount) {
    const ligStartX = caretPositions[ligStartIndex * 4];
    const ligEndX = caretPositions[ligStartIndex * 4 + 1];
    const ligBottom = caretPositions[ligStartIndex * 4 + 2];
    const ligTop = caretPositions[ligStartIndex * 4 + 3];
    const guessedAdvanceX = (ligEndX - ligStartX) / ligCount;
    for (let i2 = 0; i2 < ligCount; i2++) {
      const startIndex = (ligStartIndex + i2) * 4;
      caretPositions[startIndex] = ligStartX + guessedAdvanceX * i2;
      caretPositions[startIndex + 1] = ligStartX + guessedAdvanceX * (i2 + 1);
      caretPositions[startIndex + 2] = ligBottom;
      caretPositions[startIndex + 3] = ligTop;
    }
  }
  function now2() {
    return (self.performance || Date).now();
  }
  function TextLine() {
    this.data = [];
  }
  const textLineProps = ["glyphObj", "x", "y", "width", "charIndex", "fontData"];
  TextLine.prototype = {
    width: 0,
    lineHeight: 0,
    baseline: 0,
    cap: 0,
    ex: 0,
    isSoftWrapped: false,
    get count() {
      return Math.ceil(this.data.length / textLineProps.length);
    },
    glyphAt(i2) {
      let fly = TextLine.flyweight;
      fly.data = this.data;
      fly.index = i2;
      return fly;
    },
    splitAt(i2) {
      let newLine = new TextLine();
      newLine.data = this.data.splice(i2 * textLineProps.length);
      return newLine;
    }
  };
  TextLine.flyweight = textLineProps.reduce((obj, prop, i2, all) => {
    Object.defineProperty(obj, prop, {
      get() {
        return this.data[this.index * textLineProps.length + i2];
      },
      set(val) {
        this.data[this.index * textLineProps.length + i2] = val;
      }
    });
    return obj;
  }, { data: null, index: 0 });
  return {
    typeset,
    measure
  };
}
var now = () => (self.performance || Date).now();
var mainThreadGenerator = SDFGenerator();
var warned;
function generateSDF(width, height, path, viewBox, distance3, exponent, canvas, x, y, channel, useWebGL = true) {
  if (!useWebGL) {
    return generateSDF_JS_Worker(width, height, path, viewBox, distance3, exponent, canvas, x, y, channel);
  }
  return generateSDF_GL(width, height, path, viewBox, distance3, exponent, canvas, x, y, channel).then(
    null,
    (err) => {
      if (!warned) {
        console.warn(`WebGL SDF generation failed, falling back to JS`, err);
        warned = true;
      }
      return generateSDF_JS_Worker(width, height, path, viewBox, distance3, exponent, canvas, x, y, channel);
    }
  );
}
var queue = [];
var chunkTimeBudget = 5;
var timer = 0;
function nextChunk() {
  const start = now();
  while (queue.length && now() - start < chunkTimeBudget) {
    queue.shift()();
  }
  timer = queue.length ? setTimeout(nextChunk, 0) : 0;
}
var generateSDF_GL = (...args) => {
  return new Promise((resolve, reject) => {
    queue.push(() => {
      const start = now();
      try {
        mainThreadGenerator.webgl.generateIntoCanvas(...args);
        resolve({ timing: now() - start });
      } catch (err) {
        reject(err);
      }
    });
    if (!timer) {
      timer = setTimeout(nextChunk, 0);
    }
  });
};
var threadCount = 4;
var idleTimeout = 2e3;
var threads = {};
var callNum = 0;
function generateSDF_JS_Worker(width, height, path, viewBox, distance3, exponent, canvas, x, y, channel) {
  const workerId = "TroikaTextSDFGenerator_JS_" + callNum++ % threadCount;
  let thread = threads[workerId];
  if (!thread) {
    thread = threads[workerId] = {
      workerModule: defineWorkerModule({
        name: workerId,
        workerId,
        dependencies: [
          SDFGenerator,
          now
        ],
        init(_createSDFGenerator, now2) {
          const generate = _createSDFGenerator().javascript.generate;
          return function(...args) {
            const start = now2();
            const textureData = generate(...args);
            return {
              textureData,
              timing: now2() - start
            };
          };
        },
        getTransferables(result) {
          return [result.textureData.buffer];
        }
      }),
      requests: 0,
      idleTimer: null
    };
  }
  thread.requests++;
  clearTimeout(thread.idleTimer);
  return thread.workerModule(width, height, path, viewBox, distance3, exponent).then(({ textureData, timing }) => {
    const start = now();
    const imageData = new Uint8Array(textureData.length * 4);
    for (let i2 = 0; i2 < textureData.length; i2++) {
      imageData[i2 * 4 + channel] = textureData[i2];
    }
    mainThreadGenerator.webglUtils.renderImageData(canvas, imageData, x, y, width, height, 1 << 3 - channel);
    timing += now() - start;
    if (--thread.requests === 0) {
      thread.idleTimer = setTimeout(() => {
        terminateWorker(workerId);
      }, idleTimeout);
    }
    return { timing };
  });
}
function warmUpSDFCanvas(canvas) {
  if (!canvas._warm) {
    mainThreadGenerator.webgl.isSupported(canvas);
    canvas._warm = true;
  }
}
var resizeWebGLCanvasWithoutClearing = mainThreadGenerator.webglUtils.resizeWebGLCanvasWithoutClearing;
var CONFIG = {
  defaultFontURL: null,
  unicodeFontsURL: null,
  sdfGlyphSize: 64,
  sdfMargin: 1 / 16,
  sdfExponent: 9,
  textureWidth: 2048,
  useWorker: true
};
var tempColor = new Color();
var hasRequested = false;
function now$1() {
  return (self.performance || Date).now();
}
var atlases = /* @__PURE__ */ Object.create(null);
function getTextRenderInfo(args, callback) {
  hasRequested = true;
  args = assign2({}, args);
  const totalStart = now$1();
  const { defaultFontURL } = CONFIG;
  const fonts = [];
  if (defaultFontURL) {
    fonts.push({ label: "default", src: toAbsoluteURL(defaultFontURL) });
  }
  if (args.font) {
    fonts.push({ label: "user", src: toAbsoluteURL(args.font) });
  }
  args.font = fonts;
  args.text = "" + args.text;
  args.sdfGlyphSize = args.sdfGlyphSize || CONFIG.sdfGlyphSize;
  args.unicodeFontsURL = args.unicodeFontsURL || CONFIG.unicodeFontsURL;
  if (args.colorRanges != null) {
    let colors = {};
    for (let key in args.colorRanges) {
      if (args.colorRanges.hasOwnProperty(key)) {
        let val = args.colorRanges[key];
        if (typeof val !== "number") {
          val = tempColor.set(val).getHex();
        }
        colors[key] = val;
      }
    }
    args.colorRanges = colors;
  }
  Object.freeze(args);
  const { textureWidth, sdfExponent } = CONFIG;
  const { sdfGlyphSize } = args;
  const glyphsPerRow = textureWidth / sdfGlyphSize * 4;
  let atlas = atlases[sdfGlyphSize];
  if (!atlas) {
    const canvas = document.createElement("canvas");
    canvas.width = textureWidth;
    canvas.height = sdfGlyphSize * 256 / glyphsPerRow;
    atlas = atlases[sdfGlyphSize] = {
      glyphCount: 0,
      sdfGlyphSize,
      sdfCanvas: canvas,
      sdfTexture: new Texture(
        canvas,
        void 0,
        void 0,
        void 0,
        LinearFilter,
        LinearFilter
      ),
      contextLost: false,
      glyphsByFont: /* @__PURE__ */ new Map()
    };
    atlas.sdfTexture.generateMipmaps = false;
    initContextLossHandling(atlas);
  }
  const { sdfTexture, sdfCanvas } = atlas;
  const typeset = CONFIG.useWorker ? typesetInWorker : typesetOnMainThread;
  typeset(args).then((result) => {
    const { glyphIds, glyphFontIndices, fontData, glyphPositions, fontSize, timings } = result;
    const neededSDFs = [];
    const glyphBounds = new Float32Array(glyphIds.length * 4);
    let boundsIdx = 0;
    let positionsIdx = 0;
    const quadsStart = now$1();
    const fontGlyphMaps = fontData.map((font) => {
      let map2 = atlas.glyphsByFont.get(font.src);
      if (!map2) {
        atlas.glyphsByFont.set(font.src, map2 = /* @__PURE__ */ new Map());
      }
      return map2;
    });
    glyphIds.forEach((glyphId, i2) => {
      const fontIndex = glyphFontIndices[i2];
      const { src: fontSrc, unitsPerEm } = fontData[fontIndex];
      let glyphInfo = fontGlyphMaps[fontIndex].get(glyphId);
      if (!glyphInfo) {
        const { path, pathBounds } = result.glyphData[fontSrc][glyphId];
        const fontUnitsMargin = Math.max(pathBounds[2] - pathBounds[0], pathBounds[3] - pathBounds[1]) / sdfGlyphSize * (CONFIG.sdfMargin * sdfGlyphSize + 0.5);
        const atlasIndex = atlas.glyphCount++;
        const sdfViewBox2 = [
          pathBounds[0] - fontUnitsMargin,
          pathBounds[1] - fontUnitsMargin,
          pathBounds[2] + fontUnitsMargin,
          pathBounds[3] + fontUnitsMargin
        ];
        fontGlyphMaps[fontIndex].set(glyphId, glyphInfo = { path, atlasIndex, sdfViewBox: sdfViewBox2 });
        neededSDFs.push(glyphInfo);
      }
      const { sdfViewBox } = glyphInfo;
      const posX = glyphPositions[positionsIdx++];
      const posY = glyphPositions[positionsIdx++];
      const fontSizeMult = fontSize / unitsPerEm;
      glyphBounds[boundsIdx++] = posX + sdfViewBox[0] * fontSizeMult;
      glyphBounds[boundsIdx++] = posY + sdfViewBox[1] * fontSizeMult;
      glyphBounds[boundsIdx++] = posX + sdfViewBox[2] * fontSizeMult;
      glyphBounds[boundsIdx++] = posY + sdfViewBox[3] * fontSizeMult;
      glyphIds[i2] = glyphInfo.atlasIndex;
    });
    timings.quads = (timings.quads || 0) + (now$1() - quadsStart);
    const sdfStart = now$1();
    timings.sdf = {};
    const currentHeight = sdfCanvas.height;
    const neededRows = Math.ceil(atlas.glyphCount / glyphsPerRow);
    const neededHeight = Math.pow(2, Math.ceil(Math.log2(neededRows * sdfGlyphSize)));
    if (neededHeight > currentHeight) {
      console.info(`Increasing SDF texture size ${currentHeight}->${neededHeight}`);
      resizeWebGLCanvasWithoutClearing(sdfCanvas, textureWidth, neededHeight);
      sdfTexture.dispose();
    }
    Promise.all(neededSDFs.map(
      (glyphInfo) => generateGlyphSDF(glyphInfo, atlas, args.gpuAccelerateSDF).then(({ timing }) => {
        timings.sdf[glyphInfo.atlasIndex] = timing;
      })
    )).then(() => {
      if (neededSDFs.length && !atlas.contextLost) {
        safariPre15Workaround(atlas);
        sdfTexture.needsUpdate = true;
      }
      timings.sdfTotal = now$1() - sdfStart;
      timings.total = now$1() - totalStart;
      callback(Object.freeze({
        parameters: args,
        sdfTexture,
        sdfGlyphSize,
        sdfExponent,
        glyphBounds,
        glyphAtlasIndices: glyphIds,
        glyphColors: result.glyphColors,
        caretPositions: result.caretPositions,
        chunkedBounds: result.chunkedBounds,
        ascender: result.ascender,
        descender: result.descender,
        lineHeight: result.lineHeight,
        capHeight: result.capHeight,
        xHeight: result.xHeight,
        topBaseline: result.topBaseline,
        blockBounds: result.blockBounds,
        visibleBounds: result.visibleBounds,
        timings: result.timings
      }));
    });
  });
  Promise.resolve().then(() => {
    if (!atlas.contextLost) {
      warmUpSDFCanvas(sdfCanvas);
    }
  });
}
function generateGlyphSDF({ path, atlasIndex, sdfViewBox }, { sdfGlyphSize, sdfCanvas, contextLost }, useGPU) {
  if (contextLost) {
    return Promise.resolve({ timing: -1 });
  }
  const { textureWidth, sdfExponent } = CONFIG;
  const maxDist = Math.max(sdfViewBox[2] - sdfViewBox[0], sdfViewBox[3] - sdfViewBox[1]);
  const squareIndex = Math.floor(atlasIndex / 4);
  const x = squareIndex % (textureWidth / sdfGlyphSize) * sdfGlyphSize;
  const y = Math.floor(squareIndex / (textureWidth / sdfGlyphSize)) * sdfGlyphSize;
  const channel = atlasIndex % 4;
  return generateSDF(sdfGlyphSize, sdfGlyphSize, path, sdfViewBox, maxDist, sdfExponent, sdfCanvas, x, y, channel, useGPU);
}
function initContextLossHandling(atlas) {
  const canvas = atlas.sdfCanvas;
  canvas.addEventListener("webglcontextlost", (event) => {
    console.log("Context Lost", event);
    event.preventDefault();
    atlas.contextLost = true;
  });
  canvas.addEventListener("webglcontextrestored", (event) => {
    console.log("Context Restored", event);
    atlas.contextLost = false;
    const promises = [];
    atlas.glyphsByFont.forEach((glyphMap) => {
      glyphMap.forEach((glyph) => {
        promises.push(generateGlyphSDF(glyph, atlas, true));
      });
    });
    Promise.all(promises).then(() => {
      safariPre15Workaround(atlas);
      atlas.sdfTexture.needsUpdate = true;
    });
  });
}
function preloadFont({ font, characters, sdfGlyphSize }, callback) {
  let text = Array.isArray(characters) ? characters.join("\n") : "" + characters;
  getTextRenderInfo({ font, sdfGlyphSize, text }, callback);
}
function assign2(toObj, fromObj) {
  for (let key in fromObj) {
    if (fromObj.hasOwnProperty(key)) {
      toObj[key] = fromObj[key];
    }
  }
  return toObj;
}
var linkEl;
function toAbsoluteURL(path) {
  if (!linkEl) {
    linkEl = typeof document === "undefined" ? {} : document.createElement("a");
  }
  linkEl.href = path;
  return linkEl.href;
}
function safariPre15Workaround(atlas) {
  if (typeof createImageBitmap !== "function") {
    console.info("Safari<15: applying SDF canvas workaround");
    const { sdfCanvas, sdfTexture } = atlas;
    const { width, height } = sdfCanvas;
    const gl = atlas.sdfCanvas.getContext("webgl");
    let pixels = sdfTexture.image.data;
    if (!pixels || pixels.length !== width * height * 4) {
      pixels = new Uint8Array(width * height * 4);
      sdfTexture.image = { width, height, data: pixels };
      sdfTexture.flipY = false;
      sdfTexture.isDataTexture = true;
    }
    gl.readPixels(0, 0, width, height, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
  }
}
var typesetterWorkerModule = defineWorkerModule({
  name: "Typesetter",
  dependencies: [
    createTypesetter,
    fontResolverWorkerModule,
    bidi_default
  ],
  init(createTypesetter2, fontResolver, bidiFactory2) {
    return createTypesetter2(fontResolver, bidiFactory2());
  }
});
var typesetInWorker = defineWorkerModule({
  name: "Typesetter",
  dependencies: [
    typesetterWorkerModule
  ],
  init(typesetter) {
    return function(args) {
      return new Promise((resolve) => {
        typesetter.typeset(args, resolve);
      });
    };
  },
  getTransferables(result) {
    const transferables = [];
    for (let p2 in result) {
      if (result[p2] && result[p2].buffer) {
        transferables.push(result[p2].buffer);
      }
    }
    return transferables;
  }
});
var typesetOnMainThread = typesetInWorker.onMainThread;
var templateGeometries = {};
function getTemplateGeometry(detail) {
  let geom = templateGeometries[detail];
  if (!geom) {
    geom = templateGeometries[detail] = new PlaneGeometry(1, 1, detail, detail).translate(0.5, 0.5, 0);
  }
  return geom;
}
var glyphBoundsAttrName = "aTroikaGlyphBounds";
var glyphIndexAttrName = "aTroikaGlyphIndex";
var glyphColorAttrName = "aTroikaGlyphColor";
var GlyphsGeometry = class extends InstancedBufferGeometry {
  constructor() {
    super();
    this.detail = 1;
    this.curveRadius = 0;
    this.groups = [
      { start: 0, count: Infinity, materialIndex: 0 },
      { start: 0, count: Infinity, materialIndex: 1 }
    ];
    this.boundingSphere = new Sphere();
    this.boundingBox = new Box3();
  }
  computeBoundingSphere() {
  }
  computeBoundingBox() {
  }
  set detail(detail) {
    if (detail !== this._detail) {
      this._detail = detail;
      if (typeof detail !== "number" || detail < 1) {
        detail = 1;
      }
      let tpl = getTemplateGeometry(detail);
      ["position", "normal", "uv"].forEach((attr) => {
        this.attributes[attr] = tpl.attributes[attr].clone();
      });
      this.setIndex(tpl.getIndex().clone());
    }
  }
  get detail() {
    return this._detail;
  }
  set curveRadius(r2) {
    if (r2 !== this._curveRadius) {
      this._curveRadius = r2;
      this._updateBounds();
    }
  }
  get curveRadius() {
    return this._curveRadius;
  }
  /**
   * Update the geometry for a new set of glyphs.
   * @param {Float32Array} glyphBounds - An array holding the planar bounds for all glyphs
   *        to be rendered, 4 entries for each glyph: x1,x2,y1,y1
   * @param {Float32Array} glyphAtlasIndices - An array holding the index of each glyph within
   *        the SDF atlas texture.
   * @param {Array} blockBounds - An array holding the [minX, minY, maxX, maxY] across all glyphs
   * @param {Array} [chunkedBounds] - An array of objects describing bounds for each chunk of N
   *        consecutive glyphs: `{start:N, end:N, rect:[minX, minY, maxX, maxY]}`. This can be
   *        used with `applyClipRect` to choose an optimized `instanceCount`.
   * @param {Uint8Array} [glyphColors] - An array holding r,g,b values for each glyph.
   */
  updateGlyphs(glyphBounds, glyphAtlasIndices, blockBounds, chunkedBounds, glyphColors) {
    this.updateAttributeData(glyphBoundsAttrName, glyphBounds, 4);
    this.updateAttributeData(glyphIndexAttrName, glyphAtlasIndices, 1);
    this.updateAttributeData(glyphColorAttrName, glyphColors, 3);
    this._blockBounds = blockBounds;
    this._chunkedBounds = chunkedBounds;
    this.instanceCount = glyphAtlasIndices.length;
    this._updateBounds();
  }
  _updateBounds() {
    const bounds = this._blockBounds;
    if (bounds) {
      const { curveRadius, boundingBox: bbox } = this;
      if (curveRadius) {
        const { PI, floor, min, max, sin, cos } = Math;
        const halfPi = PI / 2;
        const twoPi = PI * 2;
        const absR = Math.abs(curveRadius);
        const leftAngle = bounds[0] / absR;
        const rightAngle = bounds[2] / absR;
        const minX = floor((leftAngle + halfPi) / twoPi) !== floor((rightAngle + halfPi) / twoPi) ? -absR : min(sin(leftAngle) * absR, sin(rightAngle) * absR);
        const maxX = floor((leftAngle - halfPi) / twoPi) !== floor((rightAngle - halfPi) / twoPi) ? absR : max(sin(leftAngle) * absR, sin(rightAngle) * absR);
        const maxZ = floor((leftAngle + PI) / twoPi) !== floor((rightAngle + PI) / twoPi) ? absR * 2 : max(absR - cos(leftAngle) * absR, absR - cos(rightAngle) * absR);
        bbox.min.set(minX, bounds[1], curveRadius < 0 ? -maxZ : 0);
        bbox.max.set(maxX, bounds[3], curveRadius < 0 ? 0 : maxZ);
      } else {
        bbox.min.set(bounds[0], bounds[1], 0);
        bbox.max.set(bounds[2], bounds[3], 0);
      }
      bbox.getBoundingSphere(this.boundingSphere);
    }
  }
  /**
   * Given a clipping rect, and the chunkedBounds from the last updateGlyphs call, choose the lowest
   * `instanceCount` that will show all glyphs within the clipped view. This is an optimization
   * for long blocks of text that are clipped, to skip vertex shader evaluation for glyphs that would
   * be clipped anyway.
   *
   * Note that since `drawElementsInstanced[ANGLE]` only accepts an instance count and not a starting
   * offset, this optimization becomes less effective as the clipRect moves closer to the end of the
   * text block. We could fix that by switching from instancing to a full geometry with a drawRange,
   * but at the expense of much larger attribute buffers (see classdoc above.)
   *
   * @param {Vector4} clipRect
   */
  applyClipRect(clipRect) {
    let count = this.getAttribute(glyphIndexAttrName).count;
    let chunks = this._chunkedBounds;
    if (chunks) {
      for (let i2 = chunks.length; i2--; ) {
        count = chunks[i2].end;
        let rect = chunks[i2].rect;
        if (rect[1] < clipRect.w && rect[3] > clipRect.y && rect[0] < clipRect.z && rect[2] > clipRect.x) {
          break;
        }
      }
    }
    this.instanceCount = count;
  }
  /**
   * Utility for updating instance attributes with automatic resizing
   */
  updateAttributeData(attrName, newArray, itemSize) {
    const attr = this.getAttribute(attrName);
    if (newArray) {
      if (attr && attr.array.length === newArray.length) {
        attr.array.set(newArray);
        attr.needsUpdate = true;
      } else {
        this.setAttribute(attrName, new InstancedBufferAttribute(newArray, itemSize));
        delete this._maxInstanceCount;
        this.dispose();
      }
    } else if (attr) {
      this.deleteAttribute(attrName);
    }
  }
};
var VERTEX_DEFS = `
uniform vec2 uTroikaSDFTextureSize;
uniform float uTroikaSDFGlyphSize;
uniform vec4 uTroikaTotalBounds;
uniform vec4 uTroikaClipRect;
uniform mat3 uTroikaOrient;
uniform bool uTroikaUseGlyphColors;
uniform float uTroikaEdgeOffset;
uniform float uTroikaBlurRadius;
uniform vec2 uTroikaPositionOffset;
uniform float uTroikaCurveRadius;
attribute vec4 aTroikaGlyphBounds;
attribute float aTroikaGlyphIndex;
attribute vec3 aTroikaGlyphColor;
varying vec2 vTroikaGlyphUV;
varying vec4 vTroikaTextureUVBounds;
varying float vTroikaTextureChannel;
varying vec3 vTroikaGlyphColor;
varying vec2 vTroikaGlyphDimensions;
`;
var VERTEX_TRANSFORM = `
vec4 bounds = aTroikaGlyphBounds;
bounds.xz += uTroikaPositionOffset.x;
bounds.yw -= uTroikaPositionOffset.y;

vec4 outlineBounds = vec4(
  bounds.xy - uTroikaEdgeOffset - uTroikaBlurRadius,
  bounds.zw + uTroikaEdgeOffset + uTroikaBlurRadius
);
vec4 clippedBounds = vec4(
  clamp(outlineBounds.xy, uTroikaClipRect.xy, uTroikaClipRect.zw),
  clamp(outlineBounds.zw, uTroikaClipRect.xy, uTroikaClipRect.zw)
);

vec2 clippedXY = (mix(clippedBounds.xy, clippedBounds.zw, position.xy) - bounds.xy) / (bounds.zw - bounds.xy);

position.xy = mix(bounds.xy, bounds.zw, clippedXY);

uv = (position.xy - uTroikaTotalBounds.xy) / (uTroikaTotalBounds.zw - uTroikaTotalBounds.xy);

float rad = uTroikaCurveRadius;
if (rad != 0.0) {
  float angle = position.x / rad;
  position.xz = vec2(sin(angle) * rad, rad - cos(angle) * rad);
  normal.xz = vec2(sin(angle), cos(angle));
}
  
position = uTroikaOrient * position;
normal = uTroikaOrient * normal;

vTroikaGlyphUV = clippedXY.xy;
vTroikaGlyphDimensions = vec2(bounds[2] - bounds[0], bounds[3] - bounds[1]);

${""}
float txCols = uTroikaSDFTextureSize.x / uTroikaSDFGlyphSize;
vec2 txUvPerSquare = uTroikaSDFGlyphSize / uTroikaSDFTextureSize;
vec2 txStartUV = txUvPerSquare * vec2(
  mod(floor(aTroikaGlyphIndex / 4.0), txCols),
  floor(floor(aTroikaGlyphIndex / 4.0) / txCols)
);
vTroikaTextureUVBounds = vec4(txStartUV, vec2(txStartUV) + txUvPerSquare);
vTroikaTextureChannel = mod(aTroikaGlyphIndex, 4.0);
`;
var FRAGMENT_DEFS = `
uniform sampler2D uTroikaSDFTexture;
uniform vec2 uTroikaSDFTextureSize;
uniform float uTroikaSDFGlyphSize;
uniform float uTroikaSDFExponent;
uniform float uTroikaEdgeOffset;
uniform float uTroikaFillOpacity;
uniform float uTroikaBlurRadius;
uniform vec3 uTroikaStrokeColor;
uniform float uTroikaStrokeWidth;
uniform float uTroikaStrokeOpacity;
uniform bool uTroikaSDFDebug;
varying vec2 vTroikaGlyphUV;
varying vec4 vTroikaTextureUVBounds;
varying float vTroikaTextureChannel;
varying vec2 vTroikaGlyphDimensions;

float troikaSdfValueToSignedDistance(float alpha) {
  // Inverse of exponential encoding in webgl-sdf-generator
  ${""}
  float maxDimension = max(vTroikaGlyphDimensions.x, vTroikaGlyphDimensions.y);
  float absDist = (1.0 - pow(2.0 * (alpha > 0.5 ? 1.0 - alpha : alpha), 1.0 / uTroikaSDFExponent)) * maxDimension;
  float signedDist = absDist * (alpha > 0.5 ? -1.0 : 1.0);
  return signedDist;
}

float troikaGlyphUvToSdfValue(vec2 glyphUV) {
  vec2 textureUV = mix(vTroikaTextureUVBounds.xy, vTroikaTextureUVBounds.zw, glyphUV);
  vec4 rgba = texture2D(uTroikaSDFTexture, textureUV);
  float ch = floor(vTroikaTextureChannel + 0.5); //NOTE: can't use round() in WebGL1
  return ch == 0.0 ? rgba.r : ch == 1.0 ? rgba.g : ch == 2.0 ? rgba.b : rgba.a;
}

float troikaGlyphUvToDistance(vec2 uv) {
  return troikaSdfValueToSignedDistance(troikaGlyphUvToSdfValue(uv));
}

float troikaGetAADist() {
  ${""}
  #if defined(GL_OES_standard_derivatives) || __VERSION__ >= 300
  return length(fwidth(vTroikaGlyphUV * vTroikaGlyphDimensions)) * 0.5;
  #else
  return vTroikaGlyphDimensions.x / 64.0;
  #endif
}

float troikaGetFragDistValue() {
  vec2 clampedGlyphUV = clamp(vTroikaGlyphUV, 0.5 / uTroikaSDFGlyphSize, 1.0 - 0.5 / uTroikaSDFGlyphSize);
  float distance = troikaGlyphUvToDistance(clampedGlyphUV);
 
  // Extrapolate distance when outside bounds:
  distance += clampedGlyphUV == vTroikaGlyphUV ? 0.0 : 
    length((vTroikaGlyphUV - clampedGlyphUV) * vTroikaGlyphDimensions);

  ${""}

  return distance;
}

float troikaGetEdgeAlpha(float distance, float distanceOffset, float aaDist) {
  #if defined(IS_DEPTH_MATERIAL) || defined(IS_DISTANCE_MATERIAL)
  float alpha = step(-distanceOffset, -distance);
  #else

  float alpha = smoothstep(
    distanceOffset + aaDist,
    distanceOffset - aaDist,
    distance
  );
  #endif

  return alpha;
}
`;
var FRAGMENT_TRANSFORM = `
float aaDist = troikaGetAADist();
float fragDistance = troikaGetFragDistValue();
float edgeAlpha = uTroikaSDFDebug ?
  troikaGlyphUvToSdfValue(vTroikaGlyphUV) :
  troikaGetEdgeAlpha(fragDistance, uTroikaEdgeOffset, max(aaDist, uTroikaBlurRadius));

#if !defined(IS_DEPTH_MATERIAL) && !defined(IS_DISTANCE_MATERIAL)
vec4 fillRGBA = gl_FragColor;
fillRGBA.a *= uTroikaFillOpacity;
vec4 strokeRGBA = uTroikaStrokeWidth == 0.0 ? fillRGBA : vec4(uTroikaStrokeColor, uTroikaStrokeOpacity);
if (fillRGBA.a == 0.0) fillRGBA.rgb = strokeRGBA.rgb;
gl_FragColor = mix(fillRGBA, strokeRGBA, smoothstep(
  -uTroikaStrokeWidth - aaDist,
  -uTroikaStrokeWidth + aaDist,
  fragDistance
));
gl_FragColor.a *= edgeAlpha;
#endif

if (edgeAlpha == 0.0) {
  discard;
}
`;
function createTextDerivedMaterial(baseMaterial) {
  const textMaterial = createDerivedMaterial(baseMaterial, {
    chained: true,
    extensions: {
      derivatives: true
    },
    uniforms: {
      uTroikaSDFTexture: { value: null },
      uTroikaSDFTextureSize: { value: new Vector2() },
      uTroikaSDFGlyphSize: { value: 0 },
      uTroikaSDFExponent: { value: 0 },
      uTroikaTotalBounds: { value: new Vector4(0, 0, 0, 0) },
      uTroikaClipRect: { value: new Vector4(0, 0, 0, 0) },
      uTroikaEdgeOffset: { value: 0 },
      uTroikaFillOpacity: { value: 1 },
      uTroikaPositionOffset: { value: new Vector2() },
      uTroikaCurveRadius: { value: 0 },
      uTroikaBlurRadius: { value: 0 },
      uTroikaStrokeWidth: { value: 0 },
      uTroikaStrokeColor: { value: new Color() },
      uTroikaStrokeOpacity: { value: 1 },
      uTroikaOrient: { value: new Matrix3() },
      uTroikaUseGlyphColors: { value: true },
      uTroikaSDFDebug: { value: false }
    },
    vertexDefs: VERTEX_DEFS,
    vertexTransform: VERTEX_TRANSFORM,
    fragmentDefs: FRAGMENT_DEFS,
    fragmentColorTransform: FRAGMENT_TRANSFORM,
    customRewriter({ vertexShader: vertexShader3, fragmentShader: fragmentShader3 }) {
      let uDiffuseRE = /\buniform\s+vec3\s+diffuse\b/;
      if (uDiffuseRE.test(fragmentShader3)) {
        fragmentShader3 = fragmentShader3.replace(uDiffuseRE, "varying vec3 vTroikaGlyphColor").replace(/\bdiffuse\b/g, "vTroikaGlyphColor");
        if (!uDiffuseRE.test(vertexShader3)) {
          vertexShader3 = vertexShader3.replace(
            voidMainRegExp,
            "uniform vec3 diffuse;\n$&\nvTroikaGlyphColor = uTroikaUseGlyphColors ? aTroikaGlyphColor / 255.0 : diffuse;\n"
          );
        }
      }
      return { vertexShader: vertexShader3, fragmentShader: fragmentShader3 };
    }
  });
  textMaterial.transparent = true;
  textMaterial.forceSinglePass = true;
  Object.defineProperties(textMaterial, {
    isTroikaTextMaterial: { value: true },
    // WebGLShadowMap reverses the side of the shadow material by default, which fails
    // for planes, so here we force the `shadowSide` to always match the main side.
    shadowSide: {
      get() {
        return this.side;
      },
      set() {
      }
    }
  });
  return textMaterial;
}
var defaultMaterial = new MeshBasicMaterial({
  color: 16777215,
  side: DoubleSide,
  transparent: true
});
var defaultStrokeColor = 8421504;
var tempMat4 = new Matrix4();
var tempVec3a = new Vector3();
var tempVec3b = new Vector3();
var tempArray = [];
var origin = new Vector3();
var defaultOrient = "+x+y";
function first(o2) {
  return Array.isArray(o2) ? o2[0] : o2;
}
var getFlatRaycastMesh = () => {
  const mesh = new Mesh(
    new PlaneGeometry(1, 1),
    defaultMaterial
  );
  getFlatRaycastMesh = () => mesh;
  return mesh;
};
var getCurvedRaycastMesh = () => {
  const mesh = new Mesh(
    new PlaneGeometry(1, 1, 32, 1),
    defaultMaterial
  );
  getCurvedRaycastMesh = () => mesh;
  return mesh;
};
var syncStartEvent = { type: "syncstart" };
var syncCompleteEvent = { type: "synccomplete" };
var SYNCABLE_PROPS = [
  "font",
  "fontSize",
  "fontStyle",
  "fontWeight",
  "lang",
  "letterSpacing",
  "lineHeight",
  "maxWidth",
  "overflowWrap",
  "text",
  "direction",
  "textAlign",
  "textIndent",
  "whiteSpace",
  "anchorX",
  "anchorY",
  "colorRanges",
  "sdfGlyphSize"
];
var COPYABLE_PROPS = SYNCABLE_PROPS.concat(
  "material",
  "color",
  "depthOffset",
  "clipRect",
  "curveRadius",
  "orientation",
  "glyphGeometryDetail"
);
var Text = class extends Mesh {
  constructor() {
    const geometry2 = new GlyphsGeometry();
    super(geometry2, null);
    this.text = "";
    this.anchorX = 0;
    this.anchorY = 0;
    this.curveRadius = 0;
    this.direction = "auto";
    this.font = null;
    this.unicodeFontsURL = null;
    this.fontSize = 0.1;
    this.fontWeight = "normal";
    this.fontStyle = "normal";
    this.lang = null;
    this.letterSpacing = 0;
    this.lineHeight = "normal";
    this.maxWidth = Infinity;
    this.overflowWrap = "normal";
    this.textAlign = "left";
    this.textIndent = 0;
    this.whiteSpace = "normal";
    this.material = null;
    this.color = null;
    this.colorRanges = null;
    this.outlineWidth = 0;
    this.outlineColor = 0;
    this.outlineOpacity = 1;
    this.outlineBlur = 0;
    this.outlineOffsetX = 0;
    this.outlineOffsetY = 0;
    this.strokeWidth = 0;
    this.strokeColor = defaultStrokeColor;
    this.strokeOpacity = 1;
    this.fillOpacity = 1;
    this.depthOffset = 0;
    this.clipRect = null;
    this.orientation = defaultOrient;
    this.glyphGeometryDetail = 1;
    this.sdfGlyphSize = null;
    this.gpuAccelerateSDF = true;
    this.debugSDF = false;
  }
  /**
   * Updates the text rendering according to the current text-related configuration properties.
   * This is an async process, so you can pass in a callback function to be executed when it
   * finishes.
   * @param {function} [callback]
   */
  sync(callback) {
    if (this._needsSync) {
      this._needsSync = false;
      if (this._isSyncing) {
        (this._queuedSyncs || (this._queuedSyncs = [])).push(callback);
      } else {
        this._isSyncing = true;
        this.dispatchEvent(syncStartEvent);
        getTextRenderInfo({
          text: this.text,
          font: this.font,
          lang: this.lang,
          fontSize: this.fontSize || 0.1,
          fontWeight: this.fontWeight || "normal",
          fontStyle: this.fontStyle || "normal",
          letterSpacing: this.letterSpacing || 0,
          lineHeight: this.lineHeight || "normal",
          maxWidth: this.maxWidth,
          direction: this.direction || "auto",
          textAlign: this.textAlign,
          textIndent: this.textIndent,
          whiteSpace: this.whiteSpace,
          overflowWrap: this.overflowWrap,
          anchorX: this.anchorX,
          anchorY: this.anchorY,
          colorRanges: this.colorRanges,
          includeCaretPositions: true,
          //TODO parameterize
          sdfGlyphSize: this.sdfGlyphSize,
          gpuAccelerateSDF: this.gpuAccelerateSDF,
          unicodeFontsURL: this.unicodeFontsURL
        }, (textRenderInfo) => {
          this._isSyncing = false;
          this._textRenderInfo = textRenderInfo;
          this.geometry.updateGlyphs(
            textRenderInfo.glyphBounds,
            textRenderInfo.glyphAtlasIndices,
            textRenderInfo.blockBounds,
            textRenderInfo.chunkedBounds,
            textRenderInfo.glyphColors
          );
          const queued = this._queuedSyncs;
          if (queued) {
            this._queuedSyncs = null;
            this._needsSync = true;
            this.sync(() => {
              queued.forEach((fn) => fn && fn());
            });
          }
          this.dispatchEvent(syncCompleteEvent);
          if (callback) {
            callback();
          }
        });
      }
    }
  }
  /**
   * Initiate a sync if needed - note it won't complete until next frame at the
   * earliest so if possible it's a good idea to call sync() manually as soon as
   * all the properties have been set.
   * @override
   */
  onBeforeRender(renderer, scene, camera, geometry2, material, group) {
    this.sync();
    if (material.isTroikaTextMaterial) {
      this._prepareForRender(material);
    }
  }
  /**
   * Shortcut to dispose the geometry specific to this instance.
   * Note: we don't also dispose the derived material here because if anything else is
   * sharing the same base material it will result in a pause next frame as the program
   * is recompiled. Instead users can dispose the base material manually, like normal,
   * and we'll also dispose the derived material at that time.
   */
  dispose() {
    this.geometry.dispose();
  }
  /**
   * @property {TroikaTextRenderInfo|null} textRenderInfo
   * @readonly
   * The current processed rendering data for this TextMesh, returned by the TextBuilder after
   * a `sync()` call. This will be `null` initially, and may be stale for a short period until
   * the asynchrous `sync()` process completes.
   */
  get textRenderInfo() {
    return this._textRenderInfo || null;
  }
  /**
   * Create the text derived material from the base material. Can be overridden to use a custom
   * derived material.
   */
  createDerivedMaterial(baseMaterial) {
    return createTextDerivedMaterial(baseMaterial);
  }
  // Handler for automatically wrapping the base material with our upgrades. We do the wrapping
  // lazily on _read_ rather than write to avoid unnecessary wrapping on transient values.
  get material() {
    let derivedMaterial = this._derivedMaterial;
    const baseMaterial = this._baseMaterial || this._defaultMaterial || (this._defaultMaterial = defaultMaterial.clone());
    if (!derivedMaterial || !derivedMaterial.isDerivedFrom(baseMaterial)) {
      derivedMaterial = this._derivedMaterial = this.createDerivedMaterial(baseMaterial);
      baseMaterial.addEventListener("dispose", function onDispose() {
        baseMaterial.removeEventListener("dispose", onDispose);
        derivedMaterial.dispose();
      });
    }
    if (this.hasOutline()) {
      let outlineMaterial = derivedMaterial._outlineMtl;
      if (!outlineMaterial) {
        outlineMaterial = derivedMaterial._outlineMtl = Object.create(derivedMaterial, {
          id: { value: derivedMaterial.id + 0.1 }
        });
        outlineMaterial.isTextOutlineMaterial = true;
        outlineMaterial.depthWrite = false;
        outlineMaterial.map = null;
        derivedMaterial.addEventListener("dispose", function onDispose() {
          derivedMaterial.removeEventListener("dispose", onDispose);
          outlineMaterial.dispose();
        });
      }
      return [
        outlineMaterial,
        derivedMaterial
      ];
    } else {
      return derivedMaterial;
    }
  }
  set material(baseMaterial) {
    if (baseMaterial && baseMaterial.isTroikaTextMaterial) {
      this._derivedMaterial = baseMaterial;
      this._baseMaterial = baseMaterial.baseMaterial;
    } else {
      this._baseMaterial = baseMaterial;
    }
  }
  hasOutline() {
    return !!(this.outlineWidth || this.outlineBlur || this.outlineOffsetX || this.outlineOffsetY);
  }
  get glyphGeometryDetail() {
    return this.geometry.detail;
  }
  set glyphGeometryDetail(detail) {
    this.geometry.detail = detail;
  }
  get curveRadius() {
    return this.geometry.curveRadius;
  }
  set curveRadius(r2) {
    this.geometry.curveRadius = r2;
  }
  // Create and update material for shadows upon request:
  get customDepthMaterial() {
    return first(this.material).getDepthMaterial();
  }
  set customDepthMaterial(m) {
  }
  get customDistanceMaterial() {
    return first(this.material).getDistanceMaterial();
  }
  set customDistanceMaterial(m) {
  }
  _prepareForRender(material) {
    const isOutline = material.isTextOutlineMaterial;
    const uniforms = material.uniforms;
    const textInfo = this.textRenderInfo;
    if (textInfo) {
      const { sdfTexture, blockBounds } = textInfo;
      uniforms.uTroikaSDFTexture.value = sdfTexture;
      uniforms.uTroikaSDFTextureSize.value.set(sdfTexture.image.width, sdfTexture.image.height);
      uniforms.uTroikaSDFGlyphSize.value = textInfo.sdfGlyphSize;
      uniforms.uTroikaSDFExponent.value = textInfo.sdfExponent;
      uniforms.uTroikaTotalBounds.value.fromArray(blockBounds);
      uniforms.uTroikaUseGlyphColors.value = !isOutline && !!textInfo.glyphColors;
      let distanceOffset = 0;
      let blurRadius = 0;
      let strokeWidth = 0;
      let fillOpacity;
      let strokeOpacity;
      let strokeColor;
      let offsetX = 0;
      let offsetY = 0;
      if (isOutline) {
        let { outlineWidth, outlineOffsetX, outlineOffsetY, outlineBlur, outlineOpacity } = this;
        distanceOffset = this._parsePercent(outlineWidth) || 0;
        blurRadius = Math.max(0, this._parsePercent(outlineBlur) || 0);
        fillOpacity = outlineOpacity;
        offsetX = this._parsePercent(outlineOffsetX) || 0;
        offsetY = this._parsePercent(outlineOffsetY) || 0;
      } else {
        strokeWidth = Math.max(0, this._parsePercent(this.strokeWidth) || 0);
        if (strokeWidth) {
          strokeColor = this.strokeColor;
          uniforms.uTroikaStrokeColor.value.set(strokeColor == null ? defaultStrokeColor : strokeColor);
          strokeOpacity = this.strokeOpacity;
          if (strokeOpacity == null) strokeOpacity = 1;
        }
        fillOpacity = this.fillOpacity;
      }
      uniforms.uTroikaEdgeOffset.value = distanceOffset;
      uniforms.uTroikaPositionOffset.value.set(offsetX, offsetY);
      uniforms.uTroikaBlurRadius.value = blurRadius;
      uniforms.uTroikaStrokeWidth.value = strokeWidth;
      uniforms.uTroikaStrokeOpacity.value = strokeOpacity;
      uniforms.uTroikaFillOpacity.value = fillOpacity == null ? 1 : fillOpacity;
      uniforms.uTroikaCurveRadius.value = this.curveRadius || 0;
      let clipRect = this.clipRect;
      if (clipRect && Array.isArray(clipRect) && clipRect.length === 4) {
        uniforms.uTroikaClipRect.value.fromArray(clipRect);
      } else {
        const pad = (this.fontSize || 0.1) * 100;
        uniforms.uTroikaClipRect.value.set(
          blockBounds[0] - pad,
          blockBounds[1] - pad,
          blockBounds[2] + pad,
          blockBounds[3] + pad
        );
      }
      this.geometry.applyClipRect(uniforms.uTroikaClipRect.value);
    }
    uniforms.uTroikaSDFDebug.value = !!this.debugSDF;
    material.polygonOffset = !!this.depthOffset;
    material.polygonOffsetFactor = material.polygonOffsetUnits = this.depthOffset || 0;
    const color = isOutline ? this.outlineColor || 0 : this.color;
    if (color == null) {
      delete material.color;
    } else {
      const colorObj = material.hasOwnProperty("color") ? material.color : material.color = new Color();
      if (color !== colorObj._input || typeof color === "object") {
        colorObj.set(colorObj._input = color);
      }
    }
    let orient = this.orientation || defaultOrient;
    if (orient !== material._orientation) {
      let rotMat = uniforms.uTroikaOrient.value;
      orient = orient.replace(/[^-+xyz]/g, "");
      let match = orient !== defaultOrient && orient.match(/^([-+])([xyz])([-+])([xyz])$/);
      if (match) {
        let [, hSign, hAxis, vSign, vAxis] = match;
        tempVec3a.set(0, 0, 0)[hAxis] = hSign === "-" ? 1 : -1;
        tempVec3b.set(0, 0, 0)[vAxis] = vSign === "-" ? -1 : 1;
        tempMat4.lookAt(origin, tempVec3a.cross(tempVec3b), tempVec3b);
        rotMat.setFromMatrix4(tempMat4);
      } else {
        rotMat.identity();
      }
      material._orientation = orient;
    }
  }
  _parsePercent(value) {
    if (typeof value === "string") {
      let match = value.match(/^(-?[\d.]+)%$/);
      let pct = match ? parseFloat(match[1]) : NaN;
      value = (isNaN(pct) ? 0 : pct / 100) * this.fontSize;
    }
    return value;
  }
  /**
   * Translate a point in local space to an x/y in the text plane.
   */
  localPositionToTextCoords(position, target = new Vector2()) {
    target.copy(position);
    const r2 = this.curveRadius;
    if (r2) {
      target.x = Math.atan2(position.x, Math.abs(r2) - Math.abs(position.z)) * Math.abs(r2);
    }
    return target;
  }
  /**
   * Translate a point in world space to an x/y in the text plane.
   */
  worldPositionToTextCoords(position, target = new Vector2()) {
    tempVec3a.copy(position);
    return this.localPositionToTextCoords(this.worldToLocal(tempVec3a), target);
  }
  /**
   * @override Custom raycasting to test against the whole text block's max rectangular bounds
   * TODO is there any reason to make this more granular, like within individual line or glyph rects?
   */
  raycast(raycaster, intersects) {
    const { textRenderInfo, curveRadius } = this;
    if (textRenderInfo) {
      const bounds = textRenderInfo.blockBounds;
      const raycastMesh = curveRadius ? getCurvedRaycastMesh() : getFlatRaycastMesh();
      const geom = raycastMesh.geometry;
      const { position, uv } = geom.attributes;
      for (let i2 = 0; i2 < uv.count; i2++) {
        let x = bounds[0] + uv.getX(i2) * (bounds[2] - bounds[0]);
        const y = bounds[1] + uv.getY(i2) * (bounds[3] - bounds[1]);
        let z = 0;
        if (curveRadius) {
          z = curveRadius - Math.cos(x / curveRadius) * curveRadius;
          x = Math.sin(x / curveRadius) * curveRadius;
        }
        position.setXYZ(i2, x, y, z);
      }
      geom.boundingSphere = this.geometry.boundingSphere;
      geom.boundingBox = this.geometry.boundingBox;
      raycastMesh.matrixWorld = this.matrixWorld;
      raycastMesh.material.side = this.material.side;
      tempArray.length = 0;
      raycastMesh.raycast(raycaster, tempArray);
      for (let i2 = 0; i2 < tempArray.length; i2++) {
        tempArray[i2].object = this;
        intersects.push(tempArray[i2]);
      }
    }
  }
  copy(source) {
    const geom = this.geometry;
    super.copy(source);
    this.geometry = geom;
    COPYABLE_PROPS.forEach((prop) => {
      this[prop] = source[prop];
    });
    return this;
  }
  clone() {
    return new this.constructor().copy(this);
  }
};
SYNCABLE_PROPS.forEach((prop) => {
  const privateKey = "_private_" + prop;
  Object.defineProperty(Text.prototype, prop, {
    get() {
      return this[privateKey];
    },
    set(value) {
      if (value !== this[privateKey]) {
        this[privateKey] = value;
        this._needsSync = true;
      }
    }
  });
});
var tempBox3 = new Box3();
var tempColor$1 = new Color();

// node_modules/meshline/dist/index.js
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
function memcpy(src, srcOffset, dst, dstOffset, length3) {
  let i2;
  src = src.subarray || src.slice ? src : src.buffer;
  dst = dst.subarray || dst.slice ? dst : dst.buffer;
  src = srcOffset ? src.subarray ? src.subarray(srcOffset, length3 && srcOffset + length3) : src.slice(srcOffset, length3 && srcOffset + length3) : src;
  if (dst.set) {
    dst.set(src, dstOffset);
  } else {
    for (i2 = 0; i2 < src.length; i2++)
      dst[i2 + dstOffset] = src[i2];
  }
  return dst;
}
function convertPoints(points) {
  if (points instanceof Float32Array)
    return points;
  if (points instanceof BufferGeometry)
    return points.getAttribute("position").array;
  return points.map((p2) => {
    const isArray = Array.isArray(p2);
    return p2 instanceof Vector3 ? [p2.x, p2.y, p2.z] : p2 instanceof Vector2 ? [p2.x, p2.y, 0] : isArray && p2.length === 3 ? [p2[0], p2[1], p2[2]] : isArray && p2.length === 2 ? [p2[0], p2[1], 0] : p2;
  }).flat();
}
var MeshLineGeometry = class extends BufferGeometry {
  constructor() {
    super();
    __publicField(this, "type", "MeshLine");
    __publicField(this, "isMeshLine", true);
    __publicField(this, "positions", []);
    __publicField(this, "previous", []);
    __publicField(this, "next", []);
    __publicField(this, "side", []);
    __publicField(this, "width", []);
    __publicField(this, "indices_array", []);
    __publicField(this, "uvs", []);
    __publicField(this, "counters", []);
    __publicField(this, "widthCallback", null);
    __publicField(this, "_attributes");
    __publicField(this, "_points", []);
    __publicField(this, "points");
    __publicField(this, "matrixWorld", new Matrix4());
    Object.defineProperties(this, {
      points: {
        enumerable: true,
        get() {
          return this._points;
        },
        set(value) {
          this.setPoints(value, this.widthCallback);
        }
      }
    });
  }
  setMatrixWorld(matrixWorld) {
    this.matrixWorld = matrixWorld;
  }
  setPoints(points, wcb) {
    points = convertPoints(points);
    this._points = points;
    this.widthCallback = wcb != null ? wcb : null;
    this.positions = [];
    this.counters = [];
    if (points.length && points[0] instanceof Vector3) {
      for (let j = 0; j < points.length; j++) {
        const p2 = points[j];
        const c2 = j / (points.length - 1);
        this.positions.push(p2.x, p2.y, p2.z);
        this.positions.push(p2.x, p2.y, p2.z);
        this.counters.push(c2);
        this.counters.push(c2);
      }
    } else {
      for (let j = 0; j < points.length; j += 3) {
        const c2 = j / (points.length - 1);
        this.positions.push(points[j], points[j + 1], points[j + 2]);
        this.positions.push(points[j], points[j + 1], points[j + 2]);
        this.counters.push(c2);
        this.counters.push(c2);
      }
    }
    this.process();
  }
  compareV3(a5, b) {
    const aa = a5 * 6;
    const ab = b * 6;
    return this.positions[aa] === this.positions[ab] && this.positions[aa + 1] === this.positions[ab + 1] && this.positions[aa + 2] === this.positions[ab + 2];
  }
  copyV3(a5) {
    const aa = a5 * 6;
    return [this.positions[aa], this.positions[aa + 1], this.positions[aa + 2]];
  }
  process() {
    const l2 = this.positions.length / 6;
    this.previous = [];
    this.next = [];
    this.side = [];
    this.width = [];
    this.indices_array = [];
    this.uvs = [];
    let w;
    let v;
    if (this.compareV3(0, l2 - 1)) {
      v = this.copyV3(l2 - 2);
    } else {
      v = this.copyV3(0);
    }
    this.previous.push(v[0], v[1], v[2]);
    this.previous.push(v[0], v[1], v[2]);
    for (let j = 0; j < l2; j++) {
      this.side.push(1);
      this.side.push(-1);
      if (this.widthCallback)
        w = this.widthCallback(j / (l2 - 1));
      else
        w = 1;
      this.width.push(w);
      this.width.push(w);
      this.uvs.push(j / (l2 - 1), 0);
      this.uvs.push(j / (l2 - 1), 1);
      if (j < l2 - 1) {
        v = this.copyV3(j);
        this.previous.push(v[0], v[1], v[2]);
        this.previous.push(v[0], v[1], v[2]);
        const n2 = j * 2;
        this.indices_array.push(n2, n2 + 1, n2 + 2);
        this.indices_array.push(n2 + 2, n2 + 1, n2 + 3);
      }
      if (j > 0) {
        v = this.copyV3(j);
        this.next.push(v[0], v[1], v[2]);
        this.next.push(v[0], v[1], v[2]);
      }
    }
    if (this.compareV3(l2 - 1, 0)) {
      v = this.copyV3(1);
    } else {
      v = this.copyV3(l2 - 1);
    }
    this.next.push(v[0], v[1], v[2]);
    this.next.push(v[0], v[1], v[2]);
    if (!this._attributes || this._attributes.position.count !== this.counters.length) {
      this._attributes = {
        position: new BufferAttribute(new Float32Array(this.positions), 3),
        previous: new BufferAttribute(new Float32Array(this.previous), 3),
        next: new BufferAttribute(new Float32Array(this.next), 3),
        side: new BufferAttribute(new Float32Array(this.side), 1),
        width: new BufferAttribute(new Float32Array(this.width), 1),
        uv: new BufferAttribute(new Float32Array(this.uvs), 2),
        index: new BufferAttribute(new Uint16Array(this.indices_array), 1),
        counters: new BufferAttribute(new Float32Array(this.counters), 1)
      };
    } else {
      this._attributes.position.copyArray(new Float32Array(this.positions));
      this._attributes.position.needsUpdate = true;
      this._attributes.previous.copyArray(new Float32Array(this.previous));
      this._attributes.previous.needsUpdate = true;
      this._attributes.next.copyArray(new Float32Array(this.next));
      this._attributes.next.needsUpdate = true;
      this._attributes.side.copyArray(new Float32Array(this.side));
      this._attributes.side.needsUpdate = true;
      this._attributes.width.copyArray(new Float32Array(this.width));
      this._attributes.width.needsUpdate = true;
      this._attributes.uv.copyArray(new Float32Array(this.uvs));
      this._attributes.uv.needsUpdate = true;
      this._attributes.index.copyArray(new Uint16Array(this.indices_array));
      this._attributes.index.needsUpdate = true;
    }
    this.setAttribute("position", this._attributes.position);
    this.setAttribute("previous", this._attributes.previous);
    this.setAttribute("next", this._attributes.next);
    this.setAttribute("side", this._attributes.side);
    this.setAttribute("width", this._attributes.width);
    this.setAttribute("uv", this._attributes.uv);
    this.setAttribute("counters", this._attributes.counters);
    this.setAttribute("position", this._attributes.position);
    this.setAttribute("previous", this._attributes.previous);
    this.setAttribute("next", this._attributes.next);
    this.setAttribute("side", this._attributes.side);
    this.setAttribute("width", this._attributes.width);
    this.setAttribute("uv", this._attributes.uv);
    this.setAttribute("counters", this._attributes.counters);
    this.setIndex(this._attributes.index);
    this.computeBoundingSphere();
    this.computeBoundingBox();
  }
  advance({ x, y, z }) {
    const positions = this._attributes.position.array;
    const previous = this._attributes.previous.array;
    const next = this._attributes.next.array;
    const l2 = positions.length;
    memcpy(positions, 0, previous, 0, l2);
    memcpy(positions, 6, positions, 0, l2 - 6);
    positions[l2 - 6] = x;
    positions[l2 - 5] = y;
    positions[l2 - 4] = z;
    positions[l2 - 3] = x;
    positions[l2 - 2] = y;
    positions[l2 - 1] = z;
    memcpy(positions, 6, next, 0, l2 - 6);
    next[l2 - 6] = x;
    next[l2 - 5] = y;
    next[l2 - 4] = z;
    next[l2 - 3] = x;
    next[l2 - 2] = y;
    next[l2 - 1] = z;
    this._attributes.position.needsUpdate = true;
    this._attributes.previous.needsUpdate = true;
    this._attributes.next.needsUpdate = true;
  }
};
var vertexShader = `
  #include <common>
  #include <logdepthbuf_pars_vertex>
  #include <fog_pars_vertex>
  #include <clipping_planes_pars_vertex>

  attribute vec3 previous;
  attribute vec3 next;
  attribute float side;
  attribute float width;
  attribute float counters;
  
  uniform vec2 resolution;
  uniform float lineWidth;
  uniform vec3 color;
  uniform float opacity;
  uniform float sizeAttenuation;
  
  varying vec2 vUV;
  varying vec4 vColor;
  varying float vCounters;
  
  vec2 fix(vec4 i, float aspect) {
    vec2 res = i.xy / i.w;
    res.x *= aspect;
    return res;
  }
  
  void main() {
    float aspect = resolution.x / resolution.y;
    vColor = vec4(color, opacity);
    vUV = uv;
    vCounters = counters;
  
    mat4 m = projectionMatrix * modelViewMatrix;
    vec4 finalPosition = m * vec4(position, 1.0) * aspect;
    vec4 prevPos = m * vec4(previous, 1.0);
    vec4 nextPos = m * vec4(next, 1.0);
  
    vec2 currentP = fix(finalPosition, aspect);
    vec2 prevP = fix(prevPos, aspect);
    vec2 nextP = fix(nextPos, aspect);
  
    float w = lineWidth * width;
  
    vec2 dir;
    if (nextP == currentP) dir = normalize(currentP - prevP);
    else if (prevP == currentP) dir = normalize(nextP - currentP);
    else {
      vec2 dir1 = normalize(currentP - prevP);
      vec2 dir2 = normalize(nextP - currentP);
      dir = normalize(dir1 + dir2);
  
      vec2 perp = vec2(-dir1.y, dir1.x);
      vec2 miter = vec2(-dir.y, dir.x);
      //w = clamp(w / dot(miter, perp), 0., 4. * lineWidth * width);
    }
  
    //vec2 normal = (cross(vec3(dir, 0.), vec3(0., 0., 1.))).xy;
    vec4 normal = vec4(-dir.y, dir.x, 0., 1.);
    normal.xy *= .5 * w;
    //normal *= projectionMatrix;
    if (sizeAttenuation == 0.) {
      normal.xy *= finalPosition.w;
      normal.xy /= (vec4(resolution, 0., 1.) * projectionMatrix).xy * aspect;
    }
  
    finalPosition.xy += normal.xy * side;
    gl_Position = finalPosition;
    #include <logdepthbuf_vertex>
    #include <fog_vertex>
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    #include <clipping_planes_vertex>
    #include <fog_vertex>
  }
`;
var version = (() => parseInt(REVISION.replace(/\D+/g, "")))();
var colorspace_fragment = version >= 154 ? "colorspace_fragment" : "encodings_fragment";
var fragmentShader = `
  #include <fog_pars_fragment>
  #include <logdepthbuf_pars_fragment>
  #include <clipping_planes_pars_fragment>
  
  uniform sampler2D map;
  uniform sampler2D alphaMap;
  uniform float useGradient;
  uniform float useMap;
  uniform float useAlphaMap;
  uniform float useDash;
  uniform float dashArray;
  uniform float dashOffset;
  uniform float dashRatio;
  uniform float visibility;
  uniform float alphaTest;
  uniform vec2 repeat;
  uniform vec3 gradient[2];
  
  varying vec2 vUV;
  varying vec4 vColor;
  varying float vCounters;
  
  void main() {
    #include <logdepthbuf_fragment>
    vec4 diffuseColor = vColor;
    if (useGradient == 1.) diffuseColor = vec4(mix(gradient[0], gradient[1], vCounters), 1.0);
    if (useMap == 1.) diffuseColor *= texture2D(map, vUV * repeat);
    if (useAlphaMap == 1.) diffuseColor.a *= texture2D(alphaMap, vUV * repeat).a;
    if (diffuseColor.a < alphaTest) discard;
    if (useDash == 1.) diffuseColor.a *= ceil(mod(vCounters + dashOffset, dashArray) - (dashArray * dashRatio));
    diffuseColor.a *= step(vCounters, visibility);
    #include <clipping_planes_fragment>
    gl_FragColor = diffuseColor;     
    #include <fog_fragment>
    #include <tonemapping_fragment>
    #include <${colorspace_fragment}>
  }
`;
var MeshLineMaterial = class extends ShaderMaterial {
  constructor(parameters) {
    super({
      uniforms: {
        ...UniformsLib.fog,
        lineWidth: { value: 1 },
        map: { value: null },
        useMap: { value: 0 },
        alphaMap: { value: null },
        useAlphaMap: { value: 0 },
        color: { value: new Color(16777215) },
        gradient: { value: [new Color(16711680), new Color(65280)] },
        opacity: { value: 1 },
        resolution: { value: new Vector2(1, 1) },
        sizeAttenuation: { value: 1 },
        dashArray: { value: 0 },
        dashOffset: { value: 0 },
        dashRatio: { value: 0.5 },
        useDash: { value: 0 },
        useGradient: { value: 0 },
        visibility: { value: 1 },
        alphaTest: { value: 0 },
        repeat: { value: new Vector2(1, 1) }
      },
      vertexShader,
      fragmentShader
    });
    __publicField(this, "lineWidth");
    __publicField(this, "map");
    __publicField(this, "useMap");
    __publicField(this, "alphaMap");
    __publicField(this, "useAlphaMap");
    __publicField(this, "color");
    __publicField(this, "gradient");
    __publicField(this, "resolution");
    __publicField(this, "sizeAttenuation");
    __publicField(this, "dashArray");
    __publicField(this, "dashOffset");
    __publicField(this, "dashRatio");
    __publicField(this, "useDash");
    __publicField(this, "useGradient");
    __publicField(this, "visibility");
    __publicField(this, "repeat");
    this.type = "MeshLineMaterial";
    Object.defineProperties(this, {
      lineWidth: {
        enumerable: true,
        get() {
          return this.uniforms.lineWidth.value;
        },
        set(value) {
          this.uniforms.lineWidth.value = value;
        }
      },
      map: {
        enumerable: true,
        get() {
          return this.uniforms.map.value;
        },
        set(value) {
          this.uniforms.map.value = value;
        }
      },
      useMap: {
        enumerable: true,
        get() {
          return this.uniforms.useMap.value;
        },
        set(value) {
          this.uniforms.useMap.value = value;
        }
      },
      alphaMap: {
        enumerable: true,
        get() {
          return this.uniforms.alphaMap.value;
        },
        set(value) {
          this.uniforms.alphaMap.value = value;
        }
      },
      useAlphaMap: {
        enumerable: true,
        get() {
          return this.uniforms.useAlphaMap.value;
        },
        set(value) {
          this.uniforms.useAlphaMap.value = value;
        }
      },
      color: {
        enumerable: true,
        get() {
          return this.uniforms.color.value;
        },
        set(value) {
          this.uniforms.color.value = value;
        }
      },
      gradient: {
        enumerable: true,
        get() {
          return this.uniforms.gradient.value;
        },
        set(value) {
          this.uniforms.gradient.value = value;
        }
      },
      opacity: {
        enumerable: true,
        get() {
          return this.uniforms.opacity.value;
        },
        set(value) {
          this.uniforms.opacity.value = value;
        }
      },
      resolution: {
        enumerable: true,
        get() {
          return this.uniforms.resolution.value;
        },
        set(value) {
          this.uniforms.resolution.value.copy(value);
        }
      },
      sizeAttenuation: {
        enumerable: true,
        get() {
          return this.uniforms.sizeAttenuation.value;
        },
        set(value) {
          this.uniforms.sizeAttenuation.value = value;
        }
      },
      dashArray: {
        enumerable: true,
        get() {
          return this.uniforms.dashArray.value;
        },
        set(value) {
          this.uniforms.dashArray.value = value;
          this.useDash = value !== 0 ? 1 : 0;
        }
      },
      dashOffset: {
        enumerable: true,
        get() {
          return this.uniforms.dashOffset.value;
        },
        set(value) {
          this.uniforms.dashOffset.value = value;
        }
      },
      dashRatio: {
        enumerable: true,
        get() {
          return this.uniforms.dashRatio.value;
        },
        set(value) {
          this.uniforms.dashRatio.value = value;
        }
      },
      useDash: {
        enumerable: true,
        get() {
          return this.uniforms.useDash.value;
        },
        set(value) {
          this.uniforms.useDash.value = value;
        }
      },
      useGradient: {
        enumerable: true,
        get() {
          return this.uniforms.useGradient.value;
        },
        set(value) {
          this.uniforms.useGradient.value = value;
        }
      },
      visibility: {
        enumerable: true,
        get() {
          return this.uniforms.visibility.value;
        },
        set(value) {
          this.uniforms.visibility.value = value;
        }
      },
      alphaTest: {
        enumerable: true,
        get() {
          return this.uniforms.alphaTest.value;
        },
        set(value) {
          this.uniforms.alphaTest.value = value;
        }
      },
      repeat: {
        enumerable: true,
        get() {
          return this.uniforms.repeat.value;
        },
        set(value) {
          this.uniforms.repeat.value.copy(value);
        }
      }
    });
    this.setValues(parameters);
  }
  copy(source) {
    super.copy(source);
    this.lineWidth = source.lineWidth;
    this.map = source.map;
    this.useMap = source.useMap;
    this.alphaMap = source.alphaMap;
    this.useAlphaMap = source.useAlphaMap;
    this.color.copy(source.color);
    this.gradient = source.gradient;
    this.opacity = source.opacity;
    this.resolution.copy(source.resolution);
    this.sizeAttenuation = source.sizeAttenuation;
    this.dashArray = source.dashArray;
    this.dashOffset = source.dashOffset;
    this.dashRatio = source.dashRatio;
    this.useDash = source.useDash;
    this.useGradient = source.useGradient;
    this.visibility = source.visibility;
    this.alphaTest = source.alphaTest;
    this.repeat.copy(source.repeat);
    return this;
  }
};

// node_modules/stats-gl/dist/panel.js
var Panel = class {
  constructor(name, fg, bg) {
    this.name = name;
    this.fg = fg;
    this.bg = bg;
    this.gradient = null;
    this.PR = Math.round(window.devicePixelRatio || 1);
    this.WIDTH = 90 * this.PR;
    this.HEIGHT = 48 * this.PR;
    this.TEXT_X = 3 * this.PR;
    this.TEXT_Y = 2 * this.PR;
    this.GRAPH_X = 3 * this.PR;
    this.GRAPH_Y = 15 * this.PR;
    this.GRAPH_WIDTH = 84 * this.PR;
    this.GRAPH_HEIGHT = 30 * this.PR;
    this.canvas = document.createElement("canvas");
    this.canvas.width = this.WIDTH;
    this.canvas.height = this.HEIGHT;
    this.canvas.style.width = "90px";
    this.canvas.style.height = "48px";
    this.canvas.style.position = "absolute";
    this.canvas.style.cssText = "width:90px;height:48px";
    this.context = this.canvas.getContext("2d");
    this.initializeCanvas();
  }
  createGradient() {
    if (!this.context)
      throw new Error("No context");
    const gradient = this.context.createLinearGradient(
      0,
      this.GRAPH_Y,
      0,
      this.GRAPH_Y + this.GRAPH_HEIGHT
    );
    let startColor;
    const endColor = this.fg;
    switch (this.fg.toLowerCase()) {
      case "#0ff":
        startColor = "#006666";
        break;
      case "#0f0":
        startColor = "#006600";
        break;
      case "#ff0":
        startColor = "#666600";
        break;
      case "#e1e1e1":
        startColor = "#666666";
        break;
      default:
        startColor = this.bg;
        break;
    }
    gradient.addColorStop(0, startColor);
    gradient.addColorStop(1, endColor);
    return gradient;
  }
  initializeCanvas() {
    if (!this.context)
      return;
    this.context.font = "bold " + 9 * this.PR + "px Helvetica,Arial,sans-serif";
    this.context.textBaseline = "top";
    this.gradient = this.createGradient();
    this.context.fillStyle = this.bg;
    this.context.fillRect(0, 0, this.WIDTH, this.HEIGHT);
    this.context.fillStyle = this.fg;
    this.context.fillText(this.name, this.TEXT_X, this.TEXT_Y);
    this.context.fillStyle = this.fg;
    this.context.fillRect(this.GRAPH_X, this.GRAPH_Y, this.GRAPH_WIDTH, this.GRAPH_HEIGHT);
    this.context.fillStyle = this.bg;
    this.context.globalAlpha = 0.9;
    this.context.fillRect(this.GRAPH_X, this.GRAPH_Y, this.GRAPH_WIDTH, this.GRAPH_HEIGHT);
  }
  update(value, valueGraph, maxValue, maxGraph, decimals = 0) {
    if (!this.context || !this.gradient)
      return;
    const min = Math.min(Infinity, value);
    const max = Math.max(maxValue, value);
    maxGraph = Math.max(maxGraph, valueGraph);
    this.context.globalAlpha = 1;
    this.context.fillStyle = this.bg;
    this.context.fillRect(0, 0, this.WIDTH, this.GRAPH_Y);
    this.context.fillStyle = this.fg;
    this.context.fillText(
      `${value.toFixed(decimals)} ${this.name} (${min.toFixed(decimals)}-${parseFloat(
        max.toFixed(decimals)
      )})`,
      this.TEXT_X,
      this.TEXT_Y
    );
    this.context.drawImage(
      this.canvas,
      this.GRAPH_X + this.PR,
      this.GRAPH_Y,
      this.GRAPH_WIDTH - this.PR,
      this.GRAPH_HEIGHT,
      this.GRAPH_X,
      this.GRAPH_Y,
      this.GRAPH_WIDTH - this.PR,
      this.GRAPH_HEIGHT
    );
    const columnHeight = this.GRAPH_HEIGHT - (1 - valueGraph / maxGraph) * this.GRAPH_HEIGHT;
    if (columnHeight > 0) {
      this.context.globalAlpha = 1;
      this.context.fillStyle = this.gradient;
      this.context.fillRect(
        this.GRAPH_X + this.GRAPH_WIDTH - this.PR,
        this.GRAPH_Y + this.GRAPH_HEIGHT - columnHeight,
        this.PR,
        columnHeight
      );
    }
  }
};

// node_modules/stats-gl/dist/main.js
var _Stats = class _Stats2 {
  constructor({
    trackGPU = false,
    logsPerSecond = 30,
    samplesLog = 60,
    samplesGraph = 10,
    precision = 2,
    minimal = false,
    horizontal = true,
    mode = 0
  } = {}) {
    this.gl = null;
    this.ext = null;
    this.activeQuery = null;
    this.gpuQueries = [];
    this.threeRendererPatched = false;
    this.frames = 0;
    this.renderCount = 0;
    this.isRunningCPUProfiling = false;
    this.totalCpuDuration = 0;
    this.totalGpuDuration = 0;
    this.totalGpuDurationCompute = 0;
    this.totalFps = 0;
    this.gpuPanel = null;
    this.gpuPanelCompute = null;
    this.averageFps = { logs: [], graph: [] };
    this.averageCpu = { logs: [], graph: [] };
    this.averageGpu = { logs: [], graph: [] };
    this.averageGpuCompute = { logs: [], graph: [] };
    this.handleClick = (event) => {
      event.preventDefault();
      this.showPanel(++this.mode % this.dom.children.length);
    };
    this.handleResize = () => {
      this.resizePanel(this.fpsPanel, 0);
      this.resizePanel(this.msPanel, 1);
      if (this.gpuPanel)
        this.resizePanel(this.gpuPanel, 2);
      if (this.gpuPanelCompute)
        this.resizePanel(this.gpuPanelCompute, 3);
    };
    this.mode = mode;
    this.horizontal = horizontal;
    this.minimal = minimal;
    this.trackGPU = trackGPU;
    this.samplesLog = samplesLog;
    this.samplesGraph = samplesGraph;
    this.precision = precision;
    this.logsPerSecond = logsPerSecond;
    this.dom = document.createElement("div");
    this.initializeDOM();
    this.beginTime = performance.now();
    this.prevTime = this.beginTime;
    this.prevCpuTime = this.beginTime;
    this.fpsPanel = this.addPanel(new _Stats2.Panel("FPS", "#0ff", "#002"), 0);
    this.msPanel = this.addPanel(new _Stats2.Panel("CPU", "#0f0", "#020"), 1);
    this.setupEventListeners();
  }
  initializeDOM() {
    this.dom.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      opacity: 0.9;
      z-index: 10000;
      ${this.minimal ? "cursor: pointer;" : ""}
    `;
  }
  setupEventListeners() {
    if (this.minimal) {
      this.dom.addEventListener("click", this.handleClick);
      this.showPanel(this.mode);
    } else {
      window.addEventListener("resize", this.handleResize);
    }
  }
  async init(canvasOrGL) {
    if (!canvasOrGL) {
      console.error('Stats: The "canvas" parameter is undefined.');
      return;
    }
    if (this.handleThreeRenderer(canvasOrGL))
      return;
    if (await this.handleWebGPURenderer(canvasOrGL))
      return;
    if (!this.initializeWebGL(canvasOrGL))
      return;
  }
  handleThreeRenderer(renderer) {
    if (renderer.isWebGLRenderer && !this.threeRendererPatched) {
      this.patchThreeRenderer(renderer);
      this.gl = renderer.getContext();
      if (this.trackGPU) {
        this.initializeGPUTracking();
      }
      return true;
    }
    return false;
  }
  async handleWebGPURenderer(renderer) {
    if (renderer.isWebGPURenderer) {
      if (this.trackGPU) {
        renderer.backend.trackTimestamp = true;
        if (await renderer.hasFeatureAsync("timestamp-query")) {
          this.initializeWebGPUPanels();
        }
      }
      this.info = renderer.info;
      return true;
    }
    return false;
  }
  initializeWebGPUPanels() {
    this.gpuPanel = this.addPanel(new _Stats2.Panel("GPU", "#ff0", "#220"), 2);
    this.gpuPanelCompute = this.addPanel(
      new _Stats2.Panel("CPT", "#e1e1e1", "#212121"),
      3
    );
  }
  initializeWebGL(canvasOrGL) {
    if (canvasOrGL instanceof WebGL2RenderingContext) {
      this.gl = canvasOrGL;
    } else if (canvasOrGL instanceof HTMLCanvasElement || canvasOrGL instanceof OffscreenCanvas) {
      this.gl = canvasOrGL.getContext("webgl2");
      if (!this.gl) {
        console.error("Stats: Unable to obtain WebGL2 context.");
        return false;
      }
    } else {
      console.error(
        "Stats: Invalid input type. Expected WebGL2RenderingContext, HTMLCanvasElement, or OffscreenCanvas."
      );
      return false;
    }
    return true;
  }
  initializeGPUTracking() {
    if (this.gl) {
      this.ext = this.gl.getExtension("EXT_disjoint_timer_query_webgl2");
      if (this.ext) {
        this.gpuPanel = this.addPanel(new _Stats2.Panel("GPU", "#ff0", "#220"), 2);
      }
    }
  }
  begin() {
    if (!this.isRunningCPUProfiling) {
      this.beginProfiling("cpu-started");
    }
    if (!this.gl || !this.ext)
      return;
    if (this.activeQuery) {
      this.gl.endQuery(this.ext.TIME_ELAPSED_EXT);
    }
    this.activeQuery = this.gl.createQuery();
    if (this.activeQuery) {
      this.gl.beginQuery(this.ext.TIME_ELAPSED_EXT, this.activeQuery);
    }
  }
  end() {
    this.renderCount++;
    if (this.gl && this.ext && this.activeQuery) {
      this.gl.endQuery(this.ext.TIME_ELAPSED_EXT);
      this.gpuQueries.push({ query: this.activeQuery });
      this.activeQuery = null;
    }
  }
  update() {
    if (!this.info) {
      this.processGpuQueries();
    } else {
      this.processWebGPUTimestamps();
    }
    this.endProfiling("cpu-started", "cpu-finished", "cpu-duration");
    this.updateAverages();
    this.resetCounters();
  }
  processWebGPUTimestamps() {
    this.totalGpuDuration = this.info.render.timestamp;
    this.totalGpuDurationCompute = this.info.compute.timestamp;
    this.addToAverage(this.totalGpuDurationCompute, this.averageGpuCompute);
  }
  updateAverages() {
    this.addToAverage(this.totalCpuDuration, this.averageCpu);
    this.addToAverage(this.totalGpuDuration, this.averageGpu);
  }
  resetCounters() {
    this.renderCount = 0;
    if (this.totalCpuDuration === 0) {
      this.beginProfiling("cpu-started");
    }
    this.totalCpuDuration = 0;
    this.totalFps = 0;
    this.beginTime = this.endInternal();
  }
  resizePanel(panel, offset) {
    panel.canvas.style.position = "absolute";
    if (this.minimal) {
      panel.canvas.style.display = "none";
    } else {
      panel.canvas.style.display = "block";
      if (this.horizontal) {
        panel.canvas.style.top = "0px";
        panel.canvas.style.left = offset * panel.WIDTH / panel.PR + "px";
      } else {
        panel.canvas.style.left = "0px";
        panel.canvas.style.top = offset * panel.HEIGHT / panel.PR + "px";
      }
    }
  }
  addPanel(panel, offset) {
    if (panel.canvas) {
      this.dom.appendChild(panel.canvas);
      this.resizePanel(panel, offset);
    }
    return panel;
  }
  showPanel(id) {
    for (let i2 = 0; i2 < this.dom.children.length; i2++) {
      const child = this.dom.children[i2];
      child.style.display = i2 === id ? "block" : "none";
    }
    this.mode = id;
  }
  processGpuQueries() {
    if (!this.gl || !this.ext)
      return;
    this.totalGpuDuration = 0;
    this.gpuQueries.forEach((queryInfo, index2) => {
      if (this.gl) {
        const available = this.gl.getQueryParameter(queryInfo.query, this.gl.QUERY_RESULT_AVAILABLE);
        const disjoint = this.gl.getParameter(this.ext.GPU_DISJOINT_EXT);
        if (available && !disjoint) {
          const elapsed = this.gl.getQueryParameter(queryInfo.query, this.gl.QUERY_RESULT);
          const duration = elapsed * 1e-6;
          this.totalGpuDuration += duration;
          this.gl.deleteQuery(queryInfo.query);
          this.gpuQueries.splice(index2, 1);
        }
      }
    });
  }
  endInternal() {
    this.frames++;
    const time = (performance || Date).now();
    const elapsed = time - this.prevTime;
    if (time >= this.prevCpuTime + 1e3 / this.logsPerSecond) {
      const fps = Math.round(this.frames * 1e3 / elapsed);
      this.addToAverage(fps, this.averageFps);
      this.updatePanel(this.fpsPanel, this.averageFps, 0);
      this.updatePanel(this.msPanel, this.averageCpu, this.precision);
      this.updatePanel(this.gpuPanel, this.averageGpu, this.precision);
      if (this.gpuPanelCompute) {
        this.updatePanel(this.gpuPanelCompute, this.averageGpuCompute);
      }
      this.frames = 0;
      this.prevCpuTime = time;
      this.prevTime = time;
    }
    return time;
  }
  addToAverage(value, averageArray) {
    averageArray.logs.push(value);
    if (averageArray.logs.length > this.samplesLog) {
      averageArray.logs.shift();
    }
    averageArray.graph.push(value);
    if (averageArray.graph.length > this.samplesGraph) {
      averageArray.graph.shift();
    }
  }
  beginProfiling(marker) {
    if (window.performance) {
      window.performance.mark(marker);
      this.isRunningCPUProfiling = true;
    }
  }
  endProfiling(startMarker, endMarker, measureName) {
    if (window.performance && endMarker && this.isRunningCPUProfiling) {
      window.performance.mark(endMarker);
      const cpuMeasure = performance.measure(measureName, startMarker, endMarker);
      this.totalCpuDuration += cpuMeasure.duration;
      this.isRunningCPUProfiling = false;
    }
  }
  updatePanel(panel, averageArray, precision = 2) {
    if (averageArray.logs.length > 0) {
      let sumLog = 0;
      let max = 0.01;
      for (let i2 = 0; i2 < averageArray.logs.length; i2++) {
        sumLog += averageArray.logs[i2];
        if (averageArray.logs[i2] > max) {
          max = averageArray.logs[i2];
        }
      }
      let sumGraph = 0;
      let maxGraph = 0.01;
      for (let i2 = 0; i2 < averageArray.graph.length; i2++) {
        sumGraph += averageArray.graph[i2];
        if (averageArray.graph[i2] > maxGraph) {
          maxGraph = averageArray.graph[i2];
        }
      }
      if (panel) {
        panel.update(sumLog / Math.min(averageArray.logs.length, this.samplesLog), sumGraph / Math.min(averageArray.graph.length, this.samplesGraph), max, maxGraph, precision);
      }
    }
  }
  get domElement() {
    return this.dom;
  }
  patchThreeRenderer(renderer) {
    const originalRenderMethod = renderer.render;
    const statsInstance = this;
    renderer.render = function(scene, camera) {
      statsInstance.begin();
      originalRenderMethod.call(this, scene, camera);
      statsInstance.end();
    };
    this.threeRendererPatched = true;
  }
};
_Stats.Panel = Panel;
var Stats = _Stats;

// node_modules/detect-gpu/dist/detect-gpu.esm.js
function e(e2, t2, r2, n2) {
  return new (r2 || (r2 = Promise))((function(o2, a5) {
    function i2(e3) {
      try {
        d2(n2.next(e3));
      } catch (e4) {
        a5(e4);
      }
    }
    function c2(e3) {
      try {
        d2(n2.throw(e3));
      } catch (e4) {
        a5(e4);
      }
    }
    function d2(e3) {
      var t3;
      e3.done ? o2(e3.value) : (t3 = e3.value, t3 instanceof r2 ? t3 : new r2((function(e4) {
        e4(t3);
      }))).then(i2, c2);
    }
    d2((n2 = n2.apply(e2, t2 || [])).next());
  }));
}
var t = ["geforce 320m", "geforce 8600", "geforce 8600m gt", "geforce 8800 gs", "geforce 8800 gt", "geforce 9400", "geforce 9400m g", "geforce 9400m", "geforce 9600m gt", "geforce 9600m", "geforce fx go5200", "geforce gt 120", "geforce gt 130", "geforce gt 330m", "geforce gtx 285", "google swiftshader", "intel g41", "intel g45", "intel gma 4500mhd", "intel gma x3100", "intel hd 3000", "intel q45", "legacy", "mali-2", "mali-3", "mali-4", "quadro fx 1500", "quadro fx 4", "quadro fx 5", "radeon hd 2400", "radeon hd 2600", "radeon hd 4670", "radeon hd 4850", "radeon hd 4870", "radeon hd 5670", "radeon hd 5750", "radeon hd 6290", "radeon hd 6300", "radeon hd 6310", "radeon hd 6320", "radeon hd 6490m", "radeon hd 6630m", "radeon hd 6750m", "radeon hd 6770m", "radeon hd 6970m", "sgx 543", "sgx543"];
function r(e2) {
  return e2 = e2.toLowerCase().replace(/.*angle ?\((.+)\)(?: on vulkan [0-9.]+)?$/i, "$1").replace(/\s(\d{1,2}gb|direct3d.+$)|\(r\)| \([^)]+\)$/g, "").replace(/(?:vulkan|opengl) \d+\.\d+(?:\.\d+)?(?: \((.*)\))?/, "$1");
}
var n = "undefined" == typeof window;
var o = (() => {
  if (n) return;
  const { userAgent: e2, platform: t2, maxTouchPoints: r2 } = window.navigator, o2 = /(iphone|ipod|ipad)/i.test(e2), a5 = "iPad" === t2 || "MacIntel" === t2 && r2 > 0 && !window.MSStream;
  return { isIpad: a5, isMobile: /android/i.test(e2) || o2 || a5, isSafari12: /Version\/12.+Safari/.test(e2), isFirefox: /Firefox/.test(e2) };
})();
function a(e2, t2, r2) {
  if (!r2) return [t2];
  const n2 = (function(e3) {
    const t3 = "\n    precision highp float;\n    attribute vec3 aPosition;\n    varying float vvv;\n    void main() {\n      vvv = 0.31622776601683794;\n      gl_Position = vec4(aPosition, 1.0);\n    }\n  ", r3 = "\n    precision highp float;\n    varying float vvv;\n    void main() {\n      vec4 enc = vec4(1.0, 255.0, 65025.0, 16581375.0) * vvv;\n      enc = fract(enc);\n      enc -= enc.yzww * vec4(1.0 / 255.0, 1.0 / 255.0, 1.0 / 255.0, 0.0);\n      gl_FragColor = enc;\n    }\n  ", n3 = e3.createShader(35633), o2 = e3.createShader(35632), a6 = e3.createProgram();
    if (!(o2 && n3 && a6)) return;
    e3.shaderSource(n3, t3), e3.shaderSource(o2, r3), e3.compileShader(n3), e3.compileShader(o2), e3.attachShader(a6, n3), e3.attachShader(a6, o2), e3.linkProgram(a6), e3.detachShader(a6, n3), e3.detachShader(a6, o2), e3.deleteShader(n3), e3.deleteShader(o2), e3.useProgram(a6);
    const i3 = e3.createBuffer();
    e3.bindBuffer(34962, i3), e3.bufferData(34962, new Float32Array([-1, -1, 0, 3, -1, 0, -1, 3, 0]), 35044);
    const c5 = e3.getAttribLocation(a6, "aPosition");
    e3.vertexAttribPointer(c5, 3, 5126, false, 0, 0), e3.enableVertexAttribArray(c5), e3.clearColor(1, 1, 1, 1), e3.clear(16384), e3.viewport(0, 0, 1, 1), e3.drawArrays(4, 0, 3);
    const d3 = new Uint8Array(4);
    return e3.readPixels(0, 0, 1, 1, 6408, 5121, d3), e3.deleteProgram(a6), e3.deleteBuffer(i3), d3.join("");
  })(e2), a5 = "801621810", i2 = "8016218135", c2 = "80162181161", d2 = (null == o ? void 0 : o.isIpad) ? [["a7", c2, 12], ["a8", i2, 15], ["a8x", i2, 15], ["a9", i2, 15], ["a9x", i2, 15], ["a10", i2, 15], ["a10x", i2, 15], ["a12", a5, 15], ["a12x", a5, 15], ["a12z", a5, 15], ["a14", a5, 15], ["a15", a5, 15], ["m1", a5, 15], ["m2", a5, 15]] : [["a7", c2, 12], ["a8", i2, 12], ["a9", i2, 15], ["a10", i2, 15], ["a11", a5, 15], ["a12", a5, 15], ["a13", a5, 15], ["a14", a5, 15], ["a15", a5, 15], ["a16", a5, 15], ["a17", a5, 15]];
  let l2;
  "80162181255" === n2 ? l2 = d2.filter((([, , e3]) => e3 >= 14)) : (l2 = d2.filter((([, e3]) => e3 === n2)), l2.length || (l2 = d2));
  return l2.map((([e3]) => `apple ${e3} gpu`));
}
var i = class extends Error {
  constructor(e2) {
    super(e2), Object.setPrototypeOf(this, new.target.prototype);
  }
};
var c = [];
var d = [];
function l(e2, t2) {
  if (e2 === t2) return 0;
  const r2 = e2;
  e2.length > t2.length && (e2 = t2, t2 = r2);
  let n2 = e2.length, o2 = t2.length;
  for (; n2 > 0 && e2.charCodeAt(~-n2) === t2.charCodeAt(~-o2); ) n2--, o2--;
  let a5, i2 = 0;
  for (; i2 < n2 && e2.charCodeAt(i2) === t2.charCodeAt(i2); ) i2++;
  if (n2 -= i2, o2 -= i2, 0 === n2) return o2;
  let l2, s2, f2 = 0, u = 0, g = 0;
  for (; u < n2; ) d[u] = e2.charCodeAt(i2 + u), c[u] = ++u;
  for (; g < o2; ) for (a5 = t2.charCodeAt(i2 + g), l2 = g++, f2 = g, u = 0; u < n2; u++) s2 = a5 === d[u] ? l2 : l2 + 1, l2 = c[u], f2 = c[u] = l2 > f2 ? s2 > f2 ? f2 + 1 : s2 : s2 > l2 ? l2 + 1 : s2;
  return f2;
}
function s(e2) {
  return null != e2;
}
var f = ({ mobileTiers: c2 = [0, 15, 30, 60], desktopTiers: d2 = [0, 15, 30, 60], override: f2 = {}, glContext: u, failIfMajorPerformanceCaveat: g = false, benchmarksURL: h = "https://unpkg.com/detect-gpu@5.0.70/dist/benchmarks" } = {}) => e(void 0, void 0, void 0, (function* () {
  const p2 = {};
  if (n) return { tier: 0, type: "SSR" };
  const { isIpad: m = !!(null == o ? void 0 : o.isIpad), isMobile: v = !!(null == o ? void 0 : o.isMobile), screenSize: w = window.screen, loadBenchmarks: x = ((t2) => e(void 0, void 0, void 0, (function* () {
    const e2 = yield fetch(`${h}/${t2}`).then(((e3) => e3.json()));
    if (parseInt(e2.shift().split(".")[0], 10) < 4) throw new i("Detect GPU benchmark data is out of date. Please update to version 4x");
    return e2;
  }))) } = f2;
  let { renderer: A } = f2;
  const P = (e2, t2, r2, n2, o2) => ({ device: o2, fps: n2, gpu: r2, isMobile: v, tier: e2, type: t2 });
  let S, b = "";
  if (A) A = r(A), S = [A];
  else {
    const e2 = u || (function(e3, t3 = false) {
      const r2 = { alpha: false, antialias: false, depth: false, failIfMajorPerformanceCaveat: t3, powerPreference: "high-performance", stencil: false };
      e3 && delete r2.powerPreference;
      const n2 = window.document.createElement("canvas"), o2 = n2.getContext("webgl", r2) || n2.getContext("experimental-webgl", r2);
      return null != o2 ? o2 : void 0;
    })(null == o ? void 0 : o.isSafari12, g);
    if (!e2) return P(0, "WEBGL_UNSUPPORTED");
    const t2 = (null == o ? void 0 : o.isFirefox) ? null : e2.getExtension("WEBGL_debug_renderer_info");
    if (A = t2 ? e2.getParameter(t2.UNMASKED_RENDERER_WEBGL) : e2.getParameter(e2.RENDERER), !A) return P(1, "FALLBACK");
    b = A, A = r(A), S = (function(e3, t3, r2) {
      return "apple gpu" === t3 ? a(e3, t3, r2) : [t3];
    })(e2, A, v);
  }
  const E = (yield Promise.all(S.map((function(t2) {
    var r2;
    return e(this, void 0, void 0, (function* () {
      const e2 = ((e3) => {
        const t3 = v ? ["adreno", "apple", "mali-t", "mali", "nvidia", "powervr", "samsung"] : ["intel", "apple", "amd", "radeon", "nvidia", "geforce", "adreno"];
        for (const r3 of t3) if (e3.includes(r3)) return r3;
      })(t2);
      if (!e2) return;
      const n2 = `${v ? "m" : "d"}-${e2}${m ? "-ipad" : ""}.json`, o2 = p2[n2] = null !== (r2 = p2[n2]) && void 0 !== r2 ? r2 : x(n2);
      let a5;
      try {
        a5 = yield o2;
      } catch (e3) {
        if (e3 instanceof i) throw e3;
        return;
      }
      const c5 = (function(e3) {
        var t3;
        const r3 = (e3 = e3.replace(/\([^)]+\)/, "")).match(/\d+/) || e3.match(/(\W|^)([A-Za-z]{1,3})(\W|$)/g);
        return null !== (t3 = null == r3 ? void 0 : r3.join("").replace(/\W|amd/g, "")) && void 0 !== t3 ? t3 : "";
      })(t2);
      let d3 = a5.filter((([, e3]) => e3 === c5));
      d3.length || (d3 = a5.filter((([e3]) => e3.includes(t2))));
      const s2 = d3.length;
      if (0 === s2) return;
      const f3 = t2.split(/[.,()\[\]/\s]/g).sort().filter(((e3, t3, r3) => 0 === t3 || e3 !== r3[t3 - 1])).join(" ");
      let u2, [g2, , , , h2] = s2 > 1 ? d3.map(((e3) => [e3, l(f3, e3[2])])).sort((([, e3], [, t3]) => e3 - t3))[0][0] : d3[0], A2 = Number.MAX_VALUE;
      const { devicePixelRatio: P2 } = window, S2 = w.width * P2 * w.height * P2;
      for (const e3 of h2) {
        const [t3, r3] = e3, n3 = t3 * r3, o3 = Math.abs(S2 - n3);
        o3 < A2 && (A2 = o3, u2 = e3);
      }
      if (!u2) return;
      const [, , b5, E2] = u2;
      return [A2, b5, g2, E2];
    }));
  })))).filter(s).sort((([e2 = Number.MAX_VALUE, t2], [r2 = Number.MAX_VALUE, n2]) => e2 === r2 ? t2 - n2 : e2 - r2));
  if (!E.length) {
    const e2 = t.find(((e3) => A.includes(e3)));
    return e2 ? P(0, "BLOCKLISTED", e2) : P(1, "FALLBACK", `${A} (${b})`);
  }
  const [, y, C, L] = E[0];
  if (-1 === y) return P(0, "BLOCKLISTED", C, y, L);
  const M = v ? c2 : d2;
  let $ = 0;
  for (let e2 = 0; e2 < M.length; e2++) y >= M[e2] && ($ = e2);
  return P($, "BENCHMARK", C, y, L);
}));

// node_modules/@monogrid/gainmap-js/dist/QuadRenderer-DuOPRGA4.js
var getBufferForType = (type, width, height) => {
  let out7;
  switch (type) {
    case UnsignedByteType:
      out7 = new Uint8ClampedArray(width * height * 4);
      break;
    case HalfFloatType:
      out7 = new Uint16Array(width * height * 4);
      break;
    case UnsignedIntType:
      out7 = new Uint32Array(width * height * 4);
      break;
    case ByteType:
      out7 = new Int8Array(width * height * 4);
      break;
    case ShortType:
      out7 = new Int16Array(width * height * 4);
      break;
    case IntType:
      out7 = new Int32Array(width * height * 4);
      break;
    case FloatType:
      out7 = new Float32Array(width * height * 4);
      break;
    default:
      throw new Error("Unsupported data type");
  }
  return out7;
};
var _canReadPixelsResult;
var canReadPixels = (type, renderer, camera, renderTargetOptions) => {
  if (_canReadPixelsResult !== void 0)
    return _canReadPixelsResult;
  const testRT = new WebGLRenderTarget(1, 1, renderTargetOptions);
  renderer.setRenderTarget(testRT);
  const mesh = new Mesh(new PlaneGeometry(), new MeshBasicMaterial({ color: 16777215 }));
  renderer.render(mesh, camera);
  renderer.setRenderTarget(null);
  const out7 = getBufferForType(type, testRT.width, testRT.height);
  renderer.readRenderTargetPixels(testRT, 0, 0, testRT.width, testRT.height, out7);
  testRT.dispose();
  mesh.geometry.dispose();
  mesh.material.dispose();
  _canReadPixelsResult = out7[0] !== 0;
  return _canReadPixelsResult;
};
var QuadRenderer = class _QuadRenderer {
  /**
   * Constructs a new QuadRenderer
   *
   * @param options Parameters for this QuadRenderer
   */
  constructor(options) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
    this._rendererIsDisposable = false;
    this._supportsReadPixels = true;
    this.render = () => {
      this._renderer.setRenderTarget(this._renderTarget);
      try {
        this._renderer.render(this._scene, this._camera);
      } catch (e2) {
        this._renderer.setRenderTarget(null);
        throw e2;
      }
      this._renderer.setRenderTarget(null);
    };
    this._width = options.width;
    this._height = options.height;
    this._type = options.type;
    this._colorSpace = options.colorSpace;
    const rtOptions = {
      // fixed options
      format: RGBAFormat,
      depthBuffer: false,
      stencilBuffer: false,
      // user options
      type: this._type,
      // set in class property
      colorSpace: this._colorSpace,
      // set in class property
      anisotropy: ((_a = options.renderTargetOptions) === null || _a === void 0 ? void 0 : _a.anisotropy) !== void 0 ? (_b = options.renderTargetOptions) === null || _b === void 0 ? void 0 : _b.anisotropy : 1,
      generateMipmaps: ((_c = options.renderTargetOptions) === null || _c === void 0 ? void 0 : _c.generateMipmaps) !== void 0 ? (_d = options.renderTargetOptions) === null || _d === void 0 ? void 0 : _d.generateMipmaps : false,
      magFilter: ((_e = options.renderTargetOptions) === null || _e === void 0 ? void 0 : _e.magFilter) !== void 0 ? (_f = options.renderTargetOptions) === null || _f === void 0 ? void 0 : _f.magFilter : LinearFilter,
      minFilter: ((_g = options.renderTargetOptions) === null || _g === void 0 ? void 0 : _g.minFilter) !== void 0 ? (_h = options.renderTargetOptions) === null || _h === void 0 ? void 0 : _h.minFilter : LinearFilter,
      samples: ((_j = options.renderTargetOptions) === null || _j === void 0 ? void 0 : _j.samples) !== void 0 ? (_k = options.renderTargetOptions) === null || _k === void 0 ? void 0 : _k.samples : void 0,
      wrapS: ((_l = options.renderTargetOptions) === null || _l === void 0 ? void 0 : _l.wrapS) !== void 0 ? (_m = options.renderTargetOptions) === null || _m === void 0 ? void 0 : _m.wrapS : ClampToEdgeWrapping,
      wrapT: ((_o = options.renderTargetOptions) === null || _o === void 0 ? void 0 : _o.wrapT) !== void 0 ? (_p = options.renderTargetOptions) === null || _p === void 0 ? void 0 : _p.wrapT : ClampToEdgeWrapping
    };
    this._material = options.material;
    if (options.renderer) {
      this._renderer = options.renderer;
    } else {
      this._renderer = _QuadRenderer.instantiateRenderer();
      this._rendererIsDisposable = true;
    }
    this._scene = new Scene();
    this._camera = new OrthographicCamera();
    this._camera.position.set(0, 0, 10);
    this._camera.left = -0.5;
    this._camera.right = 0.5;
    this._camera.top = 0.5;
    this._camera.bottom = -0.5;
    this._camera.updateProjectionMatrix();
    if (!canReadPixels(this._type, this._renderer, this._camera, rtOptions)) {
      let alternativeType;
      switch (this._type) {
        case HalfFloatType:
          alternativeType = this._renderer.extensions.has("EXT_color_buffer_float") ? FloatType : void 0;
          break;
      }
      if (alternativeType !== void 0) {
        console.warn(`This browser does not support reading pixels from ${this._type} RenderTargets, switching to ${FloatType}`);
        this._type = alternativeType;
      } else {
        this._supportsReadPixels = false;
        console.warn("This browser dos not support toArray or toDataTexture, calls to those methods will result in an error thrown");
      }
    }
    this._quad = new Mesh(new PlaneGeometry(), this._material);
    this._quad.geometry.computeBoundingBox();
    this._scene.add(this._quad);
    this._renderTarget = new WebGLRenderTarget(this.width, this.height, rtOptions);
    this._renderTarget.texture.mapping = ((_q = options.renderTargetOptions) === null || _q === void 0 ? void 0 : _q.mapping) !== void 0 ? (_r = options.renderTargetOptions) === null || _r === void 0 ? void 0 : _r.mapping : UVMapping;
  }
  /**
   * Instantiates a temporary renderer
   *
   * @returns
   */
  static instantiateRenderer() {
    const renderer = new WebGLRenderer();
    renderer.setSize(128, 128);
    return renderer;
  }
  /**
   * Obtains a Buffer containing the rendered texture.
   *
   * @throws Error if the browser cannot read pixels from this RenderTarget type.
   * @returns a TypedArray containing RGBA values from this renderer
   */
  toArray() {
    if (!this._supportsReadPixels)
      throw new Error("Can't read pixels in this browser");
    const out7 = getBufferForType(this._type, this._width, this._height);
    this._renderer.readRenderTargetPixels(this._renderTarget, 0, 0, this._width, this._height, out7);
    return out7;
  }
  /**
   * Performs a readPixel operation in the renderTarget
   * and returns a DataTexture containing the read data
   *
   * @param options options
   * @returns
   */
  toDataTexture(options) {
    const returnValue = new DataTexture(
      // fixed values
      this.toArray(),
      this.width,
      this.height,
      RGBAFormat,
      this._type,
      // user values
      (options === null || options === void 0 ? void 0 : options.mapping) || UVMapping,
      (options === null || options === void 0 ? void 0 : options.wrapS) || ClampToEdgeWrapping,
      (options === null || options === void 0 ? void 0 : options.wrapT) || ClampToEdgeWrapping,
      (options === null || options === void 0 ? void 0 : options.magFilter) || LinearFilter,
      (options === null || options === void 0 ? void 0 : options.minFilter) || LinearFilter,
      (options === null || options === void 0 ? void 0 : options.anisotropy) || 1,
      // fixed value
      LinearSRGBColorSpace
    );
    returnValue.generateMipmaps = (options === null || options === void 0 ? void 0 : options.generateMipmaps) !== void 0 ? options === null || options === void 0 ? void 0 : options.generateMipmaps : false;
    return returnValue;
  }
  /**
   * If using a disposable renderer, it will dispose it.
   */
  disposeOnDemandRenderer() {
    this._renderer.setRenderTarget(null);
    if (this._rendererIsDisposable) {
      this._renderer.dispose();
      this._renderer.forceContextLoss();
    }
  }
  /**
   * Will dispose of **all** assets used by this renderer.
   *
   *
   * @param disposeRenderTarget will dispose of the renderTarget which will not be usable later
   * set this to true if you passed the `renderTarget.texture` to a `PMREMGenerator`
   * or are otherwise done with it.
   *
   * @example
   * ```js
   * const loader = new HDRJPGLoader(renderer)
   * const result = await loader.loadAsync('gainmap.jpeg')
   * const mesh = new Mesh(geometry, new MeshBasicMaterial({ map: result.renderTarget.texture }) )
   * // DO NOT dispose the renderTarget here,
   * // it is used directly in the material
   * result.dispose()
   * ```
   *
   * @example
   * ```js
   * const loader = new HDRJPGLoader(renderer)
   * const pmremGenerator = new PMREMGenerator( renderer );
   * const result = await loader.loadAsync('gainmap.jpeg')
   * const envMap = pmremGenerator.fromEquirectangular(result.renderTarget.texture)
   * const mesh = new Mesh(geometry, new MeshStandardMaterial({ envMap }) )
   * // renderTarget can be disposed here
   * // because it was used to generate a PMREM texture
   * result.dispose(true)
   * ```
   */
  dispose(disposeRenderTarget) {
    this.disposeOnDemandRenderer();
    if (disposeRenderTarget) {
      this.renderTarget.dispose();
    }
    if (this.material instanceof ShaderMaterial) {
      Object.values(this.material.uniforms).forEach((v) => {
        if (v.value instanceof Texture)
          v.value.dispose();
      });
    }
    Object.values(this.material).forEach((value) => {
      if (value instanceof Texture)
        value.dispose();
    });
    this.material.dispose();
    this._quad.geometry.dispose();
  }
  /**
   * Width of the texture
   */
  get width() {
    return this._width;
  }
  set width(value) {
    this._width = value;
    this._renderTarget.setSize(this._width, this._height);
  }
  /**
   * Height of the texture
   */
  get height() {
    return this._height;
  }
  set height(value) {
    this._height = value;
    this._renderTarget.setSize(this._width, this._height);
  }
  /**
   * The renderer used
   */
  get renderer() {
    return this._renderer;
  }
  /**
   * The `WebGLRenderTarget` used.
   */
  get renderTarget() {
    return this._renderTarget;
  }
  set renderTarget(value) {
    this._renderTarget = value;
    this._width = value.width;
    this._height = value.height;
  }
  /**
   * The `Material` used.
   */
  get material() {
    return this._material;
  }
  /**
   *
   */
  get type() {
    return this._type;
  }
  get colorSpace() {
    return this._colorSpace;
  }
};

// node_modules/@monogrid/gainmap-js/dist/decode.js
var vertexShader2 = (
  /* glsl */
  `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`
);
var fragmentShader2 = (
  /* glsl */
  `
// min half float value
#define HALF_FLOAT_MIN vec3( -65504, -65504, -65504 )
// max half float value
#define HALF_FLOAT_MAX vec3( 65504, 65504, 65504 )

uniform sampler2D sdr;
uniform sampler2D gainMap;
uniform vec3 gamma;
uniform vec3 offsetHdr;
uniform vec3 offsetSdr;
uniform vec3 gainMapMin;
uniform vec3 gainMapMax;
uniform float weightFactor;

varying vec2 vUv;

void main() {
  vec3 rgb = texture2D( sdr, vUv ).rgb;
  vec3 recovery = texture2D( gainMap, vUv ).rgb;
  vec3 logRecovery = pow( recovery, gamma );
  vec3 logBoost = gainMapMin * ( 1.0 - logRecovery ) + gainMapMax * logRecovery;
  vec3 hdrColor = (rgb + offsetSdr) * exp2( logBoost * weightFactor ) - offsetHdr;
  vec3 clampedHdrColor = max( HALF_FLOAT_MIN, min( HALF_FLOAT_MAX, hdrColor ));
  gl_FragColor = vec4( clampedHdrColor , 1.0 );
}
`
);
var GainMapDecoderMaterial = class extends ShaderMaterial {
  /**
   *
   * @param params
   */
  constructor({ gamma, offsetHdr, offsetSdr, gainMapMin, gainMapMax, maxDisplayBoost, hdrCapacityMin, hdrCapacityMax, sdr, gainMap }) {
    super({
      name: "GainMapDecoderMaterial",
      vertexShader: vertexShader2,
      fragmentShader: fragmentShader2,
      uniforms: {
        sdr: { value: sdr },
        gainMap: { value: gainMap },
        gamma: { value: new Vector3(1 / gamma[0], 1 / gamma[1], 1 / gamma[2]) },
        offsetHdr: { value: new Vector3().fromArray(offsetHdr) },
        offsetSdr: { value: new Vector3().fromArray(offsetSdr) },
        gainMapMin: { value: new Vector3().fromArray(gainMapMin) },
        gainMapMax: { value: new Vector3().fromArray(gainMapMax) },
        weightFactor: {
          value: (Math.log2(maxDisplayBoost) - hdrCapacityMin) / (hdrCapacityMax - hdrCapacityMin)
        }
      },
      blending: NoBlending,
      depthTest: false,
      depthWrite: false
    });
    this._maxDisplayBoost = maxDisplayBoost;
    this._hdrCapacityMin = hdrCapacityMin;
    this._hdrCapacityMax = hdrCapacityMax;
    this.needsUpdate = true;
    this.uniformsNeedUpdate = true;
  }
  get sdr() {
    return this.uniforms.sdr.value;
  }
  set sdr(value) {
    this.uniforms.sdr.value = value;
  }
  get gainMap() {
    return this.uniforms.gainMap.value;
  }
  set gainMap(value) {
    this.uniforms.gainMap.value = value;
  }
  /**
   * @see {@link GainMapMetadata.offsetHdr}
   */
  get offsetHdr() {
    return this.uniforms.offsetHdr.value.toArray();
  }
  set offsetHdr(value) {
    this.uniforms.offsetHdr.value.fromArray(value);
  }
  /**
   * @see {@link GainMapMetadata.offsetSdr}
   */
  get offsetSdr() {
    return this.uniforms.offsetSdr.value.toArray();
  }
  set offsetSdr(value) {
    this.uniforms.offsetSdr.value.fromArray(value);
  }
  /**
   * @see {@link GainMapMetadata.gainMapMin}
   */
  get gainMapMin() {
    return this.uniforms.gainMapMin.value.toArray();
  }
  set gainMapMin(value) {
    this.uniforms.gainMapMin.value.fromArray(value);
  }
  /**
   * @see {@link GainMapMetadata.gainMapMax}
   */
  get gainMapMax() {
    return this.uniforms.gainMapMax.value.toArray();
  }
  set gainMapMax(value) {
    this.uniforms.gainMapMax.value.fromArray(value);
  }
  /**
   * @see {@link GainMapMetadata.gamma}
   */
  get gamma() {
    const g = this.uniforms.gamma.value;
    return [1 / g.x, 1 / g.y, 1 / g.z];
  }
  set gamma(value) {
    const g = this.uniforms.gamma.value;
    g.x = 1 / value[0];
    g.y = 1 / value[1];
    g.z = 1 / value[2];
  }
  /**
   * @see {@link GainMapMetadata.hdrCapacityMin}
   * @remarks Logarithmic space
   */
  get hdrCapacityMin() {
    return this._hdrCapacityMin;
  }
  set hdrCapacityMin(value) {
    this._hdrCapacityMin = value;
    this.calculateWeight();
  }
  /**
   * @see {@link GainMapMetadata.hdrCapacityMin}
   * @remarks Logarithmic space
   */
  get hdrCapacityMax() {
    return this._hdrCapacityMax;
  }
  set hdrCapacityMax(value) {
    this._hdrCapacityMax = value;
    this.calculateWeight();
  }
  /**
   * @see {@link GainmapDecodingParameters.maxDisplayBoost}
   * @remarks Non Logarithmic space
   */
  get maxDisplayBoost() {
    return this._maxDisplayBoost;
  }
  set maxDisplayBoost(value) {
    this._maxDisplayBoost = Math.max(1, Math.min(65504, value));
    this.calculateWeight();
  }
  calculateWeight() {
    const val = (Math.log2(this._maxDisplayBoost) - this._hdrCapacityMin) / (this._hdrCapacityMax - this._hdrCapacityMin);
    this.uniforms.weightFactor.value = Math.max(0, Math.min(1, val));
  }
};
var GainMapNotFoundError = class extends Error {
};
var XMPMetadataNotFoundError = class extends Error {
};
var getXMLValue = (xml, tag, defaultValue) => {
  const attributeMatch = new RegExp(`${tag}="([^"]*)"`, "i").exec(xml);
  if (attributeMatch)
    return attributeMatch[1];
  const tagMatch = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, "i").exec(xml);
  if (tagMatch) {
    const liValues = tagMatch[1].match(/<rdf:li>([^<]*)<\/rdf:li>/g);
    if (liValues && liValues.length === 3) {
      return liValues.map((v) => v.replace(/<\/?rdf:li>/g, ""));
    }
    return tagMatch[1].trim();
  }
  if (defaultValue !== void 0)
    return defaultValue;
  throw new Error(`Can't find ${tag} in gainmap metadata`);
};
var extractXMP = (input) => {
  let str;
  if (typeof TextDecoder !== "undefined")
    str = new TextDecoder().decode(input);
  else
    str = input.toString();
  let start = str.indexOf("<x:xmpmeta");
  while (start !== -1) {
    const end = str.indexOf("x:xmpmeta>", start);
    const xmpBlock = str.slice(start, end + 10);
    try {
      const gainMapMin = getXMLValue(xmpBlock, "hdrgm:GainMapMin", "0");
      const gainMapMax = getXMLValue(xmpBlock, "hdrgm:GainMapMax");
      const gamma = getXMLValue(xmpBlock, "hdrgm:Gamma", "1");
      const offsetSDR = getXMLValue(xmpBlock, "hdrgm:OffsetSDR", "0.015625");
      const offsetHDR = getXMLValue(xmpBlock, "hdrgm:OffsetHDR", "0.015625");
      const hdrCapacityMinMatch = /hdrgm:HDRCapacityMin="([^"]*)"/.exec(xmpBlock);
      const hdrCapacityMin = hdrCapacityMinMatch ? hdrCapacityMinMatch[1] : "0";
      const hdrCapacityMaxMatch = /hdrgm:HDRCapacityMax="([^"]*)"/.exec(xmpBlock);
      if (!hdrCapacityMaxMatch)
        throw new Error("Incomplete gainmap metadata");
      const hdrCapacityMax = hdrCapacityMaxMatch[1];
      return {
        gainMapMin: Array.isArray(gainMapMin) ? gainMapMin.map((v) => parseFloat(v)) : [parseFloat(gainMapMin), parseFloat(gainMapMin), parseFloat(gainMapMin)],
        gainMapMax: Array.isArray(gainMapMax) ? gainMapMax.map((v) => parseFloat(v)) : [parseFloat(gainMapMax), parseFloat(gainMapMax), parseFloat(gainMapMax)],
        gamma: Array.isArray(gamma) ? gamma.map((v) => parseFloat(v)) : [parseFloat(gamma), parseFloat(gamma), parseFloat(gamma)],
        offsetSdr: Array.isArray(offsetSDR) ? offsetSDR.map((v) => parseFloat(v)) : [parseFloat(offsetSDR), parseFloat(offsetSDR), parseFloat(offsetSDR)],
        offsetHdr: Array.isArray(offsetHDR) ? offsetHDR.map((v) => parseFloat(v)) : [parseFloat(offsetHDR), parseFloat(offsetHDR), parseFloat(offsetHDR)],
        hdrCapacityMin: parseFloat(hdrCapacityMin),
        hdrCapacityMax: parseFloat(hdrCapacityMax)
      };
    } catch (e2) {
    }
    start = str.indexOf("<x:xmpmeta", end);
  }
};
var MPFExtractor = class {
  constructor(options) {
    this.options = {
      debug: options && options.debug !== void 0 ? options.debug : false,
      extractFII: options && options.extractFII !== void 0 ? options.extractFII : true,
      extractNonFII: options && options.extractNonFII !== void 0 ? options.extractNonFII : true
    };
  }
  extract(imageArrayBuffer) {
    return new Promise((resolve, reject) => {
      const debug = this.options.debug;
      const dataView = new DataView(imageArrayBuffer.buffer);
      if (dataView.getUint16(0) !== 65496) {
        reject(new Error("Not a valid jpeg"));
        return;
      }
      const length3 = dataView.byteLength;
      let offset = 2;
      let loops = 0;
      let marker;
      while (offset < length3) {
        if (++loops > 250) {
          reject(new Error(`Found no marker after ${loops} loops 😵`));
          return;
        }
        if (dataView.getUint8(offset) !== 255) {
          reject(new Error(`Not a valid marker at offset 0x${offset.toString(16)}, found: 0x${dataView.getUint8(offset).toString(16)}`));
          return;
        }
        marker = dataView.getUint8(offset + 1);
        if (debug)
          console.log(`Marker: ${marker.toString(16)}`);
        if (marker === 226) {
          if (debug)
            console.log("Found APP2 marker (0xffe2)");
          const formatPt = offset + 4;
          if (dataView.getUint32(formatPt) === 1297106432) {
            const tiffOffset = formatPt + 4;
            let bigEnd;
            if (dataView.getUint16(tiffOffset) === 18761) {
              bigEnd = false;
            } else if (dataView.getUint16(tiffOffset) === 19789) {
              bigEnd = true;
            } else {
              reject(new Error("No valid endianness marker found in TIFF header"));
              return;
            }
            if (dataView.getUint16(tiffOffset + 2, !bigEnd) !== 42) {
              reject(new Error("Not valid TIFF data! (no 0x002A marker)"));
              return;
            }
            const firstIFDOffset = dataView.getUint32(tiffOffset + 4, !bigEnd);
            if (firstIFDOffset < 8) {
              reject(new Error("Not valid TIFF data! (First offset less than 8)"));
              return;
            }
            const dirStart = tiffOffset + firstIFDOffset;
            const count = dataView.getUint16(dirStart, !bigEnd);
            const entriesStart = dirStart + 2;
            let numberOfImages = 0;
            for (let i2 = entriesStart; i2 < entriesStart + 12 * count; i2 += 12) {
              if (dataView.getUint16(i2, !bigEnd) === 45057) {
                numberOfImages = dataView.getUint32(i2 + 8, !bigEnd);
              }
            }
            const nextIFDOffsetLen = 4;
            const MPImageListValPt = dirStart + 2 + count * 12 + nextIFDOffsetLen;
            const images = [];
            for (let i2 = MPImageListValPt; i2 < MPImageListValPt + numberOfImages * 16; i2 += 16) {
              const image = {
                MPType: dataView.getUint32(i2, !bigEnd),
                size: dataView.getUint32(i2 + 4, !bigEnd),
                // This offset is specified relative to the address of the MP Endian
                // field in the MP Header, unless the image is a First Individual Image,
                // in which case the value of the offset shall be NULL (0x00000000).
                dataOffset: dataView.getUint32(i2 + 8, !bigEnd),
                dependantImages: dataView.getUint32(i2 + 12, !bigEnd),
                start: -1,
                end: -1,
                isFII: false
              };
              if (!image.dataOffset) {
                image.start = 0;
                image.isFII = true;
              } else {
                image.start = tiffOffset + image.dataOffset;
                image.isFII = false;
              }
              image.end = image.start + image.size;
              images.push(image);
            }
            if (this.options.extractNonFII && images.length) {
              const bufferBlob = new Blob([dataView]);
              const imgs = [];
              for (const image of images) {
                if (image.isFII && !this.options.extractFII) {
                  continue;
                }
                const imageBlob = bufferBlob.slice(image.start, image.end + 1, "image/jpeg");
                imgs.push(imageBlob);
              }
              resolve(imgs);
            }
          }
        }
        offset += 2 + dataView.getUint16(offset + 2);
      }
    });
  }
};
var extractGainmapFromJPEG = async (jpegFile) => {
  const metadata = extractXMP(jpegFile);
  if (!metadata)
    throw new XMPMetadataNotFoundError("Gain map XMP metadata not found");
  const mpfExtractor = new MPFExtractor({ extractFII: true, extractNonFII: true });
  const images = await mpfExtractor.extract(jpegFile);
  if (images.length !== 2)
    throw new GainMapNotFoundError("Gain map recovery image not found");
  return {
    sdr: new Uint8Array(await images[0].arrayBuffer()),
    gainMap: new Uint8Array(await images[1].arrayBuffer()),
    metadata
  };
};
var getHTMLImageFromBlob = (blob) => {
  return new Promise((resolve, reject) => {
    const img = document.createElement("img");
    img.onload = () => {
      resolve(img);
    };
    img.onerror = (e2) => {
      reject(e2);
    };
    img.src = URL.createObjectURL(blob);
  });
};
var LoaderBase = class extends Loader {
  /**
   *
   * @param renderer
   * @param manager
   */
  constructor(renderer, manager) {
    super(manager);
    if (renderer)
      this._renderer = renderer;
    this._internalLoadingManager = new LoadingManager();
  }
  /**
   * Specify the renderer to use when rendering the gain map
   *
   * @param renderer
   * @returns
   */
  setRenderer(renderer) {
    this._renderer = renderer;
    return this;
  }
  /**
   * Specify the renderTarget options to use when rendering the gain map
   *
   * @param options
   * @returns
   */
  setRenderTargetOptions(options) {
    this._renderTargetOptions = options;
    return this;
  }
  /**
   * @private
   * @returns
   */
  prepareQuadRenderer() {
    if (!this._renderer)
      console.warn("WARNING: An existing WebGL Renderer was not passed to this Loader constructor or in setRenderer, the result of this Loader will need to be converted to a Data Texture with toDataTexture() before you can use it in your renderer.");
    const material = new GainMapDecoderMaterial({
      gainMapMax: [1, 1, 1],
      gainMapMin: [0, 0, 0],
      gamma: [1, 1, 1],
      offsetHdr: [1, 1, 1],
      offsetSdr: [1, 1, 1],
      hdrCapacityMax: 1,
      hdrCapacityMin: 0,
      maxDisplayBoost: 1,
      gainMap: new Texture(),
      sdr: new Texture()
    });
    return new QuadRenderer({
      width: 16,
      height: 16,
      type: HalfFloatType,
      colorSpace: LinearSRGBColorSpace,
      material,
      renderer: this._renderer,
      renderTargetOptions: this._renderTargetOptions
    });
  }
  /**
  * @private
  * @param quadRenderer
  * @param metadata
  * @param sdrBuffer
  * @param gainMapBuffer
  */
  async render(quadRenderer, metadata, sdrBuffer, gainMapBuffer) {
    const gainMapBlob = gainMapBuffer ? new Blob([gainMapBuffer], { type: "image/jpeg" }) : void 0;
    const sdrBlob = new Blob([sdrBuffer], { type: "image/jpeg" });
    let sdrImage;
    let gainMapImage;
    let needsFlip = false;
    if (typeof createImageBitmap === "undefined") {
      const res = await Promise.all([
        gainMapBlob ? getHTMLImageFromBlob(gainMapBlob) : Promise.resolve(void 0),
        getHTMLImageFromBlob(sdrBlob)
      ]);
      gainMapImage = res[0];
      sdrImage = res[1];
      needsFlip = true;
    } else {
      const res = await Promise.all([
        gainMapBlob ? createImageBitmap(gainMapBlob, { imageOrientation: "flipY" }) : Promise.resolve(void 0),
        createImageBitmap(sdrBlob, { imageOrientation: "flipY" })
      ]);
      gainMapImage = res[0];
      sdrImage = res[1];
    }
    const gainMap = new Texture(gainMapImage || new ImageData(2, 2), UVMapping, ClampToEdgeWrapping, ClampToEdgeWrapping, LinearFilter, LinearMipMapLinearFilter, RGBAFormat, UnsignedByteType, 1, LinearSRGBColorSpace);
    gainMap.flipY = needsFlip;
    gainMap.needsUpdate = true;
    const sdr = new Texture(sdrImage, UVMapping, ClampToEdgeWrapping, ClampToEdgeWrapping, LinearFilter, LinearMipMapLinearFilter, RGBAFormat, UnsignedByteType, 1, SRGBColorSpace);
    sdr.flipY = needsFlip;
    sdr.needsUpdate = true;
    quadRenderer.width = sdrImage.width;
    quadRenderer.height = sdrImage.height;
    quadRenderer.material.gainMap = gainMap;
    quadRenderer.material.sdr = sdr;
    quadRenderer.material.gainMapMin = metadata.gainMapMin;
    quadRenderer.material.gainMapMax = metadata.gainMapMax;
    quadRenderer.material.offsetHdr = metadata.offsetHdr;
    quadRenderer.material.offsetSdr = metadata.offsetSdr;
    quadRenderer.material.gamma = metadata.gamma;
    quadRenderer.material.hdrCapacityMin = metadata.hdrCapacityMin;
    quadRenderer.material.hdrCapacityMax = metadata.hdrCapacityMax;
    quadRenderer.material.maxDisplayBoost = Math.pow(2, metadata.hdrCapacityMax);
    quadRenderer.material.needsUpdate = true;
    quadRenderer.render();
  }
};
var GainMapLoader = class extends LoaderBase {
  /**
   * Loads a gainmap using separate data
   * * sdr image
   * * gain map image
   * * metadata json
   *
   * useful for webp gain maps
   *
   * @param urls An array in the form of [sdr.jpg, gainmap.jpg, metadata.json]
   * @param onLoad Load complete callback, will receive the result
   * @param onProgress Progress callback, will receive a {@link ProgressEvent}
   * @param onError Error callback
   * @returns
   */
  load([sdrUrl, gainMapUrl, metadataUrl], onLoad, onProgress, onError) {
    const quadRenderer = this.prepareQuadRenderer();
    let sdr;
    let gainMap;
    let metadata;
    const loadCheck = async () => {
      if (sdr && gainMap && metadata) {
        try {
          await this.render(quadRenderer, metadata, sdr, gainMap);
        } catch (error) {
          this.manager.itemError(sdrUrl);
          this.manager.itemError(gainMapUrl);
          this.manager.itemError(metadataUrl);
          if (typeof onError === "function")
            onError(error);
          quadRenderer.disposeOnDemandRenderer();
          return;
        }
        if (typeof onLoad === "function")
          onLoad(quadRenderer);
        this.manager.itemEnd(sdrUrl);
        this.manager.itemEnd(gainMapUrl);
        this.manager.itemEnd(metadataUrl);
        quadRenderer.disposeOnDemandRenderer();
      }
    };
    let sdrLengthComputable = true;
    let sdrTotal = 0;
    let sdrLoaded = 0;
    let gainMapLengthComputable = true;
    let gainMapTotal = 0;
    let gainMapLoaded = 0;
    let metadataLengthComputable = true;
    let metadataTotal = 0;
    let metadataLoaded = 0;
    const progressHandler = () => {
      if (typeof onProgress === "function") {
        const total = sdrTotal + gainMapTotal + metadataTotal;
        const loaded = sdrLoaded + gainMapLoaded + metadataLoaded;
        const lengthComputable = sdrLengthComputable && gainMapLengthComputable && metadataLengthComputable;
        onProgress(new ProgressEvent("progress", { lengthComputable, loaded, total }));
      }
    };
    this.manager.itemStart(sdrUrl);
    this.manager.itemStart(gainMapUrl);
    this.manager.itemStart(metadataUrl);
    const sdrLoader = new FileLoader(this._internalLoadingManager);
    sdrLoader.setResponseType("arraybuffer");
    sdrLoader.setRequestHeader(this.requestHeader);
    sdrLoader.setPath(this.path);
    sdrLoader.setWithCredentials(this.withCredentials);
    sdrLoader.load(sdrUrl, async (buffer2) => {
      if (typeof buffer2 === "string")
        throw new Error("Invalid sdr buffer");
      sdr = buffer2;
      await loadCheck();
    }, (e2) => {
      sdrLengthComputable = e2.lengthComputable;
      sdrLoaded = e2.loaded;
      sdrTotal = e2.total;
      progressHandler();
    }, (error) => {
      this.manager.itemError(sdrUrl);
      if (typeof onError === "function")
        onError(error);
    });
    const gainMapLoader = new FileLoader(this._internalLoadingManager);
    gainMapLoader.setResponseType("arraybuffer");
    gainMapLoader.setRequestHeader(this.requestHeader);
    gainMapLoader.setPath(this.path);
    gainMapLoader.setWithCredentials(this.withCredentials);
    gainMapLoader.load(gainMapUrl, async (buffer2) => {
      if (typeof buffer2 === "string")
        throw new Error("Invalid gainmap buffer");
      gainMap = buffer2;
      await loadCheck();
    }, (e2) => {
      gainMapLengthComputable = e2.lengthComputable;
      gainMapLoaded = e2.loaded;
      gainMapTotal = e2.total;
      progressHandler();
    }, (error) => {
      this.manager.itemError(gainMapUrl);
      if (typeof onError === "function")
        onError(error);
    });
    const metadataLoader = new FileLoader(this._internalLoadingManager);
    metadataLoader.setRequestHeader(this.requestHeader);
    metadataLoader.setPath(this.path);
    metadataLoader.setWithCredentials(this.withCredentials);
    metadataLoader.load(metadataUrl, async (json) => {
      if (typeof json !== "string")
        throw new Error("Invalid metadata string");
      metadata = JSON.parse(json);
      await loadCheck();
    }, (e2) => {
      metadataLengthComputable = e2.lengthComputable;
      metadataLoaded = e2.loaded;
      metadataTotal = e2.total;
      progressHandler();
    }, (error) => {
      this.manager.itemError(metadataUrl);
      if (typeof onError === "function")
        onError(error);
    });
    return quadRenderer;
  }
};
var HDRJPGLoader = class extends LoaderBase {
  /**
   * Loads a JPEG containing gain map metadata
   * Renders a normal SDR image if gainmap data is not found
   *
   * @param url An array in the form of [sdr.jpg, gainmap.jpg, metadata.json]
   * @param onLoad Load complete callback, will receive the result
   * @param onProgress Progress callback, will receive a {@link ProgressEvent}
   * @param onError Error callback
   * @returns
   */
  load(url, onLoad, onProgress, onError) {
    const quadRenderer = this.prepareQuadRenderer();
    const loader = new FileLoader(this._internalLoadingManager);
    loader.setResponseType("arraybuffer");
    loader.setRequestHeader(this.requestHeader);
    loader.setPath(this.path);
    loader.setWithCredentials(this.withCredentials);
    this.manager.itemStart(url);
    loader.load(url, async (jpeg) => {
      if (typeof jpeg === "string")
        throw new Error("Invalid buffer, received [string], was expecting [ArrayBuffer]");
      const jpegBuffer = new Uint8Array(jpeg);
      let sdrJPEG;
      let gainMapJPEG;
      let metadata;
      try {
        const extractionResult = await extractGainmapFromJPEG(jpegBuffer);
        sdrJPEG = extractionResult.sdr;
        gainMapJPEG = extractionResult.gainMap;
        metadata = extractionResult.metadata;
      } catch (e2) {
        if (e2 instanceof XMPMetadataNotFoundError || e2 instanceof GainMapNotFoundError) {
          console.warn(`Failure to reconstruct an HDR image from ${url}: Gain map metadata not found in the file, HDRJPGLoader will render the SDR jpeg`);
          metadata = {
            gainMapMin: [0, 0, 0],
            gainMapMax: [1, 1, 1],
            gamma: [1, 1, 1],
            hdrCapacityMin: 0,
            hdrCapacityMax: 1,
            offsetHdr: [0, 0, 0],
            offsetSdr: [0, 0, 0]
          };
          sdrJPEG = jpegBuffer;
        } else {
          throw e2;
        }
      }
      try {
        await this.render(quadRenderer, metadata, sdrJPEG, gainMapJPEG);
      } catch (error) {
        this.manager.itemError(url);
        if (typeof onError === "function")
          onError(error);
        quadRenderer.disposeOnDemandRenderer();
        return;
      }
      if (typeof onLoad === "function")
        onLoad(quadRenderer);
      this.manager.itemEnd(url);
      quadRenderer.disposeOnDemandRenderer();
    }, onProgress, (error) => {
      this.manager.itemError(url);
      if (typeof onError === "function")
        onError(error);
    });
    return quadRenderer;
  }
};

// node_modules/tunnel-rat/dist/index.js
var import_react3 = __toESM(require_react());

// node_modules/tunnel-rat/node_modules/zustand/esm/vanilla.mjs
var createStoreImpl = (createState) => {
  let state;
  const listeners = /* @__PURE__ */ new Set();
  const setState = (partial, replace) => {
    const nextState = typeof partial === "function" ? partial(state) : partial;
    if (!Object.is(nextState, state)) {
      const previousState = state;
      state = (replace != null ? replace : typeof nextState !== "object" || nextState === null) ? nextState : Object.assign({}, state, nextState);
      listeners.forEach((listener) => listener(state, previousState));
    }
  };
  const getState = () => state;
  const getInitialState = () => initialState;
  const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };
  const destroy = () => {
    if ((import.meta.env ? import.meta.env.MODE : void 0) !== "production") {
      console.warn(
        "[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected."
      );
    }
    listeners.clear();
  };
  const api = { setState, getState, getInitialState, subscribe, destroy };
  const initialState = state = createState(setState, getState, api);
  return api;
};
var createStore = (createState) => createState ? createStoreImpl(createState) : createStoreImpl;

// node_modules/tunnel-rat/node_modules/zustand/esm/index.mjs
var import_react2 = __toESM(require_react(), 1);
var import_with_selector = __toESM(require_with_selector(), 1);
var { useDebugValue } = import_react2.default;
var { useSyncExternalStoreWithSelector } = import_with_selector.default;
var didWarnAboutEqualityFn = false;
var identity2 = (arg) => arg;
function useStore(api, selector = identity2, equalityFn) {
  if ((import.meta.env ? import.meta.env.MODE : void 0) !== "production" && equalityFn && !didWarnAboutEqualityFn) {
    console.warn(
      "[DEPRECATED] Use `createWithEqualityFn` instead of `create` or use `useStoreWithEqualityFn` instead of `useStore`. They can be imported from 'zustand/traditional'. https://github.com/pmndrs/zustand/discussions/1937"
    );
    didWarnAboutEqualityFn = true;
  }
  const slice = useSyncExternalStoreWithSelector(
    api.subscribe,
    api.getState,
    api.getServerState || api.getInitialState,
    selector,
    equalityFn
  );
  useDebugValue(slice);
  return slice;
}
var createImpl = (createState) => {
  if ((import.meta.env ? import.meta.env.MODE : void 0) !== "production" && typeof createState !== "function") {
    console.warn(
      "[DEPRECATED] Passing a vanilla store will be unsupported in a future version. Instead use `import { useStore } from 'zustand'`."
    );
  }
  const api = typeof createState === "function" ? createStore(createState) : createState;
  const useBoundStore = (selector, equalityFn) => useStore(api, selector, equalityFn);
  Object.assign(useBoundStore, api);
  return useBoundStore;
};
var create = (createState) => createState ? createImpl(createState) : createImpl;

// node_modules/tunnel-rat/dist/index.js
var _window$document;
var _window$navigator;
var useIsomorphicLayoutEffect = typeof window !== "undefined" && ((_window$document = window.document) != null && _window$document.createElement || ((_window$navigator = window.navigator) == null ? void 0 : _window$navigator.product) === "ReactNative") ? import_react3.default.useLayoutEffect : import_react3.default.useEffect;
function tunnel() {
  const useStore2 = create((set) => ({
    current: new Array(),
    version: 0,
    set
  }));
  return {
    In: ({
      children
    }) => {
      const set = useStore2((state) => state.set);
      const version2 = useStore2((state) => state.version);
      useIsomorphicLayoutEffect(() => {
        set((state) => ({
          version: state.version + 1
        }));
      }, []);
      useIsomorphicLayoutEffect(() => {
        set(({
          current
        }) => ({
          current: [...current, children]
        }));
        return () => set(({
          current
        }) => ({
          current: current.filter((c2) => c2 !== children)
        }));
      }, [children, version2]);
      return null;
    },
    Out: () => {
      const current = useStore2((state) => state.current);
      return import_react3.default.createElement(import_react3.default.Fragment, null, current);
    }
  };
}

export {
  _extends,
  useGesture,
  misc,
  easing,
  preloadFont,
  Text,
  MeshLineGeometry,
  MeshLineMaterial,
  require_stats_min,
  Stats,
  f,
  GainMapLoader,
  HDRJPGLoader,
  tunnel
};
/*! Bundled license information:

troika-three-text/dist/troika-three-text.esm.js:
  (*!
  Custom build of Typr.ts (https://github.com/fredli74/Typr.ts) for use in Troika text rendering.
  Original MIT license applies: https://github.com/fredli74/Typr.ts/blob/master/LICENSE
  *)
  (*!
  Custom bundle of woff2otf (https://github.com/arty-name/woff2otf) with fflate
  (https://github.com/101arrowz/fflate) for use in Troika text rendering. 
  Original licenses apply: 
  - fflate: https://github.com/101arrowz/fflate/blob/master/LICENSE (MIT)
  - woff2otf.js: https://github.com/arty-name/woff2otf/blob/master/woff2otf.js (Apache2)
  *)
  (*!
  Custom bundle of @unicode-font-resolver/client v1.0.2 (https://github.com/lojjic/unicode-font-resolver)
  for use in Troika text rendering. 
  Original MIT license applies
  *)
*/
//# sourceMappingURL=chunk-7KXGYE6A.js.map
