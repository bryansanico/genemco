/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@babel/runtime/regenerator/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ "./node_modules/regenerator-runtime/runtime.js");


/***/ }),

/***/ "./node_modules/axios/index.js":
/*!*************************************!*\
  !*** ./node_modules/axios/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./lib/axios */ "./node_modules/axios/lib/axios.js");

/***/ }),

/***/ "./node_modules/axios/lib/adapters/xhr.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/adapters/xhr.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var settle = __webpack_require__(/*! ./../core/settle */ "./node_modules/axios/lib/core/settle.js");
var cookies = __webpack_require__(/*! ./../helpers/cookies */ "./node_modules/axios/lib/helpers/cookies.js");
var buildURL = __webpack_require__(/*! ./../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var buildFullPath = __webpack_require__(/*! ../core/buildFullPath */ "./node_modules/axios/lib/core/buildFullPath.js");
var parseHeaders = __webpack_require__(/*! ./../helpers/parseHeaders */ "./node_modules/axios/lib/helpers/parseHeaders.js");
var isURLSameOrigin = __webpack_require__(/*! ./../helpers/isURLSameOrigin */ "./node_modules/axios/lib/helpers/isURLSameOrigin.js");
var transitionalDefaults = __webpack_require__(/*! ../defaults/transitional */ "./node_modules/axios/lib/defaults/transitional.js");
var AxiosError = __webpack_require__(/*! ../core/AxiosError */ "./node_modules/axios/lib/core/AxiosError.js");
var CanceledError = __webpack_require__(/*! ../cancel/CanceledError */ "./node_modules/axios/lib/cancel/CanceledError.js");
var parseProtocol = __webpack_require__(/*! ../helpers/parseProtocol */ "./node_modules/axios/lib/helpers/parseProtocol.js");

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;
    var responseType = config.responseType;
    var onCanceled;
    function done() {
      if (config.cancelToken) {
        config.cancelToken.unsubscribe(onCanceled);
      }

      if (config.signal) {
        config.signal.removeEventListener('abort', onCanceled);
      }
    }

    if (utils.isFormData(requestData) && utils.isStandardBrowserEnv()) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    var fullPath = buildFullPath(config.baseURL, config.url);

    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    function onloadend() {
      if (!request) {
        return;
      }
      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !responseType || responseType === 'text' ||  responseType === 'json' ?
        request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(function _resolve(value) {
        resolve(value);
        done();
      }, function _reject(err) {
        reject(err);
        done();
      }, response);

      // Clean up request
      request = null;
    }

    if ('onloadend' in request) {
      // Use onloadend if available
      request.onloadend = onloadend;
    } else {
      // Listen for ready state to emulate onloadend
      request.onreadystatechange = function handleLoad() {
        if (!request || request.readyState !== 4) {
          return;
        }

        // The request errored out and we didn't get a response, this will be
        // handled by onerror instead
        // With one exception: request that using file: protocol, most browsers
        // will return status as 0 even though it's a successful request
        if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
          return;
        }
        // readystate handler is calling before onerror or ontimeout handlers,
        // so we should call onloadend on the next 'tick'
        setTimeout(onloadend);
      };
    }

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(new AxiosError('Request aborted', AxiosError.ECONNABORTED, config, request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(new AxiosError('Network Error', AxiosError.ERR_NETWORK, config, request, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      var timeoutErrorMessage = config.timeout ? 'timeout of ' + config.timeout + 'ms exceeded' : 'timeout exceeded';
      var transitional = config.transitional || transitionalDefaults;
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(new AxiosError(
        timeoutErrorMessage,
        transitional.clarifyTimeoutError ? AxiosError.ETIMEDOUT : AxiosError.ECONNABORTED,
        config,
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ?
        cookies.read(config.xsrfCookieName) :
        undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (!utils.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    }

    // Add responseType to request if needed
    if (responseType && responseType !== 'json') {
      request.responseType = config.responseType;
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken || config.signal) {
      // Handle cancellation
      // eslint-disable-next-line func-names
      onCanceled = function(cancel) {
        if (!request) {
          return;
        }
        reject(!cancel || (cancel && cancel.type) ? new CanceledError() : cancel);
        request.abort();
        request = null;
      };

      config.cancelToken && config.cancelToken.subscribe(onCanceled);
      if (config.signal) {
        config.signal.aborted ? onCanceled() : config.signal.addEventListener('abort', onCanceled);
      }
    }

    if (!requestData) {
      requestData = null;
    }

    var protocol = parseProtocol(fullPath);

    if (protocol && [ 'http', 'https', 'file' ].indexOf(protocol) === -1) {
      reject(new AxiosError('Unsupported protocol ' + protocol + ':', AxiosError.ERR_BAD_REQUEST, config));
      return;
    }


    // Send the request
    request.send(requestData);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/axios.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/axios.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");
var Axios = __webpack_require__(/*! ./core/Axios */ "./node_modules/axios/lib/core/Axios.js");
var mergeConfig = __webpack_require__(/*! ./core/mergeConfig */ "./node_modules/axios/lib/core/mergeConfig.js");
var defaults = __webpack_require__(/*! ./defaults */ "./node_modules/axios/lib/defaults/index.js");

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  // Factory for creating new instances
  instance.create = function create(instanceConfig) {
    return createInstance(mergeConfig(defaultConfig, instanceConfig));
  };

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Expose Cancel & CancelToken
axios.CanceledError = __webpack_require__(/*! ./cancel/CanceledError */ "./node_modules/axios/lib/cancel/CanceledError.js");
axios.CancelToken = __webpack_require__(/*! ./cancel/CancelToken */ "./node_modules/axios/lib/cancel/CancelToken.js");
axios.isCancel = __webpack_require__(/*! ./cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");
axios.VERSION = __webpack_require__(/*! ./env/data */ "./node_modules/axios/lib/env/data.js").version;
axios.toFormData = __webpack_require__(/*! ./helpers/toFormData */ "./node_modules/axios/lib/helpers/toFormData.js");

// Expose AxiosError class
axios.AxiosError = __webpack_require__(/*! ../lib/core/AxiosError */ "./node_modules/axios/lib/core/AxiosError.js");

// alias for CanceledError for backward compatibility
axios.Cancel = axios.CanceledError;

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(/*! ./helpers/spread */ "./node_modules/axios/lib/helpers/spread.js");

// Expose isAxiosError
axios.isAxiosError = __webpack_require__(/*! ./helpers/isAxiosError */ "./node_modules/axios/lib/helpers/isAxiosError.js");

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/CancelToken.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/cancel/CancelToken.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var CanceledError = __webpack_require__(/*! ./CanceledError */ "./node_modules/axios/lib/cancel/CanceledError.js");

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;

  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;

  // eslint-disable-next-line func-names
  this.promise.then(function(cancel) {
    if (!token._listeners) return;

    var i;
    var l = token._listeners.length;

    for (i = 0; i < l; i++) {
      token._listeners[i](cancel);
    }
    token._listeners = null;
  });

  // eslint-disable-next-line func-names
  this.promise.then = function(onfulfilled) {
    var _resolve;
    // eslint-disable-next-line func-names
    var promise = new Promise(function(resolve) {
      token.subscribe(resolve);
      _resolve = resolve;
    }).then(onfulfilled);

    promise.cancel = function reject() {
      token.unsubscribe(_resolve);
    };

    return promise;
  };

  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new CanceledError(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `CanceledError` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Subscribe to the cancel signal
 */

CancelToken.prototype.subscribe = function subscribe(listener) {
  if (this.reason) {
    listener(this.reason);
    return;
  }

  if (this._listeners) {
    this._listeners.push(listener);
  } else {
    this._listeners = [listener];
  }
};

/**
 * Unsubscribe from the cancel signal
 */

CancelToken.prototype.unsubscribe = function unsubscribe(listener) {
  if (!this._listeners) {
    return;
  }
  var index = this._listeners.indexOf(listener);
  if (index !== -1) {
    this._listeners.splice(index, 1);
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/CanceledError.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/cancel/CanceledError.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var AxiosError = __webpack_require__(/*! ../core/AxiosError */ "./node_modules/axios/lib/core/AxiosError.js");
var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

/**
 * A `CanceledError` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function CanceledError(message) {
  // eslint-disable-next-line no-eq-null,eqeqeq
  AxiosError.call(this, message == null ? 'canceled' : message, AxiosError.ERR_CANCELED);
  this.name = 'CanceledError';
}

utils.inherits(CanceledError, AxiosError, {
  __CANCEL__: true
});

module.exports = CanceledError;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/isCancel.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/cancel/isCancel.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/Axios.js":
/*!**********************************************!*\
  !*** ./node_modules/axios/lib/core/Axios.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var buildURL = __webpack_require__(/*! ../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var InterceptorManager = __webpack_require__(/*! ./InterceptorManager */ "./node_modules/axios/lib/core/InterceptorManager.js");
var dispatchRequest = __webpack_require__(/*! ./dispatchRequest */ "./node_modules/axios/lib/core/dispatchRequest.js");
var mergeConfig = __webpack_require__(/*! ./mergeConfig */ "./node_modules/axios/lib/core/mergeConfig.js");
var buildFullPath = __webpack_require__(/*! ./buildFullPath */ "./node_modules/axios/lib/core/buildFullPath.js");
var validator = __webpack_require__(/*! ../helpers/validator */ "./node_modules/axios/lib/helpers/validator.js");

var validators = validator.validators;
/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(configOrUrl, config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof configOrUrl === 'string') {
    config = config || {};
    config.url = configOrUrl;
  } else {
    config = configOrUrl || {};
  }

  config = mergeConfig(this.defaults, config);

  // Set config.method
  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = 'get';
  }

  var transitional = config.transitional;

  if (transitional !== undefined) {
    validator.assertOptions(transitional, {
      silentJSONParsing: validators.transitional(validators.boolean),
      forcedJSONParsing: validators.transitional(validators.boolean),
      clarifyTimeoutError: validators.transitional(validators.boolean)
    }, false);
  }

  // filter out skipped interceptors
  var requestInterceptorChain = [];
  var synchronousRequestInterceptors = true;
  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    if (typeof interceptor.runWhen === 'function' && interceptor.runWhen(config) === false) {
      return;
    }

    synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;

    requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  var responseInterceptorChain = [];
  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
  });

  var promise;

  if (!synchronousRequestInterceptors) {
    var chain = [dispatchRequest, undefined];

    Array.prototype.unshift.apply(chain, requestInterceptorChain);
    chain = chain.concat(responseInterceptorChain);

    promise = Promise.resolve(config);
    while (chain.length) {
      promise = promise.then(chain.shift(), chain.shift());
    }

    return promise;
  }


  var newConfig = config;
  while (requestInterceptorChain.length) {
    var onFulfilled = requestInterceptorChain.shift();
    var onRejected = requestInterceptorChain.shift();
    try {
      newConfig = onFulfilled(newConfig);
    } catch (error) {
      onRejected(error);
      break;
    }
  }

  try {
    promise = dispatchRequest(newConfig);
  } catch (error) {
    return Promise.reject(error);
  }

  while (responseInterceptorChain.length) {
    promise = promise.then(responseInterceptorChain.shift(), responseInterceptorChain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  var fullPath = buildFullPath(config.baseURL, config.url);
  return buildURL(fullPath, config.params, config.paramsSerializer);
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: (config || {}).data
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/

  function generateHTTPMethod(isForm) {
    return function httpMethod(url, data, config) {
      return this.request(mergeConfig(config || {}, {
        method: method,
        headers: isForm ? {
          'Content-Type': 'multipart/form-data'
        } : {},
        url: url,
        data: data
      }));
    };
  }

  Axios.prototype[method] = generateHTTPMethod();

  Axios.prototype[method + 'Form'] = generateHTTPMethod(true);
});

module.exports = Axios;


/***/ }),

/***/ "./node_modules/axios/lib/core/AxiosError.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/core/AxiosError.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [config] The config.
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
function AxiosError(message, code, config, request, response) {
  Error.call(this);
  this.message = message;
  this.name = 'AxiosError';
  code && (this.code = code);
  config && (this.config = config);
  request && (this.request = request);
  response && (this.response = response);
}

utils.inherits(AxiosError, Error, {
  toJSON: function toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code,
      status: this.response && this.response.status ? this.response.status : null
    };
  }
});

var prototype = AxiosError.prototype;
var descriptors = {};

[
  'ERR_BAD_OPTION_VALUE',
  'ERR_BAD_OPTION',
  'ECONNABORTED',
  'ETIMEDOUT',
  'ERR_NETWORK',
  'ERR_FR_TOO_MANY_REDIRECTS',
  'ERR_DEPRECATED',
  'ERR_BAD_RESPONSE',
  'ERR_BAD_REQUEST',
  'ERR_CANCELED'
// eslint-disable-next-line func-names
].forEach(function(code) {
  descriptors[code] = {value: code};
});

Object.defineProperties(AxiosError, descriptors);
Object.defineProperty(prototype, 'isAxiosError', {value: true});

// eslint-disable-next-line func-names
AxiosError.from = function(error, code, config, request, response, customProps) {
  var axiosError = Object.create(prototype);

  utils.toFlatObject(error, axiosError, function filter(obj) {
    return obj !== Error.prototype;
  });

  AxiosError.call(axiosError, error.message, code, config, request, response);

  axiosError.name = error.name;

  customProps && Object.assign(axiosError, customProps);

  return axiosError;
};

module.exports = AxiosError;


/***/ }),

/***/ "./node_modules/axios/lib/core/InterceptorManager.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/core/InterceptorManager.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected, options) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected,
    synchronous: options ? options.synchronous : false,
    runWhen: options ? options.runWhen : null
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),

/***/ "./node_modules/axios/lib/core/buildFullPath.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/buildFullPath.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isAbsoluteURL = __webpack_require__(/*! ../helpers/isAbsoluteURL */ "./node_modules/axios/lib/helpers/isAbsoluteURL.js");
var combineURLs = __webpack_require__(/*! ../helpers/combineURLs */ "./node_modules/axios/lib/helpers/combineURLs.js");

/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 * @returns {string} The combined full path
 */
module.exports = function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/dispatchRequest.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/core/dispatchRequest.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var transformData = __webpack_require__(/*! ./transformData */ "./node_modules/axios/lib/core/transformData.js");
var isCancel = __webpack_require__(/*! ../cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");
var defaults = __webpack_require__(/*! ../defaults */ "./node_modules/axios/lib/defaults/index.js");
var CanceledError = __webpack_require__(/*! ../cancel/CanceledError */ "./node_modules/axios/lib/cancel/CanceledError.js");

/**
 * Throws a `CanceledError` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }

  if (config.signal && config.signal.aborted) {
    throw new CanceledError();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData.call(
    config,
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData.call(
      config,
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData.call(
          config,
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/core/mergeConfig.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/mergeConfig.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */
module.exports = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};

  function getMergedValue(target, source) {
    if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
      return utils.merge(target, source);
    } else if (utils.isPlainObject(source)) {
      return utils.merge({}, source);
    } else if (utils.isArray(source)) {
      return source.slice();
    }
    return source;
  }

  // eslint-disable-next-line consistent-return
  function mergeDeepProperties(prop) {
    if (!utils.isUndefined(config2[prop])) {
      return getMergedValue(config1[prop], config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      return getMergedValue(undefined, config1[prop]);
    }
  }

  // eslint-disable-next-line consistent-return
  function valueFromConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      return getMergedValue(undefined, config2[prop]);
    }
  }

  // eslint-disable-next-line consistent-return
  function defaultToConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      return getMergedValue(undefined, config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      return getMergedValue(undefined, config1[prop]);
    }
  }

  // eslint-disable-next-line consistent-return
  function mergeDirectKeys(prop) {
    if (prop in config2) {
      return getMergedValue(config1[prop], config2[prop]);
    } else if (prop in config1) {
      return getMergedValue(undefined, config1[prop]);
    }
  }

  var mergeMap = {
    'url': valueFromConfig2,
    'method': valueFromConfig2,
    'data': valueFromConfig2,
    'baseURL': defaultToConfig2,
    'transformRequest': defaultToConfig2,
    'transformResponse': defaultToConfig2,
    'paramsSerializer': defaultToConfig2,
    'timeout': defaultToConfig2,
    'timeoutMessage': defaultToConfig2,
    'withCredentials': defaultToConfig2,
    'adapter': defaultToConfig2,
    'responseType': defaultToConfig2,
    'xsrfCookieName': defaultToConfig2,
    'xsrfHeaderName': defaultToConfig2,
    'onUploadProgress': defaultToConfig2,
    'onDownloadProgress': defaultToConfig2,
    'decompress': defaultToConfig2,
    'maxContentLength': defaultToConfig2,
    'maxBodyLength': defaultToConfig2,
    'beforeRedirect': defaultToConfig2,
    'transport': defaultToConfig2,
    'httpAgent': defaultToConfig2,
    'httpsAgent': defaultToConfig2,
    'cancelToken': defaultToConfig2,
    'socketPath': defaultToConfig2,
    'responseEncoding': defaultToConfig2,
    'validateStatus': mergeDirectKeys
  };

  utils.forEach(Object.keys(config1).concat(Object.keys(config2)), function computeConfigValue(prop) {
    var merge = mergeMap[prop] || mergeDeepProperties;
    var configValue = merge(prop);
    (utils.isUndefined(configValue) && merge !== mergeDirectKeys) || (config[prop] = configValue);
  });

  return config;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/settle.js":
/*!***********************************************!*\
  !*** ./node_modules/axios/lib/core/settle.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var AxiosError = __webpack_require__(/*! ./AxiosError */ "./node_modules/axios/lib/core/AxiosError.js");

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(new AxiosError(
      'Request failed with status code ' + response.status,
      [AxiosError.ERR_BAD_REQUEST, AxiosError.ERR_BAD_RESPONSE][Math.floor(response.status / 100) - 4],
      response.config,
      response.request,
      response
    ));
  }
};


/***/ }),

/***/ "./node_modules/axios/lib/core/transformData.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/transformData.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var defaults = __webpack_require__(/*! ../defaults */ "./node_modules/axios/lib/defaults/index.js");

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  var context = this || defaults;
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn.call(context, data, headers);
  });

  return data;
};


/***/ }),

/***/ "./node_modules/axios/lib/defaults/index.js":
/*!**************************************************!*\
  !*** ./node_modules/axios/lib/defaults/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");
var normalizeHeaderName = __webpack_require__(/*! ../helpers/normalizeHeaderName */ "./node_modules/axios/lib/helpers/normalizeHeaderName.js");
var AxiosError = __webpack_require__(/*! ../core/AxiosError */ "./node_modules/axios/lib/core/AxiosError.js");
var transitionalDefaults = __webpack_require__(/*! ./transitional */ "./node_modules/axios/lib/defaults/transitional.js");
var toFormData = __webpack_require__(/*! ../helpers/toFormData */ "./node_modules/axios/lib/helpers/toFormData.js");

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(/*! ../adapters/xhr */ "./node_modules/axios/lib/adapters/xhr.js");
  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = __webpack_require__(/*! ../adapters/http */ "./node_modules/axios/lib/adapters/xhr.js");
  }
  return adapter;
}

function stringifySafely(rawValue, parser, encoder) {
  if (utils.isString(rawValue)) {
    try {
      (parser || JSON.parse)(rawValue);
      return utils.trim(rawValue);
    } catch (e) {
      if (e.name !== 'SyntaxError') {
        throw e;
      }
    }
  }

  return (encoder || JSON.stringify)(rawValue);
}

var defaults = {

  transitional: transitionalDefaults,

  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');

    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }

    var isObjectPayload = utils.isObject(data);
    var contentType = headers && headers['Content-Type'];

    var isFileList;

    if ((isFileList = utils.isFileList(data)) || (isObjectPayload && contentType === 'multipart/form-data')) {
      var _FormData = this.env && this.env.FormData;
      return toFormData(isFileList ? {'files[]': data} : data, _FormData && new _FormData());
    } else if (isObjectPayload || contentType === 'application/json') {
      setContentTypeIfUnset(headers, 'application/json');
      return stringifySafely(data);
    }

    return data;
  }],

  transformResponse: [function transformResponse(data) {
    var transitional = this.transitional || defaults.transitional;
    var silentJSONParsing = transitional && transitional.silentJSONParsing;
    var forcedJSONParsing = transitional && transitional.forcedJSONParsing;
    var strictJSONParsing = !silentJSONParsing && this.responseType === 'json';

    if (strictJSONParsing || (forcedJSONParsing && utils.isString(data) && data.length)) {
      try {
        return JSON.parse(data);
      } catch (e) {
        if (strictJSONParsing) {
          if (e.name === 'SyntaxError') {
            throw AxiosError.from(e, AxiosError.ERR_BAD_RESPONSE, this, null, this.response);
          }
          throw e;
        }
      }
    }

    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,
  maxBodyLength: -1,

  env: {
    FormData: __webpack_require__(/*! ./env/FormData */ "./node_modules/axios/lib/helpers/null.js")
  },

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  },

  headers: {
    common: {
      'Accept': 'application/json, text/plain, */*'
    }
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/axios/lib/defaults/transitional.js":
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/defaults/transitional.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  silentJSONParsing: true,
  forcedJSONParsing: true,
  clarifyTimeoutError: false
};


/***/ }),

/***/ "./node_modules/axios/lib/env/data.js":
/*!********************************************!*\
  !*** ./node_modules/axios/lib/env/data.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  "version": "0.27.2"
};

/***/ }),

/***/ "./node_modules/axios/lib/helpers/bind.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/bind.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/buildURL.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/buildURL.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function encode(val) {
  return encodeURIComponent(val).
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/combineURLs.js":
/*!*******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/combineURLs.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/cookies.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/helpers/cookies.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
    (function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + '=' + encodeURIComponent(value));

          if (utils.isNumber(expires)) {
            cookie.push('expires=' + new Date(expires).toGMTString());
          }

          if (utils.isString(path)) {
            cookie.push('path=' + path);
          }

          if (utils.isString(domain)) {
            cookie.push('domain=' + domain);
          }

          if (secure === true) {
            cookie.push('secure');
          }

          document.cookie = cookie.join('; ');
        },

        read: function read(name) {
          var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
          return (match ? decodeURIComponent(match[3]) : null);
        },

        remove: function remove(name) {
          this.write(name, '', Date.now() - 86400000);
        }
      };
    })() :

  // Non standard browser env (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return {
        write: function write() {},
        read: function read() { return null; },
        remove: function remove() {}
      };
    })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAbsoluteURL.js":
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAbsoluteURL.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAxiosError.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAxiosError.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

/**
 * Determines whether the payload is an error thrown by Axios
 *
 * @param {*} payload The value to test
 * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
 */
module.exports = function isAxiosError(payload) {
  return utils.isObject(payload) && (payload.isAxiosError === true);
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isURLSameOrigin.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isURLSameOrigin.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
    (function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement('a');
      var originURL;

      /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
      function resolveURL(url) {
        var href = url;

        if (msie) {
        // IE needs attribute set twice to normalize properties
          urlParsingNode.setAttribute('href', href);
          href = urlParsingNode.href;
        }

        urlParsingNode.setAttribute('href', href);

        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
            urlParsingNode.pathname :
            '/' + urlParsingNode.pathname
        };
      }

      originURL = resolveURL(window.location.href);

      /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
      return function isURLSameOrigin(requestURL) {
        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
        return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
      };
    })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/normalizeHeaderName.js":
/*!***************************************************************!*\
  !*** ./node_modules/axios/lib/helpers/normalizeHeaderName.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/null.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/null.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// eslint-disable-next-line strict
module.exports = null;


/***/ }),

/***/ "./node_modules/axios/lib/helpers/parseHeaders.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/parseHeaders.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/parseProtocol.js":
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/parseProtocol.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function parseProtocol(url) {
  var match = /^([-+\w]{1,25})(:?\/\/|:)/.exec(url);
  return match && match[1] || '';
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/spread.js":
/*!**************************************************!*\
  !*** ./node_modules/axios/lib/helpers/spread.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/toFormData.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/toFormData.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {

var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

/**
 * Convert a data object to FormData
 * @param {Object} obj
 * @param {?Object} [formData]
 * @returns {Object}
 **/

function toFormData(obj, formData) {
  // eslint-disable-next-line no-param-reassign
  formData = formData || new FormData();

  var stack = [];

  function convertValue(value) {
    if (value === null) return '';

    if (utils.isDate(value)) {
      return value.toISOString();
    }

    if (utils.isArrayBuffer(value) || utils.isTypedArray(value)) {
      return typeof Blob === 'function' ? new Blob([value]) : Buffer.from(value);
    }

    return value;
  }

  function build(data, parentKey) {
    if (utils.isPlainObject(data) || utils.isArray(data)) {
      if (stack.indexOf(data) !== -1) {
        throw Error('Circular reference detected in ' + parentKey);
      }

      stack.push(data);

      utils.forEach(data, function each(value, key) {
        if (utils.isUndefined(value)) return;
        var fullKey = parentKey ? parentKey + '.' + key : key;
        var arr;

        if (value && !parentKey && typeof value === 'object') {
          if (utils.endsWith(key, '{}')) {
            // eslint-disable-next-line no-param-reassign
            value = JSON.stringify(value);
          } else if (utils.endsWith(key, '[]') && (arr = utils.toArray(value))) {
            // eslint-disable-next-line func-names
            arr.forEach(function(el) {
              !utils.isUndefined(el) && formData.append(fullKey, convertValue(el));
            });
            return;
          }
        }

        build(value, fullKey);
      });

      stack.pop();
    } else {
      formData.append(parentKey, convertValue(data));
    }
  }

  build(obj);

  return formData;
}

module.exports = toFormData;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../buffer/index.js */ "./node_modules/buffer/index.js").Buffer))

