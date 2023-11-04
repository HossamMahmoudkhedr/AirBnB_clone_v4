const URLStatus = 'http://0.0.0.0:5001/api/v1/status/';
const URLPlaces = 'http://0.0.0.0:5001/api/v1/places_search/';
$(document).ready(function () {
	let amenitiesID = [];
	// Task 1
	$('input[type="checkbox"]').change(function (e) {
		let id = $(this).attr('data-id');
		if ($(this).is(':checked')) {
			amenitiesID.push(id);
		} else {
			if (amenitiesID.includes(id)) {
				amenitiesID = amenitiesID.filter((el) => el !== id);
			}
		}
		let text = '';
		if (amenitiesID.length < 3) {
			amenitiesID.forEach((el, idx) =>
				idx === amenitiesID.length - 1 ? (text += `${el}`) : (text += `${el}, `)
			);
			$('.amenities h4').text(text);
		} else if (amenitiesID.length === 3) {
			$('.amenities h4').append('...');
		}
	});

	// Task 2
	$.get(URLStatus, function (data, status) {
		if (status === 'success') {
			$('#api_status').addClass('available ');
		} else {
			$('#api_status').removeClass('available ');
		}
	});

	// Task 3
	$.ajax({
		type: 'POST',
		url: URLPlaces,
		data: {},
		dataType: 'application/json',
		success: function (response) {
			response.forEach((place) => {
				$('section.places').append(`
                    <article>
					<div class="title_box">
						<h2>${place.name}</h2>
						<div class="price_by_night">${place.price_by_night}</div>
					</div>
					<div class="information">
						<div class="max_guest">
							${place.max_guest} Guest{% if place.max_guest != 1 %}s{% endif
							%}
						</div>
						<div class="number_rooms">
							${place.number_rooms} Bedroom{% if place.number_rooms != 1
							%}s{% endif %}
						</div>
						<div class="number_bathrooms">
							${place.number_bathrooms} Bathroom{% if place.number_bathrooms
							!= 1 %}s{% endif %}
						</div>
					</div>
					<div class="user">
						<b>Owner:</b> ${place.user.first_name} ${place.user.last_name}
					</div>
					<div class="description">${place.description || 'safe'}</div>
				</article>                
                `);
			});
		},
	});
});
