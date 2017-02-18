module.exports = integrate;

function integrate(bodies, timeStep) {
  var tx = 0, ty = 0, tz = 0,
      i, max = bodies.length;

  for (i = 0; i < max; ++i) {
    var body = bodies[i],
      coeff = timeStep / body.mass;

    body.pos.x = 2 * body.pos.x - body.prevPos.x + (body.force.x / body.mass) * timeStep * timeStep
    body.pos.y = 2 * body.pos.y - body.prevPos.y + (body.force.y / body.mass) * timeStep * timeStep
    body.pos.z = 2 * body.pos.z - body.prevPos.z + (body.force.z / body.mass) * timeStep * timeStep

    tx += Math.abs(body.pos.x - body.prevPos.x)
    ty += Math.abs(body.pos.y - body.prevPos.y)
    tz += Math.abs(body.pos.z - body.prevPos.z)
  }

  return (tx * tx + ty * ty + tz * tz)/bodies.length;
}
