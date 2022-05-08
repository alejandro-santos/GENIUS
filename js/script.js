
const apiKey = "6uhGd2uhWtBTSDaGMaPJNC2P4uft18GhLJrMHx_yOEASEV9dafR1Nasg-diFMFsI"
var accessToken = "?access_token=8kGcVbHUpRTAxUHwPF80MU3EnhcS0l2ddgOpzRV8kAf6wcEPJTCoz8qt-d94rDFv";
var API = "https://api.genius.com/search";
var APISong = "https://api.genius.com/songs/";
var record;

const keyInput = document.getElementById("search");





keyInput.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      document.getElementById("searchbtn").click();
    }
})


var songId;

function sendApiRequest() {
  var userInput = document.getElementById("search").value;
  $('#artist-name').text(userInput);
  
  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() {
    document.getElementById("song-card-list").innerHTML = "";
    recordStr = this.responseText;
    var record = JSON.parse(recordStr);

    title = record.response.hits;    
    for (var i = 0; i < title.length; i ++) {
      lyrics = title[i].result.url;
      songId = title[i].result.id;
      songUrl = title[i].result.song_art_image_url;
      songTitle = title[i].result.title;
      songArtist = title[i].result.artist_names;
      songViews = title[i].result.stats.pageviews.toLocaleString('en-US');
        hotStatus = title[i].result.stats.hot;
      if (hotStatus == true) {
        hotStatus = ' <i class="fa-solid fa-fire-flame-curved"></i>'
      } else {
        hotStatus = ""
      }
      ranking = i + 1;

      //type = "<li> <a href='" + lyrics + "'><img src='" + title[i].result.song_art_image_url + "'></a></li>";
      type =  "<div id='card' > <img id='album-cover'  alt='" + songId + "' src='" 
      + songUrl + "'> <p id='song-title'>" 
      + ranking + ". " + songTitle + hotStatus + "</p>" + "<p class='artist-names'>" 
      + songArtist + "</p>"
      + "<p id='page-views'> " + songViews + " <span style='color:black;'>page views</span> </p> </div>";
      document.getElementById("song-card-list").innerHTML += type;
      
    }
  }
  xhttp.open("GET", API+accessToken + '&q=' + userInput, true);
  xhttp.send();
};


$(document).ready(function(){
  $("body").on('click', '#album-cover', function() {
    var alt_var = jQuery(this).attr('alt');
    songId = alt_var;
    var xhttp = new XMLHttpRequest()
  
    xhttp.onreadystatechange = function() {
    lyricsStr = this.responseText;
    var record = JSON.parse(lyricsStr);
    lyrics = record.response.song.embed_content;
    title = record.response.song.title;
    artist = record.response.song.artist_names;
    player = record.response.song.apple_music_player_url;
    albumCover = record.response.song.song_art_image_url;
    artistNames = record.response.song.primary_artist.image_url;
    producers = "";    
    links = "";
    for (var i = 0; i < record.response.song.media.length; i ++) {
      media = record.response.song.media[i].url;
      if(media.indexOf('spotify') >= 0){
        links += "<li id='medias'> <a target='_blank' href='" + media + "'> <i class='fa-brands fa-spotify'></i> </a> </li>";
      }
      if(media.indexOf('youtube') >= 0){
        links += "<li id='medias'> <a target='_blank' href='" + media + "'> <i class='fa-brands fa-youtube'></i> </a> </li>";
      }
      if(media.indexOf('soundcloud') >= 0){
        links += "<li id='medias'> <a target='_blank' href='" + media + "'> <i class='fa-brands fa-soundcloud'></i> </a> </li>";
      }
    }
        
    for (var i = 0; i < record.response.song.producer_artists.length; i ++) {
      producers +=  record.response.song.producer_artists[i].name + ", " ;
    }
        
    var tab = window.open();
    tab.document.write('<title>GENIUS</title>' 
    + '<script src="https://kit.fontawesome.com/6c5e78ae37.js" crossorigin="anonymous"></script>' 
    + '<link rel="icon" type="image/x-icon" href="/GENIUS/images/favicon.ico">' 
    + '<link rel="stylesheet" href="/GENIUS/css/main.css">' 
    + '<h1 id="close">Close Tab</h1>'
    + '<div id="all"> <div id="main-stuff"> <div id="artist-frame"> <img id="artist-picture" src="' + artistNames + '"> </div>'
    + '<h1 id="artist-names">' + title + '</h1>'
    + '<p id="song">' + artist + '</p>'
    + '<div id="content"> <div id="album-frame"> <img id="album-picture" src="' + albumCover + '"> </div>'
    + '<div id="testing"> <p id="album-name">' + album + '</p>'
    + '<div id="producers"><p> Produced by' + ' <span style="color:yellow;">'+  producers + '</span></p></div>'
    + '<div id="media-list"> <ul>' + links + '</ul></div> </div></div>'
    + '<div id="frame"> <iframe src="' + player + '" title=""></iframe> </div> </div>'
    +  '<div id="song-lyrics">' + lyrics + '</div> </div>'
    + ' <script src="https://code.jquery.com/jquery-3.6.0.js" integrity="sha256-H+K7U5CnXl1h5ywQfKtSj8PCmoN9aaq30gDh27Xc0jk=" crossorigin="anonymous"></script>'
    + '<script src="/GENIUS/js/script.js"></script>'
    + '<script src="/GENIUS/js/result.js"></script>');
    tab.document.close(); 
  };

  xhttp.open("GET", APISong+songId+accessToken, true);
  xhttp.send();
  });
})
