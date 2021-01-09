// Get the container element
var btnContainer = document.getElementById("myDIV");

// Get all buttons with class="btn" inside the container
var btns = btnContainer.getElementsByClassName("btn");

// Loop through the buttons and add the active class to the current/clicked button
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
    var current = document.getElementsByClassName("active");

    // If there's no active class
    if (current.length > 0) {
      current[0].className = current[0].className.replace(" active", "");
    }

    // Add the active class to the current/clicked button
    this.className += " active";
  });
}

function togNav() {
  var nav = document.querySelector("nav");
  if (nav.style.width == '10%') {
    nav.style.width = "100%";
    nav.style.top = '0';
    // nav.style.opacity = 0;
  } else {
    nav.style.width = '10%';
    nav.style.top = '7%';
    // nav.style.opacity = 0;
  }
}

function typeEffect(element, speed) {
	var text = element.innerHTML;
	element.innerHTML = "";
	
	var i = 0;
	var timer = setInterval(function() {
    if (i < text.length) {
      element.append(text.charAt(i));
      i++;
    } else {
      clearInterval(timer);
    }
  }, speed);
}


// application
var speed = 100;
var h1 = document.querySelector('h1');
var h2 = document.querySelector('h2');
var delay = h1.innerHTML.length * speed + speed;

// type affect to header
typeEffect(h1, speed), (delay);
h2.style.opacity = "0";


// type affect to body
setTimeout(function(){
  h2.style.opacity = "1";
  typeEffect(h2, speed);
}, delay);

// Parallax effect
// Adapted from @ilonacodes article ->  https://link.medium.com/7fFiON6Q1X

// Update : added throttle to increase performance
window.addEventListener('scroll', throttle(parallax, 14));

function throttle(fn, wait) {
  var time = Date.now();
  return function() {
    if ((time + wait - Date.now()) < 0) {
      fn();
      time = Date.now();
    }
  }
};

function parallax() {
  var scrolled = window.pageYOffset;
  var parallax = document.querySelector(".parallax");
  // You can adjust the 0.4 to change the speed
  var coords = (scrolled * 0.6) + 'px'
  parallax.style.transform = 'translateY(' + coords + ')';
  parallax.style.filter = 'blur(200%)(' + coords + ')';
};

$(document).on('scroll', function() {
	$(".text-container").css("top", Math.max(25 - -0.080*window.scrollY, 0) + "%");
})

$(window).scroll(function () {
  if ($(window).scrollTop() > 100) {
    $(".parallax").addClass("blur");
  } else {
    $(".parallax").removeClass("blur");
  }
});

var $animation_elements = $('.animation-element');
var $window = $(window);

function check_if_in_view() {
	var window_height = $window.height();
	var window_top_position = $window.scrollTop();
	var window_bottom_position = (window_top_position + window_height);

	$.each($animation_elements, function() {
		var $element = $(this);
		var element_height = $element.outerHeight();
		var element_top_position = $element.offset().top;
		var element_bottom_position = (element_top_position + element_height);

		//check to see if this current container is within viewport
		if ((element_bottom_position >= window_top_position) &&
			(element_top_position <= window_bottom_position)) {
		  $element.addClass('in-view');
		} else {
		  $element.removeClass('in-view');
		}
	});
}

$window.on('scroll resize', check_if_in_view);
$window.trigger('scroll', check_if_in_view);