/* accepts parameters
 * h  Object = {h:x, s:y, v:z}
 * OR
 * h, s, v
 */
function HSVtoRGB(h, s, v) {
    var r, g, b, i, f, p, q, t;
    if (arguments.length === 1) {
        s = h.s, v = h.v, h = h.h;
    }
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
    return new Vector(
        Math.round(r * 255),
        Math.round(g * 255),
        Math.round(b * 255),
        1);
}

class Particle {
    _position
    _velocity
    _ttl

    set position(vec){this._position = vec}
    get position(){return this._position}

    set velocity(vec){this._velocity = vec}
    get velocity(){return this._velocity}

    get color(){return HSVtoRGB(this._velocity.norm().radsTo(_Vector.UP, 1, 1))}

    get ttl(){return this._ttl}
    get isDead(){return (this._ttl <= 0)}

    constructor(position=_Vector.ZERO, velocity=_Vectory.ZERO){
        this.position = position;
        this.velocity = velocity;
    }

    toString(){return `[Pos:${this.position} Vel:${this.velocity} Col:${this.color} Ttl: ${_ttl}}]`}
    update(timeDelta, friction){
        this.velocity = this.velocity.scale(1 - friction);
        this.position = this.position.add(this.velocity);
        this._ttl -= timeDelta;
    }
    applyForce(point, strength){
        let diff = point.sub(this.position);
        this.velocity = diff.norm().mul(strength * Math.sqrt(diff.len())).add(this.velocity)
    }
}

//Particle.prototype.draw = function(pixels, canvasWidth, canvasHeight, particleWidth, particleHeight)
//{
//    var baseIndex = 4 * (~~this.position.y * canvasWidth + ~~this.position.x);
//    var addVect = new Vector(this.color.x * (this.color.w / 255),
//                             this.color.y * (this.color.w / 255),
//                             this.color.z * (this.color.w / 255),
//                             255);
//    var curIndex = baseIndex;
//    for (var y = 0; y < particleHeight; y++)
//    {
//        for (var x = 0; x < particleWidth; x++)
//        {
//            pixels[curIndex + (x * 4)] += addVect.x;
//            pixels[curIndex + 1 + (x * 4)] += addVect.y;
//            pixels[curIndex + 2 + (x * 4)] += addVect.z;
//            pixels[curIndex + 3 + (x * 4)] = addVect.w;
//        }
//        curIndex += canvasWidth * 4;
//    }
//};
