'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var nodeUtil = _interopDefault(require('util'));
var nodeUrl = _interopDefault(require('url'));
var fetch = _interopDefault(require('node-fetch'));
var createDebug = _interopDefault(require('debug'));
var toughCookie = _interopDefault(require('tough-cookie'));
var cheerio = _interopDefault(require('cheerio'));
var nodeCrypto = _interopDefault(require('crypto'));
var nodeStream = _interopDefault(require('stream'));
var sandwichStream = _interopDefault(require('sandwich-stream'));
var nodeFs = _interopDefault(require('fs'));
var Middleware = _interopDefault(require('middleware-io'));
var nodeHttp = _interopDefault(require('http'));
var nodeHttps = _interopDefault(require('https'));
var WebSocket = _interopDefault(require('ws'));

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var _global = createCommonjsModule(function (module) {
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
});

var _core = createCommonjsModule(function (module) {
var core = module.exports = { version: '2.5.7' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
});
var _core_1 = _core.version;

var _library = false;

var _shared = createCommonjsModule(function (module) {
var SHARED = '__core-js_shared__';
var store = _global[SHARED] || (_global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: _core.version,
  mode: 'global',
  copyright: '© 2018 Denis Pushkarev (zloirock.ru)'
});
});

var id = 0;
var px = Math.random();
var _uid = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

var _wks = createCommonjsModule(function (module) {
var store = _shared('wks');

var Symbol = _global.Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : _uid)('Symbol.' + name));
};

$exports.store = store;
});

var f = _wks;

var _wksExt = {
	f: f
};

var _isObject = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

var _anObject = function (it) {
  if (!_isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};

var _fails = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

// Thank's IE8 for his funny defineProperty
var _descriptors = !_fails(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});

var document = _global.document;
// typeof document.createElement is 'object' in old IE
var is = _isObject(document) && _isObject(document.createElement);
var _domCreate = function (it) {
  return is ? document.createElement(it) : {};
};

var _ie8DomDefine = !_descriptors && !_fails(function () {
  return Object.defineProperty(_domCreate('div'), 'a', { get: function () { return 7; } }).a != 7;
});

// 7.1.1 ToPrimitive(input [, PreferredType])

// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
var _toPrimitive = function (it, S) {
  if (!_isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !_isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};

var dP = Object.defineProperty;

var f$1 = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  _anObject(O);
  P = _toPrimitive(P, true);
  _anObject(Attributes);
  if (_ie8DomDefine) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

var _objectDp = {
	f: f$1
};

var defineProperty = _objectDp.f;
var _wksDefine = function (name) {
  var $Symbol = _core.Symbol || (_core.Symbol = _library ? {} : _global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: _wksExt.f(name) });
};

_wksDefine('asyncIterator');

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

const keyMirror = keys => {
  const out = {};

  for (const key of keys) {
    out[key] = key;
  }

  return out;
};
const getExecuteMethod = (method, params = {}) => {
  const options = {};

  for (const [key, value] of Object.entries(params)) {
    options[key] = typeof value === 'object' ? String(value) : value;
  }

  return `API.${method}(${JSON.stringify(options)})`;
};
const getChainReturn = methods => `return [${methods.join(',')}];`;
const resolveExecuteTask = (tasks, result) => {
  let errors = 0;
  result.response.forEach((response, i) => {
    if (response !== false) {
      tasks[i].resolve(response);
      return;
    }

    tasks[i].reject(result.errors[errors]);
    errors += 1;
  });
};
const getRandomId = () => `${Math.floor(Math.random() * 1e4)}${Date.now()}`;
const delay = delayed => new Promise(resolve => setTimeout(resolve, delayed));
const uniqueKeys = keys => [...new Set(keys)];
const lt = /&lt;/g;
const qt = /&gt;/g;
const br = /<br>/g;
const amp = /&amp;/g;
const quot = /&quot;/g;
const unescapeHTML = text => text.replace(lt, '<').replace(qt, '>').replace(br, '\n').replace(amp, '&').replace(quot, '"');

const {
  inspect
} = nodeUtil;
class Request {
  constructor(method, params = {}) {
    this.method = method;
    this.params = _objectSpread({}, params);
    this.attempts = 0;
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }

  get [Symbol.toStringTag]() {
    return 'Request';
  }

  addAttempt() {
    this.attempts += 1;
  }

  toString() {
    return getExecuteMethod(this.method, this.params);
  }

  [inspect.custom](depth, options) {
    const {
      name
    } = this.constructor;
    const {
      method,
      params,
      promise
    } = this;
    const payload = {
      method,
      params,
      promise
    };
    return `${options.stylize(name, 'special')} ${inspect(payload, options)}`;
  }

}

class VKError extends Error {
  constructor({
    code,
    message
  }) {
    super(message);
    this.code = code;
    this.message = message;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }

  get [Symbol.toStringTag]() {
    return this.constructor.name;
  }

  toJSON() {
    const json = {};

    for (const key of Object.getOwnPropertyNames(this)) {
      json[key] = this[key];
    }

    return json;
  }

}

var version = "4.0.0-rc.1";

const API_VERSION = '5.80';
const CHAT_PEER = 2e9;
const BASE_URL_API = 'https://api.vk.com/method/';
const CALLBACK_BLANK = 'https://oauth.vk.com/blank.html';
const DESKTOP_USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36';
const MINIMUM_TIME_INTERVAL_API = 1133;
const defaultOptions = {
  token: null,
  agent: null,
  lang: null,
  login: null,
  phone: null,
  password: null,
  app: null,
  key: null,
  scope: 'all',
  apiMode: 'sequential',
  apiWait: 3e3,
  apiLimit: 3,
  apiAttempts: 3,
  apiTimeout: 10e3,
  apiHeaders: {
    'User-Agent': `vk-io/${version} (+https://github.com/negezor/vk-io)`
  },
  apiExecuteCount: 25,
  apiExecuteMethods: ['messages.send'],
  uploadTimeout: 20e3,
  pollingWait: 3e3,
  pollingAttempts: 3,
  pollingGroupId: null,
  webhookPath: null,
  webhookSecret: null,
  webhookConfirmation: null,
  collectAttempts: 3
};
const attachmentTypes = {
  AUDIO: 'audio',
  DOCUMENT: 'doc',
  GIFT: 'gift',
  LINK: 'link',
  MARKET_ALBUM: 'market_album',
  MARKET: 'market',
  PHOTO: 'photo',
  STICKER: 'sticker',
  VIDEO: 'video',
  WALL_REPLY: 'wall_reply',
  WALL: 'wall'
};
const defaultExtensions = {
  photo: 'jpg',
  video: 'mp4',
  audio: 'mp3',
  voice: 'ogg',
  graffiti: 'png'
};
const defaultContentTypes = {
  photo: 'image/jpeg',
  video: 'video/mp4',
  audio: 'audio/mp3',
  voice: 'audio/ogg',
  graffiti: 'image/png'
};
const captchaTypes = keyMirror(['API', 'DIRECT_AUTH', 'IMPLICIT_FLOW_AUTH', 'ACCOUNT_VERIFICATION']);
const messageSources = {
  USER: 'user',
  CHAT: 'chat',
  GROUP: 'group',
  EMAIL: 'email'
};
const apiErrors = {
  UNKNOWN_ERROR: 1,
  APP_SWITCHED_OFF: 2,
  UNKNOWN_METHOD: 3,
  AUTH_FAILURE: 5,
  TOO_MANY_REQUESTS: 6,
  SCOPE_NEEDED: 7,
  INCORRECT_REQUEST: 8,
  TOO_MANY_SIMILAR_ACTIONS: 9,
  INTERNAL_ERROR: 10,
  RESPONSE_SIZE_TOO_BIG: 13,
  CAPTCHA_REQUIRED: 14,
  ACCESS_DENIED: 15,
  USER_VALIDATION_REQUIRED: 17,
  PAGE_BLOCKED: 18,
  STANDALONE_ONLY: 20,
  STANDALONE_AND_OPEN_API_ONLY: 21,
  METHOD_DISABLED: 23,
  CONFIRMATION_REQUIRED: 24,
  GROUP_TOKEN_NOT_VALID: 27,
  APP_TOKEN_NOT_VALID: 28,
  WRONG_PARAMETER: 100,
  INCORRECT_USER_ID: 113,
  ALBUM_ACCESS_DENIED: 200,
  AUDIO_ACCESS_DENIED: 201,
  GROUP_ACCESS_DENIED: 203,
  ALBUM_OVERFLOW: 300,
  PAYMENTS_DISABLED: 500,
  COMMERCIAL_ACCESS_DENIED: 600,
  COMMERCIAL_ERROR: 603
};
const authErrors = keyMirror(['PAGE_BLOCKED', 'INVALID_PHONE_NUMBER', 'AUTHORIZATION_FAILED', 'FAILED_PASSED_CAPTCHA', 'MISSING_CAPTCHA_HANDLER', 'FAILED_PASSED_TWO_FACTOR', 'MISSING_TWO_FACTOR_HANDLER']);
const uploadErrors = keyMirror(['NO_FILES_TO_UPLOAD', 'EXCEEDED_MAX_FILES', 'UNSUPPORTED_SOURCE_TYPE']);
const updatesErrors = keyMirror(['NEED_RESTART', 'POLLING_REQUEST_FAILED']);
const collectErrors = keyMirror(['EXECUTE_ERROR']);
const snippetsErrors = keyMirror(['INVALID_URL', 'URL_NOT_ALLOWED', 'INVALID_RESOURCE', 'RESOURCE_NOT_FOUND']);
const updatesSources = keyMirror(['POLLING', 'WEBHOOK']);
const userScopes = new Map([['notify', 1], ['friends', 2], ['photos', 4], ['audio', 8], ['video', 16], ['pages', 128], ['link', 256], ['status', 1024], ['notes', 2048], ['messages', 4096], ['wall', 8192], ['ads', 32768], ['offline', 65536], ['docs', 131072], ['groups', 262144], ['notifications', 524288], ['stats', 1048576], ['email', 4194304], ['market', 134217728]]);
const groupScopes = new Map([['stories', 1], ['photos', 4], ['messages', 4096], ['docs', 131072], ['manage', 262144]]);
const platforms = new Map([[1, 'mobile'], [2, 'iphone'], [3, 'ipad'], [4, 'android'], [5, 'wphone'], [6, 'windows'], [7, 'web'], [8, 'standalone']]);
const parseAttachment = /(photo|video|audio|doc|wall|market)([-\d]+)_(\d+)_?(\d+)?/;
const parseResource = /(app(?:lication)|id|club|public|albums|tag)([-\d]+)/;
const parseOwnerResource = /(album|topic|wall|page|videos)([-\d]+)_(\d+)/;

const {
  CAPTCHA_REQUIRED,
  USER_VALIDATION_REQUIRED,
  CONFIRMATION_REQUIRED
} = apiErrors;
class APIError extends VKError {
  constructor(payload) {
    const code = Number(payload.error_code);
    const message = `Code №${code} - ${payload.error_msg}`;
    super({
      code,
      message
    });
    this.params = payload.request_params;

    if (code === CAPTCHA_REQUIRED) {
      this.captchaSid = Number(payload.captcha_sid);
      this.captchaImg = payload.captcha_img;
    } else if (code === USER_VALIDATION_REQUIRED) {
      this.redirectUri = payload.redirect_uri;
    } else if (code === CONFIRMATION_REQUIRED) {
      this.confirmationText = payload.confirmation_text;
    }
  }

}

const {
  DEBUG = ''
} = process.env;
const isDebug = DEBUG.includes('vk-io:auth');
class AuthError extends VKError {
  constructor({
    message,
    code,
    pageHtml = null
  }) {
    super({
      message,
      code
    });
    this.pageHtml = isDebug ? pageHtml : null;
  }

}

class UploadError extends VKError {}

class CollectError extends VKError {
  constructor({
    message,
    code,
    errors
  }) {
    super({
      message,
      code
    });
    this.errors = errors;
  }

}

class UpdatesError extends VKError {}

class ExecuteError extends VKError {
  constructor(payload) {
    const code = Number(payload.error_code);
    const message = `Code №${code} - ${payload.error_msg}`;
    super({
      code,
      message
    });
    this.method = payload.method;
  }

}

class SnippetsError extends VKError {}

class StreamingRuleError extends VKError {
  constructor({
    message,
    error_code: code
  }) {
    super({
      message,
      code
    });
  }

}

const {
  URL
} = nodeUrl;
const getAllUsersPermissions = () => Array.from(userScopes.values()).reduce((previous, current) => previous + current, 0);
const getAllGroupsPermissions = () => Array.from(groupScopes.values()).reduce((previous, current) => previous + current, 0);
const getUsersPermissionsByName = scope => {
  if (!Array.isArray(scope)) {
    scope = scope.split(/,\s{0,}/);
  }

  let bitMask = 0;

  for (const name of scope) {
    if (userScopes.has(name)) {
      bitMask += userScopes.get(name);
    }
  }

  return bitMask;
};
const getGroupsPermissionsByName = scope => {
  if (!Array.isArray(scope)) {
    scope = scope.split(/,\s{0,}/);
  }

  let bitMask = 0;

  for (const name of scope) {
    if (groupScopes.has(name)) {
      bitMask += groupScopes.get(name);
    }
  }

  return bitMask;
};
const parseFormField = $ => {
  const $form = $('form[action][method]');
  const fields = {};

  for (const _ref of $form.serializeArray()) {
    const {
      name,
      value
    } = _ref;
    fields[name] = value;
  }

  return {
    action: $form.attr('action'),
    fields
  };
};
const getFullURL = (action, {
  url
}) => {
  if (action.startsWith('https://')) {
    return new URL(action);
  }

  const {
    protocol,
    host
  } = new URL(url);
  return new URL(action, `${protocol}//${host}`);
};

const {
  promisify
} = nodeUtil;
const debug = createDebug('vk-io:util:fetch-cookie');
const REDIRECT_CODES = [303, 301, 302];
const {
  CookieJar
} = toughCookie;
const fetchCookieDecorator = (jar = new CookieJar()) => {
  const setCookie = promisify(jar.setCookie).bind(jar);
  const getCookieString = promisify(jar.getCookieString).bind(jar);
  return async function fetchCookie(url, options = {}) {
    const previousCookie = await getCookieString(url);
    const {
      headers = {}
    } = options;

    if (previousCookie) {
      headers.cookie = previousCookie;
    }

    debug('fetch url %s', url);
    const response = await fetch(url, _objectSpread({}, options, {
      headers
    }));
    const cookies = response.headers.raw()['set-cookie'] || [];

    if (cookies.length === 0) {
      return response;
    }

    await Promise.all(cookies.map(cookie => setCookie(cookie, response.url)));
    return response;
  };
};
const fetchCookieFollowRedirectsDecorator = jar => {
  const fetchCookie = fetchCookieDecorator(jar);
  return async function fetchCookieFollowRedirects(url, options = {}) {
    const response = await fetchCookie(url, _objectSpread({}, options, {
      redirect: 'manual'
    }));
    const isRedirect = REDIRECT_CODES.includes(response.status);

    if (isRedirect && options.redirect !== 'manual' && options.follow !== 0) {
      debug('Redirect to', response.headers.get('location'));
      let follow;

      if (options.follow) {
        follow = options.follow - 1;
      }

      return await fetchCookieFollowRedirects(response.headers.get('location'), {
        method: 'GET',
        body: null,
        follow
      });
    }

    return response;
  };
};

const {
  load: cheerioLoad
} = cheerio;
const {
  URL: URL$1,
  URLSearchParams
} = nodeUrl;
const debug$1 = createDebug('vk-io:auth:account-verification');
const {
  INVALID_PHONE_NUMBER,
  AUTHORIZATION_FAILED,
  FAILED_PASSED_CAPTCHA,
  MISSING_CAPTCHA_HANDLER,
  FAILED_PASSED_TWO_FACTOR,
  MISSING_TWO_FACTOR_HANDLER
} = authErrors;
const ACTION_AUTH_CODE = 'act=authcheck';
const ACTION_SECURITY_CODE = 'act=security';
const ACTION_VALIDATE = 'act=validate';
const ACTION_CAPTCHA = 'act=captcha';
const TWO_FACTOR_ATTEMPTS = 3;
class AccountVerification {
  constructor(vk) {
    this.vk = vk;
    const {
      agent,
      login,
      phone
    } = vk.options;
    this.agent = agent;
    this.login = login;
    this.phone = phone;
    this.jar = new CookieJar();
    this.fetchCookie = fetchCookieFollowRedirectsDecorator(this.jar);
    this.captcha = null;
    this.captchaAttempts = 0;
    this.twoFactorAttempts = 0;
  }

  get [Symbol.toStringTag]() {
    return 'AccountVerification';
  }

  fetch(url, options = {}) {
    const {
      agent
    } = this;
    const {
      headers = {}
    } = options;
    return this.fetchCookie(url, _objectSpread({}, options, {
      agent,
      compress: false,
      headers: _objectSpread({}, headers, {
        'User-Agent': DESKTOP_USER_AGENT
      })
    }));
  }

  async run(redirectUri) {
    let response = await this.fetch(redirectUri, {
      method: 'GET'
    });
    const isProcessed = true;

    while (isProcessed) {
      const {
        url
      } = response;

      if (url.includes(CALLBACK_BLANK)) {
        let {
          hash
        } = new URL$1(response.url);

        if (hash.startsWith('#')) {
          hash = hash.substring(1);
        }

        const params = new URLSearchParams(hash);

        if (params.has('error')) {
          throw new AuthError({
            message: `Failed passed grant access: ${params.get('error_description') || 'Unknown error'}`,
            code: AUTHORIZATION_FAILED
          });
        }

        const user = params.get('user_id');
        return {
          user: user !== null ? Number(user) : null,
          token: params.get('access_token')
        };
      }

      const $ = cheerioLoad((await response.text()));

      if (url.includes(ACTION_AUTH_CODE)) {
        response = await this.processTwoFactorForm(response, $);
        continue;
      }

      if (url.includes(ACTION_SECURITY_CODE)) {
        response = await this.processSecurityForm(response, $);
        continue;
      }

      if (url.includes(ACTION_VALIDATE)) {
        response = await this.processValidateForm(response, $);
        continue;
      }

      if (url.includes(ACTION_CAPTCHA)) {
        response = await this.processCaptchaForm(response, $);
        continue;
      }

      throw new AuthError({
        message: 'Account verification failed',
        code: AUTHORIZATION_FAILED
      });
    }
  }

  async processTwoFactorForm(response, $) {
    debug$1('process two-factor handle');

    if (this.vk.twoFactorHandler === null) {
      throw new AuthError({
        message: 'Missing two-factor handler',
        code: MISSING_TWO_FACTOR_HANDLER
      });
    }

    let isProcessed = true;

    while (this.twoFactorAttempts < TWO_FACTOR_ATTEMPTS && isProcessed) {
      await new Promise((resolve, reject) => {
        this.vk.twoFactorHandler({}, async code => {
          const {
            action,
            fields
          } = parseFormField($);
          fields.code = code;

          try {
            const url = getFullURL(action, response);
            response = await this.fetch(url, {
              method: 'POST',
              body: new URLSearchParams(fields)
            });
          } catch (error) {
            reject(error);
            throw error;
          }

          if (response.url.includes(ACTION_AUTH_CODE)) {
            resolve();
            throw new AuthError({
              message: 'Incorrect two-factor code',
              code: FAILED_PASSED_TWO_FACTOR
            });
          }

          isProcessed = false;
          resolve();
        });
      });
      this.twoFactorAttempts += 1;
    }

    if (this.twoFactorAttempts >= TWO_FACTOR_ATTEMPTS && isProcessed) {
      throw new AuthError({
        message: 'Failed passed two-factor authentication',
        code: FAILED_PASSED_TWO_FACTOR
      });
    }

    return response;
  }

