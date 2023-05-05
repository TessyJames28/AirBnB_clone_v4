// Adds and handle new attributes in the amenities section for checkbox implementation
$('document').ready(function () {
  const amenities = {};
  $('input[type="checkbox"]').change(function () {
    const amenityId = $(this).attr('data-id');
    const amenityName = $(this).attr('data-name');

    if ($(this).is(':checked')) {
      amenities[amenityId] = amenityName;
    } else {
      delete amenities[amenityId];
    }

    const amenitiesList = Object.values(amenities).join(',');
    $('.amenities h4').text(amenitiesList);
  });

  // handles DIV#api_status id in the template to add or remove Class based on status response
  const statusId = $('DIV#api_status');
  const apiStatus = '';
  $.get('http://0.0.0.0:5001/api/v1/status/', function (response) {
    if (response.status === 'OK') {
      console.log('OK');
      statusId.addClass('available');
      statusId.removeAttr('id');
    } else {
      statusId.attr('id', 'api_status');
      statusId.removeClass('available');
    }
  });
});
