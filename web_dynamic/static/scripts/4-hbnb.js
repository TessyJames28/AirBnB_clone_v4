// Adds and handle new attributes in the amenities section for checkbox implementation
$('document').ready(function () {
  function buildArticle(response) {
    $('SECTION.places').empty()
    response.forEach(place => {
        const name = place.name;
        const desc = place.description;
        const guests = place.max_guest ? `${place.max_guest} Guests` : `${place.max_guest} Guest`;
        const baths = place.number_bathrooms ? `${place.number_bathrooms} Bathrooms` : `${place.number_bathrooms} Bathroom`;
        const rooms = place.number_rooms ? `${place.number_rooms} Bedrooms` : `${place.number_rooms} Bedroom`;
        const price = `$${place.price_by_night}`;

        $('SECTION.places').append(`\
                                <article>
                                <div class="title_box">
                                <h2>${name}</h2>
                                <div class="price_by_night">${price}</div>
                                </div>
                                <div class="information">
                                <div class="max_guest">${guests}</div>
                                <div class="number_rooms">${rooms}</div>
                                <div class="number_bathrooms">${baths}</div>
                                </div>
                                <div class="user">
                                <b>Owner:</b> John Doe
                                </div>
                                <div class="description">
                                ${desc}
                                </div>
                                </article>`);
      });
  }
  const amenities = {};
  let amenitiesList = '';
  let amenitiesIdList = [];
  $('input[type="checkbox"]').change(function () {
    const amenityId = $(this).attr('data-id');
    const amenityName = $(this).attr('data-name');

    if ($(this).is(':checked')) {
      amenities[amenityId] = amenityName;
      amenitiesIdList.push(amenityId);
    } else {
      delete amenities[amenityId];
      amenitiesIdList.filter(amenId => amenityId !== amenId);
    }

    //$('.amenities h4').html('&nbsp;');
    amenitiesList = Object.values(amenities).join(',');
    if (amenitiesList.length === 0) {
      $('.amenities h4').text();
    } else if (amenitiesList.length > 30) {
      amenitiesList = amenitiesList.slice(0, 30) + '...';
      $('.amenities h4').text(amenitiesList);
    } else {
    $('.amenities h4').text(amenitiesList);
    }
  });

  // handles DIV#api_status id in the template to add or remove Class based on status response
  const statusId = $('DIV#api_status');
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
  
  // Task 4 - Handles Places search by recreating the Article verrsion of the template to load with jQuery POST method
  $.ajax({
    type: 'POST',
  	url: 'http://0.0.0.0:5001/api/v1/places_search/',
  	data: '{}',
    contentType: 'application/json',
    success: function (response) {
      buildArticle(response);
    },
      	error: function (xhr, status, error) {
      		console.log(error);
    }
  });


// task 5 - when the button is clicked, a new post request is made places_search with list of Amenities checked
  $('button').click(function() {
    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search',
      contentType: 'application/json',
      data: JSON.stringify({ amenities: amenitiesIdList }),
      success: function(response) {
	buildArticle(response);
        console.log(amenitiesIdList);
        console.log(response);
      },
      error: function(xhr, status, error) {
        console.log(error);
      }
    });
  });
});
