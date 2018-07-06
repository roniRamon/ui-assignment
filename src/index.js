import './styles/styles.scss';
let Actions = require('./actions.js');
let Helper = require('./helper.js');
let fetchCommit = Actions.fetchCommit;
let fetchCommits = Actions.fetchCommits;
let commitInfo = Actions.commitInfo;
let commits = Helper.commits;
let authorSearch = Actions.authorSearch;
// Rock some code here
document.addEventListener("DOMContentLoaded", function(event) {

  fetchCommits(function(data) {
    for (let j=0; j < data.length; j++) {
      document.getElementById("root").appendChild( commitInfo(data[j]) );
       commits.add(data[j]);
    }
  });

  // a tag for 25 more commits
  // if(idxStart < 200) {
  let moreCommits = document.createElement("a");
  moreCommits.innerHTML = "Show More Commits";
  moreCommits.onclick = function(e){
    fetchCommits(function(data) {
      for (let j=0; j < data.length; j++) {
        let rootDiv = document.getElementById("root");
        rootDiv.appendChild( commitInfo(data[j]) );
         commits.add(data[j]);
      }
    });

  };
  //need to remove link if No more result to fetch
  document.getElementById("link").appendChild(moreCommits);
  let input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Search...";
  input.addEventListener('keydown', function (e) {
     authorSearch(this.value);
   }, false);

  // input. = function(e) {
  //   authorSearch(this.value);
  // };
  document.getElementById("searchInput").appendChild(input);
});


// For webpack HMR
if (module.hot) {
  module.hot.accept();
}
