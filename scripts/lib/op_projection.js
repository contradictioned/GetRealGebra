function Projection(attrs, child) {
  this.attrs = attrs;
  this.result = undefined;
  this.child = child;
  this.indecesToStay = [];
}

Projection.prototype.exec = function() {
  this.child.exec();
  this.result = new Relation();

  // build 
  var child_attrs = this.child.result.attributes;
  var new_attrs = [];
  for(var i = 0; i < child_attrs.length; i++) {
    var cattr = child_attrs[i];
    for(var j = 0; j < this.attrs.length; j++) {
      // just attr
      if(this.attrs[j].indexOf(".") === -1) {
        if (this.attrs[j] === cattr[1]) {
          this.indecesToStay.push(i);
          new_attrs.push(cattr);
        }
      }
      // full qualified
      if(this.attrs[j].indexOf(".") >= 0) {
        var split = this.attrs[j].split(".");
        if (split[0] === cattr[0] && split[1] === cattr[1]) {
          this.indecesToStay.push(i);
          new_attrs.push(cattr);
        }
      }
    }
  }
  this.result.attributes = new_attrs;

  var child_tuples = this.child.result.tuples;
  for(i = 0; i < child_tuples.length; i++) {
    var projected_tuple = this.project(child_tuples[i]);
    this.result.addTuple(projected_tuple);
  }
};

/*
 * Input is a tuple of the child's operator's result.
 * Depending on the indeces in this.indecesToStay,
 * a new array with the corresponding values is returned.
 */
Projection.prototype.project = function(tuple) {
  var projected_values = [];
  for(var i = 0; i < tuple.values.length; i++) {
    if(this.indecesToStay.indexOf(i) !== -1) {
      projected_values.push(tuple.values[i]);
    }
  }
  return projected_values;
};
