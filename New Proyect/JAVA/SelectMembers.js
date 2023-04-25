var selectedMembers = []; //add with push//all id's
function MemberSelected(id) {
  var secc = document.getElementById("dropcontent");
  var name = document.getElementById(id).innerHTML;
  var last = document.getElementById("lastMember");
  console.log(name);
  //get numeric id and add to selected members and the dropdown with all the members
  if (selectedMembers.length != 0) {
    var contains = false;
    for (var i in selectedMembers) {
      if (id == selectedMembers[i]) {
        contains = true;
      }
    }
    if (!contains) {
      selectedMembers.push(id);
      secc.innerHTML += "<p>" + name + "</p>";
      last.innerHTML = name;
    }
    console.log(selectedMembers);
  } else {
    selectedMembers.push(id);
    secc.innerHTML += "<p>" + name + "</p>";
    last.innerHTML = name;
    console.log(selectedMembers);
  }
  //add to drop down
}
