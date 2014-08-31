GR = {
  
}

function prepareExamples() {
  var lis = document.getElementById("examples").getElementsByTagName("li");
  for(var i = 0; i < lis.length; i++) {
    lis[i].onclick = insertExample;
  }
}

function insertExample() {
  var str = this.innerHTML.replace("&lt;", "<");
  str = str.replace("&gt;", ">");
  document.getElementById('input').value = str;
  execQuery();
}

function execQuery() {
  var querystring = document.getElementById('input').value  
  // clear
  document.getElementById('error_output').innerHTML = '';
  var old = document.getElementById('result_output').getElementsByTagName('table');
  if (old.length > 0) {
    old[0].remove();
  }

  try {
    result = QueryParser.parse(querystring) 
  } catch(e) {
    document.getElementById('error_output').innerHTML = e
  }
  result.exec();
  var table = build_table(result.result);
  document.getElementById('result_output').appendChild(table);
}


window.onload = function() {
  prepareExamples();
  document.getElementById('input').onkeypress = function(e){
    if (!e) e = window.event;
    var keyCode = e.keyCode || e.which;
    if (keyCode == '13'){ execQuery() }
  }
}