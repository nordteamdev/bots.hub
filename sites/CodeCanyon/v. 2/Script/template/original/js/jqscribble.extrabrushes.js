//This is a custom brush that will draw small lines based off the stroke path.
LineBrush.prototype = new jqScribbleBrush;
function LineBrush()
{
	LineBrush.prototype.strokeBegin = function(x, y)
	{
		jqScribbleBrush.prototype.strokeBegin.call(this, x, y);
		this.lineRadius = 7; 
	};
	
	LineBrush.prototype.strokeMove = function(x, y)
	{
		jqScribbleBrush.prototype.strokeMove.call(this, x, y);
		
		this.context.moveTo(x-this.lineRadius, y-this.lineRadius);
		this.context.lineTo(x+this.lineRadius, y+this.lineRadius);
		
		this.context.strokeStyle = this.brushColor;
		this.context.stroke();
	};
};
//This is a custom brush that will draw small crosses based off the stroke path.
CrossBrush.prototype = new jqScribbleBrush;
function CrossBrush()
{
	CrossBrush.prototype.strokeBegin = function(x, y)
	{
		jqScribbleBrush.prototype.strokeBegin.call(this, x, y);
		this.lineRadius = 7; 
	};
	
	CrossBrush.prototype.strokeMove = function(x, y)
	{
		jqScribbleBrush.prototype.strokeMove.call(this, x, y);
		
		this.context.moveTo(x-this.lineRadius, y-this.lineRadius);
		this.context.lineTo(x+this.lineRadius, y+this.lineRadius);
		
		this.context.moveTo(x-this.lineRadius, y+this.lineRadius);
		this.context.lineTo(x+this.lineRadius, y-this.lineRadius);
		
		this.context.strokeStyle = this.brushColor;
		this.context.stroke();
	};
};

//This is a custom brush that will draw dots.
DotBrush.prototype = new jqScribbleBrush;
function DotBrush()
{
	DotBrush.prototype.strokeBegin = function(x, y)
	{
		jqScribbleBrush.prototype.strokeBegin.call(this, x, y);
		this.lineRadius = 1; 
	};
	
	DotBrush.prototype.strokeMove = function(x, y)
	{
		jqScribbleBrush.prototype.strokeMove.call(this, x, y);
		
		this.context.moveTo(x-this.lineRadius, y+this.lineRadius);
		this.context.lineTo(x+this.lineRadius, y-this.lineRadius);
		
		this.context.strokeStyle = this.brushColor;
		this.context.stroke();
	};
};

//This is a custom brush that will draw circles.
CircleBrush.prototype = new jqScribbleBrush;
function CircleBrush()
{
	CircleBrush.prototype.strokeBegin = function(x, y)
	{
		//For custom brushes make sure to call the parent brush methods
		jqScribbleBrush.prototype.strokeBegin.call(this, x, y);
		this.prevX = x; 
		this.prevY = y;
		this.lineRadius = 20; 
	};
	
	CircleBrush.prototype.strokeMove = function(x, y)
	{
		//For custom brushes make sure to call the parent brush methods
		jqScribbleBrush.prototype.strokeMove.call(this, x, y);

		this.context.beginPath();
      	this.context.arc(x, y, this.lineRadius, 0, 2 * Math.PI, false);
		
		this.context.strokeStyle = this.brushColor;
		this.context.stroke();
	};
};

//This is a custom brush that will draw semicircles.
SemiCircleBrush.prototype = new jqScribbleBrush;
function SemiCircleBrush()
{
	SemiCircleBrush.prototype.strokeBegin = function(x, y)
	{
		//For custom brushes make sure to call the parent brush methods
		jqScribbleBrush.prototype.strokeBegin.call(this, x, y);
		this.prevX = x; 
		this.prevY = y;
		this.lineRadius = 20; 
	};
	
	SemiCircleBrush.prototype.strokeMove = function(x, y)
	{
		//For custom brushes make sure to call the parent brush methods
		jqScribbleBrush.prototype.strokeMove.call(this, x, y);

		this.context.beginPath();
      	this.context.arc(x, y, this.lineRadius, 0, Math.PI, false);
		
		this.context.strokeStyle = this.brushColor;
		this.context.stroke();
	};
};

