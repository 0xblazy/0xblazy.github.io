$('.load > img').addClass('visible');
var parallaxMargin = 1000;
var titleMargin = 600;
var contentMargin = 400;
var scrollWidth = window.innerWidth - document.documentElement.clientWidth;

/* Menu responsive */
function toggleMenu() {
	if ($('.menu').hasClass('open')) {
		$('.menu a.hamburger').first().css('display','block');
		$('.menu a.hamburger').last().css('display','none');
		$('.menu a:not(.hamburger)').slideUp(300);
		if ($(window).scrollTop() + parseFloat($('nav').css('height')) < parseFloat($('nav').css('height')) * 2) {
			$('nav').addClass('onTop');
		}
		$('.menu').removeClass('open');
	} else {
		$('.menu a.hamburger').first().css('display','none');
		$('.menu a.hamburger').last().css('display','block');
		$('.menu a:not(.hamburger)').slideDown(300);
		$('nav').removeClass('onTop');
		$('.menu').addClass('open');
	}
}

/* Affichage bouton toTop */
function toTop(position) {
	if (position >= parseFloat($('nav').css('height')) * 2) {
		$('.toTop').addClass("animate");
	} else {
		$('.toTop').removeClass("animate");
	}
}

/* Progression du menu */
function progress(position) {
	if (position < parseFloat($('nav').css('height')) * 2) {
		if(!$('.menu').hasClass('open')) {
			$('nav').addClass('onTop');
		}
		$('#homeB').addClass('current');
	} else if (position < $('#about').position().top) {
		$('nav').removeClass('onTop');
		$('#homeB').addClass('current');
		$('#aboutB').removeClass('current');
		$('#skillsB').removeClass('current');
		$('#portfolioB').removeClass('current');
		$('#contactB').removeClass('current');
	} else if (position < $('#skills').position().top) {
		$('nav').removeClass('onTop');
		$('#homeB').removeClass('current');
		$('#aboutB').addClass('current');
		$('#skillsB').removeClass('current');
		$('#portfolioB').removeClass('current');
		$('#contactB').removeClass('current');
	} else if (position < $('#portfolio').position().top) {
		$('nav').removeClass('onTop');
		$('#homeB').removeClass('current');
		$('#aboutB').removeClass('current');
		$('#skillsB').addClass('current');
		$('#portfolioB').removeClass('current');
		$('#contactB').removeClass('current');
	} else if (position < $('#contact').position().top) {
		$('nav').removeClass('onTop');
		$('#homeB').removeClass('current');
		$('#aboutB').removeClass('current');
		$('#skillsB').removeClass('current');
		$('#portfolioB').addClass('current');
		$('#contactB').removeClass('current');
	} else {
		$('nav').removeClass('onTop');
		$('#homeB').removeClass('current');
		$('#aboutB').removeClass('current');
		$('#skillsB').removeClass('current');
		$('#portfolioB').removeClass('current');
		$('#contactB').addClass('current');
	}
}

/* Animations page */
function animate(position) {
	// A propos
	if (position >= $('#about').position().top - titleMargin) {
		$('#about h1').addClass('animate');
	}
	if (position >= $('#about').position().top - contentMargin) {
		$('.presentation > .presText, .presentation > img').addClass('animate');
		setTimeout(function() {
			$('#about .button').addClass('animate');
			var timeout = animateText() + 500;
			setTimeout(function() {
				$('#about .button').addClass('bounce');
			}, timeout);
		}, 900);
	}
	if (position >= $('#skills').position().top - parallaxMargin) {
		$('.about-bg, .about-bg > div').addClass('animate');
	}

	// Compétences
	if (position >= $('#skills').position().top - titleMargin) {
		$('#skills h1').addClass('animate');
	}
	if (position >= $('#skills').position().top - contentMargin) {
		$('.computer, .tech, .comp').addClass('animate');
	}
	if (position >= $('#portfolio').position().top - parallaxMargin) {
		$('.skills-bg, .skills-bg > div').addClass('animate');
	}

	// Portofolio
	if (position >= $('#portfolio').position().top - titleMargin) {
		$('#portfolio h1').addClass('animate');
	}
	if (position >= $('#portfolio').position().top - contentMargin) {
		var timeout = 0;
		$('.project').each(function() {
			var that = this;
			setTimeout(function() {
				$(that).addClass('animate');
			}, timeout);
			timeout += 300;
		});
	}
	if (position >= $('#contact').position().top - parallaxMargin) {
		$('.port-bg').addClass('animate');
		var timeout = 0;
		$('.port-bg > div > div').each(function() {
			var that = this;
			setTimeout(function() {
				$(that).addClass('animate');
				var numberSpan = $(that).find('.number');
				if (!numberSpan.hasClass('finish')) {
					var number = numberSpan.text();
					numberSpan.text(0);
					for (let i = 0 ; i <= number ; i++) {
						setTimeout(function() {
							numberSpan.text(i);
						}, i * 100 + 900);
					}
					numberSpan.addClass('finish');
				}
			}, timeout);
			timeout += 250;
		});
	}

	// Contact
	if (position >= $('#contact').position().top - titleMargin) {
		$('#contact h1').addClass('animate');
	}
	if (position >= $('#contact').position().top - contentMargin) {
		$('.contactForm, .contactMe').addClass('animate');
		setTimeout(function() {
			$('#contact .button').addClass('animate');
		}, 1500);
	}
}

/* Animations textes */
function animateText() {
	var timeout = 0;
	$('.presentation > .presText span').each(function() {
		var that = this;
		setTimeout(function() {
			$(that).removeClass('resetColor');
		}, timeout);
		timeout += 500;
	});
	return timeout;
}

