var bem_xjst = require('bem-xjst'),
    bemhtml = require('../bemhtml'),
    vm = require('vm');

var api = exports;

//
// ### function translate (source)
// #### @source {String} BEMHTML Source code
// #### @options {Object} Compilation options **optional**
// Returns source translated to javascript
//
api.translate = function translate(source, options) {
  options || (options = {});

  var xjstJS = bem_xjst.generate(source, {
        cache: options.cache,
        optimize: !options.devMode
      }),
      exportName = options.exportName || 'BEMHTML';

  return [
         '(function(g) {',
         '  var e = typeof exports === "object" ? exports : g;',
         '  var __xjst = (function(exports) {',
         '     ' + xjstJS + ';',
         '     return exports;',
         '  })({ cache: e.cache });',
         '  e["' + exportName + '"] = __xjst;',
         '})(this);'
         ].join('\n');
};

//
// ### function compile (source)
// #### @source {String} BEMHTML Source code
// #### @options {Object} Compilation options **optional**
// Returns generator function
//
api.compile = function compile(source, options) {
  var body = exports.translate(source, options),
      context = {
        exports: {
          cache: options.cache &&
                 (options.cache === true ? bemhtml.cache.create() :
                                           options.cache)
        }
      };

  if (options && options.devMode) context.console = console;
  vm.runInNewContext(body, context);

  return context.exports.BEMHTML;
};
