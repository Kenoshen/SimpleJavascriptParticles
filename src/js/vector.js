class Vector {
    constructor(x=0, y=0, z=0, w=0){
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
        this.__proto__ = _StaticVectorPrototype
    }

    toString(){
        return `(${this.x.toFixed(3).replace(/\.?0+$/,'')}, ${this.y.toFixed(3).replace(/\.?0+$/,'')}, ${this.z.toFixed(3).replace(/\.?0+$/,'')}, ${this.w.toFixed(3).replace(/\.?0+$/,'')})`;
    }
}


class VectorPrototype {
    get ZERO() {return new Vector()}
    get UP() {return new Vector(0, 1)}

    add(other){return new Vector(this.x + other.x, this.y + other.y, this.z + other.z, this.w + other.w)}

    subtract(other){return new Vector(this.x - other.x, this.y - other.y, this.z - other.z, this.w - other.w)}
    sub(other){return this.subtract(other)}
    difference(other){return this.subtract(other)}
    diff(other){return this.subtract(other)}

    scale(factor){return new Vector(this.x * factor, this.y * factor, this.z * factor, this.w * factor)}
    multiply(factor){return this.scale(factor)}
    mul(factor){return this.scale(factor)}

    divide(factor){if (factor === 0) return new Vector(); else return new Vector(this.x / factor, this.y / factor, this.z / factor, this.w / factor)}

    invert(){return this.scale(-1)}

    abs(){return new Vector(Math.abs(this.x), Math.abs(this.y), Math.abs(this.z), Math.abs(this.w))}

    distanceTo(other){
        let diff = this.sub(other)
        return Math.sqrt((diff.x * diff.x) + (diff.y * diff.y) + (diff.z * diff.z) + (diff.w * diff.w));
    }
    distance(other){return this.distanceTo(other)}
    dist(other){return this.distanceTo(other)}

    length(){return this.distanceTo(new Vector(0, 0, 0, 0))}
    len(){return this.length()}

    normalize(){return this.divide(this.length())}
    norm(){return this.normalize()}

    radiansTo(other){ return Math.atan2(other.x - this.x, other.y - this.y) }
    radsTo(other){ return this.radiansTo(other) }
    radians(){ return this.radiansTo(new Vector(0, 1)) }
    rads(){ return this.radians() }
}

let _StaticVectorPrototype = new VectorPrototype();

//let _Vector = {
//    get ZERO() {return new Vector()},
//    get ONE() {return new Vector(1, 1, 1, 1)},
//    get ONE2D() {return new Vector(1, 1)},
//    get ONE3D() {return new Vector(1, 1, 1)},
//    get UP() {return new Vector(0, 1)},
//
//    add(a, b){return new Vector(a.x + b.x, a.y + b.y, a.z + b.z, a.w + b.w)},
//
//    subtract(a, b){return new Vector(a.x - b.x, a.y - b.y, a.z - b.z, a.w - b.w)},
//    sub(a, b){return this.subtract(a, b)},
//    difference(a, b){return this.subtract(a, b)},
//    diff(a, b){return this.subtract(a, b)},
//
//    scale(a, factor){return new Vector(a.x * factor, a.y * factor, a.z * factor, a.w * factor)},
//    multiply(a, factor){return this.scale(a, factor)},
//    mul(a, factor){return this.scale(a, factor)},
//
//    divide(a, factor){if (factor === 0) return this.ZERO; else return new Vector(a.x / factor, a.y / factor, a.z / factor, a.w / factor)},
//
//    invert(a){return this.scale(a, -1)},
//
//    abs(a){return new Vector(Math.abs(a.x), Math.abs(a.y), Math.abs(a.z), Math.abs(a.w))},
//
//    distanceTo(a, b){
//        let diff = this.sub(a, b)
//        return Math.sqrt((diff.x * diff.x) + (diff.y * diff.y) + (diff.z * diff.z) + (diff.w * diff.w));
//    },
//    distance(a, b){return this.distanceTo(a, b)},
//    dist(a, b){return this.distanceTo(a, b)},
//
//    length(a){return this.distanceTo(a, new Vector(0, 0, 0, 0))},
//    len(a){return this.length(a)},
//
//    normalize(a){return this.divide(a, this.length(a))},
//    norm(a){return this.normalize(a)},
//
//    radiansTo(a, b){ return Math.atan2(b.x - a.x, b.y - a.y) },
//    radsTo(a, b){ return this.radiansTo(a, b) }
//}