console.log("Loaded particle.js");

function Particle(position, velocity, color)
{
    this.position = position;
    this.velocity = velocity;
    this.color = color;
}

Particle.prototype.toString = function()
{
    return "[Pos:" + this.position + " Vel:" + this.velocity + " Col:" + this.color + "]";
};

Particle.prototype.update = function(canvasWidth, canvasHeight, particleWidth, particleHeight, particleFriction)
{
    this.velocity.x *= 1 - particleFriction;
    this.velocity.y *= 1 - particleFriction;
    this.position.add(this.velocity);
    if (this.position.x + particleWidth > canvasWidth || this.position.x < 0)
    {
        if (this.position.x < 0)
        {
            this.position.x *= -1;
        }
        else
        {
            var tempPosX = this.position.x + particleWidth - canvasWidth;
            tempPosX *= -1;
            this.position.x += (tempPosX * 2);
        }
        this.velocity.x *= -1;
    }
    if (this.position.y + particleHeight > canvasHeight || this.position.y < 0)
    {
        if (this.position.y < 0)
        {
            this.position.y *= -1;
        }
        else
        {
            var tempPosY = this.position.y + particleHeight - canvasHeight;
            tempPosY *= -1;
            this.position.y += (tempPosY * 2);
        }
        this.velocity.y *= -1;
    }
};

Particle.prototype.draw = function(pixels, canvasWidth, canvasHeight, particleWidth, particleHeight)
{
    var baseIndex = 4 * (~~this.position.y * canvasWidth + ~~this.position.x);
    var addVect = new Vector(this.color.x * (this.color.w / 255), 
                             this.color.y * (this.color.w / 255), 
                             this.color.z * (this.color.w / 255), 
                             255);
    var curIndex = baseIndex;
    for (var y = 0; y < particleHeight; y++)
    {
        for (var x = 0; x < particleWidth; x++)
        {
            pixels[curIndex + (x * 4)] += addVect.x;
            pixels[curIndex + 1 + (x * 4)] += addVect.y;
            pixels[curIndex + 2 + (x * 4)] += addVect.z;
            pixels[curIndex + 3 + (x * 4)] = addVect.w;
        }
        curIndex += canvasWidth * 4;
    }
}; 

Particle.prototype.addGravityTowardsPoint = function(point, gravity)
{
    var dif = point.subtracted(this.position);
    dif.normalize();
    dif.multiply(gravity);
    this.velocity.add(dif);
};
