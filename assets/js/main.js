/*
	Read Only by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var $window = $(window),
		$body = $('body'),
		$header = $('#header'),
		$titleBar = null,
		$nav = $('#nav'),
		$wrapper = $('#wrapper');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '1025px',  '1280px' ],
			medium:   [ '737px',   '1024px' ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ null,      '480px'  ],
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Tweaks/fixes.

		// Polyfill: Object fit.
			if (!browser.canUse('object-fit')) {

				$('.image[data-position]').each(function() {

					var $this = $(this),
						$img = $this.children('img');

					// Apply img as background.
						$this
							.css('background-image', 'url("' + $img.attr('src') + '")')
							.css('background-position', $this.data('position'))
							.css('background-size', 'cover')
							.css('background-repeat', 'no-repeat');

					// Hide img.
						$img
							.css('opacity', '0');

				});

			}

	// Header Panel.

		// Nav.
			var $nav_a = $nav.find('a');

			$nav_a
				.addClass('scrolly')
				.on('click', function() {

					var $this = $(this);

					// External link? Bail.
						if ($this.attr('href').charAt(0) != '#')
							return;

					// Deactivate all links.
						$nav_a.removeClass('active');

					// Activate link *and* lock it (so Scrollex doesn't try to activate other links as we're scrolling to this one's section).
						$this
							.addClass('active')
							.addClass('active-locked');

				})
				.each(function() {

					var	$this = $(this),
						id = $this.attr('href'),
						$section = $(id);

					// No section for this link? Bail.
						if ($section.length < 1)
							return;

					// Scrollex.
						$section.scrollex({
							mode: 'middle',
							top: '5vh',
							bottom: '5vh',
							initialize: function() {

								// Deactivate section.
									$section.addClass('inactive');

							},
							enter: function() {

								// Activate section.
									$section.removeClass('inactive');

								// No locked links? Deactivate all links and activate this section's one.
									if ($nav_a.filter('.active-locked').length == 0) {

										$nav_a.removeClass('active');
										$this.addClass('active');

									}

								// Otherwise, if this section's link is the one that's locked, unlock it.
									else if ($this.hasClass('active-locked'))
										$this.removeClass('active-locked');

							}
						});

				});

		// Title Bar.
			$titleBar = $(
				'<div id="titleBar">' +
					'<a href="#header" class="toggle"></a>' +
					'<span class="title">' + $('#logo').html() + '</span>' +
				'</div>'
			)
				.appendTo($body);

		// Panel.
			$header
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'right',
					target: $body,
					visibleClass: 'header-visible'
				});

	// Scrolly.
		$('.scrolly').scrolly({
			speed: 1000,
			offset: function() {

				if (breakpoints.active('<=medium'))
					return $titleBar.height();

				return 0;

			}
		});

})(jQuery);

const icons = document.querySelectorAll('.moveIcons');
        
function resetIcons() {
	icons.forEach((icon) => {
		icon.style.left = `${Math.random() * 376}px`; // Random horizontal position
		icon.style.top = `${Math.random() * 176}px`; // Random vertical position
		icon.xSpeed = Math.random() * 2 - 1; // Random horizontal speed
		icon.ySpeed = Math.random() * 2 - 1; // Random vertical speed
	});
}

// Reset the icons initially
resetIcons();

// Start moving the icons immediately
startIconsMoving();

function startIconsMoving() {
	icons.forEach((icon) => {
		icon.xSpeed = Math.random() * 2 - 1; // Random horizontal speed
		icon.ySpeed = Math.random() * 2 - 1; // Random vertical speed
	});
}

function moveIcon(icon) {
	let x = parseFloat(icon.style.left);
	let y = parseFloat(icon.style.top);
	let xSpeed = icon.xSpeed;
	let ySpeed = icon.ySpeed;
	const iconSize = 24; // Icon size in pixels

	x += xSpeed;
	y += ySpeed;

	// Check for collisions with other icons
	icons.forEach((otherIcon) => {
		if (icon !== otherIcon) {
			const x1 = x;
			const y1 = y;
			const x2 = parseFloat(otherIcon.style.left);
			const y2 = parseFloat(otherIcon.style.top);

			const distance = Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
			const minDistance = iconSize;

			if (distance < minDistance) {
				// Collision detected, separate the icons
				const angle = Math.atan2(y2 - y1, x2 - x1);
				const overlap = minDistance - distance;

				x -= overlap * Math.cos(angle);
				y -= overlap * Math.sin(angle);

				// Reverse speeds to bounce off each other
				xSpeed *= -1;
				ySpeed *= -1;
			}
		}
	});

	// Check for boundary collisions and reverse direction
	if (x < 0 || x > 376) { // Adjusted for icon size
		xSpeed *= -1;
	}
	if (y < 0 || y > 176) { // Adjusted for icon size
		ySpeed *= -1;
	}

	icon.style.left = `${x}px`;
	icon.style.top = `${y}px`;
	icon.xSpeed = xSpeed;
	icon.ySpeed = ySpeed;
}

// Use a small interval for continuous motion
setInterval(() => {
	icons.forEach((icon) => {
		moveIcon(icon);
	});
}, 30);

// After 10 seconds, align the icons in one row
setTimeout(() => {
	icons.forEach((icon, index) => {
		icon.style.left = `${index * 50 + 50}px`;
		icon.style.top = `100px`; // Adjust as needed
		icon.xSpeed = 0; // Stop horizontal movement
		icon.ySpeed = 0; // Stop vertical movement
	});
}, 20000);