<?php

 
class Rating extends _global_co {


 
public function __construct(){

//the old building from parent class
parent::__construct();
 
$this->userid = $this->USER['id'];
$this->time = time();
 
}
    public function select($item_id,$item_type){
        $select = "SELECT * FROM ".tbl_ratings." where `item_id`='{$item_id}' and `item_type`='{$item_type}' limit 1";
        $result = mysqli_query($this->db ,$select);
        return mysqli_fetch_all($result);
    }
    public function update($id, $rating) {
        $update = "UPDATE ".tbl_ratings." SET rating = '{$rating}' WHERE id = '{$id}' ";
        $result = mysqli_query($this->db ,$update);
        if($result) { 
            return 'Data Updated Successfully';
        }
    } 
}