/* Parallax */
function isInViewport(node) {
	var rect = node.getBoundingClientRect();
	return (
	  (rect.height > 0 || rect.width > 0) &&
	  rect.bottom >= 0 &&
	  rect.right >= 0 &&
	  rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
	  rect.left <= (window.innerWidth || document.documentElement.clientWidth)
	);
}

function parallax() {
	var scroll = $(window).scrollTop();
	$('.parallax').each(function(index, element) {
	  var topY = $(this).offset().top;
	  var height = $(this).height();
  
	  if(isInViewport(this)) {
		var diff = scroll - topY;
		var ratio = Math.round((diff / height) * 100);
		$(this).css('background-position','center ' + parseInt(-(ratio * 0.6)) + 'px');
	  }
	});
}

/* Appel des différentes fonctions */
$(document).ready(function() {
	// Écran de chargement
	setTimeout(function() {
		$('body').css('overflow', 'auto');
		$('.load').fadeOut();
		scrollWidth = window.innerWidth - document.documentElement.clientWidth;
	}, 1000);

	var position = $(window).scrollTop() + parseFloat($('nav').css('height'));

	progress(position);
	toTop(position);
	animate(position);
	parallax();
});

$(window).scroll(function() {
	var position = $(window).scrollTop() + parseFloat($('nav').css('height')) + 2;

	progress(position);
	toTop(position);
	animate(position);
	parallax();
});

/* Défilement fluide */
$('nav a[href^="#"], .scrollDown, .toTop a').click(function() {
    var id = $(this).attr('href');
	if (id === '#') {
		return;
	}

	if($(this).parent().hasClass('open')) {
		toggleMenu();
	}

	jQuery.easing.def = 'easeInOutExpo';
	$('html, body').animate({
		scrollTop: ($(id).offset().top - parseFloat($('nav').css('height')))
	}, 1500);
	return false;
});

/* Affichages project (et Mentions légales) */
// Ouverture
$('a.project, a.ment').click(function() {
	var id = $(this).attr('href');

	$('body').css('overflow','hidden');
	$('body, nav').css('padding-right', scrollWidth);
	$('.toTop').css('right', '+=' + scrollWidth + 'px');
	$(id + ', .overlayBg').fadeIn(600);
	$(id).scrollTop(0);
	return false;
});

// Fermeture
$('a.close').click(function() {
	var id = $(this).attr('href');

	$(id + ', .overlayBg').fadeOut(600);
	setTimeout(function() {
		$(id).scrollTop(0);
	}, 599);
	setTimeout(function() {
		$('.toTop').css('right', '-=' + scrollWidth + 'px');
		$('body, nav').css('padding-right', 0);
		$('body').css('overflow','auto');
	}, 600);
	return false;
});

// Précédent
$('a.prec').click(function() {
	var idPrec = $(this).attr('href');
	var idCurr = '#' + $(this).parent().parent().attr('id');
	var width = window.innerWidth;

	$(idPrec).css('left', '-' + width + 'px');
	$(idPrec).css('overflow', 'hidden');
	$(idPrec).css('padding-right', scrollWidth);
	$(idPrec).show();

	$(idPrec).animate({
		left: '0px'
	}, 600, function() {
		$(idPrec).css('padding-right', 0);
		$(idPrec).css('overflow', 'auto');
	});

	$(idCurr).animate({
		left: width + 'px'
	}, 600, function() {
		$(idCurr).scrollTop(0);
		$(idCurr).hide();
		$(idCurr).css('left', 0);
	});
	return false;
});

// Suivant
$('a.next').click(function() {
	var idNext = $(this).attr('href');
	var idCurr = '#' + $(this).parent().parent().attr('id');
	var width = window.innerWidth;

	$(idNext).css('left', width + 'px');
	$(idNext).show();

	$(idNext).animate({
		left: '0px'
	}, 600);

	$(idCurr).css('overflow', 'hidden');
	$(idCurr).css('padding-right', scrollWidth);

	$(idCurr).animate({
		left: '-' + width + 'px'
	}, 600, function() {
		$(idCurr).scrollTop(0);
		$(idCurr).hide();
		$(idCurr).css('left', 0);
		$(idCurr).css('padding-right', 0);
		$(idCurr).css('overflow', 'auto');
	});
	return false;
});

/* Formulaire de contact */
$('.contactForm').on('submit', function(e) {
	e.preventDefault();

	var name = $('#name').val();
	var email = $('#email').val();
	var subject = $('#subject').val();
	var message = $('#message').val();

	$.ajax({
		url:'https://formspree.io/mbjorpvb',
		method: 'POST',
		data: {
			Nom: name,
			_replyto:email,
			Email:email,
			Message:message,
			_subject:subject,
		},
		dataType:"json",
		success:function() {
			$('.status').addClass('animate');
			$('#name').val('');
			$('#email').val('');
			$('#subject').val('');
			$('#message').val('');
			$('#checkRGPD').prop('checked', false);
			setTimeout(function() {
				$('.status').removeClass('animate');
			}, 4000);
		}
	})
});

/* Rotations */
$('#title').on('mouseover', function() {
	if (!$('#title').hasClass('rotate')) {
		$('#title').addClass('rotate');
		if($('#title').hasClass('colored')) {
			$('#title').removeClass('colored');
		} else {
			$('#title').addClass('colored');
		}
		setTimeout(function() {
			$('#title').removeClass('rotate');
		}, 1200);
	}
});

$('.computer').on('mouseover', function() {
	if (!$('.computer').hasClass('rotate')) {
		$('.computer').addClass('rotate');
		setTimeout(function() {
			$('.computer').removeClass('rotate');
		}, 3000);
	}
});