console.log("Loaded display.js");

function Display(canvas)
{
    this.canvas = canvas;
    this.context = undefined;
    this.scale = 1;
}

Display.prototype.init = function()
{
    this.context = this.canvas.getContext("2d");
    this.context.scale(this.scale, this.scale);
    
    this.width = this.canvas.width / this.scale;
    this.height = this.canvas.height / this.scale;
    
    this.colPosR = new Vector(this.width / 2, 0);
    this.colPosG = new Vector(this.width / 4, this.height);
    this.colPosB = new Vector(this.width * .8, this.height / 4);
    this.colRange = this.width * 1.25;
};

Display.prototype.drawRect = function(point, w, h)
{
    this.context.fillRect(point.x, point.y, w, h);
};

Display.prototype.drawLine = function(startPoint, endPoint)
{
    this.context.beginPath();
    this.context.moveTo(startPoint.x, startPoint.y);
    this.context.lineTo(endPoint.x, endPoint.y);
    this.context.stroke();
};

Display.prototype.drawText = function(text, point, width)
{
    this.context.fillText(text, point.x, point.y, width);
};

Display.prototype.drawCircle = function(point, radius)
{
    this.context.beginPath();
    this.context.arc(point.x, point.y, radius, 0, Math.PI * 2);
    this.context.closePath();
    this.context.fill();
};

Display.prototype.fillStyle = function(fill)
{
    this.context.fillStyle = fill;
};

Display.prototype.strokeStyle = function(fill)
{
    this.context.strokeStyle = fill;
};

Display.prototype.clear = function(fill)
{
    this.context.clearRect(0, 0, this.width, this.height);
};

Display.prototype.left = function()
{
    return this.canvas.getBoundingClientRect().left;
};

Display.prototype.top = function()
{
    return this.canvas.getBoundingClientRect().top;
};

Display.prototype.right = function()
{
    return this.canvas.getBoundingClientRect().right;
};

Display.prototype.bottom = function()
{
    return this.canvas.getBoundingClientRect().bottom;
};