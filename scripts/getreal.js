GR = {
  
}

function prepareExamples() {
  var lis = document.getElementById("quicktips").getElementsByTagName("code");
  for(var i = 0; i < lis.length; i++) {
    lis[i].onclick = insertExample;
  }
}

function insertExample() {
  var str = this.innerHTML.replace("&lt;", "<");
  str = str.replace("&gt;", ">");
  document.getElementById('input').value = str;
  document.getElementById('input').scrollIntoView( true );
  execQuery();
}

function execQuery() {
  var querystring = document.getElementById('input').value  
  // clear
  document.getElementById('error_output').innerHTML = '';
  document.getElementById('error_output').classList.add("hidden")
  var old = document.getElementById('result_output').getElementsByTagName('table');
  if (old.length > 0) {
    old[0].remove();
  }

  if(querystring === '') {
    return
  }

  try {
    result = QueryParser.parse(querystring) 
  } catch(e) {
    document.getElementById('error_output').innerHTML = e
    document.getElementById('error_output').classList.remove("hidden")
  }
  result.exec();
  var table = build_table(result.result);
  document.getElementById('result_output').appendChild(table);
}

function buildRelation(table) {
  // make it disappear
  table.classList.add("hidden");
  var name = table.getElementsByTagName("caption")[0].innerHTML;
  var attr_ths = table.getElementsByTagName("thead")[0].getElementsByTagName("th");
  var attrs = []
  for(var i = 0; i < attr_ths.length; i++) {
    attrs.push(attr_ths[i].innerHTML)
  }

  var the_ul = document.createElement('ul');
  var the_li = document.createElement('li');
  var the_name = document.createElement('strong');
  the_name.innerHTML = name;
  the_li.appendChild(the_name);
  the_ul.appendChild(the_li);
  for(i = 0; i < attrs.length; i++) {
    var the_li = document.createElement('li');
    the_li.innerHTML = attrs[i];
    the_ul.appendChild(the_li);
  }
  document.getElementsByClassName("relation_digest")[0].appendChild(the_ul)
}

function prepareDigest() {
  var relations = document.getElementsByClassName("relation");
  for(var i = 0; i < relations.length; i++) {
    buildRelation(relations[i]);
  }
}

window.onload = function() {
  prepareExamples();
  prepareDigest();
  document.getElementById('input').onkeypress = function(e){
    if (!e) e = window.event;
    var keyCode = e.keyCode || e.which;
    if (keyCode == '13'){ execQuery() }
  }
}