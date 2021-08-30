<?php
/**
* This file contains FaceDetector class which is used to detect
* faces in a image.
* 
*  LICENSE: This file is destinated to be sold on CodeCanyon only by
*  the user SoftServlet. Reselling or distributing this file is not
*  allowed.
*
* The class requires as parameter a valid path or URL to the image.
* By calling the faceDetect() method an array with detected faces
* will be returned. Each face is an array with the following format:
* array(
*		//The Y coordinate to the top left corner of face
*		'y' => int
*
*		//The X coordinate to the top left corner of face
*		'x' => int
*
*		//The width of face
*		'w' => int		
*  )
*/

class FaceDetector
{
	/** 
	* Detection computing data
	*/
    protected $detection_data;

	/**
	* The image resource
	*/
    protected $canvas;

	/**
	* The detected faces
	*/
   	protected  $faces = array();

	/**
	* The path to image
	*/
    protected $jpeg;

	/**
	* The reduced form of this photo
	* used by the efficient algorythm to reduce load
	*/
	private $reduced_canvas;
		
	/** 
	* Class constructor
	*
	* @param $jpeg = path to jpeg image to detect faces
	*/
    public function __construct($jpeg){
				$this->jpeg = 'http://localhost/'.$jpeg;
				$detection_file = $_SERVER['DOCUMENT_ROOT'].'/inc/phpfacedetector/detection.dat';
        if (is_file($detection_file)) {
            $this->detection_data = unserialize(file_get_contents($detection_file));
        } else {
            throw new Exception("Couldn't load detection data");
        }
    }

	/**
	* bool faceDetect
	*
	* Descr: This method detect the faces in the photo and returns true
	*				if successfull or false if no face was detected
	* 
	* @param none
	*/

    public function faceDetect()
    {
        if (is_resource($this->jpeg)) {

            $this->canvas = $this->jpeg;

        }elseif( ($file = @file_get_contents($this->jpeg)) ){

						$this->canvas = imagecreatefromstring($file);

        } else {

            throw new Exception("Can not load $this->jpeg");
        }

        $im_width = imagesx($this->canvas);
        $im_height = imagesy($this->canvas);

        //Resample before detection?
        $ratio = 0;
        $diff_width = 320 - $im_width;
        $diff_height = 240 - $im_height;
        if ($diff_width > $diff_height) {
            $ratio = $im_width / 320;
        } else {
            $ratio = $im_height / 240;
        }

        if ($ratio != 0) {
            $this->reduced_canvas = imagecreatetruecolor($im_width / $ratio, $im_height / $ratio);

            imagecopyresampled(
                $this->reduced_canvas,
                $this->canvas,
                0,
                0,
                0,
                0,
                $im_width / $ratio,
                $im_height / $ratio,
                $im_width,
                $im_height
            );

            $stats = $this->getImgStats($this->reduced_canvas);

            $this->faces = $this->doDetectGreedyBigToSmall(
                $stats['ii'],
                $stats['ii2'],
                $stats['width'],
                $stats['height']
            );
						foreach($this->faces as $i => $face){
            	if ($face['w'] > 0) {
              	 $this->faces[$i]['x'] *= $ratio;
               	 $this->faces[$i]['y'] *= $ratio;
               	 $this->faces[$i]['w'] *= $ratio;
           		}
						}
        } else {
            $stats = $this->getImgStats($this->canvas);

            $this->faces = $this->doDetectGreedyBigToSmall(
                $stats['ii'],
                $stats['ii2'],
                $stats['width'],
                $stats['height']
            );
        }
        foreach($this->faces as $face) if($face['w'] > 0) return true;
				return false;
    }

	/**
	* toJpeg
	*
	* Descr: Draw a rectagle on detected face and return the image resource
	*
	* @param int $r, $g, $b - the rgb code of the rectangle colour. Default is red
	* @return image resource
	*/
    public function toJpeg($r = 255, $g = 0, $b = 0)
   	{
        $color = imagecolorallocate($this->canvas, $r, $g, $b); //red
				
				foreach($this->faces as $face){
        imagerectangle(
            $this->canvas,
            $face['x'],
            $face['y'],
            $face['x']+ $face['w'],
            $face['y']+ $face['w'],
            $color
        );
				}
       
        return $this->canvas;
    }
		
	/**
	*
	* Return a JSON Encoded string with face coordinates
	* It is easy to use for javascript rectangle drawing
	*/
    public function toJson()
    {
        return json_encode($this->faces);
    }

	/**
	*  Return the array with face coordinates
	*/ 
    public function getFaces()
    {
        return $this->faces;
    }
		
		public function getImgSize($canvas = null)
		{
			if(is_null($canvas)) $canvas = $this->canvas;
			$image_width = imagesx($canvas);
			$image_height = imagesy($canvas);
			return array('w' => $image_width, 'h' => $image_height);
		}
		//--------------------------------------------------------
		//------ PROTECTED METHODS
		//--------------------------------------------------------

    function getImgStats($canvas)
    {
        $image_width = imagesx($canvas);
        $image_height = imagesy($canvas);
        $iis =  $this->computeII($canvas, $image_width, $image_height);
        return array(
            'width' => $image_width,
            'height' => $image_height,
            'ii' => $iis['ii'],
            'ii2' => $iis['ii2']
        );
    }

