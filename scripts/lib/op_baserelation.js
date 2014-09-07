/**
 * 
 */

function BaseRelation(name) {
  this.result = new Relation();
  this.name = name;
}

/**
 * Evaluating a BaseRelation means reading the content
 * of the HTML Table with the corresponding name.
 */
BaseRelation.prototype.exec = function() {
  var table = this.findTable(this.name);
  
  this.result.attributes = this.getAttrsFromTable(table);
  this.getTuples(table, this.result.attributes);
};

/*
 * Given a table, this function returns the list of attributes.
 * E.g. on the table named 't'
 *   | id | name | street |
 *   | .....
 * it would return
 *   [['t', 'id'], ['t', 'name'], ['t', 'street']]
 */
BaseRelation.prototype.getAttrsFromTable = function(table) {
  var th_data = table.getElementsByTagName('th');
  if(th_data.length === 0) {
    throw "Table seems to have no columns.";
  }

  var attrs = new Array(th_data.length);
  for(var i = 0; i < th_data.length; i++) {
    var attr = th_data[i].innerHTML;
    attrs[i] = [this.name, attr];
  }
  return attrs;
};

/*
 * For a <tr>-Element and a list of attrs,
 * this function creates an object where the
 * keys are taken from attrs and the values
 * from the innerHTML of the <td>s
 */
BaseRelation.prototype.rowToArray = function(trNode, attrs) {
  var arr = [];
  var tds = trNode.getElementsByTagName('td');
  for(var i = 0; i < attrs.length; i++) {
    arr.push(tds[i].innerHTML);
  }
  return arr;
};

BaseRelation.prototype.getTuples = function(table, attrs) {
  var rows = table.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
  var tuples = new Array(rows.length);
  
  for(var i = 0; i < rows.length; i++) {
    var t = this.rowToArray(rows[i], attrs);
    this.result.addTuple(t);
  }
};


BaseRelation.prototype.findTable = function(tablename) {
  var tables = document.getElementsByClassName('relation');
  for(var i = 0; i < tables.length; i++) {
    var tcaption = tables[i].getElementsByTagName('caption')[0];
    if(tcaption.innerHTML.indexOf(tablename) === 0) {
      return tables[i];
    }
  }
  throw "Tried to build table " + tablename + " but no such relation defined";
};