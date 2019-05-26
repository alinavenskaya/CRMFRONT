import superagentPromise from "superagent-promise";
import _superagent from "superagent";

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = "http://localhost:8080";
// const API_ROOT = "https://conduit.productionready.io/api";

// const encode = encodeURIComponent;
const responseBody = res => res.body;

let token = null;
const tokenPlugin = req => {
  if (token) {
    req.set("authorization", `Token ${token}`);
  }
};

// const contentPlugin = req => req.set("Content-Type", "application/json");

const requests = {
  del: url =>
    superagent
      .del(`${API_ROOT}${url}`)
      .use(tokenPlugin)
      .then(responseBody),
  get: url =>
    superagent
      .get(`${API_ROOT}${url}`)
      .use(tokenPlugin)
      .then(responseBody),
  put: (url, body) =>
    superagent
      .put(`${API_ROOT}${url}`, body)
      .use(tokenPlugin)
      // .use(contentPlugin)
      .then(responseBody),
  post: (url, body) =>
    superagent
      .post(`${API_ROOT}${url}`, body)
      .use(tokenPlugin)
      // .use(contentPlugin)
      .then(responseBody)
};

const Auth = {
  current: () => requests.get("/users/"),
  login: (email, password) =>
    requests.post("/users/signin", { user: { email, password } }),
  register: (username, email, password) =>
    requests.post("/users/signup", { user: { username, email, password } }),
  save: user => requests.put("/user", { user })
};

const Goals = {
  all: () => requests.get(`/goal/`),
  create: goal => requests.post(`/goal`, { goal }),
  delete: goalId => requests.del(`/goal/${goalId}`),
  update: goal => requests.put(`/goal/`, { goal })
};

const Tasks = {
  all: dealid => requests.get(`/task/${dealid}`),
  create: (dealid, task) => requests.post(`/task/${dealid}`, task),
  delete: taskid => requests.del(`/task/${taskid}`),
  update: (taskid, task) => requests.put(`/task/${taskid}`, task)
};

const Clients = {
  all: () => requests.get(`/clients/`),
  create: client => requests.post(`/client`, { client }),
  delete: clientid => requests.del(`/client/${clientid}`),
  update: client => requests.put(`/client/`, { client })
};

const Deals = {
  all: userid => requests.get(`/deals/${userid}`),
  create: deal => requests.post(`/deal`, deal),
  remove: dealid => requests.del(`/deal/${dealid}`),
  update: (dealid, clientid, deal) =>
    requests.put(`/deal/${dealid}/${clientid}`, deal),
  move: (dealid, deal) => requests.put(`/deal/move/${dealid}`, deal)
  // TODO: change deal stage
};

const Dashboard = {
  all: () => requests.get("/dashboard")
};

const Reports = {};

// const Tags = {
//   getAll: () => requests.get("/tags")
// };

// const limit = (count, p) => `limit=${count}&offset=${p ? p * count : 0}`;
// const omitSlug = article => Object.assign({}, article, { slug: undefined });
// const Articles = {
//   all: page => requests.get(`/articles?${limit(10, page)}`),
//   byAuthor: (author, page) =>
//     requests.get(`/articles?author=${encode(author)}&${limit(5, page)}`),
//   byTag: (tag, page) =>
//     requests.get(`/articles?tag=${encode(tag)}&${limit(10, page)}`),
//   del: slug => requests.del(`/articles/${slug}`),
//   favorite: slug => requests.post(`/articles/${slug}/favorite`),
//   favoritedBy: (author, page) =>
//     requests.get(`/articles?favorited=${encode(author)}&${limit(5, page)}`),
//   feed: () => requests.get("/articles/feed?limit=10&offset=0"),
//   get: slug => requests.get(`/articles/${slug}`),
//   unfavorite: slug => requests.del(`/articles/${slug}/favorite`),
//   update: article =>
//     requests.put(`/articles/${article.slug}`, { article: omitSlug(article) }),
//   create: article => requests.post("/articles", { article })
// };

// const Comments = {
//   create: (slug, comment) =>
//     requests.post(`/articles/${slug}/comments`, { comment }),
//   delete: (slug, commentId) =>
//     requests.del(`/articles/${slug}/comments/${commentId}`),
//   forArticle: slug => requests.get(`/articles/${slug}/comments`)
// };

// const Profile = {
//   follow: username => requests.post(`/profiles/${username}/follow`),
//   get: username => requests.get(`/profiles/${username}`),
//   unfollow: username => requests.del(`/profiles/${username}/follow`)
// };

export default {
  Auth,
  Deals,
  Goals,
  Tasks,
  Clients,
  Dashboard,
  Reports,
  //   Articles,
  //   Auth,
  //   Comments,
  //   Profile,
  //   Tags,
  setToken: _token => {
    token = _token;
  }
};
