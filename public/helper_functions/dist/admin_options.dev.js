"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tableCreate = tableCreate;
exports.log = log;
exports.consolelog = consolelog;

function tableCreate(table_creation_arguments) {
  var users = this;
  console.log(table_creation_arguments);
  var body = document.getElementById(table_creation_arguments);
  body.innerHTML = "";
  var tbl = document.createElement('table');
  tbl.style.width = '100%';
  tbl.style.overflowy = 'auto';
  tbl.setAttribute('border', '1');
  var row_len = users.length;

  function count(obj) {
    return Object.keys(obj).length;
  }

  var col_len = count(users[0]);
  var tbdy = document.createElement('tbody');
  var tr = document.createElement('tr'); //console.log(Object.keys(users[0]),users)

  var thHeader = "";
  var values = Object.keys(users[0]);

  for (var value in values) {
    var _String = "<th>".concat(values[value], "</th>"); //console.log(String)


    thHeader = thHeader.concat(_String);
  } //console.log(thHeader)


  tr.innerHTML = thHeader + '<th style="text-align:left">Delete</th>';
  tbdy.appendChild(tr);

  for (var i = 0; i < row_len; i++) {
    var tr = document.createElement('tr');
    var user = users[i];

    for (var key in user) {
      var td = document.createElement('td');
      td.appendChild(document.createTextNode(user[key]));
      tr.appendChild(td);
    }

    var td = document.createElement('td');
    var button = document.createElement('button');
    button.className = "button";
    button.innerHTML = "Delete";
    td.appendChild(button);
    tr.appendChild(td);
    tbdy.appendChild(tr);
  }

  tbl.appendChild(tbdy);
  body.appendChild(tbl);
}

function log(string) {
  var rows = document.getElementById("formContent").childNodes[0].childNodes[0].childNodes;

  for (var i = 0; i < rows.length; i++) {
    if (rows.item(i).childNodes[2].textContent === string.email) {
      rows.item(i).style.display = "none";
    }
  }
}

function consolelog(string) {
  console.log(string);
}