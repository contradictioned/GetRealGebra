function Union(left, right) {
  this.left = left;
  this.right = right;
}

Union.prototype.exec = function() {
  this.left.exec();
  this.right.exec();
  this.result = new Relation();
  this.result.attributes = this.left.result.attributes.slice();

  for(var i = 0; i < this.left.result.tuples.length; i++) {
    this.result.addTuple(this.left.result.tuples[i].values)
  }

  for(var i = 0; i < this.right.result.tuples.length; i++) {
    this.result.addTuple(this.right.result.tuples[i].values)
  }
}