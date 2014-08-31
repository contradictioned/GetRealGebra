function Intersection(left, right) {
  this.left = left;
  this.right = right;
}

Intersection.prototype.exec = function() {
  this.left.exec();
  this.right.exec();
  this.result = new Relation();
  this.result.attributes = this.left.result.attributes.slice();

  for(var i = 0; i < this.left.result.tuples.length; i++) {
    for(var j = 0; j < this.right.result.tuples.length; j++) {
      var lp = this.left.result.tuples[i].values;
      var rp = this.right.result.tuples[j].values;
      console.log(lp)
      console.log(rp)
      console.log(lp.join("|") == rp.join("|"))
      if(lp.join("|") == rp.join("|")) {
        this.result.addTuple(lp);
      }
    }
  }
}