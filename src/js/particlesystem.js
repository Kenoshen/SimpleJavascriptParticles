class ParticleSystem{
    constructor(display){
        this.display = display;
        this.particles = [];
        this.forces = [];
        this.emitters = [];
        this.particleSize = 1;
        this.maxParticles = 1000;
        this.showParticlePath = false;
        this.friction = 0.0001;
    }

    step(timeDelta){
        if (!this.showParticlePath)
        {
            this.display.clear();
        }
        var imageData = this.display.context.getImageData(0, 0, this.display.width, this.display.height);
        var pixels = imageData.data;

        this.emitters.forEach(e => {
            e.emit(this.particles, this.maxParticles);
        });

        this.particles.forEach(p => {
            this.forces.forEach(f => {
                p.applyForce(f.point, f.strength);
            });

            let nextPos = p.position.add(p.velocity);
            if (nextPos.x < 0 || this.display.width < nextPos.x) p.velocity = new Vector(p.velocity.x * -1, p.velocity.y);
            if (nextPos.y < 0 || this.display.height < nextPos.y) p.velocity = new Vector(p.velocity.x, p.velocity.y * -1);

            p.update(timeDelta, this.friction);

            let baseIndex = 4 * (~~p.position.y * this.display.width + ~~this.position.x);
            let pCol = p.color;
            let addCol = pCol.scale(pCol.w);
            var curIndex = baseIndex;
            for (var y = 0; y < this.particleSize; y++)
            {
                for (var x = 0; x < this.particleSize; x++)
                {
                    pixels[curIndex + (x * 4)] += addCol.x;
                    pixels[curIndex + 1 + (x * 4)] += addCol.y;
                    pixels[curIndex + 2 + (x * 4)] += addCol.z;
                    pixels[curIndex + 3 + (x * 4)] = addCol.w;
                }
                curIndex += this.display.width * 4;
            }
        });

        this.display.context.putImageData(imageData, 0, 0);

        this.particles = this.particles.filter(p => {return !(p.isDead)});
    }

    randPos(){
        var x = Math.random() * (this.display.width - this.particleWidth);
        var y = Math.random() * (this.display.height - this.particleHeight);
        return new Vector(x, y);
    }

    populateParticles(){
        this.display.clear();
        this.particles = [];
        for (var i = 0; i < this.maxParticles; i++)
        {
            this.particles.push(new Particle(this.randPos()));
        }
    }

    setVelocitiesToZero(){
        this.particles.forEach(p => {
            p.velocity = _Vector.ZERO;
        });
    }
}

class Force {
    constructor(point, strength=1){
        this.point = point;
        this.strength = strength;
    }
}

class Emitter {
    constructor(point){
        this.point = point;
    }

    emit(particles, maxParticles){
        if (particles.length < maxParticles){

        }
    }
}