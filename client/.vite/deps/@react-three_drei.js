import {
  create
} from "./chunk-36OT3ISS.js";
import {
  GainMapLoader,
  HDRJPGLoader,
  MeshLineGeometry,
  MeshLineMaterial,
  Stats,
  Text,
  _extends,
  easing,
  f,
  misc,
  preloadFont,
  require_stats_min,
  tunnel,
  useGesture
} from "./chunk-7KXGYE6A.js";
import {
  Events
} from "./chunk-VZ3BGBAM.js";
import {
  require_client
} from "./chunk-KIYOM5P4.js";
import "./chunk-OUWKCDPP.js";
import {
  ArcballControls,
  AsciiEffect,
  DRACOLoader,
  DecalGeometry,
  DeviceOrientationControls,
  EXRLoader,
  EffectComposer,
  FBXLoader,
  FirstPersonControls,
  Flow,
  FlyControls,
  FontLoader,
  FullScreenQuad,
  GLTFLoader,
  GammaCorrectionShader,
  GroundProjectedEnv,
  HorizontalBlurShader,
  KTX2Loader,
  Line2,
  LineGeometry,
  LineMaterial,
  LineSegments2,
  LineSegmentsGeometry,
  MapControls,
  MarchingCubes,
  MeshSurfaceSampler,
  MeshoptDecoder,
  OrbitControls,
  PointerLockControls,
  RGBELoader,
  RenderPass,
  SVGLoader,
  SelectionBox,
  ShaderPass,
  SimplexNoise,
  SkeletonUtils,
  Sky,
  TextGeometry,
  TrackballControls,
  TransformControls,
  VerticalBlurShader,
  mergeVertices,
  toCreasedNormals
} from "./chunk-L57JVLYX.js";
import {
  addAfterEffect,
  addEffect,
  applyProps,
  clear,
  context,
  createPortal,
  extend,
  preload,
  suspend,
  useFrame,
  useInstanceHandle,
  useLoader,
  useThree
} from "./chunk-T4OUAJWA.js";
import "./chunk-WBBMM7TZ.js";
import "./chunk-77ZEW6EY.js";
import "./chunk-XUGFBAL3.js";
import {
  AdditiveBlending,
  AlwaysStencilFunc,
  AnimationMixer,
  AudioListener,
  AudioLoader,
  BackSide,
  BatchedMesh,
  Box3,
  BufferAttribute,
  BufferGeometry,
  ByteType,
  Camera,
  CameraHelper,
  CanvasTexture,
  CatmullRomCurve3,
  Color,
  CubeCamera,
  CubeReflectionMapping,
  CubeTextureLoader,
  CubicBezierCurve3,
  CurvePath,
  CustomBlending,
  CylinderGeometry,
  DataTexture,
  DefaultLoadingManager,
  DepthFormat,
  DepthTexture,
  DoubleSide,
  DynamicDrawUsage,
  EdgesGeometry,
  EqualStencilFunc,
  EquirectangularReflectionMapping,
  Euler,
  EventDispatcher,
  Float32BufferAttribute,
  FloatType,
  FrontSide,
  Frustum,
  Group,
  HalfFloatType,
  InstancedBufferAttribute,
  InstancedBufferGeometry,
  InstancedMesh,
  IntType,
  KeepStencilOp,
  Line3,
  LinearFilter,
  LinearMipmapLinearFilter,
  Loader,
  Material,
  MathUtils,
  Matrix3,
  Matrix4,
  Mesh,
  MeshBasicMaterial,
  MeshDepthMaterial,
  MeshLambertMaterial,
  MeshNormalMaterial,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  NearestFilter,
  NoBlending,
  NoToneMapping,
  NormalBlending,
  NotEqualStencilFunc,
  Object3D,
  OneFactor,
  OrthographicCamera,
  PerspectiveCamera,
  Plane,
  PlaneGeometry,
  PointsMaterial,
  QuadraticBezierCurve3,
  Quaternion,
  REVISION,
  RGBADepthPacking,
  RGBAFormat,
  RGBAIntegerFormat,
  RGFormat,
  RGIntegerFormat,
  Ray,
  Raycaster,
  RedFormat,
  RedIntegerFormat,
  RepeatWrapping,
  ReplaceStencilOp,
  SRGBColorSpace,
  Scene,
  ShaderChunk,
  ShaderMaterial,
  Shape,
  ShortType,
  SkinnedMesh,
  Sphere,
  SphereGeometry,
  Spherical,
  SrcAlphaFactor,
  Texture,
  TextureLoader,
  Triangle,
  Uniform,
  UniformsUtils,
  UnsignedByteType,
  UnsignedIntType,
  UnsignedShortType,
  Vector2,
  Vector3,
  Vector4,
  VideoTexture,
  WebGLCubeRenderTarget,
  WebGLRenderTarget
} from "./chunk-NFEVMALK.js";
import {
  require_react
} from "./chunk-4BPZ7PBZ.js";
import {
  __toESM
} from "./chunk-G3PMV62Z.js";

// node_modules/@react-three/drei/web/Html.js
var React = __toESM(require_react());
var ReactDOM = __toESM(require_client());
var v1 = new Vector3();
var v2 = new Vector3();
var v3 = new Vector3();
var v4 = new Vector2();
function defaultCalculatePosition(el, camera, size) {
  const objectPos = v1.setFromMatrixPosition(el.matrixWorld);
  objectPos.project(camera);
  const widthHalf = size.width / 2;
  const heightHalf = size.height / 2;
  return [objectPos.x * widthHalf + widthHalf, -(objectPos.y * heightHalf) + heightHalf];
}
function isObjectBehindCamera(el, camera) {
  const objectPos = v1.setFromMatrixPosition(el.matrixWorld);
  const cameraPos = v2.setFromMatrixPosition(camera.matrixWorld);
  const deltaCamObj = objectPos.sub(cameraPos);
  const camDir = camera.getWorldDirection(v3);
  return deltaCamObj.angleTo(camDir) > Math.PI / 2;
}
function isObjectVisible(el, camera, raycaster, occlude) {
  const elPos = v1.setFromMatrixPosition(el.matrixWorld);
  const screenPos = elPos.clone();
  screenPos.project(camera);
  v4.set(screenPos.x, screenPos.y);
  raycaster.setFromCamera(v4, camera);
  const intersects = raycaster.intersectObjects(occlude, true);
  if (intersects.length) {
    const intersectionDistance = intersects[0].distance;
    const pointDistance = elPos.distanceTo(raycaster.ray.origin);
    return pointDistance < intersectionDistance;
  }
  return true;
}
function objectScale(el, camera) {
  if (camera instanceof OrthographicCamera) {
    return camera.zoom;
  } else if (camera instanceof PerspectiveCamera) {
    const objectPos = v1.setFromMatrixPosition(el.matrixWorld);
    const cameraPos = v2.setFromMatrixPosition(camera.matrixWorld);
    const vFOV = camera.fov * Math.PI / 180;
    const dist = objectPos.distanceTo(cameraPos);
    const scaleFOV = 2 * Math.tan(vFOV / 2) * dist;
    return 1 / scaleFOV;
  } else {
    return 1;
  }
}
function objectZIndex(el, camera, zIndexRange) {
  if (camera instanceof PerspectiveCamera || camera instanceof OrthographicCamera) {
    const objectPos = v1.setFromMatrixPosition(el.matrixWorld);
    const cameraPos = v2.setFromMatrixPosition(camera.matrixWorld);
    const dist = objectPos.distanceTo(cameraPos);
    const A = (zIndexRange[1] - zIndexRange[0]) / (camera.far - camera.near);
    const B = zIndexRange[1] - A * camera.far;
    return Math.round(A * dist + B);
  }
  return void 0;
}
var epsilon = (value) => Math.abs(value) < 1e-10 ? 0 : value;
function getCSSMatrix(matrix3, multipliers, prepend = "") {
  let matrix3d = "matrix3d(";
  for (let i2 = 0; i2 !== 16; i2++) {
    matrix3d += epsilon(multipliers[i2] * matrix3.elements[i2]) + (i2 !== 15 ? "," : ")");
  }
  return prepend + matrix3d;
}
var getCameraCSSMatrix = /* @__PURE__ */ ((multipliers) => {
  return (matrix3) => getCSSMatrix(matrix3, multipliers);
})([1, -1, 1, 1, 1, -1, 1, 1, 1, -1, 1, 1, 1, -1, 1, 1]);
var getObjectCSSMatrix = /* @__PURE__ */ ((scaleMultipliers) => {
  return (matrix3, factor) => getCSSMatrix(matrix3, scaleMultipliers(factor), "translate(-50%,-50%)");
})((f2) => [1 / f2, 1 / f2, 1 / f2, 1, -1 / f2, -1 / f2, -1 / f2, -1, 1 / f2, 1 / f2, 1 / f2, 1, 1, 1, 1, 1]);
function isRefObject(ref) {
  return ref && typeof ref === "object" && "current" in ref;
}
var Html = React.forwardRef(({
  children,
  eps: eps2 = 1e-3,
  style,
  className,
  prepend,
  center,
  fullscreen,
  portal,
  distanceFactor,
  sprite = false,
  transform = false,
  occlude,
  onOcclude,
  castShadow,
  receiveShadow,
  material,
  geometry: geometry2,
  zIndexRange = [16777271, 0],
  calculatePosition = defaultCalculatePosition,
  as = "div",
  wrapperClass,
  pointerEvents = "auto",
  ...props
}, ref) => {
  const {
    gl,
    camera,
    scene,
    size,
    raycaster,
    events,
    viewport
  } = useThree();
  const [el] = React.useState(() => document.createElement(as));
  const root = React.useRef(null);
  const group = React.useRef(null);
  const oldZoom = React.useRef(0);
  const oldPosition = React.useRef([0, 0]);
  const transformOuterRef = React.useRef(null);
  const transformInnerRef = React.useRef(null);
  const target2 = (portal == null ? void 0 : portal.current) || events.connected || gl.domElement.parentNode;
  const occlusionMeshRef = React.useRef(null);
  const isMeshSizeSet = React.useRef(false);
  const isRayCastOcclusion = React.useMemo(() => {
    return occlude && occlude !== "blending" || Array.isArray(occlude) && occlude.length && isRefObject(occlude[0]);
  }, [occlude]);
  React.useLayoutEffect(() => {
    const el2 = gl.domElement;
    if (occlude && occlude === "blending") {
      el2.style.zIndex = `${Math.floor(zIndexRange[0] / 2)}`;
      el2.style.position = "absolute";
      el2.style.pointerEvents = "none";
    } else {
      el2.style.zIndex = null;
      el2.style.position = null;
      el2.style.pointerEvents = null;
    }
  }, [occlude]);
  React.useLayoutEffect(() => {
    if (group.current) {
      const currentRoot = root.current = ReactDOM.createRoot(el);
      scene.updateMatrixWorld();
      if (transform) {
        el.style.cssText = `position:absolute;top:0;left:0;pointer-events:none;overflow:hidden;`;
      } else {
        const vec = calculatePosition(group.current, camera, size);
        el.style.cssText = `position:absolute;top:0;left:0;transform:translate3d(${vec[0]}px,${vec[1]}px,0);transform-origin:0 0;`;
      }
      if (target2) {
        if (prepend) target2.prepend(el);
        else target2.appendChild(el);
      }
      return () => {
        if (target2) target2.removeChild(el);
        currentRoot.unmount();
      };
    }
  }, [target2, transform]);
  React.useLayoutEffect(() => {
    if (wrapperClass) el.className = wrapperClass;
  }, [wrapperClass]);
  const styles2 = React.useMemo(() => {
    if (transform) {
      return {
        position: "absolute",
        top: 0,
        left: 0,
        width: size.width,
        height: size.height,
        transformStyle: "preserve-3d",
        pointerEvents: "none"
      };
    } else {
      return {
        position: "absolute",
        transform: center ? "translate3d(-50%,-50%,0)" : "none",
        ...fullscreen && {
          top: -size.height / 2,
          left: -size.width / 2,
          width: size.width,
          height: size.height
        },
        ...style
      };
    }
  }, [style, center, fullscreen, size, transform]);
  const transformInnerStyles = React.useMemo(() => ({
    position: "absolute",
    pointerEvents
  }), [pointerEvents]);
  React.useLayoutEffect(() => {
    isMeshSizeSet.current = false;
    if (transform) {
      var _root$current;
      (_root$current = root.current) == null || _root$current.render(React.createElement("div", {
        ref: transformOuterRef,
        style: styles2
      }, React.createElement("div", {
        ref: transformInnerRef,
        style: transformInnerStyles
      }, React.createElement("div", {
        ref,
        className,
        style,
        children
      }))));
    } else {
      var _root$current2;
      (_root$current2 = root.current) == null || _root$current2.render(React.createElement("div", {
        ref,
        style: styles2,
        className,
        children
      }));
    }
  });
  const visible = React.useRef(true);
  useFrame((gl2) => {
    if (group.current) {
      camera.updateMatrixWorld();
      group.current.updateWorldMatrix(true, false);
      const vec = transform ? oldPosition.current : calculatePosition(group.current, camera, size);
      if (transform || Math.abs(oldZoom.current - camera.zoom) > eps2 || Math.abs(oldPosition.current[0] - vec[0]) > eps2 || Math.abs(oldPosition.current[1] - vec[1]) > eps2) {
        const isBehindCamera = isObjectBehindCamera(group.current, camera);
        let raytraceTarget = false;
        if (isRayCastOcclusion) {
          if (Array.isArray(occlude)) {
            raytraceTarget = occlude.map((item) => item.current);
          } else if (occlude !== "blending") {
            raytraceTarget = [scene];
          }
        }
        const previouslyVisible = visible.current;
        if (raytraceTarget) {
          const isvisible = isObjectVisible(group.current, camera, raycaster, raytraceTarget);
          visible.current = isvisible && !isBehindCamera;
        } else {
          visible.current = !isBehindCamera;
        }
        if (previouslyVisible !== visible.current) {
          if (onOcclude) onOcclude(!visible.current);
          else el.style.display = visible.current ? "block" : "none";
        }
        const halfRange = Math.floor(zIndexRange[0] / 2);
        const zRange = occlude ? isRayCastOcclusion ? [zIndexRange[0], halfRange] : [halfRange - 1, 0] : zIndexRange;
        el.style.zIndex = `${objectZIndex(group.current, camera, zRange)}`;
        if (transform) {
          const [widthHalf, heightHalf] = [size.width / 2, size.height / 2];
          const fov = camera.projectionMatrix.elements[5] * heightHalf;
          const {
            isOrthographicCamera: isOrthographicCamera3,
            top,
            left,
            bottom,
            right
          } = camera;
          const cameraMatrix = getCameraCSSMatrix(camera.matrixWorldInverse);
          const cameraTransform = isOrthographicCamera3 ? `scale(${fov})translate(${epsilon(-(right + left) / 2)}px,${epsilon((top + bottom) / 2)}px)` : `translateZ(${fov}px)`;
          let matrix3 = group.current.matrixWorld;
          if (sprite) {
            matrix3 = camera.matrixWorldInverse.clone().transpose().copyPosition(matrix3).scale(group.current.scale);
            matrix3.elements[3] = matrix3.elements[7] = matrix3.elements[11] = 0;
            matrix3.elements[15] = 1;
          }
          el.style.width = size.width + "px";
          el.style.height = size.height + "px";
          el.style.perspective = isOrthographicCamera3 ? "" : `${fov}px`;
          if (transformOuterRef.current && transformInnerRef.current) {
            transformOuterRef.current.style.transform = `${cameraTransform}${cameraMatrix}translate(${widthHalf}px,${heightHalf}px)`;
            transformInnerRef.current.style.transform = getObjectCSSMatrix(matrix3, 1 / ((distanceFactor || 10) / 400));
          }
        } else {
          const scale3 = distanceFactor === void 0 ? 1 : objectScale(group.current, camera) * distanceFactor;
          el.style.transform = `translate3d(${vec[0]}px,${vec[1]}px,0) scale(${scale3})`;
        }
        oldPosition.current = vec;
        oldZoom.current = camera.zoom;
      }
    }
    if (!isRayCastOcclusion && occlusionMeshRef.current && !isMeshSizeSet.current) {
      if (transform) {
        if (transformOuterRef.current) {
          const el2 = transformOuterRef.current.children[0];
          if (el2 != null && el2.clientWidth && el2 != null && el2.clientHeight) {
            const {
              isOrthographicCamera: isOrthographicCamera3
            } = camera;
            if (isOrthographicCamera3 || geometry2) {
              if (props.scale) {
                if (!Array.isArray(props.scale)) {
                  occlusionMeshRef.current.scale.setScalar(1 / props.scale);
                } else if (props.scale instanceof Vector3) {
                  occlusionMeshRef.current.scale.copy(props.scale.clone().divideScalar(1));
                } else {
                  occlusionMeshRef.current.scale.set(1 / props.scale[0], 1 / props.scale[1], 1 / props.scale[2]);
                }
              }
            } else {
              const ratio = (distanceFactor || 10) / 400;
              const w = el2.clientWidth * ratio;
              const h = el2.clientHeight * ratio;
              occlusionMeshRef.current.scale.set(w, h, 1);
            }
            isMeshSizeSet.current = true;
          }
        }
      } else {
        const ele = el.children[0];
        if (ele != null && ele.clientWidth && ele != null && ele.clientHeight) {
          const ratio = 1 / viewport.factor;
          const w = ele.clientWidth * ratio;
          const h = ele.clientHeight * ratio;
          occlusionMeshRef.current.scale.set(w, h, 1);
          isMeshSizeSet.current = true;
        }
        occlusionMeshRef.current.lookAt(gl2.camera.position);
      }
    }
  });
  const shaders = React.useMemo(() => ({
    vertexShader: !transform ? (
      /* glsl */
      `
          /*
            This shader is from the THREE's SpriteMaterial.
            We need to turn the backing plane into a Sprite
            (make it always face the camera) if "transfrom"
            is false.
          */
          #include <common>

          void main() {
            vec2 center = vec2(0., 1.);
            float rotation = 0.0;

            // This is somewhat arbitrary, but it seems to work well
            // Need to figure out how to derive this dynamically if it even matters
            float size = 0.03;

            vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
            vec2 scale;
            scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
            scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );

            bool isPerspective = isPerspectiveMatrix( projectionMatrix );
            if ( isPerspective ) scale *= - mvPosition.z;

            vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale * size;
            vec2 rotatedPosition;
            rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
            rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
            mvPosition.xy += rotatedPosition;

            gl_Position = projectionMatrix * mvPosition;
          }
      `
    ) : void 0,
    fragmentShader: (
      /* glsl */
      `
        void main() {
          gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
        }
      `
    )
  }), [transform]);
  return React.createElement("group", _extends({}, props, {
    ref: group
  }), occlude && !isRayCastOcclusion && React.createElement("mesh", {
    castShadow,
    receiveShadow,
    ref: occlusionMeshRef
  }, geometry2 || React.createElement("planeGeometry", null), material || React.createElement("shaderMaterial", {
    side: DoubleSide,
    vertexShader: shaders.vertexShader,
    fragmentShader: shaders.fragmentShader
  })));
});

// node_modules/@react-three/drei/web/CycleRaycast.js
var React2 = __toESM(require_react());
function CycleRaycast({
  onChanged,
  portal,
  preventDefault = true,
  scroll = true,
  keyCode = 9
}) {
  const cycle = React2.useRef(0);
  const setEvents = useThree((state) => state.setEvents);
  const get = useThree((state) => state.get);
  const gl = useThree((state) => state.gl);
  React2.useEffect(() => {
    var _portal$current;
    let hits = [];
    let lastEvent = void 0;
    const prev = get().events.filter;
    const target2 = (_portal$current = portal == null ? void 0 : portal.current) !== null && _portal$current !== void 0 ? _portal$current : gl.domElement.parentNode;
    const renderStatus = () => target2 && onChanged && onChanged(hits, Math.round(cycle.current) % hits.length);
    setEvents({
      filter: (intersections, state) => {
        let clone = [...intersections];
        if (clone.length !== hits.length || !hits.every((hit) => clone.map((e) => e.object.uuid).includes(hit.object.uuid))) {
          cycle.current = 0;
          hits = clone;
          renderStatus();
        }
        if (prev) clone = prev(clone, state);
        for (let i2 = 0; i2 < Math.round(cycle.current) % clone.length; i2++) {
          const first = clone.shift();
          clone = [...clone, first];
        }
        return clone;
      }
    });
    const refresh = (fn) => {
      var _get$events$handlers, _get$events$handlers2;
      cycle.current = fn(cycle.current);
      (_get$events$handlers = get().events.handlers) == null || _get$events$handlers.onPointerCancel(void 0);
      (_get$events$handlers2 = get().events.handlers) == null || _get$events$handlers2.onPointerMove(lastEvent);
      renderStatus();
    };
    const tabEvent = (event) => {
      if ((event.keyCode || event.which) === keyCode) {
        if (preventDefault) event.preventDefault();
        if (hits.length > 1) refresh((current) => current + 1);
      }
    };
    const wheelEvent = (event) => {
      if (preventDefault) event.preventDefault();
      let delta = 0;
      if (!event) event = window.event;
      if (event.wheelDelta) delta = event.wheelDelta / 120;
      else if (event.detail) delta = -event.detail / 3;
      if (hits.length > 1) refresh((current) => Math.abs(current - delta));
    };
    const moveEvent = (event) => lastEvent = event;
    document.addEventListener("pointermove", moveEvent, {
      passive: true
    });
    if (scroll) document.addEventListener("wheel", wheelEvent);
    if (keyCode !== void 0) document.addEventListener("keydown", tabEvent);
    return () => {
      setEvents({
        filter: prev
      });
      if (keyCode !== void 0) document.removeEventListener("keydown", tabEvent);
      if (scroll) document.removeEventListener("wheel", wheelEvent);
      document.removeEventListener("pointermove", moveEvent);
    };
  }, [gl, get, setEvents, preventDefault, scroll, keyCode]);
  return null;
}

// node_modules/@react-three/drei/web/useCursor.js
var React3 = __toESM(require_react());
function useCursor(hovered, onPointerOver = "pointer", onPointerOut = "auto", container = document.body) {
  React3.useEffect(() => {
    if (hovered) {
      container.style.cursor = onPointerOver;
      return () => void (container.style.cursor = onPointerOut);
    }
  }, [hovered]);
}

// node_modules/@react-three/drei/web/Loader.js
var React5 = __toESM(require_react());

// node_modules/@react-three/drei/core/Progress.js
var React4 = __toESM(require_react());
var saveLastTotalLoaded = 0;
var useProgress = create((set) => {
  DefaultLoadingManager.onStart = (item, loaded, total) => {
    set({
      active: true,
      item,
      loaded,
      total,
      progress: (loaded - saveLastTotalLoaded) / (total - saveLastTotalLoaded) * 100
    });
  };
  DefaultLoadingManager.onLoad = () => {
    set({
      active: false
    });
  };
  DefaultLoadingManager.onError = (item) => set((state) => ({
    errors: [...state.errors, item]
  }));
  DefaultLoadingManager.onProgress = (item, loaded, total) => {
    if (loaded === total) {
      saveLastTotalLoaded = total;
    }
    set({
      active: true,
      item,
      loaded,
      total,
      progress: (loaded - saveLastTotalLoaded) / (total - saveLastTotalLoaded) * 100 || 100
    });
  };
  return {
    errors: [],
    active: false,
    progress: 0,
    item: "",
    loaded: 0,
    total: 0
  };
});
function Progress({
  children
}) {
  const result = useProgress();
  return React4.createElement(React4.Fragment, null, children == null ? void 0 : children(result));
}

// node_modules/@react-three/drei/web/Loader.js
var defaultDataInterpolation = (p) => `Loading ${p.toFixed(2)}%`;
function Loader2({
  containerStyles,
  innerStyles,
  barStyles,
  dataStyles,
  dataInterpolation = defaultDataInterpolation,
  initialState = (active) => active
}) {
  const {
    active,
    progress
  } = useProgress();
  const progressRef = React5.useRef(0);
  const rafRef = React5.useRef(0);
  const progressSpanRef = React5.useRef(null);
  const [shown, setShown] = React5.useState(initialState(active));
  React5.useEffect(() => {
    let t;
    if (active !== shown) t = setTimeout(() => setShown(active), 300);
    return () => clearTimeout(t);
  }, [shown, active]);
  const updateProgress = React5.useCallback(() => {
    if (!progressSpanRef.current) return;
    progressRef.current += (progress - progressRef.current) / 2;
    if (progressRef.current > 0.95 * progress || progress === 100) progressRef.current = progress;
    progressSpanRef.current.innerText = dataInterpolation(progressRef.current);
    if (progressRef.current < progress) rafRef.current = requestAnimationFrame(updateProgress);
  }, [dataInterpolation, progress]);
  React5.useEffect(() => {
    updateProgress();
    return () => cancelAnimationFrame(rafRef.current);
  }, [updateProgress]);
  return shown ? React5.createElement("div", {
    style: {
      ...styles.container,
      opacity: active ? 1 : 0,
      ...containerStyles
    }
  }, React5.createElement("div", null, React5.createElement("div", {
    style: {
      ...styles.inner,
      ...innerStyles
    }
  }, React5.createElement("div", {
    style: {
      ...styles.bar,
      transform: `scaleX(${progress / 100})`,
      ...barStyles
    }
  }), React5.createElement("span", {
    ref: progressSpanRef,
    style: {
      ...styles.data,
      ...dataStyles
    }
  })))) : null;
}
var styles = {
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "#171717",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "opacity 300ms ease",
    zIndex: 1e3
  },
  inner: {
    width: 100,
    height: 3,
    background: "#272727",
    textAlign: "center"
  },
  bar: {
    height: 3,
    width: "100%",
    background: "white",
    transition: "transform 200ms",
    transformOrigin: "left center"
  },
  data: {
    display: "inline-block",
    position: "relative",
    fontVariantNumeric: "tabular-nums",
    marginTop: "0.8em",
    color: "#f0f0f0",
    fontSize: "0.6em",
    fontFamily: `-apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", "Helvetica Neue", Helvetica, Arial, Roboto, Ubuntu, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
    whiteSpace: "nowrap"
  }
};

// node_modules/@react-three/drei/web/DragControls.js
var React6 = __toESM(require_react());
var initialModelPosition = new Vector3();
var mousePosition2D = new Vector2();
var mousePosition3D = new Vector3();
var dragOffset = new Vector3();
var dragPlaneNormal = new Vector3();
var dragPlane = new Plane();
var DragControls = React6.forwardRef(({
  autoTransform = true,
  matrix: matrix3,
  axisLock,
  dragLimits,
  onHover,
  onDragStart,
  onDrag,
  onDragEnd,
  children,
  dragConfig,
  ...props
}, fRef) => {
  const defaultControls = useThree((state) => state.controls);
  const {
    camera,
    size,
    raycaster,
    invalidate
  } = useThree();
  const ref = React6.useRef(null);
  const bind = useGesture({
    onHover: ({
      hovering
    }) => onHover && onHover(hovering !== null && hovering !== void 0 ? hovering : false),
    onDragStart: ({
      event
    }) => {
      if (defaultControls) defaultControls.enabled = false;
      const {
        point
      } = event;
      ref.current.matrix.decompose(initialModelPosition, new Quaternion(), new Vector3());
      mousePosition3D.copy(point);
      dragOffset.copy(mousePosition3D).sub(initialModelPosition);
      onDragStart && onDragStart(initialModelPosition);
      invalidate();
    },
    onDrag: ({
      xy: [dragX, dragY],
      intentional
    }) => {
      if (!intentional) return;
      const normalizedMouseX = (dragX - size.left) / size.width * 2 - 1;
      const normalizedMouseY = -((dragY - size.top) / size.height) * 2 + 1;
      mousePosition2D.set(normalizedMouseX, normalizedMouseY);
      raycaster.setFromCamera(mousePosition2D, camera);
      if (!axisLock) {
        camera.getWorldDirection(dragPlaneNormal).negate();
      } else {
        switch (axisLock) {
          case "x":
            dragPlaneNormal.set(1, 0, 0);
            break;
          case "y":
            dragPlaneNormal.set(0, 1, 0);
            break;
          case "z":
            dragPlaneNormal.set(0, 0, 1);
            break;
        }
      }
      dragPlane.setFromNormalAndCoplanarPoint(dragPlaneNormal, mousePosition3D);
      raycaster.ray.intersectPlane(dragPlane, mousePosition3D);
      const previousLocalMatrix = ref.current.matrix.clone();
      const previousWorldMatrix = ref.current.matrixWorld.clone();
      const intendedNewPosition = new Vector3(mousePosition3D.x - dragOffset.x, mousePosition3D.y - dragOffset.y, mousePosition3D.z - dragOffset.z);
      if (dragLimits) {
        intendedNewPosition.x = dragLimits[0] ? Math.max(Math.min(intendedNewPosition.x, dragLimits[0][1]), dragLimits[0][0]) : intendedNewPosition.x;
        intendedNewPosition.y = dragLimits[1] ? Math.max(Math.min(intendedNewPosition.y, dragLimits[1][1]), dragLimits[1][0]) : intendedNewPosition.y;
        intendedNewPosition.z = dragLimits[2] ? Math.max(Math.min(intendedNewPosition.z, dragLimits[2][1]), dragLimits[2][0]) : intendedNewPosition.z;
      }
      if (autoTransform) {
        ref.current.matrix.setPosition(intendedNewPosition);
        const deltaLocalMatrix = ref.current.matrix.clone().multiply(previousLocalMatrix.invert());
        const deltaWorldMatrix = ref.current.matrix.clone().multiply(previousWorldMatrix.invert());
        onDrag && onDrag(ref.current.matrix, deltaLocalMatrix, ref.current.matrixWorld, deltaWorldMatrix);
      } else {
        const tempMatrix4 = new Matrix4().copy(ref.current.matrix);
        tempMatrix4.setPosition(intendedNewPosition);
        const deltaLocalMatrix = tempMatrix4.clone().multiply(previousLocalMatrix.invert());
        const deltaWorldMatrix = tempMatrix4.clone().multiply(previousWorldMatrix.invert());
        onDrag && onDrag(tempMatrix4, deltaLocalMatrix, ref.current.matrixWorld, deltaWorldMatrix);
      }
      invalidate();
    },
    onDragEnd: () => {
      if (defaultControls) defaultControls.enabled = true;
      onDragEnd && onDragEnd();
      invalidate();
    }
  }, {
    drag: {
      filterTaps: true,
      threshold: 1,
      ...typeof dragConfig === "object" ? dragConfig : {}
    }
  });
  React6.useImperativeHandle(fRef, () => ref.current, []);
  React6.useLayoutEffect(() => {
    if (!matrix3) return;
    ref.current.matrix = matrix3;
  }, [matrix3]);
  return React6.createElement("group", _extends({
    ref
  }, bind(), {
    matrix: matrix3,
    matrixAutoUpdate: false
  }, props), children);
});

// node_modules/@react-three/drei/web/ScrollControls.js
var React7 = __toESM(require_react());
var ReactDOM2 = __toESM(require_client());
var context2 = React7.createContext(null);
function useScroll() {
  return React7.useContext(context2);
}
function ScrollControls({
  eps: eps2 = 1e-5,
  enabled = true,
  infinite,
  horizontal,
  pages = 1,
  distance = 1,
  damping = 0.25,
  maxSpeed = Infinity,
  prepend = false,
  style = {},
  children
}) {
  const {
    get,
    setEvents,
    gl,
    size,
    invalidate,
    events
  } = useThree();
  const [el] = React7.useState(() => document.createElement("div"));
  const [fill] = React7.useState(() => document.createElement("div"));
  const [fixed] = React7.useState(() => document.createElement("div"));
  const target2 = gl.domElement.parentNode;
  const scroll = React7.useRef(0);
  const state = React7.useMemo(() => {
    const state2 = {
      el,
      eps: eps2,
      fill,
      fixed,
      horizontal,
      damping,
      offset: 0,
      delta: 0,
      scroll,
      pages,
      // 0-1 for a range between from -> from + distance
      range(from, distance2, margin = 0) {
        const start = from - margin;
        const end = start + distance2 + margin * 2;
        return this.offset < start ? 0 : this.offset > end ? 1 : (this.offset - start) / (end - start);
      },
      // 0-1-0 for a range between from -> from + distance
      curve(from, distance2, margin = 0) {
        return Math.sin(this.range(from, distance2, margin) * Math.PI);
      },
      // true/false for a range between from -> from + distance
      visible(from, distance2, margin = 0) {
        const start = from - margin;
        const end = start + distance2 + margin * 2;
        return this.offset >= start && this.offset <= end;
      }
    };
    return state2;
  }, [eps2, damping, horizontal, pages]);
  React7.useEffect(() => {
    el.style.position = "absolute";
    el.style.width = "100%";
    el.style.height = "100%";
    el.style[horizontal ? "overflowX" : "overflowY"] = "auto";
    el.style[horizontal ? "overflowY" : "overflowX"] = "hidden";
    el.style.top = "0px";
    el.style.left = "0px";
    for (const key in style) {
      el.style[key] = style[key];
    }
    fixed.style.position = "sticky";
    fixed.style.top = "0px";
    fixed.style.left = "0px";
    fixed.style.width = "100%";
    fixed.style.height = "100%";
    fixed.style.overflow = "hidden";
    el.appendChild(fixed);
    fill.style.height = horizontal ? "100%" : `${pages * distance * 100}%`;
    fill.style.width = horizontal ? `${pages * distance * 100}%` : "100%";
    fill.style.pointerEvents = "none";
    el.appendChild(fill);
    if (prepend) target2.prepend(el);
    else target2.appendChild(el);
    el[horizontal ? "scrollLeft" : "scrollTop"] = 1;
    const oldTarget = events.connected || gl.domElement;
    requestAnimationFrame(() => events.connect == null ? void 0 : events.connect(el));
    const oldCompute = get().events.compute;
    setEvents({
      compute(event, state2) {
        const {
          left,
          top
        } = target2.getBoundingClientRect();
        const offsetX = event.clientX - left;
        const offsetY = event.clientY - top;
        state2.pointer.set(offsetX / state2.size.width * 2 - 1, -(offsetY / state2.size.height) * 2 + 1);
        state2.raycaster.setFromCamera(state2.pointer, state2.camera);
      }
    });
    return () => {
      target2.removeChild(el);
      setEvents({
        compute: oldCompute
      });
      events.connect == null || events.connect(oldTarget);
    };
  }, [pages, distance, horizontal, el, fill, fixed, target2]);
  React7.useEffect(() => {
    if (events.connected === el) {
      const containerLength = size[horizontal ? "width" : "height"];
      const scrollLength = el[horizontal ? "scrollWidth" : "scrollHeight"];
      const scrollThreshold = scrollLength - containerLength;
      let current = 0;
      let disableScroll = true;
      let firstRun = true;
      const onScroll = () => {
        if (!enabled || firstRun) return;
        invalidate();
        current = el[horizontal ? "scrollLeft" : "scrollTop"];
        scroll.current = current / scrollThreshold;
        if (infinite) {
          if (!disableScroll) {
            if (current >= scrollThreshold) {
              const damp = 1 - state.offset;
              el[horizontal ? "scrollLeft" : "scrollTop"] = 1;
              scroll.current = state.offset = -damp;
              disableScroll = true;
            } else if (current <= 0) {
              const damp = 1 + state.offset;
              el[horizontal ? "scrollLeft" : "scrollTop"] = scrollLength;
              scroll.current = state.offset = damp;
              disableScroll = true;
            }
          }
          if (disableScroll) setTimeout(() => disableScroll = false, 40);
        }
      };
      el.addEventListener("scroll", onScroll, {
        passive: true
      });
      requestAnimationFrame(() => firstRun = false);
      const onWheel = (e) => el.scrollLeft += e.deltaY / 2;
      if (horizontal) el.addEventListener("wheel", onWheel, {
        passive: true
      });
      return () => {
        el.removeEventListener("scroll", onScroll);
        if (horizontal) el.removeEventListener("wheel", onWheel);
      };
    }
  }, [el, events, size, infinite, state, invalidate, horizontal, enabled]);
  let last = 0;
  useFrame((_, delta) => {
    last = state.offset;
    easing.damp(state, "offset", scroll.current, damping, delta, maxSpeed, void 0, eps2);
    easing.damp(state, "delta", Math.abs(last - state.offset), damping, delta, maxSpeed, void 0, eps2);
    if (state.delta > eps2) invalidate();
  });
  return React7.createElement(context2.Provider, {
    value: state
  }, children);
}
var ScrollCanvas = React7.forwardRef(({
  children
}, ref) => {
  const group = React7.useRef(null);
  React7.useImperativeHandle(ref, () => group.current, []);
  const state = useScroll();
  const {
    width,
    height
  } = useThree((state2) => state2.viewport);
  useFrame(() => {
    group.current.position.x = state.horizontal ? -width * (state.pages - 1) * state.offset : 0;
    group.current.position.y = state.horizontal ? 0 : height * (state.pages - 1) * state.offset;
  });
  return React7.createElement("group", {
    ref: group
  }, children);
});
var ScrollHtml = React7.forwardRef(({
  children,
  style,
  ...props
}, ref) => {
  const state = useScroll();
  const group = React7.useRef(null);
  React7.useImperativeHandle(ref, () => group.current, []);
  const {
    width,
    height
  } = useThree((state2) => state2.size);
  const fiberState = React7.useContext(context);
  const root = React7.useMemo(() => ReactDOM2.createRoot(state.fixed), [state.fixed]);
  useFrame(() => {
    if (state.delta > state.eps) {
      group.current.style.transform = `translate3d(${state.horizontal ? -width * (state.pages - 1) * state.offset : 0}px,${state.horizontal ? 0 : height * (state.pages - 1) * -state.offset}px,0)`;
    }
  });
  root.render(React7.createElement("div", _extends({
    ref: group,
    style: {
      ...style,
      position: "absolute",
      top: 0,
      left: 0,
      willChange: "transform"
    }
  }, props), React7.createElement(context2.Provider, {
    value: state
  }, React7.createElement(context.Provider, {
    value: fiberState
  }, children))));
  return null;
});
var Scroll = React7.forwardRef(({
  html,
  ...props
}, ref) => {
  const El = html ? ScrollHtml : ScrollCanvas;
  return React7.createElement(El, _extends({
    ref
  }, props));
});

// node_modules/@react-three/drei/web/PresentationControls.js
var React8 = __toESM(require_react());
function PresentationControls({
  enabled = true,
  snap,
  global,
  domElement,
  cursor = true,
  children,
  speed = 1,
  rotation: rotation3 = [0, 0, 0],
  zoom = 1,
  polar = [0, Math.PI / 2],
  azimuth = [-Infinity, Infinity],
  damping = 0.25
}) {
  const events = useThree((state) => state.events);
  const gl = useThree((state) => state.gl);
  const explDomElement = domElement || events.connected || gl.domElement;
  const {
    size
  } = useThree();
  const rPolar = React8.useMemo(() => [rotation3[0] + polar[0], rotation3[0] + polar[1]], [rotation3[0], polar[0], polar[1]]);
  const rAzimuth = React8.useMemo(() => [rotation3[1] + azimuth[0], rotation3[1] + azimuth[1]], [rotation3[1], azimuth[0], azimuth[1]]);
  const rInitial = React8.useMemo(() => [MathUtils.clamp(rotation3[0], ...rPolar), MathUtils.clamp(rotation3[1], ...rAzimuth), rotation3[2]], [rotation3[0], rotation3[1], rotation3[2], rPolar, rAzimuth]);
  React8.useEffect(() => {
    if (global && cursor && enabled) {
      explDomElement.style.cursor = "grab";
      gl.domElement.style.cursor = "";
      return () => {
        explDomElement.style.cursor = "default";
        gl.domElement.style.cursor = "default";
      };
    }
  }, [global, cursor, explDomElement, enabled]);
  const [animation] = React8.useState({
    scale: 1,
    rotation: rInitial,
    damping
  });
  const ref = React8.useRef(null);
  useFrame((state, delta) => {
    easing.damp3(ref.current.scale, animation.scale, animation.damping, delta);
    easing.dampE(ref.current.rotation, animation.rotation, animation.damping, delta);
  });
  const bind = useGesture({
    onHover: ({
      last
    }) => {
      if (cursor && !global && enabled) explDomElement.style.cursor = last ? "auto" : "grab";
    },
    onDrag: ({
      down,
      delta: [x, y],
      memo: [oldY, oldX] = animation.rotation || rInitial
    }) => {
      if (!enabled) return [y, x];
      if (cursor) explDomElement.style.cursor = down ? "grabbing" : "grab";
      x = MathUtils.clamp(oldX + x / size.width * Math.PI * speed, ...rAzimuth);
      y = MathUtils.clamp(oldY + y / size.height * Math.PI * speed, ...rPolar);
      animation.scale = down && y > rPolar[1] / 2 ? zoom : 1;
      animation.rotation = snap && !down ? rInitial : [y, x, 0];
      animation.damping = snap && !down && typeof snap !== "boolean" ? snap : damping;
      return [y, x];
    }
  }, {
    target: global ? explDomElement : void 0
  });
  return React8.createElement("group", _extends({
    ref
  }, bind == null ? void 0 : bind()), children);
}

// node_modules/@react-three/drei/web/KeyboardControls.js
var React9 = __toESM(require_react());

// node_modules/zustand/esm/middleware.mjs
var subscribeWithSelectorImpl = (fn) => (set, get, api) => {
  const origSubscribe = api.subscribe;
  api.subscribe = ((selector, optListener, options) => {
    let listener = selector;
    if (optListener) {
      const equalityFn = (options == null ? void 0 : options.equalityFn) || Object.is;
      let currentSlice = selector(api.getState());
      listener = (state) => {
        const nextSlice = selector(state);
        if (!equalityFn(currentSlice, nextSlice)) {
          const previousSlice = currentSlice;
          optListener(currentSlice = nextSlice, previousSlice);
        }
      };
      if (options == null ? void 0 : options.fireImmediately) {
        optListener(currentSlice, currentSlice);
      }
    }
    return origSubscribe(listener);
  });
  const initialState = fn(set, get, api);
  return initialState;
};
var subscribeWithSelector = subscribeWithSelectorImpl;

// node_modules/@react-three/drei/web/KeyboardControls.js
var context3 = React9.createContext(null);
function KeyboardControls({
  map,
  children,
  onChange,
  domElement
}) {
  const key = map.map((item) => item.name + item.keys).join("-");
  const useControls = React9.useMemo(() => {
    return create(subscribeWithSelector(() => map.reduce((prev, cur) => ({
      ...prev,
      [cur.name]: false
    }), {})));
  }, [key]);
  const api = React9.useMemo(() => [useControls.subscribe, useControls.getState, useControls], [key]);
  const set = useControls.setState;
  React9.useEffect(() => {
    const config = map.map(({
      name,
      keys,
      up
    }) => ({
      keys,
      up,
      fn: (value) => {
        set({
          [name]: value
        });
        if (onChange) onChange(name, value, api[1]());
      }
    }));
    const keyMap = config.reduce((out, {
      keys,
      fn,
      up = true
    }) => {
      keys.forEach((key2) => out[key2] = {
        fn,
        pressed: false,
        up
      });
      return out;
    }, {});
    const downHandler = ({
      key: key2,
      code
    }) => {
      const obj = keyMap[key2] || keyMap[code];
      if (!obj) return;
      const {
        fn,
        pressed,
        up
      } = obj;
      obj.pressed = true;
      if (up || !pressed) fn(true);
    };
    const upHandler = ({
      key: key2,
      code
    }) => {
      const obj = keyMap[key2] || keyMap[code];
      if (!obj) return;
      const {
        fn,
        up
      } = obj;
      obj.pressed = false;
      if (up) fn(false);
    };
    const source = domElement || window;
    source.addEventListener("keydown", downHandler, {
      passive: true
    });
    source.addEventListener("keyup", upHandler, {
      passive: true
    });
    return () => {
      source.removeEventListener("keydown", downHandler);
      source.removeEventListener("keyup", upHandler);
    };
  }, [domElement, key]);
  return React9.createElement(context3.Provider, {
    value: api,
    children
  });
}
function useKeyboardControls(sel) {
  const [sub, get, store] = React9.useContext(context3);
  if (sel) return store(sel);
  else return [sub, get];
}

// node_modules/@react-three/drei/web/Select.js
var React11 = __toESM(require_react());

// node_modules/zustand/esm/vanilla/shallow.mjs
var isIterable = (obj) => Symbol.iterator in obj;
var hasIterableEntries = (value) => (
  // HACK: avoid checking entries type
  "entries" in value
);
var compareEntries = (valueA, valueB) => {
  const mapA = valueA instanceof Map ? valueA : new Map(valueA.entries());
  const mapB = valueB instanceof Map ? valueB : new Map(valueB.entries());
  if (mapA.size !== mapB.size) {
    return false;
  }
  for (const [key, value] of mapA) {
    if (!mapB.has(key) || !Object.is(value, mapB.get(key))) {
      return false;
    }
  }
  return true;
};
var compareIterables = (valueA, valueB) => {
  const iteratorA = valueA[Symbol.iterator]();
  const iteratorB = valueB[Symbol.iterator]();
  let nextA = iteratorA.next();
  let nextB = iteratorB.next();
  while (!nextA.done && !nextB.done) {
    if (!Object.is(nextA.value, nextB.value)) {
      return false;
    }
    nextA = iteratorA.next();
    nextB = iteratorB.next();
  }
  return !!nextA.done && !!nextB.done;
};
function shallow(valueA, valueB) {
  if (Object.is(valueA, valueB)) {
    return true;
  }
  if (typeof valueA !== "object" || valueA === null || typeof valueB !== "object" || valueB === null) {
    return false;
  }
  if (Object.getPrototypeOf(valueA) !== Object.getPrototypeOf(valueB)) {
    return false;
  }
  if (isIterable(valueA) && isIterable(valueB)) {
    if (hasIterableEntries(valueA) && hasIterableEntries(valueB)) {
      return compareEntries(valueA, valueB);
    }
    return compareIterables(valueA, valueB);
  }
  return compareEntries(
    { entries: () => Object.entries(valueA) },
    { entries: () => Object.entries(valueB) }
  );
}

// node_modules/zustand/esm/react/shallow.mjs
var import_react3 = __toESM(require_react(), 1);

// node_modules/@react-three/drei/web/Select.js
var context4 = React11.createContext([]);
function Select({
  box,
  multiple,
  children,
  onChange,
  onChangePointerUp,
  border = "1px solid #55aaff",
  backgroundColor = "rgba(75, 160, 255, 0.1)",
  filter: customFilter = (item) => item,
  ...props
}) {
  const [downed, down] = React11.useState(false);
  const {
    setEvents,
    camera,
    raycaster,
    gl,
    controls,
    size,
    get
  } = useThree();
  const [hovered, hover] = React11.useState(false);
  const [active, dispatch] = React11.useReducer(
    // @ts-expect-error
    (state, {
      object,
      shift
    }) => {
      if (object === void 0) return [];
      else if (Array.isArray(object)) return object;
      else if (!shift) return state[0] === object ? [] : [object];
      else if (state.includes(object)) return state.filter((o) => o !== object);
      else return [object, ...state];
    },
    []
  );
  React11.useEffect(() => {
    if (downed) onChange == null || onChange(active);
    else onChangePointerUp == null || onChangePointerUp(active);
  }, [active, downed]);
  const onClick = React11.useCallback((e) => {
    e.stopPropagation();
    dispatch({
      object: customFilter([e.object])[0],
      shift: multiple && e.shiftKey
    });
  }, []);
  const onPointerMissed = React11.useCallback((e) => !hovered && dispatch({}), [hovered]);
  const ref = React11.useRef(null);
  React11.useEffect(() => {
    if (!box || !multiple) return;
    const selBox = new SelectionBox(camera, ref.current);
    const element = document.createElement("div");
    element.style.pointerEvents = "none";
    element.style.border = border;
    element.style.backgroundColor = backgroundColor;
    element.style.position = "fixed";
    const startPoint = new Vector2();
    const pointTopLeft = new Vector2();
    const pointBottomRight = new Vector2();
    const oldRaycasterEnabled = get().events.enabled;
    const oldControlsEnabled = controls == null ? void 0 : controls.enabled;
    let isDown = false;
    function prepareRay(event, vec) {
      const {
        offsetX,
        offsetY
      } = event;
      const {
        width,
        height
      } = size;
      vec.set(offsetX / width * 2 - 1, -(offsetY / height) * 2 + 1);
    }
    function onSelectStart(event) {
      var _gl$domElement$parent;
      if (controls) controls.enabled = false;
      setEvents({
        enabled: false
      });
      down(isDown = true);
      (_gl$domElement$parent = gl.domElement.parentElement) == null || _gl$domElement$parent.appendChild(element);
      element.style.left = `${event.clientX}px`;
      element.style.top = `${event.clientY}px`;
      element.style.width = "0px";
      element.style.height = "0px";
      startPoint.x = event.clientX;
      startPoint.y = event.clientY;
    }
    function onSelectMove(event) {
      pointBottomRight.x = Math.max(startPoint.x, event.clientX);
      pointBottomRight.y = Math.max(startPoint.y, event.clientY);
      pointTopLeft.x = Math.min(startPoint.x, event.clientX);
      pointTopLeft.y = Math.min(startPoint.y, event.clientY);
      element.style.left = `${pointTopLeft.x}px`;
      element.style.top = `${pointTopLeft.y}px`;
      element.style.width = `${pointBottomRight.x - pointTopLeft.x}px`;
      element.style.height = `${pointBottomRight.y - pointTopLeft.y}px`;
    }
    function onSelectOver() {
      if (isDown) {
        var _element$parentElemen;
        if (controls) controls.enabled = oldControlsEnabled;
        setEvents({
          enabled: oldRaycasterEnabled
        });
        down(isDown = false);
        (_element$parentElemen = element.parentElement) == null || _element$parentElemen.removeChild(element);
      }
    }
    function pointerDown(event) {
      if (event.shiftKey) {
        onSelectStart(event);
        prepareRay(event, selBox.startPoint);
      }
    }
    let previous = [];
    function pointerMove(event) {
      if (isDown) {
        onSelectMove(event);
        prepareRay(event, selBox.endPoint);
        const allSelected = selBox.select().sort((o) => o.uuid).filter((o) => o.isMesh);
        if (!shallow(allSelected, previous)) {
          previous = allSelected;
          dispatch({
            object: customFilter(allSelected)
          });
        }
      }
    }
    function pointerUp(event) {
      if (isDown) onSelectOver();
    }
    document.addEventListener("pointerdown", pointerDown, {
      passive: true
    });
    document.addEventListener("pointermove", pointerMove, {
      passive: true,
      capture: true
    });
    document.addEventListener("pointerup", pointerUp, {
      passive: true
    });
    return () => {
      document.removeEventListener("pointerdown", pointerDown);
      document.removeEventListener("pointermove", pointerMove, true);
      document.removeEventListener("pointerup", pointerUp);
    };
  }, [size.width, size.height, raycaster, camera, controls, gl]);
  return React11.createElement("group", _extends({
    ref,
    onClick,
    onPointerOver: () => hover(true),
    onPointerOut: () => hover(false),
    onPointerMissed
  }, props), React11.createElement(context4.Provider, {
    value: active
  }, children));
}
function useSelect() {
  return React11.useContext(context4);
}

// node_modules/@react-three/drei/core/Billboard.js
var React12 = __toESM(require_react());
var Billboard = React12.forwardRef(function Billboard2({
  children,
  follow = true,
  lockX = false,
  lockY = false,
  lockZ = false,
  ...props
}, fref) {
  const inner = React12.useRef(null);
  const localRef = React12.useRef(null);
  const q = new Quaternion();
  useFrame(({
    camera
  }) => {
    if (!follow || !localRef.current) return;
    const prevRotation = inner.current.rotation.clone();
    localRef.current.updateMatrix();
    localRef.current.updateWorldMatrix(false, false);
    localRef.current.getWorldQuaternion(q);
    camera.getWorldQuaternion(inner.current.quaternion).premultiply(q.invert());
    if (lockX) inner.current.rotation.x = prevRotation.x;
    if (lockY) inner.current.rotation.y = prevRotation.y;
    if (lockZ) inner.current.rotation.z = prevRotation.z;
  });
  React12.useImperativeHandle(fref, () => localRef.current, []);
  return React12.createElement("group", _extends({
    ref: localRef
  }, props), React12.createElement("group", {
    ref: inner
  }, children));
});

// node_modules/@react-three/drei/core/ScreenSpace.js
var React13 = __toESM(require_react());
var ScreenSpace = React13.forwardRef(({
  children,
  depth = -1,
  ...rest
}, ref) => {
  const localRef = React13.useRef(null);
  React13.useImperativeHandle(ref, () => localRef.current, []);
  useFrame(({
    camera
  }) => {
    localRef.current.quaternion.copy(camera.quaternion);
    localRef.current.position.copy(camera.position);
  });
  return React13.createElement("group", _extends({
    ref: localRef
  }, rest), React13.createElement("group", {
    "position-z": -depth
  }, children));
});

// node_modules/@react-three/drei/core/ScreenSizer.js
var React14 = __toESM(require_react());
var import_react4 = __toESM(require_react());

// node_modules/@react-three/drei/core/calculateScaleFactor.js
var tV0 = new Vector3();
var tV1 = new Vector3();
var tV2 = new Vector3();
var getPoint2 = (point3, camera, size) => {
  const widthHalf = size.width / 2;
  const heightHalf = size.height / 2;
  camera.updateMatrixWorld(false);
  const vector = point3.project(camera);
  vector.x = vector.x * widthHalf + widthHalf;
  vector.y = -(vector.y * heightHalf) + heightHalf;
  return vector;
};
var getPoint3 = (point2, camera, size, zValue = 1) => {
  const vector = tV0.set(point2.x / size.width * 2 - 1, -(point2.y / size.height) * 2 + 1, zValue);
  vector.unproject(camera);
  return vector;
};
var calculateScaleFactor = (point3, radiusPx, camera, size) => {
  const point2 = getPoint2(tV2.copy(point3), camera, size);
  let scale3 = 0;
  for (let i2 = 0; i2 < 2; ++i2) {
    const point2off = tV1.copy(point2).setComponent(i2, point2.getComponent(i2) + radiusPx);
    const point3off = getPoint3(point2off, camera, size, point2off.z);
    scale3 = Math.max(scale3, point3.distanceTo(point3off));
  }
  return scale3;
};

// node_modules/@react-three/drei/core/ScreenSizer.js
var worldPos = new Vector3();
var ScreenSizer = (0, import_react4.forwardRef)(({
  scale: scale3 = 1,
  ...props
}, ref) => {
  const container = (0, import_react4.useRef)(null);
  React14.useImperativeHandle(ref, () => container.current, []);
  useFrame((state) => {
    const obj = container.current;
    if (!obj) return;
    const sf = calculateScaleFactor(obj.getWorldPosition(worldPos), scale3, state.camera, state.size);
    obj.scale.setScalar(sf * scale3);
  });
  return React14.createElement("object3D", _extends({
    ref: container
  }, props));
});

// node_modules/@react-three/drei/core/QuadraticBezierLine.js
var React16 = __toESM(require_react());

// node_modules/@react-three/drei/core/Line.js
var React15 = __toESM(require_react());
var Line = React15.forwardRef(function Line4({
  points,
  color = 16777215,
  vertexColors,
  linewidth,
  lineWidth,
  segments,
  dashed,
  ...rest
}, ref) {
  var _vertexColors$, _ref;
  const size = useThree((state) => state.size);
  const line2 = React15.useMemo(() => segments ? new LineSegments2() : new Line2(), [segments]);
  const [lineMaterial] = React15.useState(() => new LineMaterial());
  const itemSize = (vertexColors == null || (_vertexColors$ = vertexColors[0]) == null ? void 0 : _vertexColors$.length) === 4 ? 4 : 3;
  const lineGeom = React15.useMemo(() => {
    const geom = segments ? new LineSegmentsGeometry() : new LineGeometry();
    const pValues = points.map((p) => {
      const isArray3 = Array.isArray(p);
      return p instanceof Vector3 || p instanceof Vector4 ? [p.x, p.y, p.z] : p instanceof Vector2 ? [p.x, p.y, 0] : isArray3 && p.length === 3 ? [p[0], p[1], p[2]] : isArray3 && p.length === 2 ? [p[0], p[1], 0] : p;
    });
    geom.setPositions(pValues.flat());
    if (vertexColors) {
      color = 16777215;
      const cValues = vertexColors.map((c) => c instanceof Color ? c.toArray() : c);
      geom.setColors(cValues.flat(), itemSize);
    }
    return geom;
  }, [points, segments, vertexColors, itemSize]);
  React15.useLayoutEffect(() => {
    line2.computeLineDistances();
  }, [points, line2]);
  React15.useLayoutEffect(() => {
    if (dashed) {
      lineMaterial.defines.USE_DASH = "";
    } else {
      delete lineMaterial.defines.USE_DASH;
    }
    lineMaterial.needsUpdate = true;
  }, [dashed, lineMaterial]);
  React15.useEffect(() => {
    return () => {
      lineGeom.dispose();
      lineMaterial.dispose();
    };
  }, [lineGeom]);
  return React15.createElement("primitive", _extends({
    object: line2,
    ref
  }, rest), React15.createElement("primitive", {
    object: lineGeom,
    attach: "geometry"
  }), React15.createElement("primitive", _extends({
    object: lineMaterial,
    attach: "material",
    color,
    vertexColors: Boolean(vertexColors),
    resolution: [size.width, size.height],
    linewidth: (_ref = linewidth !== null && linewidth !== void 0 ? linewidth : lineWidth) !== null && _ref !== void 0 ? _ref : 1,
    dashed,
    transparent: itemSize === 4
  }, rest)));
});

// node_modules/@react-three/drei/core/QuadraticBezierLine.js
var v = new Vector3();
var QuadraticBezierLine = React16.forwardRef(function QuadraticBezierLine2({
  start = [0, 0, 0],
  end = [0, 0, 0],
  mid,
  segments = 20,
  ...rest
}, forwardref) {
  const ref = React16.useRef(null);
  React16.useImperativeHandle(forwardref, () => ref.current);
  const [curve] = React16.useState(() => new QuadraticBezierCurve3(void 0, void 0, void 0));
  const getPoints = React16.useCallback((start2, end2, mid2, segments2 = 20) => {
    if (start2 instanceof Vector3) curve.v0.copy(start2);
    else curve.v0.set(...start2);
    if (end2 instanceof Vector3) curve.v2.copy(end2);
    else curve.v2.set(...end2);
    if (mid2 instanceof Vector3) {
      curve.v1.copy(mid2);
    } else if (Array.isArray(mid2)) {
      curve.v1.set(...mid2);
    } else {
      curve.v1.copy(curve.v0.clone().add(curve.v2.clone().sub(curve.v0)).add(v.set(0, curve.v0.y - curve.v2.y, 0)));
    }
    return curve.getPoints(segments2);
  }, []);
  React16.useLayoutEffect(() => {
    ref.current.setPoints = (start2, end2, mid2) => {
      const points2 = getPoints(start2, end2, mid2);
      if (ref.current.geometry) ref.current.geometry.setPositions(points2.map((p) => p.toArray()).flat());
    };
  }, []);
  const points = React16.useMemo(() => getPoints(start, end, mid, segments), [start, end, mid, segments]);
  return React16.createElement(Line, _extends({
    ref,
    points
  }, rest));
});

// node_modules/@react-three/drei/core/CubicBezierLine.js
var React17 = __toESM(require_react());
var CubicBezierLine = React17.forwardRef(function CubicBezierLine2({
  start,
  end,
  midA,
  midB,
  segments = 20,
  ...rest
}, ref) {
  const points = React17.useMemo(() => {
    const startV = start instanceof Vector3 ? start : new Vector3(...start);
    const endV = end instanceof Vector3 ? end : new Vector3(...end);
    const midAV = midA instanceof Vector3 ? midA : new Vector3(...midA);
    const midBV = midB instanceof Vector3 ? midB : new Vector3(...midB);
    const interpolatedV = new CubicBezierCurve3(startV, midAV, midBV, endV).getPoints(segments);
    return interpolatedV;
  }, [start, end, midA, midB, segments]);
  return React17.createElement(Line, _extends({
    ref,
    points
  }, rest));
});

// node_modules/@react-three/drei/core/CatmullRomLine.js
var React18 = __toESM(require_react());
var CatmullRomLine = React18.forwardRef(function CatmullRomLine2({
  points,
  closed = false,
  curveType = "centripetal",
  tension = 0.5,
  segments = 20,
  vertexColors,
  ...rest
}, ref) {
  const curve = React18.useMemo(() => {
    const mappedPoints = points.map((pt) => pt instanceof Vector3 ? pt : new Vector3(...pt));
    return new CatmullRomCurve3(mappedPoints, closed, curveType, tension);
  }, [points, closed, curveType, tension]);
  const segmentedPoints = React18.useMemo(() => curve.getPoints(segments), [curve, segments]);
  const interpolatedVertexColors = React18.useMemo(() => {
    if (!vertexColors || vertexColors.length < 2) return void 0;
    if (vertexColors.length === segments + 1) return vertexColors;
    const mappedColors = vertexColors.map((color) => color instanceof Color ? color : new Color(...color));
    if (closed) mappedColors.push(mappedColors[0].clone());
    const iColors = [mappedColors[0]];
    const divisions = segments / (mappedColors.length - 1);
    for (let i2 = 1; i2 < segments; i2++) {
      const alpha = i2 % divisions / divisions;
      const colorIndex = Math.floor(i2 / divisions);
      iColors.push(mappedColors[colorIndex].clone().lerp(mappedColors[colorIndex + 1], alpha));
    }
    iColors.push(mappedColors[mappedColors.length - 1]);
    return iColors;
  }, [vertexColors, segments]);
  return React18.createElement(Line, _extends({
    ref,
    points: segmentedPoints,
    vertexColors: interpolatedVertexColors
  }, rest));
});

// node_modules/@react-three/drei/core/PositionalAudio.js
var React19 = __toESM(require_react());
var PositionalAudio = React19.forwardRef(({
  url,
  distance = 1,
  loop = true,
  autoplay,
  ...props
}, ref) => {
  const sound = React19.useRef(null);
  React19.useImperativeHandle(ref, () => sound.current, []);
  const camera = useThree(({
    camera: camera2
  }) => camera2);
  const [listener] = React19.useState(() => new AudioListener());
  const buffer = useLoader(AudioLoader, url);
  React19.useEffect(() => {
    const _sound = sound.current;
    if (_sound) {
      _sound.setBuffer(buffer);
      _sound.setRefDistance(distance);
      _sound.setLoop(loop);
      if (autoplay && !_sound.isPlaying) _sound.play();
    }
  }, [buffer, camera, distance, loop]);
  React19.useEffect(() => {
    const _sound = sound.current;
    camera.add(listener);
    return () => {
      camera.remove(listener);
      if (_sound) {
        if (_sound.isPlaying) _sound.stop();
        if (_sound.source && _sound.source._connected) _sound.disconnect();
      }
    };
  }, []);
  return React19.createElement("positionalAudio", _extends({
    ref: sound,
    args: [listener]
  }, props));
});

// node_modules/@react-three/drei/core/Text.js
var React20 = __toESM(require_react());
var Text2 = React20.forwardRef(({
  sdfGlyphSize = 64,
  anchorX = "center",
  anchorY = "middle",
  font,
  fontSize = 1,
  children,
  characters,
  onSync,
  ...props
}, ref) => {
  const invalidate = useThree(({
    invalidate: invalidate2
  }) => invalidate2);
  const [troikaMesh] = React20.useState(() => new Text());
  const [nodes, text] = React20.useMemo(() => {
    const n = [];
    let t = "";
    React20.Children.forEach(children, (child) => {
      if (typeof child === "string" || typeof child === "number") {
        t += child;
      } else {
        n.push(child);
      }
    });
    return [n, t];
  }, [children]);
  suspend(() => new Promise((res) => preloadFont({
    font,
    characters
  }, res)), ["troika-text", font, characters]);
  React20.useLayoutEffect(() => void troikaMesh.sync(() => {
    invalidate();
    if (onSync) onSync(troikaMesh);
  }));
  React20.useEffect(() => {
    return () => troikaMesh.dispose();
  }, [troikaMesh]);
  return React20.createElement("primitive", _extends({
    object: troikaMesh,
    ref,
    font,
    text,
    anchorX,
    anchorY,
    fontSize,
    sdfGlyphSize
  }, props), nodes);
});

// node_modules/@react-three/drei/core/Text3D.js
var React21 = __toESM(require_react());
var import_react5 = __toESM(require_react());

// node_modules/@react-three/drei/core/useFont.js
var fontLoader = null;
async function loadFontData(font) {
  return typeof font === "string" ? await (await fetch(font)).json() : font;
}
function parseFontData(fontData) {
  if (!fontLoader) {
    fontLoader = new FontLoader();
  }
  return fontLoader.parse(fontData);
}
async function loader(font) {
  const data = await loadFontData(font);
  return parseFontData(data);
}
function useFont(font) {
  return suspend(loader, [font]);
}
useFont.preload = (font) => preload(loader, [font]);
useFont.clear = (font) => clear([font]);

// node_modules/@react-three/drei/core/Text3D.js
var types = ["string", "number"];
var getTextFromChildren = (children) => {
  let label = "";
  const rest = [];
  React21.Children.forEach(children, (child) => {
    if (types.includes(typeof child)) label += child + "";
    else rest.push(child);
  });
  return [label, ...rest];
};
var Text3D = React21.forwardRef(({
  font: _font,
  letterSpacing = 0,
  lineHeight = 1,
  size = 1,
  height = 0.2,
  bevelThickness = 0.1,
  bevelSize = 0.01,
  bevelEnabled = false,
  bevelOffset = 0,
  bevelSegments = 4,
  curveSegments = 8,
  smooth,
  children,
  ...props
}, fref) => {
  React21.useMemo(() => extend({
    RenamedTextGeometry: TextGeometry
  }), []);
  const ref = React21.useRef(null);
  const font = useFont(_font);
  const opts = (0, import_react5.useMemo)(() => {
    return {
      font,
      size,
      height,
      bevelThickness,
      bevelSize,
      bevelEnabled,
      bevelSegments,
      bevelOffset,
      curveSegments,
      letterSpacing,
      lineHeight
    };
  }, [font, size, height, bevelThickness, bevelSize, bevelEnabled, bevelSegments, bevelOffset, curveSegments, letterSpacing, lineHeight]);
  const [label, ...rest] = (0, import_react5.useMemo)(() => getTextFromChildren(children), [children]);
  const args = React21.useMemo(() => [label, opts], [label, opts]);
  React21.useLayoutEffect(() => {
    if (smooth) {
      ref.current.geometry = mergeVertices(ref.current.geometry, smooth);
      ref.current.geometry.computeVertexNormals();
    }
  }, [args, smooth]);
  React21.useImperativeHandle(fref, () => ref.current, []);
  return React21.createElement("mesh", _extends({}, props, {
    ref
  }), React21.createElement("renamedTextGeometry", {
    args
  }), rest);
});

// node_modules/@react-three/drei/core/Effects.js
var React22 = __toESM(require_react());
var isWebGL2Available = () => {
  try {
    var canvas = document.createElement("canvas");
    return !!(window.WebGL2RenderingContext && canvas.getContext("webgl2"));
  } catch (e) {
    return false;
  }
};
var Effects = React22.forwardRef(({
  children,
  multisamping = 8,
  renderIndex = 1,
  disableRender,
  disableGamma,
  disableRenderPass,
  depthBuffer = true,
  stencilBuffer = false,
  anisotropy = 1,
  colorSpace,
  type,
  ...props
}, ref) => {
  React22.useMemo(() => extend({
    EffectComposer,
    RenderPass,
    ShaderPass
  }), []);
  const composer = React22.useRef(null);
  React22.useImperativeHandle(ref, () => composer.current, []);
  const {
    scene,
    camera,
    gl,
    size,
    viewport
  } = useThree();
  const [target2] = React22.useState(() => {
    const t = new WebGLRenderTarget(size.width, size.height, {
      type: type || HalfFloatType,
      format: RGBAFormat,
      depthBuffer,
      stencilBuffer,
      anisotropy
    });
    if (type === UnsignedByteType && colorSpace != null) {
      t.texture.colorSpace = colorSpace;
    }
    t.samples = multisamping;
    return t;
  });
  React22.useEffect(() => {
    var _composer$current, _composer$current2;
    (_composer$current = composer.current) == null || _composer$current.setSize(size.width, size.height);
    (_composer$current2 = composer.current) == null || _composer$current2.setPixelRatio(viewport.dpr);
  }, [gl, size, viewport.dpr]);
  useFrame(() => {
    var _composer$current3;
    if (!disableRender) (_composer$current3 = composer.current) == null || _composer$current3.render();
  }, renderIndex);
  const passes = [];
  if (!disableRenderPass) passes.push(React22.createElement("renderPass", {
    key: "renderpass",
    attach: `passes-${passes.length}`,
    args: [scene, camera]
  }));
  if (!disableGamma) passes.push(React22.createElement("shaderPass", {
    attach: `passes-${passes.length}`,
    key: "gammapass",
    args: [GammaCorrectionShader]
  }));
  React22.Children.forEach(children, (el) => {
    el && passes.push(React22.cloneElement(el, {
      key: passes.length,
      attach: `passes-${passes.length}`
    }));
  });
  return React22.createElement("effectComposer", _extends({
    ref: composer,
    args: [gl, target2]
  }, props), passes);
});

// node_modules/@react-three/drei/core/GradientTexture.js
var React23 = __toESM(require_react());
var GradientType = (function(GradientType2) {
  GradientType2["Linear"] = "linear";
  GradientType2["Radial"] = "radial";
  return GradientType2;
})({});
function GradientTexture({
  stops,
  colors: colors2,
  size = 1024,
  width = 16,
  type = GradientType.Linear,
  innerCircleRadius = 0,
  outerCircleRadius = "auto",
  ...props
}) {
  const gl = useThree((state) => state.gl);
  const canvas = React23.useMemo(() => {
    const canvas2 = document.createElement("canvas");
    const context12 = canvas2.getContext("2d");
    canvas2.width = width;
    canvas2.height = size;
    let gradient;
    if (type === GradientType.Linear) {
      gradient = context12.createLinearGradient(0, 0, 0, size);
    } else {
      const canvasCenterX = canvas2.width / 2;
      const canvasCenterY = canvas2.height / 2;
      const radius = outerCircleRadius !== "auto" ? Math.abs(Number(outerCircleRadius)) : Math.sqrt(canvasCenterX ** 2 + canvasCenterY ** 2);
      gradient = context12.createRadialGradient(canvasCenterX, canvasCenterY, Math.abs(innerCircleRadius), canvasCenterX, canvasCenterY, radius);
    }
    const tempColor = new Color();
    let i2 = stops.length;
    while (i2--) {
      gradient.addColorStop(stops[i2], tempColor.set(colors2[i2]).getStyle());
    }
    context12.save();
    context12.fillStyle = gradient;
    context12.fillRect(0, 0, width, size);
    context12.restore();
    return canvas2;
  }, [stops]);
  return React23.createElement("canvasTexture", _extends({
    colorSpace: gl.outputColorSpace,
    args: [canvas],
    attach: "map"
  }, props));
}

// node_modules/@react-three/drei/core/Image.js
var React25 = __toESM(require_react());

// node_modules/@react-three/drei/core/shaderMaterial.js
function shaderMaterial(uniforms, vertexShader, fragmentShader, onInit) {
  var _Class;
  return _Class = class extends ShaderMaterial {
    constructor(parameters) {
      super({
        vertexShader,
        fragmentShader,
        ...parameters
      });
      for (const key in uniforms) {
        this.uniforms[key] = new Uniform(uniforms[key]);
        Object.defineProperty(this, key, {
          get() {
            return this.uniforms[key].value;
          },
          set(value) {
            this.uniforms[key].value = value;
          }
        });
      }
      this.uniforms = UniformsUtils.clone(this.uniforms);
      onInit == null || onInit(this);
    }
  }, _Class.key = MathUtils.generateUUID(), _Class;
}

// node_modules/@react-three/drei/core/Texture.js
var React24 = __toESM(require_react());
var import_react6 = __toESM(require_react());
var IsObject = (url) => url === Object(url) && !Array.isArray(url) && typeof url !== "function";
function useTexture(input, onLoad) {
  const gl = useThree((state) => state.gl);
  const textures = useLoader(TextureLoader, IsObject(input) ? Object.values(input) : input);
  (0, import_react6.useLayoutEffect)(() => {
    onLoad == null || onLoad(textures);
  }, [onLoad]);
  (0, import_react6.useEffect)(() => {
    if ("initTexture" in gl) {
      let textureArray = [];
      if (Array.isArray(textures)) {
        textureArray = textures;
      } else if (textures instanceof Texture) {
        textureArray = [textures];
      } else if (IsObject(textures)) {
        textureArray = Object.values(textures);
      }
      textureArray.forEach((texture) => {
        if (texture instanceof Texture) {
          gl.initTexture(texture);
        }
      });
    }
  }, [gl, textures]);
  const mappedTextures = (0, import_react6.useMemo)(() => {
    if (IsObject(input)) {
      const keyed = {};
      let i2 = 0;
      for (const key in input) keyed[key] = textures[i2++];
      return keyed;
    } else {
      return textures;
    }
  }, [input, textures]);
  return mappedTextures;
}
useTexture.preload = (url) => useLoader.preload(TextureLoader, url);
useTexture.clear = (input) => useLoader.clear(TextureLoader, input);
var Texture2 = ({
  children,
  input,
  onLoad
}) => {
  const ret = useTexture(input, onLoad);
  return React24.createElement(React24.Fragment, null, children == null ? void 0 : children(ret));
};

// node_modules/@react-three/drei/helpers/constants.js
var getVersion = () => parseInt(REVISION.replace(/\D+/g, ""));
var version = getVersion();

// node_modules/@react-three/drei/core/Image.js
var ImageMaterialImpl = shaderMaterial(
  {
    color: new Color("white"),
    scale: new Vector2(1, 1),
    imageBounds: new Vector2(1, 1),
    resolution: 1024,
    map: null,
    zoom: 1,
    radius: 0,
    grayscale: 0,
    opacity: 1
  },
  /* glsl */
  `
  varying vec2 vUv;
  varying vec2 vPos;
  void main() {
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.);
    vUv = uv;
    vPos = position.xy;
  }
`,
  /* glsl */
  `
  // mostly from https://gist.github.com/statico/df64c5d167362ecf7b34fca0b1459a44
  varying vec2 vUv;
  varying vec2 vPos;
  uniform vec2 scale;
  uniform vec2 imageBounds;
  uniform float resolution;
  uniform vec3 color;
  uniform sampler2D map;
  uniform float radius;
  uniform float zoom;
  uniform float grayscale;
  uniform float opacity;
  const vec3 luma = vec3(.299, 0.587, 0.114);
  vec4 toGrayscale(vec4 color, float intensity) {
    return vec4(mix(color.rgb, vec3(dot(color.rgb, luma)), intensity), color.a);
  }
  vec2 aspect(vec2 size) {
    return size / min(size.x, size.y);
  }
  
  const float PI = 3.14159265;
    
  // from https://iquilezles.org/articles/distfunctions
  float udRoundBox( vec2 p, vec2 b, float r ) {
    return length(max(abs(p)-b+r,0.0))-r;
  }

  void main() {
    vec2 s = aspect(scale);
    vec2 i = aspect(imageBounds);
    float rs = s.x / s.y;
    float ri = i.x / i.y;
    vec2 new = rs < ri ? vec2(i.x * s.y / i.y, s.y) : vec2(s.x, i.y * s.x / i.x);
    vec2 offset = (rs < ri ? vec2((new.x - s.x) / 2.0, 0.0) : vec2(0.0, (new.y - s.y) / 2.0)) / new;
    vec2 uv = vUv * s / new + offset;
    vec2 zUv = (uv - vec2(0.5, 0.5)) / zoom + vec2(0.5, 0.5);

    vec2 res = vec2(scale * resolution);
    vec2 halfRes = 0.5 * res;
    float b = udRoundBox(vUv.xy * res - halfRes, halfRes, resolution * radius);    
	  vec3 a = mix(vec3(1.0,0.0,0.0), vec3(0.0,0.0,0.0), smoothstep(0.0, 1.0, b));
    gl_FragColor = toGrayscale(texture2D(map, zUv) * vec4(color, opacity * a), grayscale);
    
    #include <tonemapping_fragment>
    #include <${version >= 154 ? "colorspace_fragment" : "encodings_fragment"}>
  }
`
);
var ImageBase = React25.forwardRef(({
  children,
  color,
  segments = 1,
  scale: scale3 = 1,
  zoom = 1,
  grayscale = 0,
  opacity = 1,
  radius = 0,
  texture,
  toneMapped,
  transparent,
  side,
  ...props
}, fref) => {
  extend({
    ImageMaterial: ImageMaterialImpl
  });
  const ref = React25.useRef(null);
  const size = useThree((state) => state.size);
  const planeBounds = Array.isArray(scale3) ? [scale3[0], scale3[1]] : [scale3, scale3];
  const imageBounds = [texture.image.width, texture.image.height];
  const resolution = Math.max(size.width, size.height);
  React25.useImperativeHandle(fref, () => ref.current, []);
  React25.useLayoutEffect(() => {
    if (ref.current.geometry.parameters) {
      ref.current.material.scale.set(
        // @ts-ignore
        planeBounds[0] * ref.current.geometry.parameters.width,
        // @ts-ignore
        planeBounds[1] * ref.current.geometry.parameters.height
      );
    }
  }, [planeBounds[0], planeBounds[1]]);
  return React25.createElement("mesh", _extends({
    ref,
    scale: Array.isArray(scale3) ? [...scale3, 1] : scale3
  }, props), React25.createElement("planeGeometry", {
    args: [1, 1, segments, segments]
  }), React25.createElement("imageMaterial", {
    color,
    map: texture,
    zoom,
    grayscale,
    opacity,
    scale: planeBounds,
    imageBounds,
    resolution,
    radius,
    toneMapped,
    transparent,
    side,
    key: ImageMaterialImpl.key
  }), children);
});
var ImageWithUrl = React25.forwardRef(({
  url,
  ...props
}, ref) => {
  const texture = useTexture(url);
  return React25.createElement(ImageBase, _extends({}, props, {
    texture,
    ref
  }));
});
var ImageWithTexture = React25.forwardRef(({
  url: _url,
  ...props
}, ref) => {
  return React25.createElement(ImageBase, _extends({}, props, {
    ref
  }));
});
var Image = React25.forwardRef((props, ref) => {
  if (props.url) return React25.createElement(ImageWithUrl, _extends({}, props, {
    ref
  }));
  else if (props.texture) return React25.createElement(ImageWithTexture, _extends({}, props, {
    ref
  }));
  else throw new Error("<Image /> requires a url or texture");
});

// node_modules/@react-three/drei/core/Edges.js
var React26 = __toESM(require_react());
var Edges = React26.forwardRef(({
  threshold = 15,
  geometry: explicitGeometry,
  ...props
}, fref) => {
  const ref = React26.useRef(null);
  React26.useImperativeHandle(fref, () => ref.current, []);
  const tmpPoints = React26.useMemo(() => [0, 0, 0, 1, 0, 0], []);
  const memoizedGeometry = React26.useRef(null);
  const memoizedThreshold = React26.useRef(null);
  React26.useLayoutEffect(() => {
    const parent = ref.current.parent;
    const geometry2 = explicitGeometry !== null && explicitGeometry !== void 0 ? explicitGeometry : parent == null ? void 0 : parent.geometry;
    if (!geometry2) return;
    const cached = memoizedGeometry.current === geometry2 && memoizedThreshold.current === threshold;
    if (cached) return;
    memoizedGeometry.current = geometry2;
    memoizedThreshold.current = threshold;
    const points = new EdgesGeometry(geometry2, threshold).attributes.position.array;
    ref.current.geometry.setPositions(points);
    ref.current.geometry.attributes.instanceStart.needsUpdate = true;
    ref.current.geometry.attributes.instanceEnd.needsUpdate = true;
    ref.current.computeLineDistances();
  });
  return React26.createElement(Line, _extends({
    segments: true,
    points: tmpPoints,
    ref,
    raycast: () => null
  }, props));
});

// node_modules/@react-three/drei/core/Outlines.js
var React27 = __toESM(require_react());
var OutlinesMaterial = shaderMaterial({
  screenspace: false,
  color: new Color("black"),
  opacity: 1,
  thickness: 0.05,
  size: new Vector2()
}, `#include <common>
   #include <morphtarget_pars_vertex>
   #include <skinning_pars_vertex>
   #include <clipping_planes_pars_vertex>
   uniform float thickness;
   uniform bool screenspace;
   uniform vec2 size;
   void main() {
     #if defined (USE_SKINNING)
	     #include <beginnormal_vertex>
       #include <morphnormal_vertex>
       #include <skinbase_vertex>
       #include <skinnormal_vertex>
       #include <defaultnormal_vertex>
     #endif
     #include <begin_vertex>
	   #include <morphtarget_vertex>
	   #include <skinning_vertex>
     #include <project_vertex>
     #include <clipping_planes_vertex>
     vec4 tNormal = vec4(normal, 0.0);
     vec4 tPosition = vec4(transformed, 1.0);
     #ifdef USE_INSTANCING
       tNormal = instanceMatrix * tNormal;
       tPosition = instanceMatrix * tPosition;
     #endif
     if (screenspace) {
       vec3 newPosition = tPosition.xyz + tNormal.xyz * thickness;
       gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0); 
     } else {
       vec4 clipPosition = projectionMatrix * modelViewMatrix * tPosition;
       vec4 clipNormal = projectionMatrix * modelViewMatrix * tNormal;
       vec2 offset = normalize(clipNormal.xy) * thickness / size * clipPosition.w * 2.0;
       clipPosition.xy += offset;
       gl_Position = clipPosition;
     }
   }`, `uniform vec3 color;
   uniform float opacity;
   #include <clipping_planes_pars_fragment>
   void main(){
     #include <clipping_planes_fragment>
     gl_FragColor = vec4(color, opacity);
     #include <tonemapping_fragment>
     #include <${version >= 154 ? "colorspace_fragment" : "encodings_fragment"}>
   }`);
function Outlines({
  color = "black",
  opacity = 1,
  transparent = false,
  screenspace = false,
  toneMapped = true,
  polygonOffset = false,
  polygonOffsetFactor = 0,
  renderOrder = 0,
  thickness = 0.05,
  angle = Math.PI,
  clippingPlanes,
  ...props
}) {
  const ref = React27.useRef(null);
  const [material] = React27.useState(() => new OutlinesMaterial({
    side: BackSide
  }));
  const {
    gl
  } = useThree();
  const contextSize = gl.getDrawingBufferSize(new Vector2());
  React27.useMemo(() => extend({
    OutlinesMaterial
  }), []);
  const oldAngle = React27.useRef(0);
  const oldGeometry = React27.useRef(null);
  React27.useLayoutEffect(() => {
    const group = ref.current;
    if (!group) return;
    const parent = group.parent;
    if (parent && parent.geometry) {
      if (oldAngle.current !== angle || oldGeometry.current !== parent.geometry) {
        var _group$children;
        oldAngle.current = angle;
        oldGeometry.current = parent.geometry;
        let mesh = (_group$children = group.children) == null ? void 0 : _group$children[0];
        if (mesh) {
          if (angle) mesh.geometry.dispose();
          group.remove(mesh);
        }
        if (parent.skeleton) {
          mesh = new SkinnedMesh();
          mesh.material = material;
          mesh.bind(parent.skeleton, parent.bindMatrix);
          group.add(mesh);
        } else if (parent.isInstancedMesh) {
          mesh = new InstancedMesh(parent.geometry, material, parent.count);
          mesh.instanceMatrix = parent.instanceMatrix;
          group.add(mesh);
        } else {
          mesh = new Mesh();
          mesh.material = material;
          group.add(mesh);
        }
        mesh.geometry = angle ? toCreasedNormals(parent.geometry, angle) : parent.geometry;
        mesh.morphTargetInfluences = parent.morphTargetInfluences;
        mesh.morphTargetDictionary = parent.morphTargetDictionary;
      }
    }
  });
  React27.useLayoutEffect(() => {
    const group = ref.current;
    if (!group) return;
    const mesh = group.children[0];
    if (mesh) {
      mesh.renderOrder = renderOrder;
      const parent = group.parent;
      applyProps(mesh, {
        morphTargetInfluences: parent.morphTargetInfluences,
        morphTargetDictionary: parent.morphTargetDictionary
      });
      applyProps(mesh.material, {
        transparent,
        thickness,
        color,
        opacity,
        size: contextSize,
        screenspace,
        toneMapped,
        polygonOffset,
        polygonOffsetFactor,
        clippingPlanes,
        clipping: clippingPlanes && clippingPlanes.length > 0
      });
    }
  });
  React27.useEffect(() => {
    return () => {
      const group = ref.current;
      if (!group) return;
      const mesh = group.children[0];
      if (mesh) {
        if (angle) mesh.geometry.dispose();
        group.remove(mesh);
      }
    };
  }, []);
  return React27.createElement("group", _extends({
    ref
  }, props));
}

// node_modules/@react-three/drei/core/Trail.js
var React28 = __toESM(require_react());
var defaults = {
  width: 0.2,
  length: 1,
  decay: 1,
  local: false,
  stride: 0,
  interval: 1
};
var shiftLeft = (collection, steps = 1) => {
  collection.set(collection.subarray(steps));
  collection.fill(-Infinity, -steps);
  return collection;
};
function useTrail(target2, settings) {
  const {
    length,
    local,
    decay,
    interval,
    stride
  } = {
    ...defaults,
    ...settings
  };
  const points = React28.useRef(null);
  const [worldPosition] = React28.useState(() => new Vector3());
  React28.useLayoutEffect(() => {
    if (target2) {
      points.current = Float32Array.from({
        length: length * 10 * 3
      }, (_, i2) => target2.position.getComponent(i2 % 3));
    }
  }, [length, target2]);
  const prevPosition = React28.useRef(new Vector3());
  const frameCount = React28.useRef(0);
  useFrame(() => {
    if (!target2) return;
    if (!points.current) return;
    if (frameCount.current === 0) {
      let newPosition;
      if (local) {
        newPosition = target2.position;
      } else {
        target2.getWorldPosition(worldPosition);
        newPosition = worldPosition;
      }
      const steps = 1 * decay;
      for (let i2 = 0; i2 < steps; i2++) {
        if (newPosition.distanceTo(prevPosition.current) < stride) continue;
        shiftLeft(points.current, 3);
        points.current.set(newPosition.toArray(), points.current.length - 3);
      }
      prevPosition.current.copy(newPosition);
    }
    frameCount.current++;
    frameCount.current = frameCount.current % interval;
  });
  return points;
}
var Trail = React28.forwardRef((props, forwardRef82) => {
  const {
    children
  } = props;
  const {
    width,
    length,
    decay,
    local,
    stride,
    interval
  } = {
    ...defaults,
    ...props
  };
  const {
    color = "hotpink",
    attenuation,
    target: target2
  } = props;
  const size = useThree((s) => s.size);
  const scene = useThree((s) => s.scene);
  const ref = React28.useRef(null);
  const [anchor, setAnchor] = React28.useState(null);
  const points = useTrail(anchor, {
    length,
    decay,
    local,
    stride,
    interval
  });
  React28.useEffect(() => {
    const t = (target2 == null ? void 0 : target2.current) || ref.current.children.find((o) => {
      return o instanceof Object3D;
    });
    if (t) {
      setAnchor(t);
    }
  }, [points, target2]);
  const geo = React28.useMemo(() => new MeshLineGeometry(), []);
  const mat = React28.useMemo(() => {
    var _matOverride, _matOverride2;
    const m = new MeshLineMaterial({
      lineWidth: 0.1 * width,
      color,
      sizeAttenuation: 1,
      resolution: new Vector2(size.width, size.height)
    });
    let matOverride;
    if (children) {
      if (Array.isArray(children)) {
        matOverride = children.find((child) => {
          const c = child;
          return typeof c.type === "string" && c.type === "meshLineMaterial";
        });
      } else {
        const c = children;
        if (typeof c.type === "string" && c.type === "meshLineMaterial") {
          matOverride = c;
        }
      }
    }
    if (typeof ((_matOverride = matOverride) == null ? void 0 : _matOverride.props) === "object" && ((_matOverride2 = matOverride) == null ? void 0 : _matOverride2.props) !== null) {
      m.setValues(matOverride.props);
    }
    return m;
  }, [width, color, size, children]);
  React28.useEffect(() => {
    mat.uniforms.resolution.value.set(size.width, size.height);
  }, [size]);
  useFrame(() => {
    if (!points.current) return;
    geo.setPoints(points.current, attenuation);
  });
  return React28.createElement("group", null, createPortal(React28.createElement("mesh", {
    ref: forwardRef82,
    geometry: geo,
    material: mat
  }), scene), React28.createElement("group", {
    ref
  }, children));
});

// node_modules/@react-three/drei/core/Sampler.js
var React29 = __toESM(require_react());
function useSurfaceSampler(mesh, count = 16, transform, weight, instanceMesh) {
  const [buffer, setBuffer] = React29.useState(() => {
    const arr = Array.from({
      length: count
    }, () => [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]).flat();
    return new InstancedBufferAttribute(Float32Array.from(arr), 16);
  });
  React29.useLayoutEffect(() => {
    if (typeof mesh.current === "undefined") return;
    const sampler = new MeshSurfaceSampler(mesh.current);
    if (weight) {
      sampler.setWeightAttribute(weight);
    }
    sampler.build();
    const position2 = new Vector3();
    const normal2 = new Vector3();
    const color = new Color();
    const dummy2 = new Object3D();
    mesh.current.updateMatrixWorld(true);
    for (let i2 = 0; i2 < count; i2++) {
      sampler.sample(position2, normal2, color);
      if (typeof transform === "function") {
        transform({
          dummy: dummy2,
          sampledMesh: mesh.current,
          position: position2,
          normal: normal2,
          color
        }, i2);
      } else {
        dummy2.position.copy(position2);
      }
      dummy2.updateMatrix();
      if (instanceMesh != null && instanceMesh.current) {
        instanceMesh.current.setMatrixAt(i2, dummy2.matrix);
      }
      dummy2.matrix.toArray(buffer.array, i2 * 16);
    }
    if (instanceMesh != null && instanceMesh.current) {
      instanceMesh.current.instanceMatrix.needsUpdate = true;
    }
    buffer.needsUpdate = true;
    setBuffer(new InstancedBufferAttribute(buffer.array, buffer.itemSize).copy(buffer));
  }, [mesh, instanceMesh, weight, count, transform]);
  return buffer;
}
function Sampler({
  children,
  weight,
  transform,
  instances,
  mesh,
  count = 16,
  ...props
}) {
  const group = React29.useRef(null);
  const instancedRef = React29.useRef(null);
  const meshToSampleRef = React29.useRef(null);
  React29.useLayoutEffect(() => {
    var _instances$current, _mesh$current;
    instancedRef.current = (_instances$current = instances == null ? void 0 : instances.current) !== null && _instances$current !== void 0 ? _instances$current : group.current.children.find((c) => c.hasOwnProperty("instanceMatrix"));
    meshToSampleRef.current = (_mesh$current = mesh == null ? void 0 : mesh.current) !== null && _mesh$current !== void 0 ? _mesh$current : group.current.children.find((c) => c.type === "Mesh");
  }, [children, mesh == null ? void 0 : mesh.current, instances == null ? void 0 : instances.current]);
  useSurfaceSampler(meshToSampleRef, count, transform, weight, instancedRef);
  return React29.createElement("group", _extends({
    ref: group
  }, props), children);
}

// node_modules/@react-three/drei/core/ComputedAttribute.js
var React30 = __toESM(require_react());
var ComputedAttribute = ({
  compute,
  name,
  ...props
}) => {
  const [bufferAttribute] = React30.useState(() => new BufferAttribute(new Float32Array(0), 1));
  const primitive = React30.useRef(null);
  React30.useLayoutEffect(() => {
    if (primitive.current) {
      var _ref;
      const parent = (_ref = primitive.current.parent) !== null && _ref !== void 0 ? _ref : primitive.current.__r3f.parent.object;
      const attr = compute(parent);
      primitive.current.copy(attr);
    }
  }, [compute]);
  return React30.createElement("primitive", _extends({
    ref: primitive,
    object: bufferAttribute,
    attach: `attributes-${name}`
  }, props));
};

// node_modules/@react-three/drei/core/Clone.js
var React31 = __toESM(require_react());
function createSpread(child, {
  keys = ["near", "far", "color", "distance", "decay", "penumbra", "angle", "intensity", "skeleton", "visible", "castShadow", "receiveShadow", "morphTargetDictionary", "morphTargetInfluences", "name", "geometry", "material", "position", "rotation", "scale", "up", "userData", "bindMode", "bindMatrix", "bindMatrixInverse", "skeleton"],
  deep,
  inject,
  castShadow,
  receiveShadow
}) {
  let spread = {};
  for (const key of keys) {
    spread[key] = child[key];
  }
  if (deep) {
    if (spread.geometry && deep !== "materialsOnly") spread.geometry = spread.geometry.clone();
    if (spread.material && deep !== "geometriesOnly") spread.material = spread.material.clone();
  }
  if (inject) {
    if (typeof inject === "function") spread = {
      ...spread,
      children: inject(child)
    };
    else if (React31.isValidElement(inject)) spread = {
      ...spread,
      children: inject
    };
    else spread = {
      ...spread,
      ...inject
    };
  }
  if (child instanceof Mesh) {
    if (castShadow) spread.castShadow = true;
    if (receiveShadow) spread.receiveShadow = true;
  }
  return spread;
}
var Clone = React31.forwardRef(({
  isChild = false,
  object,
  children,
  deep,
  castShadow,
  receiveShadow,
  inject,
  keys,
  ...props
}, forwardRef82) => {
  const config = {
    keys,
    deep,
    inject,
    castShadow,
    receiveShadow
  };
  object = React31.useMemo(() => {
    if (isChild === false && !Array.isArray(object)) {
      let isSkinned = false;
      object.traverse((object2) => {
        if (object2.isSkinnedMesh) isSkinned = true;
      });
      if (isSkinned) return SkeletonUtils.clone(object);
    }
    return object;
  }, [object, isChild]);
  if (Array.isArray(object)) {
    return React31.createElement("group", _extends({}, props, {
      ref: forwardRef82
    }), object.map((o) => React31.createElement(Clone, _extends({
      key: o.uuid,
      object: o
    }, config))), children);
  }
  const {
    children: injectChildren,
    ...spread
  } = createSpread(object, config);
  const Element = object.type[0].toLowerCase() + object.type.slice(1);
  return React31.createElement(Element, _extends({}, spread, props, {
    ref: forwardRef82
  }), object.children.map((child) => {
    if (child.type === "Bone") return React31.createElement("primitive", _extends({
      key: child.uuid,
      object: child
    }, config));
    return React31.createElement(Clone, _extends({
      key: child.uuid,
      object: child
    }, config, {
      isChild: true
    }));
  }), children, injectChildren);
});

// node_modules/@react-three/drei/core/MarchingCubes.js
var React32 = __toESM(require_react());
var globalContext = React32.createContext(null);
var MarchingCubes2 = React32.forwardRef(({
  resolution = 28,
  maxPolyCount = 1e4,
  enableUvs = false,
  enableColors = false,
  children,
  ...props
}, ref) => {
  const marchingCubesRef = React32.useRef(null);
  React32.useImperativeHandle(ref, () => marchingCubesRef.current, []);
  const marchingCubes = React32.useMemo(() => new MarchingCubes(resolution, null, enableUvs, enableColors, maxPolyCount), [resolution, maxPolyCount, enableUvs, enableColors]);
  const api = React32.useMemo(() => ({
    getParent: () => marchingCubesRef
  }), []);
  useFrame(() => {
    marchingCubes.update();
    marchingCubes.reset();
  }, -1);
  return React32.createElement(React32.Fragment, null, React32.createElement("primitive", _extends({
    object: marchingCubes,
    ref: marchingCubesRef
  }, props), React32.createElement(globalContext.Provider, {
    value: api
  }, children)));
});
var MarchingCube = React32.forwardRef(({
  strength = 0.5,
  subtract = 12,
  color,
  ...props
}, ref) => {
  const {
    getParent
  } = React32.useContext(globalContext);
  const parentRef = React32.useMemo(() => getParent(), [getParent]);
  const cubeRef = React32.useRef(null);
  React32.useImperativeHandle(ref, () => cubeRef.current, []);
  const vec = new Vector3();
  useFrame((state) => {
    if (!parentRef.current || !cubeRef.current) return;
    cubeRef.current.getWorldPosition(vec);
    parentRef.current.addBall(0.5 + vec.x * 0.5, 0.5 + vec.y * 0.5, 0.5 + vec.z * 0.5, strength, subtract, color);
  });
  return React32.createElement("group", _extends({
    ref: cubeRef
  }, props));
});
var MarchingPlane = React32.forwardRef(({
  planeType: _planeType = "x",
  strength = 0.5,
  subtract = 12,
  ...props
}, ref) => {
  const {
    getParent
  } = React32.useContext(globalContext);
  const parentRef = React32.useMemo(() => getParent(), [getParent]);
  const wallRef = React32.useRef(null);
  React32.useImperativeHandle(ref, () => wallRef.current, []);
  const planeType = React32.useMemo(() => _planeType === "x" ? "addPlaneX" : _planeType === "y" ? "addPlaneY" : "addPlaneZ", [_planeType]);
  useFrame(() => {
    if (!parentRef.current || !wallRef.current) return;
    parentRef.current[planeType](strength, subtract);
  });
  return React32.createElement("group", _extends({
    ref: wallRef
  }, props));
});

// node_modules/@react-three/drei/core/Decal.js
var React33 = __toESM(require_react());
function isArray(vec) {
  return Array.isArray(vec);
}
function vecToArray(vec = [0, 0, 0]) {
  if (isArray(vec)) {
    return vec;
  } else if (vec instanceof Vector3 || vec instanceof Euler) {
    return [vec.x, vec.y, vec.z];
  } else {
    return [vec, vec, vec];
  }
}
var Decal = React33.forwardRef(function Decal2({
  debug,
  depthTest = false,
  polygonOffsetFactor = -10,
  map,
  mesh,
  children,
  position: position2,
  rotation: rotation3,
  scale: scale3,
  ...props
}, forwardRef82) {
  const ref = React33.useRef(null);
  React33.useImperativeHandle(forwardRef82, () => ref.current);
  const helper = React33.useRef(null);
  const state = React33.useRef({
    position: new Vector3(),
    rotation: new Euler(),
    scale: new Vector3(1, 1, 1)
  });
  React33.useLayoutEffect(() => {
    const parent = (mesh == null ? void 0 : mesh.current) || ref.current.parent;
    const target2 = ref.current;
    if (!(parent instanceof Mesh)) {
      throw new Error('Decal must have a Mesh as parent or specify its "mesh" prop');
    }
    if (parent) {
      applyProps(state.current, {
        position: position2,
        scale: scale3
      });
      const matrixWorld = parent.matrixWorld.clone();
      parent.matrixWorld.identity();
      if (!rotation3 || typeof rotation3 === "number") {
        const o = new Object3D();
        o.position.copy(state.current.position);
        const vertices = parent.geometry.attributes.position.array;
        if (parent.geometry.attributes.normal === void 0) parent.geometry.computeVertexNormals();
        const normal2 = parent.geometry.attributes.normal.array;
        let distance = Infinity;
        let closestNormal = new Vector3();
        const ox = o.position.x;
        const oy = o.position.y;
        const oz = o.position.z;
        const vLength = vertices.length;
        let chosenIdx = -1;
        for (let i2 = 0; i2 < vLength; i2 += 3) {
          const x = vertices[i2];
          const y = vertices[i2 + 1];
          const z = vertices[i2 + 2];
          const xDiff = x - ox;
          const yDiff = y - oy;
          const zDiff = z - oz;
          const distSquared = xDiff * xDiff + yDiff * yDiff + zDiff * zDiff;
          if (distSquared < distance) {
            distance = distSquared;
            chosenIdx = i2;
          }
        }
        closestNormal.fromArray(normal2, chosenIdx);
        o.lookAt(o.position.clone().add(closestNormal));
        o.rotateZ(Math.PI);
        o.rotateY(Math.PI);
        if (typeof rotation3 === "number") o.rotateZ(rotation3);
        applyProps(state.current, {
          rotation: o.rotation
        });
      } else {
        applyProps(state.current, {
          rotation: rotation3
        });
      }
      if (helper.current) {
        applyProps(helper.current, state.current);
      }
      target2.geometry = new DecalGeometry(parent, state.current.position, state.current.rotation, state.current.scale);
      parent.matrixWorld = matrixWorld;
      return () => {
        target2.geometry.dispose();
      };
    }
  }, [mesh, ...vecToArray(position2), ...vecToArray(scale3), ...vecToArray(rotation3)]);
  React33.useLayoutEffect(() => {
    if (helper.current) {
      helper.current.traverse((child) => child.raycast = () => null);
    }
  }, [debug]);
  return React33.createElement("mesh", _extends({
    ref,
    "material-transparent": true,
    "material-polygonOffset": true,
    "material-polygonOffsetFactor": polygonOffsetFactor,
    "material-depthTest": depthTest,
    "material-map": map
  }, props), children, debug && React33.createElement("mesh", {
    ref: helper
  }, React33.createElement("boxGeometry", null), React33.createElement("meshNormalMaterial", {
    wireframe: true
  }), React33.createElement("axesHelper", null)));
});

// node_modules/@react-three/drei/core/Svg.js
var React34 = __toESM(require_react());
var import_react7 = __toESM(require_react());
var Svg = (0, import_react7.forwardRef)(function R3FSvg({
  src,
  skipFill,
  skipStrokes,
  fillMaterial,
  strokeMaterial,
  fillMeshProps,
  strokeMeshProps,
  ...props
}, ref) {
  const svg = useLoader(SVGLoader, !src.startsWith("<svg") ? src : `data:image/svg+xml;utf8,${src}`);
  const strokeGeometries = (0, import_react7.useMemo)(() => skipStrokes ? [] : svg.paths.map((path) => {
    var _path$userData;
    return ((_path$userData = path.userData) == null ? void 0 : _path$userData.style.stroke) === void 0 || path.userData.style.stroke === "none" ? null : path.subPaths.map((subPath) => SVGLoader.pointsToStroke(subPath.getPoints(), path.userData.style));
  }), [svg, skipStrokes]);
  (0, import_react7.useEffect)(() => {
    return () => strokeGeometries.forEach((group) => group && group.map((g) => g.dispose()));
  }, [strokeGeometries]);
  let renderOrder = 0;
  return React34.createElement("object3D", _extends({
    ref
  }, props), React34.createElement("object3D", {
    scale: [1, -1, 1]
  }, svg.paths.map((path, p) => {
    var _path$userData2, _path$userData3;
    return React34.createElement(import_react7.Fragment, {
      key: p
    }, !skipFill && ((_path$userData2 = path.userData) == null ? void 0 : _path$userData2.style.fill) !== void 0 && path.userData.style.fill !== "none" && SVGLoader.createShapes(path).map((shape, s) => React34.createElement("mesh", _extends({
      key: s
    }, fillMeshProps, {
      renderOrder: renderOrder++
    }), React34.createElement("shapeGeometry", {
      args: [shape]
    }), React34.createElement("meshBasicMaterial", _extends({
      color: path.userData.style.fill,
      opacity: path.userData.style.fillOpacity,
      transparent: true,
      side: DoubleSide,
      depthWrite: false
    }, fillMaterial)))), !skipStrokes && ((_path$userData3 = path.userData) == null ? void 0 : _path$userData3.style.stroke) !== void 0 && path.userData.style.stroke !== "none" && path.subPaths.map((_subPath, s) => React34.createElement("mesh", _extends({
      key: s,
      geometry: strokeGeometries[p][s]
    }, strokeMeshProps, {
      renderOrder: renderOrder++
    }), React34.createElement("meshBasicMaterial", _extends({
      color: path.userData.style.stroke,
      opacity: path.userData.style.strokeOpacity,
      transparent: true,
      side: DoubleSide,
      depthWrite: false
    }, strokeMaterial)))));
  })));
});

// node_modules/@react-three/drei/core/Gltf.js
var React35 = __toESM(require_react());
var dracoLoader = null;
var decoderPath = "https://www.gstatic.com/draco/versioned/decoders/1.5.5/";
function extensions(useDraco = true, useMeshopt = true, extendLoader) {
  return (loader2) => {
    if (extendLoader) {
      extendLoader(loader2);
    }
    if (useDraco) {
      if (!dracoLoader) {
        dracoLoader = new DRACOLoader();
      }
      dracoLoader.setDecoderPath(typeof useDraco === "string" ? useDraco : decoderPath);
      loader2.setDRACOLoader(dracoLoader);
    }
    if (useMeshopt) {
      loader2.setMeshoptDecoder(typeof MeshoptDecoder === "function" ? MeshoptDecoder() : MeshoptDecoder);
    }
  };
}
var useGLTF = (path, useDraco, useMeshopt, extendLoader) => useLoader(GLTFLoader, path, extensions(useDraco, useMeshopt, extendLoader));
useGLTF.preload = (path, useDraco, useMeshopt, extendLoader) => useLoader.preload(GLTFLoader, path, extensions(useDraco, useMeshopt, extendLoader));
useGLTF.clear = (path) => useLoader.clear(GLTFLoader, path);
useGLTF.setDecoderPath = (path) => {
  decoderPath = path;
};
var Gltf = React35.forwardRef(({
  src,
  useDraco,
  useMeshOpt,
  extendLoader,
  ...props
}, ref) => {
  const {
    scene
  } = useGLTF(src, useDraco, useMeshOpt, extendLoader);
  return React35.createElement(Clone, _extends({
    ref
  }, props, {
    object: scene
  }));
});

// node_modules/@react-three/drei/core/AsciiRenderer.js
var React36 = __toESM(require_react());
function AsciiRenderer({
  renderIndex = 1,
  bgColor = "black",
  fgColor = "white",
  characters = " .:-+*=%@#",
  invert = true,
  color = false,
  resolution = 0.15
}) {
  const {
    size,
    gl,
    scene,
    camera
  } = useThree();
  const effect = React36.useMemo(() => {
    const effect2 = new AsciiEffect(gl, characters, {
      invert,
      color,
      resolution
    });
    effect2.domElement.style.position = "absolute";
    effect2.domElement.style.top = "0px";
    effect2.domElement.style.left = "0px";
    effect2.domElement.style.pointerEvents = "none";
    return effect2;
  }, [characters, invert, color, resolution]);
  React36.useLayoutEffect(() => {
    effect.domElement.style.color = fgColor;
    effect.domElement.style.backgroundColor = bgColor;
  }, [fgColor, bgColor]);
  React36.useEffect(() => {
    gl.domElement.style.opacity = "0";
    gl.domElement.parentNode.appendChild(effect.domElement);
    return () => {
      gl.domElement.style.opacity = "1";
      gl.domElement.parentNode.removeChild(effect.domElement);
    };
  }, [effect]);
  React36.useEffect(() => {
    effect.setSize(size.width, size.height);
  }, [effect, size]);
  useFrame((state) => {
    effect.render(scene, camera);
  }, renderIndex);
  return React36.createElement(React36.Fragment, null);
}

// node_modules/@react-three/drei/core/Splat.js
var React37 = __toESM(require_react());
var SplatMaterial = shaderMaterial(
  {
    alphaTest: 0,
    viewport: new Vector2(1980, 1080),
    focal: 1e3,
    centerAndScaleTexture: null,
    covAndColorTexture: null
  },
  /*glsl*/
  `
    precision highp sampler2D;
    precision highp usampler2D;
    out vec4 vColor;
    out vec3 vPosition;
    uniform vec2 resolution;
    uniform vec2 viewport;
    uniform float focal;
    attribute uint splatIndex;
    uniform sampler2D centerAndScaleTexture;
    uniform usampler2D covAndColorTexture;    

    vec2 unpackInt16(in uint value) {
      int v = int(value);
      int v0 = v >> 16;
      int v1 = (v & 0xFFFF);
      if((v & 0x8000) != 0)
        v1 |= 0xFFFF0000;
      return vec2(float(v1), float(v0));
    }

    void main () {
      ivec2 texSize = textureSize(centerAndScaleTexture, 0);
      ivec2 texPos = ivec2(splatIndex%uint(texSize.x), splatIndex/uint(texSize.x));
      vec4 centerAndScaleData = texelFetch(centerAndScaleTexture, texPos, 0);
      vec4 center = vec4(centerAndScaleData.xyz, 1);
      vec4 camspace = modelViewMatrix * center;
      vec4 pos2d = projectionMatrix * camspace;

      float bounds = 1.2 * pos2d.w;
      if (pos2d.z < -pos2d.w || pos2d.x < -bounds || pos2d.x > bounds
        || pos2d.y < -bounds || pos2d.y > bounds) {
        gl_Position = vec4(0.0, 0.0, 2.0, 1.0);
        return;
      }

      uvec4 covAndColorData = texelFetch(covAndColorTexture, texPos, 0);
      vec2 cov3D_M11_M12 = unpackInt16(covAndColorData.x) * centerAndScaleData.w;
      vec2 cov3D_M13_M22 = unpackInt16(covAndColorData.y) * centerAndScaleData.w;
      vec2 cov3D_M23_M33 = unpackInt16(covAndColorData.z) * centerAndScaleData.w;
      mat3 Vrk = mat3(
        cov3D_M11_M12.x, cov3D_M11_M12.y, cov3D_M13_M22.x,
        cov3D_M11_M12.y, cov3D_M13_M22.y, cov3D_M23_M33.x,
        cov3D_M13_M22.x, cov3D_M23_M33.x, cov3D_M23_M33.y
      );

      mat3 J = mat3(
        focal / camspace.z, 0., -(focal * camspace.x) / (camspace.z * camspace.z),
        0., focal / camspace.z, -(focal * camspace.y) / (camspace.z * camspace.z),
        0., 0., 0.
      );

      mat3 W = transpose(mat3(modelViewMatrix));
      mat3 T = W * J;
      mat3 cov = transpose(T) * Vrk * T;
      vec2 vCenter = vec2(pos2d) / pos2d.w;
      float diagonal1 = cov[0][0] + 0.3;
      float offDiagonal = cov[0][1];
      float diagonal2 = cov[1][1] + 0.3;
      float mid = 0.5 * (diagonal1 + diagonal2);
      float radius = length(vec2((diagonal1 - diagonal2) / 2.0, offDiagonal));
      float lambda1 = mid + radius;
      float lambda2 = max(mid - radius, 0.1);
      vec2 diagonalVector = normalize(vec2(offDiagonal, lambda1 - diagonal1));
      vec2 v1 = min(sqrt(2.0 * lambda1), 1024.0) * diagonalVector;
      vec2 v2 = min(sqrt(2.0 * lambda2), 1024.0) * vec2(diagonalVector.y, -diagonalVector.x);
      uint colorUint = covAndColorData.w;
      vColor = vec4(
        float(colorUint & uint(0xFF)) / 255.0,
        float((colorUint >> uint(8)) & uint(0xFF)) / 255.0,
        float((colorUint >> uint(16)) & uint(0xFF)) / 255.0,
        float(colorUint >> uint(24)) / 255.0
      );
      vPosition = position;

      gl_Position = vec4(
        vCenter 
          + position.x * v2 / viewport * 2.0 
          + position.y * v1 / viewport * 2.0, pos2d.z / pos2d.w, 1.0);
    }
    `,
  /*glsl*/
  `
    #include <alphatest_pars_fragment>
    #include <alphahash_pars_fragment>
    in vec4 vColor;
    in vec3 vPosition;
    void main () {
      float A = -dot(vPosition.xy, vPosition.xy);
      if (A < -4.0) discard;
      float B = exp(A) * vColor.a;
      vec4 diffuseColor = vec4(vColor.rgb, B);
      #include <alphatest_fragment>
      #include <alphahash_fragment>
      gl_FragColor = diffuseColor;
      #include <tonemapping_fragment>
      #include <${version >= 154 ? "colorspace_fragment" : "encodings_fragment"}>
    }
  `
);
function createWorker(self) {
  let matrices = null;
  let offset = 0;
  function sortSplats(view, hashed = false) {
    const vertexCount = matrices.length / 16;
    const threshold = -1e-4;
    let maxDepth = -Infinity;
    let minDepth = Infinity;
    const depthList = new Float32Array(vertexCount);
    const sizeList = new Int32Array(depthList.buffer);
    const validIndexList = new Int32Array(vertexCount);
    let validCount = 0;
    for (let i2 = 0; i2 < vertexCount; i2++) {
      const depth = view[0] * matrices[i2 * 16 + 12] + view[1] * matrices[i2 * 16 + 13] + view[2] * matrices[i2 * 16 + 14] + view[3];
      if (hashed || depth < 0 && matrices[i2 * 16 + 15] > threshold * depth) {
        depthList[validCount] = depth;
        validIndexList[validCount] = i2;
        validCount++;
        if (depth > maxDepth) maxDepth = depth;
        if (depth < minDepth) minDepth = depth;
      }
    }
    const depthInv = (256 * 256 - 1) / (maxDepth - minDepth);
    const counts0 = new Uint32Array(256 * 256);
    for (let i2 = 0; i2 < validCount; i2++) {
      sizeList[i2] = (depthList[i2] - minDepth) * depthInv | 0;
      counts0[sizeList[i2]]++;
    }
    const starts0 = new Uint32Array(256 * 256);
    for (let i2 = 1; i2 < 256 * 256; i2++) starts0[i2] = starts0[i2 - 1] + counts0[i2 - 1];
    const depthIndex = new Uint32Array(validCount);
    for (let i2 = 0; i2 < validCount; i2++) depthIndex[starts0[sizeList[i2]]++] = validIndexList[i2];
    return depthIndex;
  }
  self.onmessage = (e) => {
    if (e.data.method == "push") {
      if (offset === 0) matrices = new Float32Array(e.data.length);
      const new_matrices = new Float32Array(e.data.matrices);
      matrices.set(new_matrices, offset);
      offset += new_matrices.length;
    } else if (e.data.method == "sort") {
      if (matrices !== null) {
        const indices = sortSplats(new Float32Array(e.data.view), e.data.hashed);
        self.postMessage({
          indices,
          key: e.data.key
        }, [indices.buffer]);
      }
    }
  };
}
var SplatLoader = class extends Loader {
  constructor(...args) {
    super(...args);
    this.gl = null;
    this.chunkSize = 25e3;
  }
  load(url, onLoad, onProgress, onError) {
    const shared = {
      gl: this.gl,
      url: this.manager.resolveURL(url),
      worker: new Worker(URL.createObjectURL(new Blob(["(", createWorker.toString(), ")(self)"], {
        type: "application/javascript"
      }))),
      manager: this.manager,
      update: (target2, camera, hashed) => update(camera, shared, target2, hashed),
      connect: (target2) => connect(shared, target2),
      loading: false,
      loaded: false,
      loadedVertexCount: 0,
      chunkSize: this.chunkSize,
      totalDownloadBytes: 0,
      numVertices: 0,
      rowLength: 3 * 4 + 3 * 4 + 4 + 4,
      maxVertexes: 0,
      bufferTextureWidth: 0,
      bufferTextureHeight: 0,
      stream: null,
      centerAndScaleData: null,
      covAndColorData: null,
      covAndColorTexture: null,
      centerAndScaleTexture: null,
      onProgress
    };
    load(shared).then(onLoad).catch((e) => {
      onError == null || onError(e);
      shared.manager.itemError(shared.url);
    });
  }
};
async function load(shared) {
  shared.manager.itemStart(shared.url);
  const data = await fetch(shared.url);
  if (data.body === null) throw "Failed to fetch file";
  let _totalDownloadBytes = data.headers.get("Content-Length");
  const totalDownloadBytes = _totalDownloadBytes ? parseInt(_totalDownloadBytes) : void 0;
  if (totalDownloadBytes == void 0) throw "Failed to get content length";
  shared.stream = data.body.getReader();
  shared.totalDownloadBytes = totalDownloadBytes;
  shared.numVertices = Math.floor(shared.totalDownloadBytes / shared.rowLength);
  const context12 = shared.gl.getContext();
  let maxTextureSize = context12.getParameter(context12.MAX_TEXTURE_SIZE);
  shared.maxVertexes = maxTextureSize * maxTextureSize;
  if (shared.numVertices > shared.maxVertexes) shared.numVertices = shared.maxVertexes;
  shared.bufferTextureWidth = maxTextureSize;
  shared.bufferTextureHeight = Math.floor((shared.numVertices - 1) / maxTextureSize) + 1;
  shared.centerAndScaleData = new Float32Array(shared.bufferTextureWidth * shared.bufferTextureHeight * 4);
  shared.covAndColorData = new Uint32Array(shared.bufferTextureWidth * shared.bufferTextureHeight * 4);
  shared.centerAndScaleTexture = new DataTexture(shared.centerAndScaleData, shared.bufferTextureWidth, shared.bufferTextureHeight, RGBAFormat, FloatType);
  shared.centerAndScaleTexture.needsUpdate = true;
  shared.covAndColorTexture = new DataTexture(shared.covAndColorData, shared.bufferTextureWidth, shared.bufferTextureHeight, RGBAIntegerFormat, UnsignedIntType);
  shared.covAndColorTexture.internalFormat = "RGBA32UI";
  shared.covAndColorTexture.needsUpdate = true;
  return shared;
}
async function lazyLoad(shared) {
  shared.loading = true;
  let bytesDownloaded = 0;
  let bytesProcessed = 0;
  const chunks = [];
  let lastReportedProgress = 0;
  const lengthComputable = shared.totalDownloadBytes !== 0;
  while (true) {
    try {
      const {
        value,
        done
      } = await shared.stream.read();
      if (done) break;
      bytesDownloaded += value.length;
      if (shared.totalDownloadBytes != void 0) {
        const percent = bytesDownloaded / shared.totalDownloadBytes * 100;
        if (shared.onProgress && percent - lastReportedProgress > 1) {
          const event = new ProgressEvent("progress", {
            lengthComputable,
            loaded: bytesDownloaded,
            total: shared.totalDownloadBytes
          });
          shared.onProgress(event);
          lastReportedProgress = percent;
        }
      }
      chunks.push(value);
      const bytesRemains = bytesDownloaded - bytesProcessed;
      if (shared.totalDownloadBytes != void 0 && bytesRemains > shared.rowLength * shared.chunkSize) {
        let vertexCount = Math.floor(bytesRemains / shared.rowLength);
        const concatenatedChunksbuffer = new Uint8Array(bytesRemains);
        let offset = 0;
        for (const chunk of chunks) {
          concatenatedChunksbuffer.set(chunk, offset);
          offset += chunk.length;
        }
        chunks.length = 0;
        if (bytesRemains > vertexCount * shared.rowLength) {
          const extra_data = new Uint8Array(bytesRemains - vertexCount * shared.rowLength);
          extra_data.set(concatenatedChunksbuffer.subarray(bytesRemains - extra_data.length, bytesRemains), 0);
          chunks.push(extra_data);
        }
        const buffer = new Uint8Array(vertexCount * shared.rowLength);
        buffer.set(concatenatedChunksbuffer.subarray(0, buffer.byteLength), 0);
        const matrices = pushDataBuffer(shared, buffer.buffer, vertexCount);
        shared.worker.postMessage({
          method: "push",
          src: shared.url,
          length: shared.numVertices * 16,
          matrices: matrices.buffer
        }, [matrices.buffer]);
        bytesProcessed += vertexCount * shared.rowLength;
        if (shared.onProgress) {
          const event = new ProgressEvent("progress", {
            lengthComputable,
            loaded: shared.totalDownloadBytes,
            total: shared.totalDownloadBytes
          });
          shared.onProgress(event);
        }
      }
    } catch (error) {
      console.error(error);
      break;
    }
  }
  if (bytesDownloaded - bytesProcessed > 0) {
    let concatenatedChunks = new Uint8Array(chunks.reduce((acc, chunk) => acc + chunk.length, 0));
    let offset = 0;
    for (const chunk of chunks) {
      concatenatedChunks.set(chunk, offset);
      offset += chunk.length;
    }
    let numVertices = Math.floor(concatenatedChunks.byteLength / shared.rowLength);
    const matrices = pushDataBuffer(shared, concatenatedChunks.buffer, numVertices);
    shared.worker.postMessage({
      method: "push",
      src: shared.url,
      length: numVertices * 16,
      matrices: matrices.buffer
    }, [matrices.buffer]);
  }
  shared.loaded = true;
  shared.manager.itemEnd(shared.url);
}
function update(camera, shared, target2, hashed) {
  camera.updateMatrixWorld();
  shared.gl.getCurrentViewport(target2.viewport);
  target2.material.viewport.x = target2.viewport.z;
  target2.material.viewport.y = target2.viewport.w;
  target2.material.focal = target2.viewport.w / 2 * Math.abs(camera.projectionMatrix.elements[5]);
  if (target2.ready) {
    if (hashed && target2.sorted) return;
    target2.ready = false;
    const view = new Float32Array([target2.modelViewMatrix.elements[2], -target2.modelViewMatrix.elements[6], target2.modelViewMatrix.elements[10], target2.modelViewMatrix.elements[14]]);
    shared.worker.postMessage({
      method: "sort",
      src: shared.url,
      key: target2.uuid,
      view: view.buffer,
      hashed
    }, [view.buffer]);
    if (hashed && shared.loaded) target2.sorted = true;
  }
}
function connect(shared, target2) {
  if (!shared.loading) lazyLoad(shared);
  target2.ready = false;
  target2.pm = new Matrix4();
  target2.vm1 = new Matrix4();
  target2.vm2 = new Matrix4();
  target2.viewport = new Vector4();
  let splatIndexArray = new Uint32Array(shared.bufferTextureWidth * shared.bufferTextureHeight);
  const splatIndexes = new InstancedBufferAttribute(splatIndexArray, 1, false);
  splatIndexes.setUsage(DynamicDrawUsage);
  const geometry2 = target2.geometry = new InstancedBufferGeometry();
  const positionsArray = new Float32Array(6 * 3);
  const positions = new BufferAttribute(positionsArray, 3);
  geometry2.setAttribute("position", positions);
  positions.setXYZ(2, -2, 2, 0);
  positions.setXYZ(1, 2, 2, 0);
  positions.setXYZ(0, -2, -2, 0);
  positions.setXYZ(5, -2, -2, 0);
  positions.setXYZ(4, 2, 2, 0);
  positions.setXYZ(3, 2, -2, 0);
  positions.needsUpdate = true;
  geometry2.setAttribute("splatIndex", splatIndexes);
  geometry2.instanceCount = 1;
  function listener(e) {
    if (target2 && e.data.key === target2.uuid) {
      let indexes = new Uint32Array(e.data.indices);
      geometry2.attributes.splatIndex.set(indexes);
      geometry2.attributes.splatIndex.needsUpdate = true;
      geometry2.instanceCount = indexes.length;
      target2.ready = true;
    }
  }
  shared.worker.addEventListener("message", listener);
  async function wait() {
    while (true) {
      const centerAndScaleTextureProperties = shared.gl.properties.get(shared.centerAndScaleTexture);
      const covAndColorTextureProperties = shared.gl.properties.get(shared.covAndColorTexture);
      if (centerAndScaleTextureProperties != null && centerAndScaleTextureProperties.__webglTexture && covAndColorTextureProperties != null && covAndColorTextureProperties.__webglTexture && shared.loadedVertexCount > 0) break;
      await new Promise((resolve) => setTimeout(resolve, 10));
    }
    target2.ready = true;
  }
  wait();
  return () => shared.worker.removeEventListener("message", listener);
}
function pushDataBuffer(shared, buffer, vertexCount) {
  const context12 = shared.gl.getContext();
  if (shared.loadedVertexCount + vertexCount > shared.maxVertexes) vertexCount = shared.maxVertexes - shared.loadedVertexCount;
  if (vertexCount <= 0) throw "Failed to parse file";
  const u_buffer = new Uint8Array(buffer);
  const f_buffer = new Float32Array(buffer);
  const matrices = new Float32Array(vertexCount * 16);
  const covAndColorData_uint8 = new Uint8Array(shared.covAndColorData.buffer);
  const covAndColorData_int16 = new Int16Array(shared.covAndColorData.buffer);
  for (let i2 = 0; i2 < vertexCount; i2++) {
    const quat = new Quaternion(-(u_buffer[32 * i2 + 28 + 1] - 128) / 128, (u_buffer[32 * i2 + 28 + 2] - 128) / 128, (u_buffer[32 * i2 + 28 + 3] - 128) / 128, -(u_buffer[32 * i2 + 28 + 0] - 128) / 128);
    quat.invert();
    const center = new Vector3(f_buffer[8 * i2 + 0], f_buffer[8 * i2 + 1], -f_buffer[8 * i2 + 2]);
    const scale3 = new Vector3(f_buffer[8 * i2 + 3 + 0], f_buffer[8 * i2 + 3 + 1], f_buffer[8 * i2 + 3 + 2]);
    const mtx = new Matrix4();
    mtx.makeRotationFromQuaternion(quat);
    mtx.transpose();
    mtx.scale(scale3);
    const mtx_t = mtx.clone();
    mtx.transpose();
    mtx.premultiply(mtx_t);
    mtx.setPosition(center);
    const cov_indexes = [0, 1, 2, 5, 6, 10];
    let max_value = 0;
    for (let j = 0; j < cov_indexes.length; j++) if (Math.abs(mtx.elements[cov_indexes[j]]) > max_value) max_value = Math.abs(mtx.elements[cov_indexes[j]]);
    let destOffset = shared.loadedVertexCount * 4 + i2 * 4;
    shared.centerAndScaleData[destOffset + 0] = center.x;
    shared.centerAndScaleData[destOffset + 1] = -center.y;
    shared.centerAndScaleData[destOffset + 2] = center.z;
    shared.centerAndScaleData[destOffset + 3] = max_value / 32767;
    destOffset = shared.loadedVertexCount * 8 + i2 * 4 * 2;
    for (let j = 0; j < cov_indexes.length; j++) covAndColorData_int16[destOffset + j] = mtx.elements[cov_indexes[j]] * 32767 / max_value;
    destOffset = shared.loadedVertexCount * 16 + (i2 * 4 + 3) * 4;
    const col2 = new Color(u_buffer[32 * i2 + 24 + 0] / 255, u_buffer[32 * i2 + 24 + 1] / 255, u_buffer[32 * i2 + 24 + 2] / 255);
    col2.convertSRGBToLinear();
    covAndColorData_uint8[destOffset + 0] = col2.r * 255;
    covAndColorData_uint8[destOffset + 1] = col2.g * 255;
    covAndColorData_uint8[destOffset + 2] = col2.b * 255;
    covAndColorData_uint8[destOffset + 3] = u_buffer[32 * i2 + 24 + 3];
    mtx.elements[15] = Math.max(scale3.x, scale3.y, scale3.z) * u_buffer[32 * i2 + 24 + 3] / 255;
    for (let j = 0; j < 16; j++) matrices[i2 * 16 + j] = mtx.elements[j];
  }
  while (vertexCount > 0) {
    let width = 0;
    let height = 0;
    const xoffset = shared.loadedVertexCount % shared.bufferTextureWidth;
    const yoffset = Math.floor(shared.loadedVertexCount / shared.bufferTextureWidth);
    if (shared.loadedVertexCount % shared.bufferTextureWidth != 0) {
      width = Math.min(shared.bufferTextureWidth, xoffset + vertexCount) - xoffset;
      height = 1;
    } else if (Math.floor(vertexCount / shared.bufferTextureWidth) > 0) {
      width = shared.bufferTextureWidth;
      height = Math.floor(vertexCount / shared.bufferTextureWidth);
    } else {
      width = vertexCount % shared.bufferTextureWidth;
      height = 1;
    }
    const centerAndScaleTextureProperties = shared.gl.properties.get(shared.centerAndScaleTexture);
    context12.bindTexture(context12.TEXTURE_2D, centerAndScaleTextureProperties.__webglTexture);
    context12.texSubImage2D(context12.TEXTURE_2D, 0, xoffset, yoffset, width, height, context12.RGBA, context12.FLOAT, shared.centerAndScaleData, shared.loadedVertexCount * 4);
    const covAndColorTextureProperties = shared.gl.properties.get(shared.covAndColorTexture);
    context12.bindTexture(context12.TEXTURE_2D, covAndColorTextureProperties.__webglTexture);
    context12.texSubImage2D(
      context12.TEXTURE_2D,
      0,
      xoffset,
      yoffset,
      width,
      height,
      // @ts-ignore
      context12.RGBA_INTEGER,
      context12.UNSIGNED_INT,
      shared.covAndColorData,
      shared.loadedVertexCount * 4
    );
    shared.gl.resetState();
    shared.loadedVertexCount += width * height;
    vertexCount -= width * height;
  }
  return matrices;
}
function Splat({
  src,
  toneMapped = false,
  alphaTest = 0,
  alphaHash = false,
  chunkSize = 25e3,
  ...props
}) {
  extend({
    SplatMaterial
  });
  const ref = React37.useRef(null);
  const gl = useThree((state) => state.gl);
  const camera = useThree((state) => state.camera);
  const shared = useLoader(SplatLoader, src, (loader2) => {
    loader2.gl = gl;
    loader2.chunkSize = chunkSize;
  });
  React37.useLayoutEffect(() => shared.connect(ref.current), [src]);
  useFrame(() => shared.update(ref.current, camera, alphaHash));
  return React37.createElement("mesh", _extends({
    ref,
    frustumCulled: false
  }, props), React37.createElement("splatMaterial", {
    key: `${src}/${alphaTest}/${alphaHash}${SplatMaterial.key}`,
    transparent: !alphaHash,
    depthTest: true,
    alphaTest: alphaHash ? 0 : alphaTest,
    centerAndScaleTexture: shared.centerAndScaleTexture,
    covAndColorTexture: shared.covAndColorTexture,
    depthWrite: alphaHash ? true : alphaTest > 0,
    blending: alphaHash ? NormalBlending : CustomBlending,
    blendSrcAlpha: OneFactor,
    alphaHash: !!alphaHash,
    toneMapped
  }));
}

// node_modules/@react-three/drei/core/OrthographicCamera.js
var React39 = __toESM(require_react());

// node_modules/@react-three/drei/core/Fbo.js
var React38 = __toESM(require_react());
var import_react8 = __toESM(require_react());
function useFBO(width, height, settings) {
  const size = useThree((state) => state.size);
  const viewport = useThree((state) => state.viewport);
  const _width = typeof width === "number" ? width : size.width * viewport.dpr;
  const _height = typeof height === "number" ? height : size.height * viewport.dpr;
  const _settings = (typeof width === "number" ? settings : width) || {};
  const {
    samples = 0,
    depth,
    ...targetSettings
  } = _settings;
  const depthBuffer = depth !== null && depth !== void 0 ? depth : _settings.depthBuffer;
  const target2 = React38.useMemo(() => {
    const target3 = new WebGLRenderTarget(_width, _height, {
      minFilter: LinearFilter,
      magFilter: LinearFilter,
      type: HalfFloatType,
      ...targetSettings
    });
    if (depthBuffer) {
      target3.depthTexture = new DepthTexture(_width, _height, FloatType);
    }
    target3.samples = samples;
    return target3;
  }, []);
  React38.useLayoutEffect(() => {
    target2.setSize(_width, _height);
    if (samples) target2.samples = samples;
  }, [samples, target2, _width, _height]);
  React38.useEffect(() => {
    return () => target2.dispose();
  }, []);
  return target2;
}
var Fbo = (0, import_react8.forwardRef)(({
  children,
  width,
  height,
  ...settings
}, fref) => {
  const target2 = useFBO(width, height, settings);
  (0, import_react8.useImperativeHandle)(fref, () => target2, [target2]);
  return React38.createElement(React38.Fragment, null, children == null ? void 0 : children(target2));
});

// node_modules/@react-three/drei/core/OrthographicCamera.js
var isFunction = (node) => typeof node === "function";
var OrthographicCamera2 = React39.forwardRef(({
  envMap,
  resolution = 256,
  frames = Infinity,
  children,
  makeDefault,
  ...props
}, ref) => {
  const set = useThree(({
    set: set2
  }) => set2);
  const camera = useThree(({
    camera: camera2
  }) => camera2);
  const size = useThree(({
    size: size2
  }) => size2);
  const cameraRef = React39.useRef(null);
  React39.useImperativeHandle(ref, () => cameraRef.current, []);
  const groupRef = React39.useRef(null);
  const fbo = useFBO(resolution);
  React39.useLayoutEffect(() => {
    if (!props.manual) {
      cameraRef.current.updateProjectionMatrix();
    }
  }, [size, props]);
  React39.useLayoutEffect(() => {
    cameraRef.current.updateProjectionMatrix();
  });
  React39.useLayoutEffect(() => {
    if (makeDefault) {
      const oldCam = camera;
      set(() => ({
        camera: cameraRef.current
      }));
      return () => set(() => ({
        camera: oldCam
      }));
    }
  }, [cameraRef, makeDefault, set]);
  let count = 0;
  let oldEnvMap = null;
  const functional = isFunction(children);
  useFrame((state) => {
    if (functional && (frames === Infinity || count < frames)) {
      groupRef.current.visible = false;
      state.gl.setRenderTarget(fbo);
      oldEnvMap = state.scene.background;
      if (envMap) state.scene.background = envMap;
      state.gl.render(state.scene, cameraRef.current);
      state.scene.background = oldEnvMap;
      state.gl.setRenderTarget(null);
      groupRef.current.visible = true;
      count++;
    }
  });
  return React39.createElement(React39.Fragment, null, React39.createElement("orthographicCamera", _extends({
    left: size.width / -2,
    right: size.width / 2,
    top: size.height / 2,
    bottom: size.height / -2,
    ref: cameraRef
  }, props), !functional && children), React39.createElement("group", {
    ref: groupRef
  }, functional && children(fbo.texture)));
});

// node_modules/@react-three/drei/core/PerspectiveCamera.js
var React40 = __toESM(require_react());
var isFunction2 = (node) => typeof node === "function";
var PerspectiveCamera2 = React40.forwardRef(({
  envMap,
  resolution = 256,
  frames = Infinity,
  makeDefault,
  children,
  ...props
}, ref) => {
  const set = useThree(({
    set: set2
  }) => set2);
  const camera = useThree(({
    camera: camera2
  }) => camera2);
  const size = useThree(({
    size: size2
  }) => size2);
  const cameraRef = React40.useRef(null);
  React40.useImperativeHandle(ref, () => cameraRef.current, []);
  const groupRef = React40.useRef(null);
  const fbo = useFBO(resolution);
  React40.useLayoutEffect(() => {
    if (!props.manual) {
      cameraRef.current.aspect = size.width / size.height;
    }
  }, [size, props]);
  React40.useLayoutEffect(() => {
    cameraRef.current.updateProjectionMatrix();
  });
  let count = 0;
  let oldEnvMap = null;
  const functional = isFunction2(children);
  useFrame((state) => {
    if (functional && (frames === Infinity || count < frames)) {
      groupRef.current.visible = false;
      state.gl.setRenderTarget(fbo);
      oldEnvMap = state.scene.background;
      if (envMap) state.scene.background = envMap;
      state.gl.render(state.scene, cameraRef.current);
      state.scene.background = oldEnvMap;
      state.gl.setRenderTarget(null);
      groupRef.current.visible = true;
      count++;
    }
  });
  React40.useLayoutEffect(() => {
    if (makeDefault) {
      const oldCam = camera;
      set(() => ({
        camera: cameraRef.current
      }));
      return () => set(() => ({
        camera: oldCam
      }));
    }
  }, [cameraRef, makeDefault, set]);
  return React40.createElement(React40.Fragment, null, React40.createElement("perspectiveCamera", _extends({
    ref: cameraRef
  }, props), !functional && children), React40.createElement("group", {
    ref: groupRef
  }, functional && children(fbo.texture)));
});

// node_modules/@react-three/drei/core/CubeCamera.js
var React41 = __toESM(require_react());
var import_react9 = __toESM(require_react());
function useCubeCamera({
  resolution = 256,
  near = 0.1,
  far = 1e3,
  envMap,
  fog
} = {}) {
  const gl = useThree(({
    gl: gl2
  }) => gl2);
  const scene = useThree(({
    scene: scene2
  }) => scene2);
  const fbo = (0, import_react9.useMemo)(() => {
    const fbo2 = new WebGLCubeRenderTarget(resolution);
    fbo2.texture.type = HalfFloatType;
    return fbo2;
  }, [resolution]);
  (0, import_react9.useEffect)(() => {
    return () => {
      fbo.dispose();
    };
  }, [fbo]);
  const camera = (0, import_react9.useMemo)(() => new CubeCamera(near, far, fbo), [near, far, fbo]);
  let originalFog;
  let originalBackground;
  const update2 = React41.useCallback(() => {
    originalFog = scene.fog;
    originalBackground = scene.background;
    scene.background = envMap || originalBackground;
    scene.fog = fog || originalFog;
    camera.update(gl, scene);
    scene.fog = originalFog;
    scene.background = originalBackground;
  }, [gl, scene, camera]);
  return {
    fbo,
    camera,
    update: update2
  };
}
function CubeCamera2({
  children,
  frames = Infinity,
  resolution,
  near,
  far,
  envMap,
  fog,
  ...props
}) {
  const ref = React41.useRef(null);
  const {
    fbo,
    camera,
    update: update2
  } = useCubeCamera({
    resolution,
    near,
    far,
    envMap,
    fog
  });
  let count = 0;
  useFrame(() => {
    if (ref.current && (frames === Infinity || count < frames)) {
      ref.current.visible = false;
      update2();
      ref.current.visible = true;
      count++;
    }
  });
  return React41.createElement("group", props, React41.createElement("primitive", {
    object: camera
  }), React41.createElement("group", {
    ref
  }, children == null ? void 0 : children(fbo.texture)));
}

// node_modules/@react-three/drei/core/DeviceOrientationControls.js
var React42 = __toESM(require_react());
var DeviceOrientationControls2 = React42.forwardRef((props, ref) => {
  const {
    camera,
    onChange,
    makeDefault,
    ...rest
  } = props;
  const defaultCamera = useThree((state) => state.camera);
  const invalidate = useThree((state) => state.invalidate);
  const get = useThree((state) => state.get);
  const set = useThree((state) => state.set);
  const explCamera = camera || defaultCamera;
  const controls = React42.useMemo(() => new DeviceOrientationControls(explCamera), [explCamera]);
  React42.useEffect(() => {
    const callback = (e) => {
      invalidate();
      if (onChange) onChange(e);
    };
    controls == null || controls.addEventListener == null || controls.addEventListener("change", callback);
    return () => controls == null || controls.removeEventListener == null ? void 0 : controls.removeEventListener("change", callback);
  }, [onChange, controls, invalidate]);
  useFrame(() => controls == null ? void 0 : controls.update(), -1);
  React42.useEffect(() => {
    const current = controls;
    current == null || current.connect();
    return () => current == null ? void 0 : current.dispose();
  }, [controls]);
  React42.useEffect(() => {
    if (makeDefault) {
      const old = get().controls;
      set({
        controls
      });
      return () => set({
        controls: old
      });
    }
  }, [makeDefault, controls]);
  return controls ? React42.createElement("primitive", _extends({
    ref,
    object: controls
  }, rest)) : null;
});

// node_modules/@react-three/drei/core/FlyControls.js
var React43 = __toESM(require_react());
var FlyControls2 = React43.forwardRef(({
  domElement,
  ...props
}, fref) => {
  const {
    onChange,
    makeDefault,
    ...rest
  } = props;
  const invalidate = useThree((state) => state.invalidate);
  const camera = useThree((state) => state.camera);
  const gl = useThree((state) => state.gl);
  const events = useThree((state) => state.events);
  const get = useThree((state) => state.get);
  const set = useThree((state) => state.set);
  const explDomElement = domElement || events.connected || gl.domElement;
  const controls = React43.useMemo(() => new FlyControls(camera), [camera]);
  React43.useEffect(() => {
    controls.connect(explDomElement);
    return () => void controls.dispose();
  }, [explDomElement, controls, invalidate]);
  React43.useEffect(() => {
    const callback = (e) => {
      invalidate();
      if (onChange) onChange(e);
    };
    controls.addEventListener == null || controls.addEventListener("change", callback);
    return () => controls.removeEventListener == null ? void 0 : controls.removeEventListener("change", callback);
  }, [onChange, invalidate]);
  React43.useEffect(() => {
    if (makeDefault) {
      const old = get().controls;
      set({
        controls
      });
      return () => set({
        controls: old
      });
    }
  }, [makeDefault, controls]);
  useFrame((_, delta) => controls.update(delta));
  return React43.createElement("primitive", _extends({
    ref: fref,
    object: controls,
    args: [camera, explDomElement]
  }, rest));
});

// node_modules/@react-three/drei/core/MapControls.js
var React44 = __toESM(require_react());
var MapControls2 = React44.forwardRef((props = {
  enableDamping: true
}, ref) => {
  const {
    domElement,
    camera,
    makeDefault,
    onChange,
    onStart,
    onEnd,
    ...rest
  } = props;
  const invalidate = useThree((state) => state.invalidate);
  const defaultCamera = useThree((state) => state.camera);
  const gl = useThree((state) => state.gl);
  const events = useThree((state) => state.events);
  const set = useThree((state) => state.set);
  const get = useThree((state) => state.get);
  const explDomElement = domElement || events.connected || gl.domElement;
  const explCamera = camera || defaultCamera;
  const controls = React44.useMemo(() => new MapControls(explCamera), [explCamera]);
  React44.useEffect(() => {
    controls.connect(explDomElement);
    const callback = (e) => {
      invalidate();
      if (onChange) onChange(e);
    };
    controls.addEventListener("change", callback);
    if (onStart) controls.addEventListener("start", onStart);
    if (onEnd) controls.addEventListener("end", onEnd);
    return () => {
      controls.dispose();
      controls.removeEventListener("change", callback);
      if (onStart) controls.removeEventListener("start", onStart);
      if (onEnd) controls.removeEventListener("end", onEnd);
    };
  }, [onChange, onStart, onEnd, controls, invalidate, explDomElement]);
  React44.useEffect(() => {
    if (makeDefault) {
      const old = get().controls;
      set({
        controls
      });
      return () => set({
        controls: old
      });
    }
  }, [makeDefault, controls]);
  useFrame(() => controls.update(), -1);
  return React44.createElement("primitive", _extends({
    ref,
    object: controls,
    enableDamping: true
  }, rest));
});

// node_modules/@react-three/drei/core/OrbitControls.js
var React45 = __toESM(require_react());
var OrbitControls2 = React45.forwardRef(({
  makeDefault,
  camera,
  regress,
  domElement,
  enableDamping = true,
  keyEvents = false,
  onChange,
  onStart,
  onEnd,
  ...restProps
}, ref) => {
  const invalidate = useThree((state) => state.invalidate);
  const defaultCamera = useThree((state) => state.camera);
  const gl = useThree((state) => state.gl);
  const events = useThree((state) => state.events);
  const setEvents = useThree((state) => state.setEvents);
  const set = useThree((state) => state.set);
  const get = useThree((state) => state.get);
  const performance2 = useThree((state) => state.performance);
  const explCamera = camera || defaultCamera;
  const explDomElement = domElement || events.connected || gl.domElement;
  const controls = React45.useMemo(() => new OrbitControls(explCamera), [explCamera]);
  useFrame(() => {
    if (controls.enabled) controls.update();
  }, -1);
  React45.useEffect(() => {
    if (keyEvents) {
      controls.connect(keyEvents === true ? explDomElement : keyEvents);
    }
    controls.connect(explDomElement);
    return () => void controls.dispose();
  }, [keyEvents, explDomElement, regress, controls, invalidate]);
  React45.useEffect(() => {
    const callback = (e) => {
      invalidate();
      if (regress) performance2.regress();
      if (onChange) onChange(e);
    };
    const onStartCb = (e) => {
      if (onStart) onStart(e);
    };
    const onEndCb = (e) => {
      if (onEnd) onEnd(e);
    };
    controls.addEventListener("change", callback);
    controls.addEventListener("start", onStartCb);
    controls.addEventListener("end", onEndCb);
    return () => {
      controls.removeEventListener("start", onStartCb);
      controls.removeEventListener("end", onEndCb);
      controls.removeEventListener("change", callback);
    };
  }, [onChange, onStart, onEnd, controls, invalidate, setEvents]);
  React45.useEffect(() => {
    if (makeDefault) {
      const old = get().controls;
      set({
        controls
      });
      return () => set({
        controls: old
      });
    }
  }, [makeDefault, controls]);
  return React45.createElement("primitive", _extends({
    ref,
    object: controls,
    enableDamping
  }, restProps));
});

// node_modules/@react-three/drei/core/TrackballControls.js
var React46 = __toESM(require_react());
var TrackballControls2 = React46.forwardRef(({
  makeDefault,
  camera,
  domElement,
  regress,
  onChange,
  onStart,
  onEnd,
  ...restProps
}, ref) => {
  const {
    invalidate,
    camera: defaultCamera,
    gl,
    events,
    set,
    get,
    performance: performance2,
    viewport
  } = useThree();
  const explCamera = camera || defaultCamera;
  const explDomElement = domElement || events.connected || gl.domElement;
  const controls = React46.useMemo(() => new TrackballControls(explCamera), [explCamera]);
  useFrame(() => {
    if (controls.enabled) controls.update();
  }, -1);
  React46.useEffect(() => {
    controls.connect(explDomElement);
    return () => void controls.dispose();
  }, [explDomElement, regress, controls, invalidate]);
  React46.useEffect(() => {
    const callback = (e) => {
      invalidate();
      if (regress) performance2.regress();
      if (onChange) onChange(e);
    };
    controls.addEventListener("change", callback);
    if (onStart) controls.addEventListener("start", onStart);
    if (onEnd) controls.addEventListener("end", onEnd);
    return () => {
      if (onStart) controls.removeEventListener("start", onStart);
      if (onEnd) controls.removeEventListener("end", onEnd);
      controls.removeEventListener("change", callback);
    };
  }, [onChange, onStart, onEnd, controls, invalidate]);
  React46.useEffect(() => {
    controls.handleResize();
  }, [viewport]);
  React46.useEffect(() => {
    if (makeDefault) {
      const old = get().controls;
      set({
        controls
      });
      return () => set({
        controls: old
      });
    }
  }, [makeDefault, controls]);
  return React46.createElement("primitive", _extends({
    ref,
    object: controls
  }, restProps));
});

// node_modules/@react-three/drei/core/ArcballControls.js
var React47 = __toESM(require_react());
var import_react10 = __toESM(require_react());
var ArcballControls2 = (0, import_react10.forwardRef)(({
  camera,
  makeDefault,
  regress,
  domElement,
  onChange,
  onStart,
  onEnd,
  ...restProps
}, ref) => {
  const invalidate = useThree((state) => state.invalidate);
  const defaultCamera = useThree((state) => state.camera);
  const gl = useThree((state) => state.gl);
  const events = useThree((state) => state.events);
  const set = useThree((state) => state.set);
  const get = useThree((state) => state.get);
  const performance2 = useThree((state) => state.performance);
  const explCamera = camera || defaultCamera;
  const explDomElement = domElement || events.connected || gl.domElement;
  const controls = (0, import_react10.useMemo)(() => new ArcballControls(explCamera), [explCamera]);
  useFrame(() => {
    if (controls.enabled) controls.update();
  }, -1);
  (0, import_react10.useEffect)(() => {
    controls.connect(explDomElement);
    return () => void controls.dispose();
  }, [explDomElement, regress, controls, invalidate]);
  (0, import_react10.useEffect)(() => {
    const callback = (e) => {
      invalidate();
      if (regress) performance2.regress();
      if (onChange) onChange(e);
    };
    controls.addEventListener("change", callback);
    if (onStart) controls.addEventListener("start", onStart);
    if (onEnd) controls.addEventListener("end", onEnd);
    return () => {
      controls.removeEventListener("change", callback);
      if (onStart) controls.removeEventListener("start", onStart);
      if (onEnd) controls.removeEventListener("end", onEnd);
    };
  }, [onChange, onStart, onEnd]);
  (0, import_react10.useEffect)(() => {
    if (makeDefault) {
      const old = get().controls;
      set({
        controls
      });
      return () => set({
        controls: old
      });
    }
  }, [makeDefault, controls]);
  return React47.createElement("primitive", _extends({
    ref,
    object: controls
  }, restProps));
});

// node_modules/@react-three/drei/core/TransformControls.js
var React48 = __toESM(require_react());
var TransformControls2 = React48.forwardRef(({
  children,
  domElement,
  onChange,
  onMouseDown,
  onMouseUp,
  onObjectChange,
  object,
  makeDefault,
  camera,
  // Transform
  enabled,
  axis,
  mode,
  translationSnap,
  rotationSnap,
  scaleSnap,
  space,
  size,
  showX,
  showY,
  showZ,
  ...props
}, ref) => {
  const defaultControls = useThree((state) => state.controls);
  const gl = useThree((state) => state.gl);
  const events = useThree((state) => state.events);
  const defaultCamera = useThree((state) => state.camera);
  const invalidate = useThree((state) => state.invalidate);
  const get = useThree((state) => state.get);
  const set = useThree((state) => state.set);
  const explCamera = camera || defaultCamera;
  const explDomElement = domElement || events.connected || gl.domElement;
  const controls = React48.useMemo(() => new TransformControls(explCamera, explDomElement), [explCamera, explDomElement]);
  const group = React48.useRef(null);
  React48.useLayoutEffect(() => {
    if (object) {
      controls.attach(object instanceof Object3D ? object : object.current);
    } else if (group.current instanceof Object3D) {
      controls.attach(group.current);
    }
    return () => void controls.detach();
  }, [object, children, controls]);
  React48.useEffect(() => {
    if (defaultControls) {
      const callback = (event) => defaultControls.enabled = !event.value;
      controls.addEventListener("dragging-changed", callback);
      return () => controls.removeEventListener("dragging-changed", callback);
    }
  }, [controls, defaultControls]);
  const onChangeRef = React48.useRef(void 0);
  const onMouseDownRef = React48.useRef(void 0);
  const onMouseUpRef = React48.useRef(void 0);
  const onObjectChangeRef = React48.useRef(void 0);
  React48.useLayoutEffect(() => void (onChangeRef.current = onChange), [onChange]);
  React48.useLayoutEffect(() => void (onMouseDownRef.current = onMouseDown), [onMouseDown]);
  React48.useLayoutEffect(() => void (onMouseUpRef.current = onMouseUp), [onMouseUp]);
  React48.useLayoutEffect(() => void (onObjectChangeRef.current = onObjectChange), [onObjectChange]);
  React48.useEffect(() => {
    const onChange2 = (e) => {
      invalidate();
      onChangeRef.current == null || onChangeRef.current(e);
    };
    const onMouseDown2 = (e) => onMouseDownRef.current == null ? void 0 : onMouseDownRef.current(e);
    const onMouseUp2 = (e) => onMouseUpRef.current == null ? void 0 : onMouseUpRef.current(e);
    const onObjectChange2 = (e) => onObjectChangeRef.current == null ? void 0 : onObjectChangeRef.current(e);
    controls.addEventListener("change", onChange2);
    controls.addEventListener("mouseDown", onMouseDown2);
    controls.addEventListener("mouseUp", onMouseUp2);
    controls.addEventListener("objectChange", onObjectChange2);
    return () => {
      controls.removeEventListener("change", onChange2);
      controls.removeEventListener("mouseDown", onMouseDown2);
      controls.removeEventListener("mouseUp", onMouseUp2);
      controls.removeEventListener("objectChange", onObjectChange2);
    };
  }, [invalidate, controls]);
  React48.useEffect(() => {
    if (makeDefault) {
      const old = get().controls;
      set({
        controls
      });
      return () => set({
        controls: old
      });
    }
  }, [makeDefault, controls]);
  return React48.createElement(React48.Fragment, null, React48.createElement("primitive", {
    ref,
    object: controls,
    enabled,
    axis,
    mode,
    translationSnap,
    rotationSnap,
    scaleSnap,
    space,
    size,
    showX,
    showY,
    showZ
  }), React48.createElement("group", _extends({
    ref: group
  }, props), children));
});

// node_modules/@react-three/drei/core/PointerLockControls.js
var React49 = __toESM(require_react());
var PointerLockControls2 = React49.forwardRef(({
  domElement,
  selector,
  onChange,
  onLock,
  onUnlock,
  enabled = true,
  makeDefault,
  ...props
}, ref) => {
  const {
    camera,
    ...rest
  } = props;
  const setEvents = useThree((state) => state.setEvents);
  const gl = useThree((state) => state.gl);
  const defaultCamera = useThree((state) => state.camera);
  const invalidate = useThree((state) => state.invalidate);
  const events = useThree((state) => state.events);
  const get = useThree((state) => state.get);
  const set = useThree((state) => state.set);
  const explCamera = camera || defaultCamera;
  const explDomElement = domElement || events.connected || gl.domElement;
  const controls = React49.useMemo(() => new PointerLockControls(explCamera), [explCamera]);
  React49.useEffect(() => {
    if (enabled) {
      controls.connect(explDomElement);
      const oldComputeOffsets = get().events.compute;
      setEvents({
        compute(event, state) {
          const offsetX = state.size.width / 2;
          const offsetY = state.size.height / 2;
          state.pointer.set(offsetX / state.size.width * 2 - 1, -(offsetY / state.size.height) * 2 + 1);
          state.raycaster.setFromCamera(state.pointer, state.camera);
        }
      });
      return () => {
        controls.disconnect();
        setEvents({
          compute: oldComputeOffsets
        });
      };
    }
  }, [enabled, controls]);
  React49.useEffect(() => {
    const callback = (e) => {
      invalidate();
      if (onChange) onChange(e);
    };
    controls.addEventListener("change", callback);
    if (onLock) controls.addEventListener("lock", onLock);
    if (onUnlock) controls.addEventListener("unlock", onUnlock);
    const handler = () => controls.lock();
    const elements = selector ? Array.from(document.querySelectorAll(selector)) : [document];
    elements.forEach((element) => element && element.addEventListener("click", handler));
    return () => {
      controls.removeEventListener("change", callback);
      if (onLock) controls.removeEventListener("lock", onLock);
      if (onUnlock) controls.removeEventListener("unlock", onUnlock);
      elements.forEach((element) => element ? element.removeEventListener("click", handler) : void 0);
    };
  }, [onChange, onLock, onUnlock, selector, controls, invalidate]);
  React49.useEffect(() => {
    if (makeDefault) {
      const old = get().controls;
      set({
        controls
      });
      return () => set({
        controls: old
      });
    }
  }, [makeDefault, controls]);
  return React49.createElement("primitive", _extends({
    ref,
    object: controls
  }, rest));
});

// node_modules/@react-three/drei/core/FirstPersonControls.js
var React50 = __toESM(require_react());
var FirstPersonControls2 = React50.forwardRef(({
  domElement,
  makeDefault,
  ...props
}, ref) => {
  const camera = useThree((state) => state.camera);
  const gl = useThree((state) => state.gl);
  const events = useThree((state) => state.events);
  const get = useThree((state) => state.get);
  const set = useThree((state) => state.set);
  const explDomElement = domElement || events.connected || gl.domElement;
  const [controls] = React50.useState(() => new FirstPersonControls(camera, explDomElement));
  React50.useEffect(() => {
    if (makeDefault) {
      const old = get().controls;
      set({
        controls
      });
      return () => set({
        controls: old
      });
    }
  }, [makeDefault, controls]);
  useFrame((_, delta) => {
    controls.update(delta);
  }, -1);
  return controls ? React50.createElement("primitive", _extends({
    ref,
    object: controls
  }, props)) : null;
});

// node_modules/@react-three/drei/core/CameraControls.js
var React51 = __toESM(require_react());
var import_react11 = __toESM(require_react());

// node_modules/camera-controls/dist/camera-controls.module.js
var MOUSE_BUTTON = {
  LEFT: 1,
  RIGHT: 2,
  MIDDLE: 4
};
var ACTION = Object.freeze({
  NONE: 0,
  ROTATE: 1,
  TRUCK: 2,
  SCREEN_PAN: 4,
  OFFSET: 8,
  DOLLY: 16,
  ZOOM: 32,
  TOUCH_ROTATE: 64,
  TOUCH_TRUCK: 128,
  TOUCH_SCREEN_PAN: 256,
  TOUCH_OFFSET: 512,
  TOUCH_DOLLY: 1024,
  TOUCH_ZOOM: 2048,
  TOUCH_DOLLY_TRUCK: 4096,
  TOUCH_DOLLY_SCREEN_PAN: 8192,
  TOUCH_DOLLY_OFFSET: 16384,
  TOUCH_DOLLY_ROTATE: 32768,
  TOUCH_ZOOM_TRUCK: 65536,
  TOUCH_ZOOM_OFFSET: 131072,
  TOUCH_ZOOM_SCREEN_PAN: 262144,
  TOUCH_ZOOM_ROTATE: 524288
});
var DOLLY_DIRECTION = {
  NONE: 0,
  IN: 1,
  OUT: -1
};
function isPerspectiveCamera(camera) {
  return camera.isPerspectiveCamera;
}
function isOrthographicCamera(camera) {
  return camera.isOrthographicCamera;
}
var PI_2 = Math.PI * 2;
var PI_HALF = Math.PI / 2;
var EPSILON = 1e-5;
var DEG2RAD = Math.PI / 180;
function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}
function approxZero(number, error = EPSILON) {
  return Math.abs(number) < error;
}
function approxEquals(a, b, error = EPSILON) {
  return approxZero(a - b, error);
}
function roundToStep(value, step) {
  return Math.round(value / step) * step;
}
function infinityToMaxNumber(value) {
  if (isFinite(value))
    return value;
  if (value < 0)
    return -Number.MAX_VALUE;
  return Number.MAX_VALUE;
}
function maxNumberToInfinity(value) {
  if (Math.abs(value) < Number.MAX_VALUE)
    return value;
  return value * Infinity;
}
function smoothDamp(current, target2, currentVelocityRef, smoothTime, maxSpeed = Infinity, deltaTime) {
  smoothTime = Math.max(1e-4, smoothTime);
  const omega = 2 / smoothTime;
  const x = omega * deltaTime;
  const exp = 1 / (1 + x + 0.48 * x * x + 0.235 * x * x * x);
  let change = current - target2;
  const originalTo = target2;
  const maxChange = maxSpeed * smoothTime;
  change = clamp(change, -maxChange, maxChange);
  target2 = current - change;
  const temp5 = (currentVelocityRef.value + omega * change) * deltaTime;
  currentVelocityRef.value = (currentVelocityRef.value - omega * temp5) * exp;
  let output = target2 + (change + temp5) * exp;
  if (originalTo - current > 0 === output > originalTo) {
    output = originalTo;
    currentVelocityRef.value = (output - originalTo) / deltaTime;
  }
  return output;
}
function smoothDampVec3(current, target2, currentVelocityRef, smoothTime, maxSpeed = Infinity, deltaTime, out) {
  smoothTime = Math.max(1e-4, smoothTime);
  const omega = 2 / smoothTime;
  const x = omega * deltaTime;
  const exp = 1 / (1 + x + 0.48 * x * x + 0.235 * x * x * x);
  let targetX = target2.x;
  let targetY = target2.y;
  let targetZ = target2.z;
  let changeX = current.x - targetX;
  let changeY = current.y - targetY;
  let changeZ = current.z - targetZ;
  const originalToX = targetX;
  const originalToY = targetY;
  const originalToZ = targetZ;
  const maxChange = maxSpeed * smoothTime;
  const maxChangeSq = maxChange * maxChange;
  const magnitudeSq = changeX * changeX + changeY * changeY + changeZ * changeZ;
  if (magnitudeSq > maxChangeSq) {
    const magnitude = Math.sqrt(magnitudeSq);
    changeX = changeX / magnitude * maxChange;
    changeY = changeY / magnitude * maxChange;
    changeZ = changeZ / magnitude * maxChange;
  }
  targetX = current.x - changeX;
  targetY = current.y - changeY;
  targetZ = current.z - changeZ;
  const tempX = (currentVelocityRef.x + omega * changeX) * deltaTime;
  const tempY = (currentVelocityRef.y + omega * changeY) * deltaTime;
  const tempZ = (currentVelocityRef.z + omega * changeZ) * deltaTime;
  currentVelocityRef.x = (currentVelocityRef.x - omega * tempX) * exp;
  currentVelocityRef.y = (currentVelocityRef.y - omega * tempY) * exp;
  currentVelocityRef.z = (currentVelocityRef.z - omega * tempZ) * exp;
  out.x = targetX + (changeX + tempX) * exp;
  out.y = targetY + (changeY + tempY) * exp;
  out.z = targetZ + (changeZ + tempZ) * exp;
  const origMinusCurrentX = originalToX - current.x;
  const origMinusCurrentY = originalToY - current.y;
  const origMinusCurrentZ = originalToZ - current.z;
  const outMinusOrigX = out.x - originalToX;
  const outMinusOrigY = out.y - originalToY;
  const outMinusOrigZ = out.z - originalToZ;
  if (origMinusCurrentX * outMinusOrigX + origMinusCurrentY * outMinusOrigY + origMinusCurrentZ * outMinusOrigZ > 0) {
    out.x = originalToX;
    out.y = originalToY;
    out.z = originalToZ;
    currentVelocityRef.x = (out.x - originalToX) / deltaTime;
    currentVelocityRef.y = (out.y - originalToY) / deltaTime;
    currentVelocityRef.z = (out.z - originalToZ) / deltaTime;
  }
  return out;
}
function extractClientCoordFromEvent(pointers, out) {
  out.set(0, 0);
  pointers.forEach((pointer) => {
    out.x += pointer.clientX;
    out.y += pointer.clientY;
  });
  out.x /= pointers.length;
  out.y /= pointers.length;
}
function notSupportedInOrthographicCamera(camera, message) {
  if (isOrthographicCamera(camera)) {
    console.warn(`${message} is not supported in OrthographicCamera`);
    return true;
  }
  return false;
}
var EventDispatcher2 = class {
  _listeners = {};
  /**
   * Adds the specified event listener.
   * @param type event name
   * @param listener handler function
   * @category Methods
   */
  addEventListener(type, listener) {
    const listeners = this._listeners;
    if (listeners[type] === void 0)
      listeners[type] = [];
    if (listeners[type].indexOf(listener) === -1)
      listeners[type].push(listener);
  }
  /**
   * Presence of the specified event listener.
   * @param type event name
   * @param listener handler function
   * @category Methods
   */
  hasEventListener(type, listener) {
    const listeners = this._listeners;
    return listeners[type] !== void 0 && listeners[type].indexOf(listener) !== -1;
  }
  /**
   * Removes the specified event listener
   * @param type event name
   * @param listener handler function
   * @category Methods
   */
  removeEventListener(type, listener) {
    const listeners = this._listeners;
    const listenerArray = listeners[type];
    if (listenerArray !== void 0) {
      const index = listenerArray.indexOf(listener);
      if (index !== -1)
        listenerArray.splice(index, 1);
    }
  }
  /**
   * Removes all event listeners
   * @param type event name
   * @category Methods
   */
  removeAllEventListeners(type) {
    if (!type) {
      this._listeners = {};
      return;
    }
    if (Array.isArray(this._listeners[type]))
      this._listeners[type].length = 0;
  }
  /**
   * Fire an event type.
   * @param event DispatcherEvent
   * @category Methods
   */
  dispatchEvent(event) {
    const listeners = this._listeners;
    const listenerArray = listeners[event.type];
    if (listenerArray !== void 0) {
      event.target = this;
      const array = listenerArray.slice(0);
      for (let i2 = 0, l = array.length; i2 < l; i2++) {
        array[i2].call(this, event);
      }
    }
  }
};
var VERSION = "3.1.1";
var TOUCH_DOLLY_FACTOR = 1 / 8;
var isMac = /Mac/.test(globalThis?.navigator?.platform);
var THREE;
var _ORIGIN;
var _AXIS_Y;
var _AXIS_Z;
var _v2;
var _v3A;
var _v3B;
var _v3C;
var _cameraDirection;
var _xColumn;
var _yColumn;
var _zColumn;
var _deltaTarget;
var _deltaOffset;
var _sphericalA;
var _sphericalB;
var _box3A;
var _box3B;
var _sphere;
var _quaternionA;
var _quaternionB;
var _rotationMatrix;
var _raycaster;
var CameraControls = class _CameraControls extends EventDispatcher2 {
  /**
       * Injects THREE as the dependency. You can then proceed to use CameraControls.
       *
       * e.g
       * ```javascript
       * CameraControls.install( { THREE: THREE } );
       * ```
       *
       * Note: If you do not wish to use enter three.js to reduce file size(tree-shaking for example), make a subset to install.
       *
       * ```js
       * import {
       * 	Vector2,
       * 	Vector3,
       * 	Vector4,
       * 	Quaternion,
       * 	Matrix4,
       * 	Spherical,
       * 	Box3,
       * 	Sphere,
       * 	Raycaster,
       * 	MathUtils,
       * } from 'three';
       *
       * const subsetOfTHREE = {
       * 	Vector2   : Vector2,
       * 	Vector3   : Vector3,
       * 	Vector4   : Vector4,
       * 	Quaternion: Quaternion,
       * 	Matrix4   : Matrix4,
       * 	Spherical : Spherical,
       * 	Box3      : Box3,
       * 	Sphere    : Sphere,
       * 	Raycaster : Raycaster,
       * };
  
       * CameraControls.install( { THREE: subsetOfTHREE } );
       * ```
       * @category Statics
       */
  static install(libs) {
    THREE = libs.THREE;
    _ORIGIN = Object.freeze(new THREE.Vector3(0, 0, 0));
    _AXIS_Y = Object.freeze(new THREE.Vector3(0, 1, 0));
    _AXIS_Z = Object.freeze(new THREE.Vector3(0, 0, 1));
    _v2 = new THREE.Vector2();
    _v3A = new THREE.Vector3();
    _v3B = new THREE.Vector3();
    _v3C = new THREE.Vector3();
    _cameraDirection = new THREE.Vector3();
    _xColumn = new THREE.Vector3();
    _yColumn = new THREE.Vector3();
    _zColumn = new THREE.Vector3();
    _deltaTarget = new THREE.Vector3();
    _deltaOffset = new THREE.Vector3();
    _sphericalA = new THREE.Spherical();
    _sphericalB = new THREE.Spherical();
    _box3A = new THREE.Box3();
    _box3B = new THREE.Box3();
    _sphere = new THREE.Sphere();
    _quaternionA = new THREE.Quaternion();
    _quaternionB = new THREE.Quaternion();
    _rotationMatrix = new THREE.Matrix4();
    _raycaster = new THREE.Raycaster();
  }
  /**
   * list all ACTIONs
   * @category Statics
   */
  static get ACTION() {
    return ACTION;
  }
  /**
   * Minimum vertical angle in radians.
   * The angle has to be between `0` and `.maxPolarAngle` inclusive.
   * The default value is `0`.
   *
   * e.g.
   * ```
   * cameraControls.maxPolarAngle = 0;
   * ```
   * @category Properties
   */
  minPolarAngle = 0;
  // radians
  /**
   * Maximum vertical angle in radians.
   * The angle has to be between `.maxPolarAngle` and `Math.PI` inclusive.
   * The default value is `Math.PI`.
   *
   * e.g.
   * ```
   * cameraControls.maxPolarAngle = Math.PI;
   * ```
   * @category Properties
   */
  maxPolarAngle = Math.PI;
  // radians
  /**
   * Minimum horizontal angle in radians.
   * The angle has to be less than `.maxAzimuthAngle`.
   * The default value is `- Infinity`.
   *
   * e.g.
   * ```
   * cameraControls.minAzimuthAngle = - Infinity;
   * ```
   * @category Properties
   */
  minAzimuthAngle = -Infinity;
  // radians
  /**
   * Maximum horizontal angle in radians.
   * The angle has to be greater than `.minAzimuthAngle`.
   * The default value is `Infinity`.
   *
   * e.g.
   * ```
   * cameraControls.maxAzimuthAngle = Infinity;
   * ```
   * @category Properties
   */
  maxAzimuthAngle = Infinity;
  // radians
  // How far you can dolly in and out ( PerspectiveCamera only )
  /**
   * Minimum distance for dolly. The value must be higher than `0`. Default is `Number.EPSILON`.
   * PerspectiveCamera only.
   * @category Properties
   */
  minDistance = Number.EPSILON;
  /**
   * Maximum distance for dolly. The value must be higher than `minDistance`. Default is `Infinity`.
   * PerspectiveCamera only.
   * @category Properties
   */
  maxDistance = Infinity;
  /**
   * `true` to enable Infinity Dolly for wheel and pinch. Use this with `minDistance` and `maxDistance`
   * If the Dolly distance is less (or over) than the `minDistance` (or `maxDistance`), `infinityDolly` will keep the distance and pushes the target position instead.
   * @category Properties
   */
  infinityDolly = false;
  /**
   * Minimum camera zoom.
   * @category Properties
   */
  minZoom = 0.01;
  /**
   * Maximum camera zoom.
   * @category Properties
   */
  maxZoom = Infinity;
  /**
   * Approximate time in seconds to reach the target. A smaller value will reach the target faster.
   * @category Properties
   */
  smoothTime = 0.25;
  /**
   * the smoothTime while dragging
   * @category Properties
   */
  draggingSmoothTime = 0.125;
  /**
   * Max transition speed in unit-per-seconds
   * @category Properties
   */
  maxSpeed = Infinity;
  /**
   * Speed of azimuth (horizontal) rotation.
   * @category Properties
   */
  azimuthRotateSpeed = 1;
  /**
   * Speed of polar (vertical) rotation.
   * @category Properties
   */
  polarRotateSpeed = 1;
  /**
   * Speed of mouse-wheel dollying.
   * @category Properties
   */
  dollySpeed = 1;
  /**
   * `true` to invert direction when dollying or zooming via drag
   * @category Properties
   */
  dollyDragInverted = false;
  /**
   * Speed of drag for truck and pedestal.
   * @category Properties
   */
  truckSpeed = 2;
  /**
   * `true` to enable Dolly-in to the mouse cursor coords.
   * @category Properties
   */
  dollyToCursor = false;
  /**
   * @category Properties
   */
  dragToOffset = false;
  /**
   * Friction ratio of the boundary.
   * @category Properties
   */
  boundaryFriction = 0;
  /**
   * Controls how soon the `rest` event fires as the camera slows.
   * @category Properties
   */
  restThreshold = 0.01;
  /**
   * An array of Meshes to collide with camera.
   * Be aware colliderMeshes may decrease performance. The collision test uses 4 raycasters from the camera since the near plane has 4 corners.
   * @category Properties
   */
  colliderMeshes = [];
  // button configs
  /**
   * User's mouse input config.
   *
   * | button to assign      | behavior |
   * | --------------------- | -------- |
   * | `mouseButtons.left`   | `CameraControls.ACTION.ROTATE`* \| `CameraControls.ACTION.TRUCK` \| `CameraControls.ACTION.OFFSET` \| `CameraControls.ACTION.DOLLY` \| `CameraControls.ACTION.ZOOM` \| `CameraControls.ACTION.NONE` |
   * | `mouseButtons.right`  | `CameraControls.ACTION.ROTATE` \| `CameraControls.ACTION.TRUCK`* \| `CameraControls.ACTION.OFFSET` \| `CameraControls.ACTION.DOLLY` \| `CameraControls.ACTION.ZOOM` \| `CameraControls.ACTION.NONE` |
   * | `mouseButtons.wheel` ¹ | `CameraControls.ACTION.ROTATE` \| `CameraControls.ACTION.TRUCK` \| `CameraControls.ACTION.OFFSET` \| `CameraControls.ACTION.DOLLY` \| `CameraControls.ACTION.ZOOM` \| `CameraControls.ACTION.NONE` |
   * | `mouseButtons.middle` ² | `CameraControls.ACTION.ROTATE` \| `CameraControls.ACTION.TRUCK` \| `CameraControls.ACTION.OFFSET` \| `CameraControls.ACTION.DOLLY`* \| `CameraControls.ACTION.ZOOM` \| `CameraControls.ACTION.NONE` |
   *
   * 1. Mouse wheel event for scroll "up/down" on mac "up/down/left/right"
   * 2. Mouse click on wheel event "button"
   * - \* is the default.
   * - The default of `mouseButtons.wheel` is:
   *   - `DOLLY` for Perspective camera.
   *   - `ZOOM` for Orthographic camera, and can't set `DOLLY`.
   * @category Properties
   */
  mouseButtons;
  /**
   * User's touch input config.
   *
   * | fingers to assign     | behavior |
   * | --------------------- | -------- |
   * | `touches.one` | `CameraControls.ACTION.TOUCH_ROTATE`* \| `CameraControls.ACTION.TOUCH_TRUCK` \| `CameraControls.ACTION.TOUCH_OFFSET` \| `CameraControls.ACTION.DOLLY` | `CameraControls.ACTION.ZOOM` | `CameraControls.ACTION.NONE` |
   * | `touches.two` | `ACTION.TOUCH_DOLLY_TRUCK` \| `ACTION.TOUCH_DOLLY_OFFSET` \| `ACTION.TOUCH_DOLLY_ROTATE` \| `ACTION.TOUCH_ZOOM_TRUCK` \| `ACTION.TOUCH_ZOOM_OFFSET` \| `ACTION.TOUCH_ZOOM_ROTATE` \| `ACTION.TOUCH_DOLLY` \| `ACTION.TOUCH_ZOOM` \| `CameraControls.ACTION.TOUCH_ROTATE` \| `CameraControls.ACTION.TOUCH_TRUCK` \| `CameraControls.ACTION.TOUCH_OFFSET` \| `CameraControls.ACTION.NONE` |
   * | `touches.three` | `ACTION.TOUCH_DOLLY_TRUCK` \| `ACTION.TOUCH_DOLLY_OFFSET` \| `ACTION.TOUCH_DOLLY_ROTATE` \| `ACTION.TOUCH_ZOOM_TRUCK` \| `ACTION.TOUCH_ZOOM_OFFSET` \| `ACTION.TOUCH_ZOOM_ROTATE` \| `CameraControls.ACTION.TOUCH_ROTATE` \| `CameraControls.ACTION.TOUCH_TRUCK` \| `CameraControls.ACTION.TOUCH_OFFSET` \| `CameraControls.ACTION.NONE` |
   *
   * - \* is the default.
   * - The default of `touches.two` and `touches.three` is:
   *   - `TOUCH_DOLLY_TRUCK` for Perspective camera.
   *   - `TOUCH_ZOOM_TRUCK` for Orthographic camera, and can't set `TOUCH_DOLLY_TRUCK` and `TOUCH_DOLLY`.
   * @category Properties
   */
  touches;
  /**
   * Force cancel user dragging.
   * @category Methods
   */
  // cancel will be overwritten in the constructor.
  cancel = () => {
  };
  /**
   * Still an experimental feature.
   * This could change at any time.
   * @category Methods
   */
  lockPointer;
  /**
   * Still an experimental feature.
   * This could change at any time.
   * @category Methods
   */
  unlockPointer;
  _enabled = true;
  _camera;
  _yAxisUpSpace;
  _yAxisUpSpaceInverse;
  _state = ACTION.NONE;
  _domElement;
  _viewport = null;
  // the location of focus, where the object orbits around
  _target;
  _targetEnd;
  _focalOffset;
  _focalOffsetEnd;
  // rotation and dolly distance
  _spherical;
  _sphericalEnd;
  _lastDistance;
  _zoom;
  _zoomEnd;
  _lastZoom;
  // reset
  _cameraUp0;
  _target0;
  _position0;
  _zoom0;
  _focalOffset0;
  _dollyControlCoord;
  _changedDolly = 0;
  _changedZoom = 0;
  // collisionTest uses nearPlane. ( PerspectiveCamera only )
  _nearPlaneCorners;
  _hasRested = true;
  _boundary;
  _boundaryEnclosesCamera = false;
  _needsUpdate = true;
  _updatedLastTime = false;
  _elementRect = new DOMRect();
  _isDragging = false;
  _dragNeedsUpdate = true;
  _activePointers = [];
  _lockedPointer = null;
  _interactiveArea = new DOMRect(0, 0, 1, 1);
  // Use draggingSmoothTime over smoothTime while true.
  // set automatically true on user-dragging start.
  // set automatically false on programmable methods call.
  _isUserControllingRotate = false;
  _isUserControllingDolly = false;
  _isUserControllingTruck = false;
  _isUserControllingOffset = false;
  _isUserControllingZoom = false;
  _lastDollyDirection = DOLLY_DIRECTION.NONE;
  // velocities for smoothDamp
  _thetaVelocity = { value: 0 };
  _phiVelocity = { value: 0 };
  _radiusVelocity = { value: 0 };
  _targetVelocity = new THREE.Vector3();
  _focalOffsetVelocity = new THREE.Vector3();
  _zoomVelocity = { value: 0 };
  /**
   * @deprecated Use `cameraControls.mouseButtons.left = CameraControls.ACTION.SCREEN_PAN` instead.
   */
  set verticalDragToForward(_) {
    console.warn("camera-controls: `verticalDragToForward` was removed. Use `mouseButtons.left = CameraControls.ACTION.SCREEN_PAN` instead.");
  }
  /**
   * Creates a `CameraControls` instance.
   *
   * Note:
   * You **must install** three.js before using camera-controls. see [#install](#install)
   * Not doing so will lead to runtime errors (`undefined` references to THREE).
   *
   * e.g.
   * ```
   * CameraControls.install( { THREE } );
   * const cameraControls = new CameraControls( camera, domElement );
   * ```
   *
   * @param camera A `THREE.PerspectiveCamera` or `THREE.OrthographicCamera` to be controlled.
   * @param domElement A `HTMLElement` for the draggable area, usually `renderer.domElement`.
   * @category Constructor
   */
  constructor(camera, domElement) {
    super();
    if (typeof THREE === "undefined") {
      console.error("camera-controls: `THREE` is undefined. You must first run `CameraControls.install( { THREE: THREE } )`. Check the docs for further information.");
    }
    this._camera = camera;
    this._yAxisUpSpace = new THREE.Quaternion().setFromUnitVectors(this._camera.up, _AXIS_Y);
    this._yAxisUpSpaceInverse = this._yAxisUpSpace.clone().invert();
    this._state = ACTION.NONE;
    this._target = new THREE.Vector3();
    this._targetEnd = this._target.clone();
    this._focalOffset = new THREE.Vector3();
    this._focalOffsetEnd = this._focalOffset.clone();
    this._spherical = new THREE.Spherical().setFromVector3(_v3A.copy(this._camera.position).applyQuaternion(this._yAxisUpSpace));
    this._sphericalEnd = this._spherical.clone();
    this._lastDistance = this._spherical.radius;
    this._zoom = this._camera.zoom;
    this._zoomEnd = this._zoom;
    this._lastZoom = this._zoom;
    this._nearPlaneCorners = [
      new THREE.Vector3(),
      new THREE.Vector3(),
      new THREE.Vector3(),
      new THREE.Vector3()
    ];
    this._updateNearPlaneCorners();
    this._boundary = new THREE.Box3(new THREE.Vector3(-Infinity, -Infinity, -Infinity), new THREE.Vector3(Infinity, Infinity, Infinity));
    this._cameraUp0 = this._camera.up.clone();
    this._target0 = this._target.clone();
    this._position0 = this._camera.position.clone();
    this._zoom0 = this._zoom;
    this._focalOffset0 = this._focalOffset.clone();
    this._dollyControlCoord = new THREE.Vector2();
    this.mouseButtons = {
      left: ACTION.ROTATE,
      middle: ACTION.DOLLY,
      right: ACTION.TRUCK,
      wheel: isPerspectiveCamera(this._camera) ? ACTION.DOLLY : isOrthographicCamera(this._camera) ? ACTION.ZOOM : ACTION.NONE
    };
    this.touches = {
      one: ACTION.TOUCH_ROTATE,
      two: isPerspectiveCamera(this._camera) ? ACTION.TOUCH_DOLLY_TRUCK : isOrthographicCamera(this._camera) ? ACTION.TOUCH_ZOOM_TRUCK : ACTION.NONE,
      three: ACTION.TOUCH_TRUCK
    };
    const dragStartPosition = new THREE.Vector2();
    const lastDragPosition = new THREE.Vector2();
    const dollyStart = new THREE.Vector2();
    const onPointerDown = (event) => {
      if (!this._enabled || !this._domElement)
        return;
      if (this._interactiveArea.left !== 0 || this._interactiveArea.top !== 0 || this._interactiveArea.width !== 1 || this._interactiveArea.height !== 1) {
        const elRect = this._domElement.getBoundingClientRect();
        const left = event.clientX / elRect.width;
        const top = event.clientY / elRect.height;
        if (left < this._interactiveArea.left || left > this._interactiveArea.right || top < this._interactiveArea.top || top > this._interactiveArea.bottom)
          return;
      }
      const mouseButton = event.pointerType !== "mouse" ? null : (event.buttons & MOUSE_BUTTON.LEFT) === MOUSE_BUTTON.LEFT ? MOUSE_BUTTON.LEFT : (event.buttons & MOUSE_BUTTON.MIDDLE) === MOUSE_BUTTON.MIDDLE ? MOUSE_BUTTON.MIDDLE : (event.buttons & MOUSE_BUTTON.RIGHT) === MOUSE_BUTTON.RIGHT ? MOUSE_BUTTON.RIGHT : null;
      if (mouseButton !== null) {
        const zombiePointer = this._findPointerByMouseButton(mouseButton);
        zombiePointer && this._disposePointer(zombiePointer);
      }
      if ((event.buttons & MOUSE_BUTTON.LEFT) === MOUSE_BUTTON.LEFT && this._lockedPointer)
        return;
      const pointer = {
        pointerId: event.pointerId,
        clientX: event.clientX,
        clientY: event.clientY,
        deltaX: 0,
        deltaY: 0,
        mouseButton
      };
      this._activePointers.push(pointer);
      this._domElement.ownerDocument.removeEventListener("pointermove", onPointerMove, { passive: false });
      this._domElement.ownerDocument.removeEventListener("pointerup", onPointerUp);
      this._domElement.ownerDocument.addEventListener("pointermove", onPointerMove, { passive: false });
      this._domElement.ownerDocument.addEventListener("pointerup", onPointerUp);
      this._isDragging = true;
      startDragging(event);
    };
    const onPointerMove = (event) => {
      if (event.cancelable)
        event.preventDefault();
      const pointerId = event.pointerId;
      const pointer = this._lockedPointer || this._findPointerById(pointerId);
      if (!pointer)
        return;
      pointer.clientX = event.clientX;
      pointer.clientY = event.clientY;
      pointer.deltaX = event.movementX;
      pointer.deltaY = event.movementY;
      this._state = 0;
      if (event.pointerType === "touch") {
        switch (this._activePointers.length) {
          case 1:
            this._state = this.touches.one;
            break;
          case 2:
            this._state = this.touches.two;
            break;
          case 3:
            this._state = this.touches.three;
            break;
        }
      } else {
        if (!this._isDragging && this._lockedPointer || this._isDragging && (event.buttons & MOUSE_BUTTON.LEFT) === MOUSE_BUTTON.LEFT) {
          this._state = this._state | this.mouseButtons.left;
        }
        if (this._isDragging && (event.buttons & MOUSE_BUTTON.MIDDLE) === MOUSE_BUTTON.MIDDLE) {
          this._state = this._state | this.mouseButtons.middle;
        }
        if (this._isDragging && (event.buttons & MOUSE_BUTTON.RIGHT) === MOUSE_BUTTON.RIGHT) {
          this._state = this._state | this.mouseButtons.right;
        }
      }
      dragging();
    };
    const onPointerUp = (event) => {
      const pointer = this._findPointerById(event.pointerId);
      if (pointer && pointer === this._lockedPointer)
        return;
      pointer && this._disposePointer(pointer);
      if (event.pointerType === "touch") {
        switch (this._activePointers.length) {
          case 0:
            this._state = ACTION.NONE;
            break;
          case 1:
            this._state = this.touches.one;
            break;
          case 2:
            this._state = this.touches.two;
            break;
          case 3:
            this._state = this.touches.three;
            break;
        }
      } else {
        this._state = ACTION.NONE;
      }
      endDragging();
    };
    let lastScrollTimeStamp = -1;
    const onMouseWheel = (event) => {
      if (!this._domElement)
        return;
      if (!this._enabled || this.mouseButtons.wheel === ACTION.NONE)
        return;
      if (this._interactiveArea.left !== 0 || this._interactiveArea.top !== 0 || this._interactiveArea.width !== 1 || this._interactiveArea.height !== 1) {
        const elRect = this._domElement.getBoundingClientRect();
        const left = event.clientX / elRect.width;
        const top = event.clientY / elRect.height;
        if (left < this._interactiveArea.left || left > this._interactiveArea.right || top < this._interactiveArea.top || top > this._interactiveArea.bottom)
          return;
      }
      event.preventDefault();
      if (this.dollyToCursor || this.mouseButtons.wheel === ACTION.ROTATE || this.mouseButtons.wheel === ACTION.TRUCK) {
        const now = performance.now();
        if (lastScrollTimeStamp - now < 1e3)
          this._getClientRect(this._elementRect);
        lastScrollTimeStamp = now;
      }
      const deltaYFactor = isMac ? -1 : -3;
      const delta = event.deltaMode === 1 || event.ctrlKey ? event.deltaY / deltaYFactor : event.deltaY / (deltaYFactor * 10);
      const x = this.dollyToCursor ? (event.clientX - this._elementRect.x) / this._elementRect.width * 2 - 1 : 0;
      const y = this.dollyToCursor ? (event.clientY - this._elementRect.y) / this._elementRect.height * -2 + 1 : 0;
      switch (this.mouseButtons.wheel) {
        case ACTION.ROTATE: {
          this._rotateInternal(event.deltaX, event.deltaY);
          this._isUserControllingRotate = true;
          break;
        }
        case ACTION.TRUCK: {
          this._truckInternal(event.deltaX, event.deltaY, false, false);
          this._isUserControllingTruck = true;
          break;
        }
        case ACTION.SCREEN_PAN: {
          this._truckInternal(event.deltaX, event.deltaY, false, true);
          this._isUserControllingTruck = true;
          break;
        }
        case ACTION.OFFSET: {
          this._truckInternal(event.deltaX, event.deltaY, true, false);
          this._isUserControllingOffset = true;
          break;
        }
        case ACTION.DOLLY: {
          this._dollyInternal(-delta, x, y);
          this._isUserControllingDolly = true;
          break;
        }
        case ACTION.ZOOM: {
          this._zoomInternal(-delta, x, y);
          this._isUserControllingZoom = true;
          break;
        }
      }
      this.dispatchEvent({ type: "control" });
    };
    const onContextMenu = (event) => {
      if (!this._domElement || !this._enabled)
        return;
      if (this.mouseButtons.right === _CameraControls.ACTION.NONE) {
        const pointerId = event instanceof PointerEvent ? event.pointerId : 0;
        const pointer = this._findPointerById(pointerId);
        pointer && this._disposePointer(pointer);
        this._domElement.ownerDocument.removeEventListener("pointermove", onPointerMove, { passive: false });
        this._domElement.ownerDocument.removeEventListener("pointerup", onPointerUp);
        return;
      }
      event.preventDefault();
    };
    const startDragging = (event) => {
      if (!this._enabled)
        return;
      extractClientCoordFromEvent(this._activePointers, _v2);
      this._getClientRect(this._elementRect);
      dragStartPosition.copy(_v2);
      lastDragPosition.copy(_v2);
      const isMultiTouch = this._activePointers.length >= 2;
      if (isMultiTouch) {
        const dx = _v2.x - this._activePointers[1].clientX;
        const dy = _v2.y - this._activePointers[1].clientY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        dollyStart.set(0, distance);
        const x = (this._activePointers[0].clientX + this._activePointers[1].clientX) * 0.5;
        const y = (this._activePointers[0].clientY + this._activePointers[1].clientY) * 0.5;
        lastDragPosition.set(x, y);
      }
      this._state = 0;
      if (!event) {
        if (this._lockedPointer)
          this._state = this._state | this.mouseButtons.left;
      } else if ("pointerType" in event && event.pointerType === "touch") {
        switch (this._activePointers.length) {
          case 1:
            this._state = this.touches.one;
            break;
          case 2:
            this._state = this.touches.two;
            break;
          case 3:
            this._state = this.touches.three;
            break;
        }
      } else {
        if (!this._lockedPointer && (event.buttons & MOUSE_BUTTON.LEFT) === MOUSE_BUTTON.LEFT) {
          this._state = this._state | this.mouseButtons.left;
        }
        if ((event.buttons & MOUSE_BUTTON.MIDDLE) === MOUSE_BUTTON.MIDDLE) {
          this._state = this._state | this.mouseButtons.middle;
        }
        if ((event.buttons & MOUSE_BUTTON.RIGHT) === MOUSE_BUTTON.RIGHT) {
          this._state = this._state | this.mouseButtons.right;
        }
      }
      if ((this._state & ACTION.ROTATE) === ACTION.ROTATE || (this._state & ACTION.TOUCH_ROTATE) === ACTION.TOUCH_ROTATE || (this._state & ACTION.TOUCH_DOLLY_ROTATE) === ACTION.TOUCH_DOLLY_ROTATE || (this._state & ACTION.TOUCH_ZOOM_ROTATE) === ACTION.TOUCH_ZOOM_ROTATE) {
        this._sphericalEnd.theta = this._spherical.theta;
        this._sphericalEnd.phi = this._spherical.phi;
        this._thetaVelocity.value = 0;
        this._phiVelocity.value = 0;
      }
      if ((this._state & ACTION.TRUCK) === ACTION.TRUCK || (this._state & ACTION.SCREEN_PAN) === ACTION.SCREEN_PAN || (this._state & ACTION.TOUCH_TRUCK) === ACTION.TOUCH_TRUCK || (this._state & ACTION.TOUCH_SCREEN_PAN) === ACTION.TOUCH_SCREEN_PAN || (this._state & ACTION.TOUCH_DOLLY_TRUCK) === ACTION.TOUCH_DOLLY_TRUCK || (this._state & ACTION.TOUCH_DOLLY_SCREEN_PAN) === ACTION.TOUCH_DOLLY_SCREEN_PAN || (this._state & ACTION.TOUCH_ZOOM_TRUCK) === ACTION.TOUCH_ZOOM_TRUCK || (this._state & ACTION.TOUCH_ZOOM_SCREEN_PAN) === ACTION.TOUCH_DOLLY_SCREEN_PAN) {
        this._targetEnd.copy(this._target);
        this._targetVelocity.set(0, 0, 0);
      }
      if ((this._state & ACTION.DOLLY) === ACTION.DOLLY || (this._state & ACTION.TOUCH_DOLLY) === ACTION.TOUCH_DOLLY || (this._state & ACTION.TOUCH_DOLLY_TRUCK) === ACTION.TOUCH_DOLLY_TRUCK || (this._state & ACTION.TOUCH_DOLLY_SCREEN_PAN) === ACTION.TOUCH_DOLLY_SCREEN_PAN || (this._state & ACTION.TOUCH_DOLLY_OFFSET) === ACTION.TOUCH_DOLLY_OFFSET || (this._state & ACTION.TOUCH_DOLLY_ROTATE) === ACTION.TOUCH_DOLLY_ROTATE) {
        this._sphericalEnd.radius = this._spherical.radius;
        this._radiusVelocity.value = 0;
      }
      if ((this._state & ACTION.ZOOM) === ACTION.ZOOM || (this._state & ACTION.TOUCH_ZOOM) === ACTION.TOUCH_ZOOM || (this._state & ACTION.TOUCH_ZOOM_TRUCK) === ACTION.TOUCH_ZOOM_TRUCK || (this._state & ACTION.TOUCH_ZOOM_SCREEN_PAN) === ACTION.TOUCH_ZOOM_SCREEN_PAN || (this._state & ACTION.TOUCH_ZOOM_OFFSET) === ACTION.TOUCH_ZOOM_OFFSET || (this._state & ACTION.TOUCH_ZOOM_ROTATE) === ACTION.TOUCH_ZOOM_ROTATE) {
        this._zoomEnd = this._zoom;
        this._zoomVelocity.value = 0;
      }
      if ((this._state & ACTION.OFFSET) === ACTION.OFFSET || (this._state & ACTION.TOUCH_OFFSET) === ACTION.TOUCH_OFFSET || (this._state & ACTION.TOUCH_DOLLY_OFFSET) === ACTION.TOUCH_DOLLY_OFFSET || (this._state & ACTION.TOUCH_ZOOM_OFFSET) === ACTION.TOUCH_ZOOM_OFFSET) {
        this._focalOffsetEnd.copy(this._focalOffset);
        this._focalOffsetVelocity.set(0, 0, 0);
      }
      this.dispatchEvent({ type: "controlstart" });
    };
    const dragging = () => {
      if (!this._enabled || !this._dragNeedsUpdate)
        return;
      this._dragNeedsUpdate = false;
      extractClientCoordFromEvent(this._activePointers, _v2);
      const isPointerLockActive = this._domElement && this._domElement.ownerDocument.pointerLockElement === this._domElement;
      const lockedPointer = isPointerLockActive ? this._lockedPointer || this._activePointers[0] : null;
      const deltaX = lockedPointer ? -lockedPointer.deltaX : lastDragPosition.x - _v2.x;
      const deltaY = lockedPointer ? -lockedPointer.deltaY : lastDragPosition.y - _v2.y;
      lastDragPosition.copy(_v2);
      if ((this._state & ACTION.ROTATE) === ACTION.ROTATE || (this._state & ACTION.TOUCH_ROTATE) === ACTION.TOUCH_ROTATE || (this._state & ACTION.TOUCH_DOLLY_ROTATE) === ACTION.TOUCH_DOLLY_ROTATE || (this._state & ACTION.TOUCH_ZOOM_ROTATE) === ACTION.TOUCH_ZOOM_ROTATE) {
        this._rotateInternal(deltaX, deltaY);
        this._isUserControllingRotate = true;
      }
      if ((this._state & ACTION.DOLLY) === ACTION.DOLLY || (this._state & ACTION.ZOOM) === ACTION.ZOOM) {
        const dollyX = this.dollyToCursor ? (dragStartPosition.x - this._elementRect.x) / this._elementRect.width * 2 - 1 : 0;
        const dollyY = this.dollyToCursor ? (dragStartPosition.y - this._elementRect.y) / this._elementRect.height * -2 + 1 : 0;
        const dollyDirection = this.dollyDragInverted ? -1 : 1;
        if ((this._state & ACTION.DOLLY) === ACTION.DOLLY) {
          this._dollyInternal(dollyDirection * deltaY * TOUCH_DOLLY_FACTOR, dollyX, dollyY);
          this._isUserControllingDolly = true;
        } else {
          this._zoomInternal(dollyDirection * deltaY * TOUCH_DOLLY_FACTOR, dollyX, dollyY);
          this._isUserControllingZoom = true;
        }
      }
      if ((this._state & ACTION.TOUCH_DOLLY) === ACTION.TOUCH_DOLLY || (this._state & ACTION.TOUCH_ZOOM) === ACTION.TOUCH_ZOOM || (this._state & ACTION.TOUCH_DOLLY_TRUCK) === ACTION.TOUCH_DOLLY_TRUCK || (this._state & ACTION.TOUCH_ZOOM_TRUCK) === ACTION.TOUCH_ZOOM_TRUCK || (this._state & ACTION.TOUCH_DOLLY_SCREEN_PAN) === ACTION.TOUCH_DOLLY_SCREEN_PAN || (this._state & ACTION.TOUCH_ZOOM_SCREEN_PAN) === ACTION.TOUCH_ZOOM_SCREEN_PAN || (this._state & ACTION.TOUCH_DOLLY_OFFSET) === ACTION.TOUCH_DOLLY_OFFSET || (this._state & ACTION.TOUCH_ZOOM_OFFSET) === ACTION.TOUCH_ZOOM_OFFSET || (this._state & ACTION.TOUCH_DOLLY_ROTATE) === ACTION.TOUCH_DOLLY_ROTATE || (this._state & ACTION.TOUCH_ZOOM_ROTATE) === ACTION.TOUCH_ZOOM_ROTATE) {
        const dx = _v2.x - this._activePointers[1].clientX;
        const dy = _v2.y - this._activePointers[1].clientY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const dollyDelta = dollyStart.y - distance;
        dollyStart.set(0, distance);
        const dollyX = this.dollyToCursor ? (lastDragPosition.x - this._elementRect.x) / this._elementRect.width * 2 - 1 : 0;
        const dollyY = this.dollyToCursor ? (lastDragPosition.y - this._elementRect.y) / this._elementRect.height * -2 + 1 : 0;
        if ((this._state & ACTION.TOUCH_DOLLY) === ACTION.TOUCH_DOLLY || (this._state & ACTION.TOUCH_DOLLY_ROTATE) === ACTION.TOUCH_DOLLY_ROTATE || (this._state & ACTION.TOUCH_DOLLY_TRUCK) === ACTION.TOUCH_DOLLY_TRUCK || (this._state & ACTION.TOUCH_DOLLY_SCREEN_PAN) === ACTION.TOUCH_DOLLY_SCREEN_PAN || (this._state & ACTION.TOUCH_DOLLY_OFFSET) === ACTION.TOUCH_DOLLY_OFFSET) {
          this._dollyInternal(dollyDelta * TOUCH_DOLLY_FACTOR, dollyX, dollyY);
          this._isUserControllingDolly = true;
        } else {
          this._zoomInternal(dollyDelta * TOUCH_DOLLY_FACTOR, dollyX, dollyY);
          this._isUserControllingZoom = true;
        }
      }
      if ((this._state & ACTION.TRUCK) === ACTION.TRUCK || (this._state & ACTION.TOUCH_TRUCK) === ACTION.TOUCH_TRUCK || (this._state & ACTION.TOUCH_DOLLY_TRUCK) === ACTION.TOUCH_DOLLY_TRUCK || (this._state & ACTION.TOUCH_ZOOM_TRUCK) === ACTION.TOUCH_ZOOM_TRUCK) {
        this._truckInternal(deltaX, deltaY, false, false);
        this._isUserControllingTruck = true;
      }
      if ((this._state & ACTION.SCREEN_PAN) === ACTION.SCREEN_PAN || (this._state & ACTION.TOUCH_SCREEN_PAN) === ACTION.TOUCH_SCREEN_PAN || (this._state & ACTION.TOUCH_DOLLY_SCREEN_PAN) === ACTION.TOUCH_DOLLY_SCREEN_PAN || (this._state & ACTION.TOUCH_ZOOM_SCREEN_PAN) === ACTION.TOUCH_ZOOM_SCREEN_PAN) {
        this._truckInternal(deltaX, deltaY, false, true);
        this._isUserControllingTruck = true;
      }
      if ((this._state & ACTION.OFFSET) === ACTION.OFFSET || (this._state & ACTION.TOUCH_OFFSET) === ACTION.TOUCH_OFFSET || (this._state & ACTION.TOUCH_DOLLY_OFFSET) === ACTION.TOUCH_DOLLY_OFFSET || (this._state & ACTION.TOUCH_ZOOM_OFFSET) === ACTION.TOUCH_ZOOM_OFFSET) {
        this._truckInternal(deltaX, deltaY, true, false);
        this._isUserControllingOffset = true;
      }
      this.dispatchEvent({ type: "control" });
    };
    const endDragging = () => {
      extractClientCoordFromEvent(this._activePointers, _v2);
      lastDragPosition.copy(_v2);
      this._dragNeedsUpdate = false;
      if (this._activePointers.length === 0 || this._activePointers.length === 1 && this._activePointers[0] === this._lockedPointer) {
        this._isDragging = false;
      }
      if (this._activePointers.length === 0 && this._domElement) {
        this._domElement.ownerDocument.removeEventListener("pointermove", onPointerMove, { passive: false });
        this._domElement.ownerDocument.removeEventListener("pointerup", onPointerUp);
        this.dispatchEvent({ type: "controlend" });
      }
    };
    this.lockPointer = () => {
      if (!this._enabled || !this._domElement)
        return;
      this.cancel();
      this._lockedPointer = {
        pointerId: -1,
        clientX: 0,
        clientY: 0,
        deltaX: 0,
        deltaY: 0,
        mouseButton: null
      };
      this._activePointers.push(this._lockedPointer);
      this._domElement.ownerDocument.removeEventListener("pointermove", onPointerMove, { passive: false });
      this._domElement.ownerDocument.removeEventListener("pointerup", onPointerUp);
      this._domElement.requestPointerLock();
      this._domElement.ownerDocument.addEventListener("pointerlockchange", onPointerLockChange);
      this._domElement.ownerDocument.addEventListener("pointerlockerror", onPointerLockError);
      this._domElement.ownerDocument.addEventListener("pointermove", onPointerMove, { passive: false });
      this._domElement.ownerDocument.addEventListener("pointerup", onPointerUp);
      startDragging();
    };
    this.unlockPointer = () => {
      if (this._lockedPointer !== null) {
        this._disposePointer(this._lockedPointer);
        this._lockedPointer = null;
      }
      this._domElement?.ownerDocument.exitPointerLock();
      this._domElement?.ownerDocument.removeEventListener("pointerlockchange", onPointerLockChange);
      this._domElement?.ownerDocument.removeEventListener("pointerlockerror", onPointerLockError);
      this.cancel();
    };
    const onPointerLockChange = () => {
      const isPointerLockActive = this._domElement && this._domElement.ownerDocument.pointerLockElement === this._domElement;
      if (!isPointerLockActive)
        this.unlockPointer();
    };
    const onPointerLockError = () => {
      this.unlockPointer();
    };
    this._addAllEventListeners = (domElement2) => {
      this._domElement = domElement2;
      this._domElement.style.touchAction = "none";
      this._domElement.style.userSelect = "none";
      this._domElement.style.webkitUserSelect = "none";
      this._domElement.addEventListener("pointerdown", onPointerDown);
      this._domElement.addEventListener("pointercancel", onPointerUp);
      this._domElement.addEventListener("wheel", onMouseWheel, { passive: false });
      this._domElement.addEventListener("contextmenu", onContextMenu);
    };
    this._removeAllEventListeners = () => {
      if (!this._domElement)
        return;
      this._domElement.style.touchAction = "";
      this._domElement.style.userSelect = "";
      this._domElement.style.webkitUserSelect = "";
      this._domElement.removeEventListener("pointerdown", onPointerDown);
      this._domElement.removeEventListener("pointercancel", onPointerUp);
      this._domElement.removeEventListener("wheel", onMouseWheel, { passive: false });
      this._domElement.removeEventListener("contextmenu", onContextMenu);
      this._domElement.ownerDocument.removeEventListener("pointermove", onPointerMove, { passive: false });
      this._domElement.ownerDocument.removeEventListener("pointerup", onPointerUp);
      this._domElement.ownerDocument.removeEventListener("pointerlockchange", onPointerLockChange);
      this._domElement.ownerDocument.removeEventListener("pointerlockerror", onPointerLockError);
    };
    this.cancel = () => {
      if (this._state === ACTION.NONE)
        return;
      this._state = ACTION.NONE;
      this._activePointers.length = 0;
      endDragging();
    };
    if (domElement)
      this.connect(domElement);
    this.update(0);
  }
  /**
   * The camera to be controlled
   * @category Properties
   */
  get camera() {
    return this._camera;
  }
  set camera(camera) {
    this._camera = camera;
    this.updateCameraUp();
    this._camera.updateProjectionMatrix();
    this._updateNearPlaneCorners();
    this._needsUpdate = true;
  }
  /**
   * Whether or not the controls are enabled.
   * `false` to disable user dragging/touch-move, but all methods works.
   * @category Properties
   */
  get enabled() {
    return this._enabled;
  }
  set enabled(enabled) {
    this._enabled = enabled;
    if (!this._domElement)
      return;
    if (enabled) {
      this._domElement.style.touchAction = "none";
      this._domElement.style.userSelect = "none";
      this._domElement.style.webkitUserSelect = "none";
    } else {
      this.cancel();
      this._domElement.style.touchAction = "";
      this._domElement.style.userSelect = "";
      this._domElement.style.webkitUserSelect = "";
    }
  }
  /**
   * Returns `true` if the controls are active updating.
   * readonly value.
   * @category Properties
   */
  get active() {
    return !this._hasRested;
  }
  /**
   * Getter for the current `ACTION`.
   * readonly value.
   * @category Properties
   */
  get currentAction() {
    return this._state;
  }
  /**
   * get/set Current distance.
   * @category Properties
   */
  get distance() {
    return this._spherical.radius;
  }
  set distance(distance) {
    if (this._spherical.radius === distance && this._sphericalEnd.radius === distance)
      return;
    this._spherical.radius = distance;
    this._sphericalEnd.radius = distance;
    this._needsUpdate = true;
  }
  // horizontal angle
  /**
   * get/set the azimuth angle (horizontal) in radians.
   * Every 360 degrees turn is added to `.azimuthAngle` value, which is accumulative.
   * @category Properties
   */
  get azimuthAngle() {
    return this._spherical.theta;
  }
  set azimuthAngle(azimuthAngle) {
    if (this._spherical.theta === azimuthAngle && this._sphericalEnd.theta === azimuthAngle)
      return;
    this._spherical.theta = azimuthAngle;
    this._sphericalEnd.theta = azimuthAngle;
    this._needsUpdate = true;
  }
  // vertical angle
  /**
   * get/set the polar angle (vertical) in radians.
   * @category Properties
   */
  get polarAngle() {
    return this._spherical.phi;
  }
  set polarAngle(polarAngle) {
    if (this._spherical.phi === polarAngle && this._sphericalEnd.phi === polarAngle)
      return;
    this._spherical.phi = polarAngle;
    this._sphericalEnd.phi = polarAngle;
    this._needsUpdate = true;
  }
  /**
   * Whether camera position should be enclosed in the boundary or not.
   * @category Properties
   */
  get boundaryEnclosesCamera() {
    return this._boundaryEnclosesCamera;
  }
  set boundaryEnclosesCamera(boundaryEnclosesCamera) {
    this._boundaryEnclosesCamera = boundaryEnclosesCamera;
    this._needsUpdate = true;
  }
  /**
   * Set drag-start, touches and wheel enable area in the domElement.
   * each values are between `0` and `1` inclusive, where `0` is left/top and `1` is right/bottom of the screen.
   * e.g. `{ x: 0, y: 0, width: 1, height: 1 }` for entire area.
   * @category Properties
   */
  set interactiveArea(interactiveArea) {
    this._interactiveArea.width = clamp(interactiveArea.width, 0, 1);
    this._interactiveArea.height = clamp(interactiveArea.height, 0, 1);
    this._interactiveArea.x = clamp(interactiveArea.x, 0, 1 - this._interactiveArea.width);
    this._interactiveArea.y = clamp(interactiveArea.y, 0, 1 - this._interactiveArea.height);
  }
  /**
   * Adds the specified event listener.
   * Applicable event types (which is `K`) are:
   * | Event name          | Timing |
   * | ------------------- | ------ |
   * | `'controlstart'`    | When the user starts to control the camera via mouse / touches. ¹ |
   * | `'control'`         | When the user controls the camera (dragging). |
   * | `'controlend'`      | When the user ends to control the camera. ¹ |
   * | `'transitionstart'` | When any kind of transition starts, either user control or using a method with `enableTransition = true` |
   * | `'update'`          | When the camera position is updated. |
   * | `'wake'`            | When the camera starts moving. |
   * | `'rest'`            | When the camera movement is below `.restThreshold` ². |
   * | `'sleep'`           | When the camera end moving. |
   *
   * 1. `mouseButtons.wheel` (Mouse wheel control) does not emit `'controlstart'` and `'controlend'`. `mouseButtons.wheel` uses scroll-event internally, and scroll-event happens intermittently. That means "start" and "end" cannot be detected.
   * 2. Due to damping, `sleep` will usually fire a few seconds after the camera _appears_ to have stopped moving. If you want to do something (e.g. enable UI, perform another transition) at the point when the camera has stopped, you probably want the `rest` event. This can be fine tuned using the `.restThreshold` parameter. See the [Rest and Sleep Example](https://yomotsu.github.io/camera-controls/examples/rest-and-sleep.html).
   *
   * e.g.
   * ```
   * cameraControl.addEventListener( 'controlstart', myCallbackFunction );
   * ```
   * @param type event name
   * @param listener handler function
   * @category Methods
   */
  addEventListener(type, listener) {
    super.addEventListener(type, listener);
  }
  /**
   * Removes the specified event listener
   * e.g.
   * ```
   * cameraControl.addEventListener( 'controlstart', myCallbackFunction );
   * ```
   * @param type event name
   * @param listener handler function
   * @category Methods
   */
  removeEventListener(type, listener) {
    super.removeEventListener(type, listener);
  }
  /**
   * Rotate azimuthal angle(horizontal) and polar angle(vertical).
   * Every value is added to the current value.
   * @param azimuthAngle Azimuth rotate angle. In radian.
   * @param polarAngle Polar rotate angle. In radian.
   * @param enableTransition Whether to move smoothly or immediately
   * @category Methods
   */
  rotate(azimuthAngle, polarAngle, enableTransition = false) {
    return this.rotateTo(this._sphericalEnd.theta + azimuthAngle, this._sphericalEnd.phi + polarAngle, enableTransition);
  }
  /**
   * Rotate azimuthal angle(horizontal) to the given angle and keep the same polar angle(vertical) target.
   *
   * e.g.
   * ```
   * cameraControls.rotateAzimuthTo( 30 * THREE.MathUtils.DEG2RAD, true );
   * ```
   * @param azimuthAngle Azimuth rotate angle. In radian.
   * @param enableTransition Whether to move smoothly or immediately
   * @category Methods
   */
  rotateAzimuthTo(azimuthAngle, enableTransition = false) {
    return this.rotateTo(azimuthAngle, this._sphericalEnd.phi, enableTransition);
  }
  /**
   * Rotate polar angle(vertical) to the given angle and keep the same azimuthal angle(horizontal) target.
   *
   * e.g.
   * ```
   * cameraControls.rotatePolarTo( 30 * THREE.MathUtils.DEG2RAD, true );
   * ```
   * @param polarAngle Polar rotate angle. In radian.
   * @param enableTransition Whether to move smoothly or immediately
   * @category Methods
   */
  rotatePolarTo(polarAngle, enableTransition = false) {
    return this.rotateTo(this._sphericalEnd.theta, polarAngle, enableTransition);
  }
  /**
   * Rotate azimuthal angle(horizontal) and polar angle(vertical) to the given angle.
   * Camera view will rotate over the orbit pivot absolutely:
   *
   * azimuthAngle
   * ```
   *       0º
   *         \
   * 90º -----+----- -90º
   *           \
   *           180º
   * ```
   * | direction | angle                  |
   * | --------- | ---------------------- |
   * | front     | 0º                     |
   * | left      | 90º (`Math.PI / 2`)    |
   * | right     | -90º (`- Math.PI / 2`) |
   * | back      | 180º (`Math.PI`)       |
   *
   * polarAngle
   * ```
   *     180º
   *      |
   *      90º
   *      |
   *      0º
   * ```
   * | direction            | angle                  |
   * | -------------------- | ---------------------- |
   * | top/sky              | 180º (`Math.PI`)       |
   * | horizontal from view | 90º (`Math.PI / 2`)    |
   * | bottom/floor         | 0º                     |
   *
   * @param azimuthAngle Azimuth rotate angle to. In radian.
   * @param polarAngle Polar rotate angle to. In radian.
   * @param enableTransition  Whether to move smoothly or immediately
   * @category Methods
   */
  rotateTo(azimuthAngle, polarAngle, enableTransition = false) {
    this._isUserControllingRotate = false;
    const theta = clamp(azimuthAngle, this.minAzimuthAngle, this.maxAzimuthAngle);
    const phi = clamp(polarAngle, this.minPolarAngle, this.maxPolarAngle);
    this._sphericalEnd.theta = theta;
    this._sphericalEnd.phi = phi;
    this._sphericalEnd.makeSafe();
    this._needsUpdate = true;
    if (!enableTransition) {
      this._spherical.theta = this._sphericalEnd.theta;
      this._spherical.phi = this._sphericalEnd.phi;
    }
    const resolveImmediately = !enableTransition || approxEquals(this._spherical.theta, this._sphericalEnd.theta, this.restThreshold) && approxEquals(this._spherical.phi, this._sphericalEnd.phi, this.restThreshold);
    return this._createOnRestPromise(resolveImmediately);
  }
  /**
   * Dolly in/out camera position.
   * @param distance Distance of dollyIn. Negative number for dollyOut.
   * @param enableTransition Whether to move smoothly or immediately.
   * @category Methods
   */
  dolly(distance, enableTransition = false) {
    return this.dollyTo(this._sphericalEnd.radius - distance, enableTransition);
  }
  /**
   * Dolly in/out camera position to given distance.
   * @param distance Distance of dolly.
   * @param enableTransition Whether to move smoothly or immediately.
   * @category Methods
   */
  dollyTo(distance, enableTransition = false) {
    this._isUserControllingDolly = false;
    this._lastDollyDirection = DOLLY_DIRECTION.NONE;
    this._changedDolly = 0;
    return this._dollyToNoClamp(clamp(distance, this.minDistance, this.maxDistance), enableTransition);
  }
  _dollyToNoClamp(distance, enableTransition = false) {
    const lastRadius = this._sphericalEnd.radius;
    const hasCollider = this.colliderMeshes.length >= 1;
    if (hasCollider) {
      const maxDistanceByCollisionTest = this._collisionTest();
      const isCollided = approxEquals(maxDistanceByCollisionTest, this._spherical.radius);
      const isDollyIn = lastRadius > distance;
      if (!isDollyIn && isCollided)
        return Promise.resolve();
      this._sphericalEnd.radius = Math.min(distance, maxDistanceByCollisionTest);
    } else {
      this._sphericalEnd.radius = distance;
    }
    this._needsUpdate = true;
    if (!enableTransition) {
      this._spherical.radius = this._sphericalEnd.radius;
    }
    const resolveImmediately = !enableTransition || approxEquals(this._spherical.radius, this._sphericalEnd.radius, this.restThreshold);
    return this._createOnRestPromise(resolveImmediately);
  }
  /**
   * Dolly in, but does not change the distance between the target and the camera, and moves the target position instead.
   * Specify a negative value for dolly out.
   * @param distance Distance of dolly.
   * @param enableTransition Whether to move smoothly or immediately.
   * @category Methods
   */
  dollyInFixed(distance, enableTransition = false) {
    this._targetEnd.add(this._getCameraDirection(_cameraDirection).multiplyScalar(distance));
    if (!enableTransition) {
      this._target.copy(this._targetEnd);
    }
    const resolveImmediately = !enableTransition || approxEquals(this._target.x, this._targetEnd.x, this.restThreshold) && approxEquals(this._target.y, this._targetEnd.y, this.restThreshold) && approxEquals(this._target.z, this._targetEnd.z, this.restThreshold);
    return this._createOnRestPromise(resolveImmediately);
  }
  /**
   * Zoom in/out camera. The value is added to camera zoom.
   * Limits set with `.minZoom` and `.maxZoom`
   * @param zoomStep zoom scale
   * @param enableTransition Whether to move smoothly or immediately
   * @category Methods
   */
  zoom(zoomStep, enableTransition = false) {
    return this.zoomTo(this._zoomEnd + zoomStep, enableTransition);
  }
  /**
   * Zoom in/out camera to given scale. The value overwrites camera zoom.
   * Limits set with .minZoom and .maxZoom
   * @param zoom
   * @param enableTransition
   * @category Methods
   */
  zoomTo(zoom, enableTransition = false) {
    this._isUserControllingZoom = false;
    this._zoomEnd = clamp(zoom, this.minZoom, this.maxZoom);
    this._needsUpdate = true;
    if (!enableTransition) {
      this._zoom = this._zoomEnd;
    }
    const resolveImmediately = !enableTransition || approxEquals(this._zoom, this._zoomEnd, this.restThreshold);
    this._changedZoom = 0;
    return this._createOnRestPromise(resolveImmediately);
  }
  /**
   * @deprecated `pan()` has been renamed to `truck()`
   * @category Methods
   */
  pan(x, y, enableTransition = false) {
    console.warn("`pan` has been renamed to `truck`");
    return this.truck(x, y, enableTransition);
  }
  /**
   * Truck and pedestal camera using current azimuthal angle
   * @param x Horizontal translate amount
   * @param y Vertical translate amount
   * @param enableTransition Whether to move smoothly or immediately
   * @category Methods
   */
  truck(x, y, enableTransition = false) {
    this._camera.updateMatrix();
    _xColumn.setFromMatrixColumn(this._camera.matrix, 0);
    _yColumn.setFromMatrixColumn(this._camera.matrix, 1);
    _xColumn.multiplyScalar(x);
    _yColumn.multiplyScalar(-y);
    const offset = _v3A.copy(_xColumn).add(_yColumn);
    const to = _v3B.copy(this._targetEnd).add(offset);
    return this.moveTo(to.x, to.y, to.z, enableTransition);
  }
  /**
   * Move forward / backward.
   * @param distance Amount to move forward / backward. Negative value to move backward
   * @param enableTransition Whether to move smoothly or immediately
   * @category Methods
   */
  forward(distance, enableTransition = false) {
    _v3A.setFromMatrixColumn(this._camera.matrix, 0);
    _v3A.crossVectors(this._camera.up, _v3A);
    _v3A.multiplyScalar(distance);
    const to = _v3B.copy(this._targetEnd).add(_v3A);
    return this.moveTo(to.x, to.y, to.z, enableTransition);
  }
  /**
   * Move up / down.
   * @param height Amount to move up / down. Negative value to move down
   * @param enableTransition Whether to move smoothly or immediately
   * @category Methods
   */
  elevate(height, enableTransition = false) {
    _v3A.copy(this._camera.up).multiplyScalar(height);
    return this.moveTo(this._targetEnd.x + _v3A.x, this._targetEnd.y + _v3A.y, this._targetEnd.z + _v3A.z, enableTransition);
  }
  /**
   * Move target position to given point.
   * @param x x coord to move center position
   * @param y y coord to move center position
   * @param z z coord to move center position
   * @param enableTransition Whether to move smoothly or immediately
   * @category Methods
   */
  moveTo(x, y, z, enableTransition = false) {
    this._isUserControllingTruck = false;
    const offset = _v3A.set(x, y, z).sub(this._targetEnd);
    this._encloseToBoundary(this._targetEnd, offset, this.boundaryFriction);
    this._needsUpdate = true;
    if (!enableTransition) {
      this._target.copy(this._targetEnd);
    }
    const resolveImmediately = !enableTransition || approxEquals(this._target.x, this._targetEnd.x, this.restThreshold) && approxEquals(this._target.y, this._targetEnd.y, this.restThreshold) && approxEquals(this._target.z, this._targetEnd.z, this.restThreshold);
    return this._createOnRestPromise(resolveImmediately);
  }
  /**
   * Look in the given point direction.
   * @param x point x.
   * @param y point y.
   * @param z point z.
   * @param enableTransition Whether to move smoothly or immediately.
   * @returns Transition end promise
   * @category Methods
   */
  lookInDirectionOf(x, y, z, enableTransition = false) {
    const point = _v3A.set(x, y, z);
    const direction2 = point.sub(this._targetEnd).normalize();
    const position2 = direction2.multiplyScalar(-this._sphericalEnd.radius).add(this._targetEnd);
    return this.setPosition(position2.x, position2.y, position2.z, enableTransition);
  }
  /**
   * Fit the viewport to the box or the bounding box of the object, using the nearest axis. paddings are in unit.
   * set `cover: true` to fill enter screen.
   * e.g.
   * ```
   * cameraControls.fitToBox( myMesh );
   * ```
   * @param box3OrObject Axis aligned bounding box to fit the view.
   * @param enableTransition Whether to move smoothly or immediately.
   * @param options | `<object>` { cover: boolean, paddingTop: number, paddingLeft: number, paddingBottom: number, paddingRight: number }
   * @returns Transition end promise
   * @category Methods
   */
  fitToBox(box3OrObject, enableTransition, { cover = false, paddingLeft = 0, paddingRight = 0, paddingBottom = 0, paddingTop = 0 } = {}) {
    const promises = [];
    const aabb = box3OrObject.isBox3 ? _box3A.copy(box3OrObject) : _box3A.setFromObject(box3OrObject);
    if (aabb.isEmpty()) {
      console.warn("camera-controls: fitTo() cannot be used with an empty box. Aborting");
      Promise.resolve();
    }
    const theta = roundToStep(this._sphericalEnd.theta, PI_HALF);
    const phi = roundToStep(this._sphericalEnd.phi, PI_HALF);
    promises.push(this.rotateTo(theta, phi, enableTransition));
    const normal2 = _v3A.setFromSpherical(this._sphericalEnd).normalize();
    const rotation3 = _quaternionA.setFromUnitVectors(normal2, _AXIS_Z);
    const viewFromPolar = approxEquals(Math.abs(normal2.y), 1);
    if (viewFromPolar) {
      rotation3.multiply(_quaternionB.setFromAxisAngle(_AXIS_Y, theta));
    }
    rotation3.multiply(this._yAxisUpSpaceInverse);
    const bb2 = _box3B.makeEmpty();
    _v3B.copy(aabb.min).applyQuaternion(rotation3);
    bb2.expandByPoint(_v3B);
    _v3B.copy(aabb.min).setX(aabb.max.x).applyQuaternion(rotation3);
    bb2.expandByPoint(_v3B);
    _v3B.copy(aabb.min).setY(aabb.max.y).applyQuaternion(rotation3);
    bb2.expandByPoint(_v3B);
    _v3B.copy(aabb.max).setZ(aabb.min.z).applyQuaternion(rotation3);
    bb2.expandByPoint(_v3B);
    _v3B.copy(aabb.min).setZ(aabb.max.z).applyQuaternion(rotation3);
    bb2.expandByPoint(_v3B);
    _v3B.copy(aabb.max).setY(aabb.min.y).applyQuaternion(rotation3);
    bb2.expandByPoint(_v3B);
    _v3B.copy(aabb.max).setX(aabb.min.x).applyQuaternion(rotation3);
    bb2.expandByPoint(_v3B);
    _v3B.copy(aabb.max).applyQuaternion(rotation3);
    bb2.expandByPoint(_v3B);
    bb2.min.x -= paddingLeft;
    bb2.min.y -= paddingBottom;
    bb2.max.x += paddingRight;
    bb2.max.y += paddingTop;
    rotation3.setFromUnitVectors(_AXIS_Z, normal2);
    if (viewFromPolar) {
      rotation3.premultiply(_quaternionB.invert());
    }
    rotation3.premultiply(this._yAxisUpSpace);
    const bbSize = bb2.getSize(_v3A);
    const center = bb2.getCenter(_v3B).applyQuaternion(rotation3);
    if (isPerspectiveCamera(this._camera)) {
      const distance = this.getDistanceToFitBox(bbSize.x, bbSize.y, bbSize.z, cover);
      promises.push(this.moveTo(center.x, center.y, center.z, enableTransition));
      promises.push(this.dollyTo(distance, enableTransition));
      promises.push(this.setFocalOffset(0, 0, 0, enableTransition));
    } else if (isOrthographicCamera(this._camera)) {
      const camera = this._camera;
      const width = camera.right - camera.left;
      const height = camera.top - camera.bottom;
      const zoom = cover ? Math.max(width / bbSize.x, height / bbSize.y) : Math.min(width / bbSize.x, height / bbSize.y);
      promises.push(this.moveTo(center.x, center.y, center.z, enableTransition));
      promises.push(this.zoomTo(zoom, enableTransition));
      promises.push(this.setFocalOffset(0, 0, 0, enableTransition));
    }
    return Promise.all(promises);
  }
  /**
   * Fit the viewport to the sphere or the bounding sphere of the object.
   * @param sphereOrMesh
   * @param enableTransition
   * @category Methods
   */
  fitToSphere(sphereOrMesh, enableTransition) {
    const promises = [];
    const isObject3D = "isObject3D" in sphereOrMesh;
    const boundingSphere = isObject3D ? _CameraControls.createBoundingSphere(sphereOrMesh, _sphere) : _sphere.copy(sphereOrMesh);
    promises.push(this.moveTo(boundingSphere.center.x, boundingSphere.center.y, boundingSphere.center.z, enableTransition));
    if (isPerspectiveCamera(this._camera)) {
      const distanceToFit = this.getDistanceToFitSphere(boundingSphere.radius);
      promises.push(this.dollyTo(distanceToFit, enableTransition));
    } else if (isOrthographicCamera(this._camera)) {
      const width = this._camera.right - this._camera.left;
      const height = this._camera.top - this._camera.bottom;
      const diameter = 2 * boundingSphere.radius;
      const zoom = Math.min(width / diameter, height / diameter);
      promises.push(this.zoomTo(zoom, enableTransition));
    }
    promises.push(this.setFocalOffset(0, 0, 0, enableTransition));
    return Promise.all(promises);
  }
  /**
   * Look at the `target` from the `position`.
   * @param positionX
   * @param positionY
   * @param positionZ
   * @param targetX
   * @param targetY
   * @param targetZ
   * @param enableTransition
   * @category Methods
   */
  setLookAt(positionX, positionY, positionZ, targetX, targetY, targetZ, enableTransition = false) {
    this._isUserControllingRotate = false;
    this._isUserControllingDolly = false;
    this._isUserControllingTruck = false;
    this._lastDollyDirection = DOLLY_DIRECTION.NONE;
    this._changedDolly = 0;
    const target2 = _v3B.set(targetX, targetY, targetZ);
    const position2 = _v3A.set(positionX, positionY, positionZ);
    this._targetEnd.copy(target2);
    this._sphericalEnd.setFromVector3(position2.sub(target2).applyQuaternion(this._yAxisUpSpace));
    this._needsUpdate = true;
    if (!enableTransition) {
      this._target.copy(this._targetEnd);
      this._spherical.copy(this._sphericalEnd);
    }
    const resolveImmediately = !enableTransition || approxEquals(this._target.x, this._targetEnd.x, this.restThreshold) && approxEquals(this._target.y, this._targetEnd.y, this.restThreshold) && approxEquals(this._target.z, this._targetEnd.z, this.restThreshold) && approxEquals(this._spherical.theta, this._sphericalEnd.theta, this.restThreshold) && approxEquals(this._spherical.phi, this._sphericalEnd.phi, this.restThreshold) && approxEquals(this._spherical.radius, this._sphericalEnd.radius, this.restThreshold);
    return this._createOnRestPromise(resolveImmediately);
  }
  /**
   * Interpolates between two states.
   * @param stateA
   * @param stateB
   * @param t
   * @param enableTransition
   * @category Methods
   */
  lerp(stateA, stateB, t, enableTransition = false) {
    this._isUserControllingRotate = false;
    this._isUserControllingDolly = false;
    this._isUserControllingTruck = false;
    this._lastDollyDirection = DOLLY_DIRECTION.NONE;
    this._changedDolly = 0;
    const targetA = _v3A.set(...stateA.target);
    if ("spherical" in stateA) {
      _sphericalA.set(...stateA.spherical);
    } else {
      const positionA = _v3B.set(...stateA.position);
      _sphericalA.setFromVector3(positionA.sub(targetA).applyQuaternion(this._yAxisUpSpace));
    }
    const targetB = _v3C.set(...stateB.target);
    if ("spherical" in stateB) {
      _sphericalB.set(...stateB.spherical);
    } else {
      const positionB = _v3B.set(...stateB.position);
      _sphericalB.setFromVector3(positionB.sub(targetB).applyQuaternion(this._yAxisUpSpace));
    }
    this._targetEnd.copy(targetA.lerp(targetB, t));
    const deltaTheta = _sphericalB.theta - _sphericalA.theta;
    const deltaPhi = _sphericalB.phi - _sphericalA.phi;
    const deltaRadius = _sphericalB.radius - _sphericalA.radius;
    this._sphericalEnd.set(_sphericalA.radius + deltaRadius * t, _sphericalA.phi + deltaPhi * t, _sphericalA.theta + deltaTheta * t);
    this._needsUpdate = true;
    if (!enableTransition) {
      this._target.copy(this._targetEnd);
      this._spherical.copy(this._sphericalEnd);
    }
    const resolveImmediately = !enableTransition || approxEquals(this._target.x, this._targetEnd.x, this.restThreshold) && approxEquals(this._target.y, this._targetEnd.y, this.restThreshold) && approxEquals(this._target.z, this._targetEnd.z, this.restThreshold) && approxEquals(this._spherical.theta, this._sphericalEnd.theta, this.restThreshold) && approxEquals(this._spherical.phi, this._sphericalEnd.phi, this.restThreshold) && approxEquals(this._spherical.radius, this._sphericalEnd.radius, this.restThreshold);
    return this._createOnRestPromise(resolveImmediately);
  }
  /**
   * Similar to setLookAt, but it interpolates between two states.
   * @param positionAX
   * @param positionAY
   * @param positionAZ
   * @param targetAX
   * @param targetAY
   * @param targetAZ
   * @param positionBX
   * @param positionBY
   * @param positionBZ
   * @param targetBX
   * @param targetBY
   * @param targetBZ
   * @param t
   * @param enableTransition
   * @category Methods
   */
  lerpLookAt(positionAX, positionAY, positionAZ, targetAX, targetAY, targetAZ, positionBX, positionBY, positionBZ, targetBX, targetBY, targetBZ, t, enableTransition = false) {
    return this.lerp({
      position: [positionAX, positionAY, positionAZ],
      target: [targetAX, targetAY, targetAZ]
    }, {
      position: [positionBX, positionBY, positionBZ],
      target: [targetBX, targetBY, targetBZ]
    }, t, enableTransition);
  }
  /**
   * Set angle and distance by given position.
   * An alias of `setLookAt()`, without target change. Thus keep gazing at the current target
   * @param positionX
   * @param positionY
   * @param positionZ
   * @param enableTransition
   * @category Methods
   */
  setPosition(positionX, positionY, positionZ, enableTransition = false) {
    return this.setLookAt(positionX, positionY, positionZ, this._targetEnd.x, this._targetEnd.y, this._targetEnd.z, enableTransition);
  }
  /**
   * Set the target position where gaze at.
   * An alias of `setLookAt()`, without position change. Thus keep the same position.
   * @param targetX
   * @param targetY
   * @param targetZ
   * @param enableTransition
   * @category Methods
   */
  setTarget(targetX, targetY, targetZ, enableTransition = false) {
    const pos = this.getPosition(_v3A);
    const promise = this.setLookAt(pos.x, pos.y, pos.z, targetX, targetY, targetZ, enableTransition);
    this._sphericalEnd.phi = clamp(this._sphericalEnd.phi, this.minPolarAngle, this.maxPolarAngle);
    return promise;
  }
  /**
   * Set focal offset using the screen parallel coordinates. z doesn't affect in Orthographic as with Dolly.
   * @param x
   * @param y
   * @param z
   * @param enableTransition
   * @category Methods
   */
  setFocalOffset(x, y, z, enableTransition = false) {
    this._isUserControllingOffset = false;
    this._focalOffsetEnd.set(x, y, z);
    this._needsUpdate = true;
    if (!enableTransition)
      this._focalOffset.copy(this._focalOffsetEnd);
    const resolveImmediately = !enableTransition || approxEquals(this._focalOffset.x, this._focalOffsetEnd.x, this.restThreshold) && approxEquals(this._focalOffset.y, this._focalOffsetEnd.y, this.restThreshold) && approxEquals(this._focalOffset.z, this._focalOffsetEnd.z, this.restThreshold);
    return this._createOnRestPromise(resolveImmediately);
  }
  /**
   * Set orbit point without moving the camera.
   * SHOULD NOT RUN DURING ANIMATIONS. `setOrbitPoint()` will immediately fix the positions.
   * @param targetX
   * @param targetY
   * @param targetZ
   * @category Methods
   */
  setOrbitPoint(targetX, targetY, targetZ) {
    this._camera.updateMatrixWorld();
    _xColumn.setFromMatrixColumn(this._camera.matrixWorldInverse, 0);
    _yColumn.setFromMatrixColumn(this._camera.matrixWorldInverse, 1);
    _zColumn.setFromMatrixColumn(this._camera.matrixWorldInverse, 2);
    const position2 = _v3A.set(targetX, targetY, targetZ);
    const distance = position2.distanceTo(this._camera.position);
    const cameraToPoint = position2.sub(this._camera.position);
    _xColumn.multiplyScalar(cameraToPoint.x);
    _yColumn.multiplyScalar(cameraToPoint.y);
    _zColumn.multiplyScalar(cameraToPoint.z);
    _v3A.copy(_xColumn).add(_yColumn).add(_zColumn);
    _v3A.z = _v3A.z + distance;
    this.dollyTo(distance, false);
    this.setFocalOffset(-_v3A.x, _v3A.y, -_v3A.z, false);
    this.moveTo(targetX, targetY, targetZ, false);
  }
  /**
   * Set the boundary box that encloses the target of the camera. box3 is in THREE.Box3
   * @param box3
   * @category Methods
   */
  setBoundary(box3) {
    if (!box3) {
      this._boundary.min.set(-Infinity, -Infinity, -Infinity);
      this._boundary.max.set(Infinity, Infinity, Infinity);
      this._needsUpdate = true;
      return;
    }
    this._boundary.copy(box3);
    this._boundary.clampPoint(this._targetEnd, this._targetEnd);
    this._needsUpdate = true;
  }
  /**
   * Set (or unset) the current viewport.
   * Set this when you want to use renderer viewport and .dollyToCursor feature at the same time.
   * @param viewportOrX
   * @param y
   * @param width
   * @param height
   * @category Methods
   */
  setViewport(viewportOrX, y, width, height) {
    if (viewportOrX === null) {
      this._viewport = null;
      return;
    }
    this._viewport = this._viewport || new THREE.Vector4();
    if (typeof viewportOrX === "number") {
      this._viewport.set(viewportOrX, y, width, height);
    } else {
      this._viewport.copy(viewportOrX);
    }
  }
  /**
   * Calculate the distance to fit the box.
   * @param width box width
   * @param height box height
   * @param depth box depth
   * @returns distance
   * @category Methods
   */
  getDistanceToFitBox(width, height, depth, cover = false) {
    if (notSupportedInOrthographicCamera(this._camera, "getDistanceToFitBox"))
      return this._spherical.radius;
    const boundingRectAspect = width / height;
    const fov = this._camera.getEffectiveFOV() * DEG2RAD;
    const aspect = this._camera.aspect;
    const heightToFit = (cover ? boundingRectAspect > aspect : boundingRectAspect < aspect) ? height : width / aspect;
    return heightToFit * 0.5 / Math.tan(fov * 0.5) + depth * 0.5;
  }
  /**
   * Calculate the distance to fit the sphere.
   * @param radius sphere radius
   * @returns distance
   * @category Methods
   */
  getDistanceToFitSphere(radius) {
    if (notSupportedInOrthographicCamera(this._camera, "getDistanceToFitSphere"))
      return this._spherical.radius;
    const vFOV = this._camera.getEffectiveFOV() * DEG2RAD;
    const hFOV = Math.atan(Math.tan(vFOV * 0.5) * this._camera.aspect) * 2;
    const fov = 1 < this._camera.aspect ? vFOV : hFOV;
    return radius / Math.sin(fov * 0.5);
  }
  /**
   * Returns the orbit center position, where the camera looking at.
   * @param out The receiving Vector3 instance to copy the result
   * @param receiveEndValue Whether receive the transition end coords or current. default is `true`
   * @category Methods
   */
  getTarget(out, receiveEndValue = true) {
    const _out = !!out && out.isVector3 ? out : new THREE.Vector3();
    return _out.copy(receiveEndValue ? this._targetEnd : this._target);
  }
  /**
   * Returns the camera position.
   * @param out The receiving Vector3 instance to copy the result
   * @param receiveEndValue Whether receive the transition end coords or current. default is `true`
   * @category Methods
   */
  getPosition(out, receiveEndValue = true) {
    const _out = !!out && out.isVector3 ? out : new THREE.Vector3();
    return _out.setFromSpherical(receiveEndValue ? this._sphericalEnd : this._spherical).applyQuaternion(this._yAxisUpSpaceInverse).add(receiveEndValue ? this._targetEnd : this._target);
  }
  /**
   * Returns the spherical coordinates of the orbit.
   * @param out The receiving Spherical instance to copy the result
   * @param receiveEndValue Whether receive the transition end coords or current. default is `true`
   * @category Methods
   */
  getSpherical(out, receiveEndValue = true) {
    const _out = out || new THREE.Spherical();
    return _out.copy(receiveEndValue ? this._sphericalEnd : this._spherical);
  }
  /**
   * Returns the focal offset, which is how much the camera appears to be translated in screen parallel coordinates.
   * @param out The receiving Vector3 instance to copy the result
   * @param receiveEndValue Whether receive the transition end coords or current. default is `true`
   * @category Methods
   */
  getFocalOffset(out, receiveEndValue = true) {
    const _out = !!out && out.isVector3 ? out : new THREE.Vector3();
    return _out.copy(receiveEndValue ? this._focalOffsetEnd : this._focalOffset);
  }
  /**
   * Normalize camera azimuth angle (horizontal rotation) between -180 and 180 degrees.
   * @returns This CameraControls instance.
   * @category Methods
   */
  normalizeRotations() {
    this._sphericalEnd.theta = (this._sphericalEnd.theta % PI_2 + PI_2) % PI_2;
    if (this._sphericalEnd.theta > Math.PI)
      this._sphericalEnd.theta -= PI_2;
    this._spherical.theta += PI_2 * Math.round((this._sphericalEnd.theta - this._spherical.theta) / PI_2);
    return this;
  }
  /**
   * stop all transitions.
   */
  stop() {
    this._focalOffset.copy(this._focalOffsetEnd);
    this._target.copy(this._targetEnd);
    this._spherical.copy(this._sphericalEnd);
    this._zoom = this._zoomEnd;
  }
  /**
   * Reset all rotation and position to defaults.
   * @param enableTransition
   * @category Methods
   */
  reset(enableTransition = false) {
    if (!approxEquals(this._camera.up.x, this._cameraUp0.x) || !approxEquals(this._camera.up.y, this._cameraUp0.y) || !approxEquals(this._camera.up.z, this._cameraUp0.z)) {
      this._camera.up.copy(this._cameraUp0);
      const position2 = this.getPosition(_v3A);
      this.updateCameraUp();
      this.setPosition(position2.x, position2.y, position2.z);
    }
    const promises = [
      this.setLookAt(this._position0.x, this._position0.y, this._position0.z, this._target0.x, this._target0.y, this._target0.z, enableTransition),
      this.setFocalOffset(this._focalOffset0.x, this._focalOffset0.y, this._focalOffset0.z, enableTransition),
      this.zoomTo(this._zoom0, enableTransition)
    ];
    return Promise.all(promises);
  }
  /**
   * Set current camera position as the default position.
   * @category Methods
   */
  saveState() {
    this._cameraUp0.copy(this._camera.up);
    this.getTarget(this._target0);
    this.getPosition(this._position0);
    this._zoom0 = this._zoom;
    this._focalOffset0.copy(this._focalOffset);
  }
  /**
   * Sync camera-up direction.
   * When camera-up vector is changed, `.updateCameraUp()` must be called.
   * @category Methods
   */
  updateCameraUp() {
    this._yAxisUpSpace.setFromUnitVectors(this._camera.up, _AXIS_Y);
    this._yAxisUpSpaceInverse.copy(this._yAxisUpSpace).invert();
  }
  /**
   * Apply current camera-up direction to the camera.
   * The orbit system will be re-initialized with the current position.
   * @category Methods
   */
  applyCameraUp() {
    const cameraDirection = _v3A.subVectors(this._target, this._camera.position).normalize();
    const side = _v3B.crossVectors(cameraDirection, this._camera.up);
    this._camera.up.crossVectors(side, cameraDirection).normalize();
    this._camera.updateMatrixWorld();
    const position2 = this.getPosition(_v3A);
    this.updateCameraUp();
    this.setPosition(position2.x, position2.y, position2.z);
  }
  /**
   * Update camera position and directions.
   * This should be called in your tick loop every time, and returns true if re-rendering is needed.
   * @param delta
   * @returns updated
   * @category Methods
   */
  update(delta) {
    const deltaTheta = this._sphericalEnd.theta - this._spherical.theta;
    const deltaPhi = this._sphericalEnd.phi - this._spherical.phi;
    const deltaRadius = this._sphericalEnd.radius - this._spherical.radius;
    const deltaTarget = _deltaTarget.subVectors(this._targetEnd, this._target);
    const deltaOffset = _deltaOffset.subVectors(this._focalOffsetEnd, this._focalOffset);
    const deltaZoom = this._zoomEnd - this._zoom;
    if (approxZero(deltaTheta)) {
      this._thetaVelocity.value = 0;
      this._spherical.theta = this._sphericalEnd.theta;
    } else {
      const smoothTime = this._isUserControllingRotate ? this.draggingSmoothTime : this.smoothTime;
      this._spherical.theta = smoothDamp(this._spherical.theta, this._sphericalEnd.theta, this._thetaVelocity, smoothTime, Infinity, delta);
      this._needsUpdate = true;
    }
    if (approxZero(deltaPhi)) {
      this._phiVelocity.value = 0;
      this._spherical.phi = this._sphericalEnd.phi;
    } else {
      const smoothTime = this._isUserControllingRotate ? this.draggingSmoothTime : this.smoothTime;
      this._spherical.phi = smoothDamp(this._spherical.phi, this._sphericalEnd.phi, this._phiVelocity, smoothTime, Infinity, delta);
      this._needsUpdate = true;
    }
    if (approxZero(deltaRadius)) {
      this._radiusVelocity.value = 0;
      this._spherical.radius = this._sphericalEnd.radius;
    } else {
      const smoothTime = this._isUserControllingDolly ? this.draggingSmoothTime : this.smoothTime;
      this._spherical.radius = smoothDamp(this._spherical.radius, this._sphericalEnd.radius, this._radiusVelocity, smoothTime, this.maxSpeed, delta);
      this._needsUpdate = true;
    }
    if (approxZero(deltaTarget.x) && approxZero(deltaTarget.y) && approxZero(deltaTarget.z)) {
      this._targetVelocity.set(0, 0, 0);
      this._target.copy(this._targetEnd);
    } else {
      const smoothTime = this._isUserControllingTruck ? this.draggingSmoothTime : this.smoothTime;
      smoothDampVec3(this._target, this._targetEnd, this._targetVelocity, smoothTime, this.maxSpeed, delta, this._target);
      this._needsUpdate = true;
    }
    if (approxZero(deltaOffset.x) && approxZero(deltaOffset.y) && approxZero(deltaOffset.z)) {
      this._focalOffsetVelocity.set(0, 0, 0);
      this._focalOffset.copy(this._focalOffsetEnd);
    } else {
      const smoothTime = this._isUserControllingOffset ? this.draggingSmoothTime : this.smoothTime;
      smoothDampVec3(this._focalOffset, this._focalOffsetEnd, this._focalOffsetVelocity, smoothTime, this.maxSpeed, delta, this._focalOffset);
      this._needsUpdate = true;
    }
    if (approxZero(deltaZoom)) {
      this._zoomVelocity.value = 0;
      this._zoom = this._zoomEnd;
    } else {
      const smoothTime = this._isUserControllingZoom ? this.draggingSmoothTime : this.smoothTime;
      this._zoom = smoothDamp(this._zoom, this._zoomEnd, this._zoomVelocity, smoothTime, Infinity, delta);
    }
    if (this.dollyToCursor) {
      if (isPerspectiveCamera(this._camera) && this._changedDolly !== 0) {
        const dollyControlAmount = this._spherical.radius - this._lastDistance;
        const camera = this._camera;
        const cameraDirection = this._getCameraDirection(_cameraDirection);
        const planeX = _v3A.copy(cameraDirection).cross(camera.up).normalize();
        if (planeX.lengthSq() === 0)
          planeX.x = 1;
        const planeY = _v3B.crossVectors(planeX, cameraDirection);
        const worldToScreen = this._sphericalEnd.radius * Math.tan(camera.getEffectiveFOV() * DEG2RAD * 0.5);
        const prevRadius = this._sphericalEnd.radius - dollyControlAmount;
        const lerpRatio = (prevRadius - this._sphericalEnd.radius) / this._sphericalEnd.radius;
        const cursor = _v3C.copy(this._targetEnd).add(planeX.multiplyScalar(this._dollyControlCoord.x * worldToScreen * camera.aspect)).add(planeY.multiplyScalar(this._dollyControlCoord.y * worldToScreen));
        const newTargetEnd = _v3A.copy(this._targetEnd).lerp(cursor, lerpRatio);
        const isMin = this._lastDollyDirection === DOLLY_DIRECTION.IN && this._spherical.radius <= this.minDistance;
        const isMax = this._lastDollyDirection === DOLLY_DIRECTION.OUT && this.maxDistance <= this._spherical.radius;
        if (this.infinityDolly && (isMin || isMax)) {
          this._sphericalEnd.radius -= dollyControlAmount;
          this._spherical.radius -= dollyControlAmount;
          const dollyAmount = _v3B.copy(cameraDirection).multiplyScalar(-dollyControlAmount);
          newTargetEnd.add(dollyAmount);
        }
        this._boundary.clampPoint(newTargetEnd, newTargetEnd);
        const targetEndDiff = _v3B.subVectors(newTargetEnd, this._targetEnd);
        this._targetEnd.copy(newTargetEnd);
        this._target.add(targetEndDiff);
        this._changedDolly -= dollyControlAmount;
        if (approxZero(this._changedDolly))
          this._changedDolly = 0;
      } else if (isOrthographicCamera(this._camera) && this._changedZoom !== 0) {
        const dollyControlAmount = this._zoom - this._lastZoom;
        const camera = this._camera;
        const worldCursorPosition = _v3A.set(this._dollyControlCoord.x, this._dollyControlCoord.y, (camera.near + camera.far) / (camera.near - camera.far)).unproject(camera);
        const quaternion = _v3B.set(0, 0, -1).applyQuaternion(camera.quaternion);
        const cursor = _v3C.copy(worldCursorPosition).add(quaternion.multiplyScalar(-worldCursorPosition.dot(camera.up)));
        const prevZoom = this._zoom - dollyControlAmount;
        const lerpRatio = -(prevZoom - this._zoom) / this._zoom;
        const cameraDirection = this._getCameraDirection(_cameraDirection);
        const prevPlaneConstant = this._targetEnd.dot(cameraDirection);
        const newTargetEnd = _v3A.copy(this._targetEnd).lerp(cursor, lerpRatio);
        const newPlaneConstant = newTargetEnd.dot(cameraDirection);
        const pullBack = cameraDirection.multiplyScalar(newPlaneConstant - prevPlaneConstant);
        newTargetEnd.sub(pullBack);
        this._boundary.clampPoint(newTargetEnd, newTargetEnd);
        const targetEndDiff = _v3B.subVectors(newTargetEnd, this._targetEnd);
        this._targetEnd.copy(newTargetEnd);
        this._target.add(targetEndDiff);
        this._changedZoom -= dollyControlAmount;
        if (approxZero(this._changedZoom))
          this._changedZoom = 0;
      }
    }
    if (this._camera.zoom !== this._zoom) {
      this._camera.zoom = this._zoom;
      this._camera.updateProjectionMatrix();
      this._updateNearPlaneCorners();
      this._needsUpdate = true;
    }
    this._dragNeedsUpdate = true;
    const maxDistance = this._collisionTest();
    this._spherical.radius = Math.min(this._spherical.radius, maxDistance);
    this._spherical.makeSafe();
    this._camera.position.setFromSpherical(this._spherical).applyQuaternion(this._yAxisUpSpaceInverse).add(this._target);
    this._camera.lookAt(this._target);
    const affectOffset = !approxZero(this._focalOffset.x) || !approxZero(this._focalOffset.y) || !approxZero(this._focalOffset.z);
    if (affectOffset) {
      this._camera.matrix.compose(this._camera.position, this._camera.quaternion, this._camera.scale);
      _xColumn.setFromMatrixColumn(this._camera.matrix, 0);
      _yColumn.setFromMatrixColumn(this._camera.matrix, 1);
      _zColumn.setFromMatrixColumn(this._camera.matrix, 2);
      _xColumn.multiplyScalar(this._focalOffset.x);
      _yColumn.multiplyScalar(-this._focalOffset.y);
      _zColumn.multiplyScalar(this._focalOffset.z);
      _v3A.copy(_xColumn).add(_yColumn).add(_zColumn);
      this._camera.position.add(_v3A);
      this._camera.updateMatrixWorld();
    }
    if (this._boundaryEnclosesCamera) {
      this._encloseToBoundary(this._camera.position.copy(this._target), _v3A.setFromSpherical(this._spherical).applyQuaternion(this._yAxisUpSpaceInverse), 1);
    }
    const updated = this._needsUpdate;
    if (updated && !this._updatedLastTime) {
      this._hasRested = false;
      this.dispatchEvent({ type: "wake" });
      this.dispatchEvent({ type: "update" });
    } else if (updated) {
      this.dispatchEvent({ type: "update" });
      if (approxZero(deltaTheta, this.restThreshold) && approxZero(deltaPhi, this.restThreshold) && approxZero(deltaRadius, this.restThreshold) && approxZero(deltaTarget.x, this.restThreshold) && approxZero(deltaTarget.y, this.restThreshold) && approxZero(deltaTarget.z, this.restThreshold) && approxZero(deltaOffset.x, this.restThreshold) && approxZero(deltaOffset.y, this.restThreshold) && approxZero(deltaOffset.z, this.restThreshold) && approxZero(deltaZoom, this.restThreshold) && !this._hasRested) {
        this._hasRested = true;
        this.dispatchEvent({ type: "rest" });
      }
    } else if (!updated && this._updatedLastTime) {
      this.dispatchEvent({ type: "sleep" });
    }
    this._lastDistance = this._spherical.radius;
    this._lastZoom = this._zoom;
    this._updatedLastTime = updated;
    this._needsUpdate = false;
    return updated;
  }
  /**
   * Get all state in JSON string
   * @category Methods
   */
  toJSON() {
    return JSON.stringify({
      enabled: this._enabled,
      minDistance: this.minDistance,
      maxDistance: infinityToMaxNumber(this.maxDistance),
      minZoom: this.minZoom,
      maxZoom: infinityToMaxNumber(this.maxZoom),
      minPolarAngle: this.minPolarAngle,
      maxPolarAngle: infinityToMaxNumber(this.maxPolarAngle),
      minAzimuthAngle: infinityToMaxNumber(this.minAzimuthAngle),
      maxAzimuthAngle: infinityToMaxNumber(this.maxAzimuthAngle),
      smoothTime: this.smoothTime,
      draggingSmoothTime: this.draggingSmoothTime,
      dollySpeed: this.dollySpeed,
      truckSpeed: this.truckSpeed,
      dollyToCursor: this.dollyToCursor,
      target: this._targetEnd.toArray(),
      position: _v3A.setFromSpherical(this._sphericalEnd).add(this._targetEnd).toArray(),
      zoom: this._zoomEnd,
      focalOffset: this._focalOffsetEnd.toArray(),
      target0: this._target0.toArray(),
      position0: this._position0.toArray(),
      zoom0: this._zoom0,
      focalOffset0: this._focalOffset0.toArray()
    });
  }
  /**
   * Reproduce the control state with JSON. enableTransition is where anim or not in a boolean.
   * @param json
   * @param enableTransition
   * @category Methods
   */
  fromJSON(json, enableTransition = false) {
    const obj = JSON.parse(json);
    this.enabled = obj.enabled;
    this.minDistance = obj.minDistance;
    this.maxDistance = maxNumberToInfinity(obj.maxDistance);
    this.minZoom = obj.minZoom;
    this.maxZoom = maxNumberToInfinity(obj.maxZoom);
    this.minPolarAngle = obj.minPolarAngle;
    this.maxPolarAngle = maxNumberToInfinity(obj.maxPolarAngle);
    this.minAzimuthAngle = maxNumberToInfinity(obj.minAzimuthAngle);
    this.maxAzimuthAngle = maxNumberToInfinity(obj.maxAzimuthAngle);
    this.smoothTime = obj.smoothTime;
    this.draggingSmoothTime = obj.draggingSmoothTime;
    this.dollySpeed = obj.dollySpeed;
    this.truckSpeed = obj.truckSpeed;
    this.dollyToCursor = obj.dollyToCursor;
    this._target0.fromArray(obj.target0);
    this._position0.fromArray(obj.position0);
    this._zoom0 = obj.zoom0;
    this._focalOffset0.fromArray(obj.focalOffset0);
    this.moveTo(obj.target[0], obj.target[1], obj.target[2], enableTransition);
    _sphericalA.setFromVector3(_v3A.fromArray(obj.position).sub(this._targetEnd).applyQuaternion(this._yAxisUpSpace));
    this.rotateTo(_sphericalA.theta, _sphericalA.phi, enableTransition);
    this.dollyTo(_sphericalA.radius, enableTransition);
    this.zoomTo(obj.zoom, enableTransition);
    this.setFocalOffset(obj.focalOffset[0], obj.focalOffset[1], obj.focalOffset[2], enableTransition);
    this._needsUpdate = true;
  }
  /**
   * Attach all internal event handlers to enable drag control.
   * @category Methods
   */
  connect(domElement) {
    if (this._domElement) {
      console.warn("camera-controls is already connected.");
      return;
    }
    domElement.setAttribute("data-camera-controls-version", VERSION);
    this._addAllEventListeners(domElement);
    this._getClientRect(this._elementRect);
  }
  /**
   * Detach all internal event handlers to disable drag control.
   */
  disconnect() {
    this.cancel();
    this._removeAllEventListeners();
    if (this._domElement) {
      this._domElement.removeAttribute("data-camera-controls-version");
      this._domElement = void 0;
    }
  }
  /**
   * Dispose the cameraControls instance itself, remove all eventListeners.
   * @category Methods
   */
  dispose() {
    this.removeAllEventListeners();
    this.disconnect();
  }
  // it's okay to expose public though
  _getTargetDirection(out) {
    return out.setFromSpherical(this._spherical).divideScalar(this._spherical.radius).applyQuaternion(this._yAxisUpSpaceInverse);
  }
  // it's okay to expose public though
  _getCameraDirection(out) {
    return this._getTargetDirection(out).negate();
  }
  _findPointerById(pointerId) {
    return this._activePointers.find((activePointer) => activePointer.pointerId === pointerId);
  }
  _findPointerByMouseButton(mouseButton) {
    return this._activePointers.find((activePointer) => activePointer.mouseButton === mouseButton);
  }
  _disposePointer(pointer) {
    this._activePointers.splice(this._activePointers.indexOf(pointer), 1);
  }
  _encloseToBoundary(position2, offset, friction) {
    const offsetLength2 = offset.lengthSq();
    if (offsetLength2 === 0) {
      return position2;
    }
    const newTarget = _v3B.copy(offset).add(position2);
    const clampedTarget = this._boundary.clampPoint(newTarget, _v3C);
    const deltaClampedTarget = clampedTarget.sub(newTarget);
    const deltaClampedTargetLength2 = deltaClampedTarget.lengthSq();
    if (deltaClampedTargetLength2 === 0) {
      return position2.add(offset);
    } else if (deltaClampedTargetLength2 === offsetLength2) {
      return position2;
    } else if (friction === 0) {
      return position2.add(offset).add(deltaClampedTarget);
    } else {
      const offsetFactor = 1 + friction * deltaClampedTargetLength2 / offset.dot(deltaClampedTarget);
      return position2.add(_v3B.copy(offset).multiplyScalar(offsetFactor)).add(deltaClampedTarget.multiplyScalar(1 - friction));
    }
  }
  _updateNearPlaneCorners() {
    if (isPerspectiveCamera(this._camera)) {
      const camera = this._camera;
      const near = camera.near;
      const fov = camera.getEffectiveFOV() * DEG2RAD;
      const heightHalf = Math.tan(fov * 0.5) * near;
      const widthHalf = heightHalf * camera.aspect;
      this._nearPlaneCorners[0].set(-widthHalf, -heightHalf, 0);
      this._nearPlaneCorners[1].set(widthHalf, -heightHalf, 0);
      this._nearPlaneCorners[2].set(widthHalf, heightHalf, 0);
      this._nearPlaneCorners[3].set(-widthHalf, heightHalf, 0);
    } else if (isOrthographicCamera(this._camera)) {
      const camera = this._camera;
      const zoomInv = 1 / camera.zoom;
      const left = camera.left * zoomInv;
      const right = camera.right * zoomInv;
      const top = camera.top * zoomInv;
      const bottom = camera.bottom * zoomInv;
      this._nearPlaneCorners[0].set(left, top, 0);
      this._nearPlaneCorners[1].set(right, top, 0);
      this._nearPlaneCorners[2].set(right, bottom, 0);
      this._nearPlaneCorners[3].set(left, bottom, 0);
    }
  }
  _truckInternal = (deltaX, deltaY, dragToOffset, screenSpacePanning) => {
    let truckX;
    let pedestalY;
    if (isPerspectiveCamera(this._camera)) {
      const offset = _v3A.copy(this._camera.position).sub(this._target);
      const fov = this._camera.getEffectiveFOV() * DEG2RAD;
      const targetDistance = offset.length() * Math.tan(fov * 0.5);
      truckX = this.truckSpeed * deltaX * targetDistance / this._elementRect.height;
      pedestalY = this.truckSpeed * deltaY * targetDistance / this._elementRect.height;
    } else if (isOrthographicCamera(this._camera)) {
      const camera = this._camera;
      truckX = this.truckSpeed * deltaX * (camera.right - camera.left) / camera.zoom / this._elementRect.width;
      pedestalY = this.truckSpeed * deltaY * (camera.top - camera.bottom) / camera.zoom / this._elementRect.height;
    } else {
      return;
    }
    if (screenSpacePanning) {
      dragToOffset ? this.setFocalOffset(this._focalOffsetEnd.x + truckX, this._focalOffsetEnd.y, this._focalOffsetEnd.z, true) : this.truck(truckX, 0, true);
      this.forward(-pedestalY, true);
    } else {
      dragToOffset ? this.setFocalOffset(this._focalOffsetEnd.x + truckX, this._focalOffsetEnd.y + pedestalY, this._focalOffsetEnd.z, true) : this.truck(truckX, pedestalY, true);
    }
  };
  _rotateInternal = (deltaX, deltaY) => {
    const theta = PI_2 * this.azimuthRotateSpeed * deltaX / this._elementRect.height;
    const phi = PI_2 * this.polarRotateSpeed * deltaY / this._elementRect.height;
    this.rotate(theta, phi, true);
  };
  _dollyInternal = (delta, x, y) => {
    const dollyScale = Math.pow(0.95, -delta * this.dollySpeed);
    const lastDistance = this._sphericalEnd.radius;
    const distance = this._sphericalEnd.radius * dollyScale;
    const clampedDistance = clamp(distance, this.minDistance, this.maxDistance);
    const overflowedDistance = clampedDistance - distance;
    if (this.infinityDolly && this.dollyToCursor) {
      this._dollyToNoClamp(distance, true);
    } else if (this.infinityDolly && !this.dollyToCursor) {
      this.dollyInFixed(overflowedDistance, true);
      this._dollyToNoClamp(clampedDistance, true);
    } else {
      this._dollyToNoClamp(clampedDistance, true);
    }
    if (this.dollyToCursor) {
      this._changedDolly += (this.infinityDolly ? distance : clampedDistance) - lastDistance;
      this._dollyControlCoord.set(x, y);
    }
    this._lastDollyDirection = Math.sign(-delta);
  };
  _zoomInternal = (delta, x, y) => {
    const zoomScale = Math.pow(0.95, delta * this.dollySpeed);
    const lastZoom = this._zoom;
    const zoom = this._zoom * zoomScale;
    this.zoomTo(zoom, true);
    if (this.dollyToCursor) {
      this._changedZoom += zoom - lastZoom;
      this._dollyControlCoord.set(x, y);
    }
  };
  // lateUpdate
  _collisionTest() {
    let distance = Infinity;
    const hasCollider = this.colliderMeshes.length >= 1;
    if (!hasCollider)
      return distance;
    if (notSupportedInOrthographicCamera(this._camera, "_collisionTest"))
      return distance;
    const rayDirection = this._getTargetDirection(_cameraDirection);
    _rotationMatrix.lookAt(_ORIGIN, rayDirection, this._camera.up);
    for (let i2 = 0; i2 < 4; i2++) {
      const nearPlaneCorner = _v3B.copy(this._nearPlaneCorners[i2]);
      nearPlaneCorner.applyMatrix4(_rotationMatrix);
      const origin = _v3C.addVectors(this._target, nearPlaneCorner);
      _raycaster.set(origin, rayDirection);
      _raycaster.far = this._spherical.radius + 1;
      const intersects = _raycaster.intersectObjects(this.colliderMeshes);
      if (intersects.length !== 0 && intersects[0].distance < distance) {
        distance = intersects[0].distance;
      }
    }
    return distance;
  }
  /**
   * Get its client rect and package into given `DOMRect` .
   */
  _getClientRect(target2) {
    if (!this._domElement)
      return;
    const rect = this._domElement.getBoundingClientRect();
    target2.x = rect.left;
    target2.y = rect.top;
    if (this._viewport) {
      target2.x += this._viewport.x;
      target2.y += rect.height - this._viewport.w - this._viewport.y;
      target2.width = this._viewport.z;
      target2.height = this._viewport.w;
    } else {
      target2.width = rect.width;
      target2.height = rect.height;
    }
    return target2;
  }
  _createOnRestPromise(resolveImmediately) {
    if (resolveImmediately)
      return Promise.resolve();
    this._hasRested = false;
    this.dispatchEvent({ type: "transitionstart" });
    return new Promise((resolve) => {
      const onResolve = () => {
        this.removeEventListener("rest", onResolve);
        resolve();
      };
      this.addEventListener("rest", onResolve);
    });
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _addAllEventListeners(_domElement) {
  }
  _removeAllEventListeners() {
  }
  /**
   * backward compatible
   * @deprecated use smoothTime (in seconds) instead
   * @category Properties
   */
  get dampingFactor() {
    console.warn(".dampingFactor has been deprecated. use smoothTime (in seconds) instead.");
    return 0;
  }
  /**
   * backward compatible
   * @deprecated use smoothTime (in seconds) instead
   * @category Properties
   */
  set dampingFactor(_) {
    console.warn(".dampingFactor has been deprecated. use smoothTime (in seconds) instead.");
  }
  /**
   * backward compatible
   * @deprecated use draggingSmoothTime (in seconds) instead
   * @category Properties
   */
  get draggingDampingFactor() {
    console.warn(".draggingDampingFactor has been deprecated. use draggingSmoothTime (in seconds) instead.");
    return 0;
  }
  /**
   * backward compatible
   * @deprecated use draggingSmoothTime (in seconds) instead
   * @category Properties
   */
  set draggingDampingFactor(_) {
    console.warn(".draggingDampingFactor has been deprecated. use draggingSmoothTime (in seconds) instead.");
  }
  static createBoundingSphere(object3d, out = new THREE.Sphere()) {
    const boundingSphere = out;
    const center = boundingSphere.center;
    _box3A.makeEmpty();
    object3d.traverseVisible((object) => {
      if (!object.isMesh)
        return;
      _box3A.expandByObject(object);
    });
    _box3A.getCenter(center);
    let maxRadiusSq = 0;
    object3d.traverseVisible((object) => {
      if (!object.isMesh)
        return;
      const mesh = object;
      if (!mesh.geometry)
        return;
      const geometry2 = mesh.geometry.clone();
      geometry2.applyMatrix4(mesh.matrixWorld);
      const bufferGeometry = geometry2;
      const position2 = bufferGeometry.attributes.position;
      for (let i2 = 0, l = position2.count; i2 < l; i2++) {
        _v3A.fromBufferAttribute(position2, i2);
        maxRadiusSq = Math.max(maxRadiusSq, center.distanceToSquared(_v3A));
      }
    });
    boundingSphere.radius = Math.sqrt(maxRadiusSq);
    return boundingSphere;
  }
};

// node_modules/@react-three/drei/core/CameraControls.js
var CameraControls2 = (0, import_react11.forwardRef)((props, ref) => {
  const {
    impl: SubclassImpl,
    camera,
    domElement,
    makeDefault,
    onControlStart,
    onControl,
    onControlEnd,
    onTransitionStart,
    onUpdate,
    onWake,
    onRest,
    onSleep,
    onStart,
    onEnd,
    onChange,
    regress,
    ...restProps
  } = props;
  const Impl = SubclassImpl !== null && SubclassImpl !== void 0 ? SubclassImpl : CameraControls;
  (0, import_react11.useMemo)(() => {
    const subsetOfTHREE = {
      Box3,
      MathUtils: {
        clamp: MathUtils.clamp
      },
      Matrix4,
      Quaternion,
      Raycaster,
      Sphere,
      Spherical,
      Vector2,
      Vector3,
      Vector4
    };
    Impl.install({
      THREE: subsetOfTHREE
    });
    extend({
      CameraControlsImpl: Impl
    });
  }, [Impl]);
  const defaultCamera = useThree((state) => state.camera);
  const gl = useThree((state) => state.gl);
  const invalidate = useThree((state) => state.invalidate);
  const events = useThree((state) => state.events);
  const setEvents = useThree((state) => state.setEvents);
  const set = useThree((state) => state.set);
  const get = useThree((state) => state.get);
  const performance2 = useThree((state) => state.performance);
  const explCamera = camera || defaultCamera;
  const explDomElement = domElement || events.connected || gl.domElement;
  const controls = (0, import_react11.useMemo)(() => new Impl(explCamera), [Impl, explCamera]);
  useFrame((state, delta) => {
    controls.update(delta);
  }, -1);
  (0, import_react11.useEffect)(() => {
    controls.connect(explDomElement);
    return () => void controls.disconnect();
  }, [explDomElement, controls]);
  (0, import_react11.useEffect)(() => {
    function invalidateAndRegress() {
      invalidate();
      if (regress) performance2.regress();
    }
    const handleControlStart = (e) => {
      invalidateAndRegress();
      onControlStart == null || onControlStart(e);
      onStart == null || onStart(e);
    };
    const handleControl = (e) => {
      invalidateAndRegress();
      onControl == null || onControl(e);
      onChange == null || onChange(e);
    };
    const handleControlEnd = (e) => {
      onControlEnd == null || onControlEnd(e);
      onEnd == null || onEnd(e);
    };
    const handleTransitionStart = (e) => {
      invalidateAndRegress();
      onTransitionStart == null || onTransitionStart(e);
      onChange == null || onChange(e);
    };
    const handleUpdate = (e) => {
      invalidateAndRegress();
      onUpdate == null || onUpdate(e);
      onChange == null || onChange(e);
    };
    const handleWake = (e) => {
      invalidateAndRegress();
      onWake == null || onWake(e);
      onChange == null || onChange(e);
    };
    const handleRest = (e) => {
      onRest == null || onRest(e);
    };
    const handleSleep = (e) => {
      onSleep == null || onSleep(e);
    };
    controls.addEventListener("controlstart", handleControlStart);
    controls.addEventListener("control", handleControl);
    controls.addEventListener("controlend", handleControlEnd);
    controls.addEventListener("transitionstart", handleTransitionStart);
    controls.addEventListener("update", handleUpdate);
    controls.addEventListener("wake", handleWake);
    controls.addEventListener("rest", handleRest);
    controls.addEventListener("sleep", handleSleep);
    return () => {
      controls.removeEventListener("controlstart", handleControlStart);
      controls.removeEventListener("control", handleControl);
      controls.removeEventListener("controlend", handleControlEnd);
      controls.removeEventListener("transitionstart", handleTransitionStart);
      controls.removeEventListener("update", handleUpdate);
      controls.removeEventListener("wake", handleWake);
      controls.removeEventListener("rest", handleRest);
      controls.removeEventListener("sleep", handleSleep);
    };
  }, [controls, invalidate, setEvents, regress, performance2, onControlStart, onControl, onControlEnd, onTransitionStart, onUpdate, onWake, onRest, onSleep, onChange, onStart, onEnd]);
  (0, import_react11.useEffect)(() => {
    if (makeDefault) {
      const old = get().controls;
      set({
        controls
      });
      return () => set({
        controls: old
      });
    }
  }, [makeDefault, controls]);
  return React51.createElement("primitive", _extends({
    ref,
    object: controls
  }, restProps));
});

// node_modules/@react-three/drei/core/MotionPathControls.js
var React52 = __toESM(require_react());
var isObject3DRef = (ref) => (ref == null ? void 0 : ref.current) instanceof Object3D;
var MotionContext = React52.createContext(null);
function useMotion() {
  const context12 = React52.useContext(MotionContext);
  if (!context12) throw new Error("useMotion hook must be used in a MotionPathControls component.");
  return context12;
}
function Debug({
  points = 50,
  color = "black"
}) {
  const {
    path
  } = useMotion();
  const [dots, setDots] = React52.useState([]);
  const material = React52.useMemo(() => new MeshBasicMaterial({
    color
  }), [color]);
  const geometry2 = React52.useMemo(() => new SphereGeometry(0.025, 16, 16), []);
  const last = React52.useRef([]);
  React52.useEffect(() => {
    if (path.curves !== last.current) {
      setDots(path.getPoints(points));
      last.current = path.curves;
    }
  });
  return dots.map((item, index) => React52.createElement("mesh", {
    key: index,
    material,
    geometry: geometry2,
    position: [item.x, item.y, item.z]
  }));
}
var MotionPathControls = React52.forwardRef(({
  children,
  curves = [],
  debug = false,
  debugColor = "black",
  object,
  focus,
  loop = true,
  offset = void 0,
  smooth = false,
  eps: eps2 = 1e-5,
  damping = 0.1,
  focusDamping = 0.1,
  maxSpeed = Infinity,
  ...props
}, fref) => {
  const {
    camera
  } = useThree();
  const ref = React52.useRef(null);
  const pos = React52.useRef(offset !== null && offset !== void 0 ? offset : 0);
  const path = React52.useMemo(() => new CurvePath(), []);
  const state = React52.useMemo(() => ({
    focus,
    object: (object == null ? void 0 : object.current) instanceof Object3D ? object : {
      current: camera
    },
    path,
    current: pos.current,
    offset: pos.current,
    point: new Vector3(),
    tangent: new Vector3(),
    next: new Vector3()
  }), [focus, object]);
  const instanceRef = useInstanceHandle(ref);
  React52.useLayoutEffect(() => {
    const instance = instanceRef.current;
    path.curves = [];
    const _curves = curves.length > 0 ? curves : instance.children.map((instance2) => instance2.object);
    for (let i2 = 0; i2 < _curves.length; i2++) path.add(_curves[i2]);
    if (smooth) {
      const points = path.getPoints(typeof smooth === "number" ? smooth : 1);
      const catmull = new CatmullRomCurve3(points);
      path.curves = [catmull];
    }
    path.updateArcLengths();
  });
  React52.useImperativeHandle(fref, () => Object.assign(ref.current, {
    motion: state
  }), [state]);
  React52.useLayoutEffect(() => {
    pos.current = misc.repeat(pos.current, 1);
  }, [offset]);
  const vec = React52.useMemo(() => new Vector3(), []);
  useFrame((_state, delta) => {
    const lastOffset = state.offset;
    easing.damp(pos, "current", offset !== void 0 ? offset : state.current, damping, delta, maxSpeed, void 0, eps2);
    state.offset = loop ? misc.repeat(pos.current, 1) : misc.clamp(pos.current, 0, 1);
    if (path.getCurveLengths().length > 0) {
      path.getPointAt(state.offset, state.point);
      path.getTangentAt(state.offset, state.tangent).normalize();
      path.getPointAt(misc.repeat(pos.current - (lastOffset - state.offset), 1), state.next);
      const target2 = (object == null ? void 0 : object.current) instanceof Object3D ? object.current : camera;
      target2.position.copy(state.point);
      if (focus) {
        easing.dampLookAt(target2, isObject3DRef(focus) ? focus.current.getWorldPosition(vec) : focus, focusDamping, delta, maxSpeed, void 0, eps2);
      }
    }
  });
  return React52.createElement("group", _extends({
    ref
  }, props), React52.createElement(MotionContext.Provider, {
    value: state
  }, children, debug && React52.createElement(Debug, {
    color: debugColor
  })));
});

// node_modules/@react-three/drei/core/GizmoHelper.js
var React54 = __toESM(require_react());

// node_modules/@react-three/drei/core/Hud.js
var React53 = __toESM(require_react());
function RenderHud({
  defaultScene,
  defaultCamera,
  renderPriority = 1
}) {
  const {
    gl,
    scene,
    camera
  } = useThree();
  let oldCLear;
  useFrame(() => {
    oldCLear = gl.autoClear;
    if (renderPriority === 1) {
      gl.autoClear = true;
      gl.render(defaultScene, defaultCamera);
    }
    gl.autoClear = false;
    gl.clearDepth();
    gl.render(scene, camera);
    gl.autoClear = oldCLear;
  }, renderPriority);
  return React53.createElement("group", {
    onPointerOver: () => null
  });
}
function Hud({
  children,
  renderPriority = 1
}) {
  const {
    scene: defaultScene,
    camera: defaultCamera
  } = useThree();
  const [hudScene] = React53.useState(() => new Scene());
  return React53.createElement(React53.Fragment, null, createPortal(React53.createElement(React53.Fragment, null, children, React53.createElement(RenderHud, {
    defaultScene,
    defaultCamera,
    renderPriority
  })), hudScene, {
    events: {
      priority: renderPriority + 1
    }
  }));
}

// node_modules/@react-three/drei/core/GizmoHelper.js
var Context = React54.createContext({});
var useGizmoContext = () => {
  return React54.useContext(Context);
};
var turnRate = 2 * Math.PI;
var dummy = new Object3D();
var matrix = new Matrix4();
var [q1, q2] = [new Quaternion(), new Quaternion()];
var target = new Vector3();
var targetPosition = new Vector3();
var isOrbitControls = (controls) => {
  return "minPolarAngle" in controls;
};
var isCameraControls = (controls) => {
  return "getTarget" in controls;
};
var GizmoHelper = ({
  alignment = "bottom-right",
  margin = [80, 80],
  renderPriority = 1,
  onUpdate,
  onTarget,
  children
}) => {
  const size = useThree((state) => state.size);
  const mainCamera = useThree((state) => state.camera);
  const defaultControls = useThree((state) => state.controls);
  const invalidate = useThree((state) => state.invalidate);
  const gizmoRef = React54.useRef(null);
  const virtualCam = React54.useRef(null);
  const animating = React54.useRef(false);
  const radius = React54.useRef(0);
  const focusPoint = React54.useRef(new Vector3(0, 0, 0));
  const defaultUp = React54.useRef(new Vector3(0, 0, 0));
  React54.useEffect(() => {
    defaultUp.current.copy(mainCamera.up);
    dummy.up.copy(mainCamera.up);
  }, [mainCamera]);
  const tweenCamera = React54.useCallback((direction2) => {
    animating.current = true;
    if (defaultControls || onTarget) {
      focusPoint.current = (onTarget == null ? void 0 : onTarget()) || (isCameraControls(defaultControls) ? defaultControls.getTarget(focusPoint.current) : defaultControls == null ? void 0 : defaultControls.target);
    }
    radius.current = mainCamera.position.distanceTo(target);
    q1.copy(mainCamera.quaternion);
    targetPosition.copy(direction2).multiplyScalar(radius.current).add(target);
    dummy.lookAt(targetPosition);
    q2.copy(dummy.quaternion);
    invalidate();
  }, [defaultControls, mainCamera, onTarget, invalidate]);
  useFrame((_, delta) => {
    if (virtualCam.current && gizmoRef.current) {
      var _gizmoRef$current;
      if (animating.current) {
        if (q1.angleTo(q2) < 0.01) {
          animating.current = false;
          if (isOrbitControls(defaultControls)) {
            mainCamera.up.copy(defaultUp.current);
          }
        } else {
          const step = delta * turnRate;
          q1.rotateTowards(q2, step);
          mainCamera.position.set(0, 0, 1).applyQuaternion(q1).multiplyScalar(radius.current).add(focusPoint.current);
          mainCamera.up.set(0, 1, 0).applyQuaternion(q1).normalize();
          mainCamera.quaternion.copy(q1);
          if (isCameraControls(defaultControls)) defaultControls.setPosition(mainCamera.position.x, mainCamera.position.y, mainCamera.position.z);
          if (onUpdate) onUpdate();
          else if (defaultControls) defaultControls.update(delta);
          invalidate();
        }
      }
      matrix.copy(mainCamera.matrix).invert();
      (_gizmoRef$current = gizmoRef.current) == null || _gizmoRef$current.quaternion.setFromRotationMatrix(matrix);
    }
  });
  const gizmoHelperContext = React54.useMemo(() => ({
    tweenCamera
  }), [tweenCamera]);
  const [marginX, marginY] = margin;
  const x = alignment.endsWith("-center") ? 0 : alignment.endsWith("-left") ? -size.width / 2 + marginX : size.width / 2 - marginX;
  const y = alignment.startsWith("center-") ? 0 : alignment.startsWith("top-") ? size.height / 2 - marginY : -size.height / 2 + marginY;
  return React54.createElement(Hud, {
    renderPriority
  }, React54.createElement(Context.Provider, {
    value: gizmoHelperContext
  }, React54.createElement(OrthographicCamera2, {
    makeDefault: true,
    ref: virtualCam,
    position: [0, 0, 200]
  }), React54.createElement("group", {
    ref: gizmoRef,
    position: [x, y, 0]
  }, children)));
};

// node_modules/@react-three/drei/core/GizmoViewcube.js
var React55 = __toESM(require_react());
var colors = {
  bg: "#f0f0f0",
  hover: "#999",
  text: "black",
  stroke: "black"
};
var defaultFaces = ["Right", "Left", "Top", "Bottom", "Front", "Back"];
var makePositionVector = (xyz) => new Vector3(...xyz).multiplyScalar(0.38);
var corners = [[1, 1, 1], [1, 1, -1], [1, -1, 1], [1, -1, -1], [-1, 1, 1], [-1, 1, -1], [-1, -1, 1], [-1, -1, -1]].map(makePositionVector);
var cornerDimensions = [0.25, 0.25, 0.25];
var edges = [[1, 1, 0], [1, 0, 1], [1, 0, -1], [1, -1, 0], [0, 1, 1], [0, 1, -1], [0, -1, 1], [0, -1, -1], [-1, 1, 0], [-1, 0, 1], [-1, 0, -1], [-1, -1, 0]].map(makePositionVector);
var edgeDimensions = edges.map((edge) => edge.toArray().map((axis) => axis == 0 ? 0.5 : 0.25));
var FaceMaterial = ({
  hover,
  index,
  font = "20px Inter var, Arial, sans-serif",
  faces = defaultFaces,
  color = colors.bg,
  hoverColor = colors.hover,
  textColor = colors.text,
  strokeColor = colors.stroke,
  opacity = 1
}) => {
  const gl = useThree((state) => state.gl);
  const texture = React55.useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 128;
    canvas.height = 128;
    const context12 = canvas.getContext("2d");
    context12.fillStyle = color;
    context12.fillRect(0, 0, canvas.width, canvas.height);
    context12.strokeStyle = strokeColor;
    context12.strokeRect(0, 0, canvas.width, canvas.height);
    context12.font = font;
    context12.textAlign = "center";
    context12.fillStyle = textColor;
    context12.fillText(faces[index].toUpperCase(), 64, 76);
    return new CanvasTexture(canvas);
  }, [index, faces, font, color, textColor, strokeColor]);
  return React55.createElement("meshBasicMaterial", {
    map: texture,
    "map-anisotropy": gl.capabilities.getMaxAnisotropy() || 1,
    attach: `material-${index}`,
    color: hover ? hoverColor : "white",
    transparent: true,
    opacity
  });
};
var FaceCube = (props) => {
  const {
    tweenCamera
  } = useGizmoContext();
  const [hover, setHover] = React55.useState(null);
  const handlePointerOut = (e) => {
    e.stopPropagation();
    setHover(null);
  };
  const handleClick = (e) => {
    e.stopPropagation();
    tweenCamera(e.face.normal);
  };
  const handlePointerMove = (e) => {
    e.stopPropagation();
    setHover(Math.floor(e.faceIndex / 2));
  };
  return React55.createElement("mesh", {
    onPointerOut: handlePointerOut,
    onPointerMove: handlePointerMove,
    onClick: props.onClick || handleClick
  }, [...Array(6)].map((_, index) => React55.createElement(FaceMaterial, _extends({
    key: index,
    index,
    hover: hover === index
  }, props))), React55.createElement("boxGeometry", null));
};
var EdgeCube = ({
  onClick,
  dimensions,
  position: position2,
  hoverColor = colors.hover
}) => {
  const {
    tweenCamera
  } = useGizmoContext();
  const [hover, setHover] = React55.useState(false);
  const handlePointerOut = (e) => {
    e.stopPropagation();
    setHover(false);
  };
  const handlePointerOver = (e) => {
    e.stopPropagation();
    setHover(true);
  };
  const handleClick = (e) => {
    e.stopPropagation();
    tweenCamera(position2);
  };
  return React55.createElement("mesh", {
    scale: 1.01,
    position: position2,
    onPointerOver: handlePointerOver,
    onPointerOut: handlePointerOut,
    onClick: onClick || handleClick
  }, React55.createElement("meshBasicMaterial", {
    color: hover ? hoverColor : "white",
    transparent: true,
    opacity: 0.6,
    visible: hover
  }), React55.createElement("boxGeometry", {
    args: dimensions
  }));
};
var GizmoViewcube = (props) => {
  return React55.createElement("group", {
    scale: [60, 60, 60]
  }, React55.createElement(FaceCube, props), edges.map((edge, index) => React55.createElement(EdgeCube, _extends({
    key: index,
    position: edge,
    dimensions: edgeDimensions[index]
  }, props))), corners.map((corner, index) => React55.createElement(EdgeCube, _extends({
    key: index,
    position: corner,
    dimensions: cornerDimensions
  }, props))));
};

// node_modules/@react-three/drei/core/GizmoViewport.js
var React56 = __toESM(require_react());
function Axis({
  scale: scale3 = [0.8, 0.05, 0.05],
  color,
  rotation: rotation3
}) {
  return React56.createElement("group", {
    rotation: rotation3
  }, React56.createElement("mesh", {
    position: [0.4, 0, 0]
  }, React56.createElement("boxGeometry", {
    args: scale3
  }), React56.createElement("meshBasicMaterial", {
    color,
    toneMapped: false
  })));
}
function AxisHead({
  onClick,
  font,
  disabled,
  arcStyle,
  label,
  labelColor,
  axisHeadScale = 1,
  ...props
}) {
  const gl = useThree((state) => state.gl);
  const texture = React56.useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const context12 = canvas.getContext("2d");
    context12.beginPath();
    context12.arc(32, 32, 16, 0, 2 * Math.PI);
    context12.closePath();
    context12.fillStyle = arcStyle;
    context12.fill();
    if (label) {
      context12.font = font;
      context12.textAlign = "center";
      context12.fillStyle = labelColor;
      context12.fillText(label, 32, 41);
    }
    return new CanvasTexture(canvas);
  }, [arcStyle, label, labelColor, font]);
  const [active, setActive] = React56.useState(false);
  const scale3 = (label ? 1 : 0.75) * (active ? 1.2 : 1) * axisHeadScale;
  const handlePointerOver = (e) => {
    e.stopPropagation();
    setActive(true);
  };
  const handlePointerOut = (e) => {
    e.stopPropagation();
    setActive(false);
  };
  return React56.createElement("sprite", _extends({
    scale: scale3,
    onPointerOver: !disabled ? handlePointerOver : void 0,
    onPointerOut: !disabled ? onClick || handlePointerOut : void 0
  }, props), React56.createElement("spriteMaterial", {
    map: texture,
    "map-anisotropy": gl.capabilities.getMaxAnisotropy() || 1,
    alphaTest: 0.3,
    opacity: label ? 1 : 0.75,
    toneMapped: false
  }));
}
var GizmoViewport = ({
  hideNegativeAxes,
  hideAxisHeads,
  disabled,
  font = "18px Inter var, Arial, sans-serif",
  axisColors = ["#ff2060", "#20df80", "#2080ff"],
  axisHeadScale = 1,
  axisScale,
  labels = ["X", "Y", "Z"],
  labelColor = "#000",
  onClick,
  ...props
}) => {
  const [colorX, colorY, colorZ] = axisColors;
  const {
    tweenCamera
  } = useGizmoContext();
  const axisHeadProps = {
    font,
    disabled,
    labelColor,
    onClick,
    axisHeadScale,
    onPointerDown: !disabled ? (e) => {
      tweenCamera(e.object.position);
      e.stopPropagation();
    } : void 0
  };
  return React56.createElement("group", _extends({
    scale: 40
  }, props), React56.createElement(Axis, {
    color: colorX,
    rotation: [0, 0, 0],
    scale: axisScale
  }), React56.createElement(Axis, {
    color: colorY,
    rotation: [0, 0, Math.PI / 2],
    scale: axisScale
  }), React56.createElement(Axis, {
    color: colorZ,
    rotation: [0, -Math.PI / 2, 0],
    scale: axisScale
  }), !hideAxisHeads && React56.createElement(React56.Fragment, null, React56.createElement(AxisHead, _extends({
    arcStyle: colorX,
    position: [1, 0, 0],
    label: labels[0]
  }, axisHeadProps)), React56.createElement(AxisHead, _extends({
    arcStyle: colorY,
    position: [0, 1, 0],
    label: labels[1]
  }, axisHeadProps)), React56.createElement(AxisHead, _extends({
    arcStyle: colorZ,
    position: [0, 0, 1],
    label: labels[2]
  }, axisHeadProps)), !hideNegativeAxes && React56.createElement(React56.Fragment, null, React56.createElement(AxisHead, _extends({
    arcStyle: colorX,
    position: [-1, 0, 0]
  }, axisHeadProps)), React56.createElement(AxisHead, _extends({
    arcStyle: colorY,
    position: [0, -1, 0]
  }, axisHeadProps)), React56.createElement(AxisHead, _extends({
    arcStyle: colorZ,
    position: [0, 0, -1]
  }, axisHeadProps)))));
};

// node_modules/@react-three/drei/core/Grid.js
var React57 = __toESM(require_react());
var GridMaterial = shaderMaterial(
  {
    cellSize: 0.5,
    sectionSize: 1,
    fadeDistance: 100,
    fadeStrength: 1,
    fadeFrom: 1,
    cellThickness: 0.5,
    sectionThickness: 1,
    cellColor: new Color(),
    sectionColor: new Color(),
    infiniteGrid: false,
    followCamera: false,
    worldCamProjPosition: new Vector3(),
    worldPlanePosition: new Vector3()
  },
  /* glsl */
  `
    varying vec3 localPosition;
    varying vec4 worldPosition;

    uniform vec3 worldCamProjPosition;
    uniform vec3 worldPlanePosition;
    uniform float fadeDistance;
    uniform bool infiniteGrid;
    uniform bool followCamera;

    void main() {
      localPosition = position.xzy;
      if (infiniteGrid) localPosition *= 1.0 + fadeDistance;
      
      worldPosition = modelMatrix * vec4(localPosition, 1.0);
      if (followCamera) {
        worldPosition.xyz += (worldCamProjPosition - worldPlanePosition);
        localPosition = (inverse(modelMatrix) * worldPosition).xyz;
      }

      gl_Position = projectionMatrix * viewMatrix * worldPosition;
    }
  `,
  /* glsl */
  `
    varying vec3 localPosition;
    varying vec4 worldPosition;

    uniform vec3 worldCamProjPosition;
    uniform float cellSize;
    uniform float sectionSize;
    uniform vec3 cellColor;
    uniform vec3 sectionColor;
    uniform float fadeDistance;
    uniform float fadeStrength;
    uniform float fadeFrom;
    uniform float cellThickness;
    uniform float sectionThickness;

    float getGrid(float size, float thickness) {
      vec2 r = localPosition.xz / size;
      vec2 grid = abs(fract(r - 0.5) - 0.5) / fwidth(r);
      float line = min(grid.x, grid.y) + 1.0 - thickness;
      return 1.0 - min(line, 1.0);
    }

    void main() {
      float g1 = getGrid(cellSize, cellThickness);
      float g2 = getGrid(sectionSize, sectionThickness);

      vec3 from = worldCamProjPosition*vec3(fadeFrom);
      float dist = distance(from, worldPosition.xyz);
      float d = 1.0 - min(dist / fadeDistance, 1.0);
      vec3 color = mix(cellColor, sectionColor, min(1.0, sectionThickness * g2));

      gl_FragColor = vec4(color, (g1 + g2) * pow(d, fadeStrength));
      gl_FragColor.a = mix(0.75 * gl_FragColor.a, gl_FragColor.a, g2);
      if (gl_FragColor.a <= 0.0) discard;

      #include <tonemapping_fragment>
      #include <${version >= 154 ? "colorspace_fragment" : "encodings_fragment"}>
    }
  `
);
var Grid = React57.forwardRef(({
  args,
  cellColor = "#000000",
  sectionColor = "#2080ff",
  cellSize = 0.5,
  sectionSize = 1,
  followCamera = false,
  infiniteGrid = false,
  fadeDistance = 100,
  fadeStrength = 1,
  fadeFrom = 1,
  cellThickness = 0.5,
  sectionThickness = 1,
  side = BackSide,
  ...props
}, fRef) => {
  extend({
    GridMaterial
  });
  const ref = React57.useRef(null);
  React57.useImperativeHandle(fRef, () => ref.current, []);
  const plane = new Plane();
  const upVector = new Vector3(0, 1, 0);
  const zeroVector = new Vector3(0, 0, 0);
  useFrame((state) => {
    plane.setFromNormalAndCoplanarPoint(upVector, zeroVector).applyMatrix4(ref.current.matrixWorld);
    const gridMaterial = ref.current.material;
    const worldCamProjPosition = gridMaterial.uniforms.worldCamProjPosition;
    const worldPlanePosition = gridMaterial.uniforms.worldPlanePosition;
    plane.projectPoint(state.camera.position, worldCamProjPosition.value);
    worldPlanePosition.value.set(0, 0, 0).applyMatrix4(ref.current.matrixWorld);
  });
  const uniforms1 = {
    cellSize,
    sectionSize,
    cellColor,
    sectionColor,
    cellThickness,
    sectionThickness
  };
  const uniforms2 = {
    fadeDistance,
    fadeStrength,
    fadeFrom,
    infiniteGrid,
    followCamera
  };
  return React57.createElement("mesh", _extends({
    ref,
    frustumCulled: false
  }, props), React57.createElement("gridMaterial", _extends({
    transparent: true,
    "extensions-derivatives": true,
    side
  }, uniforms1, uniforms2)), React57.createElement("planeGeometry", {
    args
  }));
});

// node_modules/@react-three/drei/core/CubeTexture.js
var React58 = __toESM(require_react());
function useCubeTexture(files, {
  path
}) {
  const [cubeTexture] = useLoader(CubeTextureLoader, [files], (loader2) => loader2.setPath(path));
  return cubeTexture;
}
useCubeTexture.preload = (files, {
  path
}) => useLoader.preload(CubeTextureLoader, [files], (loader2) => loader2.setPath(path));
function CubeTexture({
  children,
  files,
  ...options
}) {
  const texture = useCubeTexture(files, {
    ...options
  });
  return React58.createElement(React58.Fragment, null, children == null ? void 0 : children(texture));
}

// node_modules/@react-three/drei/core/Fbx.js
var React59 = __toESM(require_react());
function useFBX(path) {
  return useLoader(FBXLoader, path);
}
useFBX.preload = (path) => useLoader.preload(FBXLoader, path);
useFBX.clear = (input) => useLoader.clear(FBXLoader, input);
function Fbx({
  path,
  ...props
}) {
  const fbx = useFBX(path);
  const object = fbx.children[0];
  return React59.createElement(Clone, _extends({}, props, {
    object
  }));
}

// node_modules/@react-three/drei/core/Ktx2.js
var React60 = __toESM(require_react());
var import_react12 = __toESM(require_react());
var cdn = "https://cdn.jsdelivr.net/gh/pmndrs/drei-assets@master";
function useKTX2(input, basisPath = `${cdn}/basis/`) {
  const gl = useThree((state) => state.gl);
  const textures = useLoader(KTX2Loader, IsObject(input) ? Object.values(input) : input, (loader2) => {
    loader2.detectSupport(gl);
    loader2.setTranscoderPath(basisPath);
  });
  (0, import_react12.useEffect)(() => {
    const array = Array.isArray(textures) ? textures : [textures];
    array.forEach(gl.initTexture);
  }, [gl, textures]);
  if (IsObject(input)) {
    const keys = Object.keys(input);
    const keyed = {};
    keys.forEach((key) => Object.assign(keyed, {
      [key]: textures[keys.indexOf(key)]
    }));
    return keyed;
  } else {
    return textures;
  }
}
useKTX2.preload = (url, basisPath = `${cdn}/basis/`) => useLoader.preload(KTX2Loader, url, (loader2) => {
  loader2.setTranscoderPath(basisPath);
});
useKTX2.clear = (input) => useLoader.clear(KTX2Loader, input);
var Ktx2 = ({
  children,
  input,
  basisPath
}) => {
  const texture = useKTX2(input, basisPath);
  return React60.createElement(React60.Fragment, null, children == null ? void 0 : children(texture));
};

// node_modules/@react-three/drei/core/VideoTexture.js
var React61 = __toESM(require_react());
var import_react13 = __toESM(require_react());
var IS_BROWSER = ((_window$document, _window$navigator) => typeof window !== "undefined" && typeof ((_window$document = window.document) == null ? void 0 : _window$document.createElement) === "function" && typeof ((_window$navigator = window.navigator) == null ? void 0 : _window$navigator.userAgent) === "string")();
var _HLSModule = null;
async function getHls(...args) {
  var _HLSModule2;
  (_HLSModule2 = _HLSModule) !== null && _HLSModule2 !== void 0 ? _HLSModule2 : _HLSModule = await import("./hls-D4HYIXBD.js");
  const Ctor = _HLSModule.default;
  if (Ctor.isSupported()) {
    return new Ctor(...args);
  }
  return null;
}
function useVideoTexture(srcOrSrcObject, {
  unsuspend = "loadedmetadata",
  start = true,
  hls: hlsConfig = {},
  crossOrigin = "anonymous",
  muted = true,
  loop = true,
  playsInline = true,
  onVideoFrame,
  ...videoProps
} = {}) {
  const gl = useThree((state) => state.gl);
  const hlsRef = (0, import_react13.useRef)(null);
  const texture = suspend(() => new Promise(async (res) => {
    let src = void 0;
    let srcObject = void 0;
    if (typeof srcOrSrcObject === "string") {
      src = srcOrSrcObject;
    } else {
      srcObject = srcOrSrcObject;
    }
    const video2 = Object.assign(document.createElement("video"), {
      src,
      srcObject,
      crossOrigin,
      loop,
      muted,
      playsInline,
      ...videoProps
    });
    if (src && IS_BROWSER && src.endsWith(".m3u8")) {
      const hls = hlsRef.current = await getHls(hlsConfig);
      if (hls) {
        hls.on(Events.MEDIA_ATTACHED, () => void hls.loadSource(src));
        hls.attachMedia(video2);
      }
    }
    const texture2 = new VideoTexture(video2);
    texture2.colorSpace = gl.outputColorSpace;
    video2.addEventListener(unsuspend, () => res(texture2));
  }), [srcOrSrcObject]);
  const video = texture.source.data;
  useVideoFrame(video, onVideoFrame);
  (0, import_react13.useEffect)(() => {
    start && texture.image.play();
    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [texture, start]);
  return texture;
}
var VideoTexture2 = (0, import_react13.forwardRef)(({
  children,
  src,
  ...config
}, fref) => {
  const texture = useVideoTexture(src, config);
  (0, import_react13.useEffect)(() => {
    return () => void texture.dispose();
  }, [texture]);
  (0, import_react13.useImperativeHandle)(fref, () => texture, [texture]);
  return React61.createElement(React61.Fragment, null, children == null ? void 0 : children(texture));
});
var useVideoFrame = (video, f2) => {
  (0, import_react13.useEffect)(() => {
    if (!f2) return;
    if (!video.requestVideoFrameCallback) return;
    let handle;
    const callback = (...args) => {
      f2(...args);
      handle = video.requestVideoFrameCallback(callback);
    };
    video.requestVideoFrameCallback(callback);
    return () => video.cancelVideoFrameCallback(handle);
  }, [video, f2]);
};

// node_modules/@react-three/drei/core/useSpriteLoader.js
var React62 = __toESM(require_react());
var import_react14 = __toESM(require_react());
var getFirstFrame = (frames, frameName) => {
  if (Array.isArray(frames)) {
    return frames[0];
  } else {
    const k = frameName !== null && frameName !== void 0 ? frameName : Object.keys(frames)[0];
    return frames[k][0];
  }
};
var checkIfFrameIsEmpty = (frameData) => {
  for (let i2 = 3; i2 < frameData.length; i2 += 4) {
    if (frameData[i2] !== 0) {
      return false;
    }
  }
  return true;
};
function useSpriteLoader(input, json, animationNames, numberOfFrames, onLoad, canvasRenderingContext2DSettings) {
  const viewportRef = React62.useRef(useThree((state) => state.viewport));
  const spriteDataRef = React62.useRef(null);
  const totalFrames = React62.useRef(0);
  const aspectFactor = 0.1;
  const inputRef = React62.useRef(input);
  const jsonRef = React62.useRef(json);
  const animationFramesRef = React62.useRef(animationNames);
  const [spriteData, setSpriteData] = (0, import_react14.useState)(null);
  const [spriteTexture, setSpriteTexture] = React62.useState(new Texture());
  const textureLoader = React62.useMemo(() => new TextureLoader(), []);
  const [spriteObj, setSpriteObj] = (0, import_react14.useState)(null);
  const calculateAspectRatio = React62.useCallback((width, height, factor) => {
    const adaptedHeight = height * (viewportRef.current.aspect > width / height ? viewportRef.current.width / width : viewportRef.current.height / height);
    const adaptedWidth = width * (viewportRef.current.aspect > width / height ? viewportRef.current.width / width : viewportRef.current.height / height);
    const scaleX = adaptedWidth * factor;
    const scaleY = adaptedHeight * factor;
    const currentMaxScale = 1;
    let finalMaxScaleW = Math.min(currentMaxScale, scaleX);
    let finalMaxScaleH = Math.min(currentMaxScale, scaleY);
    if (scaleX > currentMaxScale) {
      finalMaxScaleW = currentMaxScale;
      finalMaxScaleH = scaleY / scaleX * currentMaxScale;
    }
    return new Vector3(finalMaxScaleW, finalMaxScaleH, 1);
  }, []);
  const getRowsAndColumns = React62.useCallback((texture, totalFrames2) => {
    if (texture.image) {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d", canvasRenderingContext2DSettings);
      if (!ctx) {
        throw new Error("Failed to get 2d context");
      }
      canvas.width = texture.image.width;
      canvas.height = texture.image.height;
      ctx.drawImage(texture.image, 0, 0);
      const width = texture.image.width;
      const height = texture.image.height;
      const cols = Math.round(Math.sqrt(totalFrames2 * (width / height)));
      const rows = Math.round(totalFrames2 / cols);
      const frameWidth = width / cols;
      const frameHeight = height / rows;
      const emptyFrames = [];
      for (let row = 0; row < rows; row++) {
        for (let col2 = 0; col2 < cols; col2++) {
          const frameIndex = row * cols + col2;
          if (frameIndex >= totalFrames2) {
            emptyFrames.push({
              row,
              col: col2
            });
            continue;
          }
          const frameData = ctx.getImageData(col2 * frameWidth, row * frameHeight, frameWidth, frameHeight).data;
          const isEmpty = checkIfFrameIsEmpty(frameData);
          if (isEmpty) {
            emptyFrames.push({
              row,
              col: col2
            });
          }
        }
      }
      return {
        rows,
        columns: cols,
        frameWidth,
        frameHeight,
        emptyFrames
      };
    } else {
      return {
        rows: 0,
        columns: 0,
        frameWidth: 0,
        frameHeight: 0,
        emptyFrames: []
      };
    }
  }, [canvasRenderingContext2DSettings]);
  const calculateScaleRatio = React62.useCallback((frames) => {
    const processFrameArray = (frameArray) => {
      let largestFrame = null;
      for (const frame of frameArray) {
        const {
          w,
          h
        } = frame.frame;
        const area = w * h;
        if (!largestFrame || area > largestFrame.area) {
          largestFrame = {
            w,
            h,
            area
          };
        }
      }
      const frameArr = frameArray.map((frame) => {
        const {
          w,
          h
        } = frame.frame;
        const area = w * h;
        const scaleRatio = largestFrame ? area === largestFrame.area ? 1 : Math.sqrt(area / largestFrame.area) : 1;
        return {
          ...frame,
          scaleRatio
        };
      });
      return frameArr;
    };
    if (Array.isArray(frames)) {
      return processFrameArray(frames);
    } else {
      const result = {};
      for (const key in frames) {
        result[key] = processFrameArray(frames[key]);
      }
      return result;
    }
  }, []);
  const parseFrames = React62.useCallback(() => {
    const sprites = {};
    const data = spriteDataRef.current;
    const delimiters = animationFramesRef.current;
    if (data) {
      if (delimiters && Array.isArray(data["frames"])) {
        for (let i2 = 0; i2 < delimiters.length; i2++) {
          sprites[delimiters[i2]] = [];
          for (const value of data["frames"]) {
            const frameData = value["frame"];
            const sourceWidth = value["sourceSize"]["w"];
            const sourceHeight = value["sourceSize"]["h"];
            if (typeof value["filename"] === "string" && value["filename"].toLowerCase().indexOf(delimiters[i2].toLowerCase()) !== -1) {
              sprites[delimiters[i2]].push({
                ...value,
                frame: frameData,
                sourceSize: {
                  w: sourceWidth,
                  h: sourceHeight
                }
              });
            }
          }
        }
        for (const frame in sprites) {
          const scaleRatioData = calculateScaleRatio(sprites[frame]);
          if (Array.isArray(scaleRatioData)) {
            sprites[frame] = scaleRatioData;
          }
        }
        return sprites;
      } else if (delimiters && typeof data["frames"] === "object") {
        for (let i2 = 0; i2 < delimiters.length; i2++) {
          sprites[delimiters[i2]] = [];
          for (const innerKey in data["frames"]) {
            const value = data["frames"][innerKey];
            const frameData = value["frame"];
            const sourceWidth = value["sourceSize"]["w"];
            const sourceHeight = value["sourceSize"]["h"];
            if (typeof innerKey === "string" && innerKey.toLowerCase().indexOf(delimiters[i2].toLowerCase()) !== -1) {
              sprites[delimiters[i2]].push({
                ...value,
                frame: frameData,
                sourceSize: {
                  w: sourceWidth,
                  h: sourceHeight
                }
              });
            }
          }
        }
        for (const frame in sprites) {
          const scaleRatioData = calculateScaleRatio(sprites[frame]);
          if (Array.isArray(scaleRatioData)) {
            sprites[frame] = scaleRatioData;
          }
        }
        return sprites;
      } else {
        let spritesArr = [];
        if (data != null && data.frames) {
          if (Array.isArray(data.frames)) {
            spritesArr = data.frames.map((frame) => ({
              ...frame,
              x: frame.frame.x,
              y: frame.frame.y,
              w: frame.frame.w,
              h: frame.frame.h
            }));
          } else {
            spritesArr = Object.values(data.frames).flat().map((frame) => ({
              ...frame,
              x: frame.frame.x,
              y: frame.frame.y,
              w: frame.frame.w,
              h: frame.frame.h
            }));
          }
        }
        return calculateScaleRatio(spritesArr);
      }
    }
    return [];
  }, [calculateScaleRatio, spriteDataRef]);
  const parseSpriteData = React62.useCallback((json2, _spriteTexture) => {
    let aspect = new Vector3(1, 1, 1);
    if (json2 === null) {
      if (_spriteTexture && numberOfFrames) {
        const width = _spriteTexture.image.width;
        const height = _spriteTexture.image.height;
        totalFrames.current = numberOfFrames;
        const {
          rows,
          columns,
          frameWidth,
          frameHeight,
          emptyFrames
        } = getRowsAndColumns(_spriteTexture, numberOfFrames);
        const nonJsonFrames = {
          frames: [],
          meta: {
            version: "1.0",
            size: {
              w: width,
              h: height
            },
            rows,
            columns,
            frameWidth,
            frameHeight,
            scale: "1"
          }
        };
        for (let row = 0; row < rows; row++) {
          for (let col2 = 0; col2 < columns; col2++) {
            const isExcluded = (emptyFrames !== null && emptyFrames !== void 0 ? emptyFrames : []).some((coord) => coord.row === row && coord.col === col2);
            if (isExcluded) {
              continue;
            }
            if (Array.isArray(nonJsonFrames.frames)) {
              nonJsonFrames.frames.push({
                frame: {
                  x: col2 * frameWidth,
                  y: row * frameHeight,
                  w: frameWidth,
                  h: frameHeight
                },
                scaleRatio: 1,
                rotated: false,
                trimmed: false,
                spriteSourceSize: {
                  x: 0,
                  y: 0,
                  w: frameWidth,
                  h: frameHeight
                },
                sourceSize: {
                  w: frameWidth,
                  h: frameHeight
                }
              });
            }
          }
        }
        aspect = calculateAspectRatio(frameWidth, frameHeight, aspectFactor);
        spriteDataRef.current = nonJsonFrames;
      }
      if (spriteDataRef.current && spriteDataRef.current.frames) {
        spriteDataRef.current.frames = calculateScaleRatio(spriteDataRef.current.frames);
      }
    } else if (_spriteTexture) {
      spriteDataRef.current = json2;
      spriteDataRef.current.frames = parseFrames();
      totalFrames.current = Array.isArray(json2.frames) ? json2.frames.length : Object.keys(json2.frames).length;
      const {
        w,
        h
      } = getFirstFrame(json2.frames).sourceSize;
      aspect = calculateAspectRatio(w, h, aspectFactor);
    }
    setSpriteData(spriteDataRef.current);
    if ("encoding" in _spriteTexture) {
      _spriteTexture.encoding = 3001;
    } else if ("colorSpace" in _spriteTexture) {
      _spriteTexture.colorSpace = SRGBColorSpace;
    }
    setSpriteTexture(_spriteTexture);
    setSpriteObj({
      spriteTexture: _spriteTexture,
      spriteData: spriteDataRef.current,
      aspect
    });
  }, [getRowsAndColumns, numberOfFrames, parseFrames, calculateAspectRatio, calculateScaleRatio]);
  const loadJsonAndTextureAndExecuteCallback = React62.useCallback((jsonUrl, textureUrl, callback) => {
    const jsonPromise = fetch(jsonUrl).then((response) => response.json());
    const texturePromise = new Promise((resolve) => {
      textureLoader.load(textureUrl, resolve);
    });
    Promise.all([jsonPromise, texturePromise]).then((response) => {
      callback(response[0], response[1]);
    });
  }, [textureLoader]);
  const loadStandaloneSprite = React62.useCallback((textureUrl) => {
    if (!textureUrl && !inputRef.current) {
      throw new Error("Either textureUrl or input must be provided");
    }
    const validUrl = textureUrl !== null && textureUrl !== void 0 ? textureUrl : inputRef.current;
    if (!validUrl) {
      throw new Error("A valid texture URL must be provided");
    }
    textureLoader.load(validUrl, (texture) => parseSpriteData(null, texture));
  }, [textureLoader, parseSpriteData]);
  const loadJsonAndTexture = React62.useCallback((textureUrl, jsonUrl) => {
    if (jsonUrl && textureUrl) {
      loadJsonAndTextureAndExecuteCallback(jsonUrl, textureUrl, parseSpriteData);
    } else {
      loadStandaloneSprite(textureUrl);
    }
  }, [loadJsonAndTextureAndExecuteCallback, loadStandaloneSprite, parseSpriteData]);
  React62.useLayoutEffect(() => {
    if (jsonRef.current && inputRef.current) {
      loadJsonAndTextureAndExecuteCallback(jsonRef.current, inputRef.current, parseSpriteData);
    } else if (inputRef.current) {
      loadStandaloneSprite();
    }
    const _inputRef = inputRef.current;
    return () => {
      if (_inputRef) {
        useLoader.clear(TextureLoader, _inputRef);
      }
    };
  }, [loadJsonAndTextureAndExecuteCallback, loadStandaloneSprite, parseSpriteData]);
  React62.useLayoutEffect(() => {
    onLoad == null || onLoad(spriteTexture, spriteData !== null && spriteData !== void 0 ? spriteData : null);
  }, [spriteTexture, spriteData, onLoad]);
  return {
    spriteObj,
    loadJsonAndTexture
  };
}
useSpriteLoader.preload = (url) => useLoader.preload(TextureLoader, url);
useSpriteLoader.clear = (input) => useLoader.clear(TextureLoader, input);

// node_modules/@react-three/drei/core/Helper.js
var React63 = __toESM(require_react());
function useHelper(object3D, helperConstructor, ...args) {
  const helper = React63.useRef(null);
  const scene = useThree((state) => state.scene);
  React63.useLayoutEffect(() => {
    let currentHelper = void 0;
    if (object3D && object3D != null && object3D.current && helperConstructor) {
      helper.current = currentHelper = new helperConstructor(object3D.current, ...args);
    }
    if (currentHelper) {
      currentHelper.traverse((child) => child.raycast = () => null);
      scene.add(currentHelper);
      return () => {
        helper.current = void 0;
        scene.remove(currentHelper);
        currentHelper.dispose == null || currentHelper.dispose();
      };
    }
  }, [scene, helperConstructor, object3D, ...args]);
  useFrame(() => {
    var _helper$current;
    return void ((_helper$current = helper.current) == null || _helper$current.update == null ? void 0 : _helper$current.update());
  });
  return helper;
}
var Helper = ({
  type: helperConstructor,
  args = []
}) => {
  const thisRef = React63.useRef(null);
  const parentRef = React63.useRef(null);
  React63.useLayoutEffect(() => {
    parentRef.current = thisRef.current.parent;
  });
  useHelper(parentRef, helperConstructor, ...args);
  return React63.createElement("object3D", {
    ref: thisRef
  });
};

// node_modules/@react-three/drei/core/Stats.js
var React65 = __toESM(require_react());
var import_stats = __toESM(require_stats_min());

// node_modules/@react-three/drei/helpers/useEffectfulState.js
var React64 = __toESM(require_react());
function call(ref, value) {
  if (typeof ref === "function") ref(value);
  else if (ref != null) ref.current = value;
}
function useEffectfulState(fn, deps = [], cb) {
  const [state, set] = React64.useState();
  React64.useLayoutEffect(() => {
    const value = fn();
    set(value);
    call(cb, value);
    return () => call(cb, null);
  }, deps);
  return state;
}

// node_modules/@react-three/drei/core/Stats.js
function Stats2({
  showPanel = 0,
  className,
  parent
}) {
  const stats = useEffectfulState(() => new import_stats.default(), []);
  React65.useEffect(() => {
    if (stats) {
      const node = parent && parent.current || document.body;
      stats.showPanel(showPanel);
      node == null || node.appendChild(stats.dom);
      const classNames = (className !== null && className !== void 0 ? className : "").split(" ").filter((cls) => cls);
      if (classNames.length) stats.dom.classList.add(...classNames);
      const begin = addEffect(() => stats.begin());
      const end = addAfterEffect(() => stats.end());
      return () => {
        if (classNames.length) stats.dom.classList.remove(...classNames);
        node == null || node.removeChild(stats.dom);
        begin();
        end();
      };
    }
  }, [parent, stats, className, showPanel]);
  return null;
}

// node_modules/@react-three/drei/core/StatsGl.js
var React66 = __toESM(require_react());
var StatsGl = React66.forwardRef(function StatsGl2({
  className,
  parent,
  id,
  clearStatsGlStyle,
  ...props
}, fref) {
  const gl = useThree((state) => state.gl);
  const stats = React66.useMemo(() => {
    const stats2 = new Stats({
      ...props
    });
    stats2.init(gl);
    return stats2;
  }, [gl]);
  React66.useImperativeHandle(fref, () => stats.domElement, [stats]);
  React66.useEffect(() => {
    if (stats) {
      const node = parent && parent.current || document.body;
      node == null || node.appendChild(stats.domElement);
      stats.domElement.querySelectorAll("canvas").forEach((canvas) => {
        canvas.style.removeProperty("position");
      });
      if (id) stats.domElement.id = id;
      if (clearStatsGlStyle) stats.domElement.removeAttribute("style");
      stats.domElement.removeAttribute("style");
      const classNames = (className !== null && className !== void 0 ? className : "").split(" ").filter((cls) => cls);
      if (classNames.length) stats.domElement.classList.add(...classNames);
      const end = addAfterEffect(() => stats.update());
      return () => {
        if (classNames.length) stats.domElement.classList.remove(...classNames);
        node == null || node.removeChild(stats.domElement);
        end();
      };
    }
  }, [parent, stats, className, id, clearStatsGlStyle]);
  return null;
});

// node_modules/@react-three/drei/core/useDepthBuffer.js
var React67 = __toESM(require_react());
function useDepthBuffer({
  size = 256,
  frames = Infinity
} = {}) {
  const dpr = useThree((state) => state.viewport.dpr);
  const {
    width,
    height
  } = useThree((state) => state.size);
  const w = size || width * dpr;
  const h = size || height * dpr;
  const depthConfig = React67.useMemo(() => {
    const depthTexture = new DepthTexture(w, h);
    depthTexture.format = DepthFormat;
    depthTexture.type = UnsignedShortType;
    return {
      depthTexture
    };
  }, [w, h]);
  let count = 0;
  const depthFBO = useFBO(w, h, depthConfig);
  useFrame((state) => {
    if (frames === Infinity || count < frames) {
      state.gl.setRenderTarget(depthFBO);
      state.gl.render(state.scene, state.camera);
      state.gl.setRenderTarget(null);
      count++;
    }
  });
  return depthFBO.depthTexture;
}

// node_modules/@react-three/drei/core/useAspect.js
function useAspect(width, height, factor = 1) {
  const v5 = useThree((state) => state.viewport);
  const adaptedHeight = height * (v5.aspect > width / height ? v5.width / width : v5.height / height);
  const adaptedWidth = width * (v5.aspect > width / height ? v5.width / width : v5.height / height);
  return [adaptedWidth * factor, adaptedHeight * factor, 1];
}

// node_modules/@react-three/drei/core/useCamera.js
var React68 = __toESM(require_react());
function useCamera(camera, props) {
  const pointer = useThree((state) => state.pointer);
  const [raycast2] = React68.useState(() => {
    const raycaster = new Raycaster();
    if (props) applyProps(raycaster, props);
    return function(_, intersects) {
      raycaster.setFromCamera(pointer, camera instanceof Camera ? camera : camera.current);
      const rc = this.constructor.prototype.raycast.bind(this);
      if (rc) rc(raycaster, intersects);
    };
  });
  return raycast2;
}

// node_modules/@react-three/drei/core/DetectGPU.js
var React69 = __toESM(require_react());
var useDetectGPU = (props) => suspend(() => f(props), ["useDetectGPU"]);
function DetectGPU({
  children,
  ...options
}) {
  const result = useDetectGPU(options);
  return React69.createElement(React69.Fragment, null, children == null ? void 0 : children(result));
}

// node_modules/@react-three/drei/core/Bvh.js
var React70 = __toESM(require_react());

// node_modules/three-mesh-bvh/src/core/Constants.js
var CENTER = 0;
var AVERAGE = 1;
var SAH = 2;
var CONTAINED = 2;
var TRIANGLE_INTERSECT_COST = 1.25;
var TRAVERSAL_COST = 1;
var BYTES_PER_NODE = 6 * 4 + 4 + 4;
var IS_LEAFNODE_FLAG = 65535;
var FLOAT32_EPSILON = Math.pow(2, -24);
var SKIP_GENERATION = Symbol("SKIP_GENERATION");

// node_modules/three-mesh-bvh/src/core/build/geometryUtils.js
function getVertexCount(geo) {
  return geo.index ? geo.index.count : geo.attributes.position.count;
}
function getTriCount(geo) {
  return getVertexCount(geo) / 3;
}
function getIndexArray(vertexCount, BufferConstructor = ArrayBuffer) {
  if (vertexCount > 65535) {
    return new Uint32Array(new BufferConstructor(4 * vertexCount));
  } else {
    return new Uint16Array(new BufferConstructor(2 * vertexCount));
  }
}
function ensureIndex(geo, options) {
  if (!geo.index) {
    const vertexCount = geo.attributes.position.count;
    const BufferConstructor = options.useSharedArrayBuffer ? SharedArrayBuffer : ArrayBuffer;
    const index = getIndexArray(vertexCount, BufferConstructor);
    geo.setIndex(new BufferAttribute(index, 1));
    for (let i2 = 0; i2 < vertexCount; i2++) {
      index[i2] = i2;
    }
  }
}
function getFullGeometryRange(geo, range) {
  const triCount = getTriCount(geo);
  const drawRange = range ? range : geo.drawRange;
  const start = drawRange.start / 3;
  const end = (drawRange.start + drawRange.count) / 3;
  const offset = Math.max(0, start);
  const count = Math.min(triCount, end) - offset;
  return [{
    offset: Math.floor(offset),
    count: Math.floor(count)
  }];
}
function getRootIndexRanges(geo, range) {
  if (!geo.groups || !geo.groups.length) {
    return getFullGeometryRange(geo, range);
  }
  const ranges = [];
  const rangeBoundaries = /* @__PURE__ */ new Set();
  const drawRange = range ? range : geo.drawRange;
  const drawRangeStart = drawRange.start / 3;
  const drawRangeEnd = (drawRange.start + drawRange.count) / 3;
  for (const group of geo.groups) {
    const groupStart = group.start / 3;
    const groupEnd = (group.start + group.count) / 3;
    rangeBoundaries.add(Math.max(drawRangeStart, groupStart));
    rangeBoundaries.add(Math.min(drawRangeEnd, groupEnd));
  }
  const sortedBoundaries = Array.from(rangeBoundaries.values()).sort((a, b) => a - b);
  for (let i2 = 0; i2 < sortedBoundaries.length - 1; i2++) {
    const start = sortedBoundaries[i2];
    const end = sortedBoundaries[i2 + 1];
    ranges.push({
      offset: Math.floor(start),
      count: Math.floor(end - start)
    });
  }
  return ranges;
}
function hasGroupGaps(geometry2, range) {
  const vertexCount = getTriCount(geometry2);
  const groups = getRootIndexRanges(geometry2, range).sort((a, b) => a.offset - b.offset);
  const finalGroup = groups[groups.length - 1];
  finalGroup.count = Math.min(vertexCount - finalGroup.offset, finalGroup.count);
  let total = 0;
  groups.forEach(({ count }) => total += count);
  return vertexCount !== total;
}

// node_modules/three-mesh-bvh/src/core/build/computeBoundsUtils.js
function getBounds(triangleBounds, offset, count, target2, centroidTarget) {
  let minx = Infinity;
  let miny = Infinity;
  let minz = Infinity;
  let maxx = -Infinity;
  let maxy = -Infinity;
  let maxz = -Infinity;
  let cminx = Infinity;
  let cminy = Infinity;
  let cminz = Infinity;
  let cmaxx = -Infinity;
  let cmaxy = -Infinity;
  let cmaxz = -Infinity;
  for (let i2 = offset * 6, end = (offset + count) * 6; i2 < end; i2 += 6) {
    const cx = triangleBounds[i2 + 0];
    const hx = triangleBounds[i2 + 1];
    const lx = cx - hx;
    const rx = cx + hx;
    if (lx < minx) minx = lx;
    if (rx > maxx) maxx = rx;
    if (cx < cminx) cminx = cx;
    if (cx > cmaxx) cmaxx = cx;
    const cy = triangleBounds[i2 + 2];
    const hy = triangleBounds[i2 + 3];
    const ly = cy - hy;
    const ry = cy + hy;
    if (ly < miny) miny = ly;
    if (ry > maxy) maxy = ry;
    if (cy < cminy) cminy = cy;
    if (cy > cmaxy) cmaxy = cy;
    const cz = triangleBounds[i2 + 4];
    const hz = triangleBounds[i2 + 5];
    const lz = cz - hz;
    const rz = cz + hz;
    if (lz < minz) minz = lz;
    if (rz > maxz) maxz = rz;
    if (cz < cminz) cminz = cz;
    if (cz > cmaxz) cmaxz = cz;
  }
  target2[0] = minx;
  target2[1] = miny;
  target2[2] = minz;
  target2[3] = maxx;
  target2[4] = maxy;
  target2[5] = maxz;
  centroidTarget[0] = cminx;
  centroidTarget[1] = cminy;
  centroidTarget[2] = cminz;
  centroidTarget[3] = cmaxx;
  centroidTarget[4] = cmaxy;
  centroidTarget[5] = cmaxz;
}
function computeTriangleBounds(geo, target2 = null, offset = null, count = null) {
  const posAttr = geo.attributes.position;
  const index = geo.index ? geo.index.array : null;
  const triCount = getTriCount(geo);
  const normalized = posAttr.normalized;
  let triangleBounds;
  if (target2 === null) {
    triangleBounds = new Float32Array(triCount * 6);
    offset = 0;
    count = triCount;
  } else {
    triangleBounds = target2;
    offset = offset || 0;
    count = count || triCount;
  }
  const posArr = posAttr.array;
  const bufferOffset = posAttr.offset || 0;
  let stride = 3;
  if (posAttr.isInterleavedBufferAttribute) {
    stride = posAttr.data.stride;
  }
  const getters = ["getX", "getY", "getZ"];
  for (let tri = offset; tri < offset + count; tri++) {
    const tri3 = tri * 3;
    const tri6 = tri * 6;
    let ai = tri3 + 0;
    let bi = tri3 + 1;
    let ci = tri3 + 2;
    if (index) {
      ai = index[ai];
      bi = index[bi];
      ci = index[ci];
    }
    if (!normalized) {
      ai = ai * stride + bufferOffset;
      bi = bi * stride + bufferOffset;
      ci = ci * stride + bufferOffset;
    }
    for (let el = 0; el < 3; el++) {
      let a, b, c;
      if (normalized) {
        a = posAttr[getters[el]](ai);
        b = posAttr[getters[el]](bi);
        c = posAttr[getters[el]](ci);
      } else {
        a = posArr[ai + el];
        b = posArr[bi + el];
        c = posArr[ci + el];
      }
      let min = a;
      if (b < min) min = b;
      if (c < min) min = c;
      let max = a;
      if (b > max) max = b;
      if (c > max) max = c;
      const halfExtents = (max - min) / 2;
      const el2 = el * 2;
      triangleBounds[tri6 + el2 + 0] = min + halfExtents;
      triangleBounds[tri6 + el2 + 1] = halfExtents + (Math.abs(min) + halfExtents) * FLOAT32_EPSILON;
    }
  }
  return triangleBounds;
}

// node_modules/three-mesh-bvh/src/utils/ArrayBoxUtilities.js
function arrayToBox(nodeIndex32, array, target2) {
  target2.min.x = array[nodeIndex32];
  target2.min.y = array[nodeIndex32 + 1];
  target2.min.z = array[nodeIndex32 + 2];
  target2.max.x = array[nodeIndex32 + 3];
  target2.max.y = array[nodeIndex32 + 4];
  target2.max.z = array[nodeIndex32 + 5];
  return target2;
}
function getLongestEdgeIndex(bounds) {
  let splitDimIdx = -1;
  let splitDist = -Infinity;
  for (let i2 = 0; i2 < 3; i2++) {
    const dist = bounds[i2 + 3] - bounds[i2];
    if (dist > splitDist) {
      splitDist = dist;
      splitDimIdx = i2;
    }
  }
  return splitDimIdx;
}
function copyBounds(source, target2) {
  target2.set(source);
}
function unionBounds(a, b, target2) {
  let aVal, bVal;
  for (let d = 0; d < 3; d++) {
    const d3 = d + 3;
    aVal = a[d];
    bVal = b[d];
    target2[d] = aVal < bVal ? aVal : bVal;
    aVal = a[d3];
    bVal = b[d3];
    target2[d3] = aVal > bVal ? aVal : bVal;
  }
}
function expandByTriangleBounds(startIndex, triangleBounds, bounds) {
  for (let d = 0; d < 3; d++) {
    const tCenter = triangleBounds[startIndex + 2 * d];
    const tHalf = triangleBounds[startIndex + 2 * d + 1];
    const tMin = tCenter - tHalf;
    const tMax = tCenter + tHalf;
    if (tMin < bounds[d]) {
      bounds[d] = tMin;
    }
    if (tMax > bounds[d + 3]) {
      bounds[d + 3] = tMax;
    }
  }
}
function computeSurfaceArea(bounds) {
  const d0 = bounds[3] - bounds[0];
  const d1 = bounds[4] - bounds[1];
  const d2 = bounds[5] - bounds[2];
  return 2 * (d0 * d1 + d1 * d2 + d2 * d0);
}

// node_modules/three-mesh-bvh/src/core/build/splitUtils.js
var BIN_COUNT = 32;
var binsSort = (a, b) => a.candidate - b.candidate;
var sahBins = new Array(BIN_COUNT).fill().map(() => {
  return {
    count: 0,
    bounds: new Float32Array(6),
    rightCacheBounds: new Float32Array(6),
    leftCacheBounds: new Float32Array(6),
    candidate: 0
  };
});
var leftBounds = new Float32Array(6);
function getOptimalSplit(nodeBoundingData, centroidBoundingData, triangleBounds, offset, count, strategy) {
  let axis = -1;
  let pos = 0;
  if (strategy === CENTER) {
    axis = getLongestEdgeIndex(centroidBoundingData);
    if (axis !== -1) {
      pos = (centroidBoundingData[axis] + centroidBoundingData[axis + 3]) / 2;
    }
  } else if (strategy === AVERAGE) {
    axis = getLongestEdgeIndex(nodeBoundingData);
    if (axis !== -1) {
      pos = getAverage(triangleBounds, offset, count, axis);
    }
  } else if (strategy === SAH) {
    const rootSurfaceArea = computeSurfaceArea(nodeBoundingData);
    let bestCost = TRIANGLE_INTERSECT_COST * count;
    const cStart = offset * 6;
    const cEnd = (offset + count) * 6;
    for (let a = 0; a < 3; a++) {
      const axisLeft = centroidBoundingData[a];
      const axisRight = centroidBoundingData[a + 3];
      const axisLength = axisRight - axisLeft;
      const binWidth = axisLength / BIN_COUNT;
      if (count < BIN_COUNT / 4) {
        const truncatedBins = [...sahBins];
        truncatedBins.length = count;
        let b = 0;
        for (let c = cStart; c < cEnd; c += 6, b++) {
          const bin = truncatedBins[b];
          bin.candidate = triangleBounds[c + 2 * a];
          bin.count = 0;
          const {
            bounds,
            leftCacheBounds,
            rightCacheBounds
          } = bin;
          for (let d = 0; d < 3; d++) {
            rightCacheBounds[d] = Infinity;
            rightCacheBounds[d + 3] = -Infinity;
            leftCacheBounds[d] = Infinity;
            leftCacheBounds[d + 3] = -Infinity;
            bounds[d] = Infinity;
            bounds[d + 3] = -Infinity;
          }
          expandByTriangleBounds(c, triangleBounds, bounds);
        }
        truncatedBins.sort(binsSort);
        let splitCount = count;
        for (let bi = 0; bi < splitCount; bi++) {
          const bin = truncatedBins[bi];
          while (bi + 1 < splitCount && truncatedBins[bi + 1].candidate === bin.candidate) {
            truncatedBins.splice(bi + 1, 1);
            splitCount--;
          }
        }
        for (let c = cStart; c < cEnd; c += 6) {
          const center = triangleBounds[c + 2 * a];
          for (let bi = 0; bi < splitCount; bi++) {
            const bin = truncatedBins[bi];
            if (center >= bin.candidate) {
              expandByTriangleBounds(c, triangleBounds, bin.rightCacheBounds);
            } else {
              expandByTriangleBounds(c, triangleBounds, bin.leftCacheBounds);
              bin.count++;
            }
          }
        }
        for (let bi = 0; bi < splitCount; bi++) {
          const bin = truncatedBins[bi];
          const leftCount = bin.count;
          const rightCount = count - bin.count;
          const leftBounds2 = bin.leftCacheBounds;
          const rightBounds = bin.rightCacheBounds;
          let leftProb = 0;
          if (leftCount !== 0) {
            leftProb = computeSurfaceArea(leftBounds2) / rootSurfaceArea;
          }
          let rightProb = 0;
          if (rightCount !== 0) {
            rightProb = computeSurfaceArea(rightBounds) / rootSurfaceArea;
          }
          const cost = TRAVERSAL_COST + TRIANGLE_INTERSECT_COST * (leftProb * leftCount + rightProb * rightCount);
          if (cost < bestCost) {
            axis = a;
            bestCost = cost;
            pos = bin.candidate;
          }
        }
      } else {
        for (let i2 = 0; i2 < BIN_COUNT; i2++) {
          const bin = sahBins[i2];
          bin.count = 0;
          bin.candidate = axisLeft + binWidth + i2 * binWidth;
          const bounds = bin.bounds;
          for (let d = 0; d < 3; d++) {
            bounds[d] = Infinity;
            bounds[d + 3] = -Infinity;
          }
        }
        for (let c = cStart; c < cEnd; c += 6) {
          const triCenter = triangleBounds[c + 2 * a];
          const relativeCenter = triCenter - axisLeft;
          let binIndex = ~~(relativeCenter / binWidth);
          if (binIndex >= BIN_COUNT) binIndex = BIN_COUNT - 1;
          const bin = sahBins[binIndex];
          bin.count++;
          expandByTriangleBounds(c, triangleBounds, bin.bounds);
        }
        const lastBin = sahBins[BIN_COUNT - 1];
        copyBounds(lastBin.bounds, lastBin.rightCacheBounds);
        for (let i2 = BIN_COUNT - 2; i2 >= 0; i2--) {
          const bin = sahBins[i2];
          const nextBin = sahBins[i2 + 1];
          unionBounds(bin.bounds, nextBin.rightCacheBounds, bin.rightCacheBounds);
        }
        let leftCount = 0;
        for (let i2 = 0; i2 < BIN_COUNT - 1; i2++) {
          const bin = sahBins[i2];
          const binCount = bin.count;
          const bounds = bin.bounds;
          const nextBin = sahBins[i2 + 1];
          const rightBounds = nextBin.rightCacheBounds;
          if (binCount !== 0) {
            if (leftCount === 0) {
              copyBounds(bounds, leftBounds);
            } else {
              unionBounds(bounds, leftBounds, leftBounds);
            }
          }
          leftCount += binCount;
          let leftProb = 0;
          let rightProb = 0;
          if (leftCount !== 0) {
            leftProb = computeSurfaceArea(leftBounds) / rootSurfaceArea;
          }
          const rightCount = count - leftCount;
          if (rightCount !== 0) {
            rightProb = computeSurfaceArea(rightBounds) / rootSurfaceArea;
          }
          const cost = TRAVERSAL_COST + TRIANGLE_INTERSECT_COST * (leftProb * leftCount + rightProb * rightCount);
          if (cost < bestCost) {
            axis = a;
            bestCost = cost;
            pos = bin.candidate;
          }
        }
      }
    }
  } else {
    console.warn(`MeshBVH: Invalid build strategy value ${strategy} used.`);
  }
  return { axis, pos };
}
function getAverage(triangleBounds, offset, count, axis) {
  let avg = 0;
  for (let i2 = offset, end = offset + count; i2 < end; i2++) {
    avg += triangleBounds[i2 * 6 + axis * 2];
  }
  return avg / count;
}

// node_modules/three-mesh-bvh/src/core/MeshBVHNode.js
var MeshBVHNode = class {
  constructor() {
    this.boundingData = new Float32Array(6);
  }
};

// node_modules/three-mesh-bvh/src/core/build/sortUtils.generated.js
function partition(indirectBuffer, index, triangleBounds, offset, count, split) {
  let left = offset;
  let right = offset + count - 1;
  const pos = split.pos;
  const axisOffset = split.axis * 2;
  while (true) {
    while (left <= right && triangleBounds[left * 6 + axisOffset] < pos) {
      left++;
    }
    while (left <= right && triangleBounds[right * 6 + axisOffset] >= pos) {
      right--;
    }
    if (left < right) {
      for (let i2 = 0; i2 < 3; i2++) {
        let t0 = index[left * 3 + i2];
        index[left * 3 + i2] = index[right * 3 + i2];
        index[right * 3 + i2] = t0;
      }
      for (let i2 = 0; i2 < 6; i2++) {
        let tb = triangleBounds[left * 6 + i2];
        triangleBounds[left * 6 + i2] = triangleBounds[right * 6 + i2];
        triangleBounds[right * 6 + i2] = tb;
      }
      left++;
      right--;
    } else {
      return left;
    }
  }
}

// node_modules/three-mesh-bvh/src/core/build/sortUtils_indirect.generated.js
function partition_indirect(indirectBuffer, index, triangleBounds, offset, count, split) {
  let left = offset;
  let right = offset + count - 1;
  const pos = split.pos;
  const axisOffset = split.axis * 2;
  while (true) {
    while (left <= right && triangleBounds[left * 6 + axisOffset] < pos) {
      left++;
    }
    while (left <= right && triangleBounds[right * 6 + axisOffset] >= pos) {
      right--;
    }
    if (left < right) {
      let t = indirectBuffer[left];
      indirectBuffer[left] = indirectBuffer[right];
      indirectBuffer[right] = t;
      for (let i2 = 0; i2 < 6; i2++) {
        let tb = triangleBounds[left * 6 + i2];
        triangleBounds[left * 6 + i2] = triangleBounds[right * 6 + i2];
        triangleBounds[right * 6 + i2] = tb;
      }
      left++;
      right--;
    } else {
      return left;
    }
  }
}

// node_modules/three-mesh-bvh/src/core/utils/nodeBufferUtils.js
function IS_LEAF(n16, uint16Array2) {
  return uint16Array2[n16 + 15] === 65535;
}
function OFFSET(n32, uint32Array2) {
  return uint32Array2[n32 + 6];
}
function COUNT(n16, uint16Array2) {
  return uint16Array2[n16 + 14];
}
function LEFT_NODE(n32) {
  return n32 + 8;
}
function RIGHT_NODE(n32, uint32Array2) {
  return uint32Array2[n32 + 6];
}
function SPLIT_AXIS(n32, uint32Array2) {
  return uint32Array2[n32 + 7];
}
function BOUNDING_DATA_INDEX(n32) {
  return n32;
}

// node_modules/three-mesh-bvh/src/core/build/buildUtils.js
var float32Array;
var uint32Array;
var uint16Array;
var uint8Array;
var MAX_POINTER = Math.pow(2, 32);
function countNodes(node) {
  if ("count" in node) {
    return 1;
  } else {
    return 1 + countNodes(node.left) + countNodes(node.right);
  }
}
function populateBuffer(byteOffset, node, buffer) {
  float32Array = new Float32Array(buffer);
  uint32Array = new Uint32Array(buffer);
  uint16Array = new Uint16Array(buffer);
  uint8Array = new Uint8Array(buffer);
  return _populateBuffer(byteOffset, node);
}
function _populateBuffer(byteOffset, node) {
  const stride4Offset = byteOffset / 4;
  const stride2Offset = byteOffset / 2;
  const isLeaf = "count" in node;
  const boundingData = node.boundingData;
  for (let i2 = 0; i2 < 6; i2++) {
    float32Array[stride4Offset + i2] = boundingData[i2];
  }
  if (isLeaf) {
    if (node.buffer) {
      const buffer = node.buffer;
      uint8Array.set(new Uint8Array(buffer), byteOffset);
      for (let offset = byteOffset, l = byteOffset + buffer.byteLength; offset < l; offset += BYTES_PER_NODE) {
        const offset2 = offset / 2;
        if (!IS_LEAF(offset2, uint16Array)) {
          uint32Array[offset / 4 + 6] += stride4Offset;
        }
      }
      return byteOffset + buffer.byteLength;
    } else {
      const offset = node.offset;
      const count = node.count;
      uint32Array[stride4Offset + 6] = offset;
      uint16Array[stride2Offset + 14] = count;
      uint16Array[stride2Offset + 15] = IS_LEAFNODE_FLAG;
      return byteOffset + BYTES_PER_NODE;
    }
  } else {
    const left = node.left;
    const right = node.right;
    const splitAxis = node.splitAxis;
    let nextUnusedPointer;
    nextUnusedPointer = _populateBuffer(byteOffset + BYTES_PER_NODE, left);
    if (nextUnusedPointer / 4 > MAX_POINTER) {
      throw new Error("MeshBVH: Cannot store child pointer greater than 32 bits.");
    }
    uint32Array[stride4Offset + 6] = nextUnusedPointer / 4;
    nextUnusedPointer = _populateBuffer(nextUnusedPointer, right);
    uint32Array[stride4Offset + 7] = splitAxis;
    return nextUnusedPointer;
  }
}

// node_modules/three-mesh-bvh/src/core/build/buildTree.js
function generateIndirectBuffer(geometry2, useSharedArrayBuffer) {
  const triCount = (geometry2.index ? geometry2.index.count : geometry2.attributes.position.count) / 3;
  const useUint32 = triCount > 2 ** 16;
  const byteCount = useUint32 ? 4 : 2;
  const buffer = useSharedArrayBuffer ? new SharedArrayBuffer(triCount * byteCount) : new ArrayBuffer(triCount * byteCount);
  const indirectBuffer = useUint32 ? new Uint32Array(buffer) : new Uint16Array(buffer);
  for (let i2 = 0, l = indirectBuffer.length; i2 < l; i2++) {
    indirectBuffer[i2] = i2;
  }
  return indirectBuffer;
}
function buildTree(bvh, triangleBounds, offset, count, options) {
  const {
    maxDepth,
    verbose,
    maxLeafTris,
    strategy,
    onProgress,
    indirect
  } = options;
  const indirectBuffer = bvh._indirectBuffer;
  const geometry2 = bvh.geometry;
  const indexArray = geometry2.index ? geometry2.index.array : null;
  const partionFunc = indirect ? partition_indirect : partition;
  const totalTriangles = getTriCount(geometry2);
  const cacheCentroidBoundingData = new Float32Array(6);
  let reachedMaxDepth = false;
  const root = new MeshBVHNode();
  getBounds(triangleBounds, offset, count, root.boundingData, cacheCentroidBoundingData);
  splitNode(root, offset, count, cacheCentroidBoundingData);
  return root;
  function triggerProgress(trianglesProcessed) {
    if (onProgress) {
      onProgress(trianglesProcessed / totalTriangles);
    }
  }
  function splitNode(node, offset2, count2, centroidBoundingData = null, depth = 0) {
    if (!reachedMaxDepth && depth >= maxDepth) {
      reachedMaxDepth = true;
      if (verbose) {
        console.warn(`MeshBVH: Max depth of ${maxDepth} reached when generating BVH. Consider increasing maxDepth.`);
        console.warn(geometry2);
      }
    }
    if (count2 <= maxLeafTris || depth >= maxDepth) {
      triggerProgress(offset2 + count2);
      node.offset = offset2;
      node.count = count2;
      return node;
    }
    const split = getOptimalSplit(node.boundingData, centroidBoundingData, triangleBounds, offset2, count2, strategy);
    if (split.axis === -1) {
      triggerProgress(offset2 + count2);
      node.offset = offset2;
      node.count = count2;
      return node;
    }
    const splitOffset = partionFunc(indirectBuffer, indexArray, triangleBounds, offset2, count2, split);
    if (splitOffset === offset2 || splitOffset === offset2 + count2) {
      triggerProgress(offset2 + count2);
      node.offset = offset2;
      node.count = count2;
    } else {
      node.splitAxis = split.axis;
      const left = new MeshBVHNode();
      const lstart = offset2;
      const lcount = splitOffset - offset2;
      node.left = left;
      getBounds(triangleBounds, lstart, lcount, left.boundingData, cacheCentroidBoundingData);
      splitNode(left, lstart, lcount, cacheCentroidBoundingData, depth + 1);
      const right = new MeshBVHNode();
      const rstart = splitOffset;
      const rcount = count2 - lcount;
      node.right = right;
      getBounds(triangleBounds, rstart, rcount, right.boundingData, cacheCentroidBoundingData);
      splitNode(right, rstart, rcount, cacheCentroidBoundingData, depth + 1);
    }
    return node;
  }
}
function buildPackedTree(bvh, options) {
  const geometry2 = bvh.geometry;
  if (options.indirect) {
    bvh._indirectBuffer = generateIndirectBuffer(geometry2, options.useSharedArrayBuffer);
    if (hasGroupGaps(geometry2, options.range) && !options.verbose) {
      console.warn(
        'MeshBVH: Provided geometry contains groups or a range that do not fully span the vertex contents while using the "indirect" option. BVH may incorrectly report intersections on unrendered portions of the geometry.'
      );
    }
  }
  if (!bvh._indirectBuffer) {
    ensureIndex(geometry2, options);
  }
  const BufferConstructor = options.useSharedArrayBuffer ? SharedArrayBuffer : ArrayBuffer;
  const triangleBounds = computeTriangleBounds(geometry2);
  const geometryRanges = options.indirect ? getFullGeometryRange(geometry2, options.range) : getRootIndexRanges(geometry2, options.range);
  bvh._roots = geometryRanges.map((range) => {
    const root = buildTree(bvh, triangleBounds, range.offset, range.count, options);
    const nodeCount = countNodes(root);
    const buffer = new BufferConstructor(BYTES_PER_NODE * nodeCount);
    populateBuffer(0, root, buffer);
    return buffer;
  });
}

// node_modules/three-mesh-bvh/src/math/SeparatingAxisBounds.js
var SeparatingAxisBounds = class {
  constructor() {
    this.min = Infinity;
    this.max = -Infinity;
  }
  setFromPointsField(points, field) {
    let min = Infinity;
    let max = -Infinity;
    for (let i2 = 0, l = points.length; i2 < l; i2++) {
      const p = points[i2];
      const val = p[field];
      min = val < min ? val : min;
      max = val > max ? val : max;
    }
    this.min = min;
    this.max = max;
  }
  setFromPoints(axis, points) {
    let min = Infinity;
    let max = -Infinity;
    for (let i2 = 0, l = points.length; i2 < l; i2++) {
      const p = points[i2];
      const val = axis.dot(p);
      min = val < min ? val : min;
      max = val > max ? val : max;
    }
    this.min = min;
    this.max = max;
  }
  isSeparated(other) {
    return this.min > other.max || other.min > this.max;
  }
};
SeparatingAxisBounds.prototype.setFromBox = (function() {
  const p = new Vector3();
  return function setFromBox(axis, box) {
    const boxMin = box.min;
    const boxMax = box.max;
    let min = Infinity;
    let max = -Infinity;
    for (let x = 0; x <= 1; x++) {
      for (let y = 0; y <= 1; y++) {
        for (let z = 0; z <= 1; z++) {
          p.x = boxMin.x * x + boxMax.x * (1 - x);
          p.y = boxMin.y * y + boxMax.y * (1 - y);
          p.z = boxMin.z * z + boxMax.z * (1 - z);
          const val = axis.dot(p);
          min = Math.min(val, min);
          max = Math.max(val, max);
        }
      }
    }
    this.min = min;
    this.max = max;
  };
})();
var areIntersecting = (function() {
  const cacheSatBounds = new SeparatingAxisBounds();
  return function areIntersecting2(shape1, shape2) {
    const points1 = shape1.points;
    const satAxes1 = shape1.satAxes;
    const satBounds1 = shape1.satBounds;
    const points2 = shape2.points;
    const satAxes2 = shape2.satAxes;
    const satBounds2 = shape2.satBounds;
    for (let i2 = 0; i2 < 3; i2++) {
      const sb = satBounds1[i2];
      const sa = satAxes1[i2];
      cacheSatBounds.setFromPoints(sa, points2);
      if (sb.isSeparated(cacheSatBounds)) return false;
    }
    for (let i2 = 0; i2 < 3; i2++) {
      const sb = satBounds2[i2];
      const sa = satAxes2[i2];
      cacheSatBounds.setFromPoints(sa, points1);
      if (sb.isSeparated(cacheSatBounds)) return false;
    }
  };
})();

// node_modules/three-mesh-bvh/src/math/MathUtilities.js
var closestPointLineToLine = (function() {
  const dir1 = new Vector3();
  const dir2 = new Vector3();
  const v02 = new Vector3();
  return function closestPointLineToLine2(l1, l2, result) {
    const v0 = l1.start;
    const v10 = dir1;
    const v22 = l2.start;
    const v32 = dir2;
    v02.subVectors(v0, v22);
    dir1.subVectors(l1.end, l1.start);
    dir2.subVectors(l2.end, l2.start);
    const d0232 = v02.dot(v32);
    const d3210 = v32.dot(v10);
    const d3232 = v32.dot(v32);
    const d0210 = v02.dot(v10);
    const d1010 = v10.dot(v10);
    const denom = d1010 * d3232 - d3210 * d3210;
    let d, d2;
    if (denom !== 0) {
      d = (d0232 * d3210 - d0210 * d3232) / denom;
    } else {
      d = 0;
    }
    d2 = (d0232 + d * d3210) / d3232;
    result.x = d;
    result.y = d2;
  };
})();
var closestPointsSegmentToSegment = (function() {
  const paramResult = new Vector2();
  const temp14 = new Vector3();
  const temp23 = new Vector3();
  return function closestPointsSegmentToSegment2(l1, l2, target1, target2) {
    closestPointLineToLine(l1, l2, paramResult);
    let d = paramResult.x;
    let d2 = paramResult.y;
    if (d >= 0 && d <= 1 && d2 >= 0 && d2 <= 1) {
      l1.at(d, target1);
      l2.at(d2, target2);
      return;
    } else if (d >= 0 && d <= 1) {
      if (d2 < 0) {
        l2.at(0, target2);
      } else {
        l2.at(1, target2);
      }
      l1.closestPointToPoint(target2, true, target1);
      return;
    } else if (d2 >= 0 && d2 <= 1) {
      if (d < 0) {
        l1.at(0, target1);
      } else {
        l1.at(1, target1);
      }
      l2.closestPointToPoint(target1, true, target2);
      return;
    } else {
      let p;
      if (d < 0) {
        p = l1.start;
      } else {
        p = l1.end;
      }
      let p2;
      if (d2 < 0) {
        p2 = l2.start;
      } else {
        p2 = l2.end;
      }
      const closestPoint = temp14;
      const closestPoint2 = temp23;
      l1.closestPointToPoint(p2, true, temp14);
      l2.closestPointToPoint(p, true, temp23);
      if (closestPoint.distanceToSquared(p2) <= closestPoint2.distanceToSquared(p)) {
        target1.copy(closestPoint);
        target2.copy(p2);
        return;
      } else {
        target1.copy(p);
        target2.copy(closestPoint2);
        return;
      }
    }
  };
})();
var sphereIntersectTriangle = (function() {
  const closestPointTemp = new Vector3();
  const projectedPointTemp = new Vector3();
  const planeTemp = new Plane();
  const lineTemp = new Line3();
  return function sphereIntersectTriangle2(sphere, triangle4) {
    const { radius, center } = sphere;
    const { a, b, c } = triangle4;
    lineTemp.start = a;
    lineTemp.end = b;
    const closestPoint1 = lineTemp.closestPointToPoint(center, true, closestPointTemp);
    if (closestPoint1.distanceTo(center) <= radius) return true;
    lineTemp.start = a;
    lineTemp.end = c;
    const closestPoint2 = lineTemp.closestPointToPoint(center, true, closestPointTemp);
    if (closestPoint2.distanceTo(center) <= radius) return true;
    lineTemp.start = b;
    lineTemp.end = c;
    const closestPoint3 = lineTemp.closestPointToPoint(center, true, closestPointTemp);
    if (closestPoint3.distanceTo(center) <= radius) return true;
    const plane = triangle4.getPlane(planeTemp);
    const dp = Math.abs(plane.distanceToPoint(center));
    if (dp <= radius) {
      const pp = plane.projectPoint(center, projectedPointTemp);
      const cp = triangle4.containsPoint(pp);
      if (cp) return true;
    }
    return false;
  };
})();

// node_modules/three-mesh-bvh/src/math/ExtendedTriangle.js
var ZERO_EPSILON = 1e-15;
function isNearZero(value) {
  return Math.abs(value) < ZERO_EPSILON;
}
var ExtendedTriangle = class extends Triangle {
  constructor(...args) {
    super(...args);
    this.isExtendedTriangle = true;
    this.satAxes = new Array(4).fill().map(() => new Vector3());
    this.satBounds = new Array(4).fill().map(() => new SeparatingAxisBounds());
    this.points = [this.a, this.b, this.c];
    this.sphere = new Sphere();
    this.plane = new Plane();
    this.needsUpdate = true;
  }
  intersectsSphere(sphere) {
    return sphereIntersectTriangle(sphere, this);
  }
  update() {
    const a = this.a;
    const b = this.b;
    const c = this.c;
    const points = this.points;
    const satAxes = this.satAxes;
    const satBounds = this.satBounds;
    const axis0 = satAxes[0];
    const sab0 = satBounds[0];
    this.getNormal(axis0);
    sab0.setFromPoints(axis0, points);
    const axis1 = satAxes[1];
    const sab1 = satBounds[1];
    axis1.subVectors(a, b);
    sab1.setFromPoints(axis1, points);
    const axis2 = satAxes[2];
    const sab2 = satBounds[2];
    axis2.subVectors(b, c);
    sab2.setFromPoints(axis2, points);
    const axis3 = satAxes[3];
    const sab3 = satBounds[3];
    axis3.subVectors(c, a);
    sab3.setFromPoints(axis3, points);
    this.sphere.setFromPoints(this.points);
    this.plane.setFromNormalAndCoplanarPoint(axis0, a);
    this.needsUpdate = false;
  }
};
ExtendedTriangle.prototype.closestPointToSegment = (function() {
  const point1 = new Vector3();
  const point2 = new Vector3();
  const edge = new Line3();
  return function distanceToSegment(segment, target1 = null, target2 = null) {
    const { start, end } = segment;
    const points = this.points;
    let distSq;
    let closestDistanceSq = Infinity;
    for (let i2 = 0; i2 < 3; i2++) {
      const nexti = (i2 + 1) % 3;
      edge.start.copy(points[i2]);
      edge.end.copy(points[nexti]);
      closestPointsSegmentToSegment(edge, segment, point1, point2);
      distSq = point1.distanceToSquared(point2);
      if (distSq < closestDistanceSq) {
        closestDistanceSq = distSq;
        if (target1) target1.copy(point1);
        if (target2) target2.copy(point2);
      }
    }
    this.closestPointToPoint(start, point1);
    distSq = start.distanceToSquared(point1);
    if (distSq < closestDistanceSq) {
      closestDistanceSq = distSq;
      if (target1) target1.copy(point1);
      if (target2) target2.copy(start);
    }
    this.closestPointToPoint(end, point1);
    distSq = end.distanceToSquared(point1);
    if (distSq < closestDistanceSq) {
      closestDistanceSq = distSq;
      if (target1) target1.copy(point1);
      if (target2) target2.copy(end);
    }
    return Math.sqrt(closestDistanceSq);
  };
})();
ExtendedTriangle.prototype.intersectsTriangle = (function() {
  const saTri2 = new ExtendedTriangle();
  const arr1 = new Array(3);
  const arr2 = new Array(3);
  const cachedSatBounds = new SeparatingAxisBounds();
  const cachedSatBounds2 = new SeparatingAxisBounds();
  const cachedAxis = new Vector3();
  const dir = new Vector3();
  const dir1 = new Vector3();
  const dir2 = new Vector3();
  const tempDir = new Vector3();
  const edge = new Line3();
  const edge1 = new Line3();
  const edge2 = new Line3();
  const tempPoint = new Vector3();
  function triIntersectPlane(tri, plane, targetEdge) {
    const points = tri.points;
    let count = 0;
    let startPointIntersection = -1;
    for (let i2 = 0; i2 < 3; i2++) {
      const { start, end } = edge;
      start.copy(points[i2]);
      end.copy(points[(i2 + 1) % 3]);
      edge.delta(dir);
      const startIntersects = isNearZero(plane.distanceToPoint(start));
      if (isNearZero(plane.normal.dot(dir)) && startIntersects) {
        targetEdge.copy(edge);
        count = 2;
        break;
      }
      const doesIntersect = plane.intersectLine(edge, tempPoint);
      if (!doesIntersect && startIntersects) {
        tempPoint.copy(start);
      }
      if ((doesIntersect || startIntersects) && !isNearZero(tempPoint.distanceTo(end))) {
        if (count <= 1) {
          const point = count === 1 ? targetEdge.start : targetEdge.end;
          point.copy(tempPoint);
          if (startIntersects) {
            startPointIntersection = count;
          }
        } else if (count >= 2) {
          const point = startPointIntersection === 1 ? targetEdge.start : targetEdge.end;
          point.copy(tempPoint);
          count = 2;
          break;
        }
        count++;
        if (count === 2 && startPointIntersection === -1) {
          break;
        }
      }
    }
    return count;
  }
  return function intersectsTriangle(other, target2 = null, suppressLog = false) {
    if (this.needsUpdate) {
      this.update();
    }
    if (!other.isExtendedTriangle) {
      saTri2.copy(other);
      saTri2.update();
      other = saTri2;
    } else if (other.needsUpdate) {
      other.update();
    }
    const plane1 = this.plane;
    const plane2 = other.plane;
    if (Math.abs(plane1.normal.dot(plane2.normal)) > 1 - 1e-10) {
      const satBounds1 = this.satBounds;
      const satAxes1 = this.satAxes;
      arr2[0] = other.a;
      arr2[1] = other.b;
      arr2[2] = other.c;
      for (let i2 = 0; i2 < 4; i2++) {
        const sb = satBounds1[i2];
        const sa = satAxes1[i2];
        cachedSatBounds.setFromPoints(sa, arr2);
        if (sb.isSeparated(cachedSatBounds)) return false;
      }
      const satBounds2 = other.satBounds;
      const satAxes2 = other.satAxes;
      arr1[0] = this.a;
      arr1[1] = this.b;
      arr1[2] = this.c;
      for (let i2 = 0; i2 < 4; i2++) {
        const sb = satBounds2[i2];
        const sa = satAxes2[i2];
        cachedSatBounds.setFromPoints(sa, arr1);
        if (sb.isSeparated(cachedSatBounds)) return false;
      }
      for (let i2 = 0; i2 < 4; i2++) {
        const sa1 = satAxes1[i2];
        for (let i22 = 0; i22 < 4; i22++) {
          const sa2 = satAxes2[i22];
          cachedAxis.crossVectors(sa1, sa2);
          cachedSatBounds.setFromPoints(cachedAxis, arr1);
          cachedSatBounds2.setFromPoints(cachedAxis, arr2);
          if (cachedSatBounds.isSeparated(cachedSatBounds2)) return false;
        }
      }
      if (target2) {
        if (!suppressLog) {
          console.warn("ExtendedTriangle.intersectsTriangle: Triangles are coplanar which does not support an output edge. Setting edge to 0, 0, 0.");
        }
        target2.start.set(0, 0, 0);
        target2.end.set(0, 0, 0);
      }
      return true;
    } else {
      const count1 = triIntersectPlane(this, plane2, edge1);
      if (count1 === 1 && other.containsPoint(edge1.end)) {
        if (target2) {
          target2.start.copy(edge1.end);
          target2.end.copy(edge1.end);
        }
        return true;
      } else if (count1 !== 2) {
        return false;
      }
      const count2 = triIntersectPlane(other, plane1, edge2);
      if (count2 === 1 && this.containsPoint(edge2.end)) {
        if (target2) {
          target2.start.copy(edge2.end);
          target2.end.copy(edge2.end);
        }
        return true;
      } else if (count2 !== 2) {
        return false;
      }
      edge1.delta(dir1);
      edge2.delta(dir2);
      if (dir1.dot(dir2) < 0) {
        let tmp = edge2.start;
        edge2.start = edge2.end;
        edge2.end = tmp;
      }
      const s1 = edge1.start.dot(dir1);
      const e1 = edge1.end.dot(dir1);
      const s2 = edge2.start.dot(dir1);
      const e2 = edge2.end.dot(dir1);
      const separated1 = e1 < s2;
      const separated2 = s1 < e2;
      if (s1 !== e2 && s2 !== e1 && separated1 === separated2) {
        return false;
      }
      if (target2) {
        tempDir.subVectors(edge1.start, edge2.start);
        if (tempDir.dot(dir1) > 0) {
          target2.start.copy(edge1.start);
        } else {
          target2.start.copy(edge2.start);
        }
        tempDir.subVectors(edge1.end, edge2.end);
        if (tempDir.dot(dir1) < 0) {
          target2.end.copy(edge1.end);
        } else {
          target2.end.copy(edge2.end);
        }
      }
      return true;
    }
  };
})();
ExtendedTriangle.prototype.distanceToPoint = (function() {
  const target2 = new Vector3();
  return function distanceToPoint(point) {
    this.closestPointToPoint(point, target2);
    return point.distanceTo(target2);
  };
})();
ExtendedTriangle.prototype.distanceToTriangle = (function() {
  const point = new Vector3();
  const point2 = new Vector3();
  const cornerFields = ["a", "b", "c"];
  const line1 = new Line3();
  const line2 = new Line3();
  return function distanceToTriangle(other, target1 = null, target2 = null) {
    const lineTarget = target1 || target2 ? line1 : null;
    if (this.intersectsTriangle(other, lineTarget)) {
      if (target1 || target2) {
        if (target1) lineTarget.getCenter(target1);
        if (target2) lineTarget.getCenter(target2);
      }
      return 0;
    }
    let closestDistanceSq = Infinity;
    for (let i2 = 0; i2 < 3; i2++) {
      let dist;
      const field = cornerFields[i2];
      const otherVec = other[field];
      this.closestPointToPoint(otherVec, point);
      dist = otherVec.distanceToSquared(point);
      if (dist < closestDistanceSq) {
        closestDistanceSq = dist;
        if (target1) target1.copy(point);
        if (target2) target2.copy(otherVec);
      }
      const thisVec = this[field];
      other.closestPointToPoint(thisVec, point);
      dist = thisVec.distanceToSquared(point);
      if (dist < closestDistanceSq) {
        closestDistanceSq = dist;
        if (target1) target1.copy(thisVec);
        if (target2) target2.copy(point);
      }
    }
    for (let i2 = 0; i2 < 3; i2++) {
      const f11 = cornerFields[i2];
      const f12 = cornerFields[(i2 + 1) % 3];
      line1.set(this[f11], this[f12]);
      for (let i22 = 0; i22 < 3; i22++) {
        const f21 = cornerFields[i22];
        const f22 = cornerFields[(i22 + 1) % 3];
        line2.set(other[f21], other[f22]);
        closestPointsSegmentToSegment(line1, line2, point, point2);
        const dist = point.distanceToSquared(point2);
        if (dist < closestDistanceSq) {
          closestDistanceSq = dist;
          if (target1) target1.copy(point);
          if (target2) target2.copy(point2);
        }
      }
    }
    return Math.sqrt(closestDistanceSq);
  };
})();

// node_modules/three-mesh-bvh/src/math/OrientedBox.js
var OrientedBox = class {
  constructor(min, max, matrix3) {
    this.isOrientedBox = true;
    this.min = new Vector3();
    this.max = new Vector3();
    this.matrix = new Matrix4();
    this.invMatrix = new Matrix4();
    this.points = new Array(8).fill().map(() => new Vector3());
    this.satAxes = new Array(3).fill().map(() => new Vector3());
    this.satBounds = new Array(3).fill().map(() => new SeparatingAxisBounds());
    this.alignedSatBounds = new Array(3).fill().map(() => new SeparatingAxisBounds());
    this.needsUpdate = false;
    if (min) this.min.copy(min);
    if (max) this.max.copy(max);
    if (matrix3) this.matrix.copy(matrix3);
  }
  set(min, max, matrix3) {
    this.min.copy(min);
    this.max.copy(max);
    this.matrix.copy(matrix3);
    this.needsUpdate = true;
  }
  copy(other) {
    this.min.copy(other.min);
    this.max.copy(other.max);
    this.matrix.copy(other.matrix);
    this.needsUpdate = true;
  }
};
OrientedBox.prototype.update = /* @__PURE__ */ (function() {
  return function update2() {
    const matrix3 = this.matrix;
    const min = this.min;
    const max = this.max;
    const points = this.points;
    for (let x = 0; x <= 1; x++) {
      for (let y = 0; y <= 1; y++) {
        for (let z = 0; z <= 1; z++) {
          const i2 = (1 << 0) * x | (1 << 1) * y | (1 << 2) * z;
          const v5 = points[i2];
          v5.x = x ? max.x : min.x;
          v5.y = y ? max.y : min.y;
          v5.z = z ? max.z : min.z;
          v5.applyMatrix4(matrix3);
        }
      }
    }
    const satBounds = this.satBounds;
    const satAxes = this.satAxes;
    const minVec = points[0];
    for (let i2 = 0; i2 < 3; i2++) {
      const axis = satAxes[i2];
      const sb = satBounds[i2];
      const index = 1 << i2;
      const pi = points[index];
      axis.subVectors(minVec, pi);
      sb.setFromPoints(axis, points);
    }
    const alignedSatBounds = this.alignedSatBounds;
    alignedSatBounds[0].setFromPointsField(points, "x");
    alignedSatBounds[1].setFromPointsField(points, "y");
    alignedSatBounds[2].setFromPointsField(points, "z");
    this.invMatrix.copy(this.matrix).invert();
    this.needsUpdate = false;
  };
})();
OrientedBox.prototype.intersectsBox = (function() {
  const aabbBounds = new SeparatingAxisBounds();
  return function intersectsBox(box) {
    if (this.needsUpdate) {
      this.update();
    }
    const min = box.min;
    const max = box.max;
    const satBounds = this.satBounds;
    const satAxes = this.satAxes;
    const alignedSatBounds = this.alignedSatBounds;
    aabbBounds.min = min.x;
    aabbBounds.max = max.x;
    if (alignedSatBounds[0].isSeparated(aabbBounds)) return false;
    aabbBounds.min = min.y;
    aabbBounds.max = max.y;
    if (alignedSatBounds[1].isSeparated(aabbBounds)) return false;
    aabbBounds.min = min.z;
    aabbBounds.max = max.z;
    if (alignedSatBounds[2].isSeparated(aabbBounds)) return false;
    for (let i2 = 0; i2 < 3; i2++) {
      const axis = satAxes[i2];
      const sb = satBounds[i2];
      aabbBounds.setFromBox(axis, box);
      if (sb.isSeparated(aabbBounds)) return false;
    }
    return true;
  };
})();
OrientedBox.prototype.intersectsTriangle = (function() {
  const saTri = new ExtendedTriangle();
  const pointsArr = new Array(3);
  const cachedSatBounds = new SeparatingAxisBounds();
  const cachedSatBounds2 = new SeparatingAxisBounds();
  const cachedAxis = new Vector3();
  return function intersectsTriangle(triangle4) {
    if (this.needsUpdate) {
      this.update();
    }
    if (!triangle4.isExtendedTriangle) {
      saTri.copy(triangle4);
      saTri.update();
      triangle4 = saTri;
    } else if (triangle4.needsUpdate) {
      triangle4.update();
    }
    const satBounds = this.satBounds;
    const satAxes = this.satAxes;
    pointsArr[0] = triangle4.a;
    pointsArr[1] = triangle4.b;
    pointsArr[2] = triangle4.c;
    for (let i2 = 0; i2 < 3; i2++) {
      const sb = satBounds[i2];
      const sa = satAxes[i2];
      cachedSatBounds.setFromPoints(sa, pointsArr);
      if (sb.isSeparated(cachedSatBounds)) return false;
    }
    const triSatBounds = triangle4.satBounds;
    const triSatAxes = triangle4.satAxes;
    const points = this.points;
    for (let i2 = 0; i2 < 3; i2++) {
      const sb = triSatBounds[i2];
      const sa = triSatAxes[i2];
      cachedSatBounds.setFromPoints(sa, points);
      if (sb.isSeparated(cachedSatBounds)) return false;
    }
    for (let i2 = 0; i2 < 3; i2++) {
      const sa1 = satAxes[i2];
      for (let i22 = 0; i22 < 4; i22++) {
        const sa2 = triSatAxes[i22];
        cachedAxis.crossVectors(sa1, sa2);
        cachedSatBounds.setFromPoints(cachedAxis, pointsArr);
        cachedSatBounds2.setFromPoints(cachedAxis, points);
        if (cachedSatBounds.isSeparated(cachedSatBounds2)) return false;
      }
    }
    return true;
  };
})();
OrientedBox.prototype.closestPointToPoint = /* @__PURE__ */ (function() {
  return function closestPointToPoint2(point, target1) {
    if (this.needsUpdate) {
      this.update();
    }
    target1.copy(point).applyMatrix4(this.invMatrix).clamp(this.min, this.max).applyMatrix4(this.matrix);
    return target1;
  };
})();
OrientedBox.prototype.distanceToPoint = (function() {
  const target2 = new Vector3();
  return function distanceToPoint(point) {
    this.closestPointToPoint(point, target2);
    return point.distanceTo(target2);
  };
})();
OrientedBox.prototype.distanceToBox = (function() {
  const xyzFields = ["x", "y", "z"];
  const segments1 = new Array(12).fill().map(() => new Line3());
  const segments2 = new Array(12).fill().map(() => new Line3());
  const point1 = new Vector3();
  const point2 = new Vector3();
  return function distanceToBox(box, threshold = 0, target1 = null, target2 = null) {
    if (this.needsUpdate) {
      this.update();
    }
    if (this.intersectsBox(box)) {
      if (target1 || target2) {
        box.getCenter(point2);
        this.closestPointToPoint(point2, point1);
        box.closestPointToPoint(point1, point2);
        if (target1) target1.copy(point1);
        if (target2) target2.copy(point2);
      }
      return 0;
    }
    const threshold2 = threshold * threshold;
    const min = box.min;
    const max = box.max;
    const points = this.points;
    let closestDistanceSq = Infinity;
    for (let i2 = 0; i2 < 8; i2++) {
      const p = points[i2];
      point2.copy(p).clamp(min, max);
      const dist = p.distanceToSquared(point2);
      if (dist < closestDistanceSq) {
        closestDistanceSq = dist;
        if (target1) target1.copy(p);
        if (target2) target2.copy(point2);
        if (dist < threshold2) return Math.sqrt(dist);
      }
    }
    let count = 0;
    for (let i2 = 0; i2 < 3; i2++) {
      for (let i1 = 0; i1 <= 1; i1++) {
        for (let i22 = 0; i22 <= 1; i22++) {
          const nextIndex = (i2 + 1) % 3;
          const nextIndex2 = (i2 + 2) % 3;
          const index = i1 << nextIndex | i22 << nextIndex2;
          const index2 = 1 << i2 | i1 << nextIndex | i22 << nextIndex2;
          const p1 = points[index];
          const p2 = points[index2];
          const line1 = segments1[count];
          line1.set(p1, p2);
          const f1 = xyzFields[i2];
          const f2 = xyzFields[nextIndex];
          const f3 = xyzFields[nextIndex2];
          const line2 = segments2[count];
          const start = line2.start;
          const end = line2.end;
          start[f1] = min[f1];
          start[f2] = i1 ? min[f2] : max[f2];
          start[f3] = i22 ? min[f3] : max[f2];
          end[f1] = max[f1];
          end[f2] = i1 ? min[f2] : max[f2];
          end[f3] = i22 ? min[f3] : max[f2];
          count++;
        }
      }
    }
    for (let x = 0; x <= 1; x++) {
      for (let y = 0; y <= 1; y++) {
        for (let z = 0; z <= 1; z++) {
          point2.x = x ? max.x : min.x;
          point2.y = y ? max.y : min.y;
          point2.z = z ? max.z : min.z;
          this.closestPointToPoint(point2, point1);
          const dist = point2.distanceToSquared(point1);
          if (dist < closestDistanceSq) {
            closestDistanceSq = dist;
            if (target1) target1.copy(point1);
            if (target2) target2.copy(point2);
            if (dist < threshold2) return Math.sqrt(dist);
          }
        }
      }
    }
    for (let i2 = 0; i2 < 12; i2++) {
      const l1 = segments1[i2];
      for (let i22 = 0; i22 < 12; i22++) {
        const l2 = segments2[i22];
        closestPointsSegmentToSegment(l1, l2, point1, point2);
        const dist = point1.distanceToSquared(point2);
        if (dist < closestDistanceSq) {
          closestDistanceSq = dist;
          if (target1) target1.copy(point1);
          if (target2) target2.copy(point2);
          if (dist < threshold2) return Math.sqrt(dist);
        }
      }
    }
    return Math.sqrt(closestDistanceSq);
  };
})();

// node_modules/three-mesh-bvh/src/utils/PrimitivePool.js
var PrimitivePool = class {
  constructor(getNewPrimitive) {
    this._getNewPrimitive = getNewPrimitive;
    this._primitives = [];
  }
  getPrimitive() {
    const primitives = this._primitives;
    if (primitives.length === 0) {
      return this._getNewPrimitive();
    } else {
      return primitives.pop();
    }
  }
  releasePrimitive(primitive) {
    this._primitives.push(primitive);
  }
};

// node_modules/three-mesh-bvh/src/utils/ExtendedTrianglePool.js
var ExtendedTrianglePoolBase = class extends PrimitivePool {
  constructor() {
    super(() => new ExtendedTriangle());
  }
};
var ExtendedTrianglePool = new ExtendedTrianglePoolBase();

// node_modules/three-mesh-bvh/src/core/utils/BufferStack.js
var _BufferStack = class {
  constructor() {
    this.float32Array = null;
    this.uint16Array = null;
    this.uint32Array = null;
    const stack = [];
    let prevBuffer = null;
    this.setBuffer = (buffer) => {
      if (prevBuffer) {
        stack.push(prevBuffer);
      }
      prevBuffer = buffer;
      this.float32Array = new Float32Array(buffer);
      this.uint16Array = new Uint16Array(buffer);
      this.uint32Array = new Uint32Array(buffer);
    };
    this.clearBuffer = () => {
      prevBuffer = null;
      this.float32Array = null;
      this.uint16Array = null;
      this.uint32Array = null;
      if (stack.length !== 0) {
        this.setBuffer(stack.pop());
      }
    };
  }
};
var BufferStack = new _BufferStack();

// node_modules/three-mesh-bvh/src/core/cast/shapecast.js
var _box1;
var _box2;
var boxStack = [];
var boxPool = new PrimitivePool(() => new Box3());
function shapecast(bvh, root, intersectsBounds, intersectsRange, boundsTraverseOrder, byteOffset) {
  _box1 = boxPool.getPrimitive();
  _box2 = boxPool.getPrimitive();
  boxStack.push(_box1, _box2);
  BufferStack.setBuffer(bvh._roots[root]);
  const result = shapecastTraverse(0, bvh.geometry, intersectsBounds, intersectsRange, boundsTraverseOrder, byteOffset);
  BufferStack.clearBuffer();
  boxPool.releasePrimitive(_box1);
  boxPool.releasePrimitive(_box2);
  boxStack.pop();
  boxStack.pop();
  const length = boxStack.length;
  if (length > 0) {
    _box2 = boxStack[length - 1];
    _box1 = boxStack[length - 2];
  }
  return result;
}
function shapecastTraverse(nodeIndex32, geometry2, intersectsBoundsFunc, intersectsRangeFunc, nodeScoreFunc = null, nodeIndexByteOffset = 0, depth = 0) {
  const { float32Array: float32Array2, uint16Array: uint16Array2, uint32Array: uint32Array2 } = BufferStack;
  let nodeIndex16 = nodeIndex32 * 2;
  const isLeaf = IS_LEAF(nodeIndex16, uint16Array2);
  if (isLeaf) {
    const offset = OFFSET(nodeIndex32, uint32Array2);
    const count = COUNT(nodeIndex16, uint16Array2);
    arrayToBox(BOUNDING_DATA_INDEX(nodeIndex32), float32Array2, _box1);
    return intersectsRangeFunc(offset, count, false, depth, nodeIndexByteOffset + nodeIndex32, _box1);
  } else {
    let getLeftOffset = function(nodeIndex322) {
      const { uint16Array: uint16Array3, uint32Array: uint32Array3 } = BufferStack;
      let nodeIndex162 = nodeIndex322 * 2;
      while (!IS_LEAF(nodeIndex162, uint16Array3)) {
        nodeIndex322 = LEFT_NODE(nodeIndex322);
        nodeIndex162 = nodeIndex322 * 2;
      }
      return OFFSET(nodeIndex322, uint32Array3);
    }, getRightEndOffset = function(nodeIndex322) {
      const { uint16Array: uint16Array3, uint32Array: uint32Array3 } = BufferStack;
      let nodeIndex162 = nodeIndex322 * 2;
      while (!IS_LEAF(nodeIndex162, uint16Array3)) {
        nodeIndex322 = RIGHT_NODE(nodeIndex322, uint32Array3);
        nodeIndex162 = nodeIndex322 * 2;
      }
      return OFFSET(nodeIndex322, uint32Array3) + COUNT(nodeIndex162, uint16Array3);
    };
    const left = LEFT_NODE(nodeIndex32);
    const right = RIGHT_NODE(nodeIndex32, uint32Array2);
    let c1 = left;
    let c2 = right;
    let score1, score2;
    let box1, box2;
    if (nodeScoreFunc) {
      box1 = _box1;
      box2 = _box2;
      arrayToBox(BOUNDING_DATA_INDEX(c1), float32Array2, box1);
      arrayToBox(BOUNDING_DATA_INDEX(c2), float32Array2, box2);
      score1 = nodeScoreFunc(box1);
      score2 = nodeScoreFunc(box2);
      if (score2 < score1) {
        c1 = right;
        c2 = left;
        const temp5 = score1;
        score1 = score2;
        score2 = temp5;
        box1 = box2;
      }
    }
    if (!box1) {
      box1 = _box1;
      arrayToBox(BOUNDING_DATA_INDEX(c1), float32Array2, box1);
    }
    const isC1Leaf = IS_LEAF(c1 * 2, uint16Array2);
    const c1Intersection = intersectsBoundsFunc(box1, isC1Leaf, score1, depth + 1, nodeIndexByteOffset + c1);
    let c1StopTraversal;
    if (c1Intersection === CONTAINED) {
      const offset = getLeftOffset(c1);
      const end = getRightEndOffset(c1);
      const count = end - offset;
      c1StopTraversal = intersectsRangeFunc(offset, count, true, depth + 1, nodeIndexByteOffset + c1, box1);
    } else {
      c1StopTraversal = c1Intersection && shapecastTraverse(
        c1,
        geometry2,
        intersectsBoundsFunc,
        intersectsRangeFunc,
        nodeScoreFunc,
        nodeIndexByteOffset,
        depth + 1
      );
    }
    if (c1StopTraversal) return true;
    box2 = _box2;
    arrayToBox(BOUNDING_DATA_INDEX(c2), float32Array2, box2);
    const isC2Leaf = IS_LEAF(c2 * 2, uint16Array2);
    const c2Intersection = intersectsBoundsFunc(box2, isC2Leaf, score2, depth + 1, nodeIndexByteOffset + c2);
    let c2StopTraversal;
    if (c2Intersection === CONTAINED) {
      const offset = getLeftOffset(c2);
      const end = getRightEndOffset(c2);
      const count = end - offset;
      c2StopTraversal = intersectsRangeFunc(offset, count, true, depth + 1, nodeIndexByteOffset + c2, box2);
    } else {
      c2StopTraversal = c2Intersection && shapecastTraverse(
        c2,
        geometry2,
        intersectsBoundsFunc,
        intersectsRangeFunc,
        nodeScoreFunc,
        nodeIndexByteOffset,
        depth + 1
      );
    }
    if (c2StopTraversal) return true;
    return false;
  }
}

// node_modules/three-mesh-bvh/src/core/cast/closestPointToPoint.js
var temp = new Vector3();
var temp1 = new Vector3();
function closestPointToPoint(bvh, point, target2 = {}, minThreshold = 0, maxThreshold = Infinity) {
  const minThresholdSq = minThreshold * minThreshold;
  const maxThresholdSq = maxThreshold * maxThreshold;
  let closestDistanceSq = Infinity;
  let closestDistanceTriIndex = null;
  bvh.shapecast(
    {
      boundsTraverseOrder: (box) => {
        temp.copy(point).clamp(box.min, box.max);
        return temp.distanceToSquared(point);
      },
      intersectsBounds: (box, isLeaf, score) => {
        return score < closestDistanceSq && score < maxThresholdSq;
      },
      intersectsTriangle: (tri, triIndex) => {
        tri.closestPointToPoint(point, temp);
        const distSq = point.distanceToSquared(temp);
        if (distSq < closestDistanceSq) {
          temp1.copy(temp);
          closestDistanceSq = distSq;
          closestDistanceTriIndex = triIndex;
        }
        if (distSq < minThresholdSq) {
          return true;
        } else {
          return false;
        }
      }
    }
  );
  if (closestDistanceSq === Infinity) return null;
  const closestDistance = Math.sqrt(closestDistanceSq);
  if (!target2.point) target2.point = temp1.clone();
  else target2.point.copy(temp1);
  target2.distance = closestDistance, target2.faceIndex = closestDistanceTriIndex;
  return target2;
}

// node_modules/three-mesh-bvh/src/utils/ThreeRayIntersectUtilities.js
var IS_GT_REVISION_169 = parseInt(REVISION) >= 169;
var _vA = new Vector3();
var _vB = new Vector3();
var _vC = new Vector3();
var _uvA = new Vector2();
var _uvB = new Vector2();
var _uvC = new Vector2();
var _normalA = new Vector3();
var _normalB = new Vector3();
var _normalC = new Vector3();
var _intersectionPoint = new Vector3();
function checkIntersection(ray4, pA, pB, pC, point, side, near, far) {
  let intersect;
  if (side === BackSide) {
    intersect = ray4.intersectTriangle(pC, pB, pA, true, point);
  } else {
    intersect = ray4.intersectTriangle(pA, pB, pC, side !== DoubleSide, point);
  }
  if (intersect === null) return null;
  const distance = ray4.origin.distanceTo(point);
  if (distance < near || distance > far) return null;
  return {
    distance,
    point: point.clone()
  };
}
function checkBufferGeometryIntersection(ray4, position2, normal2, uv, uv1, a, b, c, side, near, far) {
  _vA.fromBufferAttribute(position2, a);
  _vB.fromBufferAttribute(position2, b);
  _vC.fromBufferAttribute(position2, c);
  const intersection3 = checkIntersection(ray4, _vA, _vB, _vC, _intersectionPoint, side, near, far);
  if (intersection3) {
    const barycoord = new Vector3();
    Triangle.getBarycoord(_intersectionPoint, _vA, _vB, _vC, barycoord);
    if (uv) {
      _uvA.fromBufferAttribute(uv, a);
      _uvB.fromBufferAttribute(uv, b);
      _uvC.fromBufferAttribute(uv, c);
      intersection3.uv = Triangle.getInterpolation(_intersectionPoint, _vA, _vB, _vC, _uvA, _uvB, _uvC, new Vector2());
    }
    if (uv1) {
      _uvA.fromBufferAttribute(uv1, a);
      _uvB.fromBufferAttribute(uv1, b);
      _uvC.fromBufferAttribute(uv1, c);
      intersection3.uv1 = Triangle.getInterpolation(_intersectionPoint, _vA, _vB, _vC, _uvA, _uvB, _uvC, new Vector2());
    }
    if (normal2) {
      _normalA.fromBufferAttribute(normal2, a);
      _normalB.fromBufferAttribute(normal2, b);
      _normalC.fromBufferAttribute(normal2, c);
      intersection3.normal = Triangle.getInterpolation(_intersectionPoint, _vA, _vB, _vC, _normalA, _normalB, _normalC, new Vector3());
      if (intersection3.normal.dot(ray4.direction) > 0) {
        intersection3.normal.multiplyScalar(-1);
      }
    }
    const face = {
      a,
      b,
      c,
      normal: new Vector3(),
      materialIndex: 0
    };
    Triangle.getNormal(_vA, _vB, _vC, face.normal);
    intersection3.face = face;
    intersection3.faceIndex = a;
    if (IS_GT_REVISION_169) {
      intersection3.barycoord = barycoord;
    }
  }
  return intersection3;
}
function intersectTri(geo, side, ray4, tri, intersections, near, far) {
  const triOffset = tri * 3;
  let a = triOffset + 0;
  let b = triOffset + 1;
  let c = triOffset + 2;
  const index = geo.index;
  if (geo.index) {
    a = index.getX(a);
    b = index.getX(b);
    c = index.getX(c);
  }
  const { position: position2, normal: normal2, uv, uv1 } = geo.attributes;
  const intersection3 = checkBufferGeometryIntersection(ray4, position2, normal2, uv, uv1, a, b, c, side, near, far);
  if (intersection3) {
    intersection3.faceIndex = tri;
    if (intersections) intersections.push(intersection3);
    return intersection3;
  }
  return null;
}

// node_modules/three-mesh-bvh/src/utils/TriangleUtilities.js
function setTriangle(tri, i2, index, pos) {
  const ta = tri.a;
  const tb = tri.b;
  const tc = tri.c;
  let i0 = i2;
  let i1 = i2 + 1;
  let i22 = i2 + 2;
  if (index) {
    i0 = index.getX(i0);
    i1 = index.getX(i1);
    i22 = index.getX(i22);
  }
  ta.x = pos.getX(i0);
  ta.y = pos.getY(i0);
  ta.z = pos.getZ(i0);
  tb.x = pos.getX(i1);
  tb.y = pos.getY(i1);
  tb.z = pos.getZ(i1);
  tc.x = pos.getX(i22);
  tc.y = pos.getY(i22);
  tc.z = pos.getZ(i22);
}
var tempV1 = new Vector3();
var tempV2 = new Vector3();
var tempV3 = new Vector3();
var tempUV1 = new Vector2();
var tempUV2 = new Vector2();
var tempUV3 = new Vector2();

// node_modules/three-mesh-bvh/src/core/utils/iterationUtils.generated.js
function intersectTris(bvh, side, ray4, offset, count, intersections, near, far) {
  const { geometry: geometry2, _indirectBuffer } = bvh;
  for (let i2 = offset, end = offset + count; i2 < end; i2++) {
    intersectTri(geometry2, side, ray4, i2, intersections, near, far);
  }
}
function intersectClosestTri(bvh, side, ray4, offset, count, near, far) {
  const { geometry: geometry2, _indirectBuffer } = bvh;
  let dist = Infinity;
  let res = null;
  for (let i2 = offset, end = offset + count; i2 < end; i2++) {
    let intersection3;
    intersection3 = intersectTri(geometry2, side, ray4, i2, null, near, far);
    if (intersection3 && intersection3.distance < dist) {
      res = intersection3;
      dist = intersection3.distance;
    }
  }
  return res;
}
function iterateOverTriangles(offset, count, bvh, intersectsTriangleFunc, contained, depth, triangle4) {
  const { geometry: geometry2 } = bvh;
  const { index } = geometry2;
  const pos = geometry2.attributes.position;
  for (let i2 = offset, l = count + offset; i2 < l; i2++) {
    let tri;
    tri = i2;
    setTriangle(triangle4, tri * 3, index, pos);
    triangle4.needsUpdate = true;
    if (intersectsTriangleFunc(triangle4, tri, contained, depth)) {
      return true;
    }
  }
  return false;
}

// node_modules/three-mesh-bvh/src/core/cast/refit.generated.js
function refit(bvh, nodeIndices = null) {
  if (nodeIndices && Array.isArray(nodeIndices)) {
    nodeIndices = new Set(nodeIndices);
  }
  const geometry2 = bvh.geometry;
  const indexArr = geometry2.index ? geometry2.index.array : null;
  const posAttr = geometry2.attributes.position;
  let buffer, uint32Array2, uint16Array2, float32Array2;
  let byteOffset = 0;
  const roots = bvh._roots;
  for (let i2 = 0, l = roots.length; i2 < l; i2++) {
    buffer = roots[i2];
    uint32Array2 = new Uint32Array(buffer);
    uint16Array2 = new Uint16Array(buffer);
    float32Array2 = new Float32Array(buffer);
    _traverse2(0, byteOffset);
    byteOffset += buffer.byteLength;
  }
  function _traverse2(node32Index, byteOffset2, force = false) {
    const node16Index = node32Index * 2;
    const isLeaf = uint16Array2[node16Index + 15] === IS_LEAFNODE_FLAG;
    if (isLeaf) {
      const offset = uint32Array2[node32Index + 6];
      const count = uint16Array2[node16Index + 14];
      let minx = Infinity;
      let miny = Infinity;
      let minz = Infinity;
      let maxx = -Infinity;
      let maxy = -Infinity;
      let maxz = -Infinity;
      for (let i2 = 3 * offset, l = 3 * (offset + count); i2 < l; i2++) {
        let index = indexArr[i2];
        const x = posAttr.getX(index);
        const y = posAttr.getY(index);
        const z = posAttr.getZ(index);
        if (x < minx) minx = x;
        if (x > maxx) maxx = x;
        if (y < miny) miny = y;
        if (y > maxy) maxy = y;
        if (z < minz) minz = z;
        if (z > maxz) maxz = z;
      }
      if (float32Array2[node32Index + 0] !== minx || float32Array2[node32Index + 1] !== miny || float32Array2[node32Index + 2] !== minz || float32Array2[node32Index + 3] !== maxx || float32Array2[node32Index + 4] !== maxy || float32Array2[node32Index + 5] !== maxz) {
        float32Array2[node32Index + 0] = minx;
        float32Array2[node32Index + 1] = miny;
        float32Array2[node32Index + 2] = minz;
        float32Array2[node32Index + 3] = maxx;
        float32Array2[node32Index + 4] = maxy;
        float32Array2[node32Index + 5] = maxz;
        return true;
      } else {
        return false;
      }
    } else {
      const left = node32Index + 8;
      const right = uint32Array2[node32Index + 6];
      const offsetLeft = left + byteOffset2;
      const offsetRight = right + byteOffset2;
      let forceChildren = force;
      let includesLeft = false;
      let includesRight = false;
      if (nodeIndices) {
        if (!forceChildren) {
          includesLeft = nodeIndices.has(offsetLeft);
          includesRight = nodeIndices.has(offsetRight);
          forceChildren = !includesLeft && !includesRight;
        }
      } else {
        includesLeft = true;
        includesRight = true;
      }
      const traverseLeft = forceChildren || includesLeft;
      const traverseRight = forceChildren || includesRight;
      let leftChange = false;
      if (traverseLeft) {
        leftChange = _traverse2(left, byteOffset2, forceChildren);
      }
      let rightChange = false;
      if (traverseRight) {
        rightChange = _traverse2(right, byteOffset2, forceChildren);
      }
      const didChange = leftChange || rightChange;
      if (didChange) {
        for (let i2 = 0; i2 < 3; i2++) {
          const lefti = left + i2;
          const righti = right + i2;
          const minLeftValue = float32Array2[lefti];
          const maxLeftValue = float32Array2[lefti + 3];
          const minRightValue = float32Array2[righti];
          const maxRightValue = float32Array2[righti + 3];
          float32Array2[node32Index + i2] = minLeftValue < minRightValue ? minLeftValue : minRightValue;
          float32Array2[node32Index + i2 + 3] = maxLeftValue > maxRightValue ? maxLeftValue : maxRightValue;
        }
      }
      return didChange;
    }
  }
}

// node_modules/three-mesh-bvh/src/core/utils/intersectUtils.js
function intersectRay(nodeIndex32, array, ray4, near, far) {
  let tmin, tmax, tymin, tymax, tzmin, tzmax;
  const invdirx = 1 / ray4.direction.x, invdiry = 1 / ray4.direction.y, invdirz = 1 / ray4.direction.z;
  const ox = ray4.origin.x;
  const oy = ray4.origin.y;
  const oz = ray4.origin.z;
  let minx = array[nodeIndex32];
  let maxx = array[nodeIndex32 + 3];
  let miny = array[nodeIndex32 + 1];
  let maxy = array[nodeIndex32 + 3 + 1];
  let minz = array[nodeIndex32 + 2];
  let maxz = array[nodeIndex32 + 3 + 2];
  if (invdirx >= 0) {
    tmin = (minx - ox) * invdirx;
    tmax = (maxx - ox) * invdirx;
  } else {
    tmin = (maxx - ox) * invdirx;
    tmax = (minx - ox) * invdirx;
  }
  if (invdiry >= 0) {
    tymin = (miny - oy) * invdiry;
    tymax = (maxy - oy) * invdiry;
  } else {
    tymin = (maxy - oy) * invdiry;
    tymax = (miny - oy) * invdiry;
  }
  if (tmin > tymax || tymin > tmax) return false;
  if (tymin > tmin || isNaN(tmin)) tmin = tymin;
  if (tymax < tmax || isNaN(tmax)) tmax = tymax;
  if (invdirz >= 0) {
    tzmin = (minz - oz) * invdirz;
    tzmax = (maxz - oz) * invdirz;
  } else {
    tzmin = (maxz - oz) * invdirz;
    tzmax = (minz - oz) * invdirz;
  }
  if (tmin > tzmax || tzmin > tmax) return false;
  if (tzmin > tmin || tmin !== tmin) tmin = tzmin;
  if (tzmax < tmax || tmax !== tmax) tmax = tzmax;
  return tmin <= far && tmax >= near;
}

// node_modules/three-mesh-bvh/src/core/utils/iterationUtils_indirect.generated.js
function intersectTris_indirect(bvh, side, ray4, offset, count, intersections, near, far) {
  const { geometry: geometry2, _indirectBuffer } = bvh;
  for (let i2 = offset, end = offset + count; i2 < end; i2++) {
    let vi = _indirectBuffer ? _indirectBuffer[i2] : i2;
    intersectTri(geometry2, side, ray4, vi, intersections, near, far);
  }
}
function intersectClosestTri_indirect(bvh, side, ray4, offset, count, near, far) {
  const { geometry: geometry2, _indirectBuffer } = bvh;
  let dist = Infinity;
  let res = null;
  for (let i2 = offset, end = offset + count; i2 < end; i2++) {
    let intersection3;
    intersection3 = intersectTri(geometry2, side, ray4, _indirectBuffer ? _indirectBuffer[i2] : i2, null, near, far);
    if (intersection3 && intersection3.distance < dist) {
      res = intersection3;
      dist = intersection3.distance;
    }
  }
  return res;
}
function iterateOverTriangles_indirect(offset, count, bvh, intersectsTriangleFunc, contained, depth, triangle4) {
  const { geometry: geometry2 } = bvh;
  const { index } = geometry2;
  const pos = geometry2.attributes.position;
  for (let i2 = offset, l = count + offset; i2 < l; i2++) {
    let tri;
    tri = bvh.resolveTriangleIndex(i2);
    setTriangle(triangle4, tri * 3, index, pos);
    triangle4.needsUpdate = true;
    if (intersectsTriangleFunc(triangle4, tri, contained, depth)) {
      return true;
    }
  }
  return false;
}

// node_modules/three-mesh-bvh/src/core/cast/raycast.generated.js
function raycast(bvh, root, side, ray4, intersects, near, far) {
  BufferStack.setBuffer(bvh._roots[root]);
  _raycast(0, bvh, side, ray4, intersects, near, far);
  BufferStack.clearBuffer();
}
function _raycast(nodeIndex32, bvh, side, ray4, intersects, near, far) {
  const { float32Array: float32Array2, uint16Array: uint16Array2, uint32Array: uint32Array2 } = BufferStack;
  const nodeIndex16 = nodeIndex32 * 2;
  const isLeaf = IS_LEAF(nodeIndex16, uint16Array2);
  if (isLeaf) {
    const offset = OFFSET(nodeIndex32, uint32Array2);
    const count = COUNT(nodeIndex16, uint16Array2);
    intersectTris(bvh, side, ray4, offset, count, intersects, near, far);
  } else {
    const leftIndex = LEFT_NODE(nodeIndex32);
    if (intersectRay(leftIndex, float32Array2, ray4, near, far)) {
      _raycast(leftIndex, bvh, side, ray4, intersects, near, far);
    }
    const rightIndex = RIGHT_NODE(nodeIndex32, uint32Array2);
    if (intersectRay(rightIndex, float32Array2, ray4, near, far)) {
      _raycast(rightIndex, bvh, side, ray4, intersects, near, far);
    }
  }
}

// node_modules/three-mesh-bvh/src/core/cast/raycastFirst.generated.js
var _xyzFields = ["x", "y", "z"];
function raycastFirst(bvh, root, side, ray4, near, far) {
  BufferStack.setBuffer(bvh._roots[root]);
  const result = _raycastFirst(0, bvh, side, ray4, near, far);
  BufferStack.clearBuffer();
  return result;
}
function _raycastFirst(nodeIndex32, bvh, side, ray4, near, far) {
  const { float32Array: float32Array2, uint16Array: uint16Array2, uint32Array: uint32Array2 } = BufferStack;
  let nodeIndex16 = nodeIndex32 * 2;
  const isLeaf = IS_LEAF(nodeIndex16, uint16Array2);
  if (isLeaf) {
    const offset = OFFSET(nodeIndex32, uint32Array2);
    const count = COUNT(nodeIndex16, uint16Array2);
    return intersectClosestTri(bvh, side, ray4, offset, count, near, far);
  } else {
    const splitAxis = SPLIT_AXIS(nodeIndex32, uint32Array2);
    const xyzAxis = _xyzFields[splitAxis];
    const rayDir = ray4.direction[xyzAxis];
    const leftToRight = rayDir >= 0;
    let c1, c2;
    if (leftToRight) {
      c1 = LEFT_NODE(nodeIndex32);
      c2 = RIGHT_NODE(nodeIndex32, uint32Array2);
    } else {
      c1 = RIGHT_NODE(nodeIndex32, uint32Array2);
      c2 = LEFT_NODE(nodeIndex32);
    }
    const c1Intersection = intersectRay(c1, float32Array2, ray4, near, far);
    const c1Result = c1Intersection ? _raycastFirst(c1, bvh, side, ray4, near, far) : null;
    if (c1Result) {
      const point = c1Result.point[xyzAxis];
      const isOutside = leftToRight ? point <= float32Array2[c2 + splitAxis] : (
        // min bounding data
        point >= float32Array2[c2 + splitAxis + 3]
      );
      if (isOutside) {
        return c1Result;
      }
    }
    const c2Intersection = intersectRay(c2, float32Array2, ray4, near, far);
    const c2Result = c2Intersection ? _raycastFirst(c2, bvh, side, ray4, near, far) : null;
    if (c1Result && c2Result) {
      return c1Result.distance <= c2Result.distance ? c1Result : c2Result;
    } else {
      return c1Result || c2Result || null;
    }
  }
}

// node_modules/three-mesh-bvh/src/core/cast/intersectsGeometry.generated.js
var boundingBox = new Box3();
var triangle = new ExtendedTriangle();
var triangle2 = new ExtendedTriangle();
var invertedMat = new Matrix4();
var obb = new OrientedBox();
var obb2 = new OrientedBox();
function intersectsGeometry(bvh, root, otherGeometry, geometryToBvh) {
  BufferStack.setBuffer(bvh._roots[root]);
  const result = _intersectsGeometry(0, bvh, otherGeometry, geometryToBvh);
  BufferStack.clearBuffer();
  return result;
}
function _intersectsGeometry(nodeIndex32, bvh, otherGeometry, geometryToBvh, cachedObb = null) {
  const { float32Array: float32Array2, uint16Array: uint16Array2, uint32Array: uint32Array2 } = BufferStack;
  let nodeIndex16 = nodeIndex32 * 2;
  if (cachedObb === null) {
    if (!otherGeometry.boundingBox) {
      otherGeometry.computeBoundingBox();
    }
    obb.set(otherGeometry.boundingBox.min, otherGeometry.boundingBox.max, geometryToBvh);
    cachedObb = obb;
  }
  const isLeaf = IS_LEAF(nodeIndex16, uint16Array2);
  if (isLeaf) {
    const thisGeometry = bvh.geometry;
    const thisIndex = thisGeometry.index;
    const thisPos = thisGeometry.attributes.position;
    const index = otherGeometry.index;
    const pos = otherGeometry.attributes.position;
    const offset = OFFSET(nodeIndex32, uint32Array2);
    const count = COUNT(nodeIndex16, uint16Array2);
    invertedMat.copy(geometryToBvh).invert();
    if (otherGeometry.boundsTree) {
      arrayToBox(BOUNDING_DATA_INDEX(nodeIndex32), float32Array2, obb2);
      obb2.matrix.copy(invertedMat);
      obb2.needsUpdate = true;
      const res = otherGeometry.boundsTree.shapecast({
        intersectsBounds: (box) => obb2.intersectsBox(box),
        intersectsTriangle: (tri) => {
          tri.a.applyMatrix4(geometryToBvh);
          tri.b.applyMatrix4(geometryToBvh);
          tri.c.applyMatrix4(geometryToBvh);
          tri.needsUpdate = true;
          for (let i2 = offset * 3, l = (count + offset) * 3; i2 < l; i2 += 3) {
            setTriangle(triangle2, i2, thisIndex, thisPos);
            triangle2.needsUpdate = true;
            if (tri.intersectsTriangle(triangle2)) {
              return true;
            }
          }
          return false;
        }
      });
      return res;
    } else {
      for (let i2 = offset * 3, l = (count + offset) * 3; i2 < l; i2 += 3) {
        setTriangle(triangle, i2, thisIndex, thisPos);
        triangle.a.applyMatrix4(invertedMat);
        triangle.b.applyMatrix4(invertedMat);
        triangle.c.applyMatrix4(invertedMat);
        triangle.needsUpdate = true;
        for (let i22 = 0, l2 = index.count; i22 < l2; i22 += 3) {
          setTriangle(triangle2, i22, index, pos);
          triangle2.needsUpdate = true;
          if (triangle.intersectsTriangle(triangle2)) {
            return true;
          }
        }
      }
    }
  } else {
    const left = nodeIndex32 + 8;
    const right = uint32Array2[nodeIndex32 + 6];
    arrayToBox(BOUNDING_DATA_INDEX(left), float32Array2, boundingBox);
    const leftIntersection = cachedObb.intersectsBox(boundingBox) && _intersectsGeometry(left, bvh, otherGeometry, geometryToBvh, cachedObb);
    if (leftIntersection) return true;
    arrayToBox(BOUNDING_DATA_INDEX(right), float32Array2, boundingBox);
    const rightIntersection = cachedObb.intersectsBox(boundingBox) && _intersectsGeometry(right, bvh, otherGeometry, geometryToBvh, cachedObb);
    if (rightIntersection) return true;
    return false;
  }
}

// node_modules/three-mesh-bvh/src/core/cast/closestPointToGeometry.generated.js
var tempMatrix = new Matrix4();
var obb3 = new OrientedBox();
var obb22 = new OrientedBox();
var temp12 = new Vector3();
var temp2 = new Vector3();
var temp3 = new Vector3();
var temp4 = new Vector3();
function closestPointToGeometry(bvh, otherGeometry, geometryToBvh, target1 = {}, target2 = {}, minThreshold = 0, maxThreshold = Infinity) {
  if (!otherGeometry.boundingBox) {
    otherGeometry.computeBoundingBox();
  }
  obb3.set(otherGeometry.boundingBox.min, otherGeometry.boundingBox.max, geometryToBvh);
  obb3.needsUpdate = true;
  const geometry2 = bvh.geometry;
  const pos = geometry2.attributes.position;
  const index = geometry2.index;
  const otherPos = otherGeometry.attributes.position;
  const otherIndex = otherGeometry.index;
  const triangle4 = ExtendedTrianglePool.getPrimitive();
  const triangle23 = ExtendedTrianglePool.getPrimitive();
  let tempTarget1 = temp12;
  let tempTargetDest1 = temp2;
  let tempTarget2 = null;
  let tempTargetDest2 = null;
  if (target2) {
    tempTarget2 = temp3;
    tempTargetDest2 = temp4;
  }
  let closestDistance = Infinity;
  let closestDistanceTriIndex = null;
  let closestDistanceOtherTriIndex = null;
  tempMatrix.copy(geometryToBvh).invert();
  obb22.matrix.copy(tempMatrix);
  bvh.shapecast(
    {
      boundsTraverseOrder: (box) => {
        return obb3.distanceToBox(box);
      },
      intersectsBounds: (box, isLeaf, score) => {
        if (score < closestDistance && score < maxThreshold) {
          if (isLeaf) {
            obb22.min.copy(box.min);
            obb22.max.copy(box.max);
            obb22.needsUpdate = true;
          }
          return true;
        }
        return false;
      },
      intersectsRange: (offset, count) => {
        if (otherGeometry.boundsTree) {
          const otherBvh = otherGeometry.boundsTree;
          return otherBvh.shapecast({
            boundsTraverseOrder: (box) => {
              return obb22.distanceToBox(box);
            },
            intersectsBounds: (box, isLeaf, score) => {
              return score < closestDistance && score < maxThreshold;
            },
            intersectsRange: (otherOffset, otherCount) => {
              for (let i2 = otherOffset, l2 = otherOffset + otherCount; i2 < l2; i2++) {
                setTriangle(triangle23, 3 * i2, otherIndex, otherPos);
                triangle23.a.applyMatrix4(geometryToBvh);
                triangle23.b.applyMatrix4(geometryToBvh);
                triangle23.c.applyMatrix4(geometryToBvh);
                triangle23.needsUpdate = true;
                for (let i3 = offset, l = offset + count; i3 < l; i3++) {
                  setTriangle(triangle4, 3 * i3, index, pos);
                  triangle4.needsUpdate = true;
                  const dist = triangle4.distanceToTriangle(triangle23, tempTarget1, tempTarget2);
                  if (dist < closestDistance) {
                    tempTargetDest1.copy(tempTarget1);
                    if (tempTargetDest2) {
                      tempTargetDest2.copy(tempTarget2);
                    }
                    closestDistance = dist;
                    closestDistanceTriIndex = i3;
                    closestDistanceOtherTriIndex = i2;
                  }
                  if (dist < minThreshold) {
                    return true;
                  }
                }
              }
            }
          });
        } else {
          const triCount = getTriCount(otherGeometry);
          for (let i2 = 0, l2 = triCount; i2 < l2; i2++) {
            setTriangle(triangle23, 3 * i2, otherIndex, otherPos);
            triangle23.a.applyMatrix4(geometryToBvh);
            triangle23.b.applyMatrix4(geometryToBvh);
            triangle23.c.applyMatrix4(geometryToBvh);
            triangle23.needsUpdate = true;
            for (let i3 = offset, l = offset + count; i3 < l; i3++) {
              setTriangle(triangle4, 3 * i3, index, pos);
              triangle4.needsUpdate = true;
              const dist = triangle4.distanceToTriangle(triangle23, tempTarget1, tempTarget2);
              if (dist < closestDistance) {
                tempTargetDest1.copy(tempTarget1);
                if (tempTargetDest2) {
                  tempTargetDest2.copy(tempTarget2);
                }
                closestDistance = dist;
                closestDistanceTriIndex = i3;
                closestDistanceOtherTriIndex = i2;
              }
              if (dist < minThreshold) {
                return true;
              }
            }
          }
        }
      }
    }
  );
  ExtendedTrianglePool.releasePrimitive(triangle4);
  ExtendedTrianglePool.releasePrimitive(triangle23);
  if (closestDistance === Infinity) {
    return null;
  }
  if (!target1.point) {
    target1.point = tempTargetDest1.clone();
  } else {
    target1.point.copy(tempTargetDest1);
  }
  target1.distance = closestDistance, target1.faceIndex = closestDistanceTriIndex;
  if (target2) {
    if (!target2.point) target2.point = tempTargetDest2.clone();
    else target2.point.copy(tempTargetDest2);
    target2.point.applyMatrix4(tempMatrix);
    tempTargetDest1.applyMatrix4(tempMatrix);
    target2.distance = tempTargetDest1.sub(target2.point).length();
    target2.faceIndex = closestDistanceOtherTriIndex;
  }
  return target1;
}

// node_modules/three-mesh-bvh/src/core/cast/refit_indirect.generated.js
function refit_indirect(bvh, nodeIndices = null) {
  if (nodeIndices && Array.isArray(nodeIndices)) {
    nodeIndices = new Set(nodeIndices);
  }
  const geometry2 = bvh.geometry;
  const indexArr = geometry2.index ? geometry2.index.array : null;
  const posAttr = geometry2.attributes.position;
  let buffer, uint32Array2, uint16Array2, float32Array2;
  let byteOffset = 0;
  const roots = bvh._roots;
  for (let i2 = 0, l = roots.length; i2 < l; i2++) {
    buffer = roots[i2];
    uint32Array2 = new Uint32Array(buffer);
    uint16Array2 = new Uint16Array(buffer);
    float32Array2 = new Float32Array(buffer);
    _traverse2(0, byteOffset);
    byteOffset += buffer.byteLength;
  }
  function _traverse2(node32Index, byteOffset2, force = false) {
    const node16Index = node32Index * 2;
    const isLeaf = uint16Array2[node16Index + 15] === IS_LEAFNODE_FLAG;
    if (isLeaf) {
      const offset = uint32Array2[node32Index + 6];
      const count = uint16Array2[node16Index + 14];
      let minx = Infinity;
      let miny = Infinity;
      let minz = Infinity;
      let maxx = -Infinity;
      let maxy = -Infinity;
      let maxz = -Infinity;
      for (let i2 = offset, l = offset + count; i2 < l; i2++) {
        const t = 3 * bvh.resolveTriangleIndex(i2);
        for (let j = 0; j < 3; j++) {
          let index = t + j;
          index = indexArr ? indexArr[index] : index;
          const x = posAttr.getX(index);
          const y = posAttr.getY(index);
          const z = posAttr.getZ(index);
          if (x < minx) minx = x;
          if (x > maxx) maxx = x;
          if (y < miny) miny = y;
          if (y > maxy) maxy = y;
          if (z < minz) minz = z;
          if (z > maxz) maxz = z;
        }
      }
      if (float32Array2[node32Index + 0] !== minx || float32Array2[node32Index + 1] !== miny || float32Array2[node32Index + 2] !== minz || float32Array2[node32Index + 3] !== maxx || float32Array2[node32Index + 4] !== maxy || float32Array2[node32Index + 5] !== maxz) {
        float32Array2[node32Index + 0] = minx;
        float32Array2[node32Index + 1] = miny;
        float32Array2[node32Index + 2] = minz;
        float32Array2[node32Index + 3] = maxx;
        float32Array2[node32Index + 4] = maxy;
        float32Array2[node32Index + 5] = maxz;
        return true;
      } else {
        return false;
      }
    } else {
      const left = node32Index + 8;
      const right = uint32Array2[node32Index + 6];
      const offsetLeft = left + byteOffset2;
      const offsetRight = right + byteOffset2;
      let forceChildren = force;
      let includesLeft = false;
      let includesRight = false;
      if (nodeIndices) {
        if (!forceChildren) {
          includesLeft = nodeIndices.has(offsetLeft);
          includesRight = nodeIndices.has(offsetRight);
          forceChildren = !includesLeft && !includesRight;
        }
      } else {
        includesLeft = true;
        includesRight = true;
      }
      const traverseLeft = forceChildren || includesLeft;
      const traverseRight = forceChildren || includesRight;
      let leftChange = false;
      if (traverseLeft) {
        leftChange = _traverse2(left, byteOffset2, forceChildren);
      }
      let rightChange = false;
      if (traverseRight) {
        rightChange = _traverse2(right, byteOffset2, forceChildren);
      }
      const didChange = leftChange || rightChange;
      if (didChange) {
        for (let i2 = 0; i2 < 3; i2++) {
          const lefti = left + i2;
          const righti = right + i2;
          const minLeftValue = float32Array2[lefti];
          const maxLeftValue = float32Array2[lefti + 3];
          const minRightValue = float32Array2[righti];
          const maxRightValue = float32Array2[righti + 3];
          float32Array2[node32Index + i2] = minLeftValue < minRightValue ? minLeftValue : minRightValue;
          float32Array2[node32Index + i2 + 3] = maxLeftValue > maxRightValue ? maxLeftValue : maxRightValue;
        }
      }
      return didChange;
    }
  }
}

// node_modules/three-mesh-bvh/src/core/cast/raycast_indirect.generated.js
function raycast_indirect(bvh, root, side, ray4, intersects, near, far) {
  BufferStack.setBuffer(bvh._roots[root]);
  _raycast2(0, bvh, side, ray4, intersects, near, far);
  BufferStack.clearBuffer();
}
function _raycast2(nodeIndex32, bvh, side, ray4, intersects, near, far) {
  const { float32Array: float32Array2, uint16Array: uint16Array2, uint32Array: uint32Array2 } = BufferStack;
  const nodeIndex16 = nodeIndex32 * 2;
  const isLeaf = IS_LEAF(nodeIndex16, uint16Array2);
  if (isLeaf) {
    const offset = OFFSET(nodeIndex32, uint32Array2);
    const count = COUNT(nodeIndex16, uint16Array2);
    intersectTris_indirect(bvh, side, ray4, offset, count, intersects, near, far);
  } else {
    const leftIndex = LEFT_NODE(nodeIndex32);
    if (intersectRay(leftIndex, float32Array2, ray4, near, far)) {
      _raycast2(leftIndex, bvh, side, ray4, intersects, near, far);
    }
    const rightIndex = RIGHT_NODE(nodeIndex32, uint32Array2);
    if (intersectRay(rightIndex, float32Array2, ray4, near, far)) {
      _raycast2(rightIndex, bvh, side, ray4, intersects, near, far);
    }
  }
}

// node_modules/three-mesh-bvh/src/core/cast/raycastFirst_indirect.generated.js
var _xyzFields2 = ["x", "y", "z"];
function raycastFirst_indirect(bvh, root, side, ray4, near, far) {
  BufferStack.setBuffer(bvh._roots[root]);
  const result = _raycastFirst2(0, bvh, side, ray4, near, far);
  BufferStack.clearBuffer();
  return result;
}
function _raycastFirst2(nodeIndex32, bvh, side, ray4, near, far) {
  const { float32Array: float32Array2, uint16Array: uint16Array2, uint32Array: uint32Array2 } = BufferStack;
  let nodeIndex16 = nodeIndex32 * 2;
  const isLeaf = IS_LEAF(nodeIndex16, uint16Array2);
  if (isLeaf) {
    const offset = OFFSET(nodeIndex32, uint32Array2);
    const count = COUNT(nodeIndex16, uint16Array2);
    return intersectClosestTri_indirect(bvh, side, ray4, offset, count, near, far);
  } else {
    const splitAxis = SPLIT_AXIS(nodeIndex32, uint32Array2);
    const xyzAxis = _xyzFields2[splitAxis];
    const rayDir = ray4.direction[xyzAxis];
    const leftToRight = rayDir >= 0;
    let c1, c2;
    if (leftToRight) {
      c1 = LEFT_NODE(nodeIndex32);
      c2 = RIGHT_NODE(nodeIndex32, uint32Array2);
    } else {
      c1 = RIGHT_NODE(nodeIndex32, uint32Array2);
      c2 = LEFT_NODE(nodeIndex32);
    }
    const c1Intersection = intersectRay(c1, float32Array2, ray4, near, far);
    const c1Result = c1Intersection ? _raycastFirst2(c1, bvh, side, ray4, near, far) : null;
    if (c1Result) {
      const point = c1Result.point[xyzAxis];
      const isOutside = leftToRight ? point <= float32Array2[c2 + splitAxis] : (
        // min bounding data
        point >= float32Array2[c2 + splitAxis + 3]
      );
      if (isOutside) {
        return c1Result;
      }
    }
    const c2Intersection = intersectRay(c2, float32Array2, ray4, near, far);
    const c2Result = c2Intersection ? _raycastFirst2(c2, bvh, side, ray4, near, far) : null;
    if (c1Result && c2Result) {
      return c1Result.distance <= c2Result.distance ? c1Result : c2Result;
    } else {
      return c1Result || c2Result || null;
    }
  }
}

// node_modules/three-mesh-bvh/src/core/cast/intersectsGeometry_indirect.generated.js
var boundingBox2 = new Box3();
var triangle3 = new ExtendedTriangle();
var triangle22 = new ExtendedTriangle();
var invertedMat2 = new Matrix4();
var obb4 = new OrientedBox();
var obb23 = new OrientedBox();
function intersectsGeometry_indirect(bvh, root, otherGeometry, geometryToBvh) {
  BufferStack.setBuffer(bvh._roots[root]);
  const result = _intersectsGeometry2(0, bvh, otherGeometry, geometryToBvh);
  BufferStack.clearBuffer();
  return result;
}
function _intersectsGeometry2(nodeIndex32, bvh, otherGeometry, geometryToBvh, cachedObb = null) {
  const { float32Array: float32Array2, uint16Array: uint16Array2, uint32Array: uint32Array2 } = BufferStack;
  let nodeIndex16 = nodeIndex32 * 2;
  if (cachedObb === null) {
    if (!otherGeometry.boundingBox) {
      otherGeometry.computeBoundingBox();
    }
    obb4.set(otherGeometry.boundingBox.min, otherGeometry.boundingBox.max, geometryToBvh);
    cachedObb = obb4;
  }
  const isLeaf = IS_LEAF(nodeIndex16, uint16Array2);
  if (isLeaf) {
    const thisGeometry = bvh.geometry;
    const thisIndex = thisGeometry.index;
    const thisPos = thisGeometry.attributes.position;
    const index = otherGeometry.index;
    const pos = otherGeometry.attributes.position;
    const offset = OFFSET(nodeIndex32, uint32Array2);
    const count = COUNT(nodeIndex16, uint16Array2);
    invertedMat2.copy(geometryToBvh).invert();
    if (otherGeometry.boundsTree) {
      arrayToBox(BOUNDING_DATA_INDEX(nodeIndex32), float32Array2, obb23);
      obb23.matrix.copy(invertedMat2);
      obb23.needsUpdate = true;
      const res = otherGeometry.boundsTree.shapecast({
        intersectsBounds: (box) => obb23.intersectsBox(box),
        intersectsTriangle: (tri) => {
          tri.a.applyMatrix4(geometryToBvh);
          tri.b.applyMatrix4(geometryToBvh);
          tri.c.applyMatrix4(geometryToBvh);
          tri.needsUpdate = true;
          for (let i2 = offset, l = count + offset; i2 < l; i2++) {
            setTriangle(triangle22, 3 * bvh.resolveTriangleIndex(i2), thisIndex, thisPos);
            triangle22.needsUpdate = true;
            if (tri.intersectsTriangle(triangle22)) {
              return true;
            }
          }
          return false;
        }
      });
      return res;
    } else {
      for (let i2 = offset, l = count + offset; i2 < l; i2++) {
        const ti = bvh.resolveTriangleIndex(i2);
        setTriangle(triangle3, 3 * ti, thisIndex, thisPos);
        triangle3.a.applyMatrix4(invertedMat2);
        triangle3.b.applyMatrix4(invertedMat2);
        triangle3.c.applyMatrix4(invertedMat2);
        triangle3.needsUpdate = true;
        for (let i22 = 0, l2 = index.count; i22 < l2; i22 += 3) {
          setTriangle(triangle22, i22, index, pos);
          triangle22.needsUpdate = true;
          if (triangle3.intersectsTriangle(triangle22)) {
            return true;
          }
        }
      }
    }
  } else {
    const left = nodeIndex32 + 8;
    const right = uint32Array2[nodeIndex32 + 6];
    arrayToBox(BOUNDING_DATA_INDEX(left), float32Array2, boundingBox2);
    const leftIntersection = cachedObb.intersectsBox(boundingBox2) && _intersectsGeometry2(left, bvh, otherGeometry, geometryToBvh, cachedObb);
    if (leftIntersection) return true;
    arrayToBox(BOUNDING_DATA_INDEX(right), float32Array2, boundingBox2);
    const rightIntersection = cachedObb.intersectsBox(boundingBox2) && _intersectsGeometry2(right, bvh, otherGeometry, geometryToBvh, cachedObb);
    if (rightIntersection) return true;
    return false;
  }
}

// node_modules/three-mesh-bvh/src/core/cast/closestPointToGeometry_indirect.generated.js
var tempMatrix2 = new Matrix4();
var obb5 = new OrientedBox();
var obb24 = new OrientedBox();
var temp13 = new Vector3();
var temp22 = new Vector3();
var temp32 = new Vector3();
var temp42 = new Vector3();
function closestPointToGeometry_indirect(bvh, otherGeometry, geometryToBvh, target1 = {}, target2 = {}, minThreshold = 0, maxThreshold = Infinity) {
  if (!otherGeometry.boundingBox) {
    otherGeometry.computeBoundingBox();
  }
  obb5.set(otherGeometry.boundingBox.min, otherGeometry.boundingBox.max, geometryToBvh);
  obb5.needsUpdate = true;
  const geometry2 = bvh.geometry;
  const pos = geometry2.attributes.position;
  const index = geometry2.index;
  const otherPos = otherGeometry.attributes.position;
  const otherIndex = otherGeometry.index;
  const triangle4 = ExtendedTrianglePool.getPrimitive();
  const triangle23 = ExtendedTrianglePool.getPrimitive();
  let tempTarget1 = temp13;
  let tempTargetDest1 = temp22;
  let tempTarget2 = null;
  let tempTargetDest2 = null;
  if (target2) {
    tempTarget2 = temp32;
    tempTargetDest2 = temp42;
  }
  let closestDistance = Infinity;
  let closestDistanceTriIndex = null;
  let closestDistanceOtherTriIndex = null;
  tempMatrix2.copy(geometryToBvh).invert();
  obb24.matrix.copy(tempMatrix2);
  bvh.shapecast(
    {
      boundsTraverseOrder: (box) => {
        return obb5.distanceToBox(box);
      },
      intersectsBounds: (box, isLeaf, score) => {
        if (score < closestDistance && score < maxThreshold) {
          if (isLeaf) {
            obb24.min.copy(box.min);
            obb24.max.copy(box.max);
            obb24.needsUpdate = true;
          }
          return true;
        }
        return false;
      },
      intersectsRange: (offset, count) => {
        if (otherGeometry.boundsTree) {
          const otherBvh = otherGeometry.boundsTree;
          return otherBvh.shapecast({
            boundsTraverseOrder: (box) => {
              return obb24.distanceToBox(box);
            },
            intersectsBounds: (box, isLeaf, score) => {
              return score < closestDistance && score < maxThreshold;
            },
            intersectsRange: (otherOffset, otherCount) => {
              for (let i2 = otherOffset, l2 = otherOffset + otherCount; i2 < l2; i2++) {
                const ti2 = otherBvh.resolveTriangleIndex(i2);
                setTriangle(triangle23, 3 * ti2, otherIndex, otherPos);
                triangle23.a.applyMatrix4(geometryToBvh);
                triangle23.b.applyMatrix4(geometryToBvh);
                triangle23.c.applyMatrix4(geometryToBvh);
                triangle23.needsUpdate = true;
                for (let i3 = offset, l = offset + count; i3 < l; i3++) {
                  const ti = bvh.resolveTriangleIndex(i3);
                  setTriangle(triangle4, 3 * ti, index, pos);
                  triangle4.needsUpdate = true;
                  const dist = triangle4.distanceToTriangle(triangle23, tempTarget1, tempTarget2);
                  if (dist < closestDistance) {
                    tempTargetDest1.copy(tempTarget1);
                    if (tempTargetDest2) {
                      tempTargetDest2.copy(tempTarget2);
                    }
                    closestDistance = dist;
                    closestDistanceTriIndex = i3;
                    closestDistanceOtherTriIndex = i2;
                  }
                  if (dist < minThreshold) {
                    return true;
                  }
                }
              }
            }
          });
        } else {
          const triCount = getTriCount(otherGeometry);
          for (let i2 = 0, l2 = triCount; i2 < l2; i2++) {
            setTriangle(triangle23, 3 * i2, otherIndex, otherPos);
            triangle23.a.applyMatrix4(geometryToBvh);
            triangle23.b.applyMatrix4(geometryToBvh);
            triangle23.c.applyMatrix4(geometryToBvh);
            triangle23.needsUpdate = true;
            for (let i3 = offset, l = offset + count; i3 < l; i3++) {
              const ti = bvh.resolveTriangleIndex(i3);
              setTriangle(triangle4, 3 * ti, index, pos);
              triangle4.needsUpdate = true;
              const dist = triangle4.distanceToTriangle(triangle23, tempTarget1, tempTarget2);
              if (dist < closestDistance) {
                tempTargetDest1.copy(tempTarget1);
                if (tempTargetDest2) {
                  tempTargetDest2.copy(tempTarget2);
                }
                closestDistance = dist;
                closestDistanceTriIndex = i3;
                closestDistanceOtherTriIndex = i2;
              }
              if (dist < minThreshold) {
                return true;
              }
            }
          }
        }
      }
    }
  );
  ExtendedTrianglePool.releasePrimitive(triangle4);
  ExtendedTrianglePool.releasePrimitive(triangle23);
  if (closestDistance === Infinity) {
    return null;
  }
  if (!target1.point) {
    target1.point = tempTargetDest1.clone();
  } else {
    target1.point.copy(tempTargetDest1);
  }
  target1.distance = closestDistance, target1.faceIndex = closestDistanceTriIndex;
  if (target2) {
    if (!target2.point) target2.point = tempTargetDest2.clone();
    else target2.point.copy(tempTargetDest2);
    target2.point.applyMatrix4(tempMatrix2);
    tempTargetDest1.applyMatrix4(tempMatrix2);
    target2.distance = tempTargetDest1.sub(target2.point).length();
    target2.faceIndex = closestDistanceOtherTriIndex;
  }
  return target1;
}

// node_modules/three-mesh-bvh/src/utils/BufferUtils.js
function isSharedArrayBufferSupported() {
  return typeof SharedArrayBuffer !== "undefined";
}

// node_modules/three-mesh-bvh/src/core/cast/bvhcast.js
var _bufferStack1 = new BufferStack.constructor();
var _bufferStack2 = new BufferStack.constructor();
var _boxPool = new PrimitivePool(() => new Box3());
var _leftBox1 = new Box3();
var _rightBox1 = new Box3();
var _leftBox2 = new Box3();
var _rightBox2 = new Box3();
var _active = false;
function bvhcast(bvh, otherBvh, matrixToLocal, intersectsRanges) {
  if (_active) {
    throw new Error("MeshBVH: Recursive calls to bvhcast not supported.");
  }
  _active = true;
  const roots = bvh._roots;
  const otherRoots = otherBvh._roots;
  let result;
  let offset1 = 0;
  let offset2 = 0;
  const invMat = new Matrix4().copy(matrixToLocal).invert();
  for (let i2 = 0, il = roots.length; i2 < il; i2++) {
    _bufferStack1.setBuffer(roots[i2]);
    offset2 = 0;
    const localBox = _boxPool.getPrimitive();
    arrayToBox(BOUNDING_DATA_INDEX(0), _bufferStack1.float32Array, localBox);
    localBox.applyMatrix4(invMat);
    for (let j = 0, jl = otherRoots.length; j < jl; j++) {
      _bufferStack2.setBuffer(otherRoots[j]);
      result = _traverse(
        0,
        0,
        matrixToLocal,
        invMat,
        intersectsRanges,
        offset1,
        offset2,
        0,
        0,
        localBox
      );
      _bufferStack2.clearBuffer();
      offset2 += otherRoots[j].length;
      if (result) {
        break;
      }
    }
    _boxPool.releasePrimitive(localBox);
    _bufferStack1.clearBuffer();
    offset1 += roots[i2].length;
    if (result) {
      break;
    }
  }
  _active = false;
  return result;
}
function _traverse(node1Index32, node2Index32, matrix2to1, matrix1to2, intersectsRangesFunc, node1IndexByteOffset = 0, node2IndexByteOffset = 0, depth1 = 0, depth2 = 0, currBox = null, reversed = false) {
  let bufferStack1, bufferStack2;
  if (reversed) {
    bufferStack1 = _bufferStack2;
    bufferStack2 = _bufferStack1;
  } else {
    bufferStack1 = _bufferStack1;
    bufferStack2 = _bufferStack2;
  }
  const float32Array1 = bufferStack1.float32Array, uint32Array1 = bufferStack1.uint32Array, uint16Array1 = bufferStack1.uint16Array, float32Array2 = bufferStack2.float32Array, uint32Array2 = bufferStack2.uint32Array, uint16Array2 = bufferStack2.uint16Array;
  const node1Index16 = node1Index32 * 2;
  const node2Index16 = node2Index32 * 2;
  const isLeaf1 = IS_LEAF(node1Index16, uint16Array1);
  const isLeaf2 = IS_LEAF(node2Index16, uint16Array2);
  let result = false;
  if (isLeaf2 && isLeaf1) {
    if (reversed) {
      result = intersectsRangesFunc(
        OFFSET(node2Index32, uint32Array2),
        COUNT(node2Index32 * 2, uint16Array2),
        OFFSET(node1Index32, uint32Array1),
        COUNT(node1Index32 * 2, uint16Array1),
        depth2,
        node2IndexByteOffset + node2Index32,
        depth1,
        node1IndexByteOffset + node1Index32
      );
    } else {
      result = intersectsRangesFunc(
        OFFSET(node1Index32, uint32Array1),
        COUNT(node1Index32 * 2, uint16Array1),
        OFFSET(node2Index32, uint32Array2),
        COUNT(node2Index32 * 2, uint16Array2),
        depth1,
        node1IndexByteOffset + node1Index32,
        depth2,
        node2IndexByteOffset + node2Index32
      );
    }
  } else if (isLeaf2) {
    const newBox = _boxPool.getPrimitive();
    arrayToBox(BOUNDING_DATA_INDEX(node2Index32), float32Array2, newBox);
    newBox.applyMatrix4(matrix2to1);
    const cl1 = LEFT_NODE(node1Index32);
    const cr1 = RIGHT_NODE(node1Index32, uint32Array1);
    arrayToBox(BOUNDING_DATA_INDEX(cl1), float32Array1, _leftBox1);
    arrayToBox(BOUNDING_DATA_INDEX(cr1), float32Array1, _rightBox1);
    const intersectCl1 = newBox.intersectsBox(_leftBox1);
    const intersectCr1 = newBox.intersectsBox(_rightBox1);
    result = intersectCl1 && _traverse(
      node2Index32,
      cl1,
      matrix1to2,
      matrix2to1,
      intersectsRangesFunc,
      node2IndexByteOffset,
      node1IndexByteOffset,
      depth2,
      depth1 + 1,
      newBox,
      !reversed
    ) || intersectCr1 && _traverse(
      node2Index32,
      cr1,
      matrix1to2,
      matrix2to1,
      intersectsRangesFunc,
      node2IndexByteOffset,
      node1IndexByteOffset,
      depth2,
      depth1 + 1,
      newBox,
      !reversed
    );
    _boxPool.releasePrimitive(newBox);
  } else {
    const cl2 = LEFT_NODE(node2Index32);
    const cr2 = RIGHT_NODE(node2Index32, uint32Array2);
    arrayToBox(BOUNDING_DATA_INDEX(cl2), float32Array2, _leftBox2);
    arrayToBox(BOUNDING_DATA_INDEX(cr2), float32Array2, _rightBox2);
    const leftIntersects = currBox.intersectsBox(_leftBox2);
    const rightIntersects = currBox.intersectsBox(_rightBox2);
    if (leftIntersects && rightIntersects) {
      result = _traverse(
        node1Index32,
        cl2,
        matrix2to1,
        matrix1to2,
        intersectsRangesFunc,
        node1IndexByteOffset,
        node2IndexByteOffset,
        depth1,
        depth2 + 1,
        currBox,
        reversed
      ) || _traverse(
        node1Index32,
        cr2,
        matrix2to1,
        matrix1to2,
        intersectsRangesFunc,
        node1IndexByteOffset,
        node2IndexByteOffset,
        depth1,
        depth2 + 1,
        currBox,
        reversed
      );
    } else if (leftIntersects) {
      if (isLeaf1) {
        result = _traverse(
          node1Index32,
          cl2,
          matrix2to1,
          matrix1to2,
          intersectsRangesFunc,
          node1IndexByteOffset,
          node2IndexByteOffset,
          depth1,
          depth2 + 1,
          currBox,
          reversed
        );
      } else {
        const newBox = _boxPool.getPrimitive();
        newBox.copy(_leftBox2).applyMatrix4(matrix2to1);
        const cl1 = LEFT_NODE(node1Index32);
        const cr1 = RIGHT_NODE(node1Index32, uint32Array1);
        arrayToBox(BOUNDING_DATA_INDEX(cl1), float32Array1, _leftBox1);
        arrayToBox(BOUNDING_DATA_INDEX(cr1), float32Array1, _rightBox1);
        const intersectCl1 = newBox.intersectsBox(_leftBox1);
        const intersectCr1 = newBox.intersectsBox(_rightBox1);
        result = intersectCl1 && _traverse(
          cl2,
          cl1,
          matrix1to2,
          matrix2to1,
          intersectsRangesFunc,
          node2IndexByteOffset,
          node1IndexByteOffset,
          depth2,
          depth1 + 1,
          newBox,
          !reversed
        ) || intersectCr1 && _traverse(
          cl2,
          cr1,
          matrix1to2,
          matrix2to1,
          intersectsRangesFunc,
          node2IndexByteOffset,
          node1IndexByteOffset,
          depth2,
          depth1 + 1,
          newBox,
          !reversed
        );
        _boxPool.releasePrimitive(newBox);
      }
    } else if (rightIntersects) {
      if (isLeaf1) {
        result = _traverse(
          node1Index32,
          cr2,
          matrix2to1,
          matrix1to2,
          intersectsRangesFunc,
          node1IndexByteOffset,
          node2IndexByteOffset,
          depth1,
          depth2 + 1,
          currBox,
          reversed
        );
      } else {
        const newBox = _boxPool.getPrimitive();
        newBox.copy(_rightBox2).applyMatrix4(matrix2to1);
        const cl1 = LEFT_NODE(node1Index32);
        const cr1 = RIGHT_NODE(node1Index32, uint32Array1);
        arrayToBox(BOUNDING_DATA_INDEX(cl1), float32Array1, _leftBox1);
        arrayToBox(BOUNDING_DATA_INDEX(cr1), float32Array1, _rightBox1);
        const intersectCl1 = newBox.intersectsBox(_leftBox1);
        const intersectCr1 = newBox.intersectsBox(_rightBox1);
        result = intersectCl1 && _traverse(
          cr2,
          cl1,
          matrix1to2,
          matrix2to1,
          intersectsRangesFunc,
          node2IndexByteOffset,
          node1IndexByteOffset,
          depth2,
          depth1 + 1,
          newBox,
          !reversed
        ) || intersectCr1 && _traverse(
          cr2,
          cr1,
          matrix1to2,
          matrix2to1,
          intersectsRangesFunc,
          node2IndexByteOffset,
          node1IndexByteOffset,
          depth2,
          depth1 + 1,
          newBox,
          !reversed
        );
        _boxPool.releasePrimitive(newBox);
      }
    }
  }
  return result;
}

// node_modules/three-mesh-bvh/src/core/MeshBVH.js
var obb6 = new OrientedBox();
var tempBox = new Box3();
var DEFAULT_OPTIONS = {
  strategy: CENTER,
  maxDepth: 40,
  maxLeafTris: 10,
  useSharedArrayBuffer: false,
  setBoundingBox: true,
  onProgress: null,
  indirect: false,
  verbose: true,
  range: null
};
var MeshBVH = class _MeshBVH {
  static serialize(bvh, options = {}) {
    options = {
      cloneBuffers: true,
      ...options
    };
    const geometry2 = bvh.geometry;
    const rootData = bvh._roots;
    const indirectBuffer = bvh._indirectBuffer;
    const indexAttribute = geometry2.getIndex();
    let result;
    if (options.cloneBuffers) {
      result = {
        roots: rootData.map((root) => root.slice()),
        index: indexAttribute ? indexAttribute.array.slice() : null,
        indirectBuffer: indirectBuffer ? indirectBuffer.slice() : null
      };
    } else {
      result = {
        roots: rootData,
        index: indexAttribute ? indexAttribute.array : null,
        indirectBuffer
      };
    }
    return result;
  }
  static deserialize(data, geometry2, options = {}) {
    options = {
      setIndex: true,
      indirect: Boolean(data.indirectBuffer),
      ...options
    };
    const { index, roots, indirectBuffer } = data;
    const bvh = new _MeshBVH(geometry2, { ...options, [SKIP_GENERATION]: true });
    bvh._roots = roots;
    bvh._indirectBuffer = indirectBuffer || null;
    if (options.setIndex) {
      const indexAttribute = geometry2.getIndex();
      if (indexAttribute === null) {
        const newIndex = new BufferAttribute(data.index, 1, false);
        geometry2.setIndex(newIndex);
      } else if (indexAttribute.array !== index) {
        indexAttribute.array.set(index);
        indexAttribute.needsUpdate = true;
      }
    }
    return bvh;
  }
  get indirect() {
    return !!this._indirectBuffer;
  }
  constructor(geometry2, options = {}) {
    if (!geometry2.isBufferGeometry) {
      throw new Error("MeshBVH: Only BufferGeometries are supported.");
    } else if (geometry2.index && geometry2.index.isInterleavedBufferAttribute) {
      throw new Error("MeshBVH: InterleavedBufferAttribute is not supported for the index attribute.");
    }
    options = Object.assign({
      ...DEFAULT_OPTIONS,
      // undocumented options
      // Whether to skip generating the tree. Used for deserialization.
      [SKIP_GENERATION]: false
    }, options);
    if (options.useSharedArrayBuffer && !isSharedArrayBufferSupported()) {
      throw new Error("MeshBVH: SharedArrayBuffer is not available.");
    }
    this.geometry = geometry2;
    this._roots = null;
    this._indirectBuffer = null;
    if (!options[SKIP_GENERATION]) {
      buildPackedTree(this, options);
      if (!geometry2.boundingBox && options.setBoundingBox) {
        geometry2.boundingBox = this.getBoundingBox(new Box3());
      }
    }
    this.resolveTriangleIndex = options.indirect ? (i2) => this._indirectBuffer[i2] : (i2) => i2;
  }
  refit(nodeIndices = null) {
    const refitFunc = this.indirect ? refit_indirect : refit;
    return refitFunc(this, nodeIndices);
  }
  traverse(callback, rootIndex = 0) {
    const buffer = this._roots[rootIndex];
    const uint32Array2 = new Uint32Array(buffer);
    const uint16Array2 = new Uint16Array(buffer);
    _traverse2(0);
    function _traverse2(node32Index, depth = 0) {
      const node16Index = node32Index * 2;
      const isLeaf = uint16Array2[node16Index + 15] === IS_LEAFNODE_FLAG;
      if (isLeaf) {
        const offset = uint32Array2[node32Index + 6];
        const count = uint16Array2[node16Index + 14];
        callback(depth, isLeaf, new Float32Array(buffer, node32Index * 4, 6), offset, count);
      } else {
        const left = node32Index + BYTES_PER_NODE / 4;
        const right = uint32Array2[node32Index + 6];
        const splitAxis = uint32Array2[node32Index + 7];
        const stopTraversal = callback(depth, isLeaf, new Float32Array(buffer, node32Index * 4, 6), splitAxis);
        if (!stopTraversal) {
          _traverse2(left, depth + 1);
          _traverse2(right, depth + 1);
        }
      }
    }
  }
  /* Core Cast Functions */
  raycast(ray4, materialOrSide = FrontSide, near = 0, far = Infinity) {
    const roots = this._roots;
    const geometry2 = this.geometry;
    const intersects = [];
    const isMaterial = materialOrSide.isMaterial;
    const isArrayMaterial = Array.isArray(materialOrSide);
    const groups = geometry2.groups;
    const side = isMaterial ? materialOrSide.side : materialOrSide;
    const raycastFunc = this.indirect ? raycast_indirect : raycast;
    for (let i2 = 0, l = roots.length; i2 < l; i2++) {
      const materialSide = isArrayMaterial ? materialOrSide[groups[i2].materialIndex].side : side;
      const startCount = intersects.length;
      raycastFunc(this, i2, materialSide, ray4, intersects, near, far);
      if (isArrayMaterial) {
        const materialIndex = groups[i2].materialIndex;
        for (let j = startCount, jl = intersects.length; j < jl; j++) {
          intersects[j].face.materialIndex = materialIndex;
        }
      }
    }
    return intersects;
  }
  raycastFirst(ray4, materialOrSide = FrontSide, near = 0, far = Infinity) {
    const roots = this._roots;
    const geometry2 = this.geometry;
    const isMaterial = materialOrSide.isMaterial;
    const isArrayMaterial = Array.isArray(materialOrSide);
    let closestResult = null;
    const groups = geometry2.groups;
    const side = isMaterial ? materialOrSide.side : materialOrSide;
    const raycastFirstFunc = this.indirect ? raycastFirst_indirect : raycastFirst;
    for (let i2 = 0, l = roots.length; i2 < l; i2++) {
      const materialSide = isArrayMaterial ? materialOrSide[groups[i2].materialIndex].side : side;
      const result = raycastFirstFunc(this, i2, materialSide, ray4, near, far);
      if (result != null && (closestResult == null || result.distance < closestResult.distance)) {
        closestResult = result;
        if (isArrayMaterial) {
          result.face.materialIndex = groups[i2].materialIndex;
        }
      }
    }
    return closestResult;
  }
  intersectsGeometry(otherGeometry, geomToMesh) {
    let result = false;
    const roots = this._roots;
    const intersectsGeometryFunc = this.indirect ? intersectsGeometry_indirect : intersectsGeometry;
    for (let i2 = 0, l = roots.length; i2 < l; i2++) {
      result = intersectsGeometryFunc(this, i2, otherGeometry, geomToMesh);
      if (result) {
        break;
      }
    }
    return result;
  }
  shapecast(callbacks) {
    const triangle4 = ExtendedTrianglePool.getPrimitive();
    const iterateFunc = this.indirect ? iterateOverTriangles_indirect : iterateOverTriangles;
    let {
      boundsTraverseOrder,
      intersectsBounds,
      intersectsRange,
      intersectsTriangle
    } = callbacks;
    if (intersectsRange && intersectsTriangle) {
      const originalIntersectsRange = intersectsRange;
      intersectsRange = (offset, count, contained, depth, nodeIndex) => {
        if (!originalIntersectsRange(offset, count, contained, depth, nodeIndex)) {
          return iterateFunc(offset, count, this, intersectsTriangle, contained, depth, triangle4);
        }
        return true;
      };
    } else if (!intersectsRange) {
      if (intersectsTriangle) {
        intersectsRange = (offset, count, contained, depth) => {
          return iterateFunc(offset, count, this, intersectsTriangle, contained, depth, triangle4);
        };
      } else {
        intersectsRange = (offset, count, contained) => {
          return contained;
        };
      }
    }
    let result = false;
    let byteOffset = 0;
    const roots = this._roots;
    for (let i2 = 0, l = roots.length; i2 < l; i2++) {
      const root = roots[i2];
      result = shapecast(this, i2, intersectsBounds, intersectsRange, boundsTraverseOrder, byteOffset);
      if (result) {
        break;
      }
      byteOffset += root.byteLength;
    }
    ExtendedTrianglePool.releasePrimitive(triangle4);
    return result;
  }
  bvhcast(otherBvh, matrixToLocal, callbacks) {
    let {
      intersectsRanges,
      intersectsTriangles
    } = callbacks;
    const triangle1 = ExtendedTrianglePool.getPrimitive();
    const indexAttr1 = this.geometry.index;
    const positionAttr1 = this.geometry.attributes.position;
    const assignTriangle1 = this.indirect ? (i1) => {
      const ti = this.resolveTriangleIndex(i1);
      setTriangle(triangle1, ti * 3, indexAttr1, positionAttr1);
    } : (i1) => {
      setTriangle(triangle1, i1 * 3, indexAttr1, positionAttr1);
    };
    const triangle23 = ExtendedTrianglePool.getPrimitive();
    const indexAttr2 = otherBvh.geometry.index;
    const positionAttr2 = otherBvh.geometry.attributes.position;
    const assignTriangle2 = otherBvh.indirect ? (i2) => {
      const ti2 = otherBvh.resolveTriangleIndex(i2);
      setTriangle(triangle23, ti2 * 3, indexAttr2, positionAttr2);
    } : (i2) => {
      setTriangle(triangle23, i2 * 3, indexAttr2, positionAttr2);
    };
    if (intersectsTriangles) {
      const iterateOverDoubleTriangles = (offset1, count1, offset2, count2, depth1, index1, depth2, index2) => {
        for (let i2 = offset2, l2 = offset2 + count2; i2 < l2; i2++) {
          assignTriangle2(i2);
          triangle23.a.applyMatrix4(matrixToLocal);
          triangle23.b.applyMatrix4(matrixToLocal);
          triangle23.c.applyMatrix4(matrixToLocal);
          triangle23.needsUpdate = true;
          for (let i1 = offset1, l1 = offset1 + count1; i1 < l1; i1++) {
            assignTriangle1(i1);
            triangle1.needsUpdate = true;
            if (intersectsTriangles(triangle1, triangle23, i1, i2, depth1, index1, depth2, index2)) {
              return true;
            }
          }
        }
        return false;
      };
      if (intersectsRanges) {
        const originalIntersectsRanges = intersectsRanges;
        intersectsRanges = function(offset1, count1, offset2, count2, depth1, index1, depth2, index2) {
          if (!originalIntersectsRanges(offset1, count1, offset2, count2, depth1, index1, depth2, index2)) {
            return iterateOverDoubleTriangles(offset1, count1, offset2, count2, depth1, index1, depth2, index2);
          }
          return true;
        };
      } else {
        intersectsRanges = iterateOverDoubleTriangles;
      }
    }
    return bvhcast(this, otherBvh, matrixToLocal, intersectsRanges);
  }
  /* Derived Cast Functions */
  intersectsBox(box, boxToMesh) {
    obb6.set(box.min, box.max, boxToMesh);
    obb6.needsUpdate = true;
    return this.shapecast(
      {
        intersectsBounds: (box2) => obb6.intersectsBox(box2),
        intersectsTriangle: (tri) => obb6.intersectsTriangle(tri)
      }
    );
  }
  intersectsSphere(sphere) {
    return this.shapecast(
      {
        intersectsBounds: (box) => sphere.intersectsBox(box),
        intersectsTriangle: (tri) => tri.intersectsSphere(sphere)
      }
    );
  }
  closestPointToGeometry(otherGeometry, geometryToBvh, target1 = {}, target2 = {}, minThreshold = 0, maxThreshold = Infinity) {
    const closestPointToGeometryFunc = this.indirect ? closestPointToGeometry_indirect : closestPointToGeometry;
    return closestPointToGeometryFunc(
      this,
      otherGeometry,
      geometryToBvh,
      target1,
      target2,
      minThreshold,
      maxThreshold
    );
  }
  closestPointToPoint(point, target2 = {}, minThreshold = 0, maxThreshold = Infinity) {
    return closestPointToPoint(
      this,
      point,
      target2,
      minThreshold,
      maxThreshold
    );
  }
  getBoundingBox(target2) {
    target2.makeEmpty();
    const roots = this._roots;
    roots.forEach((buffer) => {
      arrayToBox(0, new Float32Array(buffer), tempBox);
      target2.union(tempBox);
    });
    return target2;
  }
};

// node_modules/three-mesh-bvh/src/objects/MeshBVHHelper.js
var boundingBox3 = new Box3();
var matrix2 = new Matrix4();

// node_modules/three-mesh-bvh/src/debug/Debug.js
var _box12 = new Box3();
var _box22 = new Box3();
var _vec = new Vector3();

// node_modules/three-mesh-bvh/src/utils/GeometryRayIntersectUtilities.js
function convertRaycastIntersect(hit, object, raycaster) {
  if (hit === null) {
    return null;
  }
  hit.point.applyMatrix4(object.matrixWorld);
  hit.distance = hit.point.distanceTo(raycaster.ray.origin);
  hit.object = object;
  return hit;
}

// node_modules/three-mesh-bvh/src/utils/ExtensionUtilities.js
var IS_REVISION_166 = parseInt(REVISION) >= 166;
var ray = new Ray();
var direction = new Vector3();
var tmpInverseMatrix = new Matrix4();
var origMeshRaycastFunc = Mesh.prototype.raycast;
var origBatchedRaycastFunc = BatchedMesh.prototype.raycast;
var _worldScale = new Vector3();
var _mesh = new Mesh();
var _batchIntersects = [];
function acceleratedRaycast(raycaster, intersects) {
  if (this.isBatchedMesh) {
    acceleratedBatchedMeshRaycast.call(this, raycaster, intersects);
  } else {
    acceleratedMeshRaycast.call(this, raycaster, intersects);
  }
}
function acceleratedBatchedMeshRaycast(raycaster, intersects) {
  if (this.boundsTrees) {
    const boundsTrees = this.boundsTrees;
    const drawInfo = this._drawInfo || this._instanceInfo;
    const drawRanges = this._drawRanges || this._geometryInfo;
    const matrixWorld = this.matrixWorld;
    _mesh.material = this.material;
    _mesh.geometry = this.geometry;
    const oldBoundsTree = _mesh.geometry.boundsTree;
    const oldDrawRange = _mesh.geometry.drawRange;
    if (_mesh.geometry.boundingSphere === null) {
      _mesh.geometry.boundingSphere = new Sphere();
    }
    for (let i2 = 0, l = drawInfo.length; i2 < l; i2++) {
      if (!this.getVisibleAt(i2)) {
        continue;
      }
      const geometryId = drawInfo[i2].geometryIndex;
      _mesh.geometry.boundsTree = boundsTrees[geometryId];
      this.getMatrixAt(i2, _mesh.matrixWorld).premultiply(matrixWorld);
      if (!_mesh.geometry.boundsTree) {
        this.getBoundingBoxAt(geometryId, _mesh.geometry.boundingBox);
        this.getBoundingSphereAt(geometryId, _mesh.geometry.boundingSphere);
        const drawRange = drawRanges[geometryId];
        _mesh.geometry.setDrawRange(drawRange.start, drawRange.count);
      }
      _mesh.raycast(raycaster, _batchIntersects);
      for (let j = 0, l2 = _batchIntersects.length; j < l2; j++) {
        const intersect = _batchIntersects[j];
        intersect.object = this;
        intersect.batchId = i2;
        intersects.push(intersect);
      }
      _batchIntersects.length = 0;
    }
    _mesh.geometry.boundsTree = oldBoundsTree;
    _mesh.geometry.drawRange = oldDrawRange;
    _mesh.material = null;
    _mesh.geometry = null;
  } else {
    origBatchedRaycastFunc.call(this, raycaster, intersects);
  }
}
function acceleratedMeshRaycast(raycaster, intersects) {
  if (this.geometry.boundsTree) {
    if (this.material === void 0) return;
    tmpInverseMatrix.copy(this.matrixWorld).invert();
    ray.copy(raycaster.ray).applyMatrix4(tmpInverseMatrix);
    _worldScale.setFromMatrixScale(this.matrixWorld);
    direction.copy(ray.direction).multiply(_worldScale);
    const scaleFactor = direction.length();
    const near = raycaster.near / scaleFactor;
    const far = raycaster.far / scaleFactor;
    const bvh = this.geometry.boundsTree;
    if (raycaster.firstHitOnly === true) {
      const hit = convertRaycastIntersect(bvh.raycastFirst(ray, this.material, near, far), this, raycaster);
      if (hit) {
        intersects.push(hit);
      }
    } else {
      const hits = bvh.raycast(ray, this.material, near, far);
      for (let i2 = 0, l = hits.length; i2 < l; i2++) {
        const hit = convertRaycastIntersect(hits[i2], this, raycaster);
        if (hit) {
          intersects.push(hit);
        }
      }
    }
  } else {
    origMeshRaycastFunc.call(this, raycaster, intersects);
  }
}
function computeBoundsTree(options = {}) {
  this.boundsTree = new MeshBVH(this, options);
  return this.boundsTree;
}
function disposeBoundsTree() {
  this.boundsTree = null;
}

// node_modules/three-mesh-bvh/src/gpu/VertexAttributeTexture.js
function countToStringFormat(count) {
  switch (count) {
    case 1:
      return "R";
    case 2:
      return "RG";
    case 3:
      return "RGBA";
    case 4:
      return "RGBA";
  }
  throw new Error();
}
function countToFormat(count) {
  switch (count) {
    case 1:
      return RedFormat;
    case 2:
      return RGFormat;
    case 3:
      return RGBAFormat;
    case 4:
      return RGBAFormat;
  }
}
function countToIntFormat(count) {
  switch (count) {
    case 1:
      return RedIntegerFormat;
    case 2:
      return RGIntegerFormat;
    case 3:
      return RGBAIntegerFormat;
    case 4:
      return RGBAIntegerFormat;
  }
}
var VertexAttributeTexture = class extends DataTexture {
  constructor() {
    super();
    this.minFilter = NearestFilter;
    this.magFilter = NearestFilter;
    this.generateMipmaps = false;
    this.overrideItemSize = null;
    this._forcedType = null;
  }
  updateFrom(attr) {
    const overrideItemSize = this.overrideItemSize;
    const originalItemSize = attr.itemSize;
    const originalCount = attr.count;
    if (overrideItemSize !== null) {
      if (originalItemSize * originalCount % overrideItemSize !== 0) {
        throw new Error("VertexAttributeTexture: overrideItemSize must divide evenly into buffer length.");
      }
      attr.itemSize = overrideItemSize;
      attr.count = originalCount * originalItemSize / overrideItemSize;
    }
    const itemSize = attr.itemSize;
    const count = attr.count;
    const normalized = attr.normalized;
    const originalBufferCons = attr.array.constructor;
    const byteCount = originalBufferCons.BYTES_PER_ELEMENT;
    let targetType = this._forcedType;
    let finalStride = itemSize;
    if (targetType === null) {
      switch (originalBufferCons) {
        case Float32Array:
          targetType = FloatType;
          break;
        case Uint8Array:
        case Uint16Array:
        case Uint32Array:
          targetType = UnsignedIntType;
          break;
        case Int8Array:
        case Int16Array:
        case Int32Array:
          targetType = IntType;
          break;
      }
    }
    let type, format, normalizeValue, targetBufferCons;
    let internalFormat = countToStringFormat(itemSize);
    switch (targetType) {
      case FloatType:
        normalizeValue = 1;
        format = countToFormat(itemSize);
        if (normalized && byteCount === 1) {
          targetBufferCons = originalBufferCons;
          internalFormat += "8";
          if (originalBufferCons === Uint8Array) {
            type = UnsignedByteType;
          } else {
            type = ByteType;
            internalFormat += "_SNORM";
          }
        } else {
          targetBufferCons = Float32Array;
          internalFormat += "32F";
          type = FloatType;
        }
        break;
      case IntType:
        internalFormat += byteCount * 8 + "I";
        normalizeValue = normalized ? Math.pow(2, originalBufferCons.BYTES_PER_ELEMENT * 8 - 1) : 1;
        format = countToIntFormat(itemSize);
        if (byteCount === 1) {
          targetBufferCons = Int8Array;
          type = ByteType;
        } else if (byteCount === 2) {
          targetBufferCons = Int16Array;
          type = ShortType;
        } else {
          targetBufferCons = Int32Array;
          type = IntType;
        }
        break;
      case UnsignedIntType:
        internalFormat += byteCount * 8 + "UI";
        normalizeValue = normalized ? Math.pow(2, originalBufferCons.BYTES_PER_ELEMENT * 8 - 1) : 1;
        format = countToIntFormat(itemSize);
        if (byteCount === 1) {
          targetBufferCons = Uint8Array;
          type = UnsignedByteType;
        } else if (byteCount === 2) {
          targetBufferCons = Uint16Array;
          type = UnsignedShortType;
        } else {
          targetBufferCons = Uint32Array;
          type = UnsignedIntType;
        }
        break;
    }
    if (finalStride === 3 && (format === RGBAFormat || format === RGBAIntegerFormat)) {
      finalStride = 4;
    }
    const dimension = Math.ceil(Math.sqrt(count)) || 1;
    const length = finalStride * dimension * dimension;
    const dataArray = new targetBufferCons(length);
    const originalNormalized = attr.normalized;
    attr.normalized = false;
    for (let i2 = 0; i2 < count; i2++) {
      const ii = finalStride * i2;
      dataArray[ii] = attr.getX(i2) / normalizeValue;
      if (itemSize >= 2) {
        dataArray[ii + 1] = attr.getY(i2) / normalizeValue;
      }
      if (itemSize >= 3) {
        dataArray[ii + 2] = attr.getZ(i2) / normalizeValue;
        if (finalStride === 4) {
          dataArray[ii + 3] = 1;
        }
      }
      if (itemSize >= 4) {
        dataArray[ii + 3] = attr.getW(i2) / normalizeValue;
      }
    }
    attr.normalized = originalNormalized;
    this.internalFormat = internalFormat;
    this.format = format;
    this.type = type;
    this.image.width = dimension;
    this.image.height = dimension;
    this.image.data = dataArray;
    this.needsUpdate = true;
    this.dispose();
    attr.itemSize = originalItemSize;
    attr.count = originalCount;
  }
};
var UIntVertexAttributeTexture = class extends VertexAttributeTexture {
  constructor() {
    super();
    this._forcedType = UnsignedIntType;
  }
};
var FloatVertexAttributeTexture = class extends VertexAttributeTexture {
  constructor() {
    super();
    this._forcedType = FloatType;
  }
};

// node_modules/three-mesh-bvh/src/gpu/MeshBVHUniformStruct.js
var MeshBVHUniformStruct = class {
  constructor() {
    this.index = new UIntVertexAttributeTexture();
    this.position = new FloatVertexAttributeTexture();
    this.bvhBounds = new DataTexture();
    this.bvhContents = new DataTexture();
    this._cachedIndexAttr = null;
    this.index.overrideItemSize = 3;
  }
  updateFrom(bvh) {
    const { geometry: geometry2 } = bvh;
    bvhToTextures(bvh, this.bvhBounds, this.bvhContents);
    this.position.updateFrom(geometry2.attributes.position);
    if (bvh.indirect) {
      const indirectBuffer = bvh._indirectBuffer;
      if (this._cachedIndexAttr === null || this._cachedIndexAttr.count !== indirectBuffer.length) {
        if (geometry2.index) {
          this._cachedIndexAttr = geometry2.index.clone();
        } else {
          const array = getIndexArray(getVertexCount(geometry2));
          this._cachedIndexAttr = new BufferAttribute(array, 1, false);
        }
      }
      dereferenceIndex(geometry2, indirectBuffer, this._cachedIndexAttr);
      this.index.updateFrom(this._cachedIndexAttr);
    } else {
      this.index.updateFrom(geometry2.index);
    }
  }
  dispose() {
    const { index, position: position2, bvhBounds, bvhContents } = this;
    if (index) index.dispose();
    if (position2) position2.dispose();
    if (bvhBounds) bvhBounds.dispose();
    if (bvhContents) bvhContents.dispose();
  }
};
function dereferenceIndex(geometry2, indirectBuffer, target2) {
  const unpacked = target2.array;
  const indexArray = geometry2.index ? geometry2.index.array : null;
  for (let i2 = 0, l = indirectBuffer.length; i2 < l; i2++) {
    const i3 = 3 * i2;
    const v32 = 3 * indirectBuffer[i2];
    for (let c = 0; c < 3; c++) {
      unpacked[i3 + c] = indexArray ? indexArray[v32 + c] : v32 + c;
    }
  }
}
function bvhToTextures(bvh, boundsTexture, contentsTexture) {
  const roots = bvh._roots;
  if (roots.length !== 1) {
    throw new Error("MeshBVHUniformStruct: Multi-root BVHs not supported.");
  }
  const root = roots[0];
  const uint16Array2 = new Uint16Array(root);
  const uint32Array2 = new Uint32Array(root);
  const float32Array2 = new Float32Array(root);
  const nodeCount = root.byteLength / BYTES_PER_NODE;
  const boundsDimension = 2 * Math.ceil(Math.sqrt(nodeCount / 2));
  const boundsArray = new Float32Array(4 * boundsDimension * boundsDimension);
  const contentsDimension = Math.ceil(Math.sqrt(nodeCount));
  const contentsArray = new Uint32Array(2 * contentsDimension * contentsDimension);
  for (let i2 = 0; i2 < nodeCount; i2++) {
    const nodeIndex32 = i2 * BYTES_PER_NODE / 4;
    const nodeIndex16 = nodeIndex32 * 2;
    const boundsIndex = BOUNDING_DATA_INDEX(nodeIndex32);
    for (let b = 0; b < 3; b++) {
      boundsArray[8 * i2 + 0 + b] = float32Array2[boundsIndex + 0 + b];
      boundsArray[8 * i2 + 4 + b] = float32Array2[boundsIndex + 3 + b];
    }
    if (IS_LEAF(nodeIndex16, uint16Array2)) {
      const count = COUNT(nodeIndex16, uint16Array2);
      const offset = OFFSET(nodeIndex32, uint32Array2);
      const mergedLeafCount = 4294901760 | count;
      contentsArray[i2 * 2 + 0] = mergedLeafCount;
      contentsArray[i2 * 2 + 1] = offset;
    } else {
      const rightIndex = 4 * RIGHT_NODE(nodeIndex32, uint32Array2) / BYTES_PER_NODE;
      const splitAxis = SPLIT_AXIS(nodeIndex32, uint32Array2);
      contentsArray[i2 * 2 + 0] = splitAxis;
      contentsArray[i2 * 2 + 1] = rightIndex;
    }
  }
  boundsTexture.image.data = boundsArray;
  boundsTexture.image.width = boundsDimension;
  boundsTexture.image.height = boundsDimension;
  boundsTexture.format = RGBAFormat;
  boundsTexture.type = FloatType;
  boundsTexture.internalFormat = "RGBA32F";
  boundsTexture.minFilter = NearestFilter;
  boundsTexture.magFilter = NearestFilter;
  boundsTexture.generateMipmaps = false;
  boundsTexture.needsUpdate = true;
  boundsTexture.dispose();
  contentsTexture.image.data = contentsArray;
  contentsTexture.image.width = contentsDimension;
  contentsTexture.image.height = contentsDimension;
  contentsTexture.format = RGIntegerFormat;
  contentsTexture.type = UnsignedIntType;
  contentsTexture.internalFormat = "RG32UI";
  contentsTexture.minFilter = NearestFilter;
  contentsTexture.magFilter = NearestFilter;
  contentsTexture.generateMipmaps = false;
  contentsTexture.needsUpdate = true;
  contentsTexture.dispose();
}

// node_modules/three-mesh-bvh/src/utils/StaticGeometryGenerator.js
var _positionVector = new Vector3();
var _normalVector = new Vector3();
var _tangentVector = new Vector3();
var _tangentVector4 = new Vector4();
var _morphVector = new Vector3();
var _temp = new Vector3();
var _skinIndex = new Vector4();
var _skinWeight = new Vector4();
var _matrix = new Matrix4();
var _boneMatrix = new Matrix4();

// node_modules/three-mesh-bvh/src/gpu/glsl/common_functions.glsl.js
var common_functions = (
  /* glsl */
  `

// A stack of uint32 indices can can store the indices for
// a perfectly balanced tree with a depth up to 31. Lower stack
// depth gets higher performance.
//
// However not all trees are balanced. Best value to set this to
// is the trees max depth.
#ifndef BVH_STACK_DEPTH
#define BVH_STACK_DEPTH 60
#endif

#ifndef INFINITY
#define INFINITY 1e20
#endif

// Utilities
uvec4 uTexelFetch1D( usampler2D tex, uint index ) {

	uint width = uint( textureSize( tex, 0 ).x );
	uvec2 uv;
	uv.x = index % width;
	uv.y = index / width;

	return texelFetch( tex, ivec2( uv ), 0 );

}

ivec4 iTexelFetch1D( isampler2D tex, uint index ) {

	uint width = uint( textureSize( tex, 0 ).x );
	uvec2 uv;
	uv.x = index % width;
	uv.y = index / width;

	return texelFetch( tex, ivec2( uv ), 0 );

}

vec4 texelFetch1D( sampler2D tex, uint index ) {

	uint width = uint( textureSize( tex, 0 ).x );
	uvec2 uv;
	uv.x = index % width;
	uv.y = index / width;

	return texelFetch( tex, ivec2( uv ), 0 );

}

vec4 textureSampleBarycoord( sampler2D tex, vec3 barycoord, uvec3 faceIndices ) {

	return
		barycoord.x * texelFetch1D( tex, faceIndices.x ) +
		barycoord.y * texelFetch1D( tex, faceIndices.y ) +
		barycoord.z * texelFetch1D( tex, faceIndices.z );

}

void ndcToCameraRay(
	vec2 coord, mat4 cameraWorld, mat4 invProjectionMatrix,
	out vec3 rayOrigin, out vec3 rayDirection
) {

	// get camera look direction and near plane for camera clipping
	vec4 lookDirection = cameraWorld * vec4( 0.0, 0.0, - 1.0, 0.0 );
	vec4 nearVector = invProjectionMatrix * vec4( 0.0, 0.0, - 1.0, 1.0 );
	float near = abs( nearVector.z / nearVector.w );

	// get the camera direction and position from camera matrices
	vec4 origin = cameraWorld * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec4 direction = invProjectionMatrix * vec4( coord, 0.5, 1.0 );
	direction /= direction.w;
	direction = cameraWorld * direction - origin;

	// slide the origin along the ray until it sits at the near clip plane position
	origin.xyz += direction.xyz * near / dot( direction, lookDirection );

	rayOrigin = origin.xyz;
	rayDirection = direction.xyz;

}
`
);

// node_modules/three-mesh-bvh/src/gpu/glsl/bvh_ray_functions.glsl.js
var bvh_ray_functions = (
  /* glsl */
  `

#ifndef TRI_INTERSECT_EPSILON
#define TRI_INTERSECT_EPSILON 1e-5
#endif

// Raycasting
bool intersectsBounds( vec3 rayOrigin, vec3 rayDirection, vec3 boundsMin, vec3 boundsMax, out float dist ) {

	// https://www.reddit.com/r/opengl/comments/8ntzz5/fast_glsl_ray_box_intersection/
	// https://tavianator.com/2011/ray_box.html
	vec3 invDir = 1.0 / rayDirection;

	// find intersection distances for each plane
	vec3 tMinPlane = invDir * ( boundsMin - rayOrigin );
	vec3 tMaxPlane = invDir * ( boundsMax - rayOrigin );

	// get the min and max distances from each intersection
	vec3 tMinHit = min( tMaxPlane, tMinPlane );
	vec3 tMaxHit = max( tMaxPlane, tMinPlane );

	// get the furthest hit distance
	vec2 t = max( tMinHit.xx, tMinHit.yz );
	float t0 = max( t.x, t.y );

	// get the minimum hit distance
	t = min( tMaxHit.xx, tMaxHit.yz );
	float t1 = min( t.x, t.y );

	// set distance to 0.0 if the ray starts inside the box
	dist = max( t0, 0.0 );

	return t1 >= dist;

}

bool intersectsTriangle(
	vec3 rayOrigin, vec3 rayDirection, vec3 a, vec3 b, vec3 c,
	out vec3 barycoord, out vec3 norm, out float dist, out float side
) {

	// https://stackoverflow.com/questions/42740765/intersection-between-line-and-triangle-in-3d
	vec3 edge1 = b - a;
	vec3 edge2 = c - a;
	norm = cross( edge1, edge2 );

	float det = - dot( rayDirection, norm );
	float invdet = 1.0 / det;

	vec3 AO = rayOrigin - a;
	vec3 DAO = cross( AO, rayDirection );

	vec4 uvt;
	uvt.x = dot( edge2, DAO ) * invdet;
	uvt.y = - dot( edge1, DAO ) * invdet;
	uvt.z = dot( AO, norm ) * invdet;
	uvt.w = 1.0 - uvt.x - uvt.y;

	// set the hit information
	barycoord = uvt.wxy; // arranged in A, B, C order
	dist = uvt.z;
	side = sign( det );
	norm = side * normalize( norm );

	// add an epsilon to avoid misses between triangles
	uvt += vec4( TRI_INTERSECT_EPSILON );

	return all( greaterThanEqual( uvt, vec4( 0.0 ) ) );

}

bool intersectTriangles(
	// geometry info and triangle range
	sampler2D positionAttr, usampler2D indexAttr, uint offset, uint count,

	// ray
	vec3 rayOrigin, vec3 rayDirection,

	// outputs
	inout float minDistance, inout uvec4 faceIndices, inout vec3 faceNormal, inout vec3 barycoord,
	inout float side, inout float dist
) {

	bool found = false;
	vec3 localBarycoord, localNormal;
	float localDist, localSide;
	for ( uint i = offset, l = offset + count; i < l; i ++ ) {

		uvec3 indices = uTexelFetch1D( indexAttr, i ).xyz;
		vec3 a = texelFetch1D( positionAttr, indices.x ).rgb;
		vec3 b = texelFetch1D( positionAttr, indices.y ).rgb;
		vec3 c = texelFetch1D( positionAttr, indices.z ).rgb;

		if (
			intersectsTriangle( rayOrigin, rayDirection, a, b, c, localBarycoord, localNormal, localDist, localSide )
			&& localDist < minDistance
		) {

			found = true;
			minDistance = localDist;

			faceIndices = uvec4( indices.xyz, i );
			faceNormal = localNormal;

			side = localSide;
			barycoord = localBarycoord;
			dist = localDist;

		}

	}

	return found;

}

bool intersectsBVHNodeBounds( vec3 rayOrigin, vec3 rayDirection, sampler2D bvhBounds, uint currNodeIndex, out float dist ) {

	uint cni2 = currNodeIndex * 2u;
	vec3 boundsMin = texelFetch1D( bvhBounds, cni2 ).xyz;
	vec3 boundsMax = texelFetch1D( bvhBounds, cni2 + 1u ).xyz;
	return intersectsBounds( rayOrigin, rayDirection, boundsMin, boundsMax, dist );

}

// use a macro to hide the fact that we need to expand the struct into separate fields
#define	bvhIntersectFirstHit(		bvh,		rayOrigin, rayDirection, faceIndices, faceNormal, barycoord, side, dist	)	_bvhIntersectFirstHit(		bvh.position, bvh.index, bvh.bvhBounds, bvh.bvhContents,		rayOrigin, rayDirection, faceIndices, faceNormal, barycoord, side, dist	)

bool _bvhIntersectFirstHit(
	// bvh info
	sampler2D bvh_position, usampler2D bvh_index, sampler2D bvh_bvhBounds, usampler2D bvh_bvhContents,

	// ray
	vec3 rayOrigin, vec3 rayDirection,

	// output variables split into separate variables due to output precision
	inout uvec4 faceIndices, inout vec3 faceNormal, inout vec3 barycoord,
	inout float side, inout float dist
) {

	// stack needs to be twice as long as the deepest tree we expect because
	// we push both the left and right child onto the stack every traversal
	int ptr = 0;
	uint stack[ BVH_STACK_DEPTH ];
	stack[ 0 ] = 0u;

	float triangleDistance = INFINITY;
	bool found = false;
	while ( ptr > - 1 && ptr < BVH_STACK_DEPTH ) {

		uint currNodeIndex = stack[ ptr ];
		ptr --;

		// check if we intersect the current bounds
		float boundsHitDistance;
		if (
			! intersectsBVHNodeBounds( rayOrigin, rayDirection, bvh_bvhBounds, currNodeIndex, boundsHitDistance )
			|| boundsHitDistance > triangleDistance
		) {

			continue;

		}

		uvec2 boundsInfo = uTexelFetch1D( bvh_bvhContents, currNodeIndex ).xy;
		bool isLeaf = bool( boundsInfo.x & 0xffff0000u );

		if ( isLeaf ) {

			uint count = boundsInfo.x & 0x0000ffffu;
			uint offset = boundsInfo.y;

			found = intersectTriangles(
				bvh_position, bvh_index, offset, count,
				rayOrigin, rayDirection, triangleDistance,
				faceIndices, faceNormal, barycoord, side, dist
			) || found;

		} else {

			uint leftIndex = currNodeIndex + 1u;
			uint splitAxis = boundsInfo.x & 0x0000ffffu;
			uint rightIndex = boundsInfo.y;

			bool leftToRight = rayDirection[ splitAxis ] >= 0.0;
			uint c1 = leftToRight ? leftIndex : rightIndex;
			uint c2 = leftToRight ? rightIndex : leftIndex;

			// set c2 in the stack so we traverse it later. We need to keep track of a pointer in
			// the stack while we traverse. The second pointer added is the one that will be
			// traversed first
			ptr ++;
			stack[ ptr ] = c2;

			ptr ++;
			stack[ ptr ] = c1;

		}

	}

	return found;

}
`
);

// node_modules/three-mesh-bvh/src/gpu/glsl/bvh_struct_definitions.glsl.js
var bvh_struct_definitions = (
  /* glsl */
  `
struct BVH {

	usampler2D index;
	sampler2D position;

	sampler2D bvhBounds;
	usampler2D bvhContents;

};
`
);

// node_modules/three-mesh-bvh/src/index.js
var shaderStructs = bvh_struct_definitions;
var shaderIntersectFunction = `
	${common_functions}
	${bvh_ray_functions}
`;

// node_modules/@react-three/drei/core/Bvh.js
var isMesh = (child) => child.isMesh;
function useBVH(mesh, options) {
  options = {
    strategy: SAH,
    verbose: false,
    setBoundingBox: true,
    maxDepth: 40,
    maxLeafTris: 10,
    indirect: false,
    ...options
  };
  React70.useEffect(() => {
    if (mesh.current) {
      mesh.current.raycast = acceleratedRaycast;
      const geometry2 = mesh.current.geometry;
      geometry2.computeBoundsTree = computeBoundsTree;
      geometry2.disposeBoundsTree = disposeBoundsTree;
      geometry2.computeBoundsTree(options);
      return () => {
        if (geometry2.boundsTree) {
          geometry2.disposeBoundsTree();
        }
      };
    }
  }, [mesh, JSON.stringify(options)]);
}
var Bvh = React70.forwardRef(({
  enabled = true,
  firstHitOnly = false,
  children,
  strategy = SAH,
  verbose = false,
  setBoundingBox = true,
  maxDepth = 40,
  maxLeafTris = 10,
  indirect = false,
  ...props
}, fref) => {
  const ref = React70.useRef(null);
  const raycaster = useThree((state) => state.raycaster);
  React70.useImperativeHandle(fref, () => ref.current, []);
  React70.useEffect(() => {
    if (enabled) {
      const options = {
        strategy,
        verbose,
        setBoundingBox,
        maxDepth,
        maxLeafTris,
        indirect
      };
      const group = ref.current;
      raycaster.firstHitOnly = firstHitOnly;
      group.traverse((child) => {
        if (isMesh(child) && !child.geometry.boundsTree && child.raycast === Mesh.prototype.raycast) {
          child.raycast = acceleratedRaycast;
          child.geometry.computeBoundsTree = computeBoundsTree;
          child.geometry.disposeBoundsTree = disposeBoundsTree;
          child.geometry.computeBoundsTree(options);
        }
      });
      return () => {
        delete raycaster.firstHitOnly;
        group.traverse((child) => {
          if (isMesh(child) && child.geometry.boundsTree) {
            child.geometry.disposeBoundsTree();
            child.raycast = Mesh.prototype.raycast;
          }
        });
      };
    }
  }, []);
  return React70.createElement("group", _extends({
    ref
  }, props), children);
});

// node_modules/@react-three/drei/core/useContextBridge.js
var React71 = __toESM(require_react());
function useContextBridge(...contexts) {
  const cRef = React71.useRef([]);
  cRef.current = contexts.map((context12) => React71.useContext(context12));
  return React71.useMemo(() => ({
    children
  }) => contexts.reduceRight(
    (acc, Context2, i2) => React71.createElement(Context2.Provider, {
      value: cRef.current[i2],
      children: acc
    }),
    children
    /*
     * done this way in reference to:
     * https://github.com/DefinitelyTyped/DefinitelyTyped/issues/44572#issuecomment-625878049
     * https://github.com/microsoft/TypeScript/issues/14729
     */
  ), []);
}

// node_modules/@react-three/drei/core/useAnimations.js
var React72 = __toESM(require_react());
function useAnimations(clips, root) {
  const ref = React72.useRef(null);
  const [actualRef] = React72.useState(() => root ? root instanceof Object3D ? {
    current: root
  } : root : ref);
  const [mixer] = React72.useState(() => new AnimationMixer(void 0));
  React72.useLayoutEffect(() => {
    if (root) actualRef.current = root instanceof Object3D ? root : root.current;
    mixer._root = actualRef.current;
  });
  const lazyActions = React72.useRef({});
  const api = React72.useMemo(() => {
    const actions = {};
    clips.forEach((clip) => Object.defineProperty(actions, clip.name, {
      enumerable: true,
      get() {
        if (actualRef.current) {
          return lazyActions.current[clip.name] || (lazyActions.current[clip.name] = mixer.clipAction(clip, actualRef.current));
        }
      },
      configurable: true
    }));
    return {
      ref: actualRef,
      clips,
      actions,
      names: clips.map((c) => c.name),
      mixer
    };
  }, [clips]);
  useFrame((state, delta) => mixer.update(delta));
  React72.useEffect(() => {
    const currentRoot = actualRef.current;
    return () => {
      lazyActions.current = {};
      mixer.stopAllAction();
      Object.values(api.actions).forEach((action) => {
        if (currentRoot) {
          mixer.uncacheAction(action, currentRoot);
        }
      });
    };
  }, [clips]);
  return api;
}

// node_modules/@react-three/drei/core/useIntersect.js
var React73 = __toESM(require_react());
function useIntersect(onChange) {
  const ref = React73.useRef(null);
  const check = React73.useRef(false);
  const temp5 = React73.useRef(false);
  const callback = React73.useRef(onChange);
  React73.useLayoutEffect(() => void (callback.current = onChange), [onChange]);
  React73.useEffect(() => {
    const obj = ref.current;
    if (obj) {
      const unsub1 = addEffect(() => {
        check.current = false;
        return true;
      });
      const oldOnRender = obj.onBeforeRender;
      obj.onBeforeRender = () => check.current = true;
      const unsub2 = addAfterEffect(() => {
        if (check.current !== temp5.current) callback.current == null || callback.current(temp5.current = check.current);
        return true;
      });
      return () => {
        obj.onBeforeRender = oldOnRender;
        unsub1();
        unsub2();
      };
    }
  }, []);
  return ref;
}

// node_modules/@react-three/drei/core/useBoxProjectedEnv.js
var React74 = __toESM(require_react());
var worldposReplace = (
  /* glsl */
  `
#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP )
  vec4 worldPosition = modelMatrix * vec4( transformed, 1.0 );
  #ifdef BOX_PROJECTED_ENV_MAP
    vWorldPosition = worldPosition.xyz;
  #endif
#endif
`
);
var boxProjectDefinitions = (
  /*glsl */
  `
#ifdef BOX_PROJECTED_ENV_MAP
  uniform vec3 envMapSize;
  uniform vec3 envMapPosition;
  varying vec3 vWorldPosition;
    
  vec3 parallaxCorrectNormal( vec3 v, vec3 cubeSize, vec3 cubePos ) {
    vec3 nDir = normalize( v );
    vec3 rbmax = ( .5 * cubeSize + cubePos - vWorldPosition ) / nDir;
    vec3 rbmin = ( -.5 * cubeSize + cubePos - vWorldPosition ) / nDir;
    vec3 rbminmax;
    rbminmax.x = ( nDir.x > 0. ) ? rbmax.x : rbmin.x;
    rbminmax.y = ( nDir.y > 0. ) ? rbmax.y : rbmin.y;
    rbminmax.z = ( nDir.z > 0. ) ? rbmax.z : rbmin.z;
    float correction = min( min( rbminmax.x, rbminmax.y ), rbminmax.z );
    vec3 boxIntersection = vWorldPosition + nDir * correction;    
    return boxIntersection - cubePos;
  }
#endif
`
);
var getIBLIrradiance_patch = (
  /* glsl */
  `
#ifdef BOX_PROJECTED_ENV_MAP
  worldNormal = parallaxCorrectNormal( worldNormal, envMapSize, envMapPosition );
#endif
`
);
var getIBLRadiance_patch = (
  /* glsl */
  `
#ifdef BOX_PROJECTED_ENV_MAP
  reflectVec = parallaxCorrectNormal( reflectVec, envMapSize, envMapPosition );
#endif
`
);
function boxProjectedEnvMap(shader, envMapPosition, envMapSize) {
  shader.defines.BOX_PROJECTED_ENV_MAP = true;
  shader.uniforms.envMapPosition = {
    value: envMapPosition
  };
  shader.uniforms.envMapSize = {
    value: envMapSize
  };
  shader.vertexShader = `
  varying vec3 vWorldPosition;
  ${shader.vertexShader.replace("#include <worldpos_vertex>", worldposReplace)}`;
  shader.fragmentShader = `
    ${boxProjectDefinitions}
    ${shader.fragmentShader.replace("#include <envmap_physical_pars_fragment>", ShaderChunk.envmap_physical_pars_fragment).replace("vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );", `vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
         ${getIBLIrradiance_patch}
         `).replace("reflectVec = inverseTransformDirection( reflectVec, viewMatrix );", `reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
         ${getIBLRadiance_patch}
        `)}`;
}
function useBoxProjectedEnv(position2 = new Vector3(), size = new Vector3()) {
  const [config] = React74.useState(() => ({
    position: new Vector3(),
    size: new Vector3()
  }));
  applyProps(config, {
    position: position2,
    size
  });
  const ref = React74.useRef(null);
  const spread = React74.useMemo(() => ({
    ref,
    onBeforeCompile: (shader) => boxProjectedEnvMap(shader, config.position, config.size),
    customProgramCacheKey: () => JSON.stringify(config.position.toArray()) + JSON.stringify(config.size.toArray())
  }), [...config.position.toArray(), ...config.size.toArray()]);
  React74.useLayoutEffect(() => void (ref.current.needsUpdate = true), [config]);
  return spread;
}

// node_modules/@react-three/drei/core/BBAnchor.js
var React75 = __toESM(require_react());
var boundingBox4 = new Box3();
var boundingBoxSize = new Vector3();
var BBAnchor = ({
  anchor,
  ...props
}) => {
  const ref = React75.useRef(null);
  const parentRef = React75.useRef(null);
  React75.useEffect(() => {
    var _ref$current;
    if ((_ref$current = ref.current) != null && (_ref$current = _ref$current.parent) != null && _ref$current.parent) {
      parentRef.current = ref.current.parent;
      ref.current.parent.parent.add(ref.current);
    }
  }, []);
  useFrame(() => {
    if (parentRef.current) {
      boundingBox4.setFromObject(parentRef.current);
      boundingBox4.getSize(boundingBoxSize);
      ref.current.position.set(parentRef.current.position.x + boundingBoxSize.x * (Array.isArray(anchor) ? anchor[0] : anchor.x) / 2, parentRef.current.position.y + boundingBoxSize.y * (Array.isArray(anchor) ? anchor[1] : anchor.y) / 2, parentRef.current.position.z + boundingBoxSize.z * (Array.isArray(anchor) ? anchor[2] : anchor.z) / 2);
    }
  });
  return React75.createElement("group", _extends({
    ref
  }, props));
};

// node_modules/@react-three/drei/core/TrailTexture.js
var React76 = __toESM(require_react());
var import_react15 = __toESM(require_react());
function smoothAverage(current, measurement, smoothing = 0.9) {
  return measurement * smoothing + current * (1 - smoothing);
}
var easeCircleOut = (x) => Math.sqrt(1 - Math.pow(x - 1, 2));
var TrailTextureImpl = class {
  constructor({
    size = 256,
    maxAge = 750,
    radius = 0.3,
    intensity = 0.2,
    interpolate = 0,
    smoothing = 0,
    minForce = 0.3,
    blend = "screen",
    // source-over is canvas default. Others are slower
    ease = easeCircleOut
  } = {}) {
    this.size = size;
    this.maxAge = maxAge;
    this.radius = radius;
    this.intensity = intensity;
    this.ease = ease;
    this.interpolate = interpolate;
    this.smoothing = smoothing;
    this.minForce = minForce;
    this.blend = blend;
    this.trail = [];
    this.force = 0;
    this.initTexture();
  }
  initTexture() {
    this.canvas = document.createElement("canvas");
    this.canvas.width = this.canvas.height = this.size;
    const ctx = this.canvas.getContext("2d");
    if (ctx === null) {
      throw new Error("2D not available");
    }
    this.ctx = ctx;
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.texture = new Texture(this.canvas);
    this.canvas.id = "touchTexture";
    this.canvas.style.width = this.canvas.style.height = `${this.canvas.width}px`;
  }
  update(delta) {
    this.clear();
    this.trail.forEach((point, i2) => {
      point.age += delta * 1e3;
      if (point.age > this.maxAge) {
        this.trail.splice(i2, 1);
      }
    });
    if (!this.trail.length) this.force = 0;
    this.trail.forEach((point) => {
      this.drawTouch(point);
    });
    this.texture.needsUpdate = true;
  }
  clear() {
    this.ctx.globalCompositeOperation = "source-over";
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }
  addTouch(point) {
    const last = this.trail[this.trail.length - 1];
    if (last) {
      const dx = last.x - point.x;
      const dy = last.y - point.y;
      const dd = dx * dx + dy * dy;
      const force = Math.max(this.minForce, Math.min(dd * 1e4, 1));
      this.force = smoothAverage(force, this.force, this.smoothing);
      if (!!this.interpolate) {
        const lines = Math.ceil(dd / Math.pow(this.radius * 0.5 / this.interpolate, 2));
        if (lines > 1) {
          for (let i2 = 1; i2 < lines; i2++) {
            this.trail.push({
              x: last.x - dx / lines * i2,
              y: last.y - dy / lines * i2,
              age: 0,
              force
            });
          }
        }
      }
    }
    this.trail.push({
      x: point.x,
      y: point.y,
      age: 0,
      force: this.force
    });
  }
  drawTouch(point) {
    const pos = {
      x: point.x * this.size,
      y: (1 - point.y) * this.size
    };
    let intensity = 1;
    if (point.age < this.maxAge * 0.3) {
      intensity = this.ease(point.age / (this.maxAge * 0.3));
    } else {
      intensity = this.ease(1 - (point.age - this.maxAge * 0.3) / (this.maxAge * 0.7));
    }
    intensity *= point.force;
    this.ctx.globalCompositeOperation = this.blend;
    const radius = this.size * this.radius * intensity;
    const grd = this.ctx.createRadialGradient(pos.x, pos.y, Math.max(0, radius * 0.25), pos.x, pos.y, Math.max(0, radius));
    grd.addColorStop(0, `rgba(255, 255, 255, ${this.intensity})`);
    grd.addColorStop(1, `rgba(0, 0, 0, 0.0)`);
    this.ctx.beginPath();
    this.ctx.fillStyle = grd;
    this.ctx.arc(pos.x, pos.y, Math.max(0, radius), 0, Math.PI * 2);
    this.ctx.fill();
  }
};
function useTrailTexture(config = {}) {
  const {
    size,
    maxAge,
    radius,
    intensity,
    interpolate,
    smoothing,
    minForce,
    blend,
    ease
  } = config;
  const trail = (0, import_react15.useMemo)(() => new TrailTextureImpl(config), [size, maxAge, radius, intensity, interpolate, smoothing, minForce, blend, ease]);
  useFrame((_, delta) => void trail.update(delta));
  const onMove = (0, import_react15.useCallback)((e) => trail.addTouch(e.uv), [trail]);
  return [trail.texture, onMove];
}
var TrailTexture = ({
  children,
  ...config
}) => {
  const ret = useTrailTexture(config);
  return React76.createElement(React76.Fragment, null, children == null ? void 0 : children(ret));
};

// node_modules/@react-three/drei/core/Example.js
var React78 = __toESM(require_react());

// node_modules/@react-three/drei/core/Center.js
var React77 = __toESM(require_react());
var Center = React77.forwardRef(function Center2({
  children,
  object,
  disable,
  disableX,
  disableY,
  disableZ,
  left,
  right,
  top,
  bottom,
  front,
  back,
  onCentered,
  precise = true,
  cacheKey = 0,
  ...props
}, fRef) {
  const ref = React77.useRef(null);
  const outer = React77.useRef(null);
  const inner = React77.useRef(null);
  const [box3] = React77.useState(() => new Box3());
  const [center] = React77.useState(() => new Vector3());
  const [sphere] = React77.useState(() => new Sphere());
  React77.useLayoutEffect(() => {
    outer.current.matrixWorld.identity();
    box3.setFromObject(object !== null && object !== void 0 ? object : inner.current, precise);
    const width = box3.max.x - box3.min.x;
    const height = box3.max.y - box3.min.y;
    const depth = box3.max.z - box3.min.z;
    box3.getCenter(center);
    box3.getBoundingSphere(sphere);
    const vAlign = top ? height / 2 : bottom ? -height / 2 : 0;
    const hAlign = left ? -width / 2 : right ? width / 2 : 0;
    const dAlign = front ? depth / 2 : back ? -depth / 2 : 0;
    outer.current.position.set(disable || disableX ? 0 : -center.x + hAlign, disable || disableY ? 0 : -center.y + vAlign, disable || disableZ ? 0 : -center.z + dAlign);
    onCentered == null || onCentered({
      parent: ref.current.parent,
      container: ref.current,
      width,
      height,
      depth,
      boundingBox: box3,
      boundingSphere: sphere,
      center,
      verticalAlignment: vAlign,
      horizontalAlignment: hAlign,
      depthAlignment: dAlign
    });
  }, [cacheKey, onCentered, top, left, front, disable, disableX, disableY, disableZ, object, precise, right, bottom, back, box3, center, sphere]);
  React77.useImperativeHandle(fRef, () => ref.current, []);
  return React77.createElement("group", _extends({
    ref
  }, props), React77.createElement("group", {
    ref: outer
  }, React77.createElement("group", {
    ref: inner
  }, children)));
});

// node_modules/@react-three/drei/core/Example.js
var Example = React78.forwardRef(({
  font,
  color = "#cbcbcb",
  bevelSize = 0.04,
  debug = false,
  children,
  ...props
}, fref) => {
  const [counter, setCounter] = React78.useState(0);
  const incr = React78.useCallback((x = 1) => setCounter(counter + x), [counter]);
  const decr = React78.useCallback((x = 1) => setCounter(counter - x), [counter]);
  const api = React78.useMemo(() => ({
    incr,
    decr
  }), [incr, decr]);
  React78.useImperativeHandle(fref, () => api, [api]);
  return React78.createElement("group", props, React78.createElement(React78.Suspense, {
    fallback: null
  }, React78.createElement(Center, {
    top: true,
    cacheKey: JSON.stringify({
      counter,
      font
    })
  }, React78.createElement(Text3D, {
    bevelEnabled: true,
    bevelSize,
    font
  }, debug ? React78.createElement("meshNormalMaterial", {
    wireframe: true
  }) : React78.createElement("meshStandardMaterial", {
    color
  }), counter))), children);
});

// node_modules/@react-three/drei/core/SpriteAnimator.js
var React80 = __toESM(require_react());

// node_modules/@react-three/drei/core/Instances.js
var React79 = __toESM(require_react());

// node_modules/@react-three/drei/helpers/deprecated.js
var setUpdateRange = (attribute, updateRange) => {
  attribute.updateRanges[0] = updateRange;
};

// node_modules/@react-three/drei/core/Instances.js
function isFunctionChild(value) {
  return typeof value === "function";
}
var _instanceLocalMatrix = new Matrix4();
var _instanceWorldMatrix = new Matrix4();
var _instanceIntersects = [];
var _mesh2 = new Mesh();
var PositionMesh = class extends Group {
  constructor() {
    super();
    this.color = new Color("white");
    this.instance = {
      current: void 0
    };
    this.instanceKey = {
      current: void 0
    };
  }
  // This will allow the virtual instance have bounds
  get geometry() {
    var _this$instance$curren;
    return (_this$instance$curren = this.instance.current) == null ? void 0 : _this$instance$curren.geometry;
  }
  // And this will allow the virtual instance to receive events
  raycast(raycaster, intersects) {
    const parent = this.instance.current;
    if (!parent) return;
    if (!parent.geometry || !parent.material) return;
    _mesh2.geometry = parent.geometry;
    const matrixWorld = parent.matrixWorld;
    const instanceId = parent.userData.instances.indexOf(this.instanceKey);
    if (instanceId === -1 || instanceId > parent.count) return;
    parent.getMatrixAt(instanceId, _instanceLocalMatrix);
    _instanceWorldMatrix.multiplyMatrices(matrixWorld, _instanceLocalMatrix);
    _mesh2.matrixWorld = _instanceWorldMatrix;
    if (parent.material instanceof Material) _mesh2.material.side = parent.material.side;
    else _mesh2.material.side = parent.material[0].side;
    _mesh2.raycast(raycaster, _instanceIntersects);
    for (let i2 = 0, l = _instanceIntersects.length; i2 < l; i2++) {
      const intersect = _instanceIntersects[i2];
      intersect.instanceId = instanceId;
      intersect.object = this;
      intersects.push(intersect);
    }
    _instanceIntersects.length = 0;
  }
};
var globalContext2 = React79.createContext(null);
var parentMatrix = new Matrix4();
var instanceMatrix = new Matrix4();
var tempMatrix3 = new Matrix4();
var translation = new Vector3();
var rotation = new Quaternion();
var scale = new Vector3();
var isInstancedBufferAttribute = (attr) => attr.isInstancedBufferAttribute;
var Instance = React79.forwardRef(({
  context: context12,
  children,
  ...props
}, ref) => {
  React79.useMemo(() => extend({
    PositionMesh
  }), []);
  const group = React79.useRef(null);
  React79.useImperativeHandle(ref, () => group.current, []);
  const {
    subscribe,
    getParent
  } = React79.useContext(context12 || globalContext2);
  React79.useLayoutEffect(() => subscribe(group), []);
  return React79.createElement("positionMesh", _extends({
    instance: getParent(),
    instanceKey: group,
    ref: group
  }, props), children);
});
var Instances = React79.forwardRef(({
  context: context12,
  children,
  range,
  limit = 1e3,
  frames = Infinity,
  ...props
}, ref) => {
  const [{
    localContext,
    instance
  }] = React79.useState(() => {
    const localContext2 = React79.createContext(null);
    return {
      localContext: localContext2,
      instance: React79.forwardRef((props2, ref2) => React79.createElement(Instance, _extends({
        context: localContext2
      }, props2, {
        ref: ref2
      })))
    };
  });
  const parentRef = React79.useRef(null);
  React79.useImperativeHandle(ref, () => parentRef.current, []);
  const [instances, setInstances] = React79.useState([]);
  const [[matrices, colors2]] = React79.useState(() => {
    const mArray = new Float32Array(limit * 16);
    for (let i2 = 0; i2 < limit; i2++) tempMatrix3.identity().toArray(mArray, i2 * 16);
    return [mArray, new Float32Array([...new Array(limit * 3)].map(() => 1))];
  });
  React79.useEffect(() => {
    parentRef.current.instanceMatrix.needsUpdate = true;
  });
  let iterations = 0;
  let count = 0;
  const attributes = React79.useRef([]);
  React79.useLayoutEffect(() => {
    attributes.current = Object.entries(parentRef.current.geometry.attributes).filter(([_name, value]) => isInstancedBufferAttribute(value));
  });
  useFrame(() => {
    if (frames === Infinity || iterations < frames) {
      parentRef.current.updateMatrix();
      parentRef.current.updateMatrixWorld();
      parentMatrix.copy(parentRef.current.matrixWorld).invert();
      count = Math.min(limit, range !== void 0 ? range : limit, instances.length);
      parentRef.current.count = count;
      setUpdateRange(parentRef.current.instanceMatrix, {
        start: 0,
        count: count * 16
      });
      setUpdateRange(parentRef.current.instanceColor, {
        start: 0,
        count: count * 3
      });
      for (let i2 = 0; i2 < instances.length; i2++) {
        const instance2 = instances[i2].current;
        instance2.matrixWorld.decompose(translation, rotation, scale);
        instanceMatrix.compose(translation, rotation, scale).premultiply(parentMatrix);
        instanceMatrix.toArray(matrices, i2 * 16);
        parentRef.current.instanceMatrix.needsUpdate = true;
        instance2.color.toArray(colors2, i2 * 3);
        parentRef.current.instanceColor.needsUpdate = true;
      }
      iterations++;
    }
  });
  const api = React79.useMemo(() => ({
    getParent: () => parentRef,
    subscribe: (ref2) => {
      setInstances((instances2) => [...instances2, ref2]);
      return () => setInstances((instances2) => instances2.filter((item) => item.current !== ref2.current));
    }
  }), []);
  return React79.createElement("instancedMesh", _extends({
    userData: {
      instances,
      limit,
      frames
    },
    matrixAutoUpdate: false,
    ref: parentRef,
    args: [null, null, 0],
    raycast: () => null
  }, props), React79.createElement("instancedBufferAttribute", {
    attach: "instanceMatrix",
    args: [matrices, 16],
    usage: DynamicDrawUsage
  }), React79.createElement("instancedBufferAttribute", {
    attach: "instanceColor",
    args: [colors2, 3],
    usage: DynamicDrawUsage
  }), isFunctionChild(children) ? React79.createElement(localContext.Provider, {
    value: api
  }, children(instance)) : context12 ? React79.createElement(context12.Provider, {
    value: api
  }, children) : React79.createElement(globalContext2.Provider, {
    value: api
  }, children));
});
var Merged = React79.forwardRef(function Merged2({
  meshes,
  children,
  ...props
}, ref) {
  const isArray3 = Array.isArray(meshes);
  if (!isArray3) {
    for (const key of Object.keys(meshes)) if (!meshes[key].isMesh) delete meshes[key];
  }
  const render = (args) => isArray3 ? (
    // @ts-expect-error
    children(...args)
  ) : children(
    // @ts-expect-error
    Object.keys(meshes).filter((key) => meshes[key].isMesh).reduce((acc, key, i2) => ({
      ...acc,
      [key]: args[i2]
    }), {})
  );
  const components = (isArray3 ? meshes : Object.values(meshes)).map(({
    geometry: geometry2,
    material
  }) => React79.createElement(Instances, _extends({
    key: geometry2.uuid,
    geometry: geometry2,
    material
  }, props)));
  return React79.createElement("group", {
    ref
  }, renderRecursive(render, components));
});
function renderRecursive(render, components, results = []) {
  if (!components[0]) {
    return render(results);
  }
  function nextRender(value) {
    return renderRecursive(render, components.slice(1), results.concat([value]));
  }
  return typeof components[0] === "function" ? (
    // When it is a function, produce an element by invoking it with "render component values".
    components[0]({
      results,
      render: nextRender
    })
  ) : (
    // When it is an element, enhance the element's props with the render prop.
    React79.cloneElement(components[0], {
      children: nextRender
    })
  );
}
function createInstances() {
  const context12 = React79.createContext(null);
  return [React79.forwardRef((props, fref) => React79.createElement(Instances, _extends({
    ref: fref,
    context: context12
  }, props))), React79.forwardRef((props, fref) => React79.createElement(Instance, _extends({
    ref: fref,
    context: context12
  }, props)))];
}
var InstancedAttribute = React79.forwardRef(({
  name,
  defaultValue,
  normalized,
  usage = DynamicDrawUsage
}, fref) => {
  const ref = React79.useRef(null);
  React79.useImperativeHandle(fref, () => ref.current, []);
  React79.useLayoutEffect(() => {
    const parent = ref.current.__r3f.parent.object;
    parent.geometry.attributes[name] = ref.current;
    const value = Array.isArray(defaultValue) ? defaultValue : [defaultValue];
    const array = Array.from({
      length: parent.userData.limit
    }, () => value).flat();
    ref.current.array = new Float32Array(array);
    ref.current.itemSize = value.length;
    ref.current.count = array.length / ref.current.itemSize;
    return () => {
      delete parent.geometry.attributes[name];
    };
  }, [name]);
  let iterations = 0;
  useFrame(() => {
    const parent = ref.current.__r3f.parent.object;
    if (parent.userData.frames === Infinity || iterations < parent.userData.frames) {
      for (let i2 = 0; i2 < parent.userData.instances.length; i2++) {
        const instance = parent.userData.instances[i2].current;
        const value = instance[name];
        if (value !== void 0) {
          ref.current.set(Array.isArray(value) ? value : typeof value.toArray === "function" ? value.toArray() : [value], i2 * ref.current.itemSize);
          ref.current.needsUpdate = true;
        }
      }
      iterations++;
    }
  });
  return React79.createElement("instancedBufferAttribute", {
    ref,
    usage,
    normalized
  });
});

// node_modules/@react-three/drei/core/SpriteAnimator.js
var context5 = React80.createContext(null);
function useSpriteAnimator() {
  return React80.useContext(context5);
}
function isSpriteData(data) {
  return data !== null && "meta" in data && "frames" in data;
}
var geometry = new PlaneGeometry(1, 1);
var SpriteAnimator = React80.forwardRef(({
  startFrame = 0,
  endFrame,
  fps = 30,
  frameName = "",
  textureDataURL,
  textureImageURL,
  loop = false,
  numberOfFrames = 1,
  autoPlay = true,
  animationNames,
  onStart,
  onEnd,
  onLoopEnd,
  onFrame,
  play,
  pause = false,
  flipX = false,
  alphaTest = 0,
  children,
  asSprite = false,
  offset,
  playBackwards = false,
  resetOnEnd = false,
  maxItems = 1,
  instanceItems = [[0, 0, 0]],
  spriteDataset,
  canvasRenderingContext2DSettings,
  roundFramePosition = false,
  meshProps = {},
  ...props
}, fref) => {
  const ref = React80.useRef(new Group());
  const spriteData = React80.useRef(null);
  const matRef = React80.useRef(null);
  const spriteRef = React80.useRef(null);
  const timerOffset = React80.useRef(window.performance.now());
  const currentFrame = React80.useRef(startFrame);
  const currentFrameName = React80.useRef(frameName);
  const fpsInterval = fps > 0 ? 1e3 / fps : 0;
  const [spriteTexture, setSpriteTexture] = React80.useState(new Texture());
  const totalFrames = React80.useRef(0);
  const [aspect, setAspect] = React80.useState(new Vector3(1, 1, 1));
  const flipOffset = flipX ? -1 : 1;
  const pauseRef = React80.useRef(pause);
  const pos = React80.useRef(offset);
  const softEnd = React80.useRef(false);
  const {
    spriteObj,
    loadJsonAndTexture
  } = useSpriteLoader(null, null, animationNames, numberOfFrames, void 0, canvasRenderingContext2DSettings);
  const frameNameRef = React80.useRef(frameName);
  const parseSpriteDataLite = React80.useCallback((textureData, data) => {
    if (data === null) {
      if (numberOfFrames) {
        totalFrames.current = numberOfFrames;
        if (playBackwards) {
          currentFrame.current = numberOfFrames - 1;
        }
        spriteData.current = data;
      }
    } else {
      var _spriteData$current$f, _spriteData$current;
      spriteData.current = data;
      if (spriteData.current && Array.isArray(spriteData.current.frames)) {
        totalFrames.current = spriteData.current.frames.length;
      } else if (spriteData.current && typeof spriteData.current === "object" && frameNameRef.current) {
        totalFrames.current = spriteData.current.frames[frameNameRef.current].length;
      } else {
        totalFrames.current = 0;
      }
      if (playBackwards) {
        currentFrame.current = totalFrames.current - 1;
      }
      const {
        w,
        h
      } = getFirstFrame((_spriteData$current$f = (_spriteData$current = spriteData.current) == null ? void 0 : _spriteData$current.frames) !== null && _spriteData$current$f !== void 0 ? _spriteData$current$f : [], frameNameRef.current).sourceSize;
      const aspect2 = calculateAspectRatio(w, h);
      setAspect(aspect2);
      if (matRef.current) {
        matRef.current.map = textureData;
      }
    }
    setSpriteTexture(textureData);
  }, [numberOfFrames, playBackwards]);
  const modifySpritePosition = React80.useCallback(() => {
    if (!spriteData.current) return;
    const {
      meta: {
        size: metaInfo
      },
      frames
    } = spriteData.current;
    const {
      w: frameW,
      h: frameH
    } = Array.isArray(frames) ? frames[0].sourceSize : frameName ? frames[frameName] ? frames[frameName][0].sourceSize : {
      w: 0,
      h: 0
    } : {
      w: 0,
      h: 0
    };
    if (matRef.current && matRef.current.map) {
      matRef.current.map.wrapS = matRef.current.map.wrapT = RepeatWrapping;
      matRef.current.map.center.set(0, 0);
      matRef.current.map.repeat.set(1 * flipOffset / (metaInfo.w / frameW), 1 / (metaInfo.h / frameH));
    }
    const framesV = (metaInfo.h - 1) / frameH;
    const frameOffsetY = 1 / framesV;
    if (matRef.current && matRef.current.map) {
      matRef.current.map.offset.x = 0;
      matRef.current.map.offset.y = 1 - frameOffsetY;
    }
    if (onStart) {
      onStart({
        currentFrameName: frameName !== null && frameName !== void 0 ? frameName : "",
        currentFrame: currentFrame.current
      });
    }
  }, [flipOffset, frameName, onStart]);
  const state = React80.useMemo(() => ({
    current: pos.current,
    offset: pos.current,
    imageUrl: textureImageURL,
    hasEnded: false,
    ref: fref
  }), [textureImageURL, fref]);
  React80.useImperativeHandle(fref, () => ref.current, []);
  React80.useLayoutEffect(() => {
    pos.current = offset;
  }, [offset]);
  const calculateAspectRatio = (width, height) => {
    var _spriteRef$current;
    const ret = new Vector3();
    const aspectRatio = height / width;
    ret.set(1, aspectRatio, 1);
    (_spriteRef$current = spriteRef.current) == null || _spriteRef$current.scale.copy(ret);
    return ret;
  };
  React80.useEffect(() => {
    if (spriteDataset) {
      var _spriteDataset$sprite;
      parseSpriteDataLite(spriteDataset == null || (_spriteDataset$sprite = spriteDataset.spriteTexture) == null ? void 0 : _spriteDataset$sprite.clone(), spriteDataset.spriteData);
    } else {
      if (textureImageURL && textureDataURL) {
        loadJsonAndTexture(textureImageURL, textureDataURL);
      }
    }
  }, [loadJsonAndTexture, spriteDataset, textureDataURL, textureImageURL, parseSpriteDataLite]);
  React80.useEffect(() => {
    if (spriteObj) {
      var _spriteObj$spriteText;
      parseSpriteDataLite(spriteObj == null || (_spriteObj$spriteText = spriteObj.spriteTexture) == null ? void 0 : _spriteObj$spriteText.clone(), spriteObj == null ? void 0 : spriteObj.spriteData);
    }
  }, [spriteObj, parseSpriteDataLite]);
  React80.useEffect(() => {
    state.hasEnded = false;
    if (spriteData.current && playBackwards === true) {
      var _ref;
      currentFrame.current = ((_ref = spriteData.current.frames.length) !== null && _ref !== void 0 ? _ref : 0) - 1;
    } else {
      currentFrame.current = 0;
    }
  }, [playBackwards, state]);
  React80.useLayoutEffect(() => {
    modifySpritePosition();
  }, [spriteTexture, flipX, modifySpritePosition]);
  React80.useEffect(() => {
    if (autoPlay) {
      pauseRef.current = false;
    }
  }, [autoPlay]);
  React80.useLayoutEffect(() => {
    if (currentFrameName.current !== frameName && frameName) {
      currentFrame.current = 0;
      currentFrameName.current = frameName;
      state.hasEnded = false;
      if (fpsInterval <= 0) {
        currentFrame.current = endFrame || startFrame || 0;
      }
      if (spriteData.current) {
        const {
          w,
          h
        } = getFirstFrame(spriteData.current.frames, frameName).sourceSize;
        const _aspect = calculateAspectRatio(w, h);
        setAspect(_aspect);
      }
    }
  }, [frameName, fpsInterval, state, endFrame, startFrame]);
  const runAnimation = () => {
    if (!isSpriteData(spriteData.current)) return;
    const {
      meta: {
        size: metaInfo
      },
      frames
    } = spriteData.current;
    const {
      w: frameW,
      h: frameH
    } = getFirstFrame(frames, frameName).sourceSize;
    const spriteFrames = Array.isArray(frames) ? frames : frameName ? frames[frameName] : [];
    const _endFrame = endFrame || spriteFrames.length - 1;
    var _offset = offset === void 0 ? state.current : offset;
    if (fpsInterval <= 0) {
      currentFrame.current = endFrame || startFrame || 0;
      calculateFinalPosition(frameW, frameH, metaInfo, spriteFrames);
      return;
    }
    const now = window.performance.now();
    const diff = now - timerOffset.current;
    if (diff <= fpsInterval) return;
    var endCondition = playBackwards ? currentFrame.current < 0 : currentFrame.current > _endFrame;
    var onStartCondition = playBackwards ? currentFrame.current === _endFrame : currentFrame.current === 0;
    var manualProgressEndCondition = playBackwards ? currentFrame.current < 0 : currentFrame.current >= _endFrame;
    if (endCondition) {
      currentFrame.current = loop ? startFrame !== null && startFrame !== void 0 ? startFrame : 0 : 0;
      if (playBackwards) {
        currentFrame.current = _endFrame;
      }
      if (loop) {
        onLoopEnd == null || onLoopEnd({
          currentFrameName: frameName !== null && frameName !== void 0 ? frameName : "",
          currentFrame: currentFrame.current
        });
      } else {
        onEnd == null || onEnd({
          currentFrameName: frameName !== null && frameName !== void 0 ? frameName : "",
          currentFrame: currentFrame.current
        });
        state.hasEnded = !resetOnEnd;
        if (resetOnEnd) {
          pauseRef.current = true;
        }
      }
      if (!loop) return;
    } else if (onStartCondition) {
      onStart == null || onStart({
        currentFrameName: frameName !== null && frameName !== void 0 ? frameName : "",
        currentFrame: currentFrame.current
      });
    }
    if (_offset !== void 0 && manualProgressEndCondition) {
      if (softEnd.current === false) {
        onEnd == null || onEnd({
          currentFrameName: frameName !== null && frameName !== void 0 ? frameName : "",
          currentFrame: currentFrame.current
        });
        softEnd.current = true;
      }
    } else {
      softEnd.current = false;
    }
    if (diff <= fpsInterval) return;
    timerOffset.current = now - diff % fpsInterval;
    calculateFinalPosition(frameW, frameH, metaInfo, spriteFrames);
  };
  const calculateFinalPosition = (frameW, frameH, metaInfo, spriteFrames) => {
    var _offset = offset === void 0 ? state.current : offset;
    const targetFrame = currentFrame.current;
    let finalValX = 0;
    let finalValY = 0;
    calculateAspectRatio(frameW, frameH);
    const framesH = roundFramePosition ? Math.round((metaInfo.w - 1) / frameW) : (metaInfo.w - 1) / frameW;
    const framesV = roundFramePosition ? Math.round((metaInfo.h - 1) / frameH) : (metaInfo.h - 1) / frameH;
    if (!spriteFrames[targetFrame]) {
      return;
    }
    const {
      frame: {
        x: frameX,
        y: frameY
      },
      sourceSize: {
        w: originalSizeX,
        h: originalSizeY
      }
    } = spriteFrames[targetFrame];
    const frameOffsetX = 1 / framesH;
    const frameOffsetY = 1 / framesV;
    if (matRef.current && matRef.current.map) {
      finalValX = flipOffset > 0 ? frameOffsetX * (frameX / originalSizeX) : frameOffsetX * (frameX / originalSizeX) - matRef.current.map.repeat.x;
      finalValY = Math.abs(1 - frameOffsetY) - frameOffsetY * (frameY / originalSizeY);
      matRef.current.map.offset.x = finalValX;
      matRef.current.map.offset.y = finalValY;
    }
    if (_offset !== void 0 && _offset !== null) {
      let frameIndex = Math.floor(_offset * spriteFrames.length);
      frameIndex = Math.max(0, Math.min(frameIndex, spriteFrames.length - 1));
      if (isNaN(frameIndex)) {
        frameIndex = 0;
      }
      currentFrame.current = frameIndex;
    } else {
      if (playBackwards) {
        currentFrame.current -= 1;
      } else {
        currentFrame.current += 1;
      }
    }
  };
  useFrame((_state, _delta) => {
    var _spriteData$current2, _matRef$current;
    if (!((_spriteData$current2 = spriteData.current) != null && _spriteData$current2.frames) || !((_matRef$current = matRef.current) != null && _matRef$current.map)) {
      return;
    }
    if (pauseRef.current) {
      return;
    }
    if (!state.hasEnded && (autoPlay || play)) {
      runAnimation();
      onFrame == null || onFrame({
        currentFrameName: currentFrameName.current,
        currentFrame: currentFrame.current
      });
    }
  });
  function multiplyScale(initialScale = new Vector3(1, 1, 1), newScale = 1) {
    if (typeof newScale === "number") return initialScale.multiplyScalar(newScale);
    if (Array.isArray(newScale)) return initialScale.multiply(new Vector3(...newScale));
    if (newScale instanceof Vector3) return initialScale.multiply(newScale);
  }
  return React80.createElement("group", _extends({}, props, {
    ref,
    scale: multiplyScale(aspect, props.scale)
  }), React80.createElement(context5.Provider, {
    value: state
  }, asSprite && React80.createElement(Billboard, null, React80.createElement("mesh", _extends({
    ref: spriteRef,
    scale: 1,
    geometry
  }, meshProps), React80.createElement("meshBasicMaterial", {
    premultipliedAlpha: false,
    toneMapped: false,
    side: DoubleSide,
    ref: matRef,
    map: spriteTexture,
    transparent: true,
    alphaTest: alphaTest !== null && alphaTest !== void 0 ? alphaTest : 0
  }))), !asSprite && React80.createElement(Instances, _extends({
    geometry,
    limit: maxItems !== null && maxItems !== void 0 ? maxItems : 1
  }, meshProps), React80.createElement("meshBasicMaterial", {
    premultipliedAlpha: false,
    toneMapped: false,
    side: DoubleSide,
    ref: matRef,
    map: spriteTexture,
    transparent: true,
    alphaTest: alphaTest !== null && alphaTest !== void 0 ? alphaTest : 0
  }), (instanceItems !== null && instanceItems !== void 0 ? instanceItems : [0]).map((item, index) => React80.createElement(Instance, _extends({
    key: index,
    ref: (instanceItems == null ? void 0 : instanceItems.length) === 1 ? spriteRef : null,
    position: item,
    scale: 1
  }, meshProps)))), children));
});

// node_modules/@react-three/drei/core/CurveModifier.js
var React81 = __toESM(require_react());
var CurveModifier = React81.forwardRef(({
  children,
  curve
}, ref) => {
  const [scene] = React81.useState(() => new Scene());
  const [obj, set] = React81.useState();
  const modifier = React81.useRef(null);
  React81.useLayoutEffect(() => {
    modifier.current = new Flow(scene.children[0]);
    set(modifier.current.object3D);
  }, [children]);
  React81.useEffect(() => {
    var _modifier$current;
    if (curve) (_modifier$current = modifier.current) == null || _modifier$current.updateCurve(0, curve);
  }, [curve]);
  React81.useImperativeHandle(ref, () => modifier.current);
  return React81.createElement(React81.Fragment, null, createPortal(children, scene), obj && React81.createElement("primitive", {
    object: obj
  }));
});

// node_modules/@react-three/drei/core/MeshDistortMaterial.js
var React82 = __toESM(require_react());

// node_modules/@react-three/drei/helpers/glsl/distort.vert.glsl.js
var distort = "#define GLSLIFY 1\nvec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}float snoise(vec3 v){const vec2 C=vec2(1.0/6.0,1.0/3.0);const vec4 D=vec4(0.0,0.5,1.0,2.0);vec3 i=floor(v+dot(v,C.yyy));vec3 x0=v-i+dot(i,C.xxx);vec3 g=step(x0.yzx,x0.xyz);vec3 l=1.0-g;vec3 i1=min(g.xyz,l.zxy);vec3 i2=max(g.xyz,l.zxy);vec3 x1=x0-i1+C.xxx;vec3 x2=x0-i2+C.yyy;vec3 x3=x0-D.yyy;i=mod289(i);vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));float n_=0.142857142857;vec3 ns=n_*D.wyz-D.xzx;vec4 j=p-49.0*floor(p*ns.z*ns.z);vec4 x_=floor(j*ns.z);vec4 y_=floor(j-7.0*x_);vec4 x=x_*ns.x+ns.yyyy;vec4 y=y_*ns.x+ns.yyyy;vec4 h=1.0-abs(x)-abs(y);vec4 b0=vec4(x.xy,y.xy);vec4 b1=vec4(x.zw,y.zw);vec4 s0=floor(b0)*2.0+1.0;vec4 s1=floor(b1)*2.0+1.0;vec4 sh=-step(h,vec4(0.0));vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;vec3 p0=vec3(a0.xy,h.x);vec3 p1=vec3(a0.zw,h.y);vec3 p2=vec3(a1.xy,h.z);vec3 p3=vec3(a1.zw,h.w);vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);m=m*m;return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));}";

// node_modules/@react-three/drei/core/MeshDistortMaterial.js
var DistortMaterialImpl = class extends MeshPhysicalMaterial {
  constructor(parameters = {}) {
    super(parameters);
    this.setValues(parameters);
    this._time = {
      value: 0
    };
    this._distort = {
      value: 0.4
    };
    this._radius = {
      value: 1
    };
  }
  // FIXME Use `THREE.WebGLProgramParametersWithUniforms` type when able to target @types/three@0.160.0
  onBeforeCompile(shader) {
    shader.uniforms.time = this._time;
    shader.uniforms.radius = this._radius;
    shader.uniforms.distort = this._distort;
    shader.vertexShader = `
      uniform float time;
      uniform float radius;
      uniform float distort;
      ${distort}
      ${shader.vertexShader}
    `;
    shader.vertexShader = shader.vertexShader.replace("#include <begin_vertex>", `
        float updateTime = time / 50.0;
        float noise = snoise(vec3(position / 2.0 + updateTime * 5.0));
        vec3 transformed = vec3(position * (noise * pow(distort, 2.0) + radius));
        `);
  }
  get time() {
    return this._time.value;
  }
  set time(v5) {
    this._time.value = v5;
  }
  get distort() {
    return this._distort.value;
  }
  set distort(v5) {
    this._distort.value = v5;
  }
  get radius() {
    return this._radius.value;
  }
  set radius(v5) {
    this._radius.value = v5;
  }
};
var MeshDistortMaterial = React82.forwardRef(({
  speed = 1,
  ...props
}, ref) => {
  const [material] = React82.useState(() => new DistortMaterialImpl());
  useFrame((state) => material && (material.time = state.clock.elapsedTime * speed));
  return React82.createElement("primitive", _extends({
    object: material,
    ref,
    attach: "material"
  }, props));
});

// node_modules/@react-three/drei/core/MeshWobbleMaterial.js
var React83 = __toESM(require_react());
var WobbleMaterialImpl = class extends MeshStandardMaterial {
  constructor(parameters = {}) {
    super(parameters);
    this.setValues(parameters);
    this._time = {
      value: 0
    };
    this._factor = {
      value: 1
    };
  }
  // FIXME Use `THREE.WebGLProgramParametersWithUniforms` type when able to target @types/three@0.160.0
  onBeforeCompile(shader) {
    shader.uniforms.time = this._time;
    shader.uniforms.factor = this._factor;
    shader.vertexShader = `
      uniform float time;
      uniform float factor;
      ${shader.vertexShader}
    `;
    shader.vertexShader = shader.vertexShader.replace("#include <begin_vertex>", `float theta = sin( time + position.y ) / 2.0 * factor;
        float c = cos( theta );
        float s = sin( theta );
        mat3 m = mat3( c, 0, s, 0, 1, 0, -s, 0, c );
        vec3 transformed = vec3( position ) * m;
        vNormal = vNormal * m;`);
  }
  get time() {
    return this._time.value;
  }
  set time(v5) {
    this._time.value = v5;
  }
  get factor() {
    return this._factor.value;
  }
  set factor(v5) {
    this._factor.value = v5;
  }
};
var MeshWobbleMaterial = React83.forwardRef(({
  speed = 1,
  ...props
}, ref) => {
  const [material] = React83.useState(() => new WobbleMaterialImpl());
  useFrame((state) => material && (material.time = state.clock.elapsedTime * speed));
  return React83.createElement("primitive", _extends({
    object: material,
    ref,
    attach: "material"
  }, props));
});

// node_modules/@react-three/drei/core/MeshReflectorMaterial.js
var React84 = __toESM(require_react());

// node_modules/@react-three/drei/materials/ConvolutionMaterial.js
var ConvolutionMaterial = class extends ShaderMaterial {
  constructor(texelSize = new Vector2()) {
    super({
      uniforms: {
        inputBuffer: new Uniform(null),
        depthBuffer: new Uniform(null),
        resolution: new Uniform(new Vector2()),
        texelSize: new Uniform(new Vector2()),
        halfTexelSize: new Uniform(new Vector2()),
        kernel: new Uniform(0),
        scale: new Uniform(1),
        cameraNear: new Uniform(0),
        cameraFar: new Uniform(1),
        minDepthThreshold: new Uniform(0),
        maxDepthThreshold: new Uniform(1),
        depthScale: new Uniform(0),
        depthToBlurRatioBias: new Uniform(0.25)
      },
      fragmentShader: `#include <common>
        #include <dithering_pars_fragment>      
        uniform sampler2D inputBuffer;
        uniform sampler2D depthBuffer;
        uniform float cameraNear;
        uniform float cameraFar;
        uniform float minDepthThreshold;
        uniform float maxDepthThreshold;
        uniform float depthScale;
        uniform float depthToBlurRatioBias;
        varying vec2 vUv;
        varying vec2 vUv0;
        varying vec2 vUv1;
        varying vec2 vUv2;
        varying vec2 vUv3;

        void main() {
          float depthFactor = 0.0;
          
          #ifdef USE_DEPTH
            vec4 depth = texture2D(depthBuffer, vUv);
            depthFactor = smoothstep(minDepthThreshold, maxDepthThreshold, 1.0-(depth.r * depth.a));
            depthFactor *= depthScale;
            depthFactor = max(0.0, min(1.0, depthFactor + 0.25));
          #endif
          
          vec4 sum = texture2D(inputBuffer, mix(vUv0, vUv, depthFactor));
          sum += texture2D(inputBuffer, mix(vUv1, vUv, depthFactor));
          sum += texture2D(inputBuffer, mix(vUv2, vUv, depthFactor));
          sum += texture2D(inputBuffer, mix(vUv3, vUv, depthFactor));
          gl_FragColor = sum * 0.25 ;

          #include <dithering_fragment>
          #include <tonemapping_fragment>
          #include <${version >= 154 ? "colorspace_fragment" : "encodings_fragment"}>
        }`,
      vertexShader: `uniform vec2 texelSize;
        uniform vec2 halfTexelSize;
        uniform float kernel;
        uniform float scale;
        varying vec2 vUv;
        varying vec2 vUv0;
        varying vec2 vUv1;
        varying vec2 vUv2;
        varying vec2 vUv3;

        void main() {
          vec2 uv = position.xy * 0.5 + 0.5;
          vUv = uv;

          vec2 dUv = (texelSize * vec2(kernel) + halfTexelSize) * scale;
          vUv0 = vec2(uv.x - dUv.x, uv.y + dUv.y);
          vUv1 = vec2(uv.x + dUv.x, uv.y + dUv.y);
          vUv2 = vec2(uv.x + dUv.x, uv.y - dUv.y);
          vUv3 = vec2(uv.x - dUv.x, uv.y - dUv.y);

          gl_Position = vec4(position.xy, 1.0, 1.0);
        }`,
      blending: NoBlending,
      depthWrite: false,
      depthTest: false
    });
    this.toneMapped = false;
    this.setTexelSize(texelSize.x, texelSize.y);
    this.kernel = new Float32Array([0, 1, 2, 2, 3]);
  }
  setTexelSize(x, y) {
    this.uniforms.texelSize.value.set(x, y);
    this.uniforms.halfTexelSize.value.set(x, y).multiplyScalar(0.5);
  }
  setResolution(resolution) {
    this.uniforms.resolution.value.copy(resolution);
  }
};

// node_modules/@react-three/drei/materials/BlurPass.js
var BlurPass = class {
  constructor({
    gl,
    resolution,
    width = 500,
    height = 500,
    minDepthThreshold = 0,
    maxDepthThreshold = 1,
    depthScale = 0,
    depthToBlurRatioBias = 0.25
  }) {
    this.renderToScreen = false;
    this.renderTargetA = new WebGLRenderTarget(resolution, resolution, {
      minFilter: LinearFilter,
      magFilter: LinearFilter,
      stencilBuffer: false,
      depthBuffer: false,
      type: HalfFloatType
    });
    this.renderTargetB = this.renderTargetA.clone();
    this.convolutionMaterial = new ConvolutionMaterial();
    this.convolutionMaterial.setTexelSize(1 / width, 1 / height);
    this.convolutionMaterial.setResolution(new Vector2(width, height));
    this.scene = new Scene();
    this.camera = new Camera();
    this.convolutionMaterial.uniforms.minDepthThreshold.value = minDepthThreshold;
    this.convolutionMaterial.uniforms.maxDepthThreshold.value = maxDepthThreshold;
    this.convolutionMaterial.uniforms.depthScale.value = depthScale;
    this.convolutionMaterial.uniforms.depthToBlurRatioBias.value = depthToBlurRatioBias;
    this.convolutionMaterial.defines.USE_DEPTH = depthScale > 0;
    const vertices = new Float32Array([-1, -1, 0, 3, -1, 0, -1, 3, 0]);
    const uvs = new Float32Array([0, 0, 2, 0, 0, 2]);
    const geometry2 = new BufferGeometry();
    geometry2.setAttribute("position", new BufferAttribute(vertices, 3));
    geometry2.setAttribute("uv", new BufferAttribute(uvs, 2));
    this.screen = new Mesh(geometry2, this.convolutionMaterial);
    this.screen.frustumCulled = false;
    this.scene.add(this.screen);
  }
  render(renderer, inputBuffer, outputBuffer) {
    const scene = this.scene;
    const camera = this.camera;
    const renderTargetA = this.renderTargetA;
    const renderTargetB = this.renderTargetB;
    let material = this.convolutionMaterial;
    let uniforms = material.uniforms;
    uniforms.depthBuffer.value = inputBuffer.depthTexture;
    const kernel = material.kernel;
    let lastRT = inputBuffer;
    let destRT;
    let i2, l;
    for (i2 = 0, l = kernel.length - 1; i2 < l; ++i2) {
      destRT = (i2 & 1) === 0 ? renderTargetA : renderTargetB;
      uniforms.kernel.value = kernel[i2];
      uniforms.inputBuffer.value = lastRT.texture;
      renderer.setRenderTarget(destRT);
      renderer.render(scene, camera);
      lastRT = destRT;
    }
    uniforms.kernel.value = kernel[i2];
    uniforms.inputBuffer.value = lastRT.texture;
    renderer.setRenderTarget(this.renderToScreen ? null : outputBuffer);
    renderer.render(scene, camera);
  }
};

// node_modules/@react-three/drei/materials/MeshReflectorMaterial.js
var MeshReflectorMaterial = class extends MeshStandardMaterial {
  constructor(parameters = {}) {
    super(parameters);
    this._tDepth = {
      value: null
    };
    this._distortionMap = {
      value: null
    };
    this._tDiffuse = {
      value: null
    };
    this._tDiffuseBlur = {
      value: null
    };
    this._textureMatrix = {
      value: null
    };
    this._hasBlur = {
      value: false
    };
    this._mirror = {
      value: 0
    };
    this._mixBlur = {
      value: 0
    };
    this._blurStrength = {
      value: 0.5
    };
    this._minDepthThreshold = {
      value: 0.9
    };
    this._maxDepthThreshold = {
      value: 1
    };
    this._depthScale = {
      value: 0
    };
    this._depthToBlurRatioBias = {
      value: 0.25
    };
    this._distortion = {
      value: 1
    };
    this._mixContrast = {
      value: 1
    };
    this.setValues(parameters);
  }
  onBeforeCompile(shader) {
    var _shader$defines;
    if (!((_shader$defines = shader.defines) != null && _shader$defines.USE_UV)) {
      shader.defines.USE_UV = "";
    }
    shader.uniforms.hasBlur = this._hasBlur;
    shader.uniforms.tDiffuse = this._tDiffuse;
    shader.uniforms.tDepth = this._tDepth;
    shader.uniforms.distortionMap = this._distortionMap;
    shader.uniforms.tDiffuseBlur = this._tDiffuseBlur;
    shader.uniforms.textureMatrix = this._textureMatrix;
    shader.uniforms.mirror = this._mirror;
    shader.uniforms.mixBlur = this._mixBlur;
    shader.uniforms.mixStrength = this._blurStrength;
    shader.uniforms.minDepthThreshold = this._minDepthThreshold;
    shader.uniforms.maxDepthThreshold = this._maxDepthThreshold;
    shader.uniforms.depthScale = this._depthScale;
    shader.uniforms.depthToBlurRatioBias = this._depthToBlurRatioBias;
    shader.uniforms.distortion = this._distortion;
    shader.uniforms.mixContrast = this._mixContrast;
    shader.vertexShader = `
        uniform mat4 textureMatrix;
        varying vec4 my_vUv;
      ${shader.vertexShader}`;
    shader.vertexShader = shader.vertexShader.replace("#include <project_vertex>", `#include <project_vertex>
        my_vUv = textureMatrix * vec4( position, 1.0 );
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );`);
    shader.fragmentShader = `
        uniform sampler2D tDiffuse;
        uniform sampler2D tDiffuseBlur;
        uniform sampler2D tDepth;
        uniform sampler2D distortionMap;
        uniform float distortion;
        uniform float cameraNear;
			  uniform float cameraFar;
        uniform bool hasBlur;
        uniform float mixBlur;
        uniform float mirror;
        uniform float mixStrength;
        uniform float minDepthThreshold;
        uniform float maxDepthThreshold;
        uniform float mixContrast;
        uniform float depthScale;
        uniform float depthToBlurRatioBias;
        varying vec4 my_vUv;
        ${shader.fragmentShader}`;
    shader.fragmentShader = shader.fragmentShader.replace("#include <emissivemap_fragment>", `#include <emissivemap_fragment>

      float distortionFactor = 0.0;
      #ifdef USE_DISTORTION
        distortionFactor = texture2D(distortionMap, vUv).r * distortion;
      #endif

      vec4 new_vUv = my_vUv;
      new_vUv.x += distortionFactor;
      new_vUv.y += distortionFactor;

      vec4 base = texture2DProj(tDiffuse, new_vUv);
      vec4 blur = texture2DProj(tDiffuseBlur, new_vUv);

      vec4 merge = base;

      #ifdef USE_NORMALMAP
        vec2 normal_uv = vec2(0.0);
        vec4 normalColor = texture2D(normalMap, vUv * normalScale);
        vec3 my_normal = normalize( vec3( normalColor.r * 2.0 - 1.0, normalColor.b,  normalColor.g * 2.0 - 1.0 ) );
        vec3 coord = new_vUv.xyz / new_vUv.w;
        normal_uv = coord.xy + coord.z * my_normal.xz * 0.05;
        vec4 base_normal = texture2D(tDiffuse, normal_uv);
        vec4 blur_normal = texture2D(tDiffuseBlur, normal_uv);
        merge = base_normal;
        blur = blur_normal;
      #endif

      float depthFactor = 0.0001;
      float blurFactor = 0.0;

      #ifdef USE_DEPTH
        vec4 depth = texture2DProj(tDepth, new_vUv);
        depthFactor = smoothstep(minDepthThreshold, maxDepthThreshold, 1.0-(depth.r * depth.a));
        depthFactor *= depthScale;
        depthFactor = max(0.0001, min(1.0, depthFactor));

        #ifdef USE_BLUR
          blur = blur * min(1.0, depthFactor + depthToBlurRatioBias);
          merge = merge * min(1.0, depthFactor + 0.5);
        #else
          merge = merge * depthFactor;
        #endif

      #endif

      float reflectorRoughnessFactor = roughness;
      #ifdef USE_ROUGHNESSMAP
        vec4 reflectorTexelRoughness = texture2D( roughnessMap, vUv );
        reflectorRoughnessFactor *= reflectorTexelRoughness.g;
      #endif

      #ifdef USE_BLUR
        blurFactor = min(1.0, mixBlur * reflectorRoughnessFactor);
        merge = mix(merge, blur, blurFactor);
      #endif

      vec4 newMerge = vec4(0.0, 0.0, 0.0, 1.0);
      newMerge.r = (merge.r - 0.5) * mixContrast + 0.5;
      newMerge.g = (merge.g - 0.5) * mixContrast + 0.5;
      newMerge.b = (merge.b - 0.5) * mixContrast + 0.5;

      diffuseColor.rgb = diffuseColor.rgb * ((1.0 - min(1.0, mirror)) + newMerge.rgb * mixStrength);
      `);
  }
  get tDiffuse() {
    return this._tDiffuse.value;
  }
  set tDiffuse(v5) {
    this._tDiffuse.value = v5;
  }
  get tDepth() {
    return this._tDepth.value;
  }
  set tDepth(v5) {
    this._tDepth.value = v5;
  }
  get distortionMap() {
    return this._distortionMap.value;
  }
  set distortionMap(v5) {
    this._distortionMap.value = v5;
  }
  get tDiffuseBlur() {
    return this._tDiffuseBlur.value;
  }
  set tDiffuseBlur(v5) {
    this._tDiffuseBlur.value = v5;
  }
  get textureMatrix() {
    return this._textureMatrix.value;
  }
  set textureMatrix(v5) {
    this._textureMatrix.value = v5;
  }
  get hasBlur() {
    return this._hasBlur.value;
  }
  set hasBlur(v5) {
    this._hasBlur.value = v5;
  }
  get mirror() {
    return this._mirror.value;
  }
  set mirror(v5) {
    this._mirror.value = v5;
  }
  get mixBlur() {
    return this._mixBlur.value;
  }
  set mixBlur(v5) {
    this._mixBlur.value = v5;
  }
  get mixStrength() {
    return this._blurStrength.value;
  }
  set mixStrength(v5) {
    this._blurStrength.value = v5;
  }
  get minDepthThreshold() {
    return this._minDepthThreshold.value;
  }
  set minDepthThreshold(v5) {
    this._minDepthThreshold.value = v5;
  }
  get maxDepthThreshold() {
    return this._maxDepthThreshold.value;
  }
  set maxDepthThreshold(v5) {
    this._maxDepthThreshold.value = v5;
  }
  get depthScale() {
    return this._depthScale.value;
  }
  set depthScale(v5) {
    this._depthScale.value = v5;
  }
  get depthToBlurRatioBias() {
    return this._depthToBlurRatioBias.value;
  }
  set depthToBlurRatioBias(v5) {
    this._depthToBlurRatioBias.value = v5;
  }
  get distortion() {
    return this._distortion.value;
  }
  set distortion(v5) {
    this._distortion.value = v5;
  }
  get mixContrast() {
    return this._mixContrast.value;
  }
  set mixContrast(v5) {
    this._mixContrast.value = v5;
  }
};

// node_modules/@react-three/drei/core/MeshReflectorMaterial.js
var MeshReflectorMaterial2 = React84.forwardRef(({
  mixBlur = 0,
  mixStrength = 1,
  resolution = 256,
  blur = [0, 0],
  minDepthThreshold = 0.9,
  maxDepthThreshold = 1,
  depthScale = 0,
  depthToBlurRatioBias = 0.25,
  mirror = 0,
  distortion = 1,
  mixContrast = 1,
  distortionMap,
  reflectorOffset = 0,
  ...props
}, ref) => {
  extend({
    MeshReflectorMaterialImpl: MeshReflectorMaterial
  });
  const gl = useThree(({
    gl: gl2
  }) => gl2);
  const camera = useThree(({
    camera: camera2
  }) => camera2);
  const scene = useThree(({
    scene: scene2
  }) => scene2);
  blur = Array.isArray(blur) ? blur : [blur, blur];
  const hasBlur = blur[0] + blur[1] > 0;
  const blurX = blur[0];
  const blurY = blur[1];
  const materialRef = React84.useRef(null);
  React84.useImperativeHandle(ref, () => materialRef.current, []);
  const [reflectorPlane] = React84.useState(() => new Plane());
  const [normal2] = React84.useState(() => new Vector3());
  const [reflectorWorldPosition] = React84.useState(() => new Vector3());
  const [cameraWorldPosition] = React84.useState(() => new Vector3());
  const [rotationMatrix] = React84.useState(() => new Matrix4());
  const [lookAtPosition] = React84.useState(() => new Vector3(0, 0, -1));
  const [clipPlane] = React84.useState(() => new Vector4());
  const [view] = React84.useState(() => new Vector3());
  const [target2] = React84.useState(() => new Vector3());
  const [q] = React84.useState(() => new Vector4());
  const [textureMatrix] = React84.useState(() => new Matrix4());
  const [virtualCamera] = React84.useState(() => new PerspectiveCamera());
  const beforeRender = React84.useCallback(() => {
    var _materialRef$current;
    const parent = materialRef.current.parent || ((_materialRef$current = materialRef.current) == null || (_materialRef$current = _materialRef$current.__r3f.parent) == null ? void 0 : _materialRef$current.object);
    if (!parent) return;
    reflectorWorldPosition.setFromMatrixPosition(parent.matrixWorld);
    cameraWorldPosition.setFromMatrixPosition(camera.matrixWorld);
    rotationMatrix.extractRotation(parent.matrixWorld);
    normal2.set(0, 0, 1);
    normal2.applyMatrix4(rotationMatrix);
    reflectorWorldPosition.addScaledVector(normal2, reflectorOffset);
    view.subVectors(reflectorWorldPosition, cameraWorldPosition);
    if (view.dot(normal2) > 0) return;
    view.reflect(normal2).negate();
    view.add(reflectorWorldPosition);
    rotationMatrix.extractRotation(camera.matrixWorld);
    lookAtPosition.set(0, 0, -1);
    lookAtPosition.applyMatrix4(rotationMatrix);
    lookAtPosition.add(cameraWorldPosition);
    target2.subVectors(reflectorWorldPosition, lookAtPosition);
    target2.reflect(normal2).negate();
    target2.add(reflectorWorldPosition);
    virtualCamera.position.copy(view);
    virtualCamera.up.set(0, 1, 0);
    virtualCamera.up.applyMatrix4(rotationMatrix);
    virtualCamera.up.reflect(normal2);
    virtualCamera.lookAt(target2);
    virtualCamera.far = camera.far;
    virtualCamera.updateMatrixWorld();
    virtualCamera.projectionMatrix.copy(camera.projectionMatrix);
    textureMatrix.set(0.5, 0, 0, 0.5, 0, 0.5, 0, 0.5, 0, 0, 0.5, 0.5, 0, 0, 0, 1);
    textureMatrix.multiply(virtualCamera.projectionMatrix);
    textureMatrix.multiply(virtualCamera.matrixWorldInverse);
    textureMatrix.multiply(parent.matrixWorld);
    reflectorPlane.setFromNormalAndCoplanarPoint(normal2, reflectorWorldPosition);
    reflectorPlane.applyMatrix4(virtualCamera.matrixWorldInverse);
    clipPlane.set(reflectorPlane.normal.x, reflectorPlane.normal.y, reflectorPlane.normal.z, reflectorPlane.constant);
    const projectionMatrix = virtualCamera.projectionMatrix;
    q.x = (Math.sign(clipPlane.x) + projectionMatrix.elements[8]) / projectionMatrix.elements[0];
    q.y = (Math.sign(clipPlane.y) + projectionMatrix.elements[9]) / projectionMatrix.elements[5];
    q.z = -1;
    q.w = (1 + projectionMatrix.elements[10]) / projectionMatrix.elements[14];
    clipPlane.multiplyScalar(2 / clipPlane.dot(q));
    projectionMatrix.elements[2] = clipPlane.x;
    projectionMatrix.elements[6] = clipPlane.y;
    projectionMatrix.elements[10] = clipPlane.z + 1;
    projectionMatrix.elements[14] = clipPlane.w;
  }, [camera, reflectorOffset]);
  const [fbo1, fbo2, blurpass, reflectorProps] = React84.useMemo(() => {
    const parameters = {
      minFilter: LinearFilter,
      magFilter: LinearFilter,
      type: HalfFloatType
    };
    const fbo12 = new WebGLRenderTarget(resolution, resolution, parameters);
    fbo12.depthBuffer = true;
    fbo12.depthTexture = new DepthTexture(resolution, resolution);
    fbo12.depthTexture.format = DepthFormat;
    fbo12.depthTexture.type = UnsignedShortType;
    const fbo22 = new WebGLRenderTarget(resolution, resolution, parameters);
    const blurpass2 = new BlurPass({
      gl,
      resolution,
      width: blurX,
      height: blurY,
      minDepthThreshold,
      maxDepthThreshold,
      depthScale,
      depthToBlurRatioBias
    });
    const reflectorProps2 = {
      mirror,
      textureMatrix,
      mixBlur,
      tDiffuse: fbo12.texture,
      tDepth: fbo12.depthTexture,
      tDiffuseBlur: fbo22.texture,
      hasBlur,
      mixStrength,
      minDepthThreshold,
      maxDepthThreshold,
      depthScale,
      depthToBlurRatioBias,
      distortion,
      distortionMap,
      mixContrast,
      "defines-USE_BLUR": hasBlur ? "" : void 0,
      "defines-USE_DEPTH": depthScale > 0 ? "" : void 0,
      "defines-USE_DISTORTION": distortionMap ? "" : void 0
    };
    return [fbo12, fbo22, blurpass2, reflectorProps2];
  }, [gl, blurX, blurY, textureMatrix, resolution, mirror, hasBlur, mixBlur, mixStrength, minDepthThreshold, maxDepthThreshold, depthScale, depthToBlurRatioBias, distortion, distortionMap, mixContrast]);
  useFrame(() => {
    var _materialRef$current2;
    const parent = materialRef.current.parent || ((_materialRef$current2 = materialRef.current) == null || (_materialRef$current2 = _materialRef$current2.__r3f.parent) == null ? void 0 : _materialRef$current2.object);
    if (!parent) return;
    parent.visible = false;
    const currentXrEnabled = gl.xr.enabled;
    const currentShadowAutoUpdate = gl.shadowMap.autoUpdate;
    beforeRender();
    gl.xr.enabled = false;
    gl.shadowMap.autoUpdate = false;
    gl.setRenderTarget(fbo1);
    gl.state.buffers.depth.setMask(true);
    if (!gl.autoClear) gl.clear();
    gl.render(scene, virtualCamera);
    if (hasBlur) blurpass.render(gl, fbo1, fbo2);
    gl.xr.enabled = currentXrEnabled;
    gl.shadowMap.autoUpdate = currentShadowAutoUpdate;
    parent.visible = true;
    gl.setRenderTarget(null);
  });
  return React84.createElement("meshReflectorMaterialImpl", _extends({
    attach: "material",
    key: "key" + reflectorProps["defines-USE_BLUR"] + reflectorProps["defines-USE_DEPTH"] + reflectorProps["defines-USE_DISTORTION"],
    ref: materialRef
  }, reflectorProps, props));
});

// node_modules/@react-three/drei/core/MeshRefractionMaterial.js
var React85 = __toESM(require_react());
var import_react16 = __toESM(require_react());

// node_modules/@react-three/drei/materials/MeshRefractionMaterial.js
var MeshRefractionMaterial = shaderMaterial(
  {
    envMap: null,
    bounces: 3,
    ior: 2.4,
    correctMips: true,
    aberrationStrength: 0.01,
    fresnel: 0,
    bvh: new MeshBVHUniformStruct(),
    color: new Color("white"),
    opacity: 1,
    resolution: new Vector2(),
    viewMatrixInverse: new Matrix4(),
    projectionMatrixInverse: new Matrix4()
  },
  /*glsl*/
  `
  uniform mat4 viewMatrixInverse;

  varying vec3 vWorldPosition;
  varying vec3 vNormal;
  varying mat4 vModelMatrixInverse;

  #include <color_pars_vertex>

  void main() {
    #include <color_vertex>

    vec4 transformedNormal = vec4(normal, 0.0);
    vec4 transformedPosition = vec4(position, 1.0);
    #ifdef USE_INSTANCING
      transformedNormal = instanceMatrix * transformedNormal;
      transformedPosition = instanceMatrix * transformedPosition;
    #endif

    #ifdef USE_INSTANCING
      vModelMatrixInverse = inverse(modelMatrix * instanceMatrix);
    #else
      vModelMatrixInverse = inverse(modelMatrix);
    #endif

    vWorldPosition = (modelMatrix * transformedPosition).xyz;
    vNormal = normalize((viewMatrixInverse * vec4(normalMatrix * transformedNormal.xyz, 0.0)).xyz);
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * transformedPosition;
  }`,
  /*glsl*/
  `
  #define ENVMAP_TYPE_CUBE_UV
  precision highp isampler2D;
  precision highp usampler2D;
  varying vec3 vWorldPosition;
  varying vec3 vNormal;
  varying mat4 vModelMatrixInverse;

  #include <color_pars_fragment>

  #ifdef ENVMAP_TYPE_CUBEM
    uniform samplerCube envMap;
  #else
    uniform sampler2D envMap;
  #endif

  uniform float bounces;
  ${shaderStructs}
  ${shaderIntersectFunction}
  uniform BVH bvh;
  uniform float ior;
  uniform bool correctMips;
  uniform vec2 resolution;
  uniform float fresnel;
  uniform mat4 modelMatrix;
  uniform mat4 projectionMatrixInverse;
  uniform mat4 viewMatrixInverse;
  uniform float aberrationStrength;
  uniform vec3 color;
  uniform float opacity;

  float fresnelFunc(vec3 viewDirection, vec3 worldNormal) {
    return pow( 1.0 + dot( viewDirection, worldNormal), 10.0 );
  }

  vec3 totalInternalReflection(vec3 ro, vec3 rd, vec3 normal, float ior, mat4 modelMatrixInverse) {
    vec3 rayOrigin = ro;
    vec3 rayDirection = rd;
    rayDirection = refract(rayDirection, normal, 1.0 / ior);
    rayOrigin = vWorldPosition + rayDirection * 0.001;
    rayOrigin = (modelMatrixInverse * vec4(rayOrigin, 1.0)).xyz;
    rayDirection = normalize((modelMatrixInverse * vec4(rayDirection, 0.0)).xyz);
    for(float i = 0.0; i < bounces; i++) {
      uvec4 faceIndices = uvec4( 0u );
      vec3 faceNormal = vec3( 0.0, 0.0, 1.0 );
      vec3 barycoord = vec3( 0.0 );
      float side = 1.0;
      float dist = 0.0;
      bvhIntersectFirstHit( bvh, rayOrigin, rayDirection, faceIndices, faceNormal, barycoord, side, dist );
      vec3 hitPos = rayOrigin + rayDirection * max(dist - 0.001, 0.0);
      vec3 tempDir = refract(rayDirection, faceNormal, ior);
      if (length(tempDir) != 0.0) {
        rayDirection = tempDir;
        break;
      }
      rayDirection = reflect(rayDirection, faceNormal);
      rayOrigin = hitPos + rayDirection * 0.01;
    }
    rayDirection = normalize((modelMatrix * vec4(rayDirection, 0.0)).xyz);
    return rayDirection;
  }

  #include <common>
  #include <cube_uv_reflection_fragment>

  #ifdef ENVMAP_TYPE_CUBEM
    vec4 textureGradient(samplerCube envMap, vec3 rayDirection, vec3 directionCamPerfect) {
      return textureGrad(envMap, rayDirection, dFdx(correctMips ? directionCamPerfect: rayDirection), dFdy(correctMips ? directionCamPerfect: rayDirection));
    }
  #else
    vec4 textureGradient(sampler2D envMap, vec3 rayDirection, vec3 directionCamPerfect) {
      vec2 uvv = equirectUv( rayDirection );
      vec2 smoothUv = equirectUv( directionCamPerfect );
      return textureGrad(envMap, uvv, dFdx(correctMips ? smoothUv : uvv), dFdy(correctMips ? smoothUv : uvv));
    }
  #endif

  void main() {
    vec2 uv = gl_FragCoord.xy / resolution;
    vec3 directionCamPerfect = (projectionMatrixInverse * vec4(uv * 2.0 - 1.0, 0.0, 1.0)).xyz;
    directionCamPerfect = (viewMatrixInverse * vec4(directionCamPerfect, 0.0)).xyz;
    directionCamPerfect = normalize(directionCamPerfect);
    vec3 normal = vNormal;
    vec3 rayOrigin = cameraPosition;
    vec3 rayDirection = normalize(vWorldPosition - cameraPosition);

    vec4 diffuseColor = vec4(color, opacity);
    #include <color_fragment>

    #ifdef CHROMATIC_ABERRATIONS
      vec3 rayDirectionG = totalInternalReflection(rayOrigin, rayDirection, normal, max(ior, 1.0), vModelMatrixInverse);
      #ifdef FAST_CHROMA
        vec3 rayDirectionR = normalize(rayDirectionG + 1.0 * vec3(aberrationStrength / 2.0));
        vec3 rayDirectionB = normalize(rayDirectionG - 1.0 * vec3(aberrationStrength / 2.0));
      #else
        vec3 rayDirectionR = totalInternalReflection(rayOrigin, rayDirection, normal, max(ior * (1.0 - aberrationStrength), 1.0), vModelMatrixInverse);
        vec3 rayDirectionB = totalInternalReflection(rayOrigin, rayDirection, normal, max(ior * (1.0 + aberrationStrength), 1.0), vModelMatrixInverse);
      #endif
      float finalColorR = textureGradient(envMap, rayDirectionR, directionCamPerfect).r;
      float finalColorG = textureGradient(envMap, rayDirectionG, directionCamPerfect).g;
      float finalColorB = textureGradient(envMap, rayDirectionB, directionCamPerfect).b;
      diffuseColor.rgb *= vec3(finalColorR, finalColorG, finalColorB);
    #else
      rayDirection = totalInternalReflection(rayOrigin, rayDirection, normal, max(ior, 1.0), vModelMatrixInverse);
      diffuseColor.rgb *= textureGradient(envMap, rayDirection, directionCamPerfect).rgb;
    #endif

    vec3 viewDirection = normalize(vWorldPosition - cameraPosition);
    float nFresnel = fresnelFunc(viewDirection, normal) * fresnel;
    gl_FragColor = vec4(mix(diffuseColor.rgb, vec3(1.0), nFresnel), diffuseColor.a);

    #include <tonemapping_fragment>
    #include <${version >= 154 ? "colorspace_fragment" : "encodings_fragment"}>
  }`
);

// node_modules/@react-three/drei/core/MeshRefractionMaterial.js
var isCubeTexture = (def) => def && def.isCubeTexture;
function MeshRefractionMaterial2({
  aberrationStrength = 0,
  fastChroma = true,
  envMap,
  ...props
}) {
  extend({
    MeshRefractionMaterial
  });
  const material = (0, import_react16.useRef)(null);
  const {
    size
  } = useThree();
  const defines = (0, import_react16.useMemo)(() => {
    var _ref, _envMap$image$;
    const temp5 = {};
    const isCubeMap = isCubeTexture(envMap);
    const w = (_ref = isCubeMap ? (_envMap$image$ = envMap.image[0]) == null ? void 0 : _envMap$image$.width : envMap.image.width) !== null && _ref !== void 0 ? _ref : 1024;
    const cubeSize = w / 4;
    const _lodMax = Math.floor(Math.log2(cubeSize));
    const _cubeSize = Math.pow(2, _lodMax);
    const width = 3 * Math.max(_cubeSize, 16 * 7);
    const height = 4 * _cubeSize;
    if (isCubeMap) temp5.ENVMAP_TYPE_CUBEM = "";
    temp5.CUBEUV_TEXEL_WIDTH = `${1 / width}`;
    temp5.CUBEUV_TEXEL_HEIGHT = `${1 / height}`;
    temp5.CUBEUV_MAX_MIP = `${_lodMax}.0`;
    if (aberrationStrength > 0) temp5.CHROMATIC_ABERRATIONS = "";
    if (fastChroma) temp5.FAST_CHROMA = "";
    return temp5;
  }, [aberrationStrength, fastChroma]);
  (0, import_react16.useLayoutEffect)(() => {
    var _material$current;
    const geometry2 = (_material$current = material.current) == null || (_material$current = _material$current.__r3f) == null || (_material$current = _material$current.parent) == null || (_material$current = _material$current.object) == null ? void 0 : _material$current.geometry;
    if (geometry2) {
      material.current.bvh = new MeshBVHUniformStruct();
      material.current.bvh.updateFrom(new MeshBVH(geometry2.clone().toNonIndexed(), {
        strategy: SAH
      }));
    }
  }, []);
  useFrame(({
    camera
  }) => {
    material.current.viewMatrixInverse = camera.matrixWorld;
    material.current.projectionMatrixInverse = camera.projectionMatrixInverse;
  });
  return React85.createElement("meshRefractionMaterial", _extends({
    // @ts-ignore
    key: JSON.stringify(defines),
    defines,
    ref: material,
    resolution: [size.width, size.height],
    aberrationStrength,
    envMap
  }, props));
}

// node_modules/@react-three/drei/core/MeshTransmissionMaterial.js
var React86 = __toESM(require_react());

// node_modules/@react-three/drei/materials/DiscardMaterial.js
var DiscardMaterial = shaderMaterial({}, "void main() { }", "void main() { gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0); discard;  }");

// node_modules/@react-three/drei/core/MeshTransmissionMaterial.js
var MeshTransmissionMaterialImpl = class extends MeshPhysicalMaterial {
  constructor(samples = 6, transmissionSampler = false) {
    super();
    this.uniforms = {
      chromaticAberration: {
        value: 0.05
      },
      // Transmission must always be 0, unless transmissionSampler is being used
      transmission: {
        value: 0
      },
      // Instead a workaround is used, see below for reasons why
      _transmission: {
        value: 1
      },
      transmissionMap: {
        value: null
      },
      // Roughness is 1 in THREE.MeshPhysicalMaterial but it makes little sense in a transmission material
      roughness: {
        value: 0
      },
      thickness: {
        value: 0
      },
      thicknessMap: {
        value: null
      },
      attenuationDistance: {
        value: Infinity
      },
      attenuationColor: {
        value: new Color("white")
      },
      anisotropicBlur: {
        value: 0.1
      },
      time: {
        value: 0
      },
      distortion: {
        value: 0
      },
      distortionScale: {
        value: 0.5
      },
      temporalDistortion: {
        value: 0
      },
      buffer: {
        value: null
      }
    };
    this.onBeforeCompile = (shader) => {
      shader.uniforms = {
        ...shader.uniforms,
        ...this.uniforms
      };
      if (this.anisotropy > 0) shader.defines.USE_ANISOTROPY = "";
      if (transmissionSampler) shader.defines.USE_SAMPLER = "";
      else shader.defines.USE_TRANSMISSION = "";
      shader.fragmentShader = /*glsl*/
      `
      uniform float chromaticAberration;         
      uniform float anisotropicBlur;      
      uniform float time;
      uniform float distortion;
      uniform float distortionScale;
      uniform float temporalDistortion;
      uniform sampler2D buffer;

      vec3 random3(vec3 c) {
        float j = 4096.0*sin(dot(c,vec3(17.0, 59.4, 15.0)));
        vec3 r;
        r.z = fract(512.0*j);
        j *= .125;
        r.x = fract(512.0*j);
        j *= .125;
        r.y = fract(512.0*j);
        return r-0.5;
      }

      uint hash( uint x ) {
        x += ( x << 10u );
        x ^= ( x >>  6u );
        x += ( x <<  3u );
        x ^= ( x >> 11u );
        x += ( x << 15u );
        return x;
      }

      // Compound versions of the hashing algorithm I whipped together.
      uint hash( uvec2 v ) { return hash( v.x ^ hash(v.y)                         ); }
      uint hash( uvec3 v ) { return hash( v.x ^ hash(v.y) ^ hash(v.z)             ); }
      uint hash( uvec4 v ) { return hash( v.x ^ hash(v.y) ^ hash(v.z) ^ hash(v.w) ); }

      // Construct a float with half-open range [0:1] using low 23 bits.
      // All zeroes yields 0.0, all ones yields the next smallest representable value below 1.0.
      float floatConstruct( uint m ) {
        const uint ieeeMantissa = 0x007FFFFFu; // binary32 mantissa bitmask
        const uint ieeeOne      = 0x3F800000u; // 1.0 in IEEE binary32
        m &= ieeeMantissa;                     // Keep only mantissa bits (fractional part)
        m |= ieeeOne;                          // Add fractional part to 1.0
        float  f = uintBitsToFloat( m );       // Range [1:2]
        return f - 1.0;                        // Range [0:1]
      }

      // Pseudo-random value in half-open range [0:1].
      float randomBase( float x ) { return floatConstruct(hash(floatBitsToUint(x))); }
      float randomBase( vec2  v ) { return floatConstruct(hash(floatBitsToUint(v))); }
      float randomBase( vec3  v ) { return floatConstruct(hash(floatBitsToUint(v))); }
      float randomBase( vec4  v ) { return floatConstruct(hash(floatBitsToUint(v))); }
      float rand(float seed) {
        float result = randomBase(vec3(gl_FragCoord.xy, seed));
        return result;
      }

      const float F3 =  0.3333333;
      const float G3 =  0.1666667;

      float snoise(vec3 p) {
        vec3 s = floor(p + dot(p, vec3(F3)));
        vec3 x = p - s + dot(s, vec3(G3));
        vec3 e = step(vec3(0.0), x - x.yzx);
        vec3 i1 = e*(1.0 - e.zxy);
        vec3 i2 = 1.0 - e.zxy*(1.0 - e);
        vec3 x1 = x - i1 + G3;
        vec3 x2 = x - i2 + 2.0*G3;
        vec3 x3 = x - 1.0 + 3.0*G3;
        vec4 w, d;
        w.x = dot(x, x);
        w.y = dot(x1, x1);
        w.z = dot(x2, x2);
        w.w = dot(x3, x3);
        w = max(0.6 - w, 0.0);
        d.x = dot(random3(s), x);
        d.y = dot(random3(s + i1), x1);
        d.z = dot(random3(s + i2), x2);
        d.w = dot(random3(s + 1.0), x3);
        w *= w;
        w *= w;
        d *= w;
        return dot(d, vec4(52.0));
      }

      float snoiseFractal(vec3 m) {
        return 0.5333333* snoise(m)
              +0.2666667* snoise(2.0*m)
              +0.1333333* snoise(4.0*m)
              +0.0666667* snoise(8.0*m);
      }
` + shader.fragmentShader;
      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <transmission_pars_fragment>",
        /*glsl*/
        `
        #ifdef USE_TRANSMISSION
          // Transmission code is based on glTF-Sampler-Viewer
          // https://github.com/KhronosGroup/glTF-Sample-Viewer
          uniform float _transmission;
          uniform float thickness;
          uniform float attenuationDistance;
          uniform vec3 attenuationColor;
          #ifdef USE_TRANSMISSIONMAP
            uniform sampler2D transmissionMap;
          #endif
          #ifdef USE_THICKNESSMAP
            uniform sampler2D thicknessMap;
          #endif
          uniform vec2 transmissionSamplerSize;
          uniform sampler2D transmissionSamplerMap;
          uniform mat4 modelMatrix;
          uniform mat4 projectionMatrix;
          varying vec3 vWorldPosition;
          vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
            // Direction of refracted light.
            vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
            // Compute rotation-independant scaling of the model matrix.
            vec3 modelScale;
            modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
            modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
            modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
            // The thickness is specified in local space.
            return normalize( refractionVector ) * thickness * modelScale;
          }
          float applyIorToRoughness( const in float roughness, const in float ior ) {
            // Scale roughness with IOR so that an IOR of 1.0 results in no microfacet refraction and
            // an IOR of 1.5 results in the default amount of microfacet refraction.
            return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
          }
          vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
            float framebufferLod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );            
            #ifdef USE_SAMPLER
              #ifdef texture2DLodEXT
                return texture2DLodEXT(transmissionSamplerMap, fragCoord.xy, framebufferLod);
              #else
                return texture2D(transmissionSamplerMap, fragCoord.xy, framebufferLod);
              #endif
            #else
              return texture2D(buffer, fragCoord.xy);
            #endif
          }
          vec3 applyVolumeAttenuation( const in vec3 radiance, const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
            if ( isinf( attenuationDistance ) ) {
              // Attenuation distance is +∞, i.e. the transmitted color is not attenuated at all.
              return radiance;
            } else {
              // Compute light attenuation using Beer's law.
              vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
              vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance ); // Beer's law
              return transmittance * radiance;
            }
          }
          vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
            const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
            const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
            const in vec3 attenuationColor, const in float attenuationDistance ) {
            vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
            vec3 refractedRayExit = position + transmissionRay;
            // Project refracted vector on the framebuffer, while mapping to normalized device coordinates.
            vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
            vec2 refractionCoords = ndcPos.xy / ndcPos.w;
            refractionCoords += 1.0;
            refractionCoords /= 2.0;
            // Sample framebuffer to get pixel the refracted ray hits.
            vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
            vec3 attenuatedColor = applyVolumeAttenuation( transmittedLight.rgb, length( transmissionRay ), attenuationColor, attenuationDistance );
            // Get the specular component.
            vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
            return vec4( ( 1.0 - F ) * attenuatedColor * diffuseColor, transmittedLight.a );
          }
        #endif
`
      );
      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <transmission_fragment>",
        /*glsl*/
        `  
        // Improve the refraction to use the world pos
        material.transmission = _transmission;
        material.transmissionAlpha = 1.0;
        material.thickness = thickness;
        material.attenuationDistance = attenuationDistance;
        material.attenuationColor = attenuationColor;
        #ifdef USE_TRANSMISSIONMAP
          material.transmission *= texture2D( transmissionMap, vUv ).r;
        #endif
        #ifdef USE_THICKNESSMAP
          material.thickness *= texture2D( thicknessMap, vUv ).g;
        #endif
        
        vec3 pos = vWorldPosition;
        float runningSeed = 0.0;
        vec3 v = normalize( cameraPosition - pos );
        vec3 n = inverseTransformDirection( normal, viewMatrix );
        vec3 transmission = vec3(0.0);
        float transmissionR, transmissionB, transmissionG;
        float randomCoords = rand(runningSeed++);
        float thickness_smear = thickness * max(pow(roughnessFactor, 0.33), anisotropicBlur);
        vec3 distortionNormal = vec3(0.0);
        vec3 temporalOffset = vec3(time, -time, -time) * temporalDistortion;
        if (distortion > 0.0) {
          distortionNormal = distortion * vec3(snoiseFractal(vec3((pos * distortionScale + temporalOffset))), snoiseFractal(vec3(pos.zxy * distortionScale - temporalOffset)), snoiseFractal(vec3(pos.yxz * distortionScale + temporalOffset)));
        }
        for (float i = 0.0; i < ${samples}.0; i ++) {
          vec3 sampleNorm = normalize(n + roughnessFactor * roughnessFactor * 2.0 * normalize(vec3(rand(runningSeed++) - 0.5, rand(runningSeed++) - 0.5, rand(runningSeed++) - 0.5)) * pow(rand(runningSeed++), 0.33) + distortionNormal);
          transmissionR = getIBLVolumeRefraction(
            sampleNorm, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
            pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness  + thickness_smear * (i + randomCoords) / float(${samples}),
            material.attenuationColor, material.attenuationDistance
          ).r;
          transmissionG = getIBLVolumeRefraction(
            sampleNorm, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
            pos, modelMatrix, viewMatrix, projectionMatrix, material.ior  * (1.0 + chromaticAberration * (i + randomCoords) / float(${samples})) , material.thickness + thickness_smear * (i + randomCoords) / float(${samples}),
            material.attenuationColor, material.attenuationDistance
          ).g;
          transmissionB = getIBLVolumeRefraction(
            sampleNorm, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
            pos, modelMatrix, viewMatrix, projectionMatrix, material.ior * (1.0 + 2.0 * chromaticAberration * (i + randomCoords) / float(${samples})), material.thickness + thickness_smear * (i + randomCoords) / float(${samples}),
            material.attenuationColor, material.attenuationDistance
          ).b;
          transmission.r += transmissionR;
          transmission.g += transmissionG;
          transmission.b += transmissionB;
        }
        transmission /= ${samples}.0;
        totalDiffuse = mix( totalDiffuse, transmission.rgb, material.transmission );
`
      );
    };
    Object.keys(this.uniforms).forEach((name) => Object.defineProperty(this, name, {
      get: () => this.uniforms[name].value,
      set: (v5) => this.uniforms[name].value = v5
    }));
  }
};
var MeshTransmissionMaterial = React86.forwardRef(({
  buffer,
  transmissionSampler = false,
  backside = false,
  side = FrontSide,
  transmission = 1,
  thickness = 0,
  backsideThickness = 0,
  backsideEnvMapIntensity = 1,
  samples = 10,
  resolution,
  backsideResolution,
  background,
  anisotropy,
  anisotropicBlur,
  ...props
}, fref) => {
  extend({
    MeshTransmissionMaterial: MeshTransmissionMaterialImpl
  });
  const ref = React86.useRef(null);
  const [discardMaterial] = React86.useState(() => new DiscardMaterial());
  const fboBack = useFBO(backsideResolution || resolution);
  const fboMain = useFBO(resolution);
  let oldBg;
  let oldEnvMapIntensity;
  let oldTone;
  let parent;
  useFrame((state) => {
    ref.current.time = state.clock.elapsedTime;
    if (ref.current.buffer === fboMain.texture && !transmissionSampler) {
      var _r3f$parent;
      parent = (_r3f$parent = ref.current.__r3f.parent) == null ? void 0 : _r3f$parent.object;
      if (parent) {
        oldTone = state.gl.toneMapping;
        oldBg = state.scene.background;
        oldEnvMapIntensity = ref.current.envMapIntensity;
        state.gl.toneMapping = NoToneMapping;
        if (background) state.scene.background = background;
        parent.material = discardMaterial;
        if (backside) {
          state.gl.setRenderTarget(fboBack);
          state.gl.render(state.scene, state.camera);
          parent.material = ref.current;
          parent.material.buffer = fboBack.texture;
          parent.material.thickness = backsideThickness;
          parent.material.side = BackSide;
          parent.material.envMapIntensity = backsideEnvMapIntensity;
        }
        state.gl.setRenderTarget(fboMain);
        state.gl.render(state.scene, state.camera);
        parent.material = ref.current;
        parent.material.thickness = thickness;
        parent.material.side = side;
        parent.material.buffer = fboMain.texture;
        parent.material.envMapIntensity = oldEnvMapIntensity;
        state.scene.background = oldBg;
        state.gl.setRenderTarget(null);
        state.gl.toneMapping = oldTone;
      }
    }
  });
  React86.useImperativeHandle(fref, () => ref.current, []);
  return React86.createElement("meshTransmissionMaterial", _extends({
    // Samples must re-compile the shader so we memoize it
    args: [samples, transmissionSampler],
    ref
  }, props, {
    buffer: buffer || fboMain.texture,
    _transmission: transmission,
    anisotropicBlur: anisotropicBlur !== null && anisotropicBlur !== void 0 ? anisotropicBlur : anisotropy,
    transmission: transmissionSampler ? transmission : 0,
    thickness,
    side
  }));
});

// node_modules/@react-three/drei/core/MeshDiscardMaterial.js
var React87 = __toESM(require_react());
var MeshDiscardMaterial = React87.forwardRef((props, fref) => {
  extend({
    DiscardMaterialImpl: DiscardMaterial
  });
  return React87.createElement("discardMaterialImpl", _extends({
    ref: fref
  }, props));
});

// node_modules/@react-three/drei/core/MultiMaterial.js
var React88 = __toESM(require_react());
function MultiMaterial(props) {
  const group = React88.useRef(null);
  React88.useLayoutEffect(() => {
    const parent = group.current.parent;
    const geometry2 = parent == null ? void 0 : parent.geometry;
    if (geometry2) {
      const oldMaterial = parent.material;
      parent.material = group.current.__r3f.children.map((instance) => instance.object);
      const oldGroups = [...geometry2.groups];
      geometry2.clearGroups();
      parent.material.forEach((material, index) => {
        if (index < parent.material.length - 1) material.depthWrite = false;
        geometry2.addGroup(0, Infinity, index);
      });
      return () => {
        parent.material = oldMaterial;
        geometry2.groups = oldGroups;
      };
    }
  });
  return React88.createElement("group", _extends({
    ref: group
  }, props));
}

// node_modules/@react-three/drei/core/PointMaterial.js
var React89 = __toESM(require_react());
var opaque_fragment = version >= 154 ? "opaque_fragment" : "output_fragment";
var PointMaterialImpl = class extends PointsMaterial {
  constructor(props) {
    super(props);
    this.onBeforeCompile = (shader, renderer) => {
      const {
        isWebGL2
      } = renderer.capabilities;
      shader.fragmentShader = shader.fragmentShader.replace(`#include <${opaque_fragment}>`, `
        ${!isWebGL2 ? `#extension GL_OES_standard_derivatives : enable
#include <${opaque_fragment}>` : `#include <${opaque_fragment}>`}
      vec2 cxy = 2.0 * gl_PointCoord - 1.0;
      float r = dot(cxy, cxy);
      float delta = fwidth(r);     
      float mask = 1.0 - smoothstep(1.0 - delta, 1.0 + delta, r);
      gl_FragColor = vec4(gl_FragColor.rgb, mask * gl_FragColor.a );
      #include <tonemapping_fragment>
      #include <${version >= 154 ? "colorspace_fragment" : "encodings_fragment"}>
      `);
    };
  }
};
var PointMaterial = React89.forwardRef((props, ref) => {
  const [material] = React89.useState(() => new PointMaterialImpl(null));
  return React89.createElement("primitive", _extends({}, props, {
    object: material,
    ref,
    attach: "material"
  }));
});

// node_modules/@react-three/drei/core/softShadows.js
var React90 = __toESM(require_react());
var pcss = ({
  focus = 0,
  size = 25,
  samples = 10
} = {}) => `
#define PENUMBRA_FILTER_SIZE float(${size})
#define RGB_NOISE_FUNCTION(uv) (randRGB(uv))
vec3 randRGB(vec2 uv) {
  return vec3(
    fract(sin(dot(uv, vec2(12.75613, 38.12123))) * 13234.76575),
    fract(sin(dot(uv, vec2(19.45531, 58.46547))) * 43678.23431),
    fract(sin(dot(uv, vec2(23.67817, 78.23121))) * 93567.23423)
  );
}

vec3 lowPassRandRGB(vec2 uv) {
  // 3x3 convolution (average)
  // can be implemented as separable with an extra buffer for a total of 6 samples instead of 9
  vec3 result = vec3(0);
  result += RGB_NOISE_FUNCTION(uv + vec2(-1.0, -1.0));
  result += RGB_NOISE_FUNCTION(uv + vec2(-1.0,  0.0));
  result += RGB_NOISE_FUNCTION(uv + vec2(-1.0, +1.0));
  result += RGB_NOISE_FUNCTION(uv + vec2( 0.0, -1.0));
  result += RGB_NOISE_FUNCTION(uv + vec2( 0.0,  0.0));
  result += RGB_NOISE_FUNCTION(uv + vec2( 0.0, +1.0));
  result += RGB_NOISE_FUNCTION(uv + vec2(+1.0, -1.0));
  result += RGB_NOISE_FUNCTION(uv + vec2(+1.0,  0.0));
  result += RGB_NOISE_FUNCTION(uv + vec2(+1.0, +1.0));
  result *= 0.111111111; // 1.0 / 9.0
  return result;
}
vec3 highPassRandRGB(vec2 uv) {
  // by subtracting the low-pass signal from the original signal, we're being left with the high-pass signal
  // hp(x) = x - lp(x)
  return RGB_NOISE_FUNCTION(uv) - lowPassRandRGB(uv) + 0.5;
}


vec2 vogelDiskSample(int sampleIndex, int sampleCount, float angle) {
  const float goldenAngle = 2.399963f; // radians
  float r = sqrt(float(sampleIndex) + 0.5f) / sqrt(float(sampleCount));
  float theta = float(sampleIndex) * goldenAngle + angle;
  float sine = sin(theta);
  float cosine = cos(theta);
  return vec2(cosine, sine) * r;
}
float penumbraSize( const in float zReceiver, const in float zBlocker ) { // Parallel plane estimation
  return (zReceiver - zBlocker) / zBlocker;
}
float findBlocker(sampler2D shadowMap, vec2 uv, float compare, float angle) {
  float texelSize = 1.0 / float(textureSize(shadowMap, 0).x);
  float blockerDepthSum = float(${focus});
  float blockers = 0.0;

  int j = 0;
  vec2 offset = vec2(0.);
  float depth = 0.;

  #pragma unroll_loop_start
  for(int i = 0; i < ${samples}; i ++) {
    offset = (vogelDiskSample(j, ${samples}, angle) * texelSize) * 2.0 * PENUMBRA_FILTER_SIZE;
    depth = unpackRGBAToDepth( texture2D( shadowMap, uv + offset));
    if (depth < compare) {
      blockerDepthSum += depth;
      blockers++;
    }
    j++;
  }
  #pragma unroll_loop_end

  if (blockers > 0.0) {
    return blockerDepthSum / blockers;
  }
  return -1.0;
}

        
float vogelFilter(sampler2D shadowMap, vec2 uv, float zReceiver, float filterRadius, float angle) {
  float texelSize = 1.0 / float(textureSize(shadowMap, 0).x);
  float shadow = 0.0f;
  int j = 0;
  vec2 vogelSample = vec2(0.0);
  vec2 offset = vec2(0.0);
  #pragma unroll_loop_start
  for (int i = 0; i < ${samples}; i++) {
    vogelSample = vogelDiskSample(j, ${samples}, angle) * texelSize;
    offset = vogelSample * (1.0 + filterRadius * float(${size}));
    shadow += step( zReceiver, unpackRGBAToDepth( texture2D( shadowMap, uv + offset ) ) );
    j++;
  }
  #pragma unroll_loop_end
  return shadow * 1.0 / ${samples}.0;
}

float PCSS (sampler2D shadowMap, vec4 coords) {
  vec2 uv = coords.xy;
  float zReceiver = coords.z; // Assumed to be eye-space z in this code
  float angle = highPassRandRGB(gl_FragCoord.xy).r * PI2;
  float avgBlockerDepth = findBlocker(shadowMap, uv, zReceiver, angle);
  if (avgBlockerDepth == -1.0) {
    return 1.0;
  }
  float penumbraRatio = penumbraSize(zReceiver, avgBlockerDepth);
  return vogelFilter(shadowMap, uv, zReceiver, 1.25 * penumbraRatio, angle);
}`;
function reset(gl, scene, camera) {
  scene.traverse((object) => {
    if (object.material) {
      gl.properties.remove(object.material);
      object.material.dispose == null || object.material.dispose();
    }
  });
  gl.info.programs.length = 0;
  gl.compile(scene, camera);
}
function SoftShadows({
  focus = 0,
  samples = 10,
  size = 25
}) {
  const gl = useThree((state) => state.gl);
  const scene = useThree((state) => state.scene);
  const camera = useThree((state) => state.camera);
  React90.useEffect(() => {
    const original = ShaderChunk.shadowmap_pars_fragment;
    ShaderChunk.shadowmap_pars_fragment = ShaderChunk.shadowmap_pars_fragment.replace("#ifdef USE_SHADOWMAP", "#ifdef USE_SHADOWMAP\n" + pcss({
      size,
      samples,
      focus
    })).replace("#if defined( SHADOWMAP_TYPE_PCF )", "\nreturn PCSS(shadowMap, shadowCoord);\n#if defined( SHADOWMAP_TYPE_PCF )");
    reset(gl, scene, camera);
    return () => {
      ShaderChunk.shadowmap_pars_fragment = original;
      reset(gl, scene, camera);
    };
  }, [focus, size, samples]);
  return null;
}

// node_modules/@react-three/drei/core/shapes.js
var React91 = __toESM(require_react());
function create2(type, effect) {
  const El = type + "Geometry";
  return React91.forwardRef(({
    args,
    children,
    ...props
  }, fref) => {
    const ref = React91.useRef(null);
    React91.useImperativeHandle(fref, () => ref.current);
    React91.useLayoutEffect(() => void (effect == null ? void 0 : effect(ref.current)));
    return React91.createElement("mesh", _extends({
      ref
    }, props), React91.createElement(El, {
      attach: "geometry",
      args
    }), children);
  });
}
var Box = create2("box");
var Circle = create2("circle");
var Cone = create2("cone");
var Cylinder = create2("cylinder");
var Sphere2 = create2("sphere");
var Plane2 = create2("plane");
var Tube = create2("tube");
var Torus = create2("torus");
var TorusKnot = create2("torusKnot");
var Tetrahedron = create2("tetrahedron");
var Ring = create2("ring");
var Polyhedron = create2("polyhedron");
var Icosahedron = create2("icosahedron");
var Octahedron = create2("octahedron");
var Dodecahedron = create2("dodecahedron");
var Extrude = create2("extrude");
var Lathe = create2("lathe");
var Capsule = create2("capsule");
var Shape2 = create2("shape", ({
  geometry: geometry2
}) => {
  const pos = geometry2.attributes.position;
  const b3 = new Box3().setFromBufferAttribute(pos);
  const b3size = new Vector3();
  b3.getSize(b3size);
  const uv = [];
  let x = 0, y = 0, u = 0, v5 = 0;
  for (let i2 = 0; i2 < pos.count; i2++) {
    x = pos.getX(i2);
    y = pos.getY(i2);
    u = (x - b3.min.x) / b3size.x;
    v5 = (y - b3.min.y) / b3size.y;
    uv.push(u, v5);
  }
  geometry2.setAttribute("uv", new Float32BufferAttribute(uv, 2));
});

// node_modules/@react-three/drei/core/RoundedBox.js
var React92 = __toESM(require_react());
var eps = 1e-5;
function createShape(width, height, radius0) {
  const shape = new Shape();
  const radius = radius0 - eps;
  shape.absarc(eps, eps, eps, -Math.PI / 2, -Math.PI, true);
  shape.absarc(eps, height - radius * 2, eps, Math.PI, Math.PI / 2, true);
  shape.absarc(width - radius * 2, height - radius * 2, eps, Math.PI / 2, 0, true);
  shape.absarc(width - radius * 2, eps, eps, 0, -Math.PI / 2, true);
  return shape;
}
var RoundedBox = React92.forwardRef(function RoundedBox2({
  args: [width = 1, height = 1, depth = 1] = [],
  radius = 0.05,
  steps = 1,
  smoothness = 4,
  bevelSegments = 4,
  creaseAngle = 0.4,
  children,
  ...rest
}, ref) {
  return React92.createElement("mesh", _extends({
    ref
  }, rest), React92.createElement(RoundedBoxGeometry, {
    args: [width, height, depth],
    radius,
    steps,
    smoothness,
    bevelSegments,
    creaseAngle
  }), children);
});
var RoundedBoxGeometry = React92.forwardRef(function RoundedBoxGeometry2({
  args: [width = 1, height = 1, depth = 1] = [],
  radius = 0.05,
  steps = 1,
  smoothness = 4,
  bevelSegments = 4,
  creaseAngle = 0.4,
  ...rest
}, ref) {
  const shape = React92.useMemo(() => createShape(width, height, radius), [width, height, radius]);
  const params = React92.useMemo(() => ({
    depth: depth - radius * 2,
    bevelEnabled: true,
    bevelSegments: bevelSegments * 2,
    steps,
    bevelSize: radius - eps,
    bevelThickness: radius,
    curveSegments: smoothness
  }), [depth, radius, smoothness, bevelSegments, steps]);
  const geomRef = React92.useRef(null);
  React92.useLayoutEffect(() => {
    if (geomRef.current) {
      geomRef.current.center();
      toCreasedNormals(geomRef.current, creaseAngle);
    }
  }, [shape, params, creaseAngle]);
  React92.useImperativeHandle(ref, () => geomRef.current);
  return React92.createElement("extrudeGeometry", _extends({
    ref: geomRef,
    args: [shape, params]
  }, rest));
});

// node_modules/@react-three/drei/core/ScreenQuad.js
var React93 = __toESM(require_react());
function createScreenQuadGeometry() {
  const geometry2 = new BufferGeometry();
  const vertices = new Float32Array([-1, -1, 3, -1, -1, 3]);
  geometry2.boundingSphere = new Sphere();
  geometry2.boundingSphere.set(new Vector3(), Infinity);
  geometry2.setAttribute("position", new BufferAttribute(vertices, 2));
  return geometry2;
}
var ScreenQuad = React93.forwardRef(function ScreenQuad2({
  children,
  ...restProps
}, ref) {
  const geometry2 = React93.useMemo(createScreenQuadGeometry, []);
  return React93.createElement("mesh", _extends({
    ref,
    geometry: geometry2,
    frustumCulled: false
  }, restProps), children);
});

// node_modules/@react-three/drei/core/Resize.js
var React94 = __toESM(require_react());
var Resize = React94.forwardRef(({
  children,
  width,
  height,
  depth,
  box3,
  precise = true,
  ...props
}, fRef) => {
  const ref = React94.useRef(null);
  const outer = React94.useRef(null);
  const inner = React94.useRef(null);
  React94.useLayoutEffect(() => {
    outer.current.matrixWorld.identity();
    let box = box3 || new Box3().setFromObject(inner.current, precise);
    const w = box.max.x - box.min.x;
    const h = box.max.y - box.min.y;
    const d = box.max.z - box.min.z;
    let dimension = Math.max(w, h, d);
    if (width) dimension = w;
    if (height) dimension = h;
    if (depth) dimension = d;
    outer.current.scale.setScalar(1 / dimension);
  }, [width, height, depth, box3, precise]);
  React94.useImperativeHandle(fRef, () => ref.current, []);
  return React94.createElement("group", _extends({
    ref
  }, props), React94.createElement("group", {
    ref: outer
  }, React94.createElement("group", {
    ref: inner
  }, children)));
});

// node_modules/@react-three/drei/core/Bounds.js
var React95 = __toESM(require_react());
var AnimationState = (function(AnimationState2) {
  AnimationState2[AnimationState2["NONE"] = 0] = "NONE";
  AnimationState2[AnimationState2["START"] = 1] = "START";
  AnimationState2[AnimationState2["ACTIVE"] = 2] = "ACTIVE";
  return AnimationState2;
})(AnimationState || {});
var isOrthographic = (def) => def && def.isOrthographicCamera;
var isBox3 = (def) => def && def.isBox3;
var interpolateFuncDefault = (t) => {
  return 1 - Math.exp(-5 * t) + 7e-3 * t;
};
var context6 = React95.createContext(null);
function Bounds({
  children,
  maxDuration = 1,
  margin = 1.2,
  observe,
  fit,
  clip,
  interpolateFunc = interpolateFuncDefault,
  onFit
}) {
  const ref = React95.useRef(null);
  const {
    camera,
    size,
    invalidate
  } = useThree();
  const controls = useThree((state) => state.controls);
  const onFitRef = React95.useRef(onFit);
  onFitRef.current = onFit;
  const origin = React95.useRef({
    camPos: new Vector3(),
    camRot: new Quaternion(),
    camZoom: 1
  });
  const goal = React95.useRef({
    camPos: void 0,
    camRot: void 0,
    camZoom: void 0,
    camUp: void 0,
    target: void 0
  });
  const animationState = React95.useRef(AnimationState.NONE);
  const t = React95.useRef(0);
  const [box] = React95.useState(() => new Box3());
  const api = React95.useMemo(() => {
    function getSize() {
      const boxSize = box.getSize(new Vector3());
      const center = box.getCenter(new Vector3());
      const maxSize = Math.max(boxSize.x, boxSize.y, boxSize.z);
      const fitHeightDistance = isOrthographic(camera) ? maxSize * 4 : maxSize / (2 * Math.atan(Math.PI * camera.fov / 360));
      const fitWidthDistance = isOrthographic(camera) ? maxSize * 4 : fitHeightDistance / camera.aspect;
      const distance = margin * Math.max(fitHeightDistance, fitWidthDistance);
      return {
        box,
        size: boxSize,
        center,
        distance
      };
    }
    return {
      getSize,
      refresh(object) {
        if (isBox3(object)) box.copy(object);
        else {
          const target2 = object || ref.current;
          if (!target2) return this;
          target2.updateWorldMatrix(true, true);
          box.setFromObject(target2);
        }
        if (box.isEmpty()) {
          const max = camera.position.length() || 10;
          box.setFromCenterAndSize(new Vector3(), new Vector3(max, max, max));
        }
        origin.current.camPos.copy(camera.position);
        origin.current.camRot.copy(camera.quaternion);
        isOrthographic(camera) && (origin.current.camZoom = camera.zoom);
        goal.current.camPos = void 0;
        goal.current.camRot = void 0;
        goal.current.camZoom = void 0;
        goal.current.camUp = void 0;
        goal.current.target = void 0;
        return this;
      },
      reset() {
        const {
          center,
          distance
        } = getSize();
        const direction2 = camera.position.clone().sub(center).normalize();
        goal.current.camPos = center.clone().addScaledVector(direction2, distance);
        goal.current.target = center.clone();
        const mCamRot = new Matrix4().lookAt(goal.current.camPos, goal.current.target, camera.up);
        goal.current.camRot = new Quaternion().setFromRotationMatrix(mCamRot);
        animationState.current = AnimationState.START;
        t.current = 0;
        return this;
      },
      moveTo(position2) {
        goal.current.camPos = Array.isArray(position2) ? new Vector3(...position2) : position2.clone();
        animationState.current = AnimationState.START;
        t.current = 0;
        return this;
      },
      lookAt({
        target: target2,
        up
      }) {
        goal.current.target = Array.isArray(target2) ? new Vector3(...target2) : target2.clone();
        if (up) {
          goal.current.camUp = Array.isArray(up) ? new Vector3(...up) : up.clone();
        } else {
          goal.current.camUp = camera.up.clone();
        }
        const mCamRot = new Matrix4().lookAt(goal.current.camPos || camera.position, goal.current.target, goal.current.camUp);
        goal.current.camRot = new Quaternion().setFromRotationMatrix(mCamRot);
        animationState.current = AnimationState.START;
        t.current = 0;
        return this;
      },
      /**
       * @deprecated Use moveTo and lookAt instead
       */
      to({
        position: position2,
        target: target2
      }) {
        return this.moveTo(position2).lookAt({
          target: target2
        });
      },
      fit() {
        if (!isOrthographic(camera)) {
          return this.reset();
        }
        let maxHeight = 0, maxWidth = 0;
        const vertices = [new Vector3(box.min.x, box.min.y, box.min.z), new Vector3(box.min.x, box.max.y, box.min.z), new Vector3(box.min.x, box.min.y, box.max.z), new Vector3(box.min.x, box.max.y, box.max.z), new Vector3(box.max.x, box.max.y, box.max.z), new Vector3(box.max.x, box.max.y, box.min.z), new Vector3(box.max.x, box.min.y, box.max.z), new Vector3(box.max.x, box.min.y, box.min.z)];
        const pos = goal.current.camPos || camera.position;
        const target2 = goal.current.target || (controls == null ? void 0 : controls.target);
        const up = goal.current.camUp || camera.up;
        const mCamWInv = target2 ? new Matrix4().lookAt(pos, target2, up).setPosition(pos).invert() : camera.matrixWorldInverse;
        for (const v5 of vertices) {
          v5.applyMatrix4(mCamWInv);
          maxHeight = Math.max(maxHeight, Math.abs(v5.y));
          maxWidth = Math.max(maxWidth, Math.abs(v5.x));
        }
        maxHeight *= 2;
        maxWidth *= 2;
        const zoomForHeight = (camera.top - camera.bottom) / maxHeight;
        const zoomForWidth = (camera.right - camera.left) / maxWidth;
        goal.current.camZoom = Math.min(zoomForHeight, zoomForWidth) / margin;
        animationState.current = AnimationState.START;
        t.current = 0;
        onFitRef.current && onFitRef.current(this.getSize());
        return this;
      },
      clip() {
        const {
          distance
        } = getSize();
        camera.near = distance / 100;
        camera.far = distance * 100;
        camera.updateProjectionMatrix();
        if (controls) {
          controls.maxDistance = distance * 10;
          controls.update();
        }
        invalidate();
        return this;
      }
    };
  }, [box, camera, controls, margin, invalidate]);
  React95.useLayoutEffect(() => {
    if (controls) {
      const callback = () => {
        if (controls && goal.current.target && animationState.current !== AnimationState.NONE) {
          const front = new Vector3().setFromMatrixColumn(camera.matrix, 2);
          const d0 = origin.current.camPos.distanceTo(controls.target);
          const d1 = (goal.current.camPos || origin.current.camPos).distanceTo(goal.current.target);
          const d = (1 - t.current) * d0 + t.current * d1;
          controls.target.copy(camera.position).addScaledVector(front, -d);
          controls.update();
        }
        animationState.current = AnimationState.NONE;
      };
      controls.addEventListener("start", callback);
      return () => controls.removeEventListener("start", callback);
    }
  }, [controls]);
  const count = React95.useRef(0);
  React95.useLayoutEffect(() => {
    if (observe || count.current++ === 0) {
      api.refresh();
      if (fit) api.reset().fit();
      if (clip) api.clip();
    }
  }, [size, clip, fit, observe, camera, controls]);
  useFrame((state, delta) => {
    if (animationState.current === AnimationState.START) {
      animationState.current = AnimationState.ACTIVE;
      invalidate();
    } else if (animationState.current === AnimationState.ACTIVE) {
      t.current += delta / maxDuration;
      if (t.current >= 1) {
        goal.current.camPos && camera.position.copy(goal.current.camPos);
        goal.current.camRot && camera.quaternion.copy(goal.current.camRot);
        goal.current.camUp && camera.up.copy(goal.current.camUp);
        goal.current.camZoom && isOrthographic(camera) && (camera.zoom = goal.current.camZoom);
        camera.updateMatrixWorld();
        camera.updateProjectionMatrix();
        if (controls && goal.current.target) {
          controls.target.copy(goal.current.target);
          controls.update();
        }
        animationState.current = AnimationState.NONE;
      } else {
        const k = interpolateFunc(t.current);
        goal.current.camPos && camera.position.lerpVectors(origin.current.camPos, goal.current.camPos, k);
        goal.current.camRot && camera.quaternion.slerpQuaternions(origin.current.camRot, goal.current.camRot, k);
        goal.current.camUp && camera.up.set(0, 1, 0).applyQuaternion(camera.quaternion);
        goal.current.camZoom && isOrthographic(camera) && (camera.zoom = (1 - k) * origin.current.camZoom + k * goal.current.camZoom);
        camera.updateMatrixWorld();
        camera.updateProjectionMatrix();
      }
      invalidate();
    }
  });
  return React95.createElement("group", {
    ref
  }, React95.createElement(context6.Provider, {
    value: api
  }, children));
}
function useBounds() {
  return React95.useContext(context6);
}

// node_modules/@react-three/drei/core/CameraShake.js
var React96 = __toESM(require_react());
var CameraShake = React96.forwardRef(({
  intensity = 1,
  decay,
  decayRate = 0.65,
  maxYaw = 0.1,
  maxPitch = 0.1,
  maxRoll = 0.1,
  yawFrequency = 0.1,
  pitchFrequency = 0.1,
  rollFrequency = 0.1
}, ref) => {
  const camera = useThree((state) => state.camera);
  const defaultControls = useThree((state) => state.controls);
  const intensityRef = React96.useRef(intensity);
  const initialRotation = React96.useRef(camera.rotation.clone());
  const [yawNoise] = React96.useState(() => new SimplexNoise());
  const [pitchNoise] = React96.useState(() => new SimplexNoise());
  const [rollNoise] = React96.useState(() => new SimplexNoise());
  const constrainIntensity = () => {
    if (intensityRef.current < 0 || intensityRef.current > 1) {
      intensityRef.current = intensityRef.current < 0 ? 0 : 1;
    }
  };
  React96.useImperativeHandle(ref, () => ({
    getIntensity: () => intensityRef.current,
    setIntensity: (val) => {
      intensityRef.current = val;
      constrainIntensity();
    }
  }), []);
  React96.useEffect(() => {
    if (defaultControls) {
      const callback = () => void (initialRotation.current = camera.rotation.clone());
      defaultControls.addEventListener("change", callback);
      callback();
      return () => void defaultControls.removeEventListener("change", callback);
    }
  }, [camera, defaultControls]);
  useFrame((state, delta) => {
    const shake = Math.pow(intensityRef.current, 2);
    const yaw = maxYaw * shake * yawNoise.noise(state.clock.elapsedTime * yawFrequency, 1);
    const pitch = maxPitch * shake * pitchNoise.noise(state.clock.elapsedTime * pitchFrequency, 1);
    const roll = maxRoll * shake * rollNoise.noise(state.clock.elapsedTime * rollFrequency, 1);
    camera.rotation.set(initialRotation.current.x + pitch, initialRotation.current.y + yaw, initialRotation.current.z + roll);
    if (decay && intensityRef.current > 0) {
      intensityRef.current -= decayRate * delta;
      constrainIntensity();
    }
  });
  return null;
});

// node_modules/@react-three/drei/core/Float.js
var React97 = __toESM(require_react());
var Float = React97.forwardRef(({
  children,
  enabled = true,
  speed = 1,
  rotationIntensity = 1,
  floatIntensity = 1,
  floatingRange = [-0.1, 0.1],
  autoInvalidate = false,
  ...props
}, forwardRef82) => {
  const ref = React97.useRef(null);
  React97.useImperativeHandle(forwardRef82, () => ref.current, []);
  const offset = React97.useRef(Math.random() * 1e4);
  useFrame((state) => {
    var _floatingRange$, _floatingRange$2;
    if (!enabled || speed === 0) return;
    if (autoInvalidate) state.invalidate();
    const t = offset.current + state.clock.elapsedTime;
    ref.current.rotation.x = Math.cos(t / 4 * speed) / 8 * rotationIntensity;
    ref.current.rotation.y = Math.sin(t / 4 * speed) / 8 * rotationIntensity;
    ref.current.rotation.z = Math.sin(t / 4 * speed) / 20 * rotationIntensity;
    let yPosition = Math.sin(t / 4 * speed) / 10;
    yPosition = MathUtils.mapLinear(yPosition, -0.1, 0.1, (_floatingRange$ = floatingRange == null ? void 0 : floatingRange[0]) !== null && _floatingRange$ !== void 0 ? _floatingRange$ : -0.1, (_floatingRange$2 = floatingRange == null ? void 0 : floatingRange[1]) !== null && _floatingRange$2 !== void 0 ? _floatingRange$2 : 0.1);
    ref.current.position.y = yPosition * floatIntensity;
    ref.current.updateMatrix();
  });
  return React97.createElement("group", props, React97.createElement("group", {
    ref,
    matrixAutoUpdate: false
  }, children));
});

// node_modules/@react-three/drei/core/Stage.js
var React101 = __toESM(require_react());

// node_modules/@react-three/drei/core/Environment.js
var React98 = __toESM(require_react());

// node_modules/@react-three/drei/helpers/environment-assets.js
var presetsObj = {
  apartment: "lebombo_1k.hdr",
  city: "potsdamer_platz_1k.hdr",
  dawn: "kiara_1_dawn_1k.hdr",
  forest: "forest_slope_1k.hdr",
  lobby: "st_fagans_interior_1k.hdr",
  night: "dikhololo_night_1k.hdr",
  park: "rooitou_park_1k.hdr",
  studio: "studio_small_03_1k.hdr",
  sunset: "venice_sunset_1k.hdr",
  warehouse: "empty_warehouse_01_1k.hdr"
};

// node_modules/@react-three/drei/core/useEnvironment.js
var import_react17 = __toESM(require_react());
var CUBEMAP_ROOT = "https://raw.githack.com/pmndrs/drei-assets/456060a26bbeb8fdf79326f224b6d99b8bcce736/hdri/";
var isArray2 = (arr) => Array.isArray(arr);
var defaultFiles = ["/px.png", "/nx.png", "/py.png", "/ny.png", "/pz.png", "/nz.png"];
function useEnvironment({
  files = defaultFiles,
  path = "",
  preset = void 0,
  colorSpace = void 0,
  extensions: extensions2
} = {}) {
  if (preset) {
    validatePreset(preset);
    files = presetsObj[preset];
    path = CUBEMAP_ROOT;
  }
  const multiFile = isArray2(files);
  const {
    extension,
    isCubemap
  } = getExtension(files);
  const loader2 = getLoader(extension);
  if (!loader2) throw new Error("useEnvironment: Unrecognized file extension: " + files);
  const gl = useThree((state) => state.gl);
  (0, import_react17.useLayoutEffect)(() => {
    if (extension !== "webp" && extension !== "jpg" && extension !== "jpeg") return;
    function clearGainmapTexture() {
      useLoader.clear(loader2, multiFile ? [files] : files);
    }
    gl.domElement.addEventListener("webglcontextlost", clearGainmapTexture, {
      once: true
    });
  }, [files, gl.domElement]);
  const loaderResult = useLoader(loader2, multiFile ? [files] : files, (loader3) => {
    if (extension === "webp" || extension === "jpg" || extension === "jpeg") {
      loader3.setRenderer(gl);
    }
    loader3.setPath == null || loader3.setPath(path);
    if (extensions2) extensions2(loader3);
  });
  let texture = multiFile ? (
    // @ts-ignore
    loaderResult[0]
  ) : loaderResult;
  if (extension === "jpg" || extension === "jpeg" || extension === "webp") {
    var _renderTarget;
    texture = (_renderTarget = texture.renderTarget) == null ? void 0 : _renderTarget.texture;
  }
  texture.mapping = isCubemap ? CubeReflectionMapping : EquirectangularReflectionMapping;
  texture.colorSpace = colorSpace !== null && colorSpace !== void 0 ? colorSpace : isCubemap ? "srgb" : "srgb-linear";
  return texture;
}
var preloadDefaultOptions = {
  files: defaultFiles,
  path: "",
  preset: void 0,
  extensions: void 0
};
useEnvironment.preload = (preloadOptions) => {
  const options = {
    ...preloadDefaultOptions,
    ...preloadOptions
  };
  let {
    files,
    path = ""
  } = options;
  const {
    preset,
    extensions: extensions2
  } = options;
  if (preset) {
    validatePreset(preset);
    files = presetsObj[preset];
    path = CUBEMAP_ROOT;
  }
  const {
    extension
  } = getExtension(files);
  if (extension === "webp" || extension === "jpg" || extension === "jpeg") {
    throw new Error("useEnvironment: Preloading gainmaps is not supported");
  }
  const loader2 = getLoader(extension);
  if (!loader2) throw new Error("useEnvironment: Unrecognized file extension: " + files);
  useLoader.preload(loader2, isArray2(files) ? [files] : files, (loader3) => {
    loader3.setPath == null || loader3.setPath(path);
    if (extensions2) extensions2(loader3);
  });
};
var clearDefaultOptins = {
  files: defaultFiles,
  preset: void 0
};
useEnvironment.clear = (clearOptions) => {
  const options = {
    ...clearDefaultOptins,
    ...clearOptions
  };
  let {
    files
  } = options;
  const {
    preset
  } = options;
  if (preset) {
    validatePreset(preset);
    files = presetsObj[preset];
  }
  const {
    extension
  } = getExtension(files);
  const loader2 = getLoader(extension);
  if (!loader2) throw new Error("useEnvironment: Unrecognized file extension: " + files);
  useLoader.clear(loader2, isArray2(files) ? [files] : files);
};
function validatePreset(preset) {
  if (!(preset in presetsObj)) throw new Error("Preset must be one of: " + Object.keys(presetsObj).join(", "));
}
function getExtension(files) {
  var _firstEntry$split$pop;
  const isCubemap = isArray2(files) && files.length === 6;
  const isGainmap = isArray2(files) && files.length === 3 && files.some((file) => file.endsWith("json"));
  const firstEntry = isArray2(files) ? files[0] : files;
  const extension = isCubemap ? "cube" : isGainmap ? "webp" : firstEntry.startsWith("data:application/exr") ? "exr" : firstEntry.startsWith("data:application/hdr") ? "hdr" : firstEntry.startsWith("data:image/jpeg") ? "jpg" : (_firstEntry$split$pop = firstEntry.split(".").pop()) == null || (_firstEntry$split$pop = _firstEntry$split$pop.split("?")) == null || (_firstEntry$split$pop = _firstEntry$split$pop.shift()) == null ? void 0 : _firstEntry$split$pop.toLowerCase();
  return {
    extension,
    isCubemap,
    isGainmap
  };
}
function getLoader(extension) {
  const loader2 = extension === "cube" ? CubeTextureLoader : extension === "hdr" ? RGBELoader : extension === "exr" ? EXRLoader : extension === "jpg" || extension === "jpeg" ? HDRJPGLoader : extension === "webp" ? GainMapLoader : null;
  return loader2;
}

// node_modules/@react-three/drei/core/Environment.js
var isRef = (obj) => obj.current && obj.current.isScene;
var resolveScene = (scene) => isRef(scene) ? scene.current : scene;
function setEnvProps(background, scene, defaultScene, texture, sceneProps = {}) {
  var _target$backgroundRot, _target$backgroundRot2, _target$environmentRo, _target$environmentRo2;
  sceneProps = {
    backgroundBlurriness: 0,
    backgroundIntensity: 1,
    backgroundRotation: [0, 0, 0],
    environmentIntensity: 1,
    environmentRotation: [0, 0, 0],
    ...sceneProps
  };
  const target2 = resolveScene(scene || defaultScene);
  const oldbg = target2.background;
  const oldenv = target2.environment;
  const oldSceneProps = {
    // @ts-ignore
    backgroundBlurriness: target2.backgroundBlurriness,
    // @ts-ignore
    backgroundIntensity: target2.backgroundIntensity,
    // @ts-ignore
    backgroundRotation: (_target$backgroundRot = (_target$backgroundRot2 = target2.backgroundRotation) == null || _target$backgroundRot2.clone == null ? void 0 : _target$backgroundRot2.clone()) !== null && _target$backgroundRot !== void 0 ? _target$backgroundRot : [0, 0, 0],
    // @ts-ignore
    environmentIntensity: target2.environmentIntensity,
    // @ts-ignore
    environmentRotation: (_target$environmentRo = (_target$environmentRo2 = target2.environmentRotation) == null || _target$environmentRo2.clone == null ? void 0 : _target$environmentRo2.clone()) !== null && _target$environmentRo !== void 0 ? _target$environmentRo : [0, 0, 0]
  };
  if (background !== "only") target2.environment = texture;
  if (background) target2.background = texture;
  applyProps(target2, sceneProps);
  return () => {
    if (background !== "only") target2.environment = oldenv;
    if (background) target2.background = oldbg;
    applyProps(target2, oldSceneProps);
  };
}
function EnvironmentMap({
  scene,
  background = false,
  map,
  ...config
}) {
  const defaultScene = useThree((state) => state.scene);
  React98.useLayoutEffect(() => {
    if (map) return setEnvProps(background, scene, defaultScene, map, config);
  });
  return null;
}
function EnvironmentCube({
  background = false,
  scene,
  blur,
  backgroundBlurriness,
  backgroundIntensity,
  backgroundRotation,
  environmentIntensity,
  environmentRotation,
  ...rest
}) {
  const texture = useEnvironment(rest);
  const defaultScene = useThree((state) => state.scene);
  React98.useLayoutEffect(() => {
    return setEnvProps(background, scene, defaultScene, texture, {
      backgroundBlurriness: blur !== null && blur !== void 0 ? blur : backgroundBlurriness,
      backgroundIntensity,
      backgroundRotation,
      environmentIntensity,
      environmentRotation
    });
  });
  React98.useEffect(() => {
    return () => {
      texture.dispose();
    };
  }, [texture]);
  return null;
}
function EnvironmentPortal({
  children,
  near = 0.1,
  far = 1e3,
  resolution = 256,
  frames = 1,
  map,
  background = false,
  blur,
  backgroundBlurriness,
  backgroundIntensity,
  backgroundRotation,
  environmentIntensity,
  environmentRotation,
  scene,
  files,
  path,
  preset = void 0,
  extensions: extensions2
}) {
  const gl = useThree((state) => state.gl);
  const defaultScene = useThree((state) => state.scene);
  const camera = React98.useRef(null);
  const [virtualScene] = React98.useState(() => new Scene());
  const fbo = React98.useMemo(() => {
    const fbo2 = new WebGLCubeRenderTarget(resolution);
    fbo2.texture.type = HalfFloatType;
    return fbo2;
  }, [resolution]);
  React98.useEffect(() => {
    return () => {
      fbo.dispose();
    };
  }, [fbo]);
  React98.useLayoutEffect(() => {
    if (frames === 1) {
      const autoClear = gl.autoClear;
      gl.autoClear = true;
      camera.current.update(gl, virtualScene);
      gl.autoClear = autoClear;
    }
    return setEnvProps(background, scene, defaultScene, fbo.texture, {
      backgroundBlurriness: blur !== null && blur !== void 0 ? blur : backgroundBlurriness,
      backgroundIntensity,
      backgroundRotation,
      environmentIntensity,
      environmentRotation
    });
  }, [children, virtualScene, fbo.texture, scene, defaultScene, background, frames, gl]);
  let count = 1;
  useFrame(() => {
    if (frames === Infinity || count < frames) {
      const autoClear = gl.autoClear;
      gl.autoClear = true;
      camera.current.update(gl, virtualScene);
      gl.autoClear = autoClear;
      count++;
    }
  });
  return React98.createElement(React98.Fragment, null, createPortal(React98.createElement(React98.Fragment, null, children, React98.createElement("cubeCamera", {
    ref: camera,
    args: [near, far, fbo]
  }), files || preset ? React98.createElement(EnvironmentCube, {
    background: true,
    files,
    preset,
    path,
    extensions: extensions2
  }) : map ? React98.createElement(EnvironmentMap, {
    background: true,
    map,
    extensions: extensions2
  }) : null), virtualScene));
}
function EnvironmentGround(props) {
  var _props$ground, _props$ground2, _scale, _props$ground3;
  const textureDefault = useEnvironment(props);
  const texture = props.map || textureDefault;
  React98.useMemo(() => extend({
    GroundProjectedEnvImpl: GroundProjectedEnv
  }), []);
  React98.useEffect(() => {
    return () => {
      textureDefault.dispose();
    };
  }, [textureDefault]);
  const args = React98.useMemo(() => [texture], [texture]);
  const height = (_props$ground = props.ground) == null ? void 0 : _props$ground.height;
  const radius = (_props$ground2 = props.ground) == null ? void 0 : _props$ground2.radius;
  const scale3 = (_scale = (_props$ground3 = props.ground) == null ? void 0 : _props$ground3.scale) !== null && _scale !== void 0 ? _scale : 1e3;
  return React98.createElement(React98.Fragment, null, React98.createElement(EnvironmentMap, _extends({}, props, {
    map: texture
  })), React98.createElement("groundProjectedEnvImpl", {
    args,
    scale: scale3,
    height,
    radius
  }));
}
function Environment(props) {
  return props.ground ? React98.createElement(EnvironmentGround, props) : props.map ? React98.createElement(EnvironmentMap, props) : props.children ? React98.createElement(EnvironmentPortal, props) : React98.createElement(EnvironmentCube, props);
}

// node_modules/@react-three/drei/core/ContactShadows.js
var React99 = __toESM(require_react());
var ContactShadows = React99.forwardRef(({
  scale: scale3 = 10,
  frames = Infinity,
  opacity = 1,
  width = 1,
  height = 1,
  blur = 1,
  near = 0,
  far = 10,
  resolution = 512,
  smooth = true,
  color = "#000000",
  depthWrite = false,
  renderOrder,
  ...props
}, fref) => {
  const ref = React99.useRef(null);
  const scene = useThree((state) => state.scene);
  const gl = useThree((state) => state.gl);
  const shadowCamera = React99.useRef(null);
  width = width * (Array.isArray(scale3) ? scale3[0] : scale3 || 1);
  height = height * (Array.isArray(scale3) ? scale3[1] : scale3 || 1);
  const [renderTarget, planeGeometry, depthMaterial, blurPlane, horizontalBlurMaterial, verticalBlurMaterial, renderTargetBlur] = React99.useMemo(() => {
    const renderTarget2 = new WebGLRenderTarget(resolution, resolution);
    const renderTargetBlur2 = new WebGLRenderTarget(resolution, resolution);
    renderTargetBlur2.texture.generateMipmaps = renderTarget2.texture.generateMipmaps = false;
    const planeGeometry2 = new PlaneGeometry(width, height).rotateX(Math.PI / 2);
    const blurPlane2 = new Mesh(planeGeometry2);
    const depthMaterial2 = new MeshDepthMaterial();
    depthMaterial2.depthTest = depthMaterial2.depthWrite = false;
    depthMaterial2.onBeforeCompile = (shader) => {
      shader.uniforms = {
        ...shader.uniforms,
        ucolor: {
          value: new Color(color)
        }
      };
      shader.fragmentShader = shader.fragmentShader.replace(
        `void main() {`,
        //
        `uniform vec3 ucolor;
           void main() {
          `
      );
      shader.fragmentShader = shader.fragmentShader.replace(
        "vec4( vec3( 1.0 - fragCoordZ ), opacity );",
        // Colorize the shadow, multiply by the falloff so that the center can remain darker
        "vec4( ucolor * fragCoordZ * 2.0, ( 1.0 - fragCoordZ ) * 1.0 );"
      );
    };
    const horizontalBlurMaterial2 = new ShaderMaterial(HorizontalBlurShader);
    const verticalBlurMaterial2 = new ShaderMaterial(VerticalBlurShader);
    verticalBlurMaterial2.depthTest = horizontalBlurMaterial2.depthTest = false;
    return [renderTarget2, planeGeometry2, depthMaterial2, blurPlane2, horizontalBlurMaterial2, verticalBlurMaterial2, renderTargetBlur2];
  }, [resolution, width, height, scale3, color]);
  const blurShadows = (blur2) => {
    blurPlane.visible = true;
    blurPlane.material = horizontalBlurMaterial;
    horizontalBlurMaterial.uniforms.tDiffuse.value = renderTarget.texture;
    horizontalBlurMaterial.uniforms.h.value = blur2 * 1 / 256;
    gl.setRenderTarget(renderTargetBlur);
    gl.render(blurPlane, shadowCamera.current);
    blurPlane.material = verticalBlurMaterial;
    verticalBlurMaterial.uniforms.tDiffuse.value = renderTargetBlur.texture;
    verticalBlurMaterial.uniforms.v.value = blur2 * 1 / 256;
    gl.setRenderTarget(renderTarget);
    gl.render(blurPlane, shadowCamera.current);
    blurPlane.visible = false;
  };
  let count = 0;
  let initialBackground;
  let initialOverrideMaterial;
  useFrame(() => {
    if (shadowCamera.current && (frames === Infinity || count < frames)) {
      count++;
      initialBackground = scene.background;
      initialOverrideMaterial = scene.overrideMaterial;
      ref.current.visible = false;
      scene.background = null;
      scene.overrideMaterial = depthMaterial;
      gl.setRenderTarget(renderTarget);
      gl.render(scene, shadowCamera.current);
      blurShadows(blur);
      if (smooth) blurShadows(blur * 0.4);
      gl.setRenderTarget(null);
      ref.current.visible = true;
      scene.overrideMaterial = initialOverrideMaterial;
      scene.background = initialBackground;
    }
  });
  React99.useImperativeHandle(fref, () => ref.current, []);
  return React99.createElement("group", _extends({
    "rotation-x": Math.PI / 2
  }, props, {
    ref
  }), React99.createElement("mesh", {
    renderOrder,
    geometry: planeGeometry,
    scale: [1, -1, 1],
    rotation: [-Math.PI / 2, 0, 0]
  }, React99.createElement("meshBasicMaterial", {
    transparent: true,
    map: renderTarget.texture,
    opacity,
    depthWrite
  })), React99.createElement("orthographicCamera", {
    ref: shadowCamera,
    args: [-width / 2, width / 2, height / 2, -height / 2, near, far]
  }));
});

// node_modules/@react-three/drei/core/AccumulativeShadows.js
var React100 = __toESM(require_react());
function isLight(object) {
  return object.isLight;
}
function isGeometry(object) {
  return !!object.geometry;
}
var accumulativeContext = React100.createContext(null);
var SoftShadowMaterial = shaderMaterial({
  color: new Color(),
  blend: 2,
  alphaTest: 0.75,
  opacity: 0,
  map: null
}, `varying vec2 vUv;
   void main() {
     gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.);
     vUv = uv;
   }`, `varying vec2 vUv;
   uniform sampler2D map;
   uniform vec3 color;
   uniform float opacity;
   uniform float alphaTest;
   uniform float blend;
   void main() {
     vec4 sampledDiffuseColor = texture2D(map, vUv);
     gl_FragColor = vec4(color * sampledDiffuseColor.r * blend, max(0.0, (1.0 - (sampledDiffuseColor.r + sampledDiffuseColor.g + sampledDiffuseColor.b) / alphaTest)) * opacity);
     #include <tonemapping_fragment>
     #include <${version >= 154 ? "colorspace_fragment" : "encodings_fragment"}>
   }`);
var AccumulativeShadows = React100.forwardRef(({
  children,
  temporal,
  frames = 40,
  limit = Infinity,
  blend = 20,
  scale: scale3 = 10,
  opacity = 1,
  alphaTest = 0.75,
  color = "black",
  colorBlend = 2,
  resolution = 1024,
  toneMapped = true,
  ...props
}, forwardRef82) => {
  extend({
    SoftShadowMaterial
  });
  const gl = useThree((state) => state.gl);
  const scene = useThree((state) => state.scene);
  const camera = useThree((state) => state.camera);
  const invalidate = useThree((state) => state.invalidate);
  const gPlane = React100.useRef(null);
  const gLights = React100.useRef(null);
  const [plm] = React100.useState(() => new ProgressiveLightMap(gl, scene, resolution));
  React100.useLayoutEffect(() => {
    plm.configure(gPlane.current);
  }, []);
  const api = React100.useMemo(() => ({
    lights: /* @__PURE__ */ new Map(),
    temporal: !!temporal,
    frames: Math.max(2, frames),
    blend: Math.max(2, frames === Infinity ? blend : frames),
    count: 0,
    getMesh: () => gPlane.current,
    reset: () => {
      plm.clear();
      const material = gPlane.current.material;
      material.opacity = 0;
      material.alphaTest = 0;
      api.count = 0;
    },
    update: (frames2 = 1) => {
      const material = gPlane.current.material;
      if (!api.temporal) {
        material.opacity = opacity;
        material.alphaTest = alphaTest;
      } else {
        material.opacity = Math.min(opacity, material.opacity + opacity / api.blend);
        material.alphaTest = Math.min(alphaTest, material.alphaTest + alphaTest / api.blend);
      }
      gLights.current.visible = true;
      plm.prepare();
      for (let i2 = 0; i2 < frames2; i2++) {
        api.lights.forEach((light) => light.update());
        plm.update(camera, api.blend);
      }
      gLights.current.visible = false;
      plm.finish();
    }
  }), [plm, camera, scene, temporal, frames, blend, opacity, alphaTest]);
  React100.useLayoutEffect(() => {
    api.reset();
    if (!api.temporal && api.frames !== Infinity) api.update(api.blend);
  });
  React100.useImperativeHandle(forwardRef82, () => api, [api]);
  useFrame(() => {
    if ((api.temporal || api.frames === Infinity) && api.count < api.frames && api.count < limit) {
      invalidate();
      api.update();
      api.count++;
    }
  });
  return React100.createElement("group", props, React100.createElement("group", {
    traverse: () => null,
    ref: gLights
  }, React100.createElement(accumulativeContext.Provider, {
    value: api
  }, children)), React100.createElement("mesh", {
    receiveShadow: true,
    ref: gPlane,
    scale: scale3,
    rotation: [-Math.PI / 2, 0, 0]
  }, React100.createElement("planeGeometry", null), React100.createElement("softShadowMaterial", {
    transparent: true,
    depthWrite: false,
    toneMapped,
    color,
    blend: colorBlend,
    map: plm.progressiveLightMap2.texture
  })));
});
var RandomizedLight = React100.forwardRef(({
  castShadow = true,
  bias = 1e-3,
  mapSize = 512,
  size = 5,
  near = 0.5,
  far = 500,
  frames = 1,
  position: position2 = [0, 0, 0],
  radius = 1,
  amount = 8,
  intensity = version >= 155 ? Math.PI : 1,
  ambient = 0.5,
  ...props
}, forwardRef82) => {
  const gLights = React100.useRef(null);
  const length = new Vector3(...position2).length();
  const parent = React100.useContext(accumulativeContext);
  const update2 = React100.useCallback(() => {
    let light;
    if (gLights.current) {
      for (let l = 0; l < gLights.current.children.length; l++) {
        light = gLights.current.children[l];
        if (Math.random() > ambient) {
          light.position.set(position2[0] + MathUtils.randFloatSpread(radius), position2[1] + MathUtils.randFloatSpread(radius), position2[2] + MathUtils.randFloatSpread(radius));
        } else {
          let lambda = Math.acos(2 * Math.random() - 1) - Math.PI / 2;
          let phi = 2 * Math.PI * Math.random();
          light.position.set(Math.cos(lambda) * Math.cos(phi) * length, Math.abs(Math.cos(lambda) * Math.sin(phi) * length), Math.sin(lambda) * length);
        }
      }
    }
  }, [radius, ambient, length, ...position2]);
  const api = React100.useMemo(() => ({
    update: update2
  }), [update2]);
  React100.useImperativeHandle(forwardRef82, () => api, [api]);
  React100.useLayoutEffect(() => {
    var _parent$lights;
    const group = gLights.current;
    if (parent) (_parent$lights = parent.lights) == null || _parent$lights.set(group.uuid, api);
    return () => {
      var _parent$lights2;
      return void (parent == null || (_parent$lights2 = parent.lights) == null ? void 0 : _parent$lights2.delete(group.uuid));
    };
  }, [parent, api]);
  return React100.createElement("group", _extends({
    ref: gLights
  }, props), Array.from({
    length: amount
  }, (_, index) => React100.createElement("directionalLight", {
    key: index,
    castShadow,
    "shadow-bias": bias,
    "shadow-mapSize": [mapSize, mapSize],
    intensity: intensity / amount
  }, React100.createElement("orthographicCamera", {
    attach: "shadow-camera",
    args: [-size, size, size, -size, near, far]
  }))));
});
var ProgressiveLightMap = class {
  constructor(renderer, scene, res = 1024) {
    this.renderer = renderer;
    this.res = res;
    this.scene = scene;
    this.buffer1Active = false;
    this.lights = [];
    this.meshes = [];
    this.object = null;
    this.clearColor = new Color();
    this.clearAlpha = 0;
    const textureParams = {
      type: HalfFloatType,
      magFilter: NearestFilter,
      minFilter: NearestFilter
    };
    this.progressiveLightMap1 = new WebGLRenderTarget(this.res, this.res, textureParams);
    this.progressiveLightMap2 = new WebGLRenderTarget(this.res, this.res, textureParams);
    this.discardMat = new DiscardMaterial();
    this.targetMat = new MeshLambertMaterial({
      fog: false
    });
    this.previousShadowMap = {
      value: this.progressiveLightMap1.texture
    };
    this.averagingWindow = {
      value: 100
    };
    this.targetMat.onBeforeCompile = (shader) => {
      shader.vertexShader = "varying vec2 vUv;\n" + shader.vertexShader.slice(0, -1) + "vUv = uv; gl_Position = vec4((uv - 0.5) * 2.0, 1.0, 1.0); }";
      const bodyStart = shader.fragmentShader.indexOf("void main() {");
      shader.fragmentShader = "varying vec2 vUv;\n" + shader.fragmentShader.slice(0, bodyStart) + "uniform sampler2D previousShadowMap;\n	uniform float averagingWindow;\n" + shader.fragmentShader.slice(bodyStart - 1, -1) + `
vec3 texelOld = texture2D(previousShadowMap, vUv).rgb;
        gl_FragColor.rgb = mix(texelOld, gl_FragColor.rgb, 1.0/ averagingWindow);
      }`;
      shader.uniforms.previousShadowMap = this.previousShadowMap;
      shader.uniforms.averagingWindow = this.averagingWindow;
    };
  }
  clear() {
    this.renderer.getClearColor(this.clearColor);
    this.clearAlpha = this.renderer.getClearAlpha();
    this.renderer.setClearColor("black", 1);
    this.renderer.setRenderTarget(this.progressiveLightMap1);
    this.renderer.clear();
    this.renderer.setRenderTarget(this.progressiveLightMap2);
    this.renderer.clear();
    this.renderer.setRenderTarget(null);
    this.renderer.setClearColor(this.clearColor, this.clearAlpha);
    this.lights = [];
    this.meshes = [];
    this.scene.traverse((object) => {
      if (isGeometry(object)) {
        this.meshes.push({
          object,
          material: object.material
        });
      } else if (isLight(object)) {
        this.lights.push({
          object,
          intensity: object.intensity
        });
      }
    });
  }
  prepare() {
    this.lights.forEach((light) => light.object.intensity = 0);
    this.meshes.forEach((mesh) => mesh.object.material = this.discardMat);
  }
  finish() {
    this.lights.forEach((light) => light.object.intensity = light.intensity);
    this.meshes.forEach((mesh) => mesh.object.material = mesh.material);
  }
  configure(object) {
    this.object = object;
  }
  update(camera, blendWindow = 100) {
    if (!this.object) return;
    this.averagingWindow.value = blendWindow;
    this.object.material = this.targetMat;
    const activeMap = this.buffer1Active ? this.progressiveLightMap1 : this.progressiveLightMap2;
    const inactiveMap = this.buffer1Active ? this.progressiveLightMap2 : this.progressiveLightMap1;
    const oldBg = this.scene.background;
    this.scene.background = null;
    this.renderer.setRenderTarget(activeMap);
    this.previousShadowMap.value = inactiveMap.texture;
    this.buffer1Active = !this.buffer1Active;
    this.renderer.render(this.scene, camera);
    this.renderer.setRenderTarget(null);
    this.scene.background = oldBg;
  }
};

// node_modules/@react-three/drei/core/Stage.js
var presets = {
  rembrandt: {
    main: [1, 2, 1],
    fill: [-2, -0.5, -2]
  },
  portrait: {
    main: [-1, 2, 0.5],
    fill: [-1, 0.5, -1.5]
  },
  upfront: {
    main: [0, 2, 1],
    fill: [-1, 0.5, -1.5]
  },
  soft: {
    main: [-2, 4, 4],
    fill: [-1, 0.5, -1.5]
  }
};
function Refit({
  radius,
  adjustCamera
}) {
  const api = useBounds();
  React101.useEffect(() => {
    if (adjustCamera) api.refresh().clip().fit();
  }, [radius, adjustCamera]);
  return null;
}
function Stage({
  children,
  center,
  adjustCamera = true,
  intensity = 0.5,
  shadows = "contact",
  environment = "city",
  preset = "rembrandt",
  ...props
}) {
  var _bias, _normalBias, _size, _offset, _amount, _radius, _ambient, _intensity;
  const config = typeof preset === "string" ? presets[preset] : preset;
  const [{
    radius,
    height
  }, set] = React101.useState({
    radius: 0,
    width: 0,
    height: 0,
    depth: 0
  });
  const shadowBias = (_bias = shadows == null ? void 0 : shadows.bias) !== null && _bias !== void 0 ? _bias : -1e-4;
  const normalBias = (_normalBias = shadows == null ? void 0 : shadows.normalBias) !== null && _normalBias !== void 0 ? _normalBias : 0;
  const shadowSize = (_size = shadows == null ? void 0 : shadows.size) !== null && _size !== void 0 ? _size : 1024;
  const shadowOffset = (_offset = shadows == null ? void 0 : shadows.offset) !== null && _offset !== void 0 ? _offset : 0;
  const contactShadow = shadows === "contact" || (shadows == null ? void 0 : shadows.type) === "contact";
  const accumulativeShadow = shadows === "accumulative" || (shadows == null ? void 0 : shadows.type) === "accumulative";
  const shadowSpread = {
    ...typeof shadows === "object" ? shadows : {}
  };
  const environmentProps = !environment ? null : typeof environment === "string" ? {
    preset: environment
  } : environment;
  const onCentered = React101.useCallback((props2) => {
    const {
      width,
      height: height2,
      depth,
      boundingSphere
    } = props2;
    set({
      radius: boundingSphere.radius,
      width,
      height: height2,
      depth
    });
    if (center != null && center.onCentered) center.onCentered(props2);
  }, []);
  return React101.createElement(React101.Fragment, null, React101.createElement("ambientLight", {
    intensity: intensity / 3
  }), React101.createElement("spotLight", {
    penumbra: 1,
    position: [config.main[0] * radius, config.main[1] * radius, config.main[2] * radius],
    intensity: intensity * 2,
    castShadow: !!shadows,
    "shadow-bias": shadowBias,
    "shadow-normalBias": normalBias,
    "shadow-mapSize": shadowSize
  }), React101.createElement("pointLight", {
    position: [config.fill[0] * radius, config.fill[1] * radius, config.fill[2] * radius],
    intensity
  }), React101.createElement(Bounds, _extends({
    fit: !!adjustCamera,
    clip: !!adjustCamera,
    margin: Number(adjustCamera),
    observe: true
  }, props), React101.createElement(Refit, {
    radius,
    adjustCamera
  }), React101.createElement(Center, _extends({}, center, {
    position: [0, shadowOffset / 2, 0],
    onCentered
  }), children)), React101.createElement("group", {
    position: [0, -height / 2 - shadowOffset / 2, 0]
  }, contactShadow && React101.createElement(ContactShadows, _extends({
    scale: radius * 4,
    far: radius,
    blur: 2
  }, shadowSpread)), accumulativeShadow && React101.createElement(AccumulativeShadows, _extends({
    temporal: true,
    frames: 100,
    alphaTest: 0.9,
    toneMapped: true,
    scale: radius * 4
  }, shadowSpread), React101.createElement(RandomizedLight, {
    amount: (_amount = shadowSpread.amount) !== null && _amount !== void 0 ? _amount : 8,
    radius: (_radius = shadowSpread.radius) !== null && _radius !== void 0 ? _radius : radius,
    ambient: (_ambient = shadowSpread.ambient) !== null && _ambient !== void 0 ? _ambient : 0.5,
    intensity: (_intensity = shadowSpread.intensity) !== null && _intensity !== void 0 ? _intensity : 1,
    position: [config.main[0] * radius, config.main[1] * radius, config.main[2] * radius],
    size: radius * 4,
    bias: -shadowBias,
    mapSize: shadowSize
  }))), environment && React101.createElement(Environment, environmentProps));
}

// node_modules/@react-three/drei/core/Backdrop.js
var React102 = __toESM(require_react());
var easeInExpo = (x) => x === 0 ? 0 : Math.pow(2, 10 * x - 10);
function Backdrop({
  children,
  floor = 0.25,
  segments = 20,
  receiveShadow,
  ...props
}) {
  const ref = React102.useRef(null);
  React102.useLayoutEffect(() => {
    let i2 = 0;
    const offset = segments / segments / 2;
    const position2 = ref.current.attributes.position;
    for (let x = 0; x < segments + 1; x++) {
      for (let y = 0; y < segments + 1; y++) {
        position2.setXYZ(i2++, x / segments - offset + (x === 0 ? -floor : 0), y / segments - offset, easeInExpo(x / segments));
      }
    }
    position2.needsUpdate = true;
    ref.current.computeVertexNormals();
  }, [segments, floor]);
  return React102.createElement("group", props, React102.createElement("mesh", {
    receiveShadow,
    rotation: [-Math.PI / 2, 0, Math.PI / 2]
  }, React102.createElement("planeGeometry", {
    ref,
    args: [1, 1, segments, segments]
  }), children));
}

// node_modules/@react-three/drei/core/Shadow.js
var React103 = __toESM(require_react());
var Shadow = React103.forwardRef(({
  fog = false,
  renderOrder,
  depthWrite = false,
  colorStop = 0,
  color = "black",
  opacity = 0.5,
  ...props
}, ref) => {
  const canvas = React103.useMemo(() => {
    const canvas2 = document.createElement("canvas");
    canvas2.width = 128;
    canvas2.height = 128;
    const context12 = canvas2.getContext("2d");
    const gradient = context12.createRadialGradient(canvas2.width / 2, canvas2.height / 2, 0, canvas2.width / 2, canvas2.height / 2, canvas2.width / 2);
    gradient.addColorStop(colorStop, new Color(color).getStyle());
    gradient.addColorStop(1, "rgba(0,0,0,0)");
    context12.fillStyle = gradient;
    context12.fillRect(0, 0, canvas2.width, canvas2.height);
    return canvas2;
  }, [color, colorStop]);
  return React103.createElement("mesh", _extends({
    renderOrder,
    ref,
    "rotation-x": -Math.PI / 2
  }, props), React103.createElement("planeGeometry", null), React103.createElement("meshBasicMaterial", {
    transparent: true,
    opacity,
    fog,
    depthWrite,
    side: DoubleSide
  }, React103.createElement("canvasTexture", {
    attach: "map",
    args: [canvas]
  })));
});

// node_modules/@react-three/drei/core/Caustics.js
var React104 = __toESM(require_react());
function createNormalMaterial(side = FrontSide) {
  const viewMatrix = {
    value: new Matrix4()
  };
  return Object.assign(new MeshNormalMaterial({
    side
  }), {
    viewMatrix,
    onBeforeCompile: (shader) => {
      shader.uniforms.viewMatrix = viewMatrix;
      shader.fragmentShader = `vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
           return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
         }
` + shader.fragmentShader.replace("#include <normal_fragment_maps>", `#include <normal_fragment_maps>
           normal = inverseTransformDirection( normal, viewMatrix );
`);
    }
  });
}
var CausticsProjectionMaterial = shaderMaterial({
  causticsTexture: null,
  causticsTextureB: null,
  color: new Color(),
  lightProjMatrix: new Matrix4(),
  lightViewMatrix: new Matrix4()
}, `varying vec3 vWorldPosition;
   void main() {
     gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.);
     vec4 worldPosition = modelMatrix * vec4(position, 1.);
     vWorldPosition = worldPosition.xyz;
   }`, `varying vec3 vWorldPosition;
  uniform vec3 color;
  uniform sampler2D causticsTexture;
  uniform sampler2D causticsTextureB;
  uniform mat4 lightProjMatrix;
  uniform mat4 lightViewMatrix;
   void main() {
    // Apply caustics
    vec4 lightSpacePos = lightProjMatrix * lightViewMatrix * vec4(vWorldPosition, 1.0);
    lightSpacePos.xyz /= lightSpacePos.w;
    lightSpacePos.xyz = lightSpacePos.xyz * 0.5 + 0.5;
    vec3 front = texture2D(causticsTexture, lightSpacePos.xy).rgb;
    vec3 back = texture2D(causticsTextureB, lightSpacePos.xy).rgb;
    gl_FragColor = vec4((front + back) * color, 1.0);
    #include <tonemapping_fragment>
    #include <${version >= 154 ? "colorspace_fragment" : "encodings_fragment"}>
   }`);
var CausticsMaterial = shaderMaterial(
  {
    cameraMatrixWorld: new Matrix4(),
    cameraProjectionMatrixInv: new Matrix4(),
    normalTexture: null,
    depthTexture: null,
    lightDir: new Vector3(0, 1, 0),
    lightPlaneNormal: new Vector3(0, 1, 0),
    lightPlaneConstant: 0,
    near: 0.1,
    far: 100,
    modelMatrix: new Matrix4(),
    worldRadius: 1 / 40,
    ior: 1.1,
    bounces: 0,
    resolution: 1024,
    size: 10,
    intensity: 0.5
  },
  /* glsl */
  `
  varying vec2 vUv;
  void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }`,
  /* glsl */
  `
  uniform mat4 cameraMatrixWorld;
  uniform mat4 cameraProjectionMatrixInv;
  uniform vec3 lightDir;
  uniform vec3 lightPlaneNormal;
  uniform float lightPlaneConstant;
  uniform float near;
  uniform float far;
  uniform float time;
  uniform float worldRadius;
  uniform float resolution;
  uniform float size;
  uniform float intensity;
  uniform float ior;
  precision highp isampler2D;
  precision highp usampler2D;
  uniform sampler2D normalTexture;
  uniform sampler2D depthTexture;
  uniform float bounces;
  varying vec2 vUv;
  vec3 WorldPosFromDepth(float depth, vec2 coord) {
    float z = depth * 2.0 - 1.0;
    vec4 clipSpacePosition = vec4(coord * 2.0 - 1.0, z, 1.0);
    vec4 viewSpacePosition = cameraProjectionMatrixInv * clipSpacePosition;
    // Perspective division
    viewSpacePosition /= viewSpacePosition.w;
    vec4 worldSpacePosition = cameraMatrixWorld * viewSpacePosition;
    return worldSpacePosition.xyz;
  }
  float sdPlane( vec3 p, vec3 n, float h ) {
    // n must be normalized
    return dot(p,n) + h;
  }
  float planeIntersect( vec3 ro, vec3 rd, vec4 p ) {
    return -(dot(ro,p.xyz)+p.w)/dot(rd,p.xyz);
  }
  vec3 totalInternalReflection(vec3 ro, vec3 rd, vec3 pos, vec3 normal, float ior, out vec3 rayOrigin, out vec3 rayDirection) {
    rayOrigin = ro;
    rayDirection = rd;
    rayDirection = refract(rayDirection, normal, 1.0 / ior);
    rayOrigin = pos + rayDirection * 0.1;
    return rayDirection;
  }
  void main() {
    // Each sample consists of random offset in the x and y direction
    float caustic = 0.0;
    float causticTexelSize = (1.0 / resolution) * size * 2.0;
    float texelsNeeded = worldRadius / causticTexelSize;
    float sampleRadius = texelsNeeded / resolution;
    float sum = 0.0;
    if (texture2D(depthTexture, vUv).x == 1.0) {
      gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
      return;
    }
    vec2 offset1 = vec2(-0.5, -0.5);//vec2(rand() - 0.5, rand() - 0.5);
    vec2 offset2 = vec2(-0.5, 0.5);//vec2(rand() - 0.5, rand() - 0.5);
    vec2 offset3 = vec2(0.5, 0.5);//vec2(rand() - 0.5, rand() - 0.5);
    vec2 offset4 = vec2(0.5, -0.5);//vec2(rand() - 0.5, rand() - 0.5);
    vec2 uv1 = vUv + offset1 * sampleRadius;
    vec2 uv2 = vUv + offset2 * sampleRadius;
    vec2 uv3 = vUv + offset3 * sampleRadius;
    vec2 uv4 = vUv + offset4 * sampleRadius;
    vec3 normal1 = texture2D(normalTexture, uv1, -10.0).rgb * 2.0 - 1.0;
    vec3 normal2 = texture2D(normalTexture, uv2, -10.0).rgb * 2.0 - 1.0;
    vec3 normal3 = texture2D(normalTexture, uv3, -10.0).rgb * 2.0 - 1.0;
    vec3 normal4 = texture2D(normalTexture, uv4, -10.0).rgb * 2.0 - 1.0;
    float depth1 = texture2D(depthTexture, uv1, -10.0).x;
    float depth2 = texture2D(depthTexture, uv2, -10.0).x;
    float depth3 = texture2D(depthTexture, uv3, -10.0).x;
    float depth4 = texture2D(depthTexture, uv4, -10.0).x;
    // Sanity check the depths
    if (depth1 == 1.0 || depth2 == 1.0 || depth3 == 1.0 || depth4 == 1.0) {
      gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
      return;
    }
    vec3 pos1 = WorldPosFromDepth(depth1, uv1);
    vec3 pos2 = WorldPosFromDepth(depth2, uv2);
    vec3 pos3 = WorldPosFromDepth(depth3, uv3);
    vec3 pos4 = WorldPosFromDepth(depth4, uv4);
    vec3 originPos1 = WorldPosFromDepth(0.0, uv1);
    vec3 originPos2 = WorldPosFromDepth(0.0, uv2);
    vec3 originPos3 = WorldPosFromDepth(0.0, uv3);
    vec3 originPos4 = WorldPosFromDepth(0.0, uv4);
    vec3 endPos1, endPos2, endPos3, endPos4;
    vec3 endDir1, endDir2, endDir3, endDir4;
    totalInternalReflection(originPos1, lightDir, pos1, normal1, ior, endPos1, endDir1);
    totalInternalReflection(originPos2, lightDir, pos2, normal2, ior, endPos2, endDir2);
    totalInternalReflection(originPos3, lightDir, pos3, normal3, ior, endPos3, endDir3);
    totalInternalReflection(originPos4, lightDir, pos4, normal4, ior, endPos4, endDir4);
    float lightPosArea = length(cross(originPos2 - originPos1, originPos3 - originPos1)) + length(cross(originPos3 - originPos1, originPos4 - originPos1));
    float t1 = planeIntersect(endPos1, endDir1, vec4(lightPlaneNormal, lightPlaneConstant));
    float t2 = planeIntersect(endPos2, endDir2, vec4(lightPlaneNormal, lightPlaneConstant));
    float t3 = planeIntersect(endPos3, endDir3, vec4(lightPlaneNormal, lightPlaneConstant));
    float t4 = planeIntersect(endPos4, endDir4, vec4(lightPlaneNormal, lightPlaneConstant));
    vec3 finalPos1 = endPos1 + endDir1 * t1;
    vec3 finalPos2 = endPos2 + endDir2 * t2;
    vec3 finalPos3 = endPos3 + endDir3 * t3;
    vec3 finalPos4 = endPos4 + endDir4 * t4;
    float finalArea = length(cross(finalPos2 - finalPos1, finalPos3 - finalPos1)) + length(cross(finalPos3 - finalPos1, finalPos4 - finalPos1));
    caustic += intensity * (lightPosArea / finalArea);
    // Calculate the area of the triangle in light spaces
    gl_FragColor = vec4(vec3(max(caustic, 0.0)), 1.0);
  }`
);
var NORMALPROPS = {
  depth: true,
  minFilter: LinearFilter,
  magFilter: LinearFilter,
  type: UnsignedByteType
};
var CAUSTICPROPS = {
  minFilter: LinearMipmapLinearFilter,
  magFilter: LinearFilter,
  type: FloatType,
  generateMipmaps: true
};
var Caustics = React104.forwardRef(({
  debug,
  children,
  frames = 1,
  ior = 1.1,
  color = "white",
  causticsOnly = false,
  backside = false,
  backsideIOR = 1.1,
  worldRadius = 0.3125,
  intensity = 0.05,
  resolution = 2024,
  lightSource = [5, 5, 5],
  ...props
}, fref) => {
  extend({
    CausticsProjectionMaterial
  });
  const ref = React104.useRef(null);
  const camera = React104.useRef(null);
  const scene = React104.useRef(null);
  const plane = React104.useRef(null);
  const gl = useThree((state) => state.gl);
  const helper = useHelper(debug && camera, CameraHelper);
  const normalTarget = useFBO(resolution, resolution, NORMALPROPS);
  const normalTargetB = useFBO(resolution, resolution, NORMALPROPS);
  const causticsTarget = useFBO(resolution, resolution, CAUSTICPROPS);
  const causticsTargetB = useFBO(resolution, resolution, CAUSTICPROPS);
  const [normalMat] = React104.useState(() => createNormalMaterial());
  const [normalMatB] = React104.useState(() => createNormalMaterial(BackSide));
  const [causticsMaterial] = React104.useState(() => new CausticsMaterial());
  const [causticsQuad] = React104.useState(() => new FullScreenQuad(causticsMaterial));
  React104.useLayoutEffect(() => {
    ref.current.updateWorldMatrix(false, true);
  });
  let count = 0;
  const v5 = new Vector3();
  const lpF = new Frustum();
  const lpM = new Matrix4();
  const lpP = new Plane();
  const lightDir = new Vector3();
  const lightDirInv = new Vector3();
  const bounds = new Box3();
  const focusPos = new Vector3();
  const boundsVertices = [];
  const worldVerts = [];
  const projectedVerts = [];
  const lightDirs = [];
  const cameraPos = new Vector3();
  for (let i2 = 0; i2 < 8; i2++) {
    boundsVertices.push(new Vector3());
    worldVerts.push(new Vector3());
    projectedVerts.push(new Vector3());
    lightDirs.push(new Vector3());
  }
  useFrame(() => {
    if (frames === Infinity || count++ < frames) {
      var _scene$current$parent, _helper$current;
      if (Array.isArray(lightSource)) lightDir.fromArray(lightSource).normalize();
      else lightDir.copy(ref.current.worldToLocal(lightSource.current.getWorldPosition(v5)).normalize());
      lightDirInv.copy(lightDir).multiplyScalar(-1);
      (_scene$current$parent = scene.current.parent) == null || _scene$current$parent.matrixWorld.identity();
      bounds.setFromObject(scene.current, true);
      boundsVertices[0].set(bounds.min.x, bounds.min.y, bounds.min.z);
      boundsVertices[1].set(bounds.min.x, bounds.min.y, bounds.max.z);
      boundsVertices[2].set(bounds.min.x, bounds.max.y, bounds.min.z);
      boundsVertices[3].set(bounds.min.x, bounds.max.y, bounds.max.z);
      boundsVertices[4].set(bounds.max.x, bounds.min.y, bounds.min.z);
      boundsVertices[5].set(bounds.max.x, bounds.min.y, bounds.max.z);
      boundsVertices[6].set(bounds.max.x, bounds.max.y, bounds.min.z);
      boundsVertices[7].set(bounds.max.x, bounds.max.y, bounds.max.z);
      for (let i2 = 0; i2 < 8; i2++) {
        worldVerts[i2].copy(boundsVertices[i2]);
      }
      bounds.getCenter(focusPos);
      boundsVertices.map((v6) => v6.sub(focusPos));
      const lightPlane = lpP.set(lightDirInv, 0);
      boundsVertices.map((v6, i2) => lightPlane.projectPoint(v6, projectedVerts[i2]));
      const centralVert = projectedVerts.reduce((a, b) => a.add(b), v5.set(0, 0, 0)).divideScalar(projectedVerts.length);
      const radius = projectedVerts.map((v6) => v6.distanceTo(centralVert)).reduce((a, b) => Math.max(a, b));
      const dirLength = boundsVertices.map((x) => x.dot(lightDir)).reduce((a, b) => Math.max(a, b));
      camera.current.position.copy(cameraPos.copy(lightDir).multiplyScalar(dirLength).add(focusPos));
      camera.current.lookAt(scene.current.localToWorld(focusPos));
      const dirMatrix = lpM.lookAt(camera.current.position, focusPos, v5.set(0, 1, 0));
      camera.current.left = -radius;
      camera.current.right = radius;
      camera.current.top = radius;
      camera.current.bottom = -radius;
      const yOffset = v5.set(0, radius, 0).applyMatrix4(dirMatrix);
      const yTime = (camera.current.position.y + yOffset.y) / lightDir.y;
      camera.current.near = 0.1;
      camera.current.far = yTime;
      camera.current.updateProjectionMatrix();
      camera.current.updateMatrixWorld();
      const groundProjectedCoords = worldVerts.map((v6, i2) => v6.add(lightDirs[i2].copy(lightDir).multiplyScalar(-v6.y / lightDir.y)));
      const centerPos = groundProjectedCoords.reduce((a, b) => a.add(b), v5.set(0, 0, 0)).divideScalar(groundProjectedCoords.length);
      const maxSize = 2 * groundProjectedCoords.map((v6) => Math.hypot(v6.x - centerPos.x, v6.z - centerPos.z)).reduce((a, b) => Math.max(a, b));
      plane.current.scale.setScalar(maxSize);
      plane.current.position.copy(centerPos);
      if (debug) (_helper$current = helper.current) == null || _helper$current.update();
      normalMatB.viewMatrix.value = normalMat.viewMatrix.value = camera.current.matrixWorldInverse;
      const dirLightNearPlane = lpF.setFromProjectionMatrix(lpM.multiplyMatrices(camera.current.projectionMatrix, camera.current.matrixWorldInverse)).planes[4];
      causticsMaterial.cameraMatrixWorld = camera.current.matrixWorld;
      causticsMaterial.cameraProjectionMatrixInv = camera.current.projectionMatrixInverse;
      causticsMaterial.lightDir = lightDirInv;
      causticsMaterial.lightPlaneNormal = dirLightNearPlane.normal;
      causticsMaterial.lightPlaneConstant = dirLightNearPlane.constant;
      causticsMaterial.near = camera.current.near;
      causticsMaterial.far = camera.current.far;
      causticsMaterial.resolution = resolution;
      causticsMaterial.size = radius;
      causticsMaterial.intensity = intensity;
      causticsMaterial.worldRadius = worldRadius;
      scene.current.visible = true;
      gl.setRenderTarget(normalTarget);
      gl.clear();
      scene.current.overrideMaterial = normalMat;
      gl.render(scene.current, camera.current);
      gl.setRenderTarget(normalTargetB);
      gl.clear();
      if (backside) {
        scene.current.overrideMaterial = normalMatB;
        gl.render(scene.current, camera.current);
      }
      scene.current.overrideMaterial = null;
      causticsMaterial.ior = ior;
      plane.current.material.lightProjMatrix = camera.current.projectionMatrix;
      plane.current.material.lightViewMatrix = camera.current.matrixWorldInverse;
      causticsMaterial.normalTexture = normalTarget.texture;
      causticsMaterial.depthTexture = normalTarget.depthTexture;
      gl.setRenderTarget(causticsTarget);
      gl.clear();
      causticsQuad.render(gl);
      causticsMaterial.ior = backsideIOR;
      causticsMaterial.normalTexture = normalTargetB.texture;
      causticsMaterial.depthTexture = normalTargetB.depthTexture;
      gl.setRenderTarget(causticsTargetB);
      gl.clear();
      if (backside) causticsQuad.render(gl);
      gl.setRenderTarget(null);
      if (causticsOnly) scene.current.visible = false;
    }
  });
  React104.useImperativeHandle(fref, () => ref.current, []);
  return React104.createElement("group", _extends({
    ref
  }, props), React104.createElement("scene", {
    ref: scene
  }, React104.createElement("orthographicCamera", {
    ref: camera,
    up: [0, 1, 0]
  }), children), React104.createElement("mesh", {
    renderOrder: 2,
    ref: plane,
    "rotation-x": -Math.PI / 2
  }, React104.createElement("planeGeometry", null), React104.createElement("causticsProjectionMaterial", {
    transparent: true,
    color,
    causticsTexture: causticsTarget.texture,
    causticsTextureB: causticsTargetB.texture,
    blending: CustomBlending,
    blendSrc: OneFactor,
    blendDst: SrcAlphaFactor,
    depthWrite: false
  }), debug && React104.createElement(Edges, null, React104.createElement("lineBasicMaterial", {
    color: "#ffff00",
    toneMapped: false
  }))));
});

// node_modules/@react-three/drei/core/SpotLight.js
var React105 = __toESM(require_react());

// node_modules/@react-three/drei/materials/SpotLightMaterial.js
var SpotLightMaterial = class extends ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        depth: {
          value: null
        },
        opacity: {
          value: 1
        },
        attenuation: {
          value: 2.5
        },
        anglePower: {
          value: 12
        },
        spotPosition: {
          value: new Vector3(0, 0, 0)
        },
        lightColor: {
          value: new Color("white")
        },
        cameraNear: {
          value: 0
        },
        cameraFar: {
          value: 1
        },
        resolution: {
          value: new Vector2(0, 0)
        }
      },
      transparent: true,
      depthWrite: false,
      vertexShader: (
        /* glsl */
        `
        varying vec3 vNormal;
        varying float vViewZ;
        varying float vIntensity;
        uniform vec3 spotPosition;
        uniform float attenuation;

        #include <common>
        #include <logdepthbuf_pars_vertex>

        void main() {
          // compute intensity
          vNormal = normalize(normalMatrix * normal);
          vec4 worldPosition = modelMatrix * vec4(position, 1);
          vec4 viewPosition = viewMatrix * worldPosition;
          vViewZ = viewPosition.z;

          vIntensity = 1.0 - saturate(distance(worldPosition.xyz, spotPosition) / attenuation);

          gl_Position = projectionMatrix * viewPosition;

          #include <logdepthbuf_vertex>
        }
      `
      ),
      fragmentShader: (
        /* glsl */
        `
        varying vec3 vNormal;
        varying float vViewZ;
        varying float vIntensity;

        uniform vec3 lightColor;
        uniform float anglePower;
        uniform sampler2D depth;
        uniform vec2 resolution;
        uniform float cameraNear;
        uniform float cameraFar;
        uniform float opacity;

        #include <packing>
        #include <logdepthbuf_pars_fragment>

        float readDepth(sampler2D depthSampler, vec2 uv) {
          float fragCoordZ = texture(depthSampler, uv).r;

          // https://github.com/mrdoob/three.js/issues/23072
          #ifdef USE_LOGDEPTHBUF
            float viewZ = 1.0 - exp2(fragCoordZ * log(cameraFar + 1.0) / log(2.0));
          #else
            float viewZ = perspectiveDepthToViewZ(fragCoordZ, cameraNear, cameraFar);
          #endif

          return viewZ;
        }

        void main() {
          #include <logdepthbuf_fragment>

          vec3 normal = vec3(vNormal.x, vNormal.y, abs(vNormal.z));
          float angleIntensity = pow(dot(normal, vec3(0, 0, 1)), anglePower);
          float intensity = vIntensity * angleIntensity;

          // fades when z is close to sampled depth, meaning the cone is intersecting existing geometry
          bool isSoft = resolution[0] > 0.0 && resolution[1] > 0.0;
          if (isSoft) {
            vec2 uv = gl_FragCoord.xy / resolution;
            intensity *= smoothstep(0.0, 1.0, vViewZ - readDepth(depth, uv));
          }

          gl_FragColor = vec4(lightColor, intensity * opacity);

          #include <tonemapping_fragment>
          #include <${version >= 154 ? "colorspace_fragment" : "encodings_fragment"}>
        }
      `
      )
    });
  }
};

// node_modules/@react-three/drei/helpers/glsl/DefaultSpotlightShadowShadows.glsl.js
var SpotlightShadowShader = "#define GLSLIFY 1\nvarying vec2 vUv;uniform sampler2D uShadowMap;uniform float uTime;void main(){vec3 color=texture2D(uShadowMap,vUv).xyz;gl_FragColor=vec4(color,1.);}";

// node_modules/@react-three/drei/core/SpotLight.js
var isSpotLight = (child) => {
  return child == null ? void 0 : child.isSpotLight;
};
function VolumetricMesh({
  opacity = 1,
  radiusTop,
  radiusBottom,
  depthBuffer,
  color = "white",
  distance = 5,
  angle = 0.15,
  attenuation = 5,
  anglePower = 5
}) {
  const mesh = React105.useRef(null);
  const size = useThree((state) => state.size);
  const camera = useThree((state) => state.camera);
  const dpr = useThree((state) => state.viewport.dpr);
  const [material] = React105.useState(() => new SpotLightMaterial());
  const [vec] = React105.useState(() => new Vector3());
  radiusTop = radiusTop === void 0 ? 0.1 : radiusTop;
  radiusBottom = radiusBottom === void 0 ? angle * 7 : radiusBottom;
  useFrame(() => {
    material.uniforms.spotPosition.value.copy(mesh.current.getWorldPosition(vec));
    mesh.current.lookAt(mesh.current.parent.target.getWorldPosition(vec));
  });
  const geom = React105.useMemo(() => {
    const geometry2 = new CylinderGeometry(radiusTop, radiusBottom, distance, 128, 64, true);
    geometry2.applyMatrix4(new Matrix4().makeTranslation(0, -distance / 2, 0));
    geometry2.applyMatrix4(new Matrix4().makeRotationX(-Math.PI / 2));
    return geometry2;
  }, [distance, radiusTop, radiusBottom]);
  return React105.createElement(React105.Fragment, null, React105.createElement("mesh", {
    ref: mesh,
    geometry: geom,
    raycast: () => null
  }, React105.createElement("primitive", {
    object: material,
    attach: "material",
    "uniforms-opacity-value": opacity,
    "uniforms-lightColor-value": color,
    "uniforms-attenuation-value": attenuation,
    "uniforms-anglePower-value": anglePower,
    "uniforms-depth-value": depthBuffer,
    "uniforms-cameraNear-value": camera.near,
    "uniforms-cameraFar-value": camera.far,
    "uniforms-resolution-value": depthBuffer ? [size.width * dpr, size.height * dpr] : [0, 0]
  })));
}
function useCommon(spotlight, mesh, width, height, distance) {
  const [[pos, dir]] = React105.useState(() => [new Vector3(), new Vector3()]);
  React105.useLayoutEffect(() => {
    if (isSpotLight(spotlight.current)) {
      spotlight.current.shadow.mapSize.set(width, height);
      spotlight.current.shadow.needsUpdate = true;
    } else {
      throw new Error("SpotlightShadow must be a child of a SpotLight");
    }
  }, [spotlight, width, height]);
  useFrame(() => {
    if (!spotlight.current) return;
    const A = spotlight.current.position;
    const B = spotlight.current.target.position;
    dir.copy(B).sub(A);
    var len = dir.length();
    dir.normalize().multiplyScalar(len * distance);
    pos.copy(A).add(dir);
    mesh.current.position.copy(pos);
    mesh.current.lookAt(spotlight.current.target.position);
  });
}
function SpotlightShadowWithShader({
  distance = 0.4,
  alphaTest = 0.5,
  map,
  shader = SpotlightShadowShader,
  width = 512,
  height = 512,
  scale: scale3 = 1,
  children,
  ...rest
}) {
  const mesh = React105.useRef(null);
  const spotlight = rest.spotlightRef;
  const debug = rest.debug;
  useCommon(spotlight, mesh, width, height, distance);
  const renderTarget = React105.useMemo(() => new WebGLRenderTarget(width, height, {
    format: RGBAFormat,
    stencilBuffer: false
    // depthTexture: null!
  }), [width, height]);
  const uniforms = React105.useRef({
    uShadowMap: {
      value: map
    },
    uTime: {
      value: 0
    }
  });
  React105.useEffect(() => void (uniforms.current.uShadowMap.value = map), [map]);
  const fsQuad = React105.useMemo(() => new FullScreenQuad(new ShaderMaterial({
    uniforms: uniforms.current,
    vertexShader: (
      /* glsl */
      `
          varying vec2 vUv;

          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
          `
    ),
    fragmentShader: shader
  })), [shader]);
  React105.useEffect(() => () => {
    fsQuad.material.dispose();
    fsQuad.dispose();
  }, [fsQuad]);
  React105.useEffect(() => () => renderTarget.dispose(), [renderTarget]);
  useFrame(({
    gl
  }, dt) => {
    uniforms.current.uTime.value += dt;
    gl.setRenderTarget(renderTarget);
    fsQuad.render(gl);
    gl.setRenderTarget(null);
  });
  return React105.createElement(React105.Fragment, null, React105.createElement("mesh", {
    ref: mesh,
    scale: scale3,
    castShadow: true
  }, React105.createElement("planeGeometry", null), React105.createElement("meshBasicMaterial", {
    transparent: true,
    side: DoubleSide,
    alphaTest,
    alphaMap: renderTarget.texture,
    "alphaMap-wrapS": RepeatWrapping,
    "alphaMap-wrapT": RepeatWrapping,
    opacity: debug ? 1 : 0
  }, children)));
}
function SpotlightShadowWithoutShader({
  distance = 0.4,
  alphaTest = 0.5,
  map,
  width = 512,
  height = 512,
  scale: scale3,
  children,
  ...rest
}) {
  const mesh = React105.useRef(null);
  const spotlight = rest.spotlightRef;
  const debug = rest.debug;
  useCommon(spotlight, mesh, width, height, distance);
  return React105.createElement(React105.Fragment, null, React105.createElement("mesh", {
    ref: mesh,
    scale: scale3,
    castShadow: true
  }, React105.createElement("planeGeometry", null), React105.createElement("meshBasicMaterial", {
    transparent: true,
    side: DoubleSide,
    alphaTest,
    alphaMap: map,
    "alphaMap-wrapS": RepeatWrapping,
    "alphaMap-wrapT": RepeatWrapping,
    opacity: debug ? 1 : 0
  }, children)));
}
function SpotLightShadow(props) {
  if (props.shader) return React105.createElement(SpotlightShadowWithShader, props);
  return React105.createElement(SpotlightShadowWithoutShader, props);
}
var SpotLight = React105.forwardRef(({
  // Volumetric
  opacity = 1,
  radiusTop,
  radiusBottom,
  depthBuffer,
  color = "white",
  distance = 5,
  angle = 0.15,
  attenuation = 5,
  anglePower = 5,
  volumetric = true,
  debug = false,
  children,
  ...props
}, ref) => {
  const spotlight = React105.useRef(null);
  React105.useImperativeHandle(ref, () => spotlight.current, []);
  return React105.createElement("group", null, debug && spotlight.current && React105.createElement("spotLightHelper", {
    args: [spotlight.current]
  }), React105.createElement("spotLight", _extends({
    ref: spotlight,
    angle,
    color,
    distance,
    castShadow: true
  }, props), volumetric && React105.createElement(VolumetricMesh, {
    debug,
    opacity,
    radiusTop,
    radiusBottom,
    depthBuffer,
    color,
    distance,
    angle,
    attenuation,
    anglePower
  })), children && React105.cloneElement(children, {
    spotlightRef: spotlight,
    debug
  }));
});

// node_modules/@react-three/drei/core/Lightformer.js
var React106 = __toESM(require_react());
var Lightformer = React106.forwardRef(({
  light,
  args,
  map,
  toneMapped = false,
  color = "white",
  form: Form = "rect",
  intensity = 1,
  scale: scale3 = 1,
  target: target2 = [0, 0, 0],
  children,
  ...props
}, forwardRef82) => {
  const ref = React106.useRef(null);
  React106.useImperativeHandle(forwardRef82, () => ref.current, []);
  React106.useLayoutEffect(() => {
    if (!children && !props.material) {
      applyProps(ref.current.material, {
        color
      });
      ref.current.material.color.multiplyScalar(intensity);
    }
  }, [color, intensity, children, props.material]);
  React106.useLayoutEffect(() => {
    if (!props.rotation) ref.current.quaternion.identity();
    if (target2 && !props.rotation) {
      "boolean" === typeof target2 ? ref.current.lookAt(0, 0, 0) : ref.current.lookAt(Array.isArray(target2) ? new Vector3(...target2) : target2);
    }
  }, [target2, props.rotation]);
  scale3 = Array.isArray(scale3) && scale3.length === 2 ? [scale3[0], scale3[1], 1] : scale3;
  return React106.createElement("mesh", _extends({
    ref,
    scale: scale3
  }, props), Form === "circle" ? React106.createElement("ringGeometry", {
    args: args ? args : [0, 0.5, 64]
  }) : Form === "ring" ? React106.createElement("ringGeometry", {
    args: args ? args : [0.25, 0.5, 64]
  }) : Form === "rect" || Form === "plane" ? React106.createElement("planeGeometry", {
    args: args ? args : [1, 1]
  }) : Form === "box" ? React106.createElement("boxGeometry", {
    args: args ? args : [1, 1, 1]
  }) : React106.createElement(Form, {
    args
  }), children ? children : React106.createElement("meshBasicMaterial", {
    toneMapped,
    map,
    side: DoubleSide
  }), light && React106.createElement("pointLight", _extends({
    castShadow: true
  }, light)));
});

// node_modules/@react-three/drei/core/Sky.js
var React107 = __toESM(require_react());
function calcPosFromAngles(inclination, azimuth, vector = new Vector3()) {
  const theta = Math.PI * (inclination - 0.5);
  const phi = 2 * Math.PI * (azimuth - 0.5);
  vector.x = Math.cos(phi);
  vector.y = Math.sin(theta);
  vector.z = Math.sin(phi);
  return vector;
}
var Sky2 = React107.forwardRef(({
  inclination = 0.6,
  azimuth = 0.1,
  distance = 1e3,
  mieCoefficient = 5e-3,
  mieDirectionalG = 0.8,
  rayleigh = 0.5,
  turbidity = 10,
  sunPosition = calcPosFromAngles(inclination, azimuth),
  ...props
}, ref) => {
  const scale3 = React107.useMemo(() => new Vector3().setScalar(distance), [distance]);
  const [sky] = React107.useState(() => new Sky());
  return React107.createElement("primitive", _extends({
    object: sky,
    ref,
    "material-uniforms-mieCoefficient-value": mieCoefficient,
    "material-uniforms-mieDirectionalG-value": mieDirectionalG,
    "material-uniforms-rayleigh-value": rayleigh,
    "material-uniforms-sunPosition-value": sunPosition,
    "material-uniforms-turbidity-value": turbidity,
    scale: scale3
  }, props));
});

// node_modules/@react-three/drei/core/Stars.js
var React108 = __toESM(require_react());
var StarfieldMaterial = class extends ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        time: {
          value: 0
        },
        fade: {
          value: 1
        }
      },
      vertexShader: (
        /* glsl */
        `
      uniform float time;
      attribute float size;
      varying vec3 vColor;
      void main() {
        vColor = color;
        vec4 mvPosition = modelViewMatrix * vec4(position, 0.5);
        gl_PointSize = size * (30.0 / -mvPosition.z) * (3.0 + sin(time + 100.0));
        gl_Position = projectionMatrix * mvPosition;
      }`
      ),
      fragmentShader: (
        /* glsl */
        `
      uniform sampler2D pointTexture;
      uniform float fade;
      varying vec3 vColor;
      void main() {
        float opacity = 1.0;
        if (fade == 1.0) {
          float d = distance(gl_PointCoord, vec2(0.5, 0.5));
          opacity = 1.0 / (1.0 + exp(16.0 * (d - 0.25)));
        }
        gl_FragColor = vec4(vColor, opacity);

        #include <tonemapping_fragment>
	      #include <${version >= 154 ? "colorspace_fragment" : "encodings_fragment"}>
      }`
      )
    });
  }
};
var genStar = (r) => {
  return new Vector3().setFromSpherical(new Spherical(r, Math.acos(1 - Math.random() * 2), Math.random() * 2 * Math.PI));
};
var Stars = React108.forwardRef(({
  radius = 100,
  depth = 50,
  count = 5e3,
  saturation = 0,
  factor = 4,
  fade = false,
  speed = 1
}, ref) => {
  const material = React108.useRef(null);
  const [position2, color, size] = React108.useMemo(() => {
    const positions = [];
    const colors2 = [];
    const sizes = Array.from({
      length: count
    }, () => (0.5 + 0.5 * Math.random()) * factor);
    const color2 = new Color();
    let r = radius + depth;
    const increment = depth / count;
    for (let i2 = 0; i2 < count; i2++) {
      r -= increment * Math.random();
      positions.push(...genStar(r).toArray());
      color2.setHSL(i2 / count, saturation, 0.9);
      colors2.push(color2.r, color2.g, color2.b);
    }
    return [new Float32Array(positions), new Float32Array(colors2), new Float32Array(sizes)];
  }, [count, depth, factor, radius, saturation]);
  useFrame((state) => material.current && (material.current.uniforms.time.value = state.clock.elapsedTime * speed));
  const [starfieldMaterial] = React108.useState(() => new StarfieldMaterial());
  return React108.createElement("points", {
    ref
  }, React108.createElement("bufferGeometry", null, React108.createElement("bufferAttribute", {
    attach: "attributes-position",
    args: [position2, 3]
  }), React108.createElement("bufferAttribute", {
    attach: "attributes-color",
    args: [color, 3]
  }), React108.createElement("bufferAttribute", {
    attach: "attributes-size",
    args: [size, 1]
  })), React108.createElement("primitive", {
    ref: material,
    object: starfieldMaterial,
    attach: "material",
    blending: AdditiveBlending,
    "uniforms-fade-value": fade,
    depthWrite: false,
    transparent: true,
    vertexColors: true
  }));
});

// node_modules/@react-three/drei/core/Cloud.js
var React109 = __toESM(require_react());
var CLOUD_URL = "https://rawcdn.githack.com/pmndrs/drei-assets/9225a9f1fbd449d9411125c2f419b843d0308c9f/cloud.png";
var parentMatrix2 = new Matrix4();
var translation2 = new Vector3();
var rotation2 = new Quaternion();
var cpos = new Vector3();
var cquat = new Quaternion();
var scale2 = new Vector3();
var context7 = React109.createContext(null);
var Clouds = React109.forwardRef(({
  children,
  material = MeshLambertMaterial,
  texture = CLOUD_URL,
  range,
  limit = 200,
  frustumCulled,
  ...props
}, fref) => {
  var _image$width, _image$height;
  const CloudMaterial = React109.useMemo(() => {
    return class extends material {
      constructor() {
        super();
        const opaque_fragment2 = parseInt(REVISION.replace(/\D+/g, "")) >= 154 ? "opaque_fragment" : "output_fragment";
        this.onBeforeCompile = (shader) => {
          shader.vertexShader = `attribute float cloudOpacity;
               varying float vOpacity;
              ` + shader.vertexShader.replace("#include <fog_vertex>", `#include <fog_vertex>
                 vOpacity = cloudOpacity;
                `);
          shader.fragmentShader = `varying float vOpacity;
              ` + shader.fragmentShader.replace(`#include <${opaque_fragment2}>`, `#include <${opaque_fragment2}>
                 gl_FragColor = vec4(outgoingLight, diffuseColor.a * vOpacity);
                `);
        };
      }
    };
  }, [material]);
  extend({
    CloudMaterial
  });
  const instance = React109.useRef(null);
  const clouds = React109.useRef([]);
  const opacities = React109.useMemo(() => new Float32Array(Array.from({
    length: limit
  }, () => 1)), [limit]);
  const colors2 = React109.useMemo(() => new Float32Array(Array.from({
    length: limit
  }, () => [1, 1, 1]).flat()), [limit]);
  const cloudTexture = useTexture(texture);
  let t = 0;
  let index = 0;
  let config;
  const qat = new Quaternion();
  const dir = new Vector3(0, 0, 1);
  const pos = new Vector3();
  useFrame((state, delta) => {
    t = state.clock.elapsedTime;
    parentMatrix2.copy(instance.current.matrixWorld).invert();
    state.camera.matrixWorld.decompose(cpos, cquat, scale2);
    for (index = 0; index < clouds.current.length; index++) {
      config = clouds.current[index];
      config.ref.current.matrixWorld.decompose(translation2, rotation2, scale2);
      translation2.add(pos.copy(config.position).applyQuaternion(rotation2).multiply(scale2));
      rotation2.copy(cquat).multiply(qat.setFromAxisAngle(dir, config.rotation += delta * config.rotationFactor));
      scale2.multiplyScalar(config.volume + (1 + Math.sin(t * config.density * config.speed)) / 2 * config.growth);
      config.matrix.compose(translation2, rotation2, scale2).premultiply(parentMatrix2);
      config.dist = translation2.distanceTo(cpos);
    }
    clouds.current.sort((a, b) => b.dist - a.dist);
    for (index = 0; index < clouds.current.length; index++) {
      config = clouds.current[index];
      opacities[index] = config.opacity * (config.dist < config.fade - 1 ? config.dist / config.fade : 1);
      instance.current.setMatrixAt(index, config.matrix);
      instance.current.setColorAt(index, config.color);
    }
    instance.current.geometry.attributes.cloudOpacity.needsUpdate = true;
    instance.current.instanceMatrix.needsUpdate = true;
    if (instance.current.instanceColor) instance.current.instanceColor.needsUpdate = true;
  });
  React109.useLayoutEffect(() => {
    const count = Math.min(limit, range !== void 0 ? range : limit, clouds.current.length);
    instance.current.count = count;
    setUpdateRange(instance.current.instanceMatrix, {
      start: 0,
      count: count * 16
    });
    if (instance.current.instanceColor) {
      setUpdateRange(instance.current.instanceColor, {
        start: 0,
        count: count * 3
      });
    }
    setUpdateRange(instance.current.geometry.attributes.cloudOpacity, {
      start: 0,
      count
    });
  });
  let imageBounds = [(_image$width = cloudTexture.image.width) !== null && _image$width !== void 0 ? _image$width : 1, (_image$height = cloudTexture.image.height) !== null && _image$height !== void 0 ? _image$height : 1];
  const max = Math.max(imageBounds[0], imageBounds[1]);
  imageBounds = [imageBounds[0] / max, imageBounds[1] / max];
  return React109.createElement("group", _extends({
    ref: fref
  }, props), React109.createElement(context7.Provider, {
    value: clouds
  }, children, React109.createElement("instancedMesh", {
    matrixAutoUpdate: false,
    ref: instance,
    args: [null, null, limit],
    frustumCulled
  }, React109.createElement("instancedBufferAttribute", {
    usage: DynamicDrawUsage,
    attach: "instanceColor",
    args: [colors2, 3]
  }), React109.createElement("planeGeometry", {
    args: [...imageBounds]
  }, React109.createElement("instancedBufferAttribute", {
    usage: DynamicDrawUsage,
    attach: "attributes-cloudOpacity",
    args: [opacities, 1]
  })), React109.createElement("cloudMaterial", {
    key: material.name,
    map: cloudTexture,
    transparent: true,
    depthWrite: false
  }))));
});
var CloudInstance = React109.forwardRef(({
  opacity = 1,
  speed = 0,
  bounds = [5, 1, 1],
  segments = 20,
  color = "#ffffff",
  fade = 10,
  volume = 6,
  smallestVolume = 0.25,
  distribute = null,
  growth = 4,
  concentrate = "inside",
  seed = Math.random(),
  ...props
}, fref) => {
  function random() {
    const x = Math.sin(seed++) * 1e4;
    return x - Math.floor(x);
  }
  const parent = React109.useContext(context7);
  const ref = React109.useRef(null);
  const uuid = React109.useId();
  const clouds = React109.useMemo(() => {
    return [...new Array(segments)].map((_, index) => ({
      segments,
      bounds: new Vector3(1, 1, 1),
      position: new Vector3(),
      uuid,
      index,
      ref,
      dist: 0,
      matrix: new Matrix4(),
      color: new Color(),
      rotation: index * (Math.PI / segments)
    }));
  }, [segments, uuid]);
  React109.useLayoutEffect(() => {
    clouds.forEach((cloud, index) => {
      applyProps(cloud, {
        volume,
        color,
        speed,
        growth,
        opacity,
        fade,
        bounds,
        density: Math.max(0.5, random()),
        rotationFactor: Math.max(0.2, 0.5 * random()) * speed
      });
      const distributed = distribute == null ? void 0 : distribute(cloud, index);
      if (distributed || segments > 1) {
        var _distributed$point;
        cloud.position.copy(cloud.bounds).multiply((_distributed$point = distributed == null ? void 0 : distributed.point) !== null && _distributed$point !== void 0 ? _distributed$point : {
          x: random() * 2 - 1,
          y: random() * 2 - 1,
          z: random() * 2 - 1
        });
      }
      const xDiff = Math.abs(cloud.position.x);
      const yDiff = Math.abs(cloud.position.y);
      const zDiff = Math.abs(cloud.position.z);
      const max = Math.max(xDiff, yDiff, zDiff);
      cloud.length = 1;
      if (xDiff === max) cloud.length -= xDiff / cloud.bounds.x;
      if (yDiff === max) cloud.length -= yDiff / cloud.bounds.y;
      if (zDiff === max) cloud.length -= zDiff / cloud.bounds.z;
      cloud.volume = ((distributed == null ? void 0 : distributed.volume) !== void 0 ? distributed.volume : Math.max(Math.max(0, smallestVolume), concentrate === "random" ? random() : concentrate === "inside" ? cloud.length : 1 - cloud.length)) * volume;
    });
  }, [concentrate, bounds, fade, color, opacity, growth, volume, seed, segments, speed]);
  React109.useLayoutEffect(() => {
    const temp5 = clouds;
    parent.current = [...parent.current, ...temp5];
    return () => {
      parent.current = parent.current.filter((item) => item.uuid !== uuid);
    };
  }, [clouds]);
  React109.useImperativeHandle(fref, () => ref.current, []);
  return React109.createElement("group", _extends({
    ref
  }, props));
});
var Cloud = React109.forwardRef((props, fref) => {
  const parent = React109.useContext(context7);
  if (parent) return React109.createElement(CloudInstance, _extends({
    ref: fref
  }, props));
  return React109.createElement(Clouds, null, React109.createElement(CloudInstance, _extends({
    ref: fref
  }, props)));
});

// node_modules/@react-three/drei/core/Sparkles.js
var React110 = __toESM(require_react());
var SparklesImplMaterial = class extends ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        time: {
          value: 0
        },
        pixelRatio: {
          value: 1
        }
      },
      vertexShader: (
        /* glsl */
        `
        uniform float pixelRatio;
        uniform float time;
        attribute float size;  
        attribute float speed;  
        attribute float opacity;
        attribute vec3 noise;
        attribute vec3 color;
        varying vec3 vColor;
        varying float vOpacity;

        void main() {
          vec4 modelPosition = modelMatrix * vec4(position, 1.0);
          modelPosition.y += sin(time * speed + modelPosition.x * noise.x * 100.0) * 0.2;
          modelPosition.z += cos(time * speed + modelPosition.x * noise.y * 100.0) * 0.2;
          modelPosition.x += cos(time * speed + modelPosition.x * noise.z * 100.0) * 0.2;
          vec4 viewPosition = viewMatrix * modelPosition;
          vec4 projectionPostion = projectionMatrix * viewPosition;
          gl_Position = projectionPostion;
          gl_PointSize = size * 25. * pixelRatio;
          gl_PointSize *= (1.0 / - viewPosition.z);
          vColor = color;
          vOpacity = opacity;
        }
      `
      ),
      fragmentShader: (
        /* glsl */
        `
        varying vec3 vColor;
        varying float vOpacity;
        void main() {
          float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
          float strength = 0.05 / distanceToCenter - 0.1;
          gl_FragColor = vec4(vColor, strength * vOpacity);
          #include <tonemapping_fragment>
          #include <${version >= 154 ? "colorspace_fragment" : "encodings_fragment"}>
        }
      `
      )
    });
  }
  get time() {
    return this.uniforms.time.value;
  }
  set time(value) {
    this.uniforms.time.value = value;
  }
  get pixelRatio() {
    return this.uniforms.pixelRatio.value;
  }
  set pixelRatio(value) {
    this.uniforms.pixelRatio.value = value;
  }
};
var isFloat32Array = (def) => def && def.constructor === Float32Array;
var expandColor = (v5) => [v5.r, v5.g, v5.b];
var isVector = (v5) => v5 instanceof Vector2 || v5 instanceof Vector3 || v5 instanceof Vector4;
var normalizeVector = (v5) => {
  if (Array.isArray(v5)) return v5;
  else if (isVector(v5)) return v5.toArray();
  return [v5, v5, v5];
};
function usePropAsIsOrAsAttribute(count, prop, setDefault) {
  return React110.useMemo(() => {
    if (prop !== void 0) {
      if (isFloat32Array(prop)) {
        return prop;
      } else {
        if (prop instanceof Color) {
          const a = Array.from({
            length: count * 3
          }, () => expandColor(prop)).flat();
          return Float32Array.from(a);
        } else if (isVector(prop) || Array.isArray(prop)) {
          const a = Array.from({
            length: count * 3
          }, () => normalizeVector(prop)).flat();
          return Float32Array.from(a);
        }
        return Float32Array.from({
          length: count
        }, () => prop);
      }
    }
    return Float32Array.from({
      length: count
    }, setDefault);
  }, [prop]);
}
var Sparkles = React110.forwardRef(({
  noise = 1,
  count = 100,
  speed = 1,
  opacity = 1,
  scale: scale3 = 1,
  size,
  color,
  children,
  ...props
}, forwardRef82) => {
  React110.useMemo(() => extend({
    SparklesImplMaterial
  }), []);
  const ref = React110.useRef(null);
  const dpr = useThree((state) => state.viewport.dpr);
  const _scale = normalizeVector(scale3);
  const positions = React110.useMemo(() => Float32Array.from(Array.from({
    length: count
  }, () => _scale.map(MathUtils.randFloatSpread)).flat()), [count, ..._scale]);
  const sizes = usePropAsIsOrAsAttribute(count, size, Math.random);
  const opacities = usePropAsIsOrAsAttribute(count, opacity);
  const speeds = usePropAsIsOrAsAttribute(count, speed);
  const noises = usePropAsIsOrAsAttribute(count * 3, noise);
  const colors2 = usePropAsIsOrAsAttribute(color === void 0 ? count * 3 : count, !isFloat32Array(color) ? new Color(color) : color, () => 1);
  useFrame((state) => {
    if (ref.current && ref.current.material) ref.current.material.time = state.clock.elapsedTime;
  });
  React110.useImperativeHandle(forwardRef82, () => ref.current, []);
  return React110.createElement("points", _extends({
    key: `particle-${count}-${JSON.stringify(scale3)}`
  }, props, {
    ref
  }), React110.createElement("bufferGeometry", null, React110.createElement("bufferAttribute", {
    attach: "attributes-position",
    args: [positions, 3]
  }), React110.createElement("bufferAttribute", {
    attach: "attributes-size",
    args: [sizes, 1]
  }), React110.createElement("bufferAttribute", {
    attach: "attributes-opacity",
    args: [opacities, 1]
  }), React110.createElement("bufferAttribute", {
    attach: "attributes-speed",
    args: [speeds, 1]
  }), React110.createElement("bufferAttribute", {
    attach: "attributes-color",
    args: [colors2, 3]
  }), React110.createElement("bufferAttribute", {
    attach: "attributes-noise",
    args: [noises, 3]
  })), children ? children : React110.createElement("sparklesImplMaterial", {
    transparent: true,
    pixelRatio: dpr,
    depthWrite: false
  }));
});

// node_modules/@react-three/drei/core/MatcapTexture.js
var React111 = __toESM(require_react());
function getFormatString(format) {
  switch (format) {
    case 64:
      return "-64px";
    case 128:
      return "-128px";
    case 256:
      return "-256px";
    case 512:
      return "-512px";
    default:
      return "";
  }
}
var LIST_URL = "https://cdn.jsdelivr.net/gh/pmndrs/drei-assets@master/matcaps.json";
var MATCAP_ROOT = "https://rawcdn.githack.com/emmelleppi/matcaps/9b36ccaaf0a24881a39062d05566c9e92be4aa0d";
function useMatcapTexture(id = 0, format = 1024, onLoad) {
  const matcapList = suspend(() => fetch(LIST_URL).then((res) => res.json()), ["matcapList"]);
  const DEFAULT_MATCAP = matcapList[0];
  const numTot = React111.useMemo(() => Object.keys(matcapList).length, []);
  const fileHash = React111.useMemo(() => {
    if (typeof id === "string") {
      return id;
    } else if (typeof id === "number") {
      return matcapList[id];
    }
    return null;
  }, [id]);
  const fileName = `${fileHash || DEFAULT_MATCAP}${getFormatString(format)}.png`;
  const url = `${MATCAP_ROOT}/${format}/${fileName}`;
  const matcapTexture = useTexture(url, onLoad);
  return [matcapTexture, url, numTot];
}
var MatcapTexture = ({
  children,
  id,
  format,
  onLoad
}) => {
  const texture = useMatcapTexture(id, format, onLoad);
  return React111.createElement(React111.Fragment, null, children == null ? void 0 : children(texture));
};

// node_modules/@react-three/drei/core/NormalTexture.js
var React112 = __toESM(require_react());
var NORMAL_ROOT = "https://rawcdn.githack.com/pmndrs/drei-assets/7a3104997e1576f83472829815b00880d88b32fb";
var LIST_URL2 = "https://cdn.jsdelivr.net/gh/pmndrs/drei-assets@master/normals/normals.json";
function useNormalTexture(id = 0, settings = {}, onLoad) {
  const {
    repeat = [1, 1],
    anisotropy = 1,
    offset = [0, 0]
  } = settings;
  const normalsList = suspend(() => fetch(LIST_URL2).then((res) => res.json()), ["normalsList"]);
  const numTot = React112.useMemo(() => Object.keys(normalsList).length, []);
  const DEFAULT_NORMAL = normalsList[0];
  const imageName = normalsList[id] || DEFAULT_NORMAL;
  const url = `${NORMAL_ROOT}/normals/${imageName}`;
  const normalTexture = useTexture(url, onLoad);
  React112.useLayoutEffect(() => {
    if (!normalTexture) return;
    normalTexture.wrapS = normalTexture.wrapT = RepeatWrapping;
    normalTexture.repeat = new Vector2(repeat[0], repeat[1]);
    normalTexture.offset = new Vector2(offset[0], offset[1]);
    normalTexture.anisotropy = anisotropy;
  }, [normalTexture, anisotropy, repeat, offset]);
  return [normalTexture, url, numTot];
}
var NormalTexture = ({
  children,
  id,
  onLoad,
  ...settings
}) => {
  const ret = useNormalTexture(id, settings, onLoad);
  return React112.createElement(React112.Fragment, null, children == null ? void 0 : children(ret));
};

// node_modules/@react-three/drei/core/Wireframe.js
var React114 = __toESM(require_react());

// node_modules/@react-three/drei/materials/WireframeMaterial.js
var React113 = __toESM(require_react());
var WireframeMaterialShaders = {
  uniforms: {
    strokeOpacity: 1,
    fillOpacity: 0.25,
    fillMix: 0,
    thickness: 0.05,
    colorBackfaces: false,
    dashInvert: true,
    dash: false,
    dashRepeats: 4,
    dashLength: 0.5,
    squeeze: false,
    squeezeMin: 0.2,
    squeezeMax: 1,
    stroke: new Color("#ff0000"),
    backfaceStroke: new Color("#0000ff"),
    fill: new Color("#00ff00")
  },
  vertex: (
    /* glsl */
    `
	  attribute vec3 barycentric;
	
		varying vec3 v_edges_Barycentric;
		varying vec3 v_edges_Position;

		void initWireframe() {
			v_edges_Barycentric = barycentric;
			v_edges_Position = position.xyz;
		}
	  `
  ),
  fragment: (
    /* glsl */
    `
		#ifndef PI
	  	#define PI 3.1415926535897932384626433832795
		#endif
  
	  varying vec3 v_edges_Barycentric;
	  varying vec3 v_edges_Position;
  
	  uniform float strokeOpacity;
	  uniform float fillOpacity;
	  uniform float fillMix;
	  uniform float thickness;
	  uniform bool colorBackfaces;
  
	  // Dash
	  uniform bool dashInvert;
	  uniform bool dash;
	  uniform bool dashOnly;
	  uniform float dashRepeats;
	  uniform float dashLength;
  
	  // Squeeze
	  uniform bool squeeze;
	  uniform float squeezeMin;
	  uniform float squeezeMax;
  
	  // Colors
	  uniform vec3 stroke;
	  uniform vec3 backfaceStroke;
	  uniform vec3 fill;
  
	  // This is like
	  float wireframe_aastep(float threshold, float dist) {
		  float afwidth = fwidth(dist) * 0.5;
		  return smoothstep(threshold - afwidth, threshold + afwidth, dist);
	  }
  
	  float wireframe_map(float value, float min1, float max1, float min2, float max2) {
		  return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
	  }
  
	  float getWireframe() {
			vec3 barycentric = v_edges_Barycentric;
		
			// Distance from center of each triangle to its edges.
			float d = min(min(barycentric.x, barycentric.y), barycentric.z);

			// for dashed rendering, we can use this to get the 0 .. 1 value of the line length
			float positionAlong = max(barycentric.x, barycentric.y);
			if (barycentric.y < barycentric.x && barycentric.y < barycentric.z) {
				positionAlong = 1.0 - positionAlong;
			}

			// the thickness of the stroke
			float computedThickness = wireframe_map(thickness, 0.0, 1.0, 0.0, 0.34);

			// if we want to shrink the thickness toward the center of the line segment
			if (squeeze) {
				computedThickness *= mix(squeezeMin, squeezeMax, (1.0 - sin(positionAlong * PI)));
			}

			// Create dash pattern
			if (dash) {
				// here we offset the stroke position depending on whether it
				// should overlap or not
				float offset = 1.0 / dashRepeats * dashLength / 2.0;
				if (!dashInvert) {
					offset += 1.0 / dashRepeats / 2.0;
				}

				// if we should animate the dash or not
				// if (dashAnimate) {
				// 	offset += time * 0.22;
				// }

				// create the repeating dash pattern
				float pattern = fract((positionAlong + offset) * dashRepeats);
				computedThickness *= 1.0 - wireframe_aastep(dashLength, pattern);
			}

			// compute the anti-aliased stroke edge  
			float edge = 1.0 - wireframe_aastep(computedThickness, d);

			return edge;
	  }
	  `
  )
};
var WireframeMaterial = shaderMaterial(WireframeMaterialShaders.uniforms, WireframeMaterialShaders.vertex + /* glsl */
`
  	void main() {
		initWireframe();
		gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
	}
  `, WireframeMaterialShaders.fragment + /* glsl */
`
  void main () {
		// Compute color

		float edge = getWireframe();
		vec4 colorStroke = vec4(stroke, edge);

		#ifdef FLIP_SIDED
			colorStroke.rgb = backfaceStroke;
		#endif
    
		vec4 colorFill = vec4(fill, fillOpacity);
		vec4 outColor = mix(colorFill, colorStroke, edge * strokeOpacity);

		gl_FragColor = outColor;
	}
  `);
function setWireframeOverride(material, uniforms) {
  material.onBeforeCompile = (shader) => {
    shader.uniforms = {
      ...shader.uniforms,
      ...uniforms
    };
    shader.vertexShader = shader.vertexShader.replace("void main() {", `
		  ${WireframeMaterialShaders.vertex}
		  void main() {
			initWireframe();
		`);
    shader.fragmentShader = shader.fragmentShader.replace("void main() {", `
		  ${WireframeMaterialShaders.fragment}
		  void main() {
		`);
    shader.fragmentShader = shader.fragmentShader.replace(
      "#include <color_fragment>",
      /* glsl */
      `
		  #include <color_fragment>
			  float edge = getWireframe();
		  vec4 colorStroke = vec4(stroke, edge);
		  #ifdef FLIP_SIDED
			colorStroke.rgb = backfaceStroke;
		  #endif
		  vec4 colorFill = vec4(mix(diffuseColor.rgb, fill, fillMix), mix(diffuseColor.a, fillOpacity, fillMix));
		  vec4 outColor = mix(colorFill, colorStroke, edge * strokeOpacity);

		  diffuseColor.rgb = outColor.rgb;
		  diffuseColor.a *= outColor.a;
		`
    );
  };
  material.side = DoubleSide;
  material.transparent = true;
}
function useWireframeUniforms(uniforms, props) {
  React113.useEffect(() => {
    var _props$fillOpacity;
    return void (uniforms.fillOpacity.value = (_props$fillOpacity = props.fillOpacity) !== null && _props$fillOpacity !== void 0 ? _props$fillOpacity : uniforms.fillOpacity.value);
  }, [props.fillOpacity]);
  React113.useEffect(() => {
    var _props$fillMix;
    return void (uniforms.fillMix.value = (_props$fillMix = props.fillMix) !== null && _props$fillMix !== void 0 ? _props$fillMix : uniforms.fillMix.value);
  }, [props.fillMix]);
  React113.useEffect(() => {
    var _props$strokeOpacity;
    return void (uniforms.strokeOpacity.value = (_props$strokeOpacity = props.strokeOpacity) !== null && _props$strokeOpacity !== void 0 ? _props$strokeOpacity : uniforms.strokeOpacity.value);
  }, [props.strokeOpacity]);
  React113.useEffect(() => {
    var _props$thickness;
    return void (uniforms.thickness.value = (_props$thickness = props.thickness) !== null && _props$thickness !== void 0 ? _props$thickness : uniforms.thickness.value);
  }, [props.thickness]);
  React113.useEffect(() => void (uniforms.colorBackfaces.value = !!props.colorBackfaces), [props.colorBackfaces]);
  React113.useEffect(() => void (uniforms.dash.value = !!props.dash), [props.dash]);
  React113.useEffect(() => void (uniforms.dashInvert.value = !!props.dashInvert), [props.dashInvert]);
  React113.useEffect(() => {
    var _props$dashRepeats;
    return void (uniforms.dashRepeats.value = (_props$dashRepeats = props.dashRepeats) !== null && _props$dashRepeats !== void 0 ? _props$dashRepeats : uniforms.dashRepeats.value);
  }, [props.dashRepeats]);
  React113.useEffect(() => {
    var _props$dashLength;
    return void (uniforms.dashLength.value = (_props$dashLength = props.dashLength) !== null && _props$dashLength !== void 0 ? _props$dashLength : uniforms.dashLength.value);
  }, [props.dashLength]);
  React113.useEffect(() => void (uniforms.squeeze.value = !!props.squeeze), [props.squeeze]);
  React113.useEffect(() => {
    var _props$squeezeMin;
    return void (uniforms.squeezeMin.value = (_props$squeezeMin = props.squeezeMin) !== null && _props$squeezeMin !== void 0 ? _props$squeezeMin : uniforms.squeezeMin.value);
  }, [props.squeezeMin]);
  React113.useEffect(() => {
    var _props$squeezeMax;
    return void (uniforms.squeezeMax.value = (_props$squeezeMax = props.squeezeMax) !== null && _props$squeezeMax !== void 0 ? _props$squeezeMax : uniforms.squeezeMax.value);
  }, [props.squeezeMax]);
  React113.useEffect(() => void (uniforms.stroke.value = props.stroke ? new Color(props.stroke) : uniforms.stroke.value), [props.stroke]);
  React113.useEffect(() => void (uniforms.fill.value = props.fill ? new Color(props.fill) : uniforms.fill.value), [props.fill]);
  React113.useEffect(() => void (uniforms.backfaceStroke.value = props.backfaceStroke ? new Color(props.backfaceStroke) : uniforms.backfaceStroke.value), [props.backfaceStroke]);
}

// node_modules/@react-three/drei/core/Wireframe.js
function isWithGeometry(object) {
  return !!(object != null && object.geometry);
}
function isGeometry2(object) {
  return !!(object != null && object.isBufferGeometry);
}
function isRefObject2(object) {
  return !!(object != null && object.current);
}
function isRef2(object) {
  return (object == null ? void 0 : object.current) !== void 0;
}
function isWireframeGeometry(geometry2) {
  return geometry2.type === "WireframeGeometry";
}
function getUniforms() {
  const u = {};
  for (const key in WireframeMaterialShaders.uniforms) {
    u[key] = {
      value: WireframeMaterialShaders.uniforms[key]
    };
  }
  return u;
}
function getBarycentricCoordinates(geometry2, removeEdge) {
  const position2 = geometry2.getAttribute("position");
  const count = position2.count;
  const barycentric = [];
  for (let i2 = 0; i2 < count; i2++) {
    const even = i2 % 2 === 0;
    const Q = removeEdge ? 1 : 0;
    if (even) {
      barycentric.push(0, 0, 1, 0, 1, 0, 1, 0, Q);
    } else {
      barycentric.push(0, 1, 0, 0, 0, 1, 1, 0, Q);
    }
  }
  return new BufferAttribute(Float32Array.from(barycentric), 3);
}
function getInputGeometry(inputGeometry) {
  const geo = isRefObject2(inputGeometry) ? inputGeometry.current : inputGeometry;
  if (!isGeometry2(geo)) {
    if (isWireframeGeometry(geo)) {
      throw new Error("Wireframe: WireframeGeometry is not supported.");
    }
    const parent = geo.parent;
    if (isWithGeometry(parent)) {
      if (isWireframeGeometry(parent.geometry)) {
        throw new Error("Wireframe: WireframeGeometry is not supported.");
      }
      return parent.geometry;
    }
  } else {
    return geo;
  }
}
function setBarycentricCoordinates(geometry2, simplify) {
  if (geometry2.index) {
    console.warn("Wireframe: Requires non-indexed geometry, converting to non-indexed geometry.");
    const nonIndexedGeo = geometry2.toNonIndexed();
    geometry2.copy(nonIndexedGeo);
    geometry2.setIndex(null);
  }
  const newBarycentric = getBarycentricCoordinates(geometry2, simplify);
  geometry2.setAttribute("barycentric", newBarycentric);
}
function WireframeWithCustomGeo({
  geometry: customGeometry,
  simplify = false,
  ...props
}) {
  extend({
    MeshWireframeMaterial: WireframeMaterial
  });
  const [geometry2, setGeometry] = React114.useState(null);
  React114.useLayoutEffect(() => {
    const geom = getInputGeometry(customGeometry);
    if (!geom) {
      throw new Error("Wireframe: geometry prop must be a BufferGeometry or a ref to a BufferGeometry.");
    }
    setBarycentricCoordinates(geom, simplify);
    if (isRef2(customGeometry)) {
      setGeometry(geom);
    }
  }, [simplify, customGeometry]);
  const drawnGeo = isRef2(customGeometry) ? geometry2 : customGeometry;
  return React114.createElement(React114.Fragment, null, drawnGeo && React114.createElement("mesh", {
    geometry: drawnGeo
  }, React114.createElement("meshWireframeMaterial", _extends({
    attach: "material",
    transparent: true,
    side: DoubleSide,
    polygonOffset: true,
    polygonOffsetFactor: -4
  }, props, {
    extensions: {
      derivatives: true,
      fragDepth: false,
      drawBuffers: false,
      shaderTextureLOD: false
    }
  }))));
}
function WireframeWithoutCustomGeo({
  simplify = false,
  ...props
}) {
  const objectRef = React114.useRef(null);
  const uniforms = React114.useMemo(() => getUniforms(), [WireframeMaterialShaders.uniforms]);
  useWireframeUniforms(uniforms, props);
  React114.useLayoutEffect(() => {
    const geom = getInputGeometry(objectRef);
    if (!geom) {
      throw new Error("Wireframe: Must be a child of a Mesh, Line or Points object or specify a geometry prop.");
    }
    const og = geom.clone();
    setBarycentricCoordinates(geom, simplify);
    return () => {
      geom.copy(og);
      og.dispose();
    };
  }, [simplify]);
  React114.useLayoutEffect(() => {
    const parentMesh = objectRef.current.parent;
    const og = parentMesh.material.clone();
    setWireframeOverride(parentMesh.material, uniforms);
    return () => {
      parentMesh.material.dispose();
      parentMesh.material = og;
    };
  }, []);
  return React114.createElement("object3D", {
    ref: objectRef
  });
}
function Wireframe({
  geometry: customGeometry,
  ...props
}) {
  if (customGeometry) {
    return React114.createElement(WireframeWithCustomGeo, _extends({
      geometry: customGeometry
    }, props));
  }
  return React114.createElement(WireframeWithoutCustomGeo, props);
}

// node_modules/@react-three/drei/core/ShadowAlpha.js
var React115 = __toESM(require_react());
function ShadowAlpha({
  opacity,
  alphaMap
}) {
  const depthMaterialRef = React115.useRef(null);
  const distanceMaterialRef = React115.useRef(null);
  const uShadowOpacity = React115.useRef({
    value: 1
  });
  const uAlphaMap = React115.useRef({
    value: null
  });
  const uHasAlphaMap = React115.useRef({
    value: false
  });
  React115.useLayoutEffect(() => {
    depthMaterialRef.current.onBeforeCompile = distanceMaterialRef.current.onBeforeCompile = (shader) => {
      const mainLineStart = shader.fragmentShader.indexOf("void main");
      let mainLine = "";
      let ch;
      let i2 = mainLineStart;
      while (ch !== "\n" && i2 < mainLineStart + 100) {
        ch = shader.fragmentShader.charAt(i2);
        mainLine += ch;
        i2++;
      }
      mainLine = mainLine.trim();
      shader.vertexShader = shader.vertexShader.replace("void main() {", `
        varying vec2 custom_vUv;

        void main() {
          custom_vUv = uv;
          
        `);
      shader.fragmentShader = shader.fragmentShader.replace(mainLine, `
          uniform float uShadowOpacity;
          uniform sampler2D uAlphaMap;
          uniform bool uHasAlphaMap;

          varying vec2 custom_vUv;
  
          float bayerDither2x2( vec2 v ) {
            return mod( 3.0 * v.y + 2.0 * v.x, 4.0 );
          }
    
          float bayerDither4x4( vec2 v ) {
            vec2 P1 = mod( v, 2.0 );
            vec2 P2 = mod( floor( 0.5  * v ), 2.0 );
            return 4.0 * bayerDither2x2( P1 ) + bayerDither2x2( P2 );
          }
  
          void main() {
            float alpha = 
              uHasAlphaMap ? 
                uShadowOpacity * texture2D(uAlphaMap, custom_vUv).x
              : uShadowOpacity;

            if( ( bayerDither4x4( floor( mod( gl_FragCoord.xy, 4.0 ) ) ) ) / 16.0 >= alpha ) discard;
            
          `);
      shader.uniforms["uShadowOpacity"] = uShadowOpacity.current;
      shader.uniforms["uAlphaMap"] = uAlphaMap.current;
      shader.uniforms["uHasAlphaMap"] = uHasAlphaMap.current;
    };
  }, []);
  useFrame(() => {
    var _r3f;
    const parent = (_r3f = depthMaterialRef.current.__r3f) == null || (_r3f = _r3f.parent) == null ? void 0 : _r3f.object;
    if (parent) {
      const parentMainMaterial = parent.material;
      if (parentMainMaterial) {
        uShadowOpacity.current.value = opacity !== null && opacity !== void 0 ? opacity : parentMainMaterial.opacity;
        if (alphaMap === false) {
          uAlphaMap.current.value = null;
          uHasAlphaMap.current.value = false;
        } else {
          uAlphaMap.current.value = alphaMap || parentMainMaterial.alphaMap;
          uHasAlphaMap.current.value = !!uAlphaMap.current.value;
        }
      }
    }
  });
  return React115.createElement(React115.Fragment, null, React115.createElement("meshDepthMaterial", {
    ref: depthMaterialRef,
    attach: "customDepthMaterial",
    depthPacking: RGBADepthPacking
  }), React115.createElement("meshDistanceMaterial", {
    ref: distanceMaterialRef,
    attach: "customDistanceMaterial"
  }));
}

// node_modules/@react-three/drei/core/Points.js
var React116 = __toESM(require_react());
var _inverseMatrix = new Matrix4();
var _ray = new Ray();
var _sphere2 = new Sphere();
var _position = new Vector3();
var PositionPoint = class extends Group {
  constructor() {
    super();
    this.size = 0;
    this.color = new Color("white");
    this.instance = {
      current: void 0
    };
    this.instanceKey = {
      current: void 0
    };
  }
  // This will allow the virtual instance have bounds
  get geometry() {
    var _this$instance$curren;
    return (_this$instance$curren = this.instance.current) == null ? void 0 : _this$instance$curren.geometry;
  }
  raycast(raycaster, intersects) {
    var _raycaster$params$Poi, _raycaster$params$Poi2;
    const parent = this.instance.current;
    if (!parent || !parent.geometry) return;
    const instanceId = parent.userData.instances.indexOf(this.instanceKey);
    if (instanceId === -1 || instanceId > parent.geometry.drawRange.count) return;
    const threshold = (_raycaster$params$Poi = (_raycaster$params$Poi2 = raycaster.params.Points) == null ? void 0 : _raycaster$params$Poi2.threshold) !== null && _raycaster$params$Poi !== void 0 ? _raycaster$params$Poi : 1;
    _sphere2.set(this.getWorldPosition(_position), threshold);
    if (raycaster.ray.intersectsSphere(_sphere2) === false) return;
    _inverseMatrix.copy(parent.matrixWorld).invert();
    _ray.copy(raycaster.ray).applyMatrix4(_inverseMatrix);
    const localThreshold = threshold / ((this.scale.x + this.scale.y + this.scale.z) / 3);
    const localThresholdSq = localThreshold * localThreshold;
    const rayPointDistanceSq = _ray.distanceSqToPoint(this.position);
    if (rayPointDistanceSq < localThresholdSq) {
      const intersectPoint = new Vector3();
      _ray.closestPointToPoint(this.position, intersectPoint);
      intersectPoint.applyMatrix4(this.matrixWorld);
      const distance = raycaster.ray.origin.distanceTo(intersectPoint);
      if (distance < raycaster.near || distance > raycaster.far) return;
      intersects.push({
        distance,
        distanceToRay: Math.sqrt(rayPointDistanceSq),
        point: intersectPoint,
        index: instanceId,
        face: null,
        object: this
      });
    }
  }
};
var i;
var positionRef;
var context8 = React116.createContext(null);
var parentMatrix3 = new Matrix4();
var position = new Vector3();
var PointsInstances = React116.forwardRef(({
  children,
  range,
  limit = 1e3,
  ...props
}, ref) => {
  const parentRef = React116.useRef(null);
  React116.useImperativeHandle(ref, () => parentRef.current, []);
  const [refs, setRefs] = React116.useState([]);
  const [[positions, colors2, sizes]] = React116.useState(() => [new Float32Array(limit * 3), Float32Array.from({
    length: limit * 3
  }, () => 1), Float32Array.from({
    length: limit
  }, () => 1)]);
  React116.useEffect(() => {
    parentRef.current.geometry.attributes.position.needsUpdate = true;
  });
  useFrame(() => {
    parentRef.current.updateMatrix();
    parentRef.current.updateMatrixWorld();
    parentMatrix3.copy(parentRef.current.matrixWorld).invert();
    parentRef.current.geometry.drawRange.count = Math.min(limit, range !== void 0 ? range : limit, refs.length);
    for (i = 0; i < refs.length; i++) {
      positionRef = refs[i].current;
      positionRef.getWorldPosition(position).applyMatrix4(parentMatrix3);
      position.toArray(positions, i * 3);
      parentRef.current.geometry.attributes.position.needsUpdate = true;
      positionRef.matrixWorldNeedsUpdate = true;
      positionRef.color.toArray(colors2, i * 3);
      parentRef.current.geometry.attributes.color.needsUpdate = true;
      sizes.set([positionRef.size], i);
      parentRef.current.geometry.attributes.size.needsUpdate = true;
    }
  });
  const api = React116.useMemo(() => ({
    getParent: () => parentRef,
    subscribe: (ref2) => {
      setRefs((refs2) => [...refs2, ref2]);
      return () => setRefs((refs2) => refs2.filter((item) => item.current !== ref2.current));
    }
  }), []);
  return React116.createElement("points", _extends({
    userData: {
      instances: refs
    },
    matrixAutoUpdate: false,
    ref: parentRef,
    raycast: () => null
  }, props), React116.createElement("bufferGeometry", null, React116.createElement("bufferAttribute", {
    attach: "attributes-position",
    args: [positions, 3],
    usage: DynamicDrawUsage
  }), React116.createElement("bufferAttribute", {
    attach: "attributes-color",
    args: [colors2, 3],
    usage: DynamicDrawUsage
  }), React116.createElement("bufferAttribute", {
    attach: "attributes-size",
    args: [sizes, 1],
    usage: DynamicDrawUsage
  })), React116.createElement(context8.Provider, {
    value: api
  }, children));
});
var Point = React116.forwardRef(({
  children,
  ...props
}, ref) => {
  React116.useMemo(() => extend({
    PositionPoint
  }), []);
  const group = React116.useRef(null);
  React116.useImperativeHandle(ref, () => group.current, []);
  const {
    subscribe,
    getParent
  } = React116.useContext(context8);
  React116.useLayoutEffect(() => subscribe(group), []);
  return React116.createElement("positionPoint", _extends({
    instance: getParent(),
    instanceKey: group,
    ref: group
  }, props), children);
});
var PointsBuffer = React116.forwardRef(({
  children,
  positions,
  colors: colors2,
  sizes,
  stride = 3,
  ...props
}, forwardedRef) => {
  const pointsRef = React116.useRef(null);
  React116.useImperativeHandle(forwardedRef, () => pointsRef.current, []);
  useFrame(() => {
    const attr = pointsRef.current.geometry.attributes;
    attr.position.needsUpdate = true;
    if (colors2) attr.color.needsUpdate = true;
    if (sizes) attr.size.needsUpdate = true;
  });
  return React116.createElement("points", _extends({
    ref: pointsRef
  }, props), React116.createElement("bufferGeometry", null, React116.createElement("bufferAttribute", {
    attach: "attributes-position",
    args: [positions, stride],
    usage: DynamicDrawUsage
  }), colors2 && React116.createElement("bufferAttribute", {
    attach: "attributes-color",
    args: [colors2, stride],
    count: colors2.length / stride,
    usage: DynamicDrawUsage
  }), sizes && React116.createElement("bufferAttribute", {
    attach: "attributes-size",
    args: [sizes, 1],
    count: sizes.length / stride,
    usage: DynamicDrawUsage
  })), children);
});
var Points = React116.forwardRef((props, forwardedRef) => {
  if (props.positions instanceof Float32Array) {
    return React116.createElement(PointsBuffer, _extends({}, props, {
      ref: forwardedRef
    }));
  } else return React116.createElement(PointsInstances, _extends({}, props, {
    ref: forwardedRef
  }));
});

// node_modules/@react-three/drei/core/Segments.js
var React117 = __toESM(require_react());
var context9 = React117.createContext(null);
var Segments = React117.forwardRef((props, forwardedRef) => {
  React117.useMemo(() => extend({
    SegmentObject
  }), []);
  const {
    limit = 1e3,
    lineWidth = 1,
    children,
    ...rest
  } = props;
  const [segments, setSegments] = React117.useState([]);
  const [line] = React117.useState(() => new Line2());
  const [material] = React117.useState(() => new LineMaterial());
  const [geometry2] = React117.useState(() => new LineSegmentsGeometry());
  const [resolution] = React117.useState(() => new Vector2(512, 512));
  const [positions] = React117.useState(() => Array(limit * 6).fill(0));
  const [colors2] = React117.useState(() => Array(limit * 6).fill(0));
  const api = React117.useMemo(() => ({
    subscribe: (ref) => {
      setSegments((segments2) => [...segments2, ref]);
      return () => setSegments((segments2) => segments2.filter((item) => item.current !== ref.current));
    }
  }), []);
  useFrame(() => {
    for (let i2 = 0; i2 < limit; i2++) {
      var _segments$i;
      const segment = (_segments$i = segments[i2]) == null ? void 0 : _segments$i.current;
      if (segment) {
        positions[i2 * 6 + 0] = segment.start.x;
        positions[i2 * 6 + 1] = segment.start.y;
        positions[i2 * 6 + 2] = segment.start.z;
        positions[i2 * 6 + 3] = segment.end.x;
        positions[i2 * 6 + 4] = segment.end.y;
        positions[i2 * 6 + 5] = segment.end.z;
        colors2[i2 * 6 + 0] = segment.color.r;
        colors2[i2 * 6 + 1] = segment.color.g;
        colors2[i2 * 6 + 2] = segment.color.b;
        colors2[i2 * 6 + 3] = segment.color.r;
        colors2[i2 * 6 + 4] = segment.color.g;
        colors2[i2 * 6 + 5] = segment.color.b;
      }
    }
    geometry2.setColors(colors2);
    geometry2.setPositions(positions);
    line.computeLineDistances();
  });
  return React117.createElement("primitive", {
    object: line,
    ref: forwardedRef
  }, React117.createElement("primitive", {
    object: geometry2,
    attach: "geometry"
  }), React117.createElement("primitive", _extends({
    object: material,
    attach: "material",
    vertexColors: true,
    resolution,
    linewidth: lineWidth
  }, rest)), React117.createElement(context9.Provider, {
    value: api
  }, children));
});
var SegmentObject = class {
  constructor() {
    this.color = new Color("white");
    this.start = new Vector3(0, 0, 0);
    this.end = new Vector3(0, 0, 0);
  }
};
var normPos = (pos) => pos instanceof Vector3 ? pos : new Vector3(...typeof pos === "number" ? [pos, pos, pos] : pos);
var Segment = React117.forwardRef(({
  color,
  start,
  end
}, forwardedRef) => {
  const api = React117.useContext(context9);
  if (!api) throw "Segment must used inside Segments component.";
  const ref = React117.useRef(null);
  React117.useImperativeHandle(forwardedRef, () => ref.current, []);
  React117.useLayoutEffect(() => api.subscribe(ref), []);
  return React117.createElement("segmentObject", {
    ref,
    color,
    start: normPos(start),
    end: normPos(end)
  });
});

// node_modules/@react-three/drei/core/Detailed.js
var React118 = __toESM(require_react());
var Detailed = React118.forwardRef(({
  children,
  hysteresis = 0,
  distances,
  ...props
}, ref) => {
  const lodRef = React118.useRef(null);
  React118.useImperativeHandle(ref, () => lodRef.current, []);
  React118.useLayoutEffect(() => {
    const {
      current: lod
    } = lodRef;
    lod.levels.length = 0;
    lod.children.forEach((object, index) => lod.levels.push({
      object,
      hysteresis,
      distance: distances[index]
    }));
  });
  useFrame((state) => {
    var _lodRef$current;
    return (_lodRef$current = lodRef.current) == null ? void 0 : _lodRef$current.update(state.camera);
  });
  return React118.createElement("lOD", _extends({
    ref: lodRef
  }, props), children);
});

// node_modules/@react-three/drei/core/Preload.js
var React119 = __toESM(require_react());
function Preload({
  all,
  scene,
  camera
}) {
  const gl = useThree(({
    gl: gl2
  }) => gl2);
  const dCamera = useThree(({
    camera: camera2
  }) => camera2);
  const dScene = useThree(({
    scene: scene2
  }) => scene2);
  React119.useLayoutEffect(() => {
    const invisible = [];
    if (all) {
      (scene || dScene).traverse((object) => {
        if (object.visible === false) {
          invisible.push(object);
          object.visible = true;
        }
      });
    }
    gl.compile(scene || dScene, camera || dCamera);
    const cubeRenderTarget = new WebGLCubeRenderTarget(128);
    const cubeCamera = new CubeCamera(0.01, 1e5, cubeRenderTarget);
    cubeCamera.update(gl, scene || dScene);
    cubeRenderTarget.dispose();
    invisible.forEach((object) => object.visible = false);
  }, []);
  return null;
}

// node_modules/@react-three/drei/core/BakeShadows.js
var import_react18 = __toESM(require_react());
function BakeShadows() {
  const gl = useThree((state) => state.gl);
  (0, import_react18.useEffect)(() => {
    gl.shadowMap.autoUpdate = false;
    gl.shadowMap.needsUpdate = true;
    return () => {
      gl.shadowMap.autoUpdate = gl.shadowMap.needsUpdate = true;
    };
  }, [gl.shadowMap]);
  return null;
}

// node_modules/@react-three/drei/core/meshBounds.js
var _inverseMatrix2 = new Matrix4();
var _ray2 = new Ray();
var _sphere3 = new Sphere();
var _vA2 = new Vector3();
function meshBounds(raycaster, intersects) {
  const geometry2 = this.geometry;
  const material = this.material;
  const matrixWorld = this.matrixWorld;
  if (material === void 0) return;
  if (geometry2.boundingSphere === null) geometry2.computeBoundingSphere();
  _sphere3.copy(geometry2.boundingSphere);
  _sphere3.applyMatrix4(matrixWorld);
  if (raycaster.ray.intersectsSphere(_sphere3) === false) return;
  _inverseMatrix2.copy(matrixWorld).invert();
  _ray2.copy(raycaster.ray).applyMatrix4(_inverseMatrix2);
  if (geometry2.boundingBox !== null && _ray2.intersectBox(geometry2.boundingBox, _vA2) === null) return;
  intersects.push({
    distance: _vA2.distanceTo(raycaster.ray.origin),
    point: _vA2.clone(),
    object: this
  });
}

// node_modules/@react-three/drei/core/AdaptiveDpr.js
var React120 = __toESM(require_react());
function AdaptiveDpr({
  pixelated
}) {
  const gl = useThree((state) => state.gl);
  const active = useThree((state) => state.internal.active);
  const current = useThree((state) => state.performance.current);
  const initialDpr = useThree((state) => state.viewport.initialDpr);
  const setDpr = useThree((state) => state.setDpr);
  React120.useEffect(() => {
    const domElement = gl.domElement;
    return () => {
      if (active) setDpr(initialDpr);
      if (pixelated && domElement) domElement.style.imageRendering = "auto";
    };
  }, []);
  React120.useEffect(() => {
    setDpr(current * initialDpr);
    if (pixelated && gl.domElement) gl.domElement.style.imageRendering = current === 1 ? "auto" : "pixelated";
  }, [current]);
  return null;
}

// node_modules/@react-three/drei/core/AdaptiveEvents.js
var React121 = __toESM(require_react());
function AdaptiveEvents() {
  const get = useThree((state) => state.get);
  const setEvents = useThree((state) => state.setEvents);
  const current = useThree((state) => state.performance.current);
  React121.useEffect(() => {
    const enabled = get().events.enabled;
    return () => setEvents({
      enabled
    });
  }, []);
  React121.useEffect(() => setEvents({
    enabled: current === 1
  }), [current]);
  return null;
}

// node_modules/@react-three/drei/core/PerformanceMonitor.js
var React122 = __toESM(require_react());
var import_react19 = __toESM(require_react());
var context10 = (0, import_react19.createContext)(null);
function PerformanceMonitor({
  iterations = 10,
  ms = 250,
  threshold = 0.75,
  step = 0.1,
  factor: _factor = 0.5,
  flipflops = Infinity,
  bounds = (refreshrate) => refreshrate > 100 ? [60, 100] : [40, 60],
  onIncline,
  onDecline,
  onChange,
  onFallback,
  children
}) {
  const decimalPlacesRatio = Math.pow(10, 0);
  const [api, _] = (0, import_react19.useState)(() => ({
    fps: 0,
    index: 0,
    factor: _factor,
    flipped: 0,
    refreshrate: 0,
    fallback: false,
    frames: [],
    averages: [],
    subscriptions: /* @__PURE__ */ new Map(),
    subscribe: (ref) => {
      const key = Symbol();
      api.subscriptions.set(key, ref.current);
      return () => void api.subscriptions.delete(key);
    }
  }));
  let lastFactor = 0;
  useFrame(() => {
    const {
      frames,
      averages
    } = api;
    if (api.fallback) return;
    if (averages.length < iterations) {
      frames.push(performance.now());
      const msPassed = frames[frames.length - 1] - frames[0];
      if (msPassed >= ms) {
        api.fps = Math.round(frames.length / msPassed * 1e3 * decimalPlacesRatio) / decimalPlacesRatio;
        api.refreshrate = Math.max(api.refreshrate, api.fps);
        averages[api.index++ % iterations] = api.fps;
        if (averages.length === iterations) {
          const [lower, upper] = bounds(api.refreshrate);
          const upperBounds = averages.filter((value) => value >= upper);
          const lowerBounds = averages.filter((value) => value < lower);
          if (upperBounds.length > iterations * threshold) {
            api.factor = Math.min(1, api.factor + step);
            api.flipped++;
            if (onIncline) onIncline(api);
            api.subscriptions.forEach((value) => value.onIncline && value.onIncline(api));
          }
          if (lowerBounds.length > iterations * threshold) {
            api.factor = Math.max(0, api.factor - step);
            api.flipped++;
            if (onDecline) onDecline(api);
            api.subscriptions.forEach((value) => value.onDecline && value.onDecline(api));
          }
          if (lastFactor !== api.factor) {
            lastFactor = api.factor;
            if (onChange) onChange(api);
            api.subscriptions.forEach((value) => value.onChange && value.onChange(api));
          }
          if (api.flipped > flipflops && !api.fallback) {
            api.fallback = true;
            if (onFallback) onFallback(api);
            api.subscriptions.forEach((value) => value.onFallback && value.onFallback(api));
          }
          api.averages = [];
        }
        api.frames = [];
      }
    }
  });
  return React122.createElement(context10.Provider, {
    value: api
  }, children);
}
function usePerformanceMonitor({
  onIncline,
  onDecline,
  onChange,
  onFallback
}) {
  const api = (0, import_react19.useContext)(context10);
  const ref = (0, import_react19.useRef)({
    onIncline,
    onDecline,
    onChange,
    onFallback
  });
  (0, import_react19.useLayoutEffect)(() => {
    ref.current.onIncline = onIncline;
    ref.current.onDecline = onDecline;
    ref.current.onChange = onChange;
    ref.current.onFallback = onFallback;
  }, [onIncline, onDecline, onChange, onFallback]);
  (0, import_react19.useLayoutEffect)(() => api.subscribe(ref), [api]);
}

// node_modules/@react-three/drei/core/RenderTexture.js
var React123 = __toESM(require_react());
var RenderTexture = React123.forwardRef(({
  children,
  compute,
  width,
  height,
  samples = 8,
  renderPriority = 0,
  eventPriority = 0,
  frames = Infinity,
  stencilBuffer = false,
  depthBuffer = true,
  generateMipmaps = false,
  ...props
}, forwardRef82) => {
  const {
    size,
    viewport
  } = useThree();
  const fbo = useFBO((width || size.width) * viewport.dpr, (height || size.height) * viewport.dpr, {
    samples,
    stencilBuffer,
    depthBuffer,
    generateMipmaps
  });
  const [vScene] = React123.useState(() => new Scene());
  const uvCompute = React123.useCallback((event, state, previous) => {
    var _fbo$texture, _previous$previousRoo;
    let parent = (_fbo$texture = fbo.texture) == null || (_fbo$texture = _fbo$texture.__r3f.parent) == null ? void 0 : _fbo$texture.object;
    while (parent && !(parent instanceof Object3D)) {
      var _parent$__r3f$parent;
      parent = (_parent$__r3f$parent = parent.__r3f.parent) == null ? void 0 : _parent$__r3f$parent.object;
    }
    if (!parent) return false;
    if (!previous.raycaster.camera) previous.events.compute(event, previous, (_previous$previousRoo = previous.previousRoot) == null ? void 0 : _previous$previousRoo.getState());
    const [intersection3] = previous.raycaster.intersectObject(parent);
    if (!intersection3) return false;
    const uv = intersection3.uv;
    if (!uv) return false;
    state.raycaster.setFromCamera(state.pointer.set(uv.x * 2 - 1, uv.y * 2 - 1), state.camera);
  }, []);
  React123.useImperativeHandle(forwardRef82, () => fbo.texture, [fbo]);
  return React123.createElement(React123.Fragment, null, createPortal(React123.createElement(Container, {
    renderPriority,
    frames,
    fbo
  }, children, React123.createElement("group", {
    onPointerOver: () => null
  })), vScene, {
    events: {
      compute: compute || uvCompute,
      priority: eventPriority
    }
  }), React123.createElement("primitive", _extends({
    object: fbo.texture
  }, props)));
});
function Container({
  frames,
  renderPriority,
  children,
  fbo
}) {
  let count = 0;
  let oldAutoClear;
  let oldXrEnabled;
  let oldRenderTarget;
  let oldIsPresenting;
  useFrame((state) => {
    if (frames === Infinity || count < frames) {
      oldAutoClear = state.gl.autoClear;
      oldXrEnabled = state.gl.xr.enabled;
      oldRenderTarget = state.gl.getRenderTarget();
      oldIsPresenting = state.gl.xr.isPresenting;
      state.gl.autoClear = true;
      state.gl.xr.enabled = false;
      state.gl.xr.isPresenting = false;
      state.gl.setRenderTarget(fbo);
      state.gl.render(state.scene, state.camera);
      state.gl.setRenderTarget(oldRenderTarget);
      state.gl.autoClear = oldAutoClear;
      state.gl.xr.enabled = oldXrEnabled;
      state.gl.xr.isPresenting = oldIsPresenting;
      count++;
    }
  }, renderPriority);
  return React123.createElement(React123.Fragment, null, children);
}

// node_modules/@react-three/drei/core/RenderCubeTexture.js
var React124 = __toESM(require_react());
var RenderCubeTexture = React124.forwardRef(({
  children,
  compute,
  renderPriority = -1,
  eventPriority = 0,
  frames = Infinity,
  stencilBuffer = false,
  depthBuffer = true,
  generateMipmaps = false,
  resolution = 896,
  near = 0.1,
  far = 1e3,
  flip = false,
  position: position2,
  rotation: rotation3,
  scale: scale3,
  quaternion,
  matrix: matrix3,
  matrixAutoUpdate,
  ...props
}, forwardRef82) => {
  const {
    size,
    viewport
  } = useThree();
  const camera = React124.useRef(null);
  const fbo = React124.useMemo(() => {
    const fbo2 = new WebGLCubeRenderTarget(Math.max((resolution || size.width) * viewport.dpr, (resolution || size.height) * viewport.dpr), {
      stencilBuffer,
      depthBuffer,
      generateMipmaps
    });
    fbo2.texture.isRenderTargetTexture = !flip;
    fbo2.texture.flipY = true;
    fbo2.texture.type = HalfFloatType;
    return fbo2;
  }, [resolution, flip]);
  React124.useEffect(() => {
    return () => fbo.dispose();
  }, [fbo]);
  const [vScene] = React124.useState(() => new Scene());
  React124.useImperativeHandle(forwardRef82, () => ({
    scene: vScene,
    fbo,
    camera: camera.current
  }), [fbo]);
  return React124.createElement(React124.Fragment, null, createPortal(React124.createElement(Container2, {
    renderPriority,
    frames,
    camera
  }, children, React124.createElement("group", {
    onPointerOver: () => null
  })), vScene, {
    events: {
      compute,
      priority: eventPriority
    }
  }), React124.createElement("primitive", _extends({
    object: fbo.texture
  }, props)), React124.createElement("cubeCamera", {
    ref: camera,
    args: [near, far, fbo],
    position: position2,
    rotation: rotation3,
    scale: scale3,
    quaternion,
    matrix: matrix3,
    matrixAutoUpdate
  }));
});
function Container2({
  frames,
  renderPriority,
  children,
  camera
}) {
  let count = 0;
  useFrame((state) => {
    if (frames === Infinity || count < frames) {
      camera.current.update(state.gl, state.scene);
      count++;
    }
  }, renderPriority);
  return React124.createElement(React124.Fragment, null, children);
}

// node_modules/@react-three/drei/core/Mask.js
var React125 = __toESM(require_react());
var Mask = React125.forwardRef(({
  id = 1,
  colorWrite = false,
  depthWrite = false,
  ...props
}, fref) => {
  const ref = React125.useRef(null);
  const spread = React125.useMemo(() => ({
    colorWrite,
    depthWrite,
    stencilWrite: true,
    stencilRef: id,
    stencilFunc: AlwaysStencilFunc,
    stencilFail: ReplaceStencilOp,
    stencilZFail: ReplaceStencilOp,
    stencilZPass: ReplaceStencilOp
  }), [id, colorWrite, depthWrite]);
  React125.useLayoutEffect(() => {
    Object.assign(ref.current.material, spread);
  });
  React125.useImperativeHandle(fref, () => ref.current, []);
  return React125.createElement("mesh", _extends({
    ref,
    renderOrder: -id
  }, props));
});
function useMask(id, inverse = false) {
  return {
    stencilWrite: true,
    stencilRef: id,
    stencilFunc: inverse ? NotEqualStencilFunc : EqualStencilFunc,
    stencilFail: KeepStencilOp,
    stencilZFail: KeepStencilOp,
    stencilZPass: KeepStencilOp
  };
}

// node_modules/@react-three/drei/core/Fisheye.js
var React126 = __toESM(require_react());
function Fisheye({
  renderPriority = 1,
  zoom = 0,
  segments = 64,
  children,
  resolution = 896,
  ...props
}) {
  const sphere = React126.useRef(null);
  const cubeApi = React126.useRef(null);
  const {
    width,
    height
  } = useThree((state) => state.size);
  const [orthoC] = React126.useState(() => new OrthographicCamera());
  React126.useLayoutEffect(() => {
    orthoC.position.set(0, 0, 100);
    orthoC.zoom = 100;
    orthoC.left = width / -2;
    orthoC.right = width / 2;
    orthoC.top = height / 2;
    orthoC.bottom = height / -2;
    orthoC.updateProjectionMatrix();
  }, [width, height]);
  const radius = Math.sqrt(width * width + height * height) / 100 * (0.5 + zoom / 2);
  const normal2 = new Vector3();
  const sph = new Sphere(new Vector3(), radius);
  const normalMatrix = new Matrix3();
  const compute = React126.useCallback((event, state, prev) => {
    state.pointer.set(event.offsetX / state.size.width * 2 - 1, -(event.offsetY / state.size.height) * 2 + 1);
    state.raycaster.setFromCamera(state.pointer, orthoC);
    if (!state.raycaster.ray.intersectSphere(sph, normal2)) return;
    else normal2.normalize();
    normalMatrix.getNormalMatrix(cubeApi.current.camera.matrixWorld);
    cubeApi.current.camera.getWorldPosition(state.raycaster.ray.origin);
    state.raycaster.ray.direction.set(0, 0, 1).reflect(normal2);
    state.raycaster.ray.direction.x *= -1;
    state.raycaster.ray.direction.applyNormalMatrix(normalMatrix).multiplyScalar(-1);
    return void 0;
  }, []);
  useFrame((state) => {
    if (renderPriority) state.gl.render(sphere.current, orthoC);
  }, renderPriority);
  return React126.createElement(React126.Fragment, null, React126.createElement("mesh", _extends({
    ref: sphere
  }, props, {
    scale: radius
  }), React126.createElement("sphereGeometry", {
    args: [1, segments, segments]
  }), React126.createElement("meshBasicMaterial", null, React126.createElement(RenderCubeTexture, {
    compute,
    attach: "envMap",
    flip: true,
    resolution,
    ref: cubeApi
  }, children, React126.createElement(UpdateCubeCamera, {
    api: cubeApi
  })))));
}
function UpdateCubeCamera({
  api
}) {
  const t = new Vector3();
  const r = new Quaternion();
  const s = new Vector3();
  const e = new Euler(0, Math.PI, 0);
  useFrame((state) => {
    state.camera.matrixWorld.decompose(t, r, s);
    api.current.camera.position.copy(t);
    api.current.camera.quaternion.setFromEuler(e).premultiply(r);
  });
  return null;
}

// node_modules/@react-three/drei/core/MeshPortalMaterial.js
var React127 = __toESM(require_react());
var PortalMaterialImpl = shaderMaterial({
  blur: 0,
  map: null,
  sdf: null,
  blend: 0,
  size: 0,
  resolution: new Vector2()
}, `varying vec2 vUv;
   void main() {
     gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
     vUv = uv;
   }`, `uniform sampler2D sdf;
   uniform sampler2D map;
   uniform float blur;
   uniform float size;
   uniform float time;
   uniform vec2 resolution;
   varying vec2 vUv;
   #include <packing>
   void main() {
     vec2 uv = gl_FragCoord.xy / resolution.xy;
     vec4 t = texture2D(map, uv);
     float k = blur;
     float d = texture2D(sdf, vUv).r/size;
     float alpha = 1.0 - smoothstep(0.0, 1.0, clamp(d/k + 1.0, 0.0, 1.0));
     gl_FragColor = vec4(t.rgb, blur == 0.0 ? t.a : t.a * alpha);
     #include <tonemapping_fragment>
     #include <${version >= 154 ? "colorspace_fragment" : "encodings_fragment"}>
   }`);
var MeshPortalMaterial = React127.forwardRef(({
  children,
  events = void 0,
  blur = 0,
  eventPriority = 0,
  renderPriority = 0,
  worldUnits = false,
  resolution = 512,
  ...props
}, fref) => {
  extend({
    PortalMaterialImpl
  });
  const ref = React127.useRef(null);
  const {
    scene,
    gl,
    size,
    viewport,
    setEvents
  } = useThree();
  const maskRenderTarget = useFBO(resolution, resolution);
  const [priority, setPriority] = React127.useState(0);
  useFrame(() => {
    const p = ref.current.blend > 0 ? Math.max(1, renderPriority) : 0;
    if (priority !== p) setPriority(p);
  });
  React127.useEffect(() => {
    if (events !== void 0) setEvents({
      enabled: !events
    });
  }, [events]);
  const [visible, setVisible] = React127.useState(true);
  const parent = useIntersect(setVisible);
  React127.useLayoutEffect(() => {
    var _ref$current;
    parent.current = (_ref$current = ref.current) == null || (_ref$current = _ref$current.__r3f.parent) == null ? void 0 : _ref$current.object;
  }, []);
  React127.useLayoutEffect(() => {
    if (!parent.current) return;
    if (blur && ref.current.sdf === null) {
      const tempMesh = new Mesh(parent.current.geometry, new MeshBasicMaterial());
      const boundingBox5 = new Box3().setFromBufferAttribute(tempMesh.geometry.attributes.position);
      const orthoCam = new OrthographicCamera(boundingBox5.min.x * (1 + 2 / resolution), boundingBox5.max.x * (1 + 2 / resolution), boundingBox5.max.y * (1 + 2 / resolution), boundingBox5.min.y * (1 + 2 / resolution), 0.1, 1e3);
      orthoCam.position.set(0, 0, 1);
      orthoCam.lookAt(0, 0, 0);
      gl.setRenderTarget(maskRenderTarget);
      gl.render(tempMesh, orthoCam);
      const sg = makeSDFGenerator(resolution, resolution, gl);
      const sdf = sg(maskRenderTarget.texture);
      const readSdf = new Float32Array(resolution * resolution);
      gl.readRenderTargetPixels(sdf, 0, 0, resolution, resolution, readSdf);
      let min = Infinity;
      for (let i2 = 0; i2 < readSdf.length; i2++) {
        if (readSdf[i2] < min) min = readSdf[i2];
      }
      min = -min;
      ref.current.size = min;
      ref.current.sdf = sdf.texture;
      gl.setRenderTarget(null);
    }
  }, [resolution, blur]);
  React127.useImperativeHandle(fref, () => ref.current);
  const compute = React127.useCallback((event, state, previous) => {
    var _ref$current2;
    if (!parent.current) return false;
    state.pointer.set(event.offsetX / state.size.width * 2 - 1, -(event.offsetY / state.size.height) * 2 + 1);
    state.raycaster.setFromCamera(state.pointer, state.camera);
    if (((_ref$current2 = ref.current) == null ? void 0 : _ref$current2.blend) === 0) {
      const [intersection3] = state.raycaster.intersectObject(parent.current);
      if (!intersection3) {
        state.raycaster.camera = void 0;
        return false;
      }
    }
  }, []);
  return React127.createElement("portalMaterialImpl", _extends({
    ref,
    blur,
    blend: 0,
    resolution: [size.width * viewport.dpr, size.height * viewport.dpr],
    attach: "material"
  }, props), React127.createElement(RenderTexture, {
    attach: "map",
    frames: visible ? Infinity : 0,
    eventPriority,
    renderPriority,
    compute
  }, children, React127.createElement(ManagePortalScene, {
    events,
    rootScene: scene,
    priority,
    material: ref,
    worldUnits
  })));
});
function ManagePortalScene({
  events = void 0,
  rootScene,
  material,
  priority,
  worldUnits
}) {
  const scene = useThree((state) => state.scene);
  const setEvents = useThree((state) => state.setEvents);
  const buffer1 = useFBO();
  const buffer2 = useFBO();
  React127.useLayoutEffect(() => {
    scene.matrixAutoUpdate = false;
  }, []);
  React127.useEffect(() => {
    if (events !== void 0) setEvents({
      enabled: events
    });
  }, [events]);
  const [quad, blend] = React127.useMemo(() => {
    const blend2 = {
      value: 0
    };
    const quad2 = new FullScreenQuad(new ShaderMaterial({
      uniforms: {
        a: {
          value: buffer1.texture
        },
        b: {
          value: buffer2.texture
        },
        blend: blend2
      },
      vertexShader: (
        /*glsl*/
        `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
          }`
      ),
      fragmentShader: (
        /*glsl*/
        `
          uniform sampler2D a;
          uniform sampler2D b;
          uniform float blend;
          varying vec2 vUv;
          #include <packing>
          void main() {
            vec4 ta = texture2D(a, vUv);
            vec4 tb = texture2D(b, vUv);
            gl_FragColor = mix(tb, ta, blend);
            #include <tonemapping_fragment>
            #include <${version >= 154 ? "colorspace_fragment" : "encodings_fragment"}>
          }`
      )
    }));
    return [quad2, blend2];
  }, []);
  useFrame((state) => {
    var _material$current;
    let parent = material == null || (_material$current = material.current) == null || (_material$current = _material$current.__r3f.parent) == null ? void 0 : _material$current.object;
    if (parent) {
      if (!worldUnits) {
        var _material$current2;
        if (priority && ((_material$current2 = material.current) == null ? void 0 : _material$current2.blend) === 1) parent.updateWorldMatrix(true, false);
        scene.matrixWorld.copy(parent.matrixWorld);
      } else scene.matrixWorld.identity();
      if (priority) {
        var _material$current3, _material$current4, _material$current5;
        if (((_material$current3 = material.current) == null ? void 0 : _material$current3.blend) > 0 && ((_material$current4 = material.current) == null ? void 0 : _material$current4.blend) < 1) {
          blend.value = material.current.blend;
          state.gl.setRenderTarget(buffer1);
          state.gl.render(scene, state.camera);
          state.gl.setRenderTarget(buffer2);
          state.gl.render(rootScene, state.camera);
          state.gl.setRenderTarget(null);
          quad.render(state.gl);
        } else if (((_material$current5 = material.current) == null ? void 0 : _material$current5.blend) === 1) {
          state.gl.render(scene, state.camera);
        }
      }
    }
  }, priority);
  return React127.createElement(React127.Fragment, null);
}
var makeSDFGenerator = (clientWidth, clientHeight, renderer) => {
  let finalTarget = new WebGLRenderTarget(clientWidth, clientHeight, {
    minFilter: LinearMipmapLinearFilter,
    magFilter: LinearFilter,
    type: FloatType,
    format: RedFormat,
    generateMipmaps: true
  });
  let outsideRenderTarget = new WebGLRenderTarget(clientWidth, clientHeight, {
    minFilter: NearestFilter,
    magFilter: NearestFilter
  });
  let insideRenderTarget = new WebGLRenderTarget(clientWidth, clientHeight, {
    minFilter: NearestFilter,
    magFilter: NearestFilter
  });
  let outsideRenderTarget2 = new WebGLRenderTarget(clientWidth, clientHeight, {
    minFilter: NearestFilter,
    magFilter: NearestFilter
  });
  let insideRenderTarget2 = new WebGLRenderTarget(clientWidth, clientHeight, {
    minFilter: NearestFilter,
    magFilter: NearestFilter
  });
  let outsideRenderTargetFinal = new WebGLRenderTarget(clientWidth, clientHeight, {
    minFilter: NearestFilter,
    magFilter: NearestFilter,
    type: FloatType,
    format: RedFormat
  });
  let insideRenderTargetFinal = new WebGLRenderTarget(clientWidth, clientHeight, {
    minFilter: NearestFilter,
    magFilter: NearestFilter,
    type: FloatType,
    format: RedFormat
  });
  const uvRender = new FullScreenQuad(new ShaderMaterial({
    uniforms: {
      tex: {
        value: null
      }
    },
    vertexShader: (
      /*glsl*/
      `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }`
    ),
    fragmentShader: (
      /*glsl*/
      `
        uniform sampler2D tex;
        varying vec2 vUv;
        #include <packing>
        void main() {
          gl_FragColor = pack2HalfToRGBA(vUv * (round(texture2D(tex, vUv).x)));
        }`
    )
  }));
  const uvRenderInside = new FullScreenQuad(new ShaderMaterial({
    uniforms: {
      tex: {
        value: null
      }
    },
    vertexShader: (
      /*glsl*/
      `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }`
    ),
    fragmentShader: (
      /*glsl*/
      `
        uniform sampler2D tex;
        varying vec2 vUv;
        #include <packing>
        void main() {
          gl_FragColor = pack2HalfToRGBA(vUv * (1.0 - round(texture2D(tex, vUv).x)));
        }`
    )
  }));
  const jumpFloodRender = new FullScreenQuad(new ShaderMaterial({
    uniforms: {
      tex: {
        value: null
      },
      offset: {
        value: 0
      },
      level: {
        value: 0
      },
      maxSteps: {
        value: 0
      }
    },
    vertexShader: (
      /*glsl*/
      `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }`
    ),
    fragmentShader: (
      /*glsl*/
      `
        varying vec2 vUv;
        uniform sampler2D tex;
        uniform float offset;
        uniform float level;
        uniform float maxSteps;
        #include <packing>
        void main() {
          float closestDist = 9999999.9;
          vec2 closestPos = vec2(0.0);
          for (float x = -1.0; x <= 1.0; x += 1.0) {
            for (float y = -1.0; y <= 1.0; y += 1.0) {
              vec2 voffset = vUv;
              voffset += vec2(x, y) * vec2(${1 / clientWidth}, ${1 / clientHeight}) * offset;
              vec2 pos = unpackRGBATo2Half(texture2D(tex, voffset));
              float dist = distance(pos.xy, vUv);
              if(pos.x != 0.0 && pos.y != 0.0 && dist < closestDist) {
                closestDist = dist;
                closestPos = pos;
              }
            }
          }
          gl_FragColor = pack2HalfToRGBA(closestPos);
        }`
    )
  }));
  const distanceFieldRender = new FullScreenQuad(new ShaderMaterial({
    uniforms: {
      tex: {
        value: null
      },
      size: {
        value: new Vector2(clientWidth, clientHeight)
      }
    },
    vertexShader: (
      /*glsl*/
      `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }`
    ),
    fragmentShader: (
      /*glsl*/
      `
        varying vec2 vUv;
        uniform sampler2D tex;
        uniform vec2 size;
        #include <packing>
        void main() {
          gl_FragColor = vec4(distance(size * unpackRGBATo2Half(texture2D(tex, vUv)), size * vUv), 0.0, 0.0, 0.0);
        }`
    )
  }));
  const compositeRender = new FullScreenQuad(new ShaderMaterial({
    uniforms: {
      inside: {
        value: insideRenderTargetFinal.texture
      },
      outside: {
        value: outsideRenderTargetFinal.texture
      },
      tex: {
        value: null
      }
    },
    vertexShader: (
      /*glsl*/
      `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }`
    ),
    fragmentShader: (
      /*glsl*/
      `
        varying vec2 vUv;
        uniform sampler2D inside;
        uniform sampler2D outside;
        uniform sampler2D tex;
        #include <packing>
        void main() {
          float i = texture2D(inside, vUv).x;
          float o =texture2D(outside, vUv).x;
          if (texture2D(tex, vUv).x == 0.0) {
            gl_FragColor = vec4(o, 0.0, 0.0, 0.0);
          } else {
            gl_FragColor = vec4(-i, 0.0, 0.0, 0.0);
          }
        }`
    )
  }));
  return (image) => {
    let ft = finalTarget;
    image.minFilter = NearestFilter;
    image.magFilter = NearestFilter;
    uvRender.material.uniforms.tex.value = image;
    renderer.setRenderTarget(outsideRenderTarget);
    uvRender.render(renderer);
    const passes = Math.ceil(Math.log(Math.max(clientWidth, clientHeight)) / Math.log(2));
    let lastTarget = outsideRenderTarget;
    let target2 = null;
    for (let i2 = 0; i2 < passes; i2++) {
      const offset = Math.pow(2, passes - i2 - 1);
      target2 = lastTarget === outsideRenderTarget ? outsideRenderTarget2 : outsideRenderTarget;
      jumpFloodRender.material.uniforms.level.value = i2;
      jumpFloodRender.material.uniforms.maxSteps.value = passes;
      jumpFloodRender.material.uniforms.offset.value = offset;
      jumpFloodRender.material.uniforms.tex.value = lastTarget.texture;
      renderer.setRenderTarget(target2);
      jumpFloodRender.render(renderer);
      lastTarget = target2;
    }
    renderer.setRenderTarget(outsideRenderTargetFinal);
    distanceFieldRender.material.uniforms.tex.value = target2.texture;
    distanceFieldRender.render(renderer);
    uvRenderInside.material.uniforms.tex.value = image;
    renderer.setRenderTarget(insideRenderTarget);
    uvRenderInside.render(renderer);
    lastTarget = insideRenderTarget;
    for (let i2 = 0; i2 < passes; i2++) {
      const offset = Math.pow(2, passes - i2 - 1);
      target2 = lastTarget === insideRenderTarget ? insideRenderTarget2 : insideRenderTarget;
      jumpFloodRender.material.uniforms.level.value = i2;
      jumpFloodRender.material.uniforms.maxSteps.value = passes;
      jumpFloodRender.material.uniforms.offset.value = offset;
      jumpFloodRender.material.uniforms.tex.value = lastTarget.texture;
      renderer.setRenderTarget(target2);
      jumpFloodRender.render(renderer);
      lastTarget = target2;
    }
    renderer.setRenderTarget(insideRenderTargetFinal);
    distanceFieldRender.material.uniforms.tex.value = target2.texture;
    distanceFieldRender.render(renderer);
    renderer.setRenderTarget(ft);
    compositeRender.material.uniforms.tex.value = image;
    compositeRender.render(renderer);
    renderer.setRenderTarget(null);
    return ft;
  };
};

// node_modules/@react-three/drei/web/View.js
var React128 = __toESM(require_react());
var isOrthographicCamera2 = (def) => def && def.isOrthographicCamera;
var col = new Color();
var tracked = tunnel();
function computeContainerPosition(canvasSize, trackRect) {
  const {
    right,
    top,
    left: trackLeft,
    bottom: trackBottom,
    width,
    height
  } = trackRect;
  const isOffscreen = trackRect.bottom < 0 || top > canvasSize.height || right < 0 || trackRect.left > canvasSize.width;
  const canvasBottom = canvasSize.top + canvasSize.height;
  const bottom = canvasBottom - trackBottom;
  const left = trackLeft - canvasSize.left;
  return {
    position: {
      width,
      height,
      left,
      top,
      bottom,
      right
    },
    isOffscreen
  };
}
function prepareSkissor(state, {
  left,
  bottom,
  width,
  height
}) {
  let autoClear;
  const aspect = width / height;
  if (isOrthographicCamera2(state.camera)) {
    if (!state.camera.manual) {
      if (state.camera.left !== width / -2 || state.camera.right !== width / 2 || state.camera.top !== height / 2 || state.camera.bottom !== height / -2) {
        Object.assign(state.camera, {
          left: width / -2,
          right: width / 2,
          top: height / 2,
          bottom: height / -2
        });
        state.camera.updateProjectionMatrix();
      }
    } else {
      state.camera.updateProjectionMatrix();
    }
  } else if (state.camera.aspect !== aspect) {
    state.camera.aspect = aspect;
    state.camera.updateProjectionMatrix();
  }
  autoClear = state.gl.autoClear;
  state.gl.autoClear = false;
  state.gl.setViewport(left, bottom, width, height);
  state.gl.setScissor(left, bottom, width, height);
  state.gl.setScissorTest(true);
  return autoClear;
}
function finishSkissor(state, autoClear) {
  state.gl.setScissorTest(false);
  state.gl.autoClear = autoClear;
}
function clear2(state) {
  state.gl.getClearColor(col);
  state.gl.setClearColor(col, state.gl.getClearAlpha());
  state.gl.clear(true, true);
}
function Container3({
  visible = true,
  canvasSize,
  scene,
  index,
  children,
  frames,
  rect,
  track
}) {
  const rootState = useThree();
  const [isOffscreen, setOffscreen] = React128.useState(false);
  let frameCount = 0;
  useFrame((state) => {
    if (frames === Infinity || frameCount <= frames) {
      var _track$current;
      if (track) rect.current = (_track$current = track.current) == null ? void 0 : _track$current.getBoundingClientRect();
      frameCount++;
    }
    if (rect.current) {
      const {
        position: position2,
        isOffscreen: _isOffscreen
      } = computeContainerPosition(canvasSize, rect.current);
      if (isOffscreen !== _isOffscreen) setOffscreen(_isOffscreen);
      if (visible && !isOffscreen && rect.current) {
        const autoClear = prepareSkissor(state, position2);
        state.gl.render(children ? state.scene : scene, state.camera);
        finishSkissor(state, autoClear);
      }
    }
  }, index);
  React128.useLayoutEffect(() => {
    const curRect = rect.current;
    if (curRect && (!visible || !isOffscreen)) {
      const {
        position: position2
      } = computeContainerPosition(canvasSize, curRect);
      const autoClear = prepareSkissor(rootState, position2);
      clear2(rootState);
      finishSkissor(rootState, autoClear);
    }
  }, [visible, isOffscreen]);
  React128.useEffect(() => {
    if (!track) return;
    const curRect = rect.current;
    const old = rootState.get().events.connected;
    rootState.setEvents({
      connected: track.current
    });
    return () => {
      if (curRect) {
        const {
          position: position2
        } = computeContainerPosition(canvasSize, curRect);
        const autoClear = prepareSkissor(rootState, position2);
        clear2(rootState);
        finishSkissor(rootState, autoClear);
      }
      rootState.setEvents({
        connected: old
      });
    };
  }, [track]);
  return React128.createElement(React128.Fragment, null, children, React128.createElement("group", {
    onPointerOver: () => null
  }));
}
var CanvasView = React128.forwardRef(({
  track,
  visible = true,
  index = 1,
  id,
  style,
  className,
  frames = Infinity,
  children,
  ...props
}, fref) => {
  var _rect$current, _rect$current2, _rect$current3, _rect$current4;
  const rect = React128.useRef(null);
  const {
    size,
    scene
  } = useThree();
  const [virtualScene] = React128.useState(() => new Scene());
  const [ready, toggle] = React128.useReducer(() => true, false);
  const compute = React128.useCallback((event, state) => {
    if (rect.current && track && track.current && event.target === track.current) {
      const {
        width,
        height,
        left,
        top
      } = rect.current;
      const x = event.clientX - left;
      const y = event.clientY - top;
      state.pointer.set(x / width * 2 - 1, -(y / height) * 2 + 1);
      state.raycaster.setFromCamera(state.pointer, state.camera);
    }
  }, [rect, track]);
  React128.useEffect(() => {
    var _track$current2;
    if (track) rect.current = (_track$current2 = track.current) == null ? void 0 : _track$current2.getBoundingClientRect();
    toggle();
  }, [track]);
  return React128.createElement("group", _extends({
    ref: fref
  }, props), ready && createPortal(React128.createElement(Container3, {
    visible,
    canvasSize: size,
    frames,
    scene,
    track,
    rect,
    index
  }, children), virtualScene, {
    events: {
      compute,
      priority: index
    },
    size: {
      width: (_rect$current = rect.current) == null ? void 0 : _rect$current.width,
      height: (_rect$current2 = rect.current) == null ? void 0 : _rect$current2.height,
      // @ts-ignore
      top: (_rect$current3 = rect.current) == null ? void 0 : _rect$current3.top,
      // @ts-ignore
      left: (_rect$current4 = rect.current) == null ? void 0 : _rect$current4.left
    }
  }));
});
var HtmlView = React128.forwardRef(({
  as: El = "div",
  id,
  visible,
  className,
  style,
  index = 1,
  track,
  frames = Infinity,
  children,
  ...props
}, fref) => {
  const uuid = React128.useId();
  const ref = React128.useRef(null);
  React128.useImperativeHandle(fref, () => ref.current);
  return React128.createElement(React128.Fragment, null, React128.createElement(El, _extends({
    ref,
    id,
    className,
    style
  }, props)), React128.createElement(tracked.In, null, React128.createElement(CanvasView, {
    visible,
    key: uuid,
    track: ref,
    frames,
    index
  }, children)));
});
var View = (() => {
  const _View = React128.forwardRef((props, fref) => {
    const store = React128.useContext(context);
    if (!store) return React128.createElement(HtmlView, _extends({
      ref: fref
    }, props));
    else return React128.createElement(CanvasView, _extends({
      ref: fref
    }, props));
  });
  _View.Port = () => React128.createElement(tracked.Out, null);
  return _View;
})();

// node_modules/@react-three/drei/web/pivotControls/index.js
var React134 = __toESM(require_react());

// node_modules/@react-three/drei/web/pivotControls/AxisArrow.js
var React130 = __toESM(require_react());

// node_modules/@react-three/drei/web/pivotControls/context.js
var React129 = __toESM(require_react());
var context11 = React129.createContext(null);

// node_modules/@react-three/drei/web/pivotControls/AxisArrow.js
var vec1 = new Vector3();
var vec2 = new Vector3();
var calculateOffset = (clickPoint, normal2, rayStart, rayDir) => {
  const e1 = normal2.dot(normal2);
  const e2 = normal2.dot(clickPoint) - normal2.dot(rayStart);
  const e3 = normal2.dot(rayDir);
  if (e3 === 0) {
    return -e2 / e1;
  }
  vec1.copy(rayDir).multiplyScalar(e1 / e3).sub(normal2);
  vec2.copy(rayDir).multiplyScalar(e2 / e3).add(rayStart).sub(clickPoint);
  const offset = -vec1.dot(vec2) / vec1.dot(vec1);
  return offset;
};
var upV = new Vector3(0, 1, 0);
var offsetMatrix = new Matrix4();
var AxisArrow = ({
  direction: direction2,
  axis
}) => {
  const {
    translation: translation3,
    translationLimits,
    annotations,
    annotationsClass,
    depthTest,
    scale: scale3,
    lineWidth,
    fixed,
    axisColors,
    hoveredColor,
    opacity,
    renderOrder,
    onDragStart,
    onDrag,
    onDragEnd,
    userData
  } = React130.useContext(context11);
  const camControls = useThree((state) => state.controls);
  const divRef = React130.useRef(null);
  const objRef = React130.useRef(null);
  const clickInfo = React130.useRef(null);
  const offset0 = React130.useRef(0);
  const [isHovered, setIsHovered] = React130.useState(false);
  const onPointerDown = React130.useCallback((e) => {
    if (annotations) {
      divRef.current.innerText = `${translation3.current[axis].toFixed(2)}`;
      divRef.current.style.display = "block";
    }
    e.stopPropagation();
    const rotation3 = new Matrix4().extractRotation(objRef.current.matrixWorld);
    const clickPoint = e.point.clone();
    const origin = new Vector3().setFromMatrixPosition(objRef.current.matrixWorld);
    const dir = direction2.clone().applyMatrix4(rotation3).normalize();
    clickInfo.current = {
      clickPoint,
      dir
    };
    offset0.current = translation3.current[axis];
    onDragStart({
      component: "Arrow",
      axis,
      origin,
      directions: [dir]
    });
    camControls && (camControls.enabled = false);
    e.target.setPointerCapture(e.pointerId);
  }, [annotations, direction2, camControls, onDragStart, translation3, axis]);
  const onPointerMove = React130.useCallback((e) => {
    e.stopPropagation();
    if (!isHovered) setIsHovered(true);
    if (clickInfo.current) {
      const {
        clickPoint,
        dir
      } = clickInfo.current;
      const [min, max] = (translationLimits == null ? void 0 : translationLimits[axis]) || [void 0, void 0];
      let offset = calculateOffset(clickPoint, dir, e.ray.origin, e.ray.direction);
      if (min !== void 0) {
        offset = Math.max(offset, min - offset0.current);
      }
      if (max !== void 0) {
        offset = Math.min(offset, max - offset0.current);
      }
      translation3.current[axis] = offset0.current + offset;
      if (annotations) {
        divRef.current.innerText = `${translation3.current[axis].toFixed(2)}`;
      }
      offsetMatrix.makeTranslation(dir.x * offset, dir.y * offset, dir.z * offset);
      onDrag(offsetMatrix);
    }
  }, [annotations, onDrag, isHovered, translation3, translationLimits, axis]);
  const onPointerUp = React130.useCallback((e) => {
    if (annotations) {
      divRef.current.style.display = "none";
    }
    e.stopPropagation();
    clickInfo.current = null;
    onDragEnd();
    camControls && (camControls.enabled = true);
    e.target.releasePointerCapture(e.pointerId);
  }, [annotations, camControls, onDragEnd]);
  const onPointerOut = React130.useCallback((e) => {
    e.stopPropagation();
    setIsHovered(false);
  }, []);
  const {
    cylinderLength,
    coneWidth,
    coneLength,
    matrixL
  } = React130.useMemo(() => {
    const coneWidth2 = fixed ? lineWidth / scale3 * 1.6 : scale3 / 20;
    const coneLength2 = fixed ? 0.2 : scale3 / 5;
    const cylinderLength2 = fixed ? 1 - coneLength2 : scale3 - coneLength2;
    const quaternion = new Quaternion().setFromUnitVectors(upV, direction2.clone().normalize());
    const matrixL2 = new Matrix4().makeRotationFromQuaternion(quaternion);
    return {
      cylinderLength: cylinderLength2,
      coneWidth: coneWidth2,
      coneLength: coneLength2,
      matrixL: matrixL2
    };
  }, [direction2, scale3, lineWidth, fixed]);
  const color_ = isHovered ? hoveredColor : axisColors[axis];
  return React130.createElement("group", {
    ref: objRef
  }, React130.createElement("group", {
    matrix: matrixL,
    matrixAutoUpdate: false,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onPointerOut
  }, annotations && React130.createElement(Html, {
    position: [0, -coneLength, 0]
  }, React130.createElement("div", {
    style: {
      display: "none",
      background: "#151520",
      color: "white",
      padding: "6px 8px",
      borderRadius: 7,
      whiteSpace: "nowrap"
    },
    className: annotationsClass,
    ref: divRef
  })), React130.createElement("mesh", {
    visible: false,
    position: [0, (cylinderLength + coneLength) / 2, 0],
    userData
  }, React130.createElement("cylinderGeometry", {
    args: [coneWidth * 1.4, coneWidth * 1.4, cylinderLength + coneLength, 8, 1]
  })), React130.createElement(Line, {
    transparent: true,
    raycast: () => null,
    depthTest,
    points: [0, 0, 0, 0, cylinderLength, 0],
    lineWidth,
    side: DoubleSide,
    color: color_,
    opacity,
    polygonOffset: true,
    renderOrder,
    polygonOffsetFactor: -10,
    fog: false
  }), React130.createElement("mesh", {
    raycast: () => null,
    position: [0, cylinderLength + coneLength / 2, 0],
    renderOrder
  }, React130.createElement("coneGeometry", {
    args: [coneWidth, coneLength, 24, 1]
  }), React130.createElement("meshBasicMaterial", {
    transparent: true,
    depthTest,
    color: color_,
    opacity,
    polygonOffset: true,
    polygonOffsetFactor: -10,
    fog: false
  }))));
};

// node_modules/@react-three/drei/web/pivotControls/AxisRotator.js
var React131 = __toESM(require_react());
var clickDir = new Vector3();
var intersectionDir = new Vector3();
var toDegrees = (radians) => radians * 180 / Math.PI;
var toRadians = (degrees) => degrees * Math.PI / 180;
var calculateAngle = (clickPoint, intersectionPoint, origin, e1, e2) => {
  clickDir.copy(clickPoint).sub(origin);
  intersectionDir.copy(intersectionPoint).sub(origin);
  const dote1e1 = e1.dot(e1);
  const dote2e2 = e2.dot(e2);
  const uClick = clickDir.dot(e1) / dote1e1;
  const vClick = clickDir.dot(e2) / dote2e2;
  const uIntersection = intersectionDir.dot(e1) / dote1e1;
  const vIntersection = intersectionDir.dot(e2) / dote2e2;
  const angleClick = Math.atan2(vClick, uClick);
  const angleIntersection = Math.atan2(vIntersection, uIntersection);
  return angleIntersection - angleClick;
};
var fmod = (num, denom) => {
  let k = Math.floor(num / denom);
  k = k < 0 ? k + 1 : k;
  return num - k * denom;
};
var minimizeAngle = (angle) => {
  let result = fmod(angle, 2 * Math.PI);
  if (Math.abs(result) < 1e-6) {
    return 0;
  }
  if (result < 0) {
    result += 2 * Math.PI;
  }
  return result;
};
var rotMatrix = new Matrix4();
var posNew = new Vector3();
var ray2 = new Ray();
var intersection = new Vector3();
var AxisRotator = ({
  dir1,
  dir2,
  axis
}) => {
  const {
    rotationLimits,
    annotations,
    annotationsClass,
    depthTest,
    scale: scale3,
    lineWidth,
    fixed,
    axisColors,
    hoveredColor,
    renderOrder,
    opacity,
    onDragStart,
    onDrag,
    onDragEnd,
    userData
  } = React131.useContext(context11);
  const camControls = useThree((state) => state.controls);
  const divRef = React131.useRef(null);
  const objRef = React131.useRef(null);
  const angle0 = React131.useRef(0);
  const angle = React131.useRef(0);
  const clickInfo = React131.useRef(null);
  const [isHovered, setIsHovered] = React131.useState(false);
  const onPointerDown = React131.useCallback((e) => {
    if (annotations) {
      divRef.current.innerText = `${toDegrees(angle.current).toFixed(0)}º`;
      divRef.current.style.display = "block";
    }
    e.stopPropagation();
    const clickPoint = e.point.clone();
    const origin = new Vector3().setFromMatrixPosition(objRef.current.matrixWorld);
    const e1 = new Vector3().setFromMatrixColumn(objRef.current.matrixWorld, 0).normalize();
    const e2 = new Vector3().setFromMatrixColumn(objRef.current.matrixWorld, 1).normalize();
    const normal2 = new Vector3().setFromMatrixColumn(objRef.current.matrixWorld, 2).normalize();
    const plane = new Plane().setFromNormalAndCoplanarPoint(normal2, origin);
    clickInfo.current = {
      clickPoint,
      origin,
      e1,
      e2,
      normal: normal2,
      plane
    };
    onDragStart({
      component: "Rotator",
      axis,
      origin,
      directions: [e1, e2, normal2]
    });
    camControls && (camControls.enabled = false);
    e.target.setPointerCapture(e.pointerId);
  }, [annotations, camControls, onDragStart, axis]);
  const onPointerMove = React131.useCallback((e) => {
    e.stopPropagation();
    if (!isHovered) setIsHovered(true);
    if (clickInfo.current) {
      const {
        clickPoint,
        origin,
        e1,
        e2,
        normal: normal2,
        plane
      } = clickInfo.current;
      const [min, max] = (rotationLimits == null ? void 0 : rotationLimits[axis]) || [void 0, void 0];
      ray2.copy(e.ray);
      ray2.intersectPlane(plane, intersection);
      ray2.direction.negate();
      ray2.intersectPlane(plane, intersection);
      let deltaAngle = calculateAngle(clickPoint, intersection, origin, e1, e2);
      let degrees = toDegrees(deltaAngle);
      if (e.shiftKey) {
        degrees = Math.round(degrees / 10) * 10;
        deltaAngle = toRadians(degrees);
      }
      if (min !== void 0 && max !== void 0 && max - min < 2 * Math.PI) {
        deltaAngle = minimizeAngle(deltaAngle);
        deltaAngle = deltaAngle > Math.PI ? deltaAngle - 2 * Math.PI : deltaAngle;
        deltaAngle = MathUtils.clamp(deltaAngle, min - angle0.current, max - angle0.current);
        angle.current = angle0.current + deltaAngle;
      } else {
        angle.current = minimizeAngle(angle0.current + deltaAngle);
        angle.current = angle.current > Math.PI ? angle.current - 2 * Math.PI : angle.current;
      }
      if (annotations) {
        degrees = toDegrees(angle.current);
        divRef.current.innerText = `${degrees.toFixed(0)}º`;
      }
      rotMatrix.makeRotationAxis(normal2, deltaAngle);
      posNew.copy(origin).applyMatrix4(rotMatrix).sub(origin).negate();
      rotMatrix.setPosition(posNew);
      onDrag(rotMatrix);
    }
  }, [annotations, onDrag, isHovered, rotationLimits, axis]);
  const onPointerUp = React131.useCallback((e) => {
    if (annotations) {
      divRef.current.style.display = "none";
    }
    e.stopPropagation();
    angle0.current = angle.current;
    clickInfo.current = null;
    onDragEnd();
    camControls && (camControls.enabled = true);
    e.target.releasePointerCapture(e.pointerId);
  }, [annotations, camControls, onDragEnd]);
  const onPointerOut = React131.useCallback((e) => {
    e.stopPropagation();
    setIsHovered(false);
  }, []);
  const matrixL = React131.useMemo(() => {
    const dir1N = dir1.clone().normalize();
    const dir2N = dir2.clone().normalize();
    return new Matrix4().makeBasis(dir1N, dir2N, dir1N.clone().cross(dir2N));
  }, [dir1, dir2]);
  const r = fixed ? 0.65 : scale3 * 0.65;
  const arc = React131.useMemo(() => {
    const segments = 32;
    const points = [];
    for (let j = 0; j <= segments; j++) {
      const angle2 = j * (Math.PI / 2) / segments;
      points.push(new Vector3(Math.cos(angle2) * r, Math.sin(angle2) * r, 0));
    }
    return points;
  }, [r]);
  return React131.createElement("group", {
    ref: objRef,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onPointerOut,
    matrix: matrixL,
    matrixAutoUpdate: false
  }, annotations && React131.createElement(Html, {
    position: [r, r, 0]
  }, React131.createElement("div", {
    style: {
      display: "none",
      background: "#151520",
      color: "white",
      padding: "6px 8px",
      borderRadius: 7,
      whiteSpace: "nowrap"
    },
    className: annotationsClass,
    ref: divRef
  })), React131.createElement(Line, {
    points: arc,
    lineWidth: lineWidth * 4,
    visible: false,
    userData
  }), React131.createElement(Line, {
    transparent: true,
    raycast: () => null,
    depthTest,
    points: arc,
    lineWidth,
    side: DoubleSide,
    color: isHovered ? hoveredColor : axisColors[axis],
    opacity,
    polygonOffset: true,
    polygonOffsetFactor: -10,
    renderOrder,
    fog: false
  }));
};

// node_modules/@react-three/drei/web/pivotControls/PlaneSlider.js
var React132 = __toESM(require_react());
var decomposeIntoBasis = (e1, e2, offset) => {
  const i1 = Math.abs(e1.x) >= Math.abs(e1.y) && Math.abs(e1.x) >= Math.abs(e1.z) ? 0 : Math.abs(e1.y) >= Math.abs(e1.x) && Math.abs(e1.y) >= Math.abs(e1.z) ? 1 : 2;
  const e2DegrowthOrder = [0, 1, 2].sort((a, b) => Math.abs(e2.getComponent(b)) - Math.abs(e2.getComponent(a)));
  const i2 = i1 === e2DegrowthOrder[0] ? e2DegrowthOrder[1] : e2DegrowthOrder[0];
  const a1 = e1.getComponent(i1);
  const a2 = e1.getComponent(i2);
  const b1 = e2.getComponent(i1);
  const b2 = e2.getComponent(i2);
  const c1 = offset.getComponent(i1);
  const c2 = offset.getComponent(i2);
  const y = (c2 - c1 * (a2 / a1)) / (b2 - b1 * (a2 / a1));
  const x = (c1 - y * b1) / a1;
  return [x, y];
};
var ray3 = new Ray();
var intersection2 = new Vector3();
var offsetMatrix2 = new Matrix4();
var PlaneSlider = ({
  dir1,
  dir2,
  axis
}) => {
  const {
    translation: translation3,
    translationLimits,
    annotations,
    annotationsClass,
    depthTest,
    scale: scale3,
    lineWidth,
    fixed,
    axisColors,
    hoveredColor,
    opacity,
    renderOrder,
    onDragStart,
    onDrag,
    onDragEnd,
    userData
  } = React132.useContext(context11);
  const camControls = useThree((state) => state.controls);
  const divRef = React132.useRef(null);
  const objRef = React132.useRef(null);
  const clickInfo = React132.useRef(null);
  const offsetX0 = React132.useRef(0);
  const offsetY0 = React132.useRef(0);
  const [isHovered, setIsHovered] = React132.useState(false);
  const onPointerDown = React132.useCallback((e) => {
    if (annotations) {
      divRef.current.innerText = `${translation3.current[(axis + 1) % 3].toFixed(2)}, ${translation3.current[(axis + 2) % 3].toFixed(2)}`;
      divRef.current.style.display = "block";
    }
    e.stopPropagation();
    const clickPoint = e.point.clone();
    const origin = new Vector3().setFromMatrixPosition(objRef.current.matrixWorld);
    const e1 = new Vector3().setFromMatrixColumn(objRef.current.matrixWorld, 0).normalize();
    const e2 = new Vector3().setFromMatrixColumn(objRef.current.matrixWorld, 1).normalize();
    const normal2 = new Vector3().setFromMatrixColumn(objRef.current.matrixWorld, 2).normalize();
    const plane = new Plane().setFromNormalAndCoplanarPoint(normal2, origin);
    clickInfo.current = {
      clickPoint,
      e1,
      e2,
      plane
    };
    offsetX0.current = translation3.current[(axis + 1) % 3];
    offsetY0.current = translation3.current[(axis + 2) % 3];
    onDragStart({
      component: "Slider",
      axis,
      origin,
      directions: [e1, e2, normal2]
    });
    camControls && (camControls.enabled = false);
    e.target.setPointerCapture(e.pointerId);
  }, [annotations, camControls, onDragStart, axis]);
  const onPointerMove = React132.useCallback((e) => {
    e.stopPropagation();
    if (!isHovered) setIsHovered(true);
    if (clickInfo.current) {
      const {
        clickPoint,
        e1,
        e2,
        plane
      } = clickInfo.current;
      const [minX, maxX] = (translationLimits == null ? void 0 : translationLimits[(axis + 1) % 3]) || [void 0, void 0];
      const [minY, maxY] = (translationLimits == null ? void 0 : translationLimits[(axis + 2) % 3]) || [void 0, void 0];
      ray3.copy(e.ray);
      ray3.intersectPlane(plane, intersection2);
      ray3.direction.negate();
      ray3.intersectPlane(plane, intersection2);
      intersection2.sub(clickPoint);
      let [offsetX, offsetY] = decomposeIntoBasis(e1, e2, intersection2);
      if (minX !== void 0) {
        offsetX = Math.max(offsetX, minX - offsetX0.current);
      }
      if (maxX !== void 0) {
        offsetX = Math.min(offsetX, maxX - offsetX0.current);
      }
      if (minY !== void 0) {
        offsetY = Math.max(offsetY, minY - offsetY0.current);
      }
      if (maxY !== void 0) {
        offsetY = Math.min(offsetY, maxY - offsetY0.current);
      }
      translation3.current[(axis + 1) % 3] = offsetX0.current + offsetX;
      translation3.current[(axis + 2) % 3] = offsetY0.current + offsetY;
      if (annotations) {
        divRef.current.innerText = `${translation3.current[(axis + 1) % 3].toFixed(2)}, ${translation3.current[(axis + 2) % 3].toFixed(2)}`;
      }
      offsetMatrix2.makeTranslation(offsetX * e1.x + offsetY * e2.x, offsetX * e1.y + offsetY * e2.y, offsetX * e1.z + offsetY * e2.z);
      onDrag(offsetMatrix2);
    }
  }, [annotations, onDrag, isHovered, translation3, translationLimits, axis]);
  const onPointerUp = React132.useCallback((e) => {
    if (annotations) {
      divRef.current.style.display = "none";
    }
    e.stopPropagation();
    clickInfo.current = null;
    onDragEnd();
    camControls && (camControls.enabled = true);
    e.target.releasePointerCapture(e.pointerId);
  }, [annotations, camControls, onDragEnd]);
  const onPointerOut = React132.useCallback((e) => {
    e.stopPropagation();
    setIsHovered(false);
  }, []);
  const matrixL = React132.useMemo(() => {
    const dir1N = dir1.clone().normalize();
    const dir2N = dir2.clone().normalize();
    return new Matrix4().makeBasis(dir1N, dir2N, dir1N.clone().cross(dir2N));
  }, [dir1, dir2]);
  const pos1 = fixed ? 1 / 7 : scale3 / 7;
  const length = fixed ? 0.225 : scale3 * 0.225;
  const color = isHovered ? hoveredColor : axisColors[axis];
  const points = React132.useMemo(() => [new Vector3(0, 0, 0), new Vector3(0, length, 0), new Vector3(length, length, 0), new Vector3(length, 0, 0), new Vector3(0, 0, 0)], [length]);
  return React132.createElement("group", {
    ref: objRef,
    matrix: matrixL,
    matrixAutoUpdate: false
  }, annotations && React132.createElement(Html, {
    position: [0, 0, 0]
  }, React132.createElement("div", {
    style: {
      display: "none",
      background: "#151520",
      color: "white",
      padding: "6px 8px",
      borderRadius: 7,
      whiteSpace: "nowrap"
    },
    className: annotationsClass,
    ref: divRef
  })), React132.createElement("group", {
    position: [pos1 * 1.7, pos1 * 1.7, 0]
  }, React132.createElement("mesh", {
    visible: true,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onPointerOut,
    scale: length,
    userData,
    renderOrder
  }, React132.createElement("planeGeometry", null), React132.createElement("meshBasicMaterial", {
    transparent: true,
    depthTest,
    color,
    polygonOffset: true,
    polygonOffsetFactor: -10,
    side: DoubleSide,
    fog: false
  })), React132.createElement(Line, {
    position: [-length / 2, -length / 2, 0],
    transparent: true,
    depthTest,
    points,
    lineWidth,
    color,
    opacity,
    polygonOffset: true,
    polygonOffsetFactor: -10,
    userData,
    fog: false,
    renderOrder
  })));
};

// node_modules/@react-three/drei/web/pivotControls/ScalingSphere.js
var React133 = __toESM(require_react());
var vec12 = new Vector3();
var vec22 = new Vector3();
var calculateOffset2 = (clickPoint, normal2, rayStart, rayDir) => {
  const e1 = normal2.dot(normal2);
  const e2 = normal2.dot(clickPoint) - normal2.dot(rayStart);
  const e3 = normal2.dot(rayDir);
  if (e3 === 0) {
    return -e2 / e1;
  }
  vec12.copy(rayDir).multiplyScalar(e1 / e3).sub(normal2);
  vec22.copy(rayDir).multiplyScalar(e2 / e3).add(rayStart).sub(clickPoint);
  const offset = -vec12.dot(vec22) / vec12.dot(vec12);
  return offset;
};
var upV2 = new Vector3(0, 1, 0);
var scaleV = new Vector3();
var scaleMatrix = new Matrix4();
var ScalingSphere = ({
  direction: direction2,
  axis
}) => {
  const {
    scaleLimits,
    annotations,
    annotationsClass,
    depthTest,
    scale: scale3,
    lineWidth,
    fixed,
    axisColors,
    hoveredColor,
    opacity,
    renderOrder,
    onDragStart,
    onDrag,
    onDragEnd,
    userData
  } = React133.useContext(context11);
  const size = useThree((state) => state.size);
  const camControls = useThree((state) => state.controls);
  const divRef = React133.useRef(null);
  const objRef = React133.useRef(null);
  const meshRef = React133.useRef(null);
  const scale0 = React133.useRef(1);
  const scaleCur = React133.useRef(1);
  const clickInfo = React133.useRef(null);
  const [isHovered, setIsHovered] = React133.useState(false);
  const position2 = fixed ? 1.2 : 1.2 * scale3;
  const onPointerDown = React133.useCallback((e) => {
    if (annotations) {
      divRef.current.innerText = `${scaleCur.current.toFixed(2)}`;
      divRef.current.style.display = "block";
    }
    e.stopPropagation();
    const rotation3 = new Matrix4().extractRotation(objRef.current.matrixWorld);
    const clickPoint = e.point.clone();
    const origin = new Vector3().setFromMatrixPosition(objRef.current.matrixWorld);
    const dir = direction2.clone().applyMatrix4(rotation3).normalize();
    const mPLG = objRef.current.matrixWorld.clone();
    const mPLGInv = mPLG.clone().invert();
    const offsetMultiplier = fixed ? 1 / calculateScaleFactor(objRef.current.getWorldPosition(vec12), scale3, e.camera, size) : 1;
    clickInfo.current = {
      clickPoint,
      dir,
      mPLG,
      mPLGInv,
      offsetMultiplier
    };
    onDragStart({
      component: "Sphere",
      axis,
      origin,
      directions: [dir]
    });
    camControls && (camControls.enabled = false);
    e.target.setPointerCapture(e.pointerId);
  }, [annotations, camControls, direction2, onDragStart, axis, fixed, scale3, size]);
  const onPointerMove = React133.useCallback((e) => {
    e.stopPropagation();
    if (!isHovered) setIsHovered(true);
    if (clickInfo.current) {
      const {
        clickPoint,
        dir,
        mPLG,
        mPLGInv,
        offsetMultiplier
      } = clickInfo.current;
      const [min, max] = (scaleLimits == null ? void 0 : scaleLimits[axis]) || [1e-5, void 0];
      const offsetW = calculateOffset2(clickPoint, dir, e.ray.origin, e.ray.direction);
      const offsetL = offsetW * offsetMultiplier;
      const offsetH = fixed ? offsetL : offsetL / scale3;
      let upscale = Math.pow(2, offsetH * 0.2);
      if (e.shiftKey) {
        upscale = Math.round(upscale * 10) / 10;
      }
      upscale = Math.max(upscale, min / scale0.current);
      if (max !== void 0) {
        upscale = Math.min(upscale, max / scale0.current);
      }
      scaleCur.current = scale0.current * upscale;
      meshRef.current.position.set(0, position2 + offsetL, 0);
      if (annotations) {
        divRef.current.innerText = `${scaleCur.current.toFixed(2)}`;
      }
      scaleV.set(1, 1, 1);
      scaleV.setComponent(axis, upscale);
      scaleMatrix.makeScale(scaleV.x, scaleV.y, scaleV.z).premultiply(mPLG).multiply(mPLGInv);
      onDrag(scaleMatrix);
    }
  }, [annotations, position2, onDrag, isHovered, scaleLimits, axis]);
  const onPointerUp = React133.useCallback((e) => {
    if (annotations) {
      divRef.current.style.display = "none";
    }
    e.stopPropagation();
    scale0.current = scaleCur.current;
    clickInfo.current = null;
    meshRef.current.position.set(0, position2, 0);
    onDragEnd();
    camControls && (camControls.enabled = true);
    e.target.releasePointerCapture(e.pointerId);
  }, [annotations, camControls, onDragEnd, position2]);
  const onPointerOut = React133.useCallback((e) => {
    e.stopPropagation();
    setIsHovered(false);
  }, []);
  const {
    radius,
    matrixL
  } = React133.useMemo(() => {
    const radius2 = fixed ? lineWidth / scale3 * 1.8 : scale3 / 22.5;
    const quaternion = new Quaternion().setFromUnitVectors(upV2, direction2.clone().normalize());
    const matrixL2 = new Matrix4().makeRotationFromQuaternion(quaternion);
    return {
      radius: radius2,
      matrixL: matrixL2
    };
  }, [direction2, scale3, lineWidth, fixed]);
  const color = isHovered ? hoveredColor : axisColors[axis];
  return React133.createElement("group", {
    ref: objRef
  }, React133.createElement("group", {
    matrix: matrixL,
    matrixAutoUpdate: false,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onPointerOut
  }, annotations && React133.createElement(Html, {
    position: [0, position2 / 2, 0]
  }, React133.createElement("div", {
    style: {
      display: "none",
      background: "#151520",
      color: "white",
      padding: "6px 8px",
      borderRadius: 7,
      whiteSpace: "nowrap"
    },
    className: annotationsClass,
    ref: divRef
  })), React133.createElement("mesh", {
    ref: meshRef,
    position: [0, position2, 0],
    renderOrder,
    userData
  }, React133.createElement("sphereGeometry", {
    args: [radius, 12, 12]
  }), React133.createElement("meshBasicMaterial", {
    transparent: true,
    depthTest,
    color,
    opacity,
    polygonOffset: true,
    polygonOffsetFactor: -10
  }))));
};

// node_modules/@react-three/drei/web/pivotControls/index.js
var mL0 = new Matrix4();
var mW0 = new Matrix4();
var mP = new Matrix4();
var mPInv = new Matrix4();
var mW = new Matrix4();
var mL = new Matrix4();
var mL0Inv = new Matrix4();
var mdL = new Matrix4();
var mG = new Matrix4();
var bb = new Box3();
var bbObj = new Box3();
var vCenter = new Vector3();
var vSize = new Vector3();
var vAnchorOffset = new Vector3();
var vPosition = new Vector3();
var vScale = new Vector3();
var xDir = new Vector3(1, 0, 0);
var yDir = new Vector3(0, 1, 0);
var zDir = new Vector3(0, 0, 1);
var PivotControls = React134.forwardRef(({
  enabled = true,
  matrix: matrix3,
  onDragStart,
  onDrag,
  onDragEnd,
  autoTransform = true,
  anchor,
  disableAxes = false,
  disableSliders = false,
  disableRotations = false,
  disableScaling = false,
  activeAxes = [true, true, true],
  offset = [0, 0, 0],
  rotation: rotation3 = [0, 0, 0],
  scale: scale3 = 1,
  lineWidth = 4,
  fixed = false,
  translationLimits,
  rotationLimits,
  scaleLimits,
  depthTest = true,
  renderOrder = 500,
  axisColors = ["#ff2060", "#20df80", "#2080ff"],
  hoveredColor = "#ffff40",
  annotations = false,
  annotationsClass,
  opacity = 1,
  visible = true,
  userData,
  children,
  ...props
}, fRef) => {
  const invalidate = useThree((state) => state.invalidate);
  const parentRef = React134.useRef(null);
  const ref = React134.useRef(null);
  const gizmoRef = React134.useRef(null);
  const childrenRef = React134.useRef(null);
  const translation3 = React134.useRef([0, 0, 0]);
  const cameraScale = React134.useRef(new Vector3(1, 1, 1));
  const gizmoScale = React134.useRef(new Vector3(1, 1, 1));
  React134.useLayoutEffect(() => {
    if (!anchor) return;
    childrenRef.current.updateWorldMatrix(true, true);
    mPInv.copy(childrenRef.current.matrixWorld).invert();
    bb.makeEmpty();
    childrenRef.current.traverse((obj) => {
      if (!obj.geometry) return;
      if (!obj.geometry.boundingBox) obj.geometry.computeBoundingBox();
      mL.copy(obj.matrixWorld).premultiply(mPInv);
      bbObj.copy(obj.geometry.boundingBox);
      bbObj.applyMatrix4(mL);
      bb.union(bbObj);
    });
    vCenter.copy(bb.max).add(bb.min).multiplyScalar(0.5);
    vSize.copy(bb.max).sub(bb.min).multiplyScalar(0.5);
    vAnchorOffset.copy(vSize).multiply(new Vector3(...anchor)).add(vCenter);
    vPosition.set(...offset).add(vAnchorOffset);
    gizmoRef.current.position.copy(vPosition);
    invalidate();
  });
  const config = React134.useMemo(() => ({
    onDragStart: (props2) => {
      mL0.copy(ref.current.matrix);
      mW0.copy(ref.current.matrixWorld);
      onDragStart && onDragStart(props2);
      invalidate();
    },
    onDrag: (mdW) => {
      mP.copy(parentRef.current.matrixWorld);
      mPInv.copy(mP).invert();
      mW.copy(mW0).premultiply(mdW);
      mL.copy(mW).premultiply(mPInv);
      mL0Inv.copy(mL0).invert();
      mdL.copy(mL).multiply(mL0Inv);
      if (autoTransform) {
        ref.current.matrix.copy(mL);
      }
      onDrag && onDrag(mL, mdL, mW, mdW);
      invalidate();
    },
    onDragEnd: () => {
      if (onDragEnd) onDragEnd();
      invalidate();
    },
    translation: translation3,
    translationLimits,
    rotationLimits,
    axisColors,
    hoveredColor,
    opacity,
    scale: scale3,
    lineWidth,
    fixed,
    depthTest,
    renderOrder,
    userData,
    annotations,
    annotationsClass
  }), [onDragStart, onDrag, onDragEnd, translation3, translationLimits, rotationLimits, scaleLimits, depthTest, scale3, lineWidth, fixed, ...axisColors, hoveredColor, opacity, userData, autoTransform, annotations, annotationsClass]);
  const vec = new Vector3();
  useFrame((state) => {
    if (fixed) {
      const sf = calculateScaleFactor(gizmoRef.current.getWorldPosition(vec), scale3, state.camera, state.size);
      cameraScale.current.setScalar(sf);
    }
    if (matrix3 && matrix3 instanceof Matrix4) {
      ref.current.matrix = matrix3;
    }
    ref.current.updateWorldMatrix(true, true);
    mG.makeRotationFromEuler(gizmoRef.current.rotation).setPosition(gizmoRef.current.position).premultiply(ref.current.matrixWorld);
    gizmoScale.current.setFromMatrixScale(mG);
    vScale.copy(cameraScale.current).divide(gizmoScale.current);
    if (Math.abs(gizmoRef.current.scale.x - vScale.x) > 1e-4 || Math.abs(gizmoRef.current.scale.y - vScale.y) > 1e-4 || Math.abs(gizmoRef.current.scale.z - vScale.z) > 1e-4) {
      gizmoRef.current.scale.copy(vScale);
      state.invalidate();
    }
  });
  React134.useImperativeHandle(fRef, () => ref.current, []);
  return React134.createElement(context11.Provider, {
    value: config
  }, React134.createElement("group", {
    ref: parentRef
  }, React134.createElement("group", _extends({
    ref,
    matrix: matrix3,
    matrixAutoUpdate: false
  }, props), React134.createElement("group", {
    visible,
    ref: gizmoRef,
    position: offset,
    rotation: rotation3
  }, enabled && React134.createElement(React134.Fragment, null, !disableAxes && activeAxes[0] && React134.createElement(AxisArrow, {
    axis: 0,
    direction: xDir
  }), !disableAxes && activeAxes[1] && React134.createElement(AxisArrow, {
    axis: 1,
    direction: yDir
  }), !disableAxes && activeAxes[2] && React134.createElement(AxisArrow, {
    axis: 2,
    direction: zDir
  }), !disableSliders && activeAxes[0] && activeAxes[1] && React134.createElement(PlaneSlider, {
    axis: 2,
    dir1: xDir,
    dir2: yDir
  }), !disableSliders && activeAxes[0] && activeAxes[2] && React134.createElement(PlaneSlider, {
    axis: 1,
    dir1: zDir,
    dir2: xDir
  }), !disableSliders && activeAxes[2] && activeAxes[1] && React134.createElement(PlaneSlider, {
    axis: 0,
    dir1: yDir,
    dir2: zDir
  }), !disableRotations && activeAxes[0] && activeAxes[1] && React134.createElement(AxisRotator, {
    axis: 2,
    dir1: xDir,
    dir2: yDir
  }), !disableRotations && activeAxes[0] && activeAxes[2] && React134.createElement(AxisRotator, {
    axis: 1,
    dir1: zDir,
    dir2: xDir
  }), !disableRotations && activeAxes[2] && activeAxes[1] && React134.createElement(AxisRotator, {
    axis: 0,
    dir1: yDir,
    dir2: zDir
  }), !disableScaling && activeAxes[0] && React134.createElement(ScalingSphere, {
    axis: 0,
    direction: xDir
  }), !disableScaling && activeAxes[1] && React134.createElement(ScalingSphere, {
    axis: 1,
    direction: yDir
  }), !disableScaling && activeAxes[2] && React134.createElement(ScalingSphere, {
    axis: 2,
    direction: zDir
  }))), React134.createElement("group", {
    ref: childrenRef
  }, children))));
});

// node_modules/@react-three/drei/web/ScreenVideoTexture.js
var React135 = __toESM(require_react());
var import_react20 = __toESM(require_react());
var ScreenVideoTexture = (0, import_react20.forwardRef)(({
  options = {
    video: true
  },
  ...props
}, fref) => {
  const mediaStream = suspend(() => navigator.mediaDevices.getDisplayMedia(options), []);
  (0, import_react20.useEffect)(() => {
    return () => {
      mediaStream == null || mediaStream.getTracks().forEach((track) => track.stop());
      clear([]);
    };
  }, [mediaStream]);
  return React135.createElement(VideoTexture2, _extends({
    ref: fref
  }, props, {
    src: mediaStream
  }));
});

// node_modules/@react-three/drei/web/WebcamVideoTexture.js
var React136 = __toESM(require_react());
var import_react21 = __toESM(require_react());
var WebcamVideoTexture = (0, import_react21.forwardRef)(({
  constraints = {
    audio: false,
    video: {
      facingMode: "user"
    }
  },
  ...props
}, fref) => {
  const mediaStream = suspend(() => navigator.mediaDevices.getUserMedia(constraints), []);
  (0, import_react21.useEffect)(() => {
    return () => {
      mediaStream == null || mediaStream.getTracks().forEach((track) => track.stop());
      clear([]);
    };
  }, [mediaStream]);
  return React136.createElement(VideoTexture2, _extends({
    ref: fref
  }, props, {
    src: mediaStream
  }));
});

// node_modules/@react-three/drei/web/FaceControls.js
var React139 = __toESM(require_react());
var import_react23 = __toESM(require_react());

// node_modules/@react-three/drei/web/Facemesh.js
var React137 = __toESM(require_react());
var defaultLookAt = new Vector3(0, 0, -1);
var normal = (function() {
  const a = new Vector3();
  const b = new Vector3();
  const c = new Vector3();
  const ab = new Vector3();
  const ac = new Vector3();
  return function(v12, v22, v32, v5) {
    a.copy(v12);
    b.copy(v22);
    c.copy(v32);
    ab.copy(b).sub(a);
    ac.copy(c).sub(a);
    return v5.crossVectors(ac, ab).normalize();
  };
})();
function mean(v12, v22) {
  return v12.clone().add(v22).multiplyScalar(0.5);
}
var Facemesh = React137.forwardRef(({
  points = FacemeshDatas.SAMPLE_FACELANDMARKER_RESULT.faceLandmarks[0],
  face,
  facialTransformationMatrix,
  faceBlendshapes,
  offset,
  offsetScalar = 80,
  width,
  height,
  depth = 1,
  verticalTri = [159, 386, 152],
  origin,
  eyes = true,
  eyesAsOrigin = false,
  debug = false,
  children,
  ...props
}, fref) => {
  var _meshRef$current3;
  if (face) {
    points = face.keypoints;
    console.warn("Facemesh `face` prop is deprecated: use `points` instead");
  }
  const offsetRef = React137.useRef(null);
  const scaleRef = React137.useRef(null);
  const originRef = React137.useRef(null);
  const outerRef = React137.useRef(null);
  const meshRef = React137.useRef(null);
  const eyeRightRef = React137.useRef(null);
  const eyeLeftRef = React137.useRef(null);
  const [sightDir] = React137.useState(() => new Vector3());
  const [transform] = React137.useState(() => new Object3D());
  const [sightDirQuaternion] = React137.useState(() => new Quaternion());
  const [_origin] = React137.useState(() => new Vector3());
  const {
    invalidate
  } = useThree();
  React137.useEffect(() => {
    var _meshRef$current;
    (_meshRef$current = meshRef.current) == null || _meshRef$current.geometry.setIndex(FacemeshDatas.TRIANGULATION);
  }, []);
  const [bboxSize] = React137.useState(() => new Vector3());
  React137.useEffect(() => {
    var _meshRef$current2, _outerRef$current;
    const faceGeometry = (_meshRef$current2 = meshRef.current) == null ? void 0 : _meshRef$current2.geometry;
    if (!faceGeometry) return;
    faceGeometry.setFromPoints(points);
    faceGeometry.setDrawRange(0, FacemeshDatas.TRIANGULATION.length);
    if (facialTransformationMatrix) {
      transform.matrix.fromArray(facialTransformationMatrix.data);
      transform.matrix.decompose(transform.position, transform.quaternion, transform.scale);
      transform.rotation.y *= -1;
      transform.rotation.z *= -1;
      sightDirQuaternion.setFromEuler(transform.rotation);
      if (offset) {
        var _offsetRef$current;
        transform.position.y *= -1;
        transform.position.z *= -1;
        (_offsetRef$current = offsetRef.current) == null || _offsetRef$current.position.copy(transform.position.divideScalar(offsetScalar));
      } else {
        var _offsetRef$current2;
        (_offsetRef$current2 = offsetRef.current) == null || _offsetRef$current2.position.set(0, 0, 0);
      }
    } else {
      normal(points[verticalTri[0]], points[verticalTri[1]], points[verticalTri[2]], sightDir);
      sightDirQuaternion.setFromUnitVectors(defaultLookAt, sightDir);
    }
    const sightDirQuaternionInverse = sightDirQuaternion.clone().invert();
    faceGeometry.computeBoundingBox();
    if (debug) invalidate();
    faceGeometry.center();
    faceGeometry.applyQuaternion(sightDirQuaternionInverse);
    (_outerRef$current = outerRef.current) == null || _outerRef$current.setRotationFromQuaternion(sightDirQuaternion);
    if (eyes) {
      if (!faceBlendshapes) {
        console.warn("Facemesh `eyes` option only works if `faceBlendshapes` is provided: skipping.");
      } else {
        if (eyeRightRef.current && eyeLeftRef.current && originRef.current) {
          if (eyesAsOrigin) {
            const eyeRightSphere = eyeRightRef.current._computeSphere(faceGeometry);
            const eyeLeftSphere = eyeLeftRef.current._computeSphere(faceGeometry);
            const eyesCenter = mean(eyeRightSphere.center, eyeLeftSphere.center);
            origin = eyesCenter.negate();
            eyeRightRef.current._update(faceGeometry, faceBlendshapes, eyeRightSphere);
            eyeLeftRef.current._update(faceGeometry, faceBlendshapes, eyeLeftSphere);
          } else {
            eyeRightRef.current._update(faceGeometry, faceBlendshapes);
            eyeLeftRef.current._update(faceGeometry, faceBlendshapes);
          }
        }
      }
    }
    if (originRef.current) {
      if (origin !== void 0) {
        if (typeof origin === "number") {
          const position2 = faceGeometry.getAttribute("position");
          _origin.set(-position2.getX(origin), -position2.getY(origin), -position2.getZ(origin));
        } else if (origin.isVector3) {
          _origin.copy(origin);
        }
      } else {
        _origin.setScalar(0);
      }
      originRef.current.position.copy(_origin);
    }
    if (scaleRef.current) {
      let scale3 = 1;
      if (width || height || depth) {
        faceGeometry.boundingBox.getSize(bboxSize);
        if (width) scale3 = width / bboxSize.x;
        if (height) scale3 = height / bboxSize.y;
        if (depth) scale3 = depth / bboxSize.z;
      }
      scaleRef.current.scale.setScalar(scale3 !== 1 ? scale3 : 1);
    }
    faceGeometry.computeVertexNormals();
    faceGeometry.attributes.position.needsUpdate = true;
  }, [points, facialTransformationMatrix, faceBlendshapes, transform, offset, offsetScalar, width, height, depth, verticalTri, origin, eyes, debug, invalidate, sightDir, sightDirQuaternion, bboxSize, _origin]);
  const api = React137.useMemo(() => ({
    outerRef,
    meshRef,
    eyeRightRef,
    eyeLeftRef
  }), []);
  React137.useImperativeHandle(fref, () => api, [api]);
  const [meshBboxSize] = React137.useState(() => new Vector3());
  const bbox = (_meshRef$current3 = meshRef.current) == null ? void 0 : _meshRef$current3.geometry.boundingBox;
  const one = (bbox == null ? void 0 : bbox.getSize(meshBboxSize).z) || 1;
  return React137.createElement("group", props, React137.createElement("group", {
    ref: offsetRef
  }, React137.createElement("group", {
    ref: outerRef
  }, React137.createElement("group", {
    ref: scaleRef
  }, debug ? React137.createElement(React137.Fragment, null, React137.createElement("axesHelper", {
    args: [one]
  }), React137.createElement(Line, {
    points: [[0, 0, 0], [0, 0, -one]],
    color: 65535
  })) : null, React137.createElement("group", {
    ref: originRef
  }, eyes && faceBlendshapes && React137.createElement("group", {
    name: "eyes"
  }, React137.createElement(FacemeshEye, {
    side: "left",
    ref: eyeRightRef,
    debug
  }), React137.createElement(FacemeshEye, {
    side: "right",
    ref: eyeLeftRef,
    debug
  })), React137.createElement("mesh", {
    ref: meshRef,
    name: "face"
  }, children, debug ? React137.createElement(React137.Fragment, null, bbox && React137.createElement("box3Helper", {
    args: [bbox]
  })) : null))))));
});
var FacemeshEyeDefaults = {
  contourLandmarks: {
    right: [33, 133, 159, 145, 153],
    left: [263, 362, 386, 374, 380]
  },
  blendshapes: {
    right: [14, 16, 18, 12],
    // lookIn,lookOut, lookUp,lookDown
    left: [13, 15, 17, 11]
    // lookIn,lookOut, lookUp,lookDown
  },
  color: {
    right: "red",
    left: "#00ff00"
  },
  fov: {
    horizontal: 100,
    vertical: 90
  }
};
var FacemeshEye = React137.forwardRef(({
  side,
  debug = true
}, fref) => {
  const eyeMeshRef = React137.useRef(null);
  const irisDirRef = React137.useRef(null);
  const [sphere] = React137.useState(() => new Sphere());
  const _computeSphere = React137.useCallback((faceGeometry) => {
    const position2 = faceGeometry.getAttribute("position");
    const eyeContourLandmarks = FacemeshEyeDefaults.contourLandmarks[side];
    const eyeContourPoints = eyeContourLandmarks.map((i2) => new Vector3(position2.getX(i2), position2.getY(i2), position2.getZ(i2)));
    sphere.center.set(0, 0, 0);
    eyeContourPoints.forEach((v5) => sphere.center.add(v5));
    sphere.center.divideScalar(eyeContourPoints.length);
    sphere.radius = eyeContourPoints[0].sub(eyeContourPoints[1]).length() / 2;
    return sphere;
  }, [sphere, side]);
  const [rotation3] = React137.useState(() => new Euler());
  const _update = React137.useCallback((faceGeometry, faceBlendshapes, sphere2) => {
    if (eyeMeshRef.current) {
      var _sphere4;
      (_sphere4 = sphere2) !== null && _sphere4 !== void 0 ? _sphere4 : sphere2 = _computeSphere(faceGeometry);
      eyeMeshRef.current.position.copy(sphere2.center);
      eyeMeshRef.current.scale.setScalar(sphere2.radius);
    }
    if (faceBlendshapes && irisDirRef.current) {
      const blendshapes = FacemeshEyeDefaults.blendshapes[side];
      const lookIn = faceBlendshapes.categories[blendshapes[0]].score;
      const lookOut = faceBlendshapes.categories[blendshapes[1]].score;
      const lookUp = faceBlendshapes.categories[blendshapes[2]].score;
      const lookDown = faceBlendshapes.categories[blendshapes[3]].score;
      const hfov = FacemeshEyeDefaults.fov.horizontal * MathUtils.DEG2RAD;
      const vfov = FacemeshEyeDefaults.fov.vertical * MathUtils.DEG2RAD;
      const rx = hfov * 0.5 * (lookDown - lookUp);
      const ry = vfov * 0.5 * (lookIn - lookOut) * (side === "left" ? 1 : -1);
      rotation3.set(rx, ry, 0);
      irisDirRef.current.setRotationFromEuler(rotation3);
    }
  }, [_computeSphere, side, rotation3]);
  const api = React137.useMemo(() => ({
    eyeMeshRef,
    irisDirRef,
    _computeSphere,
    _update
  }), [_computeSphere, _update]);
  React137.useImperativeHandle(fref, () => api, [api]);
  const color = FacemeshEyeDefaults.color[side];
  return React137.createElement("group", null, React137.createElement("group", {
    ref: eyeMeshRef
  }, debug && React137.createElement("axesHelper", null), React137.createElement("group", {
    ref: irisDirRef
  }, React137.createElement(React137.Fragment, null, debug && React137.createElement(Line, {
    points: [[0, 0, 0], [0, 0, -2]],
    lineWidth: 1,
    color
  })))));
});
var FacemeshDatas = {
  // Extracted from: https://github.com/tensorflow/tfjs-models/blob/a8f500809f5afe38feea27870c77e7ba03a6ece4/face-landmarks-detection/demos/shared/triangulation.js
  // prettier-ignore
  TRIANGULATION: [127, 34, 139, 11, 0, 37, 232, 231, 120, 72, 37, 39, 128, 121, 47, 232, 121, 128, 104, 69, 67, 175, 171, 148, 157, 154, 155, 118, 50, 101, 73, 39, 40, 9, 151, 108, 48, 115, 131, 194, 204, 211, 74, 40, 185, 80, 42, 183, 40, 92, 186, 230, 229, 118, 202, 212, 214, 83, 18, 17, 76, 61, 146, 160, 29, 30, 56, 157, 173, 106, 204, 194, 135, 214, 192, 203, 165, 98, 21, 71, 68, 51, 45, 4, 144, 24, 23, 77, 146, 91, 205, 50, 187, 201, 200, 18, 91, 106, 182, 90, 91, 181, 85, 84, 17, 206, 203, 36, 148, 171, 140, 92, 40, 39, 193, 189, 244, 159, 158, 28, 247, 246, 161, 236, 3, 196, 54, 68, 104, 193, 168, 8, 117, 228, 31, 189, 193, 55, 98, 97, 99, 126, 47, 100, 166, 79, 218, 155, 154, 26, 209, 49, 131, 135, 136, 150, 47, 126, 217, 223, 52, 53, 45, 51, 134, 211, 170, 140, 67, 69, 108, 43, 106, 91, 230, 119, 120, 226, 130, 247, 63, 53, 52, 238, 20, 242, 46, 70, 156, 78, 62, 96, 46, 53, 63, 143, 34, 227, 173, 155, 133, 123, 117, 111, 44, 125, 19, 236, 134, 51, 216, 206, 205, 154, 153, 22, 39, 37, 167, 200, 201, 208, 36, 142, 100, 57, 212, 202, 20, 60, 99, 28, 158, 157, 35, 226, 113, 160, 159, 27, 204, 202, 210, 113, 225, 46, 43, 202, 204, 62, 76, 77, 137, 123, 116, 41, 38, 72, 203, 129, 142, 64, 98, 240, 49, 102, 64, 41, 73, 74, 212, 216, 207, 42, 74, 184, 169, 170, 211, 170, 149, 176, 105, 66, 69, 122, 6, 168, 123, 147, 187, 96, 77, 90, 65, 55, 107, 89, 90, 180, 101, 100, 120, 63, 105, 104, 93, 137, 227, 15, 86, 85, 129, 102, 49, 14, 87, 86, 55, 8, 9, 100, 47, 121, 145, 23, 22, 88, 89, 179, 6, 122, 196, 88, 95, 96, 138, 172, 136, 215, 58, 172, 115, 48, 219, 42, 80, 81, 195, 3, 51, 43, 146, 61, 171, 175, 199, 81, 82, 38, 53, 46, 225, 144, 163, 110, 246, 33, 7, 52, 65, 66, 229, 228, 117, 34, 127, 234, 107, 108, 69, 109, 108, 151, 48, 64, 235, 62, 78, 191, 129, 209, 126, 111, 35, 143, 163, 161, 246, 117, 123, 50, 222, 65, 52, 19, 125, 141, 221, 55, 65, 3, 195, 197, 25, 7, 33, 220, 237, 44, 70, 71, 139, 122, 193, 245, 247, 130, 33, 71, 21, 162, 153, 158, 159, 170, 169, 150, 188, 174, 196, 216, 186, 92, 144, 160, 161, 2, 97, 167, 141, 125, 241, 164, 167, 37, 72, 38, 12, 145, 159, 160, 38, 82, 13, 63, 68, 71, 226, 35, 111, 158, 153, 154, 101, 50, 205, 206, 92, 165, 209, 198, 217, 165, 167, 97, 220, 115, 218, 133, 112, 243, 239, 238, 241, 214, 135, 169, 190, 173, 133, 171, 208, 32, 125, 44, 237, 86, 87, 178, 85, 86, 179, 84, 85, 180, 83, 84, 181, 201, 83, 182, 137, 93, 132, 76, 62, 183, 61, 76, 184, 57, 61, 185, 212, 57, 186, 214, 207, 187, 34, 143, 156, 79, 239, 237, 123, 137, 177, 44, 1, 4, 201, 194, 32, 64, 102, 129, 213, 215, 138, 59, 166, 219, 242, 99, 97, 2, 94, 141, 75, 59, 235, 24, 110, 228, 25, 130, 226, 23, 24, 229, 22, 23, 230, 26, 22, 231, 112, 26, 232, 189, 190, 243, 221, 56, 190, 28, 56, 221, 27, 28, 222, 29, 27, 223, 30, 29, 224, 247, 30, 225, 238, 79, 20, 166, 59, 75, 60, 75, 240, 147, 177, 215, 20, 79, 166, 187, 147, 213, 112, 233, 244, 233, 128, 245, 128, 114, 188, 114, 217, 174, 131, 115, 220, 217, 198, 236, 198, 131, 134, 177, 132, 58, 143, 35, 124, 110, 163, 7, 228, 110, 25, 356, 389, 368, 11, 302, 267, 452, 350, 349, 302, 303, 269, 357, 343, 277, 452, 453, 357, 333, 332, 297, 175, 152, 377, 384, 398, 382, 347, 348, 330, 303, 304, 270, 9, 336, 337, 278, 279, 360, 418, 262, 431, 304, 408, 409, 310, 415, 407, 270, 409, 410, 450, 348, 347, 422, 430, 434, 313, 314, 17, 306, 307, 375, 387, 388, 260, 286, 414, 398, 335, 406, 418, 364, 367, 416, 423, 358, 327, 251, 284, 298, 281, 5, 4, 373, 374, 253, 307, 320, 321, 425, 427, 411, 421, 313, 18, 321, 405, 406, 320, 404, 405, 315, 16, 17, 426, 425, 266, 377, 400, 369, 322, 391, 269, 417, 465, 464, 386, 257, 258, 466, 260, 388, 456, 399, 419, 284, 332, 333, 417, 285, 8, 346, 340, 261, 413, 441, 285, 327, 460, 328, 355, 371, 329, 392, 439, 438, 382, 341, 256, 429, 420, 360, 364, 394, 379, 277, 343, 437, 443, 444, 283, 275, 440, 363, 431, 262, 369, 297, 338, 337, 273, 375, 321, 450, 451, 349, 446, 342, 467, 293, 334, 282, 458, 461, 462, 276, 353, 383, 308, 324, 325, 276, 300, 293, 372, 345, 447, 382, 398, 362, 352, 345, 340, 274, 1, 19, 456, 248, 281, 436, 427, 425, 381, 256, 252, 269, 391, 393, 200, 199, 428, 266, 330, 329, 287, 273, 422, 250, 462, 328, 258, 286, 384, 265, 353, 342, 387, 259, 257, 424, 431, 430, 342, 353, 276, 273, 335, 424, 292, 325, 307, 366, 447, 345, 271, 303, 302, 423, 266, 371, 294, 455, 460, 279, 278, 294, 271, 272, 304, 432, 434, 427, 272, 407, 408, 394, 430, 431, 395, 369, 400, 334, 333, 299, 351, 417, 168, 352, 280, 411, 325, 319, 320, 295, 296, 336, 319, 403, 404, 330, 348, 349, 293, 298, 333, 323, 454, 447, 15, 16, 315, 358, 429, 279, 14, 15, 316, 285, 336, 9, 329, 349, 350, 374, 380, 252, 318, 402, 403, 6, 197, 419, 318, 319, 325, 367, 364, 365, 435, 367, 397, 344, 438, 439, 272, 271, 311, 195, 5, 281, 273, 287, 291, 396, 428, 199, 311, 271, 268, 283, 444, 445, 373, 254, 339, 263, 466, 249, 282, 334, 296, 449, 347, 346, 264, 447, 454, 336, 296, 299, 338, 10, 151, 278, 439, 455, 292, 407, 415, 358, 371, 355, 340, 345, 372, 390, 249, 466, 346, 347, 280, 442, 443, 282, 19, 94, 370, 441, 442, 295, 248, 419, 197, 263, 255, 359, 440, 275, 274, 300, 383, 368, 351, 412, 465, 263, 467, 466, 301, 368, 389, 380, 374, 386, 395, 378, 379, 412, 351, 419, 436, 426, 322, 373, 390, 388, 2, 164, 393, 370, 462, 461, 164, 0, 267, 302, 11, 12, 374, 373, 387, 268, 12, 13, 293, 300, 301, 446, 261, 340, 385, 384, 381, 330, 266, 425, 426, 423, 391, 429, 355, 437, 391, 327, 326, 440, 457, 438, 341, 382, 362, 459, 457, 461, 434, 430, 394, 414, 463, 362, 396, 369, 262, 354, 461, 457, 316, 403, 402, 315, 404, 403, 314, 405, 404, 313, 406, 405, 421, 418, 406, 366, 401, 361, 306, 408, 407, 291, 409, 408, 287, 410, 409, 432, 436, 410, 434, 416, 411, 264, 368, 383, 309, 438, 457, 352, 376, 401, 274, 275, 4, 421, 428, 262, 294, 327, 358, 433, 416, 367, 289, 455, 439, 462, 370, 326, 2, 326, 370, 305, 460, 455, 254, 449, 448, 255, 261, 446, 253, 450, 449, 252, 451, 450, 256, 452, 451, 341, 453, 452, 413, 464, 463, 441, 413, 414, 258, 442, 441, 257, 443, 442, 259, 444, 443, 260, 445, 444, 467, 342, 445, 459, 458, 250, 289, 392, 290, 290, 328, 460, 376, 433, 435, 250, 290, 392, 411, 416, 433, 341, 463, 464, 453, 464, 465, 357, 465, 412, 343, 412, 399, 360, 363, 440, 437, 399, 456, 420, 456, 363, 401, 435, 288, 372, 383, 353, 339, 255, 249, 448, 261, 255, 133, 243, 190, 133, 155, 112, 33, 246, 247, 33, 130, 25, 398, 384, 286, 362, 398, 414, 362, 463, 341, 263, 359, 467, 263, 249, 255, 466, 467, 260, 75, 60, 166, 238, 239, 79, 162, 127, 139, 72, 11, 37, 121, 232, 120, 73, 72, 39, 114, 128, 47, 233, 232, 128, 103, 104, 67, 152, 175, 148, 173, 157, 155, 119, 118, 101, 74, 73, 40, 107, 9, 108, 49, 48, 131, 32, 194, 211, 184, 74, 185, 191, 80, 183, 185, 40, 186, 119, 230, 118, 210, 202, 214, 84, 83, 17, 77, 76, 146, 161, 160, 30, 190, 56, 173, 182, 106, 194, 138, 135, 192, 129, 203, 98, 54, 21, 68, 5, 51, 4, 145, 144, 23, 90, 77, 91, 207, 205, 187, 83, 201, 18, 181, 91, 182, 180, 90, 181, 16, 85, 17, 205, 206, 36, 176, 148, 140, 165, 92, 39, 245, 193, 244, 27, 159, 28, 30, 247, 161, 174, 236, 196, 103, 54, 104, 55, 193, 8, 111, 117, 31, 221, 189, 55, 240, 98, 99, 142, 126, 100, 219, 166, 218, 112, 155, 26, 198, 209, 131, 169, 135, 150, 114, 47, 217, 224, 223, 53, 220, 45, 134, 32, 211, 140, 109, 67, 108, 146, 43, 91, 231, 230, 120, 113, 226, 247, 105, 63, 52, 241, 238, 242, 124, 46, 156, 95, 78, 96, 70, 46, 63, 116, 143, 227, 116, 123, 111, 1, 44, 19, 3, 236, 51, 207, 216, 205, 26, 154, 22, 165, 39, 167, 199, 200, 208, 101, 36, 100, 43, 57, 202, 242, 20, 99, 56, 28, 157, 124, 35, 113, 29, 160, 27, 211, 204, 210, 124, 113, 46, 106, 43, 204, 96, 62, 77, 227, 137, 116, 73, 41, 72, 36, 203, 142, 235, 64, 240, 48, 49, 64, 42, 41, 74, 214, 212, 207, 183, 42, 184, 210, 169, 211, 140, 170, 176, 104, 105, 69, 193, 122, 168, 50, 123, 187, 89, 96, 90, 66, 65, 107, 179, 89, 180, 119, 101, 120, 68, 63, 104, 234, 93, 227, 16, 15, 85, 209, 129, 49, 15, 14, 86, 107, 55, 9, 120, 100, 121, 153, 145, 22, 178, 88, 179, 197, 6, 196, 89, 88, 96, 135, 138, 136, 138, 215, 172, 218, 115, 219, 41, 42, 81, 5, 195, 51, 57, 43, 61, 208, 171, 199, 41, 81, 38, 224, 53, 225, 24, 144, 110, 105, 52, 66, 118, 229, 117, 227, 34, 234, 66, 107, 69, 10, 109, 151, 219, 48, 235, 183, 62, 191, 142, 129, 126, 116, 111, 143, 7, 163, 246, 118, 117, 50, 223, 222, 52, 94, 19, 141, 222, 221, 65, 196, 3, 197, 45, 220, 44, 156, 70, 139, 188, 122, 245, 139, 71, 162, 145, 153, 159, 149, 170, 150, 122, 188, 196, 206, 216, 92, 163, 144, 161, 164, 2, 167, 242, 141, 241, 0, 164, 37, 11, 72, 12, 144, 145, 160, 12, 38, 13, 70, 63, 71, 31, 226, 111, 157, 158, 154, 36, 101, 205, 203, 206, 165, 126, 209, 217, 98, 165, 97, 237, 220, 218, 237, 239, 241, 210, 214, 169, 140, 171, 32, 241, 125, 237, 179, 86, 178, 180, 85, 179, 181, 84, 180, 182, 83, 181, 194, 201, 182, 177, 137, 132, 184, 76, 183, 185, 61, 184, 186, 57, 185, 216, 212, 186, 192, 214, 187, 139, 34, 156, 218, 79, 237, 147, 123, 177, 45, 44, 4, 208, 201, 32, 98, 64, 129, 192, 213, 138, 235, 59, 219, 141, 242, 97, 97, 2, 141, 240, 75, 235, 229, 24, 228, 31, 25, 226, 230, 23, 229, 231, 22, 230, 232, 26, 231, 233, 112, 232, 244, 189, 243, 189, 221, 190, 222, 28, 221, 223, 27, 222, 224, 29, 223, 225, 30, 224, 113, 247, 225, 99, 60, 240, 213, 147, 215, 60, 20, 166, 192, 187, 213, 243, 112, 244, 244, 233, 245, 245, 128, 188, 188, 114, 174, 134, 131, 220, 174, 217, 236, 236, 198, 134, 215, 177, 58, 156, 143, 124, 25, 110, 7, 31, 228, 25, 264, 356, 368, 0, 11, 267, 451, 452, 349, 267, 302, 269, 350, 357, 277, 350, 452, 357, 299, 333, 297, 396, 175, 377, 381, 384, 382, 280, 347, 330, 269, 303, 270, 151, 9, 337, 344, 278, 360, 424, 418, 431, 270, 304, 409, 272, 310, 407, 322, 270, 410, 449, 450, 347, 432, 422, 434, 18, 313, 17, 291, 306, 375, 259, 387, 260, 424, 335, 418, 434, 364, 416, 391, 423, 327, 301, 251, 298, 275, 281, 4, 254, 373, 253, 375, 307, 321, 280, 425, 411, 200, 421, 18, 335, 321, 406, 321, 320, 405, 314, 315, 17, 423, 426, 266, 396, 377, 369, 270, 322, 269, 413, 417, 464, 385, 386, 258, 248, 456, 419, 298, 284, 333, 168, 417, 8, 448, 346, 261, 417, 413, 285, 326, 327, 328, 277, 355, 329, 309, 392, 438, 381, 382, 256, 279, 429, 360, 365, 364, 379, 355, 277, 437, 282, 443, 283, 281, 275, 363, 395, 431, 369, 299, 297, 337, 335, 273, 321, 348, 450, 349, 359, 446, 467, 283, 293, 282, 250, 458, 462, 300, 276, 383, 292, 308, 325, 283, 276, 293, 264, 372, 447, 346, 352, 340, 354, 274, 19, 363, 456, 281, 426, 436, 425, 380, 381, 252, 267, 269, 393, 421, 200, 428, 371, 266, 329, 432, 287, 422, 290, 250, 328, 385, 258, 384, 446, 265, 342, 386, 387, 257, 422, 424, 430, 445, 342, 276, 422, 273, 424, 306, 292, 307, 352, 366, 345, 268, 271, 302, 358, 423, 371, 327, 294, 460, 331, 279, 294, 303, 271, 304, 436, 432, 427, 304, 272, 408, 395, 394, 431, 378, 395, 400, 296, 334, 299, 6, 351, 168, 376, 352, 411, 307, 325, 320, 285, 295, 336, 320, 319, 404, 329, 330, 349, 334, 293, 333, 366, 323, 447, 316, 15, 315, 331, 358, 279, 317, 14, 316, 8, 285, 9, 277, 329, 350, 253, 374, 252, 319, 318, 403, 351, 6, 419, 324, 318, 325, 397, 367, 365, 288, 435, 397, 278, 344, 439, 310, 272, 311, 248, 195, 281, 375, 273, 291, 175, 396, 199, 312, 311, 268, 276, 283, 445, 390, 373, 339, 295, 282, 296, 448, 449, 346, 356, 264, 454, 337, 336, 299, 337, 338, 151, 294, 278, 455, 308, 292, 415, 429, 358, 355, 265, 340, 372, 388, 390, 466, 352, 346, 280, 295, 442, 282, 354, 19, 370, 285, 441, 295, 195, 248, 197, 457, 440, 274, 301, 300, 368, 417, 351, 465, 251, 301, 389, 385, 380, 386, 394, 395, 379, 399, 412, 419, 410, 436, 322, 387, 373, 388, 326, 2, 393, 354, 370, 461, 393, 164, 267, 268, 302, 12, 386, 374, 387, 312, 268, 13, 298, 293, 301, 265, 446, 340, 380, 385, 381, 280, 330, 425, 322, 426, 391, 420, 429, 437, 393, 391, 326, 344, 440, 438, 458, 459, 461, 364, 434, 394, 428, 396, 262, 274, 354, 457, 317, 316, 402, 316, 315, 403, 315, 314, 404, 314, 313, 405, 313, 421, 406, 323, 366, 361, 292, 306, 407, 306, 291, 408, 291, 287, 409, 287, 432, 410, 427, 434, 411, 372, 264, 383, 459, 309, 457, 366, 352, 401, 1, 274, 4, 418, 421, 262, 331, 294, 358, 435, 433, 367, 392, 289, 439, 328, 462, 326, 94, 2, 370, 289, 305, 455, 339, 254, 448, 359, 255, 446, 254, 253, 449, 253, 252, 450, 252, 256, 451, 256, 341, 452, 414, 413, 463, 286, 441, 414, 286, 258, 441, 258, 257, 442, 257, 259, 443, 259, 260, 444, 260, 467, 445, 309, 459, 250, 305, 289, 290, 305, 290, 460, 401, 376, 435, 309, 250, 392, 376, 411, 433, 453, 341, 464, 357, 453, 465, 343, 357, 412, 437, 343, 399, 344, 360, 440, 420, 437, 456, 360, 420, 363, 361, 401, 288, 265, 372, 353, 390, 339, 249, 339, 448, 255],
  // My face as default (captured with a 640x480 webcam)
  // prettier-ignore
  SAMPLE_FACE: {
    "keypoints": [{
      "x": 356.2804412841797,
      "y": 295.1960563659668,
      "z": -23.786449432373047,
      "name": "lips"
    }, {
      "x": 354.8859405517578,
      "y": 264.69520568847656,
      "z": -36.718435287475586
    }, {
      "x": 355.2180862426758,
      "y": 275.3360366821289,
      "z": -21.183712482452393
    }, {
      "x": 347.349853515625,
      "y": 242.4400234222412,
      "z": -25.093655586242676
    }, {
      "x": 354.40135955810547,
      "y": 256.67933464050293,
      "z": -38.23572635650635
    }, {
      "x": 353.7689971923828,
      "y": 247.54886627197266,
      "z": -34.5475435256958
    }, {
      "x": 352.1288299560547,
      "y": 227.34312057495117,
      "z": -13.095386028289795
    }, {
      "x": 303.5013198852539,
      "y": 234.67002868652344,
      "z": 12.500141859054565,
      "name": "rightEye"
    }, {
      "x": 351.09378814697266,
      "y": 211.87547206878662,
      "z": -6.413471698760986
    }, {
      "x": 350.7115936279297,
      "y": 202.1251630783081,
      "z": -6.413471698760986
    }, {
      "x": 348.33667755126953,
      "y": 168.7741756439209,
      "z": 6.483500003814697,
      "name": "faceOval"
    }, {
      "x": 356.4806365966797,
      "y": 299.2995357513428,
      "z": -23.144519329071045
    }, {
      "x": 356.5511703491211,
      "y": 302.66146659851074,
      "z": -21.020312309265137
    }, {
      "x": 356.6239547729492,
      "y": 304.1536331176758,
      "z": -18.137459754943848,
      "name": "lips"
    }, {
      "x": 356.5807342529297,
      "y": 305.1840591430664,
      "z": -18.767719268798828,
      "name": "lips"
    }, {
      "x": 356.8241500854492,
      "y": 308.25711250305176,
      "z": -20.16829490661621
    }, {
      "x": 357.113037109375,
      "y": 312.26277351379395,
      "z": -22.10575819015503
    }, {
      "x": 357.34962463378906,
      "y": 317.1123218536377,
      "z": -21.837315559387207,
      "name": "lips"
    }, {
      "x": 357.6658630371094,
      "y": 325.51036834716797,
      "z": -16.27002477645874
    }, {
      "x": 355.0201416015625,
      "y": 269.36279296875,
      "z": -33.73054027557373
    }, {
      "x": 348.5237503051758,
      "y": 270.33411026000977,
      "z": -24.93025302886963
    }, {
      "x": 279.97331619262695,
      "y": 213.24176788330078,
      "z": 47.759642601013184,
      "name": "faceOval"
    }, {
      "x": 322.66529083251953,
      "y": 238.5027265548706,
      "z": 5.535193085670471
    }, {
      "x": 316.0983657836914,
      "y": 239.94489669799805,
      "z": 5.777376294136047
    }, {
      "x": 309.9431610107422,
      "y": 240.24518966674805,
      "z": 7.510589361190796
    }, {
      "x": 301.31994247436523,
      "y": 237.86138534545898,
      "z": 13.118728399276733
    }, {
      "x": 328.14266204833984,
      "y": 235.80496788024902,
      "z": 6.646900177001953
    }, {
      "x": 313.7326431274414,
      "y": 222.11161136627197,
      "z": 3.9887237548828125
    }, {
      "x": 320.45196533203125,
      "y": 221.87729358673096,
      "z": 4.601476192474365
    }, {
      "x": 307.35679626464844,
      "y": 223.63793849945068,
      "z": 5.932023525238037
    }, {
      "x": 303.0031204223633,
      "y": 226.3743782043457,
      "z": 8.479321002960205
    }, {
      "x": 296.80023193359375,
      "y": 242.94299125671387,
      "z": 15.931552648544312
    }, {
      "x": 332.2352981567383,
      "y": 340.77341079711914,
      "z": -10.165848731994629
    }, {
      "x": 301.38587951660156,
      "y": 233.46447944641113,
      "z": 14.764405488967896,
      "name": "rightEye"
    }, {
      "x": 279.0147018432617,
      "y": 244.37155723571777,
      "z": 45.77549457550049
    }, {
      "x": 289.60548400878906,
      "y": 239.1807460784912,
      "z": 23.191204071044922
    }, {
      "x": 320.32257080078125,
      "y": 267.1292781829834,
      "z": -4.954537749290466
    }, {
      "x": 347.64583587646484,
      "y": 294.4955062866211,
      "z": -23.062820434570312,
      "name": "lips"
    }, {
      "x": 349.28138732910156,
      "y": 303.1095886230469,
      "z": -20.238323211669922
    }, {
      "x": 338.9453125,
      "y": 298.19186210632324,
      "z": -19.456336498260498,
      "name": "lips"
    }, {
      "x": 333.36788177490234,
      "y": 302.6706790924072,
      "z": -14.776077270507812,
      "name": "lips"
    }, {
      "x": 342.89188385009766,
      "y": 304.3561363220215,
      "z": -17.752301692962646
    }, {
      "x": 337.7375030517578,
      "y": 306.0098361968994,
      "z": -13.410515785217285
    }, {
      "x": 325.6159210205078,
      "y": 316.22995376586914,
      "z": -6.681914925575256
    }, {
      "x": 349.0104675292969,
      "y": 264.9818515777588,
      "z": -36.274919509887695
    }, {
      "x": 347.7138900756836,
      "y": 257.5664806365967,
      "z": -37.67549514770508
    }, {
      "x": 291.79357528686523,
      "y": 218.88171672821045,
      "z": 11.578094959259033,
      "name": "rightEyebrow"
    }, {
      "x": 332.2689437866211,
      "y": 247.56946563720703,
      "z": -3.3730539679527283
    }, {
      "x": 332.0074462890625,
      "y": 267.1201229095459,
      "z": -19.969879388809204
    }, {
      "x": 331.27952575683594,
      "y": 263.6967658996582,
      "z": -17.47218608856201
    }, {
      "x": 301.04373931884766,
      "y": 269.56552505493164,
      "z": 3.61815482378006
    }, {
      "x": 347.4863815307617,
      "y": 249.0706443786621,
      "z": -32.633421421051025
    }, {
      "x": 307.26118087768555,
      "y": 208.2646894454956,
      "z": 1.1591226607561111,
      "name": "rightEyebrow"
    }, {
      "x": 297.91919708251953,
      "y": 212.22604751586914,
      "z": 5.914516448974609,
      "name": "rightEyebrow"
    }, {
      "x": 285.1651382446289,
      "y": 197.98450469970703,
      "z": 36.391637325286865,
      "name": "faceOval"
    }, {
      "x": 337.04097747802734,
      "y": 211.25229835510254,
      "z": -4.548954665660858
    }, {
      "x": 326.5912628173828,
      "y": 223.16698551177979,
      "z": 6.670243740081787
    }, {
      "x": 320.05664825439453,
      "y": 309.5834255218506,
      "z": -4.055835008621216
    }, {
      "x": 289.6866226196289,
      "y": 314.617395401001,
      "z": 53.875489234924316,
      "name": "faceOval"
    }, {
      "x": 337.4256896972656,
      "y": 270.8755302429199,
      "z": -17.67060160636902
    }, {
      "x": 343.69922637939453,
      "y": 273.0000400543213,
      "z": -18.756048679351807
    }, {
      "x": 327.4242401123047,
      "y": 309.22399520874023,
      "z": -4.703601002693176,
      "name": "lips"
    }, {
      "x": 330.37220001220703,
      "y": 308.3323001861572,
      "z": -6.442649960517883
    }, {
      "x": 293.87027740478516,
      "y": 207.7961826324463,
      "z": 9.821539521217346,
      "name": "rightEyebrow"
    }, {
      "x": 332.11437225341797,
      "y": 271.22812271118164,
      "z": -16.64351224899292
    }, {
      "x": 320.1197814941406,
      "y": 207.40366458892822,
      "z": -2.48164564371109,
      "name": "rightEyebrow"
    }, {
      "x": 318.59575271606445,
      "y": 201.07443809509277,
      "z": -3.110446035861969,
      "name": "rightEyebrow"
    }, {
      "x": 310.72303771972656,
      "y": 175.75075149536133,
      "z": 13.328815698623657,
      "name": "faceOval"
    }, {
      "x": 289.67578887939453,
      "y": 202.29835510253906,
      "z": 21.370456218719482
    }, {
      "x": 315.30879974365234,
      "y": 187.35260009765625,
      "z": 5.0304025411605835
    }, {
      "x": 287.8936767578125,
      "y": 216.54793739318848,
      "z": 17.81065821647644,
      "name": "rightEyebrow"
    }, {
      "x": 283.9391899108887,
      "y": 215.01142501831055,
      "z": 32.04984903335571
    }, {
      "x": 348.35330963134766,
      "y": 299.4155788421631,
      "z": -22.47924566268921
    }, {
      "x": 341.1790466308594,
      "y": 301.8221855163574,
      "z": -18.977805376052856
    }, {
      "x": 335.69713592529297,
      "y": 304.4266891479492,
      "z": -14.682706594467163
    }, {
      "x": 339.4615173339844,
      "y": 272.3654365539551,
      "z": -16.38674020767212
    }, {
      "x": 328.99600982666016,
      "y": 308.86685371398926,
      "z": -5.616893768310547
    }, {
      "x": 332.00313568115234,
      "y": 309.1875743865967,
      "z": -10.335084199905396
    }, {
      "x": 331.0068130493164,
      "y": 307.9274368286133,
      "z": -6.681914925575256,
      "name": "lips"
    }, {
      "x": 341.13792419433594,
      "y": 266.4876937866211,
      "z": -26.56425952911377
    }, {
      "x": 339.02950286865234,
      "y": 305.6663703918457,
      "z": -12.33674168586731,
      "name": "lips"
    }, {
      "x": 344.22935485839844,
      "y": 304.9452781677246,
      "z": -15.161235332489014,
      "name": "lips"
    }, {
      "x": 350.1844024658203,
      "y": 304.374303817749,
      "z": -17.5305438041687,
      "name": "lips"
    }, {
      "x": 348.52630615234375,
      "y": 325.9562301635742,
      "z": -16.164982318878174
    }, {
      "x": 348.6581802368164,
      "y": 317.1624183654785,
      "z": -21.510512828826904,
      "name": "lips"
    }, {
      "x": 348.9766311645508,
      "y": 312.1923065185547,
      "z": -21.708929538726807
    }, {
      "x": 349.2427444458008,
      "y": 308.0660820007324,
      "z": -19.643079042434692
    }, {
      "x": 349.67491149902344,
      "y": 305.42747497558594,
      "z": -18.16080331802368,
      "name": "lips"
    }, {
      "x": 337.95589447021484,
      "y": 306.6535949707031,
      "z": -12.803598642349243,
      "name": "lips"
    }, {
      "x": 337.06878662109375,
      "y": 307.63169288635254,
      "z": -14.274203777313232
    }, {
      "x": 335.77449798583984,
      "y": 309.8449516296387,
      "z": -15.698124170303345
    }, {
      "x": 334.6099090576172,
      "y": 312.7997016906738,
      "z": -14.764405488967896,
      "name": "lips"
    }, {
      "x": 327.2330856323242,
      "y": 293.80866050720215,
      "z": -11.864047050476074
    }, {
      "x": 280.97679138183594,
      "y": 279.79928970336914,
      "z": 68.90834331512451,
      "name": "faceOval"
    }, {
      "x": 355.13843536376953,
      "y": 271.7875671386719,
      "z": -25.350427627563477
    }, {
      "x": 334.7235870361328,
      "y": 307.4656391143799,
      "z": -9.302158951759338,
      "name": "lips"
    }, {
      "x": 333.5293960571289,
      "y": 307.89782524108887,
      "z": -10.200862884521484
    }, {
      "x": 346.29688262939453,
      "y": 276.4256286621094,
      "z": -19.748122692108154
    }, {
      "x": 335.16246795654297,
      "y": 276.22097969055176,
      "z": -12.313398122787476
    }, {
      "x": 345.09132385253906,
      "y": 274.7082996368408,
      "z": -19.304605722427368
    }, {
      "x": 325.4267883300781,
      "y": 252.95130729675293,
      "z": -1.6661019623279572
    }, {
      "x": 315.347843170166,
      "y": 259.05200958251953,
      "z": -0.25604281574487686
    }, {
      "x": 330.44933319091797,
      "y": 267.7570152282715,
      "z": -14.017432928085327
    }, {
      "x": 294.96768951416016,
      "y": 185.26001930236816,
      "z": 23.903164863586426,
      "name": "faceOval"
    }, {
      "x": 299.63531494140625,
      "y": 192.7913761138916,
      "z": 12.640198469161987
    }, {
      "x": 304.5452117919922,
      "y": 202.4142837524414,
      "z": 3.244667649269104,
      "name": "rightEyebrow"
    }, {
      "x": 331.6915512084961,
      "y": 320.0467872619629,
      "z": -10.632705688476562
    }, {
      "x": 334.5911407470703,
      "y": 201.27566814422607,
      "z": -6.133356094360352,
      "name": "rightEyebrow"
    }, {
      "x": 331.4815902709961,
      "y": 185.44180870056152,
      "z": 0.6627205014228821
    }, {
      "x": 328.05816650390625,
      "y": 170.8385467529297,
      "z": 7.358860373497009,
      "name": "faceOval"
    }, {
      "x": 304.49764251708984,
      "y": 239.76297855377197,
      "z": 10.387605428695679
    }, {
      "x": 290.6382179260254,
      "y": 248.85257720947266,
      "z": 19.03616428375244
    }, {
      "x": 331.5682601928711,
      "y": 233.20727348327637,
      "z": 7.837390303611755
    }, {
      "x": 295.5115509033203,
      "y": 228.9834451675415,
      "z": 14.41426157951355
    }, {
      "x": 336.94332122802734,
      "y": 241.8259334564209,
      "z": -5.27842104434967
    }, {
      "x": 336.2792205810547,
      "y": 262.7049922943115,
      "z": -26.12074375152588
    }, {
      "x": 284.4102478027344,
      "y": 255.3262710571289,
      "z": 25.467140674591064
    }, {
      "x": 295.1420593261719,
      "y": 253.02655220031738,
      "z": 12.430112361907959
    }, {
      "x": 303.5196113586426,
      "y": 254.20703887939453,
      "z": 6.139191389083862
    }, {
      "x": 315.73450088500977,
      "y": 251.64799690246582,
      "z": 3.3788898587226868
    }, {
      "x": 324.69661712646484,
      "y": 247.56494522094727,
      "z": 2.3328344523906708
    }, {
      "x": 331.57970428466797,
      "y": 243.02241325378418,
      "z": 1.1423448473215103
    }, {
      "x": 345.6210708618164,
      "y": 229.9976634979248,
      "z": -10.825285911560059
    }, {
      "x": 286.26644134521484,
      "y": 270.37991523742676,
      "z": 21.708929538726807
    }, {
      "x": 290.2525520324707,
      "y": 228.4921360015869,
      "z": 17.71728754043579
    }, {
      "x": 351.65367126464844,
      "y": 269.3400764465332,
      "z": -33.450424671173096
    }, {
      "x": 333.1378936767578,
      "y": 253.88388633728027,
      "z": -7.230473756790161
    }, {
      "x": 277.8318977355957,
      "y": 246.95331573486328,
      "z": 68.20805549621582,
      "name": "faceOval"
    }, {
      "x": 336.6680908203125,
      "y": 238.10003757476807,
      "z": 0.7688578963279724
    }, {
      "x": 329.95800018310547,
      "y": 269.18323516845703,
      "z": -7.207130789756775
    }, {
      "x": 299.17491912841797,
      "y": 234.13324356079102,
      "z": 15.95489501953125
    }, {
      "x": 335.61729431152344,
      "y": 258.71752738952637,
      "z": -23.016133308410645
    }, {
      "x": 284.1079330444336,
      "y": 297.0343494415283,
      "z": 63.25934886932373,
      "name": "faceOval"
    }, {
      "x": 331.44542694091797,
      "y": 230.6892442703247,
      "z": 9.92658257484436,
      "name": "rightEye"
    }, {
      "x": 341.41536712646484,
      "y": 253.01264762878418,
      "z": -29.038610458374023
    }, {
      "x": 303.5472869873047,
      "y": 327.5896739959717,
      "z": 16.725212335586548
    }, {
      "x": 304.7756576538086,
      "y": 337.4389457702637,
      "z": 27.38126277923584,
      "name": "faceOval"
    }, {
      "x": 280.80501556396484,
      "y": 275.32050132751465,
      "z": 45.0752067565918
    }, {
      "x": 295.43582916259766,
      "y": 318.4501647949219,
      "z": 26.2608003616333
    }, {
      "x": 281.4303207397461,
      "y": 228.7355661392212,
      "z": 40.94350814819336
    }, {
      "x": 331.2549591064453,
      "y": 349.4216537475586,
      "z": -7.376367449760437
    }, {
      "x": 352.4247741699219,
      "y": 271.7330074310303,
      "z": -24.953596591949463
    }, {
      "x": 327.5672912597656,
      "y": 260.41900634765625,
      "z": -5.456410646438599
    }, {
      "x": 284.5432472229004,
      "y": 241.7647933959961,
      "z": 29.668869972229004
    }, {
      "x": 310,
      "y": 235.66174507141113,
      "z": 8.502663969993591,
      "name": "rightEye"
    }, {
      "x": 315.7071113586426,
      "y": 235.7572603225708,
      "z": 6.938687562942505,
      "name": "rightEye"
    }, {
      "x": 330.41088104248047,
      "y": 311.04143142700195,
      "z": -9.325502514839172,
      "name": "lips"
    }, {
      "x": 288.5377502441406,
      "y": 285.31983375549316,
      "z": 21.837315559387207
    }, {
      "x": 344.55039978027344,
      "y": 359.4300842285156,
      "z": -6.705257892608643,
      "name": "faceOval"
    }, {
      "x": 323.41880798339844,
      "y": 351.67362213134766,
      "z": 7.802375555038452,
      "name": "faceOval"
    }, {
      "x": 314.64088439941406,
      "y": 346.11894607543945,
      "z": 16.36339783668518,
      "name": "faceOval"
    }, {
      "x": 349.4945526123047,
      "y": 184.8434829711914,
      "z": -0.21847527474164963
    }, {
      "x": 359.24694061279297,
      "y": 359.8348903656006,
      "z": -8.403456211090088,
      "name": "faceOval"
    }, {
      "x": 321.26182556152344,
      "y": 234.64492321014404,
      "z": 6.90950870513916,
      "name": "rightEye"
    }, {
      "x": 326.318359375,
      "y": 232.90250301361084,
      "z": 8.029969334602356,
      "name": "rightEye"
    }, {
      "x": 329.6211624145508,
      "y": 231.6195774078369,
      "z": 9.722331762313843,
      "name": "rightEye"
    }, {
      "x": 285.9398078918457,
      "y": 228.2351303100586,
      "z": 24.650139808654785
    }, {
      "x": 325.79288482666016,
      "y": 227.88007736206055,
      "z": 7.469738721847534,
      "name": "rightEye"
    }, {
      "x": 320.1699447631836,
      "y": 227.5934886932373,
      "z": 6.168370842933655,
      "name": "rightEye"
    }, {
      "x": 314.85408782958984,
      "y": 227.85282611846924,
      "z": 6.2675780057907104,
      "name": "rightEye"
    }, {
      "x": 309.3084907531738,
      "y": 229.1516876220703,
      "z": 7.7031683921813965,
      "name": "rightEye"
    }, {
      "x": 305.5621337890625,
      "y": 230.92366218566895,
      "z": 9.722331762313843,
      "name": "rightEye"
    }, {
      "x": 277.8681945800781,
      "y": 228.5354232788086,
      "z": 59.71122741699219,
      "name": "faceOval"
    }, {
      "x": 306.1444664001465,
      "y": 235.1954698562622,
      "z": 10.603528022766113,
      "name": "rightEye"
    }, {
      "x": 355.4478454589844,
      "y": 281.96210861206055,
      "z": -20.565123558044434
    }, {
      "x": 333.02661895751953,
      "y": 288.0105400085449,
      "z": -14.72939133644104
    }, {
      "x": 337.15728759765625,
      "y": 269.2059516906738,
      "z": -19.8414945602417
    }, {
      "x": 345.9898376464844,
      "y": 283.5453128814697,
      "z": -20.4834246635437
    }, {
      "x": 351.48963928222656,
      "y": 219.98916149139404,
      "z": -7.0378947257995605
    }, {
      "x": 312.39574432373047,
      "y": 336.50628089904785,
      "z": 8.671900033950806
    }, {
      "x": 321.32152557373047,
      "y": 343.1755256652832,
      "z": 0.9067271649837494
    }, {
      "x": 343.78379821777344,
      "y": 353.2975959777832,
      "z": -14.355905055999756
    }, {
      "x": 296.8791389465332,
      "y": 327.91497230529785,
      "z": 41.01353645324707,
      "name": "faceOval"
    }, {
      "x": 329.6939468383789,
      "y": 229.27897453308105,
      "z": 8.934508562088013,
      "name": "rightEye"
    }, {
      "x": 341.6905212402344,
      "y": 241.4073657989502,
      "z": -14.589333534240723
    }, {
      "x": 359.03079986572266,
      "y": 353.48859786987305,
      "z": -15.803166627883911
    }, {
      "x": 333.1861877441406,
      "y": 356.43213272094727,
      "z": -1.0234417766332626,
      "name": "faceOval"
    }, {
      "x": 283.97483825683594,
      "y": 291.4318656921387,
      "z": 41.94725513458252
    }, {
      "x": 343.33770751953125,
      "y": 305.830135345459,
      "z": -15.756480693817139,
      "name": "lips"
    }, {
      "x": 342.40283966064453,
      "y": 307.7453899383545,
      "z": -17.4021577835083
    }, {
      "x": 341.53621673583984,
      "y": 311.0595703125,
      "z": -19.047834873199463
    }, {
      "x": 340.9107208251953,
      "y": 315.4837703704834,
      "z": -18.5576331615448,
      "name": "lips"
    }, {
      "x": 339.1478729248047,
      "y": 323.42233657836914,
      "z": -14.367576837539673
    }, {
      "x": 333.3201599121094,
      "y": 307.4406337738037,
      "z": -9.617288708686829
    }, {
      "x": 331.2411117553711,
      "y": 306.9811820983887,
      "z": -9.669809937477112
    }, {
      "x": 329.23255920410156,
      "y": 306.0508346557617,
      "z": -9.582273960113525,
      "name": "lips"
    }, {
      "x": 322.4586486816406,
      "y": 301.33323669433594,
      "z": -7.720675468444824
    }, {
      "x": 297.1712112426758,
      "y": 286.9552803039551,
      "z": 8.240055441856384
    }, {
      "x": 341.3060760498047,
      "y": 235.4432201385498,
      "z": -7.504753470420837
    }, {
      "x": 336.9318389892578,
      "y": 224.3451976776123,
      "z": 5.829898118972778
    }, {
      "x": 332.65323638916016,
      "y": 226.70403957366943,
      "z": 8.105834126472473
    }, {
      "x": 334.67357635498047,
      "y": 306.4397621154785,
      "z": -8.981193900108337,
      "name": "lips"
    }, {
      "x": 297.4601936340332,
      "y": 306.29210472106934,
      "z": 15.476365089416504
    }, {
      "x": 342.9119110107422,
      "y": 222.37077713012695,
      "z": -2.754466235637665
    }, {
      "x": 335.4629898071289,
      "y": 332.20250129699707,
      "z": -11.823196411132812
    }, {
      "x": 353.2412338256836,
      "y": 240.56339263916016,
      "z": -27.147831916809082
    }, {
      "x": 346.3080596923828,
      "y": 236.41446590423584,
      "z": -18.452589511871338
    }, {
      "x": 352.6475143432617,
      "y": 234.1420555114746,
      "z": -19.748122692108154
    }, {
      "x": 337.3209762573242,
      "y": 253.39937210083008,
      "z": -16.024924516677856
    }, {
      "x": 358.6122131347656,
      "y": 344.90861892700195,
      "z": -18.592647314071655
    }, {
      "x": 358.1117248535156,
      "y": 334.64990615844727,
      "z": -17.49552845954895
    }, {
      "x": 346.4450454711914,
      "y": 335.0321102142334,
      "z": -16.32838249206543
    }, {
      "x": 319.17640686035156,
      "y": 320.2833938598633,
      "z": -3.276764452457428
    }, {
      "x": 325.2540588378906,
      "y": 276.2369728088379,
      "z": -6.460157036781311
    }, {
      "x": 326.7214584350586,
      "y": 327.3939514160156,
      "z": -7.417217493057251
    }, {
      "x": 310.7190132141113,
      "y": 277.2265148162842,
      "z": -3.5452082753181458
    }, {
      "x": 319.78355407714844,
      "y": 284.8238182067871,
      "z": -6.4543211460113525
    }, {
      "x": 305.773983001709,
      "y": 290.83580017089844,
      "z": 0.06907138042151928
    }, {
      "x": 344.4001770019531,
      "y": 344.85408782958984,
      "z": -16.946970224380493
    }, {
      "x": 333.1879425048828,
      "y": 258.74256134033203,
      "z": -11.90489649772644
    }, {
      "x": 313.80598068237305,
      "y": 327.08919525146484,
      "z": 2.2277912497520447
    }, {
      "x": 322.9637908935547,
      "y": 334.6819496154785,
      "z": -3.3643004298210144
    }, {
      "x": 313.4055519104004,
      "y": 311.2166690826416,
      "z": -1.1175429821014404
    }, {
      "x": 291.0865783691406,
      "y": 298.2831001281738,
      "z": 22.467575073242188
    }, {
      "x": 305.6580924987793,
      "y": 313.3707904815674,
      "z": 5.561453700065613
    }, {
      "x": 288.23760986328125,
      "y": 305.9941864013672,
      "z": 36.765122413635254
    }, {
      "x": 315.10692596435547,
      "y": 296.26991271972656,
      "z": -4.604393839836121
    }, {
      "x": 337.50518798828125,
      "y": 247.5944423675537,
      "z": -10.597691535949707
    }, {
      "x": 338.8450622558594,
      "y": 265.47778129577637,
      "z": -27.778091430664062
    }, {
      "x": 334.25254821777344,
      "y": 269.0671920776367,
      "z": -20.938611030578613
    }, {
      "x": 341.64512634277344,
      "y": 259.6387195587158,
      "z": -32.189905643463135
    }, {
      "x": 331.44081115722656,
      "y": 219.0976095199585,
      "z": 4.207563698291779
    }, {
      "x": 320.56339263916016,
      "y": 216.49658203125,
      "z": 2.930997312068939
    }, {
      "x": 311.21912002563477,
      "y": 216.57853603363037,
      "z": 2.9674705862998962
    }, {
      "x": 303.46256256103516,
      "y": 218.54614734649658,
      "z": 5.357203483581543
    }, {
      "x": 297.99999237060547,
      "y": 222.505202293396,
      "z": 9.325502514839172
    }, {
      "x": 294.93839263916016,
      "y": 236.39654159545898,
      "z": 18.534289598464966
    }, {
      "x": 278.87489318847656,
      "y": 259.7095584869385,
      "z": 45.68212032318115
    }, {
      "x": 300.3782653808594,
      "y": 245.38593292236328,
      "z": 12.278382778167725
    }, {
      "x": 307.06348419189453,
      "y": 246.36857986450195,
      "z": 8.164191246032715
    }, {
      "x": 315.5229187011719,
      "y": 245.3949737548828,
      "z": 5.503097176551819
    }, {
      "x": 323.71395111083984,
      "y": 242.75178909301758,
      "z": 4.6335723996162415
    }, {
      "x": 330.2785873413086,
      "y": 239.34658527374268,
      "z": 4.937030673027039
    }, {
      "x": 334.6982192993164,
      "y": 236.0460376739502,
      "z": 4.823233783245087
    }, {
      "x": 279.3412208557129,
      "y": 263.5196113586426,
      "z": 70.91583728790283,
      "name": "faceOval"
    }, {
      "x": 334.65972900390625,
      "y": 271.6648578643799,
      "z": -17.775644063949585
    }, {
      "x": 342.05677032470703,
      "y": 246.99846267700195,
      "z": -20.84523916244507
    }, {
      "x": 344.0357971191406,
      "y": 264.5701503753662,
      "z": -32.936880588531494
    }, {
      "x": 348.25531005859375,
      "y": 268.6645030975342,
      "z": -30.695960521697998
    }, {
      "x": 344.12227630615234,
      "y": 266.34212493896484,
      "z": -29.808926582336426
    }, {
      "x": 337.12318420410156,
      "y": 274.2556858062744,
      "z": -15.768152475357056
    }, {
      "x": 349.49047088623047,
      "y": 269.071683883667,
      "z": -32.51670837402344
    }, {
      "x": 350.1683044433594,
      "y": 271.4691352844238,
      "z": -24.93025302886963
    }, {
      "x": 333.9634704589844,
      "y": 230.56639194488525,
      "z": 8.89949381351471
    }, {
      "x": 338.2147979736328,
      "y": 231.4807891845703,
      "z": 4.6715047955513
    }, {
      "x": 340.4712677001953,
      "y": 231.74463272094727,
      "z": -0.34996166825294495
    }, {
      "x": 303.28975677490234,
      "y": 232.24980354309082,
      "z": 11.916568279266357,
      "name": "rightEye"
    }, {
      "x": 299.4649124145508,
      "y": 229.53842639923096,
      "z": 12.325069904327393
    }, {
      "x": 359.09618377685547,
      "y": 241.77349090576172,
      "z": -24.650139808654785
    }, {
      "x": 399.46216583251953,
      "y": 229.89503860473633,
      "z": 15.919880867004395,
      "name": "leftEye"
    }, {
      "x": 361.38919830322266,
      "y": 269.6129894256592,
      "z": -24.510080814361572
    }, {
      "x": 416.9973373413086,
      "y": 206.0895538330078,
      "z": 53.26857566833496,
      "name": "faceOval"
    }, {
      "x": 381.32179260253906,
      "y": 235.5476474761963,
      "z": 7.6214683055877686
    }, {
      "x": 387.8068542480469,
      "y": 236.25958442687988,
      "z": 8.345099091529846
    }, {
      "x": 393.95751953125,
      "y": 235.8660364151001,
      "z": 10.475142002105713
    }, {
      "x": 401.84600830078125,
      "y": 232.77019500732422,
      "z": 16.760226488113403
    }, {
      "x": 375.70568084716797,
      "y": 233.48456382751465,
      "z": 8.234220147132874
    }, {
      "x": 388.17752838134766,
      "y": 218.94717693328857,
      "z": 6.810300946235657
    }, {
      "x": 381.64928436279297,
      "y": 219.2656660079956,
      "z": 6.711093783378601
    }, {
      "x": 394.4760513305664,
      "y": 219.66821193695068,
      "z": 9.173773527145386
    }, {
      "x": 398.8843536376953,
      "y": 221.8837022781372,
      "z": 12.03328251838684
    }, {
      "x": 406.5454864501953,
      "y": 237.12156772613525,
      "z": 19.7131085395813
    }, {
      "x": 383.87447357177734,
      "y": 337.6932907104492,
      "z": -8.631049990653992
    }, {
      "x": 401.2682342529297,
      "y": 228.5916566848755,
      "z": 18.359217643737793,
      "name": "leftEye"
    }, {
      "x": 422.0449447631836,
      "y": 236.73934936523438,
      "z": 51.16771221160889
    }, {
      "x": 412.69153594970703,
      "y": 232.80198097229004,
      "z": 27.52131938934326
    }, {
      "x": 387.3497772216797,
      "y": 263.298397064209,
      "z": -2.8609684109687805
    }, {
      "x": 364.5124053955078,
      "y": 293.39221000671387,
      "z": -22.397546768188477,
      "name": "lips"
    }, {
      "x": 363.62987518310547,
      "y": 302.1291446685791,
      "z": -19.643079042434692
    }, {
      "x": 373.2334518432617,
      "y": 295.8647060394287,
      "z": -18.125789165496826,
      "name": "lips"
    }, {
      "x": 378.83365631103516,
      "y": 299.5177745819092,
      "z": -13.153743743896484,
      "name": "lips"
    }, {
      "x": 369.91477966308594,
      "y": 302.5704002380371,
      "z": -16.65518283843994
    }, {
      "x": 374.9167251586914,
      "y": 303.5416603088379,
      "z": -11.963253021240234
    }, {
      "x": 387.58888244628906,
      "y": 312.2716999053955,
      "z": -4.680258631706238
    }, {
      "x": 360.6635284423828,
      "y": 264.31986808776855,
      "z": -35.94811677932739
    }, {
      "x": 361.04564666748047,
      "y": 256.8225860595703,
      "z": -37.278664112091064
    }, {
      "x": 408.3855438232422,
      "y": 213.52088928222656,
      "z": 15.756480693817139,
      "name": "leftEyebrow"
    }, {
      "x": 373.2946014404297,
      "y": 245.38101196289062,
      "z": -1.9316278398036957
    }, {
      "x": 376.83860778808594,
      "y": 264.3721103668213,
      "z": -18.510947227478027
    }, {
      "x": 376.9546127319336,
      "y": 261.0010528564453,
      "z": -15.989909172058105
    }, {
      "x": 406.1498260498047,
      "y": 263.5030174255371,
      "z": 7.072908878326416
    }, {
      "x": 360.07205963134766,
      "y": 248.3631706237793,
      "z": -32.16656446456909
    }, {
      "x": 393.11119079589844,
      "y": 205.10473251342773,
      "z": 3.7786373496055603,
      "name": "leftEyebrow"
    }, {
      "x": 402.12791442871094,
      "y": 207.89000988006592,
      "z": 9.383859634399414,
      "name": "leftEyebrow"
    }, {
      "x": 410.8693313598633,
      "y": 191.6182279586792,
      "z": 41.27030849456787,
      "name": "faceOval"
    }, {
      "x": 364.9509811401367,
      "y": 210.40483474731445,
      "z": -3.758212625980377
    }, {
      "x": 375.94444274902344,
      "y": 221.1331844329834,
      "z": 8.368442058563232
    }, {
      "x": 392.1904754638672,
      "y": 305.0360298156738,
      "z": -1.752179116010666
    }, {
      "x": 419.50225830078125,
      "y": 307.25592613220215,
      "z": 58.96425247192383,
      "name": "faceOval"
    }, {
      "x": 372.0027160644531,
      "y": 268.7212657928467,
      "z": -16.631840467453003
    }, {
      "x": 366.1614227294922,
      "y": 271.6237449645996,
      "z": -18.219159841537476
    }, {
      "x": 385.00938415527344,
      "y": 305.3863334655762,
      "z": -2.567722797393799
    }, {
      "x": 381.99771881103516,
      "y": 304.9723720550537,
      "z": -4.575215280056
    }, {
      "x": 405.078125,
      "y": 203.21216583251953,
      "z": 13.713973760604858,
      "name": "leftEyebrow"
    }, {
      "x": 377.13207244873047,
      "y": 268.4710121154785,
      "z": -15.266278982162476
    }, {
      "x": 380.9713363647461,
      "y": 205.36980628967285,
      "z": -0.7250899076461792,
      "name": "leftEyebrow"
    }, {
      "x": 381.7788314819336,
      "y": 198.9268398284912,
      "z": -1.184653863310814,
      "name": "leftEyebrow"
    }, {
      "x": 385.5204772949219,
      "y": 172.1484375,
      "z": 16.04826807975769,
      "name": "faceOval"
    }, {
      "x": 407.94189453125,
      "y": 196.76236152648926,
      "z": 25.723915100097656
    }, {
      "x": 383.03890228271484,
      "y": 184.5157527923584,
      "z": 7.393874526023865
    }, {
      "x": 411.61781311035156,
      "y": 210.79241752624512,
      "z": 22.315845489501953,
      "name": "leftEyebrow"
    }, {
      "x": 414.30870056152344,
      "y": 208.4643030166626,
      "z": 37.021894454956055
    }, {
      "x": 364.28722381591797,
      "y": 298.35777282714844,
      "z": -21.86065673828125
    }, {
      "x": 371.3682556152344,
      "y": 299.78848457336426,
      "z": -17.834001779556274
    }, {
      "x": 376.88201904296875,
      "y": 301.6696071624756,
      "z": -13.153743743896484
    }, {
      "x": 370.2193832397461,
      "y": 270.49095153808594,
      "z": -15.569736957550049
    }, {
      "x": 383.5081100463867,
      "y": 305.2726364135742,
      "z": -3.673594295978546
    }, {
      "x": 380.73760986328125,
      "y": 305.96869468688965,
      "z": -8.660228252410889
    }, {
      "x": 381.2334442138672,
      "y": 304.63574409484863,
      "z": -4.820316135883331,
      "name": "lips"
    }, {
      "x": 368.1698989868164,
      "y": 264.8884963989258,
      "z": -25.653886795043945
    }, {
      "x": 373.5087203979492,
      "y": 303.4233856201172,
      "z": -10.95950722694397,
      "name": "lips"
    }, {
      "x": 368.4544372558594,
      "y": 303.29601287841797,
      "z": -14.169161319732666,
      "name": "lips"
    }, {
      "x": 362.76554107666016,
      "y": 303.5735607147217,
      "z": -16.911956071853638,
      "name": "lips"
    }, {
      "x": 366.60980224609375,
      "y": 324.8870658874512,
      "z": -15.616422891616821
    }, {
      "x": 365.7067108154297,
      "y": 315.95678329467773,
      "z": -20.903596878051758,
      "name": "lips"
    }, {
      "x": 365.0083923339844,
      "y": 311.2232208251953,
      "z": -21.066999435424805
    }, {
      "x": 364.1508102416992,
      "y": 307.0583438873291,
      "z": -18.907777070999146
    }, {
      "x": 363.37512969970703,
      "y": 304.5721435546875,
      "z": -17.42550015449524,
      "name": "lips"
    }, {
      "x": 374.580078125,
      "y": 304.3059539794922,
      "z": -11.40302300453186,
      "name": "lips"
    }, {
      "x": 375.55362701416016,
      "y": 305.0998020172119,
      "z": -12.861957550048828
    }, {
      "x": 377.2437286376953,
      "y": 307.1674346923828,
      "z": -14.215847253799438
    }, {
      "x": 378.68587493896484,
      "y": 309.9015712738037,
      "z": -13.223772048950195,
      "name": "lips"
    }, {
      "x": 383.8992691040039,
      "y": 290.29629707336426,
      "z": -9.97326910495758
    }, {
      "x": 423.3871841430664,
      "y": 271.91688537597656,
      "z": 74.37058925628662,
      "name": "faceOval"
    }, {
      "x": 377.68043518066406,
      "y": 304.62209701538086,
      "z": -7.603961229324341,
      "name": "lips"
    }, {
      "x": 379.00428771972656,
      "y": 304.9314594268799,
      "z": -8.57852816581726
    }, {
      "x": 364.00279998779297,
      "y": 275.2813911437988,
      "z": -19.25792098045349
    }, {
      "x": 374.68231201171875,
      "y": 273.82555961608887,
      "z": -11.28047227859497
    }, {
      "x": 365.0354766845703,
      "y": 273.4548568725586,
      "z": -18.791062831878662
    }, {
      "x": 380.61901092529297,
      "y": 249.8848056793213,
      "z": 0.15501167625188828
    }, {
      "x": 391.14158630371094,
      "y": 254.7934627532959,
      "z": 2.0906515419483185
    }, {
      "x": 378.1761169433594,
      "y": 264.9612236022949,
      "z": -12.605184316635132
    }, {
      "x": 400.9540557861328,
      "y": 179.99592304229736,
      "z": 27.82477855682373,
      "name": "faceOval"
    }, {
      "x": 398.0038833618164,
      "y": 188.50656509399414,
      "z": 16.094952821731567
    }, {
      "x": 394.8717498779297,
      "y": 199.0359592437744,
      "z": 6.226727366447449,
      "name": "leftEyebrow"
    }, {
      "x": 382.10926055908203,
      "y": 316.83926582336426,
      "z": -8.946179747581482
    }, {
      "x": 366.51588439941406,
      "y": 200.32583713531494,
      "z": -5.24632453918457,
      "name": "leftEyebrow"
    }, {
      "x": 367.4893569946289,
      "y": 183.87210845947266,
      "z": 1.9039081037044525
    }, {
      "x": 368.6243438720703,
      "y": 168.8127565383911,
      "z": 8.736093044281006,
      "name": "faceOval"
    }, {
      "x": 398.96175384521484,
      "y": 234.9675178527832,
      "z": 13.713973760604858
    }, {
      "x": 412.9645538330078,
      "y": 242.23042488098145,
      "z": 23.272905349731445
    }, {
      "x": 372.05257415771484,
      "y": 231.41919136047363,
      "z": 9.226294755935669
    }, {
      "x": 406.0722351074219,
      "y": 223.58965873718262,
      "z": 18.370890617370605
    }, {
      "x": 368.27442169189453,
      "y": 240.2039337158203,
      "z": -4.166713654994965
    }, {
      "x": 372.3575210571289,
      "y": 260.66442489624023,
      "z": -24.976940155029297
    }, {
      "x": 419.2244338989258,
      "y": 247.9079246520996,
      "z": 30.299127101898193
    }, {
      "x": 409.43885803222656,
      "y": 246.60913467407227,
      "z": 16.398411989212036
    }, {
      "x": 401.69139862060547,
      "y": 248.76328468322754,
      "z": 9.395531415939331
    }, {
      "x": 389.7608184814453,
      "y": 247.56915092468262,
      "z": 5.841569304466248
    }, {
      "x": 380.5461883544922,
      "y": 244.55984115600586,
      "z": 4.263003468513489
    }, {
      "x": 373.25817108154297,
      "y": 240.80214500427246,
      "z": 2.5356262922286987
    }, {
      "x": 358.77086639404297,
      "y": 229.35615062713623,
      "z": -10.387605428695679
    }, {
      "x": 419.5793914794922,
      "y": 262.8478717803955,
      "z": 26.5175724029541
    }, {
      "x": 410.8808898925781,
      "y": 222.51372814178467,
      "z": 22.199130058288574
    }, {
      "x": 358.45714569091797,
      "y": 268.91467094421387,
      "z": -33.17030906677246
    }, {
      "x": 373.4129333496094,
      "y": 251.6385841369629,
      "z": -5.771540403366089
    }, {
      "x": 422.5408172607422,
      "y": 239.23919677734375,
      "z": 74.04378890991211,
      "name": "faceOval"
    }, {
      "x": 367.8171920776367,
      "y": 236.58040523529053,
      "z": 1.820748895406723
    }, {
      "x": 378.51959228515625,
      "y": 266.2532329559326,
      "z": -5.74819803237915
    }, {
      "x": 403.3472442626953,
      "y": 229.05112266540527,
      "z": 19.689764976501465
    }, {
      "x": 372.34840393066406,
      "y": 256.6451168060303,
      "z": -21.872329711914062
    }, {
      "x": 422.54566192626953,
      "y": 289.1587829589844,
      "z": 68.67491245269775,
      "name": "faceOval"
    }, {
      "x": 371.9297409057617,
      "y": 228.90116214752197,
      "z": 11.432201862335205,
      "name": "leftEye"
    }, {
      "x": 366.21360778808594,
      "y": 251.6158962249756,
      "z": -28.19826364517212
    }, {
      "x": 409.1571807861328,
      "y": 321.3156223297119,
      "z": 20.2266526222229
    }, {
      "x": 408.52943420410156,
      "y": 331.44238471984863,
      "z": 31.09278917312622,
      "name": "faceOval"
    }, {
      "x": 424.2788314819336,
      "y": 267.1992301940918,
      "z": 50.467424392700195
    }, {
      "x": 415.60352325439453,
      "y": 311.6528606414795,
      "z": 30.579242706298828
    }, {
      "x": 418.12793731689453,
      "y": 221.59927368164062,
      "z": 46.26569747924805
    }, {
      "x": 385.68286895751953,
      "y": 346.0184955596924,
      "z": -5.70151150226593
    }, {
      "x": 357.82936096191406,
      "y": 271.3758373260498,
      "z": -24.836881160736084
    }, {
      "x": 379.588623046875,
      "y": 257.5071716308594,
      "z": -3.755294680595398
    }, {
      "x": 417.4592590332031,
      "y": 234.71948146820068,
      "z": 34.5475435256958
    }, {
      "x": 393.4684371948242,
      "y": 231.58967971801758,
      "z": 11.408859491348267,
      "name": "leftEye"
    }, {
      "x": 387.8864288330078,
      "y": 232.14245796203613,
      "z": 9.51808214187622,
      "name": "leftEye"
    }, {
      "x": 382.4981689453125,
      "y": 307.5654888153076,
      "z": -7.522260546684265,
      "name": "lips"
    }, {
      "x": 419.00169372558594,
      "y": 277.8332805633545,
      "z": 26.424202919006348
    }, {
      "x": 373.62953186035156,
      "y": 357.6375102996826,
      "z": -5.75986921787262,
      "name": "faceOval"
    }, {
      "x": 392.8708267211914,
      "y": 347.72446632385254,
      "z": 10.154176950454712,
      "name": "faceOval"
    }, {
      "x": 400.3953552246094,
      "y": 341.0005187988281,
      "z": 19.39797878265381,
      "name": "faceOval"
    }, {
      "x": 382.25440979003906,
      "y": 231.66935920715332,
      "z": 8.998700976371765,
      "name": "leftEye"
    }, {
      "x": 377.14550018310547,
      "y": 230.4228687286377,
      "z": 9.804032444953918,
      "name": "leftEye"
    }, {
      "x": 373.8358688354492,
      "y": 229.64950561523438,
      "z": 11.292144060134888,
      "name": "leftEye"
    }, {
      "x": 414.5794677734375,
      "y": 221.67891025543213,
      "z": 29.412097930908203
    }, {
      "x": 377.00672149658203,
      "y": 225.66201210021973,
      "z": 9.360517263412476,
      "name": "leftEye"
    }, {
      "x": 382.29530334472656,
      "y": 224.8431158065796,
      "z": 8.32175612449646,
      "name": "leftEye"
    }, {
      "x": 387.5133514404297,
      "y": 224.49507236480713,
      "z": 8.917000889778137,
      "name": "leftEye"
    }, {
      "x": 393.15906524658203,
      "y": 225.24795055389404,
      "z": 10.737749338150024,
      "name": "leftEye"
    }, {
      "x": 397.05554962158203,
      "y": 226.55359268188477,
      "z": 13.002015352249146,
      "name": "leftEye"
    }, {
      "x": 420.5299377441406,
      "y": 221.014666557312,
      "z": 65.40690422058105,
      "name": "faceOval"
    }, {
      "x": 397.06920623779297,
      "y": 230.6661558151245,
      "z": 13.807345628738403,
      "name": "leftEye"
    }, {
      "x": 377.94647216796875,
      "y": 285.1647090911865,
      "z": -13.305472135543823
    }, {
      "x": 372.1118927001953,
      "y": 267.1267318725586,
      "z": -18.83774757385254
    }, {
      "x": 364.9968719482422,
      "y": 282.24411964416504,
      "z": -19.818150997161865
    }, {
      "x": 401.973876953125,
      "y": 331.20131492614746,
      "z": 11.566424369812012
    }, {
      "x": 394.3083190917969,
      "y": 338.86693954467773,
      "z": 3.142542541027069
    }, {
      "x": 373.9820861816406,
      "y": 351.4504623413086,
      "z": -13.50388765335083
    }, {
      "x": 414.3888854980469,
      "y": 321.24735832214355,
      "z": 45.51872253417969,
      "name": "faceOval"
    }, {
      "x": 373.44234466552734,
      "y": 227.33163356781006,
      "z": 10.626870393753052,
      "name": "leftEye"
    }, {
      "x": 364.0731430053711,
      "y": 240.31539916992188,
      "z": -13.807345628738403
    }, {
      "x": 384.2658233642578,
      "y": 353.3793067932129,
      "z": 0.7385850697755814,
      "name": "faceOval"
    }, {
      "x": 423.20526123046875,
      "y": 283.5176181793213,
      "z": 47.152724266052246
    }, {
      "x": 369.42798614501953,
      "y": 304.0898895263672,
      "z": -14.647691249847412,
      "name": "lips"
    }, {
      "x": 370.63812255859375,
      "y": 305.90051651000977,
      "z": -16.211668252944946
    }, {
      "x": 371.91192626953125,
      "y": 309.0167713165283,
      "z": -17.84567356109619
    }, {
      "x": 373.0583953857422,
      "y": 313.3545398712158,
      "z": -17.378815412521362,
      "name": "lips"
    }, {
      "x": 375.39905548095703,
      "y": 321.09289169311523,
      "z": -13.118728399276733
    }, {
      "x": 379.2567825317383,
      "y": 304.3582534790039,
      "z": -7.924926280975342
    }, {
      "x": 381.18797302246094,
      "y": 303.7031364440918,
      "z": -7.843226194381714
    }, {
      "x": 383.0918502807617,
      "y": 302.4884605407715,
      "z": -7.6506465673446655,
      "name": "lips"
    }, {
      "x": 389.09461975097656,
      "y": 297.1475315093994,
      "z": -5.5497825145721436
    }, {
      "x": 411.6408920288086,
      "y": 280.24898529052734,
      "z": 12.02161192893982
    }, {
      "x": 363.3110809326172,
      "y": 234.27620887756348,
      "z": -6.775286793708801
    }, {
      "x": 366.0474395751953,
      "y": 223.29872131347656,
      "z": 6.827808618545532
    }, {
      "x": 370.34427642822266,
      "y": 225.1457118988037,
      "z": 9.558931589126587
    }, {
      "x": 377.5371551513672,
      "y": 303.60079765319824,
      "z": -7.358860373497009,
      "name": "lips"
    }, {
      "x": 412.9557800292969,
      "y": 299.53579902648926,
      "z": 19.39797878265381
    }, {
      "x": 360.0810241699219,
      "y": 221.72012329101562,
      "z": -2.153385728597641
    }, {
      "x": 379.82784271240234,
      "y": 329.47723388671875,
      "z": -10.48097848892212
    }, {
      "x": 359.08477783203125,
      "y": 235.7911491394043,
      "z": -18.079102039337158
    }, {
      "x": 369.6688461303711,
      "y": 251.5407943725586,
      "z": -14.962821006774902
    }, {
      "x": 369.5555114746094,
      "y": 333.5307312011719,
      "z": -15.67478060722351
    }, {
      "x": 394.0193176269531,
      "y": 315.6973171234131,
      "z": -0.9920747578144073
    }, {
      "x": 383.78997802734375,
      "y": 272.7268695831299,
      "z": -4.689012169837952
    }, {
      "x": 387.67765045166016,
      "y": 323.6722755432129,
      "z": -5.640236139297485
    }, {
      "x": 397.8769302368164,
      "y": 272.1331214904785,
      "z": -0.9395531564950943
    }, {
      "x": 389.87476348876953,
      "y": 280.5630111694336,
      "z": -4.29218202829361
    }, {
      "x": 403.83888244628906,
      "y": 285.1167869567871,
      "z": 3.0229100584983826
    }, {
      "x": 372.5467300415039,
      "y": 343.1070327758789,
      "z": -16.153310537338257
    }, {
      "x": 374.1112518310547,
      "y": 256.3721466064453,
      "z": -10.574349164962769
    }, {
      "x": 399.73785400390625,
      "y": 321.77515983581543,
      "z": 4.849494695663452
    }, {
      "x": 392.03365325927734,
      "y": 330.56447982788086,
      "z": -1.3407598435878754
    }, {
      "x": 398.59134674072266,
      "y": 305.93902587890625,
      "z": 1.517290621995926
    }, {
      "x": 417.95997619628906,
      "y": 290.9716987609863,
      "z": 26.89105987548828
    }, {
      "x": 406.04541778564453,
      "y": 307.35154151916504,
      "z": 8.666064143180847
    }, {
      "x": 420.75328826904297,
      "y": 298.40752601623535,
      "z": 41.78385257720947
    }, {
      "x": 395.4522705078125,
      "y": 291.4153575897217,
      "z": -2.1752697229385376
    }, {
      "x": 368.6452102661133,
      "y": 245.8882999420166,
      "z": -9.453888535499573
    }, {
      "x": 370.34900665283203,
      "y": 263.56690406799316,
      "z": -26.75100326538086
    }, {
      "x": 374.98477935791016,
      "y": 266.6126346588135,
      "z": -19.77146625518799
    }, {
      "x": 366.99840545654297,
      "y": 258.12140464782715,
      "z": -31.372904777526855
    }, {
      "x": 371.00616455078125,
      "y": 217.63479709625244,
      "z": 5.60522198677063
    }, {
      "x": 381.30577087402344,
      "y": 214.14087295532227,
      "z": 4.983716309070587
    }, {
      "x": 390.1496124267578,
      "y": 213.38221549987793,
      "z": 5.593550801277161
    }, {
      "x": 397.7696990966797,
      "y": 214.3659782409668,
      "z": 8.57852816581726
    }, {
      "x": 403.1652069091797,
      "y": 217.65509605407715,
      "z": 13.013685941696167
    }, {
      "x": 407.3551940917969,
      "y": 230.72525024414062,
      "z": 22.444231510162354
    }, {
      "x": 424.0876770019531,
      "y": 251.7839241027832,
      "z": 51.16771221160889
    }, {
      "x": 403.50196838378906,
      "y": 239.88757610321045,
      "z": 15.803166627883911
    }, {
      "x": 397.31719970703125,
      "y": 241.49806022644043,
      "z": 11.233787536621094
    }, {
      "x": 388.99425506591797,
      "y": 241.4366912841797,
      "z": 7.948269248008728
    }, {
      "x": 380.7804489135742,
      "y": 239.78078842163086,
      "z": 6.600214838981628
    }, {
      "x": 374.01336669921875,
      "y": 237.11946487426758,
      "z": 6.349278092384338
    }, {
      "x": 369.39125061035156,
      "y": 234.35351371765137,
      "z": 5.987462401390076
    }, {
      "x": 422.9730987548828,
      "y": 255.76455116271973,
      "z": 76.61150932312012,
      "name": "faceOval"
    }, {
      "x": 374.73915100097656,
      "y": 269.24214363098145,
      "z": -16.608498096466064
    }, {
      "x": 364.61681365966797,
      "y": 245.71088790893555,
      "z": -20.02823829650879
    }, {
      "x": 365.3834533691406,
      "y": 263.34174156188965,
      "z": -32.32996463775635
    }, {
      "x": 361.58252716064453,
      "y": 267.8273677825928,
      "z": -30.345816612243652
    }, {
      "x": 365.37208557128906,
      "y": 265.0249671936035,
      "z": -29.178667068481445
    }, {
      "x": 372.72605895996094,
      "y": 272.05135345458984,
      "z": -14.834434986114502
    }, {
      "x": 360.48614501953125,
      "y": 268.34827423095703,
      "z": -32.189905643463135
    }, {
      "x": 359.9516296386719,
      "y": 270.8049201965332,
      "z": -24.650139808654785
    }, {
      "x": 369.5049285888672,
      "y": 229.01945114135742,
      "z": 10.107489824295044
    }, {
      "x": 365.5447769165039,
      "y": 230.24096488952637,
      "z": 5.593550801277161
    }, {
      "x": 363.50669860839844,
      "y": 230.6208372116089,
      "z": 0.43622106313705444
    }, {
      "x": 399.3529510498047,
      "y": 227.65677452087402,
      "z": 15.35965085029602,
      "name": "leftEye"
    }, {
      "x": 402.5693130493164,
      "y": 224.60190296173096,
      "z": 15.931552648544312
    }],
    "box": {
      "xMin": 277.8318977355957,
      "yMin": 168.7741756439209,
      "xMax": 424.2788314819336,
      "yMax": 359.8348903656006,
      "width": 146.4469337463379,
      "height": 191.0607147216797
    }
  },
  // Tasks-vision: https://developers.google.com/mediapipe/solutions/vision/face_landmarker/web_js
  // prettier-ignore
  SAMPLE_FACELANDMARKER_RESULT: {
    "faceLandmarks": [[{
      "x": 0.5760777592658997,
      "y": 0.8639070391654968,
      "z": -0.030997956171631813
    }, {
      "x": 0.572094738483429,
      "y": 0.7886289358139038,
      "z": -0.07189624011516571
    }, {
      "x": 0.5723551511764526,
      "y": 0.8075382709503174,
      "z": -0.03578168898820877
    }, {
      "x": 0.5548420548439026,
      "y": 0.7188365459442139,
      "z": -0.057787876576185226
    }, {
      "x": 0.5706077814102173,
      "y": 0.7674974799156189,
      "z": -0.07740399986505508
    }, {
      "x": 0.5681378245353699,
      "y": 0.7387768030166626,
      "z": -0.07356284558773041
    }, {
      "x": 0.5621535181999207,
      "y": 0.6681165099143982,
      "z": -0.04189874976873398
    }, {
      "x": 0.46613582968711853,
      "y": 0.6679812073707581,
      "z": 0.011289681307971478
    }, {
      "x": 0.5579932928085327,
      "y": 0.6174106597900391,
      "z": -0.03502821549773216
    }, {
      "x": 0.5563451647758484,
      "y": 0.5905600190162659,
      "z": -0.03928658738732338
    }, {
      "x": 0.5487832427024841,
      "y": 0.4900572597980499,
      "z": -0.029898937791585922
    }, {
      "x": 0.5765544176101685,
      "y": 0.8692144751548767,
      "z": -0.02831427752971649
    }, {
      "x": 0.5771114230155945,
      "y": 0.873644232749939,
      "z": -0.02345779910683632
    }, {
      "x": 0.5771905779838562,
      "y": 0.877016007900238,
      "z": -0.016658689826726913
    }, {
      "x": 0.5778058767318726,
      "y": 0.8770116567611694,
      "z": -0.014505492523312569
    }, {
      "x": 0.5783766508102417,
      "y": 0.8835000991821289,
      "z": -0.015996402129530907
    }, {
      "x": 0.5792440176010132,
      "y": 0.8913810849189758,
      "z": -0.01924579218029976
    }, {
      "x": 0.5796768069267273,
      "y": 0.8996334671974182,
      "z": -0.018261712044477463
    }, {
      "x": 0.5817288160324097,
      "y": 0.9255813956260681,
      "z": -0.007126849144697189
    }, {
      "x": 0.5726592540740967,
      "y": 0.7992473244667053,
      "z": -0.0643521398305893
    }, {
      "x": 0.5579419136047363,
      "y": 0.7996989488601685,
      "z": -0.04566684365272522
    }, {
      "x": 0.4216199815273285,
      "y": 0.5958762764930725,
      "z": 0.06776496022939682
    }, {
      "x": 0.5052269697189331,
      "y": 0.6796539425849915,
      "z": -0.0010737782577052712
    }, {
      "x": 0.49243026971817017,
      "y": 0.6838865876197815,
      "z": -5227324436418712e-19
    }, {
      "x": 0.4796970784664154,
      "y": 0.6856290102005005,
      "z": 0.002684245817363262
    }, {
      "x": 0.4618356227874756,
      "y": 0.6764569878578186,
      "z": 0.013439622707664967
    }, {
      "x": 0.5160380601882935,
      "y": 0.6737282276153564,
      "z": -17607348127057776e-21
    }, {
      "x": 0.48070961236953735,
      "y": 0.6255870461463928,
      "z": -0.008339674212038517
    }, {
      "x": 0.49719780683517456,
      "y": 0.6256808042526245,
      "z": -0.008027955889701843
    }, {
      "x": 0.46674346923828125,
      "y": 0.6317623853683472,
      "z": -0.004460199736058712
    }, {
      "x": 0.4582492709159851,
      "y": 0.641118049621582,
      "z": 0.0011905613355338573
    }, {
      "x": 0.45408669114112854,
      "y": 0.6911458969116211,
      "z": 0.020514748990535736
    }, {
      "x": 0.535312294960022,
      "y": 0.9619986414909363,
      "z": 0.012499462813138962
    }, {
      "x": 0.4608460068702698,
      "y": 0.6628725528717041,
      "z": 0.01517564244568348
    }, {
      "x": 0.4206731915473938,
      "y": 0.6828458309173584,
      "z": 0.07848648726940155
    }, {
      "x": 0.4390624463558197,
      "y": 0.6796106696128845,
      "z": 0.03283142298460007
    }, {
      "x": 0.5029968619346619,
      "y": 0.7701570391654968,
      "z": -0.009734481573104858
    }, {
      "x": 0.5595027208328247,
      "y": 0.8607323169708252,
      "z": -0.030043255537748337
    }, {
      "x": 0.5621269941329956,
      "y": 0.8738374710083008,
      "z": -0.021709579974412918
    }, {
      "x": 0.5451499819755554,
      "y": 0.865527331829071,
      "z": -0.022014077752828598
    }, {
      "x": 0.5351184010505676,
      "y": 0.8705098032951355,
      "z": -0.011602800339460373
    }, {
      "x": 0.5495014190673828,
      "y": 0.8744956254959106,
      "z": -0.016490943729877472
    }, {
      "x": 0.5395170450210571,
      "y": 0.8759440779685974,
      "z": -0.007333362940698862
    }, {
      "x": 0.5183624029159546,
      "y": 0.8959754705429077,
      "z": 0.010520773939788342
    }, {
      "x": 0.5604349374771118,
      "y": 0.7895449995994568,
      "z": -0.07082037627696991
    }, {
      "x": 0.557381272315979,
      "y": 0.7687489986419678,
      "z": -0.07590588927268982
    }, {
      "x": 0.4432901442050934,
      "y": 0.6308897733688354,
      "z": 0.0027153254486620426
    }, {
      "x": 0.5258325338363647,
      "y": 0.7151225805282593,
      "z": -0.014676518738269806
    }, {
      "x": 0.5271827578544617,
      "y": 0.7833116054534912,
      "z": -0.037643320858478546
    }, {
      "x": 0.5257382988929749,
      "y": 0.7717816233634949,
      "z": -0.03401920944452286
    }, {
      "x": 0.46516409516334534,
      "y": 0.7705106735229492,
      "z": 0.0065747760236263275
    }, {
      "x": 0.5558893084526062,
      "y": 0.7420997619628906,
      "z": -0.0694495290517807
    }, {
      "x": 0.4720408320426941,
      "y": 0.6066038608551025,
      "z": -0.021204356104135513
    }, {
      "x": 0.45432573556900024,
      "y": 0.6158540844917297,
      "z": -0.011054684408009052
    }, {
      "x": 0.4305151402950287,
      "y": 0.5608053803443909,
      "z": 0.0396830290555954
    }, {
      "x": 0.5310865640640259,
      "y": 0.6157484650611877,
      "z": -0.03081176057457924
    }, {
      "x": 0.5114666223526001,
      "y": 0.6329749226570129,
      "z": -0.00335998204536736
    }, {
      "x": 0.506435751914978,
      "y": 0.8786543607711792,
      "z": 0.012980876490473747
    }, {
      "x": 0.4480472207069397,
      "y": 0.8640613555908203,
      "z": 0.12569651007652283
    }, {
      "x": 0.5372058153152466,
      "y": 0.7942581176757812,
      "z": -0.03168361634016037
    }, {
      "x": 0.5488379597663879,
      "y": 0.8001630306243896,
      "z": -0.03280917927622795
    }, {
      "x": 0.5213388204574585,
      "y": 0.8794381618499756,
      "z": 0.011892606504261494
    }, {
      "x": 0.5242055654525757,
      "y": 0.8789222240447998,
      "z": 0.008370225317776203
    }, {
      "x": 0.4477175176143646,
      "y": 0.6039950251579285,
      "z": -0.0050799972377717495
    }, {
      "x": 0.526964008808136,
      "y": 0.7916748523712158,
      "z": -0.02968614175915718
    }, {
      "x": 0.4971255660057068,
      "y": 0.6050706505775452,
      "z": -0.028175678104162216
    }, {
      "x": 0.4938119053840637,
      "y": 0.5882453918457031,
      "z": -0.03210941329598427
    }, {
      "x": 0.4757143557071686,
      "y": 0.5094879865646362,
      "z": -0.01300730835646391
    }, {
      "x": 0.43947282433509827,
      "y": 0.5816648006439209,
      "z": 0.01415177434682846
    }, {
      "x": 0.485664039850235,
      "y": 0.5477864146232605,
      "z": -0.023685332387685776
    }, {
      "x": 0.43635931611061096,
      "y": 0.6226438283920288,
      "z": 0.013606148771941662
    }, {
      "x": 0.42910251021385193,
      "y": 0.6102726459503174,
      "z": 0.03926564007997513
    }, {
      "x": 0.5605402588844299,
      "y": 0.8680099248886108,
      "z": -0.027318159118294716
    }, {
      "x": 0.5474816560745239,
      "y": 0.8702861070632935,
      "z": -0.019686367362737656
    }, {
      "x": 0.5373021364212036,
      "y": 0.8728838562965393,
      "z": -0.010484928265213966
    }, {
      "x": 0.540735125541687,
      "y": 0.7979167103767395,
      "z": -0.029073253273963928
    }, {
      "x": 0.5228585004806519,
      "y": 0.87913578748703,
      "z": 0.009915109723806381
    }, {
      "x": 0.530497670173645,
      "y": 0.8815253973007202,
      "z": 0.0020524784922599792
    }, {
      "x": 0.5259912610054016,
      "y": 0.8790552616119385,
      "z": 0.007895970717072487
    }, {
      "x": 0.5433906316757202,
      "y": 0.7882310748100281,
      "z": -0.05121905356645584
    }, {
      "x": 0.541388213634491,
      "y": 0.8777219653129578,
      "z": -0.00466804439201951
    }, {
      "x": 0.5515822172164917,
      "y": 0.8767023086547852,
      "z": -0.010475946590304375
    }, {
      "x": 0.5637003779411316,
      "y": 0.877059817314148,
      "z": -0.015273625031113625
    }, {
      "x": 0.5640299320220947,
      "y": 0.9263423085212708,
      "z": -0.00658724969252944
    }, {
      "x": 0.5642300248146057,
      "y": 0.8993074893951416,
      "z": -0.017653480172157288
    }, {
      "x": 0.5637336373329163,
      "y": 0.8910360932350159,
      "z": -0.01852807030081749
    }, {
      "x": 0.5637134313583374,
      "y": 0.8837276697158813,
      "z": -0.01482592523097992
    }, {
      "x": 0.564205527305603,
      "y": 0.8768964409828186,
      "z": -0.01331155002117157
    }, {
      "x": 0.5419867634773254,
      "y": 0.8778373599052429,
      "z": -0.0037720394320786
    }, {
      "x": 0.5404468774795532,
      "y": 0.880696177482605,
      "z": -0.005610354244709015
    }, {
      "x": 0.5392338633537292,
      "y": 0.8845721483230591,
      "z": -0.007352025713771582
    }, {
      "x": 0.538469672203064,
      "y": 0.8891173601150513,
      "z": -0.005154991988092661
    }, {
      "x": 0.5189250111579895,
      "y": 0.8452741503715515,
      "z": -0.009755070321261883
    }, {
      "x": 0.4258975088596344,
      "y": 0.7662280797958374,
      "z": 0.1387351155281067
    }, {
      "x": 0.5725725293159485,
      "y": 0.8041572570800781,
      "z": -0.04583907872438431
    }, {
      "x": 0.5342061519622803,
      "y": 0.8785833120346069,
      "z": 0.002659974154084921
    }, {
      "x": 0.5324031114578247,
      "y": 0.8804071545600891,
      "z": 0.0017832003068178892
    }, {
      "x": 0.5538818836212158,
      "y": 0.8078407645225525,
      "z": -0.03254539892077446
    }, {
      "x": 0.5325431823730469,
      "y": 0.8026832938194275,
      "z": -0.019140373915433884
    }, {
      "x": 0.5514076948165894,
      "y": 0.8043903112411499,
      "z": -0.03313535451889038
    }, {
      "x": 0.5131856203079224,
      "y": 0.7284771800041199,
      "z": -0.009399853646755219
    }, {
      "x": 0.49331504106521606,
      "y": 0.7443980574607849,
      "z": -0.005225230939686298
    }, {
      "x": 0.5239617824554443,
      "y": 0.7807451486587524,
      "z": -0.025881027802824974
    }, {
      "x": 0.4473606050014496,
      "y": 0.5315827131271362,
      "z": 0.011164786294102669
    }, {
      "x": 0.45718759298324585,
      "y": 0.5604941248893738,
      "z": -0.005943301599472761
    }, {
      "x": 0.4670005738735199,
      "y": 0.5909327268600464,
      "z": -0.019681761041283607
    }, {
      "x": 0.5311570167541504,
      "y": 0.9076261520385742,
      "z": 0.00389476353302598
    }, {
      "x": 0.5249923467636108,
      "y": 0.5893563628196716,
      "z": -0.037981919944286346
    }, {
      "x": 0.5166932344436646,
      "y": 0.5429551005363464,
      "z": -0.03319704160094261
    }, {
      "x": 0.5085030198097229,
      "y": 0.49676206707954407,
      "z": -0.02691275253891945
    }, {
      "x": 0.4687720239162445,
      "y": 0.6834565997123718,
      "z": 0.008113506250083447
    }, {
      "x": 0.4426414966583252,
      "y": 0.7069531679153442,
      "z": 0.028577271848917007
    }, {
      "x": 0.5230373740196228,
      "y": 0.6675713658332825,
      "z": 0.001773772411979735
    }, {
      "x": 0.4481240212917328,
      "y": 0.6527872085571289,
      "z": 0.012414850294589996
    }, {
      "x": 0.5339856743812561,
      "y": 0.7012367844581604,
      "z": -0.020220188423991203
    }, {
      "x": 0.5347223281860352,
      "y": 0.7761190533638,
      "z": -0.05141595005989075
    }, {
      "x": 0.4315067231655121,
      "y": 0.7211957573890686,
      "z": 0.04381405934691429
    }, {
      "x": 0.45203351974487305,
      "y": 0.7206180095672607,
      "z": 0.017288070172071457
    }, {
      "x": 0.46892452239990234,
      "y": 0.7265436053276062,
      "z": 0.005602988880127668
    }, {
      "x": 0.49314674735069275,
      "y": 0.7202282547950745,
      "z": -6408205372281373e-19
    }, {
      "x": 0.5104925632476807,
      "y": 0.7091827392578125,
      "z": -0.00362918758764863
    }, {
      "x": 0.5232142210006714,
      "y": 0.698553740978241,
      "z": -0.00787867046892643
    }, {
      "x": 0.5497883558273315,
      "y": 0.6743605136871338,
      "z": -0.036349106580019
    }, {
      "x": 0.43658503890037537,
      "y": 0.7627100348472595,
      "z": 0.042555369436740875
    }, {
      "x": 0.4397648870944977,
      "y": 0.6528646349906921,
      "z": 0.017956094816327095
    }, {
      "x": 0.5653332471847534,
      "y": 0.7992802858352661,
      "z": -0.06365057826042175
    }, {
      "x": 0.5285563468933105,
      "y": 0.736810564994812,
      "z": -0.018836988136172295
    }, {
      "x": 0.4180678725242615,
      "y": 0.6792560815811157,
      "z": 0.12284679710865021
    }, {
      "x": 0.5328429937362671,
      "y": 0.6865872144699097,
      "z": -0.010484723374247551
    }, {
      "x": 0.5230283141136169,
      "y": 0.7809416055679321,
      "z": -0.011922398582100868
    }, {
      "x": 0.4551771283149719,
      "y": 0.6650775074958801,
      "z": 0.01774493046104908
    }, {
      "x": 0.5337203741073608,
      "y": 0.7618928551673889,
      "z": -0.04697106033563614
    }, {
      "x": 0.43463975191116333,
      "y": 0.8133478164672852,
      "z": 0.1354849934577942
    }, {
      "x": 0.5225707292556763,
      "y": 0.6605283617973328,
      "z": 0.004980515688657761
    }, {
      "x": 0.5441933870315552,
      "y": 0.7497199773788452,
      "z": -0.06091512367129326
    }, {
      "x": 0.4774007797241211,
      "y": 0.9159183502197266,
      "z": 0.059622734785079956
    }, {
      "x": 0.48068761825561523,
      "y": 0.9364941716194153,
      "z": 0.08404944837093353
    }, {
      "x": 0.4268292486667633,
      "y": 0.7657528519630432,
      "z": 0.09051097184419632
    }, {
      "x": 0.46051913499832153,
      "y": 0.8880485892295837,
      "z": 0.0738474428653717
    }, {
      "x": 0.4243420660495758,
      "y": 0.6434382200241089,
      "z": 0.06230505183339119
    }, {
      "x": 0.5342157483100891,
      "y": 0.9835634231567383,
      "z": 0.021662971004843712
    }, {
      "x": 0.5668109655380249,
      "y": 0.8042187094688416,
      "z": -0.044937074184417725
    }, {
      "x": 0.5176341533660889,
      "y": 0.7530587315559387,
      "z": -0.012967454269528389
    }, {
      "x": 0.430206298828125,
      "y": 0.6835605502128601,
      "z": 0.04612284153699875
    }, {
      "x": 0.4794231951236725,
      "y": 0.6732114553451538,
      "z": 0.003970044665038586
    }, {
      "x": 0.49073347449302673,
      "y": 0.6722435355186462,
      "z": 8692514384165406e-19
    }, {
      "x": 0.5294116139411926,
      "y": 0.884677529335022,
      "z": 0.004413890186697245
    }, {
      "x": 0.4430122375488281,
      "y": 0.80235356092453,
      "z": 0.04987282305955887
    }, {
      "x": 0.5603825449943542,
      "y": 1.0092442035675049,
      "z": 0.026417359709739685
    }, {
      "x": 0.5186598300933838,
      "y": 0.9828659892082214,
      "z": 0.0513598807156086
    }, {
      "x": 0.5010536909103394,
      "y": 0.9640932679176331,
      "z": 0.06591596454381943
    }, {
      "x": 0.5524769425392151,
      "y": 0.539441704750061,
      "z": -0.035816047340631485
    }, {
      "x": 0.5879997611045837,
      "y": 1.0091472864151,
      "z": 0.02285068854689598
    }, {
      "x": 0.5016193985939026,
      "y": 0.6684437990188599,
      "z": 28415941051207483e-20
    }, {
      "x": 0.511952817440033,
      "y": 0.6642197370529175,
      "z": 0.0021144719794392586
    }, {
      "x": 0.5194343328475952,
      "y": 0.6623469591140747,
      "z": 0.004674181342124939
    }, {
      "x": 0.4321230351924896,
      "y": 0.6496355533599854,
      "z": 0.03124697133898735
    }, {
      "x": 0.508686363697052,
      "y": 0.6479565501213074,
      "z": -44765998609364033e-20
    }, {
      "x": 0.4963986277580261,
      "y": 0.6431032419204712,
      "z": -0.0032507688738405704
    }, {
      "x": 0.4845542013645172,
      "y": 0.6430778503417969,
      "z": -0.002903624437749386
    }, {
      "x": 0.4733612537384033,
      "y": 0.647506833076477,
      "z": 23347247042693198e-20
    }, {
      "x": 0.4668654501438141,
      "y": 0.653346598148346,
      "z": 0.004762572236359119
    }, {
      "x": 0.41815051436424255,
      "y": 0.633708119392395,
      "z": 0.09809435904026031
    }, {
      "x": 0.47159942984580994,
      "y": 0.6711485385894775,
      "z": 0.007849935442209244
    }, {
      "x": 0.5734396576881409,
      "y": 0.8256140351295471,
      "z": -0.03155219927430153
    }, {
      "x": 0.5306524038314819,
      "y": 0.8337990641593933,
      "z": -0.018351426348090172
    }, {
      "x": 0.5371729135513306,
      "y": 0.7910830974578857,
      "z": -0.037286680191755295
    }, {
      "x": 0.5549534559249878,
      "y": 0.8275275826454163,
      "z": -0.030664825811982155
    }, {
      "x": 0.5597432255744934,
      "y": 0.6418541669845581,
      "z": -0.03318847343325615
    }, {
      "x": 0.4958484172821045,
      "y": 0.9429569244384766,
      "z": 0.048340678215026855
    }, {
      "x": 0.5140507817268372,
      "y": 0.9634028077125549,
      "z": 0.03589847311377525
    }, {
      "x": 0.5587693452835083,
      "y": 0.9951097369194031,
      "z": 0.00908728688955307
    }, {
      "x": 0.46411189436912537,
      "y": 0.9051855206489563,
      "z": 0.10601935535669327
    }, {
      "x": 0.5181609392166138,
      "y": 0.6554316878318787,
      "z": 0.002546071307733655
    }, {
      "x": 0.5436590909957886,
      "y": 0.7085841298103333,
      "z": -0.03844436630606651
    }, {
      "x": 0.5872187614440918,
      "y": 0.9960382580757141,
      "z": 0.0063423276878893375
    }, {
      "x": 0.5379653573036194,
      "y": 0.9989125728607178,
      "z": 0.03636329993605614
    }, {
      "x": 0.4350326955318451,
      "y": 0.8088565468788147,
      "z": 0.09147704392671585
    }, {
      "x": 0.5523084998130798,
      "y": 0.8773422837257385,
      "z": -0.009068487212061882
    }, {
      "x": 0.5510149598121643,
      "y": 0.8816931843757629,
      "z": -0.011043853126466274
    }, {
      "x": 0.5503793954849243,
      "y": 0.88776695728302,
      "z": -0.01348799467086792
    }, {
      "x": 0.5501549243927002,
      "y": 0.8954370617866516,
      "z": -0.012142189778387547
    }, {
      "x": 0.546072781085968,
      "y": 0.9192524552345276,
      "z": -0.003157563041895628
    }, {
      "x": 0.5314661860466003,
      "y": 0.8771666884422302,
      "z": 5075141089037061e-19
    }, {
      "x": 0.5293324589729309,
      "y": 0.8762547969818115,
      "z": 39177737198770046e-20
    }, {
      "x": 0.5275698900222778,
      "y": 0.8750609755516052,
      "z": 47732755774632096e-21
    }, {
      "x": 0.5104271173477173,
      "y": 0.8607332110404968,
      "z": 0.0012934643309563398
    }, {
      "x": 0.45938700437545776,
      "y": 0.8134918212890625,
      "z": 0.023569690063595772
    }, {
      "x": 0.5418947339057922,
      "y": 0.6864100694656372,
      "z": -0.027333909645676613
    }, {
      "x": 0.531914234161377,
      "y": 0.6456130743026733,
      "z": -0.005434140563011169
    }, {
      "x": 0.523697018623352,
      "y": 0.647885262966156,
      "z": -2466466394253075e-19
    }, {
      "x": 0.5338191390037537,
      "y": 0.8783687353134155,
      "z": 0.002268768846988678
    }, {
      "x": 0.46226605772972107,
      "y": 0.8610277771949768,
      "z": 0.04718952998518944
    }, {
      "x": 0.5434442758560181,
      "y": 0.6456181406974792,
      "z": -0.02327350154519081
    }, {
      "x": 0.5399754643440247,
      "y": 0.940219521522522,
      "z": 0.005075343884527683
    }, {
      "x": 0.5661457777023315,
      "y": 0.71457839012146,
      "z": -0.06242101639509201
    }, {
      "x": 0.5523148775100708,
      "y": 0.6974870562553406,
      "z": -0.04863070324063301
    }, {
      "x": 0.5639959573745728,
      "y": 0.6923378109931946,
      "z": -0.05180761218070984
    }, {
      "x": 0.5367592573165894,
      "y": 0.7423217296600342,
      "z": -0.03623027727007866
    }, {
      "x": 0.5853689908981323,
      "y": 0.9752064943313599,
      "z": -0.002361974213272333
    }, {
      "x": 0.5835235118865967,
      "y": 0.9493685960769653,
      "z": -0.003941743168979883
    }, {
      "x": 0.5615018606185913,
      "y": 0.949194610118866,
      "z": -0.0015953965485095978
    }, {
      "x": 0.5068561434745789,
      "y": 0.9048219323158264,
      "z": 0.01862684078514576
    }, {
      "x": 0.5134067535400391,
      "y": 0.7971825003623962,
      "z": -0.008485661819577217
    }, {
      "x": 0.5223897099494934,
      "y": 0.925589919090271,
      "z": 0.01249657291918993
    }, {
      "x": 0.48500555753707886,
      "y": 0.7959478497505188,
      "z": -0.0032065745908766985
    }, {
      "x": 0.5037734508514404,
      "y": 0.8184596300125122,
      "z": -0.004932103678584099
    }, {
      "x": 0.4766361117362976,
      "y": 0.828806459903717,
      "z": 0.01027688942849636
    }, {
      "x": 0.5589827299118042,
      "y": 0.974656343460083,
      "z": 9666886180639267e-19
    }, {
      "x": 0.5294582843780518,
      "y": 0.7541216611862183,
      "z": -0.025603046640753746
    }, {
      "x": 0.4973002076148987,
      "y": 0.9208990931510925,
      "z": 0.031931452453136444
    }, {
      "x": 0.5163551568984985,
      "y": 0.9432790875434875,
      "z": 0.024321340024471283
    }, {
      "x": 0.49399662017822266,
      "y": 0.8814862370491028,
      "z": 0.018687399104237556
    }, {
      "x": 0.44948166608810425,
      "y": 0.836137592792511,
      "z": 0.05702034756541252
    }, {
      "x": 0.47898444533348083,
      "y": 0.8836610913276672,
      "z": 0.03150695189833641
    }, {
      "x": 0.4454479217529297,
      "y": 0.8499438166618347,
      "z": 0.08868525922298431
    }, {
      "x": 0.49572959542274475,
      "y": 0.8452823758125305,
      "z": 0.0036111653316766024
    }, {
      "x": 0.5362502336502075,
      "y": 0.7222585678100586,
      "z": -0.027912352234125137
    }, {
      "x": 0.5393770337104797,
      "y": 0.7850722074508667,
      "z": -0.05415399745106697
    }, {
      "x": 0.531399667263031,
      "y": 0.7898418307304382,
      "z": -0.03883346915245056
    }, {
      "x": 0.5451627373695374,
      "y": 0.7717036604881287,
      "z": -0.06480253487825394
    }, {
      "x": 0.5206395983695984,
      "y": 0.6287745833396912,
      "z": -0.010521138086915016
    }, {
      "x": 0.4974782466888428,
      "y": 0.6191938519477844,
      "z": -0.014098240062594414
    }, {
      "x": 0.4774145185947418,
      "y": 0.6193130612373352,
      "z": -0.013643337413668633
    }, {
      "x": 0.4616098403930664,
      "y": 0.6259890198707581,
      "z": -0.008448202162981033
    }, {
      "x": 0.4516478478908539,
      "y": 0.6368461847305298,
      "z": 9050309745362028e-20
    }, {
      "x": 0.4485096037387848,
      "y": 0.6719120740890503,
      "z": 0.022984720766544342
    }, {
      "x": 0.42177659273147583,
      "y": 0.7240667343139648,
      "z": 0.08511673659086227
    }, {
      "x": 0.4616215229034424,
      "y": 0.6988231539726257,
      "z": 0.014238474890589714
    }, {
      "x": 0.4755798876285553,
      "y": 0.7034608721733093,
      "z": 0.00625590980052948
    }, {
      "x": 0.4924992024898529,
      "y": 0.7005885243415833,
      "z": 9391739731654525e-19
    }, {
      "x": 0.5082254409790039,
      "y": 0.693384051322937,
      "z": -9464038303121924e-19
    }, {
      "x": 0.5203112959861755,
      "y": 0.6849707961082458,
      "z": -0.0022114769089967012
    }, {
      "x": 0.52867591381073,
      "y": 0.6779075860977173,
      "z": -0.002962538506835699
    }, {
      "x": 0.4213953912258148,
      "y": 0.7219811677932739,
      "z": 0.1350894570350647
    }, {
      "x": 0.5320829749107361,
      "y": 0.794858992099762,
      "z": -0.03181503340601921
    }, {
      "x": 0.5452795028686523,
      "y": 0.7286570072174072,
      "z": -0.04771539941430092
    }, {
      "x": 0.5496407747268677,
      "y": 0.7866933345794678,
      "z": -0.06452003121376038
    }, {
      "x": 0.557040274143219,
      "y": 0.7962084412574768,
      "z": -0.05837344378232956
    }, {
      "x": 0.549176812171936,
      "y": 0.7895247936248779,
      "z": -0.057761140167713165
    }, {
      "x": 0.5362890362739563,
      "y": 0.8005836606025696,
      "z": -0.026903774589300156
    }, {
      "x": 0.560200035572052,
      "y": 0.7983731031417847,
      "z": -0.06172555685043335
    }, {
      "x": 0.5616944432258606,
      "y": 0.8022753596305847,
      "z": -0.045200999826192856
    }, {
      "x": 0.5273328423500061,
      "y": 0.6611284017562866,
      "z": 0.0029021520167589188
    }, {
      "x": 0.534850537776947,
      "y": 0.6660012006759644,
      "z": -0.005215510260313749
    }, {
      "x": 0.5394860506057739,
      "y": 0.6701375246047974,
      "z": -0.014931917190551758
    }, {
      "x": 0.4634307324886322,
      "y": 0.658291757106781,
      "z": 0.009295716881752014
    }, {
      "x": 0.4538393020629883,
      "y": 0.6519932150840759,
      "z": 0.00930330716073513
    }, {
      "x": 0.5776031613349915,
      "y": 0.7159298658370972,
      "z": -0.057365912944078445
    }, {
      "x": 0.6504855155944824,
      "y": 0.6461779475212097,
      "z": 0.014184834435582161
    }, {
      "x": 0.5860154032707214,
      "y": 0.7962266206741333,
      "z": -0.04522843658924103
    }, {
      "x": 0.6842049360275269,
      "y": 0.5631637573242188,
      "z": 0.07207967340946198
    }, {
      "x": 0.6152560710906982,
      "y": 0.6674962639808655,
      "z": 7529259892180562e-19
    }, {
      "x": 0.6280948519706726,
      "y": 0.6684326529502869,
      "z": 0.0016892586136236787
    }, {
      "x": 0.6408625245094299,
      "y": 0.6663892269134521,
      "z": 0.005331226624548435
    }, {
      "x": 0.6557814478874207,
      "y": 0.6534678936004639,
      "z": 0.01646413467824459
    }, {
      "x": 0.6035663485527039,
      "y": 0.6639701724052429,
      "z": 0.0013799630105495453
    }, {
      "x": 0.6329053044319153,
      "y": 0.608010470867157,
      "z": -0.006195899099111557
    }, {
      "x": 0.6167260408401489,
      "y": 0.6117533445358276,
      "z": -0.006319951266050339
    }, {
      "x": 0.6471013426780701,
      "y": 0.6112449765205383,
      "z": -0.0017843559617176652
    }, {
      "x": 0.6560901999473572,
      "y": 0.6185776591300964,
      "z": 0.004047257360070944
    }, {
      "x": 0.6666946411132812,
      "y": 0.6651176810264587,
      "z": 0.023647578433156013
    }, {
      "x": 0.6311345100402832,
      "y": 0.9495396018028259,
      "z": 0.014004078693687916
    }, {
      "x": 0.6544655561447144,
      "y": 0.6397901773452759,
      "z": 0.01809609681367874
    }, {
      "x": 0.6965808868408203,
      "y": 0.6482675075531006,
      "z": 0.08304904401302338
    }, {
      "x": 0.679817259311676,
      "y": 0.650188148021698,
      "z": 0.03632688894867897
    }, {
      "x": 0.6336516737937927,
      "y": 0.7541458010673523,
      "z": -0.007742783520370722
    }, {
      "x": 0.5921701192855835,
      "y": 0.8567668199539185,
      "z": -0.029399123042821884
    }, {
      "x": 0.591663658618927,
      "y": 0.870215654373169,
      "z": -0.02103729173541069
    }, {
      "x": 0.6068367958068848,
      "y": 0.8584195375442505,
      "z": -0.020668085664510727
    }, {
      "x": 0.6176617741584778,
      "y": 0.860965371131897,
      "z": -0.009790095500648022
    }, {
      "x": 0.6040634512901306,
      "y": 0.8686612844467163,
      "z": -0.015289564616978168
    }, {
      "x": 0.6143736839294434,
      "y": 0.8671170473098755,
      "z": -0.005712216719985008
    }, {
      "x": 0.6373105049133301,
      "y": 0.8815656900405884,
      "z": 0.012672550976276398
    }, {
      "x": 0.5832505822181702,
      "y": 0.7866312861442566,
      "z": -0.07051534950733185
    }, {
      "x": 0.5836675763130188,
      "y": 0.7658692598342896,
      "z": -0.07566110789775848
    }, {
      "x": 0.6709531545639038,
      "y": 0.604898989200592,
      "z": 0.005951565690338612
    }, {
      "x": 0.6029891967773438,
      "y": 0.705652117729187,
      "z": -0.013388276100158691
    }, {
      "x": 0.6131622195243835,
      "y": 0.7728396058082581,
      "z": -0.036248479038476944
    }, {
      "x": 0.6123163104057312,
      "y": 0.7612020373344421,
      "z": -0.03264721855521202
    }, {
      "x": 0.6696187853813171,
      "y": 0.744706928730011,
      "z": 0.009673702530562878
    }, {
      "x": 0.5803102254867554,
      "y": 0.7385968565940857,
      "z": -0.0689152330160141
    }, {
      "x": 0.6404349207878113,
      "y": 0.5877999663352966,
      "z": -0.01929756999015808
    }, {
      "x": 0.6588467955589294,
      "y": 0.5929454565048218,
      "z": -0.008487257175147533
    }, {
      "x": 0.6720337867736816,
      "y": 0.530631422996521,
      "z": 0.043437421321868896
    }, {
      "x": 0.584305465221405,
      "y": 0.6099005341529846,
      "z": -0.030301367864012718
    }, {
      "x": 0.6034283638000488,
      "y": 0.6217452883720398,
      "z": -0.001970183802768588
    }, {
      "x": 0.6460927724838257,
      "y": 0.8608663082122803,
      "z": 0.015541625209152699
    }, {
      "x": 0.6957815289497375,
      "y": 0.8326103091239929,
      "z": 0.13015234470367432
    }, {
      "x": 0.6043362617492676,
      "y": 0.7861682772636414,
      "z": -0.030476901680231094
    }, {
      "x": 0.594293475151062,
      "y": 0.7942103147506714,
      "z": -0.032218821346759796
    }, {
      "x": 0.6324057579040527,
      "y": 0.8665139675140381,
      "z": 0.014255806803703308
    }, {
      "x": 0.6296147704124451,
      "y": 0.8667733669281006,
      "z": 0.010388285852968693
    }, {
      "x": 0.663644552230835,
      "y": 0.5798642635345459,
      "z": -0.0022301070857793093
    }, {
      "x": 0.6140630841255188,
      "y": 0.7809288501739502,
      "z": -0.02835679054260254
    }, {
      "x": 0.615908145904541,
      "y": 0.5921698212623596,
      "z": -0.026804860681295395
    }, {
      "x": 0.617181122303009,
      "y": 0.5748661756515503,
      "z": -0.03060605563223362
    }, {
      "x": 0.6222207546234131,
      "y": 0.49137672781944275,
      "z": -0.011151673272252083
    }, {
      "x": 0.6669357419013977,
      "y": 0.5541607141494751,
      "z": 0.017466170713305473
    }, {
      "x": 0.6182981729507446,
      "y": 0.5320425629615784,
      "z": -0.021793590858578682
    }, {
      "x": 0.6760554313659668,
      "y": 0.595052182674408,
      "z": 0.017115700989961624
    }, {
      "x": 0.6801463961601257,
      "y": 0.5800720453262329,
      "z": 0.043127160519361496
    }, {
      "x": 0.5922210812568665,
      "y": 0.8644017577171326,
      "z": -0.02662893570959568
    }, {
      "x": 0.6054555177688599,
      "y": 0.8637874722480774,
      "z": -0.018363753333687782
    }, {
      "x": 0.6161889433860779,
      "y": 0.8641164898872375,
      "z": -0.008808949030935764
    }, {
      "x": 0.6017249822616577,
      "y": 0.7901403307914734,
      "z": -0.028126630932092667
    }, {
      "x": 0.631446123123169,
      "y": 0.8664817810058594,
      "z": 0.012112865224480629
    }, {
      "x": 0.6249198913574219,
      "y": 0.8716511130332947,
      "z": 0.003882825840264559
    }, {
      "x": 0.6281915903091431,
      "y": 0.867301881313324,
      "z": 0.009891441091895103
    }, {
      "x": 0.5986843109130859,
      "y": 0.7813931703567505,
      "z": -0.050227612257003784
    }, {
      "x": 0.6126407384872437,
      "y": 0.869275689125061,
      "z": -0.0031255714129656553
    }, {
      "x": 0.6027271151542664,
      "y": 0.8711842894554138,
      "z": -0.009324162267148495
    }, {
      "x": 0.59088134765625,
      "y": 0.8742044568061829,
      "z": -0.014608660712838173
    }, {
      "x": 0.5984604358673096,
      "y": 0.9216185212135315,
      "z": -0.005981989670544863
    }, {
      "x": 0.5950398445129395,
      "y": 0.8964707255363464,
      "z": -0.01703473925590515
    }, {
      "x": 0.5941568613052368,
      "y": 0.8882410526275635,
      "z": -0.017784785479307175
    }, {
      "x": 0.5928806662559509,
      "y": 0.8803883194923401,
      "z": -0.014153128489851952
    }, {
      "x": 0.5909661054611206,
      "y": 0.8748103976249695,
      "z": -0.012609979137778282
    }, {
      "x": 0.6128016710281372,
      "y": 0.8702545762062073,
      "z": -0.0022550546564161777
    }, {
      "x": 0.6150846481323242,
      "y": 0.8726804256439209,
      "z": -0.00414019962772727
    }, {
      "x": 0.6173093914985657,
      "y": 0.8770190477371216,
      "z": -0.005970994010567665
    }, {
      "x": 0.619335412979126,
      "y": 0.8814800977706909,
      "z": -0.0036864024586975574
    }, {
      "x": 0.6292637586593628,
      "y": 0.8314558267593384,
      "z": -0.007714875973761082
    }, {
      "x": 0.702275276184082,
      "y": 0.7320667505264282,
      "z": 0.1433621346950531
    }, {
      "x": 0.6204835176467896,
      "y": 0.8689177632331848,
      "z": 0.0044869170524179935
    }, {
      "x": 0.6223508715629578,
      "y": 0.8704851269721985,
      "z": 0.00352082890458405
    }, {
      "x": 0.590448260307312,
      "y": 0.8029727935791016,
      "z": -0.03200828656554222
    }, {
      "x": 0.6097423434257507,
      "y": 0.7933741211891174,
      "z": -0.018042555078864098
    }, {
      "x": 0.59229576587677,
      "y": 0.7993767261505127,
      "z": -0.032564569264650345
    }, {
      "x": 0.6171364188194275,
      "y": 0.7153720259666443,
      "z": -0.007672437466681004
    }, {
      "x": 0.6389747858047485,
      "y": 0.726390540599823,
      "z": -0.002999067772179842
    }, {
      "x": 0.6151940226554871,
      "y": 0.769412100315094,
      "z": -0.024427521973848343
    }, {
      "x": 0.6526776552200317,
      "y": 0.505868136882782,
      "z": 0.01412637997418642
    }, {
      "x": 0.6475822329521179,
      "y": 0.5375454425811768,
      "z": -0.0033899128902703524
    }, {
      "x": 0.6433356404304504,
      "y": 0.5714520215988159,
      "z": -0.017428796738386154
    }, {
      "x": 0.626949667930603,
      "y": 0.8962116837501526,
      "z": 0.005602736957371235
    }, {
      "x": 0.5868416428565979,
      "y": 0.5829002261161804,
      "z": -0.03727729618549347
    }, {
      "x": 0.5877229571342468,
      "y": 0.5345035791397095,
      "z": -0.032396964728832245
    }, {
      "x": 0.5887066125869751,
      "y": 0.48655083775520325,
      "z": -0.025856535881757736
    }, {
      "x": 0.6507197618484497,
      "y": 0.6612282991409302,
      "z": 0.011114613153040409
    }, {
      "x": 0.6803066730499268,
      "y": 0.677992045879364,
      "z": 0.032125361263751984
    }, {
      "x": 0.5963194370269775,
      "y": 0.6598632335662842,
      "z": 0.002976928371936083
    }, {
      "x": 0.667536199092865,
      "y": 0.6274255514144897,
      "z": 0.015618261881172657
    }, {
      "x": 0.5930740833282471,
      "y": 0.6940041780471802,
      "z": -0.019217798486351967
    }, {
      "x": 0.6053346395492554,
      "y": 0.7676517963409424,
      "z": -0.050308309495449066
    }, {
      "x": 0.6934473514556885,
      "y": 0.6884298920631409,
      "z": 0.04794462397694588
    }, {
      "x": 0.6738007664680481,
      "y": 0.6934011578559875,
      "z": 0.020697161555290222
    }, {
      "x": 0.6588084697723389,
      "y": 0.7033141851425171,
      "z": 0.008462334051728249
    }, {
      "x": 0.6346072554588318,
      "y": 0.7029502391815186,
      "z": 0.001542167621664703
    }, {
      "x": 0.6157816648483276,
      "y": 0.6966525912284851,
      "z": -0.002009218093007803
    }, {
      "x": 0.6015574336051941,
      "y": 0.688928484916687,
      "z": -0.006588225718587637
    }, {
      "x": 0.5746836066246033,
      "y": 0.6711069345474243,
      "z": -0.03597589209675789
    }, {
      "x": 0.6947521567344666,
      "y": 0.7309479117393494,
      "z": 0.046707939356565475
    }, {
      "x": 0.6759101152420044,
      "y": 0.6249120831489563,
      "z": 0.021654341369867325
    }, {
      "x": 0.5794773101806641,
      "y": 0.7971615195274353,
      "z": -0.06339326500892639
    }, {
      "x": 0.6041849851608276,
      "y": 0.727514922618866,
      "z": -0.017512541264295578
    }, {
      "x": 0.6968844532966614,
      "y": 0.6440950036048889,
      "z": 0.12727996706962585
    }, {
      "x": 0.5910853147506714,
      "y": 0.679325520992279,
      "z": -0.009497715160250664
    }, {
      "x": 0.6157375574111938,
      "y": 0.7695677280426025,
      "z": -0.010624290443956852
    }, {
      "x": 0.6606494784355164,
      "y": 0.6410489678382874,
      "z": 0.0208158977329731
    }, {
      "x": 0.6040687561035156,
      "y": 0.7531470656394958,
      "z": -0.045887019485235214
    }, {
      "x": 0.7012156248092651,
      "y": 0.780247151851654,
      "z": 0.14028730988502502
    }, {
      "x": 0.595149576663971,
      "y": 0.6527782678604126,
      "z": 0.006308757700026035
    }, {
      "x": 0.5925500392913818,
      "y": 0.7436665892601013,
      "z": -0.060151755809783936
    }, {
      "x": 0.6780198812484741,
      "y": 0.8905693888664246,
      "z": 0.0626060739159584
    }, {
      "x": 0.676746666431427,
      "y": 0.9113880395889282,
      "z": 0.08726003766059875
    }, {
      "x": 0.7030686140060425,
      "y": 0.7312687635421753,
      "z": 0.09529774636030197
    }, {
      "x": 0.688987135887146,
      "y": 0.8588417172431946,
      "z": 0.07752864807844162
    }, {
      "x": 0.6883691549301147,
      "y": 0.6109960675239563,
      "z": 0.06669612973928452
    }, {
      "x": 0.6358906030654907,
      "y": 0.9702065587043762,
      "z": 0.023120900616049767
    }, {
      "x": 0.5781539678573608,
      "y": 0.8023634552955627,
      "z": -0.044763918966054916
    }, {
      "x": 0.6170316934585571,
      "y": 0.7408350706100464,
      "z": -0.011375460773706436
    }, {
      "x": 0.688542366027832,
      "y": 0.6516284346580505,
      "z": 0.050206027925014496
    }, {
      "x": 0.6385149359703064,
      "y": 0.6540714502334595,
      "z": 0.006462941411882639
    }, {
      "x": 0.6279382109642029,
      "y": 0.6563615798950195,
      "z": 0.003062846139073372
    }, {
      "x": 0.6268895268440247,
      "y": 0.8736732006072998,
      "z": 0.00627936702221632
    }, {
      "x": 0.6944946050643921,
      "y": 0.7709181308746338,
      "z": 0.053824134171009064
    }, {
      "x": 0.614617109298706,
      "y": 1.0022112131118774,
      "z": 0.02719894051551819
    }, {
      "x": 0.6493719220161438,
      "y": 0.9665167927742004,
      "z": 0.053563784807920456
    }, {
      "x": 0.6624587178230286,
      "y": 0.943530797958374,
      "z": 0.068605437874794
    }, {
      "x": 0.6162528991699219,
      "y": 0.6558693051338196,
      "z": 0.002187855076044798
    }, {
      "x": 0.6058168411254883,
      "y": 0.654328465461731,
      "z": 0.0036193584091961384
    }, {
      "x": 0.5987918972969055,
      "y": 0.6536934971809387,
      "z": 0.006134530063718557
    }, {
      "x": 0.6831037402153015,
      "y": 0.6195642948150635,
      "z": 0.03511790186166763
    }, {
      "x": 0.6062582731246948,
      "y": 0.6356398463249207,
      "z": 0.001280312892049551
    }, {
      "x": 0.6174948811531067,
      "y": 0.62776118516922,
      "z": -0.0013642468256875873
    }, {
      "x": 0.6297246217727661,
      "y": 0.6253792643547058,
      "z": -7034156005829573e-19
    }, {
      "x": 0.6407091617584229,
      "y": 0.627578616142273,
      "z": 0.0028144705574959517
    }, {
      "x": 0.6479622721672058,
      "y": 0.6322650909423828,
      "z": 0.00750273372977972
    }, {
      "x": 0.6915091276168823,
      "y": 0.5990704298019409,
      "z": 0.10270945727825165
    }, {
      "x": 0.6457163095474243,
      "y": 0.6504453420639038,
      "z": 0.010696077719330788
    }, {
      "x": 0.6164222955703735,
      "y": 0.8231936097145081,
      "z": -0.016772059723734856
    }, {
      "x": 0.6042401194572449,
      "y": 0.7830976843833923,
      "z": -0.03630910441279411
    }, {
      "x": 0.5922216773033142,
      "y": 0.8228387236595154,
      "z": -0.029992375522851944
    }, {
      "x": 0.6646111011505127,
      "y": 0.92097008228302,
      "z": 0.050967294722795486
    }, {
      "x": 0.651232898235321,
      "y": 0.9460107088088989,
      "z": 0.038000158965587616
    }, {
      "x": 0.6140977144241333,
      "y": 0.9882472157478333,
      "z": 0.009882091544568539
    }, {
      "x": 0.6870781183242798,
      "y": 0.8768675327301025,
      "z": 0.10980932414531708
    }, {
      "x": 0.5986856818199158,
      "y": 0.6456438899040222,
      "z": 0.003999010659754276
    }, {
      "x": 0.585981547832489,
      "y": 0.7034481763839722,
      "z": -0.0377722829580307
    }, {
      "x": 0.6342031359672546,
      "y": 0.9867448806762695,
      "z": 0.03786521404981613
    }, {
      "x": 0.7013950943946838,
      "y": 0.776049017906189,
      "z": 0.09598205983638763
    }, {
      "x": 0.6030206680297852,
      "y": 0.8719133138656616,
      "z": -0.007931148633360863
    }, {
      "x": 0.6050592064857483,
      "y": 0.8767156004905701,
      "z": -0.009791925549507141
    }, {
      "x": 0.6073468923568726,
      "y": 0.8831382393836975,
      "z": -0.012361008673906326
    }, {
      "x": 0.6087977290153503,
      "y": 0.890143632888794,
      "z": -0.01098148338496685
    }, {
      "x": 0.6147705316543579,
      "y": 0.9110084772109985,
      "z": -0.0018823575228452682
    }, {
      "x": 0.622577965259552,
      "y": 0.8670604825019836,
      "z": 0.002609190298244357
    }, {
      "x": 0.6241236329078674,
      "y": 0.8651344180107117,
      "z": 0.0025534380692988634
    }, {
      "x": 0.6257084608078003,
      "y": 0.8638408184051514,
      "z": 0.0023300074972212315
    }, {
      "x": 0.639931321144104,
      "y": 0.8449671268463135,
      "z": 0.0038123116828501225
    }, {
      "x": 0.6810906529426575,
      "y": 0.7856625318527222,
      "z": 0.02717764675617218
    }, {
      "x": 0.583532452583313,
      "y": 0.6811994910240173,
      "z": -0.026588857173919678
    }, {
      "x": 0.5855660438537598,
      "y": 0.6393819451332092,
      "z": -0.004512844607234001
    }, {
      "x": 0.5932201743125916,
      "y": 0.6398029327392578,
      "z": 8020466193556786e-19
    }, {
      "x": 0.6200879812240601,
      "y": 0.8683351874351501,
      "z": 0.00417016725987196
    }, {
      "x": 0.6842559576034546,
      "y": 0.8330534100532532,
      "z": 0.050836317241191864
    }, {
      "x": 0.5754412412643433,
      "y": 0.6418221592903137,
      "z": -0.022838059812784195
    }, {
      "x": 0.6232790350914001,
      "y": 0.9295297265052795,
      "z": 0.006339520215988159
    }, {
      "x": 0.5764067769050598,
      "y": 0.694546639919281,
      "z": -0.04825803264975548
    }, {
      "x": 0.59778892993927,
      "y": 0.7343927621841431,
      "z": -0.035004377365112305
    }, {
      "x": 0.6042810678482056,
      "y": 0.9441440105438232,
      "z": -0.0010970570147037506
    }, {
      "x": 0.6496372222900391,
      "y": 0.8869078159332275,
      "z": 0.021036235615611076
    }, {
      "x": 0.6274012327194214,
      "y": 0.7830310463905334,
      "z": -0.006658440921455622
    }, {
      "x": 0.637792706489563,
      "y": 0.9104999899864197,
      "z": 0.014290250837802887
    }, {
      "x": 0.6549934148788452,
      "y": 0.7748609185218811,
      "z": -6672973395325243e-19
    }, {
      "x": 0.6404005289077759,
      "y": 0.801220715045929,
      "z": -0.0026642554439604282
    }, {
      "x": 0.6671456694602966,
      "y": 0.8045546412467957,
      "z": 0.013180811889469624
    }, {
      "x": 0.6107483506202698,
      "y": 0.9680658578872681,
      "z": 0.001778992242179811
    }, {
      "x": 0.6060343980789185,
      "y": 0.744587242603302,
      "z": -0.024382334202528
    }, {
      "x": 0.6602751612663269,
      "y": 0.8998945355415344,
      "z": 0.0344940721988678
    }, {
      "x": 0.6463775038719177,
      "y": 0.9262562394142151,
      "z": 0.02617623284459114
    }, {
      "x": 0.6579852104187012,
      "y": 0.8602304458618164,
      "z": 0.021586716175079346
    }, {
      "x": 0.6926165223121643,
      "y": 0.8053340315818787,
      "z": 0.061075080186128616
    }, {
      "x": 0.6724731922149658,
      "y": 0.8594399690628052,
      "z": 0.03457934781908989
    }, {
      "x": 0.6975721716880798,
      "y": 0.8183245062828064,
      "z": 0.09300774335861206
    }, {
      "x": 0.6512877941131592,
      "y": 0.8258221745491028,
      "z": 0.006324059329926968
    }, {
      "x": 0.594887375831604,
      "y": 0.7148372530937195,
      "z": -0.026898479089140892
    }, {
      "x": 0.6017440557479858,
      "y": 0.7773507833480835,
      "z": -0.05312420800328255
    }, {
      "x": 0.6096571683883667,
      "y": 0.7806998491287231,
      "z": -0.037646256387233734
    }, {
      "x": 0.5952993035316467,
      "y": 0.7654367685317993,
      "z": -0.06398405134677887
    }, {
      "x": 0.5950021147727966,
      "y": 0.6201304793357849,
      "z": -0.009297547861933708
    }, {
      "x": 0.6165438890457153,
      "y": 0.6052900552749634,
      "z": -0.012455573305487633
    }, {
      "x": 0.6362661719322205,
      "y": 0.6015968918800354,
      "z": -0.011649220250546932
    }, {
      "x": 0.6522727608680725,
      "y": 0.6046400666236877,
      "z": -0.005903332494199276
    }, {
      "x": 0.6625409722328186,
      "y": 0.6128141283988953,
      "z": 0.0030042496509850025
    }, {
      "x": 0.6688099503517151,
      "y": 0.6457712054252625,
      "z": 0.026322703808546066
    }, {
      "x": 0.7013440728187561,
      "y": 0.6893666386604309,
      "z": 0.08984331786632538
    }, {
      "x": 0.6608623266220093,
      "y": 0.6749406456947327,
      "z": 0.0172116681933403
    }, {
      "x": 0.6482325196266174,
      "y": 0.6823726296424866,
      "z": 0.008881398476660252
    }, {
      "x": 0.6313265562057495,
      "y": 0.6842025518417358,
      "z": 0.0031308617908507586
    }, {
      "x": 0.6147016286849976,
      "y": 0.6809731721878052,
      "z": 7630771724507213e-19
    }, {
      "x": 0.6018834114074707,
      "y": 0.6755372285842896,
      "z": -8834321051836014e-19
    }, {
      "x": 0.5925027132034302,
      "y": 0.670681357383728,
      "z": -0.001968748401850462
    }, {
      "x": 0.700127363204956,
      "y": 0.6871103644371033,
      "z": 0.13980500400066376
    }, {
      "x": 0.6095665693283081,
      "y": 0.7853189706802368,
      "z": -0.03074747882783413
    }, {
      "x": 0.5880423784255981,
      "y": 0.7229287028312683,
      "z": -0.04691500961780548
    }, {
      "x": 0.5930182337760925,
      "y": 0.7811514139175415,
      "z": -0.06398335844278336
    }, {
      "x": 0.5867722034454346,
      "y": 0.7922660112380981,
      "z": -0.05794971063733101
    }, {
      "x": 0.5933279991149902,
      "y": 0.7842848896980286,
      "z": -0.05714067071676254
    }, {
      "x": 0.6063535809516907,
      "y": 0.7920218706130981,
      "z": -0.02590685710310936
    }, {
      "x": 0.5839452743530273,
      "y": 0.794978141784668,
      "z": -0.0615212507545948
    }, {
      "x": 0.5828126072883606,
      "y": 0.8000800013542175,
      "z": -0.0449722595512867
    }, {
      "x": 0.5909603834152222,
      "y": 0.6541213393211365,
      "z": 0.003991890233010054
    }, {
      "x": 0.5852181911468506,
      "y": 0.6602938771247864,
      "z": -0.004428438376635313
    }, {
      "x": 0.5825737714767456,
      "y": 0.6651063561439514,
      "z": -0.014345290139317513
    }, {
      "x": 0.6517343521118164,
      "y": 0.6362385153770447,
      "z": 0.012151890434324741
    }, {
      "x": 0.6615052819252014,
      "y": 0.6281577944755554,
      "z": 0.0123682152479887
    }, {
      "x": 0.4856873154640198,
      "y": 0.6568945646286011,
      "z": 720038078725338e-18
    }, {
      "x": 0.49988406896591187,
      "y": 0.6547410488128662,
      "z": 6949726957827806e-19
    }, {
      "x": 0.48438939452171326,
      "y": 0.6392973065376282,
      "z": 705525919329375e-18
    }, {
      "x": 0.47143134474754333,
      "y": 0.6589511632919312,
      "z": 6980331381782889e-19
    }, {
      "x": 0.48704618215560913,
      "y": 0.6752797961235046,
      "z": 6921177846379578e-19
    }, {
      "x": 0.6243702173233032,
      "y": 0.640461802482605,
      "z": -6592126737814397e-20
    }, {
      "x": 0.6390967965126038,
      "y": 0.6385173797607422,
      "z": -16105435497593135e-20
    }, {
      "x": 0.6230536699295044,
      "y": 0.6224825382232666,
      "z": -16136496560648084e-20
    }, {
      "x": 0.6095397472381592,
      "y": 0.641917884349823,
      "z": -1803556369850412e-19
    }, {
      "x": 0.6250996589660645,
      "y": 0.6586247682571411,
      "z": -1785515050869435e-19
    }]],
    "faceBlendshapes": [{
      "categories": [{
        "index": 0,
        "score": 5187174338061595e-21,
        "categoryName": "_neutral",
        "displayName": ""
      }, {
        "index": 1,
        "score": 0.24521504342556,
        "categoryName": "browDownLeft",
        "displayName": ""
      }, {
        "index": 2,
        "score": 0.1987743377685547,
        "categoryName": "browDownRight",
        "displayName": ""
      }, {
        "index": 3,
        "score": 0.013400448486208916,
        "categoryName": "browInnerUp",
        "displayName": ""
      }, {
        "index": 4,
        "score": 0.012361560948193073,
        "categoryName": "browOuterUpLeft",
        "displayName": ""
      }, {
        "index": 5,
        "score": 0.019305096939206123,
        "categoryName": "browOuterUpRight",
        "displayName": ""
      }, {
        "index": 6,
        "score": 28426356948330067e-21,
        "categoryName": "cheekPuff",
        "displayName": ""
      }, {
        "index": 7,
        "score": 34500112633395474e-23,
        "categoryName": "cheekSquintLeft",
        "displayName": ""
      }, {
        "index": 8,
        "score": 483789051486383e-21,
        "categoryName": "cheekSquintRight",
        "displayName": ""
      }, {
        "index": 9,
        "score": 0.07650448381900787,
        "categoryName": "eyeBlinkLeft",
        "displayName": ""
      }, {
        "index": 10,
        "score": 0.05070012807846069,
        "categoryName": "eyeBlinkRight",
        "displayName": ""
      }, {
        "index": 11,
        "score": 0.13978900015354156,
        "categoryName": "eyeLookDownLeft",
        "displayName": ""
      }, {
        "index": 12,
        "score": 0.14198613166809082,
        "categoryName": "eyeLookDownRight",
        "displayName": ""
      }, {
        "index": 13,
        "score": 0.2177766114473343,
        "categoryName": "eyeLookInLeft",
        "displayName": ""
      }, {
        "index": 14,
        "score": 0.014739357866346836,
        "categoryName": "eyeLookInRight",
        "displayName": ""
      }, {
        "index": 15,
        "score": 0.02361512929201126,
        "categoryName": "eyeLookOutLeft",
        "displayName": ""
      }, {
        "index": 16,
        "score": 0.19679604470729828,
        "categoryName": "eyeLookOutRight",
        "displayName": ""
      }, {
        "index": 17,
        "score": 0.04874616861343384,
        "categoryName": "eyeLookUpLeft",
        "displayName": ""
      }, {
        "index": 18,
        "score": 0.049392376095056534,
        "categoryName": "eyeLookUpRight",
        "displayName": ""
      }, {
        "index": 19,
        "score": 0.34944331645965576,
        "categoryName": "eyeSquintLeft",
        "displayName": ""
      }, {
        "index": 20,
        "score": 0.2939716875553131,
        "categoryName": "eyeSquintRight",
        "displayName": ""
      }, {
        "index": 21,
        "score": 0.005955042317509651,
        "categoryName": "eyeWideLeft",
        "displayName": ""
      }, {
        "index": 22,
        "score": 0.006776117719709873,
        "categoryName": "eyeWideRight",
        "displayName": ""
      }, {
        "index": 23,
        "score": 16942436559475027e-21,
        "categoryName": "jawForward",
        "displayName": ""
      }, {
        "index": 24,
        "score": 0.0045165494084358215,
        "categoryName": "jawLeft",
        "displayName": ""
      }, {
        "index": 25,
        "score": 0.07803940027952194,
        "categoryName": "jawOpen",
        "displayName": ""
      }, {
        "index": 26,
        "score": 2090057751047425e-20,
        "categoryName": "jawRight",
        "displayName": ""
      }, {
        "index": 27,
        "score": 0.06032035872340202,
        "categoryName": "mouthClose",
        "displayName": ""
      }, {
        "index": 28,
        "score": 0.00228882092051208,
        "categoryName": "mouthDimpleLeft",
        "displayName": ""
      }, {
        "index": 29,
        "score": 0.00781762320548296,
        "categoryName": "mouthDimpleRight",
        "displayName": ""
      }, {
        "index": 30,
        "score": 0.0017093931091949344,
        "categoryName": "mouthFrownLeft",
        "displayName": ""
      }, {
        "index": 31,
        "score": 0.0019319106359034777,
        "categoryName": "mouthFrownRight",
        "displayName": ""
      }, {
        "index": 32,
        "score": 8485237776767462e-20,
        "categoryName": "mouthFunnel",
        "displayName": ""
      }, {
        "index": 33,
        "score": 9051355300471187e-19,
        "categoryName": "mouthLeft",
        "displayName": ""
      }, {
        "index": 34,
        "score": 3630454302765429e-19,
        "categoryName": "mouthLowerDownLeft",
        "displayName": ""
      }, {
        "index": 35,
        "score": 17601238505449146e-20,
        "categoryName": "mouthLowerDownRight",
        "displayName": ""
      }, {
        "index": 36,
        "score": 0.12865161895751953,
        "categoryName": "mouthPressLeft",
        "displayName": ""
      }, {
        "index": 37,
        "score": 0.20137207210063934,
        "categoryName": "mouthPressRight",
        "displayName": ""
      }, {
        "index": 38,
        "score": 0.0022203284315764904,
        "categoryName": "mouthPucker",
        "displayName": ""
      }, {
        "index": 39,
        "score": 9096377179957926e-19,
        "categoryName": "mouthRight",
        "displayName": ""
      }, {
        "index": 40,
        "score": 0.34189721941947937,
        "categoryName": "mouthRollLower",
        "displayName": ""
      }, {
        "index": 41,
        "score": 0.11409689486026764,
        "categoryName": "mouthRollUpper",
        "displayName": ""
      }, {
        "index": 42,
        "score": 0.17172536253929138,
        "categoryName": "mouthShrugLower",
        "displayName": ""
      }, {
        "index": 43,
        "score": 0.004038424696773291,
        "categoryName": "mouthShrugUpper",
        "displayName": ""
      }, {
        "index": 44,
        "score": 23205230536404997e-20,
        "categoryName": "mouthSmileLeft",
        "displayName": ""
      }, {
        "index": 45,
        "score": 19313619122840464e-20,
        "categoryName": "mouthSmileRight",
        "displayName": ""
      }, {
        "index": 46,
        "score": 0.0018571305554360151,
        "categoryName": "mouthStretchLeft",
        "displayName": ""
      }, {
        "index": 47,
        "score": 0.0023813238367438316,
        "categoryName": "mouthStretchRight",
        "displayName": ""
      }, {
        "index": 48,
        "score": 24323100660694763e-21,
        "categoryName": "mouthUpperUpLeft",
        "displayName": ""
      }, {
        "index": 49,
        "score": 3161552012898028e-20,
        "categoryName": "mouthUpperUpRight",
        "displayName": ""
      }, {
        "index": 50,
        "score": 108198406678639e-21,
        "categoryName": "noseSneerLeft",
        "displayName": ""
      }, {
        "index": 51,
        "score": 12652527630052646e-22,
        "categoryName": "noseSneerRight",
        "displayName": ""
      }],
      "headIndex": -1,
      "headName": ""
    }],
    "facialTransformationMatrixes": [{
      "rows": 4,
      "columns": 4,
      "data": [0.9947517514228821, 0.10230544209480286, 0.0013679931871592999, 0, -0.10230997204780579, 0.9947447776794434, 0.003816320328041911, 0, -970348424743861e-18, -0.0039362297393381596, 0.9999914169311523, 0, 2.8888821601867676, -7.808934211730957, -30.52109146118164, 1]
    }]
  }
};

// node_modules/@react-three/drei/web/FaceLandmarker.js
var React138 = __toESM(require_react());
var import_react22 = __toESM(require_react());
var FaceLandmarkerContext = (0, import_react22.createContext)({});
var FaceLandmarkerDefaults = {
  basePath: "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.17/wasm",
  options: {
    baseOptions: {
      modelAssetPath: "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
      delegate: "GPU"
    },
    runningMode: "VIDEO",
    outputFaceBlendshapes: true,
    outputFacialTransformationMatrixes: true
  }
};
var FaceLandmarker = (0, import_react22.forwardRef)(({
  basePath = FaceLandmarkerDefaults.basePath,
  options = FaceLandmarkerDefaults.options,
  children
}, fref) => {
  const opts = JSON.stringify(options);
  const faceLandmarker = suspend(async () => {
    const {
      FilesetResolver,
      FaceLandmarker: FaceLandmarker2
    } = await import("./vision_bundle-SQYBGID6.js");
    const vision = await FilesetResolver.forVisionTasks(basePath);
    return FaceLandmarker2.createFromOptions(vision, options);
  }, [basePath, opts]);
  (0, import_react22.useEffect)(() => {
    return () => {
      faceLandmarker == null || faceLandmarker.close();
      clear([basePath, opts]);
    };
  }, [faceLandmarker, basePath, opts]);
  (0, import_react22.useImperativeHandle)(fref, () => faceLandmarker, [faceLandmarker]);
  return React138.createElement(FaceLandmarkerContext.Provider, {
    value: faceLandmarker
  }, children);
});
function useFaceLandmarker() {
  return (0, import_react22.useContext)(FaceLandmarkerContext);
}

// node_modules/@react-three/drei/web/FaceControls.js
function mean2(v12, v22) {
  return v12.clone().add(v22).multiplyScalar(0.5);
}
function localToLocal(objSrc, v5, objDst) {
  const v_world = objSrc.localToWorld(v5);
  return objDst.worldToLocal(v_world);
}
var FaceControlsContext = (0, import_react23.createContext)({});
var FaceControls = (0, import_react23.forwardRef)(({
  camera,
  videoTexture = {
    start: true
  },
  manualDetect = false,
  faceLandmarkerResult,
  manualUpdate = false,
  makeDefault,
  smoothTime = 0.25,
  offset = true,
  offsetScalar = 80,
  eyes = false,
  eyesAsOrigin = true,
  depth = 0.15,
  debug = false,
  facemesh
}, fref) => {
  var _result$facialTransfo, _result$faceBlendshap;
  const scene = useThree((state) => state.scene);
  const defaultCamera = useThree((state) => state.camera);
  const set = useThree((state) => state.set);
  const get = useThree((state) => state.get);
  const explCamera = camera || defaultCamera;
  const facemeshApiRef = (0, import_react23.useRef)(null);
  const [target2] = (0, import_react23.useState)(() => new Object3D());
  const [irisRightDirPos] = (0, import_react23.useState)(() => new Vector3());
  const [irisLeftDirPos] = (0, import_react23.useState)(() => new Vector3());
  const [irisRightLookAt] = (0, import_react23.useState)(() => new Vector3());
  const [irisLeftLookAt] = (0, import_react23.useState)(() => new Vector3());
  const computeTarget = (0, import_react23.useCallback)(() => {
    target2.parent = explCamera.parent;
    const facemeshApi = facemeshApiRef.current;
    if (facemeshApi) {
      const {
        outerRef,
        eyeRightRef,
        eyeLeftRef
      } = facemeshApi;
      if (eyeRightRef.current && eyeLeftRef.current) {
        const {
          irisDirRef: irisRightDirRef
        } = eyeRightRef.current;
        const {
          irisDirRef: irisLeftDirRef
        } = eyeLeftRef.current;
        if (irisRightDirRef.current && irisLeftDirRef.current && outerRef.current) {
          irisRightDirPos.copy(localToLocal(irisRightDirRef.current, new Vector3(0, 0, 0), outerRef.current));
          irisLeftDirPos.copy(localToLocal(irisLeftDirRef.current, new Vector3(0, 0, 0), outerRef.current));
          target2.position.copy(localToLocal(outerRef.current, mean2(irisRightDirPos, irisLeftDirPos), explCamera.parent || scene));
          irisRightLookAt.copy(localToLocal(irisRightDirRef.current, new Vector3(0, 0, 1), outerRef.current));
          irisLeftLookAt.copy(localToLocal(irisLeftDirRef.current, new Vector3(0, 0, 1), outerRef.current));
          target2.lookAt(outerRef.current.localToWorld(mean2(irisRightLookAt, irisLeftLookAt)));
        }
      } else {
        if (outerRef.current) {
          target2.position.copy(localToLocal(outerRef.current, new Vector3(0, 0, 0), explCamera.parent || scene));
          target2.lookAt(outerRef.current.localToWorld(new Vector3(0, 0, 1)));
        }
      }
    }
    return target2;
  }, [explCamera, irisLeftDirPos, irisLeftLookAt, irisRightDirPos, irisRightLookAt, scene, target2]);
  const [current] = (0, import_react23.useState)(() => new Object3D());
  const update2 = (0, import_react23.useCallback)(function(delta, target3) {
    if (explCamera) {
      var _target;
      (_target = target3) !== null && _target !== void 0 ? _target : target3 = computeTarget();
      if (smoothTime > 0) {
        const eps2 = 1e-9;
        easing.damp3(current.position, target3.position, smoothTime, delta, void 0, void 0, eps2);
        easing.dampE(current.rotation, target3.rotation, smoothTime, delta, void 0, void 0, eps2);
      } else {
        current.position.copy(target3.position);
        current.rotation.copy(target3.rotation);
      }
      explCamera.position.copy(current.position);
      explCamera.rotation.copy(current.rotation);
    }
  }, [explCamera, computeTarget, smoothTime, current.position, current.rotation]);
  useFrame((_, delta) => {
    if (manualUpdate) return;
    update2(delta);
  });
  const videoTextureRef = (0, import_react23.useRef)(null);
  const [_faceLandmarkerResult, setFaceLandmarkerResult] = (0, import_react23.useState)();
  const faceLandmarker = useFaceLandmarker();
  const onVideoFrame = (0, import_react23.useCallback)((now, metadata) => {
    const texture = videoTextureRef.current;
    if (!texture) return;
    const videoFrame = texture.source.data;
    const result2 = faceLandmarker == null ? void 0 : faceLandmarker.detectForVideo(videoFrame, now);
    setFaceLandmarkerResult(result2);
  }, [faceLandmarker]);
  const api = (0, import_react23.useMemo)(() => Object.assign(Object.create(EventDispatcher.prototype), {
    computeTarget,
    update: update2,
    facemeshApiRef
  }), [computeTarget, update2]);
  (0, import_react23.useImperativeHandle)(fref, () => api, [api]);
  (0, import_react23.useEffect)(() => {
    if (makeDefault) {
      const old = get().controls;
      set({
        controls: api
      });
      return () => set({
        controls: old
      });
    }
  }, [makeDefault, api, get, set]);
  const result = faceLandmarkerResult !== null && faceLandmarkerResult !== void 0 ? faceLandmarkerResult : _faceLandmarkerResult;
  const points = result == null ? void 0 : result.faceLandmarks[0];
  const facialTransformationMatrix = result == null || (_result$facialTransfo = result.facialTransformationMatrixes) == null ? void 0 : _result$facialTransfo[0];
  const faceBlendshapes = result == null || (_result$faceBlendshap = result.faceBlendshapes) == null ? void 0 : _result$faceBlendshap[0];
  const videoTextureProps = {
    onVideoFrame,
    ...videoTexture
  };
  return React139.createElement(FaceControlsContext.Provider, {
    value: api
  }, !manualDetect && React139.createElement(import_react23.Suspense, {
    fallback: null
  }, "src" in videoTextureProps ? React139.createElement(VideoTexture2, _extends({
    ref: videoTextureRef
  }, videoTextureProps)) : React139.createElement(WebcamVideoTexture, _extends({
    ref: videoTextureRef
  }, videoTextureProps))), React139.createElement(Facemesh, _extends({
    ref: facemeshApiRef,
    children: React139.createElement("meshNormalMaterial", {
      side: DoubleSide
    })
  }, facemesh, {
    points,
    depth,
    facialTransformationMatrix,
    faceBlendshapes,
    eyes,
    eyesAsOrigin,
    offset,
    offsetScalar,
    debug,
    "rotation-z": Math.PI,
    visible: debug
  })));
});
var useFaceControls = () => (0, import_react23.useContext)(FaceControlsContext);
export {
  AccumulativeShadows,
  AdaptiveDpr,
  AdaptiveEvents,
  ArcballControls2 as ArcballControls,
  AsciiRenderer,
  BBAnchor,
  Backdrop,
  BakeShadows,
  Billboard,
  Bounds,
  Box,
  Bvh,
  CameraControls2 as CameraControls,
  CameraControls as CameraControlsImpl,
  CameraShake,
  Capsule,
  CatmullRomLine,
  Caustics,
  Center,
  Circle,
  Clone,
  Cloud,
  CloudInstance,
  Clouds,
  ComputedAttribute,
  Cone,
  ContactShadows,
  CubeCamera2 as CubeCamera,
  CubeTexture,
  CubicBezierLine,
  CurveModifier,
  CycleRaycast,
  Cylinder,
  Decal,
  Detailed,
  DetectGPU,
  DeviceOrientationControls2 as DeviceOrientationControls,
  Dodecahedron,
  DragControls,
  Edges,
  Effects,
  Environment,
  EnvironmentCube,
  EnvironmentMap,
  EnvironmentPortal,
  Example,
  Extrude,
  FaceControls,
  FaceLandmarker,
  FaceLandmarkerDefaults,
  Facemesh,
  FacemeshDatas,
  FacemeshEye,
  FacemeshEyeDefaults,
  Fbo,
  Fbx,
  FirstPersonControls2 as FirstPersonControls,
  Fisheye,
  Float,
  FlyControls2 as FlyControls,
  GizmoHelper,
  GizmoViewcube,
  GizmoViewport,
  Gltf,
  GradientTexture,
  GradientType,
  Grid,
  Helper,
  Html,
  Hud,
  Icosahedron,
  Image,
  Instance,
  InstancedAttribute,
  Instances,
  IsObject,
  KeyboardControls,
  Ktx2,
  Lathe,
  Lightformer,
  Line,
  Loader2 as Loader,
  MapControls2 as MapControls,
  MarchingCube,
  MarchingCubes2 as MarchingCubes,
  MarchingPlane,
  Mask,
  MatcapTexture,
  Merged,
  MeshDiscardMaterial,
  MeshDistortMaterial,
  MeshPortalMaterial,
  MeshReflectorMaterial2 as MeshReflectorMaterial,
  MeshRefractionMaterial2 as MeshRefractionMaterial,
  MeshTransmissionMaterial,
  MeshWobbleMaterial,
  MotionPathControls,
  MultiMaterial,
  NormalTexture,
  Octahedron,
  OrbitControls2 as OrbitControls,
  OrthographicCamera2 as OrthographicCamera,
  Outlines,
  PerformanceMonitor,
  PerspectiveCamera2 as PerspectiveCamera,
  PivotControls,
  Plane2 as Plane,
  Point,
  PointMaterial,
  PointMaterialImpl,
  PointerLockControls2 as PointerLockControls,
  Points,
  PointsBuffer,
  Polyhedron,
  PositionMesh,
  PositionPoint,
  PositionalAudio,
  Preload,
  PresentationControls,
  Progress,
  QuadraticBezierLine,
  RandomizedLight,
  RenderCubeTexture,
  RenderTexture,
  Resize,
  Ring,
  RoundedBox,
  RoundedBoxGeometry,
  Sampler,
  ScreenQuad,
  ScreenSizer,
  ScreenSpace,
  ScreenVideoTexture,
  Scroll,
  ScrollControls,
  Segment,
  SegmentObject,
  Segments,
  Select,
  Shadow,
  ShadowAlpha,
  Shape2 as Shape,
  Sky2 as Sky,
  SoftShadows,
  Sparkles,
  Sphere2 as Sphere,
  Splat,
  SpotLight,
  SpotLightShadow,
  SpriteAnimator,
  Stage,
  Stars,
  Stats2 as Stats,
  StatsGl,
  Svg,
  Tetrahedron,
  Text2 as Text,
  Text3D,
  Texture2 as Texture,
  Torus,
  TorusKnot,
  TrackballControls2 as TrackballControls,
  Trail,
  TrailTexture,
  TransformControls2 as TransformControls,
  Tube,
  VideoTexture2 as VideoTexture,
  View,
  WebcamVideoTexture,
  Wireframe,
  accumulativeContext,
  calcPosFromAngles,
  calculateScaleFactor,
  checkIfFrameIsEmpty,
  createInstances,
  getFirstFrame,
  isWebGL2Available,
  meshBounds,
  shaderMaterial,
  useAnimations,
  useAspect,
  useBVH,
  useBounds,
  useBoxProjectedEnv,
  useCamera,
  useContextBridge,
  useCubeCamera,
  useCubeTexture,
  useCursor,
  useDepthBuffer,
  useDetectGPU,
  useEnvironment,
  useFBO,
  useFBX,
  useFaceControls,
  useFaceLandmarker,
  useFont,
  useGLTF,
  useGizmoContext,
  useHelper,
  useIntersect,
  useKTX2,
  useKeyboardControls,
  useMask,
  useMatcapTexture,
  useMotion,
  useNormalTexture,
  usePerformanceMonitor,
  useProgress,
  useScroll,
  useSelect,
  useSpriteAnimator,
  useSpriteLoader,
  useSurfaceSampler,
  useTexture,
  useTrail,
  useTrailTexture,
  useVideoTexture
};
/*! Bundled license information:

camera-controls/dist/camera-controls.module.js:
  (*!
   * camera-controls
   * https://github.com/yomotsu/camera-controls
   * (c) 2017 @yomotsu
   * Released under the MIT License.
   *)
*/
//# sourceMappingURL=@react-three_drei.js.map
