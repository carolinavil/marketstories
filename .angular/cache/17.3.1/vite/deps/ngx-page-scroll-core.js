import {
  Inject,
  Injectable,
  InjectionToken,
  NgModule,
  isDevMode,
  setClassMetadata,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵinject
} from "./chunk-7NASW6CU.js";
import "./chunk-WSA2QMXP.js";
import {
  __spreadValues
} from "./chunk-WKYGNSYM.js";

// node_modules/ngx-page-scroll-core/fesm2022/ngx-page-scroll-core.mjs
var PageScrollInstance = class _PageScrollInstance {
  /**
   * Private constructor, requires the properties assumed to be the bare minimum.
   * Use the factory methods to create instances:
   *      {@link PageScrollService#create}
   */
  constructor(pageScrollOptions) {
    this.startScrollPosition = 0;
    this.interruptListenersAttached = false;
    this.timer = null;
    if (!pageScrollOptions.scrollViews || pageScrollOptions.scrollViews.length === 0) {
      pageScrollOptions.scrollViews = [pageScrollOptions.document.documentElement, pageScrollOptions.document.body, pageScrollOptions.document.body.parentNode];
      this.isInlineScrolling = false;
    } else {
      this.isInlineScrolling = true;
    }
    this.pageScrollOptions = pageScrollOptions;
  }
  static getScrollingTargetPosition(pageScrollOptions, scrollTargetElement) {
    const body = pageScrollOptions.document.body;
    const docEl = pageScrollOptions.document.documentElement;
    const windowPageYOffset = pageScrollOptions.document.defaultView && pageScrollOptions.document.defaultView.pageYOffset || void 0;
    const windowPageXOffset = pageScrollOptions.document.defaultView && pageScrollOptions.document.defaultView.pageXOffset || void 0;
    const scrollTop = windowPageYOffset || docEl.scrollTop || body.scrollTop;
    const scrollLeft = windowPageXOffset || docEl.scrollLeft || body.scrollLeft;
    const clientTop = docEl.clientTop || body.clientTop || 0;
    const clientLeft = docEl.clientLeft || body.clientLeft || 0;
    if (scrollTargetElement === void 0 || scrollTargetElement === null) {
      return {
        top: scrollTop,
        left: scrollLeft
      };
    }
    const box = scrollTargetElement.getBoundingClientRect();
    const top = box.top + scrollTop - clientTop;
    const left = box.left + scrollLeft - clientLeft;
    return {
      top: Math.round(top),
      left: Math.round(left)
    };
  }
  static getInlineScrollingTargetPosition(pageScrollOptions, scrollTargetElement) {
    const position = {
      top: scrollTargetElement.offsetTop,
      left: scrollTargetElement.offsetLeft
    };
    if (pageScrollOptions.advancedInlineOffsetCalculation && pageScrollOptions.scrollViews.length === 1) {
      const accumulatedParentsPos = {
        top: 0,
        left: 0
      };
      const theWindow = scrollTargetElement.ownerDocument.defaultView;
      let parentFound = false;
      let parent = scrollTargetElement.parentElement;
      while (!parentFound && parent !== void 0 && parent !== null) {
        if (theWindow.getComputedStyle(parent).getPropertyValue("position") === "relative") {
          accumulatedParentsPos.top += parent.offsetTop;
          accumulatedParentsPos.left += parent.offsetLeft;
        }
        parent = parent.parentElement;
        parentFound = parent === pageScrollOptions.scrollViews[0];
      }
      if (parentFound) {
        position.top += accumulatedParentsPos.top;
        position.left += accumulatedParentsPos.left;
      } else {
      }
    }
    return position;
  }
  getScrollPropertyValue(scrollingView) {
    if (!this.pageScrollOptions.verticalScrolling) {
      return scrollingView.scrollLeft;
    }
    return scrollingView.scrollTop;
  }
  getScrollClientPropertyValue(scrollingView) {
    if (!this.pageScrollOptions.verticalScrolling) {
      return scrollingView.clientWidth;
    }
    return scrollingView.clientHeight;
  }
  /**
   * Extract the exact location of the scrollTarget element.
   *
   * Extract the scrollTarget HTMLElement from the given PageScrollTarget object. The latter one may be
   * a string like "#heading2", then this method returns the corresponding DOM element for that id.
   *
   */
  extractScrollTargetPosition() {
    const scrollTargetElement = this.getScrollTargetElement();
    if (scrollTargetElement === null || scrollTargetElement === void 0) {
      return {
        top: NaN,
        left: NaN
      };
    }
    if (this.isInlineScrolling) {
      return _PageScrollInstance.getInlineScrollingTargetPosition(this.pageScrollOptions, scrollTargetElement);
    }
    return _PageScrollInstance.getScrollingTargetPosition(this.pageScrollOptions, scrollTargetElement);
  }
  /**
   * Get the top offset of the scroll animation.
   * This automatically takes the offset location of the scrolling container/scrolling view
   * into account (for nested/inline scrolling).
   */
  getCurrentOffset() {
    return this.pageScrollOptions.scrollOffset;
  }
  /**
   * Sets the "scrollTop" or "scrollLeft" property for all scrollViews to the provided value
   * @return true if at least for one ScrollTopSource the scrollTop/scrollLeft value could be set and it kept the new value.
   *          false if it failed for all ScrollViews, meaning that we should stop the animation
   *          (probably because we're at the end of the scrolling region)
   */
  setScrollPosition(position) {
    return this.pageScrollOptions.scrollViews.reduce((oneAlreadyWorked, scrollingView) => {
      const startScrollPropertyValue = this.getScrollPropertyValue(scrollingView);
      if (scrollingView && startScrollPropertyValue !== void 0 && startScrollPropertyValue !== null) {
        const scrollDistance = Math.abs(startScrollPropertyValue - position);
        const isSmallMovement = scrollDistance < this.pageScrollOptions._minScrollDistance;
        if (!this.pageScrollOptions.verticalScrolling) {
          scrollingView.scrollLeft = position;
        } else {
          scrollingView.scrollTop = position;
        }
        if (isSmallMovement || scrollDistance > Math.abs(this.getScrollPropertyValue(scrollingView) - position)) {
          return true;
        }
      }
      return oneAlreadyWorked;
    }, false);
  }
  /**
   * Trigger firing a animation finish event
   * @param value Whether the animation finished at the target (true) or got interrupted (false)
   */
  fireEvent(value) {
    if (this.pageScrollOptions.scrollFinishListener) {
      this.pageScrollOptions.scrollFinishListener.emit(value);
    }
  }
  /**
   * Attach the interrupt listeners to the PageScrollInstance body. The given interruptReporter
   * will be called if any of the attached events is fired.
   *
   * Possibly attached interruptListeners are automatically removed from the body before the new one will be attached.
   */
  attachInterruptListeners(interruptReporter) {
    if (this.interruptListenersAttached) {
      this.detachInterruptListeners();
    }
    this.interruptListener = (event) => {
      interruptReporter.report(event, this);
    };
    this.pageScrollOptions.interruptEvents.forEach((event) => this.pageScrollOptions.document.body.addEventListener(event, this.interruptListener));
    this.interruptListenersAttached = true;
  }
  /**
   * Remove event listeners from the body and stop listening for events that might be treated as "animation
   * interrupt" events.
   */
  detachInterruptListeners() {
    this.pageScrollOptions.interruptEvents.forEach((event) => this.pageScrollOptions.document.body.removeEventListener(event, this.interruptListener));
    this.interruptListenersAttached = false;
  }
  getScrollTargetElement() {
    if (typeof this.pageScrollOptions.scrollTarget === "string") {
      const targetSelector = this.pageScrollOptions.scrollTarget;
      if (targetSelector.match(/^#[^\s]+$/g) !== null) {
        return this.pageScrollOptions.document.getElementById(targetSelector.substr(1));
      }
      return this.pageScrollOptions.document.querySelector(targetSelector);
    }
    return this.pageScrollOptions.scrollTarget;
  }
};
var NGXPS_CONFIG = new InjectionToken("ngxps_config");
var defaultPageScrollConfig = {
  _interval: 10,
  _minScrollDistance: 2,
  _logLevel: 1,
  namespace: "default",
  verticalScrolling: true,
  duration: 1250,
  scrollOffset: 0,
  advancedInlineOffsetCalculation: false,
  interruptEvents: ["mousedown", "wheel", "DOMMouseScroll", "mousewheel", "keyup", "touchmove"],
  interruptKeys: [" ", "Escape", "Tab", "Enter", "PageUp", "PageDown", "Home", "End", "ArrowUp", "ArrowRight", "ArrowLeft", "ArrowDown"],
  interruptible: true,
  scrollInView: true,
  easingLogic: (t, b, c, d) => {
    return c * t / d + b;
  }
};
var _PageScrollService = class _PageScrollService {
  stopInternal(interrupted, pageScrollInstance) {
    const index = this.runningInstances.indexOf(pageScrollInstance);
    if (index >= 0) {
      this.runningInstances.splice(index, 1);
    }
    if (pageScrollInstance.interruptListenersAttached) {
      pageScrollInstance.detachInterruptListeners();
    }
    if (pageScrollInstance.timer) {
      clearInterval(pageScrollInstance.timer);
      pageScrollInstance.timer = void 0;
      pageScrollInstance.fireEvent(!interrupted);
      return true;
    }
    return false;
  }
  create(options) {
    return new PageScrollInstance(__spreadValues(__spreadValues({}, this.config), options));
  }
  /**
   * Start a scroll animation. All properties of the animation are stored in the given {@link PageScrollInstance} object.
   *
   * This is the core functionality of the whole library.
   */
  // tslint:disable-next-line:cyclomatic-complexity
  start(pageScrollInstance) {
    pageScrollInstance.pageScrollOptions = __spreadValues(__spreadValues({}, this.config), pageScrollInstance.pageScrollOptions);
    this.stopAll(pageScrollInstance.pageScrollOptions.namespace);
    if (pageScrollInstance.pageScrollOptions.scrollViews === null || pageScrollInstance.pageScrollOptions.scrollViews.length === 0) {
      if (this.config._logLevel >= 2 || this.config._logLevel >= 1 && isDevMode()) {
        console.warn("No scrollViews specified, thus ngx-page-scroll does not know which DOM elements to scroll");
      }
      return;
    }
    let startScrollPositionFound = false;
    let scrollRange = pageScrollInstance.getScrollClientPropertyValue(pageScrollInstance.pageScrollOptions.scrollViews[0]);
    pageScrollInstance.startScrollPosition = 0;
    pageScrollInstance.pageScrollOptions.scrollViews.forEach((scrollingView) => {
      if (scrollingView === void 0 || scrollingView === null) {
        return;
      }
      const scrollPosition = pageScrollInstance.getScrollPropertyValue(scrollingView);
      if (!startScrollPositionFound && scrollPosition) {
        pageScrollInstance.startScrollPosition = scrollPosition;
        startScrollPositionFound = true;
        scrollRange = pageScrollInstance.getScrollClientPropertyValue(scrollingView);
      }
    });
    const pageScrollOffset = pageScrollInstance.getCurrentOffset();
    const scrollTargetPosition = pageScrollInstance.extractScrollTargetPosition();
    pageScrollInstance.targetScrollPosition = Math.round((pageScrollInstance.pageScrollOptions.verticalScrolling ? scrollTargetPosition.top : scrollTargetPosition.left) - pageScrollOffset);
    pageScrollInstance.distanceToScroll = pageScrollInstance.targetScrollPosition - pageScrollInstance.startScrollPosition;
    if (isNaN(pageScrollInstance.distanceToScroll)) {
      if (this.config._logLevel >= 2 || this.config._logLevel >= 1 && isDevMode()) {
        console.log("Scrolling not possible, as we can't find the specified target");
      }
      pageScrollInstance.fireEvent(false);
      return;
    }
    const allReadyAtDestination = Math.abs(pageScrollInstance.distanceToScroll) < pageScrollInstance.pageScrollOptions._minScrollDistance;
    pageScrollInstance.executionDuration = pageScrollInstance.pageScrollOptions.duration;
    if (pageScrollInstance.pageScrollOptions.speed !== void 0 && pageScrollInstance.pageScrollOptions.speed !== null && (pageScrollInstance.pageScrollOptions.duration === void 0 || pageScrollInstance.pageScrollOptions.duration === null)) {
      pageScrollInstance.executionDuration = Math.abs(pageScrollInstance.distanceToScroll) / pageScrollInstance.pageScrollOptions.speed * 1e3;
    }
    const tooShortInterval = pageScrollInstance.executionDuration <= pageScrollInstance.pageScrollOptions._interval;
    if (allReadyAtDestination || tooShortInterval) {
      if (this.config._logLevel >= 2 || this.config._logLevel >= 1 && isDevMode()) {
        if (allReadyAtDestination) {
          console.log("Scrolling not possible, as we can't get any closer to the destination");
        } else {
          console.log("Scroll duration shorter that interval length, jumping to target");
        }
      }
      pageScrollInstance.setScrollPosition(pageScrollInstance.targetScrollPosition);
      pageScrollInstance.fireEvent(true);
      return;
    }
    if (!pageScrollInstance.pageScrollOptions.scrollInView) {
      const alreadyInView = pageScrollInstance.targetScrollPosition > pageScrollInstance.startScrollPosition && pageScrollInstance.targetScrollPosition <= pageScrollInstance.startScrollPosition + scrollRange;
      if (alreadyInView) {
        if (this.config._logLevel >= 2 || this.config._logLevel >= 1 && isDevMode()) {
          console.log("Not scrolling, as target already in view");
        }
        pageScrollInstance.fireEvent(true);
        return;
      }
    }
    if (pageScrollInstance.pageScrollOptions.interruptible) {
      pageScrollInstance.attachInterruptListeners(this.onInterrupted);
    }
    pageScrollInstance.startTime = (/* @__PURE__ */ new Date()).getTime();
    pageScrollInstance.endTime = pageScrollInstance.startTime + pageScrollInstance.executionDuration;
    pageScrollInstance.timer = setInterval((instance) => {
      const currentTime = (/* @__PURE__ */ new Date()).getTime();
      let newScrollPosition;
      let stopNow = false;
      if (instance.endTime <= currentTime) {
        newScrollPosition = instance.targetScrollPosition;
        stopNow = true;
      } else {
        newScrollPosition = Math.round(instance.pageScrollOptions.easingLogic(currentTime - instance.startTime, instance.startScrollPosition, instance.distanceToScroll, instance.executionDuration));
      }
      if (this.config._logLevel >= 5 && isDevMode()) {
        console.warn("Scroll Position: " + newScrollPosition);
      }
      if (!instance.setScrollPosition(newScrollPosition)) {
        stopNow = true;
      }
      if (stopNow) {
        this.stopInternal(false, instance);
      }
    }, this.config._interval, pageScrollInstance);
    this.runningInstances.push(pageScrollInstance);
  }
  scroll(options) {
    this.start(this.create(options));
  }
  /**
   * Stop all running scroll animations. Optionally limit to stop only the ones of specific namespace.
   */
  stopAll(namespace) {
    if (this.runningInstances.length > 0) {
      let stoppedSome = false;
      for (let i = 0; i < this.runningInstances.length; ++i) {
        const pageScrollInstance = this.runningInstances[i];
        if (!namespace || pageScrollInstance.pageScrollOptions.namespace === namespace) {
          stoppedSome = true;
          this.stopInternal(true, pageScrollInstance);
          i--;
        }
      }
      return stoppedSome;
    }
    return false;
  }
  stop(pageScrollInstance) {
    return this.stopInternal(true, pageScrollInstance);
  }
  constructor(customConfig) {
    this.runningInstances = [];
    this.onInterrupted = {
      report: (event, pageScrollInstance) => {
        if (!pageScrollInstance.pageScrollOptions.interruptible) {
          return;
        }
        let shouldStop = true;
        if (event.type === "keyup") {
          if (this.config.interruptKeys.indexOf(event.key) === -1) {
            shouldStop = false;
          }
        } else if (event.type === "mousedown") {
          if (!pageScrollInstance.pageScrollOptions.scrollViews.some((scrollingView) => scrollingView.contains(event.target))) {
            shouldStop = false;
          }
        }
        if (shouldStop) {
          this.stopAll(pageScrollInstance.pageScrollOptions.namespace);
        }
      }
    };
    this.config = __spreadValues(__spreadValues({}, defaultPageScrollConfig), customConfig);
  }
};
_PageScrollService.ɵfac = function PageScrollService_Factory(t) {
  return new (t || _PageScrollService)(ɵɵinject(NGXPS_CONFIG));
};
_PageScrollService.ɵprov = ɵɵdefineInjectable({
  token: _PageScrollService,
  factory: _PageScrollService.ɵfac,
  providedIn: "root"
});
var PageScrollService = _PageScrollService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PageScrollService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{
    type: void 0,
    decorators: [{
      type: Inject,
      args: [NGXPS_CONFIG]
    }]
  }], null);
})();
var _NgxPageScrollCoreModule = class _NgxPageScrollCoreModule {
  static forRoot(config) {
    return {
      ngModule: _NgxPageScrollCoreModule,
      providers: [PageScrollService, {
        provide: NGXPS_CONFIG,
        useValue: config
      }]
    };
  }
};
_NgxPageScrollCoreModule.ɵfac = function NgxPageScrollCoreModule_Factory(t) {
  return new (t || _NgxPageScrollCoreModule)();
};
_NgxPageScrollCoreModule.ɵmod = ɵɵdefineNgModule({
  type: _NgxPageScrollCoreModule
});
_NgxPageScrollCoreModule.ɵinj = ɵɵdefineInjector({
  providers: [PageScrollService, {
    provide: NGXPS_CONFIG,
    useValue: {}
  }]
});
var NgxPageScrollCoreModule = _NgxPageScrollCoreModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxPageScrollCoreModule, [{
    type: NgModule,
    args: [{
      providers: [PageScrollService, {
        provide: NGXPS_CONFIG,
        useValue: {}
      }]
    }]
  }], null, null);
})();
export {
  NGXPS_CONFIG,
  NgxPageScrollCoreModule,
  PageScrollInstance,
  PageScrollService,
  defaultPageScrollConfig
};
//# sourceMappingURL=ngx-page-scroll-core.js.map