  async processSecurityForm(response, $) {
    debug$1('process security form');
    const {
      login,
      phone
    } = this;
    let number;

    if (phone !== null) {
      number = phone;
    } else if (login !== null && !login.includes('@')) {
      number = login;
    } else {
      throw new AuthError({
        message: 'Missing phone number in the phone or login field',
        code: INVALID_PHONE_NUMBER
      });
    }

    if (typeof number === 'string') {
      number = number.trim().replace(/^(\+|00)/, '');
    }

    number = String(number);
    const $field = $('.field_prefix');
    const prefix = $field.first().text().trim().replace('+', '').length;
    const postfix = $field.last().text().trim().length;
    const {
      action,
      fields
    } = parseFormField($);
    fields.code = number.slice(prefix, number.length - postfix);
    const url = getFullURL(action, response);
    response = await this.fetch(url, {
      method: 'POST',
      body: new URLSearchParams(fields)
    });

    if (response.url.includes(ACTION_SECURITY_CODE)) {
      throw new AuthError({
        message: 'Invalid phone number',
        code: INVALID_PHONE_NUMBER
      });
    }

    return response;
  }

  async processValidateForm(response, $) {
    const href = $('#activation_wrap a').attr('href');
    const url = getFullURL(href, response);
    return await this.fetch(url, {
      method: 'GET'
    });
  }

  async processCaptchaForm(response, $) {
    if (this.vk.captchaHandler === null) {
      throw new AuthError({
        message: 'Missing captcha handler',
        code: MISSING_CAPTCHA_HANDLER
      });
    }

    if (this.captcha !== null) {
      this.captcha.reject(new AuthError({
        message: 'Incorrect captcha code',
        code: FAILED_PASSED_CAPTCHA
      }));
      this.captcha = null;
      this.captchaAttempts += 1;
    }

    const {
      action,
      fields
    } = parseFormField($);
    const src = $('.captcha_img').attr('src');
    const payload = {
      type: captchaTypes.ACCOUNT_VERIFICATION,
      sid: fields.captcha_sid,
      src
    };
    await new Promise((resolveCaptcha, rejectCaptcha) => {
      this.vk.captchaHandler(payload, key => new Promise((resolve, reject) => {
        if (key instanceof Error) {
          rejectCaptcha(key);
          reject(key);
          return;
        }

        fields.captcha_key = key;
        this.captcha = {
          resolve,
          reject
        };
        resolveCaptcha();
      }));
    });
    const url = getFullURL(action, response);
    url.searchParams.set('utf8', 1);
    return await this.fetch(url, {
      method: 'POST',
      body: new URLSearchParams(fields)
    });
  }

}

function sequential(next) {
  this.callMethod(this.queue.shift());
  next();
}

async function parallel(next) {
  const {
    queue
  } = this;

  if (queue[0].method.startsWith('execute')) {
    sequential.call(this, next);
    return;
  }

  await delay(0);
  const {
    apiExecuteCount
  } = this.vk.options;
  const tasks = [];
  const chain = [];

  for (let i = 0; i < queue.length; i += 1) {
    if (queue[i].method.startsWith('execute')) {
      continue;
    }

    const request = queue.splice(i, 1)[0];
    i -= 1;
    tasks.push(request);
    chain.push(String(request));

    if (tasks.length >= apiExecuteCount) {
      break;
    }
  }

  try {
    const request = new Request('execute', {
      code: getChainReturn(chain)
    });
    this.callMethod(request);
    next();
    resolveExecuteTask(tasks, (await request.promise));
  } catch (error) {
    for (const task of tasks) {
      task.reject(error);
    }
  }
}

async function parallelSelected(next) {
  const {
    apiExecuteMethods,
    apiExecuteCount
  } = this.vk.options;
  const {
    queue
  } = this;

  if (!apiExecuteMethods.includes(queue[0].method)) {
    sequential.call(this, next);
    return;
  }

  await delay(0);
  const tasks = [];
  const chain = [];

  for (let i = 0; i < queue.length; i += 1) {
    if (!apiExecuteMethods.includes(queue[i].method)) {
      continue;
    }

    const request = queue.splice(i, 1)[0];
    i -= 1;
    tasks.push(request);
    chain.push(String(request));

    if (tasks.length >= apiExecuteCount) {
      break;
    }
  }

  if (tasks.length === 0) {
    sequential.call(this, next);
    return;
  }

  try {
    const request = new Request('execute', {
      code: getChainReturn(chain)
    });
    this.callMethod(request);
    next();
    resolveExecuteTask(tasks, (await request.promise));
  } catch (error) {
    for (const task of tasks) {
      task.reject(error);
    }
  }
}

const {
  inspect: inspect$1
} = nodeUtil;
const {
  URL: URL$2,
  URLSearchParams: URLSearchParams$1
} = nodeUrl;
const {
  CAPTCHA_REQUIRED: CAPTCHA_REQUIRED$1,
  TOO_MANY_REQUESTS,
  USER_VALIDATION_REQUIRED: USER_VALIDATION_REQUIRED$1
} = apiErrors;
const debug$2 = createDebug('vk-io:api');
const requestHandlers = {
  sequential,
  parallel,
  parallel_selected: parallelSelected
};

const getRequestHandler = (mode = 'sequential') => {
  const handler = requestHandlers[mode];

  if (!handler) {
    throw new VKError({
      message: 'Unsuported api mode'
    });
  }

  return handler;
};

const baseUrlSymbol = Symbol('baseURLSymbol');
const groupMethods = ['account', 'appWidgets', 'ads', 'apps', 'auth', 'audio', 'board', 'database', 'docs', 'fave', 'friends', 'gifts', 'groups', 'leads', 'likes', 'market', 'messages', 'newsfeed', 'notes', 'notifications', 'orders', 'pages', 'photos', 'places', 'polls', 'search', 'secure', 'stats', 'status', 'storage', 'stories', 'streaming', 'users', 'utils', 'video', 'wall', 'widgets'];
class API {
  constructor(vk) {
    this.vk = vk;
    this.queue = [];
    this.started = false;
    this.suspended = false;
    this[baseUrlSymbol] = BASE_URL_API;

    for (const group of groupMethods) {
      const isMessagesGroup = group === 'messages';
      this[group] = new Proxy(isMessagesGroup ? {
        send: (params = {}) => {
          if (!('random_id' in params)) {
            params = _objectSpread({}, params, {
              random_id: getRandomId()
            });
          }

          return this.enqueue('messages.send', params);
        }
      } : {}, {
        get: isMessagesGroup ? (obj, prop) => obj[prop] || (params => this.enqueue(`${group}.${prop}`, params)) : (obj, prop) => params => this.enqueue(`${group}.${prop}`, params)
      });
    }
  }

  get [Symbol.toStringTag]() {
    return 'API';
  }

  get API_VERSION() {
    return API_VERSION;
  }

  get baseUrl() {
    return this[baseUrlSymbol];
  }

  set baseUrl(url) {
    if (!url.endsWith('/')) {
      url += '/';
    }

    this[baseUrlSymbol] = url;
    return url;
  }

  execute(params) {
    return this.enqueue('execute', params);
  }

  procedure(name, params) {
    return this.enqueue(`execute.${name}`, params);
  }

  call(method, params) {
    return this.enqueue(method, params);
  }

  callWithRequest(request) {
    this.queue.push(request);
    this.worker();
    return request.promise;
  }

  enqueue(method, params) {
    const request = new Request(method, params);
    return this.callWithRequest(request);
  }

  requeue(request) {
    this.queue.unshift(request);
    this.worker();
  }

  worker() {
    if (this.started) {
      return;
    }

    this.started = true;
    const {
      apiLimit,
      apiMode
    } = this.vk.options;
    const handler = getRequestHandler(apiMode);
    const interval = Math.round(MINIMUM_TIME_INTERVAL_API / apiLimit);

    const work = () => {
      if (this.queue.length === 0 || this.suspended) {
        this.started = false;
        return;
      }

      handler.call(this, () => {
        setTimeout(work, interval);
      });
    };

    work();
  }

  async callMethod(request) {
    const {
      options
    } = this.vk;
    const {
      method
    } = request;
    const url = new URL$2(method, this.baseUrl);

    const params = _objectSpread({
      access_token: options.token,
      v: API_VERSION
    }, request.params);

    if (options.lang !== null) {
      params.lang = options.lang;
    }

    debug$2(`http --> ${method}`);
    const startTime = Date.now();
    let response;

    try {
      response = await fetch(url, {
        method: 'POST',
        compress: false,
        agent: options.agent,
        timeout: options.apiTimeout,
        headers: _objectSpread({}, options.apiHeaders, {
          connection: 'keep-alive'
        }),
        body: new URLSearchParams$1(params)
      });
      response = await response.json();
    } catch (error) {
      if (request.addAttempt() <= options.apiAttempts) {
        await delay(options.apiWait);
        debug$2(`Request ${method} restarted ${request.attempts} times`);
        this.requeue(request);
        return;
      }

      if ('captcha' in request) {
        request.captcha.reject(error);
      }

      request.reject(error);
      return;
    }

    const endTime = (Date.now() - startTime).toLocaleString();
    debug$2(`http <-- ${method} ${endTime}ms`);

    if ('error' in response) {
      this.handleError(request, new APIError(response.error));
      return;
    }

    if ('captcha' in request) {
      request.captcha.resolve();
    }

    if (method.startsWith('execute')) {
      request.resolve({
        response: response.response,
        errors: (response.execute_errors || []).map(error => new ExecuteError(error))
      });
      return;
    }

    request.resolve('response' in response ? response.response : response);
  }

  async handleError(request, error) {
    const {
      code
    } = error;

    if (code === TOO_MANY_REQUESTS) {
      if (this.suspended) {
        this.requeue(request);
        return;
      }

      this.suspended = true;
      await delay(MINIMUM_TIME_INTERVAL_API / this.vk.options.apiLimit + 50);
      this.suspended = false;
      this.requeue(request);
      return;
    }

    if ('captcha' in request) {
      request.captcha.reject(error);
    }

    if (code === USER_VALIDATION_REQUIRED$1) {
      if (this.suspended) {
        this.requeue(request);
      }

      this.suspended = true;

      try {
        const verification = new AccountVerification(this.vk);
        const {
          token
        } = await verification.run(error.redirectUri);
        debug$2('Account verification passed');
        this.vk.setToken(token);
        this.suspended = false;
        this.requeue(request);
      } catch (verificationError) {
        debug$2('Account verification error', verificationError);
        request.reject(error);
        await delay(15e3);
        this.suspended = false;
        this.worker();
      }

      return;
    }

    const isCaptcha = code === CAPTCHA_REQUIRED$1;

    if (isCaptcha && this.vk.captchaHandler === null || !isCaptcha) {
      request.reject(error);
      return;
    }

    const {
      captchaSid
    } = error;
    const payload = {
      type: captchaTypes.API,
      src: error.captchaImg,
      sid: captchaSid,
      request
    };
    this.vk.captchaHandler(payload, key => new Promise((resolve, reject) => {
      if (key instanceof Error) {
        request.reject(key);
        reject(key);
        return;
      }

      request.params.captcha_sid = captchaSid;
      request.params.captcha_key = key;
      request.captcha = {
        resolve,
        reject
      };
      this.requeue(request);
    }));
  }

  [inspect$1.custom](depth, options) {
    const {
      name
    } = this.constructor;
    const {
      started,
      queue
    } = this;
    const payload = {
      started,
      queue
    };
    return `${options.stylize(name, 'special')} ${inspect$1(payload, options)}`;
  }

}

var _propertyDesc = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

var _hide = _descriptors ? function (object, key, value) {
  return _objectDp.f(object, key, _propertyDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

var hasOwnProperty = {}.hasOwnProperty;
var _has = function (it, key) {
  return hasOwnProperty.call(it, key);
};

var _redefine = createCommonjsModule(function (module) {
var SRC = _uid('src');
var TO_STRING = 'toString';
var $toString = Function[TO_STRING];
var TPL = ('' + $toString).split(TO_STRING);

_core.inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) _has(val, 'name') || _hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) _has(val, SRC) || _hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === _global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    _hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    _hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});
});

var _aFunction = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};

// optional / simple context binding

