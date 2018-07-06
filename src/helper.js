

function filesInfo(files, callback) {
  let ulFiles = document.createElement("ul");
  let fileName;

  for (let i=0; i < files.length; i++) {
     fileName = document.createElement("li");
     fileName.innerHTML =  files[i]["filename"];

     if(files[i]["patch"] !== undefined){
       fileName.setAttribute("class", "btn");
       fileName.addEventListener("click",function(){callback(files[i]["patch"], "file");});
     }

     ulFiles.appendChild(fileName);
  }

  return ulFiles;
}

// Commit Object
function Commits() {}

Commits.prototype.add = function(data) {
  this[data["sha"]] = data;
  return this;
};

Commits.prototype.updateMessage = function(data, val) {
  this[data["sha"]]["commit"]["message"] = val;
  return this;
};

Commits.prototype.findObj = function(sha){
  return this[sha];
};

Commits.prototype.searchForAuthor = function(name) {
  let shaArray = Object.keys(this);
  let commitsToShow = [];
  for(let i = 0; i < shaArray.length; i++) {
    let str = this[shaArray[i]]["commit"]["author"]["name"];
    if(str.includes(name)){
      commitsToShow.push(shaArray[i]);
    }
  }
  return commitsToShow;
};

let commits = new Commits();


module.exports = {
  filesInfo,
  commits
};
