var physics = require('ngraph.physics.primitives');

module.exports = function(pos) {
  return new physics.Body3d(pos);
}