/***/ }),

/***/ "./node_modules/axios/lib/helpers/validator.js":
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/validator.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var VERSION = __webpack_require__(/*! ../env/data */ "./node_modules/axios/lib/env/data.js").version;
var AxiosError = __webpack_require__(/*! ../core/AxiosError */ "./node_modules/axios/lib/core/AxiosError.js");

var validators = {};

// eslint-disable-next-line func-names
['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach(function(type, i) {
  validators[type] = function validator(thing) {
    return typeof thing === type || 'a' + (i < 1 ? 'n ' : ' ') + type;
  };
});

var deprecatedWarnings = {};

/**
 * Transitional option validator
 * @param {function|boolean?} validator - set to false if the transitional option has been removed
 * @param {string?} version - deprecated version / removed since version
 * @param {string?} message - some message with additional info
 * @returns {function}
 */
validators.transitional = function transitional(validator, version, message) {
  function formatMessage(opt, desc) {
    return '[Axios v' + VERSION + '] Transitional option \'' + opt + '\'' + desc + (message ? '. ' + message : '');
  }

  // eslint-disable-next-line func-names
  return function(value, opt, opts) {
    if (validator === false) {
      throw new AxiosError(
        formatMessage(opt, ' has been removed' + (version ? ' in ' + version : '')),
        AxiosError.ERR_DEPRECATED
      );
    }

    if (version && !deprecatedWarnings[opt]) {
      deprecatedWarnings[opt] = true;
      // eslint-disable-next-line no-console
      console.warn(
        formatMessage(
          opt,
          ' has been deprecated since v' + version + ' and will be removed in the near future'
        )
      );
    }

    return validator ? validator(value, opt, opts) : true;
  };
};

/**
 * Assert object's properties type
 * @param {object} options
 * @param {object} schema
 * @param {boolean?} allowUnknown
 */

function assertOptions(options, schema, allowUnknown) {
  if (typeof options !== 'object') {
    throw new AxiosError('options must be an object', AxiosError.ERR_BAD_OPTION_VALUE);
  }
  var keys = Object.keys(options);
  var i = keys.length;
  while (i-- > 0) {
    var opt = keys[i];
    var validator = schema[opt];
    if (validator) {
      var value = options[opt];
      var result = value === undefined || validator(value, opt, options);
      if (result !== true) {
        throw new AxiosError('option ' + opt + ' must be ' + result, AxiosError.ERR_BAD_OPTION_VALUE);
      }
      continue;
    }
    if (allowUnknown !== true) {
      throw new AxiosError('Unknown option ' + opt, AxiosError.ERR_BAD_OPTION);
    }
  }
}

module.exports = {
  assertOptions: assertOptions,
  validators: validators
};


/***/ }),

/***/ "./node_modules/axios/lib/utils.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/utils.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

// eslint-disable-next-line func-names
var kindOf = (function(cache) {
  // eslint-disable-next-line func-names
  return function(thing) {
    var str = toString.call(thing);
    return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
  };
})(Object.create(null));

function kindOfTest(type) {
  type = type.toLowerCase();
  return function isKindOf(thing) {
    return kindOf(thing) === type;
  };
}

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return Array.isArray(val);
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is a Buffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Buffer, otherwise false
 */
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
    && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @function
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
var isArrayBuffer = kindOfTest('ArrayBuffer');


/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (isArrayBuffer(val.buffer));
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a plain Object
 *
 * @param {Object} val The value to test
 * @return {boolean} True if value is a plain Object, otherwise false
 */
function isPlainObject(val) {
  if (kindOf(val) !== 'object') {
    return false;
  }

  var prototype = Object.getPrototypeOf(val);
  return prototype === null || prototype === Object.prototype;
}

/**
 * Determine if a value is a Date
 *
 * @function
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
var isDate = kindOfTest('Date');

/**
 * Determine if a value is a File
 *
 * @function
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
var isFile = kindOfTest('File');

/**
 * Determine if a value is a Blob
 *
 * @function
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
var isBlob = kindOfTest('Blob');

/**
 * Determine if a value is a FileList
 *
 * @function
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
var isFileList = kindOfTest('FileList');

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} thing The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(thing) {
  var pattern = '[object FormData]';
  return thing && (
    (typeof FormData === 'function' && thing instanceof FormData) ||
    toString.call(thing) === pattern ||
    (isFunction(thing.toString) && thing.toString() === pattern)
  );
}

/**
 * Determine if a value is a URLSearchParams object
 * @function
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
var isURLSearchParams = kindOfTest('URLSearchParams');

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
                                           navigator.product === 'NativeScript' ||
                                           navigator.product === 'NS')) {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (isPlainObject(result[key]) && isPlainObject(val)) {
      result[key] = merge(result[key], val);
    } else if (isPlainObject(val)) {
      result[key] = merge({}, val);
    } else if (isArray(val)) {
      result[key] = val.slice();
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

/**
 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
 *
 * @param {string} content with BOM
 * @return {string} content value without BOM
 */
function stripBOM(content) {
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }
  return content;
}

/**
 * Inherit the prototype methods from one constructor into another
 * @param {function} constructor
 * @param {function} superConstructor
 * @param {object} [props]
 * @param {object} [descriptors]
 */

function inherits(constructor, superConstructor, props, descriptors) {
  constructor.prototype = Object.create(superConstructor.prototype, descriptors);
  constructor.prototype.constructor = constructor;
  props && Object.assign(constructor.prototype, props);
}

/**
 * Resolve object with deep prototype chain to a flat object
 * @param {Object} sourceObj source object
 * @param {Object} [destObj]
 * @param {Function} [filter]
 * @returns {Object}
 */

function toFlatObject(sourceObj, destObj, filter) {
  var props;
  var i;
  var prop;
  var merged = {};

  destObj = destObj || {};

  do {
    props = Object.getOwnPropertyNames(sourceObj);
    i = props.length;
    while (i-- > 0) {
      prop = props[i];
      if (!merged[prop]) {
        destObj[prop] = sourceObj[prop];
        merged[prop] = true;
      }
    }
    sourceObj = Object.getPrototypeOf(sourceObj);
  } while (sourceObj && (!filter || filter(sourceObj, destObj)) && sourceObj !== Object.prototype);

  return destObj;
}

/*
 * determines whether a string ends with the characters of a specified string
 * @param {String} str
 * @param {String} searchString
 * @param {Number} [position= 0]
 * @returns {boolean}
 */
function endsWith(str, searchString, position) {
  str = String(str);
  if (position === undefined || position > str.length) {
    position = str.length;
  }
  position -= searchString.length;
  var lastIndex = str.indexOf(searchString, position);
  return lastIndex !== -1 && lastIndex === position;
}


/**
 * Returns new array from array like object
 * @param {*} [thing]
 * @returns {Array}
 */
function toArray(thing) {
  if (!thing) return null;
  var i = thing.length;
  if (isUndefined(i)) return null;
  var arr = new Array(i);
  while (i-- > 0) {
    arr[i] = thing[i];
  }
  return arr;
}

// eslint-disable-next-line func-names
var isTypedArray = (function(TypedArray) {
  // eslint-disable-next-line func-names
  return function(thing) {
    return TypedArray && thing instanceof TypedArray;
  };
})(typeof Uint8Array !== 'undefined' && Object.getPrototypeOf(Uint8Array));

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isPlainObject: isPlainObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim,
  stripBOM: stripBOM,
  inherits: inherits,
  toFlatObject: toFlatObject,
  kindOf: kindOf,
  kindOfTest: kindOfTest,
  endsWith: endsWith,
  toArray: toArray,
  isTypedArray: isTypedArray,
  isFileList: isFileList
};


/***/ }),

/***/ "./node_modules/base64-js/index.js":
/*!*****************************************!*\
  !*** ./node_modules/base64-js/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  var i
  for (i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(
      uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)
    ))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}


/***/ }),

/***/ "./node_modules/buffer/index.js":
/*!**************************************!*\
  !*** ./node_modules/buffer/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(/*! base64-js */ "./node_modules/base64-js/index.js")
var ieee754 = __webpack_require__(/*! ieee754 */ "./node_modules/ieee754/index.js")
var isArray = __webpack_require__(/*! isarray */ "./node_modules/isarray/index.js")

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/ieee754/index.js":
/*!***************************************!*\
  !*** ./node_modules/ieee754/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),

/***/ "./node_modules/isarray/index.js":
/*!***************************************!*\
  !*** ./node_modules/isarray/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/regenerator-runtime/runtime.js":
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   true ? module.exports : undefined
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}


/***/ }),

/***/ "./node_modules/webpack/buildin/amd-options.js":
/*!****************************************!*\
  !*** (webpack)/buildin/amd-options.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */
module.exports = __webpack_amd_options__;

/* WEBPACK VAR INJECTION */}.call(this, {}))

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./node_modules/webpack/buildin/harmony-module.js":
/*!*******************************************!*\
  !*** (webpack)/buildin/harmony-module.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(originalModule) {
	if (!originalModule.webpackPolyfill) {
		var module = Object.create(originalModule);
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		Object.defineProperty(module, "exports", {
			enumerable: true
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ "./resources/js/genemco-app.js":
/*!*************************************!*\
  !*** ./resources/js/genemco-app.js ***!
  \*************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*! js-cookie v3.0.1 | MIT */
!function (e, t) {
  "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && __webpack_require__(/*! !webpack amd options */ "./node_modules/webpack/buildin/amd-options.js") ? define(t) : (e = e || self, function () {
    var n = e.Cookies,
        o = e.Cookies = t();

    o.noConflict = function () {
      return e.Cookies = n, o;
    };
  }());
}(undefined, function () {
  "use strict";

  function e(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];

      for (var o in n) {
        e[o] = n[o];
      }
    }

    return e;
  }

  return function t(n, o) {
    function r(t, r, i) {
      if ("undefined" != typeof document) {
        "number" == typeof (i = e({}, o, i)).expires && (i.expires = new Date(Date.now() + 864e5 * i.expires)), i.expires && (i.expires = i.expires.toUTCString()), t = encodeURIComponent(t).replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent).replace(/[()]/g, escape);
        var c = "";

        for (var u in i) {
          i[u] && (c += "; " + u, !0 !== i[u] && (c += "=" + i[u].split(";")[0]));
        }

        return document.cookie = t + "=" + n.write(r, t) + c;
      }
    }

    return Object.create({
      set: r,
      get: function get(e) {
        if ("undefined" != typeof document && (!arguments.length || e)) {
          for (var t = document.cookie ? document.cookie.split("; ") : [], o = {}, r = 0; r < t.length; r++) {
            var i = t[r].split("="),
                c = i.slice(1).join("=");

            try {
              var u = decodeURIComponent(i[0]);
              if (o[u] = n.read(c, u), e === u) break;
            } catch (e) {}
          }

          return e ? o[e] : o;
        }
      },
      remove: function remove(t, n) {
        r(t, "", e({}, n, {
          expires: -1
        }));
      },
      withAttributes: function withAttributes(n) {
        return t(this.converter, e({}, this.attributes, n));
      },
      withConverter: function withConverter(n) {
        return t(e({}, this.converter, n), this.attributes);
      }
    }, {
      attributes: {
        value: Object.freeze(o)
      },
      converter: {
        value: Object.freeze(n)
      }
    });
  }({
    read: function read(e) {
      return '"' === e[0] && (e = e.slice(1, -1)), e.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent);
    },
    write: function write(e) {
      return encodeURIComponent(e).replace(/%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g, decodeURIComponent);
    }
  }, {
    path: "/"
  });
});

