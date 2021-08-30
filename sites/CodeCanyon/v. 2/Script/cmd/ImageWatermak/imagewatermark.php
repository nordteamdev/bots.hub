<?php
/* 
 * Class Watermark
 * require GD librabry
 *
 * 
 */
class Watermark {
    /**
     *
     * @var image resource
     */
    private $image = null;
    /**
     *
     * @var image resource
     */
    private $watermark = null;
    /**
     *
     * @var string
     */
    private $output_file = null;
    /**
     *
     * @var int
     */
    private $type = '';
    const BOTTOM_RIGHT = 1;
    const CENTER = 2;
    const BOTTOM_RIGHT_SMALL = 3;
    /**
     *
     * @param string $path_to_image
     */
    public function __construct($path_to_image){
        if (file_exists($path_to_image)){
            $this->image = $path_to_image;
        }
        $this->type = Watermark::BOTTOM_RIGHT;
    }
    /**
     *
     * @param string $path_to_watermark
     * @return boolean
     */
    public function setWatermarkImage($path_to_watermark){
        if (file_exists($path_to_watermark) && preg_match('/\.png$/i',$path_to_watermark)){
            $this->watermark = $path_to_watermark;
            return true;
        }
        return false;
    }
    /**
     *
     * @return boolean
     */
    public function save(){
        $this->output_file = $this->image;
        return $this->process();
    }
    /**
     *
     * @param string $path_to_image
     * @return boolean
     */
    public function saveAs($path_to_image){
        $this->output_file = $path_to_image;
        return $this->process();
    }
    /**
     *
     * @param int $type
     */
    public function setType($type){
        $this->type = $type;
    }
    /**
     *
     * @return boolean
     */
    private function process(){
        $watermark = imagecreatefrompng($this->watermark);
        if ($watermark){
            $image = imagecreatefromjpeg($this->image);
            if ($image){
                switch ($this->type){
                    case Watermark::BOTTOM_RIGHT:
                        return $this->watermark_bottom_right($image, $watermark);
                        break;
                    case Watermark::CENTER:
                        return $this->watermark_center($image, $watermark);
                        break;
                    case Watermark::BOTTOM_RIGHT_SMALL:
                        return $this->watermark_bottom_right_small($image, $watermark);
                        break;
                }
                return true;
            }else{
               return false;
            }
        }else {
            return false;
        }
    }
    /**
     *
     * @param image resource $image
     * @param image resource $watermark
     * @return boolean
     */
    private function watermark_bottom_right(&$image, &$watermark){
        $watermark_width = imagesx($watermark);
        $watermark_height = imagesy($watermark);
        $size = getimagesize($this->image);
        $dest_x = $size[0] - $watermark_width - 5;
        $dest_y = $size[1] - $watermark_height - 5;
        imagecopy($image, $watermark, $dest_x, $dest_y, 0, 0, $watermark_width, $watermark_height);
        imagejpeg($image,$this->output_file,100);
        imagedestroy($image);
        imagedestroy($watermark);
        return true;
    }
    /**
     *
     * @param image resource $image
     * @param image resource $watermark
     * @return booelan
     */
    private function watermark_center(&$image, &$watermark){
        $size = getimagesize($this->image);
        $watermark_x = imagesx($watermark);
        $watermark_y = imagesy($watermark);
        $im_x = $size[0];
        $im_y = $size[1];
        $cof = $im_x/($watermark_x*1.3); // 5/1 = im_x/(wx*cof) ; wx*cof = im_x/5 ; cof = im_x/wx*5
        $w = intval($watermark_x*$cof);
        $h = intval($watermark_y*$cof);
        $watermark_mini = ImageCreateTrueColor($w, $h);
        imagealphablending($watermark_mini, false);
        imagesavealpha($watermark_mini,true);
        ImageCopyResampled ($watermark_mini, $watermark, 0, 0, 0, 0, $w, $h, $watermark_x, $watermark_y);
        $dest_x = $im_x - $w - (($im_x-$w)/2);
        $dest_y = $im_y - $h - (($im_y-$h)/2);
        imagecopy($image, $watermark_mini, $dest_x, $dest_y, 0, 0, $w, $h);
        imagejpeg($image,$this->output_file,100);
        imagedestroy($image);
        imagedestroy($watermark);
        return true;
    }
    /**
     *
     * @param image resource $image
     * @param image resource $watermark
     * @return boolean
     */
    private function watermark_bottom_right_small(&$image, &$watermark){
        $size = getimagesize($this->image);
        $orig_watermark_x = imagesx($watermark);
        $orig_watermark_y = imagesy($watermark);
        $im_x = $size[0];
        $im_y = $size[1];
        $cof = $im_x/($orig_watermark_x*5); // 5/1 = im_x/(wx*cof) ; wx*cof = im_x/5 ; cof = im_x/wx*5
        $w = intval($orig_watermark_x*$cof);
        $h = intval($orig_watermark_y*$cof);
        $watermark_mini = ImageCreateTrueColor($w, $h);
        imagealphablending($watermark_mini, false);
        imagesavealpha($watermark_mini,true);
        ImageCopyResampled ($watermark_mini, $watermark, 0, 0, 0, 0, $w, $h, $orig_watermark_x, $orig_watermark_y);
        //
        $dest_x = $size[0] - $w - 5;
        $dest_y = $size[1] - $h -5;
        
        imagecopy($image, $watermark_mini, $dest_x,$dest_y , 0, 0, $w, $h);
        imagejpeg($image,$this->output_file,100);
        imagedestroy($image);
        imagedestroy($watermark);
        imagedestroy($watermark_mini);
        return true;
    }
}
?>