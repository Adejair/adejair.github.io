var startPos = $('#scroll').offset().top;

$(window).scroll(function() {
	if($(window).scrollTop() > startPos) {
		$(".header-top").addClass("header-modify-class");

		$(".icon-search").css({fill: "#FFFFFF"});
		$(".icon-menu").css({fill: "#FFFFFF"});

	} else {
		$(".header-top").removeClass("header-modify-class");
	
		$(".icon-search").css({fill: "#712a8e"});
		$(".icon-menu").css({fill: "#712a8e"});
	} 
});


$("#top-head-text").click(function() {
	window.location.href = "/";
	return false;
});


