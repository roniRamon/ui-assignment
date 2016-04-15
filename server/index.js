import restify from 'restify';
import fs from 'fs';

const server = restify.createServer({
  name: 'ui-assignment-api'
});

const db = JSON.parse(fs.readFileSync('server/db.json', 'utf8')).commits;

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.get('/commits', (req, res) => {
  if (req.query.start && !Number.isInteger(+req.query.start)){
    res.status(400);
  }
  if (req.query.limit && !Number.isInteger(+req.query.limit)){
    res.status(400);
  }
  let commits = [];
  commits = db.slice(req.query.start, (+req.query.start+req.query.limit)||undefined);
  res.json(commits);
});

server.get('/commits/:sha', (req, res) => {
  let sha = req.params.sha;
  let commit = db.find((commit)=>{
    return commit.sha === sha;
  });
  res.json(commit);
});

server.patch('/commits/:sha/commit', (req, res) => {
  let sha = req.params.sha;
  let commit = db.find((commit,i)=>{
    return commit.sha === sha;
  });
  Object.assign(commit.commit, req.body);
  res.json(commit);
});

server.listen(8080);
