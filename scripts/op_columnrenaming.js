function ColumnRenaming(renaming, child) {
  this.renaming = renaming;
  this.child = child;
}

ColumnRenaming.prototype.exec = function() {
  this.child.exec();
  this.result = new Relation();
  this.buildAttrs();

  var child_res = this.child.result.tuples;
  for(var i = 0; i < child_res.length; i++) {
    this.result.addTuple(child_res[i].values);
  }
}

/**
 * The new attributes are computed by using the old ones where
 * no renaming is specified.
 * When a renaming to name 'x' is specified, the pair
 * [undefined, 'x'] is used.
 */
ColumnRenaming.prototype.buildAttrs = function() {
  this.result.attributes = []
  var child_attrs = this.child.result.attributes
  for(var i = 0; i < child_attrs.length; i++) {
    var was_changed = false;

    for(var j = 0; j < this.renaming.length; j++) {
      if(child_attrs[i][1] == this.renaming[j].oldname) {
        was_changed = true;
        var attr = [undefined, this.renaming[j].newname];
        this.result.attributes.push(attr);
      }
    }
    if(!was_changed) {
      this.result.attributes.push(child_attrs[i])
    }
  }
  console.log(this.result.attributes)
}