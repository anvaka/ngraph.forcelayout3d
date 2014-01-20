var test = require('tap').test,
    createBody = require('../lib/createBody'),
    bounds = require('../lib/bounds');

test('update bounding box', function (t) {
  var bodies = [];
  var b = bounds(bodies);
  b.update();

  // empty bodies, but box should exist:
  var box = b.box;
  ['x1', 'y1', 'z1', 'x2', 'y2', 'z2'].forEach(function (key) {
    t.ok(typeof box[key] === 'number', 'Has ' + key + ' property');
  });

  bodies.push(createBody({x: 0, y: 0, z: 0}));
  bodies.push(createBody({x: 1, y: 1, z: 1}));

  b.update();
  // now two bodies, and box should be 0, 0, 0 > 1, 1, 1
  t.equals(box.x1, 0); t.equals(box.y1, 0); t.equals(box.z1, 0);
  t.equals(box.x2, 1); t.equals(box.y2, 1); t.equals(box.z2, 1);

  t.end();
});

// TODO: more tests!
