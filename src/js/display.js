class Display{
    get width(){return this.canvas.width}
    get height(){return this.canvas.height}

    constructor(canvas, width, height){
        this.canvas = canvas;
        this.canvas.width = width;
        this.canvas.height = height;
        this.context = canvas.getContext("2d");
    }

    clear(){
        this.context.clearRect(0, 0, this.width, this.height);
    }
}