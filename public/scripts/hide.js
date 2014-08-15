$(document).ready(function() {
	$(document).on('click', '.add-images', function(){
		$('.content').addClass('hidden');
		$( ".content-images" ).removeClass( "hidden" );
	});
	$(document).on('click', '.add-skills', function(){
		$('.content').addClass('hidden');
		$( ".content-skills" ).removeClass( "hidden" );
	});
	$(document).on('click', '.add-bio', function(){
		$('.content').addClass('hidden');
		$( ".content-bio" ).removeClass( "hidden" );
	});
	$(document).on('click', '.add-theme', function(){
		$('.content').addClass('hidden');
		$( ".content-theme" ).removeClass( "hidden" );
	});
});