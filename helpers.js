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

function isPublic(item) {
  return !item.access || item.access === 'public';
}

function isProtected(item) {
  return item.access === 'protected';
}

function isPrivate(item) {
  return item.access === 'private';
}

function hasPublic(items) {
  return has(items, isPublic);
}

function hasProtected(items) {
  return has(items, isProtected);
}

function hasPrivate(items) {
  return has(items, isPrivate);
}

function has(items, predicate) {
  if (items) {
    for (var i = 0, len = items.length; i < len; i++) {
      if (predicate(items[i])) {
        return true;
      }
    }
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

module.exports = {
  and: and,
  or: or,
  concat: concat,
  isPublic: isPublic,
  isProtected: isProtected,
  isPrivate: isPrivate,
  hasPublic: hasPublic,
  hasProtected: hasProtected,
  hasPrivate: hasPrivate,
  markdown: markdown,
  'first-paragraph': firstParagraph,
};
