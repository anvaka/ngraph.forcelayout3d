var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 3000);

var isWebGlSupported = ( function () { try { var canvas = document.createElement( 'canvas' ); return !! window.WebGLRenderingContext && ( canvas.getContext( 'webgl' ) || canvas.getContext( 'experimental-webgl' ) ); } catch( e ) { return false; } } )();
var renderer = isWebGlSupported ? new THREE.WebGLRenderer() : new THREE.CanvasRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var graph = require('ngraph.generators').grid3(10, 10, 10);

var layout = require('../')(graph);

var geometry = new THREE.CubeGeometry(5,5,5);
var nodeMaterial = new THREE.MeshBasicMaterial({color: 0x009e8f});

var ui = {};
graph.forEachNode(function (node) {
  var pos = layout.getNodePosition(node.id);
  var cube = new THREE.Mesh(geometry, nodeMaterial);
  ui[node.id] = cube;
  scene.add(cube);
});


var render = function () {
  requestAnimationFrame(render);
  layout.step();
  for (var key in ui) {
    var cube = ui[key];
    var pos = layout.getNodePosition(key);
    cube.position.x = pos.x;
    cube.position.y = pos.y;
    cube.position.z = pos.z;
  }
  var timer = Date.now() * 0.0002;
  camera.position.x = Math.cos( timer ) * 1500;
  camera.position.z = Math.sin( timer ) * 1500;
  camera.lookAt( scene.position );
  renderer.render(scene, camera);
};

render();
