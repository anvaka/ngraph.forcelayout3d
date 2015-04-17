/**
 * This module provides all required forces to regular ngraph.physics.simulator
 * to make it 3D simulator. Ideally ngraph.physics.simulator should operate
 * with vectors, but on practices that showed performance decrease... Maybe
 * I was doing it wrong, will see if I can refactor/throw away this module.
 */
module.exports = createLayout;
createLayout.get2dLayout = require('ngraph.forcelayout');

function createLayout(graph, physicsSettings) {
  var merge = require('ngraph.merge');
  physicsSettings = merge(physicsSettings, {
        createQuadTree: require('ngraph.quadtreebh3d'),
        createBounds: require('./lib/bounds'),
        createDragForce: require('./lib/dragForce'),
        createSpringForce: require('./lib/springForce'),
        integrator: require('./lib/eulerIntegrator'),
        createBody: require('./lib/createBody')
      });

  return createLayout.get2dLayout(graph, physicsSettings);
}
