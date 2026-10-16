/* https://api.github.com/users/<username>/events */

const { argv } = require('node:process');
// print process.argv
argv.forEach((val, index) => {
  console.log(`${index}: ${val}`);
});
const username = argv[2];

async function getActivity(username) {
  const res = await fetch(`https://api.github.com/users/${username}/events`, {
    headers: {
      "User-Agent": "node-cli",
      "Accept": "application/vnd.github+json",
    },
  });

  if (res.status === 404) throw new Error(`User "${username}" not found`);
  if (res.status === 403) throw new Error("Rate limit hit, try again later");
  if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);

  return res.json();
}
function describe(event){
    const repo = event.repo.name;
    const p = event.payload;
    if (event!=null){
        switch(event.type){
                 case "PushEvent":
      return `Pushed ${p.commits?.length ?? 0} commit(s) to ${repo}`;
    case "IssuesEvent":
      return `${p.action} an issue in ${repo}`;
    case "IssueCommentEvent":
      return `Commented on an issue in ${repo}`;
    case "PullRequestEvent":
      return `${p.action} a pull request in ${repo}`;
    case "WatchEvent":
      return `Starred ${repo}`;
    case "ForkEvent":
      return `Forked ${repo}`;
    case "CreateEvent":
      return `Created ${p.ref_type} ${p.ref ?? ""} in ${repo}`.replace("  ", " ");
    default:
      return `${event.type} in ${repo}`;
        }
    }
}
getActivity(username)
    .then((events) => {
        if(events.length ===0){
            console.log("last one")
            return
        }else{
            for(const event of events){
                describe(event);
            }
        }
    })