    protected function computeII($canvas, $image_width, $image_height)
    {
        $ii_w = $image_width+1;
        $ii_h = $image_height+1;
        $ii = array();
        $ii2 = array();

        for ($i=0; $i<$ii_w; $i++) {
            $ii[$i] = 0;
            $ii2[$i] = 0;
        }

        for ($i=1; $i<$ii_h-1; $i++) {
            $ii[$i*$ii_w] = 0;
            $ii2[$i*$ii_w] = 0;
            $rowsum = 0;
            $rowsum2 = 0;
            for ($j=1; $j<$ii_w-1; $j++) {
                $rgb = ImageColorAt($canvas, $j, $i);
                $red = ($rgb >> 16) & 0xFF;
                $green = ($rgb >> 8) & 0xFF;
                $blue = $rgb & 0xFF;
                $grey = (0.2989*$red + 0.587*$green + 0.114*$blue)>>0;  // this is what matlab uses
                $rowsum += $grey;
                $rowsum2 += $grey*$grey;

                $ii_above = ($i-1)*$ii_w + $j;
                $ii_this = $i*$ii_w + $j;

                $ii[$ii_this] = $ii[$ii_above] + $rowsum;
                $ii2[$ii_this] = $ii2[$ii_above] + $rowsum2;
            }
        }
        return array('ii'=>$ii, 'ii2' => $ii2);
    }

    protected function doDetectGreedyBigToSmall($ii, $ii2, $width, $height)
    {
				$detected = array();
        $s_w = $width/20.0;
        $s_h = $height/20.0;
        $start_scale = $s_h < $s_w ? $s_h : $s_w;
        $scale_update = 1 / 1.2;
        for ($scale = $start_scale; $scale > 1; $scale *= $scale_update) {
            $w = (20*$scale) >> 0;
            $endx = $width - $w - 1;
            $endy = $height - $w - 1;
            $step = max($scale, 2) >> 0;
            $inv_area = 1 / ($w*$w);
            for ($y = 0; $y < $endy; $y += $step) {
                for ($x = 0; $x < $endx; $x += $step) {
                    $passed = $this->detectOnSubImage($x, $y, $scale, $ii, $ii2, $w, $width+1, $inv_area);
                    if ($passed) {
                        $detected[] =  array('x'=>$x, 'y'=>$y, 'w'=>$w);
										}
                } // end x
            } // end y
        }  // end scale
        return $detected;
    }

    protected function detectOnSubImage($x, $y, $scale, $ii, $ii2, $w, $iiw, $inv_area)
    {
        $mean  = ($ii[($y+$w)*$iiw + $x + $w] + $ii[$y*$iiw+$x] - $ii[($y+$w)*$iiw+$x] - $ii[$y*$iiw+$x+$w])*$inv_area;

        $vnorm = ($ii2[($y+$w)*$iiw + $x + $w]
                  + $ii2[$y*$iiw+$x]
                  - $ii2[($y+$w)*$iiw+$x]
                  - $ii2[$y*$iiw+$x+$w])*$inv_area - ($mean*$mean);

        $vnorm = $vnorm > 1 ? sqrt($vnorm) : 1;

        $passed = true;
        for ($i_stage = 0; $i_stage < count($this->detection_data); $i_stage++) {
            $stage = $this->detection_data[$i_stage];
            $trees = $stage[0];

            $stage_thresh = $stage[1];
            $stage_sum = 0;

            for ($i_tree = 0; $i_tree < count($trees); $i_tree++) {
                $tree = $trees[$i_tree];
                $current_node = $tree[0];
                $tree_sum = 0;
                while ($current_node != null) {
                    $vals = $current_node[0];
                    $node_thresh = $vals[0];
                    $leftval = $vals[1];
                    $rightval = $vals[2];
                    $leftidx = $vals[3];
                    $rightidx = $vals[4];
                    $rects = $current_node[1];

                    $rect_sum = 0;
                    for ($i_rect = 0; $i_rect < count($rects); $i_rect++) {
                        $s = $scale;
                        $rect = $rects[$i_rect];
                        $rx = ($rect[0]*$s+$x)>>0;
                        $ry = ($rect[1]*$s+$y)>>0;
                        $rw = ($rect[2]*$s)>>0;
                        $rh = ($rect[3]*$s)>>0;
                        $wt = $rect[4];

                        $r_sum = ($ii[($ry+$rh)*$iiw + $rx + $rw]
                                  + $ii[$ry*$iiw+$rx]
                                  - $ii[($ry+$rh)*$iiw+$rx]
                                  - $ii[$ry*$iiw+$rx+$rw])*$wt;

                        $rect_sum += $r_sum;
                    }

                    $rect_sum *= $inv_area;

                    $current_node = null;

                    if ($rect_sum >= $node_thresh*$vnorm) {

                        if ($rightidx == -1) {

                            $tree_sum = $rightval;

                        } else {

                            $current_node = $tree[$rightidx];

                        }

                    } else {

                        if ($leftidx == -1) {

                            $tree_sum = $leftval;

                        } else {

                            $current_node = $tree[$leftidx];
                        }
                    }
                }

                $stage_sum += $tree_sum;
            }
            if ($stage_sum < $stage_thresh) {
                return false;
            }
        }
        return true;
    }
}
