function fetchCommits() {
  var oReq2 = new XMLHttpRequest();
  oReq.open("GET", "http://localhost:8080/commits");
  oReq.send();
}

function fetchCommit(sha) {
  var oReq2 = new XMLHttpRequest();
  oReq.open("GET", `http://localhost:8080/commits/${sha}`);
  oReq.send();
}