var _ctx = function (fn, that, length) {
  _aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? _global : IS_STATIC ? _global[name] || (_global[name] = {}) : (_global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? _core : _core[name] || (_core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? _ctx(out, _global) : IS_PROTO && typeof out == 'function' ? _ctx(Function.call, out) : out;
    // extend global
    if (target) _redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) _hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
_global.core = _core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
var _export = $export;

// 7.2.1 RequireObjectCoercible(argument)
var _defined = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};

// 7.1.13 ToObject(argument)

var _toObject = function (it) {
  return Object(_defined(it));
};

var _strictMethod = function (method, arg) {
  return !!method && _fails(function () {
    // eslint-disable-next-line no-useless-call
    arg ? method.call(null, function () { /* empty */ }, 1) : method.call(null);
  });
};

var $sort = [].sort;
var test = [1, 2, 3];

_export(_export.P + _export.F * (_fails(function () {
  // IE8-
  test.sort(undefined);
}) || !_fails(function () {
  // V8 bug
  test.sort(null);
  // Old WebKit
}) || !_strictMethod($sort)), 'Array', {
  // 22.1.3.25 Array.prototype.sort(comparefn)
  sort: function sort(comparefn) {
    return comparefn === undefined
      ? $sort.call(_toObject(this))
      : $sort.call(_toObject(this), _aFunction(comparefn));
  }
});

const {
  load: cheerioLoad$1
} = cheerio;
const {
  URL: URL$3,
  URLSearchParams: URLSearchParams$2
} = nodeUrl;
const debug$3 = createDebug('vk-io:auth:direct');
const {
  INVALID_PHONE_NUMBER: INVALID_PHONE_NUMBER$1,
  AUTHORIZATION_FAILED: AUTHORIZATION_FAILED$1,
  FAILED_PASSED_CAPTCHA: FAILED_PASSED_CAPTCHA$1,
  MISSING_CAPTCHA_HANDLER: MISSING_CAPTCHA_HANDLER$1,
  FAILED_PASSED_TWO_FACTOR: FAILED_PASSED_TWO_FACTOR$1,
  MISSING_TWO_FACTOR_HANDLER: MISSING_TWO_FACTOR_HANDLER$1
} = authErrors;
const TWO_FACTOR_ATTEMPTS$1 = 3;
const CAPTCHA_ATTEMPTS = 3;
const ACTION_SECURITY_CODE$1 = 'act=security';
class DirectAuth {
  constructor(vk, {
    app = vk.options.app,
    key = vk.options.key,
    agent = vk.options.agent,
    scope = vk.options.scope,
    login = vk.options.login,
    phone = vk.options.phone,
    password = vk.options.password
  } = {}) {
    this.vk = vk;
    this.app = app;
    this.key = key;
    this.agent = agent;
    this.scope = scope;
    this.login = login;
    this.phone = phone;
    this.password = password;
    this.started = false;
    this.captcha = null;
    this.twoFactor = null;
    this.captchaAttempts = 0;
    this.twoFactorAttempts = 0;
  }

  get [Symbol.toStringTag]() {
    return 'DirectAuth';
  }

  fetch(url, options = {}) {
    const {
      agent
    } = this;
    const {
      headers = {}
    } = options;
    return this.fetchCookie(url, _objectSpread({}, options, {
      agent,
      compress: false,
      headers: _objectSpread({}, headers, {
        'User-Agent': DESKTOP_USER_AGENT
      })
    }));
  }

  getPermissionsPage(query = {}) {
    let {
      scope
    } = this;

    if (scope === 'all' || scope === null) {
      scope = getAllUsersPermissions();
    } else if (typeof scope !== 'number') {
      scope = getUsersPermissionsByName(scope);
    }

    debug$3('auth scope %s', scope);
    const {
      app,
      key,
      login,
      phone,
      password
    } = this;
    const params = new URLSearchParams$2(_objectSpread({}, query, {
      username: login || phone,
      grant_type: 'password',
      client_secret: key,
      '2fa_supported': this.vk.twoFactorHandler !== null ? 1 : 0,
      v: API_VERSION,
      client_id: app,
      password,
      scope
    }));
    const url = new URL$3(`https://oauth.vk.com/token?${params}`);
    return this.fetch(url, {
      method: 'GET'
    });
  }

  async run() {
    if (this.started) {
      throw new AuthError({
        message: 'Authorization already started!',
        code: AUTHORIZATION_FAILED$1
      });
    }

    this.started = true;
    this.fetchCookie = fetchCookieFollowRedirectsDecorator();
    let response = await this.getPermissionsPage();
    let text;
    const isProcessed = true;

    while (isProcessed) {
      text = await response.text();
      let isJSON = true;

      try {
        text = JSON.parse(text);
      } catch (e) {
        isJSON = false;
      }

      if (isJSON) {
        if ('access_token' in text) {
          const {
            email = null,
            user_id: user = null,
            expires_in: expires = null,
            access_token: token
          } = text;
          return {
            email,
            user: user !== null ? Number(user) : null,
            token,
            expires: expires !== null ? Number(expires) : null
          };
        }

        if ('error' in text) {
          if (text.error === 'invalid_client') {
            throw new AuthError({
              message: `Invalid client (${text.error_description})`,
              code: AUTHORIZATION_FAILED$1
            });
          }

          if (text.error === 'need_captcha') {
            response = await this.processCaptcha(text);
            continue;
          }

          if (text.error === 'need_validation') {
            if ('validation_type' in text) {
              response = await this.processTwoFactor(text);
              continue;
            }

            const $ = cheerioLoad$1(text);
            response = this.processSecurityForm(response, $);
            continue;
          }

          throw new AuthError({
            message: 'Unsupported type validation',
            code: AUTHORIZATION_FAILED$1
          });
        }
      }

      throw new AuthError({
        message: 'Authorization failed',
        code: AUTHORIZATION_FAILED$1
      });
    }
  }

  async processCaptcha({
    captcha_sid: sid,
    captcha_img: src
  }) {
    debug$3('captcha process');

    if (this.captcha !== null) {
      this.captcha.reject(new AuthError({
        message: 'Incorrect captcha code',
        code: FAILED_PASSED_CAPTCHA$1
      }));
      this.captcha = null;
      this.captchaAttempts += 1;
    }

    if (this.vk.captchaHandler === null) {
      throw new AuthError({
        message: 'Missing captcha handler',
        code: MISSING_CAPTCHA_HANDLER$1
      });
    }

    if (this.captchaAttempts >= CAPTCHA_ATTEMPTS) {
      throw new AuthError({
        message: 'Maximum attempts passage captcha',
        code: FAILED_PASSED_CAPTCHA$1
      });
    }

    const payload = {
      type: captchaTypes.DIRECT_AUTH,
      sid,
      src
    };
    const key = await new Promise((resolveCaptcha, rejectCaptcha) => {
      this.vk.captchaHandler(payload, code => new Promise((resolve, reject) => {
        if (code instanceof Error) {
          rejectCaptcha(code);
          reject(code);
          return;
        }

        this.captcha = {
          resolve,
          reject
        };
        resolveCaptcha(code);
      }));
    });
    return await this.getPermissionsPage({
      captcha_sid: sid,
      captcha_key: key
    });
  }

  async processTwoFactor({
    validation_type: validationType,
    phone_mask: phoneMask
  }) {
    debug$3('process two-factor handle');

    if (this.twoFactor !== null) {
      this.twoFactor.reject(new AuthError({
        message: 'Incorrect two-factor code',
        code: FAILED_PASSED_TWO_FACTOR$1
      }));
      this.twoFactor = null;
      this.twoFactorAttempts += 1;
    }

    if (this.vk.twoFactorHandler === null) {
      throw new AuthError({
        message: 'Missing two-factor handler',
        code: MISSING_TWO_FACTOR_HANDLER$1
      });
    }

    if (this.twoFactorAttempts >= TWO_FACTOR_ATTEMPTS$1) {
      throw new AuthError({
        message: 'Failed passed two-factor authentication',
        code: FAILED_PASSED_TWO_FACTOR$1
      });
    }

    const type = validationType === '2fa_app' ? 'app' : 'sms';
    const key = await new Promise(resolveTwoFactor => {
      this.vk.twoFactorHandler({
        type,
        phoneMask
      }, code => new Promise((resolve, reject) => {
        this.twoFactor = {
          resolve,
          reject
        };
        resolveTwoFactor(code);
      }));
    });
    return await this.getPermissionsPage({
      code: key
    });
  }

  async processSecurityForm(response, $) {
    debug$3('process security form');
    const {
      login,
      phone
    } = this;
    let number;

    if (phone !== null) {
      number = phone;
    } else if (login !== null && !login.includes('@')) {
      number = login;
    } else {
      throw new AuthError({
        message: 'Missing phone number in the phone or login field',
        code: INVALID_PHONE_NUMBER$1
      });
    }

    if (typeof number === 'string') {
      number = number.trim().replace(/^(\+|00)/, '');
    }

    number = String(number);
    const $field = $('.field_prefix');
    const prefix = $field.first().text().trim().replace('+', '').length;
    const postfix = $field.last().text().trim().length;
    const {
      action,
      fields
    } = parseFormField($);
    fields.code = number.slice(prefix, number.length - postfix);
    const url = getFullURL(action, response);
    response = await this.fetch(url, {
      method: 'POST',
      body: new URLSearchParams$2(fields)
    });

    if (response.url.includes(ACTION_SECURITY_CODE$1)) {
      throw new AuthError({
        message: 'Invalid phone number',
        code: INVALID_PHONE_NUMBER$1
      });
    }

    return response;
  }

}

const {
  load: cheerioLoad$2
} = cheerio;
const {
  URL: URL$4,
  URLSearchParams: URLSearchParams$3
} = nodeUrl;
const {
  promisify: promisify$1
} = nodeUtil;
const debug$4 = createDebug('vk-io:auth:implicit-flow');
const {
  PAGE_BLOCKED,
  INVALID_PHONE_NUMBER: INVALID_PHONE_NUMBER$2,
  AUTHORIZATION_FAILED: AUTHORIZATION_FAILED$2,
  FAILED_PASSED_CAPTCHA: FAILED_PASSED_CAPTCHA$2,
  MISSING_CAPTCHA_HANDLER: MISSING_CAPTCHA_HANDLER$2,
  FAILED_PASSED_TWO_FACTOR: FAILED_PASSED_TWO_FACTOR$2,
  MISSING_TWO_FACTOR_HANDLER: MISSING_TWO_FACTOR_HANDLER$2
} = authErrors;
const ACTION_BLOCKED = 'act=blocked';
const ACTION_AUTH_CODE$1 = 'act=authcheck';
const ACTION_SECURITY_CODE$2 = 'act=security';
const TWO_FACTOR_ATTEMPTS$2 = 3;
const CAPTCHA_ATTEMPTS$1 = 3;
class ImplicitFlow {
  constructor(vk, {
    app = vk.options.app,
    key = vk.options.key,
    agent = vk.options.agent,
    scope = vk.options.scope,
    login = vk.options.login,
    phone = vk.options.phone,
    password = vk.options.password
  } = {}) {
    this.vk = vk;
    this.app = app;
    this.key = key;
    this.agent = agent;
    this.scope = scope;
    this.login = login;
    this.phone = phone;
    this.password = password;
    this.jar = new CookieJar();
    this.started = false;
    this.captcha = null;
    this.captchaAttempts = 0;
    this.twoFactorAttempts = 0;
  }

  get [Symbol.toStringTag]() {
    return this.constructor.name;
  }

  getCookieJar() {
    return this.jar;
  }

  setCookieJar(jar) {
    this.jar = jar;
    return this;
  }

  async getCookie() {
    const {
      jar
    } = this;
    const getCookieString = promisify$1(jar.getCookieString).bind(jar);
    const [login, main] = await Promise.all([getCookieString('https://login.vk.com'), getCookieString('https://vk.com')]);
    return {
      'login.vk.com': login,
      'vk.com': main
    };
  }

  fetch(url, options = {}) {
    const {
      agent
    } = this;
    const {
      headers = {}
    } = options;
    return this.fetchCookie(url, _objectSpread({}, options, {
      agent,
      compress: false,
      headers: _objectSpread({}, headers, {
        'User-Agent': DESKTOP_USER_AGENT
      })
    }));
  }

  async run() {
    if (this.started) {
      throw new AuthError({
        message: 'Authorization already started!',
        code: AUTHORIZATION_FAILED$2
      });
    }

    this.started = true;
    this.fetchCookie = fetchCookieFollowRedirectsDecorator(this.jar);
    debug$4('get permissions page');
    let response = await this.getPermissionsPage();
    const isProcessed = true;

    while (isProcessed) {
      const {
        url
      } = response;
      debug$4('URL', url);

      if (url.includes(CALLBACK_BLANK)) {
        return {
          response
        };
      }

      if (url.includes(ACTION_BLOCKED)) {
        debug$4('page blocked');
        throw new AuthError({
          message: 'Page blocked',
          code: PAGE_BLOCKED
        });
      }

      const $ = cheerioLoad$2((await response.text()));

      if (url.includes(ACTION_AUTH_CODE$1)) {
        response = await this.processTwoFactorForm(response, $);
        continue;
      }

      if (url.includes(ACTION_SECURITY_CODE$2)) {
        response = await this.processSecurityForm(response, $);
        continue;
      }

      const $error = $('.box_error');
      const $service = $('.service_msg_warning');
      const isError = $error.length !== 0;

      if (this.captcha === null && (isError || $service.length !== 0)) {
        const errorText = isError ? $error.text() : $service.text();
        throw new AuthError({
          message: `Auth form error: ${errorText}`,
          code: AUTHORIZATION_FAILED$2,
          pageHtml: $.html()
        });
      }

      if (this.captcha !== null) {
        this.captcha.reject(new AuthError({
          message: 'Incorrect captcha code',
          code: FAILED_PASSED_CAPTCHA$2,
          pageHtml: $.html()
        }));
        this.captcha = null;
        this.captchaAttempts += 1;
      }

      if (this.captchaAttempts > CAPTCHA_ATTEMPTS$1) {
        throw new AuthError({
          message: 'Maximum attempts passage captcha',
          code: FAILED_PASSED_CAPTCHA$2
        });
      }

      if ($('input[name="pass"]').length !== 0) {
        debug$4('authorization form');
        response = await this.processAuthForm(response, $);
        continue;
      }

      if (url.includes('act=')) {
        throw new AuthError({
          message: 'Unsupported authorization event',
          code: AUTHORIZATION_FAILED$2,
          pageHtml: $.html()
        });
      }

      debug$4('auth with login & pass complete');

      if ($('form').length !== 0) {
        const {
          action
        } = parseFormField($);
        debug$4('url grant access', action);
        response = await this.fetch(action, {
          method: 'POST'
        });
      } else {
        const script = $('script[type="text/javascript"][language="javascript"]').text();
        const locations = script.match(/location\.href\s+=\s+"([^"]+)"/i);

        if (locations === null) {
          throw new AuthError({
            message: 'Could not log in',
            code: AUTHORIZATION_FAILED$2
          });
        }

        const location = locations[1].replace('&cancel=1', '');
        debug$4('url grant access', location);
        response = await this.fetch(location, {
          method: 'POST'
        });
      }
    }
  }

  async processAuthForm(response, $) {
    debug$4('process login handle');
    const {
      login,
      password,
      phone
    } = this;
    const {
      action,
      fields
    } = parseFormField($);
    fields.email = login || phone;
    fields.pass = password;

    if ('captcha_sid' in fields) {
      if (this.vk.captchaHandler === null) {
        throw new AuthError({
          message: 'Missing captcha handler',
          code: MISSING_CAPTCHA_HANDLER$2
        });
      }

      const src = $('.oauth_captcha').attr('src') || $('#captcha').attr('src');
      const payload = {
        type: captchaTypes.IMPLICIT_FLOW_AUTH,
        sid: fields.captcha_sid,
        src
      };
      await new Promise((resolveCaptcha, rejectCaptcha) => {
        this.vk.captchaHandler(payload, key => new Promise((resolve, reject) => {
          if (key instanceof Error) {
            rejectCaptcha(key);
            reject(key);
            return;
          }

          fields.captcha_key = key;
          this.captcha = {
            resolve,
            reject
          };
          resolveCaptcha();
        }));
      });
    }

    debug$4('Fields', fields);
    const url = new URL$4(action);
    url.searchParams.set('utf8', 1);
    return await this.fetch(url, {
      method: 'POST',
      body: new URLSearchParams$3(fields)
    });
  }

  async processTwoFactorForm(response, $) {
    debug$4('process two-factor handle');

    if (this.vk.twoFactorHandler === null) {
      throw new AuthError({
        message: 'Missing two-factor handler',
        code: MISSING_TWO_FACTOR_HANDLER$2
      });
    }

    let isProcessed = true;

    while (this.twoFactorAttempts < TWO_FACTOR_ATTEMPTS$2 && isProcessed) {
      await new Promise((resolve, reject) => {
        this.vk.twoFactorHandler({}, async code => {
          const {
            action,
            fields
          } = parseFormField($);
          fields.code = code;

          try {
            const url = getFullURL(action, response);
            response = await this.fetch(url, {
              method: 'POST',
              body: new URLSearchParams$3(fields)
            });
          } catch (error) {
            reject(error);
            throw error;
          }

          if (response.url.includes(ACTION_AUTH_CODE$1)) {
            resolve();
            throw new AuthError({
              message: 'Incorrect two-factor code',
              code: FAILED_PASSED_TWO_FACTOR$2,
              pageHtml: $.html()
            });
          }

          isProcessed = false;
          resolve();
        });
      });
      this.twoFactorAttempts += 1;
    }

    if (this.twoFactorAttempts >= TWO_FACTOR_ATTEMPTS$2 && isProcessed) {
      throw new AuthError({
        message: 'Failed passed two-factor authentication',
        code: FAILED_PASSED_TWO_FACTOR$2
      });
    }

    return response;
  }

  async processSecurityForm(response, $) {
    debug$4('process security form');
    const {
      login,
      phone
    } = this;
    let number;

    if (phone !== null) {
      number = phone;
    } else if (login !== null && !login.includes('@')) {
      number = login;
    } else {
      throw new AuthError({
        message: 'Missing phone number in the phone or login field',
        code: INVALID_PHONE_NUMBER$2,
        pageHtml: $.html()
      });
    }

    if (typeof number === 'string') {
      number = number.trim().replace(/^(\+|00)/, '');
    }

    number = String(number);
    const $field = $('.field_prefix');
    const prefix = $field.first().text().trim().replace('+', '').length;
    const postfix = $field.last().text().trim().length;
    const {
      action,
      fields
    } = parseFormField($);
    fields.code = number.slice(prefix, number.length - postfix);
    const url = getFullURL(action, response);
    response = await this.fetch(url, {
      method: 'POST',
      body: new URLSearchParams$3(fields)
    });

    if (response.url.includes(ACTION_SECURITY_CODE$2)) {
      throw new AuthError({
        message: 'Invalid phone number',
        code: INVALID_PHONE_NUMBER$2,
        pageHtml: $.html()
      });
    }

    return response;
  }

}

const {
  URL: URL$5,
  URLSearchParams: URLSearchParams$4
} = nodeUrl;
const debug$5 = createDebug('vk-io:auth:implicit-flow-user');
const {
  AUTHORIZATION_FAILED: AUTHORIZATION_FAILED$3
} = authErrors;
class ImplicitFlowUser extends ImplicitFlow {
  getPermissionsPage() {
    const {
      app
    } = this;
    let {
      scope
    } = this;

    if (scope === 'all' || scope === null) {
      scope = getAllUsersPermissions();
    } else if (typeof scope !== 'number') {
      scope = getUsersPermissionsByName(scope);
    }

    debug$5('auth scope %s', scope);
    const params = new URLSearchParams$4({
      redirect_uri: CALLBACK_BLANK,
      response_type: 'token',
      display: 'page',
      v: API_VERSION,
      client_id: app,
      scope
    });
    const url = new URL$5(`https://oauth.vk.com/authorize?${params}`);
    return this.fetch(url, {
      method: 'GET'
    });
  }

  async run() {
    const {
      response
    } = await super.run();
    let {
      hash
    } = new URL$5(response.url);

    if (hash.startsWith('#')) {
      hash = hash.substring(1);
    }

    const params = new URLSearchParams$4(hash);

    if (params.has('error')) {
      throw new AuthError({
        message: `Failed passed grant access: ${params.get('error_description') || 'Unknown error'}`,
        code: AUTHORIZATION_FAILED$3
      });
    }

    const user = params.get('user_id');
    const expires = params.get('expires_in');
    return {
      email: params.get('email'),
      user: user !== null ? Number(user) : null,
      token: params.get('access_token'),
      expires: expires !== null ? Number(expires) : null
    };
  }

}

const {
  URL: URL$6,
  URLSearchParams: URLSearchParams$5
} = nodeUrl;
const debug$6 = createDebug('vk-io:auth:implicit-flow-user');
const {
  AUTHORIZATION_FAILED: AUTHORIZATION_FAILED$4
} = authErrors;
class ImplicitFlowGroups extends ImplicitFlow {
  constructor(vk, options) {
    super(vk, options);
    let {
      groups = null
    } = options;

    if (groups === null) {
      throw new VKError({
        message: 'Groups list must have'
      });
    }

    if (!Array.isArray(groups)) {
      groups = [groups];
    }

    this.groups = groups.map(group => {
      if (typeof group !== 'number') {
        group = Number(group);
      }

      if (group < 0) {
        group = -group;
      }

      return group;
    });
  }

  getPermissionsPage() {
    const {
      app
    } = this;
    let {
      scope
    } = this;

    if (scope === 'all' || scope === null) {
      scope = getAllGroupsPermissions();
    } else if (typeof scope !== 'number') {
      scope = getGroupsPermissionsByName(scope);
    }

    debug$6('auth scope %s', scope);
    const params = new URLSearchParams$5({
      group_ids: this.groups.join(','),
      redirect_uri: CALLBACK_BLANK,
      response_type: 'token',
      display: 'page',
      v: API_VERSION,
      client_id: app,
      scope
    });
    const url = new URL$6(`https://oauth.vk.com/authorize?${params}`);
    return this.fetch(url, {
      method: 'GET'
    });
  }

  async run() {
    const {
      response
    } = await super.run();
    let {
      hash
    } = new URL$6(response.url);

    if (hash.startsWith('#')) {
      hash = hash.substring(1);
    }

    const params = new URLSearchParams$5(hash);

    if (params.has('error')) {
      throw new AuthError({
        message: `Failed passed grant access: ${params.get('error_description') || 'Unknown error'}`,
        code: AUTHORIZATION_FAILED$4
      });
    }

    let expires = params.get('expires_in');

    if (expires !== null) {
      expires = Number(expires);
    }

    const tokens = [];

    for (const [name, value] of params) {
      if (!name.startsWith('access_token_')) {
        continue;
      }

      const [,, group] = name.split('_');
      tokens.push({
        group: Number(group),
        token: value,
        expires
      });
    }

    return tokens;
  }

}

const {
  inspect: inspect$2
} = nodeUtil;
const {
  createHash
} = nodeCrypto;
const openAPIParams = ['expire', 'secret', 'mid', 'sid', 'sig'];
class Auth {
  constructor(vk) {
    this.vk = vk;
  }

  get [Symbol.toStringTag]() {
    return 'Auth';
  }

  implicitFlowUser(options = {}) {
    return new ImplicitFlowUser(this.vk, options);
  }

  implicitFlowGroups(groups, options = {}) {
    return new ImplicitFlowGroups(this.vk, _objectSpread({}, options, {
      groups
    }));
  }

  direct() {
    const {
      app,
      key
    } = this.vk.options;
    return new DirectAuth(this.vk, {
      app,
      key
    });
  }

  androidApp() {
    return new DirectAuth(this.vk, {
      app: 2274003,
      key: 'hHbZxrka2uZ6jB1inYsH'
    });
  }

  windowsApp() {
    return new DirectAuth(this.vk, {
      app: 3697615,
      key: 'AlVXZFMUqyrnABp8ncuU'
    });
  }

  windowsPhoneApp() {
    return new DirectAuth(this.vk, {
      app: 3502557,
      key: 'PEObAuQi6KloPM4T30DV'
    });
  }

  iphoneApp() {
    return new DirectAuth(this.vk, {
      app: 3140623,
      key: 'VeWdmVclDCtn6ihuP1nt'
    });
  }

  ipadApp() {
    return new DirectAuth(this.vk, {
      app: 3682744,
      key: 'mY6CDUswIVdJLCD3j15n'
    });
  }

  async userAuthorizedThroughOpenAPI(params) {
    const paramsKeys = Object.keys(params).filter(key => openAPIParams.includes(key)).sort();
    let sign = '';

    for (const key of paramsKeys) {
      if (key !== 'sig') {
        sign += `${key}=${params[key]}`;
      }
    }

    sign += this.vk.options.key;
    sign = createHash('md5').update(sign).digest('hex');
    let authorized = false;
    const isNotExpire = params.expire > Date.now() / 1000;

    if (params.sig === sign && isNotExpire) {
      authorized = true;
    }

    return {
      authorized
    };
  }

  [inspect$2.custom](depth, options) {
    const {
      name
    } = this.constructor;
    return `${options.stylize(name, 'special')} {}`;
  }

}

const {
  Stream
} = nodeStream;
const isStream = source => typeof source === 'object' && source instanceof Stream;
const copyParams = (params, properties) => {
  const copies = {};

  for (const property of properties) {
    if (property in params) {
      copies[property] = params[property];
    }
  }

  return copies;
};

