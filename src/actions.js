let Helper = require('./helper.js');
let filesInfo = Helper.filesInfo;
let commits = Helper.commits;

// action to fetch 25 commits
const fetchCommits = function(callback) {
  const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          let data;
          try {
            data = JSON.parse(xhttp.responseText);
          }
          catch(err) {
            console.log(err.message + " in " + xhttp.responseText);
            return;
          }
          callback(data);
       }
    };
  let idx = fetchCommits.calledTimes;
  xhttp.open("GET", `http://localhost:8080/commits?start=${idx}&limit=25`);
  xhttp.send();
  fetchCommits.calledTimes += 25;
};
fetchCommits.calledTimes = 0;

// action to get a commit base on sha number
const fetchCommit = function(sha, callback) {
  const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          let data;
          try {
            data = JSON.parse(xhttp.responseText);
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
};

//action to edit a commit message
const patchCommitMessage = function(sha,message){
  const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          document.getElementById('modal').style.display = "none";
       }
    };
  xhttp.open("PATCH", `http://localhost:8080/commits/${sha}/commit`);
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(JSON.stringify({"message": message}));
};

// show commit info
const commitInfo = function(commit){
  console.log(commit);
  let message = commit["commit"]["message"].length > 50 ? commit["commit"]["message"].substr(0, 50) + "...": commit["commit"]["message"];
  let date = commit["commit"]["author"]["date"].split(/["T","Z"]/);
  let ulFiles = filesInfo(commit["files"], showModal);
  // add avatar??
  let ul        = document.createElement("ul");
  let liAuthor  = document.createElement("li");
  let liDate    = document.createElement("li");
  let liMessage = document.createElement("li");
  let liAdd     = document.createElement("li");
  let liFiles   = document.createElement("li");
  let liListFi  = document.createElement("li");
  let hr        = document.createElement("hr");

  liAuthor.innerHTML  = "<span class='strong'> Author: </span>" + commit["commit"]["author"]["name"];
  liDate.innerHTML    = "<span class='strong'> Time: </span>" + date[0] + "  " + date[1];
  liMessage.innerHTML = "<span class='strong'> Message: </span>" + message;
  liFiles.innerHTML   = "<span class='strong'> Files: </span>";
  liAdd.innerHTML     = "<span class='strong'> Additions: </span><span class='add'>" +
                         commit["stats"]["additions"] + "</span><span class='strong'> | Deletions: </span><span class='minus'>" +
                         commit["stats"]["deletions"] + "</span>";

  liMessage.setAttribute("class", "btn");
  liMessage.setAttribute("id", commit["sha"]);
  liMessage.addEventListener("click", function(){showModal(commit, "message");});

  liListFi.appendChild(ulFiles);
  ul.appendChild(liAuthor);
  ul.appendChild(liDate);
  ul.appendChild(liMessage);
  ul.appendChild(liAdd);
  ul.appendChild(liFiles);
  ul.appendChild(liListFi);
  ul.appendChild(hr);

  return ul;
};

function showModal(data, type) {
  let modal = document.getElementById('modal');
  let content = document.getElementById('content');
  let span = document.getElementsByClassName("close")[0]; // close modal (x)
  content.innerHTML = "";

  if(type === "message"){
    // create textArea for edit message
    let div = document.createElement("div");
    let editButton = document.createElement("button");
    let h3 = document.createElement("h3");

    div.innerHTML = data["commit"]["message"];
    editButton.innerHTML = "Edit";
    editButton.addEventListener("click",function(){editMessage(data);});
    h3.innerHTML = "Commit Message";

    content.appendChild(h3);
    content.appendChild(div);
    content.appendChild(editButton);
  // Add button for edit => edit function
  } else {
    content.innerHTML = data;
  }

  modal.style.display = "block";
  span.onclick = function() {
    modal.style.display = "none";
  };
  // clicks outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
}

function editMessage(data) {
  let shaNum = data.sha;
  let message = data.commit.message;
  let content = document.getElementById('content');

  let h3 = document.createElement("h3");
  let textArea = document.createElement("textarea");
  let saveButton = document.createElement("button");
  let cancelButton = document.createElement("button");
  let div = document.createElement("div");
  let text = document.createTextNode(message);

  saveButton.innerHTML   = "Save";
  saveButton.type        = "submit";
  cancelButton.innerHTML = "Cancel";
  content.innerHTML      = "";
  h3.innerHTML           = "Commit Message";

  //Buttons for save and cancel
  saveButton.addEventListener("click",
     function(event){
       patchCommitMessage(shaNum, textArea.value);
       commits.updateMessage(data, textArea.value);
       render(commits);
  });
  // cancelButton.addEventListener("click",
    // function(){ cencel(data);
  // });

  textArea.appendChild(text);
  content.appendChild(h3);
  content.appendChild(textArea);
  div.appendChild(saveButton);
  div.appendChild(cancelButton);
  content.appendChild(div);

}

function authorSearch(val) {
  let shaArray = commits.searchForAuthor(val);
  let obj = {};
  for (let i = 0; i < shaArray.length; i++) {
    obj[shaArray[i]] = commits.findObj(shaArray[i]);
  }
  render(obj);
}


function render(obj) {
  let shaArray = Object.keys(obj);
  let rootDiv = document.getElementById("root");
  rootDiv.innerHTML = "";

  for (let j=0; j < shaArray.length; j++) {
    rootDiv.appendChild( commitInfo(obj[shaArray[j]]) );
  }
}

module.exports = {
  fetchCommit,
  fetchCommits,
  commitInfo,
  showModal,
  authorSearch
};
