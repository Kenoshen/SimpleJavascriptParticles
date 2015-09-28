class Application {
    constructor(canvas){
        this.display = new Display(canvas, 2000, 2000);
        this.system = new ParticleSystem(this.display);
        this.system.maxParticles = 50;
        this.system.particleSize = 10;
        this.system.showParticlePath = true;
        this.timeDelta = 60 / 1000;
    }

    start() {
        this.bouncingForce = new Force(this.system.randPos(), 0.5);
        //this.bouncingForce = new Force(new Vector(this.system.display.width / 2, this.system.display.height / 2), 1);
        this.system.forces.push(this.bouncingForce);
        this.bouncingForceDir = new Vector(1, 1);

        this.system.emitters.push(new PeriodicRefreshEmitter(3000));

        var that = this;
        window.requestAnimationFrame(function(){that.step();});
    }

    step() {
        this.bouncingForce.point = this.bouncingForce.point.add(this.bouncingForceDir);

        if (this.bouncingForce.point.x > this.display.width || this.bouncingForce.point.x < 0){
            this.bouncingForceDir = new Vector(this.bouncingForceDir.x * -1, this.bouncingForceDir.y);
        }
        if (this.bouncingForce.point.y > this.display.height || this.bouncingForce.point.y < 0){
            this.bouncingForceDir = new Vector(this.bouncingForceDir.x, this.bouncingForceDir.y * -1);
        }

        this.system.step(this.timeDelta);

        var that = this;
        window.requestAnimationFrame(function(){that.step();});
    }
}
