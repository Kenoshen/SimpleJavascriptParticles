class Vector {
    _x;
    _y;
    _z;
    _w;
    get x (){return this._x};
    get y(){return this._y};
    get z (){return this._z};
    get w (){return this._w};

    constructor(x=0, y=0, z=0, w=0){
        this._x = x;
        this._y = y;
        this._z = z;
        this._w = w;
    }

    toString(){
        return `(${this.x.toFixed(3).replace(/\.?0+$/,'')}, ${this.y.toFixed(3).replace(/\.?0+$/,'')}, ${this.z.toFixed(3).replace(/\.?0+$/,'')}, ${this.w.toFixed(3).replace(/\.?0+$/,'')})`;
    }

    add(other){return new Vector(this.x + other.x, this.y + other.y, this.z + other.z, this.w + other.w)}

    subtract(other){return new Vector(this.x - other.x, this.y - other.y, this.z - other.z, this.w - other.w)}
    sub(other){return this.sub(other)}
    difference(other){return this.sub(other)}
    diff(other){return this.sub(other)}

    scale(factor){return new Vector(this.x * factor, this.y * factor, this.z * factor, this.w * factor)}
    multiply(factor){return this.scale(factor)}
    mul(factor){return this.scale(factor)}

    divide(factor){if (factor === 0) return _Vector.ZERO; else return new Vector(this.x / factor, this.y / factor, this.z / factor, this.w / factor)}

    invert(){return this.scale(-1)}

    abs(){return new Vector(Math.abs(this.x), Math.abs(this.y), Math.abs(this.z), Math.abs(this.w))}

    distanceTo(other){
        let diff = this.sub(other)
        return Math.sqrt((diff.x * diff.x) + (diff.y * diff.y) + (diff.z * diff.z) + (diff.w * diff.w));
    }
    distance(other){return this.distanceTo(other)}
    dist(other){return this.distanceTo(other)}

    length(){return this.distanceTo(new Vector(0, 0, 0, 0))}
    len(){return this.len()}

    normalize(){return this.divide(this.length())}
    norm(){return this.normalize()}

    radiansTo(other){ return Math.atan2(other.x - this.x, other.y - this.y)}
    radsTo(other){return radiansTo(other)}
}

let _Vector = {
    get ZERO() {return new Vector()},
    get ONE() {return new Vector(1, 1, 1, 1)},
    get ONE2D() {return new Vector(1, 1)},
    get ONE3D() {return new Vector(1, 1, 1)},
    get UP() {return new Vector(0, 1)}
}