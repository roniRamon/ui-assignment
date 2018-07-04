function fetchCommits() {
  var oReq2 = new XMLHttpRequest();
  oReq.open("GET", "http://localhost:8080/commits");
  oReq.send();
}

var fetchCommit = function(sha) {
  var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("demo").innerHTML =
            this.responseText;
       }
    };
  xhttp.open("GET", `http://localhost:8080/commits/${sha}`);
  xhttp.send();
}

module.exports = fetchCommit;
