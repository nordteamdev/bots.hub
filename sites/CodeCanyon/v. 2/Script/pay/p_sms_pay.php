 <?php
 $key = $_GET['k'];
 
 ?>


 <script src='https://assets.fortumo.com/fmp/fortumopay.js' type='text/javascript'></script>
  <a id="fmp-button" style="display:none;" href="javascript:void(0);" rel="<?php echo $key;?>"><img src="https://assets.fortumo.com/fmp/fortumopay_150x50_red.png" width="150" height="50" alt="Mobile Payments by Fortumo" border="0" /></a>
  <script>
  window.onload = (function(){
      setTimeout(function(){
document.getElementById('fmp-button').click();
},1000);
  });
  
  </script>