//This is a custom brush that will draw rectangles.
RectangleBrush.prototype = new jqScribbleBrush;
function RectangleBrush()
{
	RectangleBrush.prototype.strokeBegin = function(x, y)
	{
		//For custom brushes make sure to call the parent brush methods
		jqScribbleBrush.prototype.strokeBegin.call(this, x, y);
		this.prevX = x; 
		this.prevY = y;
		this.lineRadius = 20; 
	};
	
	RectangleBrush.prototype.strokeMove = function(x, y)
	{
		//For custom brushes make sure to call the parent brush methods
		jqScribbleBrush.prototype.strokeMove.call(this, x, y);

		this.context.beginPath();
      	this.context.rect(x, y, this.lineRadius, this.lineRadius);
		
		this.context.strokeStyle = this.brushColor;
		this.context.stroke();
	};
};



//This is a custom brush that will draw small lines based off the stroke path.
StoryBrush2.prototype = new jqScribbleBrush;
function StoryBrush2()
{
	StoryBrush2.prototype.strokeBegin = function(x, y)
	{
		jqScribbleBrush.prototype.strokeBegin.call(this, x, y);
		this.lineRadius = this.brushSize/2; 
		this.prevX = x; 
		this.prevY = y;
	};
	
	StoryBrush2.prototype.strokeMove = function(x, y)
	{
		jqScribbleBrush.prototype.strokeMove.call(this, x, y);
 
 
				
		var ctx = 		this.context;
			ctx.lineWidth = this.brushSize/2;	
			 ctx.shadowBlur = '0';
			 
			 ctx.lineCap = "butt";	
 
  ctx.moveTo(this.prevX, this.prevY);
  ctx.lineTo(x, y);
  ctx.stroke();
  
  
  ctx.moveTo(this.prevX - this.lineRadius, this.prevY - this.lineRadius);
  ctx.lineTo(x - this.lineRadius, y - this.lineRadius);
  ctx.stroke();
  
  ctx.moveTo(this.prevX - (this.lineRadius/2), this.prevY - (this.lineRadius/2));
  ctx.lineTo(x - (this.lineRadius/2), y - (this.lineRadius/2));
  ctx.stroke();
  
  ctx.moveTo(this.prevX + (this.lineRadius/2), this.prevY + (this.lineRadius/2));
  ctx.lineTo(x + (this.lineRadius/2), y + (this.lineRadius/2));
  ctx.stroke();
  
  ctx.moveTo(this.prevX + this.lineRadius, this.prevY + this.lineRadius);
  ctx.lineTo(x + this.lineRadius, y + this.lineRadius);
  ctx.stroke();
				
				
				
				
		this.context.strokeStyle = this.brushColor;
 

		
		this.prevX = x; 
		this.prevY = y;
	};
};

//All brushes should inherit from the Brush interface
StoryBrush3.prototype = new jqScribbleBrush;
function StoryBrush3()
{
	StoryBrush3.prototype.strokeBegin = function(x, y)
	{
		//For custom brushes make sure to call the parent brush methods
		jqScribbleBrush.prototype.strokeBegin.call(this, x, y);
		this.prevX = x; 
		this.prevY = y;
	};
	
	StoryBrush3.prototype.strokeMove = function(x, y)
	{
		//For custom brushes make sure to call the parent brush methods
		jqScribbleBrush.prototype.strokeMove.call(this, x, y);
		var ctx = this.context;
  ctx.lineWidth = this.brushSize;
  ctx.lineJoin = ctx.lineCap = 'round';
  ctx.shadowBlur = '2';//this.brushSize;
  ctx.shadowColor = this.brushColor;
		this.context.moveTo(this.prevX, this.prevY);
		this.context.lineTo(x, y);
		
		this.context.strokeStyle = 'white';//this.brushColor;
		this.context.stroke();
		
		this.prevX = x;
		this.prevY = y;
	};
};

//All brushes should inherit from the Brush interface
eraser.prototype = new jqScribbleBrush;
function eraser()
{  
	eraser.prototype.strokeBegin = function(x, y)
	{
		 this.context.beginPath();
		//For custom brushes make sure to call the parent brush methods
		jqScribbleBrush.prototype.strokeBegin.call(this, x, y);
		this.prevX = x; 
		this.prevY = y;
	};
	
	eraser.prototype.strokeMove = function(x, y)
	{
		//For custom brushes make sure to call the parent brush methods
		jqScribbleBrush.prototype.strokeMove.call(this, x, y);
		var ctx = this.context;
		ctx.lineWidth = this.brushSize;

		
			this.cImg = new Image();
            this.cImg.src = ga('#new_story_img_for_canvas')[0].src;
 
            ctx.strokeStyle = ctx.createPattern(this.cImg, "no-repeat");
			
 
			
			ctx.shadowBlur = '0';
 
		this.context.moveTo(this.prevX, this.prevY);
		this.context.lineTo(x, y);
		this.context.stroke();
		
		this.prevX = x;
		this.prevY = y;
	};
};