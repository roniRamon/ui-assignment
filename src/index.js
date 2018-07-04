import './styles/styles.scss';
var Actions = require('./actions.js');
var fetchCommit = Actions.fetchCommit;
var fetchCommits = Actions.fetchCommits;
var commitInfo = Actions.commitInfo;
// Rock some code here
document.addEventListener("DOMContentLoaded", function(event) {

  fetchCommits(function(data) {
    for (var j=0; j < data.length; j++) {
      document.getElementById("root").appendChild( commitInfo(data[j]) );
    }
  });

  // a tag for 25 more commits
  // if(idxStart < 200) {
    var moreCommits = document.createElement("a");
    moreCommits.innerHTML = "Show More Commits";
    moreCommits.onclick = function(e){
      fetchCommits(function(data) {
        for (var j=0; j < data.length; j++) {
          document.getElementById("root").appendChild( commitInfo(data[j]) );
        }
      });

    }
    //need to remove link if No more result to fetch
    document.getElementById("link").appendChild(moreCommits);
  // }

});



// For webpack HMR
if (module.hot) {
  module.hot.accept();
}

//ex fetchCommit('6e0009e18d6ed2580a7f571e3253b63404948804', function(data) {
