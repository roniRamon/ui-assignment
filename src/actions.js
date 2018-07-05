// action to fetch 25 commits
function fetchCommits(callback) {
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
}
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
  console.log(message);
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
  let message = commit["commit"]["message"].length > 50 ? commit["commit"]["message"].substr(0, 50) + "...": commit["commit"]["message"];
  let date = commit["commit"]["author"]["date"].split(/["T","Z"]/);
  // add avatar??

  let ul = document.createElement("ul");
  let li = document.createElement("li");
  li.innerHTML = "<span class='strong'> Author: </span>" + commit["commit"]["author"]["name"];
  ul.appendChild(li); // name
  li = document.createElement("li");
  li.innerHTML = "<span class='strong'> Time: </span>" + date[0] + "  " + date[1];
  ul.appendChild(li); // time
  li = document.createElement("li");
  li.setAttribute("class", "btn");
  li.innerHTML = "<span class='strong'> Message: </span>" + message;
  li.addEventListener("click", function(){showModal(commit, "message");});
  ul.appendChild(li); // message
  li = document.createElement("li");
  li.innerHTML = "<span class='strong'> Additions: </span><span class='add'>" +
                  commit["stats"]["additions"] + "</span>";
  li.innerHTML += "<span class='strong'> | Deletions: </span><span class='minus'>" +
                  commit["stats"]["deletions"] + "</span>";
  ul.appendChild(li); // remove
  li = document.createElement("li");
  li.innerHTML = "<span class='strong'> Files: </span>";
  ul.appendChild(li); // files
  //
  li = document.createElement("li");
  let ulFiles = document.createElement("ul");

    // link to the patch of each file if patch not undefined
    let fileName;
     for (let i=0; i < commit["files"].length; i++) {
        fileName = document.createElement("li");
        fileName.innerHTML =  commit["files"][i]["filename"];
        if(commit["files"][i]["patch"] !== undefined){
          fileName.setAttribute("class", "btn");
          fileName.addEventListener("click",
            function(){showModal(commit["files"][i]["patch"], "file");
          });
        }
        ulFiles.appendChild(fileName);
     }
  li.appendChild(ulFiles);
  ul.appendChild(li);
  ul.appendChild(document.createElement("hr"));

  return ul;
};

function showModal(data, type) {
let modal = document.getElementById('modal');
let content = document.getElementById('content');
content.innerHTML = "";
if(type === "message"){
  // create textArea for edit message
  let div = document.createElement("div");
  let editButton = document.createElement("button");
  editButton.innerHTML = "Edit";
  editButton.addEventListener("click",
    function(){editMessage(data);
  });
  div.innerHTML = data["commit"]["message"];
  content.appendChild(div);
  content.appendChild(editButton);
  // Add button for edit => edit function
} else {
  content.innerHTML = data;
}

modal.style.display = "block";
// When the user clicks on <span> (x), close the modal
let span = document.getElementsByClassName("close")[0];
span.onclick = function() {
    modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
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
  content.innerHTML = "";

  let textArea = document.createElement("textarea");
  data = document.createTextNode(message);
  textArea.appendChild(data);
  content.appendChild(textArea);

  //Buttons for save and cancel
  let saveButton = document.createElement("button");
  saveButton.innerHTML = "Save";
  saveButton.addEventListener("click",
     function(){
       patchCommitMessage(shaNum, textArea.value);
  });
  content.appendChild(saveButton);

  let cancelButton = document.createElement("button");
  cancelButton.innerHTML = "Save";
  // cancelButton.addEventListener("click",
    // function(){ cencel(data);
  // });
}


module.exports = {
  fetchCommit,
  fetchCommits,
  commitInfo
};
