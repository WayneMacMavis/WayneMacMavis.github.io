const btnContainer = document.getElementById("myDIV");
const btns = btnContainer.getElementsByClassName("btn");
const speed = 110;
const h1 = document.querySelector('h1');
const h2 = document.querySelector('h2');
const delay = h1.innerHTML.length * speed + speed;
const $animation_elements = $('.animation-element');
const $window = $(window);

// $('a').click(function(){
//   $('html, body').animate({
//       scrollTop: $( $(this).attr('href') ).offset().top
//   },1000);
//   return false;
// });

// for (var i = 0; i < btns.length; i++) {
//   btns[i].addEventListener("click", function() {
//     var current = document.getElementsByClassName("active");

//     if (current.length > 0) {
//       current[0].className = current[0].className.replace(" active", "");
//     }

//     this.className += " active";
//   });
// }

// Cache selectors
var lastId,
    topMenu = $("nav"),
    topMenuHeight = topMenu.outerHeight()-110,
    // All list items
    menuItems = topMenu.find("a"),
    // Anchors corresponding to menu items
    scrollItems = menuItems.map(function(){
      var item = $($(this).attr("href"));
      if (item.length) { return item; }
    });

// Bind click handler to menu items
// so we can get a fancy scroll animation
menuItems.click(function(e){
  var href = $(this).attr("href"),
      offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight+1;
  $('html, body').stop().animate({ 
      scrollTop: offsetTop
  }, 600);
  e.preventDefault();
});

// Bind to scroll
$(window).scroll(function(){
   // Get container scroll position
   var fromTop = $(this).scrollTop()+topMenuHeight;
   
   // Get id of current scroll item
   var cur = scrollItems.map(function(){
     if ($(this).offset().top < fromTop)
       return this;
   });
   // Get the id of the current element
   cur = cur[cur.length-1];
   var id = cur && cur.length ? cur[0].id : "";
   
   if (lastId !== id) {
       lastId = id;
       // Set/remove active class
       menuItems
         .parent().removeClass("active")
         .end().filter("[href='#"+id+"']").parent().addClass("active");
   }                   
});

typeEffect = (element, speed) => {
	let text = element.innerHTML;
	element.innerHTML = "";
	
	let i = 0;
	let timer = setInterval(function() {
    if (i < text.length) {
      element.append(text.charAt(i));
      i++;
    } else {
      clearInterval(timer);
    }
  }, speed);
}

typeEffect(h1, speed), (delay);
h2.style.opacity = "0";

setTimeout(function(){
  h2.style.opacity = "1";
  typeEffect(h2, speed);
}, delay);

function throttle(fn, wait) {
  let time = Date.now();
  return function() {
    if ((time + wait - Date.now()) < 0) {
      fn();
      time = Date.now();
    }
  }
};

function parallax() {
  let scrolled = window.pageYOffset;
  let parallax = document.querySelector(".parallax");
  let coords = (scrolled * 0.6) + 'px'
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

check_if_in_view = () => {
	var window_height = $window.height();
	var window_top_position = $window.scrollTop();
	var window_bottom_position = (window_top_position + window_height);

	$.each($animation_elements, function() {
		var $element = $(this);
		var element_height = $element.outerHeight();
		var element_top_position = $element.offset().top;
		var element_bottom_position = (element_top_position + element_height);

		//check to see if this current container is within viewport
		if ((element_bottom_position = window_top_position) &&
			(element_top_position <= window_bottom_position)) {
		  $element.addClass('in-view');
		} else {
		  $element.removeClass('in-view');
		}
	});
}

$( document ).ready(function() {
  // Main variables
    var $developmentWrapper = $('.development-wrapper');
    var developmentIsVisible = false;


  $(window).scroll( function(){
  var bottom_of_window = $(window).scrollTop() + $(window).height();

  /*###### SKILLS SECTION ######*/

    var middle_of_developmentWrapper = $developmentWrapper.offset().top + $developmentWrapper.outerHeight()/2;

    if((bottom_of_window > middle_of_developmentWrapper) && (developmentIsVisible == false)){

      $('.skills-bar-container li').each( function(){

        var $barContainer = $(this).find('.bar-container');
        var dataPercent = parseInt($barContainer.data('percent'));
        var elem = $(this).find('.progressbar');
        var percent = $(this).find('.percent');
        var width = 0;

        var id = setInterval(frame, 20);

        function frame() {
          if (width >= dataPercent) {
              clearInterval(id);
          } else {
            width++;
            elem.css("width", width+"%");
            percent.html(width+" %");
          }
        }
      });
      developmentIsVisible = true;
    }
  });
});

$window.on('scroll resize', check_if_in_view);
$window.trigger('scroll', check_if_in_view);
window.addEventListener('scroll', throttle(parallax, 14));