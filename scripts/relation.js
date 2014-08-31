/*
 * This models a relation (which is input and result for every relational operator)
 * [ ['book', 'title'], ['book', 'author'], ['reader', 'name'], ... ]
 */
function Relation() {
  this.name = undefined;
  this.attributes = [];
  this.tuples = [];
};

Relation.prototype.addTuple = function(values) {
  var t = new Tuple(this.attributes, values)
  // iterate over all tuples of this relation
  for(var i = 0; i < this.tuples.length; i++) {
    var equal = true;
    // compare componentwise
    for(j = 0; j < this.tuples[i].values.length; j++) {
      equal = equal && (this.tuples[i].values[j] === values[j]);
    }
    if(equal) {
      // Object x is already in the array
      return this.length;
    }
  }
  this.tuples.push(t)
};