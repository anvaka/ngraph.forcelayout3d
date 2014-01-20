/**
 * This module provides all required forces to regular ngraph.physics.simulator
 * to make it 3d simulator. Ideally ngraph.phoysics.simulator should operate
 * with vectors, but on practices that showed performance decrease... Maybe
 * I was doing it wrong, will see if I can refactor/throw away this module.
 */
module.exports = createLayout;

function createLayout(graph, physicsSettings) {
  var createSimulator = require('ngraph.physics.simulator');
  var createForceLayout = require('ngraph.forcelayout');
  var merge = require('ngraph.merge');
  var physicsSettings = merge(physicsSettings, {
        createQuadTree: require('ngraph.quadtreebh3d'),
        createBounds: require('./lib/bounds'),
        createDragForce: require('./lib/dragForce'),
        createSpringForce: require('./lib/springForce'),
        integrator: require('./lib/eulerIntegrator'),
        createBody: require('./lib/createBody')
      });

  var simulator3d = createSimulator(physicsSettings);

  var layout = createForceLayout(graph, simulator3d);

  return layout;
}
