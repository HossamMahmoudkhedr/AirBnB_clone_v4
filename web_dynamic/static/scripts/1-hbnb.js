$(document).ready(function () {
	let amenitiesID = [];
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
			amenitiesID.forEach((el) => (text += `${el}, `));
			$('.amenities h4').text(text);
		} else if (amenitiesID.length === 3) {
			$('.amenities h4').append('...');
		}
	});
});
