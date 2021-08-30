
/* Javascript settings
----------------------*/

var _st = {

// default
'host' : __SITEURL,
'getphoto' : __SITEURL+"/getPhoto?p=%i&sz=%s",
'load_m_file' : '/load-more-data',
'scrollTopPosition' : 600, // after ## pixels appear [scroll to top] button 

// upload photos
//'maxFilesUpload' : 9940, // count of maximum photos upload in one request
'uploadFile': '/upload-inc/upload-pictures.php', // php file for upload photos
'uploadCovers': '/upload-inc/uploadCovers.php', // php file for upload covers
//'photoTypes': ['jpg','png','jpeg','gif'], // allow files extension to upload
'attachUpload': '/upload-inc/attach.php', // php file for upload attachments

// upload Videos
//'maxVideoFilesUpload' : 9940, // count of maximum photos uplod in one request
'uploadVideoFile': '/upload-inc/video-upload.php', // php file for upload
//'videoTypes': ['wmv','mp4', 'flv', 'avi'], // allow files extension to upload
 

// video settings
'swf' : __SITEURL+'/cmd/jwplayer/swf/jwplayer.flash.swf', // location of video flash player

// blank loader for images
'_ATTACH_BLANK' : __SITEURL+'/css/images/preloaders/imagefile-18.png',


// sortable 
'sort_revert' : false, // enable animation to sorting
'sort_opac': 0.7, // opacity for dragged image
'sort_distance' : 0, // Tolerance, in pixels, for when sorting should start.
		     // If specified, sorting will not start until after mouse is dragged beyond distance. Can be used to allow for clicks on elements within a handle.
'sort_delay': 150, // sorting after delay

// popup
'purl' : '/build_popup.php',
'min_crop_w' : 250,// minimum width size for crop photo
'min_crop_h' : 250, // minimum height size for crop photo
'popup_anim_dur' : 340, // left & right popups, transition speed
'popup_easing' : 'cubic-bezier(0.51, 0.38, 0, 0.86)', // transition easing

// comments
'replies_limit' : 3, // default replies limit to show the button [Show more replies]
'phlayer_comments_limit' : 10, // limit of comments in photo viewer

// errors
'err_HideTimeout' : 7000, // hide error message, calculated in miliseconds
'err_auto_hide' : false, // auto hide errors after timeout
}