(function ($) {
  $(document).ready(function (e) {
    var genemcoQuoteContainer = $('#genemco-quote'); //Genemco Quote Checkout Element

    var genemcoMyQuoteTable = $('#genemco-my-quote-list'); //Genemco Customer Order View List Element

    var disableElement = function disableElement(selector) {
      $(selector).find('a').addClass('disabled');
      $(selector).addClass('pending');
    };

    var enableElement = function enableElement(selector) {
      $(selector).find('a').removeClass('disabled');
      $(selector).removeClass('pending');
    };

    var updateGenemcoTable = function updateGenemcoTable(quoteID) {
      genemcoMyQuoteTable.html('<div class="card__header card__header--tight"><a class="link link--accented back">Back</a><a class="link link--accented archived" title="Show archived products" data-quoteid="' + quoteID + '"><i class="fa fa-archive" aria-hidden="true"></i></a><a class="button button--primary add" style="float: right;" data-quoteid="' + quoteID + '">Add Product</a><div style="float: none; clear: both;"></div></div><table class="table table--loose"><thead><tr><th></th><th>Product</th><th>Quote</th><th>Status</th><th>Genemco Comments</th><th>Quote History</th></tr></thead><tbody></tbody></table>');
      var products = window.quotedProducts;
      console.log(products);
      $.each(products, function (key, product) {
        var html = '';
        html += '<tr>';
        html += '<td style="width: 30px">' + '<a class="link link--accented trash ' + (!product.approved_by_admin ? 'disabled' : '') + '" data-productid="' + product.product_id + '" data-variantid="' + product.product_variant + '" data-quoteid="' + product.quote_id + '" title="Trash this product"><i class="fa fa-trash-o" aria-hidden="true"></i></a>' + '</td>';
        html += '<td class="line-item__product-info">' + '<div class="line-item__product-info-wrapper">' + '<div class="line-item__image-wrapper">' + '<div class="aspect-ratio aspect-ratio--square">' + '<img src="' + product.product_image + '">' + '</div>' + '</div>' + '<div class="line-item__meta">' + '<a class="line-item__title link text--strong" href="' + product.product_url + '">' + product.product_title + '</a>' + '<div class="line-item__price-list">' + '<span class="line-item__price">' + (product.approved_by_admin ? '$' + product.product_price : 'Pending price...') + '</span>' + '</div>' + '</div>' + '</div>' + '</td>';
        html += '<td><a class="link link--accented approve ' + (!product.approved_by_admin ? 'disabled' : '') + '" data-productid="' + product.product_id + '" data-variantid="' + product.product_variant + '" data-quoteid="' + product.quote_id + '" data-price="' + product.product_price + '">Approve</a> / <a class="link link--accented reject ' + (!product.approved_by_admin ? 'disabled' : '') + '" data-productid="' + product.product_id + '" data-variantid="' + product.product_variant + '" data-quoteid="' + product.quote_id + '" data-price="' + product.product_price + '">Reject</a><div class="error-message" style="display: none;">Comment is empty!</div></td>';
        html += '<td>' + (product.approved_by_admin ? product.approved ? 'Approved.' : product.genemco_updated ? 'Pending Customer Approval.' : 'Customer Rejected. Pending Genemco Approval.' : 'Pending Genemco Approval.') + '</td>';
        html += '<td>' + product.admin_comment + '</td>';
        html += '<td><a class="link link--accented history ' + (!product.approved_by_admin ? 'disabled' : '') + '" data-historyID="' + product.product_history_id + '">History</a></td>';
        html += '</tr>';

        if (product.isactive) {
          genemcoMyQuoteTable.find('tbody').append(html);
        }
      });
    };

    var renderMyQuotesTable = function renderMyQuotesTable() {
      //Disable further more button clicks
      disableElement(genemcoMyQuoteTable);
      $.ajax({
        method: 'GET',
        crossDomain: true,
        async: true,
        dataType: 'json',
        url: 'https://app.genemco.com/ajaxMyQuotes',
        data: {
          customer: window.registered_customer
        },
        success: function success(response) {
          //Enable further more button clicks
          enableElement(genemcoMyQuoteTable);
          var quotes = response.success;
          genemcoMyQuoteTable.html('<table class="table table--loose"><thead><tr><th>Quote</th><th>Date</th><th>Approval status</th><th>Ordered</th><th>Total</th></tr></thead><tbody></tbody></table>');
          $.each(quotes, function (key, quote) {
            var approved = ordered = '';

            if (quote.approved == true) {
              approved = 'Approved';
              quote.total = '$' + quote.total;
            } else {
              quote.total = approved = 'Pending...';
            }

            if (quote.ordered == true) {
              ordered = 'Yes';
            } else {
              ordered = 'No';
            }

            genemcoMyQuoteTable.find('tbody').append('<tr><td><a data-quoteid="' + quote.quote_id + '" class="link link--accented show-quote" >' + '#' + quote.id + '</a></td><td>' + quote.date + '</td><td>' + approved + '</td><td>' + ordered + '</td><td>' + quote.total + '</td></tr>');
          });
        }
      });
    };

    var renderQuotedProducts = function renderQuotedProducts(quoteID) {
      //Disable further more button clicks
      disableElement(genemcoMyQuoteTable);
      $.ajax({
        method: 'GET',
        crossDomain: true,
        async: true,
        dataType: 'json',
        url: 'https://app.genemco.com/ajaxQuotedProducts',
        data: {
          quoteID: quoteID
        },
        success: function success(response) {
          enableElement(genemcoMyQuoteTable); // genemcoMyQuoteTable.html('<div class="card__header card__header--tight"><a class="link link--accented back">Back</a><a class="link link--accented archived" title="Show archived products" data-quoteid="' + quoteID + '"><i class="fa fa-archive" aria-hidden="true"></i></a></div><table class="table table--loose"><thead><tr><th></th><th>Product</th><th>Genemco Comments</th><th>Approve?</th><th>Status</th><th>See quote history</th></tr></thead><tbody></tbody></table>');

          var products = response.success;
          window.quotedProducts = response.success;
          updateGenemcoTable(quoteID); // $.each(products, (key, product) => {
          // 	var html = '';
          // 	html += '<tr>';
          // 	html += '<td style="width: 30px">'
          // 		 	+ '<a class="link link--accented trash ' + (!product.approved_by_admin ? 'disabled' : '') + '" data-productid="' + product.product_id + '" data-variantid="' + product.product_variant + '" data-quoteid="' + product.quote_id + '" title="Trash this product"><i class="fa fa-trash-o" aria-hidden="true"></i></a>'
          // 		 	+ '</td>';
          // 	html += '<td class="line-item__product-info">'
          // 			+ '<div class="line-item__product-info-wrapper">'
          // 			+ '<div class="line-item__image-wrapper">'
          // 			+ '<div class="aspect-ratio aspect-ratio--square">'
          // 			+ '<img src="'+ product.product_image + '">'
          // 			+ '</div>'
          // 			+ '</div>'
          // 			+ '<div class="line-item__meta">'
          // 			+ '<a class="line-item__title link text--strong" href="' + product.product_url + '">' + product.product_title + '</a>'
          // 			+ '<div class="line-item__price-list">'
          // 			+ '<span class="line-item__price">' + (product.approved_by_admin ? '$' + product.product_price : 'Pending price...') + '</span>'
          // 			+ '</div>'
          // 			+ '</div>'
          // 			+ '</div>'
          // 			+ '</td>';
          // 	html += '<td>'+ product.admin_comment + '</td>';
          // 	html += '<td><a class="link link--accented approve ' + (!product.approved_by_admin ? 'disabled' : '') + '" data-productid="' + product.product_id + '" data-variantid="' + product.product_variant + '" data-quoteid="' + product.quote_id + '" data-price="' + product.product_price + '">Approve</a> / <a class="link link--accented reject ' + (!product.approved_by_admin ? 'disabled' : '') + '" data-productid="' + product.product_id + '" data-variantid="' + product.product_variant + '" data-quoteid="' + product.quote_id + '" data-price="' + product.product_price + '">Reject</a><div class="error-message" style="display: none;">Comment is empty!</div></td>';
          // 	html += '<td>' + (product.approved_by_admin ? ( product.approved ? 'Approved.' : ( product.genemco_updated ? 'Pending Customer Approval.': 'Customer Rejected. Pending Genemco Approval.' ) ) : 'Pending Genemco Approval.' ) + '</td>';
          // 	html += '<td><a class="link link--accented history ' + (!product.approved_by_admin ? 'disabled' : '') + '" data-historyID="' + product.product_history_id + '">History</a></td>';
          // 	html += '</tr>';
          // 	if (product.isactive) {
          // 		genemcoMyQuoteTable.find('tbody').append(html);
          // 	}
          // });

          console.log(response.success);
        }
      });
    };

    if (genemcoQuoteContainer.length > 0) {
      // genemcoQuoteContainer.html('Im genemco App content');
      $.ajax({
        method: 'GET',
        crossDomain: true,
        async: true,
        dataType: 'json',
        url: 'https://app.genemco.com/ajaxRequestQuoteCheckout',
        data: '',
        success: function success(data) {
          genemcoQuoteContainer.html(data.success);

          if (typeof window.registered_customer !== "undefined") {
            $(document).find('input[name="quote[contact_info]"]').val(window.registered_customer.email);
            $(document).find('input[name="quote[shipping_address][first_name]"]').val(window.registered_customer.first_name);
            $(document).find('input[name="quote[shipping_address][last_name]"]').val(window.registered_customer.last_name);
            $(document).find('input[name="quote[shipping_address][address1]"]').val(window.registered_customer.address1);
            $(document).find('input[name="quote[shipping_address][address2]"]').val(window.registered_customer.address2);
            $(document).find('input[name="quote[shipping_address][city]"]').val(window.registered_customer.city);
            $(document).find('select[name="quote[shipping_address][country]"]').val(window.registered_customer.country);
            $(document).find('select[name="quote[shipping_address][province]"]').val(window.registered_customer.province);
            $(document).find('input[name="quote[shipping_address][zip]"]').val(window.registered_customer.zip);
          }

          $(document).find('#genemco_change-registered-customer-info_btn').show();
          $.getJSON('/cart.js', function (cart) {
            var quoteCartContainer = $(document).find('#genemco-quote-cart');
            quoteCartContainer.empty(); // console.log(cart.items);

            window.quoteCartItems = cart.items;
            $.each(cart.items, function (index, value) {
              quoteCartContainer.prepend('<div class="genemco-cart-item"><a href="' + value.url + '"><img src="' + value.image + '"></a><span>' + value.product_title + '</span></div>');
            });
            quoteCartContainer.append('<div class="genemco-cart_total"><span>Total</span><span class="genemco-cart_count">' + cart.items.length + ' items</span></div>');
            $(document).find('#quote-submit').removeAttr('disabled');
          });
        }
      });
      $(document).on('click', "#quote-submit", function (e) {
        e.preventDefault();

        var _this = $(this);

        var serialzed_data = $('#genemco-quote form').serializeArray();
        var has_error = false;
        jQuery.each(serialzed_data, function (key, ele) {
          console.log(ele);

          if (ele.value == '') {
            $(document).find('#genemco-quote-error-message').text('please fillout all the fields'); // console.log(serialzed_data);

            has_error = true;
            return false;
          }
        });

        if (has_error) {
          return false;
        }

        _this.text('Submitting quote');

        _this.prop('disabled', true);

        if (typeof window.quoteCartItems !== "undefined") {
          serialzed_data.push({
            name: "quote[cart_item]",
            value: window.quoteCartItems
          });
        }

        if (typeof window.registered_customer !== "undefined") {
          serialzed_data.push({
            name: "quote[registered_customer]",
            value: window.registered_customer
          });
        } // console.log(serialzed_data);


        $.ajax({
          method: 'POST',
          crossDomain: true,
          async: true,
          url: 'https://app.genemco.com/ajaxSubmitQuote',
          data: {
            quote: serialzed_data
          },
          success: function success(data) {
            console.log(data);
            $.ajax({
              type: "POST",
              url: "/cart/clear.js",
              data: '',
              dataType: 'json',
              success: function success() {
                $('.quote-cart_container').html('<div class="empty-state"><div class="empty-state__icon"><svg width="81" height="70" viewBox="0 0 81 70"><g transform="translate(0 2)" stroke-width="4" stroke="#3a2a2f" fill="none" fill-rule="evenodd"><circle stroke-linecap="square" cx="34" cy="60" r="6"></circle><circle stroke-linecap="square" cx="67" cy="60" r="6"></circle><path d="M22.9360352 15h54.8070373l-4.3391876 30H30.3387146L19.6676025 0H.99560547"></path></g></svg></div><p class="empty-state__heading heading h1">Successfully submitted quote</p><div class="empty-state__button-container"><a href="/collections/all" class="empty-state__button button button--primary">Shop our products</a><a href="/pages/quotes-history" class="empty-state__button button button--primary">View my quotes</a></div></div>');
              }
            }); // console.log("Submitted Quote");
            // _this.prop('disabled', false);
            // _this.text('Submit Quote');
          }
        });
      });
      $(document).on('click', '#genemco_change-customer', function (e) {
        e.preventDefault();
        $(document).find('.genemco-quote-form input[name="quote[contact_info]"]').val($(document).find('.genemco_registered-customer-form input[name="quote[contact_info]"]').val());
        $(document).find('.genemco-quote-form input[name="quote[shipping_address][first_name]"]').val($(document).find('.genemco_registered-customer-form input[name="quote[shipping_address][first_name]"]').val());
        $(document).find('.genemco-quote-form input[name="quote[shipping_address][last_name]"]').val($(document).find('.genemco_registered-customer-form input[name="quote[shipping_address][last_name]"]').val());
        $(document).find('.genemco-quote-form input[name="quote[shipping_address][address1]"]').val($(document).find('.genemco_registered-customer-form input[name="quote[shipping_address][address1]"]').val());
        $(document).find('.genemco-quote-form input[name="quote[shipping_address][address2]"]').val($(document).find('.genemco_registered-customer-form input[name="quote[shipping_address][address2]"]').val());
        $(document).find('.genemco-quote-form input[name="quote[shipping_address][city]"]').val($(document).find('.genemco_registered-customer-form input[name="quote[shipping_address][city]"]').val());
        $(document).find('.genemco-quote-form select[name="quote[shipping_address][country]"]').val($(document).find('.genemco_registered-customer-form select[name="quote[shipping_address][country]"]').val());
        $(document).find('.genemco-quote-form select[name="quote[shipping_address][province]"]').val($(document).find('.genemco_registered-customer-form select[name="quote[shipping_address][province]"]').val());
        $(document).find('.genemco-quote-form input[name="quote[shipping_address][zip]"]').val($(document).find('.genemco_registered-customer-form input[name="quote[shipping_address][zip]"]').val());
        $(document).find('#genemco_registered-customer-info_email').text($(document).find('.genemco_registered-customer-form input[name="quote[contact_info]"]').val());
        $(document).find('#genemco_registered-customer-info_name').text($(document).find('.genemco_registered-customer-form input[name="quote[shipping_address][first_name]"]').val() + " " + $(document).find('.genemco_registered-customer-form input[name="quote[shipping_address][last_name]"]').val());
        $(document).find('#genemco_registered-customer-info_address1').text($(document).find('.genemco_registered-customer-form input[name="quote[shipping_address][address1]"]').val() + " " + $(document).find('.genemco_registered-customer-form input[name="quote[shipping_address][address2]"]').val() + " " + $(document).find('.genemco_registered-customer-form input[name="quote[shipping_address][city]"]').val());
        $(document).find('#genemco_registered-customer-info_address2').text($(document).find('.genemco_registered-customer-form select[name="quote[shipping_address][province]"]').val() + " " + $(document).find('.genemco_registered-customer-form input[name="quote[shipping_address][zip]"]').val() + " " + $(document).find('.genemco_registered-customer-form select[name="quote[shipping_address][country]"]').val());
        parent.$.fancybox.close();
      });
    } // Render Genemco Quote table on page load


    if (genemcoMyQuoteTable.length > 0) {
      renderMyQuotesTable();
    } // Render Genemco Quoted Products on quote ID clicked


    $(document).on('click', '#genemco-my-quote-list a.show-quote', function (e) {
      renderQuotedProducts($(this).data('quoteid'));
    }); // Back button on My quotes

    $(document).on('click', '#genemco-my-quote-list a.back', function (e) {
      renderMyQuotesTable();
    }); // Show Product History

    $(document).on('click', '#genemco-my-quote-list a.history', function (e) {
      //Disable further more button clicks
      disableElement(genemcoMyQuoteTable);
      var historyID = $(this).data('historyid');
      $.ajax({
        method: 'GET',
        crossDomain: true,
        async: true,
        dataType: 'json',
        url: 'https://app.genemco.com/ajaxProductHistory',
        data: {
          historyID: historyID
        },
        success: function success(response) {
          enableElement(genemcoMyQuoteTable);
          console.log(response.success);
          var html = '<table>';
          html += '<tr><th>From</th><th>Status</th><th>Date</th><th>Old Price</th><th>New Price</th><th>Comment</th></tr>';
          $.each(response.success, function (key, history) {
            html += '<tr><td>' + history.from + '</td><td>' + history.status + '</td><td>' + history.date + '</td><td>$' + history.old_price + '</td><td>$' + history.new_price + '</td><td>' + history.comment + '</td></tr>';
          });
          html += '</table>';
          $.fancybox.open('<div class="message"><h2 style="text-align: center; text-transform: uppercase; font-weight: bold;">History!</h2>' + html + '</div>');
        }
      });
    }); // Trash Certain Product

    $(document).on('click', '#genemco-my-quote-list a.trash', function (e) {
      //Disable further more button clicks
      // disableElement(genemcoMyQuoteTable);
      var productID = $(this).data('productid');
      var variantID = $(this).data('variantid');
      var quoteID = $(this).data('quoteid');
      var parentRow = $(this).closest('tr');
      $.fancybox.open('<div class="confirmation-popup" style="max-width: 300px; width: 90%;">' + '<p style="text-align: center;">Are you sure to trash this product?</p>' + '<div style="text-align: center">' + '<a class="trash button button--primary" style="margin-right: 10px;" data-productid="' + productID + '" data-variantID="' + variantID + '" data-quoteid="' + quoteID + '">Yes</a>' + '<a class="no button button--secondary">No</a>' + '</div>' + '<div class="error-message" style="text-align: center; display: none;">Comment field is empty!</div>' + '</div>');
      return;
    }); //Approve or Reject

    $(document).on('click', '#genemco-my-quote-list a.approve, #genemco-my-quote-list a.reject', function (e) {
      var confirmationLabel = $(e.target).hasClass('approve') ? 'approve' : 'reject';
      var productID = $(this).data('productid');
      var variantID = $(this).data('variantid');
      var quoteID = $(this).data('quoteid');
      var price = $(this).data('price');
      $.fancybox.open('<div class="confirmation-popup" style="max-width: 300px; width: 90%;">' + '<p style="text-align: center;">' + 'Could you write a few words why you\'d like to ' + confirmationLabel + '?</p>' + '<textarea name="user-comment" style="width: 100%; text-align: center;"></textarea>' + '<a class="link link--accented ' + confirmationLabel + '" style="display: block; text-align: center; cursor: pointer; text-transform: capitalize;" data-productid="' + productID + '" data-variantID="' + variantID + '" data-quoteid="' + quoteID + '" data-price="' + price + '">' + confirmationLabel + '</a>' + '<div class="error-message" style="text-align: center; display: none;">Comment field is empty!</div>' + '</div>');
      return;
    });
    $(document).on('click', '.confirmation-popup a.approve, .confirmation-popup a.reject', function (e) {
      e.preventDefault();

      if ($(this).closest('.confirmation-popup').find('textarea[name="user-comment"]').val() == '') {
        var error = $(this).closest('.confirmation-popup').find('.error-message');
        error.show();
        setTimeout(function () {
          error.hide('slow');
        }, 1000);
        return;
      }

      var approve = '';
      var approveStatus = false;
      var productID = $(this).data('productid');
      var variantID = $(this).data('variantid');
      var quoteID = $(this).data('quoteid');
      var price = $(this).data('price');
      var $parentRow = $(this).closest('.confirmation-popup');
      var userComment = $parentRow.find('textarea[name="user-comment"]').val();
      var $this = $(this); //Disable further more button clicks

      disableElement($parentRow);

      if ($(e.target).hasClass('approve')) {
        approve = 'approve';
        approveStatus = true;
      } else if ($(e.target).hasClass('reject')) {
        approve = 'reject';
        approveStatus = false;
      }

      $.ajax({
        method: 'GET',
        crossDomain: true,
        async: true,
        dataType: 'json',
        url: 'https://app.genemco.com/ajaxProductApprove',
        data: {
          productID: productID,
          variantID: variantID,
          quoteID: quoteID,
          userComment: userComment,
          approveStatus: approveStatus,
          price: price
        },
        success: function success(response) {
          enableElement($parentRow);
          $parentRow.find('textarea[name="user-comment"]').val('');
          $parentRow.find('button').trigger('click');
          console.log(response.success);
        }
      });
    });
    $(document).on('click', '.confirmation-popup a.no, .confirmation-popup a.cancel', function (e) {
      $.fancybox.close();
    });
    $(document).on('click', '.confirmation-popup a.trash', function (e) {
      var productID = $(this).data('productid');
      var variantID = $(this).data('variantid');
      var quoteID = $(this).data('quoteid');
      var $parentRow = $(this).closest('.confirmation-popup'); //Disable further more button clicks

      disableElement($parentRow);
      $.ajax({
        method: 'GET',
        crossDomain: true,
        async: true,
        dataType: 'json',
        url: 'https://app.genemco.com/ajaxProductTrash',
        data: {
          productID: productID,
          variantID: variantID,
          quoteID: quoteID
        },
        success: function success(response) {
          console.log(response.success);
          window.quotedProducts = response.success; // $parentRow.hide('slow', function(){ $parentRow.remove(); });

          $parentRow.find('button').trigger('click');
          var $target = $('a[data-productid="' + productID + '"][data-variantid="' + variantID + '"][data-quoteid="' + quoteID + '"]').closest('tr');
          $target.hide(1000, function () {
            $target.remove();
          });
          enableElement($parentRow);
        }
      });
    });
    $(document).on('click', '#genemco-my-quote-list a.archived', function (e) {
      var quoteID = $(this).data('quoteid');
      var parentRow = $(this).closest('#genemco-my-quote-list');
      var html = '';
      html += '<table class="table table--loose">' + '<thead><tr><th></th><th></th></tr></thead>' + '<tbody>';
      $.each(window.quotedProducts, function (index, product) {
        var tableRowHtml = '';
        tableRowHtml += '<tr>';
        tableRowHtml += '<td style="width: 30px">' + '<a class="link link--accented restore ' + (!product.approved_by_admin ? 'disabled' : '') + '" data-productid="' + product.product_id + '" data-variantid="' + product.product_variant + '" data-quoteid="' + product.quote_id + '" title="Restore this product" style="cursor: pointer;">Restore</a>' + '</td>';
        tableRowHtml += '<td class="line-item__product-info">' + '<div class="line-item__product-info-wrapper">' + '<div class="line-item__image-wrapper">' + '<div class="aspect-ratio aspect-ratio--square">' + '<img src="' + product.product_image + '">' + '</div>' + '</div>' + '<div class="line-item__meta">' + '<a class="line-item__title link text--strong" href="' + product.product_url + '" onfocusin="this.blur();">' + product.product_title + '</a>' + '<div class="line-item__price-list">' + '<span class="line-item__price">' + (product.approved_by_admin ? '$' + product.product_price : 'Pending price...') + '</span>' + '</div>' + '</div>' + '</div>' + '</td>';
        tableRowHtml += '</tr>';

        if (product.isactive == false) {
          html += tableRowHtml;
        }
      });
      html += '</tbody></table>';
      $.fancybox.open('<div class="confirmation-popup" style="max-width: 450px; width: 90%;">' + '<p style="text-align: center;">' + 'Deleted products</p>' + html + '</div>');
    });
    $(document).on('click', '.confirmation-popup a.restore', function (e) {
      e.preventDefault();
      var productID = $(this).data('productid');
      var variantID = $(this).data('variantid');
      var quoteID = $(this).data('quoteid');
      var $parentRow = $(this).closest('.confirmation-popup'); //Disable further more button clicks

      disableElement($parentRow);
      $.ajax({
        method: 'GET',
        crossDomain: true,
        async: true,
        dataType: 'json',
        url: 'https://app.genemco.com/ajaxProductRecover',
        data: {
          productID: productID,
          variantID: variantID,
          quoteID: quoteID
        },
        success: function success(response) {
          // console.log(response.success);
          window.quotedProducts = response.success;
          $parentRow.find('button').trigger('click');
          updateGenemcoTable(quoteID);
        }
      });
    });
    $(document).on('click', '#genemco-my-quote-list a.add', function (e) {
      var quoteID = $(this).data('quoteid');
      $.fancybox.open('<div class="genemco-add-popup" style="max-width: 460px; width: 90%;">' + '<div class="search-wrapper">' + '<svg aria-hidden="true" focusable="false" class="next-icon next-icon--size-20"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M8 12c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm9.707 4.293l-4.82-4.82C13.585 10.493 14 9.296 14 8c0-3.313-2.687-6-6-6S2 4.687 2 8s2.687 6 6 6c1.296 0 2.492-.415 3.473-1.113l4.82 4.82c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414z"></path></svg></svg>' + '<input type="text" placeholder="Search products" name="genemco_product_search_input">' + '</div>' + '</div>');
      var searchTimeout;
      var $parent = $('.genemco-add-popup');
      $(document).on('keyup', 'input[name=genemco_product_search_input]', function (e) {
        var term = $(this).val();
        if (searchTimeout) clearTimeout(searchTimeout);
        searchTimeout = setTimeout(function () {
          jQuery.getJSON("/search/suggest.json", {
            "q": term,
            "resources": {
              "type": "product",
              "limit": 10,
              "options": {
                "unavailable_products": "last",
                "fields": "title,product_type,variants.title,variants.sku"
              }
            }
          }).done(function (response) {
            window.productSuggestionsResult = response.resources.results.products;
            console.log(response.resources.results.products);

            if (window.productSuggestionsResult.length > 0) {
              $($parent).find('#search-result').remove();
              $($parent).find('a.add-selected').remove();
              var resultHtml = '<ul id="search-result" style="padding: 20px 0;">';
              $.each(window.productSuggestionsResult, function (index, product) {
                resultHtml += '<li style="list-style: none; display: flex; align-items: center; margin-bottom: 15px; padding-bottom: 15px; border-bottom: solid 1px #7777;">' + '<input type="checkbox" value="' + index + '" data-productid="' + product.id + '" class="product-checkbox" style="width: 20px; height: 20px;">' + '<div class="searched-product" style="display: flex; align-items: center; margin-left: 10px; justify-content: space-between; width: 100%;">' + '<div style="display: flex; align-items: center; justify-content: space-between; width: 100%;">' + '<span style="width: 30px; height: 30px; background-image: url(' + product.image + '); background-position: center center; background-size: contain; background-repeat: no-repeat; border: solid 1px #ccc; display: block;"></span>' + '<p class="product-name" style="margin: 0; padding: 5px; line-height: 1;">' + product.title + '</p>' + '</div>' + '</div>' + '</li>';
              });
              resultHtml += '</ul>';
              resultHtml += '<a class="button button--primary add-selected" style="float: right;" data-quoteid="' + quoteID + '">Add</a>';
              $($parent).append(resultHtml);
            }
          });
          clearTimeout(searchTimeout);
        }, 800);
      });
      $(document).on('click', 'a.add-selected', function (e) {
        var quoteID = $(this).data('quoteid');
        var checkboxes = $(this).closest('.genemco-add-popup').find('#search-result .product-checkbox');
        var selectedItems = Array();
        var $parent = $(this).closest('.genemco-add-popup');
        $.each(checkboxes, function (key, checkbox) {
          if ($(checkbox).prop('checked')) {
            selectedItems.push(window.productSuggestionsResult[key]);
          }
        });

        if (selectedItems.length > 0) {
          console.log(selectedItems); //Disable further more button clicks

          disableElement($parent);
          $.ajax({
            method: 'POST',
            crossDomain: true,
            async: true,
            dataType: 'json',
            url: 'https://app.genemco.com/ajaxAddProductsToExistingQuote',
            data: {
              quoteID: quoteID,
              products: selectedItems
            },
            success: function success(response) {
              window.quotedProducts = response.success;
              $parent.find('button').trigger('click');
              updateGenemcoTable(quoteID);
            }
          });
        }
      });
    });
  });
})(jQuery);
/* 
** New version app js
*/


var axios = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");

