function Setminus(left, right) {
  this.left = left;
  this.right = right;
}

Setminus.prototype.exec = function() {
  this.left.exec();
  this.right.exec();
  this.result = new Relation();
  this.result.attributes = this.left.result.attributes.slice();

  for(var i = 0; i < this.left.result.tuples.length; i++) {
    var contained = false;
    for(var j = 0; j < this.right.result.tuples.length; j++) {
      var lp = this.left.result.tuples[i].values;
      var rp = this.right.result.tuples[j].values;
      contained = contained || (lp.join("|") == rp.join("|"))
    }
    if(!contained) {
      this.result.addTuple(lp);
    }
  }
}