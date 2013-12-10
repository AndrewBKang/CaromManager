// GOOGLE MAPS API
var map;
var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var carom = new google.maps.LatLng(40.7664306, -73.831408);
var marker;

function initialize() {
  var mapOptions = {
    center: carom,
    zoom: 17
  };
  map = new google.maps.Map(document.getElementById("map-canvas"),
      mapOptions);
	marker = new google.maps.Marker({
	    position: carom,
	    map: map,
	    title:"Carom Café"
	});
	directionsDisplay = new google.maps.DirectionsRenderer();
	directionsDisplay.setMap(map);
	
	directionsDisplay.setPanel(document.getElementById('directions-panel'));
}

function calcRoute() {
	$('#directions-panel').empty();
	marker.setMap(null);
	
  var start = document.getElementById("origin").value;
	var startURL = 'http://maps.googleapis.com/maps/api/geocode/json?address=' + start + '&sensor=false';
	var startLatLng = carom;
	var selectedMode = $('input[name="transport-mode"]:checked').val();

	$.getJSON(startURL,function(data){
		if (data.status == 'OK') {
			var startLat = data.results[0].geometry.location.lat;
			var startLng = data.results[0].geometry.location.lng;
			startLatLng = new google.maps.LatLng(startLat, startLng);
		}
		
	  var request = {
	    origin:startLatLng,
	    destination:carom,
	    travelMode: google.maps.TravelMode[selectedMode]
	  };
		
	  directionsService.route(request, function(result, status) {
	    if (status == google.maps.DirectionsStatus.OK) {
	      directionsDisplay.setDirections(result);
	    }
	  });
	});
	$('#directions-panel').css('border','1px solid lightgray');
}

google.maps.event.addDomListener(window, 'page:load', initialize);
google.maps.event.addDomListener(window, 'load', initialize);

// END GOOGLE MAPS API

$(document).ready(function(){
	
// ANCHORS

function scrollToAnchor(aid) {
	var aTag = $('li[id=' + aid + ']').first();
	$('html,body').animate({scrollTop: aTag.offset().top - 78});
}

$('.anchor').on('click', function(){
	var id = $(this).attr('name');
	scrollToAnchor(id);
	return false;
});

// END ANCHORS

// FIX about navigation on scroll


$(function () {
	var top = $('.welcome-header').offset().top - parseFloat($('.welcome-header').css('margin-top').replace(/auto/,0));

	$(window).scroll(function (event) {
		var y = $(this).scrollTop();
		if (y >= top) {$('.welcome-header').addClass('fixed');} else {$('.welcome-header').removeClass('fixed');}
	});
});

// END FIX ON SCROLL

});
