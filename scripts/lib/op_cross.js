function Cross(left, right) {
  this.left = left;
  this.right = right;
}

/*
 * Implements a nested loop - cross product
 */
Cross.prototype.exec = function() {
  this.left.exec()
  this.right.exec()
  var left_res = this.left.result;
  var right_res = this.right.result;

  this.result = new Relation();
  this.result.attributes = left_res.attributes.concat(right_res.attributes);

  for(var i = 0; i < left_res.tuples.length; i++) {
    for(var j = 0; j < right_res.tuples.length; j++) {
      var old_left = left_res.tuples[i].values;
      var old_right = right_res.tuples[j].values;
      var arr = old_left.concat(old_right);
      this.result.addTuple(arr);
    }
  }
}