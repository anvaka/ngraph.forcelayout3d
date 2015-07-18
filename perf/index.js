var create = require('ngraph.generators');

var Benchmark = require('benchmark');
var suite = new Benchmark.Suite;

// add tests
suite.add('Run default', function() {
  var graph = create.grid(20, 20);
  var layout = require('../')(graph);
  for (var i = 0; i < 20; ++i) {
    layout.step();
  }
}).add('Mostly fixed nodes', function() {
  var graph = create.grid(20, 20);
  var layout = require('../')(graph);
  graph.forEachNode(fixIt);
  // add tiny amount of unfixed nodes:
  graph.addLink(0, -1);
  graph.addLink(0, -2);

  for (var i = 0; i < 20; ++i) {
    layout.step();
  }

  function fixIt(node) {
    layout.pinNode(node, true);
  }
})
.on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').pluck('name'));
})
// run async
.run({ 'async': true });
