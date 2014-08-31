/*
 * One tuple conists of 1. a reference to the attributes of its housing relation
 * And 2. values which corresopond to the attributes by their id, e.g.
 *  [ 'Lord of the Rings', 'J.R.R. Tolkien', 'Max Mustermann']
 */

function Tuple(a, v) {
  this.attributes = a;
  this.values = v;
}

/*
 * Returns the value for the attribute specified with "key"
 */
Tuple.prototype.get = function(key) {
  if(key.indexOf(".") === -1) {
    return this.getSimple(key)
  } else {
    return this.getQualified(key)
  }
};

Tuple.prototype.getSimple = function(key) {
  for(var i = 0; i < this.attributes.length; i++) {
    if(key === this.attributes[i][1]) {
      return this.values[i]
    }
  }
};

Tuple.prototype.getQualified = function(key) {
  var karr = key.split(".")
  for(var i = 0; i < this.attributes.length; i++) {
    if(karr[0] === this.attributes[i][0] && karr[1] === this.attributes[i][1]) {
      return this.values[i]
    }
  }
};
