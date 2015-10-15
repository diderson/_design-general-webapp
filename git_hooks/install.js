var fs = require('fs');
var path = require('path');
console.info('Moving scripts');
['applypatch-msg', 'commit-msg', 'post-commit', 'post-receive', 'post-update', 'pre-applypatch', 'pre-commit',
 'prepare-commit-msg', 'pre-rebase', 'update'].forEach(function (hook) {
  var hookInSourceControl = path.resolve('git_hooks', hook);
  if (fs.existsSync(hookInSourceControl)) {
    var hookInHiddenDirectory = path.resolve('git_hooks', '..', '.git', 'hooks', hook);

    if (fs.existsSync(hookInHiddenDirectory)) {
      fs.unlinkSync(hookInHiddenDirectory);
    }

    fs.linkSync(hookInSourceControl, hookInHiddenDirectory);
  }
});