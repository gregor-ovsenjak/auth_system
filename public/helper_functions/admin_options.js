export function tableCreate(table_creation_arguments) {
    let users = this
    console.log(table_creation_arguments)
    var body = document.getElementById(table_creation_arguments);
    body.innerHTML = "";
    var tbl = document.createElement('table');
    tbl.style.width = '100%';
    tbl.style.overflowy = 'auto';
    tbl.setAttribute('border','1');
    const row_len = users.length;
    function count(obj) { return Object.keys(obj).length; }
    const col_len = count(users[0]);
    var tbdy = document.createElement('tbody');
    var tr = document.createElement('tr');
    //console.log(Object.keys(users[0]),users)
    let thHeader = "";
    let values = Object.keys(users[0])
    for (var value in values){
      let String = `<th>${values[value]}</th>`;
      //console.log(String)
      thHeader = thHeader.concat(String);
    }
    //console.log(thHeader)
    tr.innerHTML = thHeader +'<th style="text-align:left">Delete</th>'
    
    tbdy.appendChild(tr);
    for (var i = 0; i < row_len; i++) {
      var tr = document.createElement('tr');
      let user = users[i];
      for (var key in user) {
          var td = document.createElement('td');
          td.appendChild(document.createTextNode(user[key]));
          tr.appendChild(td);
      }
      
      var td = document.createElement('td');
      let button = document.createElement('button');
      button.className = "button";
      button.innerHTML = "Delete";
      td.appendChild(button);
      tr.appendChild(td);
      tbdy.appendChild(tr);
    }
    
    tbl.appendChild(tbdy);
    body.appendChild(tbl);
}

export function log(string){
  const rows = ((document.getElementById("formContent").childNodes[0]).childNodes[0]).childNodes;
  for (var i = 0; i < rows.length;i++){
  
    if(rows.item(i).childNodes[2].textContent === string.email){
      
      rows.item(i).style.display = "none";
    }
  }
}

export function consolelog(string){
  console.log(string);
}