const {
  PassThrough
} = nodeStream;
const {
  SandwichStream
} = sandwichStream;
const CRNL = '\r\n';
class MultipartStream extends SandwichStream {
  constructor(boundary) {
    super({
      head: `--${boundary}${CRNL}`,
      tail: `${CRNL}--${boundary}--`,
      separator: `${CRNL}--${boundary}${CRNL}`
    });
    this.boundary = boundary;
  }

  get [Symbol.toStringTag]() {
    return 'MultipartStream';
  }

  getBoundary() {
    return this.boundary;
  }

  addPart(part = {}) {
    const partStream = new PassThrough();

    if ('headers' in part) {
      for (const [key, header] of Object.entries(part.headers)) {
        partStream.write(`${key}:${header}${CRNL}`);
      }
    }

    partStream.write(CRNL);

    if (isStream(part.body)) {
      part.body.pipe(partStream);
    } else {
      partStream.end(part.body);
    }

    this.add(partStream);
  }

  append(field, body, {
    filename = null,
    headers = {}
  }) {
    let header = `form-data; name="${field}"`;

    if (filename !== null) {
      header += `; filename="${filename}"`;
    }

    return this.addPart({
      headers: _objectSpread({}, headers, {
        'Content-Disposition': header
      }),
      body
    });
  }

}

const {
  inspect: inspect$3
} = nodeUtil;
class Attachment {
  constructor(type, ownerId, id, accessKey = null) {
    this.type = type;
    this.ownerId = Number(ownerId);
    this.id = Number(id);
    this.accessKey = accessKey;
    this.$filled = false;
  }

  get [Symbol.toStringTag]() {
    return this.constructor.name;
  }

  static fromString(attachment) {
    if (!parseAttachment.test(attachment)) {
      throw new VKError({
        message: 'Incorrect attachment'
      });
    }

    const [, type, ownerId, id, accessKey] = attachment.match(parseAttachment);
    return new Attachment(type, ownerId, id, accessKey);
  }

  get isFilled() {
    return this.$filled;
  }

  equals(attachment) {
    const source = String(this);
    const target = String(attachment);

    if (!parseAttachment.test(target)) {
      throw new VKError({
        message: 'Incorrect attachment'
      });
    }

    return target.startsWith(source);
  }

  toString() {
    const accessKey = this.accessKey !== null ? `_${this.accessKey}` : '';
    return `${this.type}${this.ownerId}_${this.id}${accessKey}`;
  }

  [inspect$3.custom](depth, options) {
    const {
      name
    } = this.constructor;
    const payload = this.$filled ? ` ${inspect$3(this.payload, options)} ` : '';
    return `${options.stylize(name, 'special')} { ${options.stylize(this, 'string')} ${payload}}`;
  }

}

const {
  inspect: inspect$4
} = nodeUtil;
class ExternalAttachment {
  constructor(type, payload) {
    this.type = type;
    this.payload = payload;
    this.$filled = false;
  }

  get [Symbol.toStringTag]() {
    return this.constructor.name;
  }

  get isFilled() {
    return this.$filled;
  }

  [inspect$4.custom](depth, options) {
    const {
      name
    } = this.constructor;
    const payload = this.$filled ? ` ${inspect$4(this.payload, options)} ` : '';
    return `${options.stylize(name, 'special')} { ${options.stylize(this, 'string')} ${payload}}`;
  }

}

const {
  GIFT
} = attachmentTypes;
class GiftAttachment extends ExternalAttachment {
  constructor(payload, vk) {
    super(GIFT, payload);
    this.vk = vk;
  }

  get id() {
    return this.payload.id;
  }

}

const attachmentsTypes = {
  gift: () => GiftAttachment,
  wall: () => WallAttachment,
  link: () => LinkAttachment,
  photo: () => PhotoAttachment,
  audio: () => AudioAttachment,
  video: () => VideoAttachment,
  doc: () => DocumentAttachment,
  market: () => MarketAttachment,
  sticker: () => StickerAttachment,
  wall_reply: () => WallReplyAttachment,
  market_album: () => MarketAlbumAttachment
};
const transformAttachments = (attachments = [], vk) => attachments.map(item => {
  const {
    type
  } = item;
  const attachment = attachmentsTypes[type];
  return attachment ? new (attachment())(item[type], vk) : false;
}).filter(Boolean);

const {
  WALL
} = attachmentTypes;
class WallAttachment extends Attachment {
  constructor(payload, vk) {
    super(WALL, payload.owner_id, payload.id, payload.access_key);
    this.vk = vk;
    this.payload = payload;
    this.attachments = transformAttachments(payload.attachments);
    this.$filled = 'date' in payload;
  }

  async loadAttachmentPayload() {
    if (this.$filled) {
      return;
    }

    const [post] = await this.vk.api.wall.getById({
      posts: `${this.ownerId}_${this.id}`,
      extended: 0
    });
    this.payload = post;

    if ('access_key' in this.payload) {
      this.accessKey = this.payload.access_key;
    }

    this.$filled = true;
  }

  get hasComments() {
    if (!this.$filled) {
      return null;
    }

    return this.payload.comments.count > 0;
  }

  get hasAds() {
    if (!this.$filled) {
      return null;
    }

    return Boolean(this.payload.marked_as_ads);
  }

  hasAttachments(type = null) {
    if (type === null) {
      return this.attachments.length > 0;
    }

    return this.attachments.some(attachment => attachment.getType() === type);
  }

  get hasUserReposted() {
    if (!this.$filled) {
      return null;
    }

    return Boolean(this.payload.reposts.user_reposted);
  }

  get hasUserLike() {
    if (!this.$filled) {
      return null;
    }

    return Boolean(this.payload.user_likes);
  }

  get isCanUserCommented() {
    if (!this.$filled) {
      return null;
    }

    return Boolean(this.payload.comments.can_post);
  }

  get isCanGroupsCommented() {
    if (!this.$filled) {
      return null;
    }

    return Boolean(this.payload.comments.groups_can_post);
  }

  get isCanCommented() {
    return this.isCanUserCommented() || this.isCanGroupsCommented();
  }

  get isCanLike() {
    if (!this.$filled) {
      return null;
    }

    return Boolean(this.payload.likes.can_like);
  }

  get isCanReposted() {
    if (!this.$filled) {
      return null;
    }

    return Boolean(this.payload.likes.can_publish);
  }

  get isCanPin() {
    if (!this.$filled) {
      return null;
    }

    return Boolean(this.payload.can_pin);
  }

  get isCanDelete() {
    if (!this.$filled) {
      return null;
    }

    return Boolean(this.payload.can_delete);
  }

  get isCanEdit() {
    if (!this.$filled) {
      return null;
    }

    return Boolean(this.payload.can_edit);
  }

  get isPinned() {
    if (!this.$filled) {
      return null;
    }

    return Boolean(this.payload.is_pinned);
  }

  get isFriendsOnly() {
    if (!this.$filled) {
      return null;
    }

    return Boolean(this.payload.friends_only);
  }

  get date() {
    return this.payload.date || null;
  }

  get authorId() {
    return this.payload.from_id || null;
  }

  get postType() {
    return this.payload.post_type || null;
  }

  get text() {
    return this.payload.text || null;
  }

  get createdUserId() {
    return this.payload.created_by || null;
  }

  get replyOwnerId() {
    return this.payload.reply_owner_id || null;
  }

  get replyPostId() {
    return this.payload.reply_post_id || null;
  }

  get signerId() {
    return this.payload.signer_id || null;
  }

  get viewsCount() {
    if (!this.$filled) {
      return null;
    }

    return this.payload.views.count;
  }

  get geo() {
    return this.payload.geo || null;
  }

  get likes() {
    return this.payload.likes || null;
  }

  get likesCount() {
    if (!this.$filled) {
      return null;
    }

    return this.payload.likes.count;
  }

  get repostsCount() {
    if (!this.$filled) {
      return null;
    }

    return this.payload.reposts.count;
  }

  get postSource() {
    return this.payload.post_source || null;
  }

  getAttachments(type = null) {
    if (type === null) {
      return this.attachments;
    }

    return this.attachments.filter(attachment => attachment.getType() === type);
  }

}

const {
  LINK
} = attachmentTypes;
class LinkAttachment extends ExternalAttachment {
  constructor(payload, vk) {
    super(LINK, payload);
    this.vk = vk;
  }

  get url() {
    return this.payload.url;
  }

  get title() {
    return this.payload.title;
  }

  get description() {
    return this.payload.description;
  }

}

const {
  PHOTO
} = attachmentTypes;
const SMALL_SIZES = ['m', 's'];
const MEDIUM_SIZES = ['y', 'r', 'q', 'p', ...SMALL_SIZES];
const LARGE_SIZES = ['w', 'z', ...MEDIUM_SIZES];
class PhotoAttachment extends Attachment {
  constructor(payload, vk) {
    super(PHOTO, payload.owner_id, payload.id, payload.access_key);
    this.vk = vk;
    this.payload = payload;
    this.$filled = 'album_id' in payload && 'date' in payload;
  }

  async loadAttachmentPayload() {
    if (this.$filled) {
      return;
    }

    const [photo] = await this.vk.api.photos.getById({
      photos: `${this.ownerId}_${this.id}`,
      extended: 0
    });
    this.payload = photo;

    if ('access_key' in this.payload) {
      this.accessKey = this.payload.access_key;
    }

    this.$filled = true;
  }

  get userId() {
    return this.payload.user_id || null;
  }

  get albumId() {
    return this.payload.album_id || null;
  }

  get text() {
    return this.payload.text || null;
  }

  get date() {
    return this.payload.date || null;
  }

  get height() {
    return this.payload.height || null;
  }

  get width() {
    return this.payload.width || null;
  }

  get sizes() {
    return this.payload.sizes || null;
  }

  get smallPhoto() {
    if (!this.$filled) {
      return null;
    }

    const [size] = this.getSizes(SMALL_SIZES);
    return size.url;
  }

  get mediumPhoto() {
    if (!this.$filled) {
      return null;
    }

    const [size] = this.getSizes(MEDIUM_SIZES);
    return size.url;
  }

  get largePhoto() {
    if (!this.$filled) {
      return null;
    }

    const [size] = this.getSizes(LARGE_SIZES);
    return size.url;
  }

  getSizes(sizeTypes) {
    const {
      sizes
    } = this;
    return sizeTypes.map(sizeType => sizes.find(size => size.type === sizeType) || null).filter(Boolean);
  }

}

const {
  AUDIO
} = attachmentTypes;
class AudioAttachment extends Attachment {
  constructor(payload, vk) {
    super(AUDIO, payload.owner_id, payload.id, payload.access_key);
    this.vk = vk;
    this.payload = payload;
    this.$filled = 'duration' in payload && 'date' in payload;
  }

  async loadAttachmentPayload() {
    if (this.$filled) {
      return;
    }

    const [audio] = await this.vk.api.audio.getById({
      audios: `${this.ownerId}_${this.id}`
    });
    this.payload = audio;

    if ('access_key' in this.payload) {
      this.accessKey = this.payload.access_key;
    }

    this.$filled = true;
  }

  get isHq() {
    const {
      is_hq: isHq
    } = this.payload;

    if (!isHq) {
      return null;
    }

    return isHq === 1;
  }

  get artist() {
    return this.payload.artist || null;
  }

  get title() {
    return this.payload.title || null;
  }

  get duration() {
    return this.payload.duration || null;
  }

  get date() {
    return this.payload.date || null;
  }

  get url() {
    return this.payload.url || null;
  }

  get lyricsId() {
    return this.payload.lyrics_id || null;
  }

  get albumId() {
    return this.payload.album_id || null;
  }

  get genreId() {
    return this.payload.album_id || null;
  }

}

const {
  VIDEO
} = attachmentTypes;
class VideoAttachment extends Attachment {
  constructor(payload, vk) {
    super(VIDEO, payload.owner_id, payload.id, payload.access_key);
    this.vk = vk;
    this.payload = payload;
    this.$filled = 'date' in payload;
  }

  async loadAttachmentPayload() {
    if (this.$filled) {
      return;
    }

    const {
      items
    } = await this.vk.api.video.get({
      videos: `${this.ownerId}_${this.id}`,
      extended: 0
    });
    const [video] = items;
    this.payload = video;

    if ('access_key' in this.payload) {
      this.accessKey = this.payload.access_key;
    }

    this.$filled = true;
  }

  get isRepeat() {
    return this.checkBooleanInProperty('repeat');
  }

  get isCanAdd() {
    return this.checkBooleanInProperty('can_add');
  }

  get isCanEdit() {
    return this.checkBooleanInProperty('can_edit');
  }

  get isProcessing() {
    return this.checkBooleanInProperty('processing');
  }

  get isBroadcast() {
    return this.checkBooleanInProperty('live');
  }

  get isUpcoming() {
    return this.checkBooleanInProperty('upcoming');
  }

  get title() {
    return this.payload.title || null;
  }

  get description() {
    return this.payload.description || null;
  }

  get duration() {
    return this.payload.duration || null;
  }

  get date() {
    return this.payload.date || null;
  }

  get addingDate() {
    return this.payload.adding_date || null;
  }

  get viewsCount() {
    return this.payload.views || null;
  }

  get commentsCount() {
    return this.payload.comments || null;
  }

  get player() {
    return this.payload.player || null;
  }

  get platformName() {
    return this.payload.platform || null;
  }

  checkBooleanInProperty(name) {
    const property = this.payload[name];

    if (typeof property !== 'number') {
      return null;
    }

    return property === 1;
  }

}

const {
  MARKET
} = attachmentTypes;
class MarketAttachment extends Attachment {
  constructor(payload, vk) {
    super(MARKET, payload.owner_id, payload.id, payload.access_key);
    this.vk = vk;
    this.payload = payload;
    this.$filled = 'title' in payload && 'date' in payload;
  }

  async loadAttachmentPayload() {
    if (this.$filled) {
      return;
    }

    const [market] = await this.vk.api.market.getById({
      item_ids: `${this.ownerId}_${this.id}`,
      extended: 0
    });
    this.payload = market;

    if ('access_key' in this.payload) {
      this.accessKey = this.payload.access_key;
    }

    this.$filled = true;
  }

}

const {
  STICKER
} = attachmentTypes;
class StickerAttachment extends ExternalAttachment {
  constructor(payload, vk) {
    super(STICKER, payload);
    this.vk = vk;
  }

  get id() {
    return this.payload.sticker_id;
  }

  get productId() {
    return this.payload.product_id;
  }

}

const {
  DOCUMENT
} = attachmentTypes;
const documentTypes = new Map([[1, 'text'], [2, 'archive'], [3, 'gif'], [4, 'image'], [5, 'audio'], [6, 'video'], [7, 'book'], [8, 'unknown']]);
class DocumentAttachment extends Attachment {
  constructor(payload, vk) {
    super(DOCUMENT, payload.owner_id, payload.id, payload.access_key);
    this.vk = vk;
    this.payload = payload;
    this.$filled = 'ext' in payload && 'date' in payload;
  }

  async loadAttachmentPayload() {
    if (this.$filled) {
      return;
    }

    const [document] = await this.vk.api.docs.getById({
      docs: `${this.ownerId}_${this.id}`
    });
    this.payload = document;

    if ('access_key' in this.payload) {
      this.accessKey = this.payload.access_key;
    }

    this.$filled = true;
  }

  get isText() {
    if (!this.$filled) {
      return null;
    }

    return this.typeId === 1;
  }

  get isArchive() {
    if (!this.$filled) {
      return null;
    }

    return this.typeId === 2;
  }

  get isGif() {
    if (!this.$filled) {
      return null;
    }

    return this.typeId === 3;
  }

  get isImage() {
    if (!this.$filled) {
      return null;
    }

    return this.typeId === 4;
  }

  get isGraffiti() {
    if (!this.$filled) {
      return null;
    }

    return this.hasPreviewProperty('graffiti');
  }

  get isAudio() {
    if (!this.$filled) {
      return null;
    }

    return this.typeId === 5;
  }

  get isVoice() {
    if (!this.$filled) {
      return null;
    }

    return this.hasPreviewProperty('audio_msg');
  }

  get isVideo() {
    if (!this.$filled) {
      return null;
    }

    return this.typeId === 6;
  }

  get isBook() {
    if (!this.$filled) {
      return null;
    }

    return this.typeId === 7;
  }

  get title() {
    return this.payload.title || null;
  }

  get date() {
    return this.payload.date || null;
  }

  get typeId() {
    return this.payload.type || null;
  }

  get typeName() {
    if (!this.$filled) {
      return null;
    }

    return documentTypes.get(this.typeId);
  }

  get size() {
    return this.payload.size || null;
  }

  get extension() {
    return this.payload.ext || null;
  }

  get url() {
    return this.payload.url || null;
  }

  get preview() {
    return this.payload.preview || null;
  }

  hasPreviewProperty(name) {
    const {
      preview
    } = this;

    if (preview === null) {
      return false;
    }

    return name in preview;
  }

}

const {
  WALL_REPLY
} = attachmentTypes;
class WallReplyAttachment extends ExternalAttachment {
  constructor(payload, vk) {
    super(WALL_REPLY, payload);
    this.vk = vk;
  }

}

const {
  MARKET_ALBUM
} = attachmentTypes;
class MarketAlbumAttachment extends Attachment {
  constructor(payload, vk) {
    super(MARKET_ALBUM, payload.owner_id, payload.id, payload.access_key);
    this.vk = vk;
    this.payload = payload;
    this.$filled = 'title' in payload && 'updated_time' in payload;
  }

  async loadAttachmentPayload() {
    if (this.$filled) {
      return;
    }

    const [album] = await this.vk.api.market.getAlbumById({
      owner_id: this.ownerId,
      album_ids: this.id
    });
    this.payload = album;

    if ('access_key' in this.payload) {
      this.accessKey = this.payload.access_key;
    }

    this.$filled = true;
  }

}

const {
  createReadStream
} = nodeFs;
const {
  randomBytes
} = nodeCrypto;
const {
  inspect: inspect$5
} = nodeUtil;
const {
  NO_FILES_TO_UPLOAD,
  EXCEEDED_MAX_FILES,
  UNSUPPORTED_SOURCE_TYPE
} = uploadErrors;
const isURL = /^https?:\/\//i;
class Upload {
  constructor(vk) {
    this.vk = vk;
  }

  get [Symbol.toStringTag]() {
    return 'Upload';
  }

  async photoAlbum(params) {
    const photos = await this.conduct({
      field: 'file',
      params,
      getServer: this.vk.api.photos.getUploadServer,
      serverParams: ['album_id', 'group_id'],
      saveFiles: this.vk.api.photos.save,
      saveParams: ['album_id', 'group_id', 'latitude', 'longitude', 'caption'],
      maxFiles: 5,
      attachmentType: 'photo'
    });
    return photos.map(photo => new PhotoAttachment(photo, this.vk));
  }

  async wallPhoto(params) {
    const [photo] = await this.conduct({
      field: 'photo',
      params,
      getServer: this.vk.api.photos.getWallUploadServer,
      serverParams: ['group_id'],
      saveFiles: this.vk.api.photos.saveWallPhoto,
      saveParams: ['user_id', 'group_id', 'latitude', 'longitude', 'caption'],
      maxFiles: 1,
      attachmentType: 'photo'
    });
    return new PhotoAttachment(photo, this.vk);
  }

