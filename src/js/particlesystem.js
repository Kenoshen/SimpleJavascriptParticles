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

        this.forceColor = new Vector(0, 1, 0, 1);
        this.forceSize = 4;
    }

    step(timeDelta){
        if (!this.showParticlePath)
        {
            this.display.clear();
        }
        var imageData = this.display.context.getImageData(0, 0, this.display.width, this.display.height);
        this.pixels = imageData.data;

        this.emitters.forEach(e => {
            e.emit(this);
        });

        for (var i = 0; i < this.particles.length; i++){
            var p = this.particles[i];
            this.forces.forEach(f => {
                p.applyForce(f.point, f.strength * timeDelta);
            });

            //let nextPos = p.position.add(p.velocity);

            //if (nextPos.x < 0)
            //    p.position = new Vector(this.display.width, p.position.y);
            //else if (this.display.width < nextPos.x)
            //    p.position = new Vector(0, p.position.y);
            //
            //if (nextPos.y < 0)
            //    p.position = new Vector(p.position.x, this.display.height);
            //else if (this.display.height < nextPos.y)
            //    p.position = new Vector(p.position.x, 0);

            p.update(timeDelta, this.friction);

            let baseIndex = 4 * (~~p.position.y * this.display.width + ~~p.position.x);
            let color = p.color;
            let addCol = color.scale(color.w).scale(255);
            var curIndex = baseIndex;
            for (var y = 0; y < p.size; y++)
            {
                for (var x = 0; x < p.size; x++)
                {
                    this.pixels[curIndex + (x * 4)] = addCol.x;
                    this.pixels[curIndex + 1 + (x * 4)] = addCol.y;
                    this.pixels[curIndex + 2 + (x * 4)] = addCol.z;
                    this.pixels[curIndex + 3 + (x * 4)] = addCol.w;
                }
                curIndex += this.display.width * 4;
            }
        }

        this.display.context.putImageData(imageData, 0, 0);

        this.particles = this.particles.filter(p => {return !(p.isDead)});
    }

    randPos(){
        let x = Math.random() * this.display.width;
        let y = Math.random() * this.display.height;
        return new Vector(x, y);
    }

    setVelocitiesToZero(){
        this.particles.forEach(p => {
            p.velocity = new Vector();
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

    emit(system){ }
    destroy() { }
}

class PeriodicRefreshEmitter extends Emitter {
    constructor(timeout){
        super(new Vector());

        this.intervalCallback = function(){
            if (this.system) {
                this.system.display.clear();
                this.system.particles = [];
                for (var i = 0; i < this.system.maxParticles; i++) {
                    this.system.particles.push(new Particle(this.system.randPos()));
                }
            }
        }
        this.timer = setInterval(this.intervalCallback, timeout);
    }

    emit(system){
        if (! this.system){
            this.system = system;
            this.intervalCallback();
        }
    }

    destroy(){
        this.system = null;
        clearInterval(this.timer);
    }
}