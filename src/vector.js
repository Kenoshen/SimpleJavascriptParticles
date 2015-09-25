console.log("Loaded vector.js");
function Vector(x, y, z, w)
{
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
    this.w = w || 0;
}

Vector.prototype.toString = function()
{
    return "(" + this.x.toFixed(3).replace(/\.?0+$/,'') + ", " + this.y.toFixed(3).replace(/\.?0+$/,'') + ", " + this.z.toFixed(3).replace(/\.?0+$/,'') + ", " + this.w.toFixed(3).replace(/\.?0+$/,'') + ")";
}

Vector.prototype.add = function(otherVector)
{
    this.x += otherVector.x;
    this.y += otherVector.y;
    this.z += otherVector.z;
    this.w += otherVector.w;
    return this;
};

Vector.prototype.added = function(otherVector)
{
    return (new Vector(this.x, this.y, this.z, this.w)).add(otherVector);
};

Vector.prototype.subtract = function(otherVector)
{
    this.x -= otherVector.x;
    this.y -= otherVector.y;
    this.z -= otherVector.z;
    this.w -= otherVector.w;
    return this;
};

Vector.prototype.subtracted = function(otherVector)
{
    return (new Vector(this.x, this.y, this.z, this.w)).subtract(otherVector);
};

Vector.prototype.multiply = function(factor)
{
    this.x *= factor;
    this.y *= factor;
    this.z *= factor;
    this.w *= factor;
    return this;
};

Vector.prototype.multiplied = function(factor)
{
    return (new Vector(this.x, this.y, this.z, this.w)).multiply(factor);
};

Vector.prototype.divide = function(factor)
{
    this.x /= factor;
    this.y /= factor;
    this.z /= factor;
    this.w /= factor;
    return this;
};

Vector.prototype.divided = function(factor)
{
    return (new Vector(this.x, this.y, this.z, this.w)).divide(factor);
};

Vector.prototype.invert = function()
{
    return this.multiply(-1);
};

Vector.prototype.inverted = function()
{
    return this.multiplied(-1);
};

Vector.prototype.abs = function()
{
    this.x = Math.abs(this.x);
    this.y = Math.abs(this.y);
    this.z = Math.abs(this.z);
    this.w = Math.abs(this.w);
    return this;
};

Vector.prototype.absoluted = function()
{
    return (new Vector(this.x, this.y, this.z, this.w)).abs();
};

Vector.prototype.distance = function(otherVector)
{
    var diff = this.subtracted(otherVector);
    var dist = Math.sqrt((diff.x * diff.x) + (diff.y * diff.y) + (diff.z * diff.z) + (diff.w * diff.w));
    return dist;
};

Vector.prototype.length = function()
{
    return this.distance(new Vector(0, 0, 0, 0));
};

Vector.prototype.normalize = function()
{
    var len = this.length();
    if (len !== 0)
    {
        this.divide(len);
    }
    return this;
};

Vector.prototype.normalized = function()
{
    return (new Vector(this.x, this.y, this.z, this.w)).normalize();
}; 