  ownerPhoto(params) {
    return this.conduct({
      field: 'photo',
      params,
      getServer: this.vk.api.photos.getOwnerPhotoUploadServer,
      serverParams: ['owner_id'],
      saveFiles: this.vk.api.photos.saveOwnerPhoto,
      maxFiles: 1,
      attachmentType: 'photo'
    });
  }

  async messagePhoto(params) {
    const [photo] = await this.conduct({
      field: 'photo',
      params,
      getServer: this.vk.api.photos.getMessagesUploadServer,
      serverParams: ['peer_id'],
      saveFiles: this.vk.api.photos.saveMessagesPhoto,
      maxFiles: 1,
      attachmentType: 'photo'
    });
    return new PhotoAttachment(photo, this.vk);
  }

  chatPhoto(params) {
    return this.conduct({
      field: 'file',
      params,
      getServer: this.vk.api.photos.getChatUploadServer,
      serverParams: ['chat_id', 'crop_x', 'crop_y', 'crop_width'],
      saveFiles: file => this.vk.api.messages.setChatPhoto({
        file
      }),
      maxFiles: 1,
      attachmentType: 'photo'
    });
  }

  async marketPhoto(params) {
    const [photo] = await this.conduct({
      field: 'file',
      params,
      getServer: this.vk.api.photos.getMarketUploadServer,
      serverParams: ['group_id', 'main_photo', 'crop_x', 'crop_y', 'crop_width'],
      saveFiles: this.vk.api.photos.saveMarketPhoto,
      saveParams: ['group_id'],
      maxFiles: 1,
      attachmentType: 'photo'
    });
    return new PhotoAttachment(photo, this.vk);
  }

  async marketAlbumPhoto(params) {
    const [photo] = await this.conduct({
      field: 'file',
      params,
      getServer: this.vk.api.photos.getMarketAlbumUploadServer,
      serverParams: ['group_id'],
      saveFiles: this.vk.api.photos.saveMarketAlbumPhoto,
      saveParams: ['group_id'],
      maxFiles: 1,
      attachmentType: 'photo'
    });
    return new PhotoAttachment(photo, this.vk);
  }

  async audio(params) {
    const audio = await this.conduct({
      field: 'file',
      params,
      getServer: this.vk.api.audio.getUploadServer,
      saveFiles: this.vk.api.audio.save,
      saveParams: ['title', 'artist'],
      maxFiles: 1,
      attachmentType: 'audio'
    });
    return new AudioAttachment(audio, this.vk);
  }

  async video(params) {
    const save = await this.vk.api.video.save(copyParams(params, ['group_id', 'album_id', 'name', 'description', 'link', 'is_private', 'wallpost', 'privacy_view', 'privacy_comment', 'no_comments', 'repeat']));
    save.id = save.video_id;

    if ('link' in params) {
      const response = await fetch(save.upload_url, {
        agent: this.vk.options.agent
      });
      await response.json();
      return new VideoAttachment(save, this.vk);
    }

    if (!Array.isArray(params.source)) {
      params.source = [params.source];
    }

    const formData = await this.buildPayload({
      maxFiles: 1,
      field: 'video_file',
      attachmentType: 'video',
      sources: params.source
    });
    const video = await this.upload(save.upload_url, formData);
    return new VideoAttachment(_objectSpread({}, save, video), this.vk);
  }

  async document(params, {
    attachmentType = null
  } = {}) {
    const [document] = await this.conduct({
      field: 'file',
      params,
      getServer: this.vk.api.docs.getUploadServer,
      serverParams: ['type', 'group_id'],
      saveFiles: this.vk.api.docs.save,
      saveParams: ['title', 'tags'],
      maxFiles: 1,
      attachmentType: attachmentType || 'doc'
    });
    return new DocumentAttachment(document, this.vk);
  }

  async wallDocument(params, {
    attachmentType = null
  } = {}) {
    const [document] = await this.conduct({
      field: 'file',
      params,
      getServer: this.vk.api.docs.getWallUploadServer,
      serverParams: ['type', 'group_id'],
      saveFiles: this.vk.api.docs.save,
      saveParams: ['title', 'tags'],
      maxFiles: 1,
      attachmentType: attachmentType || 'doc'
    });
    return new DocumentAttachment(document, this.vk);
  }

  async messageDocument(params, {
    attachmentType = null
  } = {}) {
    const [document] = await this.conduct({
      field: 'file',
      params,
      getServer: this.vk.api.docs.getMessagesUploadServer,
      serverParams: ['type', 'peer_id'],
      saveFiles: this.vk.api.docs.save,
      saveParams: ['title', 'tags'],
      maxFiles: 1,
      attachmentType: attachmentType || 'doc'
    });
    return new DocumentAttachment(document, this.vk);
  }

  voice(params) {
    params.type = 'audio_message';
    return this.messageDocument(params, {
      attachmentType: 'voice'
    });
  }

  graffiti(params) {
    params.type = 'graffiti';
    return this.document(params, {
      attachmentType: 'graffiti'
    });
  }

  groupCover(params) {
    return this.conduct({
      field: 'photo',
      params,
      getServer: this.vk.api.photos.getOwnerCoverPhotoUploadServer,
      serverParams: ['group_id', 'crop_x', 'crop_y', 'crop_x2', 'crop_y2'],
      saveFiles: this.vk.api.photos.saveOwnerCoverPhoto,
      maxFiles: 1,
      attachmentType: 'photo'
    });
  }

  storiesPhoto(params) {
    return this.conduct({
      field: 'file',
      params,
      getServer: this.vk.api.stories.getPhotoUploadServer,
      serverParams: ['add_to_news', 'user_ids', 'reply_to_story', 'link_text', 'link_url', 'group_id'],
      saveFiles: save => save,
      maxFiles: 1,
      attachmentType: 'photo'
    });
  }

  storiesVideo(params) {
    return this.conduct({
      field: 'file',
      params,
      getServer: this.vk.api.stories.getVideoUploadServer,
      serverParams: ['add_to_news', 'user_ids', 'reply_to_story', 'link_text', 'link_url', 'group_id'],
      saveFiles: save => save,
      maxFiles: 1,
      attachmentType: 'video'
    });
  }

  async conduct({
    field,
    params,
    getServer,
    serverParams = [],
    saveFiles,
    saveParams = [],
    maxFiles = 1,
    attachmentType
  }) {
    if (!Array.isArray(params.source)) {
      params.source = [params.source];
    }

    params.source = params.source.filter(Boolean);

    if (params.source.length === 0) {
      throw new UploadError({
        message: 'No files to upload',
        code: NO_FILES_TO_UPLOAD
      });
    }

    if (params.source.length > maxFiles) {
      throw new UploadError({
        message: 'The number of files uploaded has exceeded',
        code: EXCEEDED_MAX_FILES
      });
    }

    if ('uploadUrl' in params) {
      getServer = () => ({
        upload_url: params.uploadUrl
      });
    }

    const [{
      upload_url: url
    }, formData] = await Promise.all([getServer(copyParams(params, serverParams)), this.buildPayload({
      field,
      maxFiles,
      attachmentType,
      sources: params.source
    })]);
    const uploaded = await this.upload(url, formData, params);

    if (typeof uploaded !== 'object') {
      return await saveFiles(uploaded);
    }

    return await saveFiles(_objectSpread({}, copyParams(params, saveParams), uploaded));
  }

  async buildPayload({
    field,
    sources,
    maxFiles,
    attachmentType
  }) {
    const boundary = randomBytes(32).toString('hex');
    const formData = new MultipartStream(boundary);
    const isMultipart = maxFiles > 1;
    const tasks = sources.map(source => {
      if (typeof source === 'object' && 'value' in source) {
        return source;
      }

      return {
        value: source
      };
    }).map(async ({
      value,
      filename,
      contentType = null
    }, i) => {
      if (typeof value === 'string') {
        if (isURL.test(value)) {
          const response = await fetch(value);
          value = response.body;
        } else {
          value = createReadStream(value);
        }
      }

      if (!filename) {
        filename = `file${i}.${defaultExtensions[attachmentType] || 'dat'}`;
      }

      if (isStream(value) || Buffer.isBuffer(value)) {
        const name = isMultipart ? field + (i + 1) : field;
        const headers = {};

        if (contentType !== null) {
          headers['Content-Type'] = contentType;
        } else if (attachmentType in defaultContentTypes) {
          headers['Content-Type'] = defaultContentTypes[attachmentType];
        }

        return formData.append(name, value, {
          filename,
          headers
        });
      }

      throw new UploadError({
        message: 'Unsupported source type',
        code: UNSUPPORTED_SOURCE_TYPE
      });
    });
    await Promise.all(tasks);
    return formData;
  }

  async upload(url, formData, {
    timeout
  } = {}) {
    const {
      agent,
      uploadTimeout
    } = this.vk.options;
    let response = await fetch(url, {
      agent,
      compress: false,
      method: 'POST',
      timeout: timeout || uploadTimeout,
      headers: {
        Connection: 'keep-alive',
        'Content-Type': `multipart/form-data; boundary=${formData.getBoundary()}`
      },
      body: formData
    });

    if (response.status !== 200) {
      throw new Error(response.statusText);
    }

    response = await response.json();

    if ('response' in response) {
      return response.response;
    }

    return response;
  }

  [inspect$5.custom](depth, options) {
    const {
      name
    } = this.constructor;
    return `${options.stylize(name, 'special')} {}`;
  }

}

const unespaceOffset = /"offset":"(\w+)"/g;
var getExecuteCode = (({
  method,
  params,
  parallelCount
}) => {
  const methodCode = getExecuteMethod(method, _objectSpread({}, params, {
    offset: 'offset'
  }));
  const code = `
		var total = parseInt(Args.total);
		var offset = parseInt(Args.offset);
		var received = parseInt(Args.received);

		var proceed = total == 0 || received < total;

		var i = 0, items = [], result, length;

		while (i < ${parallelCount} && proceed) {
			result = ${methodCode};
			length = result.items.length;

			if (total == 0 || total > result.count) {
				total = result.count;
			}

			items = items + result.items;

			offset = offset + length;
			received = received + length;

			proceed = received < total;
			i = i + 1;
		}

		return {
			total: total,
			items: items.splice(0, total)
		};
	`;
  return code.replace(unespaceOffset, '"offset":$1');
});

const {
  inspect: inspect$6
} = nodeUtil;
const {
  Readable
} = nodeStream;
const debug$7 = createDebug('vk-io:collect:stream');
const {
  APP_TOKEN_NOT_VALID,
  RESPONSE_SIZE_TOO_BIG
} = apiErrors;
const {
  EXECUTE_ERROR
} = collectErrors;
class CollectStream extends Readable {
  constructor(vk, {
    options,
    method,
    limit,
    max = null
  }) {
    super({
      objectMode: true
    });
    this.vk = vk;

    const {
      parallelCount = 25,
      count = null,
      offset = 0
    } = options,
          params = _objectWithoutProperties(options, ["parallelCount", "count", "offset"]);

    this.method = method;
    this.params = _objectSpread({}, params, {
      count: limit
    });

    if (parallelCount < 1 || parallelCount > 25) {
      throw new RangeError('The number of parallel calls can be between 1 and 25');
    }

    this.parallelCount = parallelCount;
    const hasMax = max !== null;
    const hasCount = count !== null;

    if (hasCount && hasMax && count > max || hasMax && !hasCount) {
      this.total = max;
    } else {
      this.total = count;
    }

    this.offset = offset;
    this.skipOffset = offset;
    this.received = 0;
    this.attempts = 0;
    this.promise = null;
    this.supportExecute = true;
    this.code = getExecuteCode({
      params: this.params,
      parallelCount,
      method
    });
  }

  get [Symbol.toStringTag]() {
    return 'CollectStream';
  }

  then(thenFn, catchFn) {
    if (this.promise === null) {
      let collect = [];
      this.promise = new Promise((resolve, reject) => {
        this.on('error', reject).on('end', () => resolve(collect)).on('data', ({
          items
        }) => {
          collect = [...collect, ...items];
        });
      });
    }

    return Promise.resolve(this.promise).then(thenFn, catchFn);
  }

  async _read() {
    const isNotFirst = this.total !== null && this.received !== 0;

    if (isNotFirst && this.total - this.skipOffset <= this.received) {
      this.push(null);
      return;
    }

    let items;

    if (!this.supportExecute || this.parallelCount === 1) {
      const request = new Request(this.method, _objectSpread({}, this.params, {
        offset: this.offset
      }));
      let result;

      try {
        result = await this.vk.api.callWithRequest(request);
      } catch (error) {
        const {
          collectAttempts
        } = this.vk.options;

        if (this.attempts >= collectAttempts) {
          this.emit('error', error);
          return;
        }

        this.attempts += 1;

        this._read();

        return;
      }

      const {
        count,
        items: collect
      } = result;

      if (this.total === null || this.total > count) {
        this.total = count;
      }

      items = collect;
    } else {
      let result;

      try {
        result = await this.vk.api.execute({
          code: this.code,
          total: this.total,
          offset: this.offset,
          received: this.received
        });
      } catch (error) {
        if (error.code === APP_TOKEN_NOT_VALID) {
          this.supportExecute = false;
          debug$7('execute not supported in token');

          this._read();

          return;
        }

        if (error.code === RESPONSE_SIZE_TOO_BIG) {
          this.parallelCount -= 1;
          this.code = getExecuteCode({
            parallelCount: this.parallelCount,
            params: this.params,
            method: this.method
          });

          this._read();

          return;
        }

        const {
          collectAttempts
        } = this.vk.options;

        if (this.attempts >= collectAttempts) {
          this.emit('error', error);
          return;
        }

        this.attempts += 1;

        this._read();

        return;
      }

      const {
        response,
        errors
      } = result;

      if (errors.length > 0) {
        this.emit('error', new CollectError({
          message: 'Execute error',
          code: EXECUTE_ERROR,
          errors
        }));
        return;
      }

      const {
        total,
        items: collect
      } = response;
      this.total = total;
      items = collect;
    }

    const {
      length
    } = items;

    if (length === 0) {
      this.push(null);
      return;
    }

    this.offset += length;
    this.received += length;
    const {
      total,
      received
    } = this;
    let percent = Math.round(received / total * 100);

    if (Number.isNaN(percent)) {
      percent = 100;
    }

    this.push({
      received,
      percent,
      total,
      items
    });
  }

  [inspect$6.custom](depth, options) {
    const {
      name
    } = this.constructor;
    const {
      total,
      offset,
      received
    } = this;
    const payload = {
      total,
      offset,
      received
    };
    return `${options.stylize(name, 'special')} ${inspect$6(payload, options)}`;
  }

}

var LIMITS_METHODS = [['account.getActiveOffers', 100], ['account.getBanned', 200], ['ads.getAds', 100, 2000], ['ads.getAdsLayout', 100, 2000], ['ads.getAdsTargeting', 100, 2000], ['apps.getCatalog', 100], ['apps.getFriendsList', 5000], ['audio.get', 6000], ['audio.search', 300, 1000], ['audio.getAlbums', 100], ['audio.getRecommendations', 1000], ['audio.getPopular', 1000], ['board.getComments', 100], ['board.getTopics', 100], ['database.getChairs', 10000], ['database.getCities', 1000], ['database.getCountries', 1000], ['database.getFaculties', 10000], ['database.getRegions', 1000], ['database.getSchools', 10000], ['database.getUniversities', 10000], ['docs.get', 2000, 2000], ['docs.search', 1000, 1000], ['fave.getLinks', 100], ['fave.getMarketItems', 100], ['fave.getPhotos', 100], ['fave.getUsers', 100], ['fave.getVideos', 100], ['friends.get', 1000], ['friends.getMutual', 1000], ['friends.getMutual', 1000], ['friends.getOnline', 1000], ['friends.getRecent', 1000], ['friends.getRequests', 1000], ['friends.getSuggestions', 500], ['friends.search', 1000], ['gifts.get', 100], ['groups.get', 1000], ['groups.getBanned', 200], ['groups.getInvitedUsers', 100], ['groups.getInvites', 100], ['groups.getMembers', 1000], ['groups.getRequests', 200], ['leads.getUsers', 1000], ['likes.getList', 100], ['market.get', 200], ['market.getAlbums', 100], ['market.getCategories', 1000], ['market.getComments', 100], ['market.search', 200], ['messages.get', 200], ['messages.getDialogs', 200], ['messages.getHistory', 200], ['messages.search', 100], ['notes.get', 100], ['notes.getComments', 100], ['orders.get', 1000], ['photos.get', 1000], ['photos.getAlbums', 100], ['photos.getAll', 200], ['photos.getAllComments', 100], ['photos.getComments', 100], ['photos.getNewTags', 100], ['photos.getUserPhotos', 1000], ['photos.search', 1000], ['places.getCheckins', 100], ['places.search', 1000], ['polls.getVoters', 100], ['storage.getKeys', 1000], ['users.getFollowers', 1000], ['users.getSubscriptions', 200], ['users.search', 1000, 1000], ['utils.getLastShortenedLinks', 50], ['video.get', 200], ['video.getAlbums', 100], ['video.getComments', 100], ['video.search', 1000, 1000], ['wall.get', 100], ['wall.getComments', 100], ['wall.getReposts', 1000], ['wall.search', 100], ['widgets.getComments', 200], ['widgets.getPages', 200]];

const {
  inspect: inspect$7
} = nodeUtil;
class Chain {
  constructor(vk) {
    this.vk = vk;
    this.queue = [];
    this.started = false;
  }

  get [Symbol.toStringTag]() {
    return 'Chain';
  }

  append(method, params) {
    if (this.started) {
      return Promise.reject(new VKError({
        message: 'Chain already started'
      }));
    }

    const request = new Request(method, params);
    this.queue.push(request);
    return request.promise;
  }

  then(thenFn, catchFn) {
    return Promise.resolve(this.run()).then(thenFn, catchFn);
  }

  async run() {
    if (this.started) {
      throw new VKError({
        message: 'Chain already started'
      });
    }

    this.started = true;
    const {
      queue
    } = this;

    if (queue.length === 0) {
      return [];
    }

    let out = {
      response: [],
      errors: []
    };

    while (queue.length > 0) {
      const tasks = queue.splice(0, 25);
      const code = getChainReturn(tasks.map(String));

      try {
        const response = await this.vk.api.execute({
          code
        });
        resolveExecuteTask(tasks, response);
        out = {
          response: [...out.response, ...response.response],
          errors: [...out.errors, ...response.errors]
        };
      } catch (error) {
        for (const task of tasks) {
          task.reject(error);
        }

        throw error;
      }
    }

    return out;
  }

  [inspect$7.custom](depth, options) {
    const {
      name
    } = this.constructor;
    const {
      started,
      queue
    } = this;
    const payload = {
      started,
      queue
    };
    return `${options.stylize(name, 'special')} ${inspect$7(payload, options)}`;
  }

}

const {
  inspect: inspect$8
} = nodeUtil;
class Collect {
  constructor(vk) {
    this.vk = vk;

    for (const [method, limit, max] of LIMITS_METHODS) {
      const [group, name] = method.split('.');

      if (!(group in this)) {
        this[group] = {};
      }

      this[group][name] = (options = {}) => new CollectStream(this.vk, {
        options,
        method,
        limit,
        max
      });
    }
  }

