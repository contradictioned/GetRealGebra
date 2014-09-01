/*
 * Returns a new dom-table-element
 */
function build_table(relation) {
  var table = document.createElement('table');
  table.classList.add('relation');
  
  var caption = document.createElement('caption');
  caption.innerHTML = (relation.name == undefined) ? 'RESULT' : relation.name;
  table.appendChild(caption);

  fillTableHeader(table, relation.attributes);

  var tbody = document.createElement('tbody');
  table.appendChild(tbody);
  for(var i = 0; i < relation.tuples.length; i++) {
    var el = createRow(relation.tuples[i], relation.attributes)
    tbody.appendChild(el);
  }
  return table;
}

function fillTableHeader(table, attrs) {
  var thead = document.createElement('thead');
  var tr = document.createElement('tr');
  thead.appendChild(tr);
  for(var i = 0; i < attrs.length; i++) {
    var th = document.createElement('th');
    th.innerHTML = attrToString(attrs[i]);
    tr.appendChild(th)
  }
  table.appendChild(thead);
}

/* 
 * Creates a <tr>-element from a tuple 
 */
function createRow(tuple, attrs) {
  var tr = document.createElement('tr');
  for(var i = 0; i < attrs.length; i++) {
    var td = document.createElement('td')
    td.innerHTML = tuple.values[i];
    tr.appendChild(td)
  }
  return tr
}

function attrToString(x) {
  if(x[0] === undefined) {
    return x[1];
  }
  return x[0] + '.' + x[1];
}