class Application {
    constructor(canvas){
        this.display = new Display(canvas, 250, 250);
        this.system = new ParticleSystem(this.display);
        this.reqAnimFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;
        this.timeDelta = 1000 / 30;
    }

    start() {
        this.bouncingForce = new Force(this.system.randPos(), 10);
        this.system.forces.push(this.bouncingForce);
        this.bouncingForceDir = new Vector(1, 1);
        setInterval(() => {
            this.system.populateParticles();
        }, 30000);


        setInterval(this.step.bind(this), 1); // TODO: this doesn't work...
        //this.reqAnimFrame(this.step); // TODO: this doesn't work either...
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
        //this.reqAnimFrame(this.step);
    }
}
