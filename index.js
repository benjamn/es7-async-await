var recast = require("recast");
var types = recast.types;
var through = require("through");
var esprima = require("esprima");
var visitor = require("./visitor");

// Make sure that this esprima can parse async functions.
esprima.parse("async function test() {}");

function exports() {
  var data = [];
  return through(write, end);

  function write(buf) {
    data.push(buf);
  }

  function end() {
    this.queue(compile(data.join("")).code);
    this.queue(null);
  }
}

function compile(source, options) {
  options = options || {};

  var ast = recast.parse(source, {
    esprima: esprima,
    sourceFileName: options.sourceFileName
  });

  return recast.print(transform(ast), {
    sourceMapName: options.sourceMapName
  });
}

function transform(ast) {
  return recast.visit(ast, visitor);
}

module.exports = exports;
exports.compile = compile;
exports.transform = transform;
