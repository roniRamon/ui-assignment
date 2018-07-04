// action to fetch 25 commits

function fetchCommits(callback) {
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
  var idx = fetchCommits.calledTimes;
  xhttp.open("GET", `http://localhost:8080/commits?start=${idx}&limit=25`);
  xhttp.send();
  fetchCommits.calledTimes += 25;
}
fetchCommits.calledTimes = 0;

// action to get a commit base on sha number
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

//action to edit a commit message

// show commit info
var commitInfo = function(commit){
  let html = "";

  var message = commit["commit"]["message"].length > 50 ? commit["commit"]["message"].substr(0, 50) + "...": commit["commit"]["message"];
  // add avatar??

  html += "<h3><strong> Author's name </strong>" + commit["commit"]["author"]["name"] + "</h3>";
  html += "<p><strong> Commit time </strong>" + commit["commit"]["author"]["date"] + "</p>";
  html += "<p><strong> commit message: </strong><a href='" + commit["commit"]["message"] + "'>" + message + "</a></p>";
  html += "<p><strong> Additions: </strong>" + commit["stats"]["additions"] + "</p>";
  html += "<p><strong> Deletions: </strong>" + commit["stats"]["deletions"] + "</p>";
  html += "<p><strong> Files: </strong></p>";
  html += "<ul>";
    // need to add link to the patch of each file
     for (var i=0; i < commit["files"].length; i++) {
         html += '<li><a href="' + commit["files"][i]["filename"] + '">' + commit["files"][i]["filename"] + "</a></li>";
     }
  html += "</ul><hr>";

  var commits = document.createElement("div");
  commits.innerHTML = html;
  return commits;
};


module.exports = {
  fetchCommit,
  fetchCommits,
  commitInfo
};
