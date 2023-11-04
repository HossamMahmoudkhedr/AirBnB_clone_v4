const URL = 'http://0.0.0.0:5001/api/v1/status/';

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
	$.get(URL, function (data, status) {
		if (status === 'success') {
			$('#api_status').addClass('available ');
		} else {
			$('#api_status').removeClass('available ');
		}
	});
	// $.ajax({
	// 	type: 'GET',
	// 	url: URL,
	// 	success: function (response) {
	// 		if (response.status === 'OK') {
	// 			$('#api_status').addClass('available ');
	// 		} else {
	// 			$('#api_status').removeClass('available ');
	// 		}
	// 	},
	// });
});
