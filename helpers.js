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
  for (var i = 0, len = items.length; i < len; i++) {
    if (isPublic(items[i])) {
      return true;
    }
  }
}

function hasProtected(items) {
  for (var i = 0, len = items.length; i < len; i++) {
    if (isProtected(items[i])) {
      return true;
    }
  }
}

function hasPrivate(items) {
  for (var i = 0, len = items.length; i < len; i++) {
    if (isPrivate(items[i])) {
      return true;
    }
  }
}

module.exports = {
  and: and,
  or: or,
  isPublic: isPublic,
  isProtected: isProtected,
  isPrivate: isPrivate,
  hasPublic: hasPublic,
  hasProtected: hasProtected,
  hasPrivate: hasPrivate,
};
