/**
 * @copyright SoftServlet
 *
 * This file is destinated to be used by evanto buyers of this product
 *
 * It requires Jquery Framework
 */


function detector(el)
{	
	/**
	 * The path to detect.php PHP Script that
	 * will return the desired data about image
	 */
	this.detectHandler =  '../cmd.php';
	
	/**
	 * The image element that we will detect faces
	 * Jquery Object
	 */
	this.element = $(el);
	
	/**
	 * The size of DOM Image
	 * Array
	 */
	this.size =  {width: 0, height:0};

	/**
	 * Event on before Send ajax request
	 */
	this.beforeDetectEvent = function(){ };

	/**
	 * Event on after faces are detected
	 */
	this.afterDetectEvent = function(){ };
	
	/**
	 * Event on face click
	 *
	 * @param Face X coord
	 * @param Face Y coord
	 * @param face width / height w
	 */
	this.onFaceClickEvent = function(x,y,w){ }

	/**
	 * The ratio between the displayed image in page and the original image
	 * 
	 */
	this.ratio = 1;

	/**
	 * If the image was already wrapped by a parent div
	 * this value will be set to true
	 */
	this.wrapped = false;

	/**
	 * Initialize the detector object
	 *
	 * @param element jQuery element with image
	 */
}
	detector.prototype.init =  function()
	{
		this.wrapped = false;

		this.size.width = $(this.element).outerWidth();

		this.size.height = $(this.element).outerHeight();
	}
	
	/**
	 * Set the beforeDetectEvent callback
	 */
	detector.prototype.beforeDetect = function(handler)
	{
		this.beforeDetectEvent = handler;
	}
	
	/**
	 * Set the afterDetectEvent callback
	 */
	detector.prototype.afterDetect = function(handler)
	{
		this.afterDetectEvent = handler;
	}
	
	/**
	 * Set the onFaceClickEvent callback
	 */
	detector.prototype.onFaceClick = function(handler)
	{
		this.onFaceClickEvent = handler;
	}

	/**
	 * Set the ratio depending on width of image in page
	 * and width of original image
	 */
	detector.prototype.setRatio = function(width)
	{
		ratio = this.size.width / width;
		
		if(ratio != 0) this.ratio = ratio;
	}

	/**
	 * Detect the faces with an Ajax Call to php script
	 * then draw them to the image
	 */

	detector.prototype.detect = function()
	{
		this.init();
		
		data = this.call(function(data,object)
		{	
			if( data == false ) return false;
	
			object.setRatio(data.size.w);

			for(i=0;i<data.faces.length;i++)
			{
				face = data.faces[i];

				object.wrapFace(face, data.size);
			}
			object.drawFaces();
		});

	}

	/**
	 * Place the faces into html DOM
	 */
	detector.prototype.drawFaces = function()
	{
		this.wrap();
	
		$(this.element).parent().append(this.wrapped);
			
		$(this.element).appendTo(this.wrapped);
		
		var object = this;

		$('.detector-face').click(function()
		{
			x = parseFloat($(this).attr('face-x'));
			y = parseFloat($(this).attr('face-y'));
			w = parseFloat($(this).attr('face-w'));

			return object.onFaceClickEvent(x,y,w);
		});
	}

	/**
	 * Create a square around the detected face
	 *
	 * @param x coord
	 * @param y coord
	 * @param ratio
	 * @param width
	 */
	detector.prototype.wrapFace = function(face)
	{
		//this.wrap();

		facediv = document.createElement('div');

		$(facediv).addClass('detector-face');
		
		$(facediv).css(
		{
			'width' : face.w * this.ratio,
			'height': face.w * this.ratio,
			'margin-left' : (face.x * this.ratio) -this.element[0].naturalWidth - this.element.width(),
			'margin-top'  : (face.y * this.ratio) -this.element[0].naturalHeight - this.element.height()
		});

		$(facediv).attr(
		{
			'face-x' : face.x,
			'face-y' : face.y,
			'face-w' : face.w,
			'ids' : $(this.element).attr('id')
		});
		
		$(this.wrapped).append(facediv);

		return this;
	}

	/**
	 * Wrap a parent div around the image
	 *
	 * This div will hold the detected faces
	 */
	detector.prototype.wrap = function()
	{
		if(this.wrapped !== false) return;

		this.wrapped = document.createElement('div');
		
		$(this.wrapped).addClass('detector-container');
		
		$(this.wrapped).attr('id',$(this.element).attr('src'));
	
	}

	/**
	 * Call the PHP Script that will return 
	 * us the desired data about the image
	 *
	 * The php script location can be modified at this.detectHandler
	 */
	detector.prototype.call =  function(handler)
	{
		var object = this;

		return $.ajax(
		{
				url: this.detectHandler,
				data: 
				{
					cmd:'phpFaceDetector',
					photo: this.element.attr('src')
				},
				type: 'POST',
				dataType: 'json',
				success: function(e)
				{console.log(e);
					handler(e,object);
					object.afterDetectEvent();
				},error:function(a,b,c){alert(a+b+c)},
				beforeSend: this.beforeDetectEvent

		}).responseText;
	}


