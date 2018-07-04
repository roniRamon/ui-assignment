import './styles/styles.scss';
//import { fetchCommit } from "./actions.js";
 var fetchCommit = require('./actions.js');
// Rock some code here
document.addEventListener("DOMContentLoaded", function(event) {

  //s how info for each commit
  fetchCommit('6e0009e18d6ed2580a7f571e3253b63404948804', function(data) {

    var message = data["commit"]["message"].length > 50 ? data["commit"]["message"].substr(0, 50) + "...": data["commit"]["message"];

    // add avatar??
    var html = "<h3><strong> Author's name </strong>" + data["commit"]["author"]["name"] + "</h3>";
    html += "<p><strong> Commit time </strong>" + data["commit"]["author"]["date"] + "</p>";
    html += "<p><strong> commit message: </strong>" + message + "</p>";
    html += "<p><strong> Additions: </strong>" + data["stats"]["additions"] + "</p>";
    html += "<p><strong> Deletions: </strong>" + data["stats"]["deletions"] + "</p>";
    html += "<p><strong> Files: " + data["files"][0]["filename"]+ "</strong></p>";
    html += "<ul>";
      // need to add link to the patch of each file 
       for (var i=0; i < data["files"].length; i++) {
           html += '<li><a href="' + data["files"][i]["filename"] + '">' + data["files"][i]["filename"] + "</a></li>";
       }
    html += "</ul>";

    document.getElementById("root").innerHTML = html;
  });

});



// For webpack HMR
if (module.hot) {
  module.hot.accept();
}
