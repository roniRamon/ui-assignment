import restify from 'restify';
import fs from 'fs';

const server = restify.createServer({
  name: 'ui-assignment-api'
});

const db = JSON.parse(fs.readFileSync('server/db.json', 'utf8')).commits;

server.use(restify.CORS());
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.get('/commits', (req, res) => {
  if (req.query.start && !Number.isInteger(+req.query.start)){
    res.send(400);
  }
  if (req.query.limit && !Number.isInteger(+req.query.limit)){
    res.send(400);
  }
  let start = parseInt(req.query.start)||0;
  let end = start + parseInt(req.query.limit);
  let commits = db.slice(start, end||undefined);
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