  get [Symbol.toStringTag]() {
    return 'Collect';
  }

  chain() {
    return new Chain(this.vk);
  }

  async executes(method, queue) {
    queue = queue.map(params => getExecuteMethod(method, params));
    const promises = [];

    while (queue.length !== 0) {
      const code = getChainReturn(queue.splice(0, 25));
      promises.push(this.vk.api.execute({
        code
      }));
    }

    let out = {
      response: [],
      errors: []
    };

    for (const _ref of await Promise.all(promises)) {
      const {
        response,
        errors
      } = _ref;
      out = {
        response: [...out.response, ...response],
        errors: [...out.errors, ...errors]
      };
    }

    return out;
  }

  [inspect$8.custom](depth, options) {
    const {
      name
    } = this.constructor;
    return `${options.stylize(name, 'special')} {}`;
  }

}

const {
  inspect: inspect$9
} = nodeUtil;
class Context {
  constructor(vk) {
    this.vk = vk;
    this.type = null;
    this.subTypes = [];
    this.state = {};
  }

  get [Symbol.toStringTag]() {
    return this.constructor.name;
  }

  is(types) {
    if (!Array.isArray(types)) {
      types = [types];
    }

    return [this.type, ...this.subTypes].some(type => types.includes(type));
  }

  [inspect$9.custom](depth, options) {
    const {
      name
    } = this.constructor;
    return `${options.stylize(name, 'special')} ${inspect$9(_objectSpread({}, this, {
      vk: '<VK>'
    }), options)}`;
  }

}

class VoteContext extends Context {
  constructor(vk, payload, {
    groupId
  }) {
    super(vk);
    this.payload = payload;
    this.$groupId = groupId;
    this.type = 'vote';
    this.subTypes = ['pull_vote'];
  }

  get id() {
    return this.payload.poll_id;
  }

  get userId() {
    return this.payload.user_id;
  }

  get ownerId() {
    return this.payload.owner_id;
  }

  get optionId() {
    return this.payload.option_id;
  }

}

class TypingContext extends Context {
  constructor(vk, [eventId, userId, extra]) {
    super(vk);
    const isChat = eventId === 62;
    this.payload = {
      user_id: userId,
      chat_id: isChat ? extra : null,
      peer_id: isChat ? extra + CHAT_PEER : userId
    };
    this.type = 'typing';
    this.subTypes = [eventId === 61 ? 'typing_user' : 'typing_chat'];
  }

  get isUser() {
    return this.subTypes.includes('typing_user');
  }

  get isChat() {
    return this.subTypes.includes('typing_chat');
  }

  get peerId() {
    return this.payload.peer_id;
  }

  get userId() {
    return this.payload.user_id;
  }

  get chatId() {
    return this.payload.chat_id;
  }

}

const specialAttachments = {
  sticker: raw => ({
    type: 'sticker',
    sticker: {
      sticker_id: Number(raw.attach1),
      product_id: Number(raw.attach1_product_id)
    }
  }),
  money_transfer: raw => ({
    type: 'money_transfer',
    money_transfer: {
      data: raw.attach1,
      amount: Number(raw.attach1_amount),
      currency: Number(raw.attach1_currency)
    }
  }),
  gift: raw => ({
    type: 'gift',
    gift: {
      id: Number(raw.attach1)
    }
  })
};
function transformMessage([, id, flags, peer, date, text, extra, attachments]) {
  const message = {
    id,
    date,
    text,
    flags,
    geo: 'geo' in attachments ? {} : null,
    random_id: extra.random_id || null,
    out: Number((flags & 2) === 2),
    payload: extra.payload ? extra.payload : null
  };

  if (peer < 0) {
    message.out = Number((flags & 2) === 0);
    message.important = (flags & 1) !== 0;
  } else {
    message.out = Number((flags & 2) !== 0);
    message.important = (flags & 8) !== 0;
  }

  message.peer_id = peer;
  message.from_id = peer;

  if ('from' in extra) {
    message.from_id = Number(extra.from);
  }

  if ('source_act' in extra) {
    message.action = {
      type: extra.source_act,
      text: extra.source_text,
      member_id: extra.source_mid
    };
  }

  if (attachments.attach1_type in specialAttachments) {
    message.attachments = [specialAttachments[attachments.attach1_type](attachments)];
  } else {
    message.attachments = [];

    for (let i = 1, key = 'attach1'; key in attachments; i += 1, key = `attach${i}`) {
      const type = attachments[`${key}_type`];

      if (type === 'link') {
        const attachment = {
          type: 'link',
          link: {
            url: attachments[`${key}_url`],
            title: attachments[`${key}_title`],
            description: attachments[`${key}_desc`]
          }
        };
        const photoKey = `${key}_photo`;

        if (attachments[photoKey]) {
          const [owner, attachmentId] = attachments[photoKey].split('_');
          attachment.link.photo = {
            id: Number(attachmentId),
            owner_id: Number(owner)
          };
        }

        message.attachments.push(attachment);
        continue;
      }

      const [owner, attachmentId] = attachments[key].split('_');
      const attachment = {
        type,
        [type]: {
          id: Number(attachmentId),
          owner_id: Number(owner)
        }
      };
      const kindKey = `${key}_kind`;

      if (type === 'doc' && kindKey in attachments) {
        attachment[type].kind = attachments[kindKey];
      }

      message.attachments.push(attachment);
    }
  }

  let {
    fwd = null
  } = attachments;

  if (fwd !== null) {
    const indexColon = fwd.indexOf(':');

    if (indexColon !== -1) {
      fwd = fwd.substring(0, indexColon);
    }

    message.fwd_messages = fwd.split(',').map(attachment => {
      const [owner] = attachment.split('_');
      return {
        from_id: Number(owner),
        fwd_messages: []
      };
    });
  }

  return message;
}

const getPeerType = id => {
  if (CHAT_PEER < id) {
    return messageSources.CHAT;
  }

  if (id < 0) {
    return messageSources.GROUP;
  }

  return messageSources.USER;
};

class MessageContext extends Context {
  constructor(vk, payload, {
    source,
    updateType,
    groupId = null
  }) {
    super(vk);
    const isPolling = source === updatesSources.POLLING;
    const isWebhook = source === updatesSources.WEBHOOK;

    if (isPolling) {
      payload = transformMessage(payload);
    }

    if (!payload.action) {
      payload.action = {};
    }

    this.payload = payload;
    this.$filled = isWebhook;
    this.$groupId = groupId;
    const {
      peer_id: peerId,
      from_id: fromId
    } = payload;
    this.$from = {
      id: peerId,
      type: getPeerType(peerId)
    };
    this.$sender = {
      id: fromId,
      type: getPeerType(fromId)
    };
    this.text = this.payload.text ? unescapeHTML(this.payload.text) : null;
    this.attachments = transformAttachments(payload.attachments, vk);
    const subTypes = uniqueKeys(this.attachments.map(attachment => attachment.type));

    if (!this.isEvent) {
      if (isWebhook) {
        subTypes.push(updateType === 'message_edit' ? 'edit_message' : 'new_message');
      } else if (isPolling) {
        subTypes.push(updateType === 5 ? 'edit_message' : 'new_message');
      }
    } else {
      subTypes.push(this.eventType);
    }

    if (this.hasText) {
      subTypes.push('text');
    }

    this.type = 'message';
    this.subTypes = subTypes;
  }

  async loadMessagePayload() {
    if (this.$filled) {
      return;
    }

    const {
      items
    } = await this.vk.api.messages.getById({
      message_ids: this.id
    });
    const [message] = items;
    this.payload = message;
    this.attachments = transformAttachments(message.attachments, this.vk);
    this.$filled = true;
  }

  hasAttachments(type = null) {
    if (type === null) {
      return this.attachments.length > 0;
    }

    return this.attachments.some(attachment => attachment.type === type);
  }

  get hasText() {
    return this.text !== null;
  }

  get hasForwards() {
    return this.forwards.length > 0;
  }

  get hasGeo() {
    return Boolean(this.payload.geo);
  }

  get isUser() {
    return this.peerType === messageSources.USER;
  }

  get isChat() {
    return this.peerType === messageSources.CHAT;
  }

  get isGroup() {
    return this.peerType === messageSources.GROUP;
  }

  get isEvent() {
    return this.eventType !== null;
  }

  get isOutbox() {
    return Boolean(this.payload.out);
  }

  get isInbox() {
    return !this.isOutbox;
  }

  get isImportant() {
    return this.payload.important;
  }

  get id() {
    return this.payload.id;
  }

  get conversationMessageId() {
    return this.payload.conversation_message_id;
  }

  get peerId() {
    return this.$from.id;
  }

  get peerType() {
    return this.$from.type;
  }

  get senderId() {
    return this.$sender.id;
  }

  get senderType() {
    return this.$sender.type;
  }

  get chatId() {
    if (!this.isChat) {
      return null;
    }

    return this.peerId - CHAT_PEER;
  }

  get date() {
    return this.payload.date;
  }

  get forwards() {
    return this.payload.fwd_messages || [];
  }

  get geo() {
    if (!this.hasGeo) {
      return null;
    }

    if (!this.$filled) {
      throw new VKError({
        message: 'The message payload is not fully loaded'
      });
    }

    return this.payload.geo;
  }

  get eventType() {
    const {
      type
    } = this.payload.action;

    if (!type) {
      return null;
    }

    return type;
  }

  get eventMemberId() {
    const {
      member_id: id
    } = this.payload.action;

    if (!id) {
      return null;
    }

    return Number(id);
  }

  get eventText() {
    const {
      text
    } = this.payload.action;

    if (!text) {
      return null;
    }

    return text;
  }

  get eventEmail() {
    const {
      email
    } = this.payload.action;

    if (!email) {
      return null;
    }

    return email;
  }

  get messagePayload() {
    const {
      payload = null
    } = this.payload;

    if (payload === null) {
      return null;
    }

    return JSON.parse(payload);
  }

  getAttachments(type = null) {
    if (type === null) {
      return this.attachments;
    }

    return this.attachments.filter(attachment => attachment.type === type);
  }

  getInviteLink(params = {}) {
    return this.vk.api.messages.getInviteLink(_objectSpread({}, params, {
      peer_id: this.peerId
    }));
  }

  editMessage(params) {
    return this.vk.api.messages.edit(_objectSpread({}, params, {
      peer_id: this.peerId,
      message_id: this.id
    }));
  }

  async editMessageText(message) {
    const response = await this.editMessage({
      message
    });
    this.text = message;
    return response;
  }

  send(text, params = {}) {
    if (typeof text !== 'object') {
      params.message = text;
    } else {
      params = text;
    }

    params.peer_id = this.peerId;
    return this.vk.api.messages.send(params);
  }

  reply(text, params = {}) {
    if (typeof text !== 'object') {
      params.message = text;
    } else {
      params = text;
    }

    params.forward_messages = this.id;
    return this.send(params);
  }

  sendSticker(id) {
    return this.send({
      sticker_id: id
    });
  }

  async sendPhoto(source, params = {}) {
    const attachment = await this.vk.upload.messagePhoto({
      peer_id: this.senderId,
      source
    });
    return await this.send(_objectSpread({}, params, {
      attachment
    }));
  }

  async sendDocument(source, params = {}) {
    const attachment = await this.vk.upload.messageDocument({
      peer_id: this.senderId,
      source
    });
    return await this.send(_objectSpread({}, params, {
      attachment
    }));
  }

  async sendVoice(source, params = {}) {
    const attachment = await this.vk.upload.voice({
      peer_id: this.senderId,
      source
    });
    return await this.send(_objectSpread({}, params, {
      attachment
    }));
  }

  async setActivity() {
    const isActivited = await this.vk.api.messages.setActivity({
      peer_id: this.peerId,
      type: 'typing'
    });
    return Boolean(isActivited);
  }

  async markAsImportant(ids = [this.id], options = {
    important: Number(!this.isImportant)
  }) {
    const messageIds = await this.vk.api.messages.markAsImportant(_objectSpread({}, options, {
      message_ids: ids.join(',')
    }));

    if (messageIds.includes(this.id)) {
      this.payload.important = Boolean(options.important);
    }

    return messageIds;
  }

  async deleteMessage(ids = [this.id], options = {
    spam: 0
  }) {
    const messageIds = await this.vk.api.messages.delete(_objectSpread({}, options, {
      message_ids: ids.join(',')
    }));
    return messageIds;
  }

  async restoreMessage() {
    const isRestored = await this.vk.api.messages.restore({
      message_id: this.id
    });
    return Boolean(isRestored);
  }

  joinChatByInviteLink(link, params = {}) {
    return this.vk.api.messages.joinChatByInviteLink(_objectSpread({}, params, {
      link
    }));
  }

  assertIsChat() {
    if (!this.isChat) {
      throw new VKError({
        message: 'This method is only available in chat'
      });
    }
  }

  async renameChat(title) {
    this.assertIsChat();
    const isRenamed = await this.vk.api.messages.editChat({
      chat_id: this.chatId,
      title
    });
    return Boolean(isRenamed);
  }

  async newChatPhoto(source, params = {}) {
    this.assertIsChat();
    return await this.vk.upload.chatPhoto(_objectSpread({}, params, {
      chat_id: this.chatId,
      source
    }));
  }

  async deleteChatPhoto() {
    this.assertIsChat();
    return this.vk.api.messages.deleteChatPhoto({
      chat_id: this.chatId
    });
  }

  async inviteUser(id = this.eventMemberId) {
    this.assertIsChat();
    const isInvited = await this.vk.api.messages.removeChatUser({
      chat_id: this.chatId,
      user_id: id
    });
    return Boolean(isInvited);
  }

  async kickUser(id = this.eventMemberId) {
    this.assertIsChat();
    const isKicked = await this.vk.api.messages.removeChatUser({
      chat_id: this.chatId,
      user_id: id
    });
    return Boolean(isKicked);
  }

  async pinMessage() {
    this.assertIsChat();
    const isPinned = await this.vk.api.messages.pin({
      peer_id: this.peerId,
      message_id: this.id
    });
    return Boolean(isPinned);
  }

  async unpinMessage() {
    this.assertIsChat();
    const isUnpinned = await this.vk.api.messages.unpin({
      peer_id: this.peerId,
      message_id: this.id
    });
    return Boolean(isUnpinned);
  }

}

class WallPostContext extends Context {
  constructor(vk, payload, {
    updateType,
    groupId
  }) {
    super(vk);
    this.payload = payload;
    this.$groupId = groupId;
    this.attachments = [new WallAttachment(payload, vk)];
    this.type = 'wall_post';
    this.subTypes = [updateType === 'wall_post_new' ? 'new_wall_post' : 'new_wall_repost'];
  }

  get isRepost() {
    return this.subTypes.includes('new_wall_repost');
  }

  get wall() {
    return this.attachments[0];
  }

  deletePost() {
    const wall = this.getWall;
    return this.vk.api.wall.delete({
      post_id: wall.id,
      owner_id: wall.ownerId
    });
  }

}

class StreamingContext extends Context {
  constructor(vk, payload) {
    super(vk);
    this.payload = payload;
    const {
      action,
      event_type: type
    } = payload;
    this.attachments = transformAttachments(payload.attachments, vk);
    this.type = 'publication';
    this.subTypes = [`publication_${type}`, `${action}_publication`, `${action}_publication_${type}`];
  }

  get isNew() {
    return this.actionType === 'new';
  }

  get isUpdate() {
    return this.actionType === 'update';
  }

  get isDelete() {
    return this.actionType === 'delete';
  }

  get isRestore() {
    return this.actionType === 'restore';
  }

  get isPost() {
    return this.eventType === 'post';
  }

  get isShare() {
    return this.eventType === 'share';
  }

  get isComment() {
    return this.eventType === 'comment';
  }

  hasAttachments(type = null) {
    if (type === null) {
      return this.attachments.length > 0;
    }

    return this.attachments.some(attachment => attachment.type === type);
  }

  get url() {
    return this.payload.event_url;
  }

  get date() {
    return this.payload.creation_time;
  }

  get text() {
    return this.payload.text;
  }

  get sharedText() {
    return this.payload.shared_post_text || null;
  }

  get sharedDate() {
    return this.payload.shared_post_creation_time || null;
  }

  get actionType() {
    return this.payload.action;
  }

  get eventType() {
    return this.payload.event_type;
  }

  get actionDate() {
    return this.payload.action_time;
  }

  get geo() {
    return this.payload.geo;
  }

  get tags() {
    return this.payload.tags;
  }

  get signerId() {
    return this.payload.signer_id;
  }

  get author() {
    return this.payload.author;
  }

  get authorId() {
    return this.payload.author.id;
  }

  get authorUrl() {
    return this.payload.author.author_url;
  }

  get sharedAuthorId() {
    return this.payload.author.shared_post_author_id || null;
  }

  get sharedAuthorUrl() {
    return this.payload.author.shared_post_author_url || null;
  }

  get authorPlatform() {
    return platforms.get(this.payload.author.platform);
  }

  getAttachments(type = null) {
    if (type === null) {
      return this.attachments;
    }

    return this.attachments.filter(attachment => attachment.type === type);
  }

}

const reasonNames = new Map([[0, 'other'], [1, 'spam'], [2, 'members_insult'], [3, 'obscene_expressions'], [4, 'messages_off_topic']]);
class GroupUserContext extends Context {
  constructor(vk, payload, {
    updateType,
    groupId
  }) {
    super(vk);
    this.payload = payload;
    this.$groupId = groupId;
    this.type = 'group_user';
    this.subTypes = [updateType === 'user_block' ? 'block_group_user' : 'unblock_group_user'];
  }

  get isBlocked() {
    return this.subTypes.includes('block_group_user');
  }

  get isUnblocked() {
    return this.subTypes.includes('unblock_group_user');
  }

  get isExpired() {
    if (this.isBlock()) {
      return null;
    }

    return Boolean(this.payload.by_end_date);
  }

  get adminId() {
    return this.payload.admin_id;
  }

  get userId() {
    return this.payload.user_id;
  }

  get reasonId() {
    return this.payload.reason || null;
  }

  get reasonName() {
    return reasonNames.get(this.reasonId);
  }

  get comment() {
    return this.payload.comment || null;
  }

  banUser(params) {
    if (this.isBlock()) {
      return Promise.reject(new VKError({
        message: 'User is blocked'
      }));
    }

    return this.vk.api.groups.banUser(_objectSpread({}, params, {
      group_id: this.$groupId,
      user_id: this.userId
    }));
  }

  unbanUser() {
    if (this.isUnblock()) {
      return Promise.reject(new VKError({
        message: 'User is not blocked'
      }));
    }

    return this.vk.api.groups.unbanUser({
      group_id: this.$groupId,
      user_id: this.userId
    });
  }

}

class UserOnlineContext extends Context {
  constructor(vk, [eventId, userId, extra, date]) {
    super(vk);
    this.payload = {
      user_id: -userId,
      extra,
      date
    };
    this.type = 'user_active';
    this.subTypes = [eventId === 8 ? 'user_online' : 'user_offline'];
  }

  get isUserOnline() {
    return this.subTypes.includes('user_online');
  }

