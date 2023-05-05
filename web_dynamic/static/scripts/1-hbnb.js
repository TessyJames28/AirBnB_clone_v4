$('document').ready(() => {
  const amenities = {};
  $('input[type="checkbox"]').change(() => {
    const amenityId = $(this).attr('data-id');
    const amenityName = $(this).attr('data-name');

    if ($(this).is(':checked')) {
      amenities[amenityId] = amenityName;
    }
    else:
          delete amenities[amenityId];

    const amenitiesList = Object.values(amenities).join(',');
    $('.amenities h4').text(amenitiesList);
  });
});
