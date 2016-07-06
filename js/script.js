//======================================================================
//! generate navbar and toolbars
//  see: http://demos.jquerymobile.com/1.4.5/toolbar-fixed-persistent/
//======================================================================
$(function() {
  $( "[data-role='navbar']" ).navbar();
  $( "[data-role='header'], [data-role='footer']" ).toolbar();
});
// Update the contents of the toolbars
$( document ).on( "pageshow", "[data-role='page']", function() {
  // Each pages in this demo has a data-title attribute
  // which value is equal to the text of the nav button
  // For example, on first page: <div data-role="page" data-title="Info">
  var current = $( this ).jqmData( "title" );
  // Change the heading
  $( "[data-role='header'] h1.site-title" ).text( current );
  // Remove active class from nav buttons
  $( "[data-role='navbar'] a.ui-btn-active" ).removeClass( "ui-btn-active" );
  // Add active class to current nav button
  $( "[data-role='navbar'] a" ).each(function() {
    if ( $( this ).text() === current ) {
      $( this ).addClass( "ui-btn-active" );
    }
  });
});


//===========================================
//! dynamically add Flickr photos from feed
//===========================================
$(document).ready(function() {

  var flickerAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";

  $.getJSON( flickerAPI, {
    id: "7167652@N06",
    tags: "autochrome",
    format: "json"
  })
    .done(function( data ) {

      var output = '';

      for (var i = 0; i < data.items.length; i++) {
        var photoTitle = data.items[i].title;
        var photoSmall = data.items[i].media.m;
        var photoSmallSquare = photoSmall.replace('_m', '_q');
        var photoLarge = photoSmall.replace('_m', '_z');
        var blocktype = ( (i % 2) == 1 ) ? 'b' : 'a';

        output += '<div class="ui-block-' + blocktype + '">';
        output += '<a href="#showphoto" data-transition="fade" onclick="showPhoto(\'' + photoLarge + '\', \'' + photoTitle + '\')">';
        output += '<img src="' + photoSmallSquare + '" alt="' + photoTitle + '">';
        output += '</a>';
        output += '<h3>' + photoTitle + '</h3>';
        output += '</div>';
      }

      $('#photolist').html(output); // inject content and markup into DOM
    });
});

function showPhoto(photoLarge, photoTitle) {
  var output = '<a href="#photos" data-transition="fade">';
      output += '<img src="' + photoLarge + '" alt="' + photoTitle + '" class="img--center">';
      output += '</a>';
      output += '<p>' + photoTitle + '</p>';

  $('#myphoto').html(output); // inject content and markup into page
} // showPhoto


//=============================================
//! dynamically add Vimeo videos from channel
//=============================================
$(document).ready(function() {

  var user = 'edwinmah';
  var channel = 'channel/whitehouse';
  var group = 'group/groupname';
  var album = 'album/album_id';

  $.getJSON('https://vimeo.com/api/v2/' + channel + '/videos.json', function (data) {

    var videocount = 10; // number of videos to get
    var output = '';

    for (var i = 0; i < videocount ; i++) { // use data.length for all videos
      var title = data[i].title;
      var thumbnail = data[i].thumbnail_large;
      var description = data[i].description;
      var id = data[i].id;

      var blocktype = ( (i % 2) == 1 ) ? 'b' : 'a';

      output += '<div class="ui-block-' + blocktype + '">';
      output += '<a href="#filmplayer" data-transition="fade" onclick="playFilm(\'' + id + '\', \'' + title + '\',\'' + escape(description) + '\')">';
      output += '<img src="' + thumbnail + '" alt="' + title + '">';
      output += '</a>';
      output += '<h3>' + title + '</h3>';
      output += '</div>';
    } // entries loop

    $('#filmlist').html(output); // inject content and markup into page

  });
});

function playFilm(id, title, description) {
  var output = '<div class="intrinsic intrinsic--16x9">';
      output += '<iframe src="http://player.vimeo.com/video/' + id + '?title=0&amp;byline=0&amp;portrait=0&amp;color=3599d4" class="intrinsic--inner"></iframe>';
      output += '</div>';
      output += '<div class="video-entry">';
      output += '<h3>' + title + '</h3>';
      output += '<p>' + unescape(description) + '</p>';
      output += '</div>';

  $('#myplayer').html(output); // inject content and markup into page

} // playFilm