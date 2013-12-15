$(document).ready(function(){
	$('.devise-help-links').on('click',function(){
		if ($('.links-container').is(':hidden')){
			$('.links-container').fadeIn();
		} else {
			$('.links-container').fadeOut();
		}
		return false;
	});
});