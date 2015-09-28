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
    return new Vector(r, g, b, 1);
}

class Particle {
    set position(vec){this._position = vec}
    get position(){return this._position}

    set velocity(vec){this._velocity = vec}
    get velocity(){return this._velocity}

    set size(f){this._size = f}
    get size(){return this._size}

    get color(){return HSVtoRGB(Math.abs(this._velocity.norm().rads()), 0.9, 1)}

    //get color(){return new Vector(1, 0.5, 0.5, 1)}
    //get color(){
    //    let v = this._velocity.norm();
    //    return new Vector(v.x, v.y, 1 - v.y, 1);
    //}

    get ttl(){return this._ttl}
    get isDead(){return (this._ttl <= 0)}

    constructor(position=new Vector(), velocity=new Vector()){
        this.position = position;
        this.velocity = velocity;
        //this._ttl = null;
        this.size = 1;
    }

    toString(){return `[Pos:${this.position} Vel:${this.velocity} Col:${this.color} Ttl: ${this._ttl}}]`}
    update(timeDelta, friction){
        this.velocity = this.velocity.scale(1 - friction);
        this.position = this.position.add(this.velocity);
        this._ttl -= timeDelta;

        this.size = this.size + (1 - Math.random() * 2) * 2;
        if (this.size < 1) this.size = 1; else if (this.size > 50) this.size = 50;
    }
    applyForce(point, strength){
        let diff = point.sub(this.position);
        this.velocity = diff.norm().mul(strength).add(this.velocity)
    }
}
