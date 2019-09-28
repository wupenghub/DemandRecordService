
var arr = [];
for(var i = 0;i<document.querySelectorAll('.list').length;i++){
  arr.push(document.querySelectorAll('.list')[i])
}
dragula(arr);
function $ (id) {
  return document.getElementById(id);
}
