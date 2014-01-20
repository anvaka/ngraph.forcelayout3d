module.exports = createLayout;

function createLayout(graph, physicsSettings) {
  var createSimulator = require('ngraph.physics.simulator');
  var createForceLayout = require('ngraph.forcelayout');

  var simulator3d = createSimulator({
    createQuadTree: require('ngraph.quadtreebh3d'),
    createBounds: require('./lib/bounds'),
    createDragForce: require('./lib/dragForce'),
    createSpringForce: require('./lib/springForce'),
    integrator: require('./lib/eulerIntegrator'),
    createBody: require('./lib/createBody')
  });

  var layout = createForceLayout(graph, simulator3d);

  return layout;
}