  get isUserOffline() {
    return this.subTypes.includes('user_offline');
  }

  get isSelfExit() {
    return this.isUserOffline() && !this.payload.extra;
  }

  get isTimeoutExit() {
    return this.isUserOffline() && Boolean(this.payload.extra);
  }

  get date() {
    return this.payload.date;
  }

  get platformName() {
    return platforms.get(this.payload.extra);
  }

}

class DialogFlagsContext extends Context {
  constructor(vk, [eventId, peerId, flags]) {
    super(vk);
    this.payload = {
      peer_id: peerId,
      flags
    };
    this.type = 'dialog_flags';
    this.subTypes = [eventId === 10 ? 'remove_dialog_flags' : eventId === 11 ? 'update_dialog_flags' : 'set_dialog_flags'];
  }

  get isImportant() {
    return Boolean(this.flags & 1);
  }

  get isUnanswered() {
    return Boolean(this.flags & 2);
  }

  get peerId() {
    return this.payload.peer_id;
  }

  get flags() {
    return this.payload.flags;
  }

  markAsAnsweredDialog(params) {
    return this.vk.api.messages.markAsAnsweredDialog(_objectSpread({}, params, {
      peer_id: this.peerId
    }));
  }

  markAsImportantDialog(params) {
    return this.vk.api.messages.markAsImportantDialog(_objectSpread({}, params, {
      peer_id: this.peerId
    }));
  }

}

class GroupUpdateContext extends Context {
  constructor(vk, payload, {
    updateType,
    groupId
  }) {
    super(vk);
    this.payload = payload;
    this.$groupId = groupId;
    const isChangePhoto = updateType === 'group_change_photo';
    this.attachments = isChangePhoto ? [new PhotoAttachment(payload.photo, vk)] : [];
    this.type = 'group_update';
    this.subTypes = [updateType === 'group_change_settings' ? 'group_update_settings' : isChangePhoto ? 'group_update_photo' : 'group_update_officers'];
  }

  get isChangePhoto() {
    return this.subTypes.includes('group_change_photo');
  }

  get isChangeOfficers() {
    return this.subTypes.includes('group_change_officers');
  }

  get isChangeSettings() {
    return this.subTypes.includes('group_change_settings');
  }

  hasAttachments(type = null) {
    if (type === null) {
      return this.attachments.length > 0;
    }

    return this.attachments.some(attachment => attachment.type === type);
  }

  get adminId() {
    return this.payload.admin_id;
  }

  get userId() {
    return this.payload.user_id;
  }

  get oldLevel() {
    return this.payload.level_old || null;
  }

  get newLevel() {
    return this.payload.level_new || null;
  }

  get changes() {
    return this.payload.changes || null;
  }

  getAttachments(type = null) {
    if (type === null) {
      return this.attachments;
    }

    return this.attachments.filter(attachment => attachment.type === type);
  }

}

class GroupMemberContext extends Context {
  constructor(vk, payload, {
    updateType,
    groupId
  }) {
    super(vk);
    this.payload = payload;
    this.$groupId = groupId;
    this.type = 'group_member';
    this.subTypes = [updateType === 'group_leave' ? 'leave_group_member' : 'join_group_member'];
  }

  get isJoin() {
    return this.subTypes.includes('join_group_member');
  }

  get isLeave() {
    return this.subTypes.includes('leave_group_member');
  }

  get isSelfLeave() {
    if (this.isJoin()) {
      return null;
    }

    return Boolean(this.payload.self);
  }

  get userId() {
    return this.payload.user_id;
  }

  get joinType() {
    if (this.isLeave()) {
      return null;
    }

    return this.payload.join_type;
  }

}

class MessageAllowContext extends Context {
  constructor(vk, payload, {
    updateType,
    groupId
  }) {
    super(vk);
    this.payload = payload;
    this.$groupId = groupId;
    this.type = 'message_subscribers';
    this.subTypes = [updateType === 'message_allow' ? 'message_subscribe' : 'message_unsubscribe'];
  }

  get isSubscribed() {
    return this.subTypes.includes('message_subscribe');
  }

  get isUbsubscribed() {
    return this.subTypes.includes('message_unsubscribe');
  }

  get userId() {
    return this.payload.user_id;
  }

  get key() {
    return this.payload.key || null;
  }

}

class ReadMessagesContext extends Context {
  constructor(vk, [eventId, peerId, id]) {
    super(vk);
    this.payload = {
      peer_id: peerId,
      id
    };
    this.type = 'read_messages';
    this.subTypes = [eventId === 6 ? 'read_inbox_messages' : 'read_oubox_messages'];
  }

  get isInbox() {
    return this.subTypes.includes('read_inbox_messages');
  }

  get isOutbox() {
    return this.subTypes.includes('read_oubox_messages');
  }

  get id() {
    return this.payload.id;
  }

  get peerId() {
    return this.payload.peer_id;
  }

}

class MessageFlagsContext extends Context {
  constructor(vk, [eventId, id, flags, peerId]) {
    super(vk);
    this.payload = {
      peer_id: peerId,
      flags,
      id
    };
    this.type = 'message_flags';
    this.subTypes = [eventId === 1 ? 'update_message_flags' : eventId === 2 ? 'set_message_flags' : 'remove_message_flags'];
  }

  get isUnread() {
    return Boolean(this.flags & 1);
  }

  get isOutbox() {
    return Boolean(this.flags & 2);
  }

  get isReplied() {
    return Boolean(this.flags & 4);
  }

  get isImportant() {
    return Boolean(this.flags & 8);
  }

  get isChat() {
    return Boolean(this.flags & 16);
  }

  get isFriends() {
    return Boolean(this.flags & 32);
  }

  get isSpam() {
    return Boolean(this.flags & 64);
  }

  get isDeleted() {
    return Boolean(this.flags & 128);
  }

  get isFixed() {
    return Boolean(this.flags & 256);
  }

  get isMedia() {
    return Boolean(this.flags & 512);
  }

  get isHidden() {
    return Boolean(this.flags & 65536);
  }

  get id() {
    return this.payload.id;
  }

  get peerId() {
    return this.payload.peer_id;
  }

  get flags() {
    return this.payload.flags;
  }

}

const findTypes = /([^_]+)_([^_]+)_([^_]+)/;
class CommentActionContext extends Context {
  constructor(vk, payload, {
    updateType,
    groupId
  }) {
    super(vk);
    this.payload = payload;
    this.$groupId = groupId;
    this.attachments = transformAttachments(payload.attachments, vk);
    const {
      1: initsiator,
      3: action
    } = updateType.match(findTypes);
    this.type = 'comment';
    this.subTypes = [`${initsiator}_comment`, `${action}_${initsiator}_comment`];
  }

  hasAttachments(type = null) {
    if (type === null) {
      return this.attachments.length > 0;
    }

    return this.attachments.some(attachment => attachment.type === type);
  }

  get isNew() {
    return this.includesFromSubType('new');
  }

  get isEdit() {
    return this.includesFromSubType('edit');
  }

  get isDelete() {
    return this.includesFromSubType('delete');
  }

  get isRestore() {
    return this.includesFromSubType('restore');
  }

  get isPhotoComment() {
    return this.includesFromSubType('photo');
  }

  get isWallComment() {
    return this.includesFromSubType('wall');
  }

  get isVideoComment() {
    return this.includesFromSubType('video');
  }

  get isBoardComment() {
    return this.includesFromSubType('board');
  }

  get isMarketComment() {
    return this.includesFromSubType('market');
  }

  get isReply() {
    return 'reply_to_comment' in this.payload;
  }

  get id() {
    return this.payload.id;
  }

  get replyId() {
    return this.payload.reply_to_comment || null;
  }

  get userId() {
    return this.payload.from_id || this.payload.user_id || null;
  }

  get replyUserId() {
    return this.payload.reply_to_user || null;
  }

  get removerUserId() {
    return this.payload.deleter_id || null;
  }

  get objectId() {
    const {
      payload
    } = this;
    return payload.photo_id || payload.video_id || payload.post_id || payload.topic_id || payload.item_id || null;
  }

  get ownerId() {
    const {
      payload
    } = this;
    return payload.owner_id || payload.photo_owner_id || payload.video_owner_id || payload.post_owner_id || payload.topic_owner_id || payload.market_owner_id || null;
  }

  get date() {
    return this.payload.date || null;
  }

  get text() {
    return this.payload.text || null;
  }

  get likes() {
    return this.payload.likes;
  }

  getAttachments(type = null) {
    if (type === null) {
      return this.attachments;
    }

    return this.attachments.filter(attachment => attachment.type === type);
  }

  includesFromSubType(type) {
    return this.subTypes[1].includes(type);
  }

  editComment(options) {
    if (this.isDelete()) {
      return Promise.reject(new VKError({
        message: 'Comment is deleted'
      }));
    }

    if (this.isBoardComment()) {
      return this.vk.api.board.editComment(_objectSpread({}, options, {
        comment_id: this.id,
        topic_id: this.objectId,
        group_id: this.$groupId
      }));
    }

    const params = _objectSpread({}, options, {
      comment_id: this.id,
      owner_id: this.ownerId
    });

    if (this.isPhotoComment()) {
      return this.vk.api.photos.editComment(params);
    }

    if (this.isVideoComment()) {
      return this.vk.api.video.editComment(params);
    }

    if (this.isWallComment()) {
      return this.vk.api.wall.editComment(params);
    }

    if (this.isMarketComment()) {
      return this.vk.api.market.editComment(params);
    }

    return Promise.reject(new VKError({
      message: 'Unsupported event for editing comment'
    }));
  }

  deleteComment() {
    if (this.isDelete()) {
      return Promise.reject(new VKError({
        message: 'Comment is deleted'
      }));
    }

    if (this.isBoardComment()) {
      return this.vk.api.board.deleteComment({
        comment_id: this.id,
        topic_id: this.objectId,
        group_id: this.$groupId
      });
    }

    const params = {
      comment_id: this.id,
      owner_id: this.ownerId
    };

    if (this.isPhotoComment()) {
      return this.vk.api.photos.deleteComment(params);
    }

    if (this.isVideoComment()) {
      return this.vk.api.video.deleteComment(params);
    }

    if (this.isWallComment()) {
      return this.vk.api.wall.deleteComment(params);
    }

    if (this.isMarketComment()) {
      return this.vk.api.market.deleteComment(params);
    }

    return Promise.reject(new VKError({
      message: 'Unsupported event for deleting comment'
    }));
  }

}

class NewAttachmentsContext extends Context {
  constructor(vk, payload, {
    updateType,
    groupId
  }) {
    super(vk);
    this.payload = payload;
    this.$groupId = groupId;
    let subType;
    let attachment;

    switch (updateType) {
      case 'photo_new':
        {
          subType = 'new_photo_attachment';
          attachment = new PhotoAttachment(payload, vk);
          break;
        }

      case 'video_new':
        {
          subType = 'new_video_attachment';
          attachment = new VideoAttachment(payload, vk);
          break;
        }

      case 'audio_new':
        {
          subType = 'new_audio_attachment';
          attachment = new AudioAttachment(payload, vk);
          break;
        }
    }

    this.attachments = [attachment];
    this.type = 'new_attachment';
    this.subTypes = [subType];
  }

  get isPhoto() {
    return this.subTypes.includes('new_photo');
  }

  get isVideo() {
    return this.subTypes.includes('new_video');
  }

  get isAudio() {
    return this.subTypes.includes('new_audio');
  }

  hasAttachments(type = null) {
    if (type === null) {
      return this.attachments.length > 0;
    }

    return this.attachments.some(attachment => attachment.type === type);
  }

  getAttachments(type = null) {
    if (type === null) {
      return this.attachments;
    }

    return this.attachments.filter(attachment => attachment.type === type);
  }

  deleteAttachment() {
    if (this.isPhoto()) {
      const [photo] = this.getAttachments('photo');
      return this.vk.api.photos.delete({
        owner_id: photo.ownerId,
        photo_id: photo.id
      });
    }

    if (this.isVideo()) {
      const [video] = this.getAttachments('video');
      return this.vk.api.video.delete({
        owner_id: video.ownerId,
        video_id: video.id
      });
    }

    if (this.isAudio()) {
      const [audio] = this.getAttachments('audio');
      return this.vk.api.audio.delete({
        owner_id: audio.ownerId,
        audio_id: audio.id
      });
    }

    return Promise.reject(new VKError({
      message: 'Unsupported event for deleting attachment'
    }));
  }

}

class RemovedMessagesContext extends Context {
  constructor(vk, [eventId, peerId, id]) {
    super(vk);
    this.payload = {
      peer_id: peerId,
      id
    };
    this.type = 'removed_messages';
    this.subTypes = [eventId === 13 ? 'delete_messages' : 'restore_messages'];
  }

  get isRemoved() {
    return this.subTypes.includes('delete_messages');
  }

  get isRecovery() {
    return this.subTypes.includes('restore_messages');
  }

  get id() {
    return this.payload.id;
  }

  get peerId() {
    return this.payload.peer_id;
  }

}

const {
  URL: URL$7,
  URLSearchParams: URLSearchParams$6
} = nodeUrl;
const {
  inspect: inspect$a,
  promisify: promisify$2
} = nodeUtil;
const {
  NEED_RESTART,
  POLLING_REQUEST_FAILED
} = updatesErrors;
const debug$8 = createDebug('vk-io:updates');
const POLLING_VERSION = 3;
const webhookContextsEvents = [[['message_new', 'message_edit', 'message_reply'], MessageContext], [['message_allow', 'message_deny'], MessageAllowContext], [['photo_new', 'audio_new', 'video_new'], NewAttachmentsContext], [['wall_post_new', 'wall_repost'], WallPostContext], [['group_join', 'group_leave'], GroupMemberContext], [['user_block', 'user_unblock'], GroupUserContext], [['photo_comment_new', 'photo_comment_edit', 'photo_comment_delete', 'photo_comment_restore', 'video_comment_new', 'video_comment_edit', 'video_comment_delete', 'video_comment_restore', 'wall_reply_new', 'wall_reply_edit', 'wall_reply_delete', 'wall_reply_restore', 'board_reply_new', 'board_reply_edit', 'board_reply_delete', 'board_reply_restore', 'market_reply_new', 'market_reply_edit', 'market_reply_delete', 'market_reply_restore'], CommentActionContext], [['poll_vote_new'], VoteContext], [['group_change_photo', 'group_officers_edit', 'group_change_settings'], GroupUpdateContext]];
const pollingContextsEvents = [[[1, 2, 3], MessageFlagsContext], [[4, 5], MessageContext], [[6, 7], ReadMessagesContext], [[8, 9], UserOnlineContext], [[10, 11, 12], DialogFlagsContext], [[13, 14], RemovedMessagesContext], [[61, 62], TypingContext]];

const makeContexts = groups => {
  const contexts = {};

  for (const [events, Context$$1] of groups) {
    for (const event of events) {
      contexts[event] = Context$$1;
    }
  }

  return contexts;
};

const webhookContexts = makeContexts(webhookContextsEvents);
const pollingContexts = makeContexts(pollingContextsEvents);
class Updates {
  constructor(vk) {
    this.vk = vk;
    this.restarted = 0;
    this.started = null;
    this.url = null;
    this.ts = null;
    this.pts = null;
    this.mode = 2 | 8 | 64;
    this.webhookServer = null;
    this.stack = [];
    this.middleware = null;
    this.hears = new Middleware();

    this.hearFallbackHandler = (context, next) => next();

    this.reloadMiddleware();
  }

  get [Symbol.toStringTag]() {
    return 'Updates';
  }

  isStarted() {
    return this.started !== null;
  }

  use(middleware) {
    this.stack.push(middleware);
    this.reloadMiddleware();
    return this;
  }

  on(events, handler) {
    if (!Array.isArray(events)) {
      events = [events];
    }

    const hasNull = events.some(event => !event);

    if (hasNull) {
      throw new VKError({
        message: 'Events should be not null'
      });
    }

    return this.use((context, next) => context.is(events) ? handler(context, next) : next());
  }

  hear(conditions, handler) {
    if (!Array.isArray(conditions)) {
      conditions = [conditions];
    }

    const hasNull = conditions.some(condition => !condition);

    if (hasNull) {
      throw new VKError({
        message: 'Condition should be not null'
      });
    }

    this.hears.use((context, next) => {
      const {
        text
      } = context;
      const hasSome = conditions.some(condition => {
        if (typeof condition === 'function') {
          return condition(text, context);
        }

        if (condition instanceof RegExp) {
          const passed = condition.test(text);

          if (passed) {
            context.$match = text.match(condition);
          }

          return passed;
        }

        return text === condition;
      });
      return hasSome ? handler(context, next) : next();
    });
    return this;
  }

  setHearFallbackHandler(handler) {
    this.hearFallbackHandler = handler;
    return this;
  }

  handlePollingUpdate(update) {
    debug$8('longpoll update', update);
    const [type] = update;
    const Context$$1 = pollingContexts[type];

    if (!Context$$1) {
      debug$8(`Unsupported polling context type ${type}`);
      return null;
    }

    return this.dispatchMiddleware(new Context$$1(this.vk, update, {
      source: updatesSources.POLLING,
      updateType: type
    }));
  }

  handleWebhookUpdate(update) {
    debug$8('webhook update', update);
    const {
      type,
      object: payload,
      group_id: groupId
    } = update;
    const Context$$1 = webhookContexts[type];

    if (!Context$$1) {
      debug$8(`Unsupported webhook context type ${type}`);
      return null;
    }

    return this.dispatchMiddleware(new Context$$1(this.vk, payload, {
      source: updatesSources.WEBHOOK,
      updateType: type,
      groupId
    }));
  }

  async startPolling() {
    if (this.started !== null) {
      debug$8(`Updates already started: ${this.started}`);
      return;
    }

    this.started = 'polling';

    try {
      const {
        pollingGroupId
      } = this.vk.options;
      const isGroup = pollingGroupId !== null;
      const {
        server,
        key,
        ts
      } = isGroup ? await this.vk.api.groups.getLongPollServer({
        group_id: pollingGroupId
      }) : await this.vk.api.messages.getLongPollServer({
        lp_version: POLLING_VERSION
      });

      if (this.ts === null) {
        this.ts = ts;
      }

      const pollingURL = isGroup ? server : `https://${server}`;
      this.url = new URL$7(pollingURL);
      this.url.search = new URLSearchParams$6({
        act: 'a_check',
        version: POLLING_VERSION,
        wait: 25,
        key
      });
      this.startFetchLoop();
    } catch (error) {
      this.started = null;
      throw error;
    }
  }

  async startWebhook({
    tls,
    path,
    port,
    host
  } = {}, next) {
    if (this.started !== null) {
      debug$8(`Updates already started: ${this.started}`);
      return;
    }

    this.started = 'webhook';

    try {
      const {
        webhookPath
      } = this.vk.options;
      const webhookCallback = this.getWebhookCallback(path || webhookPath || '/');
      const callback = typeof next === 'function' ? (req, res) => webhookCallback(req, res, () => next(req, res)) : webhookCallback;
      this.webhookServer = tls ? nodeHttps.createServer(tls, callback) : nodeHttp.createServer(callback);

      if (!port) {
        port = tls ? 443 : 80;
      }

      const {
        webhookServer
      } = this;
      const listen = promisify$2(webhookServer.listen).bind(webhookServer);
      await listen(port, host);
      debug$8(`Webhook listening on port: ${port}`);
    } catch (error) {
      this.started = null;
      throw error;
    }
  }

