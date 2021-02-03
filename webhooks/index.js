const http = require('http');
const shell = require('shelljs');
const createHandler = require('github-webhook-handler');

var handlerOpts = [{
  path: '/app1',
  secret: 'secret1'
}, {
  path: '/app2',
  secret: 'secret2'
}];

function generaterHandler(handlerOpts) {
  var handlers = handlerOpts.reduce(function(hs, opts) {
      hs[opts.path] = createHandler(opts)
      return hs
  }, {});

  return http.createServer(function(req, res) {
      var handler = handlers[req.url];
      handler && handler(req, res, function(err) {
        res.statusCode = 404
        res.end('no such location')
      })
  }).listen(3333);
}

var handler = generaterHandler(handlerOpts);

handler.on('error', function(err) {
  console.error('Error:', err.message);
});

handler.on('push', function (event) {
  const repository = event.payload.repository.name;
  const action = event.payload.action;

  console.log('Received a push for %s to %s', repository, action);

  var url = event.url
  switch (url) {
    // be careful if you use query to distinguish your app, url contains the querys, otherwise, it is equal to the path
    case '/ajoe':
      shell.cd('~/prodsite');
      shell.chmod('+x', '~/prodsite/webhooks/scripts/');
      shell.exec('~/prodsite/webhooks/scripts/deploy.sh');
      break
    case '/testRepo':
      shell.exec('./scripts/deploy.sh');
      break
    default:
      break
  }
});