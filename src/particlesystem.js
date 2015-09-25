console.log("Loaded particlesystem.js");

function ParticleSystem(display)
{
    this.display = display;
}

ParticleSystem.prototype.init = function(numOfParticles, particleWidth, particleHeight, particleAlpha, gravity, friction)
{
    this.display.context.globalCompositeOperation = 'lighter';
    this.numOfParticles = numOfParticles || 1;
    this.particleWidth = particleWidth || 1;
    this.particleHeight = particleHeight || 1;
    this.particleAlpha = particleAlpha;
    this.gravity = gravity;
    this.friction = friction;
    this.pixelImageData = this.display.context.createImageData(this.particleWidth, this.particleHeight);
    this.pixelData = this.pixelImageData.data;
    this.createParticles();
    this.showParticlePath = false;
};

ParticleSystem.prototype.createParticles = function()
{
    this.display.clear();
    this.particles = new Array();
    for (var i = 0; i < this.numOfParticles; i++)
    {
        this.particles.push(new Particle(this.randPos(), new Vector(), new Vector(0, 0, 0, this.particleAlpha)));
    }
};

ParticleSystem.prototype.update = function(isMouseDown, mousePosition)
{
    var calcMouse = false;
    if (isMouseDown)
    {
        if (mousePosition.x > 0 && mousePosition.x < this.display.width)
        {
            if (mousePosition.y > 0 && mousePosition.y < this.display.height)
            {
                calcMouse = true;
            }
        }
    }
    for (var i = 0; i < this.numOfParticles; i++)
    {
        var particle = this.particles[i];
        if (calcMouse)
        {
            particle.addGravityTowardsPoint(mousePosition, this.gravity);
        }
        particle.update(this.display.width, this.display.height, this.particleWidth, this.particleHeight, this.friction);
        this.updateColor(particle);
    }
};

ParticleSystem.prototype.draw = function()
{
    if (!this.showParticlePath)
    {
        this.display.clear();
    }
    
    var imageData = this.display.context.getImageData(0, 0, this.display.width, this.display.height);
    var pixels = imageData.data;
    
    for (var i = 0; i < this.numOfParticles; i++)
    {
        var particle = this.particles[i];
        particle.draw(pixels, this.display.width, this.display.height, this.particleWidth, this.particleHeight);
        //this.display.fillStyle("rgba(" + particle.color.x + "," + particle.color.y + "," + particle.color.z + "," + (particle.color.w / 255) + ")");
        //this.display.drawRect(particle.position, this.particleWidth, this.particleHeight);
        
        /*
        var addVect = new Vector(particle.color.x * (particle.color.w / 255), 
                                 particle.color.y * (particle.color.w / 255), 
                                 particle.color.z * (particle.color.w / 255), 
                                 255);
        for (var k = 0; k + 3 < this.pixelData.length; k += 4)
        {
            this.pixelData[k] = addVect.x;
            this.pixelData[k + 1] = addVect.y;
            this.pixelData[k + 2] = addVect.z;
            this.pixelData[k + 3] = addVect.w;
        }
        this.display.context.putImageData(this.pixelImageData, particle.position.x, particle.position.y);
        */
    }
    
    this.display.context.putImageData(imageData, 0, 0);
};

ParticleSystem.prototype.setVelocitiesToZero = function()
{
    for (var i = 0; i < this.numOfParticles; i++)
    {
        this.particles[i].velocity.multiply(0);
    }
};

ParticleSystem.prototype.addGravityTowardsPoint = function(point)
{
    for (var i = 0; i < this.numOfParticles; i++)
    {
        this.particles[i].addGravityTowardsPoint(point, this.gravity);
    }
};

ParticleSystem.prototype.updateColor = function(particle)
{
    // var distToR = this.display.colPosR.distance(particle.position);
    // var distToG = this.display.colPosG.distance(particle.position);
    // var distToB = this.display.colPosB.distance(particle.position);
    
    // var colR = this.updateColorHelper(distToR);
    // var colG = this.updateColorHelper(distToG);
    // var colB = this.updateColorHelper(distToB);
    
    // particle.color.x = colR;
    // particle.color.y = colG;
    // particle.color.z = colB;

    var col = this.hsvToRgb(0.5, 0.1, 0.3);
    particle.color.x = 100;
    particle.color.y = particle.velocity.x * 100;
    particle.color.z = particle.velocity.y * 100;
}

ParticleSystem.prototype.hsvToRgb = function(h,s,v) {
    var r = 0;
    var g = 0;
    var b = 0;
    if ( s == 0 )                       //HSV from 0 to 1
    {
       r = v * 255
       g = v * 255
       b = v * 255
    }
    else
    {
       var _h = h * 6
       if ( _h == 6 ) _h = 0
       var _i = parseInt( _h )
       var _1 = v * ( 1 - s )
       var _2 = v * ( 1 - s * ( _h - _i ) )
       var _3 = v * ( 1 - s * ( 1 - ( _h - _i ) ) )

       if      ( _i == 0 ) { _r = v  ; _g = _3 ; _b = _1 }
       else if ( _i == 1 ) { _r = _2 ; _g = v  ; _b = _1 }
       else if ( _i == 2 ) { _r = _1 ; _g = v  ; _b = _3 }
       else if ( _i == 3 ) { _r = _1 ; _g = _2 ; _b = v  }
       else if ( _i == 4 ) { _r = _3 ; _g = _1 ; _b = v  }
       else                { _r = v  ; _g = _1 ; _b = _2 }

       R = _r * 255
       G = _g * 255
       B = _b * 255
    }
    return new Vector(r, g, b);
};

ParticleSystem.prototype.updateColorHelper = function(dist)
{
    if (dist === 0)
    {
        return 255;
    }
    else if (dist > this.display.colRange)
    {
        return 0;
    }
    else
    {
        return 255 - (Math.round((dist / this.display.colRange) * 255));
    }
};

ParticleSystem.prototype.randPos = function()
{
    var x = Math.random() * (this.display.width - this.particleWidth);
    var y = Math.random() * (this.display.height - this.particleHeight);
    return new Vector(x, y);
}

ParticleSystem.prototype.randCol = function()
{
    var r = Math.round(Math.random() * 255);
    var g = Math.round(Math.random() * 255);
    var b = Math.round(Math.random() * 255);
    return new Vector(r, g, b, 255);
}