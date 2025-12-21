$(function(){
	var $slider = $('#slides');
	var $slides = $slider.find('.slides_container > div');
	var slideCount = $slides.length;
	var currentSlide = 0;
	var slideInterval;
	var isPaused = false;
	
	// Initialize: hide all slides except the first one
	$slides.hide().first().show();
	
	// Function to show a specific slide with fade effect
	function showSlide(index) {
		if (index < 0) index = slideCount - 1;
		if (index >= slideCount) index = 0;
		
		var $current = $slides.eq(currentSlide);
		var $next = $slides.eq(index);
		
		// Animate caption out
		$current.find('.caption').animate({ bottom: -96 }, 100, function() {
			// Fade out current slide, fade in next slide
			$current.fadeOut(400);
			$next.fadeIn(400, function() {
				// Animate caption in
				$next.find('.caption').css('bottom', -96).animate({ bottom: 0 }, 200);
			});
		});
		
		currentSlide = index;
	}
	
	// Auto-play function
	function startAutoPlay() {
		slideInterval = setInterval(function() {
			if (!isPaused) {
				showSlide(currentSlide + 1);
			}
		}, 5000);
	}
	
	// Start auto-play
	startAutoPlay();
	
	// Pause on hover
	$slider.on('mouseenter', function() {
		isPaused = true;
	}).on('mouseleave', function() {
		isPaused = false;
	});
	
	// Navigation buttons
	$slider.find('.next').on('click', function(e) {
		e.preventDefault();
		showSlide(currentSlide + 1);
	});
	
	$slider.find('.prev').on('click', function(e) {
		e.preventDefault();
		showSlide(currentSlide - 1);
	});
});

