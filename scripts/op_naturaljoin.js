function NaturalJoin(left, right) {
  this.left = left;
  this.right = right;
}

NaturalJoin.prototype.exec = function() {
  this.left.exec()
  this.right.exec()
  var left_res = this.left.result.tuples;
  var right_res = this.right.result.tuples;

  this.result = new Relation();
  this.extractJoinAttrs()
  this.buildNewAttrs()

  for(var i = 0; i < left_res.length; i++) {
    for(var j = 0; j < right_res.length; j++) {
      var old_left = left_res[i]
      var old_right = right_res[j]
      if(this.computeJoinPredicate(old_left, old_right)) {
        var new_tuple = this.builJointTuple(old_left, old_right);
        this.result.addTuple(new_tuple);
      }
    }
  }
}

/**
 * The join attributes are computed from the attribute
 * lists of the left and right child operators.
 * Then the this.joinAttrs-array looks like
 * [
 *  [2, 5],     // indeces for left
 *  [3, 4]      // indeces for right
 * ]
 * Which means, the column 2 of the left child result
 * corresponds to column 3 of the right child.
 * And column 5 of the left child corresponds to
 * column 4 of the right child.
 */
NaturalJoin.prototype.extractJoinAttrs = function(){
  this.joinAttrs = [[], []];
  var la = this.left.result.attributes;
  var ra = this.right.result.attributes;
  for(var i = 0; i < la.length; i++) {
    for(var j = 0; j < ra.length; j++) {
      if(la[i][1] === ra[j][1]) {
        this.joinAttrs[0].push(i);
        this.joinAttrs[1].push(j);
      }
    }
  }
}


/**
 * Build the attributes for the result of this operation.
 * At first the attributes from the left operation without
 * the left join attrs come. Then the join attributes with their
 * 'table qualifier' cleaned out (is now undefined).
 * At last come the attributes from the right operation without
 * the right join attrs.
 *
 * Illustrative example:
 *   [x.a, x.b, x.c] \join [y.c, y.d]
 *   => [x.a, x.b, c, y.d]
 *
 * Such a join attribute is realized as pair [undefined, c]
 */
NaturalJoin.prototype.buildNewAttrs = function() {
  var arr = [];

  // only left
  for(var i = 0; i < this.left.result.attributes.length; i++) {
    if(this.joinAttrs[0].indexOf(i) === -1) {
      arr.push(this.left.result.attributes[i])
    }
  }
  // join attrs
  for(i = 0; i < this.joinAttrs[0].length; i++) {
    var pair = [undefined, this.left.result.attributes[this.joinAttrs[i]][1]];
    arr.push(pair)
  }
  // only right
  for(i = 0; i < this.right.result.attributes.length; i++) {
    if(this.joinAttrs[1].indexOf(i) === -1) {
      arr.push(this.right.result.attributes[i])
    }
  }

  this.result.attributes = arr;
}

/**
 * Assemble a joint tuple from the left and right inputs
 * with repsect to the this.joinAttrs-array.
 */
NaturalJoin.prototype.computeJoinPredicate = function(l, r) {
  var pred = true
  for(i = 0; i < this.joinAttrs[0].length; i++) {
    l_idx = this.joinAttrs[0][i];
    r_idx = this.joinAttrs[1][i];
    pred = pred && (l.values[l_idx] == r.values[r_idx])
  }
  return pred
}

/**
 * Assemble a joint tuple from the left and right inputs
 * with repsect to the this.joinAttrs-array.
 */
NaturalJoin.prototype.builJointTuple = function(l, r) {
  var arr = [];

  // only left
  for(var i = 0; i < l.values.length; i++) {
    if(this.joinAttrs[0].indexOf(i) === -1) {
      arr.push(l.values[i])
    }
  }
  // join attrs
  for(i = 0; i < this.joinAttrs[0].length; i++) {
    arr.push(l.values[this.joinAttrs[0][i]])
  }
  // only right
  for(i = 0; i < r.values.length; i++) {
    if(this.joinAttrs[1].indexOf(i) === -1) {
      arr.push(r.values[i])
    }
  }
  return arr;
}