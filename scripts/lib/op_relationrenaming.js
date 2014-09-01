function RelationRenaming(new_name, child) {
  this.new_name = new_name;
  this.child = child;
}

RelationRenaming.prototype.exec = function() {
  this.child.exec();
  this.result = new Relation();

  // rename all attributes
  for(var i = 0; i < this.child.result.attributes.length; i++) {
    var arr = [this.new_name, this.child.result.attributes[i][1]];
    this.result.attributes.push(arr)
  }

  // copy the tuples
  for(i = 0; i < this.child.result.tuples.length; i++) {
    this.result.addTuple(this.child.result.tuples[i].values)
  }
}