console.log("Loaded app.js");

WPS = {};
WPS.app = function() {
    var globalIsMouseDown = false;
    var globalMousePosition = new Vector();
    var globalDisplay = undefined;
    var globalParticleSystem = undefined;

    var framesPerSecond = 10;
    var millisecondsPerFrame = 1000 / framesPerSecond;

    var reqAnimFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;

    var globalCanvasX = 0;
    var globalCanvasY = 0;
    var globalWHRatio = 1;
    var globalCanvasStyleWidth = window.innerWidth;
    var globalCanvasWidth = globalCanvasStyleWidth * globalWHRatio;
    var globalCanvasStyleHeight = window.innerHeight;
    var globalCanvasHeight = globalCanvasStyleHeight * globalWHRatio;

    var globalParticleLen = 50000;
    var globalParticleWidth = 2;
    var globalParticleHeight = 1;
    var globalParticleAlpha = 255;
    var globalParticleGravity = 0.05;
    var globalParticleFriction = 0.000;

    var bouncingPoint = new Vector(Math.random() * globalCanvasWidth, Math.random() * globalCanvasHeight);
    var bouncingPointDir = new Vector(1, 1);

    var urlParams = {};
    if (document.URL.indexOf("?") != -1) {
        var urlSplit = document.URL.split("?")[1].split("&");
        for (var i = 0; i < urlSplit.length; i++) {
            var paramVal = urlSplit[i].split("=");
            urlParams[paramVal[0]] = parseInt(paramVal[1]);
        }
    }
    if (urlParams.len !== undefined) {
        globalParticleLen = urlParams.len;
    }
    if (urlParams.a !== undefined) {
        globalParticleAlpha = urlParams.a;
    }

    var globalCanvas = document.getElementById("window");
    var globalCanvasSaveNum = 0;
    // globalCanvas.style.width = globalCanvasStyleWidth + "px";
    // globalCanvas.style.height = globalCanvasStyleHeight + "px";
    globalCanvas.width = globalCanvasWidth;
    globalCanvas.height = globalCanvasHeight;

    var globalStats = undefined;

    setInterval(function(){
        globalParticleSystem.createParticles();
    }, 30000);

    function start() {
        globalDisplay = new Display(globalCanvas);
        globalDisplay.init();
        globalParticleSystem = new ParticleSystem(globalDisplay);
        globalParticleSystem.init(globalParticleLen, globalParticleWidth, globalParticleHeight, globalParticleAlpha, globalParticleGravity, globalParticleFriction);

        globalStats = new Stats();
        globalStats.setMode(0);
        globalStats.domElement.style.position = "absolute";
        globalStats.domElement.style.left = "0px";
        globalStats.domElement.style.top = "0px";
        // TODO: un-comment to see the FPS box
        //document.body.appendChild(globalStats.domElement);

        globalCanvas.addEventListener("mousemove", getMousePosition);
        globalCanvas.addEventListener("touchmove", getTouchPosition);
        globalCanvas.addEventListener("mousedown", function(evt) {
            globalIsMouseDown = true;
            getMousePosition(evt);
            evt.preventDefault();
        });
        document.body.onmouseup = function(evt) {
            globalIsMouseDown = false;
            getMousePosition(evt);
        };
        globalCanvas.addEventListener("touchstart", function(evt) {
            globalIsMouseDown = true;
            getTouchPosition(evt);
        });
        document.body.ontouchend = function(evt) {
            globalIsMouseDown = false;
            getTouchPosition(evt);
        };
        document.body.onkeydown = function(evt) {
            //console.log("" + evt.keyCode);
            // space key
            if (evt.keyCode === 32) {
                globalParticleSystem.setVelocitiesToZero();
                return false;
            }
            // r key
            else if (evt.keyCode === 82) {
                globalParticleSystem.createParticles();
            }
            // s key
            else if (evt.keyCode === 83) {
                globalParticleSystem.showParticlePath = true;
            }
            // num pad 2 key
            else if (evt.keyCode === 98) {
                globalParticleSystem.addGravityTowardsPoint(new Vector(globalCanvasWidth / 2, globalCanvasHeight));
            }
            // num pad 4 key
            else if (evt.keyCode === 100) {
                globalParticleSystem.addGravityTowardsPoint(new Vector(0, globalCanvasHeight / 2));
            }
            // num pad 5 key
            else if (evt.keyCode === 101) {
                globalParticleSystem.addGravityTowardsPoint(new Vector(globalCanvasWidth / 2, globalCanvasHeight / 2));
            }
            // num pad 6 key
            else if (evt.keyCode === 102) {
                globalParticleSystem.addGravityTowardsPoint(new Vector(globalCanvasWidth, globalCanvasHeight / 2));
            }
            // num pad 8 key
            else if (evt.keyCode === 104) {
                globalParticleSystem.addGravityTowardsPoint(new Vector(globalCanvasWidth / 2, 0));
            }
        };
        document.body.onkeyup = function(evt) {
            // s key
            if (evt.keyCode === 83) {
                globalParticleSystem.showParticlePath = false;
            } 
            // enter key
            else if (evt.keyCode === 13) {
                globalCanvasSaveNum += 1;
                var dataURL = globalCanvas.toDataURL();
                var newImg = document.createElement("img");
                newImg.id = "img" + globalCanvasSaveNum;
                newImg.class = "savedimage";
                var windowDiv = document.getElementById("window");
                newImg.style.width = windowDiv.style.width;
                newImg.style.height = windowDiv.style.height;
                document.getElementById("saved").appendChild(newImg);
                newImg.src = dataURL;
                return false;
            }
        };

        //setInterval(run, millisecondsPerFrame);
        reqAnimFrame(run);
    }

    function run() {
        bouncingPoint.x += bouncingPointDir.x;
        bouncingPoint.y += bouncingPointDir.y;
        if (bouncingPoint.x > globalCanvasWidth || bouncingPoint.x < 0){
            bouncingPointDir.x *= -1;
        }
        if (bouncingPoint.y > globalCanvasHeight || bouncingPoint.y < 0){
            bouncingPointDir.y *= -1;
        }

        globalStats.begin();
        globalParticleSystem.addGravityTowardsPoint(bouncingPoint);
        globalParticleSystem.update(globalIsMouseDown, globalMousePosition);
        globalParticleSystem.draw();
        reqAnimFrame(run);
        globalStats.end();
    }

    function getMousePosition(evt) {
        globalMousePosition = new Vector((evt.clientX - globalDisplay.left()) * globalWHRatio, (evt.clientY - globalDisplay.top()) * globalWHRatio);
        return false;
    }

    function getTouchPosition(evt) {
        if (!evt) {
            evt = event;
        }
        globalMousePosition = new Vector((evt.targetTouches[0].pageX - globalDisplay.left()) * globalWHRatio, (evt.targetTouches[0].pageY - globalDisplay.top()) * globalWHRatio);
        return false;
    }

    start();
}();
