function ThetaJoin(left, right, pred) {
  this.left = left;
  this.right = right;
  this.predicate = pred;
}

/*
 * Implements a nested loop - cross product
 */
ThetaJoin.prototype.exec = function() {
  this.left.exec()
  this.right.exec()
  var left_res = this.left.result;
  var right_res = this.right.result;

  this.result = new Relation();
  var newattrs = left_res.attributes.concat(right_res.attributes);
  this.result.attributes = newattrs;

  for(var i = 0; i < left_res.tuples.length; i++) {
    for(var j = 0; j < right_res.tuples.length; j++) {
      var old_left = left_res.tuples[i].values;
      var old_right = right_res.tuples[j].values;
      var arr = old_left.concat(old_right);
      var tuple = new Tuple(newattrs, arr)
      if(this.predicate(tuple)) {
        this.result.addTuple(arr);
      }
    }
  }
}