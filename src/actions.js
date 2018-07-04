// action to fetch 25 commits
function fetchCommits() {
  var oReq2 = new XMLHttpRequest();
  oReq2.open("GET", "http://localhost:8080/commits");
  oReq2.send();
}

// action to get one commit base on sha number
var fetchCommit = function(sha, callback) {
  var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          try {
            var data = JSON.parse(xhttp.responseText);
          }
          catch(err) {
            console.log(err.message + " in " + xhttp.responseText);
            return;
          }
          callback(data);
       }
    };
  xhttp.open("GET", `http://localhost:8080/commits/${sha}`);
  xhttp.send();
}


module.exports = fetchCommit;
