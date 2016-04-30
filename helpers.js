var fs = require('fs');
var MarkdownIt = require('markdown-it');
var md = new MarkdownIt();

function and() {
  for (var i = 0, len = arguments.length - 1; i < len; i++) {
    if (!arguments[i]) {
      return false;
    }
  }
  return true;
}

function or() {
  for (var i = 0, len = arguments.length - 1; i < len; i++) {
    if (arguments[i]) {
      return true;
    }
  }
  return false;
}

function concat() {
  var result = '';
  for (var i = 0, len = arguments.length - 1; i < len; i++) {
    result += arguments[i];
  }
  return result;
}

function ensureAccess(item) {
  return item || 'public';
}

function isStatic(item) {
  return item.static;
}

function isPublic(item) {
  return !item.access || item.access === 'public';
}

function isProtected(item) {
  return item.access === 'protected';
}

function isPrivate(item) {
  return item.access === 'private';
}

function filter(items) {
  var args = arguments;

  if (isArray(items)) {
    return items.filter(function(item) {
      for (var i = 1, len = args.length - 1; i < len; i++) {
        if (!fulfills(item, args[i])) {
          return false
        }
      }

      return true;
    })
  }
}

function fulfills(item, condition) {
  var negated = (condition[0] === '!');
  if (negated) {
    condition = condition.substring(1);
  }

  return negated ? !_fulfills(item, condition) : _fulfills(item, condition);
}

function _fulfills(item, condition) {
  if (condition === 'public') {
    return isPublic(item);
  } else if (condition === 'protected') {
    return isProtected(item);
  } else if (condition === 'private') {
    return isPrivate(item);
  } else if (condition === 'static') {
    return isStatic(item);
  }
}

function markdown(path) {
  var content = fs.readFileSync(path, { encoding: 'utf8' });
  return md.render(content);
}

function firstParagraph(text) {
  if (text) {
    var match = text.replace(/\n/g, ' ').match(/<p>.*?<\/p>/m);
    if (match) {
      return match[0];
    }
  }
}

function isArray(value) {
  return Object.prototype.toString.call(value) === "[object Array]";
}

module.exports = {
  and: and,
  or: or,
  concat: concat,
  isStatic: isStatic,
  isPublic: isPublic,
  isProtected: isProtected,
  isPrivate: isPrivate,
  filter: filter,
  markdown: markdown,
  'ensure-access': ensureAccess,
  'first-paragraph': firstParagraph,
};
