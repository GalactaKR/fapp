const posts = require('./posts/posts.service.js');
const history = require('./history/history.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(posts);
  app.configure(history);
}