  async stop() {
    this.started = null;
    this.restarted = 0;

    if (this.webhookServer !== null) {
      const {
        webhookServer
      } = this;
      const close = promisify$2(webhookServer.close).bind(webhookServer);
      await close();
      this.webhookServer = null;
    }
  }

  getWebhookCallback(path = null) {
    const isEmptyPath = path !== null;
    const headers = {
      connection: 'keep-alive',
      'content-type': 'text/plain'
    };
    return (req, res, next) => {
      if (req.method !== 'POST' || isEmptyPath && req.url !== path) {
        if (typeof next === 'function') {
          next();
          return;
        }

        res.writeHead(403);
        res.end();
        return;
      }

      let body = '';
      req.on('data', chunk => {
        if (body.length > 1e6) {
          body = null;
          res.writeHead(413);
          res.end();
          req.connection.destroy();
          return;
        }

        body += String(chunk);
      });
      req.on('end', () => {
        try {
          const update = JSON.parse(body);
          const {
            webhookSecret,
            webhookConfirmation
          } = this.vk.options;

          if (webhookSecret !== null && update.secret !== webhookSecret) {
            res.writeHead(403);
            res.end();
            return;
          }

          if (update.type === 'confirmation') {
            if (webhookConfirmation === null) {
              res.writeHead(500);
              res.end();
              return;
            }

            res.writeHead(200, headers);
            res.end(String(webhookConfirmation));
            return;
          }

          res.writeHead(200, headers);
          res.end('ok');
          this.handleWebhookUpdate(update).catch(error => {
            console.error('Handle webhook update error', error);
          });
        } catch (error) {
          debug$8('webhook error', error);
          res.writeHead(415);
          res.end();
        }
      });
    };
  }

  getKoaWebhookMiddleware() {
    return async context => {
      const update = context.request.body;
      const {
        webhookSecret,
        webhookConfirmation
      } = this.vk.options;

      if (webhookSecret !== null && update.secret !== webhookSecret) {
        context.status = 403;
        return;
      }

      if (update.type === 'confirmation') {
        if (webhookConfirmation === null) {
          context.status = 500;
          return;
        }

        context.body = webhookConfirmation;
        return;
      }

      context.body = 'ok';
      context.set('connection', 'keep-alive');
      this.handleWebhookUpdate(update).catch(error => {
        console.error('Handle webhook update error', error);
      });
    };
  }

  async startFetchLoop() {
    try {
      while (this.started === 'polling') {
        await this.fetchUpdates();
      }
    } catch (error) {
      debug$8('longpoll error', error);
      const {
        pollingWait,
        pollingAttempts
      } = this.vk.options;

      if (error.code !== NEED_RESTART && this.restarted < pollingAttempts) {
        this.restarted += 1;
        debug$8('longpoll restart request');
        await delay(3e3);
        this.startFetchLoop();
        return;
      }

      while (this.started === 'polling') {
        try {
          await this.stop();
          await this.startPolling();
          break;
        } catch (restartError) {
          debug$8('longpoll restarted error', restartError);
          this.started = 'polling';
          await delay(pollingWait);
        }
      }
    }
  }

  async fetchUpdates() {
    const {
      agent
    } = this.vk.options;
    const {
      searchParams
    } = this.url;
    searchParams.set('ts', this.ts);
    searchParams.set('mode', this.mode);
    debug$8('http -->');
    let response = await fetch(this.url, {
      agent,
      method: 'GET',
      timeout: 30e3,
      compress: false,
      headers: {
        connection: 'keep-alive'
      }
    });
    debug$8(`http <-- ${response.status}`);

    if (!response.ok) {
      throw new UpdatesError({
        code: POLLING_REQUEST_FAILED,
        message: 'Polling request failed'
      });
    }

    response = await response.json();
    this.restarted = 0;

    if ('failed' in response && response.failed !== 1) {
      this.ts = null;
      throw new UpdatesError({
        code: NEED_RESTART,
        message: 'The server has failed'
      });
    }

    this.ts = Number(response.ts);

    if ('pts' in response) {
      this.pts = Number(response.pts);
    }

    if ('updates' in response) {
      const isGroup = this.vk.options.pollingGroupId !== null;
      Promise.all(response.updates.map(async update => {
        try {
          if (isGroup) {
            await this.handleWebhookUpdate(update);
          } else {
            await this.handlePollingUpdate(update);
          }
        } catch (error) {
          console.error('Handle polling update error:', error);
        }
      }));
    }
  }

  dispatchMiddleware(context) {
    return this.middleware.run(context);
  }

  reloadMiddleware() {
    this.middleware = new Middleware(this.stack);
    this.middleware.use(async (context, next) => {
      if (!context.is('text')) {
        await next();
        return;
      }

      const {
        finished
      } = await this.hears.run(context);

      if (finished) {
        await this.hearFallbackHandler(context, next);
      }
    });
  }

  [inspect$a.custom](depth, options) {
    const {
      name
    } = this.constructor;
    const {
      started,
      stack
    } = this;
    const payload = {
      started,
      stack
    };
    return `${options.stylize(name, 'special')} ${inspect$a(payload, options)}`;
  }

}

const {
  URL: URL$8
} = nodeUrl;
const {
  INVALID_URL,
  URL_NOT_ALLOWED,
  INVALID_RESOURCE,
  RESOURCE_NOT_FOUND
} = snippetsErrors;
const removeSearchParam = /(\?|&)[^=]+=/;
const searchDot = /\./g;
const enumResourceTypes = {
  id: 'user',
  club: 'group',
  public: 'group',
  app: 'application'
};
const allowedHostnames = ['vk.com', 'm.vk.com'];

const resolveOwnerResource = (resource, pattern) => {
  const [, type, owner, id] = resource.match(pattern);
  return {
    id: Number(id),
    owner: Number(owner),
    type: type.toLowerCase().replace(removeSearchParam, '')
  };
};

class Snippets {
  constructor(vk) {
    this.vk = vk;
  }

  get [Symbol.toStringTag]() {
    return 'Snippets';
  }

  async resolveResource(resource) {
    if (!resource) {
      throw new SnippetsError({
        code: INVALID_RESOURCE,
        message: 'Resource should must be'
      });
    }

    resource = String(resource);

    if (resource.startsWith('@') || resource.startsWith('*')) {
      resource = resource.substring(1);
    }

    const numberResource = Number(resource);
    const resourceIsNaN = Number.isNaN(numberResource);

    if (!resourceIsNaN) {
      const isUser = numberResource > 0;
      return {
        id: isUser ? numberResource : -numberResource,
        type: isUser ? 'user' : 'group'
      };
    }

    let resourceSearch;

    try {
      if (!resource.match(searchDot)) {
        throw new SnippetsError({
          code: INVALID_RESOURCE,
          message: 'Is not URL'
        });
      }

      let url = resource;

      if (!(url.startsWith('http://') || url.startsWith('https://'))) {
        url = `https://${resource}`;
      }

      const {
        hostname,
        pathname,
        search
      } = new URL$8(url);

      if (!allowedHostnames.includes(hostname)) {
        throw new SnippetsError({
          code: URL_NOT_ALLOWED,
          message: 'URL not allowed'
        });
      }

      if (pathname === '/') {
        throw new SnippetsError({
          code: INVALID_URL,
          message: 'URL should contain path'
        });
      }

      resource = pathname.substring(1);
      resourceSearch = search;
    } catch (error) {
      if ([URL_NOT_ALLOWED, INVALID_URL].includes(error.code)) {
        throw error;
      }
    }

    if (parseAttachment.test(resourceSearch)) {
      return resolveOwnerResource(resourceSearch, parseAttachment);
    }

    if (parseOwnerResource.test(resourceSearch)) {
      return resolveOwnerResource(resourceSearch, parseOwnerResource);
    }

    if (parseAttachment.test(resource)) {
      return resolveOwnerResource(resource, parseAttachment);
    }

    if (parseOwnerResource.test(resource)) {
      return resolveOwnerResource(resource, parseOwnerResource);
    }

    if (parseResource.test(resource)) {
      const [, typeResource, id] = resource.match(parseResource);
      let type = typeResource.toLowerCase();

      if (type in enumResourceTypes) {
        type = enumResourceTypes[type];
      }

      return {
        id: Number(id),
        type
      };
    }

    const response = await this.vk.api.utils.resolveScreenName({
      screen_name: resource
    });

    if (Array.isArray(response)) {
      throw new SnippetsError({
        message: 'Resource not found',
        code: RESOURCE_NOT_FOUND
      });
    }

    const {
      type,
      object_id: id
    } = response;

    if (type === 'page') {
      return {
        id,
        type: 'group'
      };
    }

    return {
      id,
      type
    };
  }

}

const {
  URL: URL$9,
  URLSearchParams: URLSearchParams$7
} = nodeUrl;
const {
  inspect: inspect$b,
  promisify: promisify$3
} = nodeUtil;
const debug$9 = createDebug('vk-io:streaming');
class StreamingAPI {
  constructor(vk) {
    this.vk = vk;
    this.key = null;
    this.socket = null;
    this.endpoint = null;
    this.started = null;
    this.handlers = [];
  }

  get [Symbol.toStringTag]() {
    return 'StreamingAPI';
  }

  async startWebSocket() {
    this.started = 'websocket';

    try {
      const {
        key,
        endpoint
      } = await this.vk.api.streaming.getServerUrl();
      this.key = key;
      this.endPoint = new URL$9(`https://${endpoint}`);
      const search = new URLSearchParams$7({
        key
      });
      const {
        agent
      } = this.vk.options;
      this.socket = new WebSocket(`wss://${endpoint}/stream?${search}`, {
        agent
      });
    } catch (error) {
      this.started = null;
      throw error;
    }

    const {
      socket
    } = this;
    this.close = promisify$3(socket.close).bind(socket);
    socket.on('message', data => {
      let message;

      try {
        message = JSON.parse(data);
      } catch (error) {
        debug$9('JSON parse failed', error);
        return;
      }

      const {
        code
      } = message;

      try {
        switch (code) {
          case 100:
            {
              this.handleEvent(message.event);
              break;
            }

          case 300:
            {
              this.handleServiceMessage(message.service_message);
              break;
            }

          default:
            debug$9(`Unsupported message code: ${code}`);
        }
      } catch (error) {
        console.log('Handle event error', error);
      }
    });
    socket.on('error', error => {
      debug$9('WebSocket error', error);
    });
  }

  async stop() {
    if (this.started === null) {
      return;
    }

    await this.close();
    this.started = null;
    this.key = null;
    this.socket = null;
    this.endpoint = null;
  }

  async handleServiceMessage({
    service_code: code
  }) {
    if ([3000, 3001].includes(code)) {
      await this.stop();
      await this.start();
    }
  }

  async handleEvent(event) {
    const context = new StreamingContext(this.vk, event);
    return await this.vk.updates.dispatchMiddleware(context);
  }

  async fetchRules(method, payload = {}) {
    const {
      agent
    } = this.vk.options;
    const url = new URL$9('/rules', this.endPoint);
    url.searchParams.set('key', this.key);
    let body;

    if (method !== 'GET') {
      body = JSON.stringify(payload);
    }

    let response = await fetch(url, {
      agent,
      method,
      body,
      headers: {
        'content-type': 'application/json'
      }
    });
    response = await response.json();

    if ('error' in response) {
      throw new StreamingRuleError(response.error);
    }

    return response;
  }

  async getRules() {
    const {
      rules = []
    } = await this.fetchRules('GET');
    return rules;
  }

  addRule(rule) {
    return this.fetchRules('POST', {
      rule
    });
  }

  deleteRule(tag) {
    return this.fetchRules('DELETE', {
      tag
    });
  }

  addRules(rules) {
    return Promise.all(rules.map(rule => this.addRule(rule)));
  }

  async deleteRules() {
    const rules = await this.getRules();
    return await Promise.all(rules.map(({
      tag
    }) => this.deleteRule(tag)));
  }

  [inspect$b.custom](depth, options) {
    const {
      name
    } = this.constructor;
    const {
      started,
      handlers
    } = this;
    const payload = {
      started,
      handlers
    };
    return `${options.stylize(name, 'special')} ${inspect$b(payload, options)}`;
  }

}

const {
  Agent
} = nodeHttps;
const {
  inspect: inspect$c
} = nodeUtil;
class VK {
  constructor(options = {}) {
    this.options = _objectSpread({}, defaultOptions, {
      agent: new Agent({
        keepAlive: true,
        keepAliveMsecs: 10000
      })
    });
    this.setOptions(options);
    this.api = new API(this);
    this.auth = new Auth(this);
    this.upload = new Upload(this);
    this.collect = new Collect(this);
    this.updates = new Updates(this);
    this.snippets = new Snippets(this);
    this.streaming = new StreamingAPI(this);
    this.captchaHandler = null;
    this.twoFactorHandler = null;
  }

  get [Symbol.toStringTag]() {
    return 'VK';
  }

  setOptions(options) {
    Object.assign(this.options, options);
    return this;
  }

  setToken(token) {
    this.options.token = token;
    return this;
  }

  getToken() {
    return this.options.token;
  }

  setCaptchaHandler(handler) {
    this.captchaHandler = handler;
    return this;
  }

  setTwoFactorHandler(handler) {
    this.twoFactorHandler = handler;
    return this;
  }

  [inspect$c.custom](depth, options) {
    const {
      name
    } = this.constructor;
    const {
      api,
      updates,
      streaming,
      captchaHandler,
      twoFactorHandler
    } = this;
    const {
      app,
      token,
      login,
      phone
    } = this.options;
    const payload = {
      options: {
        app,
        login,
        phone,
        token
      },
      captchaHandler,
      twoFactorHandler,
      api,
      updates,
      streaming
    };
    return `${options.stylize(name, 'special')} ${inspect$c(payload, options)}`;
  }

}

class Button {
  constructor({
    color = Button.DEFAULT_COLOR,
    action
  }) {
    this.color = color;
    const payload = JSON.stringify(action.payload || {});

    if (payload.length > 255) {
      throw new VKError({
        message: 'Maximum length of payload 255 characters'
      });
    }

    this.action = _objectSpread({}, action, {
      payload
    });
  }

  get [Symbol.toStringTag]() {
    return this.constructor.name;
  }

  static get DEFAULT_COLOR() {
    return 'default';
  }

  static get PRIMARY_COLOR() {
    return 'primary';
  }

  static get NEGATIVE_COLOR() {
    return 'negative';
  }

  static get POSITIVE_COLOR() {
    return 'positive';
  }

  toJSON() {
    return {
      color: this.color,
      action: this.action
    };
  }

}

class TextButton extends Button {
  constructor({
    color,
    label,
    payload
  }) {
    if (label.length > 40) {
      throw new VKError({
        message: 'Maximum length of label 40 characters'
      });
    }

    super({
      color,
      action: {
        type: 'text',
        label,
        payload
      }
    });
  }

}

const {
  DEFAULT_COLOR,
  PRIMARY_COLOR,
  NEGATIVE_COLOR,
  POSITIVE_COLOR
} = Button;
class Keyboard {
  constructor({
    oneTime = false
  } = {}) {
    this.oneTime = oneTime;
    this.buttons = [];
  }

  get [Symbol.toStringTag]() {
    return 'Keyboard';
  }

  static get DEFAULT_COLOR() {
    return DEFAULT_COLOR;
  }

  static get PRIMARY_COLOR() {
    return PRIMARY_COLOR;
  }

  static get NEGATIVE_COLOR() {
    return NEGATIVE_COLOR;
  }

  static get POSITIVE_COLOR() {
    return POSITIVE_COLOR;
  }

  static keyboard(rows, options) {
    if (rows.length > 10) {
      throw new VKError({
        message: 'Max count of keyboard rows 10'
      });
    }

    const keyboard = new Keyboard(options);

    for (const buttons of rows) {
      keyboard.addButtonsRow(buttons);
    }

    return keyboard;
  }

  static textButton(options) {
    return new TextButton(options);
  }

  oneTime() {
    this.oneTime = true;
    return this;
  }

  addButtonsRow(buttons) {
    if (!Array.isArray(buttons)) {
      buttons = [buttons];
    }

    if (buttons.length > 4) {
      throw new VKError({
        message: 'Max count of buttons at columns 4'
      });
    }

    this.buttons.push(buttons);
    return this;
  }

  toString() {
    const buttons = this.buttons.map(buttonRow => {
      if (!Array.isArray(buttonRow)) {
        return buttonRow.toJSON();
      }

      return buttonRow.map(button => button.toJSON());
    });
    return JSON.stringify({
      one_time: this.oneTime,
      buttons
    });
  }

}

exports.VK = VK;
exports.Request = Request;
exports.default = VK;
exports.captchaTypes = captchaTypes;
exports.messageSources = messageSources;
exports.VKError = VKError;
exports.APIError = APIError;
exports.AuthError = AuthError;
exports.UploadError = UploadError;
exports.CollectError = CollectError;
exports.UpdatesError = UpdatesError;
exports.ExecuteError = ExecuteError;
exports.SnippetsError = SnippetsError;
exports.StreamingRuleError = StreamingRuleError;
exports.apiErrors = apiErrors;
exports.authErrors = authErrors;
exports.uploadErrors = uploadErrors;
exports.updatesErrors = updatesErrors;
exports.collectErrors = collectErrors;
exports.snippetsErrors = snippetsErrors;
exports.Button = Button;
exports.Keyboard = Keyboard;
exports.TextButton = TextButton;
exports.Context = Context;
exports.VoteContext = VoteContext;
exports.TypingContext = TypingContext;
exports.MessageContext = MessageContext;
exports.WallPostContext = WallPostContext;
exports.StreamingContext = StreamingContext;
exports.GroupUserContext = GroupUserContext;
exports.UserOnlineContext = UserOnlineContext;
exports.GroupUpdateContext = GroupUpdateContext;
exports.DialogFlagsContext = DialogFlagsContext;
exports.MessageAllowContext = MessageAllowContext;
exports.GroupMemberContext = GroupMemberContext;
exports.ReadMessagesContext = ReadMessagesContext;
exports.MessageFlagsContext = MessageFlagsContext;
exports.CommentActionContext = CommentActionContext;
exports.NewAttachmentsContext = NewAttachmentsContext;
exports.RemovedMessagesContext = RemovedMessagesContext;
exports.Attachment = Attachment;
exports.ExternalAttachment = ExternalAttachment;
exports.GiftAttachment = GiftAttachment;
exports.WallAttachment = WallAttachment;
exports.LinkAttachment = LinkAttachment;
exports.PhotoAttachment = PhotoAttachment;
exports.AudioAttachment = AudioAttachment;
exports.VideoAttachment = VideoAttachment;
exports.MarketAttachment = MarketAttachment;
exports.StickerAttachment = StickerAttachment;
exports.DocumentAttachment = DocumentAttachment;
exports.WallReplyAttachment = WallReplyAttachment;
exports.MarketAlbumAttachment = MarketAlbumAttachment;
