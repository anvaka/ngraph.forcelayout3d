var physics = require('ngraph.forcelayout/lib/primitives');

module.exports = function(pos) {
  return new physics.Body3d(pos);
}
