var test = require('tap').test,
    createBody = require('../lib/createBody'),
    createGraph = require('ngraph.graph'),
    createLayout = require('..');

test('does not tolerate bad input', function (t) {
  t.throws(missingGraph);
  t.throws(invalidNodeId);
  t.end();

  function missingGraph() {
    // graph is missing:
    createLayout();
  }

  function invalidNodeId() {
    var graph = createGraph();
    var layout = createLayout(graph);

    // we don't have nodes in the graph. This should throw:
    layout.getNodePosition(1);
  }
});

test('can add bodies which are standard prototype names', function (t) {
  var graph = createGraph();
  graph.addLink('constructor', 'watch');

  var layout = createLayout(graph);
  layout.step();

  graph.forEachNode(function (node) {
    var pos = layout.getNodePosition(node.id);
    t.ok(pos && typeof pos.x === 'number' &&
         typeof pos.y === 'number' &&
         typeof pos.z === 'number', 'Position is defined');
  });

  t.end();
});

test('layout initializes nodes positions', function (t) {
  var graph = createGraph();
  graph.addLink(1, 2);

  var layout = createLayout(graph);

  // perform one iteration of layout:
  layout.step();

  graph.forEachNode(function (node) {
    var pos = layout.getNodePosition(node.id);
    t.ok(pos && typeof pos.x === 'number' &&
          typeof pos.y === 'number' &&
          typeof pos.z === 'number', 'Position is defined');
  });

  graph.forEachLink(function (link) {
    var linkPos = layout.getLinkPosition(link.id);
    t.ok(linkPos && linkPos.from && linkPos.to, 'Link position is defined');
    var fromPos = layout.getNodePosition(link.fromId);
    t.ok(linkPos.from === fromPos, '"From" should be identical to getNodePosition');
    var toPos = layout.getNodePosition(link.toId);
    t.ok(linkPos.to === toPos, '"To" should be identical to getNodePosition');
  });

  t.end();
});

// todo: layout.setNodePosition() should accept three arguments
