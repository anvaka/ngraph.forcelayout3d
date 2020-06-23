Force Directed layout in 3D
==========================
[![Build Status](https://travis-ci.org/anvaka/ngraph.forcelayout3d.png?branch=master)](https://travis-ci.org/anvaka/ngraph.forcelayout3d)

This is a [force directed](http://en.wikipedia.org/wiki/Force-directed_graph_drawing)
graph layouter in 3D space. It is using oct tree as an n-body solver. This
repository is part of [ngraph family](https://github.com/anvaka/ngraph), and
operates on [`ngraph.graph`](https://github.com/anvaka/ngraph.graph) data structure.

If two dimensions is enough please also checkout [ngraph.forcelayout](https://github.com/anvaka/ngraph.forcelayout)
For higher dimensions use [ngraph.forcelayout.nd](https://github.com/anvaka/ngraph.forcelayout.nd)

[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/anvaka/VivaGraphJS)

# API

First of all it's worth to mention all force directed algorithms are iterative.
We need to perform multiple iterations of an algorithm, before graph starts
looking aesthetically pleasing.

With that in mind, the easiest way to make graph look nice is:

``` js
// graph is an instance of `ngraph.graph` object.
var layout = require('ngraph.forcelayout3d')(graph);
for (var i = 0; i < ITERATIONS_COUNT; ++i) {
  layout.step();
}

// now we can ask layout where each node/link is best positioned:
graph.forEachNode(function(node) {
  console.log(layout.getNodePosition(node.id));
  // Node position is pair of x,y,z coordinates:
  // {x: ... , y: ... , z: ... }
});

graph.forEachLink(function(link) {
  console.log(layout.getLinkPosition(link.id));
  // link position is a pair of two positions:
  // {
  //   from: {x: ..., y: ..., z: ...},
  //   to: {x: ..., y: ..., z: ...}
  // }
});
```

Result of `getNodePosition()`/`getLinkPosition()` will be always the same for
the same node. This is true:

``` js
layout.getNodePosition(1) === layout.getNodePosition(1);
```

Reason for this is performance. If you are interested in storing positions
somewhere else, you can do it and they still will be updated after each force
directed layout iteration.

## "Pin" node and initial position

Sometimes it's desirable to tell layout algorithm not to move certain nodes.
This can be done with `pinNode()` method:

``` js
var nodeToPin = graph.getNode(nodeId);
layout.pinNode(nodeToPin, true); // now layout will not move this node
```

If you want to check whether node is pinned or not you can use `isNodePinned()`
method. Here is an example how to toggle node pinning, without knowing it's
original state:

``` js
var node = graph.getNode(nodeId);
layout.pinNode(node, !layout.isNodePinned(node)); // toggle it
```

What if you still want to move your node according to some external factor (e.g.
you have initial positions, or user drags pinned node)? To do this, call `setNodePosition()`
method:

``` js
layout.setNodePosition(nodeId, x, y, z);
```

## Monitoring changes

Like many other algorithms in `ngraph` family, force layout monitors graph changes
via [graph events](https://github.com/anvaka/ngraph.graph#listening-to-events).
It keeps layout up to date whenever graph changes:

``` js
var graph = require('ngraph.graph')(); // empty graph
var layout = require('ngraph.forcelayout3d')(graph); // layout of empty graph

graph.addLink(1, 2); // create node 1 and 2, and make link between them
layout.getNodePosition(1); // returns position.
```

If you want to stop monitoring graph events, call `dispose()` method:
``` js
layout.dispose();
```

## Configuring physics

Since this is force directed layout, sometimes it's desirable to adjust physics
settings. Please refer to [ngraph.physics.simulator](https://github.com/anvaka/ngraph.physics.simulator)
to see source code and simulator parameters. You can pass physics settings as a
second argument to layout constructor.

``` js
var physicsSettings = {gravity: -1.2}; // construct physics simulator settings

// pass it as second argument to layout:
var layout = require('ngraph.forcelayout3d')(graph, physicsSettings);
```

You can always get current physics simulator from layout by checking `layout.simulator`
property. This is read only property.


### Configuring integrator

If you find standard Euler integration producing too much errors and jitter,
consider using verlet integration:

``` js
var physicsSettings = {integrator: 'verlet'};

// pass it as second argument to layout:
var layout = require('ngraph.forcelayout3d')(graph, physicsSettings);
```

Kudos to @annxingyuan for the [PR](https://github.com/anvaka/ngraph.forcelayout3d/pull/1).


## Space occupied by graph

Finally, it's often desirable to know how much space does our graph occupy. To
quickly get bounding box use `getGraphRect()` method:

``` js
  var rect = layout.getGraphRect();
  // rect.x1, rect.y1, rect.z1 - left top back coordinates of bounding box
  // rect.x2, rect.y2, rect.z2 - right bottom front coordinates of bounding box
```

# install

With [npm](https://npmjs.org) do:

```
npm install ngraph.forcelayout3d
```

# license

MIT

# Feedback?

I'd totally love it! Please email me, open issue here, [tweet](https://twitter.com/anvaka)
to me, or join discussion [on gitter](https://gitter.im/anvaka/VivaGraphJS).