(function (window, document) {
  window.addEventListener('load', /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee11(e) {
      var errorMessages, initiateGenemcoFields, validateGenemcoFields, checkDisabled, getCartItems, getCategories, getUserInfo, getProjectDetails, clearCartItems, clearProjectDetailsCookies, submitQuote, submitGuestQuote, loginCustomerCheckout, userInfo, contactDetails, cartItems, projectDetails, categories, logoutCustomerCheckoutContinue, logoutCheckoutForm, backToStep1, logoutCustomerCheckoutSubmitButtons, createGenemcoAccount;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              errorMessages = {
                email: "Enter your email",
                password: "Enter your password",
                phone: "Enter your phone number",
                firstName: "Enter your first name",
                lastName: "Enter your last name",
                companyName: "Enter your company name",
                city: "Enter your city",
                state: "Enter your state",
                country: "Enter your country",
                preferredLanguage: "Enter your preferred language",
                roleInThisProject: "Enter your role in this project",
                projectTimeLine: "Enter your project timeline",
                aboutProjectandRequest: "Enter your project and request"
              };

              initiateGenemcoFields = function initiateGenemcoFields() {
                var genemcoFields = document.querySelectorAll('.genemco-field');
                genemcoFields.forEach(function (genemcoField) {
                  var cookieName = genemcoField.getAttribute('data-cookie');
                  genemcoField.addEventListener('change', function (e) {
                    if (!genemcoField.checkValidity()) {
                      genemcoField.classList.add('highlight');
                    } else {
                      genemcoField.classList.remove('highlight');
                    }

                    var genemcoFieldValue = genemcoField.value;

                    if (Cookies.get(cookieName) != undefined) {
                      Cookies.remove(cookieName);
                      Cookies.set(cookieName, genemcoFieldValue, {
                        expires: 180
                      });
                    } else {
                      Cookies.set(cookieName, genemcoFieldValue, {
                        expires: 180
                      });
                    }
                  }); //Set Genemco field values from cookie

                  if (Cookies.get(cookieName) != undefined) {
                    var cookieValue = Cookies.get(cookieName);
                    Cookies.remove(cookieName);
                    Cookies.set(cookieName, cookieValue, {
                      expires: 180
                    });

                    if (cookieValue.length > 0) {
                      genemcoField.value = cookieValue;
                      genemcoField.dispatchEvent(new Event('change'));
                    }
                  }

                  if (document.getElementById('genemco-logout-customer-checkout') != null) {
                    if (Cookies.get('firstName') == undefined || Cookies.get('lastName') == undefined || Cookies.get('companyName') == undefined || Cookies.get('email') == undefined || Cookies.get('phone') == undefined || Cookies.get('city') == undefined || Cookies.get('state') == undefined || Cookies.get('country') == undefined || Cookies.get('preferredLanguage') == undefined) {
                      document.querySelector('#genemco-logout-customer-checkout #step1').style.display = "block";
                    } else {
                      if (Cookies.get('firstName') == '' || Cookies.get('lastName') == '' || Cookies.get('companyName') == '' || Cookies.get('email') == '' || Cookies.get('phone') == '' || Cookies.get('city') == '' || Cookies.get('state') == '' || Cookies.get('country') == '' || Cookies.get('preferredLanguage') == '') {
                        document.querySelector('#genemco-logout-customer-checkout #step1').style.display = "block";
                      } else {
                        document.querySelector('#genemco-logout-customer-checkout #step2').style.display = "block";
                        var logoutCheckoutForm = document.getElementById('genemco-logout-customer-checkout__form');
                        var guestInfo = {
                          firstName: logoutCheckoutForm.querySelector('input[name="first-name"]').value,
                          lastName: logoutCheckoutForm.querySelector('input[name="last-name"]').value,
                          companyName: logoutCheckoutForm.querySelector('input[name="company-name"]').value,
                          email: logoutCheckoutForm.querySelector('input[name="email"]').value,
                          phone: logoutCheckoutForm.querySelector('input[name="phone"]').value,
                          city: logoutCheckoutForm.querySelector('input[name="city"').value,
                          state: logoutCheckoutForm.querySelector('input[name="state"]').value,
                          country: logoutCheckoutForm.querySelector('select[name="country"]').value,
                          preferredLanguage: logoutCheckoutForm.querySelector('select[name="preferred_language"]').value
                        };
                        $('#first_name').text(guestInfo.firstName);
                        $('#last_name').text(guestInfo.lastName);
                        $('#company_name').text(guestInfo.companyName);
                        $('#email').text(guestInfo.email);
                        $('#phone').text(guestInfo.phone);
                        $('#city').text(guestInfo.city);
                        $('#state').text(guestInfo.state);
                        $('#country').text(guestInfo.country);
                        $('#preferred_language').text(guestInfo.preferredLanguage);
                        document.querySelectorAll('#genemco-logout-customer-checkout #step2 .genemco-field').forEach(function (step2Field) {
                          step2Field.classList.remove('highlight');
                        });
                      }
                    }
                  }
                });
              };

              validateGenemcoFields = /*#__PURE__*/function () {
                var _ref2 = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
                  var container,
                      genemcoFields,
                      _args = arguments;
                  return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          container = _args.length > 0 && _args[0] !== undefined ? _args[0] : null;
                          genemcoFields = container == null ? document.querySelectorAll('.genemco-field') : container.querySelectorAll('.genemco-field');
                          genemcoFields.forEach(function (genemcoField) {
                            if (!genemcoField.checkValidity()) {
                              genemcoField.classList.add('highlight');
                            } else {
                              genemcoField.classList.remove('highlight');
                            }
                          });

                        case 3:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee);
                }));

                return function validateGenemcoFields() {
                  return _ref2.apply(this, arguments);
                };
              }();

              checkDisabled = function checkDisabled(ele) {
                if (ele.classList.contains('disbled')) {
                  return true;
                } else {
                  return false;
                }
              };

              getCartItems = /*#__PURE__*/function () {
                var _ref3 = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2() {
                  return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          _context2.next = 2;
                          return $.getJSON('/cart.js').then(function (cart) {
                            return cart.items;
                          });

                        case 2:
                          return _context2.abrupt("return", _context2.sent);

                        case 3:
                        case "end":
                          return _context2.stop();
                      }
                    }
                  }, _callee2);
                }));

                return function getCartItems() {
                  return _ref3.apply(this, arguments);
                };
              }();

              getCategories = function getCategories() {
                var categories = {};
                document.querySelectorAll('.cart-item__categories').forEach(function (category) {
                  var productId = category.getAttribute('data-productid');
                  var categoryValue = category.innerText.replace(/(\r\n|\n|\r)/gm, "");
                  categories[productId] = categoryValue;
                });
                return categories;
              };

              getUserInfo = /*#__PURE__*/function () {
                var _ref4 = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee3(email) {
                  return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee3$(_context3) {
                    while (1) {
                      switch (_context3.prev = _context3.next) {
                        case 0:
                          _context3.next = 2;
                          return $.ajax({
                            method: 'POST',
                            crossDomain: true,
                            async: true,
                            dataType: 'json',
                            url: 'https://app.genemco.com/frontAjax',
                            data: {
                              action: 'getUserInfo',
                              data: {
                                email: email
                              }
                            }
                          }).then(function (response) {
                            return response.success;
                          });

                        case 2:
                          return _context3.abrupt("return", _context3.sent);

                        case 3:
                        case "end":
                          return _context3.stop();
                      }
                    }
                  }, _callee3);
                }));

                return function getUserInfo(_x2) {
                  return _ref4.apply(this, arguments);
                };
              }();

              getProjectDetails = function getProjectDetails() {
                return {
                  role_in_this_project: $('#role-in-this-project').val(),
                  project_timeline: $('#project-time-line').val(),
                  about_project_and_request: $('#about-project-and-request').val()
                };
              };

              clearCartItems = /*#__PURE__*/function () {
                var _ref5 = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee4() {
                  return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee4$(_context4) {
                    while (1) {
                      switch (_context4.prev = _context4.next) {
                        case 0:
                          _context4.next = 2;
                          return $.ajax({
                            type: "POST",
                            url: "/cart/clear.js",
                            data: '',
                            dataType: 'json'
                          });

                        case 2:
                        case "end":
                          return _context4.stop();
                      }
                    }
                  }, _callee4);
                }));

                return function clearCartItems() {
                  return _ref5.apply(this, arguments);
                };
              }();

              clearProjectDetailsCookies = /*#__PURE__*/function () {
                var _ref6 = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee5() {
                  return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee5$(_context5) {
                    while (1) {
                      switch (_context5.prev = _context5.next) {
                        case 0:
                          if (Cookies.get('roleInThisProject') != undefined) {
                            Cookies.remove('roleInThisProject');
                          }

                          if (Cookies.get('projectTimeLine') != undefined) {
                            Cookies.remove('projectTimeLine');
                          }

                          if (Cookies.get('aboutProjectandRequest') != undefined) {
                            Cookies.remove('aboutProjectandRequest');
                          }

                        case 3:
                        case "end":
                          return _context5.stop();
                      }
                    }
                  }, _callee5);
                }));

                return function clearProjectDetailsCookies() {
                  return _ref6.apply(this, arguments);
                };
              }();

              submitQuote = /*#__PURE__*/function () {
                var _ref7 = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee6(userInfo, items, projectDetails, categories) {
                  return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee6$(_context6) {
                    while (1) {
                      switch (_context6.prev = _context6.next) {
                        case 0:
                          _context6.next = 2;
                          return $.ajax({
                            method: 'POST',
                            crossDomain: true,
                            async: true,
                            dataType: 'json',
                            url: 'https://app.genemco.com/frontAjax',
                            data: {
                              action: 'submitQuote',
                              data: {
                                userInfo: userInfo,
                                cartItems: items,
                                projectDetails: projectDetails,
                                categories: categories
                              }
                            }
                          }).then(function (response) {
                            return response.success;
                          });

                        case 2:
                          return _context6.abrupt("return", _context6.sent);

                        case 3:
                        case "end":
                          return _context6.stop();
                      }
                    }
                  }, _callee6);
                }));

                return function submitQuote(_x3, _x4, _x5, _x6) {
                  return _ref7.apply(this, arguments);
                };
              }();

              submitGuestQuote = /*#__PURE__*/function () {
                var _ref8 = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee7(guestInfo, items, categories) {
                  return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee7$(_context7) {
                    while (1) {
                      switch (_context7.prev = _context7.next) {
                        case 0:
                          _context7.next = 2;
                          return $.ajax({
                            method: 'POST',
                            crossDomain: true,
                            async: true,
                            dataType: 'json',
                            url: 'https://app.genemco.com/frontAjax',
                            data: {
                              action: 'submitGuestQuote',
                              data: {
                                guestInfo: guestInfo,
                                items: items,
                                categories: categories
                              }
                            }
                          }).then(function (response) {
                            return response.success;
                          });

                        case 2:
                          return _context7.abrupt("return", _context7.sent);

                        case 3:
                        case "end":
                          return _context7.stop();
                      }
                    }
                  }, _callee7);
                }));

                return function submitGuestQuote(_x7, _x8, _x9) {
                  return _ref8.apply(this, arguments);
                };
              }(); // loggedin customer checkout


              loginCustomerCheckout = document.getElementById('genemco-login-customer-checkout');

              if (!(loginCustomerCheckout != null)) {
                _context11.next = 28;
                break;
              }

              _context11.next = 16;
              return getUserInfo(window.customerEmail);

            case 16:
              userInfo = _context11.sent;
              console.log(userInfo);
              contactDetails = $('.genemco-checkout__contact .genemco-checkout__text');
              contactDetails.each(function (index, element) {
                $(element).text($(element).text().replace("%{first_name}%", userInfo.first_name));
                $(element).text($(element).text().replace("%{last_name}%", userInfo.last_name));
                $(element).text($(element).text().replace("%{company_name}%", userInfo.company_name));
                $(element).text($(element).text().replace("%{email}%", userInfo.email));
                $(element).text($(element).text().replace("%{phone}%", userInfo.phone));
                $(element).text($(element).text().replace("%{city}%", userInfo.city));
                $(element).text($(element).text().replace("%{state}%", userInfo.state));
                $(element).text($(element).text().replace("%{country}%", userInfo.country));
                $(element).text($(element).text().replace("%{preferred_language}%", userInfo.preferred_language));
              });
              document.querySelector('#genemco-login-customer-checkout #genemco-login-customer-info').style.display = 'block';
              _context11.next = 23;
              return getCartItems();

            case 23:
              cartItems = _context11.sent;
              projectDetails = getProjectDetails();
              categories = getCategories();
              $('#genemco-login-customer-checkout .genemco-checkout__button').on('click', /*#__PURE__*/function () {
                var _ref9 = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee8(e) {
                  var submitQuoteResponse, productsHTML, logInThankYouPageHTML, emptyCartHTML, hightLightedCheckoutFields;
                  return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee8$(_context8) {
                    while (1) {
                      switch (_context8.prev = _context8.next) {
                        case 0:
                          e.preventDefault();

                          if (!$(this).hasClass('disabled')) {
                            _context8.next = 3;
                            break;
                          }

                          return _context8.abrupt("return");

                        case 3:
                          $(this).addClass('disabled');
                          userInfo.roleInThisProject = document.getElementById('role-in-this-project').value;
                          userInfo.projectTimeline = document.getElementById('project-time-line').value;
                          userInfo.aboutYourProject = document.getElementById('about-project-and-request').value;

                          if (!(userInfo.roleInThisProject.length > 0 && userInfo.projectTimeline.length > 0 && userInfo.aboutYourProject.length > 0)) {
                            _context8.next = 30;
                            break;
                          }

                          $('.error-message').text('');
                          _context8.next = 11;
                          return submitQuote(userInfo, cartItems, projectDetails, categories);

                        case 11:
                          submitQuoteResponse = _context8.sent;
                          console.log(submitQuoteResponse);
                          _context8.next = 15;
                          return clearCartItems();

                        case 15:
                          _context8.next = 17;
                          return clearProjectDetailsCookies();

                        case 17:
                          // window.location.reload();
                          productsHTML = '';
                          cartItems.forEach(function (cartItem) {
                            productsHTML += "\n\t\t\t\t\t\t<div class=\"genemco-checkout__cart-item\">\n\t\t\t\t\t\t\t<div class=\"cart-item__left\">\n\t\t\t\t\t\t\t\t<img src=\"".concat(cartItem.image, "\">\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"cart-item__right\">\n\t\t\t\t\t\t\t\t<p class=\"cart-item__sku\">").concat(cartItem.sku, "</p>\n\t\t\t\t\t\t\t\t<p class=\"cart-item__title\"><strong>").concat(cartItem.title, "</strong></p>\n\t\t\t\t\t\t\t\t<p class=\"cart-item__desc\">").concat(cartItem.product_description, "</p>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t");
                          });
                          logInThankYouPageHTML = "\n\t\t\t\t\t<div class=\"logout-thankyou-page\">\n\t\t\t\t\t\t<div class=\"genemco-checkout__container\">\n\t\t\t\t\t\t\t<div class=\"genemco-checkout__row\">\n\t\t\t\t\t\t\t\t<h2 class=\"genemco-checkout__heading\" style=\"color: #00aa00;\"><strong>Thank you, your quote has been sent!</strong></h2>\n\t\t\t\t\t\t\t\t<br>\n\t\t\t\t\t\t\t\t<p class=\"genemco-checkout__text\">We will quickly email/call you to discuss your quote. You may also call us at <a href=\"tel:979-268-7447\">979-268-7447</a>.</p>\n\t\t\t\t\t\t\t\t<p class=\"genemco-checkout__text\">Please check your email for quote confirmation and additional information.</p>\n\t\t\t\t\t\t\t\t<div class=\"genemco-checkout__review-items genemco-checkout__row\">\n\t\t\t\t\t\t\t\t\t<h2 class=\"genemco-checkout__heading\"><strong>Quote Number:</strong> ".concat(submitQuoteResponse.quoteID, "</h2>\n\t\t\t\t\t\t\t\t\t<a href=\"/pages/quotes-history\" style=\"color: #0000a0; font-weight: bold; display: inline-block; margin-bottom: 30px;\">Review or Edit your Quote ></a>\n\t\t\t\t\t\t\t\t\t").concat(productsHTML, "\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t");
                          emptyCartHTML = "\n\t\t\t\t\t<a class=\"header__action-item-link header__cart-toggle\" href=\"/cart\" aria-controls=\"mini-cart\" aria-expanded=\"false\" data-action=\"toggle-mini-cart\" data-no-instant=\"\">\n  \t\t\t\t\t\t<div class=\"header__action-item-content\">\n    \t\t\t\t\t\t<div class=\"header__cart-icon icon-state\" aria-expanded=\"false\">\n      \t\t\t\t\t\t\t<span class=\"icon-state__primary\">\n      \t\t\t\t\t\t\t\t<svg class=\"icon icon--cart\" viewBox=\"0 0 27 24\" role=\"presentation\">\n\t\t\t\t\t\t\t\t      <g transform=\"translate(0 1)\" stroke-width=\"2\" stroke=\"currentColor\" fill=\"none\" fill-rule=\"evenodd\">\n\t\t\t\t\t\t\t\t        <circle stroke-linecap=\"square\" cx=\"11\" cy=\"20\" r=\"2\"></circle>\n\t\t\t\t\t\t\t\t        <circle stroke-linecap=\"square\" cx=\"22\" cy=\"20\" r=\"2\"></circle>\n\t\t\t\t\t\t\t\t        <path d=\"M7.31 5h18.27l-1.44 10H9.78L6.22 0H0\"></path>\n\t\t\t\t\t\t\t\t      </g>\n\t\t\t\t\t\t\t\t    </svg>\n\t\t\t\t\t\t\t\t\t<span class=\"header__cart-count\">0</span>\n      \t\t\t\t\t\t\t</span>\n          \t\t\t\t\t\t<span class=\"icon-state__secondary\">\n          \t\t\t\t\t\t\t<svg class=\"icon icon--close\" viewBox=\"0 0 19 19\" role=\"presentation\">\n\t\t\t\t\t\t\t\t      <path d=\"M9.1923882 8.39339828l7.7781745-7.7781746 1.4142136 1.41421357-7.7781746 7.77817459 7.7781746 7.77817456L16.9705627 19l-7.7781745-7.7781746L1.41421356 19 0 17.5857864l7.7781746-7.77817456L0 2.02943725 1.41421356.61522369 9.1923882 8.39339828z\" fill=\"currentColor\" fill-rule=\"evenodd\"></path>\n\t\t\t\t\t\t\t\t    </svg>\n\t\t\t\t\t\t\t\t</span>\n    \t\t\t\t\t\t</div>\n    \t\t\t\t\t\t<span class=\"hidden-pocket hidden-lap\">My Quote</span>\n  \t\t\t\t\t\t</div>\n\t\t\t\t\t</a>\n\t\t\t\t\t<form method=\"post\" action=\"/cart\" id=\"mini-cart\" class=\"mini-cart\" aria-hidden=\"true\" novalidate=\"novalidate\" data-item-count=\"0\" tabindex=\"-1\">\n\t\t\t\t\t  <input type=\"hidden\" name=\"attributes[collection_products_per_page]\" value=\"\">\n\t\t\t\t\t  <input type=\"hidden\" name=\"attributes[collection_layout]\" value=\"\"><svg class=\"icon icon--nav-triangle-borderless\" viewBox=\"0 0 20 9\" role=\"presentation\">\n\t\t\t\t\t      <path d=\"M.47108938 9c.2694725-.26871321.57077721-.56867841.90388257-.89986354C3.12384116 6.36134886 5.74788116 3.76338565 9.2467995.30653888c.4145057-.4095171 1.0844277-.40860098 1.4977971.00205122L19.4935156 9H.47108938z\" fill=\"#ffffff\"></path>\n\t\t\t\t\t    </svg><div class=\"mini-cart__content mini-cart__content--empty\"><div class=\"alert alert--tight alert--center text--strong\">\n\t\t\t\t\t          <a href=\"/pages/purchase-and-shipping-process\">Click here to learn about our easy purcase and shipping process</a>\n\t\t\t\t\t        </div>\n\n\t\t\t\t\t      <div class=\"mini-cart__empty-state\"><svg width=\"81\" height=\"70\" viewBox=\"0 0 81 70\">\n\t\t\t\t\t      <g transform=\"translate(0 2)\" stroke-width=\"4\" stroke=\"#232f3e\" fill=\"none\" fill-rule=\"evenodd\">\n\t\t\t\t\t        <circle stroke-linecap=\"square\" cx=\"34\" cy=\"60\" r=\"6\"></circle>\n\t\t\t\t\t        <circle stroke-linecap=\"square\" cx=\"67\" cy=\"60\" r=\"6\"></circle>\n\t\t\t\t\t        <path d=\"M22.9360352 15h54.8070373l-4.3391876 30H30.3387146L19.6676025 0H.99560547\"></path>\n\t\t\t\t\t      </g>\n\t\t\t\t\t    </svg><p class=\"heading h4\">Your quote cart is empty</p>\n\t\t\t\t\t      </div>\n\n\t\t\t\t\t      <a href=\"/collections/all\" class=\"button button--primary button--full\">Shop our products</a></div>\n\t\t\t\t\t</form>";
                          document.querySelector('#genemco-login-customer-checkout').innerHTML = logInThankYouPageHTML;
                          document.querySelector('.header__action-item--cart').innerHTML = emptyCartHTML;
                          document.querySelector('#shopify-section-header').style.display = "block";
                          document.querySelector('#shopify-section-static-newsletter').style.display = "block";
                          document.querySelector('#shopify-section-text-with-icons').style.display = "block";
                          document.querySelector('#shopify-section-footer').style.display = "block";
                          window.scrollTo(0, 0);
                          _context8.next = 35;
                          break;

                        case 30:
                          _context8.next = 32;
                          return validateGenemcoFields();

                        case 32:
                          // Show default error message
                          hightLightedCheckoutFields = document.querySelectorAll('.genemco-field.highlight');

                          if (hightLightedCheckoutFields.length > 0) {
                            hightLightedCheckoutFields.forEach(function (genemcoField) {
                              genemcoField.reportValidity();
                            });
                          }

                          $('.error-message').text('Enter all required information');

                        case 35:
                        case "end":
                          return _context8.stop();
                      }
                    }
                  }, _callee8, this);
                }));

                return function (_x10) {
                  return _ref9.apply(this, arguments);
                };
              }());
              $('#genemco-login-customer-checkout #genemco-checkout__contact-detail__change').on('click', function (e) {
                var editCustomerDetailsPopup = new Fancybox([{
                  src: "<div class=\"edit-customer-details-popup\">\n\t\t\t\t\t\t<h2>Edit Contact Details</h2>\n\t\t\t\t\t\t<form>\n\t\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t\t<div><label>First Name</label><input type=\"text\" name=\"first-name\" placeholder=\"First Name\" value=\"".concat(userInfo.first_name, "\"></div>\n\t\t\t\t\t\t\t\t<div><label>Last Name</label><input type=\"text\" name=\"last-name\" placeholder=\"Last Name\" value=\"").concat(userInfo.last_name, "\"></div>\n\t\t\t\t\t\t\t\t<div><label>Company Name</label><input type=\"text\" name=\"company-name\" placeholder=\"Company Name\" value=\"").concat(userInfo.company_name, "\"></div>\n\t\t\t\t\t\t\t\t<div><label>Phone</label><input type=\"text\" name=\"phone\" placeholder=\"Phone\" value=\"").concat(userInfo.phone, "\"></div>\n\t\t\t\t\t\t\t\t<div><label>City</label><input type=\"text\" name=\"city\" placeholder=\"City\" value=\"").concat(userInfo.city, "\"></div>\n\t\t\t\t\t\t\t\t<div><label>State</label><input type=\"text\" name=\"state\" placeholder=\"State\" value=\"").concat(userInfo.state, "\"></div>\n\t\t\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t\t<label>Country</label>\n\t\t\t\t\t\t\t\t<select name=\"country\" value=\"").concat(userInfo.country, "\">\n\t\t\t\t\t\t\t\t\t<option>Select your Country</option>\n\t\t\t\t\t\t\t\t\t<option value=\"United States of America\" ").concat(userInfo.country == "United States of America" ? "selected" : '', ">United States of America</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Canada\" ").concat(userInfo.country == "Canada" ? "selected" : '', ">Canada</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Mexico\" ").concat(userInfo.country == "Mexico" ? "selected" : '', ">Mexico</option>\n\t\t\t\t\t\t\t\t\t<option disabled>---</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Afganistan\" ").concat(userInfo.country == "Afganistan" ? "selected" : '', ">Afghanistan</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Albania\" ").concat(userInfo.country == "Albania" ? "selected" : '', ">Albania</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Algeria\" ").concat(userInfo.country == "Algeria" ? "selected" : '', ">Algeria</option>\n\t\t\t\t\t\t\t\t\t<option value=\"American Samoa\" ").concat(userInfo.country == "American Samoa" ? "selected" : '', ">American Samoa</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Andorra\" ").concat(userInfo.country == "Andorra" ? "selected" : '', ">Andorra</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Angola\" ").concat(userInfo.country == "Angola" ? "selected" : '', ">Angola</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Anguilla\" ").concat(userInfo.country == "Anguilla" ? "selected" : '', ">Anguilla</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Antigua & Barbuda\" ").concat(userInfo.country == "Antigua & Barbuda" ? "selected" : '', ">Antigua & Barbuda</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Argentina\" ").concat(userInfo.country == "Argentina" ? "selected" : '', ">Argentina</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Armenia\" ").concat(userInfo.country == "Armenia" ? "selected" : '', ">Armenia</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Aruba\" ").concat(userInfo.country == "Aruba" ? "selected" : '', ">Aruba</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Australia\" ").concat(userInfo.country == "Australia" ? "selected" : '', ">Australia</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Austria\" ").concat(userInfo.country == "Austria" ? "selected" : '', ">Austria</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Azerbaijan\" ").concat(userInfo.country == "Azerbaijan" ? "selected" : '', ">Azerbaijan</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Bahamas\" ").concat(userInfo.country == "Bahamas" ? "selected" : '', ">Bahamas</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Bahrain\" ").concat(userInfo.country == "Bahrain" ? "selected" : '', ">Bahrain</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Bangladesh\" ").concat(userInfo.country == "Bangladesh" ? "selected" : '', ">Bangladesh</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Barbados\" ").concat(userInfo.country == "Barbados" ? "selected" : '', ">Barbados</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Belarus\" ").concat(userInfo.country == "Belarus" ? "selected" : '', ">Belarus</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Belgium\" ").concat(userInfo.country == "Belgium" ? "selected" : '', ">Belgium</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Belize\" ").concat(userInfo.country == "Belize" ? "selected" : '', ">Belize</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Benin\" ").concat(userInfo.country == "Benin" ? "selected" : '', ">Benin</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Bermuda\" ").concat(userInfo.country == "Bermuda" ? "selected" : '', ">Bermuda</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Bhutan\" ").concat(userInfo.country == "Bhutan" ? "selected" : '', ">Bhutan</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Bolivia\" ").concat(userInfo.country == "Bolivia" ? "selected" : '', ">Bolivia</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Bonaire\" ").concat(userInfo.country == "Bonaire" ? "selected" : '', ">Bonaire</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Bosnia & Herzegovina\" ").concat(userInfo.country == "Bosnia & Herzegovina" ? "selected" : '', ">Bosnia & Herzegovina</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Botswana\" ").concat(userInfo.country == "Botswana" ? "selected" : '', ">Botswana</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Brazil\" ").concat(userInfo.country == "Brazil" ? "selected" : '', ">Brazil</option>\n\t\t\t\t\t\t\t\t\t<option value=\"British Indian Ocean Ter\" ").concat(userInfo.country == "British Indian Ocean Ter" ? "selected" : '', ">British Indian Ocean Ter</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Brunei\" ").concat(userInfo.country == "Brunei" ? "selected" : '', ">Brunei</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Bulgaria\" ").concat(userInfo.country == "Bulgaria" ? "selected" : '', ">Bulgaria</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Burkina Faso\" ").concat(userInfo.country == "Burkina Faso" ? "selected" : '', ">Burkina Faso</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Burundi\" ").concat(userInfo.country == "Burundi" ? "selected" : '', ">Burundi</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Cambodia\" ").concat(userInfo.country == "Cambodia" ? "selected" : '', ">Cambodia</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Cameroon\" ").concat(userInfo.country == "Cameroon" ? "selected" : '', ">Cameroon</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Canary Islands\" ").concat(userInfo.country == "Canary Islands" ? "selected" : '', ">Canary Islands</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Cape Verde\" ").concat(userInfo.country == "Cape Verde" ? "selected" : '', ">Cape Verde</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Cayman Islands\" ").concat(userInfo.country == "Cayman Islands" ? "selected" : '', ">Cayman Islands</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Central African Republic\" ").concat(userInfo.country == "Central African Republic" ? "selected" : '', ">Central African Republic</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Chad\" ").concat(userInfo.country == "Chad" ? "selected" : '', ">Chad</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Channel Islands\" ").concat(userInfo.country == "Channel Islands" ? "selected" : '', ">Channel Islands</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Chile\" ").concat(userInfo.country == "Chile" ? "selected" : '', ">Chile</option>\n\t\t\t\t\t\t\t\t\t<option value=\"China\" ").concat(userInfo.country == "China" ? "selected" : '', ">China</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Christmas Island\" ").concat(userInfo.country == "Christmas Island" ? "selected" : '', ">Christmas Island</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Cocos Island\" ").concat(userInfo.country == "Cocos Island" ? "selected" : '', ">Cocos Island</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Colombia\" ").concat(userInfo.country == "Colombia" ? "selected" : '', ">Colombia</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Comoros\" ").concat(userInfo.country == "Comoros" ? "selected" : '', ">Comoros</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Congo\" ").concat(userInfo.country == "Congo" ? "selected" : '', ">Congo</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Cook Islands\" ").concat(userInfo.country == "Cook Islands" ? "selected" : '', ">Cook Islands</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Costa Rica\" ").concat(userInfo.country == "Costa Rica" ? "selected" : '', ">Costa Rica</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Cote DIvoire\" ").concat(userInfo.country == "Cote DIvoire" ? "selected" : '', ">Cote DIvoire</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Croatia\" ").concat(userInfo.country == "Croatia" ? "selected" : '', ">Croatia</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Cuba\" ").concat(userInfo.country == "Cuba" ? "selected" : '', ">Cuba</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Curaco\" ").concat(userInfo.country == "Curaco" ? "selected" : '', ">Curacao</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Cyprus\" ").concat(userInfo.country == "Cyprus" ? "selected" : '', ">Cyprus</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Czech Republic\" ").concat(userInfo.country == "Czech Republic" ? "selected" : '', ">Czech Republic</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Denmark\" ").concat(userInfo.country == "Denmark" ? "selected" : '', ">Denmark</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Djibouti\" ").concat(userInfo.country == "Djibouti" ? "selected" : '', ">Djibouti</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Dominica\" ").concat(userInfo.country == "Dominica" ? "selected" : '', ">Dominica</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Dominican Republic\" ").concat(userInfo.country == "Dominican Republic" ? "selected" : '', ">Dominican Republic</option>\n\t\t\t\t\t\t\t\t\t<option value=\"East Timor\" ").concat(userInfo.country == "East Timor" ? "selected" : '', ">East Timor</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Ecuador\" ").concat(userInfo.country == "Ecuador" ? "selected" : '', ">Ecuador</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Egypt\" ").concat(userInfo.country == "Egypt" ? "selected" : '', ">Egypt</option>\n\t\t\t\t\t\t\t\t\t<option value=\"El Salvador\" ").concat(userInfo.country == "El Salvador" ? "selected" : '', ">El Salvador</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Equatorial Guinea\" ").concat(userInfo.country == "Equatorial Guinea" ? "selected" : '', ">Equatorial Guinea</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Eritrea\" ").concat(userInfo.country == "Eritrea" ? "selected" : '', ">Eritrea</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Estonia\" ").concat(userInfo.country == "Estonia" ? "selected" : '', ">Estonia</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Ethiopia\" ").concat(userInfo.country == "Ethiopia" ? "selected" : '', ">Ethiopia</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Falkland Islands\" ").concat(userInfo.country == "Falkland Islands" ? "selected" : '', ">Falkland Islands</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Faroe Islands\" ").concat(userInfo.country == "Faroe Islands" ? "selected" : '', ">Faroe Islands</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Fiji\" ").concat(userInfo.country == "Fiji" ? "selected" : '', ">Fiji</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Finland\" ").concat(userInfo.country == "Finland" ? "selected" : '', ">Finland</option>\n\t\t\t\t\t\t\t\t\t<option value=\"France\" ").concat(userInfo.country == "France" ? "selected" : '', ">France</option>\n\t\t\t\t\t\t\t\t\t<option value=\"French Guiana\" ").concat(userInfo.country == "French Guiana" ? "selected" : '', ">French Guiana</option>\n\t\t\t\t\t\t\t\t\t<option value=\"French Polynesia\" ").concat(userInfo.country == "French Polynesia" ? "selected" : '', ">French Polynesia</option>\n\t\t\t\t\t\t\t\t\t<option value=\"French Southern Ter\" ").concat(userInfo.country == "French Southern Ter" ? "selected" : '', ">French Southern Ter</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Gabon\" ").concat(userInfo.country == "Gabon" ? "selected" : '', ">Gabon</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Gambia\" ").concat(userInfo.country == "Gambia" ? "selected" : '', ">Gambia</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Georgia\" ").concat(userInfo.country == "Georgia" ? "selected" : '', ">Georgia</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Germany\" ").concat(userInfo.country == "Germany" ? "selected" : '', ">Germany</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Ghana\" ").concat(userInfo.country == "Ghana" ? "selected" : '', ">Ghana</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Gibraltar\" ").concat(userInfo.country == "Gibraltar" ? "selected" : '', ">Gibraltar</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Great Britain\" ").concat(userInfo.country == "Great Britain" ? "selected" : '', ">Great Britain</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Greece\" ").concat(userInfo.country == "Greece" ? "selected" : '', ">Greece</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Greenland\" ").concat(userInfo.country == "Greenland" ? "selected" : '', ">Greenland</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Grenada\" ").concat(userInfo.country == "Grenada" ? "selected" : '', ">Grenada</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Guadeloupe\" ").concat(userInfo.country == "Guadeloupe" ? "selected" : '', ">Guadeloupe</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Guam\" ").concat(userInfo.country == "Guam" ? "selected" : '', ">Guam</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Guatemala\" ").concat(userInfo.country == "Guatemala" ? "selected" : '', ">Guatemala</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Guinea\" ").concat(userInfo.country == "Guinea" ? "selected" : '', ">Guinea</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Guyana\" ").concat(userInfo.country == "Guyana" ? "selected" : '', ">Guyana</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Haiti\" ").concat(userInfo.country == "Haiti" ? "selected" : '', ">Haiti</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Hawaii\" ").concat(userInfo.country == "Hawaii" ? "selected" : '', ">Hawaii</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Honduras\" ").concat(userInfo.country == "Honduras" ? "selected" : '', ">Honduras</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Hong Kong\" ").concat(userInfo.country == "Hong Kong" ? "selected" : '', ">Hong Kong</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Hungary\" ").concat(userInfo.country == "Hungary" ? "selected" : '', ">Hungary</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Iceland\" ").concat(userInfo.country == "Iceland" ? "selected" : '', ">Iceland</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Indonesia\" ").concat(userInfo.country == "Indonesia" ? "selected" : '', ">Indonesia</option>\n\t\t\t\t\t\t\t\t\t<option value=\"India\" ").concat(userInfo.country == "India" ? "selected" : '', ">India</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Iran\" ").concat(userInfo.country == "Iran" ? "selected" : '', ">Iran</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Iraq\" ").concat(userInfo.country == "Iraq" ? "selected" : '', ">Iraq</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Ireland\" ").concat(userInfo.country == "Ireland" ? "selected" : '', ">Ireland</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Isle of Man\" ").concat(userInfo.country == "Isle of Man" ? "selected" : '', ">Isle of Man</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Israel\" ").concat(userInfo.country == "Israel" ? "selected" : '', ">Israel</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Italy\" ").concat(userInfo.country == "Italy" ? "selected" : '', ">Italy</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Jamaica\" ").concat(userInfo.country == "Jamaica" ? "selected" : '', ">Jamaica</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Japan\" ").concat(userInfo.country == "Japan" ? "selected" : '', ">Japan</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Jordan\" ").concat(userInfo.country == "Jordan" ? "selected" : '', ">Jordan</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Kazakhstan\" ").concat(userInfo.country == "Kazakhstan" ? "selected" : '', ">Kazakhstan</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Kenya\" ").concat(userInfo.country == "Kenya" ? "selected" : '', ">Kenya</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Kiribati\" ").concat(userInfo.country == "Kiribati" ? "selected" : '', ">Kiribati</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Korea North\" ").concat(userInfo.country == "Korea North" ? "selected" : '', ">Korea North</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Korea South\" ").concat(userInfo.country == "Korea South" ? "selected" : '', ">Korea South</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Kuwait\" ").concat(userInfo.country == "Kuwait" ? "selected" : '', ">Kuwait</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Kyrgyzstan\" ").concat(userInfo.country == "Kyrgyzstan" ? "selected" : '', ">Kyrgyzstan</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Laos\" ").concat(userInfo.country == "Laos" ? "selected" : '', ">Laos</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Latvia\" ").concat(userInfo.country == "Latvia" ? "selected" : '', ">Latvia</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Lebanon\" ").concat(userInfo.country == "Lebanon" ? "selected" : '', ">Lebanon</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Lesotho\" ").concat(userInfo.country == "Lesotho" ? "selected" : '', ">Lesotho</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Liberia\" ").concat(userInfo.country == "Liberia" ? "selected" : '', ">Liberia</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Libya\" ").concat(userInfo.country == "Libya" ? "selected" : '', ">Libya</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Liechtenstein\" ").concat(userInfo.country == "Liechtenstein" ? "selected" : '', ">Liechtenstein</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Lithuania\" ").concat(userInfo.country == "Lithuania" ? "selected" : '', ">Lithuania</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Luxembourg\" ").concat(userInfo.country == "Luxembourg" ? "selected" : '', ">Luxembourg</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Macau\" ").concat(userInfo.country == "Macau" ? "selected" : '', ">Macau</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Macedonia\" ").concat(userInfo.country == "Macedonia" ? "selected" : '', ">Macedonia</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Madagascar\" ").concat(userInfo.country == "Madagascar" ? "selected" : '', ">Madagascar</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Malaysia\" ").concat(userInfo.country == "Malaysia" ? "selected" : '', ">Malaysia</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Malawi\" ").concat(userInfo.country == "Malawi" ? "selected" : '', ">Malawi</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Maldives\" ").concat(userInfo.country == "Maldives" ? "selected" : '', ">Maldives</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Mali\" ").concat(userInfo.country == "Mali" ? "selected" : '', ">Mali</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Malta\" ").concat(userInfo.country == "Malta" ? "selected" : '', ">Malta</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Marshall Islands\" ").concat(userInfo.country == "Marshall Islands" ? "selected" : '', ">Marshall Islands</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Martinique\" ").concat(userInfo.country == "Martinique" ? "selected" : '', ">Martinique</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Mauritania\" ").concat(userInfo.country == "Mauritania" ? "selected" : '', ">Mauritania</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Mauritius\" ").concat(userInfo.country == "Mauritius" ? "selected" : '', ">Mauritius</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Mayotte\" ").concat(userInfo.country == "Mayotte" ? "selected" : '', ">Mayotte</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Midway Islands\" ").concat(userInfo.country == "Midway Islands" ? "selected" : '', ">Midway Islands</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Moldova\" ").concat(userInfo.country == "Moldova" ? "selected" : '', ">Moldova</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Monaco\" ").concat(userInfo.country == "Monaco" ? "selected" : '', ">Monaco</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Mongolia\" ").concat(userInfo.country == "Mongolia" ? "selected" : '', ">Mongolia</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Montserrat\" ").concat(userInfo.country == "Montserrat" ? "selected" : '', ">Montserrat</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Morocco\" ").concat(userInfo.country == "Morocco" ? "selected" : '', ">Morocco</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Mozambique\" ").concat(userInfo.country == "Mozambique" ? "selected" : '', ">Mozambique</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Myanmar\" ").concat(userInfo.country == "Myanmar" ? "selected" : '', ">Myanmar</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Nambia\" ").concat(userInfo.country == "Nambia" ? "selected" : '', ">Nambia</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Nauru\" ").concat(userInfo.country == "Nauru" ? "selected" : '', ">Nauru</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Nepal\" ").concat(userInfo.country == "Nepal" ? "selected" : '', ">Nepal</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Netherland Antilles\" ").concat(userInfo.country == "Netherland Antilles" ? "selected" : '', ">Netherland Antilles</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Netherlands\" ").concat(userInfo.country == "Netherlands" ? "selected" : '', ">Netherlands (Holland, Europe)</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Nevis\" ").concat(userInfo.country == "Nevis" ? "selected" : '', ">Nevis</option>\n\t\t\t\t\t\t\t\t\t<option value=\"New Caledonia\" ").concat(userInfo.country == "New Caledonia" ? "selected" : '', ">New Caledonia</option>\n\t\t\t\t\t\t\t\t\t<option value=\"New Zealand\" ").concat(userInfo.country == "New Zealand" ? "selected" : '', ">New Zealand</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Nicaragua\" ").concat(userInfo.country == "Nicaragua" ? "selected" : '', ">Nicaragua</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Niger\" ").concat(userInfo.country == "Niger" ? "selected" : '', ">Niger</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Nigeria\" ").concat(userInfo.country == "Nigeria" ? "selected" : '', ">Nigeria</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Niue\" ").concat(userInfo.country == "Niue" ? "selected" : '', ">Niue</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Norfolk Island\" ").concat(userInfo.country == "Norfolk Island" ? "selected" : '', ">Norfolk Island</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Norway\" ").concat(userInfo.country == "Norway" ? "selected" : '', ">Norway</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Oman\" ").concat(userInfo.country == "Oman" ? "selected" : '', ">Oman</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Pakistan\" ").concat(userInfo.country == "Pakistan" ? "selected" : '', ">Pakistan</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Palau Island\" ").concat(userInfo.country == "Palau Island" ? "selected" : '', ">Palau Island</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Papua New Guinea\" ").concat(userInfo.country == "Papua New Guinea" ? "selected" : '', ">Papua New Guinea</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Paraguay\" ").concat(userInfo.country == "Paraguay" ? "selected" : '', ">Paraguay</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Peru\" ").concat(userInfo.country == "Peru" ? "selected" : '', ">Peru</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Phillipines\" ").concat(userInfo.country == "Phillipines" ? "selected" : '', ">Philippines</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Pitcairn Island\" ").concat(userInfo.country == "Pitcairn Island" ? "selected" : '', ">Pitcairn Island</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Poland\" ").concat(userInfo.country == "Poland" ? "selected" : '', ">Poland</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Portugal\" ").concat(userInfo.country == "Portugal" ? "selected" : '', ">Portugal</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Puerto Rico\" ").concat(userInfo.country == "Puerto Rico" ? "selected" : '', ">Puerto Rico</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Qatar\" ").concat(userInfo.country == "Qatar" ? "selected" : '', ">Qatar</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Republic of Montenegro\" ").concat(userInfo.country == "Republic of Montenegro" ? "selected" : '', ">Republic of Montenegro</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Republic of Serbia\" ").concat(userInfo.country == "Republic of Serbia" ? "selected" : '', ">Republic of Serbia</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Reunion\" ").concat(userInfo.country == "Reunion" ? "selected" : '', ">Reunion</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Romania\" ").concat(userInfo.country == "Romania" ? "selected" : '', ">Romania</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Russia\" ").concat(userInfo.country == "Russia" ? "selected" : '', ">Russia</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Rwanda\" ").concat(userInfo.country == "Rwanda" ? "selected" : '', ">Rwanda</option>\n\t\t\t\t\t\t\t\t\t<option value=\"St Barthelemy\" ").concat(userInfo.country == "St Barthelemy" ? "selected" : '', ">St Barthelemy</option>\n\t\t\t\t\t\t\t\t\t<option value=\"St Eustatius\" ").concat(userInfo.country == "St Eustatius" ? "selected" : '', ">St Eustatius</option>\n\t\t\t\t\t\t\t\t\t<option value=\"St Helena\" ").concat(userInfo.country == "St Helena" ? "selected" : '', ">St Helena</option>\n\t\t\t\t\t\t\t\t\t<option value=\"St Kitts-Nevis\" ").concat(userInfo.country == "St Kitts-Nevis" ? "selected" : '', ">St Kitts-Nevis</option>\n\t\t\t\t\t\t\t\t\t<option value=\"St Lucia\" ").concat(userInfo.country == "St Lucia" ? "selected" : '', ">St Lucia</option>\n\t\t\t\t\t\t\t\t\t<option value=\"St Maarten\" ").concat(userInfo.country == "St Maarten" ? "selected" : '', ">St Maarten</option>\n\t\t\t\t\t\t\t\t\t<option value=\"St Pierre & Miquelon\" ").concat(userInfo.country == "St Pierre & Miquelon" ? "selected" : '', ">St Pierre & Miquelon</option>\n\t\t\t\t\t\t\t\t\t<option value=\"St Vincent & Grenadines\" ").concat(userInfo.country == "St Vincent & Grenadines" ? "selected" : '', ">St Vincent & Grenadines</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Saipan\" ").concat(userInfo.country == "Saipan" ? "selected" : '', ">Saipan</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Samoa\" ").concat(userInfo.country == "Samoa" ? "selected" : '', ">Samoa</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Samoa American\" ").concat(userInfo.country == "Samoa American" ? "selected" : '', ">Samoa American</option>\n\t\t\t\t\t\t\t\t\t<option value=\"San Marino\" ").concat(userInfo.country == "San Marino" ? "selected" : '', ">San Marino</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Sao Tome & Principe\" ").concat(userInfo.country == "Sao Tome & Principe" ? "selected" : '', ">Sao Tome & Principe</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Saudi Arabia\" ").concat(userInfo.country == "Saudi Arabia" ? "selected" : '', ">Saudi Arabia</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Senegal\" ").concat(userInfo.country == "Senegal" ? "selected" : '', ">Senegal</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Seychelles\" ").concat(userInfo.country == "Seychelles" ? "selected" : '', ">Seychelles</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Sierra Leone\" ").concat(userInfo.country == "Sierra Leone" ? "selected" : '', ">Sierra Leone</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Singapore\" ").concat(userInfo.country == "Singapore" ? "selected" : '', ">Singapore</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Slovakia\" ").concat(userInfo.country == "Slovakia" ? "selected" : '', ">Slovakia</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Slovenia\" ").concat(userInfo.country == "Slovenia" ? "selected" : '', ">Slovenia</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Solomon Islands\" ").concat(userInfo.country == "Solomon Islands" ? "selected" : '', ">Solomon Islands</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Somalia\" ").concat(userInfo.country == "Somalia" ? "selected" : '', ">Somalia</option>\n\t\t\t\t\t\t\t\t\t<option value=\"South Africa\" ").concat(userInfo.country == "South Africa" ? "selected" : '', ">South Africa</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Spain\" ").concat(userInfo.country == "Spain" ? "selected" : '', ">Spain</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Sri Lanka\" ").concat(userInfo.country == "Sri Lanka" ? "selected" : '', ">Sri Lanka</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Sudan\" ").concat(userInfo.country == "Sudan" ? "selected" : '', ">Sudan</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Suriname\" ").concat(userInfo.country == "Suriname" ? "selected" : '', ">Suriname</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Swaziland\" ").concat(userInfo.country == "Swaziland" ? "selected" : '', ">Swaziland</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Sweden\" ").concat(userInfo.country == "Sweden" ? "selected" : '', ">Sweden</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Switzerland\" ").concat(userInfo.country == "Switzerland" ? "selected" : '', ">Switzerland</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Syria\" ").concat(userInfo.country == "Syria" ? "selected" : '', ">Syria</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Tahiti\" ").concat(userInfo.country == "Tahiti" ? "selected" : '', ">Tahiti</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Taiwan\" ").concat(userInfo.country == "Taiwan" ? "selected" : '', ">Taiwan</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Tajikistan\" ").concat(userInfo.country == "Tajikistan" ? "selected" : '', ">Tajikistan</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Tanzania\" ").concat(userInfo.country == "Tanzania" ? "selected" : '', ">Tanzania</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Thailand\" ").concat(userInfo.country == "Thailand" ? "selected" : '', ">Thailand</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Togo\" ").concat(userInfo.country == "Togo" ? "selected" : '', ">Togo</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Tokelau\" ").concat(userInfo.country == "Tokelau" ? "selected" : '', ">Tokelau</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Tonga\" ").concat(userInfo.country == "Tonga" ? "selected" : '', ">Tonga</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Trinidad & Tobago\" ").concat(userInfo.country == "Trinidad & Tobago" ? "selected" : '', ">Trinidad & Tobago</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Tunisia\" ").concat(userInfo.country == "Tunisia" ? "selected" : '', ">Tunisia</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Turkey\" ").concat(userInfo.country == "Turkey" ? "selected" : '', ">Turkey</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Turkmenistan\" ").concat(userInfo.country == "Turkmenistan" ? "selected" : '', ">Turkmenistan</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Turks & Caicos Is\" ").concat(userInfo.country == "Turks & Caicos Is" ? "selected" : '', ">Turks & Caicos Is</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Tuvalu\" ").concat(userInfo.country == "Tuvalu" ? "selected" : '', ">Tuvalu</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Uganda\" ").concat(userInfo.country == "Uganda" ? "selected" : '', ">Uganda</option>\n\t\t\t\t\t\t\t\t\t<option value=\"United Kingdom\" ").concat(userInfo.country == "United Kingdom" ? "selected" : '', ">United Kingdom</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Ukraine\" ").concat(userInfo.country == "Ukraine" ? "selected" : '', ">Ukraine</option>\n\t\t\t\t\t\t\t\t\t<option value=\"United Arab Erimates\" ").concat(userInfo.country == "United Arab Erimates" ? "selected" : '', ">United Arab Emirates</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Uraguay\" ").concat(userInfo.country == "Uraguay" ? "selected" : '', ">Uruguay</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Uzbekistan\" ").concat(userInfo.country == "Uzbekistan" ? "selected" : '', ">Uzbekistan</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Vanuatu\" ").concat(userInfo.country == "Vanuatu" ? "selected" : '', ">Vanuatu</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Vatican City State\" ").concat(userInfo.country == "Vatican City State" ? "selected" : '', ">Vatican City State</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Venezuela\" ").concat(userInfo.country == "Venezuela" ? "selected" : '', ">Venezuela</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Vietnam\" ").concat(userInfo.country == "Vietnam" ? "selected" : '', ">Vietnam</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Virgin Islands (Brit)\" ").concat(userInfo.country == "Virgin Islands (Brit)" ? "selected" : '', ">Virgin Islands (Brit)</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Virgin Islands (USA)\" ").concat(userInfo.country == "Virgin Islands (USA)" ? "selected" : '', ">Virgin Islands (USA)</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Wake Island\" ").concat(userInfo.country == "Wake Island" ? "selected" : '', ">Wake Island</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Wallis & Futana Is\" ").concat(userInfo.country == "Wallis & Futana Is" ? "selected" : '', ">Wallis & Futana Is</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Yemen\" ").concat(userInfo.country == "Yemen" ? "selected" : '', ">Yemen</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Zaire\" ").concat(userInfo.country == "Zaire" ? "selected" : '', ">Zaire</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Zambia\" ").concat(userInfo.country == "Zambia" ? "selected" : '', ">Zambia</option>\n\t\t\t\t\t\t\t\t\t<option value=\"Zimbabwe\" ").concat(userInfo.country == "Zimbabwe" ? "selected" : '', ">Zimbabwe</option>\n\t\t\t\t\t\t\t\t</select>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t\t\t<label>Preferred language</label>\n\t\t\t\t\t\t\t\t\t<select name=\"preferred_language\" value=\"").concat(userInfo.preferred_language, "\">\n\t\t\t\t\t\t\t\t\t\t<option value=\"\">Preferred language</option>\n\t\t\t\t\t\t\t\t\t\t<option value=\"English\" ").concat(userInfo.preferred_language == "English" ? "selected" : '', ">English</option>\n\t\t\t\t\t\t\t\t\t\t<option value=\"Spanish\" ").concat(userInfo.preferred_language == "Spanish" ? "selected" : '', ">Spanish</option>\n\t\t\t\t\t\t\t\t\t\t<option value=\"Other\" ").concat(userInfo.preferred_language == "Other" ? "selected" : '', ">Other</option>\n\t\t\t\t\t\t\t\t\t</select>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<p class=\"message\" style=\"margin: 20px 0;\"></p>\n\t\t\t\t\t\t\t<a class=\"button\">Save</a>\n\t\t\t\t\t\t</form>\n\t\t\t\t\t</div>"),
                  type: "html"
                }]);
                $(document).on('click', '.edit-customer-details-popup a.button', function (e) {
                  if ($(this).hasClass('disabled')) {
                    return;
                  }

                  var $form = $('.edit-customer-details-popup');
                  var $this = $(this);
                  var newUserInfo = {};
                  newUserInfo.first_name = $form.find('input[name="first-name"]').val();
                  newUserInfo.last_name = $form.find('input[name="last-name"]').val();
                  newUserInfo.company_name = $form.find('input[name="company-name"]').val();
                  newUserInfo.email = userInfo.email;
                  newUserInfo.phone = $form.find('input[name="phone"]').val();
                  newUserInfo.city = $form.find('input[name="city"]').val();
                  newUserInfo.state = $form.find('input[name="state"]').val();
                  newUserInfo.country = $form.find('select[name="country"]').val();
                  newUserInfo.preferred_language = $form.find('select[name="preferred_language"]').val();
                  $this.addClass('disabled');
                  $.ajax({
                    method: 'POST',
                    crossDomain: true,
                    async: true,
                    dataType: 'json',
                    url: 'https://app.genemco.com/frontAjax',
                    data: {
                      action: 'edit.customer.details',
                      data: {
                        oldUserInfo: userInfo,
                        newUserInfo: newUserInfo
                      }
                    }
                  }).then(function (response) {
                    $this.removeClass('disabled');
                    userInfo = newUserInfo;
                    editCustomerDetailsPopup.close();
                    $('#genemco-login-customer-info').html("\n\t\t\t\t\t\t\t<p class=\"genemco-checkout__text\">".concat(userInfo.first_name, " ").concat(userInfo.last_name, "</p>\n\t\t\t\t\t\t\t<p class=\"genemco-checkout__text\">").concat(userInfo.company_name, "</p>\n\t\t\t\t\t\t\t<p class=\"genemco-checkout__text\">").concat(userInfo.email, "</p>\n\t\t\t\t\t\t\t<p class=\"genemco-checkout__text\">").concat(userInfo.phone, "</p>\n\t\t\t\t\t\t\t<p class=\"genemco-checkout__text\">").concat(userInfo.city, ", ").concat(userInfo.state, " ").concat(userInfo.country, "</p>\n\t\t\t\t\t\t\t<p class=\"genemco-checkout__text\">Preferred language: ").concat(userInfo.preferred_language, "</p>\n\t\t\t\t\t\t"));
                  });
                });
              });

            case 28:
              logoutCustomerCheckoutContinue = document.getElementById('logout-customer-checkout-continue');

              if (logoutCustomerCheckoutContinue != null) {
                logoutCheckoutForm = document.getElementById('genemco-logout-customer-checkout__form');
                backToStep1 = document.getElementById('back-top-step1');

                if (backToStep1 != null) {
                  backToStep1.addEventListener('click', function (e) {
                    $('.genemco-accordian-item').removeClass('active');
                    $('.genemco-accordian-item__content').hide();
                    document.querySelector('#genemco-logout-customer-checkout #step1').style.display = "block";
                    document.querySelector('#genemco-logout-customer-checkout #step2').style.display = "none";
                    $('.genemco-accordian-item.contact-details-item').addClass('active');
                    $('.genemco-accordian-item.contact-details-item .genemco-accordian-item__content').show();
                  });
                }

                logoutCustomerCheckoutContinue.addEventListener('click', /*#__PURE__*/function () {
                  var _ref10 = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee9(e) {
                    var guestInfo, hightLightedCheckoutFields;
                    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee9$(_context9) {
                      while (1) {
                        switch (_context9.prev = _context9.next) {
                          case 0:
                            e.preventDefault();
                            guestInfo = {
                              firstName: logoutCheckoutForm.querySelector('input[name="first-name"]').value,
                              lastName: logoutCheckoutForm.querySelector('input[name="last-name"]').value,
                              companyName: logoutCheckoutForm.querySelector('input[name="company-name"]').value,
                              email: logoutCheckoutForm.querySelector('input[name="email"]').value,
                              phone: logoutCheckoutForm.querySelector('input[name="phone"]').value,
                              city: logoutCheckoutForm.querySelector('input[name="city"').value,
                              state: logoutCheckoutForm.querySelector('input[name="state"]').value,
                              country: logoutCheckoutForm.querySelector('select[name="country"]').value,
                              preferredLanguage: logoutCheckoutForm.querySelector('select[name="preferred_language"]').value,
                              roleInThisProject: "",
                              projectTimeline: "",
                              aboutYourProject: ""
                            };

                            if (!(guestInfo.firstName.length > 0 && guestInfo.lastName.length > 0 && guestInfo.companyName.length > 0 && guestInfo.email.length > 0 && guestInfo.phone.length > 0 && guestInfo.city.length > 0 && guestInfo.state.length > 0 && guestInfo.country.length > 0 && guestInfo.preferredLanguage.length > 0)) {
                              _context9.next = 16;
                              break;
                            }

                            document.querySelector('#genemco-logout-customer-checkout #step1').style.display = "none";
                            document.querySelector('#genemco-logout-customer-checkout #step2').style.display = "block";
                            $('#first_name').text(guestInfo.firstName);
                            $('#last_name').text(guestInfo.lastName);
                            $('#company_name').text(guestInfo.companyName);
                            $('#email').text(guestInfo.email);
                            $('#phone').text(guestInfo.phone);
                            $('#city').text(guestInfo.city);
                            $('#state').text(guestInfo.state);
                            $('#country').text(guestInfo.country);
                            $('#preferred_language').text(guestInfo.preferredLanguage);
                            _context9.next = 21;
                            break;

                          case 16:
                            _context9.next = 18;
                            return validateGenemcoFields();

                          case 18:
                            // Show default error message
                            hightLightedCheckoutFields = logoutCheckoutForm.querySelectorAll('.genemco-field.highlight');

                            if (hightLightedCheckoutFields.length > 0) {
                              console.log(hightLightedCheckoutFields.length);
                              hightLightedCheckoutFields.forEach(function (genemcoField) {
                                genemcoField.reportValidity();
                              });
                            }

                            logoutCheckoutForm.querySelector('.message').innerHTML = "Please fill out all info";

                          case 21:
                          case "end":
                            return _context9.stop();
                        }
                      }
                    }, _callee9);
                  }));

                  return function (_x11) {
                    return _ref10.apply(this, arguments);
                  };
                }());
                logoutCustomerCheckoutSubmitButtons = document.querySelectorAll('.logout-customer-checkout-submit');
                logoutCustomerCheckoutSubmitButtons.forEach(function (logoutCustomerCheckoutSubmitButton) {
                  logoutCustomerCheckoutSubmitButton.addEventListener('click', /*#__PURE__*/function () {
                    var _ref11 = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee10(e) {
                      var guestInfo, _cartItems, _categories, submitGuestQuoteResponse, productsHTML, logoutThankYouPageHTML, emptyCartHTML, hightLightedCheckoutFields;

                      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee10$(_context10) {
                        while (1) {
                          switch (_context10.prev = _context10.next) {
                            case 0:
                              e.preventDefault();

                              if (!logoutCustomerCheckoutSubmitButton.classList.contains('disabled')) {
                                _context10.next = 3;
                                break;
                              }

                              return _context10.abrupt("return");

                            case 3:
                              logoutCustomerCheckoutSubmitButton.classList.add('disabled');
                              guestInfo = {
                                firstName: logoutCheckoutForm.querySelector('input[name="first-name"]').value,
                                lastName: logoutCheckoutForm.querySelector('input[name="last-name"]').value,
                                company: logoutCheckoutForm.querySelector('input[name="company-name"]').value,
                                email: logoutCheckoutForm.querySelector('input[name="email"]').value,
                                phone: logoutCheckoutForm.querySelector('input[name="phone"]').value,
                                city: logoutCheckoutForm.querySelector('input[name="city"').value,
                                state: logoutCheckoutForm.querySelector('input[name="state"]').value,
                                country: logoutCheckoutForm.querySelector('select[name="country"]').value,
                                preferredLanguage: logoutCheckoutForm.querySelector('select[name="preferred_language"]').value,
                                roleInThisProject: "",
                                projectTimeline: "",
                                aboutYourProject: ""
                              };
                              guestInfo.roleInThisProject = document.getElementById('role-in-this-project').value;
                              guestInfo.projectTimeline = document.getElementById('project-time-line').value;
                              guestInfo.aboutYourProject = document.getElementById('about-project-and-request').value;

                              if (!(guestInfo.roleInThisProject.length > 0 && guestInfo.projectTimeline.length > 0 && guestInfo.aboutYourProject.length > 0)) {
                                _context10.next = 34;
                                break;
                              }

                              _context10.next = 11;
                              return getCartItems();

                            case 11:
                              _cartItems = _context10.sent;
                              _categories = getCategories();
                              _context10.next = 15;
                              return submitGuestQuote(guestInfo, _cartItems, _categories);

                            case 15:
                              submitGuestQuoteResponse = _context10.sent;
                              logoutCustomerCheckoutSubmitButton.classList.remove('disabled');
                              _context10.next = 19;
                              return clearCartItems();

                            case 19:
                              _context10.next = 21;
                              return clearProjectDetailsCookies();

                            case 21:
                              // window.location.reload();
                              productsHTML = '';

                              _cartItems.forEach(function (cartItem) {
                                productsHTML += "\n\t\t\t\t\t\t\t<div class=\"genemco-checkout__cart-item\">\n\t\t\t\t\t\t\t\t<div class=\"cart-item__left\">\n\t\t\t\t\t\t\t\t\t<img src=\"".concat(cartItem.image, "\">\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div class=\"cart-item__right\">\n\t\t\t\t\t\t\t\t\t<p class=\"cart-item__sku\">").concat(cartItem.sku, "</p>\n\t\t\t\t\t\t\t\t\t<p class=\"cart-item__title\"><strong>").concat(cartItem.title, "</strong></p>\n\t\t\t\t\t\t\t\t\t<p class=\"cart-item__desc\">").concat(cartItem.product_description, "</p>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t");
                              });

                              logoutThankYouPageHTML = "\n\t\t\t\t\t\t<div class=\"logout-thankyou-page\">\n\t\t\t\t\t\t\t<div class=\"genemco-checkout__container\" style=\"margin-top: 50px;\">\n\t\t\t\t\t\t\t\t<div class=\"genemco-checkout__col-half\">\n\t\t\t\t\t\t\t\t\t<h2 class=\"genemco-checkout__heading\" style=\"color: #00aa00;\"><strong>Thank you, your quote has been sent!</strong></h2>\n\t\t\t\t\t\t\t\t\t<h2 class=\"genemco-checkout__heading\"><strong>Consider signing in or creating an account so it's saved. With an account, you can quickly request quotes without entering your information each time.</strong></h2>\n\t\t\t\t\t\t\t\t\t<br>\n\t\t\t\t\t\t\t\t\t<p class=\"genemco-checkout__text\">We will quickly email/call you to discuss your quote. You may also call us at <a href=\"tel:979-268-7447\">979-268-7447</a>.</p>\n\t\t\t\t\t\t\t\t\t<p class=\"genemco-checkout__text\">Please check your email for quote confirmation and additional information.</p>\n\t\t\t\t\t\t\t\t\t<div class=\"genemco-accordian-container hide-on-desktop\">\n\t\t\t\t\t\t\t          <div class=\"genemco-accordian-item\">\n\t\t\t\t\t\t\t            <div class=\"genemco-accordian-item__heading\">\n\t\t\t\t\t\t\t              <span class=\"genemco-accordian-bullet\"></span>\n\t\t\t\t\t\t\t              <span><strong>Create Account.</strong> New? Save quote in account!</span>\n\t\t\t\t\t\t\t            </div>\n\t\t\t\t\t\t\t            <div class=\"genemco-accordian-item__content\" style=\"display: none;\">\n\t\t\t\t\t\t\t              <div class=\"genemco-form__wrapper\">\n\t\t\t\t\t\t\t                <form method=\"post\" action=\"/account\" accept-charset=\"UTF-8\" name=\"create\" class=\"form\"><input type=\"hidden\" name=\"form_type\" value=\"create_customer\"><input type=\"hidden\" name=\"utf8\" value=\"\u2713\">\n\t\t\t\t\t\t\t                  <header class=\"popover__header\">\n\t\t\t\t\t\t\t                    <h2 class=\"popover__title heading\">Create my account</h2>\n\t\t\t\t\t\t\t                    <p class=\"popover__legend\">Please fill in the information below:</p>\n\t\t\t\t\t\t\t                  </header>\n\n\t\t\t\t\t\t\t                  <div class=\"form__input-wrapper form__input-wrapper--labelled\">\n\t\t\t\t\t\t\t                    <input type=\"text\" id=\"register-customer[first_name]\" class=\"form__field form__field--text\" name=\"customer[first_name]\" required=\"required\">\n\t\t\t\t\t\t\t                    <label for=\"register-customer[first_name]\" class=\"form__floating-label\">First name</label>\n\t\t\t\t\t\t\t                  </div>\n\n\t\t\t\t\t\t\t                  <div class=\"form__input-wrapper form__input-wrapper--labelled\">\n\t\t\t\t\t\t\t                    <input type=\"text\" id=\"register-customer[last_name]\" class=\"form__field form__field--text\" name=\"customer[last_name]\" required=\"required\">\n\t\t\t\t\t\t\t                    <label for=\"register-customer[last_name]\" class=\"form__floating-label\">Last name</label>\n\t\t\t\t\t\t\t                  </div>\n\n\t\t\t\t\t\t\t                  <div class=\"form__input-wrapper form__input-wrapper--labelled\">\n\t\t\t\t\t\t\t                    <input type=\"text\" id=\"customer[note][company]\" class=\"form__field form__field--text\" name=\"customer[note][company]\" required=\"required\">\n\t\t\t\t\t\t\t                    <label for=\"customer[note][company]\" class=\"form__floating-label\">Company name</label>\n\t\t\t\t\t\t\t                  </div>\n\n\t\t\t\t\t\t\t                  <div class=\"form__input-wrapper form__input-wrapper--labelled\">\n\t\t\t\t\t\t\t                    <input type=\"email\" id=\"customer[email]\" class=\"form__field form__field--text\" name=\"customer[email]\" required=\"required\">\n\t\t\t\t\t\t\t                    <label for=\"customer[email]\" class=\"form__floating-label\">Email</label>\n\t\t\t\t\t\t\t                  </div>\n\n\t\t\t\t\t\t\t                  <div class=\"form__input-wrapper form__input-wrapper--labelled\">\n\t\t\t\t\t\t\t                    <input type=\"text\" id=\"customer[note][phone]\" class=\"form__field form__field--text\" name=\"customer[note][phone]\" required=\"required\">\n\t\t\t\t\t\t\t                    <label for=\"customer[note][phone]\" class=\"form__floating-label\">Phone</label>\n\t\t\t\t\t\t\t                  </div>\n\n\t\t\t\t\t\t\t                  <div class=\"form__input-wrapper form__input-wrapper--labelled\">\n\t\t\t\t\t\t\t                    <input type=\"text\" id=\"customer[note][city]\" class=\"form__field form__field--text\" name=\"customer[note][city]\" required=\"required\">\n\t\t\t\t\t\t\t                    <label for=\"customer[note][city]\" class=\"form__floating-label\">City</label>\n\t\t\t\t\t\t\t                  </div>\n\n\t\t\t\t\t\t\t                  <div class=\"form__input-wrapper form__input-wrapper--labelled\">\n\t\t\t\t\t\t\t                    <input type=\"text\" id=\"customer[note][state]\" class=\"form__field form__field--text\" name=\"customer[note][state]\" required=\"required\">\n\t\t\t\t\t\t\t                    <label for=\"customer[note][state]\" class=\"form__floating-label\">State</label>\n\t\t\t\t\t\t\t                  </div>\n\n\t\t\t\t\t\t\t                  <div class=\"form__input-wrapper form__input-wrapper--labelled\">\n\t\t\t\t\t\t\t                    <select name=\"country\" id=\"customer[note][country]\" required=\"required\">\n\t\t\t\t\t\t\t                      <option value=\"\">Select your Country</option>\n\t\t\t\t\t\t\t                      <option value=\"United States of America\">United States of America</option>\n\t\t\t\t\t\t\t                      <option value=\"Canada\">Canada</option>\n\t\t\t\t\t\t\t                      <option value=\"Mexico\">Mexico</option>\n\t\t\t\t\t\t\t                      <option disabled=\"\">---</option>\n\t\t\t\t\t\t\t                      <option value=\"Afganistan\">Afghanistan</option>\n\t\t\t\t\t\t\t                      <option value=\"Albania\">Albania</option>\n\t\t\t\t\t\t\t                      <option value=\"Algeria\">Algeria</option>\n\t\t\t\t\t\t\t                      <option value=\"American Samoa\">American Samoa</option>\n\t\t\t\t\t\t\t                      <option value=\"Andorra\">Andorra</option>\n\t\t\t\t\t\t\t                      <option value=\"Angola\">Angola</option>\n\t\t\t\t\t\t\t                      <option value=\"Anguilla\">Anguilla</option>\n\t\t\t\t\t\t\t                      <option value=\"Antigua &amp; Barbuda\">Antigua &amp; Barbuda</option>\n\t\t\t\t\t\t\t                      <option value=\"Argentina\">Argentina</option>\n\t\t\t\t\t\t\t                      <option value=\"Armenia\">Armenia</option>\n\t\t\t\t\t\t\t                      <option value=\"Aruba\">Aruba</option>\n\t\t\t\t\t\t\t                      <option value=\"Australia\">Australia</option>\n\t\t\t\t\t\t\t                      <option value=\"Austria\">Austria</option>\n\t\t\t\t\t\t\t                      <option value=\"Azerbaijan\">Azerbaijan</option>\n\t\t\t\t\t\t\t                      <option value=\"Bahamas\">Bahamas</option>\n\t\t\t\t\t\t\t                      <option value=\"Bahrain\">Bahrain</option>\n\t\t\t\t\t\t\t                      <option value=\"Bangladesh\">Bangladesh</option>\n\t\t\t\t\t\t\t                      <option value=\"Barbados\">Barbados</option>\n\t\t\t\t\t\t\t                      <option value=\"Belarus\">Belarus</option>\n\t\t\t\t\t\t\t                      <option value=\"Belgium\">Belgium</option>\n\t\t\t\t\t\t\t                      <option value=\"Belize\">Belize</option>\n\t\t\t\t\t\t\t                      <option value=\"Benin\">Benin</option>\n\t\t\t\t\t\t\t                      <option value=\"Bermuda\">Bermuda</option>\n\t\t\t\t\t\t\t                      <option value=\"Bhutan\">Bhutan</option>\n\t\t\t\t\t\t\t                      <option value=\"Bolivia\">Bolivia</option>\n\t\t\t\t\t\t\t                      <option value=\"Bonaire\">Bonaire</option>\n\t\t\t\t\t\t\t                      <option value=\"Bosnia &amp; Herzegovina\">Bosnia &amp; Herzegovina</option>\n\t\t\t\t\t\t\t                      <option value=\"Botswana\">Botswana</option>\n\t\t\t\t\t\t\t                      <option value=\"Brazil\">Brazil</option>\n\t\t\t\t\t\t\t                      <option value=\"British Indian Ocean Ter\">British Indian Ocean Ter</option>\n\t\t\t\t\t\t\t                      <option value=\"Brunei\">Brunei</option>\n\t\t\t\t\t\t\t                      <option value=\"Bulgaria\">Bulgaria</option>\n\t\t\t\t\t\t\t                      <option value=\"Burkina Faso\">Burkina Faso</option>\n\t\t\t\t\t\t\t                      <option value=\"Burundi\">Burundi</option>\n\t\t\t\t\t\t\t                      <option value=\"Cambodia\">Cambodia</option>\n\t\t\t\t\t\t\t                      <option value=\"Cameroon\">Cameroon</option>\n\t\t\t\t\t\t\t                      <option value=\"Canary Islands\">Canary Islands</option>\n\t\t\t\t\t\t\t                      <option value=\"Cape Verde\">Cape Verde</option>\n\t\t\t\t\t\t\t                      <option value=\"Cayman Islands\">Cayman Islands</option>\n\t\t\t\t\t\t\t                      <option value=\"Central African Republic\">Central African Republic</option>\n\t\t\t\t\t\t\t                      <option value=\"Chad\">Chad</option>\n\t\t\t\t\t\t\t                      <option value=\"Channel Islands\">Channel Islands</option>\n\t\t\t\t\t\t\t                      <option value=\"Chile\">Chile</option>\n\t\t\t\t\t\t\t                      <option value=\"China\">China</option>\n\t\t\t\t\t\t\t                      <option value=\"Christmas Island\">Christmas Island</option>\n\t\t\t\t\t\t\t                      <option value=\"Cocos Island\">Cocos Island</option>\n\t\t\t\t\t\t\t                      <option value=\"Colombia\">Colombia</option>\n\t\t\t\t\t\t\t                      <option value=\"Comoros\">Comoros</option>\n\t\t\t\t\t\t\t                      <option value=\"Congo\">Congo</option>\n\t\t\t\t\t\t\t                      <option value=\"Cook Islands\">Cook Islands</option>\n\t\t\t\t\t\t\t                      <option value=\"Costa Rica\">Costa Rica</option>\n\t\t\t\t\t\t\t                      <option value=\"Cote DIvoire\">Cote DIvoire</option>\n\t\t\t\t\t\t\t                      <option value=\"Croatia\">Croatia</option>\n\t\t\t\t\t\t\t                      <option value=\"Cuba\">Cuba</option>\n\t\t\t\t\t\t\t                      <option value=\"Curaco\">Curacao</option>\n\t\t\t\t\t\t\t                      <option value=\"Cyprus\">Cyprus</option>\n\t\t\t\t\t\t\t                      <option value=\"Czech Republic\">Czech Republic</option>\n\t\t\t\t\t\t\t                      <option value=\"Denmark\">Denmark</option>\n\t\t\t\t\t\t\t                      <option value=\"Djibouti\">Djibouti</option>\n\t\t\t\t\t\t\t                      <option value=\"Dominica\">Dominica</option>\n\t\t\t\t\t\t\t                      <option value=\"Dominican Republic\">Dominican Republic</option>\n\t\t\t\t\t\t\t                      <option value=\"East Timor\">East Timor</option>\n\t\t\t\t\t\t\t                      <option value=\"Ecuador\">Ecuador</option>\n\t\t\t\t\t\t\t                      <option value=\"Egypt\">Egypt</option>\n\t\t\t\t\t\t\t                      <option value=\"El Salvador\">El Salvador</option>\n\t\t\t\t\t\t\t                      <option value=\"Equatorial Guinea\">Equatorial Guinea</option>\n\t\t\t\t\t\t\t                      <option value=\"Eritrea\">Eritrea</option>\n\t\t\t\t\t\t\t                      <option value=\"Estonia\">Estonia</option>\n\t\t\t\t\t\t\t                      <option value=\"Ethiopia\">Ethiopia</option>\n\t\t\t\t\t\t\t                      <option value=\"Falkland Islands\">Falkland Islands</option>\n\t\t\t\t\t\t\t                      <option value=\"Faroe Islands\">Faroe Islands</option>\n\t\t\t\t\t\t\t                      <option value=\"Fiji\">Fiji</option>\n\t\t\t\t\t\t\t                      <option value=\"Finland\">Finland</option>\n\t\t\t\t\t\t\t                      <option value=\"France\">France</option>\n\t\t\t\t\t\t\t                      <option value=\"French Guiana\">French Guiana</option>\n\t\t\t\t\t\t\t                      <option value=\"French Polynesia\">French Polynesia</option>\n\t\t\t\t\t\t\t                      <option value=\"French Southern Ter\">French Southern Ter</option>\n\t\t\t\t\t\t\t                      <option value=\"Gabon\">Gabon</option>\n\t\t\t\t\t\t\t                      <option value=\"Gambia\">Gambia</option>\n\t\t\t\t\t\t\t                      <option value=\"Georgia\">Georgia</option>\n\t\t\t\t\t\t\t                      <option value=\"Germany\">Germany</option>\n\t\t\t\t\t\t\t                      <option value=\"Ghana\">Ghana</option>\n\t\t\t\t\t\t\t                      <option value=\"Gibraltar\">Gibraltar</option>\n\t\t\t\t\t\t\t                      <option value=\"Great Britain\">Great Britain</option>\n\t\t\t\t\t\t\t                      <option value=\"Greece\">Greece</option>\n\t\t\t\t\t\t\t                      <option value=\"Greenland\">Greenland</option>\n\t\t\t\t\t\t\t                      <option value=\"Grenada\">Grenada</option>\n\t\t\t\t\t\t\t                      <option value=\"Guadeloupe\">Guadeloupe</option>\n\t\t\t\t\t\t\t                      <option value=\"Guam\">Guam</option>\n\t\t\t\t\t\t\t                      <option value=\"Guatemala\">Guatemala</option>\n\t\t\t\t\t\t\t                      <option value=\"Guinea\">Guinea</option>\n\t\t\t\t\t\t\t                      <option value=\"Guyana\">Guyana</option>\n\t\t\t\t\t\t\t                      <option value=\"Haiti\">Haiti</option>\n\t\t\t\t\t\t\t                      <option value=\"Hawaii\">Hawaii</option>\n\t\t\t\t\t\t\t                      <option value=\"Honduras\">Honduras</option>\n\t\t\t\t\t\t\t                      <option value=\"Hong Kong\">Hong Kong</option>\n\t\t\t\t\t\t\t                      <option value=\"Hungary\">Hungary</option>\n\t\t\t\t\t\t\t                      <option value=\"Iceland\">Iceland</option>\n\t\t\t\t\t\t\t                      <option value=\"Indonesia\">Indonesia</option>\n\t\t\t\t\t\t\t                      <option value=\"India\">India</option>\n\t\t\t\t\t\t\t                      <option value=\"Iran\">Iran</option>\n\t\t\t\t\t\t\t                      <option value=\"Iraq\">Iraq</option>\n\t\t\t\t\t\t\t                      <option value=\"Ireland\">Ireland</option>\n\t\t\t\t\t\t\t                      <option value=\"Isle of Man\">Isle of Man</option>\n\t\t\t\t\t\t\t                      <option value=\"Israel\">Israel</option>\n\t\t\t\t\t\t\t                      <option value=\"Italy\">Italy</option>\n\t\t\t\t\t\t\t                      <option value=\"Jamaica\">Jamaica</option>\n\t\t\t\t\t\t\t                      <option value=\"Japan\">Japan</option>\n\t\t\t\t\t\t\t                      <option value=\"Jordan\">Jordan</option>\n\t\t\t\t\t\t\t                      <option value=\"Kazakhstan\">Kazakhstan</option>\n\t\t\t\t\t\t\t                      <option value=\"Kenya\">Kenya</option>\n\t\t\t\t\t\t\t                      <option value=\"Kiribati\">Kiribati</option>\n\t\t\t\t\t\t\t                      <option value=\"Korea North\">Korea North</option>\n\t\t\t\t\t\t\t                      <option value=\"Korea South\">Korea South</option>\n\t\t\t\t\t\t\t                      <option value=\"Kuwait\">Kuwait</option>\n\t\t\t\t\t\t\t                      <option value=\"Kyrgyzstan\">Kyrgyzstan</option>\n\t\t\t\t\t\t\t                      <option value=\"Laos\">Laos</option>\n\t\t\t\t\t\t\t                      <option value=\"Latvia\">Latvia</option>\n\t\t\t\t\t\t\t                      <option value=\"Lebanon\">Lebanon</option>\n\t\t\t\t\t\t\t                      <option value=\"Lesotho\">Lesotho</option>\n\t\t\t\t\t\t\t                      <option value=\"Liberia\">Liberia</option>\n\t\t\t\t\t\t\t                      <option value=\"Libya\">Libya</option>\n\t\t\t\t\t\t\t                      <option value=\"Liechtenstein\">Liechtenstein</option>\n\t\t\t\t\t\t\t                      <option value=\"Lithuania\">Lithuania</option>\n\t\t\t\t\t\t\t                      <option value=\"Luxembourg\">Luxembourg</option>\n\t\t\t\t\t\t\t                      <option value=\"Macau\">Macau</option>\n\t\t\t\t\t\t\t                      <option value=\"Macedonia\">Macedonia</option>\n\t\t\t\t\t\t\t                      <option value=\"Madagascar\">Madagascar</option>\n\t\t\t\t\t\t\t                      <option value=\"Malaysia\">Malaysia</option>\n\t\t\t\t\t\t\t                      <option value=\"Malawi\">Malawi</option>\n\t\t\t\t\t\t\t                      <option value=\"Maldives\">Maldives</option>\n\t\t\t\t\t\t\t                      <option value=\"Mali\">Mali</option>\n\t\t\t\t\t\t\t                      <option value=\"Malta\">Malta</option>\n\t\t\t\t\t\t\t                      <option value=\"Marshall Islands\">Marshall Islands</option>\n\t\t\t\t\t\t\t                      <option value=\"Martinique\">Martinique</option>\n\t\t\t\t\t\t\t                      <option value=\"Mauritania\">Mauritania</option>\n\t\t\t\t\t\t\t                      <option value=\"Mauritius\">Mauritius</option>\n\t\t\t\t\t\t\t                      <option value=\"Mayotte\">Mayotte</option>\n\t\t\t\t\t\t\t                      <option value=\"Midway Islands\">Midway Islands</option>\n\t\t\t\t\t\t\t                      <option value=\"Moldova\">Moldova</option>\n\t\t\t\t\t\t\t                      <option value=\"Monaco\">Monaco</option>\n\t\t\t\t\t\t\t                      <option value=\"Mongolia\">Mongolia</option>\n\t\t\t\t\t\t\t                      <option value=\"Montserrat\">Montserrat</option>\n\t\t\t\t\t\t\t                      <option value=\"Morocco\">Morocco</option>\n\t\t\t\t\t\t\t                      <option value=\"Mozambique\">Mozambique</option>\n\t\t\t\t\t\t\t                      <option value=\"Myanmar\">Myanmar</option>\n\t\t\t\t\t\t\t                      <option value=\"Nambia\">Nambia</option>\n\t\t\t\t\t\t\t                      <option value=\"Nauru\">Nauru</option>\n\t\t\t\t\t\t\t                      <option value=\"Nepal\">Nepal</option>\n\t\t\t\t\t\t\t                      <option value=\"Netherland Antilles\">Netherland Antilles</option>\n\t\t\t\t\t\t\t                      <option value=\"Netherlands\">Netherlands (Holland, Europe)</option>\n\t\t\t\t\t\t\t                      <option value=\"Nevis\">Nevis</option>\n\t\t\t\t\t\t\t                      <option value=\"New Caledonia\">New Caledonia</option>\n\t\t\t\t\t\t\t                      <option value=\"New Zealand\">New Zealand</option>\n\t\t\t\t\t\t\t                      <option value=\"Nicaragua\">Nicaragua</option>\n\t\t\t\t\t\t\t                      <option value=\"Niger\">Niger</option>\n\t\t\t\t\t\t\t                      <option value=\"Nigeria\">Nigeria</option>\n\t\t\t\t\t\t\t                      <option value=\"Niue\">Niue</option>\n\t\t\t\t\t\t\t                      <option value=\"Norfolk Island\">Norfolk Island</option>\n\t\t\t\t\t\t\t                      <option value=\"Norway\">Norway</option>\n\t\t\t\t\t\t\t                      <option value=\"Oman\">Oman</option>\n\t\t\t\t\t\t\t                      <option value=\"Pakistan\">Pakistan</option>\n\t\t\t\t\t\t\t                      <option value=\"Palau Island\">Palau Island</option>\n\t\t\t\t\t\t\t                      <option value=\"Papua New Guinea\">Papua New Guinea</option>\n\t\t\t\t\t\t\t                      <option value=\"Paraguay\">Paraguay</option>\n\t\t\t\t\t\t\t                      <option value=\"Peru\">Peru</option>\n\t\t\t\t\t\t\t                      <option value=\"Phillipines\">Philippines</option>\n\t\t\t\t\t\t\t                      <option value=\"Pitcairn Island\">Pitcairn Island</option>\n\t\t\t\t\t\t\t                      <option value=\"Poland\">Poland</option>\n\t\t\t\t\t\t\t                      <option value=\"Portugal\">Portugal</option>\n\t\t\t\t\t\t\t                      <option value=\"Puerto Rico\">Puerto Rico</option>\n\t\t\t\t\t\t\t                      <option value=\"Qatar\">Qatar</option>\n\t\t\t\t\t\t\t                      <option value=\"Republic of Montenegro\">Republic of Montenegro</option>\n\t\t\t\t\t\t\t                      <option value=\"Republic of Serbia\">Republic of Serbia</option>\n\t\t\t\t\t\t\t                      <option value=\"Reunion\">Reunion</option>\n\t\t\t\t\t\t\t                      <option value=\"Romania\">Romania</option>\n\t\t\t\t\t\t\t                      <option value=\"Russia\">Russia</option>\n\t\t\t\t\t\t\t                      <option value=\"Rwanda\">Rwanda</option>\n\t\t\t\t\t\t\t                      <option value=\"St Barthelemy\">St Barthelemy</option>\n\t\t\t\t\t\t\t                      <option value=\"St Eustatius\">St Eustatius</option>\n\t\t\t\t\t\t\t                      <option value=\"St Helena\">St Helena</option>\n\t\t\t\t\t\t\t                      <option value=\"St Kitts-Nevis\">St Kitts-Nevis</option>\n\t\t\t\t\t\t\t                      <option value=\"St Lucia\">St Lucia</option>\n\t\t\t\t\t\t\t                      <option value=\"St Maarten\">St Maarten</option>\n\t\t\t\t\t\t\t                      <option value=\"St Pierre &amp; Miquelon\">St Pierre &amp; Miquelon</option>\n\t\t\t\t\t\t\t                      <option value=\"St Vincent &amp; Grenadines\">St Vincent &amp; Grenadines</option>\n\t\t\t\t\t\t\t                      <option value=\"Saipan\">Saipan</option>\n\t\t\t\t\t\t\t                      <option value=\"Samoa\">Samoa</option>\n\t\t\t\t\t\t\t                      <option value=\"Samoa American\">Samoa American</option>\n\t\t\t\t\t\t\t                      <option value=\"San Marino\">San Marino</option>\n\t\t\t\t\t\t\t                      <option value=\"Sao Tome &amp; Principe\">Sao Tome &amp; Principe</option>\n\t\t\t\t\t\t\t                      <option value=\"Saudi Arabia\">Saudi Arabia</option>\n\t\t\t\t\t\t\t                      <option value=\"Senegal\">Senegal</option>\n\t\t\t\t\t\t\t                      <option value=\"Seychelles\">Seychelles</option>\n\t\t\t\t\t\t\t                      <option value=\"Sierra Leone\">Sierra Leone</option>\n\t\t\t\t\t\t\t                      <option value=\"Singapore\">Singapore</option>\n\t\t\t\t\t\t\t                      <option value=\"Slovakia\">Slovakia</option>\n\t\t\t\t\t\t\t                      <option value=\"Slovenia\">Slovenia</option>\n\t\t\t\t\t\t\t                      <option value=\"Solomon Islands\">Solomon Islands</option>\n\t\t\t\t\t\t\t                      <option value=\"Somalia\">Somalia</option>\n\t\t\t\t\t\t\t                      <option value=\"South Africa\">South Africa</option>\n\t\t\t\t\t\t\t                      <option value=\"Spain\">Spain</option>\n\t\t\t\t\t\t\t                      <option value=\"Sri Lanka\">Sri Lanka</option>\n\t\t\t\t\t\t\t                      <option value=\"Sudan\">Sudan</option>\n\t\t\t\t\t\t\t                      <option value=\"Suriname\">Suriname</option>\n\t\t\t\t\t\t\t                      <option value=\"Swaziland\">Swaziland</option>\n\t\t\t\t\t\t\t                      <option value=\"Sweden\">Sweden</option>\n\t\t\t\t\t\t\t                      <option value=\"Switzerland\">Switzerland</option>\n\t\t\t\t\t\t\t                      <option value=\"Syria\">Syria</option>\n\t\t\t\t\t\t\t                      <option value=\"Tahiti\">Tahiti</option>\n\t\t\t\t\t\t\t                      <option value=\"Taiwan\">Taiwan</option>\n\t\t\t\t\t\t\t                      <option value=\"Tajikistan\">Tajikistan</option>\n\t\t\t\t\t\t\t                      <option value=\"Tanzania\">Tanzania</option>\n\t\t\t\t\t\t\t                      <option value=\"Thailand\">Thailand</option>\n\t\t\t\t\t\t\t                      <option value=\"Togo\">Togo</option>\n\t\t\t\t\t\t\t                      <option value=\"Tokelau\">Tokelau</option>\n\t\t\t\t\t\t\t                      <option value=\"Tonga\">Tonga</option>\n\t\t\t\t\t\t\t                      <option value=\"Trinidad &amp; Tobago\">Trinidad &amp; Tobago</option>\n\t\t\t\t\t\t\t                      <option value=\"Tunisia\">Tunisia</option>\n\t\t\t\t\t\t\t                      <option value=\"Turkey\">Turkey</option>\n\t\t\t\t\t\t\t                      <option value=\"Turkmenistan\">Turkmenistan</option>\n\t\t\t\t\t\t\t                      <option value=\"Turks &amp; Caicos Is\">Turks &amp; Caicos Is</option>\n\t\t\t\t\t\t\t                      <option value=\"Tuvalu\">Tuvalu</option>\n\t\t\t\t\t\t\t                      <option value=\"Uganda\">Uganda</option>\n\t\t\t\t\t\t\t                      <option value=\"United Kingdom\">United Kingdom</option>\n\t\t\t\t\t\t\t                      <option value=\"Ukraine\">Ukraine</option>\n\t\t\t\t\t\t\t                      <option value=\"United Arab Erimates\">United Arab Emirates</option>\n\t\t\t\t\t\t\t                      <option value=\"Uraguay\">Uruguay</option>\n\t\t\t\t\t\t\t                      <option value=\"Uzbekistan\">Uzbekistan</option>\n\t\t\t\t\t\t\t                      <option value=\"Vanuatu\">Vanuatu</option>\n\t\t\t\t\t\t\t                      <option value=\"Vatican City State\">Vatican City State</option>\n\t\t\t\t\t\t\t                      <option value=\"Venezuela\">Venezuela</option>\n\t\t\t\t\t\t\t                      <option value=\"Vietnam\">Vietnam</option>\n\t\t\t\t\t\t\t                      <option value=\"Virgin Islands (Brit)\">Virgin Islands (Brit)</option>\n\t\t\t\t\t\t\t                      <option value=\"Virgin Islands (USA)\">Virgin Islands (USA)</option>\n\t\t\t\t\t\t\t                      <option value=\"Wake Island\">Wake Island</option>\n\t\t\t\t\t\t\t                      <option value=\"Wallis &amp; Futana Is\">Wallis &amp; Futana Is</option>\n\t\t\t\t\t\t\t                      <option value=\"Yemen\">Yemen</option>\n\t\t\t\t\t\t\t                      <option value=\"Zaire\">Zaire</option>\n\t\t\t\t\t\t\t                      <option value=\"Zambia\">Zambia</option>\n\t\t\t\t\t\t\t                      <option value=\"Zimbabwe\">Zimbabwe</option>\n\t\t\t\t\t\t\t                    </select>\n\t\t\t\t\t\t\t                  </div>\n\n\t\t\t\t\t\t\t                  <div class=\"form__input-wrapper form__input-wrapper--labelled\">\n\t\t\t\t\t\t\t                    <select name=\"customer[note][preferred_language]\" id=\"customer[note][preferred_language]\" required=\"required\">\n\t\t\t\t\t\t\t                      <option value=\"\">Preferred language</option>\n\t\t\t\t\t\t\t                      <option value=\"English\">English</option>\n\t\t\t\t\t\t\t                      <option value=\"Spanish\">Spanish</option>\n\t\t\t\t\t\t\t                      <option value=\"Other\">Other</option>\n\t\t\t\t\t\t\t                    </select>\n\t\t\t\t\t\t\t                  </div>\n\n\t\t\t\t\t\t\t                  <div class=\"form__input-wrapper form__input-wrapper--labelled\">\n\t\t\t\t\t\t\t                    <input type=\"password\" id=\"register-customer[password]\" class=\"form__field form__field--text\" name=\"customer[password]\" required=\"required\" autocomplete=\"new-password\">\n\t\t\t\t\t\t\t                    <label for=\"register-customer[password]\" class=\"form__floating-label\">Password</label>\n\t\t\t\t\t\t\t                  </div>\n\t\t\t\t\t\t\t                  <input type=\"hidden\" name=\"return_to\" value=\"/pages/request-for-quote\">\n\t\t\t\t\t\t\t                  <input type=\"hidden\" name=\"checkout_url\" value=\"/pages/request-for-quote\">\n\t\t\t\t\t\t\t                  <button type=\"submit\" class=\"form__submit button button--primary button--full\">Create my account</button>\n\t\t\t\t\t\t\t                </form>\n\t\t\t\t\t\t\t              </div>\n\t\t\t\t\t\t\t            </div>\n\t\t\t\t\t\t\t          </div>\n\t\t\t\t\t\t\t          <div class=\"genemco-accordian-item active\">\n\t\t\t\t\t\t\t            <div class=\"genemco-accordian-item__heading\">\n\t\t\t\t\t\t\t              <span class=\"genemco-accordian-bullet\"></span>\n\t\t\t\t\t\t\t              <span><strong>Sign In. Already a customer?</strong></span>\n\t\t\t\t\t\t\t            </div>\n\t\t\t\t\t\t\t            <div class=\"genemco-accordian-item__content\" style=\"display: block;\">\n\t\t\t\t\t\t\t              <div class=\"genemco-form__wrapper\">\n\t\t\t\t\t\t\t\t                <form method=\"post\" action=\"/account/login\" id=\"customer_login\" accept-charset=\"UTF-8\" name=\"login\" class=\"form\" onsubmit=\"window.Shopify.recaptchaV3.addToken(this, &quot;customer_login&quot;); return false;\"><input type=\"hidden\" name=\"form_type\" value=\"customer_login\"><input type=\"hidden\" name=\"utf8\" value=\"\u2713\"><input type=\"hidden\" name=\"checkout_url\" value=\"/pages/request-for-quote\">\n\t\t\t\t\t\t\t\t\t                <div class=\"form__input-wrapper form__input-wrapper--labelled\">\n\t\t\t\t\t\t\t\t\t                    <label for=\"customer[email]\">Email Adress</label>\n                  \t\t\t\t\t\t\t\t\t\t<input type=\"email\" id=\"customer[email]\" class=\"form__field form__field--text is-filled\" name=\"customer[email]\" required=\"required\">\n                \t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t                <div class=\"form__input-wrapper form__input-wrapper--labelled\">\n\t\t\t\t\t\t\t\t\t                  <label for=\"customer[password]\">Password</label>\n\t\t\t\t\t\t\t\t\t                  <input type=\"password\" id=\"customer[password]\" class=\"form__field form__field--text is-filled\" name=\"customer[password]\" required=\"required\" autocomplete=\"current-password\">\n\t\t\t\t\t\t\t\t\t                </div>\n                \t\t\t\t\t\t\t\t\t<button type=\"submit\" class=\"form__submit button button--primary button--full\">Continue</button>\n                \t\t\t\t\t\t\t\t</form>\n\t\t\t\t\t\t\t              </div>\n\t\t\t\t\t\t\t            </div>\n\t\t\t\t\t\t\t          </div>\n\t\t\t\t\t\t\t        </div>\n\t\t\t\t\t\t\t\t\t<div class=\"genemco-checkout__review-items genemco-checkout__row\">\n\t\t\t\t\t\t\t\t\t\t<h2 class=\"genemco-checkout__heading hide-on-mobile\"><strong>Quote Number:</strong> ".concat(submitGuestQuoteResponse.quoteID, "</h2>\n\t\t\t\t\t\t\t\t\t\t").concat(productsHTML, "\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div class=\"genemco-checkout__col-half hide-on-mobile\">\n\t\t\t\t\t\t\t\t\t<div class=\"genemco-form__wrapper border1px\">\n\t\t\t\t\t\t\t\t\t\t<h2 class=\"genemco-checkout__heading\"><strong>>> Sign-In to Save your Quote</strong></h2>\n\t\t\t\t\t\t\t\t\t\t<p class=\"genemco-checkout__text\">Get access to our best pricing, get early access to new inventory and easily save your quote/orders, by signing in below.</p>\n\t\t\t\t\t\t\t\t\t\t<form method=\"post\" action=\"/account/login\" id=\"customer_login\" accept-charset=\"UTF-8\" name=\"login\" class=\"form\">\n\t\t\t\t\t\t\t\t\t\t\t<input type=\"hidden\" name=\"form_type\" value=\"customer_login\">\n\t\t\t\t\t\t\t\t\t\t\t<input type=\"hidden\" name=\"utf8\" value=\"\u2713\">\n\t\t\t\t\t\t\t\t\t\t\t<input type=\"hidden\" name=\"checkout_url\" value=\"/pages/request-for-quote\">\n\t\t\t\t\t\t\t\t\t\t\t<div class=\"form__input-wrapper form__input-wrapper--labelled\">\n\t\t\t\t\t\t\t\t\t\t\t\t<label for=\"customer[email]\">Email Adress</label>\n\t\t\t\t\t\t\t\t\t\t\t\t<input type=\"email\" id=\"customer[email]\" class=\"form__field form__field--text is-filled\" name=\"customer[email]\" required=\"required\">\n\t\t\t\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t\t\t\t<div class=\"form__input-wrapper form__input-wrapper--labelled\">\n\t\t\t\t\t\t\t\t\t\t\t\t<label for=\"customer[password]\">Password</label>\n\t\t\t\t\t\t\t\t\t\t\t\t<input type=\"password\" id=\"customer[password]\" class=\"form__field form__field--text is-filled\" name=\"customer[password]\" required=\"required\" autocomplete=\"current-password\">\n\t\t\t\t\t\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t\t\t\t\t\t<button type=\"submit\" class=\"form__submit button button--primary button--full\">Continue</button>\n\t\t\t\t\t\t\t\t\t\t</form>\n\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t<h2 class=\"genemco-checkout__heading-cross\"><span>New to Genemco?</span></h2>\n\t\t\t\t\t\t\t\t\t<a class=\"button\" id=\"create_genemco_account\">Create your Genemco Account</a>\n\t\t\t\t\t\t\t\t</div>\t\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t");
                              emptyCartHTML = "\n\t\t\t\t\t\t<a class=\"header__action-item-link header__cart-toggle\" href=\"/cart\" aria-controls=\"mini-cart\" aria-expanded=\"false\" data-action=\"toggle-mini-cart\" data-no-instant=\"\">\n      \t\t\t\t\t\t<div class=\"header__action-item-content\">\n        \t\t\t\t\t\t<div class=\"header__cart-icon icon-state\" aria-expanded=\"false\">\n          \t\t\t\t\t\t\t<span class=\"icon-state__primary\">\n          \t\t\t\t\t\t\t\t<svg class=\"icon icon--cart\" viewBox=\"0 0 27 24\" role=\"presentation\">\n\t\t\t\t\t\t\t\t\t      <g transform=\"translate(0 1)\" stroke-width=\"2\" stroke=\"currentColor\" fill=\"none\" fill-rule=\"evenodd\">\n\t\t\t\t\t\t\t\t\t        <circle stroke-linecap=\"square\" cx=\"11\" cy=\"20\" r=\"2\"></circle>\n\t\t\t\t\t\t\t\t\t        <circle stroke-linecap=\"square\" cx=\"22\" cy=\"20\" r=\"2\"></circle>\n\t\t\t\t\t\t\t\t\t        <path d=\"M7.31 5h18.27l-1.44 10H9.78L6.22 0H0\"></path>\n\t\t\t\t\t\t\t\t\t      </g>\n\t\t\t\t\t\t\t\t\t    </svg>\n\t\t\t\t\t\t\t\t\t\t<span class=\"header__cart-count\">0</span>\n          \t\t\t\t\t\t\t</span>\n              \t\t\t\t\t\t<span class=\"icon-state__secondary\">\n              \t\t\t\t\t\t\t<svg class=\"icon icon--close\" viewBox=\"0 0 19 19\" role=\"presentation\">\n\t\t\t\t\t\t\t\t\t      <path d=\"M9.1923882 8.39339828l7.7781745-7.7781746 1.4142136 1.41421357-7.7781746 7.77817459 7.7781746 7.77817456L16.9705627 19l-7.7781745-7.7781746L1.41421356 19 0 17.5857864l7.7781746-7.77817456L0 2.02943725 1.41421356.61522369 9.1923882 8.39339828z\" fill=\"currentColor\" fill-rule=\"evenodd\"></path>\n\t\t\t\t\t\t\t\t\t    </svg>\n\t\t\t\t\t\t\t\t\t</span>\n        \t\t\t\t\t\t</div>\n        \t\t\t\t\t\t<span class=\"hidden-pocket hidden-lap\">My Quote</span>\n      \t\t\t\t\t\t</div>\n    \t\t\t\t\t</a>\n    \t\t\t\t\t<form method=\"post\" action=\"/cart\" id=\"mini-cart\" class=\"mini-cart\" aria-hidden=\"true\" novalidate=\"novalidate\" data-item-count=\"0\" tabindex=\"-1\">\n\t\t\t\t\t\t  <input type=\"hidden\" name=\"attributes[collection_products_per_page]\" value=\"\">\n\t\t\t\t\t\t  <input type=\"hidden\" name=\"attributes[collection_layout]\" value=\"\"><svg class=\"icon icon--nav-triangle-borderless\" viewBox=\"0 0 20 9\" role=\"presentation\">\n\t\t\t\t\t\t      <path d=\"M.47108938 9c.2694725-.26871321.57077721-.56867841.90388257-.89986354C3.12384116 6.36134886 5.74788116 3.76338565 9.2467995.30653888c.4145057-.4095171 1.0844277-.40860098 1.4977971.00205122L19.4935156 9H.47108938z\" fill=\"#ffffff\"></path>\n\t\t\t\t\t\t    </svg><div class=\"mini-cart__content mini-cart__content--empty\"><div class=\"alert alert--tight alert--center text--strong\">\n\t\t\t\t\t\t          <a href=\"/pages/purchase-and-shipping-process\">Click here to learn about our easy purcase and shipping process</a>\n\t\t\t\t\t\t        </div>\n\n\t\t\t\t\t\t      <div class=\"mini-cart__empty-state\"><svg width=\"81\" height=\"70\" viewBox=\"0 0 81 70\">\n\t\t\t\t\t\t      <g transform=\"translate(0 2)\" stroke-width=\"4\" stroke=\"#232f3e\" fill=\"none\" fill-rule=\"evenodd\">\n\t\t\t\t\t\t        <circle stroke-linecap=\"square\" cx=\"34\" cy=\"60\" r=\"6\"></circle>\n\t\t\t\t\t\t        <circle stroke-linecap=\"square\" cx=\"67\" cy=\"60\" r=\"6\"></circle>\n\t\t\t\t\t\t        <path d=\"M22.9360352 15h54.8070373l-4.3391876 30H30.3387146L19.6676025 0H.99560547\"></path>\n\t\t\t\t\t\t      </g>\n\t\t\t\t\t\t    </svg><p class=\"heading h4\">Your quote cart is empty</p>\n\t\t\t\t\t\t      </div>\n\n\t\t\t\t\t\t      <a href=\"/collections/all\" class=\"button button--primary button--full\">Shop our products</a></div>\n\t\t\t\t\t\t</form>";
                              document.querySelector('#genemco-logout-customer-checkout').innerHTML = logoutThankYouPageHTML;
                              document.querySelector('.header__action-item--cart').innerHTML = emptyCartHTML;
                              document.querySelector('#shopify-section-header').style.display = "block";
                              document.querySelector('#shopify-section-static-newsletter').style.display = "block";
                              document.querySelector('#shopify-section-text-with-icons').style.display = "block";
                              document.querySelector('#shopify-section-footer').style.display = "block";
                              window.scrollTo(0, 0);
                              _context10.next = 40;
                              break;

                            case 34:
                              _context10.next = 36;
                              return validateGenemcoFields();

                            case 36:
                              // Show default error message
                              hightLightedCheckoutFields = document.querySelectorAll('#genemco-logout-customer-checkout__project-details .genemco-field.highlight');

                              if (hightLightedCheckoutFields.length > 0) {
                                hightLightedCheckoutFields.forEach(function (genemcoField) {
                                  genemcoField.reportValidity();
                                });
                              }

                              logoutCustomerCheckoutSubmitButton.classList.remove('disabled');
                              $('.error-message').text('Enter all required information');

                            case 40:
                            case "end":
                              return _context10.stop();
                          }
                        }
                      }, _callee10);
                    }));

                    return function (_x12) {
                      return _ref11.apply(this, arguments);
                    };
                  }());
                });
              }

              createGenemcoAccount = document.querySelector('#create_genemco_account');

              if (createGenemcoAccount != null) {
                createGenemcoAccount.addEventListener('click', function (e) {
                  var signupPopup = new Fancybox([{
                    src: "<form method=\"post\" action=\"/account\" id=\"create_customer_popup\" accept-charset=\"UTF-8\" name=\"create\" class=\"form\"><input type=\"hidden\" name=\"form_type\" value=\"create_customer\"><input type=\"hidden\" name=\"utf8\" value=\"\u2713\">\n\t\t\t\t\t\t<header class=\"popover__header\">\n\t                      <h2 class=\"popover__title heading\">Create my account</h2>\n\t                      <p class=\"popover__legend\">Please fill in the information below:</p>\n\t                    </header>\n\n\t                    <div class=\"form__input-wrapper form__input-wrapper--labelled\">\n\t                      <input type=\"text\" id=\"register-customer[first_name]\" class=\"form__field form__field--text\" name=\"customer[first_name]\" required=\"required\">\n\t                      <label for=\"register-customer[first_name]\" class=\"form__floating-label\">First name</label>\n\t                    </div>\n\n\t                    <div class=\"form__input-wrapper form__input-wrapper--labelled\">\n\t                      <input type=\"text\" id=\"register-customer[last_name]\" class=\"form__field form__field--text\" name=\"customer[last_name]\" required=\"required\">\n\t                      <label for=\"register-customer[last_name]\" class=\"form__floating-label\">Last name</label>\n\t                    </div>\n\n\t                    <div class=\"form__input-wrapper form__input-wrapper--labelled\">\n\t                      <input type=\"text\" id=\"customer[note][company]\" class=\"form__field form__field--text\" name=\"customer[note][company]\" required=\"required\">\n\t                      <label for=\"customer[note][company]\" class=\"form__floating-label\">Company name</label>\n\t                    </div>\n\n\t                      <div class=\"form__input-wrapper form__input-wrapper--labelled\">\n\t                        <input type=\"email\" id=\"customer[email]\" class=\"form__field form__field--text\" name=\"customer[email]\" required=\"required\">\n\t                        <label for=\"customer[email]\" class=\"form__floating-label\">Email</label>\n\t                      </div>\n\n\t                    <div class=\"form__input-wrapper form__input-wrapper--labelled\">\n\t                      <input type=\"text\" id=\"customer[note][phone]\" class=\"form__field form__field--text\" name=\"customer[note][phone]\" required=\"required\">\n\t                      <label for=\"customer[note][phone]\" class=\"form__floating-label\">Phone</label>\n\t                    </div>\n\n\t                    <div class=\"form__input-wrapper form__input-wrapper--labelled\">\n\t                      <input type=\"text\" id=\"customer[note][city]\" class=\"form__field form__field--text\" name=\"customer[note][city]\" required=\"required\">\n\t                      <label for=\"customer[note][city]\" class=\"form__floating-label\">City</label>\n\t                    </div>\n\n\t                    <div class=\"form__input-wrapper form__input-wrapper--labelled\">\n\t                      <input type=\"text\" id=\"customer[note][state]\" class=\"form__field form__field--text\" name=\"customer[note][state]\" required=\"required\">\n\t                      <label for=\"customer[note][state]\" class=\"form__floating-label\">State</label>\n\t                    </div>\n\n\t                    <div class=\"form__input-wrapper form__input-wrapper--labelled\">\n\t                      <select name=\"country\" id=\"customer[note][country]\" name=\"customer[note][country]\" required=\"required\" >\n\t\t\t\t            <option value=\"\">Select your Country</option>\n\t\t\t\t            <option value=\"United States of America\">United States of America</option>\n\t\t\t\t            <option value=\"Canada\">Canada</option>\n\t\t\t\t            <option value=\"Mexico\">Mexico</option>\n\t\t\t\t            <option disabled=\"\">---</option>\n\t\t\t\t            <option value=\"Afganistan\">Afghanistan</option>\n\t\t\t\t            <option value=\"Albania\">Albania</option>\n\t\t\t\t            <option value=\"Algeria\">Algeria</option>\n\t\t\t\t            <option value=\"American Samoa\">American Samoa</option>\n\t\t\t\t            <option value=\"Andorra\">Andorra</option>\n\t\t\t\t            <option value=\"Angola\">Angola</option>\n\t\t\t\t            <option value=\"Anguilla\">Anguilla</option>\n\t\t\t\t            <option value=\"Antigua &amp; Barbuda\">Antigua &amp; Barbuda</option>\n\t\t\t\t            <option value=\"Argentina\">Argentina</option>\n\t\t\t\t            <option value=\"Armenia\">Armenia</option>\n\t\t\t\t            <option value=\"Aruba\">Aruba</option>\n\t\t\t\t            <option value=\"Australia\">Australia</option>\n\t\t\t\t            <option value=\"Austria\">Austria</option>\n\t\t\t\t            <option value=\"Azerbaijan\">Azerbaijan</option>\n\t\t\t\t            <option value=\"Bahamas\">Bahamas</option>\n\t\t\t\t            <option value=\"Bahrain\">Bahrain</option>\n\t\t\t\t            <option value=\"Bangladesh\">Bangladesh</option>\n\t\t\t\t            <option value=\"Barbados\">Barbados</option>\n\t\t\t\t            <option value=\"Belarus\">Belarus</option>\n\t\t\t\t            <option value=\"Belgium\">Belgium</option>\n\t\t\t\t            <option value=\"Belize\">Belize</option>\n\t\t\t\t            <option value=\"Benin\">Benin</option>\n\t\t\t\t            <option value=\"Bermuda\">Bermuda</option>\n\t\t\t\t            <option value=\"Bhutan\">Bhutan</option>\n\t\t\t\t            <option value=\"Bolivia\">Bolivia</option>\n\t\t\t\t            <option value=\"Bonaire\">Bonaire</option>\n\t\t\t\t            <option value=\"Bosnia &amp; Herzegovina\">Bosnia &amp; Herzegovina</option>\n\t\t\t\t            <option value=\"Botswana\">Botswana</option>\n\t\t\t\t            <option value=\"Brazil\">Brazil</option>\n\t\t\t\t            <option value=\"British Indian Ocean Ter\">British Indian Ocean Ter</option>\n\t\t\t\t            <option value=\"Brunei\">Brunei</option>\n\t\t\t\t            <option value=\"Bulgaria\">Bulgaria</option>\n\t\t\t\t            <option value=\"Burkina Faso\">Burkina Faso</option>\n\t\t\t\t            <option value=\"Burundi\">Burundi</option>\n\t\t\t\t            <option value=\"Cambodia\">Cambodia</option>\n\t\t\t\t            <option value=\"Cameroon\">Cameroon</option>\n\t\t\t\t            <option value=\"Canary Islands\">Canary Islands</option>\n\t\t\t\t            <option value=\"Cape Verde\">Cape Verde</option>\n\t\t\t\t            <option value=\"Cayman Islands\">Cayman Islands</option>\n\t\t\t\t            <option value=\"Central African Republic\">Central African Republic</option>\n\t\t\t\t            <option value=\"Chad\">Chad</option>\n\t\t\t\t            <option value=\"Channel Islands\">Channel Islands</option>\n\t\t\t\t            <option value=\"Chile\">Chile</option>\n\t\t\t\t            <option value=\"China\">China</option>\n\t\t\t\t            <option value=\"Christmas Island\">Christmas Island</option>\n\t\t\t\t            <option value=\"Cocos Island\">Cocos Island</option>\n\t\t\t\t            <option value=\"Colombia\">Colombia</option>\n\t\t\t\t            <option value=\"Comoros\">Comoros</option>\n\t\t\t\t            <option value=\"Congo\">Congo</option>\n\t\t\t\t            <option value=\"Cook Islands\">Cook Islands</option>\n\t\t\t\t            <option value=\"Costa Rica\">Costa Rica</option>\n\t\t\t\t            <option value=\"Cote DIvoire\">Cote DIvoire</option>\n\t\t\t\t            <option value=\"Croatia\">Croatia</option>\n\t\t\t\t            <option value=\"Cuba\">Cuba</option>\n\t\t\t\t            <option value=\"Curaco\">Curacao</option>\n\t\t\t\t            <option value=\"Cyprus\">Cyprus</option>\n\t\t\t\t            <option value=\"Czech Republic\">Czech Republic</option>\n\t\t\t\t            <option value=\"Denmark\">Denmark</option>\n\t\t\t\t            <option value=\"Djibouti\">Djibouti</option>\n\t\t\t\t            <option value=\"Dominica\">Dominica</option>\n\t\t\t\t            <option value=\"Dominican Republic\">Dominican Republic</option>\n\t\t\t\t            <option value=\"East Timor\">East Timor</option>\n\t\t\t\t            <option value=\"Ecuador\">Ecuador</option>\n\t\t\t\t            <option value=\"Egypt\">Egypt</option>\n\t\t\t\t            <option value=\"El Salvador\">El Salvador</option>\n\t\t\t\t            <option value=\"Equatorial Guinea\">Equatorial Guinea</option>\n\t\t\t\t            <option value=\"Eritrea\">Eritrea</option>\n\t\t\t\t            <option value=\"Estonia\">Estonia</option>\n\t\t\t\t            <option value=\"Ethiopia\">Ethiopia</option>\n\t\t\t\t            <option value=\"Falkland Islands\">Falkland Islands</option>\n\t\t\t\t            <option value=\"Faroe Islands\">Faroe Islands</option>\n\t\t\t\t            <option value=\"Fiji\">Fiji</option>\n\t\t\t\t            <option value=\"Finland\">Finland</option>\n\t\t\t\t            <option value=\"France\">France</option>\n\t\t\t\t            <option value=\"French Guiana\">French Guiana</option>\n\t\t\t\t            <option value=\"French Polynesia\">French Polynesia</option>\n\t\t\t\t            <option value=\"French Southern Ter\">French Southern Ter</option>\n\t\t\t\t            <option value=\"Gabon\">Gabon</option>\n\t\t\t\t            <option value=\"Gambia\">Gambia</option>\n\t\t\t\t            <option value=\"Georgia\">Georgia</option>\n\t\t\t\t            <option value=\"Germany\">Germany</option>\n\t\t\t\t            <option value=\"Ghana\">Ghana</option>\n\t\t\t\t            <option value=\"Gibraltar\">Gibraltar</option>\n\t\t\t\t            <option value=\"Great Britain\">Great Britain</option>\n\t\t\t\t            <option value=\"Greece\">Greece</option>\n\t\t\t\t            <option value=\"Greenland\">Greenland</option>\n\t\t\t\t            <option value=\"Grenada\">Grenada</option>\n\t\t\t\t            <option value=\"Guadeloupe\">Guadeloupe</option>\n\t\t\t\t            <option value=\"Guam\">Guam</option>\n\t\t\t\t            <option value=\"Guatemala\">Guatemala</option>\n\t\t\t\t            <option value=\"Guinea\">Guinea</option>\n\t\t\t\t            <option value=\"Guyana\">Guyana</option>\n\t\t\t\t            <option value=\"Haiti\">Haiti</option>\n\t\t\t\t            <option value=\"Hawaii\">Hawaii</option>\n\t\t\t\t            <option value=\"Honduras\">Honduras</option>\n\t\t\t\t            <option value=\"Hong Kong\">Hong Kong</option>\n\t\t\t\t            <option value=\"Hungary\">Hungary</option>\n\t\t\t\t            <option value=\"Iceland\">Iceland</option>\n\t\t\t\t            <option value=\"Indonesia\">Indonesia</option>\n\t\t\t\t            <option value=\"India\">India</option>\n\t\t\t\t            <option value=\"Iran\">Iran</option>\n\t\t\t\t            <option value=\"Iraq\">Iraq</option>\n\t\t\t\t            <option value=\"Ireland\">Ireland</option>\n\t\t\t\t            <option value=\"Isle of Man\">Isle of Man</option>\n\t\t\t\t            <option value=\"Israel\">Israel</option>\n\t\t\t\t            <option value=\"Italy\">Italy</option>\n\t\t\t\t            <option value=\"Jamaica\">Jamaica</option>\n\t\t\t\t            <option value=\"Japan\">Japan</option>\n\t\t\t\t            <option value=\"Jordan\">Jordan</option>\n\t\t\t\t            <option value=\"Kazakhstan\">Kazakhstan</option>\n\t\t\t\t            <option value=\"Kenya\">Kenya</option>\n\t\t\t\t            <option value=\"Kiribati\">Kiribati</option>\n\t\t\t\t            <option value=\"Korea North\">Korea North</option>\n\t\t\t\t            <option value=\"Korea South\">Korea South</option>\n\t\t\t\t            <option value=\"Kuwait\">Kuwait</option>\n\t\t\t\t            <option value=\"Kyrgyzstan\">Kyrgyzstan</option>\n\t\t\t\t            <option value=\"Laos\">Laos</option>\n\t\t\t\t            <option value=\"Latvia\">Latvia</option>\n\t\t\t\t            <option value=\"Lebanon\">Lebanon</option>\n\t\t\t\t            <option value=\"Lesotho\">Lesotho</option>\n\t\t\t\t            <option value=\"Liberia\">Liberia</option>\n\t\t\t\t            <option value=\"Libya\">Libya</option>\n\t\t\t\t            <option value=\"Liechtenstein\">Liechtenstein</option>\n\t\t\t\t            <option value=\"Lithuania\">Lithuania</option>\n\t\t\t\t            <option value=\"Luxembourg\">Luxembourg</option>\n\t\t\t\t            <option value=\"Macau\">Macau</option>\n\t\t\t\t            <option value=\"Macedonia\">Macedonia</option>\n\t\t\t\t            <option value=\"Madagascar\">Madagascar</option>\n\t\t\t\t            <option value=\"Malaysia\">Malaysia</option>\n\t\t\t\t            <option value=\"Malawi\">Malawi</option>\n\t\t\t\t            <option value=\"Maldives\">Maldives</option>\n\t\t\t\t            <option value=\"Mali\">Mali</option>\n\t\t\t\t            <option value=\"Malta\">Malta</option>\n\t\t\t\t            <option value=\"Marshall Islands\">Marshall Islands</option>\n\t\t\t\t            <option value=\"Martinique\">Martinique</option>\n\t\t\t\t            <option value=\"Mauritania\">Mauritania</option>\n\t\t\t\t            <option value=\"Mauritius\">Mauritius</option>\n\t\t\t\t            <option value=\"Mayotte\">Mayotte</option>\n\t\t\t\t            <option value=\"Midway Islands\">Midway Islands</option>\n\t\t\t\t            <option value=\"Moldova\">Moldova</option>\n\t\t\t\t            <option value=\"Monaco\">Monaco</option>\n\t\t\t\t            <option value=\"Mongolia\">Mongolia</option>\n\t\t\t\t            <option value=\"Montserrat\">Montserrat</option>\n\t\t\t\t            <option value=\"Morocco\">Morocco</option>\n\t\t\t\t            <option value=\"Mozambique\">Mozambique</option>\n\t\t\t\t            <option value=\"Myanmar\">Myanmar</option>\n\t\t\t\t            <option value=\"Nambia\">Nambia</option>\n\t\t\t\t            <option value=\"Nauru\">Nauru</option>\n\t\t\t\t            <option value=\"Nepal\">Nepal</option>\n\t\t\t\t            <option value=\"Netherland Antilles\">Netherland Antilles</option>\n\t\t\t\t            <option value=\"Netherlands\">Netherlands (Holland, Europe)</option>\n\t\t\t\t            <option value=\"Nevis\">Nevis</option>\n\t\t\t\t            <option value=\"New Caledonia\">New Caledonia</option>\n\t\t\t\t            <option value=\"New Zealand\">New Zealand</option>\n\t\t\t\t            <option value=\"Nicaragua\">Nicaragua</option>\n\t\t\t\t            <option value=\"Niger\">Niger</option>\n\t\t\t\t            <option value=\"Nigeria\">Nigeria</option>\n\t\t\t\t            <option value=\"Niue\">Niue</option>\n\t\t\t\t            <option value=\"Norfolk Island\">Norfolk Island</option>\n\t\t\t\t            <option value=\"Norway\">Norway</option>\n\t\t\t\t            <option value=\"Oman\">Oman</option>\n\t\t\t\t            <option value=\"Pakistan\">Pakistan</option>\n\t\t\t\t            <option value=\"Palau Island\">Palau Island</option>\n\t\t\t\t            <option value=\"Papua New Guinea\">Papua New Guinea</option>\n\t\t\t\t            <option value=\"Paraguay\">Paraguay</option>\n\t\t\t\t            <option value=\"Peru\">Peru</option>\n\t\t\t\t            <option value=\"Phillipines\">Philippines</option>\n\t\t\t\t            <option value=\"Pitcairn Island\">Pitcairn Island</option>\n\t\t\t\t            <option value=\"Poland\">Poland</option>\n\t\t\t\t            <option value=\"Portugal\">Portugal</option>\n\t\t\t\t            <option value=\"Puerto Rico\">Puerto Rico</option>\n\t\t\t\t            <option value=\"Qatar\">Qatar</option>\n\t\t\t\t            <option value=\"Republic of Montenegro\">Republic of Montenegro</option>\n\t\t\t\t            <option value=\"Republic of Serbia\">Republic of Serbia</option>\n\t\t\t\t            <option value=\"Reunion\">Reunion</option>\n\t\t\t\t            <option value=\"Romania\">Romania</option>\n\t\t\t\t            <option value=\"Russia\">Russia</option>\n\t\t\t\t            <option value=\"Rwanda\">Rwanda</option>\n\t\t\t\t            <option value=\"St Barthelemy\">St Barthelemy</option>\n\t\t\t\t            <option value=\"St Eustatius\">St Eustatius</option>\n\t\t\t\t            <option value=\"St Helena\">St Helena</option>\n\t\t\t\t            <option value=\"St Kitts-Nevis\">St Kitts-Nevis</option>\n\t\t\t\t            <option value=\"St Lucia\">St Lucia</option>\n\t\t\t\t            <option value=\"St Maarten\">St Maarten</option>\n\t\t\t\t            <option value=\"St Pierre &amp; Miquelon\">St Pierre &amp; Miquelon</option>\n\t\t\t\t            <option value=\"St Vincent &amp; Grenadines\">St Vincent &amp; Grenadines</option>\n\t\t\t\t            <option value=\"Saipan\">Saipan</option>\n\t\t\t\t            <option value=\"Samoa\">Samoa</option>\n\t\t\t\t            <option value=\"Samoa American\">Samoa American</option>\n\t\t\t\t            <option value=\"San Marino\">San Marino</option>\n\t\t\t\t            <option value=\"Sao Tome &amp; Principe\">Sao Tome &amp; Principe</option>\n\t\t\t\t            <option value=\"Saudi Arabia\">Saudi Arabia</option>\n\t\t\t\t            <option value=\"Senegal\">Senegal</option>\n\t\t\t\t            <option value=\"Seychelles\">Seychelles</option>\n\t\t\t\t            <option value=\"Sierra Leone\">Sierra Leone</option>\n\t\t\t\t            <option value=\"Singapore\">Singapore</option>\n\t\t\t\t            <option value=\"Slovakia\">Slovakia</option>\n\t\t\t\t            <option value=\"Slovenia\">Slovenia</option>\n\t\t\t\t            <option value=\"Solomon Islands\">Solomon Islands</option>\n\t\t\t\t            <option value=\"Somalia\">Somalia</option>\n\t\t\t\t            <option value=\"South Africa\">South Africa</option>\n\t\t\t\t            <option value=\"Spain\">Spain</option>\n\t\t\t\t            <option value=\"Sri Lanka\">Sri Lanka</option>\n\t\t\t\t            <option value=\"Sudan\">Sudan</option>\n\t\t\t\t            <option value=\"Suriname\">Suriname</option>\n\t\t\t\t            <option value=\"Swaziland\">Swaziland</option>\n\t\t\t\t            <option value=\"Sweden\">Sweden</option>\n\t\t\t\t            <option value=\"Switzerland\">Switzerland</option>\n\t\t\t\t            <option value=\"Syria\">Syria</option>\n\t\t\t\t            <option value=\"Tahiti\">Tahiti</option>\n\t\t\t\t            <option value=\"Taiwan\">Taiwan</option>\n\t\t\t\t            <option value=\"Tajikistan\">Tajikistan</option>\n\t\t\t\t            <option value=\"Tanzania\">Tanzania</option>\n\t\t\t\t            <option value=\"Thailand\">Thailand</option>\n\t\t\t\t            <option value=\"Togo\">Togo</option>\n\t\t\t\t            <option value=\"Tokelau\">Tokelau</option>\n\t\t\t\t            <option value=\"Tonga\">Tonga</option>\n\t\t\t\t            <option value=\"Trinidad &amp; Tobago\">Trinidad &amp; Tobago</option>\n\t\t\t\t            <option value=\"Tunisia\">Tunisia</option>\n\t\t\t\t            <option value=\"Turkey\">Turkey</option>\n\t\t\t\t            <option value=\"Turkmenistan\">Turkmenistan</option>\n\t\t\t\t            <option value=\"Turks &amp; Caicos Is\">Turks &amp; Caicos Is</option>\n\t\t\t\t            <option value=\"Tuvalu\">Tuvalu</option>\n\t\t\t\t            <option value=\"Uganda\">Uganda</option>\n\t\t\t\t            <option value=\"United Kingdom\">United Kingdom</option>\n\t\t\t\t            <option value=\"Ukraine\">Ukraine</option>\n\t\t\t\t            <option value=\"United Arab Erimates\">United Arab Emirates</option>\n\t\t\t\t            <option value=\"Uraguay\">Uruguay</option>\n\t\t\t\t            <option value=\"Uzbekistan\">Uzbekistan</option>\n\t\t\t\t            <option value=\"Vanuatu\">Vanuatu</option>\n\t\t\t\t            <option value=\"Vatican City State\">Vatican City State</option>\n\t\t\t\t            <option value=\"Venezuela\">Venezuela</option>\n\t\t\t\t            <option value=\"Vietnam\">Vietnam</option>\n\t\t\t\t            <option value=\"Virgin Islands (Brit)\">Virgin Islands (Brit)</option>\n\t\t\t\t            <option value=\"Virgin Islands (USA)\">Virgin Islands (USA)</option>\n\t\t\t\t            <option value=\"Wake Island\">Wake Island</option>\n\t\t\t\t            <option value=\"Wallis &amp; Futana Is\">Wallis &amp; Futana Is</option>\n\t\t\t\t            <option value=\"Yemen\">Yemen</option>\n\t\t\t\t            <option value=\"Zaire\">Zaire</option>\n\t\t\t\t            <option value=\"Zambia\">Zambia</option>\n\t\t\t\t            <option value=\"Zimbabwe\">Zimbabwe</option>\n\t\t\t\t          </select>\n\t                    </div>\n\n\t                    <div class=\"form__input-wrapper form__input-wrapper--labelled\">\n\t                      <select name=\"customer[note][preferred_language]\" id=\"customer[note][preferred_language]\" required=\"required\">\n\t                        <option value=\"\">Preferred language</option>\n\t                        <option value=\"English\">English</option>\n\t                        <option value=\"Spanish\">Spanish</option>\n\t                        <option value=\"Other\">Other</option>\n\t                      </select>\n\t                    </div>\n\n\t                    <div class=\"form__input-wrapper form__input-wrapper--labelled\">\n\t                      <input type=\"password\" id=\"register-customer[password]\" class=\"form__field form__field--text\" name=\"customer[password]\" required=\"required\" autocomplete=\"new-password\">\n\t                      <label for=\"register-customer[password]\" class=\"form__floating-label\">Password</label>\n\t                    </div>\n\t\t\t\t\t\t<input type=\"hidden\" name=\"return_to\" value=\"/pages/request-for-quote\">\n\t\t\t\t\t\t\t<input type=\"hidden\" name=\"checkout_url\" value=\"/pages/request-for-quote\">\n\t                    <button type=\"submit\" class=\"form__submit button button--primary button--full\">Create my account</button></form>",
                    type: "html"
                  }]);
                });
              }

              $(document).on('click', 'form[action="/account/login"] button[type="submit"]', function (e) {
                if ($(window).width() > 768) return;
                var $form = $(this).closest('form');
                var valid = $form.find('input[name="customer[email]"]')[0].checkValidity() && $form.find('input[name="customer[password]"]')[0].checkValidity();
                var validationMessage = '';

                if (!$form.find('input[name="customer[email]"]')[0].checkValidity()) {
                  validationMessage += "<div class=\"genemco-validation-line\">".concat(errorMessages.email, "</div>");
                }

                if (!$form.find('input[name="customer[password]"]')[0].checkValidity()) {
                  validationMessage += "<div class=\"genemco-validation-line\">".concat(errorMessages.password, "</div>");
                }

                if (!valid) {
                  validationMessage = "<div class=\"genemco-validation-wrap\"><h3 class=\"genemco-validation-heading\">There was a problem</h3>".concat(validationMessage, "</div>");
                  $form.find('.genemco-validation-wrap').remove();
                  $form.prepend(validationMessage);
                } else {
                  $form.find('.genemco-validation-wrap').remove();
                }
              });
              $(document).on('click', '#genemco-logout-customer-checkout__form #logout-customer-checkout-continue', function (e) {
                if ($(window).width() > 768) return;
                var $form = $(this).closest('form');
                var valid = $form.find('input[name="email"]')[0].checkValidity() && $form.find('input[name="phone"]')[0].checkValidity() && $form.find('input[name="first-name"]')[0].checkValidity() && $form.find('input[name="last-name"]')[0].checkValidity() && $form.find('input[name="company-name"]')[0].checkValidity() && $form.find('input[name="city"]')[0].checkValidity() && $form.find('input[name="state"]')[0].checkValidity() && $form.find('select[name="country"]')[0].checkValidity() && $form.find('select[name="preferred_language"]')[0].checkValidity();
                var validationMessage = '';

                if (!$form.find('input[name="email"]')[0].checkValidity()) {
                  validationMessage += "<div class=\"genemco-validation-line\">".concat(errorMessages.email, "</div>");
                }

                if (!$form.find('input[name="phone"]')[0].checkValidity()) {
                  validationMessage += "<div class=\"genemco-validation-line\">".concat(errorMessages.phone, "</div>");
                }

                if (!$form.find('input[name="first-name"]')[0].checkValidity()) {
                  validationMessage += "<div class=\"genemco-validation-line\">".concat(errorMessages.firstName, "</div>");
                }

                if (!$form.find('input[name="last-name"]')[0].checkValidity()) {
                  validationMessage += "<div class=\"genemco-validation-line\">".concat(errorMessages.lastName, "</div>");
                }

                if (!$form.find('input[name="company-name"]')[0].checkValidity()) {
                  validationMessage += "<div class=\"genemco-validation-line\">".concat(errorMessages.companyName, "</div>");
                }

                if (!$form.find('input[name="city"]')[0].checkValidity()) {
                  validationMessage += "<div class=\"genemco-validation-line\">".concat(errorMessages.city, "</div>");
                }

                if (!$form.find('input[name="state"]')[0].checkValidity()) {
                  validationMessage += "<div class=\"genemco-validation-line\">".concat(errorMessages.state, "</div>");
                }

                if (!$form.find('select[name="country"]')[0].checkValidity()) {
                  validationMessage += "<div class=\"genemco-validation-line\">".concat(errorMessages.country, "</div>");
                }

                if (!$form.find('select[name="preferred_language"]')[0].checkValidity()) {
                  validationMessage += "<div class=\"genemco-validation-line\">".concat(errorMessages.preferredLanguage, "</div>");
                }

                if (!valid) {
                  validationMessage = "<div class=\"genemco-validation-wrap\"><h3 class=\"genemco-validation-heading\">There was a problem</h3>".concat(validationMessage, "</div>");
                  $form.find('.genemco-validation-wrap').remove();
                  $form.prepend(validationMessage);
                } else {
                  $form.find('.genemco-validation-wrap').remove();
                }
              });
              $(document).on('click', 'form[action="/account"] button[type="submit"]', function (e) {
                console.log('form[action="/account"] button[type="submit"]');
                if ($(window).width() > 768) return;
                var $form = $(this).closest('form');
                var valid = $form.find('input[name="customer[first_name]"]')[0].checkValidity() && $form.find('input[name="customer[last_name]"]')[0].checkValidity() && $form.find('input[name="customer[note][company]"]')[0].checkValidity() && $form.find('input[name="customer[email]"]')[0].checkValidity() && $form.find('input[name="customer[note][phone]"]')[0].checkValidity() && $form.find('input[name="customer[note][city]"]')[0].checkValidity() && $form.find('input[name="customer[note][state]"]')[0].checkValidity() && $form.find('select[name="customer[note][country]"]')[0].checkValidity() && $form.find('select[name="customer[note][preferred_language]"]')[0].checkValidity() && $form.find('input[name="customer[password]"]');
                var validationMessage = '';

                if (!$form.find('input[name="customer[first_name]"]')[0].checkValidity()) {
                  validationMessage += "<div class=\"genemco-validation-line\">".concat(errorMessages.firstName, "</div>");
                }

                if (!$form.find('input[name="customer[last_name]"]')[0].checkValidity()) {
                  validationMessage += "<div class=\"genemco-validation-line\">".concat(errorMessages.lastName, "</div>");
                }

                if (!$form.find('input[name="customer[note][company]"]')[0].checkValidity()) {
                  validationMessage += "<div class=\"genemco-validation-line\">".concat(errorMessages.companyName, "</div>");
                }

                if (!$form.find('input[name="customer[email]"]')[0].checkValidity()) {
                  validationMessage += "<div class=\"genemco-validation-line\">".concat(errorMessages.email, "</div>");
                }

                if (!$form.find('input[name="customer[note][phone]"]')[0].checkValidity()) {
                  validationMessage += "<div class=\"genemco-validation-line\">".concat(errorMessages.phone, "</div>");
                }

                if (!$form.find('input[name="customer[note][city]"]')[0].checkValidity()) {
                  validationMessage += "<div class=\"genemco-validation-line\">".concat(errorMessages.city, "</div>");
                }

                if (!$form.find('input[name="customer[note][state]"]')[0].checkValidity()) {
                  validationMessage += "<div class=\"genemco-validation-line\">".concat(errorMessages.state, "</div>");
                }

                if (!$form.find('select[name="customer[note][country]"]')[0].checkValidity()) {
                  validationMessage += "<div class=\"genemco-validation-line\">".concat(errorMessages.country, "</div>");
                }

                if (!$form.find('select[name="customer[note][preferred_language]"]')[0].checkValidity()) {
                  validationMessage += "<div class=\"genemco-validation-line\">".concat(errorMessages.preferredLanguage, "</div>");
                }

                if (!$form.find('input[name="customer[password]"]')) {
                  validationMessage += "<div class=\"genemco-validation-line\">".concat(errorMessages.password, "</div>");
                }

                if (!valid) {
                  validationMessage = "<div class=\"genemco-validation-wrap\"><h3 class=\"genemco-validation-heading\">There was a problem</h3>".concat(validationMessage, "</div>");
                  $form.find('.genemco-validation-wrap').remove();
                  $form.prepend(validationMessage);
                } else {
                  $form.find('.genemco-validation-wrap').remove();
                }

                validateGenemcoFields($form[0]);
              });
              initiateGenemcoFields();

            case 36:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }());
})(window, document);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./resources/sass/app.scss":
/*!*********************************!*\
  !*** ./resources/sass/app.scss ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 0:
/*!*********************************************************************!*\
  !*** multi ./resources/js/genemco-app.js ./resources/sass/app.scss ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /var/www/app.genemco.com/resources/js/genemco-app.js */"./resources/js/genemco-app.js");
module.exports = __webpack_require__(/*! /var/www/app.genemco.com/resources/sass/app.scss */"./resources/sass/app.scss");


/***/ })

/******/ });